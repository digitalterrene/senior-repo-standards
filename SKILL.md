---
name: senior-repo-standards
description: >-
  Guides, audits, and scaffolds production-grade repository standards, senior documentation architecture, git hygiene, Conventional Commits, Chain-of-Thought (CoT) commit workflows, and Architectural Decision Records (ADRs). Use when establishing repository conventions, writing senior-level docs (README, CONTRIBUTING, SECURITY, ADRs, PR templates), auditing .gitignore and secret leak risks, or standardizing development workflows for high-performing engineering teams and AI agents.
metadata:
  author: Digital Terrene
  version: 1.0.0
  license: MIT
  tags:
    - git-standards
    - documentation
    - conventional-commits
    - adr
    - repo-hygiene
---

# Senior Repository Standards & Documentation Blueprint

A comprehensive, production-grade standard for repository architecture, documentation hierarchy, git hygiene, and agent-assisted engineering workflows. Modeled after enterprise-grade open-source and high-velocity engineering teams.

## Table of Contents
1. [Core Philosophy & Non-Negotiables](#1-core-philosophy--non-negotiables)
2. [Automated Scaffolding & Audit Runbooks](#2-automated-scaffolding--audit-runbooks)
3. [The 4-Tier Documentation Architecture](#3-the-4-tier-documentation-architecture)
4. [Zero-Leak Git Hygiene & .gitignore Protocols](#4-zero-leak-git-hygiene--gitignore-protocols)
5. [Conventional Commits & Chain-of-Thought (CoT) Workflows](#5-conventional-commits--chain-of-thought-cot-workflows)
6. [Branching Strategy & PR Governance](#6-branching-strategy--pr-governance)
7. [Architecture Decision Records (ADR) Framework](#7-architecture-decision-records-adr-framework)
8. [Pre-Commit Quality Gates & CI/CD Checklist](#8-pre-commit-quality-gates--cicd-checklist)

---

## 1. Core Philosophy & Non-Negotiables

Senior engineering is defined by predictability, defensibility, and clear communication. A senior repository enables any engineer or automated AI agent to:
- Understand system topology and domain boundaries within **5 minutes**.
- Spin up an isolated, reproducible local environment with **one command**.
- Safely commit code knowing automated pre-commit gates prevent regressions, type flaws, and secret leaks.
- Trace historical technical trade-offs through immutable **Architectural Decision Records (ADRs)** rather than tribal knowledge.

### Non-Negotiables
- **Zero Secrets in VCS**: Never commit `.env`, API tokens, private keys, or diagnostic logs.
- **Atomic, Meaningful Commits**: Every commit isolates a single logical change with imperative Conventional Commit formatting.
- **Self-Documenting Architecture**: Architectural docs (`docs/architecture/`), operational runbooks (`docs/runbooks/`), and decisions (`docs/adr/`) reside within the repo itself.
- **Proof of Verification**: Every PR and major commit must provide verifiable proof of correctness (test logs, type-check status, or visual screenshots).

---

## 2. Automated Scaffolding & Audit Runbooks

This skill includes bundled Node.js automation scripts located in [`./scripts/`](./scripts/):

### A. Scaffolding a New or Existing Repository
To scaffold the full senior directory structure, templates, and baseline files:
```bash
node .agents/skills/senior-repo-standards/scripts/scaffold-repo.js --project-name="<Project Name>" --type="fullstack"
```
*What this creates:*
- `.gitignore` (hardened multi-runtime configuration)
- `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/` (Bug Report & Feature Request)
- `docs/git-standards.md`
- `docs/adr/` with initial `ADR-000-template.md` & index
- `docs/architecture/` (`system-design.md`, `data-model.md`, `security-and-rbac.md`)
- `docs/runbooks/` (`deployment-verification.md`, `incident-response.md`)

### B. Auditing an Existing Repository
To run a strict repository health check:
```bash
node .agents/skills/senior-repo-standards/scripts/audit-hygiene.js
```
The audit checks:
1. `.gitignore` coverage (verifies sensitive extensions, `.env*`, and build outputs).
2. Required root documentation files.
3. Architecture and ADR directory completeness.
4. Git branch naming and recent commit message conformity.
5. Presence of uncommitted secrets or diagnostic artifact dumps.

---

## 3. The 4-Tier Documentation Architecture

Do not dump all project knowledge into a single unmaintainable `README.md`. Senior repositories organize documentation into four distinct tiers:

```
├── README.md                     # Tier 1: System Overview & Onboarding
├── CONTRIBUTING.md               # Tier 1: Contribution Standards & Etiquette
├── SECURITY.md                   # Tier 1: Vulnerability Reporting & SLAs
├── LICENSE                       # Tier 1: Legal Licensing Terms
└── docs/
    ├── git-standards.md          # Tier 1: Engineering Non-Negotiables
    ├── architecture/             # Tier 2: System Design & Topology
    │   ├── system-design.md
    │   ├── data-model.md
    │   ├── security-and-rbac.md
    │   └── tenant-routing.md
    ├── adr/                      # Tier 3: Architecture Decision Records
    │   ├── ADR-000-template.md
    │   ├── ADR-001-*.md
    │   └── README.md (ADR Log)
    └── runbooks/                 # Tier 4: Operational & Incident Runbooks
        ├── deployment-verification.md
        ├── disaster-recovery.md
        └── database-migration.md
```

Detailed guide: [Documentation Hierarchy Reference](./references/documentation-hierarchy.md)

---

## 4. Zero-Leak Git Hygiene & .gitignore Protocols

A leaky `.gitignore` causes accidental credential exposure, bloated repositories, and merge conflicts.

### Standard Exclusions Matrix
1. **Credentials & Environments**:
   ```gitignore
   .env
   .env*.local
   .env.production
   *.pem
   *.key
   *.pfx
   *.cert
   id_rsa*
   credentials.json
   ```
2. **Build Outputs & Caches**:
   ```gitignore
   dist/
   build/
   out/
   .next/
   .turbo/
   .cache/
   node_modules/
   ```
3. **Runtime Logs & Dumps**:
   ```gitignore
   *.log
   npm-debug.log*
   yarn-error.log*
   *.heapdump
   folders*.txt
   diagnostic*.txt
   ```
4. **OS & Editor Artifacts**:
   ```gitignore
   .DS_Store
   Thumbs.db
   .idea/
   .vscode/*
   !.vscode/extensions.json
   !.vscode/settings.json
   ```

Ready-to-use template: [gitignore-universal.template](./resources/templates/gitignore-universal.template)

---

## 5. Conventional Commits & Chain-of-Thought (CoT) Workflows

Commit messages form the definitive historical record of a software product. In modern agentic pair-programming, commits must reflect **why** a decision was made, not just **what** changed.

### Commit Format
```text
<type>(<scope>): <imperative summary>

[Optional body: Context, trade-offs, and Chain-of-Thought justification]

[Optional footer: References, Closes #123, BREAKING CHANGE]
```

### Approved Commit Types
- `feat`: A new user-facing or API feature.
- `fix`: A bug fix.
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `perf`: Code change improving performance or reducing memory footprint.
- `test`: Adding missing unit/integration tests or refactoring existing suites.
- `docs`: Documentation only changes.
- `style`: Formatting, whitespace changes (no logic changes).
- `chore`: Build tooling, dependency upgrades, or workflow configuration.

### Chain-of-Thought (CoT) Commit Guidelines for AI Agents & Engineers
When an agent or engineer implements complex logic:
1. **Explain the Root Cause**: Why did the previous approach fail or require modification?
2. **Document Alternative Considered**: Why was this specific data structure/algorithm chosen?
3. **State Side Effects**: Are there migration requirements or cache invalidations needed?

Deep-dive manual: [Conventional Commits & CoT Guide](./references/conventional-commits-and-cot.md)

---

## 6. Branching Strategy & PR Governance

### Branch Naming Convention
Strictly prefix branch names by intent, followed by scope and a kebab-case description:
- `feat/<scope>-<description>` (e.g., `feat/auth-jwt-refresh-rotation`)
- `fix/<scope>-<description>` (e.g., `fix/queue-bullmq-stalled-job-recovery`)
- `refactor/<scope>-<description>` (e.g., `refactor/imap-connection-pooling`)
- `chore/<scope>-<description>` (e.g., `chore/deps-update-turborepo-v2`)

### Pull Request Minimum Viable Content
Every PR must include:
1. **Problem Statement**: What bug or feature requirement does this address?
2. **Technical Approach**: High-level summary of architecture/code modifications.
3. **Verification Evidence**: Shell output, unit test results, or UI screenshots.
4. **Breaking Changes**: Clearly marked with rollback procedures.

Template: [PULL_REQUEST_TEMPLATE.md](./resources/templates/PULL_REQUEST_TEMPLATE.md)

---

## 7. Architecture Decision Records (ADR) Framework

ADRs are short markdown records capturing significant technical decisions, their context, and their consequences.

### When to Write an ADR:
- Introducing a new database, message broker, or caching layer (e.g., Redis, BullMQ).
- Transitioning between architectural topologies (e.g., Monolith to Microservices / Turborepo).
- Choosing or deprecating an authentication/authorization model (e.g., Auth0 vs self-hosted JWT).
- Any decision that is hard to reverse later.

Template: [ADR-000-template.md](./resources/templates/ADR-000-template.md)  
Handbook: [ADR Handbook](./references/adr-handbook.md)

---

## 8. Pre-Commit Quality Gates & CI/CD Checklist

To maintain zero tolerance for broken primary branches (`main` / `master`):

1. **Pre-Commit Verification Gates**:
   - `npm run lint` / ESLint passes with 0 warnings.
   - `tsc --noEmit` / TypeScript compiles with 0 type errors.
   - `npm run test` / Test suite passes 100%.
   - `git diff --cached` / Staged files checked for accidental `.env` or hardcoded tokens.
2. **Continuous Integration (GitHub Actions)**:
   - Automated lint, typecheck, build, test matrix on every PR.
   - Secret scanning using `gitleaks` or GitHub Secret Scanning.
   - Dependency vulnerability auditing via `npm audit` or Dependabot.

Full reference: [CI/CD Quality Gates & GitHub Actions](./references/ci-cd-quality-gates.md)
