import { Person } from './print/figures'
import { rng } from './print/geometry'
import { GroundBand, LanternString } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT, TONES } from './print/pigments'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

/** The bowl's inside, in cross-section: a cone from the rim (y 150) to the base (y 360). */
const RIM = 150
const BASE = 360
const RIM_X: [number, number] = [300, 640]
const SLOPE = 110 / (BASE - RIM)
const left = (y: number) => RIM_X[0] + (y - RIM) * SLOPE
const right = (y: number) => RIM_X[1] - (y - RIM) * SLOPE

/** One band per object in the stack, outermost on top. */
const LAYER = {
  decD: [150, 186],
  decC: [186, 224],
  decB: [224, 262],
  decA: [262, 300],
  concrete: [300, BASE],
} as const
const mid = (id: keyof typeof LAYER) => (LAYER[id][0] + LAYER[id][1]) / 2

function band(id: keyof typeof LAYER, fill: string) {
  const [y0, y1] = LAYER[id]
  return <path d={`M${left(y0)},${y0} L${right(y0)},${y0} L${right(y1)},${y1} L${left(y1)},${y1} Z`} fill={fill} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
}

/** The price each layer adds, printed beside it. */
function price(id: keyof typeof LAYER, text: string) {
  return <Caption x={668} y={mid(id) + 6} anchor="start" fill={INK}>{text}</Caption>
}

