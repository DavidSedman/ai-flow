---
name: file-placement-check
disable-model-invocation: true
description: Check that new, renamed or moved files sit in the correct folder for a repository's documented structure and naming conventions, discovered at runtime from .ai/context docs or the directory tree. Use for validating file placement after adding or relocating files. Triggers when files are added, renamed or moved.
---

# File Placement Check

Validate that new, renamed, or moved files sit in the correct folder according to the target repository's documented structure and naming conventions. This skill is **repository-agnostic**! It discovers conventions dynamically from each repository.

## Input:

- `{repositoryPath}` — root path of the repository to check against
- `{files}` — list of file paths that were added, renamed, or moved

## Process

### 1. Discover repository conventions

Load conventions from the target repository. Use every source available, in priority order:

#### a. Read `.ai/context/repository-structure.md`

if present, this is the authoritative folder tree and folder purpose map.

#### b. Read `.ai/context/naming-conventions.md`

if present, this defines file and folder naming rules.

#### c. Scan the actual directory tree

list the top-level folders and one level of sub-folders inside each `src/` directory to build a map of existing folder purposes. This acts as the fallback when `.ai/` docs are missing and supplements them when present.

From these sources, build two artefacts (keep in memory, do not output):

- **Folder purpose mapeach folder path and what it holds (e.g. `src/controllers/` → request handlers)
- **Naming rulesfile naming convention per file type and folder casing convention

If no `.ai/` docs exist **and** the tree is ambiguous, state that conventions could not be fully determined and list which checks will be best-effort.

### 2. Classify each file

For every file in `{files}`, determine:

| Property | How to derive |
|----------|---------------|
| **Application / workspace** | Which top-level application or npm workspace the file belongs to (detect from the repository's folder structure — e.g. monorepo workspaces, `src/` at root for single-app repos, etc.) |
| **File type** | Extension and naming pattern (`.svelte`, `.vue`, `.tsx` component; `.ts`/`.js` module; `.test.*` test; config file; route page; stylesheet; etc.) |
| **Intended purpose** | Inferred from file name, contents if readable, and surrounding context |

### 3. Evaluate placement against conventions

For each file, check ALL applicable rules derived from the discovered conventions. Rules fall into the following categories:

#### a. Structural rules (derived from folder purpose map)

| Rule | Detail |
|------|--------|
| **correct-workspace** | File must be inside the correct application/workspace for its type. Backend code belongs in the backend workspace; frontend code in the frontend workspace. |
| **source-in-src** | Application source files must be inside the `src/` directory (or equivalent) of their workspace, not at workspace root. |
| **correct-domain-folder** | File must be in the folder that matches its purpose according to the folder purpose map. For example, if the repo has `src/controllers/` for request handlers, a new controller must go there — not in `src/services/`. |
| **correct-sub-folder** | When a folder uses domain-based sub-folders (e.g. `components/Teams/`, `stores/personnel/`), the file must be in the sub-folder matching its domain. Place in a shared/common folder only if the file is genuinely reusable across domains. |
| **tests-in-test-folder** | Test files (`.test.*`, `.spec.*`) must be under the repository's designated test directory (e.g. `testing/`, `tests/`, `__tests__/`), not alongside source files — unless the repository convention explicitly co-locates tests. |
| **config-at-root** | Configuration files (`eslint.config.*`, `tsconfig.json`, `vite.config.*`, `jest.config.*`, `.prettierrc.*`, `package.json`, etc.) belong at their workspace or repository root, not inside `src/`. |

####b. Naming rules (derived from naming conventions)

| Rule | Detail |
|------|--------|
| **file-name-casing** | File name must follow the casing convention for its type as documented (e.g. PascalCase for components, camelCase for modules, kebab-case for stylesheets). |
| **test-suffix** | Test files must use the repository's test file suffix convention (e.g. `.test.ts`, `.spec.ts`). |
| **folder-casing** | Folder names must follow the repository's convention (typically lowercase or kebab-case; note any documented exceptions such as PascalCase component folders). |
| **framework-naming** | Route/page files must follow framework conventions if applicable (e.g. SvelteKit `+page.svelte`, Next.js `page.tsx`, Nuxt `index.vue`). |

#### c. Infrastructure rules (applied when relevant folders exist)

| Rule | Detail |
|------|--------|
| **infra-folder-match** | Infrastructure files must be in their designated folder. Detect from the repository which folders exist for Docker, Helm/K8s, CI/CD pipelines, Terraform, etc., and verify infrastructure files are placed there. |
| **ai-context-folder** | AI context files belong in `.ai/context/`, rules in `.ai/rules/`. |

#### d. Ambiguity handling

- If a file's correct location cannot be determined from the conventions, mark it as **⚠️ Unresolved** rather than guessing.
- If a file could validly go in more than one folder, list the most likely location first with alternatives noted.

### 4. Produce report

Output a report using this structure:

```
## File Placement Report

### Repository: `{repositoryName}`
Conventions source: `.ai/context/` docs | directory scan | both

### ✅ Correctly Placed
| File | Location | Rule |
|------|----------|------|
| `fileName` | `current/path/` | Matches `<rule>` |

### ⚠️ Misplaced Files
| File | Current Location | Issue | Suggested Location |
|------|-----------------|-------|-------------------|
| `fileName` | `wrong/path/` | Violates `<rule>`: <brief reason> | `correct/path/` |

### ❓ Unresolved (optional — only if applicable)
| File | Current Location | Reason |
|------|-----------------|--------|
| `fileName` | `path/` | Could not determine correct location — <reason> |
```

- List every file — do not skip files that pass.
- For misplaced files, provide the **specific suggested path** including filename.
- If a new domain sub-folder would be needed, suggest creating it and note that it is new.

### 5. Summary

End with a one-line summary:

```
**Result:** X of Y files correctly placed. Z warnings. W unresolved.
```
