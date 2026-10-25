/* ===== 게임 데이터: 포카, 숨은 이야기, 장별 시나리오 ===== */
/* 대사 형식: [누가, 표정, 말]  ·  {ceo} 대표 이름, {group} 그룹 이름, {group:은}처럼 조사 자동 */

const GAUGES = [
  { key: 'money', name: '자금', icon: '💰', color: '#F2B100' },
  { key: 'fans',  name: '팬',   icon: '⭐', color: '#FF3D7F' },
  { key: 'trust', name: '신뢰', icon: '🤝', color: '#2F6FEB' },
  { key: 'rep',   name: '평판', icon: '🌱', color: '#1E9B63' }
];

const POCAS = {
  household:  { ch: 1, who: 'yuha',  word: '가계',     def: '함께 살림하며 주로 소비를 하는 경제 주체예요. 우리 가족이 바로 가계예요.' },
  firm:       { ch: 1, who: 'serin', word: '기업',     def: '물건과 서비스를 생산해서 이윤을 얻으려는 경제 주체예요.' },
  market:     { ch: 1, who: 'taeo',  word: '시장',     def: '물건과 서비스를 사고파는 곳이에요. 벼룩시장처럼 눈에 보이는 시장도, 온라인 쇼핑처럼 보이지 않는 시장도 있어요.' },
  production: { ch: 1, who: 'ian', word: '생산',     def: '생활에 필요한 물건과 서비스를 만들어 내는 일이에요. 노래를 만들고 공연을 여는 것도 생산이에요.' },
  consumption:{ ch: 1, who: 'yuha',  word: '소비',     def: '필요한 물건과 서비스를 사서 쓰는 일이에요. 팬이 앨범을 사는 것도 소비예요.' },
  marketEcon: { ch: 2, who: 'serin', word: '시장 경제', def: '가계와 기업이 자유롭게 경제활동을 하고, 서로 경쟁하는 경제예요. 값은 시장에서 정해져요.' },
  freedom:    { ch: 2, who: 'taeo',  word: '경제활동의 자유', def: '개인은 직업과 돈 쓸 곳을, 기업은 무엇을 얼마나 만들지를 스스로 정할 수 있어요.' },
  competition:{ ch: 2, who: 'serin', word: '경쟁',     def: '더 좋은 물건을 더 알맞은 값에 팔려고 서로 겨루는 거예요. 덕분에 소비자는 더 좋은 것을 고를 수 있어요.' },
  income:     { ch: 3, who: 'yuha', word: '소득',     def: '일을 하고 받는 돈이에요. 가계는 소득으로 소비도 하고 저축도 해요.' },
  rational:   { ch: 3, who: 'ian',  word: '합리적 선택', def: '나에게 중요한 기준을 정하고, 정해진 돈으로 가장 큰 만족을 주는 것을 고르는 거예요.' },
  saving:     { ch: 3, who: 'taeo',  word: '저축',     def: '쓰고 남은 소득을 앞날을 위해 모아 두는 거예요.' },
  firmChoice: { ch: 4, who: 'ian',  word: '기업의 합리적 선택', def: '무엇을, 얼마나, 어떻게 만들지 정해서 적은 비용으로 큰 이윤을 얻으려는 선택이에요.' },
  profit:     { ch: 4, who: 'ian', word: '이윤',     def: '기업이 번 돈에서 쓴 돈을 빼고 남은 돈이에요.' },
  jobs:       { ch: 4, who: 'taeo', word: '일자리',   def: '기업은 일할 곳을 만들어서 가계에 소득을 줘요.' },
  tax:        { ch: 4, who: 'yuha',  word: '세금',     def: '나라 살림에 쓰이는 돈이에요. 기업도 세금을 내서 학교, 도로, 공원을 만드는 데 보태요.' },
  contract:   { ch: 5, who: 'ian',  word: '근로계약서', def: '일하는 시간, 쉬는 날, 임금, 임금 주는 날을 미리 약속해서 적어 두는 문서예요.' },
  laborLaw:   { ch: 5, who: 'taeo',  word: '근로기준법', def: '근로자가 일할 때 지켜져야 할 기준을 정한 법이에요. 하루 8시간, 일주일 40시간이 기준이에요.' },
  worker:     { ch: 5, who: 'yuha', word: '근로자',   def: '일을 하고 그 대가로 임금을 받는 사람이에요.' },
  workerRights:{ ch: 5, who: 'serin', word: '근로자의 권리', def: '정당한 임금, 알맞은 근로 시간과 휴식, 안전한 일터, 차별받지 않을 권리예요.' },
  firmFreedom:{ ch: 6, who: 'taeo',  word: '기업의 자유', def: '기업은 무엇을 만들지, 값을 얼마로 할지, 어떻게 팔지 스스로 정할 수 있어요.' },
  social:     { ch: 6, who: 'serin', word: '사회적 책임', def: '공정한 경쟁, 소비자 안전, 환경 보호처럼 기업이 사회의 한 구성원으로서 지켜야 할 책임이에요.' },
  ftc:        { ch: 6, who: 'ian',  word: '공정거래위원회', def: '기업들이 공정하게 경쟁하는지 살피고, 짜고 값을 올리는 담합 같은 일을 막는 국가 기관이에요.' },
  growth:     { ch: 7, who: 'serin', word: '경제성장', def: '한 나라에서 생산하는 물건과 서비스의 양이 늘어나는 거예요.' },
  industry:   { ch: 7, who: 'yuha', word: '산업의 변화', def: '우리나라는 경공업에서 중화학 공업으로, 다시 첨단 산업과 서비스 산업으로 성장해 왔어요.' },
  growthShadow:{ ch: 8, who: 'jisu', word: '경제성장의 그늘', def: '경제가 성장하면서 함께 생긴 문제예요. 환경 오염, 지역 격차, 소득 차이 등이 있어요.' },
  commons:    { ch: 8, who: 'haneul', word: '공유지의 비극', def: '"나 하나쯤이야" 하는 마음이 모여, 모두 함께 쓰는 곳이 망가지는 일이에요.' },
  together:   { ch: 8, who: 'oh', word: '함께 푸는 해결', def: '성장의 문제는 정부, 기업, 시민 단체, 개인이 저마다 할 일을 맡아 함께 풀어요.' },
  trade:      { ch: 9, who: 'taeo', word: '무역', def: '나라와 나라 사이에 물건이나 서비스를 사고파는 거예요.' },
  export:     { ch: 9, who: 'serin', word: '수출', def: '다른 나라에 물건이나 서비스를 파는 거예요. 앨범을 해외에 팔면 수출이에요.' },
  import:     { ch: 9, who: 'yuha', word: '수입', def: '다른 나라에서 물건이나 서비스를 사 오는 거예요. 칩을 사 오면 수입이에요.' },
  tradeReason:{ ch: 9, who: 'ian', word: '무역의 까닭', def: '나라마다 자원, 기술, 자연환경, 위치가 달라서 서로 잘 만드는 것을 사고팔아요.' },
  interdep:   { ch: 10, who: 'na', word: '상호의존', def: '나라끼리 무역으로 기대어 있어서, 한 나라의 일이 다른 나라에도 영향을 주는 거예요.' },
  coop:       { ch: 10, who: 'taeo', word: '협력', def: '나라와 나라, 기업과 기업이 어려운 문제를 함께 풀려고 서로 돕는 거예요.' },
  globalComp: { ch: 10, who: 'serin', word: '국제 경쟁', def: '여러 나라의 기업이 세계 시장에서 더 좋은 물건과 서비스를 팔려고 겨루는 거예요.' }
};

const STORIES = {
  taeo: { title: '태오의 지갑 속 편지', ch: 2, cond: '2장을 거의 틀리지 않고 끝내면 열려요.', lines: [
    ['taeo', 'smile', '대표님, 비밀 하나 알려 드릴까요?'],
    ['taeo', 'normal', '저 지갑에 편지 한 장을 넣고 다녀요. 연습생 때 처음 받은 팬레터예요.'],
    ['taeo', 'happy', '"태오 님 랩을 들으면 힘이 나요." 딱 이 한 줄이요. 이거 하나로 3년을 버텼어요.'],
    ['taeo', 'shy', '근데요, 그 편지 쓴 사람이 누군지 아세요? 하늘이예요. 하늘이한텐 아직 비밀이에요!']
  ]},
  haneul: { title: '하늘이가 처음 만난 날', ch: 3, cond: '3장을 거의 틀리지 않고 끝내면 열려요.', lines: [
    ['haneul', 'normal', '사실 나 처음엔 {group:을} 몰랐어.'],
    ['haneul', 'sad', '학원 끝나고 유난히 힘든 날이었는데, 공원에서 네 명이 버스킹을 하고 있더라.'],
    ['haneul', 'smile', '관객은 나 하나였어. 그런데도 끝까지 웃으면서 불러 줬어.'],
    ['haneul', 'happy', '그날부터 용돈 기입장 맨 위에 적어 둬. "{group} 데뷔하면 앨범 사기."']
  ]},
  ian: { title: '이안의 거스름돈 프로그램', ch: 4, cond: '4장 예산 나누기를 한 번에 성공하면 열려요.', lines: [
    ['ian', 'normal', '대표님, 저 예전에 숫자 계산이 어렵다는 친구를 위해 거스름돈 계산 프로그램을 만든 적이 있어요.'],
    ['ian', 'happy', '가진 돈에서 물건값을 빼면 거스름돈. 블록 몇 개면 끝나요.'],
    ['ian', 'serious', '그런데 그때 알았어요. 돈 계산은 결국 "어디에 쓸까"를 정하는 일이라는 걸요.'],
    ['ian', 'happy', '오늘 대표님 예산표, 제 프로그램보다 훨씬 똑똑했어요.']
  ]},
  yuha: { title: '유하가 그만두려던 날', ch: 5, cond: '5장 일정 짜기를 한 번에 성공하면 열려요.', lines: [
    ['yuha', 'think', '대표님, 저 사실 연습생을 그만두려고 짐까지 싼 적이 있어요.'],
    ['yuha', 'tired', '남들보다 늦게 시작해서, 하루라도 쉬면 뒤처질까 봐 무서웠거든요.'],
    ['yuha', 'think', '그때 삼촌 대표님이 그러셨어요. "유하야, 쉬는 것도 연습이다."'],
    ['yuha', 'happy', '오늘 대표님이 똑같은 말을 하셔서… 조금 울 뻔했어요. 비밀이에요.']
  ]},
  serin: { title: '세린의 바닷가', ch: 6, cond: '6장 판정과 담합 거절을 모두 한 번에 해내면 열려요.', lines: [
    ['serin', 'normal', '저 환경 동아리였어요. 바닷가에서 쓰레기를 줍는데, 버려진 앨범 포장이 잔뜩 나왔어요.'],
    ['serin', 'angry', '그때 다짐했어요. 내가 데뷔하면 쓰레기가 남지 않는 앨범을 만들겠다고.'],
    ['serin', 'happy', '대표님이 그 다짐을 지켜 주셨네요. 고마워요. 이건 진심이에요.']
  ]},
  oh: { title: '오실장과 삼촌의 첫 사무실', ch: 10, cond: '엔딩까지 가면 열려요.', lines: [
    ['oh', 'normal', '대표님, 이 회사가 처음 생긴 날 얘기 해 드릴까요?'],
    ['oh', 'smile', '삼촌이랑 저 둘이서, 책상 하나에 의자 두 개로 시작했어요. 통장엔 지금보다 더 적은 돈이 있었고요.'],
    ['oh', 'smile', '삼촌이 늘 하던 말이 있어요. "회사는 돈으로 굴러가지만, 사람으로 버틴다."'],
    ['oh', 'happy', '대표님을 보니까, 삼촌이 왜 대표님께 맡겼는지 알겠어요.']
  ]}
};

