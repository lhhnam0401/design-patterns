import { Hall, Roof } from './print/architecture'
import { Person } from './print/figures'
import { rng } from './print/geometry'
import { H, W } from './print/layout'
import { Moon, Stars } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './print/pigments'
import { Backdrop, Caption, Part } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

/**
 * The three shared designs (the intrinsic state) of the fictional release in the code sample:
 * a red round lantern with lotuses, a yellow square one with a dragon, a pink round one with peach blossoms.
 */
export const DESIGNS = [
  { body: PIGMENT.red, trim: PIGMENT.yellow, tassel: PIGMENT.yellow, shape: 'round', motif: 'lotus' },
  { body: PIGMENT.yellow, trim: PIGMENT.red, tassel: PIGMENT.red, shape: 'square', motif: 'dragon' },
  { body: PIGMENT.pink, trim: PIGMENT.yellow, tassel: PIGMENT.red, shape: 'round', motif: 'blossom' },
] as const

type Design = 0 | 1 | 2

/** Underside of the stall's eave, where the designs hang. */
const BEAM = 152
const DESIGN_X = [444, 524, 604] as const
const DESIGN_Y = 222
const TASSEL_END = DESIGN_Y + 29 + 34
/** The far bank: the stall stands on it, the river runs in front. */
const RIVER = 300
const DECK = 356
const GIRL_X = 96

/** Floating lanterns on the river: x, waterline y, design, scale. */
const FLOATING: [number, number, Design, number][] = [
  [250, 404, 0, 1.1],
  [420, 412, 1, 1.2],
  [540, 408, 0, 1.25],
  [560, 318, 2, 0.8],
  [650, 356, 1, 1.15],
  [700, 318, 0, 0.8],
  [700, 414, 2, 1.3],
  [760, 350, 2, 1.0],
  [830, 322, 1, 0.8],
  [880, 366, 0, 1.05],
  [900, 414, 1, 1.25],
  [930, 330, 2, 0.75],
]

/** The pattern painted on a design, centred on 0,0 and about 34 units across. */
function motif(i: Design) {
  if (i === 0) {
    return (
      <g stroke={INK} strokeWidth={1.6} strokeLinejoin="round">
        <path d="M-15,12 Q0,20 15,12" fill="none" stroke={PIGMENT.green} strokeWidth={3} strokeLinecap="round" />
        <ellipse cx={-9} cy={2} rx={5.5} ry={11} transform="rotate(-38 -9 2)" fill={PAPER_LIGHT} />
        <ellipse cx={9} cy={2} rx={5.5} ry={11} transform="rotate(38 9 2)" fill={PAPER_LIGHT} />
        <ellipse cx={0} cy={-2} rx={6.5} ry={13} fill={PAPER_LIGHT} />
        <ellipse cx={0} cy={-5} rx={2.4} ry={5} fill={PIGMENT.pink} stroke="none" />
      </g>
    )
  }
  if (i === 1) {
    const body = 'M-17,12 C-11,-6 -3,16 4,0 S14,-14 15,-12'
    return (
      <g strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d={body} stroke={INK} strokeWidth={8} />
        <path d={body} stroke={PIGMENT.red} strokeWidth={4.5} />
        <circle cx={16} cy={-12} r={5} fill={PIGMENT.red} stroke={INK} strokeWidth={1.6} />
        <circle cx={17.5} cy={-13} r={1.2} fill={INK} />
        <circle cx={-13} cy={-11} r={3.6} fill={PAPER_LIGHT} stroke={INK} strokeWidth={1.4} />
      </g>
    )
  }
  return (
    <g stroke={INK} strokeWidth={1.3}>
      <path d="M-18,15 Q-10,9 -4,4" stroke={PIGMENT.woodDark} strokeWidth={3} fill="none" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map(k => {
        const a = (Math.PI * 2 * k) / 5 - Math.PI / 2
        return <circle key={k} cx={Math.cos(a) * 7.5} cy={-2 + Math.sin(a) * 7.5} r={5.5} fill={PAPER_LIGHT} />
      })}
      <circle cx={0} cy={-2} r={3.6} fill={PIGMENT.yellow} />
    </g>
  )
}

