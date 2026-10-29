# Conventional Commits & Chain-of-Thought (CoT) Engineering

Git history is communication. A senior engineer or an advanced AI agent treats every git commit as an atomic, reversible, and mathematically descriptive increment of the codebase.

---

## 1. The Conventional Commits Specification

The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history.

### Message Structure
```text
<type>[optional scope]: <description in imperative mood>

[optional body: Chain-of-Thought reasoning, trade-offs, and context]

[optional footer(s): BREAKING CHANGE, Closes #123]
```

### Type Matrix

| Type | Intent | Triggers SemVer Bump | Example |
|---|---|---|---|
| `feat` | Introduces a new feature or API capability | MINOR (0.x.0) | `feat(auth): implement oauth2 refresh token rotation` |
| `fix` | Patches a bug or addresses an unhandled error | PATCH (0.0.x) | `fix(sync): gracefully recover from imap connection drops` |
| `refactor` | Restructures code without changing behavior | None / PATCH | `refactor(db): consolidate connection pooling logic` |
| `perf` | Optimizes execution speed, query times, or memory | PATCH | `perf(search): add composite index to tenant query` |
| `test` | Adds missing tests or updates existing suites | None | `test(worker): add unit test for dead-letter-queue retry` |
| `docs` | Modifies documentation, runbooks, or markdown | None | `docs(adr): record decision on bullmq vs rabbitmq` |
| `style` | Formatting, lint whitespace, missing semicolons | None | `style(api): normalize eslint single quote formatting` |
| `chore` | Tooling updates, CI pipelines, lockfile refresh | None | `chore(deps): bump turborepo from 2.0.4 to 2.1.0` |

---

## 2. Chain-of-Thought (CoT) Commits for Modern Engineering & AI Agents

When working with autonomous AI agents or complex enterprise systems, one-line commit messages like `fix bug in mailer` are unacceptable. The commit body should record the **Chain-of-Thought (CoT)** that led to the change.

### The 4 Pillars of a CoT Commit Body:
1. **Root Cause Analysis (Why)**: What was the underlying defect or limitation?
2. **Technical Rationale (How)**: Why this solution over alternatives?
3. **Safety & Invariants (Guarantees)**: What edge cases were evaluated?
4. **Verification Evidence (Proof)**: How was this change validated?

### Example: Junior vs. Senior vs. Senior CoT Commit

#### ❌ Junior Commit:
```text
fix imap sync
```

#### ⚠️ Standard Conventional Commit:
```text
fix(sync): handle imap socket drop
```

#### ✅ Senior Chain-of-Thought (CoT) Commit:
```text
fix(worker): handle imap socket drops during long-running bulk sync

Root Cause:
Under high network jitter, idle IMAP sockets triggered an unhandled 'ECONNRESET' 
event on the TLS stream. This crashed the background worker thread and left the 
active batch in an orphaned BullMQ state.

Chain-of-Thought & Solution:
1. Considered increasing socket timeout from 30s to 120s, but this only masks 
   the issue during true server drops.
2. Implemented exponential backoff reconnect logic with a jittered jitter-window 
   (base: 500ms, cap: 10s, max retries: 5).
3. Wrapped the TLS stream error emitter in a dedicated listener that re-queues 
   unacknowledged messages before gracefully recycling the client instance.

Proof of Verification:
- Simulated packet loss using toxiproxy (50% drop rate).
- Worker successfully retried 5 times, recycled connection, and completed 500/500 jobs.
- Added automated integration test: `test/integration/imap-reconnect.test.ts`.

Closes #842
```

---

## 3. Atomic Commit Rules

- **One Logical Unit per Commit**: Never combine a feature implementation with unrelated formatting or refactoring.
- **Always Compilable**: Every commit in the repository must be capable of compiling cleanly (`npm run build` succeeds). Avoid "checkpoint" commits that leave the repo in a broken state.
- **Squash vs. Rebase**: Feature branches may contain WIP commits during local development, but must be squashed or rebased into atomic conventional commits before merging to `main`.
