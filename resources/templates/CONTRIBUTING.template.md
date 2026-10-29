# Contributing to {{PROJECT_NAME}}

Thank you for your interest in contributing to {{PROJECT_NAME}}. Maintaining a resilient, high-velocity engineering organization requires clear standards to ensure stability across all systems.

---

## 1. Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all contributors regardless of experience level, background, or identity. Please treat everyone with respect and professional empathy.

---

## 2. Engineering Non-Negotiables

Before opening a Pull Request, you **must** read and understand our [Git Engineering Standards](./docs/git-standards.md).

**Key Rules:**
1. **Branch Naming**: Branch from `main` using `feat/<scope>-<desc>`, `fix/<scope>-<desc>`, `refactor/<scope>-<desc>`, or `chore/<scope>-<desc>`.
2. **Conventional Commits**: Every commit must strictly adhere to the [Conventional Commits](https://www.conventionalcommits.org/) standard.
3. **Chain-of-Thought (CoT)**: For complex changes or agentic pair-programming, record the root cause and technical justification in the commit body.
4. **Pre-Commit Verification**: Your PR must compile with zero type errors (`tsc --noEmit`), pass linter checks (`npm run lint`), pass tests (`npm test`), and build successfully (`npm run build`).

---

## 3. Local Development Workflow

1. Fork or clone the repository.
2. Create an isolated feature branch:
   ```bash
   git checkout -b feat/api-add-rate-limiting
   ```
3. Install dependencies and set up `.env`:
   ```bash
   cp .env.example .env
   npm install
   ```
4. Make your atomic, test-backed changes.
5. Verify quality gates locally:
   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```

---

## 4. Architectural Modifications & ADRs

If your contribution alters system boundaries, introduces a new database/message queue, or modifies public API contracts:
1. Review our [Architecture Blueprints](./docs/architecture/).
2. Submit an **Architecture Decision Record (ADR)** to [`docs/adr/`](./docs/adr/) using the template provided. Major architectural changes will not be merged without an accepted ADR.

---

## 5. Submitting a Pull Request

1. Rebase your branch against the latest `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```
2. Push your branch and open a PR using our [Pull Request Template](./.github/PULL_REQUEST_TEMPLATE.md).
3. Ensure all CI automated checks pass.
4. A maintainer will review your pull request. Address feedback iteratively with clean, atomic commits.