const decorator: SceneDefinition = {
  slug: 'decorator',
  title: { en: 'Decorator: a bowl of phở, one topping at a time', vi: 'Decorator: bát phở, thêm từng món một' },
  setting: 'night',
  pins: [
    { nodeId: 'client', caption: { en: 'prints the bill, sees only a NoodleSoup', vi: 'in hóa đơn, chỉ thấy một NoodleSoup' }, at: [62, 362] },
    { nodeId: 'comp', methods: ['describe', 'price'], caption: { en: 'a bowl, plain or loaded', vi: 'bát phở không hoặc đủ món' }, at: [510, 44] },
    { nodeId: 'decorator', caption: { en: 'each topping wraps the bowl beneath it', vi: 'mỗi món thêm bọc lấy bát bên dưới' }, at: [918, 44], showName: false },
    { nodeId: 'decD', caption: { en: 'spring onion, the outer layer, +0đ', vi: 'hành lá, lớp ngoài cùng, +0đ' }, at: [380, mid('decD')], showName: false },
    { nodeId: 'decC', caption: { en: 'chili, +5.000đ', vi: 'ớt, +5.000đ' }, at: [570, mid('decC')], showName: false },
    { nodeId: 'decB', caption: { en: 'egg, +10.000đ', vi: 'trứng, +10.000đ' }, at: [482, mid('decB')], showName: false },
    { nodeId: 'decA', caption: { en: 'beef, +20.000đ', vi: 'thịt bò, +20.000đ' }, at: [398, mid('decA')], showName: false },
    { nodeId: 'concrete', caption: { en: 'plain phở, 40.000đ', vi: 'phở không, 40.000đ' }, at: [490, 345], showName: false },
  ],
  calls: [
    { id: 'price-onion', nodeId: 'decD', method: 'price', d: 'M206,262 C240,220 272,180 306,166' },
    { id: 'price-chili', nodeId: 'decC', method: 'price', d: 'M314,176 C276,180 282,204 334,208' },
    { id: 'price-egg', nodeId: 'decB', method: 'price', d: 'M333,214 C296,218 302,242 354,246' },
    { id: 'price-beef', nodeId: 'decA', method: 'price', d: 'M353,252 C316,256 322,280 374,284' },
    { id: 'price-plain', nodeId: 'concrete', method: 'price', d: 'M373,290 C330,296 344,330 400,334' },
    { id: 'ret-plain', nodeId: 'concrete', method: 'price', kind: 'return', d: 'M540,330 C590,330 600,292 568,288' },
    { id: 'ret-beef', nodeId: 'decA', method: 'price', kind: 'return', d: 'M566,278 C612,276 620,250 588,248' },
    { id: 'ret-egg', nodeId: 'decB', method: 'price', kind: 'return', d: 'M586,240 C632,238 640,212 608,210' },
    { id: 'ret-chili', nodeId: 'decC', method: 'price', kind: 'return', d: 'M606,202 C652,200 660,174 628,172' },
    { id: 'ret-onion', nodeId: 'decD', method: 'price', kind: 'return', d: 'M626,160 C590,112 250,108 166,240' },
  ],
  steps: [
    {
      calls: ['price-onion'],
      nodes: ['client', 'comp', 'decD'],
      at: [240, 196],
      caption: { en: 'printBill() asks the outer layer, the spring onion, for price(). It only sees a NoodleSoup.', vi: 'printBill() gọi price() ở lớp ngoài cùng là hành lá. Nó chỉ thấy một NoodleSoup.' },
    },
    {
      calls: ['price-chili', 'price-egg', 'price-beef', 'price-plain'],
      nodes: ['decD', 'decC', 'decB', 'decA', 'concrete', 'decorator'],
      at: [262, 250],
      caption: { en: 'Before adding anything, each topping asks the layer beneath it, down to the plain bowl.', vi: 'Trước khi cộng thêm, mỗi món hỏi lớp ngay bên dưới, cho tới bát phở không.' },
    },
    {
      calls: ['ret-plain'],
      nodes: ['concrete', 'decA'],
      at: [612, 322],
      caption: { en: 'The plain bowl answers 40.000đ.', vi: 'Bát phở không trả lời 40.000đ.' },
    },
    {
      calls: ['ret-beef', 'ret-egg', 'ret-chili'],
      nodes: ['decA', 'decB', 'decC', 'decD', 'decorator'],
      at: [646, 276],
      caption: { en: 'On the way back up each layer adds its price: +20.000 for beef, +10.000 for egg, +5.000 for chili.', vi: 'Trên đường trở lên, mỗi lớp cộng giá của mình: thịt bò +20.000, trứng +10.000, ớt +5.000.' },
    },
    {
      calls: ['ret-onion'],
      nodes: ['client', 'comp', 'decD'],
      at: [300, 140],
      caption: { en: 'Spring onion adds 0đ and the bill shows 75.000đ. printBill() never knew how many layers there were.', vi: 'Hành lá cộng 0đ và hóa đơn ghi 75.000đ. printBill() không hề biết bát có bao nhiêu lớp.' },
    },
  ],
  focus: [100, 110, 720, 300],
  untagged: [],
  Art: function DecoratorArt({ lang }: SceneArtProps) {
    const r = rng(17)
    const layerTicks = (['decD', 'decC', 'decB', 'decA'] as const).map(mid)
    return (
      <>
        <Backdrop>
          <LanternString x0={-10} x1={300} y={4} sag={14} count={4} />
          <GroundBand />
          <rect x={250} y={378} width={460} height={12} fill={TINT.amber} stroke={INK} strokeOpacity={0.4} strokeWidth={1.5} />
        </Backdrop>

        {/* The rail: the interface over the whole bowl, the base decorator over the four toppings */}
        <Part node="comp">
          <Signboard x={470} w={280} tone="interface" span={[318, 622]}>
            <Caption x={346} y={53} anchor="start">{lang === 'vi' ? 'một bát phở' : 'a bowl of phở'}</Caption>
          </Signboard>
        </Part>
        <Part node="decorator">
          <Signboard x={850} w={180} tone="abstract">
            <Caption x={838} y={53}>{lang === 'vi' ? 'mỗi món thêm' : 'each topping'}</Caption>
          </Signboard>
          <g fill="none" stroke={TONES.abstract} strokeWidth={3} strokeLinecap="round">
            <path d={`M790,64 L790,${LAYER.decD[0]} L790,${LAYER.decA[1]}`} />
            {layerTicks.map(y => (
              <path key={y} d={`M790,${y} L768,${y} M774,${y - 6} L768,${y} L774,${y + 6}`} />
            ))}
          </g>
        </Part>

        {/* The plain bowl: ceramic, broth and noodles */}
        <Part node="concrete">
          <path d={`M${RIM_X[0] - 14},${RIM - 4} L${RIM_X[1] + 14},${RIM - 4} L${right(BASE) + 8},${BASE + 6} L${left(BASE) - 8},${BASE + 6} Z`} fill={PAPER_LIGHT} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          <rect x={left(BASE) + 8} y={BASE + 6} width={right(BASE) - left(BASE) - 16} height={14} rx={2} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2.6} />
          <line x1={left(BASE) + 14} y1={BASE + 13} x2={right(BASE) - 14} y2={BASE + 13} stroke={PIGMENT.blue} strokeWidth={2} />
          {band('concrete', PIGMENT.amber)}
          {[312, 326, 340].map((y, i) => (
            <path
              key={y}
              d={`M${left(y) + 8},${y} q14,-7 28,0 t28,0 t28,0 t28,0 t28,0${y < 330 ? ' t28,0' : ''}`}
              stroke={PAPER_LIGHT}
              strokeWidth={3.2}
              fill="none"
              strokeLinecap="round"
              transform={i % 2 ? 'translate(6,0)' : undefined}
            />
          ))}
          {[430, 470, 510].map(x => (
            <path key={x} d={`M${x},${RIM - 14} q-8,-10 0,-20 q8,-10 0,-20`} stroke={TINT.ink} strokeWidth={3} fill="none" strokeLinecap="round" />
          ))}
          {price('concrete', '40.000đ')}
        </Part>

        {/* Beef: wraps the plain bowl */}
        <Part node="decA">
          {band('decA', TINT.amber)}
          {Array.from({ length: 5 }, (_, i) => (
            <ellipse key={i} cx={left(mid('decA')) + 30 + i * 33} cy={mid('decA') + (i % 2 ? 4 : -3)} rx={17} ry={7} fill={PIGMENT.redDark} stroke={INK} strokeWidth={1.6} />
          ))}
          {price('decA', '+20.000đ')}
        </Part>

        {/* Egg: wraps the beef */}
        <Part node="decB">
          {band('decB', TINT.yellow)}
          {[390, 470, 550].map(x => (
            <g key={x}>
              <ellipse cx={x} cy={mid('decB')} rx={22} ry={13} fill={PAPER_LIGHT} stroke={INK} strokeWidth={1.8} />
              <circle cx={x} cy={mid('decB')} r={7} fill={PIGMENT.yellow} stroke={INK} strokeWidth={1.2} />
            </g>
          ))}
          {price('decB', '+10.000đ')}
        </Part>

        {/* Chili: wraps the egg */}
        <Part node="decC">
          {band('decC', TINT.red)}
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={left(mid('decC')) + 26 + i * 31 + r() * 6} cy={mid('decC') + (r() - 0.5) * 10} r={7} fill="none" stroke={PIGMENT.red} strokeWidth={4} />
          ))}
          {price('decC', '+5.000đ')}
        </Part>

        {/* Spring onion: the outermost layer */}
        <Part node="decD">
          {band('decD', TINT.green)}
          {Array.from({ length: 18 }, (_, i) => (
            <rect key={i} x={left(mid('decD')) + 14 + i * 17 + r() * 5} y={mid('decD') - 5 + (r() - 0.5) * 10} width={10} height={6} rx={2} fill={PIGMENT.leaf} stroke={INK} strokeWidth={1.1} />
          ))}
          <line x1={RIM_X[0] - 14} y1={RIM - 4} x2={RIM_X[1] + 14} y2={RIM - 4} stroke={INK} strokeWidth={3} strokeLinecap="round" />
          {price('decD', '+0đ')}
        </Part>

        {/* The customer and the bill printBill() fills in */}
        <Part node="client">
          <Person x={88} y={378} s={1.3} robe={PIGMENT.blue} pants={PIGMENT.blueDark} hat="bun" pose="reach" />
          <g transform="rotate(-5 166 271)">
            <rect x={126} y={246} width={80} height={50} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2.4} />
            <line x1={134} y1={258} x2={196} y2={258} stroke={INK} strokeWidth={1.5} opacity={0.5} />
            <Caption x={166} y={286}>75.000đ</Caption>
          </g>
        </Part>
      </>
    )
  },
}

export default decorator
