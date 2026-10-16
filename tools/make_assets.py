"""PDF에서 뽑은 그림을 잘라 게임용 webp로 만든다."""
import sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter
SRC = sys.argv[1]   # 추출 이미지 폴더
OUT = sys.argv[2]   # assets 폴더

def load(n, alpha=None):
    im = Image.open(f'{SRC}/{n}').convert('RGB')
    if alpha:
        im.putalpha(Image.open(f'{SRC}/{alpha}').convert('L'))
    return im

def cut_black(im):
    """검은 배경을 투명하게 (위·왼쪽·오른쪽 가장자리에서 이어진 검은 영역만)."""
    rgb = np.asarray(im.convert('RGB')).astype(np.float32)
    m = rgb.max(axis=2)
    dark = (m < 22).astype(np.uint8) * 255
    dimg = Image.fromarray(dark, 'L').copy()
    w, h = dimg.size
    for x in range(0, w, 4):
        if dimg.getpixel((x, 0)) == 255: ImageDraw.floodfill(dimg, (x, 0), 128)
    for y in range(0, h, 4):
        for x in (0, w - 1):
            if dimg.getpixel((x, y)) == 255: ImageDraw.floodfill(dimg, (x, y), 128)
    bg = (np.asarray(dimg) == 128) | (m < 8)
    bgi = Image.fromarray((bg * 255).astype(np.uint8), 'L').filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    bg = (np.asarray(bgi) > 0) | (np.asarray(dimg) == 128)
    bgimg = Image.fromarray((bg * 255).astype(np.uint8), 'L')
    band = np.asarray(bgimg.filter(ImageFilter.MaxFilter(7))) > 0
    band = band & ~bg
    localmax = np.asarray(Image.fromarray(m.astype(np.uint8)).filter(ImageFilter.MaxFilter(9))).astype(np.float32)
    a = np.ones_like(m)
    a[bg] = 0
    est = np.clip(m / np.maximum(localmax, 1), 0, 1)
    a[band] = est[band]
    a3 = np.maximum(a[..., None], 1e-3)
    fg = np.where(band[..., None], np.clip(rgb / a3, 0, 255), rgb)
    out = np.dstack([fg, a * 255]).astype(np.uint8)
    return Image.fromarray(out, 'RGBA')

def save(im, name, maxh=None, q=86):
    if maxh and im.height > maxh:
        im = im.resize((round(im.width * maxh / im.height), maxh), Image.LANCZOS)
    im.save(f'{OUT}/{name}.webp', 'WEBP', quality=q, method=6)
    print(name, im.size)

lineup = load('img-001-004.png', 'img-001-005.png')
save(lineup, 'lineup')
# 멤버 상반신 (단체 그림에서)
save(lineup.crop((30, 8, 228, 330)), 'minhyuk')
save(lineup.crop((228, 72, 398, 392)), 'iyoung')
save(lineup.crop((418, 38, 598, 368)), 'hyunwoo')
save(lineup.crop((596, 52, 790, 344)), 'minji')
# 얼굴 (동그란 아이콘·포카용)
save(lineup.crop((95, 12, 225, 142)), 'face_minhyuk')
save(lineup.crop((262, 78, 382, 198)), 'face_iyoung')
save(lineup.crop((415, 42, 545, 172)), 'face_hyunwoo')
save(lineup.crop((605, 52, 730, 177)), 'face_minji')
# 이영 화난 얼굴
iy = load('img-005-038.png', 'img-005-039.png')
save(iy.crop((40, 0, 345, 400)), 'iyoung_angry', maxh=330)
# 현우 머쓱
hw = cut_black(load('img-048-300.png'))
save(hw.crop((110, 0, 640, 446)), 'hyunwoo_shy', maxh=330)
# 현우 문 앞 미소 (장면 그림)
dr = load('img-003-010.png')
save(dr.crop((300, 60, 700, 597)), 'hyunwoo_door', maxh=330)
# 컴퓨터실 장면
cl = load('img-008-049.png')
save(cl.crop((390, 20, 700, 380)), 'minhyuk_worried', maxh=330)
save(cl.crop((40, 40, 380, 446)), 'iyoung_cough', maxh=330)
save(cl, 'cut_cough')
save(load('img-007-044.png'), 'cut_lab')
# 퀴즈 꼬마 그림, 가게 그림
save(load('img-031-201.png').crop((10, 40, 215, 255)), 'chibi_quiz')
save(load('img-013-082.png').crop((0, 0, 406, 228)), 'cut_shop')

# ---- 두 번째 PDF(EP.5)에서 표정 더하기 ----
if len(sys.argv) > 3:
    SRC = sys.argv[3]
    save(load('img-003-010.png').crop((280, 0, 560, 340)), 'minji_angry', maxh=330)
    save(load('img-012-061.png').crop((200, 0, 600, 420)), 'minji_ugh', maxh=330)
    save(load('img-016-083.png').crop((270, 0, 550, 420)), 'minji_wink', maxh=330)
    save(load('img-005-020.png').crop((210, 0, 590, 420)), 'minhyuk_serious', maxh=330)
    save(load('img-025-106.png').crop((230, 0, 640, 446)), 'minhyuk_happy', maxh=330)
    th = cut_black(load('img-007-035.png'))
    save(th.crop((140, 85, 590, 700)), 'iyoung_think', maxh=330)
