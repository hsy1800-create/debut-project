# 캐릭터 그림 프롬프트

1단계 단체 설정화(`lineup.png`)를 먼저 만들고, 그 그림을 **첨부한 채로** 나머지를 하나씩 만듭니다.
만든 그림은 아래 파일 이름 그대로 이 `art` 폴더에 넣습니다. 그림 안에는 글자를 넣지 않습니다.

## 공통 그림체 문장

그림체가 흔들릴 때 아무 프롬프트 끝에나 붙입니다.

```text
Art style: modern Korean idol-game character illustration, clean crisp line art, soft cel shading with subtle glossy highlights, bright pastel colors with a touch of neon, large expressive eyes, trendy 2026 K-pop stage fashion, polished mobile-game splash-art quality. Original characters only: they must not resemble any real celebrity or existing K-pop idol. Wholesome and age-appropriate for an elementary school classroom game, modest outfits. No text, no logos, no watermarks.
```

## 1단계 · lineup.png (네 명 단체 설정화, 제목 화면)

```text
Create a character design sheet: a full-body lineup of a 4-member co-ed rookie K-pop group, all four standing side by side, front view, each in a different confident idol pose. Transparent background (or plain white if transparency is not possible). Wide 3:2 image.

From left to right:
1. IAN (male, about 22, composer and producer, the group's quiet "visual" member): straight dark hair with a deep navy tint, long side-swept bangs lightly covering one eye, thin round silver wire-rim glasses, calm half-lidded gaze and a faint cool smile. Black turtleneck under a long charcoal coat, slim black trousers, a thin silver necklace, white wireless headphones resting around his neck. Signature color: navy and silver.
2. YUHA (female, about 20, main vocalist, kind and hardworking): long soft wavy rose-brown hair with see-through bangs and two small pearl hair pins, round gentle eyes, warm bright smile. Knee-length layered stage dress in white and coral pink with a ribbon at the waist, white sneakers. Signature color: coral pink.
3. TAEO (male, about 21, rapper and the fan-service king, sunny puppy-like energy): fluffy layered ash-silver hair with mint highlights, a big open grin, one small silver hoop earring. Oversized cream-and-mint varsity jacket over a white tee, wide light-blue jeans, chunky sneakers. Signature color: mint.
4. SERIN (female, about 21, leader and main dancer, charismatic "girl crush" leader): long sleek black hair with a violet underlayer, tied in a high half-up ponytail, sharp cat-like eyes, a small confident smirk. Short black jacket with silver details over a violet top, black cargo pants, black boots. Signature color: violet.

Art style: modern Korean idol-game character illustration, clean crisp line art, soft cel shading with subtle glossy highlights, bright pastel colors with a touch of neon, large expressive eyes, trendy 2026 K-pop stage fashion, polished mobile-game splash-art quality. Original characters only: they must not resemble any real celebrity or existing K-pop idol. Wholesome and age-appropriate for an elementary school classroom game, modest outfits. No text, no logos, no watermarks.
```

## 2단계 · 멤버 표정 (lineup.png 첨부)

모든 표정 프롬프트의 앞부분은 같습니다. `[인물 설명]`과 `[표정]`만 바꿉니다.

```text
Using the attached character sheet as the reference, draw [인물 설명]. Keep exactly the same face, hairstyle, outfit, colors and art style. Waist-up portrait, centered, vertical 3:4, transparent background, no text.
Pose and expression: [표정]
```

인물 설명
- 세린: `SERIN (the girl with black-and-violet hair in a high half-up ponytail)`
- 유하: `YUHA (the girl with long wavy rose-brown hair and pearl pins)`
- 태오: `TAEO (the boy with fluffy ash-silver hair with mint highlights and a mint varsity jacket)`
- 이안: `IAN (the boy with navy-tinted dark hair, long side bangs and round silver glasses)`

| 파일 | 표정 |
| --- | --- |
| serin_normal.png | arms crossed, chin slightly raised, a small confident smirk, looking straight at the viewer. |
| serin_happy.png | playful wink with a thumbs-up toward the viewer, a big proud smile. |
| serin_angry.png | fired-up and determined, eyebrows drawn together, pointing forward with one finger as if saying "we won't lose". Spirited, not scary. |
| serin_worried.png | surprised and worried, eyes wide, one hand reaching forward as if running to help a friend, mouth slightly open. |
| yuha_normal.png | holding a stage microphone near her chest with both hands, a warm bright smile, eyes sparkling. |
| yuha_angry.png | cute annoyed pout, cheeks puffed, hands on her hips, a small anger mark near her head. Funny, not scary. |
| yuha_think.png | resting her chin on one hand, looking up thoughtfully, holding a small notebook with music notes, a slightly worried little frown. |
| yuha_tired.png | (옷 바꿈: "but in dance-practice clothes instead of the stage dress: an oversized light-gray hoodie, hair in a loose low ponytail, a white face mask") tired droopy eyes, coughing into her fist, a towel over one shoulder, still determined to keep practicing. |
| taeo_normal.png | a huge sunny grin showing teeth, making a peace sign toward the viewer, eyes crinkled with joy. |
| taeo_smile.png | arms loosely crossed, head tilted, a relaxed friendly smile, looking at the viewer. |
| taeo_shy.png | scratching the back of his head, an embarrassed sheepish smile, a small sweat drop, eyebrows slightly raised. |
| ian_normal.png | one hand in his coat pocket, looking slightly to the side, a calm cool expression with a faint smile. |
| ian_happy.png | a rare gentle smile, index finger raised as if explaining a clever idea, holding a tablet showing a simple bar chart in the other hand. |
| ian_serious.png | pushing up his glasses with one finger, a focused serious gaze at the viewer, light glint on the lenses. |
| ian_worried.png | concerned look, eyebrows knitted, leaning slightly forward and holding out a water bottle with both hands. |

