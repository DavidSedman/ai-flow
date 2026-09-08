---
name: detect-technologies
disable-model-invocation: true
description: Detect the languages, frameworks, libraries, build tools and infrastructure technologies used in a repository and produce a categorised inventory. Use for onboarding to an unfamiliar repo, auditing a tech stack, or generating context documentation. Triggers when the user asks what a repository is built with.
---

# Detect Technologies

Scan a repository to identify all programming languages, frameworks, libraries, build tools, and infrastructure technologies in use. Produces a structured inventory grouped by category. This skill is 

repository-agnostic: it discovers technologies dynamically from each repository.
Input: `{repositoryPath}` — root path of the repository to scan

## Constraints

- This skill is **read-only**. Do NOT write to, create, or modify any files in the repository.
- Output the report in the conversation ONLY.

## Process

### 1. Gather evidence

Collect technology signals from the repository using every source available:

#### 1. Scan dependency manifests

read all dependency files found in the repository:

   | File | Ecosystem |
   |------|-----------|
   | `package.json` | Node.js / JavaScript / TypeScript |
   | `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` | Node.js lock files (scan only for ecosystem detection, not full contents) |
   | `requirements.txt`, `Pipfile`, `pyproject.toml`, `setup.py`, `setup.cfg` | Python |
   | `go.mod` | Go |
   | `Cargo.toml` | Rust |
   | `pom.xml`, `build.gradle`, `build.gradle.kts` | Java / Kotlin |
   | `Gemfile` | Ruby |
   | `composer.json` | PHP |
   | `*.csproj`, `*.sln`, `Directory.Build.props` | .NET / C# |
   | `pubspec.yaml` | Dart / Flutter |

   For each manifest, extract: package names, version constraints, and dev vs production classification.

#### 2. Scan configuration files

Detect tools from config files at repository and npm workspace roots:

   | Config file pattern | Technology |
   |---------------------|------------|
   | `tsconfig.json`, `tsconfig.*.json` | TypeScript |
   | `eslint.config.*`, `.eslintrc.*` | ESLint |
   | `.prettierrc.*`, `prettier.config.*` | Prettier |
   | `vite.config.*` | Vite |
   | `webpack.config.*` | Webpack |
   | `svelte.config.*` | Svelte / SvelteKit |
   | `next.config.*` | Next.js |
   | `nuxt.config.*` | Nuxt |
   | `angular.json` | Angular |
   | `jest.config.*`, `vitest.config.*` | Testing framework |
   | `Dockerfile`, `docker-compose*.yml` | Docker |
   | `Chart.yaml`, `values.yaml` | Helm / Kubernetes |
   | `terraform/*.tf`, `*.tf` | Terraform |
   | `.github/workflows/*.yml` | GitHub Actions |
   | `azure-pipelines.yml`, `pipelines/**/*.yml` | Azure Pipelines |
   | `Jenkinsfile` | Jenkins |
   | `.gitlab-ci.yml` | GitLab CI |
   | `fabric-manifest.yaml` | Microsoft Fabric |
   | `knip.ts`, `knip.json` | Knip (unused code detection) |
   | `.nvmrc`, `.node-version` | Node version management |
   | `.editorconfig` | EditorConfig |

#### 3. Scan source file extensions

List unique file extensions under `src/` directories (or equivalent) to detect languages not captured by manifests:

   | Extension | Language |
   |-----------|----------|
   | `.ts`, `.tsx` | TypeScript |
   | `.js`, `.jsx`, `.mjs`, `.cjs` | JavaScript |
   | `.svelte` | Svelte |
   | `.vue` | Vue |
   | `.py` | Python |
   | `.go` | Go |
   | `.rs` | Rust |
   | `.java`, `.kt` | Java / Kotlin |
   | `.cs` | C# |
   | `.rb` | Ruby |
   | `.php` | PHP |
   | `.css`, `.scss`, `.less` | Stylesheets |
   | `.html` | HTML |
   | `.sql` | SQL |
   | `.graphql`, `.gql` | GraphQL |
   | `.proto` | Protocol Buffers |

