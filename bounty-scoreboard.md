# Desloppify Bounty Scoreboard

**Source:** https://github.com/peteromallet/desloppify/issues/204
**Deadline:** Friday, March 6, 2026 at 4:00 PM UTC
**Last updated:** agents update this after each verification

## Submissions

| ID | Author | Title | Status | Sig | Orig | Core | Overall | Notes |
|----|--------|-------|--------|-----|------|------|---------|-------|
| S01 | @yuliuyi717-ux | State-model coupling | PARTIALLY VERIFIED | 4 | 3 | 3 | 3 | Accurate refs but shallow; scores recomputed deterministically |
| S02 | @juzigu40-ui | Config bootstrap non-transactional | VERIFIED | 4 | 5 | 1 | 3 | Valid but inflated; low-risk migration path, no scoring impact |
| S03 | @agustif | Subjective dimension circular pipeline | PARTIALLY VERIFIED | 5 | 3 | 4 | 3 | Real circular dep but fabricated file paths; half evidence doesn't check out |
| S04 | @agustif | Plan persistence destructive migration | - | - | - | - | - | |
| S05 | @agustif | Review packet schema drift | PARTIALLY VERIFIED | 6 | 4 | 3 | 4 | Real drift in external.py but fabricated file paths |
| S06 | @renhe3983 | Fake language support | - | - | - | - | - | Owner: intentional |
| S07 | @renhe3983 | Follow-up observations | - | - | - | - | - | |
| S08 | @taco-devs | Issue.detail stringly-typed god field | PARTIALLY VERIFIED | 5 | 3 | 2 | 3 | Valid core observation; 2/3 code examples fabricated, metrics inflated 2x |
| S09 | @renhe3983 | Issue.detail god field | - | - | - | - | - | Duplicate of S08 |
| S10 | @dayi1000 | Frozen dataclass with mutable list | VERIFIED | 3 | 4 | 1 | 3 | Valid but inert: no code mutates the list; zero scoring impact |
| S11 | @yuzebin | Engine->intelligence layer violation | - | - | - | - | - | |
| S12 | @renhe3983 | Duplicated phase configuration | - | - | - | - | - | |
| S13 | @renhe3983 | Test files larger than implementation | - | - | - | - | - | |
| S14 | @renhe3983 | Debug print statements in production | - | - | - | - | - | |
| S15 | @anthony-spruyt | Penalizes SOLID principles | - | - | - | - | - | Functional critique |
| S16 | @opspawn | Scoring policy registry mutation | - | - | - | - | - | |
| S17 | @jasonsutter87 | God-orchestrator do_run_batches | - | - | - | - | - | |
| S18 | @jasonsutter87 | Selective lock discipline | - | - | - | - | - | |
| S19 | @TheSeanLavery | Performance improvements | - | - | - | - | - | |
| S20 | @dayi1000 | Stale import binding JUDGMENT_DETECTORS | - | - | - | - | - | |
| S21 | @xinlingfeiwu | compute_score_impact ignores weights | - | - | - | - | - | |
| S22 | @samquill | do_run_batches 15 raw callbacks | - | - | - | - | - | |
| S23 | @xinlingfeiwu | Systematic over-injection anti-pattern | - | - | - | - | - | |
| S24 | @Midwest-AI-Solutions | str.replace corrupts cluster meta | - | - | - | - | - | |
| S25 | @xliry | false_positive scan-proof score inflation | - | - | - | - | - | OUR SUBMISSION |
| S26 | @xinlingfeiwu | app/ layer bypasses engine facades | - | - | - | - | - | |
| S27 | @renhe3983 | Inconsistent exception handling | - | - | - | - | - | |
| S28 | @Midwest-AI-Solutions | dimension_coverage tautological metric | - | - | - | - | - | |
| S29 | @renhe3983 | Duplicate config validation patterns | - | - | - | - | - | |
| S30 | @renhe3983 | Flat directory structure 605 files | - | - | - | - | - | |

## Scoring Guide
- **Sig** (1-10): Significance — how meaningful as "poorly engineered"?
- **Orig** (1-10): Originality — deep insight or surface observation?
- **Core** (1-10): Core Impact — affects gaming-resistant scoring?
- **Overall** (1-10): Combined assessment
