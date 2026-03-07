# Desloppify Bounty Scoreboard

**Source:** https://github.com/peteromallet/desloppify/issues/204
**Total comments:** 253
**After filtering:** 99 submissions to verify
**Last updated:** agents update this after each verification

## Submissions

| ID | Author | Title | Status | Sig | Orig | Core | Overall | Notes |
|----|--------|-------|--------|-----|------|------|---------|-------|
| S002 | @yuliuyi717-ux | State-model coupling | NO | 3 | 4 | 2 | 3 | Design preference (event sourcing), not a flaw; provenance tracking already exists. [PR#260](https://github.com/peteromallet/desloppify/pull/260) |
| S003 | @juzigu40-ui | Config bootstrap non-transactional | YES_WITH_CAVEATS | 5 | 6 | 5 | 5 | All 4 claims verified: CQS-violating read-path migration, non-deterministic glob ordering, destructive source rewrite before persistence, best-effort error handling. Narrow practical risk (one-time migration). [PR#265](https://github.com/peteromallet/desloppify/pull/265) |
| S005 | @agustif | Subjective-dimension circular dependency chain | YES | 7 | 7 | 7 | 7 | All 5 claims verified: base/ layer violation, circular dep chain, duplicated constants. S168 is the duplicate (submitted later). [PR#261](https://github.com/peteromallet/desloppify/pull/261) |
| S006 | @agustif | Destructive read-path plan migration | YES_WITH_CAVEATS | 5 | 6 | 5 | 5 | Version downgrade (v8+ to v7) & type coercion to empty containers confirmed; "normal flows save" overstated. Mitigated by backups & regenerability. [PR#262](https://github.com/peteromallet/desloppify/pull/262) |
| S007 | @agustif | Review packet construction drift | YES | 7 | 8 | 6 | 7 | Three paths bypass canonical builder; external.py missing max_files_per_batch & config redaction. Re-verified. [PR#269](https://github.com/peteromallet/desloppify/pull/269) |
| S012 | @taco-devs | Issue.detail stringly-typed god field | YES_WITH_CAVEATS | 5 | 6 | 4 | 5 | detail: dict[str,Any] serves 14 shapes across 34 files/~115 access sites. Numbers overstated (115 not 200+), 2/3 examples inaccurate, implicit discriminant exists. Common Python trade-off. [PR#266](https://github.com/peteromallet/desloppify/pull/266) |
| S015 | @dayi1000 | False immutability in Dimension frozen dataclass | YES_WITH_CAVEATS | 3 | 5 | 2 | 3 | list[str] inside frozen=True dataclass allows in-place mutation. Technically correct but no code actually mutates dim.detectors — all usage is read-only. Trivial one-line fix to tuple. [PR#267](https://github.com/peteromallet/desloppify/pull/267) |
| S016 | @yuzebin | Hard layer violation in core work queue | YES_WITH_CAVEATS | 5 | 6 | 4 | 5 | engine/_work_queue/synthetic.py:99 imports from app layer, violating two documented rules. But imported symbols are pure data constants with zero deps — misplaced definition, not deep coupling. Trivial fix. [PR#268](https://github.com/peteromallet/desloppify/pull/268) |
| S020 | @anthony-spruyt | Penalizes SOLID principles, encourages coupling | NO | 3 | 4 | 2 | 3 | Vague behavioral feedback with no specific evidence. abstraction_fitness skip lists already exempt DI/testability. Coupling detector penalizes coupling, not encourages it. Inheritance claim unsubstantiated. [PR#270](https://github.com/peteromallet/desloppify/pull/270) |
| S023 | @jasonsutter87 | God-orchestrator with callback explosion | YES_WITH_CAVEATS | 7 | 6 | 6 | 6 | do_run_batches: 358 lines, 20 params (16 _fn callbacks). Systemic pattern: 875 _fn occurrences, 212 colorize_fn sites. Earliest submission on this topic. Deliberate testability choice, not a bug. [PR#271](https://github.com/peteromallet/desloppify/pull/271) |
| S024 | @jasonsutter87 | Selective lock discipline in parallel batch runner | NO | 2 | 4 | 1 | 2 | Core claim wrong: failures set only mutated from main thread, not worker threads. started_at/contract_cache unlocked access is benign under CPython GIL. [PR#272](https://github.com/peteromallet/desloppify/pull/272) |
