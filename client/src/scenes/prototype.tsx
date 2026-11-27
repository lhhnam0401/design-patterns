import type { ReactNode } from 'react'
import { Person } from './print/figures'
import { GroundBand, LanternString } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './print/pigments'
import { Shelf, Table } from './print/props'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const FEET = 372
const X = { printer: 80, shelf: 292, rooster: 578, mouse: 796 } as const
const PRINT_TOP = 150
const PRINT_W = 120
const PRINT_H = 150

const tr = (lang: SceneArtProps['lang'], en: string, vi: string) => (lang === 'vi' ? vi : en)

/** A hanging giấy điệp print: paper on a rod, with an inner ruled border. Children draw the picture. */
function printCard(cx: number, topY: number, children: ReactNode) {
  const left = cx - PRINT_W / 2
  return (
    <g>
      <rect x={left - 7} y={topY - 11} width={PRINT_W + 14} height={9} rx={4} fill={PIGMENT.wood} stroke={INK} strokeWidth={2.2} />
      <rect x={left} y={topY} width={PRINT_W} height={PRINT_H} fill={PAPER_LIGHT} stroke={INK} strokeWidth={3} />
      <rect x={left + 6} y={topY + 6} width={PRINT_W - 12} height={PRINT_H - 12} fill="none" stroke={PIGMENT.straw} strokeWidth={1.8} />
      {children}
    </g>
  )
}

/** The rooster woodblock picture, centred in its card. `extra` adds a recolour swatch. */
function roosterPicture(cx: number, topY: number, body: string, extra?: string) {
  const bx = cx - 8
  const by = topY + 96
  return (
    <g>
      {/* green tail sweep */}
      <path d={`M${bx - 18},${by - 4} C${bx - 46},${by - 16} ${bx - 50},${by - 52} ${bx - 30},${by - 72} M${bx - 14},${by - 2} C${bx - 34},${by - 24} ${bx - 34},${by - 54} ${bx - 18},${by - 70} M${bx - 10},${by - 2} C${bx - 20},${by - 26} ${bx - 14},${by - 52} ${bx - 2},${by - 64}`} fill="none" stroke={PIGMENT.greenDark} strokeWidth={5} strokeLinecap="round" />
      <path d={`M${bx - 18},${by - 4} C${bx - 46},${by - 16} ${bx - 50},${by - 52} ${bx - 30},${by - 72}`} fill="none" stroke={PIGMENT.leaf} strokeWidth={2.4} strokeLinecap="round" />
      {/* body */}
      <ellipse cx={bx} cy={by} rx={30} ry={24} fill={body} stroke={INK} strokeWidth={2.6} />
      <path d={`M${bx - 14},${by - 4} q14,10 28,0`} fill="none" stroke={INK} strokeWidth={1.4} />
      {/* head and comb */}
      <circle cx={bx + 28} cy={by - 22} r={13} fill={body} stroke={INK} strokeWidth={2.6} />
      <path d={`M${bx + 20},${by - 32} l3,-9 l4,7 l4,-9 l4,8 l4,-6`} fill="none" stroke={PIGMENT.red} strokeWidth={3} strokeLinejoin="round" />
      <path d={`M${bx + 40},${by - 22} l12,3 l-12,4 Z`} fill={PIGMENT.yellow} stroke={INK} strokeWidth={1.2} />
      <circle cx={bx + 31} cy={by - 24} r={2} fill={INK} />
      {/* legs */}
      <path d={`M${bx - 2},${by + 22} l-3,16 M${bx + 10},${by + 22} l3,16 M${bx - 11},${by + 38} h10 M${bx + 5},${by + 38} h10`} stroke={INK} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      {/* red seal block, and an optional recolour swatch */}
      <rect x={cx + 34} y={topY + 20} width={14} height={18} fill={PIGMENT.red} stroke={INK} strokeWidth={1.4} />
      {extra && <rect x={cx + 34} y={topY + 42} width={14} height={14} fill={extra} stroke={INK} strokeWidth={1.4} />}
    </g>
  )
}

