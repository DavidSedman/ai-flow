import { describe, expect, it } from "vitest";
import { backupTimestamp } from "./timestamp.js";

describe("backupTimestamp", () => {
  it("formats as YYYY-DD-MM-HH-MM-SS, zero-padded", () => {
    const date = new Date(2026, 8, 3, 4, 5, 6); // 2026-09-03 04:05:06
    expect(backupTimestamp(date)).toBe("2026-03-09-04-05-06");
  });

  it("pads single-digit components", () => {
    const date = new Date(2030, 0, 1, 0, 0, 0); // 2030-01-01 00:00:00
    expect(backupTimestamp(date)).toBe("2030-01-01-00-00-00");
  });
});