/* ===== 장별 시나리오 ===== */
const CHAPTERS = [
/* ---------------- 1장 ---------------- */
{
  no: 1, title: '우리는 누구랑 이어져 있을까?', topic: '시장, 가계, 기업', part: '생각 열기 · 탐구하기 1',
  nodes: [
    { type: 'scene', bg: 'street', label: '프롤로그', lines: [
      ['narr', '', '어느 날, 삼촌에게서 편지 한 통이 도착했습니다.'],
      ['uncle', '', '사랑하는 조카에게. 삼촌이 오랫동안 꾸려 온 작은 기획사 "반짝엔터"를 이제 너에게 맡기려고 해.'],
      ['uncle', '', '회사 사정이 많이 어렵단다. 그래도 아이들을 꼭 무대에 세워 주렴. 너라면 할 수 있어.'],
      ['narr', '', '편지에 적힌 주소를 따라가 보니, 낡은 건물 3층에 작은 간판이 걸려 있었습니다.']
    ]},
    { type: 'scene', bg: 'office', label: '프롤로그', lines: [
      ['oh', 'happy', '어서 오세요! 오늘부터 대표님이 되실 분이죠? 저는 이 회사 매니저 실장, 오실장이에요.'],
      ['oh', 'worried', '그런데 대표님… 놀라지 마세요. 우리 회사 통장에 남은 돈이 딱 50만 원이에요.'],
      ['oh', 'smile', '그래도 희망은 있어요. 100일 뒤 데뷔를 앞둔 아이들이 있거든요.'],
      ['oh', 'normal', '아, 먼저 대표님 이름이랑 데뷔할 그룹 이름부터 정해 볼까요?']
    ]},
    { type: 'names' },
    { type: 'scene', bg: 'practice', label: '프롤로그', lines: [
      ['serin', 'happy', '안녕하세요, {ceo} 대표님! 리더 세린이에요. 춤을 맡고 있고, 할 말은 하는 편이에요.'],
      ['yuha', 'smile', '메인보컬 유하예요. 아파도 연습은 절대 안 빠져요!'],
      ['taeo', 'happy', '태오요! 랩이랑 팬 소통 담당이에요. 대표님, 잘 부탁드려요!'],
      ['ian', 'normal', '…이안입니다. 작곡이랑 숫자 계산은 저한테 맡기세요.'],
      ['serin', 'normal', '솔직하게 말할게요. 우리 회사, 진짜 위험해요. 그래도 {group:은} 꼭 데뷔할 거예요.'],
      ['oh', 'normal', '자, 대표님. 회사를 살리려면 먼저 돈이 어디서 들어오고 어디로 나가는지 알아야 해요.']
    ]},
    { type: 'scene', bg: 'office', lines: [
      ['oh', 'normal', '경제활동을 하는 주인공들을 "경제 주체"라고 해요. 오늘은 그중 가계와 기업을 만나 볼 거예요.'],
      ['oh', 'smile', '가계는 함께 살림하며 주로 소비를 하는 곳이에요. 대표님네 집도, 팬들의 집도 가계예요.'],
      ['oh', 'smile', '기업은 물건이나 서비스를 생산해서 이윤을 얻으려는 곳이에요.'],
      ['oh', 'normal', '그리고 가계와 기업이 물건과 서비스를 사고파는 곳을 시장이라고 해요.'],
      ['ian', 'serious', '대표님, 우리 회사랑 이어진 곳들을 카드로 정리해 봤어요. 어디에 속하는지 나눠 주세요.']
    ]},
    { type: 'mission', id: '1-1', kind: 'sort', title: '나눠 담기', who: 'ian', mood: 'serious',
      prompt: '카드를 하나 누르고, 알맞은 상자를 눌러 담아 주세요.',
      gauge: 'trust', pocas: ['household', 'firm', 'market'], layout: 'bins3',
      bins: [{ id: 'h', label: '가계' }, { id: 'f', label: '기업' }, { id: 'm', label: '시장' }],
      cards: [
        { id: 'a', text: '하늘이네 가족', ans: 'h', hint: '하늘이네 가족은 함께 살림하며 물건을 사서 쓰는 곳이에요.' },
        { id: 'b', text: '세린네 부모님 댁', ans: 'h', hint: '세린네 부모님 댁도 함께 살림하는 집이에요.' },
        { id: 'c', text: '우리 반짝엔터', ans: 'f', hint: '우리 회사는 노래와 공연을 만들어 이윤을 얻으려는 곳이에요.' },
        { id: 'd', text: '응원봉 만드는 공장', ans: 'f', hint: '공장은 응원봉을 생산해서 파는 곳이에요.' },
        { id: 'e', text: '팬들이 앨범을 사고파는 온라인 쇼핑', ans: 'm', hint: '사고파는 일이 일어나는 곳이에요. 눈에 보이지 않는 시장이죠.' },
        { id: 'f', text: '주말마다 중고 앨범을 사고파는 벼룩시장', ans: 'm', hint: '여러 사람이 모여 사고파는 곳이에요. 눈에 보이는 시장이죠.' }
      ],
      ok: [['ian', 'happy', '완벽해요. 가계, 기업, 시장이 한눈에 보이네요.']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['oh', 'normal', '이제 이 셋 사이에 무엇이 오가는지 볼까요? 화살표마다 알맞은 말을 넣어 주세요.']
    ]},
    { type: 'mission', id: '1-2', kind: 'sort', title: '화살표 잇기', who: 'oh', mood: 'normal',
      prompt: '낱말을 누르고, 들어갈 빈칸을 눌러 주세요. 하나는 쓰지 않아요.',
      gauge: 'money', pocas: ['production', 'consumption'], layout: 'flow',
      bins: [
        { id: 'g', label: '반짝엔터 → 팬', cap: 1 },
        { id: 'p', label: '팬 → 반짝엔터', cap: 1 },
        { id: 'w', label: '멤버·직원 → 반짝엔터', cap: 1 },
        { id: 's', label: '반짝엔터 → 멤버·직원', cap: 1 }
      ],
      cards: [
        { id: 'a', text: '노래와 공연', ans: 'g', hint: '반짝엔터가 만들어서 팬에게 주는 건 노래와 공연이에요.' },
        { id: 'b', text: '돈', ans: 'p', hint: '팬은 노래와 공연을 즐기는 대가로 돈을 내요.' },
        { id: 'c', text: '일', ans: 'w', hint: '멤버와 직원은 회사에 일을 해 줘요.' },
        { id: 'd', text: '임금', ans: 's', hint: '회사는 일한 대가로 임금을 줘요.' },
        { id: 'x', text: '세금', ans: null, hint: '세금은 이 화살표 어디에도 들어가지 않아요.' }
      ],
      ok: [
        ['oh', 'happy', '맞아요! 반짝엔터가 노래와 공연을 만드는 건 생산, 팬들이 돈을 내고 즐기는 건 소비예요.']
      ]
    },
    { type: 'scene', bg: 'practice', lines: [
      ['taeo', 'shy', '어? 잠깐만요, 대표님. 그럼 저는요?']
    ]},
    { type: 'mission', id: '1-3', kind: 'choice', title: '함정 문제', who: 'taeo', mood: 'shy',
      prompt: '"대표님, 그럼 저는 가계예요, 기업이에요?"',
      gauge: 'trust', pocas: [],
      options: [
        { text: '태오는 기업이에요. 회사에서 일하니까요.', why: [['taeo', 'shy', '음… 그런데 연습 끝나고 집에 가면 저도 엄마랑 장 보러 가는데요?']] },
        { text: '태오는 가계예요. 회사랑은 상관없어요.', why: [['taeo', 'shy', '그럼 제가 매일 회사에서 연습하고 받는 임금은요?']] },
        { text: '태오네 가족은 가계이고, 태오는 그 가계의 구성원이면서 기업에서 일하는 사람이에요.', correct: true }
      ],
      ok: [['taeo', 'happy', '아하! 집에서는 가계의 구성원, 회사에서는 기업에서 일하는 사람이 되는 거네요.']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['oh', 'smile', '정리해 볼게요. 돈은 팬에게서 들어오고, 그 돈으로 멤버와 직원에게 임금을 드리는 거예요.'],
      ['oh', 'worried', '그런데 대표님… 통장엔 아직 50만 원뿐이에요.']
    ]},
    { type: 'scene', bg: 'office', preview: true, lines: [
      ['narr', '', '다음 날 아침, 태오가 휴대폰을 들고 사무실로 뛰어 들어왔습니다.'],
      ['taeo', 'shy', '대표님! 큰일 났어요! 메가톤엔터가 우리 쇼케이스랑 같은 날 공연한대요!']
    ]},
    { type: 'end' }
  ]
},
/* ---------------- 2장 ---------------- */
{
  no: 2, title: '라이벌 등장! 티켓값은 누가 정하지?', topic: '시장 경제와 자유로운 경쟁', part: '탐구하기 1',
  nodes: [
    { type: 'scene', bg: 'street', lines: [
      ['kang', 'smile', '아, 옆 건물 새 대표님이시구나. 저는 메가톤엔터 대표 강태산입니다.'],
      ['kang', 'smirk', '작은 회사는 금방 사라지는 법이죠. 같은 날 공연이라니, 재밌겠네요.'],
      ['serin', 'angry', '…저 사람, 일부러 같은 날로 잡은 거예요.'],
      ['oh', 'normal', '대표님, 우리나라는 시장 경제예요. 누구나 자유롭게 회사를 차리고, 서로 경쟁할 수 있어요.'],
      ['oh', 'smile', '메가톤도 자유롭게 공연을 열 수 있다는 뜻이죠. 우리는 우리 쇼케이스 티켓값부터 정해 봐요.']
    ]},
    { type: 'mission', id: '2-1', kind: 'steps', title: '티켓값 정하기', gauge: 'money', pocas: ['marketEcon'],
      steps: [
        { kind: 'price', who: 'ian', mood: 'serious',
          prompt: '팬 10명이 "이 값까지는 낼 수 있어요"라고 알려 줬어요. 값을 바꿔 가며, 수입이 가장 큰 티켓값을 찾아 정해 주세요.',
          fans: [5000, 10000, 10000, 15000, 20000, 20000, 25000, 30000, 30000, 40000],
          prices: [5000, 10000, 15000, 20000, 25000, 30000, 40000], answer: 20000 },
        { kind: 'choice', who: 'oh', mood: 'normal',
          prompt: '결국 티켓값을 정한 건 누구였을까요?',
          options: [
            { text: '대표님 마음대로 정한 거예요.', why: [['oh', 'normal', '4만 원으로 정했을 때를 떠올려 보세요. 사는 팬이 한 명뿐이었죠? 마음대로 정할 수는 없어요.']] },
            { text: '사려는 사람과 팔려는 사람이 만나는 시장에서 정해졌어요.', correct: true },
            { text: '나라에서 정해 준 값이에요.', why: [['oh', 'normal', '시장 경제에서는 나라가 티켓값을 정해 주지 않아요.']] }
          ] }
      ],
      ok: [['oh', 'happy', '맞아요. 시장 경제에서는 값이 시장에서 정해져요. 2만 원이면 팬 6명이 오고, 수입도 가장 커요.']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['narr', '', '며칠 뒤, 메가톤엔터가 티켓값을 1만 5천 원으로 내렸습니다. 공연장도 우리보다 두 배나 큽니다.'],
      ['taeo', 'sad', '대표님… 팬 두 명이 메가톤 공연으로 간대요.'],
      ['serin', 'angry', '가만히 있을 순 없어요. 어떻게 맞설지 정해 주세요.']
    ]},
    { type: 'mission', id: '2-2', kind: 'multi', title: '메가톤의 반격', who: 'serin', mood: 'angry',
      prompt: '어떻게 맞설까요? 알맞은 방법을 모두 골라 주세요.',
      gauge: 'fans', pocas: ['freedom'],
      options: [
        { text: '노래와 무대를 더 좋게 준비한다', correct: true },
        { text: '공연이 끝난 뒤 팬과 만나는 시간을 더한다', correct: true },
        { text: '티켓값을 조금 내린다', correct: true },
        { text: '메가톤 그룹에 대한 나쁜 소문을 퍼뜨린다', why: [['taeo', 'shy', '대표님, 그건 경쟁이 아니라 반칙이에요!']] },
        { text: '팬들에게 메가톤 공연에는 가지 말라고 한다', why: [['serin', 'normal', '팬들도 어느 공연에 갈지 스스로 고를 자유가 있어요.']] }
      ],
      missing: [['oh', 'normal', '좋은 방법이 더 있어요. 반칙이 아니라면 무엇이든 해 볼 수 있어요.']],
      ok: [['oh', 'smile', '좋아요. 기업은 무엇을 어떻게 만들지 자유롭게 정할 수 있어요. 팬도 어디에 돈을 쓸지 자유롭게 고르고요.']]
    },
    { type: 'mission', id: '2-3', kind: 'multi', title: '하늘이에게 좋은 점', who: 'oh', mood: 'normal',
      prompt: '두 기획사가 경쟁하면 팬 하늘이에게는 어떤 좋은 일이 생길까요? 모두 골라 주세요.',
      gauge: 'fans', pocas: ['competition'],
      options: [
        { text: '더 좋은 공연을 볼 수 있다', correct: true },
        { text: '더 알맞은 값에 티켓을 살 수 있다', correct: true },
        { text: '고를 수 있는 그룹과 공연이 많아진다', correct: true },
        { text: '티켓이 무조건 공짜가 된다', why: [['oh', 'normal', '공짜가 되면 회사가 문을 닫겠죠? 값이 공짜가 아니라 알맞아지는 거예요.']] },
        { text: '결국 한 회사만 남는다', why: [['oh', 'normal', '공정하게 경쟁하면 여러 회사가 함께 노력하게 돼요.']] }
      ],
      missing: [['oh', 'normal', '하늘이에게 좋은 일이 더 있어요. 다시 살펴볼까요?']],
      ok: [['taeo', 'happy', '대표님, 팬들이 우리 무대를 기다린대요! 공연 끝나고 만나는 시간 덕분인가 봐요!']]
    },
    { type: 'scene', bg: 'office', preview: true, lines: [
      ['narr', '', '그날 저녁, 사무실 우편함에 꾹꾹 눌러 쓴 손편지 한 통이 들어 있었습니다.'],
      ['letter', '', '안녕하세요. 저는 6학년 하늘이에요. {group} 데뷔하면 다 사고 싶은데… 제 용돈으로는 다 못 사요.']
    ]},
    { type: 'end', story: 'taeo' }
  ]
},
/* ---------------- 3장 ---------------- */
{
  no: 3, title: '하늘이의 용돈 3만 원', topic: '가계의 합리적 선택', part: '탐구하기 1',
  nodes: [
    { type: 'scene', bg: 'room', lines: [
      ['narr', '', '이번 장에서는 잠시 팬 하늘이가 되어 봅니다.'],
      ['haneul', 'normal', '이번 달 용돈은 3만 원. 엄마 아빠가 일해서 버신 소득에서 나온 돈이야.'],
      ['haneul', 'worried', '{group} 데뷔 앨범, 쇼케이스 티켓, 응원봉… 다 갖고 싶은데.'],
      ['haneul', 'surprised', '아, 그리고 다음 주에 지민이 생일 선물도 사 주기로 약속했지!']
    ]},
    { type: 'mission', id: '3-1', kind: 'choice', title: '왜 다 살 수 없을까?', who: 'haneul', mood: 'worried',
      prompt: '하늘이는 왜 갖고 싶은 걸 다 살 수 없을까요?',
      gauge: 'fans', pocas: ['income'],
      options: [
        { text: '쓸 수 있는 돈이 한정되어 있어서', correct: true },
        { text: '부모님이 사지 말라고 해서', why: [['haneul', 'normal', '엄마는 내 용돈이니까 내가 정하래.']] },
        { text: '가게에 물건이 모자라서', why: [['haneul', 'normal', '인터넷 보니까 앨범은 넉넉하던데…']] }
      ],
      ok: [['haneul', 'smile', '맞아. 갖고 싶은 건 많은데 돈은 3만 원뿐이야. 그러니까 골라야 해.']]
    },
    { type: 'scene', bg: 'room', lines: [
      ['narr', '', '그때 휴대폰이 울렸습니다. {group} 공식 계정에서 온 답장이었어요!'],
      ['ian', 'happy', '하늘아, 편지 고마워! 나 이안이야. 숫자 계산이라면 자신 있어.'],
      ['ian', 'serious', '고를 땐 먼저 나한테 중요한 기준을 정해 봐. 그다음 정해진 돈 안에서 만족이 가장 큰 걸 고르는 거야.'],
      ['haneul', 'happy', '이안 님이 답장을…! 좋아, 기준표를 만들어 보자!']
    ]},
    { type: 'mission', id: '3-2', kind: 'shop', title: '선택 기준표', who: 'ian', mood: 'happy',
      prompt: '① 나에게 중요한 기준 2개 고르기  ② 3만 원 안에서 살 것 고르기  ③ 고른 까닭 고르기',
      gauge: 'fans', pocas: ['rational'], budget: 30000,
      criteria: [
        { id: 'price', text: '값이 싼가' },
        { id: 'need', text: '꼭 필요한가' },
        { id: 'joy', text: '얼마나 만족할까' },
        { id: 'long', text: '오래 쓸 수 있나' }
      ],
      items: [
        { id: 'album', text: '데뷔 앨범', price: 20000, icon: '💿', note: '노래는 계속 들을 수 있어' },
        { id: 'ticket', text: '쇼케이스 티켓', price: 20000, icon: '🎟️', note: '직접 보는 건 딱 한 번뿐' },
        { id: 'stick', text: '응원봉', price: 25000, icon: '🔦', note: '티켓이 없으면 쓸 일이 없을지도' },
        { id: 'gift', text: '친구 생일 선물', price: 10000, icon: '🎁', note: '다음 주에 주기로 약속했어' }
      ],
      reasons: [
        { text: '값이 싸서 돈을 아낄 수 있어서', crit: 'price' },
        { text: '꼭 필요한 것부터 먼저 샀어', crit: 'need' },
        { text: '내가 가장 행복해질 것 같아서', crit: 'joy' },
        { text: '오래 두고 쓸 수 있어서', crit: 'long' },
        { text: '친구가 사라고 해서', crit: null, why: [['ian', 'serious', '내 기준으로 고른 게 아니면 나중에 후회할 수도 있어. 내가 정한 기준을 다시 볼까?']] }
      ],
      ok: [['ian', 'happy', '멋지다, 하늘아! 기준을 정하고 그 기준대로 골랐으니 합리적 선택이야. 정답은 사람마다 다를 수 있어.']]
    },
    { type: 'scene', bg: 'room', lines: [
      ['haneul', 'worried', '그런데 친구 수아는 랜덤 포카를 모으려고 같은 앨범을 다섯 장이나 산대. 10만 원이래!']
    ]},
    { type: 'mission', id: '3-3', kind: 'choice', title: '함정 문제', who: 'haneul', mood: 'worried',
      prompt: '수아의 선택이 합리적인지 따져 보는 가장 좋은 방법은 무엇일까요?',
      gauge: 'rep', pocas: ['saving'],
      options: [
        { text: '많이 살수록 무조건 합리적이다', why: [['ian', 'serious', '많이 산다고 만족이 그만큼 커지는 건 아니야. 같은 앨범 다섯 장이면 노래는 똑같잖아.']] },
        { text: '같은 돈으로 더 큰 만족을 주는 다른 선택은 없는지 따져 본다. 한 장만 사고 남은 돈은 저축할 수도 있다.', correct: true },
        { text: '친구들이 다 사니까 따라 사는 게 합리적이다', why: [['ian', 'serious', '다른 사람 기준이 아니라 내 기준으로 골라야 해.']] }
      ],
      ok: [['haneul', 'smile', '그렇구나. 남은 돈을 저축해 두면 다음에 정말 갖고 싶은 걸 살 수 있겠다!']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['narr', '', '하늘이의 이야기는 {group}에게도 전해졌습니다.'],
      ['oh', 'smile', '팬들은 이렇게 꼼꼼하게 고르는구나. 우리도 그 돈이 아깝지 않은 무대를 만들어야겠어요.']
    ]},
    { type: 'scene', bg: 'office', preview: true, lines: [
      ['narr', '', '그때, 사무실 전화가 울렸습니다.'],
      ['phone', '', '반짝엔터 대표님이시죠? {group}의 연습 영상을 봤습니다. 5천만 원, 투자하겠습니다.']
    ]},
    { type: 'end', story: 'haneul' }
  ]
},
/* ---------------- 4장 ---------------- */
{
  no: 4, title: '첫 투자금 5천만 원', topic: '기업의 역할', part: '탐구하기 1',
  nodes: [
    { type: 'scene', bg: 'office', lines: [
      ['oh', 'happy', '대표님! 5천만 원이에요! 이제 데뷔 준비를 제대로 할 수 있어요.'],
      ['oh', 'normal', '기업은 무엇을, 얼마나, 어떻게 만들지 스스로 정해요. 적은 비용으로 큰 이윤을 얻을 수 있게 따져 보면서요.'],
      ['ian', 'serious', '항목별 견적을 뽑아 왔어요. 모두 "보통"으로 하면 딱 5천만 원이에요.']
    ]},
    { type: 'mission', id: '4-1', kind: 'steps', title: '예산 나누기', gauge: 'money', pocas: ['firmChoice', 'profit'],
      steps: [
        { kind: 'budget', who: 'ian', mood: 'serious',
          prompt: '항목마다 적게, 보통, 많이 가운데 하나를 골라 주세요. 한 곳에 더 쓰려면 다른 곳을 줄여야 해요.',
          budget: 5000,
          items: [
            { id: 'song', text: '노래 만들기', icon: '🎵', costs: [500, 1000, 2000], min: 1, why: [['ian', 'serious', '대표님, 우리가 파는 건 결국 노래예요. 노래는 보통 이상이어야 해요.']] },
            { id: 'dance', text: '안무와 무대 연습', icon: '💃', costs: [300, 600, 1000], min: 1, why: [['serin', 'worried', '안무 연습이 부족하면 무대에서 실수할 거예요. 보통 이상은 돼야 해요.']] },
            { id: 'mv', text: '뮤직비디오', icon: '🎬', costs: [500, 1000, 2000] },
            { id: 'outfit', text: '무대 의상', icon: '👗', costs: [200, 400, 800] },
            { id: 'ad', text: '광고', icon: '📣', costs: [500, 1000, 2000] },
            { id: 'staff', text: '스태프 뽑기', icon: '🧑‍💼', costs: [500, 1000, 1500] }
          ],
          over: [['ian', 'worried', '대표님, 5천만 원을 넘었어요. 어딘가를 줄여야 해요.']] },
        { kind: 'choice', who: 'oh', mood: 'normal',
          prompt: '이렇게 나눈 까닭은 무엇인가요?',
          options: [
            { text: '적은 비용으로 큰 이윤을 얻으려고', correct: true },
            { text: '돈을 최대한 빨리 다 쓰려고', why: [['ian', 'worried', '빨리 쓰는 게 목표면 회사가 금방 어려워져요.']] },
            { text: '메가톤보다 무조건 많이 쓰려고', why: [['oh', 'normal', '많이 쓴다고 이윤이 커지는 건 아니에요. 따져서 써야 해요.']] }
          ] }
      ],
      ok: [['oh', 'smile', '이윤은 번 돈에서 쓴 돈을 빼고 남은 돈이에요. 꼭 필요한 곳에 알맞게 써야 남는 게 있죠.']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['narr', '', '한 달 뒤, 반짝엔터 사무실이 북적이기 시작했습니다.'],
      ['jisu', 'happy', '안녕하세요! 이번에 새로 들어온 스태프 지수입니다. 열심히 하겠습니다!'],
      ['oh', 'smile', '대표님, 우리가 데뷔를 준비하면서 일거리가 생긴 사람이 꽤 많아요.']
    ]},
    { type: 'mission', id: '4-2', kind: 'multi', title: '일자리 찾기', who: 'oh', mood: 'smile',
      prompt: '반짝엔터가 데뷔를 준비하면서 일거리가 생긴 사람을 모두 골라 주세요.',
      gauge: 'trust', pocas: ['jobs'],
      options: [
        { text: '작곡가', correct: true },
        { text: '안무가', correct: true },
        { text: '뮤직비디오 감독', correct: true },
        { text: '스타일리스트', correct: true },
        { text: '응원봉 공장 직원', correct: true },
        { text: '새 스태프 지수', correct: true },
        { text: '팬 하늘이', why: [['oh', 'normal', '하늘이는 앨범과 티켓을 사는 소비자예요. 일거리가 생긴 건 아니에요.']] },
        { text: '메가톤엔터 강대표', why: [['oh', 'normal', '강대표님은 다른 회사 대표예요. 우리 덕분에 일거리가 생긴 건 아니죠.']] }
      ],
      missing: [['oh', 'normal', '더 있어요. 우리가 노래, 안무, 뮤직비디오, 의상, 응원봉을 준비하면 누가 바빠질까요?']],
      ok: [['jisu', 'happy', '저도 반짝엔터 덕분에 일자리가 생겼어요! 기업은 일할 곳을 만들어 주는 곳이네요.']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['narr', '', '첫 음원이 나오고, 처음으로 수입이 생겼습니다!'],
      ['taeo', 'happy', '대표님, 우리 노래가 음원 사이트에 올라갔어요!'],
      ['ian', 'worried', '그런데… 세금 고지서도 같이 왔어요.']
    ]},
    { type: 'mission', id: '4-3', kind: 'choice', title: '세금 고지서', who: 'ian', mood: 'worried',
      prompt: '기업이 낸 세금은 어디에 쓰일까요?',
      gauge: 'rep', pocas: ['tax'],
      options: [
        { text: '학교, 도로, 공원처럼 모두가 함께 쓰는 곳', correct: true },
        { text: '대표님 개인 용돈', why: [['ian', 'serious', '세금은 나라 살림에 쓰이는 돈이에요. 대표님 용돈이 아니에요.']] },
        { text: '세금은 안 내도 돼요. 숨기면 돼요.', why: [['oh', 'worried', '세금을 숨기면 법을 어기는 거예요. 세금을 내는 것도 기업이 하는 중요한 일이에요.']] }
      ],
      ok: [['oh', 'smile', '기업은 물건과 서비스를 만들고, 일자리를 만들고, 세금도 내요. 우리 회사도 이제 진짜 기업이네요.']]
    },
    { type: 'scene', bg: 'night', preview: true, lines: [
      ['narr', '', '데뷔 2주 전, 새벽 3시. 연습실 불이 아직 켜져 있었습니다.'],
      ['yuha', 'tired', '콜록콜록… 한 번만… 딱 한 번만 더…']
    ]},
    { type: 'end', story: 'ian' }
  ]
},
/* ---------------- 5장 ---------------- */
{
  no: 5, title: '유하가 쓰러졌다', topic: '근로자의 권리', part: '탐구하기 1',
  nodes: [
    { type: 'cut', img: 'cut_lab', lines: [
      ['narr', '', '데뷔 2주 전. 유하는 며칠째 감기에 걸렸지만 연습을 하루도 쉬지 않았습니다.']
    ]},
    { type: 'cut', img: 'cut_cough', lines: [
      ['ian', 'worried', '유하야, 오늘은 그만 쉬자. 목소리 다 상하겠어.'],
      ['yuha', 'tired', '괜찮아. 데뷔 전에 나만 뒤처질 순 없어.']
    ]},
    { type: 'scene', bg: 'night', lines: [
      ['narr', '', '쿵! 그날 밤, 연습실에서 유하가 쓰러졌습니다.'],
      ['serin', 'surprised', '유하야! 정신 차려!'],
      ['narr', '', '다행히 크게 다치진 않았지만, 의사 선생님은 적어도 사흘은 푹 쉬어야 한다고 했습니다.']
    ]},
    { type: 'scene', bg: 'office', lines: [
      ['jisu', 'worried', '대표님… 드릴 말씀이 있어요.'],
      ['jisu', 'sad', '저 석 달째 밤 11시까지 일했는데요… 근로계약서도 못 받았어요.'],
      ['oh', 'worried', '대표님, 지수 씨처럼 일하고 그 대가로 임금을 받는 사람을 근로자라고 해요.'],
      ['oh', 'normal', '근로자에게는 꼭 지켜져야 할 권리가 있어요. 지수 씨 근로계약서부터 다시 써 봐요.']
    ]},
    { type: 'mission', id: '5-1', kind: 'contract', title: '근로계약서 살피기', who: 'oh', mood: 'normal',
      prompt: '근로계약서에 꼭 들어가야 하는데 비어 있는 칸을 모두 눌러 주세요.',
      gauge: 'trust', pocas: ['contract'],
      fields: [
        { id: 'name', label: '이름', value: '김지수' },
        { id: 'job', label: '하는 일', value: '공연 준비 스태프' },
        { id: 'place', label: '일하는 곳', value: '반짝엔터' },
        { id: 'hours', label: '근로 시간', value: '', need: true, fill: '오전 10시 ~ 오후 7시 (점심시간 1시간)' },
        { id: 'off', label: '쉬는 날', value: '', need: true, fill: '토요일, 일요일' },
        { id: 'pay', label: '임금', value: '', need: true, fill: '매달 정한 월급 (최저임금보다 많이)' },
        { id: 'payday', label: '임금 주는 날', value: '', need: true, fill: '매달 25일' },
        { id: 'food', label: '좋아하는 음식', value: '', need: false, why: [['oh', 'smile', '좋아하는 음식은 근로계약서에 꼭 적어야 하는 내용이 아니에요. 궁금하긴 하지만요!']] }
      ],
      missing: [['oh', 'normal', '빠진 칸이 더 있어요. 언제, 얼마나 일하고, 얼마를 언제 받는지 떠올려 보세요.']],
      ok: [['jisu', 'happy', '이제 언제 일하고 언제 쉬는지, 임금은 얼마를 언제 받는지 다 알 수 있어요!']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['oh', 'normal', '근로기준법에서는 쉬는 시간을 빼고 하루 8시간, 일주일 40시간을 기준으로 정해요.'],
      ['oh', 'normal', '그리고 일주일에 하루 이상은 꼭 쉬는 날이 있어야 해요.'],
      ['jisu', 'worried', '지금 제 일정은 월요일부터 토요일까지, 하루 13시간이에요…']
    ]},
    { type: 'mission', id: '5-2', kind: 'schedule', title: '일주일 일정 다시 짜기', who: 'jisu', mood: 'worried',
      prompt: '지수 씨의 하루 일하는 시간과 일하는 날 수를 다시 정해 주세요. (쉬는 시간은 빼고 셉니다)',
      gauge: 'trust', pocas: ['laborLaw', 'worker'],
      hours: [6, 8, 10, 13], days: [4, 5, 6, 7], start: { hours: 13, days: 6 },
      ok: [
        ['oh', 'smile', '더 일해야 할 때는 지수 씨가 동의해야 하고, 더 일한 만큼 돈도 더 드려야 해요.'],
        ['serin', 'happy', '대표님, 저희 연습 일정에도 쉬는 시간이랑 쉬는 날을 넣었어요. 유하도 이제 밤에는 집에 가요.']
      ]
    },
    { type: 'scene', bg: 'office', lines: [
      ['oh', 'normal', '근로자의 권리는 누가 지켜 줄까요? 사실 한 곳만 지키는 게 아니에요.']
    ]},
    { type: 'mission', id: '5-3', kind: 'sort', title: '누가 지켜 주나', who: 'oh', mood: 'normal',
      prompt: '카드를 누르고, 근로자의 권리를 지키는 쪽을 골라 담아 주세요.',
      gauge: 'rep', pocas: ['workerRights'], layout: 'bins3',
      bins: [{ id: 'gov', label: '법과 정부' }, { id: 'co', label: '기업' }, { id: 'me', label: '근로자 스스로' }],
      cards: [
        { id: 'a', text: '근로기준법', ans: 'gov', hint: '근로기준법은 나라에서 만든 법이에요.' },
        { id: 'b', text: '최저임금', ans: 'gov', hint: '최저임금은 나라에서 해마다 정해요.' },
        { id: 'c', text: '일터 감독', ans: 'gov', hint: '정부가 일터를 살펴보며 법을 지키는지 확인해요.' },
        { id: 'd', text: '복지(휴게실, 건강 검진)', ans: 'co', hint: '휴게실과 건강 검진은 회사가 마련해 줘요.' },
        { id: 'e', text: '근무 시간 조정', ans: 'co', hint: '일하는 시간을 알맞게 바꾸는 건 회사가 할 수 있어요.' },
        { id: 'f', text: '근로 조건 개선', ans: 'co', hint: '일하는 환경을 더 좋게 바꾸는 건 회사의 몫이에요.' },
        { id: 'g', text: '근로계약서 꼼꼼히 읽기', ans: 'me', hint: '계약서를 읽고 확인하는 건 근로자 스스로 할 일이에요.' },
        { id: 'h', text: '노동조합', ans: 'me', hint: '노동조합은 근로자들이 스스로 모여 만든 단체예요.' }
      ],
      ok: [['serin', 'happy', '법과 정부, 기업, 근로자 스스로가 함께 지키는 거네요.']]
    },
    { type: 'scene', bg: 'practice', lines: [
      ['yuha', 'happy', '대표님, 덕분에 푹 쉬었어요. 쉬고 나니까 목소리가 더 잘 나와요!'],
      ['jisu', 'smile', '저도 이제 저녁엔 집에 가요. 계약서도 받았고요!']
    ]},
    { type: 'scene', bg: 'office', preview: true, lines: [
      ['narr', '', '데뷔 일주일 전. 대표 책상 위에 봉투 세 개가 놓여 있었습니다.']
    ]},
    { type: 'end', story: 'yuha' }
  ]
},
/* ---------------- 6장 ---------------- */
{
  no: 6, title: '달콤한 제안 세 개', topic: '기업의 자유와 사회적 책임', part: '탐구하기 1',
  nodes: [
    { type: 'scene', bg: 'office', lines: [
      ['narr', '', '데뷔를 앞두고 돈이 더 필요한 때, 대표 책상에 봉투 세 개가 도착했습니다.'],
      ['oh', 'normal', '기업은 무엇을 만들지, 값을 얼마로 할지 자유롭게 정할 수 있어요. 하지만 그 자유에는 책임도 따라요.'],
      ['oh', 'smile', '봉투를 하나씩 열어 보고, 제 메모까지 함께 판정해 주세요.']
    ]},
    { type: 'mission', id: '6-1', kind: 'sort', title: '판정하기', who: 'oh', mood: 'normal',
      prompt: '카드를 누르고 알맞은 판정 상자에 담아 주세요.',
      gauge: 'rep', pocas: ['firmFreedom', 'social'], layout: 'judge',
      bins: [{ id: 'free', label: '기업의 자유' }, { id: 'bad', label: '책임을 어김' }, { id: 'good', label: '책임을 다함' }],
      cards: [
        { id: 'a', who: 'na', text: '봉투 ① 나과장: "이 응원봉을 사면 키가 쑥쑥 큰다고 광고하면 대박 납니다! 사실이 아니어도 다들 믿어요."', ans: 'bad', hint: '사실이 아닌 광고로 소비자를 속이는 건 책임을 어기는 거예요.' },
        { id: 'b', who: 'kang', text: '봉투 ② 강대표: "우리 둘 다 티켓값을 10만 원으로 똑같이 올립시다. 팬들은 어차피 살 거예요."', ans: 'bad', hint: '기업끼리 짜고 값을 올리면 공정한 경쟁이 사라져요.' },
        { id: 'c', who: 'serin', text: '봉투 ③ 세린: "앨범 포장을 다시 쓸 수 있는 종이로 바꾸고, 포카는 원하는 멤버를 골라 살 수 있게 해요."', ans: 'good', hint: '환경을 지키고 소비자를 배려하는 건 책임을 다하는 거예요.' },
        { id: 'd', who: 'oh', text: '오실장 메모: "새 앨범 콘셉트를 우주 여행으로 할지 학교로 할지는 우리가 정하면 돼요."', ans: 'free', hint: '무엇을 만들지 스스로 정하는 건 기업의 자유예요.' }
      ],
      ok: [['serin', 'happy', '대표님 덕분에 떳떳하게 무대에 설 수 있겠어요!']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['narr', '', '그날 오후, 강대표에게서 전화가 걸려 왔습니다.'],
      ['kang', 'smirk', '봉투 보셨죠? 10만 원으로 같이 올리면 우리 둘 다 큰돈을 벌어요. 받아들이실 거죠?']
    ]},
    { type: 'mission', id: '6-2', kind: 'steps', title: '담합 제안', gauge: 'rep', pocas: ['ftc'],
      steps: [
        { kind: 'choice', who: 'kang', mood: 'smirk',
          prompt: '강대표의 제안에 어떻게 대답할까요?',
          options: [
            { text: '좋아요, 같이 올려요.', branch: 'collusion', why: [
              ['narr', '', '티켓값을 10만 원으로 올리자 잠깐 돈이 들어왔습니다. 그런데 일주일 뒤…'],
              ['inspector', 'normal', '공정거래위원회 조사관입니다. 메가톤엔터와 짜고 티켓값을 올리셨죠?'],
              ['inspector', 'angry', '기업끼리 짜고 값을 정하는 건 담합이에요. 소비자가 고를 자유를 빼앗는 일이라 과징금을 내셔야 합니다.'],
              ['oh', 'sad', '대표님… 평판이 크게 떨어졌어요. 다시 생각해 봐요.']
            ] },
            { text: '거절할게요. 값은 각자 정하고 공정하게 경쟁해요.', correct: true }
          ] },
        { kind: 'choice', who: 'oh', mood: 'smile',
          prompt: '담합을 거절하면 누가 지켜질까요?',
          options: [
            { text: '하늘이 같은 소비자', correct: true },
            { text: '메가톤엔터', why: [['oh', 'normal', '메가톤은 오히려 큰돈을 벌 기회를 놓쳤어요. 지켜진 건 다른 쪽이에요.']] },
            { text: '아무도 지켜지지 않는다', why: [['oh', 'normal', '2장에서 경쟁이 누구에게 도움이 됐는지 떠올려 보세요.']] }
          ] }
      ],
      ok: [['oh', 'happy', '맞아요. 공정거래위원회는 기업들이 공정하게 경쟁하는지 살펴요. 덕분에 소비자가 지켜지죠.']]
    },
    { type: 'mission', id: '6-3', kind: 'choice', title: '오늘의 한 문장', who: 'oh', mood: 'normal',
      prompt: '기업에 자유가 있는데, 왜 책임도 져야 할까요?',
      gauge: 'rep', pocas: [],
      options: [
        { text: '기업도 사회의 한 구성원이고, 기업의 선택이 소비자와 환경과 근로자에게 영향을 주기 때문에', correct: true },
        { text: '책임을 지면 무조건 돈을 더 많이 벌어서', why: [['oh', 'normal', '돈을 더 벌기 위해서만은 아니에요. 기업의 선택이 누구에게 영향을 주는지 생각해 봐요.']] },
        { text: '나라에서 시켜서 어쩔 수 없이', why: [['oh', 'normal', '법을 지키는 것도 중요하지만, 기업이 사회의 한 구성원이라는 점이 더 중요해요.']] }
      ],
      ok: [['oh', 'smile', '기업은 자유롭게 이윤을 추구하되, 사회의 한 구성원으로서 책임을 다해야 해요.']]
    },
    { type: 'scene', bg: 'stage', preview: true, lines: [
      ['narr', '', '드디어 데뷔 당일. 무대 뒤에서 네 사람이 손을 모았습니다.']
    ]},
    { type: 'end', story: 'serin' }
  ]
},
/* ---------------- 7장 ---------------- */
{
  no: 7, title: '데뷔 무대, 그리고 1년 뒤', topic: '경제성장', part: '탐구하기 2',
  nodes: [
    { type: 'scene', bg: 'stage', lines: [
      ['narr', '', '조명이 켜지고, 함성이 터졌습니다.'],
      ['serin', 'happy', '하나, 둘, 셋! 안녕하세요, {group}입니다!'],
      ['haneul', 'happy', '와아아! {group}!!!'],
      ['narr', '', '그리고 1년 뒤.']
    ]},
    { type: 'scene', bg: 'office', lines: [
      ['oh', 'happy', '대표님, 믿기세요? 직원이 5명에서 30명이 됐어요.'],
      ['taeo', 'happy', '다른 나라 팬들도 우리 앨범을 산대요! 해외 공연 요청도 왔어요!'],
      ['oh', 'smile', '회사가 커지면서 나라 경제에도 작은 보탬이 됐어요. 한 나라의 생산이 늘어나는 걸 경제성장이라고 해요.']
    ]},
    { type: 'mission', id: '7-1', kind: 'order', title: '성장의 고리', who: 'oh', mood: 'smile',
      prompt: '경제가 성장하는 고리를 차례대로 눌러 주세요.',
      gauge: 'money', pocas: ['growth'],
      items: [
        '앨범과 공연을 더 많이 만든다',
        '일하는 사람이 늘어난다',
        '사람들의 소득이 늘어난다',
        '물건과 서비스를 더 많이 산다'
      ],
      ok: [['oh', 'happy', '그리고 사람들이 더 많이 사면, 다시 더 많이 만들게 돼요. 이 고리가 돌면서 경제가 성장해요.']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['taeo', 'happy', '대표님! 티켓값만 두 배로 올렸더니 매출이 두 배가 됐어요! 우리 성장한 거 맞죠?']
    ]},
    { type: 'mission', id: '7-2', kind: 'choice', title: '함정 문제', who: 'taeo', mood: 'happy',
      prompt: '티켓값만 두 배로 올려서 매출이 두 배가 됐다면, 성장한 걸까요?',
      gauge: 'fans', pocas: [],
      options: [
        { text: '맞아요. 돈이 늘었으니까 성장한 거예요.', why: [['oh', 'normal', '만든 공연과 앨범은 그대로예요. 값만 오른 거죠.']] },
        { text: '아니에요. 만든 공연과 앨범의 양이 늘어야 성장이에요.', correct: true }
      ],
      ok: [['taeo', 'shy', '아, 그렇구나! 값만 올리면 팬들만 힘들어지겠네요. 취소할게요!']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['oh', 'smile', '대표님, 이거 보실래요? 삼촌이 모아 두신 옛날 사진첩이에요.'],
      ['oh', 'normal', '시대마다 우리나라를 이끈 산업 사진이 있어요. 알맞은 칸에 넣어 주세요.']
    ]},
    { type: 'mission', id: '7-3', kind: 'steps', title: '오실장의 옛날 사진첩', gauge: 'money', pocas: ['industry'],
      steps: [
        { kind: 'sort', who: 'oh', mood: 'normal', layout: 'timeline',
          prompt: '사진 카드를 누르고, 알맞은 시대 칸을 눌러 주세요.',
          bins: [
            { id: 's60', label: '1960년대', cap: 1 },
            { id: 's70', label: '1970년대', cap: 1 },
            { id: 's80', label: '1980년대', cap: 1 },
            { id: 's90', label: '1990년대', cap: 1 },
            { id: 's00', label: '2000년대 이후', cap: 1 }
          ],
          cards: [
            { id: 'a', text: '👕 섬유, 신발, 가발 (경공업)', ans: 's60', hint: '경공업은 우리나라 산업이 처음 자라던 1960년대에 발달했어요.' },
            { id: 'b', text: '🏭 철강, 석유 화학, 배 (중화학 공업)', ans: 's70', hint: '중화학 공업은 1970년대에 크게 키웠어요.' },
            { id: 'c', text: '🚗 자동차, 전자 제품', ans: 's80', hint: '자동차와 전자 제품은 1980년대에 수출이 크게 늘었어요.' },
            { id: 'd', text: '💾 반도체, 컴퓨터, 정보 통신', ans: 's90', hint: '반도체와 정보 통신은 1990년대에 빠르게 자랐어요.' },
            { id: 'e', text: '🎤 첨단 산업, 문화 콘텐츠, 관광, 의료', ans: 's00', hint: '첨단 산업과 서비스 산업은 2000년대 이후에 크게 자랐어요.' }
          ] },
        { kind: 'choice', who: 'oh', mood: 'smile',
          prompt: '우리 반짝엔터는 어느 칸에 들어갈까요?',
          options: [
            { text: '1960년대 경공업', why: [['oh', 'normal', '우리는 옷이나 가발을 만드는 회사가 아니에요.']] },
            { text: '1990년대 반도체', why: [['oh', 'normal', '우리는 반도체를 만들지 않아요. 노래와 공연을 만들죠.']] },
            { text: '2000년대 이후 문화 콘텐츠', correct: true }
          ] }
      ],
      ok: [['oh', 'happy', '1960년대 가발 공장에서 시작한 나라가, 이제 노래와 공연을 세계에 파는 나라가 됐어요.']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['taeo', 'normal', '대표님, 그런데 다른 나라 팬이 우리 앨범을 사면 나라와 나라 사이엔 무슨 일이 생기는 거예요?'],
      ['oh', 'smile', '그건… 조금 뒤에 함께 알아봐요!']
    ]},
    { type: 'scene', bg: 'park', preview: true, lines: [
      ['narr', '', '그날 밤, 공연장 앞 공원 사진 한 장이 인터넷에 올라왔습니다.'],
      ['haneul', 'worried', '대표님, 공원 잔디가 쓰레기로 덮였어요. 사람들이 팬들 탓을 해요.']
    ]},
    { type: 'end' }
  ]
},
/* ---------------- 8장 ---------------- */
{
  no: 8, title: '1년 뒤, 반짝이지 않는 것들', topic: '경제성장의 그늘과 해결', part: '탐구하기 2',
  nodes: [
    { type: 'scene', bg: 'office', lines: [
      ['narr', '', '데뷔 1년 뒤, 반짝엔터는 몰라보게 커졌습니다.'],
      ['oh', 'happy', '대표님, 이번 달 회사 수입이 1년 전보다 세 배나 늘었어요!'],
      ['taeo', 'happy', '다른 나라 팬들도 우리 노래를 따라 불러요!'],
      ['narr', '', '그런데 좋은 소식만 있는 건 아니었습니다.'],
      ['jisu', 'worried', '대표님… 회사 수입은 세 배가 됐는데, 스태프 월급은 그대로예요.'],
      ['ian', 'worried', '팬 게시판에도 걱정하는 글이 많이 올라왔어요.'],
      ['oh', 'normal', '성장하면서 좋아진 점과 새로 생긴 문제를 먼저 나눠 볼까요?']
    ]},
    { type: 'mission', id: '8-1', kind: 'sort', title: '나눠 담기', who: 'oh', mood: 'normal',
      prompt: '카드를 하나 누르고, 알맞은 상자를 눌러 담아 주세요.',
      gauge: 'money', pocas: ['growthShadow'], layout: 'bins2',
      bins: [{ id: 'up', label: '좋아진 점' }, { id: 'new', label: '새로 생긴 문제' }],
      cards: [
        { id: 'a', text: '직원이 5명에서 30명으로 늘었어요', ans: 'up', hint: '일자리가 늘어난 건 성장으로 좋아진 점이에요.' },
        { id: 'b', text: '공연장 앞 공원이 쓰레기로 덮였어요', ans: 'new', hint: '환경이 더러워진 건 성장하면서 새로 생긴 문제예요.' },
        { id: 'c', text: '멤버 가족의 생활이 넉넉해졌어요', ans: 'up', hint: '소득이 늘어 생활이 넉넉해진 건 좋아진 점이에요.' },
        { id: 'd', text: '공연이 서울에서만 열려 다른 지역 팬은 보러 오기 어려워요', ans: 'new', hint: '사는 곳에 따라 누릴 수 있는 것이 달라진 건 새로 생긴 문제예요.' },
        { id: 'e', text: '우리 노래가 다른 나라에도 알려졌어요', ans: 'up', hint: '노래가 세계로 퍼진 건 성장으로 좋아진 점이에요.' },
        { id: 'f', text: '회사 수입은 세 배가 됐는데 스태프 월급은 그대로예요', ans: 'new', hint: '성장으로 번 돈이 골고루 나뉘지 않은 건 새로 생긴 문제예요.' },
        { id: 'g', text: '일회용 응원 굿즈가 쌓여 버려져요', ans: 'new', hint: '버려지는 쓰레기가 늘어난 건 새로 생긴 환경 문제예요.' }
      ],
      ok: [['oh', 'smile', '성장하면 좋아지는 점도 많지만, 환경 오염이나 격차 같은 그늘도 생겨요.']]
    },
    { type: 'scene', bg: 'park', lines: [
      ['narr', '', '다음 공연 날, {ceo} 대표는 공연장 앞 공원에 직접 가 보았습니다.'],
      ['narr', '', '팬들이 잔디 위에 자리를 깔고, 나무마다 현수막을 묶어 두었습니다.'],
      ['haneul', 'worried', '대표님, 잔디가 다 누렇게 죽었어요. 나무도 끈에 쓸려서 다쳤고요.'],
      ['haneul', 'normal', '그런데 다들 "나 한 명쯤은 괜찮겠지" 하고 자리를 깔았대요.']
    ]},
    { type: 'mission', id: '8-2', kind: 'steps', title: '공원을 지켜라', gauge: 'rep', pocas: ['commons'],
      steps: [
        { kind: 'choice', who: 'haneul', mood: 'worried',
          prompt: '공원 잔디는 왜 망가졌을까요?',
          options: [
            { text: '공원이 원래 너무 좁아서', why: [['haneul', 'normal', '공원 넓이는 1년 전과 똑같아요. 달라진 건 공원을 쓰는 모습이에요.']] },
            { text: '저마다 "나 한 명쯤은 괜찮겠지" 하고, 모두 함께 쓰는 공원을 마구 써서', correct: true },
            { text: '잔디가 원래 약해서', why: [['oh', 'normal', '잔디는 그동안 잘 자랐어요. 공연 날마다 망가지기 시작했죠.']] }
          ] },
        { kind: 'multi', who: 'oh', mood: 'normal',
          prompt: '함께 쓰는 곳이 이렇게 망가지는 걸 "공유지의 비극"이라고 해요. 공원을 지킬 방법을 모두 골라 주세요. 알맞은 방법은 다 고르고, 알맞지 않은 방법은 빼야 성공이에요.',
          options: [
            { text: '공원 이용 규칙을 팬들과 함께 만들고 알린다', correct: true },
            { text: '공원에 아무도 못 들어가게 막아 버린다', why: [['oh', 'worried', '공원은 모두가 함께 쓰는 곳이라 막는 건 답이 아니에요.']] },
            { text: '공연이 끝나면 회사가 정리하는 사람을 둔다', correct: true },
            { text: '팬클럽 이름으로 공원에 나무를 심는다', correct: true },
            { text: '아무것도 하지 않는다', why: [['haneul', 'worried', '그대로 두면 잔디는 계속 망가지고, 팬들 이름도 나빠져요.']] }
          ],
          missing: [['oh', 'normal', '좋은 방법이 더 있어요. 팬과 회사가 저마다 할 수 있는 일을 떠올려 봐요.']] }
      ],
      ok: [
        ['haneul', 'happy', '다음 공연 날엔 팬들이 쓰레기 봉투를 들고 왔어요! 잔디도 다시 자랄 거예요.'],
        ['oh', 'smile', '함께 쓰는 곳은 함께 규칙을 정하고 지켜야 망가지지 않아요.']
      ]
    },
    { type: 'scene', bg: 'office', lines: [
      ['ian', 'serious', '공원은 지켰지만, 우리 회사 힘만으로는 다 못 푸는 문제도 있어요.'],
      ['oh', 'normal', '맞아요. 성장의 그늘은 정부, 기업, 시민 단체, 개인이 함께 풀어야 해요.'],
      ['oh', 'smile', '아이디어 카드마다 누가 맡으면 좋을지 나눠 볼까요?']
    ]},
    { type: 'mission', id: '8-3', kind: 'sort', title: '누가 풀까', who: 'oh', mood: 'normal',
      prompt: '아이디어 카드를 누르고, 그 일을 맡을 쪽의 상자를 눌러 담아 주세요.',
      gauge: 'trust', pocas: ['together'], layout: 'bins4',
      bins: [{ id: 'gov', label: '정부' }, { id: 'co', label: '기업' }, { id: 'ngo', label: '시민 단체' }, { id: 'me', label: '나(팬·개인)' }],
      cards: [
        { id: 'a', text: '최저임금과 근로 기준을 정하고 잘 지키는지 살펴본다', ans: 'gov', hint: '법과 기준을 정하고 살피는 건 정부가 하는 일이에요.' },
        { id: 'b', text: '이익이 늘면 직원 임금과 복지도 올린다', ans: 'co', hint: '번 돈을 일한 사람과 나누는 건 기업이 할 일이에요.' },
        { id: 'c', text: '일회용 굿즈 줄이기 캠페인을 연다', ans: 'ngo', hint: '시민들이 모인 단체가 캠페인으로 사람들의 생각을 바꿔요.' },
        { id: 'd', text: '다 쓴 응원봉을 수거함에 낸다', ans: 'me', hint: '내가 쓴 물건을 잘 버리는 건 나 스스로 할 수 있는 일이에요.' },
        { id: 'e', text: '서울 밖 여러 지역에서도 공연을 연다', ans: 'co', hint: '어디에서 공연할지는 기업이 정할 수 있어요.' },
        { id: 'f', text: '지방에도 공연장이 생기도록 돕는다', ans: 'gov', hint: '여러 지역이 고루 발전하도록 돕는 건 정부의 일이에요.' },
        { id: 'g', text: '공연 뒤 내 쓰레기는 내가 챙겨 간다', ans: 'me', hint: '내 쓰레기를 챙기는 건 나 스스로 할 수 있는 일이에요.' },
        { id: 'h', text: '여러 시민이 모여 공연장 주변 환경을 지키는 활동을 벌인다', ans: 'ngo', hint: '시민들이 뜻을 모아 함께 활동하는 건 시민 단체의 일이에요.' }
      ],
      ok: [
        ['oh', 'smile', '정부, 기업, 시민 단체, 개인이 저마다 할 일을 하면 성장의 그늘이 줄어요.'],
        ['jisu', 'happy', '대표님, 이번 달부터 스태프 월급도 올랐어요! 고맙습니다!']
      ]
    },
    { type: 'scene', bg: 'office', lines: [
      ['oh', 'smile', '숫자만 커지는 게 아니라, 모두가 함께 누려야 진짜 성장이에요.']
    ]},
    { type: 'scene', bg: 'office', preview: true, lines: [
      ['narr', '', '해외 팬 3만 명이 기다리는 월드 투어 제안서가 도착했습니다.'],
      ['taeo', 'happy', '대표님! 월드 투어래요! 여러 나라 팬들을 직접 만날 수 있어요!']
    ]},
    { type: 'end' }
  ]
},
/* ---------------- 9장 ---------------- */
{
  no: 9, title: '월드 투어 계획서', topic: '무역의 뜻과 까닭', part: '탐구하기 2',
  nodes: [
    { type: 'scene', bg: 'office', lines: [
      ['oh', 'normal', '월드 투어를 하려면 응원봉을 3만 개 더 만들고, 앨범도 다른 나라에 팔아야 해요.'],
      ['na', 'normal', '응원봉은 저희 공장에 맡기세요. 다만 부품 몇 가지는 다른 나라에서 사 와야 해요.'],
      ['oh', 'smile', '나라와 나라 사이에 물건이나 서비스를 사고파는 걸 무역이라고 해요.'],
      ['oh', 'normal', '다른 나라에 파는 건 수출, 다른 나라에서 사 오는 건 수입이에요.']
    ]},
    { type: 'mission', id: '9-1', kind: 'sort', title: '수출일까 수입일까', who: 'oh', mood: 'normal',
      prompt: '월드 투어 준비 카드를 누르고, 알맞은 상자에 담아 주세요. 다른 나라에 팔면 수출, 사 오면 수입이에요.',
      gauge: 'money', pocas: ['trade', 'export', 'import'], layout: 'bins2',
      bins: [{ id: 'ex', label: '수출' }, { id: 'im', label: '수입' }],
      cards: [
        { id: 'a', text: '💿 앨범 1만 장을 다른 나라 음반 가게에 판다', ans: 'ex', hint: '우리 앨범을 다른 나라에 파는 건 수출이에요.' },
        { id: 'b', text: '💡 응원봉에 들어갈 작은 칩을 다른 나라에서 사 온다', ans: 'im', hint: '다른 나라 물건을 사 오는 건 수입이에요.' },
        { id: 'c', text: '📺 해외 팬에게 공연 영상 서비스를 판다', ans: 'ex', hint: '눈에 보이지 않는 서비스도 다른 나라에 팔면 수출이에요.' },
        { id: 'd', text: '🧪 응원봉 플라스틱 원료를 다른 나라에서 사 온다', ans: 'im', hint: '원료를 다른 나라에서 사 오는 것도 수입이에요.' },
        { id: 'e', text: '💃 다른 나라 안무가에게 안무를 사 온다', ans: 'im', hint: '안무 같은 서비스도 다른 나라에서 사 오면 수입이에요.' }
      ],
      ok: [['oh', 'happy', '맞아요. 물건뿐 아니라 영상, 안무 같은 서비스도 나라끼리 사고팔아요.']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['na', 'normal', '응원봉 하나에는 배터리 원료, LED 칩, 플라스틱 원료가 들어가요. 배송도 필요하고요.'],
      ['ian', 'serious', '부품을 살 만한 나라를 네 곳 찾아 왔어요. 나라마다 잘하는 게 달라요.']
    ]},
    { type: 'mission', id: '9-2', kind: 'steps', title: '어느 나라에서 사 올까', gauge: 'trust', pocas: ['tradeReason'],
      steps: [
        { kind: 'sort', who: 'ian', mood: 'serious', layout: 'bins4',
          prompt: '나라 카드를 누르고, 그 나라에서 사 오면 좋을 칸을 눌러 주세요.',
          bins: [
            { id: 'bat', label: '🔋 배터리 원료', cap: 1 },
            { id: 'chip', label: '💡 LED 칩', cap: 1 },
            { id: 'eco', label: '🌱 식물에서 뽑은 플라스틱 원료', cap: 1 },
            { id: 'ship', label: '🚢 운송(배송)', cap: 1 }
          ],
          cards: [
            { id: 'a', text: '테크노아: 땅은 좁지만 작은 칩을 만드는 기술이 뛰어나요', ans: 'chip', hint: '칩 만드는 기술이 뛰어난 테크노아에서 LED 칩을 사 와요.' },
            { id: 'b', text: '포트빌: 큰 항구가 있어 여러 나라 물건이 모이고 나가요', ans: 'ship', hint: '큰 항구가 있는 포트빌은 물건을 실어 나르기 좋아요.' },
            { id: 'c', text: '미네랄리아: 땅속에 광물이 많지만 공장이 적어요', ans: 'bat', hint: '광물이 많은 미네랄리아는 배터리 원료를 팔기 좋아요.' },
            { id: 'd', text: '솔라랜드: 햇볕이 강하고 땅이 넓어 원료 작물이 잘 자라요', ans: 'eco', hint: '작물이 잘 자라는 솔라랜드는 식물로 플라스틱 원료를 만들 수 있어요.' }
          ] },
        { kind: 'sort', who: 'oh', mood: 'normal', layout: 'bins4',
          prompt: '왜 그 나라에서 사 올까요? 까닭 카드를 알맞은 나라 칸에 담아 주세요.',
          bins: [
            { id: 'm', label: '미네랄리아 → 배터리 원료', cap: 1 },
            { id: 't', label: '테크노아 → LED 칩', cap: 1 },
            { id: 's', label: '솔라랜드 → 플라스틱 원료', cap: 1 },
            { id: 'p', label: '포트빌 → 운송', cap: 1 }
          ],
          cards: [
            { id: 'a', text: '위치가 좋아서', ans: 'p', hint: '포트빌은 큰 항구가 있는 좋은 위치 덕분이에요.' },
            { id: 'b', text: '자원이 달라서', ans: 'm', hint: '미네랄리아는 땅속에 광물 자원이 많아요.' },
            { id: 'c', text: '자연환경이 달라서', ans: 's', hint: '솔라랜드는 강한 햇볕과 넓은 땅 같은 자연환경 덕분이에요.' },
            { id: 'd', text: '기술이 달라서', ans: 't', hint: '테크노아는 작은 칩을 만드는 기술이 뛰어나요.' }
          ] }
      ],
      ok: [['ian', 'happy', '나라마다 자원, 기술, 자연환경, 위치가 달라서 잘 만드는 게 달라요. 그래서 무역을 해요.']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['ian', 'serious', '그런데 대표님, 하나 궁금한 게 있어요.']
    ]},
    { type: 'mission', id: '9-3', kind: 'choice', title: '함정 문제', who: 'ian', mood: 'serious',
      prompt: '"그냥 전부 우리나라에서 만들면 안 돼요? 왜 굳이 다른 나라와 사고팔아요?"',
      gauge: 'fans', pocas: [],
      options: [
        { text: '다른 나라 물건은 무조건 나쁘니까, 사실은 안 사는 게 맞아요.', why: [['ian', 'serious', '테크노아 칩은 세계에서 손꼽히게 좋아요. 다른 나라 것이라고 나쁜 건 아니에요.']] },
        { text: '무역은 큰 회사만 할 수 있어서, 우리 같은 회사는 못 해요.', why: [['oh', 'normal', '우리 회사도 앨범을 수출하고 칩을 수입해요. 작은 회사도 무역을 해요.']] },
        { text: '나라마다 잘 만들 수 있는 것이 달라서, 서로 사고팔면 더 좋은 물건을 알맞은 값에 쓸 수 있어요.', correct: true }
      ],
      ok: [['ian', 'happy', '그렇구나. 우리나라에서 다 만들면 값은 비싸지고 품질은 떨어질 수도 있겠네요.']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['oh', 'smile', '삼촌이 어릴 땐 우리나라가 가발과 옷을 만들어 다른 나라에 팔았대요.'],
      ['oh', 'normal', '그 뒤로 반도체와 자동차를 팔았고, 이제는 노래와 드라마 같은 K-콘텐츠도 팔아요.'],
      ['taeo', 'happy', '그럼 우리 노래도 수출품이네요! 왠지 어깨가 으쓱해요.']
    ]},
    { type: 'scene', bg: 'night', preview: true, lines: [
      ['narr', '', '투어 2주 전, 테크노아에서 급한 소식이 왔습니다.'],
      ['ian', 'worried', '대표님, 테크노아에서 연락이 왔어요. "칩 공장에 불이 났어요."']
    ]},
    { type: 'end' }
  ]
},
/* ---------------- 10장 ---------------- */
{
  no: 10, title: '칩이 멈췄다!', topic: '상호의존과 경쟁', part: '탐구하기 2',
  nodes: [
    { type: 'scene', bg: 'office', lines: [
      ['narr', '', '다행히 다친 사람은 없었지만, 테크노아의 칩 수출이 멈췄습니다.'],
      ['na', 'normal', '대표님, 큰일이에요. 칩이 안 들어와서 응원봉 공장도 멈췄어요.'],
      ['taeo', 'worried', '다른 나라 공장에 난 불 때문에 우리 응원봉까지 멈추다니요…'],
      ['oh', 'worried', '투어는 2주 뒤예요. 먼저 이 일로 무엇을 알 수 있는지 생각해 봐요.']
    ]},
    { type: 'mission', id: '10-1', kind: 'choice', title: '무엇을 알 수 있을까', who: 'oh', mood: 'worried',
      prompt: '테크노아 공장에 불이 나자 우리 응원봉 공장도 멈췄어요. 이 일로 무엇을 알 수 있을까요?',
      gauge: 'trust', pocas: ['interdep'],
      options: [
        { text: '다른 나라에서 일어난 일은 우리 생활과 아무 상관이 없다', why: [['ian', 'worried', '그럼 우리 응원봉 공장은 왜 멈췄을까요? 상관이 있어요.']] },
        { text: '나라와 나라는 무역으로 서로 기대어 있어서, 한 나라의 일이 다른 나라 생활에도 영향을 준다', correct: true },
        { text: '무역을 하면 언제나 손해만 본다', why: [['oh', 'normal', '그동안 테크노아 칩 덕분에 좋은 응원봉을 만들었잖아요. 손해만 보는 건 아니에요.']] }
      ],
      ok: [['oh', 'smile', '맞아요. 이렇게 나라끼리 서로 기대어 사는 걸 상호의존이라고 해요.']]
    },
    { type: 'scene', bg: 'office', lines: [
      ['serin', 'worried', '그럼 이제 어떻게 해요? 팬들은 응원봉을 기다리고 있어요.'],
      ['oh', 'normal', '대표님, 위기를 넘길 대책을 세워 주세요.']
    ]},
    { type: 'mission', id: '10-2', kind: 'multi', title: '위기 대책', who: 'oh', mood: 'normal',
      prompt: '알맞은 대책을 모두 골라 주세요. 좋은 대책은 다 고르고, 공정하지 않거나 무책임한 것은 빼야 성공이에요.',
      gauge: 'rep', pocas: ['coop'],
      options: [
        { text: '칩을 사 올 수 있는 나라를 더 찾아 둔다', correct: true },
        { text: '남은 칩을 몰래 비싸게 되판다', why: [['serin', 'angry', '어려울 때를 틈타 몰래 비싸게 파는 건 공정하지 않아요.']] },
        { text: '우리 기술로 만들 수 있는 부품은 직접 만들어 본다', correct: true },
        { text: '테크노아와 다시 일정을 맞춰 협력한다', correct: true },
        { text: '테크노아 탓만 하고 투어를 취소한다', why: [['taeo', 'shy', '탓만 하면 아무것도 안 바뀌어요. 기다리는 팬들도 생각해 주세요.']] }
      ],
      missing: [['oh', 'normal', '좋은 대책이 더 있어요. 다른 나라, 우리 회사, 테크노아가 할 일을 떠올려 봐요.']],
      ok: [
        ['ian', 'happy', '테크노아가 고친 공장에서 만든 첫 칩을 우리에게 먼저 보내 준대요!'],
        ['oh', 'smile', '어려울 때 서로 돕는 걸 협력이라고 해요. 서로 기대어 사니까 함께 풀어야죠.']
      ]
    },
    { type: 'scene', bg: 'expo', lines: [
      ['narr', '', '투어 첫 공연 사흘 전, 세계 콘텐츠 박람회가 열렸습니다.'],
      ['taeo', 'normal', '대표님, 저기 해외 기획사 "스타웨이브" 부스예요. 줄이 엄청 길어요!'],
      ['kang', 'smirk', '오랜만이에요, {ceo} 대표님. 저 부스를 이길 방법이야 많죠. 정정당당하지 않아도요.'],
      ['serin', 'angry', '우리는 우리 방식으로 겨룰 거예요. 대표님, 어떻게 할지 정해 주세요.']
    ]},
    { type: 'mission', id: '10-3', kind: 'steps', title: '세계 콘텐츠 박람회', gauge: 'fans', pocas: ['globalComp'],
      steps: [
        { kind: 'multi', who: 'serin', mood: 'angry',
          prompt: '스타웨이브와 겨룰 방법을 모두 골라 주세요. 좋은 방법은 다 고르고, 반칙은 빼야 성공이에요.',
          options: [
            { text: '노래와 무대의 품질을 더 높인다', correct: true },
            { text: '스타웨이브 부스를 몰래 방해한다', why: [['serin', 'angry', '그건 강태산 대표님이 쓰던 반칙 수법이잖아요. 우리는 실력으로 겨뤄요!']] },
            { text: '여러 나라 말로 자막을 붙인다', correct: true },
            { text: '친환경 응원봉으로 다른 기획사와 차별화한다', correct: true }
          ],
          missing: [['oh', 'normal', '좋은 방법이 더 있어요. 해외 팬들이 무엇을 반가워할지 떠올려 봐요.']] },
        { kind: 'choice', who: 'oh', mood: 'smile',
          prompt: '나라와 나라, 기업과 기업이 경쟁하면 팬(소비자)에게는 무엇이 좋을까요?',
          options: [
            { text: '한 회사만 남아서 고를 걱정이 없다', why: [['oh', 'normal', '한 회사만 남으면 고를 수 있는 것이 줄어요. 2장의 경쟁을 떠올려 봐요.']] },
            { text: '더 좋은 콘텐츠를 더 알맞은 값에 즐길 수 있다', correct: true },
            { text: '경쟁하면 값이 무조건 비싸진다', why: [['oh', 'normal', '경쟁하면 오히려 더 알맞은 값으로 팔려고 노력해요.']] }
          ] }
      ],
      ok: [['oh', 'happy', '맞아요. 세계 시장에서 겨루는 국제 경쟁 덕분에 팬들은 더 좋은 콘텐츠를 만나요.']]
    },
    { type: 'scene', bg: 'stage', lines: [
      ['narr', '', '그리고 월드 투어 첫날 밤.'],
      ['narr', '', '테크노아 칩이 들어간 친환경 응원봉 3만 개가 객석에서 한꺼번에 빛났습니다.'],
      ['serin', 'happy', '여러 나라에서 와 주신 여러분, 반가워요! 우리는 {group}입니다!'],
      ['oh', 'smile', '대표님, 여기까지 오는 길에 정말 많은 사람과 나라가 함께했네요.']
    ]},
    { type: 'ending' }
  ]
}
];

