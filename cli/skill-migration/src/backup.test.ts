import AdmZip from "adm-zip";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { backupSkillsDir } from "./backup.js";

describe("backupSkillsDir", () => {
  let sourceDir: string;
  let destDir: string;

  beforeEach(() => {
    sourceDir = mkdtempSync(path.join(tmpdir(), "skills-source-"));
    destDir = mkdtempSync(path.join(tmpdir(), "skills-dest-"));

    mkdirSync(path.join(sourceDir, "clean-code"), { recursive: true });
    writeFileSync(path.join(sourceDir, "clean-code", "SKILL.md"), "# clean-code");
  });

  afterEach(() => {
    rmSync(sourceDir, { recursive: true, force: true });
    rmSync(destDir, { recursive: true, force: true });
  });

  it("creates a timestamped zip file in destDir", async () => {
    const backupPath = await backupSkillsDir(sourceDir, destDir);

    expect(existsSync(backupPath)).toBe(true);
    expect(path.dirname(backupPath)).toBe(destDir);
    expect(path.basename(backupPath)).toMatch(
      /^skills-backup-\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2}\.zip$/
    );
  });

  it("includes the source directory's contents in the zip", async () => {
    const backupPath = await backupSkillsDir(sourceDir, destDir);

    const zip = new AdmZip(backupPath);
    const entryNames = zip.getEntries().map((entry) => entry.entryName);
    expect(entryNames).toContain("clean-code/SKILL.md");
    expect(zip.readAsText("clean-code/SKILL.md")).toBe("# clean-code");
  });

  it("does not modify the source directory", async () => {
    await backupSkillsDir(sourceDir, destDir);

    expect(existsSync(path.join(sourceDir, "clean-code", "SKILL.md"))).toBe(true);
  });
});
