import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import { resolve } from "path";
import { CyberAiClient } from "../../sdk/src/client";

describe("surface stubs", () => {
  it("CyberAiClient can be instantiated and exposes listContracts", () => {
    const client = new CyberAiClient({ baseUrl: "http://localhost:4000" });
    expect(client).toBeInstanceOf(CyberAiClient);
    expect(typeof client.listContracts).toBe("function");
  });

  it("api server stub file exists", () => {
    expect(existsSync(resolve(process.cwd(), "api/src/server.ts"))).toBe(true);
  });

  it("app main entry stub file exists", () => {
    expect(existsSync(resolve(process.cwd(), "app/src/main.tsx"))).toBe(true);
  });
});