/** The mouse-wedding woodblock picture, centred in its card. */
function mousePicture(cx: number, topY: number) {
  const left = cx - 44
  const mouse = (mx: number, my: number) => (
    <g key={`${mx}-${my}`}>
      <ellipse cx={mx} cy={my} rx={9} ry={5.5} fill={PIGMENT.stone} stroke={INK} strokeWidth={1.4} />
      <circle cx={mx + 8} cy={my - 4} r={3.2} fill={PIGMENT.stone} stroke={INK} strokeWidth={1.2} />
      <path d={`M${mx - 9},${my} q-7,-1 -11,5`} stroke={INK} strokeWidth={1.1} fill="none" />
    </g>
  )
  return (
    <g>
      <line x1={left} y1={topY + 70} x2={left + 88} y2={topY + 70} stroke={PIGMENT.wood} strokeWidth={3} />
      {/* the red palanquin with a yellow roof */}
      <rect x={cx - 15} y={topY + 44} width={30} height={22} fill={PIGMENT.red} stroke={INK} strokeWidth={1.8} />
      <path d={`M${cx - 20},${topY + 44} L${cx},${topY + 32} L${cx + 20},${topY + 44} Z`} fill={PIGMENT.yellow} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
      {/* a parasol */}
      <path d={`M${left + 78},${topY + 34} q10,-12 20,0 Z`} fill={PIGMENT.yellow} stroke={INK} strokeWidth={1.4} />
      <line x1={left + 88} y1={topY + 34} x2={left + 88} y2={topY + 60} stroke={INK} strokeWidth={1.4} />
      {[[left + 20, topY + 78], [cx, topY + 90], [left + 68, topY + 78], [left + 10, topY + 100], [left + 40, topY + 104], [left + 74, topY + 100]].map(([mx, my]) => mouse(mx, my))}
    </g>
  )
}

/** A rolled master print lying on a shelf, with a coloured name slip hanging below. */
function masterPrint(x: number, y: number, slip: string, w = 46) {
  return (
    <g>
      <rect x={x} y={y - 12} width={w} height={12} rx={6} fill={PAPER_LIGHT} stroke={INK} strokeWidth={1.8} />
      <ellipse cx={x + w} cy={y - 6} rx={3.5} ry={6} fill={TINT.groundEdge} stroke={INK} strokeWidth={1.4} />
      <rect x={x + w / 2 - 6} y={y} width={12} height={15} fill={slip} stroke={INK} strokeWidth={1.2} />
    </g>
  )
}

