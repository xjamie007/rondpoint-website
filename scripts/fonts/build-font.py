#!/usr/bin/env python3
"""
Baut public/fonts/archivo-var.woff2 aus der offiziellen variablen Archivo-Datei
(github.com/Omnibus-Type/Archivo, SIL OFL 1.1, kein Reserved Font Name).

  curl -L -o "fonts-src/Archivo[wdth,wght].ttf" \
    "https://raw.githubusercontent.com/Omnibus-Type/Archivo/master/fonts/variable/Archivo%5Bwdth%2Cwght%5D.ttf"
  python3 scripts/fonts/build-font.py

- Subset: Latin + Latin-1 + Latin Extended-A + die nötigen Satzzeichen (é è ê ë à â ç ã õ ô ú í ó á ä ö ü ß « » „ " – ’ € ² …)
- Features: kern liga calt ccmp locl mark mkmk tnum lnum pnum case rvrn  (tnum ist vorhanden)
- Achsen eingeschränkt auf die genutzten Bereiche: wght 400–800, wdth 100–125 (spart ein Drittel)
- U+202F (schmales geschütztes Leerzeichen) fehlt in Archivo; Intl.NumberFormat('fr') setzt es als
  Tausendertrenner. Es wird auf das Glyph von U+2009 (schmales Leerzeichen) gelegt.
"""
import os
import subprocess
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'fonts-src' / 'Archivo[wdth,wght].ttf'
TMP = ROOT / 'fonts-src' / 'archivo-sub.ttf'
OUT = ROOT / 'public' / 'fonts' / 'archivo-var.woff2'

subprocess.run([
    'pyftsubset', str(SRC), f'--output-file={TMP}',
    '--unicodes=U+0020-007E,U+00A0-00FF,U+0100-017F,U+2009,U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+2039-203A,U+20AC,U+2122,U+2212,U+2082',
    '--layout-features=kern,liga,calt,ccmp,locl,mark,mkmk,tnum,lnum,pnum,case,rvrn',
    '--no-hinting', '--desubroutinize',
], check=True)

f = instancer.instantiateVariableFont(TTFont(TMP), {'wght': (400, 800), 'wdth': (100, 125)})
thin = f.getBestCmap()[0x2009]
for t in f['cmap'].tables:
    if t.isUnicode():
        t.cmap[0x202F] = thin
f.flavor = 'woff2'
f.save(OUT)
feats = {fr.FeatureTag for fr in f['GSUB'].table.FeatureList.FeatureRecord}
print(f'{OUT.name}: {os.path.getsize(OUT)} Bytes, tnum: {"tnum" in feats}')
