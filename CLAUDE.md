# Five Minutes — a personal gratitude journal

## What this is

A single-file web app. A morning/evening journaling practice with a rotating
bank of literary passages. Used daily by the owner on Android/Chrome,
installed to the home screen from GitHub Pages.

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

## Hard-won constraints — do not relearn these

### Storage
- `localStorage` behaviour is **undefined for `file:` origins** per spec, and
  Android's Files app hands Chrome a `content://` URI where writes silently
  no-op. The app therefore probes storage on boot and shows a red banner if it
  isn't working. **Never remove that probe.** A journal that appears to save and
  doesn't is worse than one that refuses to open.
- Autosave is debounced at 500ms, and flushes on `pagehide`, on
  `visibilitychange`, and before any date or view change. The Save buttons are
  ritual, not mechanism. Don't make persistence depend on a tap.
- The streak counter requires at least one non-empty field. It must never count
  a blank save. Any change here needs a test.

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
- Fraunces (display), Mukta (UI/body), IBM Plex Mono (labels). All open-licensed.
- Mukta is SIL OFL and covers Devanagari — deliberate, since the bank contains
  Urdu and Sanskrit material that may one day be shown in original script.
- **Do not introduce commercial webfonts.** Skolar, Akkurat, and Akhand were
  considered and rejected: pageview-metered licences, and this is a public URL.

### Skins
- Two palettes, `[data-skin="day"]` and `[data-skin="dusk"]`, driven by clock
  (dusk 17:00–04:59) with a persisted three-state manual override (Auto/Day/Dusk).
- Every text pair in both skins clears WCAG AA (4.5:1). Re-check contrast
  arithmetically after any palette change — don't eyeball it.
- `theme-color` meta updates with the skin so the Android status bar tracks it.

### Accessibility
- Do not add `maximum-scale` to the viewport meta. Pinch-zoom must work.

## How to work on this

1. **Plan first.** Describe the change in prose and wait for agreement before
   editing, especially for anything touching storage, dates, or the bank.
2. **Test before claiming done.** There is a jsdom-based approach that has been
   used for autosave, streak integrity, export/import round-trips, storage
   failure, skin switching at multiple times of day, and panel structure. Write
   the test, run it, report the result. Do not report success from inspection.
3. **Verify, don't assert.** Especially citations, product facts, and licences.
4. **Commit at meaningful points** and say what the checkpoint covers, so the
   owner can ask to return to it later.
