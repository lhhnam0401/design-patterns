import { GroundBand } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './print/pigments'
import { Jar, Lantern, Pot, Shelf } from './print/props'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const FLOOR = 378
/** The three pots, one per soup, under the recipe board. */
const POT_X = [190, 480, 770] as const
const POT_W = 150
/** The five steps on the recipe board, in the order cook() runs them. */
const STEP_X = [220, 350, 480, 610, 740] as const
const ICON_Y = 58

/** Step 1, the broth: a small pot with a bone and steam. */
function brothIcon(x: number, y: number) {
  return (
    <g stroke={INK} strokeLinejoin="round" strokeLinecap="round">
      <path d={`M${x - 3},${y - 4} L${x + 8},${y - 18}`} strokeWidth={6} />
      <path d={`M${x - 3},${y - 4} L${x + 8},${y - 18}`} stroke={PAPER_LIGHT} strokeWidth={3} />
      <circle cx={x + 9} cy={y - 20} r={3.6} fill={PAPER_LIGHT} strokeWidth={1.4} />
      <path d={`M${x - 19},${y - 4} L${x + 19},${y - 4} Q${x + 19},${y + 15} ${x},${y + 17} Q${x - 19},${y + 15} ${x - 19},${y - 4} Z`} fill={PIGMENT.iron} strokeWidth={2.4} />
      <ellipse cx={x} cy={y - 4} rx={21} ry={4} fill={PIGMENT.ironLight} strokeWidth={2} />
      <path d={`M${x - 12},${y - 12} q-5,-6 0,-12`} fill="none" stroke={PIGMENT.stone} strokeWidth={2.4} />
    </g>
  )
}

/** Step 2, the main ingredients: a fish and a tomato. */
function ingredientsIcon(x: number, y: number) {
  return (
    <g stroke={INK} strokeLinejoin="round">
      <path d={`M${x - 22},${y + 8} Q${x - 8},${y - 4} ${x + 8},${y + 8} Q${x - 8},${y + 18} ${x - 22},${y + 8} Z`} fill={PIGMENT.steel} strokeWidth={2.2} />
      <path d={`M${x + 6},${y + 8} L${x + 16},${y} L${x + 16},${y + 16} Z`} fill={PIGMENT.steel} strokeWidth={2.2} />
      <circle cx={x - 15} cy={y + 6} r={1.6} fill={INK} stroke="none" />
      <circle cx={x + 8} cy={y - 9} r={10} fill={PIGMENT.red} strokeWidth={2.2} />
      <path d={`M${x + 4},${y - 19} q4,4 8,0`} fill="none" stroke={PIGMENT.leaf} strokeWidth={2.6} strokeLinecap="round" />
    </g>
  )
}

/** Step 3, seasoning: a bottle of fish sauce. */
function seasonIcon(x: number, y: number) {
  return (
    <g stroke={INK} strokeLinejoin="round">
      <rect x={x - 4} y={y - 22} width={8} height={7} fill={PIGMENT.red} strokeWidth={1.6} />
      <path d={`M${x - 4},${y - 15} L${x + 4},${y - 15} L${x + 4},${y - 10} Q${x + 11},${y - 7} ${x + 11},${y} L${x + 11},${y + 16} L${x - 11},${y + 16} L${x - 11},${y} Q${x - 11},${y - 7} ${x - 4},${y - 10} Z`} fill={PIGMENT.amber} strokeWidth={2.2} />
      <rect x={x - 7} y={y + 1} width={14} height={9} fill={PAPER_LIGHT} strokeWidth={1.2} />
      {[-18, -13].map(dx => <circle key={dx} cx={x + dx} cy={y + 10 + (dx % 2) * 2} r={1.8} fill={PAPER_LIGHT} strokeWidth={0.8} />)}
    </g>
  )
}

/** Step 4, the hook: an empty bowl drawn in a dashed line, because by default it does nothing. */
function hookIcon(x: number, y: number) {
  return (
    <g fill="none" stroke={INK} strokeWidth={2.4} strokeDasharray="5 4" strokeLinecap="round">
      <path d={`M${x - 22},${y - 2} L${x + 22},${y - 2} Q${x + 18},${y + 17} ${x},${y + 17} Q${x - 18},${y + 17} ${x - 22},${y - 2} Z`} />
      <path d={`M${x - 8},${y + 17} L${x - 8},${y + 21} L${x + 8},${y + 21} L${x + 8},${y + 17}`} />
    </g>
  )
}

