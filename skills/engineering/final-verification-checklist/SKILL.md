---
name: final-verification-checklist
disable-model-invocation: true
description: Verify every workflow checkpoint passed and every deliverable was produced before results are delivered, blocking delivery when anything is missing. Use for closing out multi-phase review, planning or documentation workflows. Triggers as the final gate of such a workflow rather than as a standalone request.
---

# Final Verification Checklist

Completion gate that verifies all workflow checkpoints passed and all deliverables were produced before delivering results.

## Inputs 

`{workflowName}`, `{requiredDeliverables}`, `{checkpoints}`, `{overallAssessment}`, `{issuesSummary}` (counts by severity)

## Process

### 1. Verify checkpoints and deliverables

confirm every checkpoint passed and every deliverable has non-empty content in the expected format

### 2. Block on incompleteness

if any items are missing, do not deliver. Return to the first missing section and complete it.

## Output

```
{✅ workflowName Complete | ❌ workflowName INCOMPLETE}

### Checkpoints
- Checkpoint 1 ({name}): {PASSED | FAILED}
- Checkpoint 2 ({name}): {PASSED | FAILED}

### Deliverables
- [x] {deliverable 1}
- [ ] {deliverable 2} — MISSING

### Final Status
Assessment: {Pass | Pass with Comments | Needs Changes}
Total Issues: {count} (Critical: {n}, Major: {n}, Minor: {n}, Suggestion: {n})
```