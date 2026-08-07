# Five Minutes — a personal gratitude journal

## What this is

A single-file web app. A morning/evening journaling practice with a rotating
bank of literary passages. Used daily by the owner on Android/Chrome,
installed to the home screen from GitHub Pages.

It reads as a page, not a form (the "v2" restructure): a cold start opens on the
day's passage alone (the **arrival gate**); the writing surface is Foolscap —
text on hairline rules, no boxes; only the time-appropriate **section** is
open (morning before 17:00, evening after); a fully written day shows a
**completion** state instead of the form; and the evening reflection **dissolves**
into a quiet marker when the day is closed. See "Structure" below.

**Files:**

| File | Role |
|---|---|
| `index.html` | The entire app — markup, CSS, JS, and the passage bank. Self-contained. |
| `sw.js` | Service worker. Offline shell. Only active over https. |
| `SETUP.md` | Deployment and backup instructions for the owner. |

Filenames are load-bearing. `index.html` is what GitHub Pages serves at the site
root. Do not rename it.

## Deployment

GitHub Pages, public repository, served over https. Installed as a PWA via
Chrome's "Add to Home screen". Never opened from the Android Files app — see
"Storage" below for why.

## The owner

Windows / Android / Chrome. Not a developer, does not use a terminal, does not
want to. Explain in prose, not in commands. When git operations are needed, run
them; don't hand over commands to type.

Wants reasoning exposed, disagreement stated plainly, and no flattery. If a
request rests on a wrong premise, say so directly and explain why before doing
anything else.

## Structure — the entry screen

- **One resolver.** `resolveView(dateKey, now, data, sessionState)` is a **pure**
  function returning `{ gate, completion, morningOpen, eveningOpen }`. It has no
  DOM, no globals, and no `new Date()` inside — the clock is injected — so it is
  unit-tested directly. `renderEntry()` only consumes what it returns.
- **`applyView()` is the only path that recomputes the view** — boot and date
  changes call it. A plain Browse↔Entry switch, a section toggle, and the
  dissolve do **not** re-resolve (a targeted DOM update instead), so nothing can
  reactively flip the page — e.g. Close the day dissolves without yanking into
  completion.
- **Session state is not persisted:** `sessionState = { arrivedFor, reopenedFor,
  expanded }`. `arrivedFor` / `reopenedFor` hold the *dateKey* they apply to (not
  bools) so a midnight rollover re-gates / re-resolves; `expanded` holds manual
  section tap-expansions, keyed by date.
- **Arrival gate:** cold start on today shows only date + passage (`.app.gated`
  hides the chrome — but **not** the storage banner). `Begin` (a real button) or
  a tap dismisses. `prefers-reduced-motion` still shows the gate, just instantly.
- **Time-aware sections** share `DUSK_FROM` with the skin, so the two boundaries
  can never drift. A collapsed section is one tappable line; expanding flushes
  autosave first.
- **Completion** keeps the chrome (unlike the gate); `Reopen today` restores the
  editable view.
- **The dissolve** (evening `#improve` only) fires from `Close the day` **only**,
  never autosave, and only after a verified write: `commit → check storageOK &&
  !persistFailed → then animate`. On failure it does not animate. A written
  reflection renders as the `written` marker; Browse and the Markdown export keep
  it in full.
- **Test seam:** the script exposes `window.__fm` only when a harness sets
  `window.__FM_ALLOW_TEST__` before load — inert in the shipped file.

## Hard-won constraints — do not relearn these

### Storage
- `localStorage` behaviour is **undefined for `file:` origins** per spec, and
  Android's Files app hands Chrome a `content://` URI where writes silently
  no-op. The app therefore probes storage on boot and shows a red banner if it
  isn't working. **Never remove that probe.** A journal that appears to save and
  doesn't is worse than one that refuses to open.
- Autosave is debounced at 500ms, and flushes on `pagehide`, on
  `visibilitychange`, and before any date or view change — including a section
  collapse/expand and the arrival dismissal. The `Close the morning` /
  `Close the day` buttons are ritual, not mechanism. Don't make persistence
  depend on a tap.
