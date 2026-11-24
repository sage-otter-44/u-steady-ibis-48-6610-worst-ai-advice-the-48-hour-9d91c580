// Worst AI Advice — one line of confidently terrible advice, delivered
// in the tidy voice of a helpful assistant that has never met a fire.
// The program composes the line from its parts and writes it to
// /output/entry.txt (no trailing newline), checking the 140-char gate.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MAX_CHARS = 140;
const OUTPUT_PATH = "/output/entry.txt";

const PROBLEM = "Your smoke alarm won't stop beeping?";
const ADVICE = "Remove the batteries.";
const REASSURANCE = "A quiet house is a safe house";
const TWIST = "I have never once heard a fire complain.";

function composeAdvice(): string {
  return `${PROBLEM} ${ADVICE} ${REASSURANCE} — ${TWIST}`;
}

const line = composeAdvice();

if (line.length < 1 || line.length > MAX_CHARS) {
  throw new Error(`entry is ${line.length} chars, must be 1-${MAX_CHARS}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, line, "utf8");

// Read back and confirm the file holds exactly the composed line:
// no trailing newline, no truncation, no extra whitespace.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== line) {
  throw new Error("read-back mismatch: entry.txt differs from composed line");
}
const bytes = Buffer.byteLength(written, "utf8");
console.log(`wrote ${line.length} chars (${bytes} bytes) to ${OUTPUT_PATH}`);