/** Step 5, the garnish: chopped spring onion and a sprig of herbs. */
function garnishIcon(x: number, y: number) {
  return (
    <g stroke={INK} strokeLinejoin="round">
      <path d={`M${x - 16},${y + 14} Q${x - 6},${y - 10} ${x + 8},${y - 18} Q${x + 4},${y - 2} ${x - 16},${y + 14} Z`} fill={PIGMENT.leaf} strokeWidth={2} />
      <path d={`M${x - 12},${y + 10} Q${x - 2},${y - 4} ${x + 6},${y - 14}`} fill="none" stroke={PIGMENT.greenDark} strokeWidth={1.4} />
      {[[4, 6], [14, 0], [12, 13], [-2, 16]].map(([dx, dy]) => (
        <circle key={`${dx}-${dy}`} cx={x + dx} cy={y + dy} r={5} fill={PAPER_LIGHT} stroke={PIGMENT.leaf} strokeWidth={3} />
      ))}
    </g>
  )
}

const ICONS = [brothIcon, ingredientsIcon, seasonIcon, hookIcon, garnishIcon]

/** A pork bone, for the bone broth. */
function bone(x: number, y: number, angle: number) {
  return (
    <g transform={`rotate(${angle} ${x} ${y})`} fill={PAPER_LIGHT} stroke={INK} strokeWidth={1.8}>
      <rect x={x - 14} y={y - 3.5} width={28} height={7} rx={3} />
      <circle cx={x - 14} cy={y - 4} r={4.5} />
      <circle cx={x - 14} cy={y + 4} r={4.5} />
      <circle cx={x + 14} cy={y - 4} r={4.5} />
      <circle cx={x + 14} cy={y + 4} r={4.5} />
      <rect x={x - 13} y={y - 2.5} width={26} height={5} stroke="none" />
    </g>
  )
}

/** A small red chili. */
function chili(x: number, y: number, angle = 0) {
  return (
    <g transform={`rotate(${angle} ${x} ${y})`}>
      <path d={`M${x - 10},${y} Q${x},${y - 6} ${x + 10},${y + 4} Q${x},${y + 2} ${x - 10},${y + 4} Z`} fill={PIGMENT.red} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
      <path d={`M${x - 10},${y + 2} l-4,-3`} stroke={PIGMENT.leaf} strokeWidth={2.4} strokeLinecap="round" />
    </g>
  )
}

/** A long serrated herb leaf (ngò gai) or a bunch of fresh herbs. */
function herb(x: number, y: number, angle = 0) {
  return (
    <path
      transform={`rotate(${angle} ${x} ${y})`}
      d={`M${x - 16},${y} l4,-4 l4,3 l4,-4 l4,3 l4,-4 l4,3 l4,-3 L${x + 18},${y} Q${x},${y + 6} ${x - 16},${y} Z`}
      fill={PIGMENT.leaf}
      stroke={INK}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  )
}

/** Chopped spring onion, the default garnish. */
function onion(points: readonly (readonly [number, number])[]) {
  return points.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={4.5} fill={PAPER_LIGHT} stroke={PIGMENT.leaf} strokeWidth={3} />)
}

const potTop = (w: number) => FLOOR - 18 - w * 0.55

