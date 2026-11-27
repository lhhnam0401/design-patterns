import { Person } from './print/figures'
import { GroundBand, Grass } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './print/pigments'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const FEET = 378
const X = { client: 60, trad: 262, modern: 432, silk: 690, brocade: 850 } as const

/** A stack of three cloth bolts, `x` is the centre. */
function bolts(x: number, body: string, edge: string, motif: 'sheen' | 'diamond') {
  return (
    <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
      {[0, 1, 2].map(row => {
        const y = 290 + row * 30
        const dx = row === 1 ? 8 : 0
        return (
          <g key={row}>
            <rect x={x - 48 + dx} y={y} width={96} height={28} rx={14} fill={body} />
            <ellipse cx={x - 34 + dx} cy={y + 14} rx={8} ry={12} fill={edge} />
            {motif === 'sheen'
              ? <path d={`M${x - 20 + dx},${y + 8} q14,-5 28,0 t28,0 M${x - 20 + dx},${y + 20} q14,-5 28,0 t28,0`} fill="none" stroke={PAPER_LIGHT} strokeWidth={1.8} />
              : [0, 1, 2].map(i => <path key={i} d={`M${x - 12 + dx + i * 24},${y + 14} l8,-8 l8,8 l-8,8 Z`} fill={PIGMENT.yellow} strokeWidth={1.4} />)}
          </g>
        )
      })}
    </g>
  )
}

/** A small arched footbridge over a stream: the link between the two rows. */
function footbridge() {
  return (
    <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
      <path d="M490,386 Q560,396 640,386 L640,430 L490,430 Z" fill={TINT.blue} />
      <path d="M500,380 Q565,300 630,380 L610,380 Q565,330 520,380 Z" fill={TINT.amber} />
      <path d="M500,344 Q565,296 630,344" fill="none" strokeWidth={4} />
    </g>
  )
}

const bridge: SceneDefinition = {
  slug: 'bridge',
  title: { en: 'Bridge: áo dài styles and fabrics', vi: 'Bridge: kiểu dáng và chất liệu áo dài' },
  setting: 'dawn',
  pins: [
    { nodeId: 'client', caption: { en: 'the customer who orders a gown', vi: 'khách đặt may áo' }, at: [X.client, 322], showName: false },
    { nodeId: 'abstraction', methods: ['sew'], caption: { en: 'the pattern board: how a gown is cut', vi: 'bảng mẫu: cách cắt một chiếc áo' }, at: [216, 44], side: 'left' },
    { nodeId: 'refA', caption: { en: 'this variant: high collar, ankle-length flaps', vi: 'biến thể này: cổ cao, tà dài chấm gót' }, at: [X.trad, 326], showName: false },
    { nodeId: 'refB', methods: ['sew'], caption: { en: 'this variant: boat neck, knee-length flaps, lotus embroidery', vi: 'biến thể này: cổ thuyền, tà ngắn qua gối, thêu sen' }, at: [X.modern, 326], showName: false },
    { nodeId: 'impl', methods: ['cut', 'embroider'], caption: { en: 'the cloth any gown can be made from', vi: 'loại vải mà áo nào cũng dùng được' }, at: [646, 44], side: 'left' },
    { nodeId: 'ciA', caption: { en: 'smooth silk thread', vi: 'chỉ tơ mềm mượt' }, at: [X.silk, 336], showName: false },
    { nodeId: 'ciB', caption: { en: 'heavy brocade, gold thread', vi: 'gấm dày, chỉ kim tuyến' }, at: [X.brocade, 336], showName: false },
  ],
  calls: [
    { id: 'sew-t', nodeId: 'abstraction', method: 'sew', d: 'M118,298 L222,298' },
    { id: 'cut-silk', nodeId: 'impl', method: 'cut', d: 'M294,262 C350,170 560,170 640,286' },
    { id: 'cut-brocade', nodeId: 'impl', method: 'cut', d: 'M290,250 C380,80 780,100 812,278' },
    { id: 'sew-m', nodeId: 'refB', method: 'sew', d: 'M112,262 C170,150 300,150 396,262' },
    { id: 'embroider-m', nodeId: 'impl', method: 'embroider', d: 'M468,300 C560,240 700,230 806,296' },
  ],
  steps: [
    {
      calls: ['sew-t', 'cut-silk'],
      nodes: ['client', 'abstraction', 'refA', 'impl', 'ciA'],
      at: [170, 360],
      caption: { en: 'The traditional variant calls sew(), and its cut() crosses the link to the silk.', vi: 'Biến thể truyền thống gọi sew(), và lệnh cut() đi qua nhịp cầu sang lụa.' },
    },
    {
      calls: ['cut-brocade'],
      nodes: ['abstraction', 'refA', 'impl', 'ciB'],
      at: [560, 120],
      caption: { en: 'Swap silk for brocade: the same style calls cut() on the new fabric and needs no change.', vi: 'Đổi lụa sang gấm: cùng kiểu áo gọi cut() trên chất liệu mới mà không phải sửa.' },
    },
    {
      calls: ['sew-m', 'embroider-m'],
      nodes: ['client', 'abstraction', 'refB', 'impl', 'ciB'],
      at: [560, 230],
      caption: { en: 'The modern variant calls sew() the same way and adds embroider() across the link.', vi: 'Biến thể cách tân gọi sew() theo cùng cách và thêm embroider() qua nhịp cầu.' },
    },
  ],
  focus: [0, 56, 960, 384],
  untagged: [],
  Art: function BridgeArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <GroundBand />
          <Grass x0={120} x1={220} seed={3} count={4} />
          {footbridge()}
        </Backdrop>
        <Part node="abstraction">
          <Signboard x={330} w={260} tone="class" span={[X.trad, X.modern]}>
            <Caption x={345} y={53}>{lang === 'vi' ? 'Bảng mẫu áo' : 'Pattern board'}</Caption>
          </Signboard>
        </Part>
        <Part node="impl">
          <Signboard x={770} w={280} tone="interface" span={[X.silk, X.brocade]}>
            <Caption x={786} y={53}>{lang === 'vi' ? 'Các loại vải' : 'Bolts of cloth'}</Caption>
          </Signboard>
        </Part>
        <Part node="client">
          <Person x={X.client} y={FEET} s={1.25} robe={PIGMENT.amber} pants={PIGMENT.woodDark} hat="khanXep" pose="point" />
        </Part>
        <Part node="refA">
          <Person x={X.trad} y={FEET} s={1.25} robe={PIGMENT.blue} pants={PIGMENT.white} hat="bun" pose="stand">
            <rect x={-6} y={-76} width={12} height={9} fill={PIGMENT.blueDark} stroke={INK} strokeWidth={1.6} />
          </Person>
        </Part>
        <Part node="refB">
          <Person x={X.modern} y={FEET} s={1.25} robe={PIGMENT.green} pants={PIGMENT.white} hat="bun" long={false} pose="stand">
            <path d="M-12,-70 Q0,-62 12,-70" fill="none" stroke={INK} strokeWidth={1.8} />
            <path d="M-8,-34 q4,-6 8,0 q4,-6 8,0" fill="none" stroke={PIGMENT.yellow} strokeWidth={2} />
          </Person>
        </Part>
        <Part node="ciA">{bolts(X.silk, PIGMENT.pink, PIGMENT.red, 'sheen')}</Part>
        <Part node="ciB">{bolts(X.brocade, PIGMENT.red, PIGMENT.redDark, 'diamond')}</Part>
      </>
    )
  },
}

export default bridge
