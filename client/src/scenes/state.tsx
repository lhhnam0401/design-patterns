import { Person } from './print/figures'
import { Grass, GroundBand, Hills, Paddy, Sun, Tree } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './print/pigments'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { Lang, SceneArtProps, SceneDefinition } from './types'

const FEET = 378
/** Centres of the five stage panels, left to right in the order of one season. */
const PANEL_X = [405, 525, 645, 765, 885] as const
const PANEL_W = 108
const PANEL_TOP = 162
const PANEL_BOTTOM = 292
const SKY_BOTTOM = 225
const FIELD_BOTTOM = 266
/** The line under the panels that carries the paddy's call to its current stage. */
const TRUNK = 316
/** The way back from the last stage to the first: a new season. */
const RETURN = 368
const STAGES = ['s1', 's2', 's3', 's4', 's5'] as const

/** The paddy hands the call to stage i: along the trunk, then up into the panel. */
const delegate = (i: number) =>
  `M336,${TRUNK} L${PANEL_X[i] + 8},${TRUNK} Q${PANEL_X[i] + 24},${TRUNK} ${PANEL_X[i] + 24},${PANEL_BOTTOM + 6}`
/** Stage i moves the paddy on: a hop over to the next panel. */
const hop = (i: number) => {
  const x = PANEL_X[i]
  return `M${x + 26},${PANEL_TOP - 2} C${x + 44},124 ${x + 76},124 ${x + 94},${PANEL_TOP - 4}`
}

/** A rice tuft: three blades with an ink edge. */
function tuft(x: number, y: number, h: number, color: string) {
  const d = `M${x},${y} q-3,${-h * 0.6} -7,${-h} M${x},${y} q0,${-h * 0.6} 0,${-h - 2} M${x},${y} q3,${-h * 0.6} 7,${-h}`
  return (
    <g key={`${x}-${y}`} fill="none" strokeLinecap="round">
      <path d={d} stroke={INK} strokeWidth={4.4} />
      <path d={d} stroke={color} strokeWidth={2.2} />
    </g>
  )
}

/** A drooping head of flowering or ripe rice at the top of a tuft. */
function head(x: number, y: number, color: string) {
  const d = `M${x},${y} q9,-3 11,9`
  return (
    <g key={`h${x}-${y}`} fill="none" strokeLinecap="round">
      <path d={d} stroke={INK} strokeWidth={5} />
      <path d={d} stroke={color} strokeWidth={3} />
    </g>
  )
}

/** A water buffalo facing left, pulling a plough. `by` is the ground under its hooves. */
function buffalo(bx: number, by: number) {
  return (
    <g stroke={INK} strokeLinejoin="round" strokeLinecap="round">
      {[-15, -7, 7, 15].map(dx => <line key={dx} x1={bx + dx} y1={by - 14} x2={bx + dx} y2={by} strokeWidth={4.5} />)}
      <path d={`M${bx + 20},${by - 20} q8,4 6,14`} fill="none" strokeWidth={2.4} />
      <ellipse cx={bx} cy={by - 18} rx={21} ry={10.5} fill={PIGMENT.iron} strokeWidth={2.6} />
      <ellipse cx={bx - 25} cy={by - 21} rx={8.5} ry={7} fill={PIGMENT.iron} strokeWidth={2.4} />
      <path d={`M${bx - 30},${by - 26} q-9,-3 -6,-12 M${bx - 20},${by - 26} q9,-3 6,-12`} fill="none" strokeWidth={5} />
      <path d={`M${bx - 30},${by - 26} q-9,-3 -6,-12 M${bx - 20},${by - 26} q9,-3 6,-12`} fill="none" stroke={PIGMENT.steel} strokeWidth={2.4} />
      <circle cx={bx - 28} cy={by - 21} r={1.4} fill={PAPER_LIGHT} stroke="none" />
      {/* yoke, trace and plough */}
      <path d={`M${bx - 14},${by - 30} L${bx - 10},${by - 18}`} strokeWidth={4} />
      <path d={`M${bx - 12},${by - 24} L${bx + 34},${by - 6}`} fill="none" strokeWidth={4.4} />
      <path d={`M${bx - 12},${by - 24} L${bx + 34},${by - 6}`} fill="none" stroke={PIGMENT.wood} strokeWidth={2} />
      <path d={`M${bx + 34},${by - 2} L${bx + 44},${by - 24}`} fill="none" strokeWidth={5} />
      <path d={`M${bx + 34},${by - 2} L${bx + 44},${by - 24}`} fill="none" stroke={PIGMENT.wood} strokeWidth={2.4} />
      <path d={`M${bx + 26},${by} L${bx + 40},${by - 6} L${bx + 40},${by + 1} Z`} fill={PIGMENT.steel} strokeWidth={1.6} />
    </g>
  )
}

