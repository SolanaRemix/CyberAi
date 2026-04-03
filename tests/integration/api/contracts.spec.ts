import { describe, it, expect } from "vitest";
import { app } from "../../../api/src/server";

describe("contracts API", () => {
  it("server exports an express app", () => {
    expect(app).toBeDefined();
    expect(typeof app).toBe("function");
  });
});
