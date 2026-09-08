---
name: add-pull-request-comments
description: Post inline comments on an Azure DevOps pull request at specific file/line locations, from a list of findings or review output. Confirms scope with the user before posting since this is a visible, shared action. Use after a code review to publish findings as PR comments, or whenever the user asks to add/post comments on a pull request.
model: Haiku
---

# Add Pull Request Comments

Post one or more inline comments on an Azure DevOps pull request, each anchored to a file/line location (or posted as a general PR-level comment).

Inputs: `{repositoryName}`, `{pullRequestId}`, `{comments}` — list of `{filePath, lineNumber, content}` (omit `filePath`/`lineNumber` for a general comment)
Tools: `mcp__azureDevOps__add_pull_request_comment`
Depends on: `repository-selection` (only if the repo isn't already known from context)

## Steps

### 1. Confirm scope 

posting PR comments is visible to the whole team and hard to fully undo, so confirm with the user which items to post before calling the API, unless the user has already given an explicit, final list. If the candidate comments came from a prior review (e.g. the `clean-code` skill's findings table), use `AskUserQuestion` with `multiSelect: true` so the user can pick a subset rather than assuming "all".
### 2. Resolve target 

get `{repositoryName}` and `{pullRequestId}` from conversation context (e.g. already fetched via `gather-pull-request-context`) or ask the user for the PR URL/ID.

### 3. Post each comment

call `mcp__azureDevOps__add_pull_request_comment` once per item:
  - `pullRequestId`, `repositoryId` (repo name)
  - `filePath` + `lineNumber` to anchor to a specific line; omit both for a PR-level general comment
  - `content` — HTML, not Markdown. Lead with a short bold label naming the concern (e.g. `<strong>Correctness:</strong> ...`), then a concise explanation, then a concrete suggested fix. Use `<code>` for inline code, `<pre><code>` for blocks, `<ul>/<li>` for lists
  - `status: "active"` — required on every new thread. Omitting it fails with `Status is required when creating a new thread`.

### 4. Report result

summarize what was posted, one line per comment (file:line + short label), pulling the thread ID from each response's `thread.id` for reference. Report any individual failures instead of silently skipping them.

## Notes

- Each call creates a new comment thread. To reply inside an existing thread instead, pass `threadId` and `parentCommentId` — do not pass `filePath`/`lineNumber`/`status` in that case.
- `lineNumber` refers to the line in the PR's right-hand (new/target) file version.
- `content` must be HTML. Markdown does not render in this ADO instance's comment threads.
- Keep PR comment tone normal/professional regardless of any terse-response style active in the conversation — these are read by teammates, not just the requesting user.

## Output

One created thread per posted comment, each with its Azure DevOps thread ID, plus a short summary line (file:line — concern) for the user.
