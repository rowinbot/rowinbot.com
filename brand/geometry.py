"""Shared geometry and palette for the Rowinbot brand mark."""

INK = "#2B2A28"
INK_TOP = "#242321"
INK_BOTTOM = "#34312E"
PAPER = "#F3EFE6"
PAPER_BRIGHT = "#FFFDF8"
PAPER_SHADOW = "#D8CCBC"
RUST = "#B23B2E"

# Selective Soft geometry after the final 3.5-unit optical correction.
# The active bounds are x=12.5..82.5 and y=18..78 on a 96-unit canvas.
SHAPES = (
    (12.5, 18, 14, 60, 3),
    (22.5, 18, 28, 12, 3),
    (45.5, 23, 14, 31, 3),
    (22.5, 46, 60, 14, 2),
    (37.5, 56, 15, 13, 1),
    (47.5, 65, 15, 13, 1),
    (66.5, 18, 16, 60, 3),
)

ACTIVE_BOUNDS = (12.5, 18, 82.5, 78)


def _n(value):
    return f"{value:g}"


def mark_body(color="currentColor"):
    return "".join(
        f'<rect x="{_n(x)}" y="{_n(y)}" width="{_n(w)}" '
        f'height="{_n(h)}" rx="{_n(r)}" fill="{color}"/>'
        for x, y, w, h, r in SHAPES
    )


def mark_svg(color="currentColor", accessible=True):
    accessibility = ' role="img" aria-label="Rowinbot"' if accessible else ""
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"'
        f'{accessibility}>{mark_body(color)}</svg>\n'
    )

