# Sponsor logos

Five sponsors, all present, each linking to its own site.

| File | Sponsor | Links to | Source |
|---|---|---|---|
| `polymaker.png` | Polymaker | polymaker.com | official logo |
| `numurus.png` | Numurus | numurus.com | official logo |
| `digitech-labs.png` | Digitech Labs | digitechlabs.com | official logo |
| `fabworks.png` | Fabworks | fabworks.com | official logo |
| `microsoft.png` | Microsoft | microsoft.com | from DECODE portfolio p.17, background keyed out |

`microsoft.png` is the only one not from official artwork — it was lifted from a 200&nbsp;DPI
page render of the portfolio, so it's lower fidelity. Worth replacing if you can get the real
file.

If a logo file is missing, its tile falls back to the sponsor's name in text, taken from the
`alt` attribute. Nothing breaks; it just looks less polished.

## Adding or replacing a logo

1. Save the file here. PNG with a transparent background is best (SVG works too — update `src`).
   600&ndash;700 px on the long edge is plenty.
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
- **Artwork containing white** (Digitech Labs): do *not* key globally. Its head silhouette has
  white detail inside it, and a global key punches holes through the middle. Flood-fill inward
  from the image border instead, so only background-connected white is removed.

Look at the logo before picking. Getting this backwards is not subtle.

## Layout

The row is flexbox, not a fixed grid, so it wraps with the last row centred and handles any
number of sponsors without a CSS change. Each tile is `flex: 1 1 270px; max-width: 340px`,
which lands at about three per row on desktop and one per row on a phone.

That 270px basis matters: on narrower tiles, wide wordmarks get squeezed to roughly 35 px tall
and taglines (like Numurus' "SMART SYSTEM SOLUTIONS") stop being readable. Rendered height is
capped at 72 px, so square marks and wide wordmarks end up at a similar visual weight.
