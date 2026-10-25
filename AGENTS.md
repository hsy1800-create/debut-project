# 데뷔 프로젝트: 기획사를 살려라 — 작업 안내 (Codex용)

6학년 사회 「시장경제와 국가 간 거래」 단원(개념기반 탐구 13차시, 게임 1~10장) 게임입니다. 플레이어는 작은 기획사 대표가 되어
세린·유하·태오·이안의 데뷔를 준비하며 장마다 경제 개념 미션을 풉니다.

- 게임 주소: https://hsy1800-create.github.io/debut-project/ (main 브랜치를 올리면 1~2분 뒤 반영)
- 사용 기기: 학교 갤럭시탭(안드로이드 크롬), 가로·세로 모두. 로그인·서버 없음. 진행 상황은 현재 페이지 메모리에서만 유지. 새로고침·재접속 시 초기화하며 저장 기능을 다시 넣지 않습니다.

## 파일 구조

| 경로 | 내용 |
| --- | --- |
| `index.html` | 빌드 결과(그림·코드가 모두 들어간 한 파일). **직접 고치지 말고** 아래 순서로 다시 만듭니다. |
| `src/story.js` | 장별 대사, 미션, 포카(개념 카드), 숨은 이야기, 엔딩 |
| `src/engine.js` | 게임 진행, 미션 화면, 페이지 내 임시 상태 |
| `src/art.js` | 인물 목록(이름·색), 그림 찾기 규칙(`MOOD_CHAIN`), 그림이 없을 때 쓰는 단순한 SVG 인물 |
| `src/style.css` | 화면 모양 |
| `assets/*.webp` | 게임에 들어가는 그림 |
| `art/` | 선생님이 새로 만든 원본 그림을 넣는 곳. 그림 프롬프트는 `art/PROMPTS.md` |
| `tools/import_art.py` | `art/` 그림 → `assets/` webp 변환(흰 배경 제거, 크기 맞춤, 포카 얼굴 자동 자르기) |
| `tools/build.py` | `src/` + `assets/` → `index.html` |
| `test/play.py` | (선택) Playwright로 처음부터 엔딩까지 자동 플레이 |

## 새 그림 넣는 순서

1. `art/` 폴더에 이름 규칙대로 그림을 넣습니다(PNG 권장, 투명 배경이면 가장 좋음).
2. 처음 한 번: `pip install pillow`
3. `python tools/import_art.py`
4. `python tools/build.py`
5. `index.html`을 브라우저로 열어 확인합니다: 제목 화면 단체 그림, 1장 멤버 소개(네 명 카드), 미션 1-1, 2장 첫 장면, 5장 웹툰 컷, 포카 도감.
6. `git add -A && git commit -m "새 그림 반영" && git push`

`art/` 원본 그림도 함께 커밋해 두면 나중에 다시 변환할 수 있습니다.

## 그림 이름 규칙

`인물_표정.png` 형식입니다. 없는 표정은 `src/art.js`의 `MOOD_CHAIN` 순서대로 비슷한 표정 → `normal`로 대신 쓰입니다.
조연 그림(`oh_normal.png` 등)을 넣으면 직접 그린 단순한 SVG 대신 그 그림이 자동으로 쓰입니다.

| 인물 id | 이름 | 역할 | 만들 표정 |
| --- | --- | --- | --- |
| serin | 세린 | 리더·메인댄서, 걸크러시 (대표 색 보라) | normal, happy, angry, worried |
| yuha | 유하 | 메인보컬, 노력파 (코랄핑크) | normal, angry, think, tired(연습복+마스크) |
| taeo | 태오 | 래퍼·팬 소통, 밝음 (민트) | normal, smile, shy |
| ian | 이안 | 작곡·프로듀서, 비주얼 (남색·은색) | normal, happy, serious, worried |
| oh | 오실장 | 매니저 실장(40대) | normal, happy, worried |
| kang | 강태산 대표 | 라이벌 회사 대표 | normal |
| jisu | 지수 | 막내 스태프(근로자) | normal, worried |
| na | 나과장 | 굿즈 업체 영업 | normal |
| inspector | 공정위 조사관 | 6장 갈림길 | normal |
| haneul | 하늘 | 6학년 첫 팬, 3장 주인공 | normal, happy, worried |

그 밖의 그림: `lineup.png`(제목 화면 단체), `chibi.png`(미션 화면 꼬마 그림), `cut_lab.png`·`cut_cough.png`(5장 웹툰 컷, 16:9),
`face_인물.png`(선택, 포카 얼굴을 직접 지정할 때).

`title_stage.png`는 메인 화면 전용 무대 배경입니다. 인물·글자 없는 가로 그림을 사용하며, 변환 도구가 배경을 유지한 WebP로 저장합니다.

## 지켜야 할 것

- 여성 멤버 의상은 목선이 높은 불투명한 상의로 가슴·어깨·배를 충분히 가립니다. 가슴 트임, 깊은 목선, 크롭톱, 비치는 옷은 사용하지 않습니다. 세린은 허리 아래까지 오는 보라색 상의, 유하는 목선이 닫힌 소매 있는 원피스를 유지합니다.
- 아이들이 쓰는 수업 자료입니다. 연애 장면이나 실제 연예인·실제 아이돌을 닮은 그림, 남의 저작물 그림은 쓰지 않습니다.
- 멤버는 스무 살 안팎의 신인 아이돌로 설정했습니다(5장의 근로 시간 내용과 맞춤).
- 외부 라이브러리를 더하지 않고, 한 파일(`index.html`)로 열리는 구조를 유지합니다. (글꼴만 Google Fonts의 Jua 사용)
- 대사를 고칠 때는 `src/story.js`만 고치고, 말투는 지금처럼 "~해요" 존댓말을 유지합니다. `{ceo}`, `{group}`, `{group:은}` 같은 자리는 지우지 않습니다.
- 미션을 고친 뒤에는 `test/play.py`로 끝까지 돌려 보는 것을 권장합니다:
  `pip install playwright && python -m playwright install chromium && python test/play.py 1280 800 perfect L`
