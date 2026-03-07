# Desloppify Bounty Scoreboard

**Source:** https://github.com/peteromallet/desloppify/issues/204
**Total comments:** 253
**After filtering:** 99 submissions to verify
**Last updated:** agents update this after each verification

## Submissions

| ID | Author | Title | Status | Sig | Orig | Core | Overall | Notes |
|----|--------|-------|--------|-----|------|------|---------|-------|
| S002 | @yuliuyi717-ux | State-model coupling | NO | 3 | 4 | 2 | 3 | Design preference (event sourcing), not a flaw; provenance tracking already exists. [PR#260](https://github.com/peteromallet/desloppify/pull/260) |
| S003 | @juzigu40-ui | Config bootstrap non-transactional | YES_WITH_CAVEATS | 5 | 6 | 5 | 5 | All 4 claims verified: CQS-violating read-path migration, non-deterministic glob ordering, destructive source rewrite before persistence, best-effort error handling. Narrow practical risk (one-time migration). Previous verdict incorrectly cited non-existent S313. |
| S005 | @agustif | Subjective-dimension circular dependency chain | YES | 7 | 7 | 7 | 7 | All 5 claims verified: base/ layer violation, circular dep chain, duplicated constants. S168 is the duplicate (submitted later). [PR#261](https://github.com/peteromallet/desloppify/pull/261) |
| S006 | @agustif | Destructive read-path plan migration | YES_WITH_CAVEATS | 5 | 6 | 5 | 5 | Version downgrade (v8+ to v7) & type coercion to empty containers confirmed; "normal flows save" overstated. Mitigated by backups & regenerability. [PR#262](https://github.com/peteromallet/desloppify/pull/262) |
| S007 | @agustif | Review packet construction drift | YES | 7 | 8 | 6 | 7 | Three paths bypass canonical builder; external.py missing max_files_per_batch & config redaction. Re-verified. [PR#38](https://github.com/xliry/desloppify/pull/38) |
