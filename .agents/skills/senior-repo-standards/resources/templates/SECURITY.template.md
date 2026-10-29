# Security Policy & Vulnerability Reporting

The security and privacy of our systems and users are paramount. We appreciate the responsible disclosure of security issues and commit to working with researchers to investigate and resolve valid reports promptly.

---

## 1. Supported Versions

We actively maintain and provide security patches for the following versions:

| Version | Supported | Status |
|---|---|---|
| `latest` (`main`) | :white_check_mark: | Actively supported with hotfixes |
| `< 1.0.0` | :x: | Unsupported, please upgrade to latest release |

---

## 2. Reporting a Vulnerability

**DO NOT file public GitHub issues for security vulnerabilities.**

To report a vulnerability, please email:
📧 **`security@{{DOMAIN}}`**

Please include the following information in your report:
- **Component**: The affected service, API endpoint, or package.
- **Vulnerability Type**: (e.g., Remote Code Execution, SQL Injection, SSRF, Broken Access Control, Privilege Escalation).
- **Proof of Concept**: Minimal steps, curl commands, or script to reproduce the issue safely without causing harm or data destruction.
- **Impact Assessment**: The potential blast radius and consequence if exploited in production.

If you wish to encrypt your disclosure, request our PGP public key via the security email address.

---

## 3. Vulnerability Response SLA

We adhere to the following timelines for reported vulnerabilities:

| Severity | Initial Response | Assessment & Triage | Resolution Target |
|---|---|---|---|
| **Critical** | Within 12 hours | Within 24 hours | 48-72 hours |
| **High** | Within 24 hours | Within 48 hours | 7 business days |
| **Medium / Low** | Within 72 hours | Within 5 business days | Next release cycle |

---

## 4. Responsible Disclosure Guidelines

- Do not attempt to access, modify, or destroy user data.
- Do not degrade the performance of our production services (no Denial of Service testing).
- Give our security team reasonable time to remediate the vulnerability before public disclosure.
- We will acknowledge your contribution in our security release notes (if desired).
