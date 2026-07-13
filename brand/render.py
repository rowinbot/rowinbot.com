"""Regenerate Rowinbot standalone marks and favicon assets.

    pip install -r requirements.txt
    python3 render.py

For app-icon masters, previews, the avatar, and Icon Composer layers, run
``python3 hig.py``.
"""

import io
import os

import cairosvg
from PIL import Image

from geometry import INK, INK_BOTTOM, INK_TOP, PAPER, RUST, mark_body, mark_svg

HERE = os.path.dirname(os.path.abspath(__file__))
RESAMPLE = getattr(Image, "Resampling", Image).LANCZOS
NEAREST = getattr(Image, "Resampling", Image).NEAREST


def write(name, value):
    with open(os.path.join(HERE, name), "w", encoding="utf-8") as handle:
        handle.write(value)


def png_from_svg(svg, size):
    data = cairosvg.svg2png(
        bytestring=svg.encode("utf-8"), output_width=size, output_height=size
    )
    return Image.open(io.BytesIO(data)).convert("RGBA")


write("rowinbot-mark.svg", mark_svg("currentColor"))
write("rowinbot-mark-black.svg", mark_svg(INK, accessible=False))
write("rowinbot-mark-white.svg", mark_svg(PAPER, accessible=False))

favicon_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Rowinbot">
<defs>
  <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="{INK_TOP}"/>
    <stop offset="1" stop-color="{INK_BOTTOM}"/>
  </linearGradient>
  <radialGradient id="warm" cx="0.78" cy="0.14" r="0.82">
    <stop offset="0" stop-color="{RUST}" stop-opacity="0.34"/>
    <stop offset="1" stop-color="{RUST}" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="96" height="96" rx="21" fill="url(#tile)"/>
<rect width="96" height="96" rx="21" fill="url(#warm)"/>
{mark_body(PAPER)}
</svg>\n'''
write("rowinbot-favicon.svg", favicon_svg)

icons = {}
for px in (16, 32, 48):
    image = png_from_svg(favicon_svg, px)
    image.save(os.path.join(HERE, f"favicon-{px}.png"))
    icons[px] = image

png_from_svg(favicon_svg, 180).save(os.path.join(HERE, "apple-touch-icon.png"))
icons[48].save(
    os.path.join(HERE, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[icons[16], icons[32]],
)

# Pixel-scale reference: large tile, native 32 px, and native 16 px.
preview = Image.new("RGBA", (560, 180), (36, 35, 33, 255))
large = png_from_svg(favicon_svg, 128)
preview.alpha_composite(large, (28, 26))
preview.alpha_composite(icons[32], (248, 74))
preview.alpha_composite(icons[16], (430, 82))
# Enlarged nearest-neighbour copies make the small-size decisions inspectable.
preview.alpha_composite(icons[32].resize((64, 64), NEAREST), (232, 58))
preview.alpha_composite(icons[16].resize((64, 64), NEAREST), (406, 58))
preview.save(os.path.join(HERE, "favicon-tile-preview.png"))

print("done")

