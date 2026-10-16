import base64, glob, os, json
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
r = lambda p: open(os.path.join(root, p), encoding='utf-8').read()
imgs = {}
for f in sorted(glob.glob(os.path.join(root, 'assets', '*.webp'))):
    imgs[os.path.basename(f)[:-5]] = 'data:image/webp;base64,' + base64.b64encode(open(f, 'rb').read()).decode()
html = r('src/index.template.html')
html = html.replace('/*__CSS__*/', r('src/style.css'))
html = html.replace('/*__IMG__*/', 'const IMG = ' + json.dumps(imgs) + ';')
html = html.replace('/*__ART__*/', r('src/art.js'))
html = html.replace('/*__STORY__*/', r('src/story.js'))
html = html.replace('/*__ENGINE__*/', r('src/engine.js'))
out = os.path.join(root, 'index.html')
open(out, 'w', encoding='utf-8').write(html)
print(out, round(len(html.encode()) / 1024), 'KB')
