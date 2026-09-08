---
name: work-item-id-detection
description: Extract an Azure DevOps work item ID from the current Git branch name using the MEPS branch patterns, prompting the user when none is found or several match. Use for resolving which work item the current branch belongs to. Triggers as a step of the MEPS commit, pull request and planning workflows.
model: Haiku
---

# Work Item ID Detection
Extract an Azure DevOps work item ID from the current Git branch name using known naming patterns. If the ID cannot be detected or is ambiguous, prompt the user to provide it.

Input: `{repositoryPaths}` — list of VSCode multi-folder workspace repositories (from `repository-selection` skill)

## Steps

### 1. Get the current branch name

For each selected repository, run `git branch --show-current`

### 2. Extract work item ID

Match the branch name against known patterns:
- `feature/{work-item-id}-*` → extract `{work-item-id}`
- `{work-item-id}-*` → extract `{work-item-id}`
- `bugfix/{work-item-id}-*` → extract `{work-item-id}`
- `workitem-{work-item-id}/*` → extract `{work-item-id}`

The work item ID is the numeric portion of the match

### 3. Evaluate results
   
One ID found → use it automatically, inform: "Detected work item ID: {id} from branch: {branch-name}".
Multiple IDs found → display all with source branches, ask user to pick one.
No ID found → proceed to step 4.

### 4. Prompt user for work item ID

Ask: "What is the Azure DevOps work item ID?"
If the calling workflow marks this as optional, allow the user to skip
