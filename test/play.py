"""프롤로그부터 10장, 엔딩까지 자동으로 플레이. mode=perfect 이면 모두 한 번에, mode=messy 이면 미션마다 한 번씩 틀린 뒤 맞힌다.
끝까지 가지 못했거나 오류가 나면 FAIL을 찍고 1로 끝난다."""
import sys, os, asyncio, json, pathlib
from playwright.async_api import async_playwright
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT=os.path.join(ROOT,'test','out')+os.sep
os.makedirs(OUT, exist_ok=True)
W,H=int(sys.argv[1]),int(sys.argv[2]); MODE=sys.argv[3]; TAG=sys.argv[4]

STEP_JS = """() => {
  const id = document.querySelector('.mno').textContent.replace('미션 ','').trim();
  const node = MISSIONS[id];
  const steps = node.kind==='steps' ? node.steps : [node];
  const st = document.querySelector('.m-head .steps');
  const si = st ? parseInt(st.textContent) - 1 : 0;
  return { id, step: steps[si], si, n: steps.length };
}"""

async def click(pg, sel):
    await pg.click(sel, timeout=4000); await pg.wait_for_timeout(40)

async def close_modals(pg, shots=None):
    for _ in range(30):
        b = await pg.query_selector('.modal [data-a=next], .modal [data-a=n]')
        if not b: return
        await b.click(); await pg.wait_for_timeout(60)