/** A bound sheaf of reaped rice. `y` is its foot. */
function sheaf(x: number, y: number) {
  return (
    <g stroke={INK} strokeLinejoin="round" strokeLinecap="round">
      <path d={`M${x - 3},${y - 28} q-9,-6 -11,-14 M${x},${y - 28} q0,-9 0,-16 M${x + 3},${y - 28} q9,-6 11,-14`} fill="none" strokeWidth={5} />
      <path d={`M${x - 3},${y - 28} q-9,-6 -11,-14 M${x},${y - 28} q0,-9 0,-16 M${x + 3},${y - 28} q9,-6 11,-14`} fill="none" stroke={PIGMENT.yellow} strokeWidth={3} />
      <path d={`M${x - 9},${y} L${x - 4},${y - 30} L${x + 4},${y - 30} L${x + 9},${y} Z`} fill={PIGMENT.yellow} strokeWidth={2.2} />
      <rect x={x - 7} y={y - 17} width={14} height={4} fill={PIGMENT.amberDark} strokeWidth={1.2} />
    </g>
  )
}

const SKIES = [TINT.blue, TINT.blue, TINT.green, TINT.yellow, TINT.amber]
const WORDS = {
  en: ['tilling', 'planting', 'in leaf', 'in bloom', 'reaping'],
  vi: ['cày bừa', 'cấy lúa', 'đang lớn', 'trổ bông', 'thu hoạch'],
} as const

