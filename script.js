const stages=[
{name:"웨이퍼 제조",tag:"INGOT",desc:"실리콘 잉곳을 다이아몬드 톱날로 규격 두께에 맞춰 썰어 웨이퍼 5장을 만들어 봐.",type:"slice"},
{name:"산화",tag:"OXIDIZE",desc:"산화로에 흘리는 산소와 수증기를 동시에 목표 범위에 맞춰 균일한 산화막을 키워 봐.",type:"oxide"},
{name:"포토",tag:"PHOTO",desc:"웨이퍼를 고속으로 회전시키면서 감광액(PR)을 떨어뜨려, 원심력으로 얇고 균일하게 펴 발라 봐.",type:"photo"},
{name:"식각",tag:"ETCH",desc:"웨이퍼를 화학 용액에 담근 시간이 곧 식각 깊이야. 목표 깊이 구간에서 정확히 건져 올려 봐.",type:"etch"},
{name:"증착·이온주입",tag:"LAYER",desc:"내려오는 원자를 좌우로 옮겨 빈틈(Void) 없이 쌓아 3층짜리 박막을 완성해 봐.",type:"deposit"},
{name:"금속 배선",tag:"CONNECT",desc:"배선 타일을 돌려 왼쪽 전원부터 오른쪽 트랜지스터까지 전류가 흐르는 길을 완성해.",type:"connect"},
{name:"EDS",tag:"TEST",desc:"프로브를 내려 다이를 하나씩 전기 검사해. 불량 신호가 뜬 다이를 제한 시간 안에 찾아 잉크로 마킹해 봐.",type:"eds"},
{name:"패키징",tag:"PACK",desc:"완성된 웨이퍼를 낱개 칩으로 잘라내야 패키징을 시작할 수 있어. 다이 사이의 스크라이브 라인을 따라 레이저를 정밀하게 움직여 봐.",type:"pack"}
];
const quizzes=[{q:'웨이퍼는 무엇으로 만들까?',a:['고순도 실리콘','나무','고무'],c:0},{q:'산화 공정에서 표면에 생기는 것은?',a:['산화막','물방울','금속선'],c:0},{q:'포토 공정에서 빛에 반응하는 물질은?',a:['감광액(PR)','구리선','냉각수'],c:0}];
// 공정마다 [재료, 공정, 결과] 3단계. 각 항목은 [아이콘, 라벨].
const processVisuals=[
[['▬','실리콘 잉곳'],['◈','정밀 절단'],['◉','웨이퍼']],
[['◉','웨이퍼'],['♨','산화로'],['▤','산화막']],
[['◍','감광액'],['✦','고속 회전'],['▦','균일 도포']],
[['▦','보호막'],['⌁','화학 식각'],['▩','회로 홈']],
[['◆','원자 공급'],['▤','층 쌓기'],['▬','박막']],
[['⋮','끊긴 배선'],['⌘','경로 연결'],['⚡','전류 흐름']],
[['▣','다이'],['✓','전기 검사'],['◈','양품 선별']],
[['◉','웨이퍼'],['✂','레이저 절단'],['▣','완성 칩']]
];
// 공정별 학습 브리핑. 게임 시작 전 팝업으로 띄운다.
// summary 는 첫 화면, 나머지 공정 설명은 "공정 자세히 보기"로 접어 둔다.
const briefings={
slice:{title:"웨이퍼 제조 · 잉곳 슬라이싱",
art:{svg:"<svg class=\"dg dg-slice\" viewBox=\"0 0 640 210\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"가로로 누운 실리콘 잉곳 위에서 여러 가닥의 다이아몬드 와이어가 동시에 내려와 잉곳 전체를 한꺼번에 관통하며 얇은 웨이퍼 여러 장으로 갈라놓는 그림. 오른쪽에는 절단 부위를 확대해 웨이퍼 두께 775마이크로미터와, 톱밥으로 사라지는 커프 로스 100에서 150마이크로미터를 표시했다.\"> <defs><linearGradient id=\"dgSliceSi\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#6d8cb6\"/><stop offset=\".45\" stop-color=\"#4a6488\"/><stop offset=\"1\" stop-color=\"#32476a\"/></linearGradient></defs> <text class=\"t-head\" x=\"34\" y=\"18\">다이아몬드 와이어 (수백 가닥)</text> <rect class=\"rail\" x=\"34\" y=\"25\" width=\"246\" height=\"16\" rx=\"8\"/> <g class=\"grv\"><line x1=\"58\" y1=\"32\" x2=\"58\" y2=\"41\"/><line x1=\"76\" y1=\"32\" x2=\"76\" y2=\"41\"/><line x1=\"94\" y1=\"32\" x2=\"94\" y2=\"41\"/><line x1=\"112\" y1=\"32\" x2=\"112\" y2=\"41\"/><line x1=\"130\" y1=\"32\" x2=\"130\" y2=\"41\"/><line x1=\"148\" y1=\"32\" x2=\"148\" y2=\"41\"/><line x1=\"166\" y1=\"32\" x2=\"166\" y2=\"41\"/><line x1=\"184\" y1=\"32\" x2=\"184\" y2=\"41\"/><line x1=\"202\" y1=\"32\" x2=\"202\" y2=\"41\"/><line x1=\"220\" y1=\"32\" x2=\"220\" y2=\"41\"/><line x1=\"238\" y1=\"32\" x2=\"238\" y2=\"41\"/><line x1=\"256\" y1=\"32\" x2=\"256\" y2=\"41\"/></g> <path class=\"ing\" d=\"M40 68 L274 68 A11 38 0 0 1 274 144 L40 144 A11 38 0 0 1 40 68 Z\"/> <ellipse class=\"face\" cx=\"274\" cy=\"106\" rx=\"11\" ry=\"38\"/> <g class=\"cut\"> <g><line class=\"kerf\" x1=\"58\" y1=\"68\" x2=\"58\" y2=\"144\"/><line class=\"kerf\" x1=\"76\" y1=\"68\" x2=\"76\" y2=\"144\"/><line class=\"kerf\" x1=\"94\" y1=\"68\" x2=\"94\" y2=\"144\"/><line class=\"kerf\" x1=\"112\" y1=\"68\" x2=\"112\" y2=\"144\"/><line class=\"kerf\" x1=\"130\" y1=\"68\" x2=\"130\" y2=\"144\"/><line class=\"kerf\" x1=\"148\" y1=\"68\" x2=\"148\" y2=\"144\"/><line class=\"kerf\" x1=\"166\" y1=\"68\" x2=\"166\" y2=\"144\"/><line class=\"kerf\" x1=\"184\" y1=\"68\" x2=\"184\" y2=\"144\"/><line class=\"kerf\" x1=\"202\" y1=\"68\" x2=\"202\" y2=\"144\"/><line class=\"kerf\" x1=\"220\" y1=\"68\" x2=\"220\" y2=\"144\"/><line class=\"kerf\" x1=\"238\" y1=\"68\" x2=\"238\" y2=\"144\"/><line class=\"kerf\" x1=\"256\" y1=\"68\" x2=\"256\" y2=\"144\"/></g> <g><line class=\"wire\" x1=\"58\" y1=\"41\" x2=\"58\" y2=\"156\"/><line class=\"wire\" x1=\"76\" y1=\"41\" x2=\"76\" y2=\"156\"/><line class=\"wire\" x1=\"94\" y1=\"41\" x2=\"94\" y2=\"156\"/><line class=\"wire\" x1=\"112\" y1=\"41\" x2=\"112\" y2=\"156\"/><line class=\"wire\" x1=\"130\" y1=\"41\" x2=\"130\" y2=\"156\"/><line class=\"wire\" x1=\"148\" y1=\"41\" x2=\"148\" y2=\"156\"/><line class=\"wire\" x1=\"166\" y1=\"41\" x2=\"166\" y2=\"156\"/><line class=\"wire\" x1=\"184\" y1=\"41\" x2=\"184\" y2=\"156\"/><line class=\"wire\" x1=\"202\" y1=\"41\" x2=\"202\" y2=\"156\"/><line class=\"wire\" x1=\"220\" y1=\"41\" x2=\"220\" y2=\"156\"/><line class=\"wire\" x1=\"238\" y1=\"41\" x2=\"238\" y2=\"156\"/><line class=\"wire\" x1=\"256\" y1=\"41\" x2=\"256\" y2=\"156\"/></g> </g> <text class=\"t-main\" x=\"40\" y=\"176\">단결정 실리콘 잉곳</text> <text class=\"t-sub\" x=\"40\" y=\"196\">지름 300mm 원기둥 · 한 번에 수백 장 절단</text> <line class=\"lead2\" x1=\"286\" y1=\"106\" x2=\"297\" y2=\"106\"/> <text class=\"t-chip\" x=\"301\" y=\"111\">웨이퍼 1장</text> <rect class=\"zoom\" x=\"209\" y=\"62\" width=\"40\" height=\"90\" rx=\"3\"/> <line class=\"lead\" x1=\"252\" y1=\"64\" x2=\"384\" y2=\"62\"/> <polygon class=\"leadhd\" points=\"391,62 383,58.5 383,65.5\"/> <text class=\"t-head\" x=\"396\" y=\"20\">절단부 확대</text> <line class=\"dim\" x1=\"396\" y1=\"60\" x2=\"396\" y2=\"48\"/> <line class=\"dim\" x1=\"448\" y1=\"60\" x2=\"448\" y2=\"48\"/> <line class=\"dim\" x1=\"396\" y1=\"52\" x2=\"448\" y2=\"52\"/> <polygon class=\"dimhd\" points=\"396,52 403,48.8 403,55.2\"/> <polygon class=\"dimhd\" points=\"448,52 441,48.8 441,55.2\"/> <text class=\"t-dim\" x=\"422\" y=\"42\" text-anchor=\"middle\">웨이퍼 두께 775µm</text> <rect class=\"kerfz\" x=\"448\" y=\"62\" width=\"10\" height=\"88\"/> <rect class=\"kerfz\" x=\"510\" y=\"62\" width=\"10\" height=\"88\"/> <line class=\"kerfl\" x1=\"453\" y1=\"62\" x2=\"453\" y2=\"150\"/> <line class=\"kerfl\" x1=\"515\" y1=\"62\" x2=\"515\" y2=\"150\"/> <rect class=\"si\" x=\"396\" y=\"62\" width=\"52\" height=\"88\" rx=\"1.5\"/> <rect class=\"si\" x=\"458\" y=\"62\" width=\"52\" height=\"88\" rx=\"1.5\"/> <rect class=\"si\" x=\"520\" y=\"62\" width=\"52\" height=\"88\" rx=\"1.5\"/> <text class=\"t-chip\" x=\"422\" y=\"111\" text-anchor=\"middle\">웨이퍼</text> <text class=\"t-chip\" x=\"484\" y=\"111\" text-anchor=\"middle\">웨이퍼</text> <text class=\"t-chip\" x=\"546\" y=\"111\" text-anchor=\"middle\">웨이퍼</text> <path class=\"brk\" d=\"M448 150 L448 155 L458 155 L458 150\"/> <line class=\"brk\" x1=\"453\" y1=\"155\" x2=\"453\" y2=\"158\"/> <text class=\"t-kerf\" x=\"484\" y=\"176\" text-anchor=\"middle\">커프 로스 100~150µm</text> <text class=\"t-sub\" x=\"484\" y=\"196\" text-anchor=\"middle\">이 폭만큼 실리콘이 가루로 사라진다</text> </svg>",caption:"다이아몬드 와이어가 잉곳을 한 번에 수백 장으로 자른다"},
 summary:"고순도 실리콘 잉곳을 얇게 썰어, 회로를 새길 원판인 웨이퍼를 만든다.",
 processIntro:"반도체는 실리콘 원판 위에 회로를 새겨서 만드는데, 그 원판을 만드는 게 웨이퍼 제조야. 고순도 실리콘을 녹여 원기둥 모양 단결정 덩어리인 잉곳(ingot)을 키우고, 이걸 얇게 썬 다음 갈고 닦아서 거울처럼 매끈한 웨이퍼(wafer)로 만들어 다음 산화 공정으로 넘겨. 이 게임은 그중 '써는' 단계만 떼어 낸 거야.",
 processDetail:[{label:"단결정",text:"잉곳은 덩어리 전체가 하나의 결정인 단결정(single crystal)이야. 실리콘 원자가 끝에서 끝까지 같은 방향으로 규칙적으로 놓여 있어야 전자가 설계대로 흐르는데, 배열이 흐트러진 자리에 만든 소자는 불량이 되기 쉬워."},{label:"두께 규격",text:"크고 얇은 원판일수록 잘 휘고 깨져서, 지름이 커지면 두께도 같이 키워. 200mm(8인치)는 725µm, 300mm(12인치)는 775µm가 표준 두께고 허용 오차는 ±20~25µm 수준이야."},{label:"절단 손실",text:"톱날이 지나간 자리의 실리콘은 가루가 되어 사라지는데, 이걸 커프 로스(kerf loss)라고 해. 한 번 자를 때마다 100~150µm쯤 없어지니까 웨이퍼 한 장 두께의 5분의 1이 매번 톱밥으로 버려지는 셈이라, 최대한 가는 와이어를 써서 이 손실을 줄여."}],
 realWorld:"잉곳 절단은 반도체 팹이 아니라 SK실트론·신에츠·섬코 같은 웨이퍼 전문 회사가 맡아 팹에 납품해. 지름 300mm에 길이 2m, 무게 265kg인 잉곳도 있는데, 게임처럼 한 장씩 썰지 않고 다이아몬드 와이어 쏘(diamond wire saw)에 촘촘히 감긴 와이어가 한 번에 수백 장을 동시에 잘라 내.",
 howTo:["좌우로 왕복하는 톱날이 초록 구간에 들어온 순간 절단!","버튼 또는 스페이스바. 성공할수록 빨라지고 구간은 좁아져."],
 goal:"규격에 맞는 웨이퍼 5장",tip:"구간에 들어오는 순간 말고 한가운데를 노려. 오차가 가장 작아."},
oxide:{title:"산화 · 실리콘 표면에 산화막 키우기",
art:{svg:"<svg class=\"dg dg-oxide\" viewBox=\"0 0 640 218\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"실리콘 웨이퍼 단면도. 고온 산화로에서 산소가 실리콘 표면과 반응해 산화막 SiO2 가 자란다. 산화 전 표면선을 기준으로 자란 두께의 56퍼센트는 위로 솟아오르고 44퍼센트는 실리콘을 소모하며 아래로 자란다.\"> <defs> <pattern id=\"dgOxideSi\" x=\"108\" y=\"130\" width=\"24\" height=\"18\" patternUnits=\"userSpaceOnUse\"> <rect width=\"24\" height=\"18\" fill=\"#42597c\"/> <circle cx=\"6\" cy=\"5\" r=\"1.7\" fill=\"#87a4ce\" opacity=\".5\"/> <circle cx=\"18\" cy=\"14\" r=\"1.7\" fill=\"#87a4ce\" opacity=\".5\"/> </pattern> </defs> <!-- 공정 조건 --> <rect class=\"badge\" x=\"10\" y=\"8\" width=\"152\" height=\"27\" rx=\"13\"/> <text class=\"badgeT\" x=\"24\" y=\"26\">고온 800~1200°C</text> <!-- 산소 범례 --> <circle class=\"lgdD\" cx=\"484\" cy=\"21\" r=\"6\"/> <circle class=\"lgdD\" cx=\"497\" cy=\"21\" r=\"6\"/> <text class=\"lgdT\" x=\"510\" y=\"27\">산소 O<tspan class=\"sub\" dy=\"4\">2</tspan><tspan dy=\"-4\" dx=\"4\">공급</tspan></text> <!-- 내려오는 O2 분자 (웨이퍼보다 먼저 그려서 표면 아래로 사라짐) --> <g fill=\"#ff709f\"> <g class=\"o2\"><circle cx=\"132\" cy=\"48\" r=\"6\"/><circle cx=\"145\" cy=\"48\" r=\"6\"/></g> <g class=\"o2 d2\"><circle cx=\"196\" cy=\"54\" r=\"6\"/><circle cx=\"209\" cy=\"54\" r=\"6\"/></g> <g class=\"o2 d3\"><circle cx=\"260\" cy=\"50\" r=\"6\"/><circle cx=\"273\" cy=\"50\" r=\"6\"/></g> <g class=\"o2 d4\"><circle cx=\"324\" cy=\"58\" r=\"6\"/><circle cx=\"337\" cy=\"58\" r=\"6\"/></g> <g class=\"o2 d5\"><circle cx=\"388\" cy=\"52\" r=\"6\"/><circle cx=\"401\" cy=\"52\" r=\"6\"/></g> <g class=\"o2 d6\"><circle cx=\"432\" cy=\"46\" r=\"6\"/><circle cx=\"445\" cy=\"46\" r=\"6\"/></g> </g> <!-- 실리콘 기판: 윗면이 원래 표면(y=130) --> <rect x=\"108\" y=\"130\" width=\"362\" height=\"76\" fill=\"url(#dgOxideSi)\"/> <!-- 아래로 자라는 산화막: y=130 에 고정되어 실리콘을 덮으며 내려감 (28 = 44%) --> <rect class=\"ox oxD\" x=\"108\" y=\"130\" width=\"362\" height=\"28\"/> <!-- 위로 자라는 산화막: y=130 에 고정되어 솟아오름 (36 = 56%) --> <rect class=\"ox oxU\" x=\"108\" y=\"94\" width=\"362\" height=\"36\"/> <text class=\"oxT\" x=\"122\" y=\"117\">산화막 (SiO<tspan class=\"sub\" dy=\"4\">2</tspan><tspan dy=\"-4\">)</tspan></text> <text class=\"siT\" x=\"122\" y=\"187\">실리콘 웨이퍼 (Si)</text> <!-- 원래 표면 기준선 --> <line class=\"orig\" x1=\"100\" y1=\"130\" x2=\"496\" y2=\"130\"/> <text class=\"origT\" x=\"10\" y=\"124\">산화 전 표면</text> <!-- 44 : 56 눈금자 --> <line class=\"tkC\" x1=\"468\" y1=\"94\" x2=\"496\" y2=\"94\"/> <line class=\"tkP\" x1=\"468\" y1=\"158\" x2=\"496\" y2=\"158\"/> <line class=\"barU\" x1=\"482\" y1=\"128\" x2=\"482\" y2=\"103\"/> <polygon class=\"hdU\" points=\"482,94 476.6,104 487.4,104\"/> <line class=\"barD\" x1=\"482\" y1=\"132\" x2=\"482\" y2=\"149\"/> <polygon class=\"hdD\" points=\"482,158 476.6,148 487.4,148\"/> <text class=\"head\" x=\"478\" y=\"82\">자란 SiO<tspan class=\"sub\" dy=\"4\">2</tspan><tspan dy=\"-4\" dx=\"4\">두께</tspan></text> <text class=\"pctU\" x=\"502\" y=\"108\">위로 56%</text> <text class=\"note\" x=\"502\" y=\"126\">표면이 솟아오름</text> <text class=\"pctD\" x=\"502\" y=\"146\">아래로 44%</text> <text class=\"note\" x=\"502\" y=\"164\">실리콘을 소모함</text> </svg>",caption:"산화막은 실리콘을 먹으며 위아래로 자란다"},
 summary:"웨이퍼 표면을 산소와 반응시켜 절연·보호 역할을 하는 산화막(SiO₂)을 키운다.",
 processIntro:"웨이퍼 제조에서 썰고 연마까지 마친 맨 실리콘 웨이퍼를 받아, 표면을 산소와 반응시켜 얇은 산화막(oxide layer, SiO₂)으로 덮는 단계야. 이 막은 전기가 엉뚱한 데로 새지 않게 막는 절연층이면서, 다음 포토 공정에서 회로 무늬를 새길 때 바탕이자 보호막이 돼. 실제로는 온도·시간·가스를 함께 조절해 두께를 잡는데, 이 게임은 그중 가스만 떼어 낸 거야.",
 processDetail:[{label:"막 성장",text:"산화막은 밖에서 덧바르는 게 아니라 웨이퍼의 실리콘 자체가 산소와 결합하면서 자라. 그래서 막이 두꺼워질수록 원래 실리콘은 깎여 들어가고, 자란 두께의 44%는 처음 표면보다 아래쪽에 생겨."},{label:"건식·습식",text:"산소(O₂)만 흘리면 건식 산화(dry oxidation)로 느리지만 치밀한 막이, 수증기(H₂O)를 쓰면 습식 산화(wet oxidation)로 훨씬 빠르지만 질이 조금 낮은 막이 자라. 실제로는 목적에 따라 둘 중 하나를 고르지, 게임처럼 두 가스를 동시에 맞추지는 않아."},{label:"균일도",text:"웨이퍼 전면에서 두께가 고르게 자라야 해. 자리마다 막 두께가 다르면 그 위에 만든 소자들의 동작이 제각각이 돼서 불량으로 이어져."}],
 realWorld:"실제 팹에서는 웨이퍼를 석영 보트에 층층이 꽂아 수직형 확산로(vertical furnace)에 넣고 800~1200°C로 굽는데, 한 배치에 보통 50~100장을 한꺼번에 처리해. 로 안은 위아래 온도가 달라지기 쉬워서 발열 구역을 여러 개로 나눠 따로 제어하고, 가스 유량은 정해진 레시피대로 장비가 자동으로 맞춰.",
 howTo:["산소 +/−, 수증기 +/− 로 현재 값을 목표에 맞춰. 방향키도 돼.","둘 다 구간 안일 때만 산화막이 자라.","목표가 계속 흔들리니까 맞춰 놓고도 계속 따라가."],
 goal:"산화막 두께 100%",tip:"한쪽을 완벽히 맞추기보다 둘 다 구간에 걸쳐 두고 번갈아 보정해."},
photo:{title:"포토 공정 · 감광액을 얇게 펴 바르기",
art:{svg:"<svg class=\"dg dg-photo\" viewBox=\"0 0 640 226\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"포토 공정 3단계 웨이퍼 단면도. 1단계 감광액 도포: 실리콘 기판 위 산화막에 감광액(PR)을 얇게 편다. 2단계 노광: 마스크의 뚫린 부분만 빛이 통과해 그 아래 PR의 성질이 변한다. 3단계 현상: 빛을 받은 PR만 녹아 사라지고 회로 무늬 모양의 PR이 남는다.\"> <defs> <pattern id=\"dgPhotoSi\" width=\"12\" height=\"10\" patternUnits=\"userSpaceOnUse\"> <circle cx=\"3\" cy=\"3\" r=\"1.4\" fill=\"#8ea6cc\" opacity=\".5\"/> <circle cx=\"9\" cy=\"8\" r=\"1.4\" fill=\"#8ea6cc\" opacity=\".5\"/> </pattern> <pattern id=\"dgPhotoOx\" width=\"9\" height=\"9\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(45)\"> <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"9\" stroke=\"#0b1424\" stroke-width=\"1.8\" opacity=\".2\"/> </pattern> <pattern id=\"dgPhotoExp\" width=\"8\" height=\"8\" patternUnits=\"userSpaceOnUse\" patternTransform=\"rotate(-45)\"> <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"8\" stroke=\"#ff709f\" stroke-width=\"2.6\" opacity=\".75\"/> </pattern> </defs> <!-- ===== 1. 감광액 도포 ===== --> <g transform=\"translate(12,0)\"> <rect class=\"si\" x=\"0\" y=\"126\" width=\"190\" height=\"24\"/> <rect class=\"si-tex\" x=\"0\" y=\"126\" width=\"190\" height=\"24\"/> <rect class=\"ox\" x=\"0\" y=\"110\" width=\"190\" height=\"16\"/> <rect class=\"ox-tex\" x=\"0\" y=\"110\" width=\"190\" height=\"16\"/> <ellipse class=\"drop\" cx=\"95\" cy=\"34\" rx=\"6.5\" ry=\"8.5\"/> <rect class=\"pr pr-spread\" x=\"0\" y=\"92\" width=\"190\" height=\"18\"/> <text class=\"lay lay-d pr-lab\" x=\"95\" y=\"106\">감광액 (PR)</text> <text class=\"lay lay-d\" x=\"95\" y=\"123\">산화막</text> <text class=\"lay lay-l\" x=\"95\" y=\"143\">실리콘 기판</text> <text class=\"ttl\" x=\"95\" y=\"174\">① 감광액 도포</text> <text class=\"sub\" x=\"95\" y=\"196\">웨이퍼를 돌리면서</text> <text class=\"sub\" x=\"95\" y=\"214\">PR을 얇게 펴 바른다</text> </g> <!-- 공정 흐름 화살표 --> <g> <path class=\"flow\" d=\"M206,121 H215\"/> <polygon class=\"flow-h\" points=\"215,116 223,121 215,126\"/> <path class=\"flow\" d=\"M419,121 H428\"/> <polygon class=\"flow-h\" points=\"428,116 436,121 428,126\"/> </g> <!-- ===== 2. 노광 ===== --> <g transform=\"translate(225,0)\"> <text class=\"hd\" x=\"95\" y=\"19\">빛 (UV)</text> <rect class=\"plate\" x=\"0\" y=\"58\" width=\"190\" height=\"20\"/> <rect class=\"beam\" x=\"46\" y=\"78\" width=\"28\" height=\"14\"/> <rect class=\"beam\" x=\"116\" y=\"78\" width=\"28\" height=\"14\"/> <rect class=\"chrome\" x=\"0\" y=\"58\" width=\"46\" height=\"20\"/> <rect class=\"chrome\" x=\"74\" y=\"58\" width=\"42\" height=\"20\"/> <rect class=\"chrome\" x=\"144\" y=\"58\" width=\"46\" height=\"20\"/> <text class=\"mlab\" x=\"23\" y=\"73\">마스크</text> <rect class=\"ray rb dl1\" x=\"11\" y=\"26\" width=\"3\" height=\"10\" rx=\"1.5\"/> <rect class=\"ray rb dl5\" x=\"29\" y=\"26\" width=\"3\" height=\"10\" rx=\"1.5\"/> <rect class=\"ray rb dl3\" x=\"83\" y=\"26\" width=\"3\" height=\"10\" rx=\"1.5\"/> <rect class=\"ray rb dl7\" x=\"103\" y=\"26\" width=\"3\" height=\"10\" rx=\"1.5\"/> <rect class=\"ray rb dl2\" x=\"155\" y=\"26\" width=\"3\" height=\"10\" rx=\"1.5\"/> <rect class=\"ray rb dl6\" x=\"175\" y=\"26\" width=\"3\" height=\"10\" rx=\"1.5\"/> <rect class=\"ray rp dl4\" x=\"53\" y=\"26\" width=\"3\" height=\"10\" rx=\"1.5\"/> <rect class=\"ray rp dl8\" x=\"65\" y=\"26\" width=\"3\" height=\"10\" rx=\"1.5\"/> <rect class=\"ray rp dl2\" x=\"123\" y=\"26\" width=\"3\" height=\"10\" rx=\"1.5\"/> <rect class=\"ray rp dl6\" x=\"135\" y=\"26\" width=\"3\" height=\"10\" rx=\"1.5\"/> <rect class=\"si\" x=\"0\" y=\"126\" width=\"190\" height=\"24\"/> <rect class=\"si-tex\" x=\"0\" y=\"126\" width=\"190\" height=\"24\"/> <rect class=\"ox\" x=\"0\" y=\"110\" width=\"190\" height=\"16\"/> <rect class=\"ox-tex\" x=\"0\" y=\"110\" width=\"190\" height=\"16\"/> <rect class=\"pr\" x=\"0\" y=\"92\" width=\"190\" height=\"18\"/> <rect class=\"exp exp-in\" x=\"46\" y=\"92\" width=\"28\" height=\"18\"/> <rect class=\"exp-tex exp-in\" x=\"46\" y=\"92\" width=\"28\" height=\"18\"/> <rect class=\"exp exp-in\" x=\"116\" y=\"92\" width=\"28\" height=\"18\"/> <rect class=\"exp-tex exp-in\" x=\"116\" y=\"92\" width=\"28\" height=\"18\"/> <text class=\"ttl\" x=\"95\" y=\"174\">② 노광</text> <text class=\"sub\" x=\"95\" y=\"196\">마스크 뚫린 곳만 빛 통과</text> <text class=\"sub\" x=\"95\" y=\"214\">빛 받은 PR은 성질이 변함</text> </g> <!-- ===== 3. 현상 ===== --> <g transform=\"translate(438,0)\"> <text class=\"hd hd-b\" x=\"95\" y=\"19\">현상액</text> <ellipse class=\"dev dl1\" cx=\"22\" cy=\"32\" rx=\"4.5\" ry=\"5.5\"/> <ellipse class=\"dev dl4\" cx=\"58\" cy=\"32\" rx=\"4.5\" ry=\"5.5\"/> <ellipse class=\"dev dl2\" cx=\"95\" cy=\"32\" rx=\"4.5\" ry=\"5.5\"/> <ellipse class=\"dev dl6\" cx=\"132\" cy=\"32\" rx=\"4.5\" ry=\"5.5\"/> <ellipse class=\"dev dl8\" cx=\"168\" cy=\"32\" rx=\"4.5\" ry=\"5.5\"/> <rect class=\"si\" x=\"0\" y=\"126\" width=\"190\" height=\"24\"/> <rect class=\"si-tex\" x=\"0\" y=\"126\" width=\"190\" height=\"24\"/> <rect class=\"ox\" x=\"0\" y=\"110\" width=\"190\" height=\"16\"/> <rect class=\"ox-tex\" x=\"0\" y=\"110\" width=\"190\" height=\"16\"/> <rect class=\"pr\" x=\"0\" y=\"92\" width=\"46\" height=\"18\"/> <rect class=\"pr\" x=\"74\" y=\"92\" width=\"42\" height=\"18\"/> <rect class=\"pr\" x=\"144\" y=\"92\" width=\"46\" height=\"18\"/> <rect class=\"exp wash\" x=\"46\" y=\"92\" width=\"28\" height=\"18\"/> <rect class=\"exp-tex wash\" x=\"46\" y=\"92\" width=\"28\" height=\"18\"/> <rect class=\"exp wash\" x=\"116\" y=\"92\" width=\"28\" height=\"18\"/> <rect class=\"exp-tex wash\" x=\"116\" y=\"92\" width=\"28\" height=\"18\"/> <rect class=\"reveal\" x=\"46\" y=\"110\" width=\"28\" height=\"4\"/> <rect class=\"reveal\" x=\"116\" y=\"110\" width=\"28\" height=\"4\"/> <text class=\"ttl\" x=\"95\" y=\"174\">③ 현상</text> <text class=\"sub\" x=\"95\" y=\"196\">현상액이 변한 PR만 녹인다</text> <text class=\"sub\" x=\"95\" y=\"214\">남은 PR이 회로 무늬</text> </g> </svg>",caption:"빛과 마스크로 회로 무늬를 감광액에 새긴다"},
 summary:"감광액을 바르고 마스크 너머로 빛을 쏴, 웨이퍼 위에 회로 무늬를 그린다.",
 processIntro:"산화 공정에서 산화막(oxide layer)을 입힌 웨이퍼를 받아, 그 위에 회로 무늬를 그려 넣는 단계야. 빛에 반응하는 감광액(PR, photoresist)을 얇게 바르고 마스크(mask) 너머로 빛을 쏜 뒤 현상하면 회로 모양의 PR 막이 남는데, 이게 다음 식각 공정에서 깎을 곳과 남길 곳을 가르는 본이 돼. 이 게임은 그중 첫 단계인 스핀 코팅(spin coating)만 다뤄.",
 processDetail:[{label:"원심력",text:"웨이퍼를 수천 rpm으로 돌리면 중앙에 떨어뜨린 감광액이 바깥으로 밀려 나가면서 얇은 막이 돼. 실제로는 부은 양의 95% 넘게 웨이퍼 밖으로 날아가 버리고, 남은 아주 조금이 막이 되는 거야."},{label:"회전 속도",text:"막 두께는 회전 속도의 제곱근에 반비례해서, 두께를 절반으로 줄이려면 4배 빠르게 돌려야 해. 게임은 과속하면 감광액이 다 날아가는 걸로 표현하지만, 실제로는 막이 목표보다 얇아지는 쪽이야."},{label:"균일도",text:"PR 막 두께가 자리마다 다르면 노광할 때 초점도 어긋나고 반사되는 빛의 양도 달라져서 선폭(CD, critical dimension)이 들쭉날쭉해져. 그래서 웨이퍼 어디를 재도 두께가 거의 같아야 해."}],
 realWorld:"실제 팹에서는 웨이퍼를 진공 척(chuck)에 고정하고 보통 1000~4000 rpm으로 30초 안팎 돌려서, 수십 nm에서 수 µm 두께의 막을 만들어. 도쿄일렉트론 CLEAN TRACK 같은 코터·디벨로퍼 장비가 노광기와 한 몸으로 붙어 있어서 도포·베이크·노광·현상이 줄줄이 이어져.",
 howTo:["회전 ↻ 를 연타해 RPM을 초록 구간까지 올려.","그 상태에서 PR 스포이드를 웨이퍼 정중앙으로 끌고 가 손을 떼.","한 방울에 최대 25%. 네 번이면 끝."],
 goal:"도포 균일도 100%",tip:"초록 구간을 넘겼으면 연타를 멈추고 내려올 때까지 기다려."},
etch:{title:"식각 공정 · 무늬대로 깎아내기",
art:{svg:"<svg class=\"dg dg-etch\" viewBox=\"0 0 640 212\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"습식 식각 웨이퍼 단면도. 아래부터 실리콘 기판, 깎을 박막, 무늬대로 남은 감광액이 쌓여 있고 전체가 식각액에 잠겨 있다. 감광액이 덮지 않은 부분의 박막이 아래로도 옆으로도 동시에 깎여, 감광액 밑까지 파고드는 언더컷이 생긴다. 왼쪽 정상 식각은 박막 두께만큼 깎고 멈춰 좁아진 회로가 남지만, 오른쪽 과다 식각은 양쪽 언더컷이 서로 만나 감광액 밑 회로가 완전히 끊어지고 기판까지 파인다.\"> <defs> <clipPath id=\"dgEtchClip\"><rect x=\"26\" y=\"87.5\" width=\"270\" height=\"62.5\"/></clipPath> </defs> <!-- ===================== PANEL A : 정상 식각 ===================== --> <g> <rect class=\"panel\" x=\"10\" y=\"6\" width=\"303\" height=\"172\" rx=\"12\"/> <text class=\"ttl ttl-ok\" x=\"161.5\" y=\"25\" text-anchor=\"middle\">정상 식각</text> <path class=\"liq\" d=\"M26 40 q7.5 -4 15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 L296 88 L26 88 Z\"/> <path class=\"liqtop\" d=\"M26 40 q7.5 -4 15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0\"/> <rect class=\"base\" x=\"26\" y=\"110\" width=\"270\" height=\"40\"/> <rect class=\"film\" x=\"26\" y=\"88\" width=\"270\" height=\"22\"/> <g class=\"cavwrap\" clip-path=\"url(#dgEtchClip)\"> <line class=\"cav cav-o a-o\" x1=\"85\" y1=\"88\" x2=\"131\" y2=\"88\"/> <line class=\"cav cav-o a-o\" x1=\"191\" y1=\"88\" x2=\"237\" y2=\"88\"/> <line class=\"cav cav-f a-f\" x1=\"85\" y1=\"88\" x2=\"131\" y2=\"88\"/> <line class=\"cav cav-f a-f\" x1=\"191\" y1=\"88\" x2=\"237\" y2=\"88\"/> </g> <rect class=\"res\" x=\"26\" y=\"66\" width=\"59\" height=\"22\" rx=\"1.5\"/> <rect class=\"res\" x=\"131\" y=\"66\" width=\"60\" height=\"22\" rx=\"1.5\"/> <rect class=\"res\" x=\"237\" y=\"66\" width=\"59\" height=\"22\" rx=\"1.5\"/> <line class=\"dline\" x1=\"26\" y1=\"110\" x2=\"296\" y2=\"110\"/> <g class=\"noteA\"> <line class=\"medge\" x1=\"131\" y1=\"80\" x2=\"131\" y2=\"106\"/> <path class=\"lead\" d=\"M108 65 L108 96 L140 96\"/> <path class=\"leadhead\" d=\"M148 96 L139 92.6 L139 99.4 Z\"/> <text class=\"note\" x=\"108\" y=\"60\" text-anchor=\"middle\">언더컷</text> </g> <path class=\"ico ico-ok\" d=\"M65 166 L69.5 171 L77 159.5\"/> <text class=\"out out-ok\" x=\"85\" y=\"168\">제 깊이에서 정확히 멈춤</text> </g> <!-- ===================== PANEL B : 과다 식각 ===================== --> <g transform=\"translate(317,0)\"> <rect class=\"panel\" x=\"10\" y=\"6\" width=\"303\" height=\"172\" rx=\"12\"/> <text class=\"ttl ttl-bad\" x=\"161.5\" y=\"25\" text-anchor=\"middle\">과다 식각</text> <path class=\"liq\" d=\"M26 40 q7.5 -4 15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 L296 88 L26 88 Z\"/> <path class=\"liqtop\" d=\"M26 40 q7.5 -4 15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0 t15 0\"/> <rect class=\"base\" x=\"26\" y=\"110\" width=\"270\" height=\"40\"/> <rect class=\"film\" x=\"26\" y=\"88\" width=\"270\" height=\"22\"/> <g class=\"cavwrap\" clip-path=\"url(#dgEtchClip)\"> <line class=\"cav cav-o b-o\" x1=\"85\" y1=\"88\" x2=\"131\" y2=\"88\"/> <line class=\"cav cav-o b-o\" x1=\"191\" y1=\"88\" x2=\"237\" y2=\"88\"/> <line class=\"cav cav-f b-f\" x1=\"85\" y1=\"88\" x2=\"131\" y2=\"88\"/> <line class=\"cav cav-f b-f\" x1=\"191\" y1=\"88\" x2=\"237\" y2=\"88\"/> </g> <rect class=\"res\" x=\"26\" y=\"66\" width=\"59\" height=\"22\" rx=\"1.5\"/> <rect class=\"res\" x=\"131\" y=\"66\" width=\"60\" height=\"22\" rx=\"1.5\"/> <rect class=\"res\" x=\"237\" y=\"66\" width=\"59\" height=\"22\" rx=\"1.5\"/> <line class=\"dline\" x1=\"26\" y1=\"110\" x2=\"296\" y2=\"110\"/> <g class=\"noteB\"> <rect class=\"gone\" x=\"131\" y=\"88\" width=\"60\" height=\"22\" rx=\"2\"/> <path class=\"xmk\" d=\"M158 92 L172 106 M172 92 L158 106\"/> <path class=\"lead\" d=\"M104 65 L104 99 L138 99\"/> <path class=\"leadhead\" d=\"M146 99 L137 95.6 L137 102.4 Z\"/> <text class=\"note note-bad\" x=\"104\" y=\"60\" text-anchor=\"middle\">회로 끊김</text> </g> <path class=\"ico ico-bad\" d=\"M65.5 161 L76.5 171.5 M76.5 161 L65.5 171.5\"/> <text class=\"out out-bad\" x=\"85\" y=\"168\">더 담그면 회로가 끊어짐</text> </g> <!-- ===================== 범례 (위층 → 아래층 순서) ===================== --> <g> <rect class=\"sw-liq\"  x=\"131\" y=\"190\"   width=\"16\" height=\"10\" rx=\"5\"/> <text class=\"lg\" x=\"153\" y=\"200\">식각액</text> <rect class=\"sw-res\"  x=\"217\" y=\"189\"   width=\"16\" height=\"12\" rx=\"2\"/> <text class=\"lg\" x=\"239\" y=\"200\">감광액</text> <rect class=\"sw-film\" x=\"303\" y=\"191.5\" width=\"16\" height=\"7\"  rx=\"1\"/> <text class=\"lg\" x=\"325\" y=\"200\">깎을 박막</text> <rect class=\"sw-base\" x=\"410\" y=\"189\"   width=\"16\" height=\"12\" rx=\"2\"/> <text class=\"lg\" x=\"432\" y=\"200\">실리콘 기판</text> </g> </svg>",caption:"습식 식각은 옆으로도 파인다 — 이것이 언더컷"},
 summary:"감광액이 덮지 않은 맨살만 깎아내, 회로 무늬를 실제 홈으로 옮긴다.",
 processIntro:"포토 공정에서 감광액(PR)에 회로 무늬를 새긴 웨이퍼를 받아, 감광액이 덮지 않은 맨살만 화학적으로 깎아내는 공정이야. 무늬가 아래 박막에 진짜 홈으로 옮겨지고, 남은 감광액을 벗겨내면 회로 모양이 드러나서 증착·이온주입으로 넘어가. 식각은 용액에 담그는 습식(wet etching)과 플라스마로 깎는 건식(dry etching)으로 나뉘는데, 이 게임은 습식만 다뤄.",
 processDetail:[{label:"선택비",text:"에천트(etchant)는 깎아야 할 막만 골라 녹이고 감광액과 아래층은 거의 안 건드려야 해. 이 식각 속도의 비를 선택비(selectivity)라고 불러."},{label:"등방성",text:"습식 식각은 용액이 사방으로 똑같이 파고들어서(등방성, isotropic) 아래뿐 아니라 옆으로도 깎여. 감광액 밑까지 파이는 걸 언더컷(undercut)이라고 하고, 이것 때문에 아주 가는 선은 습식으로 만들기 어려워."},{label:"담근 시간",text:"깎인 깊이는 식각 속도 곱하기 담근 시간으로 정해지고, 그 속도는 용액의 온도와 농도에 따라 달라져. 그래서 습식 식각은 시간을 재서 멈추는 공정이야."}],
 realWorld:"실제 팹에서는 웨이퍼 여러 장을 카세트에 담아 에천트 탱크에 통째로 넣기도 해. 질화막(Si3N4)은 85% 인산(H3PO4)을 약 160도로 데운 탱크에서 벗겨내는데, 이 조건에서 질화막이 산화막(SiO2)보다 약 30배 빨리 깎여서 아래층은 지키고 위층만 걷어낼 수 있어.",
 howTo:["버튼을 꾹 누르면 웨이퍼가 잠기면서 깊이가 올라가.","초록 구간에 오면 손을 떼.","넘으면 Over-etch, 모자라면 Under-etch."],
 goal:"목표 구간에서 3번 성공",tip:"깊이는 일정한 속도로 올라가. 구간이 오기 직전에 미리 힘을 빼."},
deposit:{title:"증착·이온주입 · 층을 쌓고 성질을 심는다",
art:{svg:"<svg class=\"dg dg-deposit\" viewBox=\"0 0 640 228\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"증착과 이온주입을 나란히 비교한 웨이퍼 단면도. 왼쪽 증착에서는 원자가 위에서 날아와 표면에 내려앉고, 굴곡진 표면을 따라 박막이 층층이 두꺼워진다. 오른쪽 이온주입에서는 가속된 이온이 실리콘 표면을 뚫고 들어가 표면 아래 깊이에 박히며, 인(P)을 넣은 쪽은 전자가 남는 n형, 붕소(B)를 넣은 쪽은 정공이 생기는 p형이 된다.\"> <rect class=\"card\" x=\"8\" y=\"2\" width=\"304\" height=\"222\" rx=\"12\"/> <rect class=\"card\" x=\"328\" y=\"2\" width=\"304\" height=\"222\" rx=\"12\"/> <!-- ================= 왼쪽 : 증착 ================= --> <text class=\"ttl\" x=\"160\" y=\"22\" text-anchor=\"middle\">증착 · 표면 위에 쌓는다</text> <circle class=\"lgd\" cx=\"28\" cy=\"38\" r=\"4\"/> <text class=\"leg\" x=\"38\" y=\"42.5\">증착 원자</text> <rect class=\"lgf\" x=\"106\" y=\"33.5\" width=\"16\" height=\"9\" rx=\"1.5\"/> <text class=\"leg\" x=\"128\" y=\"42.5\">쌓인 박막</text> <!-- 원자가 날아오는 경로 --> <path class=\"flux fluxA\" d=\"M34 52 V110\"/> <path class=\"flux fluxA\" d=\"M58 52 V110\"/> <path class=\"flux fluxA\" d=\"M82 52 V110\"/> <path class=\"flux fluxA\" d=\"M122 52 V84\"/> <path class=\"flux fluxA\" d=\"M150 52 V84\"/> <path class=\"flux fluxA\" d=\"M178 52 V84\"/> <path class=\"flux fluxA\" d=\"M218 52 V110\"/> <path class=\"flux fluxA\" d=\"M246 52 V110\"/> <path class=\"flux fluxA\" d=\"M274 52 V110\"/> <!-- 굴곡(단차)이 있는 실리콘 기판 --> <path class=\"si\" d=\"M20 176 L20 130 L112 130 L112 104 L188 104 L188 130 L300 130 L300 176 Z\"/> <!-- 컨포멀하게 덮이는 박막 3층 : 수평면은 위로, 옆면은 옆으로 4씩 --> <path class=\"film f1\" d=\"M20 130 H112 V104 H188 V130 H300 V126 H192 V100 H108 V126 H20 Z\"/> <path class=\"film f2\" d=\"M20 126 H108 V100 H192 V126 H300 V122 H196 V96 H104 V122 H20 Z\"/> <path class=\"film f3\" d=\"M20 122 H104 V96 H196 V122 H300 V118 H200 V92 H100 V118 H20 Z\"/> <text class=\"lbl\" x=\"160\" y=\"171\" text-anchor=\"middle\">실리콘 기판</text> <!-- 날아와 내려앉는 원자 --> <circle class=\"atom fa a1\" cx=\"34\" cy=\"114\" r=\"4\"/> <circle class=\"atom fa a4\" cx=\"58\" cy=\"114\" r=\"4\"/> <circle class=\"atom fa a7\" cx=\"82\" cy=\"114\" r=\"4\"/> <circle class=\"atom fb a2\" cx=\"122\" cy=\"88\" r=\"4\"/> <circle class=\"atom fb a5\" cx=\"150\" cy=\"88\" r=\"4\"/> <circle class=\"atom fb a8\" cx=\"178\" cy=\"88\" r=\"4\"/> <circle class=\"atom fa a3\" cx=\"218\" cy=\"114\" r=\"4\"/> <circle class=\"atom fa a6\" cx=\"246\" cy=\"114\" r=\"4\"/> <circle class=\"atom fa a9\" cx=\"274\" cy=\"114\" r=\"4\"/> <text class=\"cap\" x=\"160\" y=\"193\" text-anchor=\"middle\">원자가 표면 위에 층층이 쌓인다</text> <text class=\"cap2\" x=\"160\" y=\"212\" text-anchor=\"middle\">굴곡을 따라 고르게 덮는다 (컨포멀)</text> <!-- ================= 오른쪽 : 이온주입 ================= --> <text class=\"ttl\" x=\"480\" y=\"22\" text-anchor=\"middle\">이온주입 · 뚫고 들어간다</text> <path class=\"ionP\" d=\"M348 33 L353.5 38 L348 43 L342.5 38 Z\"/> <path class=\"ionB\" d=\"M362 33 L367.5 38 L362 43 L356.5 38 Z\"/> <text class=\"leg\" x=\"374\" y=\"42.5\">가속된 이온</text> <rect class=\"swP\" x=\"452\" y=\"33.5\" width=\"9\" height=\"9\"/> <rect class=\"swB\" x=\"461\" y=\"33.5\" width=\"9\" height=\"9\"/> <text class=\"leg\" x=\"474\" y=\"42.5\">주입층(표면 아래)</text> <!-- 약 5도 기울어 날아오는 이온의 경로 --> <path class=\"flux fluxP\" d=\"M353.6 55 L360.1 125\"/> <path class=\"flux fluxP\" d=\"M373.2 55 L379.7 125\"/> <path class=\"flux fluxP\" d=\"M429.4 55 L436 125\"/> <path class=\"flux fluxP\" d=\"M451.8 55 L458.3 125\"/> <path class=\"flux fluxB\" d=\"M493.4 55 L499.9 125\"/> <path class=\"flux fluxB\" d=\"M513.7 55 L520.2 125\"/> <path class=\"flux fluxB\" d=\"M569.2 55 L575.7 125\"/> <path class=\"flux fluxB\" d=\"M591.5 55 L598.1 125\"/> <!-- 실리콘 기판 : 윗면(표면)이 y=130 --> <rect class=\"si\" x=\"340\" y=\"130\" width=\"280\" height=\"46\"/> <!-- 표면 아래에 만들어지는 주입층 --> <g class=\"band\"> <rect class=\"bn\" x=\"348\" y=\"138\" width=\"124\" height=\"18\" rx=\"4\"/> <rect class=\"bp\" x=\"488\" y=\"138\" width=\"124\" height=\"18\" rx=\"4\"/> </g> <line class=\"divi\" x1=\"480\" y1=\"130\" x2=\"480\" y2=\"156\"/> <!-- 표면을 뚫고 들어간 자국 --> <path class=\"trk trkP i1\" d=\"M360.1 125 L362 139.5\"/> <path class=\"trk trkP i2\" d=\"M379.7 125 L382 144.5\"/> <path class=\"trk trkP i3\" d=\"M436 125 L438 141.5\"/> <path class=\"trk trkP i4\" d=\"M458.3 125 L460 137.5\"/> <path class=\"trk trkB i5\" d=\"M499.9 125 L502 142.5\"/> <path class=\"trk trkB i6\" d=\"M520.2 125 L522 138.5\"/> <path class=\"trk trkB i7\" d=\"M575.7 125 L578 144.5\"/> <path class=\"trk trkB i8\" d=\"M598.1 125 L600 140.5\"/> <text class=\"zn zn-n\" x=\"410\" y=\"152\" text-anchor=\"middle\">n형</text> <text class=\"zn zn-p\" x=\"550\" y=\"152\" text-anchor=\"middle\">p형</text> <text class=\"lbl\" x=\"480\" y=\"171\" text-anchor=\"middle\">실리콘 기판</text> <!-- 표면을 뚫고 들어가 안쪽에 박히는 이온 --> <path class=\"ion ionP i1\" d=\"M362 139.5 L367.5 145 L362 150.5 L356.5 145 Z\"/> <path class=\"ion ionP i2\" d=\"M382 144.5 L387.5 150 L382 155.5 L376.5 150 Z\"/> <path class=\"ion ionP i3\" d=\"M438 141.5 L443.5 147 L438 152.5 L432.5 147 Z\"/> <path class=\"ion ionP i4\" d=\"M460 137.5 L465.5 143 L460 148.5 L454.5 143 Z\"/> <path class=\"ion ionB i5\" d=\"M502 142.5 L507.5 148 L502 153.5 L496.5 148 Z\"/> <path class=\"ion ionB i6\" d=\"M522 138.5 L527.5 144 L522 149.5 L516.5 144 Z\"/> <path class=\"ion ionB i7\" d=\"M578 144.5 L583.5 150 L578 155.5 L572.5 150 Z\"/> <path class=\"ion ionB i8\" d=\"M600 140.5 L605.5 146 L600 151.5 L594.5 146 Z\"/> <path class=\"ionP\" d=\"M380 183.5 L385 188.5 L380 193.5 L375 188.5 Z\"/> <text class=\"cap\" x=\"394\" y=\"193\">인(P) → <tspan class=\"tn\">n형</tspan> · 전자가 남음</text> <path class=\"ionB\" d=\"M380 202.5 L385 207.5 L380 212.5 L375 207.5 Z\"/> <text class=\"cap\" x=\"394\" y=\"212\">붕소(B) → <tspan class=\"tp\">p형</tspan> · 정공이 생김</text> </svg>",caption:"증착은 위에 쌓고, 이온주입은 안으로 박아 넣는다"},
 summary:"박막을 얇게 입히고 실리콘에 불순물을 박아 넣어 트랜지스터의 몸체를 만든다.",
 processIntro:"식각까지 끝난 웨이퍼에는 회로 모양의 홈만 파여 있어. 증착(deposition)으로 그 위에 절연막이나 금속을 얇게 입혀 박막(thin film)을 만들고, 이온주입(ion implantation)으로 실리콘에 불순물을 박아 넣으면 트랜지스터의 몸체가 갖춰져 — 다음 금속 배선 공정이 그걸 전선으로 잇거든. 실제로는 별개 공정이고 포토·식각과 번갈아 여러 번 반복되는데, 게임은 한 판으로 합쳤어.",
 processDetail:[{label:"증착",text:"웨이퍼 표면에 원자를 쌓아 얇은 층을 만드는 일이야. 기체를 반응시키는 화학기상증착(CVD), 타깃 금속을 이온으로 때려 튀어나온 원자를 붙이는 물리기상증착(PVD), 원자층을 하나씩 쌓는 원자층증착(ALD)이 대표적이야."},{label:"이온주입",text:"불순물을 이온으로 만들어 전기장으로 가속한 뒤 실리콘에 박아 넣어. 인(P)을 넣으면 전자가 남아 n형, 붕소(B)를 넣으면 정공이 생겨 p형이 되고, 이 자리 배치가 트랜지스터의 동작을 결정해."},{label:"공극",text:"좁고 깊은 골을 박막으로 채울 때 입구 쪽이 먼저 덮이면 안쪽에 빈 구멍이 갇혀. 이게 Void(공극)인데, 채운 게 금속이면 저항이 커지고 어느 쪽이든 나중에 불량으로 이어져."}],
 realWorld:"원자층증착(ALD)은 한 사이클에 원자 한 층 수준인 0.1 nm 안팎만 쌓아서, 목표 두께가 될 때까지 수십에서 수백 사이클을 반복해. 이온주입기(ion implanter)는 붕소·인 이온을 보통 수 keV에서 수백 keV로 가속해 쏘고, 흐트러진 실리콘 결정을 되돌리고 불순물을 활성화하려고 곧바로 고온 열처리(annealing)를 해.",
 howTo:["A / D · 방향키 · 화면 버튼으로 내려오는 블록을 좌우로 옮겨.","스페이스나 바로 증착 버튼으로 떨어뜨려.","아래를 비운 채 쌓으면 그 칸이 Void 가 돼."],
 goal:"맨 아래 3층을 빈칸 없이",tip:"빈칸이 보이면 다음 블록으로 그 세로줄부터 메워."},
connect:{title:"금속 배선 · 소자끼리 전선을 깐다",
art:{svg:"<svg class=\"dg dg-connect\" viewBox=\"0 0 640 200\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"금속 배선 웨이퍼 단면도. 실리콘 기판의 트랜지스터에서 나온 전류가 콘택트를 타고 1층 배선으로 올라가고, 비아를 거쳐 2층·3층 배선까지 올라간 뒤 가로로 길게 이동해, 다시 비아와 콘택트를 타고 옆에 있는 다른 트랜지스터로 내려간다.\"> <!-- ===== 전류 흐름 범례 ===== --> <line class=\"lg\" x1=\"20\" y1=\"20\" x2=\"42\" y2=\"20\"/> <polygon class=\"arw\" points=\"50,20 42,15.5 42,24.5\"/> <text class=\"lbl\" x=\"58\" y=\"25\">전류 흐름</text> <text class=\"note\" x=\"624\" y=\"25\" text-anchor=\"end\">배선 재료: 알루미늄 → 구리(Cu)</text> <!-- ===== 절연막(산화막) 층: 밝은 띠=배선층, 어두운 띠=비아층 ===== --> <rect class=\"bandB\" x=\"16\" y=\"30\" width=\"608\" height=\"6\"/> <rect class=\"bandA\" x=\"16\" y=\"36\" width=\"608\" height=\"14\"/> <rect class=\"bandB\" x=\"16\" y=\"50\" width=\"608\" height=\"22\"/> <rect class=\"bandA\" x=\"16\" y=\"72\" width=\"608\" height=\"12\"/> <rect class=\"bandB\" x=\"16\" y=\"84\" width=\"608\" height=\"22\"/> <rect class=\"bandA\" x=\"16\" y=\"106\" width=\"608\" height=\"10\"/> <rect class=\"bandB\" x=\"16\" y=\"116\" width=\"608\" height=\"26\"/> <rect class=\"frame\" x=\"16\" y=\"30\" width=\"608\" height=\"112\"/> <!-- ===== 실리콘 기판 + 트랜지스터 2개 (소스/드레인은 게이트 가장자리에 정렬) ===== --> <rect class=\"sub\" x=\"16\" y=\"142\" width=\"608\" height=\"44\"/> <rect class=\"sd\" x=\"76\" y=\"142\" width=\"40\" height=\"20\"/> <rect class=\"sd\" x=\"156\" y=\"142\" width=\"40\" height=\"20\"/> <rect class=\"sd\" x=\"444\" y=\"142\" width=\"40\" height=\"20\"/> <rect class=\"sd\" x=\"524\" y=\"142\" width=\"40\" height=\"20\"/> <rect class=\"gox\" x=\"116\" y=\"139\" width=\"40\" height=\"3\"/> <rect class=\"gox\" x=\"484\" y=\"139\" width=\"40\" height=\"3\"/> <rect class=\"gate\" x=\"116\" y=\"127\" width=\"40\" height=\"12\"/> <rect class=\"gate\" x=\"484\" y=\"127\" width=\"40\" height=\"12\"/> <!-- ===== 콘택트(텅스텐 플러그): 트랜지스터 ↔ 1층 배선 ===== --> <rect class=\"w\" x=\"91\" y=\"116\" width=\"14\" height=\"26\"/> <rect class=\"w\" x=\"535\" y=\"116\" width=\"14\" height=\"26\"/> <!-- ===== 비아(세로) : 배선층 ↔ 배선층 ===== --> <rect class=\"cu\" x=\"156\" y=\"84\" width=\"14\" height=\"22\"/> <rect class=\"cu\" x=\"231\" y=\"50\" width=\"14\" height=\"22\"/> <rect class=\"cu\" x=\"395\" y=\"50\" width=\"14\" height=\"22\"/> <rect class=\"cu\" x=\"470\" y=\"84\" width=\"14\" height=\"22\"/> <!-- ===== 가로 배선(구리) : 위층일수록 두껍다 ===== --> <rect class=\"cu\" x=\"88\" y=\"106\" width=\"88\" height=\"10\"/> <rect class=\"cu\" x=\"464\" y=\"106\" width=\"88\" height=\"10\"/> <rect class=\"cu\" x=\"148\" y=\"72\" width=\"104\" height=\"12\"/> <rect class=\"cu\" x=\"388\" y=\"72\" width=\"104\" height=\"12\"/> <rect class=\"cu\" x=\"210\" y=\"36\" width=\"220\" height=\"14\"/> <!-- ===== 전류 경로: 올라가고 → 가로지르고 → 내려온다 ===== --> <path class=\"route\" d=\"M98 155 V111 H163 V78 H238 V43 H402 V78 H477 V111 H542 V155\"/> <path class=\"flow\" d=\"M98 155 V111 H163 V78 H238 V43 H402 V78 H477 V111 H542 V155\"/> <!-- 방향 화살표는 흐름선 위에 올려 정지 상태에서도 방향이 보이게 한다 --> <polygon class=\"arw on\" points=\"98,121 91.5,131 104.5,131\"/> <polygon class=\"arw on\" points=\"331,43 319,36.8 319,49.2\"/> <polygon class=\"arw on\" points=\"542,137 535.5,127 548.5,127\"/> <!-- ===== 라벨 ===== --> <text class=\"lbl\" x=\"438\" y=\"47\">3층 배선</text> <text class=\"lbl\" x=\"500\" y=\"82\">2층 배선</text> <text class=\"lbl\" x=\"560\" y=\"116\">1층 배선</text> <line class=\"lead\" x1=\"145\" y1=\"95\" x2=\"154\" y2=\"95\"/> <text class=\"lbl\" x=\"140\" y=\"98\" text-anchor=\"end\">비아(via)</text> <line class=\"lead\" x1=\"79\" y1=\"129\" x2=\"89\" y2=\"129\"/> <text class=\"lbl\" x=\"74\" y=\"133\" text-anchor=\"end\">콘택트</text> <text class=\"lbl\" x=\"320\" y=\"92\" text-anchor=\"middle\">절연막 (산화막)</text> <text class=\"note\" x=\"320\" y=\"116\" text-anchor=\"middle\">실제 칩은 배선층 10겹 이상</text> <text class=\"lbl\" x=\"136\" y=\"178\" text-anchor=\"middle\">트랜지스터</text> <text class=\"lbl\" x=\"320\" y=\"178\" text-anchor=\"middle\">실리콘 기판</text> <text class=\"lbl\" x=\"504\" y=\"178\" text-anchor=\"middle\">트랜지스터</text> </svg>",caption:"비아로 층을 잇고 배선으로 소자끼리 연결한다"},
 summary:"완성된 소자들을 금속 배선으로 이어, 전류가 흐르는 회로로 만든다.",
 processIntro:"앞 공정까지 오면 웨이퍼 위에 트랜지스터가 수없이 만들어져 있지만, 서로 떨어져 있어서 아직 회로가 아니야. 금속 배선(metal interconnection)은 그 소자들 사이에 금속 선을 깔아 전기가 통하게 만드는 단계고, 여기까지 끝나야 칩이 동작해서 다음 EDS 전기 검사로 넘어갈 수 있어. 실제 배선은 여러 층으로 쌓이지만 이 게임은 한 층만 다뤄.",
 processDetail:[{label:"구리 배선",text:"예전엔 알루미늄(Al)을 썼지만 지금 로직 칩 배선은 대부분 구리(Cu)야. 구리의 비저항이 약 1.7 µΩ·cm 로 알루미늄(약 2.7 µΩ·cm)보다 낮아서, 같은 굵기로 전류를 더 잘 흘리거든."},{label:"다마신",text:"구리는 기체로 날려 깎아내기가 어려워서 순서를 뒤집어. 절연막에 홈을 먼저 파고 구리를 채운 다음 넘친 부분을 갈아내는 다마신(damascene) 방식이야."},{label:"비아",text:"층과 층 사이는 비아(via)라는 수직 통로로 연결해. 가로로 뻗은 배선과 세로 비아가 번갈아 쌓이면서 3차원 배선망이 만들어져."}],
 realWorld:"최신 로직 칩은 금속 배선을 10층 넘게, 많으면 15층 이상 쌓아 올려. 한 층을 얹을 때마다 화학기계연마(CMP)로 표면을 평탄하게 갈아내야 그 위에 다음 층을 정확히 만들 수 있어.",
 howTo:["타일을 누르면 배선이 90도씩 돌아가.","왼쪽 ⚡ 에서 오른쪽 TR 까지 하나로 이어.","전류가 닿은 타일은 밝게 켜져."],
 goal:"POWER 에서 TR 까지 연결",tip:"켜진 타일 끝에서부터 이어 나가면 길이 보여."},
eds:{title:"EDS 공정 · 불량 다이 골라내기",
art:{svg:"<svg class=\"dg dg-eds\" viewBox=\"0 0 640 224\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"EDS 다이어그램. 왼쪽 웨이퍼 평면도에서 프로브 카드가 다이를 한 칸씩 옮겨 다니며 검사하고, 결과에 따라 양품과 불량으로 나뉘며 불량 다이에는 잉크 점이 찍힌다. 오른쪽 확대 단면도에서는 프로브 바늘이 다이의 패드에 닿아 전기 신호를 넣고 돌아온 응답을 읽는다.\"> <defs> <clipPath id=\"edsWaferClip\"><path d=\"M120.1 183.64 A66 66 0 1 1 133.9 183.64 L127 175 Z\"/></clipPath> </defs> <text class=\"h\" x=\"14\" y=\"24\">① 다이(칩)를 한 칸씩 검사</text> <text class=\"h\" x=\"258\" y=\"24\">② 바늘이 패드에 닿아 전기 신호로 판정</text> <path class=\"wafer\" d=\"M120.1 183.64 A66 66 0 1 1 133.9 183.64 L127 175 Z\"/> <g clip-path=\"url(#edsWaferClip)\"> <g class=\"dies-u\"> <rect x=\"164\" y=\"119\" width=\"16\" height=\"14\"/> <rect x=\"74\" y=\"135\" width=\"16\" height=\"14\"/><rect x=\"92\" y=\"135\" width=\"16\" height=\"14\"/><rect x=\"110\" y=\"135\" width=\"16\" height=\"14\"/><rect x=\"128\" y=\"135\" width=\"16\" height=\"14\"/><rect x=\"146\" y=\"135\" width=\"16\" height=\"14\"/><rect x=\"164\" y=\"135\" width=\"16\" height=\"14\"/> <rect x=\"92\" y=\"151\" width=\"16\" height=\"14\"/><rect x=\"110\" y=\"151\" width=\"16\" height=\"14\"/><rect x=\"128\" y=\"151\" width=\"16\" height=\"14\"/><rect x=\"146\" y=\"151\" width=\"16\" height=\"14\"/> <rect x=\"110\" y=\"167\" width=\"16\" height=\"14\"/><rect x=\"128\" y=\"167\" width=\"16\" height=\"14\"/> </g> <g class=\"dies-g\"> <rect x=\"128\" y=\"55\" width=\"16\" height=\"14\"/> <rect x=\"92\" y=\"71\" width=\"16\" height=\"14\"/><rect x=\"110\" y=\"71\" width=\"16\" height=\"14\"/><rect x=\"128\" y=\"71\" width=\"16\" height=\"14\"/> <rect x=\"74\" y=\"87\" width=\"16\" height=\"14\"/><rect x=\"92\" y=\"87\" width=\"16\" height=\"14\"/><rect x=\"110\" y=\"87\" width=\"16\" height=\"14\"/><rect x=\"128\" y=\"87\" width=\"16\" height=\"14\"/><rect x=\"146\" y=\"87\" width=\"16\" height=\"14\"/> <rect x=\"74\" y=\"103\" width=\"16\" height=\"14\"/><rect x=\"92\" y=\"103\" width=\"16\" height=\"14\"/><rect x=\"110\" y=\"103\" width=\"16\" height=\"14\"/><rect x=\"128\" y=\"103\" width=\"16\" height=\"14\"/><rect x=\"146\" y=\"103\" width=\"16\" height=\"14\"/><rect x=\"164\" y=\"103\" width=\"16\" height=\"14\"/> <rect x=\"74\" y=\"119\" width=\"16\" height=\"14\"/><rect x=\"92\" y=\"119\" width=\"16\" height=\"14\"/><rect x=\"128\" y=\"119\" width=\"16\" height=\"14\"/><rect x=\"146\" y=\"119\" width=\"16\" height=\"14\"/> </g> <g class=\"dies-b\"> <rect x=\"110\" y=\"55\" width=\"16\" height=\"14\"/><rect x=\"146\" y=\"71\" width=\"16\" height=\"14\"/><rect x=\"164\" y=\"87\" width=\"16\" height=\"14\"/><rect x=\"110\" y=\"119\" width=\"16\" height=\"14\"/> <circle class=\"ink\" cx=\"118\" cy=\"62\" r=\"3.4\"/><circle class=\"ink\" cx=\"154\" cy=\"78\" r=\"3.4\"/><circle class=\"ink\" cx=\"172\" cy=\"94\" r=\"3.4\"/><circle class=\"ink\" cx=\"118\" cy=\"126\" r=\"3.4\"/> </g> <rect class=\"pend p1\" x=\"92\" y=\"119\" width=\"16\" height=\"14\"/> <rect class=\"pend p2\" x=\"110\" y=\"119\" width=\"16\" height=\"14\"/> <rect class=\"pend p3\" x=\"128\" y=\"119\" width=\"16\" height=\"14\"/> <rect class=\"pend p4\" x=\"146\" y=\"119\" width=\"16\" height=\"14\"/> </g> <rect class=\"probe\" x=\"90\" y=\"117\" width=\"20\" height=\"18\" rx=\"2\"/> <path class=\"ldr\" d=\"M60 50 L79 74\"/><circle class=\"ldot\" cx=\"79\" cy=\"74\" r=\"2\"/> <text class=\"sm\" x=\"14\" y=\"46\">웨이퍼</text> <path class=\"ldr\" d=\"M74 174 L98 158\"/><circle class=\"ldot\" cx=\"98\" cy=\"158\" r=\"2\"/> <text class=\"sm\" x=\"14\" y=\"177\">다이 1개</text> <path class=\"zoom\" d=\"M196 118 L298 42\"/><path class=\"zoom\" d=\"M196 134 L298 158\"/> <text class=\"sm\" x=\"224\" y=\"130\" text-anchor=\"middle\">확대</text> <g class=\"head\"> <rect class=\"card\" x=\"300\" y=\"44\" width=\"196\" height=\"18\" rx=\"3\"/> <text class=\"lbd\" x=\"398\" y=\"58\" text-anchor=\"middle\">프로브 카드</text> <path class=\"needle\" d=\"M348 62 L360 106\"/> <path class=\"needle\" d=\"M448 62 L436 106\"/> </g> <rect class=\"pad\" x=\"345\" y=\"106\" width=\"30\" height=\"10\"/> <rect class=\"pad\" x=\"421\" y=\"106\" width=\"30\" height=\"10\"/> <rect class=\"diel\" x=\"300\" y=\"116\" width=\"196\" height=\"12\"/> <rect class=\"si\" x=\"300\" y=\"128\" width=\"196\" height=\"28\"/> <text class=\"lb\" x=\"398\" y=\"147\" text-anchor=\"middle\">실리콘 다이(칩)</text> <circle class=\"sig-in\" cx=\"348\" cy=\"62\" r=\"4.5\"/> <circle class=\"sig-out\" cx=\"436\" cy=\"106\" r=\"4.5\"/> <path class=\"ldr\" d=\"M536 88 L441 88\"/><circle class=\"ldot\" cx=\"441\" cy=\"88\" r=\"2\"/> <text class=\"lb\" x=\"542\" y=\"93\">프로브 바늘</text> <path class=\"ldr\" d=\"M536 111 L449 111\"/><circle class=\"ldot\" cx=\"449\" cy=\"111\" r=\"2\"/> <text class=\"lb\" x=\"542\" y=\"116\">패드(전극)</text> <path class=\"ldr\" d=\"M536 134 L492 122\"/><circle class=\"ldot\" cx=\"492\" cy=\"122\" r=\"2\"/> <text class=\"lb\" x=\"542\" y=\"139\">절연막</text> <circle class=\"dot-in\" cx=\"306\" cy=\"172\" r=\"4.5\"/> <text class=\"sm\" x=\"316\" y=\"177\">전기 신호 넣기</text> <circle class=\"dot-out\" cx=\"424\" cy=\"172\" r=\"4.5\"/> <text class=\"sm\" x=\"434\" y=\"177\">돌아온 응답 읽기</text> <line class=\"sep\" x1=\"14\" y1=\"192\" x2=\"632\" y2=\"192\"/> <g class=\"dies-u\"><rect x=\"14\" y=\"198\" width=\"12\" height=\"12\"/></g> <text class=\"sm\" x=\"32\" y=\"209\">미검사</text> <g class=\"dies-g\"><rect x=\"110\" y=\"198\" width=\"12\" height=\"12\"/></g> <text class=\"sm\" x=\"128\" y=\"209\">양품(합격)</text> <g class=\"dies-b\"><rect x=\"240\" y=\"198\" width=\"12\" height=\"12\"/><circle class=\"ink\" cx=\"246\" cy=\"204\" r=\"3\"/></g> <text class=\"sm\" x=\"258\" y=\"209\">불량 — 잉크 점 표시</text> <rect class=\"lg-probe\" x=\"420\" y=\"198\" width=\"12\" height=\"12\" rx=\"2\"/> <text class=\"sm\" x=\"438\" y=\"209\">검사 중인 다이</text> </svg>",caption:"프로브 바늘로 다이를 하나씩 검사해 양품·불량을 가른다"},
 summary:"웨이퍼 위 다이를 하나씩 전기 검사해 불량을 골라낸다.",
 processIntro:"금속 배선까지 끝나면 웨이퍼 한 장에 들어간 칩 회로가 전부 완성돼. EDS(Electrical Die Sorting)는 웨이퍼를 자르기 전에 다이(die) 하나하나에 전기를 흘려 넣어 제대로 동작하는지 가려내는 공정이고, 여기서 통과한 양품만 패키징으로 넘어가. 실제 EDS엔 불량을 고르는 것 말고 수선(repair) 단계도 있는데, 게임은 선별만 다뤄.",
 processDetail:[{label:"프로브카드",text:"이 시점의 칩엔 아직 밖으로 나온 다리가 없어. 그래서 미세한 바늘이 수천~수만 개 박힌 프로브 카드(probe card)를 웨이퍼 표면의 패드에 직접 눌러서 전기 신호를 넣고 답을 읽어."},{label:"웨이퍼맵",text:"불량 판정을 받은 다이는 웨이퍼 맵(wafer map) 위 좌표로 기록돼. 예전엔 그 자리에 잉크를 찍어 눈으로 표시했지만, 지금은 데이터로만 남기고 뒤쪽 장비가 그 좌표를 읽어서 건너뛰어."},{label:"수율",text:"전체 다이 중 양품이 차지하는 비율이 수율(yield)이야. 앞 공정에서 생긴 결함이 여기서 처음 숫자로 드러나기 때문에, EDS 결과는 곧바로 앞 공정을 고치는 데 쓰여."}],
 realWorld:"실제 팹에선 웨이퍼 프로버(prober)가 웨이퍼를 수 마이크로미터 정밀도로 옮겨 가며 바늘을 찍고, 상온뿐 아니라 상온보다 높은 온도와 낮은 온도에서도 동작을 확인해(Hot/Cold Test). 메모리는 다이를 한 번에 수백 개씩 병렬로 검사하고, 고칠 수 있는 불량은 레이저로 퓨즈를 끊어 미리 넣어 둔 예비 셀로 갈아 끼워.",
 howTo:["검사 시작을 누르면 프로브가 내려와.","✕ 가 켜진 다이를 꺼지기 전에 눌러.","갈수록 켜져 있는 시간이 짧아져."],
 goal:"30초 안에 불량 12개 마킹",tip:"한 곳만 보지 말고 웨이퍼 전체를 훑어. 동시에 두 개까지 켜져."},
pack:{title:"패키징 공정 · 웨이퍼를 낱개 칩으로",
art:{svg:"<svg class=\"dg dg-pack\" viewBox=\"0 0 640 210\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"패키징 공정 3단계. 1단계 다이싱: 회전 톱날이 웨이퍼의 스크라이브 라인을 따라 가로세로로 잘라 낱개 다이로 분리한다. 2단계: 다이를 리드 프레임에 올리고 금선으로 다이 패드와 리드를 연결한다. 3단계: 수지로 몰딩해 리드가 밖으로 나온 완성 칩이 된다.\"> <defs> <clipPath id=\"packWaferClip\"><circle cx=\"110\" cy=\"112\" r=\"56\"/></clipPath> </defs> <!-- ================= 1단계 : 다이싱 ================= --> <text x=\"110\" y=\"22\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#52e5d2\">① 다이싱</text> <g clip-path=\"url(#packWaferClip)\"> <circle cx=\"110\" cy=\"112\" r=\"56\" fill=\"#101a2e\"/> <g fill=\"#4a6488\" stroke=\"#7f9ac4\" stroke-width=\"0.8\"> <rect x=\"74\" y=\"52\" width=\"20\" height=\"20\"/><rect x=\"98\" y=\"52\" width=\"20\" height=\"20\"/><rect x=\"122\" y=\"52\" width=\"20\" height=\"20\"/> <rect x=\"50\" y=\"76\" width=\"20\" height=\"20\"/><rect x=\"74\" y=\"76\" width=\"20\" height=\"20\"/><rect x=\"98\" y=\"76\" width=\"20\" height=\"20\"/><rect x=\"146\" y=\"76\" width=\"20\" height=\"20\"/> <rect x=\"50\" y=\"100\" width=\"20\" height=\"20\"/><rect x=\"74\" y=\"100\" width=\"20\" height=\"20\"/><rect x=\"98\" y=\"100\" width=\"20\" height=\"20\"/><rect x=\"122\" y=\"100\" width=\"20\" height=\"20\"/><rect x=\"146\" y=\"100\" width=\"20\" height=\"20\"/> <rect x=\"50\" y=\"124\" width=\"20\" height=\"20\"/><rect x=\"74\" y=\"124\" width=\"20\" height=\"20\"/><rect x=\"98\" y=\"124\" width=\"20\" height=\"20\"/><rect x=\"122\" y=\"124\" width=\"20\" height=\"20\"/><rect x=\"146\" y=\"124\" width=\"20\" height=\"20\"/> <rect x=\"74\" y=\"148\" width=\"20\" height=\"20\"/><rect x=\"98\" y=\"148\" width=\"20\" height=\"20\"/><rect x=\"122\" y=\"148\" width=\"20\" height=\"20\"/> </g> <rect x=\"122\" y=\"76\" width=\"20\" height=\"20\" fill=\"#0c1424\" stroke=\"#5b6d92\" stroke-width=\"1\" stroke-dasharray=\"3 2\"/> <line class=\"cut cutH\" x1=\"48\" y1=\"74\" x2=\"172\" y2=\"74\" pathLength=\"100\"/> <line class=\"cut cutH\" x1=\"48\" y1=\"98\" x2=\"172\" y2=\"98\" pathLength=\"100\"/> <line class=\"cut cutH\" x1=\"48\" y1=\"122\" x2=\"172\" y2=\"122\" pathLength=\"100\"/> <line class=\"cut cutH\" x1=\"48\" y1=\"146\" x2=\"172\" y2=\"146\" pathLength=\"100\"/> <line class=\"cut cutV\" x1=\"72\" y1=\"50\" x2=\"72\" y2=\"174\" pathLength=\"100\"/> <line class=\"cut cutV\" x1=\"96\" y1=\"50\" x2=\"96\" y2=\"174\" pathLength=\"100\"/> <line class=\"cut cutV\" x1=\"120\" y1=\"50\" x2=\"120\" y2=\"174\" pathLength=\"100\"/> <line class=\"cut cutV\" x1=\"144\" y1=\"50\" x2=\"144\" y2=\"174\" pathLength=\"100\"/> </g> <circle cx=\"110\" cy=\"112\" r=\"56\" fill=\"none\" stroke=\"#7698ff\" stroke-width=\"1.6\"/> <g class=\"blade bladeH\"> <rect x=\"-1.5\" y=\"50\" width=\"3\" height=\"130\" rx=\"1.5\" fill=\"#ffd166\"/> <circle cx=\"0\" cy=\"50\" r=\"5\" fill=\"#ffd166\"/> <text x=\"0\" y=\"38\" text-anchor=\"middle\" font-size=\"13\" fill=\"#ffd166\">회전 톱날</text> </g> <g class=\"blade bladeV\"> <rect x=\"42\" y=\"-1.5\" width=\"138\" height=\"3\" rx=\"1.5\" fill=\"#ffd166\"/> <circle cx=\"42\" cy=\"0\" r=\"5\" fill=\"#ffd166\"/> </g> <rect class=\"fly\" x=\"122\" y=\"76\" width=\"20\" height=\"20\" fill=\"#5b7ba6\" stroke=\"#ffd166\" stroke-width=\"1.4\"/> <text class=\"flyLb\" x=\"205\" y=\"88\" text-anchor=\"middle\" font-size=\"15\" fill=\"#ffd166\">낱개 다이</text> <text x=\"120\" y=\"196\" text-anchor=\"middle\" font-size=\"13\" fill=\"#91a0bf\">웨이퍼를 스크라이브 라인 따라 절단</text> <!-- 흐름 화살표 1 --> <line x1=\"234\" y1=\"112\" x2=\"250\" y2=\"112\" stroke=\"#91a0bf\" stroke-width=\"2\"/> <polygon points=\"249,106 260,112 249,118\" fill=\"#91a0bf\"/> <!-- ================= 2단계 : 다이 부착 + 와이어 본딩 ================= --> <text x=\"360\" y=\"22\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#52e5d2\">② 다이 부착·본딩</text> <rect x=\"276\" y=\"128\" width=\"38\" height=\"10\" fill=\"#b9c6da\"/> <rect x=\"320\" y=\"128\" width=\"80\" height=\"10\" fill=\"#b9c6da\"/> <rect x=\"406\" y=\"128\" width=\"38\" height=\"10\" fill=\"#b9c6da\"/> <text x=\"360\" y=\"154\" text-anchor=\"middle\" font-size=\"15\" fill=\"#c8d4e8\">리드 프레임</text> <g class=\"drop\"> <rect x=\"340\" y=\"108\" width=\"40\" height=\"20\" fill=\"#4a6488\" stroke=\"#7f9ac4\" stroke-width=\"1\"/> <rect x=\"345\" y=\"105\" width=\"9\" height=\"3\" fill=\"#ffd166\"/> <rect x=\"366\" y=\"105\" width=\"9\" height=\"3\" fill=\"#ffd166\"/> <text x=\"360\" y=\"122\" text-anchor=\"middle\" font-size=\"15\" fill=\"#edf3ff\">다이</text> </g> <path class=\"wire wA\" d=\"M349.5 105 Q320 78 296 128\" pathLength=\"100\" fill=\"none\" stroke=\"#ffd166\" stroke-width=\"2.4\" stroke-linecap=\"round\"/> <path class=\"wire wB\" d=\"M370.5 105 Q400 78 425 128\" pathLength=\"100\" fill=\"none\" stroke=\"#ffd166\" stroke-width=\"2.4\" stroke-linecap=\"round\"/> <text class=\"wireLb\" x=\"360\" y=\"84\" text-anchor=\"middle\" font-size=\"15\" fill=\"#ffd166\">금선 연결</text> <text x=\"360\" y=\"196\" text-anchor=\"middle\" font-size=\"13\" fill=\"#91a0bf\">다이 부착 → 와이어 본딩</text> <!-- 흐름 화살표 2 --> <line x1=\"446\" y1=\"112\" x2=\"460\" y2=\"112\" stroke=\"#91a0bf\" stroke-width=\"2\"/> <polygon points=\"459,106 469,112 459,118\" fill=\"#91a0bf\"/> <!-- ================= 3단계 : 몰딩 · 완성 ================= --> <text x=\"551\" y=\"22\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#52e5d2\">③ 몰딩·완성</text> <text class=\"moldLb\" x=\"551\" y=\"88\" text-anchor=\"middle\" font-size=\"15\" fill=\"#c8d4e8\">수지 몰딩(에폭시)</text> <rect x=\"470\" y=\"130\" width=\"46\" height=\"8\" fill=\"#b9c6da\"/> <rect x=\"586\" y=\"130\" width=\"46\" height=\"8\" fill=\"#b9c6da\"/> <rect x=\"522\" y=\"128\" width=\"58\" height=\"4\" fill=\"#b9c6da\"/> <rect x=\"528\" y=\"108\" width=\"46\" height=\"20\" fill=\"#4a6488\" stroke=\"#7f9ac4\" stroke-width=\"0.9\"/> <path d=\"M534 108 Q518 96 505 130\" fill=\"none\" stroke=\"#ffd166\" stroke-width=\"2\"/> <path d=\"M568 108 Q584 96 600 130\" fill=\"none\" stroke=\"#ffd166\" stroke-width=\"2\"/> <rect class=\"mold\" x=\"496\" y=\"98\" width=\"110\" height=\"42\" rx=\"5\" fill=\"#101b33\" stroke=\"#4a5f8c\" stroke-width=\"1.4\"/> <rect class=\"xray\" x=\"528\" y=\"108\" width=\"46\" height=\"20\" fill=\"none\" stroke=\"#52e5d2\" stroke-width=\"1.2\" stroke-dasharray=\"4 3\"/> <text class=\"xray\" x=\"551\" y=\"123\" text-anchor=\"middle\" font-size=\"13\" fill=\"#a9e9e0\">다이</text> <line x1=\"480\" y1=\"138\" x2=\"480\" y2=\"146\" stroke=\"#91a0bf\" stroke-width=\"1.4\"/> <text x=\"480\" y=\"160\" text-anchor=\"middle\" font-size=\"15\" fill=\"#c8d4e8\">리드</text> <text x=\"551\" y=\"196\" text-anchor=\"middle\" font-size=\"13\" fill=\"#91a0bf\">수지로 감싸 완성 칩</text> </svg>",caption:"웨이퍼를 잘라 낱개 칩으로 만들고 포장한다"},
 summary:"웨이퍼를 낱개 칩으로 자르고, 충격과 열에서 보호할 포장을 씌운다.",
 processIntro:"EDS에서 어느 칩이 양품인지까지 판정된 웨이퍼가 넘어와. 웨이퍼 한 장에는 똑같은 칩(다이, die)이 수백~수천 개 격자로 붙어 있는데, 패키징은 이걸 낱개로 떼어 내고 하나씩 포장해서 기판에 꽂을 수 있는 부품으로 만드는 공정이야. 순서는 백그라인딩 → 다이싱 → 다이 본딩 → 와이어 본딩 → 몰딩인데, 게임이 다루는 건 그중 다이싱(dicing) 하나뿐이야.",
 processDetail:[{label:"다이",text:"웨이퍼 위에 격자로 반복해 찍힌 칩 하나하나를 다이(die)라고 불러. 다이싱은 이 격자를 따라 웨이퍼를 쪼개서 다이를 낱개로 분리하는 작업이야."},{label:"스크라이브",text:"다이와 다이 사이에는 회로를 넣지 않고 비워 둔 통로가 있는데, 이걸 스크라이브 라인(scribe line)이라고 해. 자를 자리를 미리 확보해 둔 길이라, 여기를 벗어나 자르면 회로가 끊겨 그 칩은 못 쓰게 돼."},{label:"테이프",text:"자르는 동안 칩이 흩어지지 않도록 웨이퍼를 점착 테이프(dicing tape) 위에 붙이고 금속 프레임에 고정한 채로 작업해. 다 자른 뒤에도 칩들은 원래 배열 그대로 테이프에 붙어 있어."}],
 realWorld:"게임은 레이저로 그리지만, 실제로는 다이아몬드 블레이드를 분당 3만~6만 회전으로 돌려 톱질하듯 자르는 방식이 아직 주류고 레이저는 아주 얇은 웨이퍼에 주로 써. 스크라이브 라인 폭은 50~100µm로 머리카락(평균 약 70µm) 굵기 정도인데 그 안을 두께 20~40µm짜리 날이 지나가야 해서, 카메라로 라인을 읽어 자동 정렬한 뒤 자른다.",
 howTo:["노란 시작점을 누른 채 통로를 따라 끝까지 끌어.","다이에 닿거나 중간에 놓으면 그 줄은 처음부터.","세로 2줄, 가로 2줄."],
 goal:"절단선 4줄 완주",tip:"빠르게 긋지 말고 통로 한가운데를 천천히 따라가."}
};
let current=0,score=0,states=Array(8).fill(false),timer=null,quizTimer=null,quizPassed=Array(3).fill(false),quizFor=null;
const $=id=>document.getElementById(id);
// 화면 전환. 햄버거 버튼은 게임 화면에서만 쓸모가 있으니 같이 토글한다.
const show=id=>{['startScreen','gameScreen','quizScreen','finishScreen'].forEach(x=>$(x).classList.toggle('hidden',x!==id));$('navBtn').classList.toggle('hidden',id!=='gameScreen');closeNav()};
// 미니게임이 등록한 정리 함수. 스테이지를 떠날 때 인터벌·rAF·전역 리스너를 모두 되돌린다.
let cleanups=[];
function onCleanup(fn){cleanups.push(fn)}
function runCleanups(){const list=cleanups;cleanups=[];list.forEach(fn=>{try{fn()}catch(e){console.warn('cleanup 실패',e)}})}
function setupList(){
  $('stageList').innerHTML=stages.map((s,i)=>`<div class="stage-item ${i===current?'active ':''}${states[i]?'done':''}" onclick="goStage(${i})"><span class="stage-num">${states[i]?'✓':processVisuals[i][1][0]}</span><span>${s.name}</span></div>`).join('');
  // 모바일 햄버거 메뉴용 목록. 좁은 화면에서는 사이드바 대신 이쪽을 쓴다.
  $('navList').innerHTML=stages.map((s,i)=>`<button class="nav-item ${i===current?'nav-on ':''}${states[i]?'nav-done':''}" type="button" data-i="${i}"><span class="nav-num">${String(i+1).padStart(2,'0')}</span><span class="nav-name">${s.name}</span><span class="nav-state">${states[i]?'✓ 완료':i===current?'진행 중':''}</span></button>`).join('');
}
// ── 모바일 공정 이동 서랍 ──────────────────────────────────
let navOpen=false;
function openNav(){setupList();$('navDrawer').classList.remove('hidden');document.body.classList.add('brief-lock');$('navBtn').setAttribute('aria-expanded','true');navOpen=true;$('navClose').focus()}
function closeNav(){if(!navOpen)return;$('navDrawer').classList.add('hidden');if(!briefOpen)document.body.classList.remove('brief-lock');$('navBtn').setAttribute('aria-expanded','false');navOpen=false}
function updateHud(){ $('score').textContent=score;$('progressBar').style.width=(states.filter(Boolean).length/8*100)+'%';$('stageCount').textContent=`MISSION ${current+1} / 8`;setupList() }
function goStage(i){clearInterval(timer);current=i;show('gameScreen');render()}
function start(){clearInterval(timer);current=0;score=0;states=Array(8).fill(false);quizPassed=Array(3).fill(false);show('gameScreen');render()}
function render(){runCleanups();clearInterval(timer);const s=stages[current];updateHud();$('stageEyebrow').textContent=`${s.tag} · NEW MISSION`;$('stageTitle').textContent=s.name;$('stageNo').textContent=String(current+1).padStart(2,'0');$('stageDesc').textContent=s.desc;$('visualGuide').innerHTML=processVisuals[current].map((x,i)=>`<div class="visual-step ${i===1?'active':''}"><div class="visual-icon">${x[0]}</div><span class="visual-label">${x[1]}</span></div>${i<2?'<span class="visual-arrow">→</span>':''}`).join('');$('feedback').textContent='';$('nextBtn').classList.toggle('hidden',!states[current]);$('nextBtn').innerHTML=current===7?'결과 보기 <span>→</span>':'다음 공정 <span>→</span>';openBrief()}

