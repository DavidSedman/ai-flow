---
name: create-pull-request
description: Create an Azure DevOps pull request from the current branch, with the code changes and a linked work item. Use for raising PRs in MEPS repositories. Triggers when the user asks to open, raise or create a pull request.
model: Haiku
---

# Create Pull Request

Create a pull request from the current branch to a target branch, with the code changes and the work item.

Tools: `mcp__azureDevOps__get_work_item`, `mcp__azureDevOps__create_pull_request`, `mcp__azureDevOps__update_pull_request`, `Bash` (git)

Depends on: `repository-selection`, `work-item-id-detection`, `gather-work-item-details`

Fallback: if the `azureDevOps` MCP server is unavailable, `az repos pr create -r {repo} -s {source} -t {target} --title "…" --work-items {id}` creates the PR and links the work item. Do not pass the description body via `--description`multiline HTML gets mangled by shell quoting, and markdown renders incorrectly in this ADO instance. Write the HTML to a JSON file (`{"description": "…"}`) and PATCH it instead: `az devops invoke --area git --resource pullRequests --route-parameters project=MEPS repositoryId={repo} pullRequestId={pr} --http-method PATCH --in-file {file} --encoding utf-8 --api-version 7.1`.

## Steps

### 1. Select repository

invoke the `repository-selection` skill via the Skill tool

### 2. Detect work item ID

invoke the `work-item-id-detection` skill via the Skill tool (requiredprompt user if not detected)

### 3. Target branch

ask the user: "What is the target branch? (default: `master`)" and wait for their response before proceeding

### 4. Gather work item details

invoke the `gather-work-item-details` skill via the Skill tool to extract title, description, and acceptance criteria

### 5. Analyse code changes

read modified files on the current branch, generate a summary of what was added, modified, or fixed aligned with repository standards

### 6. Create pull requestcall `mcp__azureDevOps__create_pull_request`:
  - Title: `{work-item-id}: {brief description of changes}`
  - Descriptionuse HTML format:
    ```html
    <h3>Code Changes</h3>
    <p>{AI-generated summary from step 6}</p>
    ```
  - Link work item via `workItemRefs`

### 7. Update pull request

call `mcp__azureDevOps__update_pull_request` to set assignees and reviewers

## Output

Pull request created and linked to work item `#{work-item-id}`, with reviewers assigned.
