# ftc23405.github.io

The website for **FIRST Tech Challenge Team 23405 — Crash Out!** (Redmond, WA).

Live at **https://ftc23405.github.io**

Plain HTML, CSS, and JavaScript. No build step, no dependencies, no framework — you can edit
any file and see the change by refreshing the browser.

---

## Files

```
index.html                     home
about.html                     the team, principles, mentors, goals
robots.html                    DECODE robot, subsystems, process, software
awards.html                    award timeline
impact.html                    outreach
sponsor.html                   sponsors and sponsorship info
contact.html                   contact and socials

assets/css/style.css           all styling, brand colors defined at the top
assets/js/main.js              nav, scroll effects, counters, tabs, accordion
assets/img/logo.svg            vector fallback team mark
assets/img/favicon.svg         tab icon
assets/img/sponsors/           sponsor logos — see the README in that folder
.nojekyll                      tells GitHub Pages to serve files as-is
```

### ⚠️ Add the real logo

The nav loads `assets/img/logo.png`. **That file is not in the repo yet** — until you add it,
the site falls back to `assets/img/logo.svg`, which is a simplified vector approximation
(circle, gradient, three bolts) without the "CRASH OUT!" lettering or the drivetrain `H`.

To fix: save the real team logo as **`assets/img/logo.png`** (square, transparent background,
about 512&times;512 px). Everything picks it up automatically — nav on all seven pages, plus
the Apple touch icon.

### The nav is duplicated on every page

There's no build step, so the `<header class="nav">` block and the `<footer>` block are copied
into each of the seven pages. **If you change a nav or footer link, change it in all seven.**

The current page is marked with `aria-current="page"` on its own link — that single attribute
drives both the highlight styling and screen-reader announcement, so keep it accurate and only
put it on one nav link per page.

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

Awards live in `awards.html` as `<li class="timeline__item">` blocks. Copy the newest one, put
it at the top of the `<ol class="timeline">`, and edit the date, title, event, and description.
Two other places show the same awards — update them too:

- the `.awardgrid` count tiles at the top of `awards.html`
- the three `.badge-card` blocks in the hero of `index.html`

Verified award data comes from https://ftcscout.org/teams/23405

### Adding an outreach event

In `impact.html`, copy any `<article class="rcard">` block and edit it. Add `rcard--feature` to
the class list if you want the wide highlighted treatment used for the India outreach.

### Adding a sponsor

1. Drop the logo in `assets/img/sponsors/` — see that folder's README for naming and sizing.
2. Copy a `<li class="sponsor">` block and point `src` at the new file. The sponsor list appears
   on **both** `index.html` and `sponsor.html`.

### Adding a page

1. Copy the closest existing page as a starting point.
2. Add the new link to the `.nav__links` and `.footer__nav` blocks **in all pages**.
3. On the new page, put `aria-current="page"` on its own nav link and remove it from the others.

### Updating the robot for a new season

`robots.html` has two interactive pieces:

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