// ── 공정 브리핑 팝업 ───────────────────────────────────────
// 게임은 브리핑을 닫고 "게임 시작"을 눌러야 인스턴스화된다.
// 설명을 읽는 동안 블록이 떨어지거나 타이머가 도는 일이 없다.
let briefOpen=false,briefFor=0,briefMode='game';
const briefHTML=b=>[
`<p class="brief-sum">${b.summary}</p>`,
`<details class="brief-more-box" id="briefDetails"><summary><span class="brief-caret">▸</span>공정 자세히 보기</summary><div class="brief-deep">`,
b.art?`<figure class="brief-art"><div class="dg-scroll">${b.art.svg}</div><figcaption>${b.art.caption}</figcaption></figure>`:'',
`<p class="brief-intro">${b.processIntro}</p>`,
`<div class="brief-grid">${b.processDetail.map(d=>`<div class="brief-cell"><b>${d.label}</b><span>${d.text}</span></div>`).join('')}</div>`,
`<div class="brief-real"><span class="brief-real-tag">실제 현장</span><p>${b.realWorld}</p></div>`,
`</div></details>`,
`<div class="brief-how"><h3>게임 방법</h3><ol>${b.howTo.map(x=>`<li>${x}</li>`).join('')}</ol></div>`,
`<div class="brief-goal"><p><b>목표</b> ${b.goal}</p><p class="brief-tip"><b>팁</b> ${b.tip}</p></div>`
].join('');
function idleGame(){const a=$('gameArea');a.innerHTML=`<div class="game-idle"><p>공정 설명을 읽고 미션을 시작해 봐.</p><button class="game-btn" id="idleStart" type="button">게임 시작</button></div>`;$('idleStart').onclick=startGame}
// mode 'game'  : 게임 화면에서. 미션을 정리하고 대기 상태로 둔 뒤 브리핑을 띄운다.
// mode 'info'  : 시작 화면 흐름도에서. 아무 공정이나 미리 읽어 보는 용도.
function openBrief(idx,mode){
  briefMode=mode==='info'?'info':'game';
  briefFor=typeof idx==='number'?idx:current;
  if(briefMode==='game'){runCleanups();idleGame()}
  const s=stages[briefFor],b=briefings[s.type];
  if(!b){if(briefMode==='game')startGame();return}
  $('briefNo').textContent=String(briefFor+1).padStart(2,'0');
  $('briefTag').textContent=`${s.tag} · 공정 브리핑`;
  $('briefTitle').textContent=b.title;
  $('briefBody').innerHTML=briefHTML(b);
  $('briefDetails').ontoggle=briefScroll; // 펼치면 본문 높이가 바뀐다
  $('briefBody').scrollTop=0;
  $('briefStart').innerHTML=briefMode==='info'?'이 공정부터 시작 <span>→</span>':'게임 시작 <span>→</span>';
  $('briefOverlay').classList.remove('hidden');
  document.body.classList.add('brief-lock');
  briefOpen=true;$('briefStart').focus();briefScroll();
}
// 브리핑의 시작 버튼. info 모드면 그 공정으로 이동한 뒤 바로 미션을 연다.
function briefAction(){if(briefMode==='info'){const i=briefFor;closeBrief();goStage(i)}startGame()}
// 본문에 읽을 내용이 더 남았으면 아래쪽에 페이드와 힌트를 띄운다.
function briefScroll(){const b=$('briefBody');$('briefCard').classList.toggle('brief-more',b.scrollHeight-b.scrollTop-b.clientHeight>8)}
function closeBrief(){if(!briefOpen)return;$('briefOverlay').classList.add('hidden');document.body.classList.remove('brief-lock');briefOpen=false}
function startGame(){closeBrief();runCleanups();const a=$('gameArea');a.innerHTML='';games[stages[current].type](a)}
document.addEventListener('keydown',e=>{
  if(!briefOpen)return;
  if(e.key==='Escape'){e.preventDefault();closeBrief();return}
  if(e.key!=='Tab')return;
  const f=Array.prototype.slice.call($('briefCard').querySelectorAll('button,summary')).filter(x=>!x.disabled);
  if(!f.length)return;
  const first=f[0],last=f[f.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
});
function complete(msg,points=100){if(states[current]){$('feedback').textContent='이미 클리어한 공정이야. 다른 공정도 도전해 봐!';return}states[current]=true;score+=points;updateHud();$('feedback').textContent=`${msg}  +${points}점`;$('nextBtn').classList.remove('hidden')}
const games={
slice(a){
a.innerHTML=`<div class="mission-box wf-box"><h3>잉곳 슬라이싱</h3><p class="mission-tip">단결정 실리콘 잉곳을 다이아몬드 톱날로 얇게 썰어 웨이퍼를 만들어. 목표 두께는 725µm. 톱날이 초록색 규격 구간 안에 들어온 순간 절단을 눌러. 5장을 규격대로 썰면 성공이야.</p><div class="wf-stats"><div class="wf-stat"><span>양품 웨이퍼</span><b id="wfDone">0 / 5</b></div><div class="wf-stat"><span>두께 오차</span><b id="wfErr">-- µm</b></div><div class="wf-stat"><span>불량</span><b id="wfBad">0</b></div></div><div class="wf-track" id="wfTrack"><div class="wf-ingot"></div><div class="wf-marks" id="wfMarks"></div><div class="wf-target" id="wfTarget"></div><div class="wf-blade" id="wfBlade"></div><span class="wf-label">◀ 실리콘 잉곳 (Si) ▶</span></div><div class="wf-wafers" id="wfWafers"></div><p class="wf-read" id="wfRead"></p><div class="controls"><button class="game-btn wf-cut" id="wfCut">절단! [Space]</button><button class="sort-btn wf-again" id="wfReset">처음부터</button></div></div>`;
const track=$('wfTrack'),blade=$('wfBlade'),target=$('wfTarget'),marks=$('wfMarks'),wafers=$('wfWafers'),read=$('wfRead'),errEl=$('wfErr'),badEl=$('wfBad'),doneEl=$('wfDone');
const NOM=725,UM=2,GOAL=5;
let pos=6,dir=1,cuts=0,bad=0,raf=0,last=0,lock=0,tL=30,tW=26,over=false;
const speed=()=>40+cuts*6;
const tol=()=>26-cuts*2.5;
const drawWafers=()=>{let h='';for(let i=0;i<GOAL;i++)h+='<span class="wf-chip'+(i<cuts?' wf-on':'')+'">'+(i<cuts?'◉':'')+'</span>';wafers.innerHTML=h};
const newTarget=()=>{tW=tol();const min=4,max=96-tW,gap=tW/2+10,all=[];for(let l=min;l<=max;l++)if(Math.abs(l+tW/2-pos)>=gap)all.push(l);const ahead=all.filter(l=>(l+tW/2-pos)*dir>0),pool=ahead.length?ahead:(all.length?all:[min]);tL=pool[Math.floor(Math.random()*pool.length)];target.style.left=tL+'%';target.style.width=tW+'%'};
const flash=c=>{track.classList.remove('wf-hit','wf-miss');void track.offsetWidth;track.classList.add(c)};
const mark=ok=>{const m=document.createElement('i');m.className='wf-mark'+(ok?' wf-ok':'');m.style.left=pos+'%';marks.append(m);while(marks.childElementCount>40)marks.removeChild(marks.firstChild)};
const cut=()=>{
  if(over)return;
  const now=performance.now();
  if(now<lock)return;
  const c=tL+tW/2,d=pos-c,um=Math.round(d*UM*10)/10,spec=Math.round(tW/2*UM*10)/10,ok=Math.abs(d)<=tW/2;
  errEl.textContent=(um>0?'+':'')+um.toFixed(1)+' µm';
  errEl.className=ok?'wf-good':'wf-badv';
  mark(ok);
  lock=now+430;
  if(ok){
    cuts++;flash('wf-hit');drawWafers();doneEl.textContent=cuts+' / '+GOAL;
    if(cuts>=GOAL){over=true;btn.disabled=true;btn.textContent='절단 완료';read.textContent='웨이퍼 '+GOAL+'장 완성! 잉곳 한 덩이가 거울처럼 매끈한 원판이 됐어.';complete('규격 두께로 웨이퍼를 썰어냈어! 실제 잉곳도 이렇게 725µm 안팎으로 얇게 잘라 낸대.',150);return}
    read.textContent='좋아! 두께 '+(NOM+um).toFixed(1)+'µm · 허용치 ±'+spec+'µm 안이야. 다음 컷은 톱날이 더 빨라지고 규격은 좁아져.';
    $('feedback').textContent='';
  }else{
    bad++;badEl.textContent=bad;flash('wf-miss');
    read.textContent='두께 오차 '+Math.abs(um).toFixed(1)+'µm · 허용치 ±'+spec+'µm 를 넘어서 이 장은 버렸어.';
    $('feedback').textContent=(d<0?'톱날이 규격보다 왼쪽에서 멈췄어.':'톱날이 규격을 지나쳐 오른쪽에서 멈췄어.')+' 초록 구간 안에서 눌러 봐!';
  }
  newTarget();
};
const loop=()=>{raf=requestAnimationFrame(loop);const t=performance.now();if(!last)last=t;let dt=(t-last)/1000;last=t;if(dt>0.12)dt=0.12;if(over||t<lock)return;pos+=dir*speed()*dt;if(pos>=96){pos=96;dir=-1}else if(pos<=4){pos=4;dir=1}blade.style.left=pos+'%'};
const reset=()=>{cuts=0;bad=0;over=false;pos=6;dir=1;last=0;lock=performance.now()+300;marks.innerHTML='';doneEl.textContent='0 / '+GOAL;badEl.textContent='0';errEl.textContent='-- µm';errEl.className='';track.classList.remove('wf-hit','wf-miss');blade.style.left=pos+'%';btn.disabled=false;btn.textContent='절단! [Space]';drawWafers();newTarget();read.textContent=states[current]?'이미 클리어한 공정이야. 연습 삼아 다시 썰어 봐.':'톱날이 초록 구간에 들어오면 절단! 스페이스바로도 자를 수 있어.';$('feedback').textContent=''};
const btn=$('wfCut'),rst=$('wfReset');
btn.onpointerdown=e=>{if(e.button>0)return;e.preventDefault();cut()};
btn.onclick=()=>cut();
rst.onclick=()=>{rst.blur();reset()};
const key=e=>{if(e.code!=='Space'&&e.key!==' '&&e.key!=='Spacebar')return;if(e.repeat||over)return;const t=e.target;if(t&&t!==btn&&(t.tagName==='BUTTON'||t.tagName==='A'||t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable))return;e.preventDefault();cut()};
document.addEventListener('keydown',key);
reset();
raf=requestAnimationFrame(loop);
onCleanup(()=>{cancelAnimationFrame(raf);document.removeEventListener('keydown',key)});
},
oxide(a){a.innerHTML=`<div class="mission-box ox-box"><h3>산화로 가스 밸런싱</h3><p class="mission-tip">고온 산화로에 산소(O₂)와 수증기(H₂O)를 흘려 웨이퍼 표면에 산화막을 키워. <b>두 가스가 동시에 노란 목표 구간 안에 있을 때만</b> 막이 자라. 노 안의 열이 흔들려서 목표가 조금씩 움직이니까 계속 따라가 봐.</p><div class="ox-grow"><div class="ox-furnace"><span class="ox-heat">O₂ + H₂O ♨ 1000°C</span><div class="ox-slot"><i class="ox-film" id="oxFilm"></i></div><div class="ox-wafer">Si 웨이퍼</div></div><div class="ox-meter"><div class="ox-meter-label">산화막 두께</div><div class="value"><span id="oxPct">0</span>%</div><div class="ox-bar"><i id="oxBar"></i></div><div class="ox-state" id="oxState">대기 중</div></div></div><div class="ox-gas" id="oxRowO"><div class="ox-gas-head"><span class="ox-name">산소 O₂</span><span class="ox-num">현재 <b id="oxCurO">50</b> · 목표 <b class="ox-t" id="oxTgtO">50</b></span></div><div class="ox-track"><i class="ox-zone" id="oxZoneO"></i><i class="ox-mark" id="oxMarkO"></i></div><div class="ox-ctrl"><button class="ox-btn" data-g="o" data-d="-1">산소 −</button><span class="ox-delta" id="oxDeltaO">Δ 0</span><button class="ox-btn" data-g="o" data-d="1">산소 +</button></div></div><div class="ox-gas" id="oxRowV"><div class="ox-gas-head"><span class="ox-name ox-vap">수증기 H₂O</span><span class="ox-num">현재 <b id="oxCurV">50</b> · 목표 <b class="ox-t" id="oxTgtV">50</b></span></div><div class="ox-track"><i class="ox-zone" id="oxZoneV"></i><i class="ox-mark" id="oxMarkV"></i></div><div class="ox-ctrl"><button class="ox-btn" data-g="v" data-d="-1">수증기 −</button><span class="ox-delta" id="oxDeltaV">Δ 0</span><button class="ox-btn" data-g="v" data-d="1">수증기 +</button></div></div><div class="ox-foot"><button class="sort-btn ox-reset" id="oxReset">산화로 초기화</button></div><p class="ox-key">버튼을 꾹 누르면 연속으로 조절돼 · 키보드로도 가능해 (← → 산소, ↑ ↓ 수증기)</p></div>`;
const TOL=5,STEP=2,TICK=100,GROW=.8,DECAY=.45,DRIFT=1400;
let cO=50,cV=50,tO=50,tV=50,thick=0,done=false,acc=0,loop=null,holdT=null,holdI=null;
const el={film:$('oxFilm'),bar:$('oxBar'),pct:$('oxPct'),st:$('oxState'),rowO:$('oxRowO'),curO:$('oxCurO'),tgtO:$('oxTgtO'),zoneO:$('oxZoneO'),markO:$('oxMarkO'),dO:$('oxDeltaO'),rowV:$('oxRowV'),curV:$('oxCurV'),tgtV:$('oxTgtV'),zoneV:$('oxZoneV'),markV:$('oxMarkV'),dV:$('oxDeltaV')};
const paint=()=>{const gO=tO-cO,gV=tV-cV,okO=Math.abs(gO)<=TOL,okV=Math.abs(gV)<=TOL;
el.curO.textContent=cO;el.tgtO.textContent=tO;el.curV.textContent=cV;el.tgtV.textContent=tV;
el.markO.style.left=cO+'%';el.markV.style.left=cV+'%';
el.zoneO.style.left=(tO-TOL)+'%';el.zoneO.style.width=(TOL*2)+'%';
el.zoneV.style.left=(tV-TOL)+'%';el.zoneV.style.width=(TOL*2)+'%';
el.dO.textContent=okO?'범위 안':'Δ '+(gO>0?'+':'')+gO;el.dV.textContent=okV?'범위 안':'Δ '+(gV>0?'+':'')+gV;
el.dO.className='ox-delta'+(okO?' ox-ok':'');el.dV.className='ox-delta'+(okV?' ox-ok':'');
el.rowO.className='ox-gas'+(okO?' ox-ok':'');el.rowV.className='ox-gas'+(okV?' ox-ok':'');
el.pct.textContent=Math.floor(thick);el.bar.style.width=thick+'%';el.film.style.height=thick+'%';
if(done){el.st.textContent='두께 100% · 균일한 산화막 완성!';el.st.className='ox-state ox-on';return}
if(okO&&okV){el.st.textContent='성장 중 ▲ 두 가스 모두 정상'}else if(okO||okV){el.st.textContent='성장 정지 — 아직 한쪽만 맞았어'}else{el.st.textContent='성장 정지 — 두 가스 다 벗어났어'}
el.st.className='ox-state '+(okO&&okV?'ox-on':'ox-off')};
const wander=()=>{const s=(Math.random()<.5?-1:1)*(Math.random()<.55?2:4);if(Math.random()<.5){tO=Math.max(24,Math.min(76,tO+s))}else{tV=Math.max(24,Math.min(76,tV+s))}};
const step=()=>{if(done)return;acc+=TICK;if(acc>=DRIFT){acc=0;wander()}
const okO=Math.abs(tO-cO)<=TOL,okV=Math.abs(tV-cV)<=TOL;
if(okO&&okV){thick=Math.min(100,thick+GROW)}else{thick=Math.max(0,thick-DECAY)}
if(thick>=100){thick=100;done=true;clearInterval(loop);loop=null;stopHold();paint();complete('산소와 수증기를 동시에 맞춰 균일한 산화막을 키웠어!',150);return}paint()};
const adjust=(g,d)=>{if(done)return;if(g==='o'){cO=Math.max(0,Math.min(100,cO+d*STEP))}else{cV=Math.max(0,Math.min(100,cV+d*STEP))}paint()};
const stopHold=()=>{if(holdT){clearTimeout(holdT);holdT=null}if(holdI){clearInterval(holdI);holdI=null}};
a.querySelectorAll('.ox-btn').forEach(b=>{const g=b.dataset.g,d=Number(b.dataset.d);
b.onpointerdown=e=>{if(e.button>0)return;e.preventDefault();stopHold();adjust(g,d);try{b.setPointerCapture(e.pointerId)}catch(err){}holdT=setTimeout(()=>{holdT=null;holdI=setInterval(()=>adjust(g,d),130)},400)};
b.onpointerup=stopHold;b.onpointercancel=stopHold;b.onlostpointercapture=stopHold});
const endHold=()=>stopHold();
window.addEventListener('pointerup',endHold);window.addEventListener('pointercancel',endHold);window.addEventListener('blur',endHold);
const keys=e=>{if(done)return;const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable))return;const k=e.key;if(k==='ArrowLeft'){adjust('o',-1)}else if(k==='ArrowRight'){adjust('o',1)}else if(k==='ArrowDown'){adjust('v',-1)}else if(k==='ArrowUp'){adjust('v',1)}else{return}e.preventDefault()};
document.addEventListener('keydown',keys);
const reset=()=>{stopHold();done=false;thick=0;acc=0;cO=50;cV=50;const r=()=>{const off=8+2*Math.floor(Math.random()*7);return 50+(Math.random()<.5?-off:off)};tO=r();tV=r();$('feedback').textContent='';paint();if(!loop){loop=setInterval(step,TICK)}};
$('oxReset').onclick=()=>reset();
onCleanup(()=>{if(loop){clearInterval(loop)}loop=null;stopHold();document.removeEventListener('keydown',keys);window.removeEventListener('pointerup',endHold);window.removeEventListener('pointercancel',endHold);window.removeEventListener('blur',endHold)});
reset()},
photo(a){
a.innerHTML=`<div class="mission-box ph-box">
<h3>스핀 코팅 · 감광액 도포</h3>
<p class="mission-tip">회전 버튼을 연타해서 웨이퍼 RPM을 <b>초록 구간</b>까지 올린 뒤, PR 스포이드를 끌어다 웨이퍼 <b>정중앙</b>에서 손을 떼. 원심력이 감광액을 얇고 고르게 펴 발라 줘. 너무 느리면 가운데 뭉치고, 너무 빠르면 밖으로 날아가!</p>
<div class="ph-stage" id="phStage">
<div class="ph-wafer" id="phWafer"><div class="ph-coat" id="phCoat"></div><div class="ph-spoke"></div><div class="ph-spoke ph-s2"></div><div class="ph-bull"></div><div class="ph-notch"></div></div>
<div class="ph-splash" id="phSplash"></div>
<div class="ph-dropper" id="phDropper"><span>PR</span><i></i></div>
<div class="ph-hint" id="phHint">스포이드를 끌어서 중앙에서 손을 떼</div>
</div>
<div class="ph-gauge"><div class="ph-fill" id="phFill"></div><div class="ph-band"></div></div>
<div class="ph-scale"><span>0 RPM</span><span class="ph-ok">적정 2200~3400</span><span>4200</span></div>
<div class="ph-meters"><div class="ph-meter"><small>회전 속도</small><b id="phRpm">0</b></div><div class="ph-meter"><small>도포 균일도</small><b class="ph-uni" id="phUni">0%</b></div></div>
<div class="controls"><button class="game-btn ph-spin" id="phSpinBtn" type="button">회전 ↻ 연타</button><button class="sort-btn ph-reset" id="phResetBtn" type="button">새 웨이퍼(리셋)</button></div>
</div>`;
const LO=2200,HI=3400,MAX=4200;
const stage=$('phStage'),wafer=$('phWafer'),coat=$('phCoat'),dropper=$('phDropper'),fill=$('phFill'),rpmOut=$('phRpm'),uniOut=$('phUni'),hint=$('phHint'),fx=$('phSplash'),spin=$('phSpinBtn');
const IDLE='스포이드를 끌어서 중앙에서 손을 떼';
let rpm=0,ang=0,uni=0,drag=false,lift=0,tipX=0,tipY=0,raf=0,lastT=performance.now(),cleared=false;
const home=()=>{dropper.style.left='10px';dropper.style.top='4px'};
const paint=()=>{uniOut.textContent=uni+'%';coat.style.opacity=(0.2+uni/100*0.75).toFixed(2);coat.style.transform='scale('+(0.32+uni/100*0.68).toFixed(3)+')'};
const geo=()=>{const s=stage.getBoundingClientRect();return{sx:s.left+stage.clientLeft,sy:s.top+stage.clientTop,sw:stage.clientWidth,sh:stage.clientHeight,cx:wafer.offsetLeft+wafer.offsetWidth/2,cy:wafer.offsetTop+wafer.offsetHeight/2,R:wafer.offsetWidth/2}};
const burst=(x,y,ok)=>{fx.style.left=x+'px';fx.style.top=y+'px';fx.className='ph-splash';void fx.offsetWidth;fx.className='ph-splash '+(ok?'ph-fx-good':'ph-fx-bad')};
const aim=()=>{const g=geo(),t=Math.hypot(tipX-g.cx,tipY-g.cy)/g.R,ok=rpm>=LO&&rpm<=HI;
let msg;
if(t>1)msg='웨이퍼 밖이야. 회전판 위로 가져와';
else if(t>0.3)msg='조금 더 중앙으로 · 지금 '+Math.round(rpm)+' RPM';
else if(ok)msg='정중앙 · 적정 RPM · 지금 손을 떼!';
else msg=rpm<LO?'중앙은 맞는데 회전이 너무 느려 · 더 연타해':'중앙은 맞는데 회전이 너무 빨라 · 잠깐 기다려';
hint.textContent=msg;hint.classList.toggle('ph-hot',t<=0.3&&ok)};
const release=()=>{const g=geo(),t=Math.hypot(tipX-g.cx,tipY-g.cy)/g.R;
if(t>1.05){$('feedback').textContent='웨이퍼 밖에 떨어뜨렸어. 회전판 위로 가져와야 PR이 묻어.';return}
if(rpm<300){burst(tipX,tipY,false);$('feedback').textContent='웨이퍼가 멈춰 있어! 회전 버튼을 연타해서 RPM부터 올려.';return}
let rf=1;
if(rpm<LO||rpm>HI){const dv=rpm<LO?LO-rpm:rpm-HI;rf=Math.max(-0.7,1-dv/900)}
const pf=t<=0.3?1:Math.max(-0.5,1-(t-0.3)/0.7*1.25);
const gain=Math.round(25*rf*pf);
uni=Math.max(0,Math.min(100,uni+gain));paint();burst(tipX,tipY,gain>0);
if(gain<=0){$('feedback').textContent=rpm<LO?'RPM이 낮아서 감광액이 가운데 뭉쳐 버렸어. 더 빠르게 연타하고 떨어뜨려!':rpm>HI?'너무 빨라! 원심력에 감광액이 다 날아갔어. 연타를 멈추고 RPM이 초록 구간까지 내려오길 기다려.':'중앙에서 너무 벗어났어. 원심력은 중심에서 바깥으로 퍼지니까 정중앙을 노려.';return}
if(uni>=100){cleared=true;hint.textContent='코팅 완료 · PR 막이 완벽하게 균일해';hint.classList.remove('ph-hot');complete('감광액을 얇고 균일하게 도포했어! 이제 마스크를 올려 노광할 준비 끝!',150);return}
if(gain>=25)$('feedback').textContent='완벽해! 원심력이 PR을 고르게 폈어. 균일도 +'+gain+'%';
else{const why=rpm<LO?'RPM이 살짝 낮아서 조금 뭉쳤어':rpm>HI?'RPM이 살짝 높아서 조금 날아갔어':'중앙에서 살짝 치우쳤어';$('feedback').textContent=why+'. 균일도 +'+gain+'%'}};
const place=e=>{const g=geo();let px=e.clientX-g.sx,py=e.clientY-g.sy-lift;
const hw=dropper.offsetWidth/2+2;px=Math.max(hw,Math.min(g.sw-hw,px));py=Math.max(dropper.offsetHeight+4,Math.min(g.sh-4,py));
tipX=px;tipY=py;dropper.style.left=(px-dropper.offsetWidth/2)+'px';dropper.style.top=(py-dropper.offsetHeight)+'px';aim()};
const clearDrag=e=>{drag=false;dropper.classList.remove('ph-hold');hint.classList.remove('ph-hot');if(e&&e.pointerId!==undefined){try{dropper.releasePointerCapture(e.pointerId)}catch(err){}}};
const endDrag=e=>{if(!drag)return;clearDrag(e);release();home();if(!cleared)hint.textContent=IDLE};
const abortDrag=e=>{if(!drag)return;clearDrag(e);home();if(!cleared)hint.textContent=IDLE};
dropper.onpointerdown=e=>{if(cleared)return;e.preventDefault();drag=true;lift=e.pointerType==='touch'?28:0;dropper.classList.add('ph-hold');try{dropper.setPointerCapture(e.pointerId)}catch(err){}place(e)};
dropper.onpointermove=e=>{if(drag)place(e)};
dropper.onpointerup=endDrag;
dropper.onpointercancel=abortDrag;
window.addEventListener('pointerup',endDrag);
window.addEventListener('pointercancel',abortDrag);
window.addEventListener('blur',abortDrag);
const tick=()=>{rpm=Math.min(MAX,rpm+330)};
spin.onpointerdown=()=>{tick()};
spin.onkeydown=e=>{if(e.key===' '||e.key==='Enter'||e.code==='Space'){e.preventDefault();tick()}};
$('phResetBtn').onclick=()=>{rpm=0;uni=0;cleared=false;clearDrag();paint();home();hint.textContent=IDLE;$('feedback').textContent='새 웨이퍼를 척에 올렸어. 회전부터 다시!'};
const loop=t=>{const dt=Math.min(0.06,(t-lastT)/1000);lastT=t;
if(rpm>0)rpm=Math.max(0,rpm-(170+rpm*rpm*0.000022)*dt);
ang=(ang+rpm*0.6*dt)%360;
wafer.style.transform='rotate('+ang.toFixed(1)+'deg)';
fill.style.width=(rpm/MAX*100).toFixed(1)+'%';
rpmOut.textContent=Math.round(rpm);
const ok=rpm>=LO&&rpm<=HI;
fill.classList.toggle('ph-in',ok);
stage.classList.toggle('ph-lock',ok);
stage.classList.toggle('ph-fast',rpm>HI);
if(drag)aim();
raf=requestAnimationFrame(loop)};
home();paint();raf=requestAnimationFrame(loop);
onCleanup(()=>{cancelAnimationFrame(raf);window.removeEventListener('pointerup',endDrag);window.removeEventListener('pointercancel',abortDrag);window.removeEventListener('blur',abortDrag)});
},
etch(a){a.innerHTML=`<div class="mission-box et-box"><h3>식각 용액 담금 타이밍</h3><p class="mission-tip">용액에 담근 시간이 곧 식각 깊이야. 버튼을 <b class="et-hl">꾹 누르고 있으면</b> 웨이퍼가 에천트 속으로 내려가면서 깊이가 깊어져. 초록색 목표 구간에 들어왔을 때 손을 떼! 3번 성공하면 클리어야.</p><div class="et-stage"><div class="et-tank" id="etTank"><div class="et-surface"></div><span class="et-bub et-b1"></span><span class="et-bub et-b2"></span><span class="et-bub et-b3"></span><span class="et-bub et-b4"></span><div class="et-wafer" id="etWafer"></div><div class="et-tank-tag">ETCHANT 용액</div></div><div class="et-gauge" id="etGauge"><div class="et-fill" id="etFill"></div><div class="et-band" id="etBand"></div><div class="et-mark et-hide" id="etMark"></div><span class="et-cap">깊이</span></div></div><div class="et-meta"><span>현재 깊이 <b id="etDepth">0%</b></span><span>목표 구간 <b class="et-goal" id="etTarget">--</b></span></div><div class="et-dots" id="etDots"></div><button class="game-btn et-hold" id="etHold" type="button">꾹 눌러서 담그기</button><div class="controls"><button class="sort-btn" id="etReset" type="button">처음부터 다시</button></div><p class="mission-tip et-log" id="etLog">버튼을 꾹 눌러 웨이퍼를 담가 봐.</p></div>`;
const tank=$('etTank'),wafer=$('etWafer'),fill=$('etFill'),band=$('etBand'),mark=$('etMark'),depthOut=$('etDepth'),targetOut=$('etTarget'),log=$('etLog'),hold=$('etHold'),dots=$('etDots');
const RATE=40,HALF=10,NEED=3;
let depth=0,lo=30,hi=48,holding=false,raf=null,last=0,wins=0,lastC=-99,lastMark=-1,done=!!states[current];
const roll=()=>{let c=0,n=0;do{c=38+Math.random()*40;n++}while(Math.abs(c-lastC)<11&&n<12);lastC=c;lo=Math.round(c-HALF);hi=Math.round(c+HALF)};
const drawDots=()=>{let h='';for(let i=0;i<NEED;i++)h+=`<span class="et-dot${i<wins?' et-on':''}"></span>`;dots.innerHTML=h};
const draw=()=>{const d=Math.max(0,Math.min(100,depth)),dr=Math.round(d);fill.style.height=d+'%';const travel=Math.max(0,tank.clientHeight-wafer.offsetHeight-24);wafer.style.transform='translateY('+(travel*d/100).toFixed(1)+'px)';band.style.bottom=lo+'%';band.style.height=(hi-lo)+'%';band.classList.toggle('et-hot',holding&&dr>=lo&&dr<=hi);depthOut.textContent=dr+'%';targetOut.textContent=lo+'% ~ '+hi+'%';if(lastMark<0)mark.classList.add('et-hide');else{mark.classList.remove('et-hide');mark.style.bottom=Math.max(0,Math.min(98,lastMark))+'%'}};
const stopLoop=()=>{holding=false;if(raf){cancelAnimationFrame(raf);raf=null}last=0;tank.classList.remove('et-run');hold.classList.remove('et-on');hold.textContent='꾹 눌러서 담그기'};
const release=()=>{if(!holding)return;const d=Math.round(Math.min(100,depth));stopLoop();lastMark=d;if(d<lo){log.textContent=`Under-etch! ${d}% 에서 뺐어. 목표는 ${lo}~${hi}% 였는데 덜 깎여서 막이 그대로 남았어. 조금 더 오래 담가 봐.`;$('feedback').textContent='언더 에칭이야. 용액에 좀 더 담가야 해.'}else if(d>hi){log.textContent=`Over-etch! ${d}% 까지 갔어. 목표 ${lo}~${hi}% 를 지나쳐서 필요한 회로 선까지 녹아 버렸어. 더 빨리 건져 올려.`;$('feedback').textContent='오버 에칭이야. 조금만 더 빨리 떼 봐!'}else{wins++;drawDots();if(wins>=NEED){log.textContent=`${d}% — 목표 ${lo}~${hi}% 안에서 정확히 멈췄어. ${NEED}번 다 성공!`;if(!done){done=true;complete('필요한 깊이만큼만 정확히 식각했어! 회로 손상 없음!',125)}else $('feedback').textContent='또 성공! 이미 클리어한 공정이야.'}else{log.textContent=`성공! ${d}% 로 목표 ${lo}~${hi}% 안에서 건져 올렸어. ${NEED-wins}번 더!`;$('feedback').textContent=`좋아! ${wins} / ${NEED} 성공.`}}depth=0;roll();draw()};
const startDip=()=>{if(holding)return;holding=true;last=0;depth=0;lastMark=-1;tank.classList.add('et-run');hold.classList.add('et-on');hold.textContent='지금 떼! (손 떼면 건져 올림)';draw();raf=requestAnimationFrame(tick)};
function tick(t){if(!holding){raf=null;return}if(!last)last=t;const dt=Math.min(60,t-last);last=t;depth+=RATE*dt/1000;if(depth>=100){depth=100;draw();release();return}draw();raf=requestAnimationFrame(tick)}
const reset=()=>{stopLoop();wins=0;depth=0;lastMark=-1;roll();drawDots();draw();log.textContent='버튼을 꾹 눌러 웨이퍼를 담그고, 초록 구간에서 손을 떼 봐.';$('feedback').textContent=''};
[hold,tank].forEach(el=>{el.addEventListener('pointerdown',e=>{if(el===tank||e.pointerType!=='mouse')e.preventDefault();try{el.setPointerCapture(e.pointerId)}catch(err){}startDip()});el.addEventListener('pointerup',release);el.addEventListener('pointercancel',release);el.addEventListener('lostpointercapture',release)});
hold.addEventListener('keydown',e=>{if(e.repeat)return;if(e.key===' '||e.key==='Enter'||e.code==='Space'){e.preventDefault();startDip()}});
hold.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter'||e.code==='Space'){e.preventDefault();release()}});
hold.addEventListener('blur',release);
$('etReset').addEventListener('click',reset);
const guard=()=>release();
window.addEventListener('pointerup',guard);
window.addEventListener('pointercancel',guard);
window.addEventListener('blur',guard);
onCleanup(()=>{stopLoop();window.removeEventListener('pointerup',guard);window.removeEventListener('pointercancel',guard);window.removeEventListener('blur',guard)});
roll();drawDots();draw();
if(done)log.textContent='이미 클리어한 공정이야. 감을 다시 잡고 싶으면 얼마든지 더 담가 봐.';},
deposit(a){
  const COLS=6,ROWS=7,GOAL=3,SPEED=520;
  a.innerHTML=`<div class="mission-box dp-box">
<h3>박막 3층 쌓기</h3>
<p class="mission-tip">원자가 하나씩 내려와. 좌우로 옮겨서 <b>맨 아래 3층</b>을 빈칸 없이 채우면 성공이야. 아래층이 덜 찼는데 그 위에 쌓으면 남은 칸은 Void(공극)가 돼. 노란 입자는 박막에 박히는 주입 이온이야.</p>
<div class="dp-stats">
<div class="dp-stat"><span>완성 층</span><b id="dpLayers">0 / 3</b></div>
<div class="dp-stat"><span>Void</span><b id="dpVoid">0</b></div>
<div class="dp-stat"><span>주입 이온</span><b id="dpIon">0</b></div>
</div>
<div class="dp-source">원자 소스 ↓ ↓ ↓</div>
<div class="dp-board" id="dpBoard"></div>
<div class="controls dp-pad">
<button class="game-btn dp-key" id="dpLeft">◀ 왼쪽</button>
<button class="game-btn dp-key dp-drop" id="dpDrop">⤓ 바로 증착</button>
<button class="game-btn dp-key" id="dpRight">오른쪽 ▶</button>
</div>
<div class="controls"><button class="sort-btn" id="dpReset">처음부터 다시 쌓기</button></div>
<p class="mission-tip dp-hint">A / D (← →) 이동 · S (↓) 또는 스페이스 즉시 낙하 · 보드의 세로줄을 눌러도 그 자리에 쌓여.</p>
</div>`;
  const board=$('dpBoard'),layEl=$('dpLayers'),voidEl=$('dpVoid'),ionEl=$('dpIon'),cells=[];
  for(let r=0;r<ROWS;r++){for(let c=0;c<COLS;c++){const d=document.createElement('div');d.className='dp-cell';d.dataset.c=c;board.appendChild(d);cells.push(d)}}
  let grid=[],fx=0,fy=0,ftype=1,seq=0,ions=0,voids=0,falling=false,done=false,tickId=null;
  const sym=t=>t===2?'◈':'◆';
  const stopTick=()=>{if(tickId){clearInterval(tickId);tickId=null}};
  const rowFull=r=>{for(let c=0;c<COLS;c++)if(!grid[r][c])return false;return true};
  const draw=()=>{
    let front=ROWS;
    for(let r=0;r<ROWS&&front===ROWS;r++){for(let c=0;c<COLS;c++){if(grid[r][c]){front=r;break}}}
    let layers=0,stopped=false;
    for(let r=ROWS-1;r>=0;r--){if(!stopped){if(rowFull(r))layers++;else stopped=true}}
    voids=0;
    for(let r=0;r<ROWS;r++){
      const full=rowFull(r),inGoal=r>=ROWS-GOAL;
      for(let c=0;c<COLS;c++){
        const v=grid[r][c],el=cells[r*COLS+c],live=falling&&!done&&r===fy&&c===fx,hole=!v&&!live&&r>front&&inGoal;
        let cls='dp-cell';
        if(inGoal)cls+=' dp-target';
        if(v===1)cls+=' dp-atom';else if(v===2)cls+=' dp-ion';
        if(hole){cls+=' dp-void';voids++}
        if(full&&inGoal)cls+=' dp-full';
        if(live)cls+=ftype===2?' dp-fall dp-fall-ion':' dp-fall';
        el.className=cls;
        el.textContent=live?sym(ftype):(v?sym(v):(hole?'·':''));
      }
    }
    layEl.textContent=Math.min(layers,GOAL)+' / '+GOAL;
    voidEl.textContent=voids;
    voidEl.className=voids>0?'dp-voidnum':'';
    ionEl.textContent=ions;
  };
  const spawn=()=>{
    const open=[];
    for(let c=0;c<COLS;c++)if(!grid[0][c])open.push(c);
    if(!open.length){falling=false;stopTick();draw();$('feedback').textContent='더 쌓을 자리가 없어. 처음부터 다시 쌓기를 눌러 봐.';return}
    fx=open[Math.floor(Math.random()*open.length)];fy=0;ftype=seq%4===3?2:1;seq++;falling=true;draw();
  };
  const lock=()=>{
    grid[fy][fx]=ftype;
    if(ftype===2)ions++;
    falling=false;draw();
    let ok=true;
    for(let r=ROWS-1;r>=ROWS-GOAL;r--)if(!rowFull(r))ok=false;
    if(ok){
      done=true;stopTick();draw();
      if(states[current])$('feedback').textContent='다시 한 번 빈틈 없는 박막 3층을 완성했어!';
      else complete('빈틈 없는 박막 3층을 완성했어! 균일한 증착에 이온까지 잘 심었어.',150);
      return;
    }
    $('feedback').textContent=voids>0?'Void(공극)가 '+voids+'칸 남았어. 비어 있는 세로줄부터 채워 봐.':'';
    spawn();
    if(tickId){clearInterval(tickId);tickId=setInterval(tick,SPEED)}
  };
  const tick=()=>{
    if(done||!falling)return;
    if(fy+1<ROWS&&!grid[fy+1][fx]){fy++;draw()}else lock();
  };
  const drop=()=>{
    if(done||!falling)return;
    while(fy+1<ROWS&&!grid[fy+1][fx])fy++;
    lock();
  };
  const move=d=>{
    if(done||!falling)return;
    const n=fx+d;
    if(n<0||n>=COLS||grid[fy][n])return;
    fx=n;draw();
  };
  const reset=()=>{
    stopTick();grid=[];
    for(let r=0;r<ROWS;r++){const row=[];for(let c=0;c<COLS;c++)row.push(0);grid.push(row)}
    ions=0;voids=0;seq=0;done=false;falling=false;
    $('feedback').textContent=states[current]?'이미 완성한 공정이야. 연습 삼아 다시 쌓아 봐도 돼.':'';
    spawn();
    if(!tickId&&falling)tickId=setInterval(tick,SPEED);
  };
  const key=e=>{
    if(done)return;
    const c=e.code,k=e.key,tag=(e.target&&e.target.tagName)||'',space=c==='Space'||k===' ';
    if(space&&(tag==='BUTTON'||tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'))return;
    if(c==='ArrowLeft'||c==='KeyA'||k==='ArrowLeft'){move(-1);e.preventDefault()}
    else if(c==='ArrowRight'||c==='KeyD'||k==='ArrowRight'){move(1);e.preventDefault()}
    else if(c==='ArrowDown'||c==='KeyS'||k==='ArrowDown'||space){drop();e.preventDefault()}
  };
  const bind=(id,fn)=>{$(id).onpointerdown=e=>{if(e.button>0||e.isPrimary===false)return;e.preventDefault();fn()}};
  bind('dpLeft',()=>move(-1));bind('dpRight',()=>move(1));bind('dpDrop',drop);bind('dpReset',reset);
  board.onpointerdown=e=>{
    if(e.button>0||e.isPrimary===false)return;
    const t=e.target;
    if(!t||!t.dataset||t.dataset.c===undefined)return;
    e.preventDefault();
    if(done||!falling)return;
    const tc=Number(t.dataset.c);
    if(!Number.isFinite(tc)||tc<0||tc>=COLS)return;
    const d=tc>fx?1:-1;
    while(fx!==tc){const n=fx+d;if(n<0||n>=COLS||grid[fy][n])break;fx=n}
    drop();
  };
  document.addEventListener('keydown',key);
  onCleanup(()=>{stopTick();document.removeEventListener('keydown',key)});
  reset();
},
connect(a){
a.innerHTML=`<div class="mission-box mi-box">
<h3>금속 배선 잇기</h3>
<p class="mission-tip">타일을 누르면 배선이 90도씩 돌아가. 왼쪽 전원(⚡)에서 오른쪽 트랜지스터(TR)까지 금속선이 하나로 이어지면 전류가 흘러. 실제 칩도 이렇게 구리 배선을 깔아 소자끼리 연결하는 거야.</p>
<div class="mi-board" id="miBoard"></div>
<p class="mi-status" id="miStatus">전류 대기 중</p>
<div class="controls"><button class="sort-btn" id="miShuffle">배선 다시 깔기</button></div>
</div>`;
const N=1,E=2,S=4,W=8,DR=[-1,0,1,0],DC=[0,1,0,-1],ENDS=[[32,0],[64,32],[32,64],[0,32]],FILL=[5,3,7,3,5,7];
const board=$('miBoard'),readout=$('miStatus');
let tiles=[],path=[],pr=0,tr=0,turns=0,locked=false,cleared=false;
const bit=i=>1<<i;
const rotN=(m,n)=>{let x=m;for(let i=((n%4)+4)%4;i>0;i--)x=((x<<1)|(x>>3))&15;return x};
const cur=k=>rotN(tiles[k].base,tiles[k].rot);
const dirTo=(k1,k2)=>{const r1=k1>>2,c1=k1&3,r2=k2>>2,c2=k2&3;if(r2<r1)return N;if(c2>c1)return E;if(r2>r1)return S;return W};
const powered=()=>{const on=new Array(16).fill(false),s=pr*4;if(!(cur(s)&W))return on;on[s]=true;const q=[s];while(q.length){const k=q.pop(),r=k>>2,c=k&3,m=cur(k);for(let d=0;d<4;d++){if(!(m&bit(d)))continue;const nr=r+DR[d],nc=c+DC[d];if(nr<0||nr>3||nc<0||nc>3)continue;const nk=nr*4+nc;if(on[nk])continue;if(cur(nk)&bit((d+2)%4)){on[nk]=true;q.push(nk)}}}return on};
const isWin=()=>{const g=tr*4+3;return powered()[g]&&!!(cur(g)&E)};
const offCount=()=>{let n=0;for(let i=0;i<path.length;i++){const k=path[i];if(cur(k)!==tiles[k].base)n++}return n};
const makeBoard=()=>{
  pr=Math.floor(Math.random()*4);
  const cands=[];
  for(let r=0;r<4;r++){const d=Math.abs(r-pr);if(d===1||d===2)cands.push(r)}
  tr=cands[Math.floor(Math.random()*cands.length)];
  const seen=new Array(16).fill(false);
  path=[];
  const walk=(r,c)=>{
    const k=r*4+c;path.push(k);seen[k]=true;
    if(r===tr&&c===3)return true;
    if(path.length<8){
      const ord=[0,1,2,3];
      for(let i=3;i>0;i--){const j=Math.floor(Math.random()*(i+1)),t=ord[i];ord[i]=ord[j];ord[j]=t}
      for(let x=0;x<4;x++){const d=ord[x],nr=r+DR[d],nc=c+DC[d];if(nr<0||nr>3||nc<0||nc>3||seen[nr*4+nc])continue;if(walk(nr,nc))return true}
    }
    path.pop();seen[k]=false;return false;
  };
  if(!walk(pr,0)){path=[];for(let c=0;c<4;c++)path.push(pr*4+c);let rr=pr;while(rr!==tr){rr+=tr>pr?1:-1;path.push(rr*4+3)}}
  const sol=new Array(16).fill(0);
  for(let i=0;i<path.length;i++){const k=path[i];let m=i===0?W:dirTo(k,path[i-1]);m|=i===path.length-1?E:dirTo(k,path[i+1]);sol[k]=m}
  for(let i=0;i<path.length;i++){
    if(Math.random()>=.35)continue;
    const k=path[i],r=k>>2,c=k&3,opts=[];
    for(let d=0;d<4;d++){const nr=r+DR[d],nc=c+DC[d];if(nr<0||nr>3||nc<0||nc>3)continue;if(sol[nr*4+nc]||(sol[k]&bit(d)))continue;opts.push(d)}
    if(opts.length)sol[k]|=bit(opts[Math.floor(Math.random()*opts.length)]);
  }
  for(let k=0;k<16;k++)if(!sol[k])sol[k]=FILL[Math.floor(Math.random()*FILL.length)];
  tiles=sol.map(m=>({base:m,rot:0}));
  let guard=0;
  do{for(let k=0;k<16;k++)tiles[k].rot=Math.floor(Math.random()*4);guard++}while(guard<40&&(isWin()||offCount()<3));
};
const newPuzzle=()=>{
  let t=0;
  do{makeBoard();t++}while(isWin()&&t<20);
  const s=pr*4;
  for(let i=0;i<4&&isWin();i++)tiles[s].rot++;
  turns=0;locked=false;cleared=false;
};
const svgFor=m=>{let d='';for(let i=0;i<4;i++)if(m&bit(i))d+='M32 32L'+ENDS[i][0]+' '+ENDS[i][1];return '<svg class="mi-svg" viewBox="0 0 64 64" aria-hidden="true"><path class="mi-pipe" d="'+d+'"/><path class="mi-flow" d="'+d+'"/><circle class="mi-hub" cx="32" cy="32" r="5"/></svg>'};
const paint=()=>{
  const on=powered();let n=0;
  board.querySelectorAll('.mi-tile').forEach(el=>{const lit=on[+el.dataset.k];el.classList.toggle('mi-on',!!lit);if(lit)n++});
  const g=tr*4+3,won=!!on[g]&&!!(cur(g)&E);
  const src=board.querySelector('.mi-live'),dst=board.querySelector('.mi-goal');
  if(src)src.classList.toggle('mi-hot',!!on[pr*4]);
  if(dst)dst.classList.toggle('mi-hot',won);
  readout.classList.toggle('mi-done',won);
  if(won){
    locked=true;
    readout.textContent='POWER → TR 배선 완성! 전류가 흐른다.';
    if(!cleared){cleared=true;if(states[current])$('feedback').textContent='다시 한 번 배선을 완벽하게 이었어!';else complete('전원부터 트랜지스터까지 금속 배선을 이었어! 전류가 흐른다!',150)}
    return;
  }
  readout.innerHTML='전류가 닿은 배선 <b>'+n+'</b>칸 · 회전 <b>'+turns+'</b>번';
  if(turns>0)$('feedback').textContent=n===0?'전원과 맞닿은 왼쪽 첫 칸부터 왼쪽(⚡)이 열리게 돌려 봐.':'';
};
const spin=el=>{
  if(locked||!el||!el.dataset)return;
  const k=+el.dataset.k;
  if(!Number.isFinite(k)||k<0||k>15||!tiles[k])return;
  tiles[k].rot=(tiles[k].rot+1)%400;turns++;
  const rot=el.querySelector('.mi-rot');
  if(rot)rot.style.transform='rotate('+(tiles[k].rot*90)+'deg)';
  paint();
};
const tap=e=>{if(e.button>0||e.isPrimary===false)return;e.preventDefault();spin(e.currentTarget)};
const keyTap=e=>{if(e.key!=='Enter'&&e.key!==' ')return;e.preventDefault();spin(e.currentTarget)};
const drawBoard=()=>{
  let h='';
  for(let r=0;r<4;r++){
    h+='<div class="mi-port mi-src'+(r===pr?' mi-live':'')+'">'+(r===pr?'<b>⚡</b><i>POWER</i>':'')+'</div>';
    for(let c=0;c<4;c++){const k=r*4+c;h+='<button type="button" class="mi-tile" data-k="'+k+'" aria-label="배선 타일 회전"><span class="mi-rot" style="transform:rotate('+(tiles[k].rot*90)+'deg)">'+svgFor(tiles[k].base)+'</span></button>'}
    h+='<div class="mi-port mi-dst'+(r===tr?' mi-goal':'')+'">'+(r===tr?'<b>▣</b><i>TR</i>':'')+'</div>';
  }
  board.innerHTML=h;
  board.querySelectorAll('.mi-tile').forEach(el=>{el.addEventListener('pointerdown',tap);el.addEventListener('keydown',keyTap)});
  paint();
};
$('miShuffle').onclick=()=>{newPuzzle();drawBoard();$('feedback').textContent='새 배선을 깔았어. 다시 이어 봐!'};
newPuzzle();drawBoard();
},
eds(a){
  const N=8,TOTAL=30000,GOAL=12,MAXLIVE=2;
  const inside=[];
  let cellsHtml='';
  for(let r=0;r<N;r++){
    for(let c=0;c<N;c++){
      const dx=c-3.5,dy=r-3.5,ok=Math.sqrt(dx*dx+dy*dy)<=3.6;
      inside.push(ok);
      cellsHtml+=ok?`<button type="button" class="ed-die" aria-label="다이 ${r+1}행 ${c+1}열"></button>`:`<span class="ed-die ed-void"></span>`;
    }
  }
  a.innerHTML=`<div class="mission-box ed-box"><h3>EDS 프로브 검사</h3><p class="mission-tip">완성된 웨이퍼의 다이를 하나씩 전기 검사하는 중이야. 불량 신호 ✕ 가 켜진 다이를 꺼지기 전에 눌러서 잉크로 마킹해. ${TOTAL/1000}초 안에 ${GOAL}개를 마킹하면 통과야. 놓친 불량은 그대로 출하되니까 조심해!</p><div class="ed-hud"><div class="ed-stat"><span>남은 시간</span><b id="edTime">${TOTAL/1000}</b><em class="ed-sub">초</em></div><div class="ed-stat ed-stat-goal"><span>잉크 마킹</span><b id="edHit">0</b><em class="ed-sub">/${GOAL}</em></div><div class="ed-stat ed-stat-miss"><span>미검출</span><b id="edMiss">0</b><em class="ed-sub">개</em></div></div><div class="ed-track"><div class="ed-track-fill" id="edBar"></div></div><div class="ed-wafer"><div class="ed-grid" id="edGrid">${cellsHtml}</div></div><p class="ed-note" id="edNote">검사 시작을 누르면 프로브가 내려와. 준비됐어?</p><div class="controls"><button class="game-btn" id="edStart">검사 시작</button></div></div>`;
  const grid=$('edGrid'),tEl=$('edTime'),hEl=$('edHit'),mEl=$('edMiss'),bar=$('edBar'),note=$('edNote'),btn=$('edStart');
  if(!grid||!btn)return;
  const all=Array.prototype.slice.call(grid.children);
  const pool=[];
  for(let i=0;i<inside.length;i++){if(inside[i])pool.push(i)}
  let tick=null,elapsed=0,hits=0,miss=0,spawnAcc=0,playing=false,ended=false,live=[],flashes=[];
  const stopTick=function(){if(tick){clearInterval(tick);tick=null}};
  onCleanup(function(){stopTick()});
  const hud=function(){
    const left=Math.max(0,TOTAL-elapsed);
    tEl.textContent=Math.ceil(left/1000);
    hEl.textContent=hits;
    mEl.textContent=miss;
    bar.style.width=(left/TOTAL*100)+'%';
  };
  const flash=function(el,cls){
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
    flashes.push({el:el,cls:cls,until:elapsed+500});
  };
  const clearFlashes=function(){
    for(let k=0;k<flashes.length;k++)flashes[k].el.classList.remove(flashes[k].cls);
    flashes=[];
  };
  const stop=function(){
    stopTick();
    playing=false;
    live.forEach(function(o){all[o.i].classList.remove('ed-bad')});
    live=[];
  };
  const spawn=function(){
    const free=[];
    for(let k=0;k<pool.length;k++){
      const el=all[pool[k]];
      if(el.classList.contains('ed-ink')||el.classList.contains('ed-bad'))continue;
      free.push(pool[k]);
    }
    if(!free.length)return;
    const i=free[Math.floor(Math.random()*free.length)];
    const life=Math.max(780,1500-Math.floor(elapsed/5000)*120);
    all[i].classList.remove('ed-lost','ed-hit','ed-good');
    all[i].classList.add('ed-bad');
    live.push({i:i,until:elapsed+life});
  };
  const loop=function(){
    if(!playing){stopTick();return}
    elapsed+=100;
    const still=[];
    for(let k=0;k<live.length;k++){
      const o=live[k];
      if(elapsed>=o.until){
        all[o.i].classList.remove('ed-bad');
        all[o.i].classList.add('ed-lost');
        miss++;
      }else still.push(o);
    }
    live=still;
    const keep=[];
    for(let k=0;k<flashes.length;k++){
      const f=flashes[k];
      if(elapsed>=f.until)f.el.classList.remove(f.cls);else keep.push(f);
    }
    flashes=keep;
    spawnAcc+=100;
    const gap=Math.max(440,820-Math.floor(elapsed/6000)*80);
    if(spawnAcc>=gap&&live.length<MAXLIVE){spawnAcc=0;spawn()}
    hud();
    if(elapsed>=TOTAL){
      stop();
      ended=true;
      clearFlashes();
      hud();
      note.textContent=`검사 종료! 마킹 ${hits}개 · 미검출 ${miss}개 · 목표는 ${GOAL}개였어.`;
      $('feedback').textContent='시간 안에 목표를 못 채웠어. 다시 검사 버튼으로 재도전해 봐!';
      btn.textContent='다시 검사';
    }
  };
  const press=function(i){
    const el=all[i];
    if(!playing){note.textContent=ended?'검사가 끝났어. 아래 버튼을 눌러 다시 검사해 봐.':'아직 프로브가 안 내려왔어. 아래 검사 시작 버튼을 눌러 줘.';return}
    let found=-1;
    for(let k=0;k<live.length;k++){if(live[k].i===i)found=k}
    if(found<0){
      flash(el,'ed-good');
      note.textContent='여긴 정상 다이야. ✕ 신호가 켜진 다이만 마킹해!';
      return;
    }
    live.splice(found,1);
    el.classList.remove('ed-bad','ed-lost');
    el.classList.add('ed-ink');
    flash(el,'ed-hit');
    hits++;
    hud();
    note.textContent=`불량 다이 마킹 완료! ${hits} / ${GOAL}`;
    if(hits>=GOAL){
      stop();
      ended=true;
      note.textContent=`검사 완료! 불량 다이 ${GOAL}개를 걸러냈어. 미검출은 ${miss}개야.`;
      btn.textContent='다시 검사';
      complete('불량 다이를 잉크로 마킹해서 걸러냈어! 양품만 패키징으로 넘어가.',150);
    }
  };
  all.forEach(function(el,i){
    if(!inside[i])return;
    el.addEventListener('pointerdown',function(e){if(e.button>0)return;e.preventDefault();press(i)});
  });
  const reset=function(){
    stop();
    clearFlashes();
    elapsed=0;hits=0;miss=0;spawnAcc=0;ended=false;
    all.forEach(function(el){el.classList.remove('ed-bad','ed-ink','ed-lost','ed-hit','ed-good')});
    hud();
  };
  btn.onclick=function(){
    reset();
    playing=true;
    btn.textContent='처음부터 다시';
    note.textContent='검사 중! ✕ 가 뜬 다이를 바로 눌러.';
    $('feedback').textContent='';
    spawn();
    tick=setInterval(loop,100);
  };
  reset();
},
pack(a){
a.innerHTML='<div class="mission-box pk-box"><h3>레이저 다이싱</h3><p class="mission-tip">완성된 웨이퍼를 낱개 칩으로 쪼갤 차례야. 다이(칩) 사이의 좁은 통로가 스크라이브 라인이야. 노란 시작점을 누른 채로 통로를 따라 반대쪽 끝까지 끌고 가. 레이저가 다이에 닿으면 칩이 깨져서 그 줄은 처음부터 다시야. 4줄을 다 자르면 성공!</p><div class="pk-hud"><span>지금 자를 선<b id="pkLine">-</b></span><span>진행률<b id="pkPct">0%</b></span><span>남은 절단선<b id="pkLeft">4</b></span></div><div class="pk-board" id="pkBoard"></div><div class="controls"><button class="game-btn" id="pkReset">웨이퍼 새로 올리기</button></div></div>';
const board=$('pkBoard');
if(!board)return;
const M=0.03,W=0.17,D=(1-2*M-2*W)/3,S=0.05,E=0.94,WIN=0.92,TOL=0.072,GRAB=0.22;
const cs=[M+D+W/2,M+2*D+1.5*W];
const cuts=[{d:'v',c:cs[0],l:'pkLaneV0',n:'세로 1번'},{d:'v',c:cs[1],l:'pkLaneV1',n:'세로 2번'},{d:'h',c:cs[0],l:'pkLaneH0',n:'가로 1번'},{d:'h',c:cs[1],l:'pkLaneH1',n:'가로 2번'}];
const pc=v=>(v*100).toFixed(3)+'%';
let h='';
for(let r=0;r<3;r++){for(let c=0;c<3;c++){h+='<div class="pk-die" style="left:'+pc(M+c*(D+W))+';top:'+pc(M+r*(D+W))+';width:'+pc(D)+';height:'+pc(D)+';--dx:'+((c-1)*6)+'px;--dy:'+((r-1)*6)+'px"><i></i></div>';}}
h+='<div class="pk-lane pk-lane-v" id="pkLaneV0" style="left:'+pc(cs[0]-W/2)+';width:'+pc(W)+'"></div>';
h+='<div class="pk-lane pk-lane-v" id="pkLaneV1" style="left:'+pc(cs[1]-W/2)+';width:'+pc(W)+'"></div>';
h+='<div class="pk-lane pk-lane-h" id="pkLaneH0" style="top:'+pc(cs[0]-W/2)+';height:'+pc(W)+'"></div>';
h+='<div class="pk-lane pk-lane-h" id="pkLaneH1" style="top:'+pc(cs[1]-W/2)+';height:'+pc(W)+'"></div>';
for(let i=0;i<cuts.length;i++){h+=cuts[i].d==='v'?'<div class="pk-cut pk-cut-v" id="pkCut'+i+'" style="left:'+pc(cuts[i].c)+'"></div>':'<div class="pk-cut pk-cut-h" id="pkCut'+i+'" style="top:'+pc(cuts[i].c)+'"></div>';}
h+='<div class="pk-trail" id="pkTrail"></div><div class="pk-mark pk-start" id="pkStart"></div><div class="pk-mark pk-end" id="pkEnd"></div><div class="pk-laser" id="pkLaser"></div>';
board.innerHTML=h;
const laser=$('pkLaser'),trail=$('pkTrail'),startEl=$('pkStart'),endEl=$('pkEnd'),pctEl=$('pkPct'),leftEl=$('pkLeft'),lineEl=$('pkLine');
let idx=0,cutting=false,prog=S,pid=null;
const setXY=(el,x,y)=>{el.style.left=pc(x);el.style.top=pc(y)};
const drawTrail=v=>{const ct=cuts[idx];if(!ct)return;const len=Math.max(0,v-S);trail.style.display=len>0.004?'block':'none';if(ct.d==='v'){trail.className='pk-trail pk-trail-v';trail.style.width='';trail.style.left=pc(ct.c);trail.style.top=pc(S);trail.style.height=pc(len)}else{trail.className='pk-trail pk-trail-h';trail.style.height='';trail.style.top=pc(ct.c);trail.style.left=pc(S);trail.style.width=pc(len)}};
const showPct=v=>{const t=Math.max(0,Math.min(1,(v-S)/(WIN-S)));pctEl.textContent=Math.round(t*100)+'%'};
const arm=()=>{
  board.querySelectorAll('.pk-lane').forEach(x=>x.classList.remove('pk-active'));
  prog=S;
  const ct=cuts[idx];
  if(!ct){laser.style.display='none';startEl.style.display='none';endEl.style.display='none';trail.style.display='none';lineEl.textContent='전부 완료';pctEl.textContent='100%';leftEl.textContent='0';return}
  laser.style.display='';startEl.style.display='';endEl.style.display='';
  const lane=$(ct.l);if(lane)lane.classList.add('pk-active');
  lineEl.textContent=ct.n;
  leftEl.textContent=String(cuts.length-idx);
  if(ct.d==='v'){setXY(startEl,ct.c,S);setXY(endEl,ct.c,E);setXY(laser,ct.c,S)}else{setXY(startEl,S,ct.c);setXY(endEl,E,ct.c);setXY(laser,S,ct.c)}
  drawTrail(S);showPct(S);
};
const release=()=>{cutting=false;if(pid!==null){try{board.releasePointerCapture(pid)}catch(err){}pid=null}board.classList.remove('pk-live')};
const bad=msg=>{release();laser.classList.remove('pk-on');laser.classList.add('pk-bad');board.classList.remove('pk-shake');void board.offsetWidth;board.classList.add('pk-shake');prog=S;drawTrail(S);showPct(S);$('feedback').textContent=msg};
const letGo=()=>{release();laser.classList.remove('pk-on');prog=S;drawTrail(S);showPct(S);const ct=cuts[idx];if(ct){if(ct.d==='v')setXY(laser,ct.c,S);else setXY(laser,S,ct.c)}$('feedback').textContent='레이저를 중간에 놨어. 진행률이 초기화됐으니 시작점부터 다시 이어 봐.'};
const winCut=()=>{
  release();laser.classList.remove('pk-on');
  const c=$('pkCut'+idx);if(c)c.classList.add('pk-done');
  idx++;
  if(idx>=cuts.length){board.classList.add('pk-split');arm();complete('스크라이브 라인만 따라 정확히 잘랐어! 웨이퍼가 9개의 낱개 칩으로 분리됐고, 이제 패키지에 담을 준비가 끝났어.',170)}
  else{arm();$('feedback').textContent='절단선 하나 완료! 남은 라인도 이어서 잘라 봐.'}
};
const nrm=e=>{const r=board.getBoundingClientRect();if(!r.width||!r.height)return null;return[(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height]};
board.addEventListener('pointerdown',e=>{
  if(cutting||e.button>0)return;
  const ct=cuts[idx];
  if(!ct){$('feedback').textContent='웨이퍼를 이미 다 잘랐어. 다시 하려면 웨이퍼 새로 올리기를 눌러.';return}
  board.classList.remove('pk-shake');
  const q=nrm(e);
  if(!q)return;
  const al=ct.d==='v'?q[1]:q[0],lt=ct.d==='v'?q[0]:q[1];
  if(al>GRAB||Math.abs(lt-ct.c)>TOL){$('feedback').textContent='노란 시작점 위를 눌러야 레이저가 잡혀. 통로 입구를 눌러 봐.';return}
  e.preventDefault();
  cutting=true;pid=e.pointerId;prog=Math.max(S,Math.min(1,al));
  try{board.setPointerCapture(pid)}catch(err){}
  board.classList.add('pk-live');
  laser.classList.remove('pk-bad');laser.classList.add('pk-on');
  if(ct.d==='v')setXY(laser,lt,prog);else setXY(laser,prog,lt);
  drawTrail(prog);showPct(prog);
  $('feedback').textContent='';
});
const moveH=e=>{
  if(!cutting||e.pointerId!==pid)return;
  const ct=cuts[idx];if(!ct){release();return}
  const q=nrm(e);if(!q)return;
  let al=ct.d==='v'?q[1]:q[0];
  const lt=ct.d==='v'?q[0]:q[1];
  al=Math.max(0,Math.min(1,al));
  if(Math.abs(lt-ct.c)>TOL){const cl=Math.max(0.02,Math.min(0.98,lt));if(ct.d==='v')setXY(laser,cl,al);else setXY(laser,al,cl);bad('레이저가 다이를 긁었어! 칩이 손상됐으니 이 라인은 시작점부터 다시 해.');return}
  prog=al;
  if(ct.d==='v')setXY(laser,lt,al);else setXY(laser,al,lt);
  drawTrail(al);showPct(al);
  if(al>=WIN)winCut();
};
const upH=e=>{if(!cutting||e.pointerId!==pid)return;letGo()};
board.addEventListener('lostpointercapture',upH);
document.addEventListener('pointermove',moveH);
document.addEventListener('pointerup',upH);
document.addEventListener('pointercancel',upH);
$('pkReset').onclick=()=>{
  release();
  for(let i=0;i<cuts.length;i++){const c=$('pkCut'+i);if(c)c.classList.remove('pk-done')}
  board.classList.remove('pk-split');board.classList.remove('pk-shake');
  laser.classList.remove('pk-bad');laser.classList.remove('pk-on');
  idx=0;arm();
  $('feedback').textContent='새 웨이퍼를 올렸어. 노란 시작점부터 통로를 따라 다시 잘라 봐.';
};
if(typeof onCleanup==='function')onCleanup(()=>{document.removeEventListener('pointermove',moveH);document.removeEventListener('pointerup',upH);document.removeEventListener('pointercancel',upH);release()});
arm();
}
};
function nextStage(){if(!states[current]){ $('feedback').textContent='먼저 이 공정의 미션을 성공해야 다음으로 갈 수 있어.';return}if(current===7){finish();return}if(current===2||current===5){quizFor=current;showQuiz();return}current++;render()}
function showQuiz(){closeBrief();runCleanups();clearTimeout(quizTimer);const quizStage=quizFor;const q=quizzes[quizStage===2?1:2];$('quizQuestion').textContent=q.q;$('quizFeedback').textContent='';$('quizOptions').innerHTML=q.a.map((x,i)=>`<button class="quiz-option">${String.fromCharCode(65+i)}. ${x}</button>`).join('');document.querySelectorAll('.quiz-option').forEach((b,i)=>b.onclick=()=>{if(i!==q.c){$('quizFeedback').textContent='다시 생각해 봐! 공정 설명을 떠올려 봐.';return}if(!quizPassed[quizStage===2?1:2]){score+=50;quizPassed[quizStage===2?1:2]=true;$('score').textContent=score}$('quizFeedback').textContent='정답! +50점';document.querySelectorAll('.quiz-option').forEach(option=>option.disabled=true);quizTimer=setTimeout(()=>{current=quizStage+1;show('gameScreen');render()},500)});show('quizScreen')}
function finish(){closeBrief();runCleanups();clearInterval(timer);$('finalScore').textContent=score;$('finishSummary').textContent=`성공 ${states.filter(Boolean).length}개 · 아직 완료하지 않은 공정 ${states.filter(x=>!x).length}개 · 메뉴에서 언제든 다시 도전할 수 있어.`;$('stageCount').textContent='MISSION REPORT';show('finishScreen')}
$('startBtn').onclick=start;$('restartBtn').onclick=start;$('nextBtn').onclick=nextStage;
// 로고를 누르면 진행 중인 미션을 정리하고 시작 화면으로. 점수와 클리어 기록은 유지된다.
$('homeBtn').onclick=()=>{closeBrief();runCleanups();clearInterval(timer);clearTimeout(quizTimer);$('stageCount').textContent='';show('startScreen')};
$('briefStart').onclick=briefAction;$('briefClose').onclick=closeBrief;$('briefAgain').onclick=()=>openBrief();
// 시작 화면 흐름도의 공정을 누르면 해당 브리핑을 미리 열어 준다.
document.querySelectorAll('.pm-node').forEach(n=>{n.onclick=()=>openBrief(Number(n.dataset.stage),'info')});
$('navBtn').onclick=()=>navOpen?closeNav():openNav();
$('navClose').onclick=closeNav;
$('navHome').onclick=()=>{closeNav();$('homeBtn').click()};
$('navDrawer').onpointerdown=e=>{if(e.target===$('navDrawer'))closeNav()};
$('navList').onclick=e=>{const b=e.target.closest('.nav-item');if(b){closeNav();goStage(Number(b.dataset.i))}};
document.addEventListener('keydown',e=>{if(navOpen&&e.key==='Escape'){e.preventDefault();closeNav()}});
$('briefBody').onscroll=briefScroll;
$('briefOverlay').onpointerdown=e=>{if(e.target===$('briefOverlay'))closeBrief()};
show('startScreen');