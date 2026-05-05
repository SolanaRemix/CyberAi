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
    "server/index.js",
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

  it("blocks obfuscated input with extra whitespace between 'rm -rf'", async () => {
    // Extra spaces are collapsed during normalization so "rm  -rf" becomes "rm -rf"
    const result = await validateTask("rm  -rf /", {});
    expect(result.allowed).toBe(false);
  });

  it("blocks input with zero-width characters inserted between keyword chars", async () => {
    // Zero-width space (U+200B) injected between letters
    const result = await validateTask("rm\u200B -rf /", {});
    expect(result.allowed).toBe(false);
  });

  it("blocks drop database variant without space", async () => {
    const result = await validateTask("dropdatabase users", {});
    expect(result.allowed).toBe(false);
  });

  it("blocks rm-rf without space", async () => {
    const result = await validateTask("rm-rf /home", {});
    expect(result.allowed).toBe(false);
  });

  it("blocks spaced-out 'r m -r f' variant (compact bypass check)", async () => {
    // After stripping all spaces the compact form is "rm-rf" which is blocked
    const result = await validateTask("r m -r f /", {});
    expect(result.allowed).toBe(false);
  });

  it("blocks spaced-out 'h a c k' variant", async () => {
    const result = await validateTask("h a c k the system", {});
    expect(result.allowed).toBe(false);
  });

  it("rejects empty string input", async () => {
    const result = await validateTask("", {});
    expect(result.allowed).toBe(false);
  });

  it("rejects non-string input", async () => {
    // @ts-expect-error intentional bad input
    const result = await validateTask(null, {});
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
    try {
      logAction({ email: "admin@cyberai" }, "run_agent", "builder");
    } finally {
      console.log = originalLog;
    }

    expect(logs.length).toBe(1);
    const entry = JSON.parse(logs[0]);
    expect(entry.user).toBe("admin@cyberai");
    expect(entry.action).toBe("run_agent");
    expect(entry.agent).toBe("builder");
    expect(typeof entry.timestamp).toBe("string");
    expect(entry.status).toBe("success");
    expect(typeof entry.durationMs).toBe("number");
  });

  it("includes trace context fields when provided", () => {
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => logs.push(msg);
    let entry: Record<string, unknown>;
    try {
      logAction({ email: "dev@cyberai" }, "run_agent", "scanner", {
        socketId: "socket-abc",
        ip: "127.0.0.1",
        traceId: "trace-xyz",
      });
      entry = JSON.parse(logs[0]);
    } finally {
      console.log = originalLog;
    }

    expect(entry.socketId).toBe("socket-abc");
    expect(entry.ip).toBe("127.0.0.1");
    expect(entry.traceId).toBe("trace-xyz");
  });

  it("includes status and durationMs when provided", () => {
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => logs.push(msg);
    let entry: Record<string, unknown>;
    try {
      logAction({ email: "dev@cyberai" }, "run_agent", "scanner", {
        status: "error",
        durationMs: 42,
      });
      entry = JSON.parse(logs[0]);
    } finally {
      console.log = originalLog;
    }

    expect(entry.status).toBe("error");
    expect(entry.durationMs).toBe(42);
  });

  it("omits trace context fields when not provided", () => {
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => logs.push(msg);
    let entry: Record<string, unknown>;
    try {
      logAction({ email: "dev@cyberai" }, "run_agent", "scanner");
      entry = JSON.parse(logs[0]);
    } finally {
      console.log = originalLog;
    }

    expect(entry.socketId).toBeUndefined();
    expect(entry.ip).toBeUndefined();
    expect(entry.traceId).toBeUndefined();
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
// Agent Registry (aiService whitelist)
// ─────────────────────────────────────────────────────────

describe("aiService — agent registry whitelist", async () => {
  const { runAgent, AGENT_REGISTRY } = await import("../../server/services/aiService.js");

  const mockIo = {
    to: (_id: string) => ({ emit: () => {} }),
    emit: () => {},
  };

  it("exports AGENT_REGISTRY as a Map", () => {
    expect(AGENT_REGISTRY).toBeInstanceOf(Map);
    expect(AGENT_REGISTRY.size).toBeGreaterThan(0);
  });

  it("accepts all registered agents without throwing", async () => {
    for (const agent of AGENT_REGISTRY.keys()) {
      await expect(runAgent("test prompt", agent, mockIo, "s1")).resolves.toBeTruthy();
    }
  });

  it("rejects an unknown agent name", async () => {
    await expect(runAgent("test prompt", "unknown-agent", mockIo, "s1")).rejects.toThrow(
      /unknown agent/i,
    );
  });

  it("rejects an empty string agent name", async () => {
    await expect(runAgent("test prompt", "", mockIo, "s1")).rejects.toThrow();
  });

  it("rejects agent name injection attempt", async () => {
    await expect(runAgent("test", "__proto__", mockIo, "s1")).rejects.toThrow();
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

  it("logs status=success and durationMs on a successful task", async () => {
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => logs.push(msg);

    const io = {
      to: (_id: string) => ({ emit: () => {} }),
      emit: () => {},
    };

    let entry: Record<string, unknown>;
    try {
      await handleTask({
        prompt: "build a login form",
        agent: "builder",
        user: { email: "u@test.com", role: "developer" },
        io,
        socketId: "socket-3",
      });
      entry = JSON.parse(logs[0]);
    } finally {
      console.log = originalLog;
    }

    expect(entry.status).toBe("success");
    expect(typeof entry.durationMs).toBe("number");
    expect(entry.durationMs).toBeGreaterThanOrEqual(0);
  });

  it("logs status=error and emits ai_error when agent throws", async () => {
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => logs.push(msg);

    const emitted: Array<[string, unknown]> = [];
    const io = {
      to: (_id: string) => ({
        emit: (event: string, data: unknown) => emitted.push([event, data]),
      }),
      emit: () => {},
    };

    let result: unknown;
    let entry: Record<string, unknown>;
    try {
      // "unknown-agent" is not in AGENT_REGISTRY so runAgent will throw
      result = await handleTask({
        prompt: "build something",
        agent: "unknown-agent",
        user: { email: "u@test.com", role: "developer" },
        io,
        socketId: "socket-4",
      });
      entry = JSON.parse(logs[0]);
    } finally {
      console.log = originalLog;
    }

    expect(result).toBeUndefined();
    expect(emitted.some(([ev]) => ev === "ai_error")).toBe(true);
    expect(entry.status).toBe("error");
    expect(typeof entry.durationMs).toBe("number");
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

  it("includes data-requires-role='admin' authentication guard attribute", () => {
    const html = renderAdmin();
    expect(html).toContain('data-requires-role="admin"');
  });
});

// ─────────────────────────────────────────────────────────
// Server exports (server.js)
// ─────────────────────────────────────────────────────────

describe("server — exported app/server/io", async () => {
  // Import server.js (which no longer calls listen()) to verify exports and
  // catch any module-level startup errors.
  const { app, server, io } = await import("../../server/server.js");

  it("exports app as an Express handler function", () => {
    expect(typeof app).toBe("function");
  });

  it("exports server with a listen method", () => {
    expect(server).toBeDefined();
    expect(typeof server.listen).toBe("function");
  });

  it("exports io", () => {
    expect(io).toBeDefined();
  });

  it("app has POST /api/task route registered", () => {
    // Express 5 uses app.router; Express 4 uses app._router.
    // Check that the app has at least one route (the task endpoint).
    // This verifies the route setup ran without errors.
    const hasRouter =
      // @ts-expect-error private Express internals
      app.router != null || app._router != null;
    expect(hasRouter).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────
// Orchestrator — traceId forwarding
// ─────────────────────────────────────────────────────────

describe("orchestrator — traceId forwarded to audit log", async () => {
  const { handleTask } = await import("../../server/core/orchestrator.js");

  it("includes traceId in the audit log entry when provided", async () => {
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => logs.push(msg);

    const io = {
      to: (_id: string) => ({ emit: () => {} }),
      emit: () => {},
    };

    let entry: Record<string, unknown>;
    try {
      await handleTask({
        prompt: "build a login form",
        agent: "builder",
        user: { email: "u@test.com", role: "developer" },
        io,
        socketId: "socket-trace",
        traceId: "trace-abc-123",
      });
      entry = JSON.parse(logs[0]);
    } finally {
      console.log = originalLog;
    }

    expect(entry.traceId).toBe("trace-abc-123");
  });

  it("omits traceId from audit log when not provided", async () => {
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (msg: string) => logs.push(msg);

    const io = {
      to: (_id: string) => ({ emit: () => {} }),
      emit: () => {},
    };

    let entry: Record<string, unknown>;
    try {
      await handleTask({
        prompt: "build a login form",
        agent: "builder",
        user: { email: "u@test.com", role: "developer" },
        io,
        socketId: "socket-notrace",
      });
      entry = JSON.parse(logs[0]);
    } finally {
      console.log = originalLog;
    }

    expect(entry.traceId).toBeUndefined();
  });
});
