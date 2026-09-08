import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { discoverSkills } from "./discoverSkills.js";

function makeSkill(root: string, ...segments: string[]): void {
  const dir = path.join(root, ...segments);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "SKILL.md"), `# ${segments[segments.length - 1]}`);
}

describe("discoverSkills", () => {
  let root: string;

  afterEach(() => {
    if (root) rmSync(root, { recursive: true, force: true });
  });

  it("finds skills nested at different depths and reports their category path", async () => {
    root = mkdtempSync(path.join(tmpdir(), "skills-fixture-"));
    makeSkill(root, "engineering", "clean-code");
    makeSkill(root, "tooling", "git", "create-branch");
    makeSkill(root, "tooling", "git", "commit-changes");

    const skills = await discoverSkills(root);

    expect(skills).toEqual([
      {
        name: "clean-code",
        category: "engineering",
        dir: path.join(root, "engineering", "clean-code"),
      },
      {
        name: "commit-changes",
        category: "tooling/git",
        dir: path.join(root, "tooling", "git", "commit-changes"),
      },
      {
        name: "create-branch",
        category: "tooling/git",
        dir: path.join(root, "tooling", "git", "create-branch"),
      },
    ]);
  });

  it("returns an empty list when no skill directories exist", async () => {
    root = mkdtempSync(path.join(tmpdir(), "skills-fixture-"));
    mkdirSync(path.join(root, "empty-category"), { recursive: true });

    expect(await discoverSkills(root)).toEqual([]);
  });
});
