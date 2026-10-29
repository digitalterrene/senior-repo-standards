# The 4-Tier Documentation Framework

A hallmark of senior engineering teams is documentation that scales effortlessly with team size, system complexity, and automated AI agents. This document details the **4-Tier Documentation Architecture**.

---

## The Four Tiers at a Glance

| Tier | Audience | Location | Purpose | Update Frequency |
|---|---|---|---|---|
| **Tier 1: Front Porch & Compliance** | All engineers, new hires, external contributors, security researchers | Repository Root (`/`) | Quickstart, contributor rules, licensing, security disclosure | Low (Quarterly / Annually) |
| **Tier 2: Architectural Blueprints** | Core developers, AI agents, systems architects | `docs/architecture/` | Deep-dive topologies, data models, auth models, and networking | Medium (Per major architectural shift) |
| **Tier 3: Historical Decision Log** | Technical leads, code reviewers, future maintainers | `docs/adr/` | Immutable records of architectural trade-offs and rationale | Incremental (Whenever a major choice is finalized) |
| **Tier 4: Operational Runbooks** | DevOps, SREs, on-call engineers, triage agents | `docs/runbooks/` | Step-by-step procedures for deployment, disaster recovery, incidents | High (Kept in sync with live infrastructure) |

---

## Detailed Tier Breakdown

### Tier 1: Front Porch & Governance (Root Files)
- **`README.md`**:
  - High-level value proposition and system summary.
  - Architecture diagram or ASCII topology.
  - "Quick Start in 3 Commands" (Install, Configure, Run).
  - Environment variables table or link to `.env.example`.
  - Tech stack summary table.
- **`CONTRIBUTING.md`**:
  - Code of Conduct link.
  - Branching and Conventional Commit rules.
  - Quality verification checklist (Tests, lint, builds).
  - Pull Request lifecycle.
- **`SECURITY.md`**:
  - Supported versions.
  - Responsible disclosure email and encrypted reporting channels.
  - Response SLAs and critical vulnerability guidelines.
- **`LICENSE`**:
  - Exact legal distribution license (e.g., MIT, Apache 2.0, Proprietary).

---

### Tier 2: Architectural Blueprints (`docs/architecture/`)
Do not cram database schemas or multi-service choreography into the root `README.md`. Separate them into focused domain documents:

1. **`system-design.md`**:
   - Component topology (Web UI, API gateway, Workers, Message Brokers, DBs).
   - Synchronous vs. asynchronous communication patterns.
   - External third-party integrations (Stripe, Resend, IMAP, Auth0, etc.).
2. **`data-model.md`**:
   - Entity-Relationship Diagrams (ERDs) using Mermaid syntax.
   - Core schemas, primary indexing strategies, and multi-tenant partition keys.
3. **`security-and-rbac.md`**:
   - Authentication protocols (JWT rotation, session cookies, OAuth2 PKCE).
   - Role-Based Access Control (RBAC) permission matrices.
   - Secrets storage and environment segregation.
4. **`tenant-routing.md`** (or domain-specific routing):
   - Multi-tenant isolation strategies (subdomain routing, database schema isolation, row-level security).

---

### Tier 3: Architecture Decision Records (`docs/adr/`)
ADRs document the **Why** behind architectural choices so teams never re-litigate decisions without new evidence.

Format:
- `ADR-000-template.md`: Baseline blueprint.
- `ADR-001-microservices-monorepo-architecture.md`
- `ADR-002-background-job-processing-with-bullmq.md`
- `README.md`: Index table with Status (Proposed, Accepted, Deprecated, Superseded).

---

### Tier 4: Operational Runbooks (`docs/runbooks/`)
Operational runbooks provide copy-paste executable commands for real-world scenarios:
1. **`deployment-verification.md`**: Smoke tests, health-check endpoint curling, log tailing, rollback criteria.
2. **`database-migration.md`**: Zero-downtime migration steps, index creation during high traffic, rollback scripts.
3. **`incident-response.md`**: On-call triage flowcharts, log aggregators, error budget escalations.
