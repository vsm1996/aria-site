/**
 * Registry drift check for data/rules.ts.
 *
 * v1 scope (documented on the rules page): the site vendors a structured
 * snapshot of docs/rule-registry.md rather than parsing it at build time.
 * This script keeps that snapshot honest — it fetches the LIVE registry from
 * the aria repo, extracts every rule id + status from the two rule tables,
 * and compares against the snapshot. Any mismatch (new rule, status change,
 * removed rule) exits nonzero with a diff, so CI or a maintainer catches
 * drift instead of the page silently going stale.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REGISTRY_RAW =
  'https://raw.githubusercontent.com/vsm1996/aria/main/docs/rule-registry.md';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// --- live registry -----------------------------------------------------------
const res = await fetch(REGISTRY_RAW);
if (!res.ok) {
  console.error(`✗ could not fetch registry (${res.status}) — check network / URL`);
  process.exit(2);
}
const md = await res.text();

// Rule table rows look like: | `rule-id` | STATUS | basis | ... |
const live = new Map();
for (const line of md.split('\n')) {
  const m = line.match(/^\|\s*`([a-z-]+)`\s*\|\s*(SHIPPED|PHASE 1|CANDIDATE|WATCH)\s*\|/);
  if (m) live.set(m[1], m[2]);
}
if (live.size === 0) {
  console.error('✗ parsed zero rules from the live registry — table format may have changed');
  process.exit(2);
}

// --- snapshot ------------------------------------------------------------------
// data/rules.ts is TypeScript; extract id/status pairs textually rather than
// importing (keeps this script dependency-free).
const snapshotSrc = readFileSync(path.join(root, 'data/rules.ts'), 'utf8');
const snap = new Map();
for (const m of snapshotSrc.matchAll(
  /id:\s*'([a-z-]+)'[\s\S]*?status:\s*'(SHIPPED|CANDIDATE|WATCH)'/g,
)) {
  snap.set(m[1], m[2]);
}

// --- diff ---------------------------------------------------------------------
let drift = 0;
for (const [id, status] of live) {
  if (!snap.has(id)) {
    console.error(`DRIFT: rule "${id}" (${status}) is in the live registry but not in data/rules.ts`);
    drift++;
  } else if (snap.get(id) !== status) {
    console.error(`DRIFT: rule "${id}" is ${status} in the registry but ${snap.get(id)} in data/rules.ts`);
    drift++;
  }
}
for (const id of snap.keys()) {
  if (!live.has(id)) {
    console.error(`DRIFT: rule "${id}" is in data/rules.ts but no longer in the live registry`);
    drift++;
  }
}

if (drift > 0) {
  console.error(`\n✗ ${drift} drift(s) between the live registry and the site snapshot.`);
  console.error('  Update data/rules.ts to match the registry — the registry is the source of truth.');
  process.exit(1);
}
console.log(`✓ site snapshot matches the live registry (${live.size} rules, statuses agree).`);
