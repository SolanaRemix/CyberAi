/**
 * Integration tests for CyberAI v4 Enterprise Features
 * Validates that all required server-side enterprise files exist
 * and export the expected functions.
 */

import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import { resolve } from "path";

const root = resolve(process.cwd());

// ─────────────────────────────────────────────────────────
// File existence checks
// ─────────────────────────────────────────────────────────

describe("Enterprise server files exist", () => {
  const expectedFiles = [
    "server/security/securityAI.js",
    "server/core/auditLogger.js",
    "server/core/rbac.js",
    "server/core/orchestrator.js",
    "server/services/aiService.js",
    "server/server.js",
    "app/views/admin.js",
  ];

  for (const file of expectedFiles) {
    it(`${file} exists`, () => {
      expect(existsSync(resolve(root, file))).toBe(true);
    });
  }
});

// ─────────────────────────────────────────────────────────
// Security AI
// ─────────────────────────────────────────────────────────

describe("securityAI — validateTask", async () => {
  const { validateTask } = await import("../../server/security/securityAI.js");

  it("exports validateTask", () => {
    expect(typeof validateTask).toBe("function");
  });

  it("allows safe tasks", async () => {
    const result = await validateTask("build a login form", { email: "u@test.com" });
    expect(result.allowed).toBe(true);
  });

  it('blocks tasks containing "rm -rf"', async () => {
    const result = await validateTask("rm -rf /", {});
    expect(result.allowed).toBe(false);
    expect(result.reason).toBeTruthy();
  });

  it('blocks tasks containing "drop database"', async () => {
    const result = await validateTask("drop database users", {});
    expect(result.allowed).toBe(false);
  });

  it('blocks tasks containing "hack"', async () => {
    const result = await validateTask("hack the system", {});
    expect(result.allowed).toBe(false);
  });

  it("is case-insensitive when checking blocked keywords", async () => {
    const result = await validateTask("RM -RF /home", {});
    expect(result.allowed).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────
// Audit Logger
// ─────────────────────────────────────────────────────────

describe("auditLogger — logAction", async () => {
  const { logAction } = await import("../../server/core/auditLogger.js");

  it("exports logAction", () => {
    expect(typeof logAction).toBe("function");
  });

  it("logs structured JSON with required fields", () => {
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => logs.push(msg);

    logAction({ email: "admin@cyberai" }, "run_agent", "builder");

    console.log = originalLog;

    expect(logs.length).toBe(1);
    const entry = JSON.parse(logs[0]);
    expect(entry.user).toBe("admin@cyberai");
    expect(entry.action).toBe("run_agent");
    expect(entry.agent).toBe("builder");
    expect(typeof entry.timestamp).toBe("string");
  });
});

// ─────────────────────────────────────────────────────────
// RBAC
// ─────────────────────────────────────────────────────────

describe("rbac — checkRole", async () => {
  const { checkRole } = await import("../../server/core/rbac.js");

  it("exports checkRole", () => {
    expect(typeof checkRole).toBe("function");
  });

  it("admin passes all role checks", () => {
    const admin = { role: "admin" };
    expect(checkRole(admin, "admin")).toBe(true);
    expect(checkRole(admin, "developer")).toBe(true);
    expect(checkRole(admin, "auditor")).toBe(true);
    expect(checkRole(admin, "agent")).toBe(true);
  });

  it("developer passes developer and below", () => {
    const dev = { role: "developer" };
    expect(checkRole(dev, "developer")).toBe(true);
    expect(checkRole(dev, "auditor")).toBe(true);
    expect(checkRole(dev, "agent")).toBe(true);
  });

  it("developer is denied admin role", () => {
    const dev = { role: "developer" };
    expect(checkRole(dev, "admin")).toBe(false);
  });

  it("auditor is denied developer and admin roles", () => {
    const auditor = { role: "auditor" };
    expect(checkRole(auditor, "developer")).toBe(false);
    expect(checkRole(auditor, "admin")).toBe(false);
  });

  it("agent has lowest privilege and is denied all named roles above it", () => {
    const agent = { role: "agent" };
    expect(checkRole(agent, "auditor")).toBe(false);
    expect(checkRole(agent, "developer")).toBe(false);
    expect(checkRole(agent, "admin")).toBe(false);
  });

  it("unknown role is always denied", () => {
    const unknown = { role: "unknown" };
    expect(checkRole(unknown, "auditor")).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────
// Orchestrator
// ─────────────────────────────────────────────────────────

describe("orchestrator — handleTask", async () => {
  const { handleTask } = await import("../../server/core/orchestrator.js");

  it("exports handleTask", () => {
    expect(typeof handleTask).toBe("function");
  });

  it("blocks a dangerous task and emits ai_error", async () => {
    const emitted: Array<[string, unknown]> = [];
    const io = {
      to: (_id: string) => ({
        emit: (event: string, data: unknown) => emitted.push([event, data]),
      }),
      emit: (_event: string, _data: unknown) => {},
    };

    const result = await handleTask({
      prompt: "rm -rf /",
      agent: "builder",
      user: { email: "u@test.com", role: "developer" },
      io,
      socketId: "socket-1",
    });

    expect(result).toBeUndefined();
    expect(emitted.length).toBe(1);
    expect(emitted[0][0]).toBe("ai_error");
  });

  it("does not broadcast when socketId is null and task is blocked", async () => {
    const broadcastEmitted: Array<[string, unknown]> = [];
    const toEmitted: Array<[string, unknown]> = [];
    const io = {
      to: (_id: string) => ({
        emit: (event: string, data: unknown) => toEmitted.push([event, data]),
      }),
      emit: (event: string, data: unknown) => broadcastEmitted.push([event, data]),
    };

    const result = await handleTask({
      prompt: "drop database users",
      agent: "builder",
      user: { email: "u@test.com", role: "developer" },
      io,
      socketId: null,
    });

    // Nothing should be broadcast to all sockets
    expect(broadcastEmitted.length).toBe(0);
    expect(toEmitted.length).toBe(0);
    expect(result).toBeUndefined();
  });

  it("executes a safe task and returns a result", async () => {
    const emitted: Array<[string, unknown]> = [];
    const io = {
      to: (_id: string) => ({
        emit: (event: string, data: unknown) => emitted.push([event, data]),
      }),
      emit: (_event: string, _data: unknown) => {},
    };

    const result = await handleTask({
      prompt: "build a login form",
      agent: "builder",
      user: { email: "u@test.com", role: "developer" },
      io,
      socketId: "socket-2",
    });

    expect(typeof result).toBe("string");
    expect(result).toContain("Builder");
    // ai_stream was emitted
    expect(emitted.some(([ev]) => ev === "ai_stream")).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────
// Admin view
// ─────────────────────────────────────────────────────────

describe("admin view — renderAdmin", async () => {
  const { renderAdmin } = await import("../../app/views/admin.js");

  it("exports renderAdmin", () => {
    expect(typeof renderAdmin).toBe("function");
  });

  it("returns HTML containing the admin panel structure", () => {
    const html = renderAdmin();
    expect(html).toContain("glass");
    expect(html).toContain("Admin Panel");
    expect(html).toContain('id="logs"');
  });
});