const ENDINGS = {
  hidden: { title: '숨은 엔딩 · 모두가 웃는 무대', bg: 'stage', lines: [
    ['narr', '', '{group}의 월드 투어 마지막 공연 날.'],
    ['narr', '', '무대 위에는 멤버 네 명뿐 아니라 지수 씨와 오실장님이, 맨 앞줄에는 하늘이가 함께 웃고 있었습니다.'],
    ['serin', 'happy', '쓰레기 없는 앨범도, 쉬는 날도, 공정한 경쟁도, 깨끗한 공원도 다 지켰어요.'],
    ['oh', 'happy', '대표님, 삼촌이 보셨으면 정말 기뻐하셨을 거예요.']
  ]},
  big: { title: '대박 월드 투어', bg: 'stage', lines: [
    ['narr', '', '공연장이 꽉 찼습니다. 여러 나라 팬들의 응원봉 불빛이 바다처럼 출렁였어요.'],
    ['taeo', 'happy', '대표님! 다음 투어 초대장이 세 나라에서나 왔어요!'],
    ['serin', 'happy', '대표님이 아니었으면 여기까지 못 왔을 거예요.']
  ]},
  ok: { title: '무사 월드 투어', bg: 'stage', lines: [
    ['narr', '', '작지만 따뜻한 공연장. 객석 곳곳에서 응원봉이 반짝였습니다.'],
    ['ian', 'happy', '대표님, 우리 진짜 월드 투어를 해냈어요. 이제 시작이에요.'],
    ['oh', 'smile', '다시 해 보면 더 큰 무대가 기다리고 있을지도 몰라요.']
  ]},
  low: { title: '아슬아슬 월드 투어', bg: 'stage', lines: [
    ['narr', '', '빈자리가 많았습니다. 그래도 맨 앞줄에서 하늘이가 응원봉을 힘껏 흔들고 있었어요.'],
    ['haneul', 'happy', '{group} 최고! 나는 끝까지 응원할 거야!'],
    ['oh', 'smile', '대표님, 다시 하면 다른 엔딩이 열려요. 틀린 미션을 떠올려 보세요.']
  ]}
};
