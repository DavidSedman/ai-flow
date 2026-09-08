import { checkbox, confirm, Separator } from "@inquirer/prompts";
import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { backupSkillsDir } from "./backup.js";
import { discoverSkills, type Skill } from "./discoverSkills.js";
import { globalSkillsDir } from "./paths.js";

const ALL_SKILLS = Symbol("all-skills");

function pluralize(singular: string, plural: string, count: number): string {
  return count === 1 ? singular : plural;
}

function skillLabel(skill: Skill): string {
  return `${skill.category}/${skill.name}`;
}

async function promptForSkills(skills: Skill[]): Promise<Skill[]> {
  const selected = await checkbox({
    message: "Select the skills to add to your global Claude skills folder:",
    choices: [
      { name: "All skills", value: ALL_SKILLS as Skill | typeof ALL_SKILLS },
      new Separator(),
      ...skills.map((skill) => ({ name: skillLabel(skill), value: skill as Skill | typeof ALL_SKILLS })),
    ],
  });

  if (selected.includes(ALL_SKILLS)) {
    return skills;
  }

  return selected.filter((item): item is Skill => item !== ALL_SKILLS);
}

async function backupAndClearExisting(): Promise<void> {
  await mkdir(globalSkillsDir, { recursive: true });
  const existingEntries = await readdir(globalSkillsDir);

  if (existingEntries.length === 0) {
    return;
  }

  const proceed = await confirm({
    message: `This will back up and then permanently clear all ${existingEntries.length} existing ${pluralize(
      "entry",
      "entries",
      existingEntries.length
    )} in ${globalSkillsDir}. Continue?`,
    default: false,
  });

  if (!proceed) {
    throw new Error("Aborted. No changes made.");
  }

  const backupPath = await backupSkillsDir();
  console.log(`Backed up existing skills to ${backupPath}`);

  await rm(globalSkillsDir, { recursive: true, force: true });
  await mkdir(globalSkillsDir, { recursive: true });
  console.log(`Cleared ${globalSkillsDir}`);
}

async function installSkills(selected: Skill[]): Promise<void> {
  for (const skill of selected) {
    const destDir = path.join(globalSkillsDir, skill.name);
    await cp(skill.dir, destDir, { recursive: true });
    console.log(`Added ${skillLabel(skill)} -> ${destDir}`);
  }

  console.log(`Done. Added ${selected.length} ${pluralize("skill", "skills", selected.length)}.`);
}

async function main(): Promise<void> {
  const skills = await discoverSkills();

  if (skills.length === 0) {
    console.log("No skills found to migrate.");
    return;
  }

  const selected = await promptForSkills(skills);

  if (selected.length === 0) {
    console.log("No skills selected. Nothing to do.");
    return;
  }

  await backupAndClearExisting();
  await installSkills(selected);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
