# Desloppify Bounty Scoreboard

**Source:** https://github.com/peteromallet/desloppify/issues/204
**Total comments:** 253
**After filtering:** 99 submissions to verify
**Last updated:** agents update this after each verification

## Submissions

| ID | Author | Title | Status | Sig | Orig | Core | Overall | Notes |
|----|--------|-------|--------|-----|------|------|---------|-------|
| S002 | @yuliuyi717-ux | State-model coupling | NO | 3 | 4 | 2 | 3 | Design preference (event sourcing), not a flaw; provenance tracking already exists. [PR#260](https://github.com/peteromallet/desloppify/pull/260) |
| S003 | @juzigu40-ui | Config bootstrap non-transactional | NO | 0 | 0 | 0 | 0 | Duplicate of S313 from same author. [PR#256](https://github.com/peteromallet/desloppify/pull/256) |
| S005 | @agustif | Subjective-dimension circular dependency chain | YES | 7 | 7 | 7 | 7 | All 5 claims verified: base/ layer violation, circular dep chain, duplicated constants. S168 is the duplicate (submitted later). [PR#261](https://github.com/peteromallet/desloppify/pull/261) |
| S006 | @agustif | Destructive read-path plan migration | YES_WITH_CAVEATS | 5 | 4 | 1 | 4 | Version downgrade & container coercion original; fail-open overlaps S309. [PR#257](https://github.com/peteromallet/desloppify/pull/257) |
| S007 | @agustif | Review packet construction drift | YES_WITH_CAVEATS | 5 | 6 | 2 | 5 | Three paths bypass canonical builder; external.py missing max_files_per_batch & config redaction. [PR#37](https://github.com/xliry/desloppify/pull/37) |