/** One shared design, drawn large, hanging from the stall's beam. */
function design(i: Design) {
  const d = DESIGNS[i]
  const x = DESIGN_X[i]
  const y = DESIGN_Y
  const top = y - 29
  const bottom = y + 29
  const tassel = `M${x},${bottom + 7} l-6,26 M${x},${bottom + 7} l0,28 M${x},${bottom + 7} l6,26`
  return (
    <g key={i}>
      <line x1={x} y1={BEAM + 9} x2={x} y2={top - 7} stroke={INK} strokeWidth={2.2} />
      {d.shape === 'round' ? (
        <g>
          <ellipse cx={x} cy={y} rx={31} ry={29} fill={d.body} stroke={INK} strokeWidth={3} />
          <ellipse cx={x} cy={y} rx={17} ry={29} fill="none" stroke={INK} strokeOpacity={0.35} strokeWidth={1.4} />
        </g>
      ) : (
        <g>
          <rect x={x - 28} y={top} width={56} height={58} rx={3} fill={d.body} stroke={INK} strokeWidth={3} />
          <path d={`M${x - 27},${top + 8} L${x + 27},${top + 8} M${x - 27},${bottom - 8} L${x + 27},${bottom - 8}`} stroke={PIGMENT.yellowDark} strokeWidth={1.6} />
        </g>
      )}
      <g transform={`translate(${x},${y})`}>{motif(i)}</g>
      <rect x={x - 15} y={top - 7} width={30} height={8} rx={2} fill={d.trim} stroke={INK} strokeWidth={2} />
      <rect x={x - 15} y={bottom - 1} width={30} height={8} rx={2} fill={d.trim} stroke={INK} strokeWidth={2} />
      <path d={tassel} stroke={INK} strokeWidth={4.4} strokeLinecap="round" />
      <path d={tassel} stroke={d.tassel} strokeWidth={2.4} strokeLinecap="round" />
    </g>
  )
}

/** A small floating lantern in one of the designs: its float, its candle and the wish tucked beside it. */
function floating(x: number, y: number, i: Design, s: number) {
  const d = DESIGNS[i]
  return (
    <g key={`${x}-${y}`} transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx={0} cy={3} rx={24} ry={4.5} fill="none" stroke={PAPER_LIGHT} strokeWidth={2} />
      <path d="M-18,0 Q-12,-7 -6,-3 Q0,-9 6,-3 Q12,-7 18,0 Q0,6 -18,0 Z" fill={PIGMENT.leaf} stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
      {d.shape === 'round'
        ? <ellipse cx={0} cy={-14} rx={11} ry={10.5} fill={d.body} stroke={INK} strokeWidth={2} />
        : <rect x={-10} y={-24} width={20} height={20} rx={2} fill={d.body} stroke={INK} strokeWidth={2} />}
      <g transform="translate(0,-14) scale(0.36)">{motif(i)}</g>
      <rect x={-6} y={-28} width={12} height={4} rx={1} fill={d.trim} stroke={INK} strokeWidth={1.2} />
      <path d="M0,-29 q-3,-4 0,-9 q3,5 0,9 Z" fill={PIGMENT.yellow} stroke={INK} strokeWidth={1} />
      <g transform="rotate(14 15 -6)">
        <rect x={12} y={-14} width={7} height={13} fill={PAPER_LIGHT} stroke={INK} strokeWidth={1.2} />
        <line x1={15.5} y1={-11} x2={15.5} y2={-4} stroke={PIGMENT.red} strokeWidth={1.2} />
      </g>
    </g>
  )
}

/** The Thu Bồn river: a flat pale band with printed ripples. */
function river() {
  const r = rng(8)
  return (
    <g>
      <rect x={0} y={RIVER} width={W} height={H - RIVER} fill={TINT.blue} />
      <rect x={236} y={RIVER - 10} width={W - 236} height={12} fill={TINT.ground} />
      <line x1={236} y1={RIVER + 1.5} x2={W} y2={RIVER + 1.5} stroke={TINT.groundEdge} strokeWidth={3} />
      {Array.from({ length: 18 }, (_, i) => {
        const x = r() * (W - 40)
        const y = RIVER + 24 + r() * (H - RIVER - 34)
        return <path key={i} d={`M${x},${y} q10,-5 20,0 t20,0`} fill="none" stroke={PAPER_LIGHT} strokeWidth={2} strokeLinecap="round" />
      })}
    </g>
  )
}

