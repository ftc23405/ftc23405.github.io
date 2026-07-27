# Sponsor logos

Five sponsors, each linking to its own site.

| File | Sponsor | Links to | Status |
|---|---|---|---|
| `polymaker.png` | Polymaker | polymaker.com | official logo |
| `numurus.png` | Numurus | numurus.com | official logo |
| `digitech-labs.png` | Digitech Labs | digitechlabs.com | official logo |
| `microsoft.png` | Microsoft | microsoft.com | from DECODE portfolio p.17, background keyed out |
| `fabworks.png` | Fabworks | fabworks.com | **missing — add this** |

Until `fabworks.png` exists, that tile shows the word "Fabworks" in text instead of a logo.
Nothing breaks; it just looks less polished.

`microsoft.png` was lifted from a 200&nbsp;DPI page render of the portfolio, so it's lower
fidelity than official artwork would be. Worth replacing if you can get the real file.

## Adding or replacing a logo

1. Save the file here. PNG with a transparent background is best (SVG works too — update `src`).
   600&ndash;700 px on the long edge is plenty.
2. Update the `<img>` in **both** `index.html` and `sponsor.html`:
   - `src` and `alt` (the `alt` text is what the text fallback uses)
   - `width` and `height` set to the file's **real** pixel size, or the tile shifts as it loads
3. Wrap it in `<a href="..." target="_blank" rel="noopener">` so it links out.

If a logo arrives with a white background instead of transparency, don't just key out every
white pixel — logos often contain white *inside* the artwork (Digitech Labs has white detail
inside the head silhouette, and naive keying punches holes in it). Flood-fill inward from the
image border so only background-connected white is removed.

## Layout

The row is flexbox, not a fixed grid, so it wraps with the last row centred and handles any
number of sponsors without a CSS change. Each tile is `flex: 1 1 270px; max-width: 340px`,
which lands at about three per row on desktop and one per row on a phone.

That 270px basis matters: on narrower tiles, wide wordmarks get squeezed to roughly 35 px tall
and taglines (like Numurus' "SMART SYSTEM SOLUTIONS") stop being readable. Rendered height is
capped at 72 px, so square marks and wide wordmarks end up at a similar visual weight.
