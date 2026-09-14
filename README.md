# Micro Nano Devices Engineering 
## and Metamaterial Engineering Laboratory @ UCLA — Website

This is the source for the lab's website

## The two-folder rule

This project is split into exactly two folders:

- **[`website-content/`](website-content/README.md) — edit this.** Every
  page's text and photos live here, organized one folder per page. This is
  the only folder someone without coding experience should ever need to
  open. **Start with [`website-content/README.md`](website-content/README.md)**
  for a plain-language walkthrough.
- **`website-settings/` — don't touch it manually.** This holds all the site's code
  and configuration (design, layout, build tooling, `package.json`, etc.).
  Changing anything in here requires code and can break the site — that's a
  job for a developer (or hand this repo to Claude Code with a description
  of what you want changed).

```
dspace-ucla/
├── website-content/      ← ALL editable text + images, one folder per page
│   ├── homepage/
│   ├── research/
│   ├── team/
│   ├── publications/
│   ├── contact/
│   └── virtual-lab-tour/
│
└── website-settings/     ← site code and configuration — do not edit
    ├── app/                    (pages, components, styling)
    ├── public/                 (favicon, logo, and technical asset wiring)
    ├── content.config.ts       (defines what fields each content file must have)
    ├── nuxt.config.ts          (site configuration)
    └── package.json            (project setup)
```

---

## 1. Editing text, photos, or the publications list

Open **[`website-content/README.md`](website-content/README.md)** — it's
written for someone with no coding background and walks through exactly
where to click and what to change for every page.

Quick map of what lives where inside `website-content/<page>/`:

```
<page>/
├── text/      → titles, paragraphs, names, publication entries (.md / .yml files)
└── images/    → the photos for that page
```

Two kinds of text files:

- **`.md` files** (Markdown) — a page's title/subtitle and any longer text
  (like a bio or paragraph). The block between `---` lines at the top is a
  list of `field: value` pairs; anything below the second `---` is the
  paragraph text itself.
- **`.yml` files** (YAML) — lists of things (photos, publications, logos).
  Each item starts with a `- ` (dash + space).

Copy the pattern of an existing entry, paste it, and edit the values —
keeping the indentation (the spaces at the start of each line) the same as
the entries around it.

---

## 2. Making the change

You have two options:

### Option A — Edit directly on GitHub (no coding tools needed)
1. Go to the repository on github.com and open the file you want to change.
2. Click the pencil icon ("Edit this file").
3. Make your edit, then scroll down and choose **"Create a new branch and
   start a pull request"**, then click **Propose changes**.
4. This opens a pull request — a developer (or Netlify's automatic preview,
   see below) can review it before it goes live.

