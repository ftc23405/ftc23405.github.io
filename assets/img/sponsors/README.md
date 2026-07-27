# Sponsor logos

All four are present and each links to the sponsor's own site.

| File | Sponsor | Links to | Source |
|---|---|---|---|
| `polymaker.png` | Polymaker | polymaker.com | official logo supplied by the team |
| `numurus.png` | Numurus | numurus.com | official logo supplied by the team |
| `digitech-labs.png` | Digitech Labs | digitechlabs.com | DECODE portfolio p.17, background keyed out |
| `microsoft.png` | Microsoft | microsoft.com | DECODE portfolio p.17, background keyed out |

The two portfolio-extracted logos are lower fidelity than an official file would be — they were
lifted from a 200&nbsp;DPI page render and had the cream page background removed. If you can get
the official artwork from each company's brand or press page, swap them in.

If a logo file is missing, the site shows the sponsor's name in text instead, taken from the
`alt` attribute. Nothing breaks; it just looks less polished.

## Adding or replacing one

1. Save the file here. PNG with a transparent background (SVG works too — update `src`).
   Around 600&ndash;700 px on the long edge is plenty.
2. Update the `<img>` in **both** `index.html` and `sponsor.html`:
   - `src` and `alt`
   - `width` and `height` set to the file's **real** pixel size, or the tile will shift as the
     logo loads
3. Wrap it in `<a href="..." target="_blank" rel="noopener">` so it links out.

The site caps rendered height at 72 px and width at the tile width, so wide wordmarks and
squarer stacked marks come out at a similar visual weight without any per-logo tuning.