const templateMethod: SceneDefinition = {
  slug: 'template-method',
  title: { en: 'Template Method: one cooking order for every soup', vi: 'Template Method: một trình tự nấu cho mọi món nước' },
  setting: 'interior',
  pins: [
    { nodeId: 'abstract', methods: ['cook'], caption: { en: 'cook() fixes the order: broth, ingredients, seasoning, hook, garnish', vi: 'cook() cố định trình tự: nước dùng, nguyên liệu, nêm, hook, trang trí' }, at: [104, 58], showName: false },
    { nodeId: 'c1', methods: ['prepareBroth', 'addIngredients', 'garnish'], caption: { en: 'canh chua cá: tamarind broth and its own herbs and chili', vi: 'canh chua cá: nước me chua, tự rắc ngò gai và ớt' }, at: [POT_X[0], 322], showName: false },
    { nodeId: 'c2', methods: ['prepareBroth', 'addIngredients'], caption: { en: 'canh bí xương: pork-bone broth, keeps every default', vi: 'canh bí xương: hầm xương heo, giữ mọi mặc định' }, at: [POT_X[1], 322], showName: false },
    { nodeId: 'c3', methods: ['prepareBroth', 'addIngredients', 'season', 'beforeLadle', 'garnish'], caption: { en: 'bún bò Huế: does every step its own way, the hook too', vi: 'bún bò Huế: làm mọi bước theo cách riêng, cả hook' }, at: [POT_X[2], 322], showName: false },
  ],
  calls: [
    { id: 'cook', nodeId: 'abstract', method: 'cook', d: 'M30,214 C30,120 44,30 104,30 L872,30' },
    { id: 'broth-c1', nodeId: 'c1', method: 'prepareBroth', d: 'M212,104 C204,150 176,196 166,250' },
    { id: 'broth-c2', nodeId: 'c2', method: 'prepareBroth', d: 'M226,104 C280,160 420,170 456,250' },
    { id: 'broth-c3', nodeId: 'c3', method: 'prepareBroth', d: 'M232,102 C340,170 640,150 716,250' },
    { id: 'ingr-c1', nodeId: 'c1', method: 'addIngredients', d: 'M340,104 C320,160 220,180 194,250' },
    { id: 'ingr-c2', nodeId: 'c2', method: 'addIngredients', d: 'M356,104 C390,150 470,180 492,250' },
    { id: 'ingr-c3', nodeId: 'c3', method: 'addIngredients', d: 'M362,102 C470,150 690,150 742,250' },
    { id: 'season-c3', nodeId: 'c3', method: 'season', d: 'M496,104 C560,140 740,170 768,250' },
    { id: 'ladle-c3', nodeId: 'c3', method: 'beforeLadle', d: 'M620,104 C680,130 780,160 794,250' },
    { id: 'garnish-c1', nodeId: 'c1', method: 'garnish', d: 'M726,104 C640,150 300,120 244,172 C228,188 222,214 222,250' },
    { id: 'garnish-c3', nodeId: 'c3', method: 'garnish', d: 'M752,104 C790,140 816,190 820,250' },
  ],
  steps: [
    {
      calls: ['cook'],
      nodes: ['abstract', 'c1', 'c2', 'c3'],
      at: [66, 150],
      caption: { en: 'Every soup here is cooked with cook(), which SoupRecipe fixes: broth, ingredients, seasoning, the hook, then garnish.', vi: 'Món nào cũng nấu bằng cook() do SoupRecipe cố định: nước dùng, nguyên liệu, nêm nếm, hook, rồi trang trí.' },
    },
    {
      calls: ['broth-c1', 'broth-c2', 'broth-c3', 'ingr-c1', 'ingr-c2', 'ingr-c3'],
      nodes: ['abstract', 'c1', 'c2', 'c3'],
      at: [300, 210],
      caption: { en: 'prepareBroth() and addIngredients() are abstract, so each soup does its own: tamarind and fish, pork bones and gourd, beef and lemongrass.', vi: 'prepareBroth() và addIngredients() là bước trừu tượng, món nào cũng tự làm: me chua và cá, xương heo và bí, thịt bò và sả.' },
    },
    {
      calls: ['season-c3', 'ladle-c3'],
      nodes: ['abstract', 'c1', 'c2', 'c3'],
      at: [870, 170],
      caption: { en: 'season() defaults to fish sauce. Bún bò Huế overrides it with mắm ruốc, and its beforeLadle() hook puts noodles in the bowl.', vi: 'season() mặc định nêm nước mắm. Bún bò Huế ghi đè bằng mắm ruốc, và hook beforeLadle() của nó trụng bún vào tô.' },
    },
    {
      calls: ['garnish-c1', 'garnish-c3'],
      nodes: ['abstract', 'c1', 'c2', 'c3'],
      at: [100, 222],
      caption: { en: 'garnish() defaults to spring onion, which canh bí keeps. Canh chua overrides it with sawtooth herb and chili.', vi: 'garnish() mặc định rắc hành lá, canh bí giữ nguyên. Canh chua ghi đè bằng ngò gai và ớt.' },
    },
  ],
  focus: [60, 40, 840, 350],
  untagged: [],
  Art: function TemplateMethodArt({ lang }: SceneArtProps) {
    const top = potTop(POT_W)
    const dishes = ['canh chua cá', 'canh bí xương', 'bún bò Huế']
    return (
      <>
        <Backdrop>
          {Array.from({ length: 15 }, (_, i) => (
            <line key={i} x1={i * 66 + 20} y1={100} x2={i * 66 + 20} y2={FLOOR} stroke={TINT.amber} strokeWidth={3} />
          ))}
          <GroundBand />
          <Shelf x={300} y={FLOOR} w={84} h={70} rows={2} pale />
          <Jar x={322} y={FLOOR - 27} s={0.45} pale />
          <Jar x={360} y={FLOOR - 27} s={0.4} pale />
          <Lantern x={918} y={232} r={12} cord={40} pale />
          <Lantern x={600} y={232} r={10} cord={30} pale />
        </Backdrop>

        {/* The recipe board: the fixed order of the five steps */}
        <Part node="abstract">
          <Signboard x={480} w={820} y={8} h={82} tone="abstract" span={[POT_X[0], POT_X[2]]} ticks={[...POT_X]}>
            {STEP_X.map((x, i) => (
              <g key={x}>
                <circle cx={x} cy={ICON_Y} r={26} fill={TINT.green} stroke={PIGMENT.green} strokeWidth={1.6} />
                {ICONS[i](x, ICON_Y)}
              </g>
            ))}
            <Caption x={828} y={64}>{lang === 'vi' ? 'mọi món' : 'every soup'}</Caption>
          </Signboard>
        </Part>

        {/* Canh chua cá: tamarind broth, fish, tomato, pineapple, and its own garnish */}
        <Part node="c1">
          <Pot x={POT_X[0]} y={FLOOR} w={POT_W} broth={PIGMENT.yellow} steam={false} />
          <path d={`M${POT_X[0] - 46},${top - 4} Q${POT_X[0] - 30},${top - 16} ${POT_X[0] - 12},${top - 4} Z`} fill={PIGMENT.steel} stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
          <path d={`M${POT_X[0] - 46},${top - 6} l-10,-8 l2,12 Z`} fill={PIGMENT.steel} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
          {[0, 18].map(dx => <path key={dx} d={`M${POT_X[0] + dx - 8},${top - 2} a9,9 0 0 1 18,0 Z`} fill={PIGMENT.red} stroke={INK} strokeWidth={1.8} />)}
          <rect x={POT_X[0] + 34} y={top - 14} width={16} height={12} fill={PIGMENT.yellow} stroke={INK} strokeWidth={1.8} />
          {herb(POT_X[0] - 20, top - 20, -14)}
          {chili(POT_X[0] + 18, top - 20, 10)}
          <Caption x={POT_X[0]} y={414}>{dishes[0]}</Caption>
        </Part>

        {/* Canh bí xương: bone broth, gourd, and the default spring onion */}
        <Part node="c2">
          <Pot x={POT_X[1]} y={FLOOR} w={POT_W} color={PIGMENT.tile} broth={PIGMENT.straw} steam={false} />
          {bone(POT_X[1] + 26, top - 10, -20)}
          {[-34, -10].map(dx => (
            <g key={dx}>
              <rect x={POT_X[1] + dx} y={top - 16} width={20} height={14} rx={2} fill={PIGMENT.white} stroke={INK} strokeWidth={1.8} />
              <rect x={POT_X[1] + dx} y={top - 16} width={20} height={4} fill={PIGMENT.leaf} stroke={INK} strokeWidth={1.4} />
            </g>
          ))}
          {onion([[POT_X[1] - 40, top - 22], [POT_X[1] - 20, top - 26], [POT_X[1] + 4, top - 24]])}
          <Caption x={POT_X[1]} y={414}>{dishes[1]}</Caption>
        </Part>

        {/* Bún bò Huế: chili-red broth, beef, lemongrass, herbs, and noodles in the bowl from the hook */}
        <Part node="c3">
          <Pot x={POT_X[2]} y={FLOOR} w={POT_W} broth={PIGMENT.red} steam={false} />
          <path d={`M${POT_X[2] + 20},${top - 4} L${POT_X[2] + 48},${top - 40}`} stroke={INK} strokeWidth={7} strokeLinecap="round" />
          <path d={`M${POT_X[2] + 20},${top - 4} L${POT_X[2] + 48},${top - 40}`} stroke={PIGMENT.straw} strokeWidth={4} strokeLinecap="round" />
          {[-40, -18, 4].map(dx => <ellipse key={dx} cx={POT_X[2] + dx} cy={top - 7} rx={12} ry={5.5} fill={PIGMENT.redDark} stroke={INK} strokeWidth={1.6} />)}
          {herb(POT_X[2] - 24, top - 18, 12)}
          {chili(POT_X[2] - 2, top - 20, -16)}
          <g stroke={INK} strokeLinejoin="round">
            <path d={`M${POT_X[2] + 92},346 L${POT_X[2] + 148},346 Q${POT_X[2] + 144},372 ${POT_X[2] + 120},374 Q${POT_X[2] + 96},372 ${POT_X[2] + 92},346 Z`} fill={PAPER_LIGHT} strokeWidth={2.4} />
            <path d={`M${POT_X[2] + 98},358 Q${POT_X[2] + 120},364 ${POT_X[2] + 142},358`} fill="none" stroke={PIGMENT.blue} strokeWidth={2} />
            <ellipse cx={POT_X[2] + 120} cy={346} rx={28} ry={5} fill={PIGMENT.white} strokeWidth={2} />
            {[-14, -4, 6, 16].map(dx => <path key={dx} d={`M${POT_X[2] + 120 + dx},344 q3,-10 -2,-16`} fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />)}
            {[-14, -4, 6, 16].map(dx => <path key={`w${dx}`} d={`M${POT_X[2] + 120 + dx},344 q3,-10 -2,-16`} fill="none" stroke={PIGMENT.white} strokeWidth={2} strokeLinecap="round" />)}
          </g>
          <Caption x={POT_X[2]} y={414}>{dishes[2]}</Caption>
        </Part>
      </>
    )
  },
}

export default templateMethod
