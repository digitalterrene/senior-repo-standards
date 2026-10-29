# Git Engineering Non-Negotiables & Repository Hygiene

To maintain a production-grade, enterprise-ready codebase, all engineers and automated AI agents contributing to this repository must adhere strictly to the following standards. **Pull requests violating these rules will be rejected.**

---

## 1. Clean Branching Strategy

All work must occur on isolated branches cut directly from the primary integration branch (`main`).

**Naming Conventions:**
- Features: `feat/<scope>-<kebab-case-description>`
- Bug Fixes: `fix/<scope>-<kebab-case-description>`
- Refactoring: `refactor/<scope>-<kebab-case-description>`
- Maintenance: `chore/<scope>-<kebab-case-description>`
- Documentation: `docs/<scope>-<kebab-case-description>`

*Examples*:
- `feat/api-add-rate-limiting`
- `fix/worker-bullmq-stalled-lock`
- `chore/ci-upgrade-node-runner`

---

## 2. Atomic Conventional Commits & Chain-of-Thought

Every commit must be atomic (focused on a single logical change) and must adhere to the Conventional Commits specification.

**Format**:
```text
<type>(<scope>): <short summary in imperative mood>

[Optional Body: Chain-of-Thought (CoT) explanation of Root Cause, Solution, and Proof]

[Optional Footer: BREAKING CHANGE, Closes #issue]
```

**Allowed Types:**
- `feat`: A new feature or endpoint.
- `fix`: A bug fix.
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.
- `style`: Formatting, whitespace adjustments.
- `docs`: Documentation only changes.
- `chore`: Changes to build tooling or dependencies.

---

## 3. Pre-Commit Verification Gates

Zero tolerance for broken code on integration branches.
- **Build Pass**: Running `npm run build` must exit with code `0`.
- **TypeScript**: No unresolved `any` types. All types must compile cleanly (`tsc --noEmit`).
- **Linting**: Linter must pass with 0 errors.
- **Tests**: The automated test suite must execute cleanly with zero test failures.

---

## 4. Credential & Secret Protection

- **NEVER** commit secrets, API keys, private certificates, or database passwords.
- Use `.env.example` to commit the *schema* of required variables.
- Ensure all `.env*` files are strictly tracked in `.gitignore`.
- Periodically scan commit history for leaked credentials using `gitleaks`.

---

## 5. Commit & Pull Request Completeness

Pull Requests must contain sufficient context for reviewers:
- **Problem Statement**: What problem is being solved?
- **Technical Approach**: Summary of changes and design decisions.
- **Proof of Verification**: Include shell output, test logs, or UI screenshots.
- **Breaking Changes**: Clearly marked with migration instructions.
