---
name: create-branch
description: Create and push a Git branch for an Azure DevOps work item using naming conventions — PBI/{id}-{slug} for Product Backlog Items, bugfix/{id}-{slug} for Bugs. Use for starting work on a work item across one or more repositories. Triggers when the user asks to create a branch for a work item.
model: Haiku
---

# Create Branch

Create a branch from a source branch for an Azure DevOps work item. The branch prefix is determined by the work item type:

- **Product Backlog Item** → `PBI/{work-item-id}-{branch-name}`
- **Bug** → `bugfix/{work-item-id}-{branch-name}`

**Tools:** `mcp__azureDevOps__get_work_item`, `Bash` (git)

**Depends on:** `repository-selection`

## Steps

1. **Select repository** — invoke the `repository-selection` skill via the **Skill** tool to detect and select target repositories

2. **Gather inputs** — ask the user for both and **wait for their response** before proceeding:
   - **Source branch** — branch to create from (default: `master`)
   - **Work item ID** — Azure DevOps work item ID

3. **Fetch work item details** — call `mcp__azureDevOps__get_work_item`, extract **title** and **work item type**, then:
   - Determine prefix: `Product Backlog Item` → `PBI`, `Bug` → `bugfix`
   - Sanitize title → lowercase, spaces to hyphens, strip non-alphanumeric, collapse/trim hyphens

4. **Create and push branch** — for each selected repository:
   ```
   git fetch origin {source-branch}
   git checkout -b {prefix}/{work-item-id}-{branch-name} origin/{source-branch}
   git push -u origin {prefix}/{work-item-id}-{branch-name}
   ```
   `-u` ensures the local branch tracks the remote. Inform user of created branch name and repository.

## Output

`{prefix}/{work-item-id}-{branch-name}` — created, pushed, and tracking origin for each selected repository.
