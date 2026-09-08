---
name: develop-work-item
disable-model-invocation: true
description: Run the full development lifecycle for an Azure DevOps work item across repositories i work with. Branch creation, planning, a human approval gate, implementation, documentation, commit and pull request. Use for taking a work item from start to raised PR. Triggers when the user asks to develop, implement or work on a work item.
---

# Develop Work Item

Full development lifecycle for an Azure DevOps work item: branch creation → planning → implementation → commit → pull request.

## Important Notes

- Steps are **sequentialdo not skip ahead
- Step 3 is a **hard gateno implementation without user confirmation
- If implementation fails tests, fix before committing
- If multiple repositories are involved, process each through steps 5–6 before summarising
- When creating todo list items, each item that maps to a workflow step **MUST** include the skill name to invoke (e.g., "Create PR — invoke `create-pull-request` skill"). Never create generic action items that omit the skill reference.

## Process

### 1. Create branches

invoke the `create-branch` skill via the **Skill** tool to create branches for the work item in each required repository. **Wait for completion** before proceeding.

### 2. Plan the implementation

invoke the `plan-implementation` skill via the **Skill** tool to perform gap analysis and produce an actionable plan. This includes creating/updating function dependency diagrams and sequence diagrams.

### 3. User review

present the plan to the user and ask: "Please review the plan above. Would you like to adjust anything, or shall I proceed with implementation?" **Wait for user response.** If adjustments are requested, update the plan and ask for confirmation again. **Do not proceed until the user explicitly confirms.**

### 4. Implement the plan

execute the confirmed plan step by step:
   - Follow repository standards from `.ai/rules/`
   - Make changes incrementally and verify each step
   - Run `npm run fix` after code changes
   - Run `npm run test` to confirm no regressions

### 5. Update documentation

for each repository with changes, review and update relevant documentation:
   - Update function dependency diagrams and sequence diagrams to reflect the new code
   - Update any affected `.ai/context/` files (e.g., API contracts, application services)
   - Update README or `.docs/` files if behaviour or setup has changed
   - Skip if no documentation updates are needed

### 6. Commit changes

invoke the `commit-changes` skill via the **Skill** tool for each repository that has changes. **Wait for all commits to complete** before proceeding.

### 7. Create pull requests

invoke the `create-pull-request` skill via the **Skill** tool for each repository that was committed to.

## Output

present a summary:
   - Branches created (name and repository)
   - Files changed per repository
   - Commit hashes
   - Pull request links
   - Work item ID linked
