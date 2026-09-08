---
name: repository-selection
description: Detect the Git repositories present in the current VSCode multi-folder workspace and select one or more as the target of an operation, auto-selecting when only one exists. Use for resolving which MEPS repository a multi-repo workflow should act on. Triggers as the first step of the MEPS work item workflows.
model: Haiku
---

# Repository Selection

Detect VSCode multi-folder workspace repositories and select one or more for an operation. Auto-selects if only one exists.

## Steps

### 1. Detect repositories — list all repositories in the current VSCode multi-folder workspace by root path and name

### 2. Select:
  - One repo found → auto-select, inform: "Automatically selected repository: {name}"
  - Multiple found → display numbered list with an "all" option, ask user to choose
  - None found → report error and stop

## output

list of selected repository root paths.
