---
name: context-gathering-checkpoint
disable-model-invocation: true
description: Verify every required context item was gathered before analysis proceeds, and block the workflow when any are missing. Use for pass/fail gating between phases of a multi-step review or planning workflow. Triggers as a checkpoint step inside plan-implementation or a code review workflow, rarely standalone.
model: Sonnet
---

# Context Gathering Checkpoint

Quality gate that checks all required context items have been gathered before moving to the next workflow phase.

Input: `{requiredItems}` — list of items to verify, each with a name and completed status

## Steps

### 1. Evaluate each required item

Check whether data was successfully retrieved and output was produced

### 2. Produce checklist and status

Generate a formatted result:
  ```
  ### Context Gathering Checkpoint

  - [x] {item name}: {description} — {status detail}
  - [ ] {item name}: {description} — MISSING

  {✅ Checkpoint PASSED | ❌ Checkpoint FAILED}
  {summary counts, e.g. "Context files: 7/7 read"}
  ```

### 3. Block on failure

do not proceed if any items are missing. List what's missing and ask the user for guidance.

## Output

Formatted results
