## 📌 Summary of Changes

A concise, high-level overview of what this pull request changes and why.

---

## 🎯 Problem Statement & Context

What bug does this fix, or what feature does this implement? Link relevant issues.
Fixes # (issue)

---

## 🛠️ Technical Approach & Implementation Details

Explain the architectural or implementation strategy. Note any specific algorithms, data structures, or trade-offs:
- [ ] Point 1
- [ ] Point 2

---

## 🧪 Proof of Verification (Non-Negotiable)

Provide concrete evidence that this change functions properly and introduces no regressions:

### Automated Tests:
```text
Paste terminal test output / coverage summary here
```

### Visual Proof (For UI/Frontend changes):
*Attach screenshots or screen recording showing before and after states:*

| Before | After |
|---|---|
| *Screenshot* | *Screenshot* |

---

## ⚠️ Breaking Changes

- [ ] **No breaking changes** introduced.
- [ ] **Breaking change**: Describe backwards-incompatible schema/API changes and migration steps below.

---

## ✅ Senior Pre-Flight Checklist

- [ ] My code adheres to the repository's [Git Standards](./docs/git-standards.md).
- [ ] Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
- [ ] Complex changes include Chain-of-Thought reasoning in commit bodies.
- [ ] Static type analysis passes with 0 errors (`tsc --noEmit` or `turbo run typecheck`).
- [ ] Linter passes with 0 errors (`npm run lint`).
- [ ] All unit and integration tests pass cleanly (`npm test`).
- [ ] Staged diff verified to contain **NO secrets**, credentials, or diagnostic logs.
- [ ] Relevant documentation (README, architecture specs, ADRs) has been updated.
