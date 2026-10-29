# 🏛️ Senior Repo Standards & Engineering Blueprint

[![Antigravity Skill](https://img.shields.io/badge/Antigravity-Skill-8A2BE2.svg?style=flat-square)](https://github.com/google/antigravity)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-success?style=flat-square)](./package.json)

> **Transform your repository from amateur ad-hoc chaos to an enterprise-grade, senior-engineered codebase.**

Many software projects suffer from sloppy git hygiene: leaked `.env` files, bloated commits with titles like *"fix stuff"*, undocumented system design, and missing pull request standards.

**Senior Repo Standards** is a production-grade Agent Skill and developer framework that codifies the documentation, git conventions, architectural decision records (ADRs), and quality gates used by senior software architects and high-performing engineering teams.

---

## 🌟 What's Included

```
senior-repo-standards/
├── SKILL.md                          # Antigravity agent skill definition with frontmatter
├── README.md                         # Public documentation
├── LICENSE                           # MIT License
├── scripts/
│   ├── scaffold-repo.js              # Zero-dependency CLI runner to scaffold any project
│   └── audit-hygiene.js              # Repository hygiene auditor (scores out of 100)
├── resources/
│   └── templates/
│       ├── gitignore-universal.template  # Hardened .gitignore (secrets, logs, caches, OS)
│       ├── README.template.md            # Senior-level README with topology, badges & tables
│       ├── CONTRIBUTING.template.md      # Professional contribution workflow
│       ├── SECURITY.template.md          # Vulnerability reporting & SLA disclosure
│       ├── git-standards.template.md     # Engineering non-negotiables
│       ├── ADR-000-template.md           # Architecture Decision Record (MADR/Nygard)
│       ├── PULL_REQUEST_TEMPLATE.md      # Senior PR template with verification proof
│       └── issue-templates/
│           ├── bug_report.md             # High-context bug report
│           └── feature_request.md        # Architectural feature proposal
└── references/
    ├── documentation-hierarchy.md        # The 4-Tier Documentation Framework
    ├── conventional-commits-and-cot.md   # Conventional Commits + Chain-of-Thought (CoT) for Agents
    ├── adr-handbook.md                   # How and when to write immutable ADRs
    └── ci-cd-quality-gates.md            # Pre-commit gates & GitHub Actions CI matrix
```

---

## ⚡ Installation & Quick Start

### 1. The Standard Way: Install via `npx skills` (Recommended)

Compatible with **Claude Code**, **Cursor**, **Windsurf**, **GitHub Copilot**, **Antigravity**, and any tool adhering to the open Agent Skills ecosystem:

```bash
# Install to current project (auto-detects Claude, Cursor, Antigravity, etc.)
npx skills add digitalterrene/senior-repo-standards

# Or install globally across all your developer environments:
npx skills add digitalterrene/senior-repo-standards -g

# Or target Claude Code specifically:
npx skills add digitalterrene/senior-repo-standards --agent claude-code
```

> [!NOTE]
> When developers run `npx skills add digitalterrene/senior-repo-standards`, the CLI automatically resolves the `SKILL.md` file and installs it directly into their agent configuration directory (`.claude/skills/`, `.agents/skills/`, or `.cursor/rules/`).

---

### 2. Manual / Git Clone Installation
If you prefer version-controlling the skill directly within your project repository:
```bash
# For Antigravity / Agentic workspaces
git clone https://github.com/digitalterrene/senior-repo-standards.git .agents/skills/senior-repo-standards

# For Claude Code
git clone https://github.com/digitalterrene/senior-repo-standards.git .claude/skills/senior-repo-standards
```

### 3. Scaffold a New or Existing Repository in 5 Seconds
Run the built-in, zero-dependency Node.js scaffolding script:

```bash
# When installed in your project via npx skills add:
node .agents/skills/senior-repo-standards/scripts/scaffold-repo.js \
  --project-name="Enterprise Platform" \
  --org-name="acme-corp" \
  --repo-name="platform-core" \
  --domain="example.com"

# Or when running directly inside this repository:
node scripts/scaffold-repo.js \
  --project-name="Enterprise Platform" \
  --org-name="acme-corp" \
  --repo-name="platform-core" \
  --domain="example.com" \
  --target-dir="../your-target-project"
```

This immediately scaffolds:
- Multi-tier documentation (`docs/architecture/`, `docs/adr/`, `docs/runbooks/`)
- Hardened `.gitignore`
- `CONTRIBUTING.md`, `SECURITY.md`, `README.md`
- `.github/PULL_REQUEST_TEMPLATE.md` and issue templates

---

### 4. Audit Your Repository Health & Hygiene Score
Score your repository out of 100 with actionable feedback:

```bash
node .agents/skills/senior-repo-standards/scripts/audit-hygiene.js
```

Sample output:
```text
================================================================
📊 SENIOR REPOSITORY HYGIENE SCORE: 95 / 100
================================================================

✅ Passing Checks:
   ✓ .gitignore safely excludes .env files (+8 pts)
   ✓ .gitignore safely excludes Private keys (+8 pts)
   ✓ Found README.md (+8 pts)
   ✓ Found CONTRIBUTING.md (+7 pts)
   ✓ Found Architecture Decision Records (ADR) directory (+8 pts)
   ✓ Recent commit history conforms to Conventional Commits (+10 pts)
```

---

## 🧠 Core Engineering Principles

### 1. The 4-Tier Documentation Framework
- **Tier 1 (Root)**: Front porch (`README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE`).
- **Tier 2 (`docs/architecture/`)**: Deep-dive system designs, database schemas, and RBAC policies.
- **Tier 3 (`docs/adr/`)**: Immutable records of architectural choices, trade-offs, and disqualified alternatives.
- **Tier 4 (`docs/runbooks/`)**: Step-by-step operational runbooks for deployment and incident recovery.

### 2. Chain-of-Thought (CoT) Conventional Commits
Modern development with AI pairs requires commit messages that capture **why** a decision was made. Every commit follows:
```text
<type>(<scope>): <summary in imperative mood>

[Root Cause]
[Chain-of-Thought & Solution]
[Proof of Verification]
```

### 3. Zero-Tolerance Secret Protection
Hardened `.gitignore` preventing accidental staging of `.env*`, `.pem`, `.key`, diagnostic logs, heap dumps, and operating system junk.

---

## 📜 License

Licensed under the [MIT License](./LICENSE). Feel free to fork, customize, and publish for your engineering teams!
