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
| S04 | @agustif | Plan persistence destructive migration | PARTIALLY VERIFIED | 5 | 4 | 2 | 3 | Real coercion+reset pattern; 2/5 files fabricated, version "v7" is v2, all line numbers wrong |
| S05 | @agustif | Review packet schema drift | PARTIALLY VERIFIED | 6 | 4 | 3 | 4 | Real drift in external.py but fabricated file paths |
| S06 | @renhe3983 | Fake language support | NOT VERIFIED | 2 | 2 | 1 | 2 | 22 generic languages use shared framework with real linters+AST; "completely fake" is a significant overstatement |
| S07 | @renhe3983 | Monolithic files + thread safety | NOT VERIFIED | 2 | 2 | 1 | 2 | Fabricated line counts, wrong filenames; claims not verified against actual codebase |
| S08 | @taco-devs | Issue.detail stringly-typed god field | PARTIALLY VERIFIED | 5 | 3 | 2 | 3 | Valid core observation; 2/3 code examples fabricated, metrics inflated 2x |
| S09 | @renhe3983 | Issue.detail god field | DUPLICATE | 4 | 1 | 2 | 2 | Duplicate of S08 (posted 2 min later); all 3 code examples fabricated; wrong class name (Issue vs Finding) |
| S10 | @dayi1000 | Frozen dataclass with mutable list | VERIFIED | 3 | 4 | 1 | 3 | Valid but inert: no code mutates the list; zero scoring impact |
| S11 | @yuzebin | Engine->app layer violation | PARTIALLY VERIFIED | 6 | 5 | 3 | 5 | Real violation in since-removed file; inaccurate line numbers |
| S12 | @renhe3983 | Duplicated phase configuration | NOT VERIFIED | 1 | 1 | 1 | 1 | Fabricated: LanguagePhases class doesn't exist, line counts invented (4300 claimed vs 1479 actual), shared framework already exists |
| S13 | @renhe3983 | Test files larger than implementation | NOT VERIFIED | 2 | 2 | 1 | 2 | All 3 file paths wrong; "5-10x" ratio claim false (actual 0.73x); healthy test ratios |
| S14 | @renhe3983 | Debug print statements in production | PARTIALLY VERIFIED | 3 | 2 | 1 | 2 | 5 claims: print-vs-logger ratio real but numbers inflated; monolithic files mostly fabricated; detector count off 2.4x; test sizes wrong magnitudes; async irrelevant for CLI |
| S15 | @anthony-spruyt | Penalizes SOLID principles | PARTIALLY VERIFIED | 6 | 5 | 5 | 5 | Real issue: abstraction_fitness scores 71.3 on DI-heavy codebase; skip-clauses not applied by LLM reviewers |
| S16 | @opspawn | Scoring policy registry mutation | PARTIALLY VERIFIED | 3 | 3 | 2 | 3 | Standard Python plugin pattern; theoretical threading concern in CLI tool |
| S17 | @jasonsutter87 | God-orchestrator do_run_batches | PARTIALLY VERIFIED | 6 | 3 | 2 | 3 | Valid core observation; fabricated file paths (execution.py doesn't exist), invented function (prepare_holistic_review_payload), wrong numeric claims |
| S18 | @jasonsutter87 | Selective lock discipline | PARTIALLY VERIFIED | 2 | 3 | 1 | 2 | Spots asymmetric locking but misdiagnoses it; failures is main-thread-only; fabricated contract_cache and non-existent file paths |
| S19 | @TheSeanLavery | Regex in loops + bypassed cache + redundant AST | VERIFIED | 5 | 5 | 3 | 5 | 3 claims: regex partially valid, bypassed file cache fully valid (14 sites), redundant AST parsing fully valid |
| S20 | @dayi1000 | Stale import binding JUDGMENT_DETECTORS | PARTIALLY VERIFIED | 5 | 4 | 3 | 4 | Real stale binding bug + valid god-function observation; every file path, line number, and supporting reference is wrong |
| S21 | @xinlingfeiwu | compute_score_impact ignores weights | PARTIALLY VERIFIED | 5 | 5 | 2 | 4 | Real estimation bug but fabricated file paths and function names |
| S22 | @samquill | do_run_batches 15 raw callbacks | PARTIALLY VERIFIED | 4 | 3 | 1 | 3 | Real 15-callback observation; every file path, line number, parameter name, and types file wrong |
| S23 | @xinlingfeiwu | Systematic over-injection anti-pattern | INVALID | 1 | 1 | 1 | 1 | All three claimed layers fabricated; no referenced files, functions, or signatures exist |
| S24 | @Midwest-AI-Solutions | str.replace corrupts cluster meta | VERIFIED | 3 | 4 | 3 | 3 | Confirmed: naive str.replace corrupts unrelated numbers in cluster descriptions |
| S25 | @xliry | false_positive scan-proof score inflation | VERIFIED | 8 | 8 | 9 | 8 | All 3 claims verified, all file refs accurate |
| S26 | @xinlingfeiwu | app/ layer bypasses engine facades | NOT VERIFIED | 3 | 2 | 1 | 2 | Actual: 5 imports not 57; fabricated file paths, inflated count 11x, claimed missing facades exist |
| S27 | @renhe3983 | Inconsistent exception handling | PARTIALLY VERIFIED | 3 | 2 | 1 | 2 | Valid kernel: tool has `except Exception: pass/continue` its own detectors flag; but wrong file paths, no evidence, vague claims, best-effort patterns are intentional |
| S28 | @Midwest-AI-Solutions | dimension_coverage tautological metric | INVALID | 1 | 2 | 0 | 1 | Code misquoted: denominator is allowed_dims not assessments; metric works correctly |
| S29 | @renhe3983 | Duplicate config validation patterns | NOT VERIFIED | 2 | 1 | 1 | 1 | All file paths fabricated: base/compatibility.py and base/config.py don't exist; cited code pattern not found anywhere |
| S30 | @renhe3983 | Flat directory structure 605 files | NOT VERIFIED | 2 | 1 | 1 | 1 | All claims wrong: 453 files not 605, 158 dirs with clear hierarchy not flat, engine/detectors has 4 subdirs |
| S31 | @xinlingfeiwu | Work queue uses lenient headroom | NOT VERIFIED | 2 | 2 | 1 | 2 | Central claim (enrich_with_impact, headroom prioritization) fabricated; ranking uses tier/confidence, not health breakdown |
| S32 | @renhe3983 | Limited concurrency design | NOT VERIFIED | 2 | 2 | 1 | 2 | Wrong filename (runner_parallel.py doesn't exist); ThreadPoolExecutor usage is appropriate for I/O-bound CLI tool; no real deficiency |
| S33 | @renhe3983 | No centralized config management | NOT VERIFIED | 2 | 1 | 1 | 1 | Claim factually wrong: core/config.py has schema-driven centralized config with validation; cited path base/config.py does not exist |
| S34 | @renhe3983 | Inconsistent null handling | NOT VERIFIED | 2 | 1 | 1 | 1 | All file paths wrong (base/ vs core/); zero specific evidence; actual code shows consistent, properly-typed Optional returns |
| S35 | @renhe3983 | Missing test coverage documentation | PARTIALLY VERIFIED | 1 | 1 | 0 | 1 | Technically true: no coverage badge or CI coverage reports; but trivially observable documentation gap, not an engineering deficiency |
| S36 | @mpoffizial | Extreme nesting depth in test file | NOT VERIFIED | 1 | 1 | 0 | 1 | 9-level nesting exists but is 100% JSON data literals in test fixtures, not logic; 3-sentence submission with no evidence |
| S37 | @Boripheus | Unsynchronized failures set | NOT VERIFIED | 2 | 2 | 1 | 2 | `failures` set only mutated from main thread; locking asymmetry with `progress_failures` is correct design; overlaps S18 |

## Scoring Guide
- **Sig** (1-10): Significance — how meaningful as "poorly engineered"?
- **Orig** (1-10): Originality — deep insight or surface observation?
- **Core** (1-10): Core Impact — affects gaming-resistant scoring?
- **Overall** (1-10): Combined assessment
