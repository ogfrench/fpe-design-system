"""Build square platform icons from the canonical FPE SVG geometry.

Run with CairoSVG available to generate the PNG required by Claude's listing.
The canonical brand SVGs remain the source of truth for the mark geometry.
"""
from pathlib import Path
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "assets" / "brand"
CHAT = ROOT / "plugins" / "chatgpt" / "assets"
CLAUDE = ROOT / "plugins" / "claude" / "assets"


def mark_path(filename: str) -> str:
    svg = ET.parse(BRAND / filename).getroot()
    paths = svg.findall("{http://www.w3.org/2000/svg}path")
    if len(paths) != 1:
        raise ValueError(f"Expected one compound path in {filename}")
    return paths[0].attrib["d"]


paths = [mark_path(x) for x in ("fpe-mark.svg", "fpe-mark-white.svg", "fpe-mark-black.svg")]
if len(set(paths)) != 1:
    raise ValueError("FPE brand variants have diverging mark geometry")

CHAT.mkdir(parents=True, exist_ok=True)
CLAUDE.mkdir(parents=True, exist_ok=True)
for name, background, foreground in (
    ("fpe-icon-dark", "#000000", "#FFFFFF"),
    ("fpe-icon-light", "#FFFFFF", "#000000"),
):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="FPE monogram">
  <rect width="512" height="512" rx="96" fill="{background}"/>
  <path transform="translate(100 123) scale(1.065)" fill="{foreground}" fill-rule="evenodd" d="{paths[0]}"/>
</svg>
'''
    for destination in (CHAT, CLAUDE):
        (destination / f"{name}.svg").write_text(svg, encoding="utf-8")

try:
    import cairosvg
except ImportError as e:
    raise SystemExit("CairoSVG is required to rasterize the Claude listing icons") from e
for name in ("fpe-icon-dark", "fpe-icon-light"):
    cairosvg.svg2png(url=str(CLAUDE / f"{name}.svg"),write_to=str(CLAUDE / f"{name}.png"),output_width=512,output_height=512)
print("FPE plugin icon masters synchronized, Claude listing PNGs rendered (512px)")
