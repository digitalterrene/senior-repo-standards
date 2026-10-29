# ADR-{{NUMBER}}: {{TITLE}}

- **Status**: Proposed | Accepted | Deprecated | Superseded by [ADR-XXX](ADR-XXX.md)
- **Date**: {{DATE}}
- **Authors**: {{AUTHORS}}
- **Deciders**: {{DECIDERS}}
- **Technical Story**: {{ISSUE_OR_TICKET_URL}}

---

## 1. Context & Problem Statement

Describe the context and problem being addressed. What technical constraints or business drivers require an architectural decision? What makes the current state insufficient?

*Example:*
> As our user base scales to 50,000 concurrent sessions, synchronous HTTP requests to external email providers are causing connection pooling exhaustion and thread blockages on our core Express API. We need an asynchronous queuing solution that guarantees delivery and supports retries.

---

## 2. Decision

State the active decision clearly in the imperative mood. Explain what we will do and how it will be implemented.

*Example:*
> We will adopt **BullMQ backed by Redis** for all asynchronous background task processing.
>
> Implementation Details:
> - Web/API nodes act solely as job producers.
> - A dedicated worker service pool consumes jobs from Redis queues.
> - All jobs must be idempotent and support at-least-once delivery.

---

## 3. Consequences

### Positive Impacts
- **Scalability**: Decouples API response latency from slow external third-party I/O.
- **Resilience**: Failed jobs automatically enter a dead-letter queue (DLQ) with exponential backoff.
- **Observability**: Real-time monitoring of queue depth and failure rates via Bull Board.

### Negative Impacts & Operational Costs
- **Infrastructure Overhead**: Requires provisioning and monitoring high-availability Redis instances.
- **Debugging Complexity**: Distributed asynchronous failures require distributed tracing instead of simple stack traces.

### Risks and Mitigations
- **Risk**: Redis memory saturation during bulk email ingest spikes.
- **Mitigation**: Configure Redis eviction policy to `noeviction` for BullMQ queues and enforce job payload size limits (< 128KB).

---

## 4. Alternatives Considered & Disqualification Rationale

### Option A: RabbitMQ
- *Pros*: Battle-tested AMQP protocol, fine-grained routing exchanges.
- *Cons*: Additional operational burden of running Erlang runtime; team lacks operational expertise.

### Option B: AWS SQS
- *Pros*: Fully managed, zero server maintenance.
- *Cons*: Vendor lock-in, latency during high-frequency micro-batches, lacks local offline development ergonomics.