/** A small wooden sampan with a painted eye on the bow. `y` is the deck line. */
function sampan(cx: number, y: number) {
  return (
    <g stroke={INK} strokeLinejoin="round">
      <path d={`M${cx - 104},${y - 16} Q${cx - 84},${y + 26} ${cx},${y + 26} Q${cx + 84},${y + 26} ${cx + 104},${y - 16} L${cx + 88},${y} L${cx - 88},${y} Z`} fill={PIGMENT.wood} strokeWidth={3} />
      <path d={`M${cx - 92},${y + 7} Q${cx},${y + 17} ${cx + 92},${y + 7}`} fill="none" stroke={PIGMENT.woodDark} strokeWidth={3} />
      <ellipse cx={cx + 78} cy={y + 3} rx={6} ry={4} fill={PAPER_LIGHT} strokeWidth={1.6} />
      <circle cx={cx + 79} cy={y + 3} r={2} fill={INK} stroke="none" />
    </g>
  )
}

/** The stall: posts, roof, the vendor behind her counter and the pool box with one swatch per design. */
function stall() {
  return (
    <g>
      <g stroke={INK} strokeLinejoin="round">
        <rect x={250} y={BEAM} width={11} height={RIVER - BEAM} fill={PIGMENT.redDark} strokeWidth={2.6} />
        <rect x={639} y={BEAM} width={11} height={RIVER - BEAM} fill={PIGMENT.redDark} strokeWidth={2.6} />
        <rect x={244} y={BEAM} width={412} height={9} fill={PIGMENT.woodDark} strokeWidth={2.4} />
      </g>
      <Roof cx={450} y={BEAM} w={420} h={46} />
      <Person x={326} y={RIVER} s={1.15} robe={PIGMENT.green} pants={PIGMENT.greenDark} hat="bun" hatColor={PIGMENT.red} pose="reach" flip />
      <g stroke={INK} strokeLinejoin="round">
        <rect x={258} y={252} width={136} height={10} rx={2} fill={PIGMENT.wood} strokeWidth={2.6} />
        <rect x={264} y={262} width={124} height={38} fill={PIGMENT.red} strokeWidth={2.6} />
        <line x1={270} y1={270} x2={382} y2={270} stroke={PIGMENT.yellow} strokeWidth={1.8} />
        <line x1={270} y1={292} x2={382} y2={292} stroke={PIGMENT.yellow} strokeWidth={1.8} />
        <rect x={298} y={228} width={74} height={24} rx={3} fill={PIGMENT.redDark} strokeWidth={2.4} />
        {DESIGNS.map((d, i) => (
          <rect key={i} x={304 + i * 22} y={233} width={16} height={14} rx={2} fill={d.body} strokeWidth={1.4} />
        ))}
      </g>
    </g>
  )
}

