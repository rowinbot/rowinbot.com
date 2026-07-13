"""Regenerate Rowinbot app icons, avatar, previews, and Composer layers.

    pip install -r requirements.txt
    python3 hig.py

The geometry is imported from geometry.py. Effects are derived from the union
mask, so overlapping Pixel RH components never produce highlight seams.
"""

import io
import os

import cairosvg
from PIL import Image, ImageChops, ImageFilter

from geometry import (
    ACTIVE_BOUNDS,
    INK_BOTTOM,
    INK_TOP,
    PAPER,
    PAPER_BRIGHT,
    PAPER_SHADOW,
    RUST,
    mark_body,
)

OUT = os.path.dirname(os.path.abspath(__file__))
LAYERS = os.path.join(OUT, "icon-composer-layers")
os.makedirs(LAYERS, exist_ok=True)
S = 1024
RESAMPLE = getattr(Image, "Resampling", Image).LANCZOS


def render_png(svg, size=S):
    data = cairosvg.svg2png(
        bytestring=svg.encode("utf-8"), output_width=size, output_height=size
    )
    return Image.open(io.BytesIO(data)).convert("RGBA")


def placement(active_ratio=0.56):
    x0, y0, x1, y1 = ACTIVE_BOUNDS
    active_w = x1 - x0
    active_h = y1 - y0
    scale = active_ratio * S / active_w
    off_x = (S - active_w * scale) / 2 - x0 * scale
    off_y = (S - active_h * scale) / 2 - y0 * scale
    return scale, off_x, off_y


def bg_svg():
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="{INK_TOP}"/>
    <stop offset="1" stop-color="{INK_BOTTOM}"/>
  </linearGradient>
  <radialGradient id="warm" cx="0.78" cy="0.14" r="0.78">
    <stop offset="0" stop-color="{RUST}" stop-opacity="0.38"/>
    <stop offset="1" stop-color="{RUST}" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="{S}" height="{S}" fill="url(#bg)"/>
<rect width="{S}" height="{S}" fill="url(#warm)"/>
</svg>'''


def mark_svg(scale, off_x, off_y, glass=True, flat_color=PAPER):
    if glass:
        fill = "url(#paper)"
        defs = f'''<linearGradient id="paper" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="96">
  <stop offset="0" stop-color="{PAPER_BRIGHT}"/>
  <stop offset="1" stop-color="{PAPER_SHADOW}"/>
</linearGradient>'''
    else:
        fill = flat_color
        defs = ""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}">
<defs>{defs}</defs>
<g transform="translate({off_x:.3f},{off_y:.3f}) scale({scale:.6f})">
{mark_body(fill)}
</g>
</svg>'''


def mark_mask(scale, off_x, off_y):
    return render_png(mark_svg(scale, off_x, off_y, glass=False, flat_color="#FFFFFF")).getchannel("A")


def shifted_alpha(alpha, dx, dy):
    shifted = Image.new("L", alpha.size, 0)
    shifted.paste(alpha, (dx, dy))
    return shifted


def shadow_layer(mask):
    alpha = mask.point(lambda value: int(value * 0.30))
    shadow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    shadow.putalpha(alpha)
    shadow = shadow.filter(ImageFilter.GaussianBlur(15))
    moved = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    moved.paste(shadow, (0, 12), shadow)
    return moved


def directional_edges(mask):
    # Inner edge of the union, not of each rectangle: no seams at overlaps.
    eroded = mask.filter(ImageFilter.MinFilter(9))
    edge = ImageChops.subtract(mask, eroded)
    top_left = ImageChops.subtract(mask, shifted_alpha(mask, 3, 4))
    bottom_right = ImageChops.subtract(mask, shifted_alpha(mask, -3, -4))
    spec_alpha = ImageChops.multiply(edge, top_left).point(lambda value: int(value * 0.72))
    refr_alpha = ImageChops.multiply(edge, bottom_right).point(lambda value: int(value * 0.26))
    spec = Image.new("RGBA", (S, S), (255, 255, 255, 0))
    spec.putalpha(spec_alpha)
    refr = Image.new("RGBA", (S, S), (59, 31, 27, 0))
    refr.putalpha(refr_alpha)
    return spec, refr


def compose(active_ratio=0.56, glass=True):
    scale, off_x, off_y = placement(active_ratio)
    base = render_png(bg_svg())
    mask = mark_mask(scale, off_x, off_y)
    base.alpha_composite(shadow_layer(mask))
    base.alpha_composite(render_png(mark_svg(scale, off_x, off_y, glass=glass)))
    if glass:
        spec, refr = directional_edges(mask)
        base.alpha_composite(refr)
        base.alpha_composite(spec)
    return base


# Opaque full-bleed production master.
master = compose(0.56, glass=True)
master.convert("RGB").save(os.path.join(OUT, "rowinbot-ink-fullbleed-1024.png"))

# Apple Icon Composer layers: background and flat mark, no shadow or glass.
scale, off_x, off_y = placement(0.56)
render_png(bg_svg()).convert("RGB").save(os.path.join(LAYERS, "background.png"))
render_png(mark_svg(scale, off_x, off_y, glass=False)).save(os.path.join(LAYERS, "mark.png"))

# Squircle marketing preview with transparent outer margin.
SQ, M, RADIUS = 824, 100, 185
mask_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}">
<rect x="{M}" y="{M}" width="{SQ}" height="{SQ}" rx="{RADIUS}" fill="white"/>
</svg>'''
tile_mask = render_png(mask_svg).getchannel("A")
# Preserve the 56% active-mark ratio inside the 824 px visible tile, not the
# surrounding 1024 px transparent marketing canvas.
tile = compose(0.56 * SQ / S, glass=True)
preview = Image.new("RGBA", (S, S), (0, 0, 0, 0))
preview.paste(tile, (0, 0), tile_mask)
edge_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}">
<rect x="{M + 3}" y="{M + 3}" width="{SQ - 6}" height="{SQ - 6}" rx="{RADIUS - 3}" fill="none" stroke="rgba(0,0,0,0.34)" stroke-width="6"/>
<rect x="{M + 5}" y="{M + 5}" width="{SQ - 10}" height="{SQ - 10}" rx="{RADIUS - 5}" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="2.5"/>
</svg>'''
preview.alpha_composite(render_png(edge_svg))
preview.save(os.path.join(OUT, "rowinbot-glass-ink-1024.png"))

# Social avatar: slightly larger mark, still safe inside a circular crop.
avatar = compose(0.62, glass=True).convert("RGB").resize((512, 512), RESAMPLE)
avatar.save(os.path.join(OUT, "rowinbot-avatar-512.png"))

# HIG comparison sheet: full bleed, squircle, and flat monochrome mark.
sheet = Image.new("RGBA", (1180, 420), (243, 239, 230, 255))
full = master.resize((320, 320), RESAMPLE)
squircle = preview.resize((320, 320), RESAMPLE)
flat_panel = Image.new("RGBA", (320, 320), (243, 239, 230, 255))
flat_mark = render_png(mark_svg(scale, off_x, off_y, glass=False, flat_color=INK_TOP)).resize((320, 320), RESAMPLE)
flat_panel.alpha_composite(flat_mark)
sheet.alpha_composite(full, (60, 50))
sheet.alpha_composite(squircle, (430, 50))
sheet.alpha_composite(flat_panel, (800, 50))
sheet.save(os.path.join(OUT, "ink-hig-preview.png"))

print("done")
