# ftc23405.github.io

The website for **FIRST Tech Challenge Team 23405 — Crash Out!** (Redmond, WA).

Live at **https://ftc23405.github.io**

Plain HTML, CSS, and JavaScript. No build step, no dependencies, no framework — you can edit
any file and see the change by refreshing the browser.

---

## Files

```
index.html                     the entire site (one page, anchor-linked sections)
assets/css/style.css           all styling, brand colors defined at the top
assets/js/main.js              nav, scroll effects, counters, tabs, accordion
assets/img/favicon.svg         tab icon
assets/img/sponsors/           sponsor logos — see the README in that folder
.nojekyll                      tells GitHub Pages to serve files as-is
```

## Publishing

Because the repo is named `ftc23405.github.io`, GitHub Pages serves it at the root domain.

1. Push to the `main` branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*,
   branch `main`, folder `/ (root)`.
4. Wait about a minute, then load https://ftc23405.github.io

Every later push to `main` redeploys automatically.

## Working on it locally

Open `index.html` in a browser and it works. If you'd rather use a local server
(recommended, because it matches how GitHub serves the files):

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

---

## Editing content

### Brand colors

Everything visual comes from the variables at the top of `assets/css/style.css`:

```css
--cream:   #fdf0e6;   /* page background         */
--pink:    #ff3d9a;   /* gradient start          */
--magenta: #ef1d80;   /* links, accents, kickers */
--coral:   #ff8a5c;   /* gradient middle         */
--orange:  #f7943f;   /* content cards           */
--amber:   #ffcf4d;   /* gradient end            */
--ink:     #121014;   /* text and every border   */
```

Change one value and it updates everywhere on the site.

### Adding a new award

Awards live in the `#awards` section of `index.html` as `<li class="timeline__item">` blocks.
Copy the newest one, put it at the top of the `<ol class="timeline">`, and edit the date,
title, event, and description. The three hero badges near the top of the page
(`.hero__badge-stack`) list the same awards — update those too.

Verified award data comes from https://ftcscout.org/teams/23405

### Adding an outreach event

In the `#outreach` section, copy any `<article class="rcard">` block and edit it. Add
`rcard--feature` to the class list if you want the wide highlighted treatment used for the
India outreach.

### Adding a sponsor

1. Drop the logo in `assets/img/sponsors/` — see that folder's README for naming and sizing.
2. Copy a `<li class="sponsor">` block in the `#sponsors` section and point `src` at the new file.

### Updating the robot for a new season

The `#robot` section has two pieces:

- **Season tabs** (`#seasonTabs`) — one `<button role="tab">` plus one matching
  `<div class="tabs__panel">` per league meet. The button's `aria-controls` must match the
  panel's `id`, and every panel except the first needs the `hidden` attribute.
- **Subsystem accordion** (`#subsystems`) — one `<details class="acc">` per mechanism, with a
  `<div class="step">` per version. Add `step--final` to the version you actually competed with.

### Adding photos

The site is currently text-and-type only, which keeps it fast. To add a photo inside any card:

```html
<img src="assets/img/your-photo.jpg" alt="Describe what's happening" loading="lazy"
     style="border:2.5px solid var(--ink); border-radius:16px; margin-top:1rem;">
```

Compress photos before committing them — aim for under 300 KB each.

---

## Accessibility notes

Please keep these intact when editing:

- Every image needs a real `alt` describing what it shows.
- Section headings step down in order (`h2` → `h3` → `h4`); don't skip levels for looks.
- The tabs are keyboard-navigable with arrow keys, Home, and End. If you add a tab, keep the
  `role`, `aria-controls`, and `aria-selected` attributes consistent.
- The site respects `prefers-reduced-motion` — animations and counters go static for users
  who ask for that. Don't add motion that ignores it.

---

*FIRST*®, *FIRST*® Tech Challenge, and DECODE™ are trademarks of *FIRST*®, which is not
affiliated with this site.
