# ai-flow

Claude Code skills and supporting CLI tooling.

## Repo contents

```
.
├── skills/   Claude Code skills, organised by category
└── cli/      npm workspaces monorepo of CLI tools that operate on this repo
```

### `skills/`

Each skill is a directory containing a `SKILL.md` (plus any supporting files)
that Claude Code loads to extend its behaviour. Skills are grouped by
category, and categories may nest (e.g. `tooling/git/`, `tooling/azure-devops/`).

**`skills/engineering/`**

| Skill | Description |
| --- | --- |
| `clean-code` | Review code line by line against Robert C. Martin's Clean Code principles (naming, functions, SOLID, testing, concurrency, error handling, formatting, comments). |
| `context-gathering-checkpoint` | Pass/fail gate that verifies every required context item was gathered before a multi-step review or planning workflow proceeds. |
| `create-project-structure` | Creates a project's documentation folder structure from a name and type (Delivery/Maintenance/Security/UI Optimizations). |
| `create-spec` | Creates comprehensive specification documents — requirements, affected repos, tech/pattern detection, initiation/planning/requirements sections. |
| `detect-technologies` | Detects the languages, frameworks, libraries, build tools and infra used in a repo and produces a categorised inventory. |
| `develop-work-item` | Runs the full development lifecycle for a work item: branch creation, planning, a human approval gate, implementation, documentation, commit and PR. |
| `file-placement-check` | Checks that new/renamed/moved files sit in the correct folder per the repo's documented structure and naming conventions. |
| `final-verification-checklist` | Final gate that verifies every workflow checkpoint passed and every deliverable was produced before results are delivered. |
| `function-dependency-diagram` | Scans functions/methods in a folder, traces call relationships, and appends a Mermaid call-graph diagram to a markdown file. |
| `plan-implementation` | Read-only gap analysis for a work item that produces an actionable implementation plan, refreshing dependency/sequence diagrams. |
| `report-findings` | Structures analysis findings into a standardised report with severity, positives, a summary table and a Pass/Pass-with-Comments/Needs-Changes verdict. |
| `sequence-diagram` | Traces a call flow from an entry point across layers and appends a Mermaid sequence diagram to a markdown file. |

**`skills/tooling/azure-devops/`**

| Skill | Description |
| --- | --- |
| `add-pull-request-comments` | Posts inline comments on a pull request at specific file/line locations from a list of findings. |
| `create-pull-request` | Creates a pull request from the current branch, with the code changes and a linked work item. |
| `gather-pull-request-context` | Retrieves PR diffs, comment threads, policy checks and linked work items, and classifies changed files for review. |
| `gather-work-item-details` | Fetches a work item's title, description, acceptance criteria, state, type and parent/child relations. |

**`skills/tooling/git/`**

| Skill | Description |
| --- | --- |
| `commit-changes` | Stages, commits and pushes changes with a conventional commit message referencing the work item in the branch name. |
| `create-branch` | Creates and pushes a branch for a work item using naming conventions (`PBI/{id}-{slug}`, `bugfix/{id}-{slug}`). |

**`skills/tooling/vs-code/`**

| Skill | Description |
| --- | --- |
| `create-work-item-for-request` | Creates a Product Backlog Item under Feature 326019 from a described request, generating stories/notes/acceptance criteria. |
| `repository-selection` | Detects the Git repositories in the current VS Code multi-folder workspace and selects the target of an operation. |
| `work-item-id-detection` | Extracts a work item ID from the current branch name, prompting when none is found or several match. |

To use these skills with Claude Code, they need to be discoverable under
`~/.claude/skills/<skill-name>/SKILL.md` — see `cli/skill-migration` below for
the tool that handles moving them there.

### `cli/`

An npm workspaces monorepo (Node.js LTS, currently `>=24`) holding CLI tools
for this repo. Each tool is its own workspace package; run tools from the
`cli/` directory via root npm scripts.

```
cli/
├── package.json           workspaces root
└── skill-migration/        the skill-migration CLI
    ├── src/                 TypeScript source + vitest tests (*.test.ts)
    ├── dist/                esbuild output (generated, not committed)
    └── package.json
```

**Setup:**

```sh
cd cli
npm install
```

**Root scripts** (run across all workspaces):

| Script | Purpose |
| --- | --- |
| `npm run build` | Build every workspace (esbuild bundle to `dist/`). |
| `npm run typecheck` | Type-check every workspace with `tsc --noEmit`. |
| `npm test` | Run the vitest suite for every workspace. |
| `npm run skill-migration` | Build and run the `skill-migration` CLI. |

#### `skill-migration`

Interactively select skills from this repo's `skills/` folder and install
them into the global `~/.claude/skills` folder, flattening any category
nesting (e.g. `skills/tooling/git/create-branch` → `~/.claude/skills/create-branch`)
so Claude Code can discover them.

```sh
cd cli
npm run skill-migration
```

What it does, in order:

1. Discovers every skill in this repo's `skills/` tree (any directory
   containing a `SKILL.md`, at any nesting depth).
2. Prompts you to select which skills to add.
3. If `~/.claude/skills` already has entries, prompts to confirm, then backs
   them all up to a zip at `~/.claude/skills-backup-YYYY-DD-MM-HH-MM-SS.zip`
   and clears the folder.
4. Copies each selected skill into `~/.claude/skills/<skill-name>/`.

The clear step is destructive — restore from the backup zip if you need to
undo it.
