# Five Minutes — setup

Two files: `index.html` (the app) and `sw.js` (offline support).
The filename matters. GitHub Pages serves `index.html` automatically at the root
of your site; anything else would need the filename in the URL every time.

---

## Part 1 — Publish it (desktop browser, ~10 minutes)

Do this on a laptop, not the phone. The GitHub web interface is workable on
mobile but tedious.

### 1. Create the repository

1. Go to **github.com** and sign in.
2. Top right, click **+** → **New repository**.
3. **Repository name:** `five-minutes` (lowercase, no spaces — it becomes part of your URL).
4. Leave the description blank. Select **Public**.
5. Do **not** tick "Add a README file".
6. Click **Create repository**.

> **Why public:** GitHub Pages on a free account only publishes from public
> repositories. This makes the *app code* public. It does **not** make your
> entries public — those live in your phone's browser storage and are never
> transmitted anywhere. If publishing the code bothers you, see Part 4.

### 2. Upload the files

1. On the new empty repository page, click the **uploading an existing file** link
   (in the "Quick setup" box).
2. Drag both `index.html` and `sw.js` into the drop zone.
3. Scroll down. In the "Commit changes" box, leave the default message.
4. Click **Commit changes**.

### 3. Turn on Pages

1. Click the **Settings** tab (top of the repository, gear icon).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, set the first dropdown to **main** and the second to **/ (root)**.
5. Click **Save**.
6. Wait 1–2 minutes, then reload the Settings → Pages screen. A green banner
   appears with your live URL.

Your URL will be:

```
https://YOUR-USERNAME.github.io/five-minutes/
```

If you get a 404, wait another two minutes and hard-reload. First publish is
sometimes slow; subsequent ones are near-instant.

### 4. Install it on the phone

1. Open that URL in **Chrome on Android**.
2. Tap the **⋮** menu, top right.
3. Tap **Add to Home screen** (or **Install app** — Chrome uses both labels).
4. Confirm.

The icon lands on your home screen. Opening it launches the journal full-screen
with no address bar and no browser chrome — that is the manifest doing its job.
The status bar tint follows the day/dusk skin.

### 5. Verify before you trust it

Do this once, deliberately:

1. Open from the home-screen icon. Type something into the first gratitude field.
2. Close it completely (swipe it out of the recents list).
3. Reopen. Your text should still be there.
4. Tap **Back up**. Confirm a file lands where you expect.

If step 3 fails, stop and tell me. It should not fail on this deployment path,
but "should not" is not "verified".

---

## Part 2 — Updating it later

When I send you a revised `index.html`:

1. Open your repository on github.com.
2. Click the existing `index.html` in the file list.
3. Click the **pencil** icon (Edit this file), then select all and delete.
4. Paste the new contents. Click **Commit changes**.

Or simpler: **Add file → Upload files**, drag the new `index.html` in, and commit.
GitHub will overwrite the old one. Changes go live in about a minute.

Your entries are untouched by updates. They live in browser storage keyed to
your Pages URL, not in the file.

---

## Part 3 — Backups

**Google Drive is the right destination.** It cannot host the app (Google shut
that feature down in 2016) but it is entirely sound as a place to keep backup
files.

**Tap "Back up"** and Chrome opens the Android share sheet. Choose **Save to
Drive**. Pick a folder — make one called `Five Minutes` the first time. This
writes a dated JSON file, e.g. `five-minutes-backup-2026-08-06.json`. That is
the file **Restore** reads.

**"Export as text"** produces a Markdown file instead — readable in any text
editor, formatted for actually re-reading years from now. Keep these too, but
they are for you, not for the app: Restore cannot read them.

**Cadence:** the app nudges you after seven entries without a backup. Once a
month is fine. It takes four taps.

**Restoring:** tap **Restore**, pick a backup JSON. It merges rather than
overwrites — it adds days you don't have and fills empty sections, and never
touches an entry that already has words in it. Safe to run against a populated
journal.

---

## Part 4 — If a public repository bothers you

Two alternatives, in order of how much I'd recommend them:

**Netlify Drop** — go to `app.netlify.com/drop`, drag the folder containing both
files onto the page. You get a live https URL in about twenty seconds, no
account required to start, no repository, nothing public but the URL itself
(which is unguessable). Downside: no version history, and updating means
re-dragging.

**GitHub Pro** — €4/month, allows Pages from private repositories. Only worth it
if you already want the other Pro features.

Both are genuine options. I'd start with GitHub Pages, because a public repo
containing a gratitude journal's *source code* is not a meaningful exposure, and
the version history is quietly useful when we iterate.

---

## What is actually stored where

| Thing | Location | Survives phone loss? |
|---|---|---|
| App code | GitHub / Netlify | Yes |
| Your entries | Chrome storage on your phone | **No** |
| Backup JSON | Wherever you save it (Drive) | Yes, if you make them |

The middle row is the whole reason the backup buttons exist.