- There is **no streak** — removed deliberately (a compliance device that
  manufactures loss aversion; wrong register for this app). Do not reintroduce a
  counter, badge, or progress ring. `entryHasContent()` stays: Browse, export,
  the backup nudge, and the completion check all use it.

### Backups
- Export (JSON), Markdown export, and Restore all exist because the browser
  holds the only copy. Restore **merges** — it fills gaps and never overwrites an
  entry that already has content. Preserve that behaviour.
- Backup files must never be committed. See `.gitignore`. If a backup lands in
  this folder it contains the owner's private journal entries and the repository
  is public.

### The passage bank
- 105 entries, split morning/evening, in a `BANK` array inside `index.html`.
- **Every attribution must be verified against a primary or scholarly source
  before it goes in.** A previous session added five bad entries while narrating
  its own rigour: a fabricated Marcus Aurelius line, a Chapin quotation credited
  to Gibran, a verbatim copyrighted Robert Bly translation labelled as an
  original rendering, a miscited Analects chapter, and a "Japanese proverb" with
  no Japanese source. Assume recall is unreliable here. Search, cite, then add.
- Copyright rule: public-domain translations may be quoted verbatim with the
  translator and date named. Modern translations may not — write an original
  rendering and label it "after [author]". Never label a verbatim copyrighted
  translation as a rendering.
- Rotation is a **deterministic shuffle bag**, not a hash modulo pool size. Every
  entry appears once before any repeats; the same date always yields the same
  passage; a seam guard prevents collisions across deck boundaries. Do not
  replace this with a simpler hash — that was the original bug.

### Typography and licensing
- Fraunces (display **and the owner's entry text** — the page reads as writing),
  Mukta (UI, section micro-labels), IBM Plex Mono (eyebrows, mono labels). All
  open-licensed. If Fraunces ever reads poorly for entry text on a phone at low
  light, the sanctioned fallback is Mukta at the same size — say so if you switch.
- Mukta is SIL OFL and covers Devanagari — deliberate, since the bank contains
  Urdu and Sanskrit material that may one day be shown in original script.
- **Do not introduce commercial webfonts.** Skolar, Akkurat, and Akhand were
  considered and rejected: pageview-metered licences, and this is a public URL.

### Skins
- Two palettes, `[data-skin="day"]` and `[data-skin="dusk"]`, driven by clock
  (dusk 17:00–04:59) with a persisted three-state manual override (Auto/Day/Dusk).
  The section-open boundary reuses the same `DUSK_FROM` constant — one moment.
- Every text pair in both skins clears WCAG AA (4.5:1). Re-check contrast
  arithmetically after any palette change — don't eyeball it. (`test/contrast.mjs`
  does this.) Foolscap removed the panel fills, so text now sits on `--paper`;
  day `--gold` was darkened to `#7C5E28` to keep the couplet attribution at
  4.89:1 on paper. Don't restore the brighter gold — it fails AA there.
- `theme-color` meta updates with the skin so the Android status bar tracks it.

### Accessibility
- Do not add `maximum-scale` to the viewport meta. Pinch-zoom must work.

## How to work on this

1. **Plan first.** Describe the change in prose and wait for agreement before
   editing, especially for anything touching storage, dates, or the bank.
2. **Test before claiming done.** Tests live in `test/` (gitignored; Node +
   jsdom, loaded via `test/harness.mjs`, which flips `__FM_ALLOW_TEST__` to reach
   `window.__fm`). They cover the arrival gate, time-aware sections, completion,
   the dissolve sequence, `resolveView` purity, autosave + flush, the export
   cascade's six outcomes, restore merge, storage failure, skin at several times
   of day, and search. Run `node <file>.test.mjs` per file (each exits cleanly).
   Write the test, run it, report the real output. Do not report success from
   inspection — that is how a silent backup failure once survived.
3. **Verify, don't assert.** Especially citations, product facts, and licences.
4. **Commit at meaningful points** and say what the checkpoint covers, so the
   owner can ask to return to it later.