const flyweight: SceneDefinition = {
  slug: 'flyweight',
  title: { en: 'Flyweight: thousands of lanterns, three shared designs', vi: 'Flyweight: hàng nghìn đèn lồng, ba mẫu dùng chung' },
  setting: 'night',
  pins: [
    { nodeId: 'client', methods: ['releaseLantern'], caption: { en: 'the lantern release on the river', vi: 'buổi thả đèn trên sông' }, at: [GIRL_X, 318], showName: false },
    { nodeId: 'factory', methods: ['getLantern'], caption: { en: 'the lantern stall and its pool', vi: 'sạp bán đèn và kho mẫu' }, at: [350, 126], side: 'left' },
    { nodeId: 'flyweight', caption: { en: '3 shared designs', vi: '3 mẫu đèn dùng chung' }, at: [DESIGN_X[1], 170], showName: false },
    { nodeId: 'context', methods: ['display'], caption: { en: 'keeps only its spot and wish', vi: 'chỉ giữ vị trí và lời ước' }, at: [800, 396], showName: false },
  ],
  calls: [
    { id: 'release', nodeId: 'client', method: 'releaseLantern', d: 'M14,196 C24,232 42,262 66,280' },
    { id: 'get', nodeId: 'factory', method: 'getLantern', d: 'M146,258 C178,230 214,224 246,232' },
    { id: 'hand-back', nodeId: 'factory', method: 'getLantern', kind: 'return', d: 'M246,284 C220,296 192,300 162,296' },
    { id: 'show', nodeId: 'context', method: 'display', d: 'M210,348 C340,334 520,336 624,350' },
    { id: 'paint', nodeId: 'flyweight', method: 'display', d: 'M636,316 C612,302 584,292 556,272' },
  ],
  steps: [
    {
      calls: ['release'],
      nodes: ['client'],
      at: [40, 160],
      caption: { en: 'The girl calls releaseLantern() with a spot, a wish and the design she wants: red, round, lotus.', vi: 'Cô gái gọi releaseLantern() với vị trí, lời ước và mẫu đèn mình muốn: đỏ, tròn, hoa sen.' },
    },
    {
      calls: ['get'],
      nodes: ['client', 'factory'],
      at: [196, 196],
      caption: { en: 'She never makes a design herself: she asks the stall with getLantern(color, shape, pattern).', vi: 'Cô không tự làm mẫu đèn: cô hỏi sạp đèn bằng getLantern(color, shape, pattern).' },
    },
    {
      calls: ['hand-back'],
      nodes: ['factory', 'flyweight', 'client'],
      at: [300, 322],
      caption: { en: 'The pool already holds that design, so the stall hands back the same shared one. It only makes a design the first time.', vi: 'Kho đã có mẫu đó, nên sạp trả lại đúng mẫu dùng chung. Sạp chỉ làm mẫu mới ở lần đầu tiên.' },
    },
    {
      calls: [],
      nodes: ['client', 'context', 'flyweight'],
      at: [320, 404],
      caption: { en: 'The new Lantern stores only its spot on the river and its wish, plus a link to its design.', vi: 'Chiếc Lantern mới chỉ lưu vị trí trên sông và lời ước, cùng một liên kết tới mẫu của nó.' },
    },
    {
      calls: ['show', 'paint'],
      nodes: ['client', 'context', 'flyweight'],
      at: [680, 280],
      caption: { en: 'display() asks each lantern to show itself; it passes x, y and wish to its design’s display().', vi: 'display() yêu cầu từng chiếc đèn hiện ra; đèn truyền x, y và wish vào display() của mẫu.' },
    },
  ],
  focus: [0, 100, 768, 320],
  untagged: [],
  Art: function FlyweightArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Moon x={880} y={54} r={22} />
          <Stars seed={21} count={16} x0={170} x1={820} y0={14} y1={86} />
          <Hall cx={830} y={RIVER - 8} w={190} h={60} roofH={42} pale />
          {river()}
          <Caption x={104} y={428}>{lang === 'vi' ? 'sông Thu Bồn' : 'Thu Bồn river'}</Caption>
        </Backdrop>

        {/* The stall that keeps the pool of designs */}
        <Part node="factory">{stall()}</Part>

        {/* The three shared designs, hanging large under the eave */}
        <Part node="flyweight">{([0, 1, 2] as const).map(design)}</Part>

        {/* Every floating lantern keeps its own spot and wish, and a thin line back to its design */}
        <Part node="context">
          <g strokeWidth={1.6} strokeDasharray="2 4" strokeLinecap="round">
            {FLOATING.map(([x, y, i, s]) => (
              <line key={`l${x}-${y}`} x1={x} y1={y - 38 * s} x2={DESIGN_X[i]} y2={TASSEL_END} stroke={DESIGNS[i].body} strokeOpacity={0.6} />
            ))}
          </g>
          {FLOATING.map(([x, y, i, s]) => floating(x, y, i, s))}
        </Part>

        {/* The festival girl on her boat */}
        <Part node="client">
          {sampan(104, DECK)}
          <Person x={GIRL_X} y={DECK} s={1.3} robe={PIGMENT.blue} pants={PAPER_LIGHT} hat="bun" hatColor={PIGMENT.red} pose="reach" />
        </Part>
      </>
    )
  },
}

export default flyweight