/** What the field looks like at stage i, drawn inside the panel at centre x. */
function field(i: number, x: number) {
  const ix = x - PANEL_W / 2 + 5
  const iw = PANEL_W - 10
  const fieldH = FIELD_BOTTOM - SKY_BOTTOM
  const water = <rect x={ix} y={SKY_BOTTOM} width={iw} height={fieldH} fill={PIGMENT.blue} stroke={INK} strokeWidth={1.5} />
  const ripple = <path d={`M${ix + 6},${SKY_BOTTOM + 5} L${ix + iw - 6},${SKY_BOTTOM + 5}`} stroke={PAPER_LIGHT} strokeOpacity={0.4} strokeWidth={1.5} />
  const cols = (n: number, from = ix + 10, to = ix + iw - 10) => Array.from({ length: n }, (_, k) => from + (k * (to - from)) / (n - 1))
  switch (i) {
    case 0:
      return (
        <g>
          <rect x={ix} y={SKY_BOTTOM} width={iw} height={fieldH} fill={PIGMENT.wood} stroke={INK} strokeWidth={1.5} />
          {[236, 247, 258].map(y => <path key={y} d={`M${ix + 4},${y} Q${x},${y - 4} ${ix + iw - 4},${y}`} stroke={PIGMENT.woodDark} strokeWidth={2.2} fill="none" />)}
          {buffalo(x - 6, 262)}
        </g>
      )
    case 1:
      return (
        <g>
          {water}
          {ripple}
          {[242, 254].flatMap(y => cols(4, ix + 10, x).map(cx => tuft(cx, y, y === 242 ? 7 : 9, PIGMENT.leaf)))}
          <Person x={x + 24} y={264} s={0.46} robe={PIGMENT.red} pants={PIGMENT.woodDark} hat="nonLa" long={false} pose="work">
            {tuft(24, -50, 12, PIGMENT.leaf)}
          </Person>
        </g>
      )
    case 2:
      return (
        <g>
          {water}
          {ripple}
          {[[240, 12], [252, 16], [264, 20]].flatMap(([y, h]) => cols(6).map(cx => tuft(cx, y, h, PIGMENT.leaf)))}
        </g>
      )
    case 3:
      return (
        <g>
          {water}
          {[[244, 22], [256, 28], [266, 32]].flatMap(([y, h]) => cols(5).map(cx => (
            <g key={`${cx}-${y}`}>
              {tuft(cx, y, h, PIGMENT.leaf)}
              {head(cx, y - h, PIGMENT.straw)}
            </g>
          )))}
        </g>
      )
    default:
      return (
        <g>
          <rect x={ix} y={SKY_BOTTOM} width={iw} height={fieldH} fill={PIGMENT.straw} stroke={INK} strokeWidth={1.5} />
          {cols(9).map(cx => <path key={cx} d={`M${cx},${FIELD_BOTTOM - 4} l-2,-6 M${cx},${FIELD_BOTTOM - 4} l2,-6`} stroke={PIGMENT.strawDark} strokeWidth={2} />)}
          {[[250, 24], [262, 28]].flatMap(([y, h]) => cols(3, x + 14, ix + iw - 8).map(cx => (
            <g key={`${cx}-${y}`}>
              {tuft(cx, y, h, PIGMENT.yellowDark)}
              {head(cx, y - h, PIGMENT.yellow)}
            </g>
          )))}
          {sheaf(x - 32, 262)}
          {sheaf(x - 10, 264)}
          <path d={`M${x - 46},${FIELD_BOTTOM - 6} q6,-16 20,-14 q-12,2 -16,14 Z`} fill={PIGMENT.steel} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
        </g>
      )
  }
}

/** One stage panel: a framed picture of the field, with a word for the stage underneath. */
function panel(i: number, lang: Lang) {
  const x = PANEL_X[i]
  const left = x - PANEL_W / 2
  return (
    <g>
      <rect x={left} y={PANEL_TOP} width={PANEL_W} height={PANEL_BOTTOM - PANEL_TOP} rx={3} fill={PIGMENT.wood} stroke={INK} strokeWidth={3} />
      <rect x={left + 5} y={PANEL_TOP + 5} width={PANEL_W - 10} height={PANEL_BOTTOM - PANEL_TOP - 10} fill={PAPER_LIGHT} stroke={INK} strokeWidth={1.5} />
      <rect x={left + 5} y={PANEL_TOP + 5} width={PANEL_W - 10} height={SKY_BOTTOM - PANEL_TOP - 5} fill={SKIES[i]} />
      {field(i, x)}
      <Caption x={x} y={PANEL_BOTTOM - 9}>{WORDS[lang][i]}</Caption>
    </g>
  )
}

