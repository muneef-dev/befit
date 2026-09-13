"""Download public first-party proposal imagery and open-license fonts. No packages required."""
from pathlib import Path
from urllib.request import urlopen, Request
from concurrent.futures import ThreadPoolExecutor
import json

root = Path(__file__).parent / 'assets'
root.mkdir(exist_ok=True)
sources = {
 'logo.png': 'https://befit.lk/wp-content/uploads/2025/01/CHCLHCKHY.png',
 'logo-light.png': 'https://befit.lk/wp-content/uploads/2025/01/CHCLHCKHY-eed.png',
 'complex.jpg': 'https://befit.lk/wp-content/uploads/2025/01/Cam-5-1536x1152-1.jpg',
 'court.jpg': 'https://befit.lk/wp-content/uploads/2025/01/52281310_298594527494885_8927189752092819456_n-1.jpg',
 'paragahadeniya.jpg': 'https://befit.lk/wp-content/uploads/2025/01/61fa07aa-a0f4-4f68-8ef4-159c182dca78-1536x1152.jpg',
 'court-evening.jpg': 'https://befit.lk/wp-content/uploads/2025/01/IMG-20250124-WA0059.jpg',
 'venue-interior.jpg': 'https://befit.lk/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-06-at-04.43.26_7c92fbd8-1152x1536.jpg',
 'venue-play.jpg': 'https://befit.lk/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-06-at-04.43.36_a1aaa91f-1152x1536.jpg',
 'barlow-condensed-bold.ttf':'https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/BarlowCondensed-Bold.ttf',
 'barlow-condensed-license.txt':'https://raw.githubusercontent.com/google/fonts/main/ofl/barlowcondensed/OFL.txt',
 'manrope.ttf':'https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf',
 'manrope-license.txt':'https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt',
}
def download(item):
 name,url=item
 try:
  data=urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=40).read()
  if data[:50].lower().find(b'<html') >= 0: raise ValueError('HTML returned')
  (root/name).write_bytes(data)
  return f'{name}: {len(data)} bytes'
 except Exception as e:return f'{name}: FAILED {e}'
if __name__=='__main__':
 with ThreadPoolExecutor(max_workers=5) as pool: print('\n'.join(pool.map(download,sources.items())))
 (root/'sources.json').write_text(json.dumps(sources,indent=2),encoding='utf-8')
