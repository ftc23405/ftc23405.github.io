# Sponsor logos

Seven sponsors, all present, each linking to its own site.

| File | Sponsor | Links to | Source |
|---|---|---|---|
| `polymaker.png` | Polymaker | polymaker.com | official logo |
| `numurus.png` | NEPI by Numurus | numurus.com | official NEPI logo, background keyed out, wordmark recoloured from white |
| `digitech-labs.png` | Digitech Labs | digitechlabs.com | official logo |
| `fabworks.png` | Fabworks | fabworks.com | official logo |
| `stem-bridge-foundation.png` | STEM Bridge Foundation | stembridgefoundation.org | official logo, background keyed out |
| `sendcutsend.svg` | SendCutSend | sendcutsend.com | official logo, recoloured from white |
| `microsoft.png` | Microsoft | microsoft.com | from DECODE portfolio p.17, background keyed out |

`microsoft.png` is the only one not from official artwork — it was lifted from a 200&nbsp;DPI
page render of the portfolio, so it's lower fidelity. Worth replacing if you can get the real
file.

If a logo file is missing, its tile falls back to the sponsor's name in text, taken from the
`alt` attribute. Nothing breaks; it just looks less polished.

`sendcutsend.svg` is the only SVG, and the only logo whose colour we changed. SendCutSend
publishes just a white-on-dark wordmark, which is invisible on the cream tile, so the single
path's `fill` is set to the site's ink (`#121014`) — the same weight Fabworks' black wordmark
already sits at. If they ever publish a black or full-colour version, prefer it over ours.

## Adding or replacing a logo

1. Save the file here. PNG with a transparent background is best (SVG works too — update `src`).
   600&ndash;700 px on the long edge is plenty.

   **An SVG needs that long edge too.** The tile sets `width: auto`, so an image renders at its
   intrinsic size unless `max-width`/`max-height` reins it in. The PNGs are ~700 px wide and get
   capped down to the tile; SendCutSend's SVG ships at `width="150"`, which would have rendered
   at 150 px — half the width of every other wordmark. Its `width`/`height` are scaled to
   900&times;162 against an unchanged `viewBox` to put it on the same footing.
2. Update the `<img>` in **both** `index.html` and `sponsor.html`:
   - `src` and `alt` (the `alt` text is what the text fallback uses)
   - `width` and `height` set to the file's **real** pixel size, or the tile shifts as it loads
3. Wrap it in `<a href="..." target="_blank" rel="noopener">` so it links out.

### Removing a white background

If a logo arrives opaque on white, which method to use depends on the artwork:

- **Flat wordmark** (Fabworks): key out every near-white pixel globally. The enclosed counters
  in letters like `a` and `o` *should* go transparent so the tile shows through. Keep solid ink
  fully opaque and only feather near-white pixels, or coloured details wash out — Fabworks' blue
  period would have gone semi-transparent otherwise.
- **Artwork containing white** (Digitech Labs, STEM Bridge Foundation): do *not* key globally.
  Digitech's head silhouette has white detail inside it, and the STEM Bridge emblem is two white
  figures cut out of an orange/green ring — a global key punches holes straight through the
  middle of both. Flood-fill inward from the image border instead, so only background-connected
  white is removed. STEM Bridge also arrives on a *cool* near-white (#f9fafa) rather than pure
  white, and with a wide blank margin worth cropping off before export.

Look at the logo before picking. Getting this backwards is not subtle.

## Layout

The row is flexbox, not a fixed grid, so it wraps with the last row centred and handles any
number of sponsors without a CSS change. Each tile is `flex: 1 1 270px; max-width: 340px`,
which lands at about three per row on desktop and one per row on a phone.

A logo whose artwork is a circular or portrait badge rather than a wordmark should get
`class="sponsor sponsor--badge"` on its `<li>`. At the plain 72px cap a portrait badge is
height-bound and collapses to about a quarter of a wordmark's width —
`stem-bridge-foundation.png` rendered 67px wide before it got the class.

The modifier raises that logo's cap to 102px, and the tile `min-height` of 152px is what pays
for it. Tiles are `border-box`, so the shared `1.4rem` padding leaves exactly 102px of usable
height inside — the badge fills that with the same breathing room every other logo gets, and
no tile ends up taller than its neighbours. **The cap and the min-height go together:** raise
the cap alone and the badge's row grows deeper than the wordmark row; the strip stops looking
uniform, which is the whole thing the shared cap exists to prevent. Trimming just that tile's
padding lines the rows back up but makes the badge sit edge to edge, cramped against airy
wordmarks. Change one number, recheck the other.

That 270px basis matters: on narrower tiles, wide wordmarks get squeezed to roughly 35 px tall
and taglines stop being readable. Rendered height is capped at 72 px for wordmarks and 102 px
for badges, which is what lands the two shapes at a similar visual weight while every tile
stays 152 px tall.