const state: SceneDefinition = {
  slug: 'state',
  title: { en: 'State: a rice paddy through one season', vi: 'State: ruộng lúa qua các giai đoạn của một vụ' },
  setting: 'dawn',
  pins: [
    { nodeId: 'client', caption: { en: 'the farmer, who always calls the same three methods', vi: 'người nông dân, luôn gọi cùng ba phương thức' }, at: [66, 336], showName: false },
    { nodeId: 'ctx', methods: ['water', 'fertilize', 'harvest', 'changeStage'], caption: { en: 'the paddy hands every call to its current stage, with no if-else', vi: 'thửa ruộng giao mọi lời gọi cho giai đoạn hiện tại, không có if-else' }, at: [250, 312], showName: false },
    { nodeId: 'state', methods: ['water', 'fertilize', 'harvest'], caption: { en: 'what every stage can do; it keeps the paddy so it can move it on', vi: 'việc giai đoạn nào cũng làm; giữ thửa ruộng để chuyển giai đoạn' }, at: [515, 44], side: 'left' },
    { nodeId: 's1', caption: { en: 'tilling: the buffalo pulls the plow (current stage, framed in red)', vi: 'cày bừa: trâu kéo cày (giai đoạn hiện tại, khung đỏ)' }, at: [PANEL_X[0] - 24, 198], showName: false },
    { nodeId: 's2', caption: { en: 'planting: seedlings go into the flooded field', vi: 'cấy lúa: cắm mạ xuống ruộng nước' }, at: [PANEL_X[1] - 24, 198], showName: false },
    { nodeId: 's3', caption: { en: 'in leaf: the rice grows tall and green', vi: 'đang lớn: lúa lên cao, xanh tốt' }, at: [PANEL_X[2] - 24, 198], showName: false },
    { nodeId: 's4', caption: { en: 'in bloom: the rice flowers; no fertilizer now', vi: 'trổ bông: lúa ra hoa, không bón phân' }, at: [PANEL_X[3] - 24, 198], showName: false },
    { nodeId: 's5', caption: { en: 'reaping: the field is dry and the rice is cut', vi: 'thu hoạch: ruộng khô, lúa được gặt' }, at: [PANEL_X[4] - 24, 198], showName: false },
  ],
  calls: [
    { id: 'c-fertilize', nodeId: 'ctx', method: 'fertilize', d: 'M112,274 C136,262 160,262 184,272' },
    { id: 'c-water', nodeId: 'ctx', method: 'water', d: 'M114,300 L184,300' },
    { id: 'c-harvest', nodeId: 'ctx', method: 'harvest', d: 'M112,326 C136,338 160,338 184,328' },
    { id: 'd-1', nodeId: 'state', method: 'fertilize', d: delegate(0) },
    { id: 'd-2', nodeId: 'state', method: 'water', d: delegate(1) },
    { id: 'd-3', nodeId: 'state', method: 'fertilize', d: delegate(2) },
    { id: 'd-4', nodeId: 'state', method: 'harvest', d: delegate(3) },
    { id: 'd-5', nodeId: 'state', method: 'harvest', d: delegate(4) },
    { id: 't-1', nodeId: 'ctx', method: 'changeStage', d: hop(0) },
    { id: 't-2', nodeId: 'ctx', method: 'changeStage', d: hop(1) },
    { id: 't-3', nodeId: 'ctx', method: 'changeStage', d: hop(2) },
    { id: 't-4', nodeId: 'ctx', method: 'changeStage', d: hop(3) },
    {
      id: 't-5',
      nodeId: 'ctx',
      method: 'changeStage',
      d: `M930,${PANEL_BOTTOM + 4} C934,350 914,${RETURN} 870,${RETURN} L420,${RETURN} C390,${RETURN} 378,352 378,${PANEL_BOTTOM + 6}`,
    },
  ],
  steps: [
    {
      calls: ['c-fertilize', 'd-1', 't-1'],
      nodes: ['client', 'ctx', 'state', 's1', 's2'],
      at: [PANEL_X[0] - 4, 342],
      caption: { en: 'The farmer calls fertilize(). The paddy hands it to its stage, Plowing, which calls changeStage() to move on to Transplanting.', vi: 'Người nông dân gọi fertilize(). Ruộng giao lời gọi cho Plowing; bón lót xong, nó gọi changeStage() để sang Transplanting.' },
    },
    {
      calls: ['c-water', 'd-2', 't-2'],
      nodes: ['client', 'ctx', 'state', 's2', 's3'],
      at: [PANEL_X[1] - 4, 342],
      caption: { en: 'Next the farmer calls water(). Now Transplanting answers: the seedlings take root, and it moves the paddy on to Growing.', vi: 'Tiếp theo người nông dân gọi water(). Giờ Transplanting trả lời: mạ bén rễ, và nó chuyển ruộng sang Growing.' },
    },
    {
      calls: ['c-fertilize', 'd-3', 't-3'],
      nodes: ['client', 'ctx', 'state', 's3', 's4'],
      at: [PANEL_X[2] - 4, 342],
      caption: { en: 'The same fertilize() call, but Growing handles it this time: the rice is fed and the paddy moves on to Flowering.', vi: 'Vẫn lời gọi fertilize(), nhưng lần này Growing xử lý: lúa được bón thúc đòng, và ruộng chuyển sang Flowering.' },
    },
    {
      calls: ['c-harvest', 'd-4', 't-4'],
      nodes: ['client', 'ctx', 'state', 's4', 's5'],
      at: [PANEL_X[3] - 4, 342],
      caption: { en: 'harvest() while the rice is in flower: Flowering starts the harvest and switches the paddy to Harvesting.', vi: 'harvest() khi lúa đang trổ bông: Flowering bắt đầu gặt và chuyển ruộng sang Harvesting.' },
    },
    {
      calls: ['c-harvest', 'd-5', 't-5'],
      nodes: ['client', 'ctx', 'state', 's5', 's1'],
      at: [PANEL_X[4] - 4, 342],
      caption: { en: 'harvest() again: Harvesting finishes and starts a new season with Plowing. The farmer’s calls never changed.', vi: 'Lại harvest(): Harvesting gặt xong và mở vụ mới với Plowing. Lời gọi của người nông dân không hề thay đổi.' },
    },
  ],
  focus: [0, 120, 780, 320],
  untagged: [],
  Art: function StateArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Sun x={150} y={66} r={26} />
          <Hills y={262} amp={22} seed={4} step={150} />
          <Tree x={250} y={250} s={0.85} pale />
          <GroundBand />
          <Grass x0={120} x1={170} seed={6} count={3} />
          <Grass x0={350} x1={940} seed={8} count={10} />
        </Backdrop>

        {/* The abstract stage hangs over exactly the five stages */}
        <Part node="state">
          <Signboard x={645} w={300} tone="abstract" span={[PANEL_X[0], PANEL_X[4]]} ticks={[...PANEL_X]}>
            <Caption x={670} y={53}>{lang === 'vi' ? 'mỗi giai đoạn của lúa' : 'each stage of the crop'}</Caption>
          </Signboard>
        </Part>

        {/* The five stages of one season; the first is the paddy's stage now */}
        {STAGES.map((id, i) => (
          <Part key={id} node={id}>
            {i === 0 && (
              <g>
                <rect x={PANEL_X[0] - PANEL_W / 2 - 6} y={PANEL_TOP - 6} width={PANEL_W + 12} height={PANEL_BOTTOM - PANEL_TOP + 12} rx={5} fill="none" stroke={PIGMENT.red} strokeWidth={4.5} />
                <line x1={PANEL_X[0] - 46} y1={PANEL_TOP - 6} x2={PANEL_X[0] - 46} y2={128} stroke={INK} strokeWidth={3} />
                <path d={`M${PANEL_X[0] - 46},128 L${PANEL_X[0] - 20},135 L${PANEL_X[0] - 46},142 Z`} fill={PIGMENT.red} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
              </g>
            )}
            {panel(i, lang)}
          </Part>
        ))}

        {/* The paddy: a flooded field inside its earth bank */}
        <Part node="ctx">
          <path d="M174,246 L324,246 L350,374 L148,374 Z" fill={PIGMENT.wood} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          <line x1={178} y1={251} x2={320} y2={251} stroke={PIGMENT.woodDark} strokeWidth={2} />
          <Paddy x={186} y={258} w={126} h={104} rows={4} height={12} />
        </Part>

        {/* The farmer: the same three calls, whatever the season */}
        <Part node="client">
          <Person x={66} y={FEET} s={1.25} robe={PIGMENT.amber} pants={PIGMENT.woodDark} hat="nonLa" long={false} pose="reach" />
        </Part>
      </>
    )
  },
}

export default state
