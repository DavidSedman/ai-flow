---
name: report-findings
disable-model-invocation: true
description: Structure analysis findings into a standardised report with severity-classified issues, positives, a summary table and a Pass / Pass with Comments / Needs Changes verdict. Use for presenting the output of code, documentation or work item reviews consistently. Triggers when review findings need formatting for delivery.
---

# Report Findings

Structure analysis findings into a standardised report with severity-classified issues, positives, and summary statistics.

**Inputs:** `{findings}` — list of issues (each with title, description, severity, category, file, lines, currentCode, suggestedFix, principleViolated), `{positives}` — good practices observed, `{reportType}` — "code", "documentation", or "work-item"

## Severity Levels

- **Critical** — must fix before merge, blocks deployment or causes data loss
- **Major** — should fix before merge, significant quality or correctness concern
- **Minor** — recommended improvement, does not block merge
- **Suggestion** — optional enhancement, nice to have
- **Info** — informational observation, no action required

## Steps

1. **Generate issue details** — for each finding:

   ```
   ### Issue: {title}

   **File**: `{path}`  **Line(s)**: {lines}  **Severity**: {severity}
   **Category**: {Clean Code | SOLID | Security | Pattern | Structure | Documentation | Work Item}

   **Description**: {explanation}
   **Current Code**: {snippet}
   **Suggested Fix**: {improved code or action}
   **Principle Violated**: {reference}
   ```

2. **Generate positives summary** — list good practices observed

3. **Generate summary table and statistics**:

   ```
   | # | File | Line | Severity | Category | Issue | Suggested Fix |
   |---|------|------|----------|----------|-------|---------------|
   | 1 | {file} | {line} | {severity} | {category} | {issue} | {fix} |

   Total files reviewed: {n} | Total issues: {n}
   Critical: {n} | Major: {n} | Minor: {n} | Suggestion: {n} | Info: {n}
   ```

4. **Generate assessment and recommended actions**:
   - **Pass** — no blocking issues, ready to merge
   - **Pass with Comments** — minor suggestions only, can merge without changes
   - **Needs Changes** — issues must be addressed before merge

   Categorise actions: **Priority 1 - Blocking**, **Priority 2 - Should Fix**, **Priority 3 - Nice to Have**
