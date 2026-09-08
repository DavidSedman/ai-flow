---
name: gather-pull-request-context
description: Retrieve Azure DevOps pull request diffs, comment threads, policy checks and linked work items, then classify the changed files for review. Use for building context before reviewing a pull request. Triggers when a PR review begins, or as a step of a code review workflow.
---

# Gather Pull Request Context

Retrieve comprehensive PR details from Azure DevOps: file changes with diffs, comments, policy status, and linked work items.

Inputs: `{repositoryName}`, `{pullRequestId}`
Tools: `mcp__azureDevOps__get_pull_request_changes`, `mcp__azureDevOps__get_pull_request_comments`, `mcp__azureDevOps__get_pull_request_checks`

## Steps

### 1. Get PR details and changes 

retrieve source/target branches, all file changes with unified diffs, and policy evaluation status

### 2. Get PR comments

retrieve all comment threads with their status (active, resolved, closed)

### 3. Extract linked work item IDs

check PR description for `AB#XXXXX` references and PR linked work items via API. Deduplicate.

### 4. Classify changes

files classifed into:
  - Source code for code analysis
  - Lock/generated `package-lock.json`, `*.lock`, build outputs (exclude from review)
  - Documentation markdown, text files
  - Configuration JSON, YAML configs
  Count changed lines per file (additions/deletions).

### 5. Produce structured output

Template for output:
  ```
  Pull Request #{id}
  - Source: {source-branch} → Target: {target-branch}
  - Files changed: {count}
  - Source code changes: {n} lines (excluding lock files)

  Changed Files:
  | # | File Path | Change Type | Lines Changed |
  |---|-----------|-------------|---------------|
  | 1 | {path}    | Modified    | +{n} / -{n}   |

  Linked Work Items: {list of IDs}
  Policy Status: {pass/fail/pending}
  ```
