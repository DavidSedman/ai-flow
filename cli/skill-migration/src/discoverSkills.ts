import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { skillsSourceDir } from "./paths.js";

export interface Skill {
  name: string;
  category: string;
  dir: string;
}

// A skill directory is any directory containing SKILL.md. Categories can
// nest to arbitrary depth (e.g. engineering/<skill>, tooling/git/<skill>),
// so walk the whole tree rather than assuming a fixed depth.
async function walk(dir: string, relativeParents: string[]): Promise<Skill[]> {
  if (existsSync(path.join(dir, "SKILL.md"))) {
    return [
      {
        name: path.basename(dir),
        category: relativeParents.slice(0, -1).join("/"),
        dir,
      },
    ];
  }

  const entries = await readdir(dir, { withFileTypes: true });
  const skills: Skill[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    skills.push(
      ...(await walk(path.join(dir, entry.name), [...relativeParents, entry.name]))
    );
  }

  return skills;
}

export async function discoverSkills(root: string = skillsSourceDir): Promise<Skill[]> {
  const skills = await walk(root, []);

  return skills.sort((a, b) =>
    `${a.category}/${a.name}`.localeCompare(`${b.category}/${b.name}`)
  );
}
