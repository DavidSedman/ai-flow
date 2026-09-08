import archiver from "archiver";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { globalClaudeDir, globalSkillsDir } from "./paths.js";
import { backupTimestamp } from "./timestamp.js";

const ZIP_COMPRESSION_LEVEL = 9;

export async function backupSkillsDir(
  sourceDir: string = globalSkillsDir,
  destDir: string = globalClaudeDir
): Promise<string> {
  const backupPath = path.join(destDir, `skills-backup-${backupTimestamp()}.zip`);

  await new Promise<void>((resolve, reject) => {
    const output = createWriteStream(backupPath);
    const archive = archiver("zip", { zlib: { level: ZIP_COMPRESSION_LEVEL } });

    output.on("close", () => resolve());
    archive.on("error", (err) => reject(err));

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });

  return backupPath;
}