## 3단계 · 조연 (lineup.png 첨부, 한 번에 한 장씩)

앞부분:

```text
In exactly the same art style as the attached character sheet, draw a new original supporting character for the same story. Waist-up portrait, centered, vertical 3:4, transparent background, no text, no logos.
```

| 파일 | 인물과 표정 |
| --- | --- |
| oh_normal.png | MANAGER OH, a woman in her mid-40s, the small agency's warm and capable chief manager. Neat dark-brown short bob, round tortoiseshell glasses, navy blazer over a striped shirt, an ID card on a lanyard, holding a tablet. A kind, reassuring smile. |
| oh_happy.png | (same MANAGER OH) laughing with a thumbs-up. |
| oh_worried.png | (same MANAGER OH) worried frown, looking at a thin bankbook in her hand. |
| kang_normal.png | CEO KANG, a man in his late 40s who runs a huge rival entertainment company. Slicked-back black hair with one silver streak, sharp eyebrows, a glossy tailored charcoal suit with a burgundy tie, a gold watch. Arms crossed, a smug confident smirk. A comedic rival, not scary. |
| jisu_normal.png | JISU, a woman in her mid-20s, the agency's newest staff member. Low ponytail, a black headset with a microphone, black staff T-shirt (no readable text), utility vest. A bright, eager smile, holding a signed contract paper. |
| jisu_worried.png | (same JISU) tired eyes, slightly hunched, hugging a tall stack of papers, a hesitant worried look. |
| na_normal.png | SALESMAN NA, a man in his late 30s from a fan-goods company. Side-parted hair, a thin mustache, a flashy mustard checkered suit, holding up a glowing light-stick sample, an overly sweet salesy grin with one eyebrow raised. Comedic. |
| inspector_normal.png | An INSPECTOR from the government's fair trade office, a woman in her 30s. Neat low bun, navy suit, a plain ID badge on a lanyard (no readable text), holding a document folder. A calm but firm serious expression. |
| haneul_normal.png | HANEUL, a cheerful 12-year-old girl in 6th grade, the group's very first fan. Shoulder-length hair in two low pigtails with star hair ties, a pastel yellow hoodie with a small star pin, a school backpack. Cute and age-appropriate. Holding the group's album to her chest, a shy happy smile. |
| haneul_happy.png | (same HANEUL) jumping with excitement, waving a light stick, mouth open in a cheer. |
| haneul_worried.png | (same HANEUL) looking down at a small wallet with only a few bills, a thoughtful worried pout. |

## 장면 컷과 꼬마 그림

```text
cut_lab.png — Using the attached character sheet as the reference for faces and art style, draw a wide 16:9 scene. Late at night in a small dance practice room with a full wall of mirrors and warm ceiling lights. YUHA, in an oversized light-gray hoodie and a white face mask, practices alone, coughing but still dancing; the other members' bags and water bottles sit by the wall. Quiet, slightly lonely mood with a warm glow. No text.
```

```text
cut_cough.png — Using the attached character sheet as the reference for faces and art style, draw a wide 16:9 scene in the same night-time mirrored practice room. YUHA (gray hoodie, white mask) sits on the floor coughing. IAN crouches nearby holding out a water bottle, SERIN hurries in with a towel, and TAEO stands behind them looking worried. Caring teammates, warm and supportive, not romantic. No text.
```

```text
chibi.png — Using the attached character sheet as the reference, draw cute chibi versions (two heads tall) of all four members, SERIN, YUHA, TAEO and IAN, cheering together and holding up one big blank white sign. Square 1:1, transparent background, no text on the sign.
```

## 만들 그림 목록

꼭 필요: lineup · serin_normal · serin_happy · serin_angry · serin_worried · yuha_normal · yuha_angry · yuha_think · yuha_tired · taeo_normal · taeo_smile · taeo_shy · ian_normal · ian_happy · ian_serious · ian_worried

있으면 좋음: cut_lab · cut_cough · chibi · oh_normal · oh_happy · oh_worried · kang_normal · na_normal · inspector_normal · jisu_normal · jisu_worried · haneul_normal · haneul_happy · haneul_worried
