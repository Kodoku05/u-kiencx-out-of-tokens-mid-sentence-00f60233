// 80 code points; the gate allows 1–140.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const entry = "ERR_TOKEN_LIMIT: Final verb unfunded; sentence released on its own recognizance.";
const codePoints = [...entry].length;

if (
  codePoints < 1 ||
  codePoints > 140 ||
  /[\u000A-\u000D\u0085\u2028\u2029]/u.test(entry) ||
  entry.trim() !== entry ||
  entry.trim().length === 0
) {
  throw new Error("Entry must be one trimmed line of 1–140 code points.");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputPath = join(outputDir, "entry.txt");

async function writeEntry() {
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, entry, { encoding: "utf8" });
}

writeEntry().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`makefun entry writer failed for ${outputPath}: ${message}`);
  process.exitCode = 1;
});
