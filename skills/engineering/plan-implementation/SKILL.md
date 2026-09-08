---
name: plan-implementation
disable-model-invocation: true
description: Perform a read-only gap analysis for an Azure DevOps work item and produce an actionable implementation plan, refreshing function dependency and sequence diagrams along the way. Use for scoping change requests before any code is written. Triggers when the user asks to plan, scope or analyse a work item.
---

# Plan Implementation

Perform a gap analysis and plan code changes for an Azure DevOps work item. **Read-only — no code changes or commits.**

**Tools:** `mcp__azureDevOps__get_work_item`, `WebFetch`, `Bash` (git)
**Depends on:** `repository-selection`, `work-item-id-detection`, `gather-work-item-details`, `function-dependency-diagram`, `sequence-diagram`

## Steps

1. **Select repository** — invoke the `repository-selection` skill via the **Skill** tool
2. **Detect work item ID** — invoke the `work-item-id-detection` skill via the **Skill** tool (required — prompt user if not detected)
3. **Gather work item details** — invoke the `gather-work-item-details` skill via the **Skill** tool to extract title, description, and acceptance criteria. Lookup any URLs in the description for more details; skip inaccessible links
4. **Update diagrams** — for both function dependency diagrams and sequence diagrams, check if they exist in the repository (e.g., `.docs/` or `.ai/`):
  - **Exist** → review and update to reflect current code
  - **Don't exist** → invoke the `function-dependency-diagram` and `sequence-diagram` skills via the **Skill** tool to create them
  - Use both diagram types to understand call relationships, flow, and impacted areas
5. **Perform gap analysis** — compare work item requirements against the current codebase using the loaded AI context, function diagrams, and sequence diagrams to identify affected functions, flows, and dependencies
6. **Plan the solution** — present actionable plan in the conversation, aligned with repository standards from `.ai/rules/`. Reference both function and sequence diagrams to show impacted modules and flows

## Constraints

- **DO NOT** commit code
- **DO NOT** change application code
- Function diagrams **may** be created or updated as they are documentation
- All planning presented in conversation only
