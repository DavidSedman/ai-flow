import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

// dist/index.js -> skill-migration -> cli -> repo root
const packageDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repoRoot = path.dirname(path.dirname(packageDir));

export const skillsSourceDir = path.join(repoRoot, "skills");
export const globalClaudeDir = path.join(homedir(), ".claude");
export const globalSkillsDir = path.join(globalClaudeDir, "skills");
