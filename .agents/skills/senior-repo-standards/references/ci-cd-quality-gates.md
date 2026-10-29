# Pre-Commit Quality Gates & CI/CD Pipelines

A resilient engineering organization does not rely on human memory to prevent broken builds or leaked credentials. Automated verification gates enforce standards objectively at two stages: **Local Pre-Commit** and **Remote CI Pipeline**.

---

## 1. Local Pre-Commit Verification (Shift Left)

Before code is ever pushed to the remote repository, local gates must validate code integrity.

### The 4-Stage Local Gate:
```text
[Stage 1: Secrets & Gitignore] -> [Stage 2: Formatting & Lint] -> [Stage 3: Static Types] -> [Stage 4: Automated Tests]
```

### 1. Secrets Inspection
Ensure no sensitive files or staged tokens are in the commit:
```bash
# Check staged changes for forbidden extensions or secret patterns
git diff --cached --name-only | grep -E "(\.env|\.pem|\.key|credentials\.json)"
```

### 2. Linting & Formatting
Enforce ESLint, Biome, or Prettier:
```bash
npm run lint
```
*Rule*: Zero lint warnings allowed in production configurations.

### 3. Static Type Checking
Compiles TypeScript without emitting output to verify type soundness:
```bash
tsc --noEmit
# Or for Turborepos:
npx turbo run typecheck
```
*Rule*: No implicit `any` types or unresolved type mismatches.

### 4. Unit & Integration Test Suites
Run the test runner in CI-mode (bail on first failure or full pass):
```bash
npm test -- --bail
```

---

## 2. GitHub Actions CI Matrix

Below is a production-grade GitHub Actions workflow (`.github/workflows/ci.yml`) enforcing quality gates on all Pull Requests targeting `main`.

```yaml
name: CI Quality Gate

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  audit-secrets:
    name: Secret Leak Scan
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Run Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  verify-build:
    name: Typecheck, Lint & Test
    runs-on: ubuntu-latest
    needs: audit-secrets
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Linter
        run: npm run lint

      - name: Verify Types
        run: npx turbo run typecheck --if-present || npx tsc --noEmit

      - name: Execute Tests
        run: npm test --if-present

      - name: Validate Production Build
        run: npm run build
```

---

## 3. Branch Protection Rules on GitHub

Configure your primary branch (`main`) in GitHub Settings with the following protection rules:
1. **Require a pull request before merging**: No direct commits to `main`.
2. **Require status checks to pass before merging**:
   - `Secret Leak Scan`
   - `Typecheck, Lint & Test`
3. **Require branches to be up to date before merging**: Avoid race conditions.
4. **Require linear history**: Prevent messy merge commits (`git merge --squash` or `git rebase`).
5. **Include administrators**: Enforces the rules even for repo owners.
