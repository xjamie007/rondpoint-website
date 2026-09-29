#!/usr/bin/env python3
"""
Erzeugt Favicon, Apple-Touch-Icon und Open-Graph-Bild (G2) als SVG mit Text als Pfaden
(Archivo wdth 125, wght 800). Die PNG-Umwandlung macht scripts/assets/rasterize.mjs (sharp).

  python3 scripts/assets/build-assets.py && node scripts/assets/rasterize.mjs

Braucht fontTools und die variable Archivo-Datei in fonts-src/ (siehe README, Abschnitt Schrift).
"""
import json
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'fonts-src' / 'Archivo[wdth,wght].ttf'
OUT = ROOT / 'scripts' / 'assets' / 'out'
OUT.mkdir(parents=True, exist_ok=True)

font = instancer.instantiateVariableFont(TTFont(SRC), {'wght': 800, 'wdth': 125})
gs = font.getGlyphSet()
cmap = font.getBestCmap()
upm = font['head'].unitsPerEm
hmtx = font['hmtx']


def text_path(text, x, y, size, tracking=0.0):
    """SVG-Pfad für Text, Grundlinie bei y. Liefert (d, Breite)."""
    scale = size / upm
    pen = SVGPathPen(gs)
    cx = 0.0
    for ch in text:
        g = cmap.get(ord(ch))
        if g is None:
            continue
        tp = TransformPen(pen, (scale, 0, 0, -scale, x + cx, y))
        gs[g].draw(tp)
        cx += hmtx[g][0] * scale + tracking * size
    return pen.getCommands(), cx


def measure(text, size, tracking=0.0):
    return text_path(text, 0, 0, size, tracking)[1]


m = json.loads((ROOT / 'src' / 'data' / 'map.json').read_text())
W, H = m['width'], m['height']
widths = {'major': 11, 'secondary': 8, 'minor': 5, 'service': 3}


def map_group(transform):
    parts = [f'<g transform="{transform}">', f'<rect width="{W}" height="{H}" fill="#fff"/>']
    for d in m['river']:
        parts.append(f'<path d="{d}" fill="none" stroke="#AEB2B5" stroke-width="9" stroke-linecap="round"/>')
    for r in sorted(m['roads'], key=lambda r: widths[r['cls']]):
        parts.append(f'<path d="{r["d"]}" fill="none" stroke="#45484B" stroke-width="{widths[r["cls"]]}" stroke-linecap="round" stroke-linejoin="round"/>')
    rb = m['roundabout']
    parts.append(f'<circle cx="{rb["cx"]}" cy="{rb["cy"]}" r="{rb["r"]}" fill="none" stroke="#45484B" stroke-width="11"/>')
    parts.append(f'<circle cx="{rb["cx"]}" cy="{rb["cy"]}" r="{rb["r"] - 7}" fill="#fff"/>')
    for d in m['rail']:
        parts.append(f'<path d="{d}" fill="none" stroke="#000" stroke-width="1.5" stroke-dasharray="7 5"/>')
    parts.append(f'<path d="{m["garage"]}" fill="#E95D0C" stroke="#000" stroke-width="1.5"/>')
    a = m['aral']
    parts.append(f'<rect x="{a[0] - 5}" y="{a[1] - 5}" width="10" height="10" fill="#000"/>')
    parts.append('</g>')
    return ''.join(parts)


# Open-Graph-Bild 1200 × 630: links Text, rechts die Zeichnung
og = ['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">',
      '<rect width="1200" height="630" fill="#fff"/>']
# Zeichnung rechts, bis an den Rand
sc = 630 / H
gx, gy = m['garageCenter']
rbx = m['roundabout']['cx']
cx = (gx + rbx) / 2  # zwischen Garage und Kreisel
tx = 600 + 300 - cx * sc
og.append(f'<clipPath id="c"><rect x="600" y="0" width="600" height="630"/></clipPath><g clip-path="url(#c)">{map_group(f"translate({tx:.1f} {-40 * sc:.1f}) scale({sc})")}</g>')
og.append('<rect x="600" y="0" width="2" height="630" fill="#000"/>')
size = min(84, 470 / measure('Um Rond Point', 1, -0.012))
d1, _ = text_path('Garage', 64, 262, size, -0.012)
d2, _ = text_path('Um Rond Point', 64, 262 + size * 1.08, size, -0.012)
d3, _ = text_path('Erpeldange', 64, 262 + size * 1.08 + 88, 44, -0.005)
og.append(f'<path d="{d1}" fill="#000"/><path d="{d2}" fill="#000"/><path d="{d3}" fill="#B5480A"/>')
og.append(f'<rect x="64" y="{262 + size * 1.08 + 124:.0f}" width="120" height="10" fill="#E95D0C"/>')
og.append('</svg>')
(OUT / 'og.svg').write_text(''.join(og))

# Favicon: Kreisel als Ring auf Orange
fav = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
       '<rect width="64" height="64" rx="3" fill="#E95D0C"/>'
       '<circle cx="32" cy="32" r="17" fill="none" stroke="#000" stroke-width="8"/>'
       '<path d="M32 3v12M32 49v12M3 32h12M49 32h12" stroke="#000" stroke-width="8"/>'
       '</svg>')
(ROOT / 'public' / 'favicon.svg').write_text(fav)
(OUT / 'favicon.svg').write_text(fav)
print('og.svg, favicon.svg geschrieben')