### Option B — Edit locally and preview before publishing
Requires [Node.js](https://nodejs.org) **v22** installed — the same version
Netlify builds with (set in `netlify.toml`). Using the same version locally
means "it worked on my machine" also means "it will work on Netlify".

```bash
# the project's code and build tooling live in website-settings/, so run
# these commands from there — even though the files you're editing are in
# website-content/, one level up
cd website-settings

# one-time setup — installs the exact dependency versions from package-lock.json
npm ci --legacy-peer-deps

# start a local preview at http://localhost:3000 — updates live as you save files
npm run dev
```

> **Why `npm ci --legacy-peer-deps` and not `npm install`?** See
> [Section 5](#5-dependencies-and-the-lock-file). Short version: it installs
> the exact tested versions, and the flag works around a known npm bug in
> this project's dependency tree. Use this same command every time.

Leave `npm run dev` running, edit files in `website-content/`, and check
`http://localhost:3000` in your browser. Press `Ctrl+C` in the terminal to
stop it.

---

## 3. Deploying an update, step by step

The site is fully static (no server or database at runtime), so a deploy is
just: Netlify rebuilds the folder of HTML/CSS/JS files and starts serving the
new one.

**You do not run a "deploy" command.** Deploys are triggered by pushing to
GitHub. The whole workflow is below.

### The everyday workflow (content changes)

**Step 1 — Make your edit.** Change the files you need in
`website-content/`. If you edited on GitHub directly (Option A above),
skip to Step 5.

**Step 2 — Preview it locally.** From `website-settings/`:

```bash
npm run dev
```

Open `http://localhost:3000` and confirm the change looks right. `Ctrl+C`
to stop.

**Step 3 — Do a real build.** `npm run dev` is more forgiving than the real
build, so always run this before pushing. It catches things like a typo in a
`.yml` file or a missing image that `dev` would let slide:

```bash
npm run generate
```

If this fails, **fix it before pushing** — the exact same command is what
runs on Netlify, so a failure here is a failed deploy there.

**Step 4 — Check the built site.** `npm run generate` only proves it built,
not that it looks right:

```bash
npm run preview
```

**Step 5 — Commit and push.**

```bash
git add -A
git commit -m "Update team page photos"   # describe what you changed
git push
```

**Step 6 — Watch the deploy.** Open the
[Netlify dashboard](https://app.netlify.com) → your site → **Deploys**. The
newest deploy shows "Building", then "Published" (usually 2–5 minutes). If it
says "Failed", click it to read the log — see
[Section 6](#6-when-a-deploy-fails).

**Step 7 — Confirm on the live site.** Load the real URL and hard-refresh
(`Cmd+Shift+R` / `Ctrl+Shift+R`) so you're not looking at a cached copy.

### Pull requests get a free preview

If you push a branch and open a pull request instead of pushing straight to
`main`, Netlify builds it and posts a **Deploy Preview** link on the PR — a
complete copy of the site with your change, at a temporary URL. This is the
safest way to review a big change, and it's the recommended route for anyone
editing through GitHub's web interface.

### What Netlify actually runs

All of this is already configured in `netlify.toml` at the project root —
you should not need to type any of it into the Netlify dashboard:

```
Base directory:      website-settings
Build command:       npm ci --legacy-peer-deps && npm run generate
Publish directory:   dist
Node version:        22
```

> **Don't "correct" the publish directory to `.output/public`.** Locally,
> `npm run generate` writes the site to `.output/public`. On Netlify it does
> not: Nitro detects the platform and switches to its `netlify-static`
> preset, which writes to `dist` instead. `dist` is correct in both places,
> because a local build also leaves a `dist` symlink pointing at
> `.output/public`. Using `.output/public` here makes the build *succeed* and
> then fail at the very last step with "Deploy directory does not exist".

If the site is not connected to Netlify yet:

1. In the [Netlify dashboard](https://app.netlify.com), click **Add new
   site → Import an existing project**, and pick this repository.
2. Netlify reads `netlify.toml` automatically — leave the build fields blank.
3. Click **Deploy**. Every push to the main branch redeploys automatically
   from then on.

### Rolling back a bad deploy

You do **not** need to fix the code to get the old site back. In the Netlify
dashboard → **Deploys**, find the last good deploy, open it, and click
**Publish deploy**. The previous version is live again within seconds. Then
fix the problem properly and push a normal update.

### One-off manual deploy (rare)

If GitHub or the automatic build is unavailable, you can upload a build by
hand: run `npm run generate`, then drag the resulting
`website-settings/.output/public` folder onto
[app.netlify.com/drop](https://app.netlify.com/drop).

---

## 4. Deploy checklist

Before pushing a content change:

- [ ] `npm run generate` completes without errors
- [ ] `npm run preview` looks correct
- [ ] New images are inside the right `website-content/<page>/images/` folder
- [ ] `git status` shows only files you meant to change
- [ ] If `package.json` or `package-lock.json` changed, **both** are committed
      together (see Section 5)

---

## 5. Dependencies and the lock file

This section matters to whoever maintains the code. If you only edit text and
photos, you can skip it.

### `package-lock.json` is committed on purpose

`website-settings/package-lock.json` records the exact version of all ~1,300
packages the site is built from. It **must stay committed**. Previously it was
ignored by git, which meant every Netlify deploy re-resolved dependencies from
scratch and could quietly pick up a newer version than anyone had tested — so
the site could break with no change to the repo. Committing it makes builds
reproducible: Netlify builds from the same versions you built from.

Rules:

- **Never** add `package-lock.json` to `.gitignore`.
- **Never** delete it to "fix" an install problem.
- When it changes, commit it **in the same commit** as the `package.json`
  change that caused it.

### Always install with `npm ci --legacy-peer-deps`

| Command | What it does |
|---|---|
| `npm ci --legacy-peer-deps` | ✅ Installs exactly what's in the lock file. Never changes it. **Use this.** |
| `npm install` | ⚠️ May silently upgrade packages and rewrite the lock file. |

**Why the `--legacy-peer-deps` flag is needed:** `nuxt` depends on
`@bomb.sh/tab`, which declares `cac` and `commander` as *optional* peer
dependencies. npm (both v10 and v11) mishandles these — it writes a
`package-lock.json` that it then refuses to install, so a plain `npm ci`
fails with `EUSAGE ... lock file's cac@7.0.0 does not satisfy cac@6.7.14`.
The flag tells npm to skip peer-dependency resolution, which avoids the bad
result. Those packages are only used for shell autocompletion in the Nuxt
CLI, so nothing the website needs is affected. Worth re-testing without the
flag after a future `nuxt` upgrade.

### Updating dependencies deliberately

Treat this as its own task with its own commit — never bundle it with a
content change.

```bash
cd website-settings

npm outdated                       # see what's behind
npm audit                          # see known vulnerabilities

npm install <package>@<version>    # update one package at a time
npm run generate                   # MUST still build
npm run preview                    # MUST still look right

git add package.json package-lock.json
git commit -m "Update <package> to <version>"
```

Update **one package per commit** so that if something breaks you know
exactly what caused it and can revert just that commit.

Current known-outdated packages needing major-version upgrades (each is a
potential breaking change, so do them one at a time, on a branch, and review
the Deploy Preview): `@nuxt/ui` 3→4, `@nuxt/image` 1→2, `@nuxt/icon` 1→2,
`@nuxtjs/sitemap` 7→8, `nuxt-schema-org` 4→6, `vue-router` 4→5,
`better-sqlite3` 12→13, `typescript` 5→7. Upgrading `@nuxt/image` also
clears the three remaining high-severity advisories (`ipx`, `sharp`).

---

## 6. When a deploy fails

Netlify shows "Failed" and keeps the **previous version live** — a failed
build never takes the site down. Click the failed deploy to read the log.

| What the log says | What it usually means |
|---|---|
| `Deploy directory ... does not exist` | The build itself worked — only the publish path is wrong. It must be `dist`, not `.output/public` (Section 3). |
| `EUSAGE ... does not satisfy` | The `--legacy-peer-deps` flag is missing from `netlify.toml` (Section 5). |
| An error naming a `.yml` or `.md` file | A formatting mistake in that content file — usually wrong indentation or a missing `- `. Check it against a working entry nearby. |
| `Cannot find module` / `ENOENT` | A file or image being referenced doesn't exist at that path. Check spelling and capitalization — Netlify's Linux servers are case-sensitive even though macOS is not. |
| Build works locally but fails on Netlify | Usually a file that exists on your machine but was never committed. Run `git status` and check nothing needed is untracked. |

The fastest recovery is always: **roll back first** (Section 3), investigate
after.

---

## 7. Getting help

- **Content edits** (text, photos, publications, team members): see
  [`website-content/README.md`](website-content/README.md) — no developer
  needed.
- **Design/layout changes, new pages, or new content fields**: these live in
  `website-settings/app/` (Vue components and pages) and
  `website-settings/content.config.ts` (the schema each content file must
  follow) — ask a developer, or hand this repo to Claude Code with a
  description of what you want changed.