#### 4. Detect monorepo / workspace structure

check for npm workspace definitions in root `package.json` (`workspaces` field), `pnpm-workspace.yaml`, Nx `workspace.json`, or Lerna `lerna.json`. Note each npm workspace and its purpose if determinable.

### 2. Classify technologies

Organise every detected technology into these categories:

| Category | Examples |
|----------|----------|
| **Languages** | TypeScript, JavaScript, Python, Go, etc. |
| **Frontend Frameworks** | Svelte, SvelteKit, React, Vue, Angular, etc. |
| **Backend Frameworks** | Express, Fastify, NestJS, Django, Flask, etc. |
| **Styling** | TailwindCSS, CSS Modules, SCSS, styled-components, etc. |
| **State Management** | Svelte stores, Redux, Pinia, Zustand, etc. |
| **Testing** | Vitest, Jest, Playwright, Cypress, Testing Library, etc. |
| **Build Tools** | Vite, Webpack, esbuild, Rollup, tsc, etc. |
| **Linting & Formatting** | ESLint, Prettier, Stylelint, etc. |
| **Package Management** | npm, yarn, pnpm, pip, etc. |
| **Containerisation** | Docker, Docker Compose, etc. |
| **Orchestration** | Kubernetes, Helm, etc. |
| **CI/CD** | Azure Pipelines, GitHub Actions, GitLab CI, Jenkins, etc. |
| **Cloud / Platform** | Azure, AWS, GCP, Microsoft Fabric, etc. |
| **Infrastructure as Code** | Terraform, Pulumi, CloudFormation, etc. |
| **Databases** | PostgreSQL, MongoDB, Redis, Memcached, etc. |
| **API Style** | REST, GraphQL, gRPC, etc. |
| **Authentication** | OAuth, OIDC, JWT, MSAL, etc. |
| **Monitoring / Logging** | Application Insights, Prometheus, Grafana, etc. |
| **Other Tools** | Knip, Husky, lint-staged, etc. |

For each technology, record:

- **Name** — exact technology name
- **Version** — version constraint from manifest (if available)
- **Source** — where it was detected (manifest, config file, source files)
- **Scope** — production, development, or both

### 3. Identify key packages

From the dependency manifests, highlight **notable packages** — those that significantly shape the architecture or developer experience. Skip trivial utility packages. Group by npm workspace if the repository is a monorepo.

### 4. Produce report

Output a structured report:

```
## Technology Inventory

### Repository: `{repositoryName}`
Detection sources: dependency manifests | config files | source scan

### Summary
| Category | Technologies |
|----------|-------------|
| Languages | TypeScript, JavaScript |
| Frontend | SvelteKit, Svelte 4 |
| ... | ... |

### Languages
| Language | Evidence | Primary/Secondary |
|----------|----------|-------------------|
| TypeScript | tsconfig.json, .ts files in src/ | Primary |

### Frontend Frameworks
| Technology | Version | Source | Scope |
|------------|---------|--------|-------|
| SvelteKit | ^1.x | package.json (app) | Production |

### Backend Frameworks
| Technology | Version | Source | Scope |
|------------|---------|--------|-------|
| Express | ^4.x | package.json (api) | Production |

(repeat for each non-empty category)

### Key Packages
#### Workspace: `app`
| Package | Version | Purpose |
|---------|---------|---------|
| @tma/mediacenter-shell | ^2.x | Shell/layout framework |

#### Workspace: `api`
| Package | Version | Purpose |
|---------|---------|---------|
| axios | ^1.x | HTTP client |

(repeat for each workspace)

### Workspace Structure (if monorepo)
| Workspace | Path | Purpose |
|-----------|------|---------|
| app | ./app | Frontend SvelteKit application |
| api | ./api | Backend Express API |
```

- Only include categories that have at least one detected technology.
- Omit the "Workspace Structure" section for single-app repositories.
- If a technology version could not be determined, show `—` in the version column.

### 5. Summary

End with a one-line summary:

```
**Result:** Detected X technologies across Y categories in Z workspace(s).
```
