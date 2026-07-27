# Sponsor logos

The site loads these filenames. Three were extracted from the DECODE engineering portfolio
(page 17) with the cream page background keyed out to transparency.

| File | Sponsor | Status |
|---|---|---|
| `polymaker.png` | Polymaker | present |
| `digitech-labs.png` | Digitech Labs | present |
| `microsoft.png` | Microsoft | present |
| `numurus.png` | Numurus | **missing — add this** |

If a file is missing the site shows the sponsor's name in text instead, taken from the `alt`
attribute. Nothing breaks; it just looks less polished.

## Adding one

- **Format:** PNG with a transparent background (SVG works too — update the `src` in both
  `index.html` and `sponsor.html`).
- **Size:** around 600 px on the long edge. The site caps rendered height at 72 px and width
  at the tile width, so both wide wordmarks and squarer stacked marks come out balanced.
- **Set `width` and `height`** on the `<img>` to the file's real pixel size, or the tile will
  shift as the logo loads.

Grab logos from the company's own brand or press page so you get the official artwork.

## Links

Each logo links to the sponsor's own site. Digitech Labs currently has **no link** — several
unrelated companies share that name and we didn't want to send visitors to the wrong one. Once
you confirm the right URL, wrap it in an `<a href="...">` like the others (replacing the
`<span class="sponsor__tile">`).