const prototype: SceneDefinition = {
  slug: 'prototype',
  title: { en: 'Prototype: copying Đông Hồ master prints', vi: 'Prototype: nhân bản tranh mẫu Đông Hồ' },
  setting: 'interior',
  pins: [
    { nodeId: 'client', caption: { en: 'the printer orders prints by name', vi: 'người thợ in gọi tranh theo tên' }, at: [X.printer, 316], showName: false },
    { nodeId: 'registry', methods: ['add', 'get'], caption: { en: 'a shelf of master prints, by name', vi: 'kệ tranh mẫu, xếp theo tên' }, at: [X.shelf, 292], showName: false },
    { nodeId: 'proto', methods: ['clone', 'describe'], caption: { en: 'copy it, never redraw it', vi: 'sao chép, không vẽ lại' }, at: [600, 44], showName: false },
    { nodeId: 'concA', methods: ['clone'], caption: { en: 'the rooster print', vi: 'tranh gà trống' }, at: [X.rooster, 250], showName: false },
    { nodeId: 'concB', methods: ['clone'], caption: { en: 'the mouse wedding print', vi: 'tranh đám cưới chuột' }, at: [X.mouse, 250], showName: false },
  ],
  calls: [
    { id: 'get', nodeId: 'registry', method: 'get', d: 'M108,300 C158,272 212,276 246,286' },
    { id: 'clone-r', nodeId: 'concA', method: 'clone', d: 'M362,250 C440,222 482,222 532,228' },
    { id: 'clone-m', nodeId: 'concB', method: 'clone', d: 'M360,238 C470,152 650,158 748,212' },
  ],
  steps: [
    {
      calls: ['get'],
      nodes: ['client', 'registry'],
      at: [162, 240],
      caption: { en: 'The printer asks the registry for a print by name with get("ga"). He never names its class.', vi: 'Người thợ in xin registry một tranh theo tên bằng get("ga"). Anh không hề nêu tên lớp của nó.' },
    },
    {
      calls: ['clone-r'],
      nodes: ['registry', 'proto', 'concA'],
      at: [432, 186],
      caption: { en: 'The registry calls clone() on its rooster master, which returns a fresh copy of itself.', vi: 'Registry gọi clone() trên tờ gà trống mẫu, và tờ mẫu trả về một bản sao mới của chính nó.' },
    },
    {
      calls: [],
      nodes: ['concA', 'registry'],
      at: [490, 300],
      caption: { en: 'One copy gets an extra colour. The copy has its own colour list, so the master on the shelf is unchanged.', vi: 'Một bản sao được thêm màu. Bản sao có danh sách màu riêng, nên tờ mẫu trên kệ vẫn nguyên.' },
    },
    {
      calls: ['get', 'clone-m'],
      nodes: ['client', 'registry', 'proto', 'concB'],
      at: [470, 128],
      caption: { en: 'get("chuot") then clone() copies the mouse-wedding master the same way, with no new class.', vi: 'get("chuot") rồi clone() nhân bản tờ mẫu đám cưới chuột theo cách đó, không cần lớp mới nào.' },
    },
  ],
  focus: [160, 96, 700, 300],
  untagged: [],
  Art: function PrototypeArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <LanternString x0={-10} x1={320} y={6} sag={14} count={4} />
          <GroundBand />
          <rect x={430} y={300} width={430} height={10} fill={TINT.amber} stroke={INK} strokeOpacity={0.4} strokeWidth={1.5} />
          {/* the drying line the fresh copies hang from */}
          <line x1={500} y1={PRINT_TOP - 12} x2={880} y2={PRINT_TOP - 12} stroke={TINT.ink} strokeWidth={2} />
        </Backdrop>

        {/* The abstract painting over the two concrete prints */}
        <Part node="proto">
          <Signboard x={685} w={300} tone="abstract" span={[X.rooster, X.mouse]} ticks={[X.rooster, X.mouse]}>
            <Caption x={705} y={53}>{tr(lang, 'Any folk print', 'Tranh dân gian')}</Caption>
          </Signboard>
        </Part>

        {/* The printer (client) at his press */}
        <Part node="client">
          <Person x={X.printer} y={FEET} s={1.2} robe={PIGMENT.wood} pants={PIGMENT.woodDark} hat="khanXep" pose="work" />
          <Table x={116} y={FEET} w={96} color={PIGMENT.wood} />
          <rect x={132} y={FEET - 44} width={44} height={16} rx={2} fill={PIGMENT.woodDark} stroke={INK} strokeWidth={1.8} />
          {[PIGMENT.red, PIGMENT.blue, PIGMENT.yellow].map((c, i) => (
            <ellipse key={c} cx={128 + i * 18} cy={FEET - 20} rx={6} ry={3.2} fill={c} stroke={INK} strokeWidth={1.2} />
          ))}
        </Part>

        {/* The registry: a shelf of rolled master prints */}
        <Part node="registry">
          <Shelf x={X.shelf - 70} y={FEET} w={140} h={200} rows={3} />
          {masterPrint(X.shelf - 56, 214, PIGMENT.red)}
          {masterPrint(X.shelf + 2, 214, PIGMENT.green)}
          {masterPrint(X.shelf - 56, 262, PIGMENT.yellow)}
          {masterPrint(X.shelf + 2, 262, PIGMENT.blue)}
          {masterPrint(X.shelf - 28, 310, PIGMENT.red)}
        </Part>

        {/* The rooster copy (ConcretePrototype A) */}
        <Part node="concA">
          {printCard(X.rooster, PRINT_TOP, roosterPicture(X.rooster, PRINT_TOP, PIGMENT.red, PIGMENT.blue))}
        </Part>

        {/* The mouse-wedding copy (ConcretePrototype B) */}
        <Part node="concB">
          {printCard(X.mouse, PRINT_TOP, mousePicture(X.mouse, PRINT_TOP))}
        </Part>
      </>
    )
  },
}

export default prototype