async def solve(pg, info, wrong_first):
    st = info['step']; k = st['kind']
    if k == 'choice':
        opts = st['options']
        if wrong_first:
            wi = next((i for i,o in enumerate(opts) if not o.get('correct')), None)
            await click(pg, f'.opt[data-i="{wi}"]'); await click(pg, '#ck'); await close_modals(pg)
        ci = next(i for i,o in enumerate(opts) if o.get('correct'))
        await click(pg, f'.opt[data-i="{ci}"]'); await click(pg, '#ck')
    elif k == 'multi':
        opts = st['options']
        if wrong_first:
            await click(pg, f'.opt[data-i="0"]'); await click(pg, '#ck'); await close_modals(pg)
            await click(pg, f'.opt[data-i="0"]')  # 다시 끄기
        for i,o in enumerate(opts):
            if o.get('correct'): await click(pg, f'.opt[data-i="{i}"]')
        await click(pg, '#ck')
    elif k == 'sort':
        cards = st['cards']; bins = st['bins']
        async def place(cid, bid):
            await click(pg, f'.pool .chip[data-c="{cid}"]'); await click(pg, f'.bin[data-b="{bid}"] .bin-label')
        if wrong_first:
            ans=[c for c in cards if c['ans']]
            if all(x.get('cap') for x in bins):
                plan={ans[0]['id']:ans[1]['ans'], ans[1]['id']:ans[0]['ans']}
            else:
                plan={ans[0]['id']: next(x['id'] for x in bins if x['id']!=ans[0]['ans'])}
            for c in ans:
                await place(c['id'], plan.get(c['id'], c['ans']))
            await click(pg, '#ck'); await close_modals(pg)
        for c in cards:
            if not c['ans']: continue
            if await pg.query_selector(f'.pool .chip[data-c="{c["id"]}"]'):
                await place(c['id'], c['ans'])
        await click(pg, '#ck')
    elif k == 'price':
        if wrong_first:
            await click(pg, '.price-btn[data-p="40000"]'); await click(pg, '#ck'); await close_modals(pg)
        for p in [5000, 15000, st['answer']]: await click(pg, f'.price-btn[data-p="{p}"]')
        await click(pg, '#ck')
    elif k == 'budget':
        if wrong_first:
            await click(pg, '#ck'); await close_modals(pg)   # 모두 적게 → 노래 부족
        await click(pg, '[data-it="song"][data-l="1"]'); await click(pg, '[data-it="dance"][data-l="1"]')
        await click(pg, '[data-it="mv"][data-l="1"]'); await click(pg, '[data-it="staff"][data-l="1"]')
        await click(pg, '#ck')
    elif k == 'shop':
        await click(pg, '[data-cr="long"]'); await click(pg, '[data-cr="need"]')
        if wrong_first:
            await click(pg, '[data-it="album"]'); await click(pg, '[data-it="ticket"]'); await click(pg, '[data-r="3"]'); await click(pg, '#ck'); await close_modals(pg)
            await click(pg, '[data-it="ticket"]')
        else:
            await click(pg, '[data-it="album"]')
        await click(pg, '[data-it="gift"]'); await click(pg, '[data-r="3"]'); await click(pg, '#ck')
    elif k == 'contract':
        if wrong_first:
            await click(pg, '[data-f="food"]'); await click(pg, '#ck'); await close_modals(pg)
        for f in ['hours','off','pay','payday']: await click(pg, f'[data-f="{f}"]')
        await click(pg, '#ck'); await pg.wait_for_timeout(1100)
    elif k == 'schedule':
        if wrong_first:
            await click(pg, '#night'); await close_modals(pg)
        await click(pg, '[data-h="8"]'); await click(pg, '[data-d="5"]'); await click(pg, '#ck')
    elif k == 'order':
        if wrong_first:
            for i in [1,0,2,3]: await click(pg, f'.order-pool .chip[data-i="{i}"]')
            await click(pg, '#ck'); await close_modals(pg)
        for i in [0,1,2,3]: await click(pg, f'.order-pool .chip[data-i="{i}"]')
        await click(pg, '#ck')
    await pg.wait_for_timeout(120)

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width':W,'height':H}, device_scale_factor=1)
        errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.route('**/fonts.googleapis.com/**', lambda r: r.abort())
        await pg.goto(pathlib.Path(ROOT, 'index.html').as_uri()); await pg.wait_for_timeout(300)
        await click(pg, '[data-go=new]')
        seen=set(); n=0
        for it in range(8000):
            if errs: break
            if await pg.query_selector('#ceo'):
                await pg.fill('#ceo','테스트'); await pg.fill('#grp','해온'); await click(pg,'#go'); continue
            if await pg.query_selector('.result'):
                await pg.screenshot(path=OUT+TAG+'_result.png'); break
            if await pg.query_selector('.modal'):
                if await pg.query_selector('.modal .poca') and ('poca' not in seen):
                    seen.add('poca'); await pg.wait_for_timeout(300); await pg.screenshot(path=OUT+TAG+'_poca.png')
                    await click(pg, '.modal .poca'); await pg.wait_for_timeout(700); await pg.screenshot(path=OUT+TAG+'_poca_back.png')
                await close_modals(pg); continue
            if await pg.query_selector('.endcard'):
                h2 = await pg.text_content('.endcard h2'); 
                if h2 not in seen:
                    seen.add(h2); await pg.screenshot(path=OUT+TAG+'_end_'+h2.split('장')[0]+'.png')
                nx = await pg.query_selector('#nx')
                if nx: await nx.click(); await pg.wait_for_timeout(150); continue
            if await pg.query_selector('.mno') and await pg.query_selector('.m-body'):
                info = await pg.evaluate(STEP_JS)
                key = info['id']+'_'+str(info['si'])
                if key not in seen:
                    seen.add(key); await pg.wait_for_timeout(200); await pg.screenshot(path=OUT+TAG+'_m'+key+'.png')
                await solve(pg, info, MODE=='messy' and key not in seen.__class__() and ('w'+key) not in seen)
                seen.add('w'+key)
                continue
            if await pg.query_selector('#dlg'):
                await pg.click('#dlg'); await pg.wait_for_timeout(30); n+=1
                if n % 25 == 0 and ('s'+str(n)) not in seen:
                    seen.add('s'+str(n)); await pg.screenshot(path=OUT+TAG+f'_scene{n:04d}.png')
                continue
            await pg.wait_for_timeout(100)
        state = await pg.evaluate('() => ({g: gaugeVals(), pocas: ownedPocas().size, pocaTotal: POCA_IDS.length, first: firstTryCount(), missions: TOTAL_MISSIONS, chapters: CHAPTERS.length, done: S.done.slice().sort((a, b) => a - b), ending: S.ending && S.ending.key, stories: S.stories, flags: S.flags})')
        print(json.dumps(state, ensure_ascii=False))
        print('errors:', errs)
        await b.close()
    fails = []
    if errs: fails.append('페이지 오류')
    if state['done'] != list(range(1, state['chapters'] + 1)): fails.append('끝내지 못한 장이 있음')
    if not state['ending']: fails.append('엔딩에 닿지 못함')
    if MODE == 'perfect':
        if state['pocas'] != state['pocaTotal']: fails.append('포카를 다 모으지 못함')
        if state['first'] != state['missions']: fails.append('한 번에 맞히지 못한 미션이 있음')
        if state['ending'] != 'hidden': fails.append('숨은 엔딩이 아님')
    print('FAIL: ' + ', '.join(fails) if fails else 'PASS')
    return 1 if fails else 0
sys.exit(asyncio.run(main()))
