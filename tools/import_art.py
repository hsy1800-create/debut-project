"""art 폴더에 넣은 그림(PNG/JPG/WEBP)을 게임용 그림(assets 폴더의 webp)으로 바꿉니다.

사용법:  python tools/import_art.py      (그다음  python tools/build.py)
필요한 것: Python 3, Pillow  (pip install pillow)

파일 이름 규칙 (art/PROMPTS.md 의 목록과 같음)
  인물_표정.png   예) serin_normal.png, yuha_tired.png, oh_worried.png
  lineup.png      제목 화면 단체 그림
  chibi.png       미션 화면 왼쪽 위 꼬마 그림
  cut_lab.png, cut_cough.png   5장 웹툰 컷
  face_인물.png   (선택) 포카·동그라미 얼굴. 없으면 인물_normal 그림 위쪽을 잘라 자동으로 만듭니다.
"""
import os, sys, glob
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.environ.get('ART_DIR', os.path.join(ROOT, 'art'))
OUT = os.path.join(ROOT, 'assets')
PEOPLE = ['serin', 'yuha', 'taeo', 'ian', 'oh', 'kang', 'jisu', 'na', 'inspector', 'haneul']
REQUIRED = ['lineup', 'serin_normal', 'serin_happy', 'serin_angry', 'serin_worried',
            'yuha_normal', 'yuha_angry', 'yuha_think', 'yuha_tired',
            'taeo_normal', 'taeo_smile', 'taeo_shy',
            'ian_normal', 'ian_happy', 'ian_serious', 'ian_worried']


def has_real_alpha(im):
    if im.mode != 'RGBA':
        return False
    lo, hi = im.getchannel('A').getextrema()
    return lo < 250


def white_to_alpha(im):
    """흰 배경 그림이면 위·왼쪽·오른쪽 가장자리에서 이어진 흰 부분만 투명하게 합니다."""
    im = im.convert('RGBA')
    if has_real_alpha(im):
        return im
    rgb = im.convert('RGB')
    w, h = rgb.size
    mask = Image.new('L', (w, h), 0)
    px, mp = rgb.load(), mask.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if min(r, g, b) > 238:
                mp[x, y] = 255
    seeds = [(x, 0) for x in range(0, w, 3)] + [(0, y) for y in range(0, h, 3)] + [(w - 1, y) for y in range(0, h, 3)]
    for s in seeds:
        if mask.getpixel(s) == 255:
            ImageDraw.floodfill(mask, s, 128)
    bg = mask.point(lambda v: 255 if v == 128 else 0).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    alpha = Image.eval(bg, lambda v: 255 - v)
    im.putalpha(alpha)
    return im


def trim(im, pad=6):
    box = im.getchannel('A').point(lambda v: 255 if v > 10 else 0).getbbox()
    if not box:
        return im
    l, t, r, b = box
    return im.crop((max(0, l - pad), max(0, t - pad), min(im.width, r + pad), min(im.height, b + pad)))


def fit(im, maxw=None, maxh=None):
    s = 1.0
    if maxw and im.width > maxw:
        s = min(s, maxw / im.width)
    if maxh and im.height > maxh:
        s = min(s, maxh / im.height)
    if s < 1:
        im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    return im


def save(im, name):
    path = os.path.join(OUT, name + '.webp')
    im.save(path, 'WEBP', quality=86, method=6)
    print(f'  ✓ {name}.webp  {im.width}x{im.height}')


def auto_face(im):
    """허리 위 인물 그림에서 머리 쪽을 정사각형으로 잘라 냅니다."""
    a = im.getchannel('A')
    w, h = im.size
    side = min(w, int(h * 0.46))
    top_rows = a.crop((0, 0, w, max(1, int(h * 0.18)))).point(lambda v: 255 if v > 10 else 0).getbbox()
    cx = (top_rows[0] + top_rows[2]) // 2 if top_rows else w // 2
    left = max(0, min(w - side, cx - side // 2))
    face = im.crop((left, 0, left + side, side))
    return face.resize((256, 256), Image.LANCZOS)


def main():
    files = sorted(f for f in glob.glob(os.path.join(ART, '*')) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')))
    if not files:
        print('art 폴더에 그림이 없어요.'); return
    os.makedirs(OUT, exist_ok=True)
    done = set()
    for f in files:
        stem = os.path.splitext(os.path.basename(f))[0].lower().replace('-', '_').replace(' ', '_')
        im = Image.open(f)
        if stem == 'title_stage':
            save(fit(im.convert('RGB'), maxw=1920), stem)
        elif stem == 'lineup':
            save(fit(trim(white_to_alpha(im)), maxw=1400), 'lineup')
        elif stem == 'chibi':
            save(fit(trim(white_to_alpha(im)), maxw=420, maxh=420), 'chibi_quiz')
        elif stem.startswith('cut_'):
            save(fit(im.convert('RGB'), maxw=1280), stem)
        elif stem.startswith('face_'):
            im = trim(white_to_alpha(im))
            side = max(im.size); sq = Image.new('RGBA', (side, side), (0, 0, 0, 0)); sq.paste(im, ((side - im.width) // 2, 0), im)
            save(sq.resize((256, 256), Image.LANCZOS), stem)
        elif stem.split('_')[0] in PEOPLE and '_' in stem:
            im = fit(trim(white_to_alpha(im)), maxh=640)
            save(im, stem)
            who = stem.split('_')[0]
            if stem.endswith('_normal') and not any(os.path.splitext(os.path.basename(g))[0].lower() == 'face_' + who for g in files):
                save(auto_face(im), 'face_' + who)
        else:
            print(f'  ? {os.path.basename(f)} 는 이름 규칙에 맞지 않아 건너뜁니다.'); continue
        done.add(stem)
    miss = [r for r in REQUIRED if r not in done and not os.path.exists(os.path.join(OUT, r + '.webp'))]
    print('\n다음: python tools/build.py  를 실행하면 index.html 에 반영됩니다.')
    if miss:
        print('아직 없는 꼭 필요한 그림:', ', '.join(miss))


if __name__ == '__main__':
    main()
