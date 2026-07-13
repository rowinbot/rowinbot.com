# Rowinbot brand kit

The production asset suite for the **Selective Soft Pixel RH** mark used by
`rowinbot.com`. Its structure follows the Browxai brand kit: one monochrome
glyph, a dedicated tile favicon, generated raster sizes, app-icon masters,
social-avatar output, Apple Icon Composer layers, and reproducible scripts.

## The mark

The glyph fuses a pixel-built `R` and `H` into one compact silhouette. Rounded
outer rails soften the mark at display sizes while the internal steps remain
crisp. The geometry includes a 3.5-unit optical correction: the alpha-weighted
center, not merely the bounding box, sits on the 48-unit canvas axis.

The mark remains monochrome. Color and material treatments belong to derived
tiles, never to the core SVG.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| Ink | `#2B2A28` | Primary mark and site ink |
| Ink deep | `#242321` | Tile gradient top |
| Ink warm | `#34312E` | Tile gradient bottom |
| Paper | `#F3EFE6` | Mark on dark surfaces and site background |
| Paper bright | `#FFFDF8` | Subtle material highlight |
| Rust | `#B23B2E` | Restrained warmth/accent glow |

## Files

| File | What it is |
| --- | --- |
| `rowinbot-mark.svg` | Canonical glyph using `currentColor`. |
| `rowinbot-mark-black.svg` / `-white.svg` | Fixed ink/paper variants. |
| `rowinbot-favicon.svg` | Rounded ink tile with paper glyph. |
| `favicon.ico` | Multi-resolution ICO containing 16/32/48 px. |
| `favicon-16.png` / `-32.png` / `-48.png` | Raster favicon sizes. |
| `apple-touch-icon.png` | 180 px touch icon. |
| `rowinbot-ink-fullbleed-1024.png` | Opaque production app-icon master. |
| `rowinbot-glass-ink-1024.png` | Squircle marketing/Dock preview. |
| `rowinbot-avatar-512.png` | Social and GitHub avatar, circle-crop safe. |
| `icon-composer-layers/` | Flat background and mark layers without baked effects. |
| `ink-hig-preview.png` | Full-bleed, squircle, and monochrome comparison. |
| `favicon-tile-preview.png` | Large and native-size favicon reference. |
| `geometry.py` | Shared source of truth for geometry and palette. |
| `render.py` | Regenerates SVG marks and favicon assets. |
| `hig.py` | Regenerates app icons, avatar, previews, and layers. |

## Regenerating

```sh
python3 -m pip install -r requirements.txt
python3 render.py
python3 hig.py
```

The generated PNG masters use sRGB. The full-bleed production master and
avatar are opaque; the marketing squircle and flat mark layer retain alpha.

