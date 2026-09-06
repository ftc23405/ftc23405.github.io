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
robots.html                    robots, highlights, engineering process
awards.html                    award timeline
impact.html                    outreach + teams we've mentored
industry.html                  industry connections
sponsor.html                   sponsors and sponsorship info
contact.html                   contact and socials

assets/css/style.css           all styling, brand colors defined at the top
assets/js/main.js              nav, scroll effects, counters, image fallbacks
assets/img/logo.svg            vector fallback if logo.png is missing
assets/img/favicon.ico         tab icon (16/32/48/64, from the real logo)
assets/img/sponsors/           sponsor logos — see the README in that folder
.nojekyll                      tells GitHub Pages to serve files as-is
```

### Images

| File | What it is | Source |
|---|---|---|
| `logo.png` | real team logo, 512&times;512, transparent | `Crash Out Logo Final.png`, cropped square |
| `logo.svg` | vector fallback if `logo.png` is ever missing | hand-drawn approximation |
| `favicon.ico`, `favicon-32.png`, `icon-192.png` | tab and home-screen icons | generated from `logo.png` |
| `apple-touch-icon.png` | 180&times;180 home-screen icon | same source as `logo.png` |
| `robot-decode.jpg` | DECODE 2025&ndash;26 robot | team photo |
| `robot-itd.jpg` | INTO THE DEEP 2024&ndash;25 robot | ITD portfolio, page 1 |
| `outreach-*.jpg` | the three outreaches on the Impact page | both portfolios |
| `teams-*.jpg` | mentored-team photos on the Impact page | both portfolios |
| `industry-*.jpg` | Industry Connections page | DECODE portfolio, page 15 |
| `sponsors/polymaker.png` | official Polymaker logo | supplied by the team |
| `sponsors/numurus.png` | official Numurus logo | supplied by the team |
| `sponsors/digitech-labs.png`, `microsoft.png` | logos with the page background keyed out | DECODE portfolio, page 17 |
| `sponsors/stem-bridge-foundation.png` | official STEM Bridge Foundation logo, background keyed out | stembridgefoundation.org |
| `sponsors/sendcutsend.svg` | official SendCutSend wordmark, recoloured from white to site ink | sendcutsend.com |

If a sponsor logo file is ever missing, that tile falls back to the sponsor's name in text —
nothing breaks.

### The nav is duplicated on every page

There's no build step, so the `<header class="nav">` block and the `<footer>` block are copied
into each of the eight pages. **If you change a nav or footer link, change it in all eight** —
in both the `.nav__links` and the `.footer__nav` list.

The nav collapses to a burger menu below **1080px**, not the more usual 900px, because seven
tabs including "Industry Connections" need that much room. If you add another tab, re-check
that width.

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

## Each new season: the only places that change

The site is deliberately written so that almost nothing outside `impact.html` refers to a
specific season. When a season ends, you should only need to touch these:

| Where | What |
|---|---|
| `robots.html` | Add one `<article class="season">` at the top for the new robot. Change the previous entry's badge from *"20XX&ndash;XX season"* — the badges are dated, not "current"/"previous", so nothing goes stale on its own. |
| `awards.html` | Add a `<li class="timeline__item">` per new award, and bump the `.awardgrid` count tiles. |
| `index.html` | The `.badge-card` headline award, and two `data-count` tiles: **Seasons competed** and **Awards won**. |
| `impact.html` | Outreach and mentorship for the new season, each tagged with its year. Update the `.reachbar` numbers. |

Everything else — About, Industry Connections, Sponsor Us, Contact Us — is written to stay true
year over year. **If you find yourself editing those for a season change, that's a bug in the
copy; rewrite the sentence to be season-neutral instead.**

Two specific traps:

- Don't write team size or grade levels ("eight 9th graders"). The site says "high school
  students" on purpose.
- Don't write counts that grow ("three awards across three seasons"). Say "every award we've
  won" and let the list be the source of truth.

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
- the `.badge-card` headline award in the hero of `index.html`

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

### Adding a season to the Robots page

Each season is one `<article class="season">` holding a photo and two highlight columns
(mechanical, software). Copy the newest one, put it at the top, and swap in the photo, the
result line, and the bullets. Add `season--alt` to alternate which side the photo sits on —
the existing two alternate, so keep that going.

Only the **final** robot for each season is shown, on purpose. The blow-by-blow league-meet
progression lives in the engineering portfolio, not here.

### A note on the grid CSS

`.grid--about` and `.grid--reach` are 6-column grids whose children use `grid-column: span N`.
When they collapse at narrow widths, the media query has to repeat the *two-class* selectors
(e.g. `.grid--reach .rcard--feature`) when resetting `grid-column: auto`. Overriding only
`.grid--reach > *` loses the specificity contest, and the leftover `span 6` silently
re-creates six columns on mobile. There are comments in the CSS at both spots.

### Adding photos

Wrap the image in a figure so it picks up the border and rounding:

```html
<figure class="rcard__photo">
  <img src="assets/img/your-photo.jpg" alt="Describe what's happening"
       loading="lazy" width="512" height="384">
</figure>
```

Always set `width` and `height` to the file's real pixel size — without them the page jumps
as images load. Resize and compress before committing; aim for under 250 KB each and no more
than about 1400 px on the long edge.

---

## Accessibility notes

Please keep these intact when editing:

- Every image needs a real `alt` describing what it shows.
- Section headings step down in order (`h2` → `h3` → `h4`); don't skip levels for looks.
- `alt=""` is correct only for purely decorative images (the nav logo, which sits next to the
  team name in text). Every photo needs a real description.
- The site respects `prefers-reduced-motion` — animations and counters go static for users
  who ask for that. Don't add motion that ignores it.

---

*FIRST*®, *FIRST*® Tech Challenge, DECODE™ and INTO THE DEEP™ are trademarks of *FIRST*®,
which is not affiliated with this site.
