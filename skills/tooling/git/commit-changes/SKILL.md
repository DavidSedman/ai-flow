---
name: commit-changes
description: Stage, commit and push all repository changes with a conventional commit message that references the Azure DevOps work item from the branch name. Use for committing work after implementation, across one or more repositories. Triggers when the user asks to commit and push, or as a step of the develop-work-item workflow.
model: Haiku
---

# Commit Changes

Stage, commit, and push all changes with a clear conventional commit message. Optionally includes a work item ID detected from the branch name.

Tools: `Bash` (git)
Depends on: `repository-selection`, `work-item-id-detection`

## Steps

### 1. Select repository

Invoke the `repository-selection` skill via the Skill tool

### 2. Detect work item ID

Invoke the `work-item-id-detection` skill via the Skill tool (optional — continue without if none found)

### 3. Stage and commit

Wait for user approval before executing:
  - `git add -A` to stage all new, edited, and deleted files
  - Generate a conventional commit message summarising the changes
  - Include `#{work-item-id}` in the message if detected in step 2
  - `git commit -m "{message}"`

### 4. Verify and push
  - `git log -1` to confirm commit recorded
  - `git push origin HEAD` to push current branch to origin

### 5. Provide summary

report to user:
  - Commit hash
  - Commit message
  - Repository/repositories affected
