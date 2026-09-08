---
name: gather-work-item-details
description: Fetch Azure DevOps work item title, description, acceptance criteria, state, type and parent/child relations. Use for pulling requirements before planning or implementing MEPS work. Triggers when a work item ID is known and its details are needed, or as a step of plan-implementation and create-pull-request.
model: Haiku
---

# Gather Work Item Details

Fetch work item details from Azure DevOps: title, description, acceptance criteria, state, type, and relations.

Inputs: `{workItemIds}` — one or more work item IDs. 
Optional: `{includeChildren}` — also fetch child work items.
Tools: `mcp__azureDevOps__get_work_item`
Fallback: if the `azureDevOps` MCP server is unavailable, use `Bash`: `az boards work-item show --id {id} --expand all -o json`. The org and project defaults (`whqmeps` / `MEPS`) are already configured, so `--org`/`--project` are not needed.

## Steps

1. Fetch work item details

For each ID, extract: 
- title
- description (HTML)
- acceptance criteria
- state
- work item type 
- relations (parent/child links)

2. Fetch child work items (if `{includeChildren}` is true)

Check relations for child links, fetch each child, group under parent

3. Produce structured output

Template for output:
  ```
  Work Item #{id}: {title}
  - State: {state}
  - Type: {workItemType}
  - Description: {summary}
  - Acceptance Criteria:
    1. {criterion}
    2. {criterion}
  ```
