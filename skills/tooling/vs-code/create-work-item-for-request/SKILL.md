---
name: create-work-item-for-request
description: Create an Azure DevOps Product Backlog Item under Feature 326019 from a request the user describes, generating user stories, notes and acceptance criteria in the description and acceptance criteria fields. Only runs when explicitly invoked.
disable-model-invocation: true
---

# Create Work Item For Request

Create a Product Backlog Item (PBI) under Feature `326019`, from a request described by the user. Drafts user stories, supporting notes, and acceptance criteria from the request details, confirms the draft with the user, then creates the work item in Azure DevOps.

Tools: `mcp__azureDevOps__create_work_item`
Fallback: if the `azureDevOps` MCP server is unavailable, use `Bash`: `az boards work-item create --type "Product Backlog Item" --title "…" --fields "System.Description=…" "Microsoft.VSTS.Common.AcceptanceCriteria=…" --org <org> --project MEPS`, then `az boards work-item relation add --id {new-id} --relation-type parent --target-id 326019`. The org and project defaults (`whqmeps` / `MEPS`) are already configured for the MCP tool, so pass them explicitly only in the `az` fallback.

## Steps

### 1. Gather request details

Ask the user for the request: what is being asked for, who it's for, and why. Ask follow-up questions if the request is too vague to derive user stories or acceptance criteria from.

### 2. Draft user stories

From the request details, write one or more user stories as a numbered list, each in this exact format:

```
1. As a {Persona}, I want to {do something}, in order to {reason it matters to the persona}.
```

### 3. Draft notes

Capture any request detail that doesn't fit into a user story (constraints, context, links, out-of-scope notes) under a `Notes` header, placed after the user stories.

### 4. Draft acceptance criteria

From the request details, write a list of acceptance criteria, each in this exact format:

```
[ ] Acceptance criterion 1
[ ] Acceptance criterion 2
```

### 5. Confirm draft with user

Show the user the draft title, user stories, notes, and acceptance criteria. Ask for confirmation or changes before creating anything in Azure DevOps.

### 6. Create the work item

Call `mcp__azureDevOps__create_work_item`:
- `workItemType`: `"Product Backlog Item"`
- `title`: short title summarizing the request
- `parentId`: `326019`
- `description`: HTML — user stories (numbered list) first, then a `Notes` section with any extra details (omit the `Notes` header if there are none)
- `additionalFields`: `{ "Microsoft.VSTS.Common.AcceptanceCriteria": "<HTML acceptance criteria list, `[ ] criterion` per line>" }`

Do not use CDATA tags in the HTML fields.

## Output

Report the new work item ID and its Azure DevOps URL, linked as a child of Feature `#326019`.
