import { Person } from './kit/figures'
import { Caption } from './kit/overlay'
import { C, INK, W } from './kit/palette'
import { Board, Lantern, Shelf, Table } from './kit/props'
import type { SceneArtProps, LegacySceneDefinition } from './types'

/** A rooster print on giấy điệp paper, `x, y` is the top-left corner. */
function rooster(x: number, y: number, body: string, w = 70, h = 90) {
  const s = w / 70
  return (
    <g transform={`translate(${x},${y}) scale(${s},${h / 90})`}>
      <rect width={70} height={90} fill="#f4e6c4" stroke={INK} strokeWidth={1.6} />
      <rect x={4} y={4} width={62} height={82} fill="none" stroke="#c9a96a" strokeWidth={0.8} />
      <path d="M24,50 C10,40 8,22 18,14 M24,52 C6,48 2,30 8,22 M26,48 C18,32 22,18 30,14" stroke={INK} strokeWidth={3.2} fill="none" strokeLinecap="round" />
      <path d="M24,50 C10,40 8,22 18,14 M24,52 C6,48 2,30 8,22 M26,48 C18,32 22,18 30,14" stroke="#1f6f4a" strokeWidth={1.8} fill="none" strokeLinecap="round" />
      <ellipse cx={36} cy={56} rx={16} ry={13} fill={body} stroke={INK} strokeWidth={1.6} />
      <path d="M30,54 q6,6 14,0" stroke={INK} strokeWidth={1} fill="none" />
      <circle cx={49} cy={40} r={6.5} fill={body} stroke={INK} strokeWidth={1.6} />
      <path d="M45,34 l2,-5 l2,4 l2,-5 l2,5" fill="#dc2626" stroke={INK} strokeWidth={0.8} />
      <path d="M55,40 l6,2 l-6,2 Z" fill="#f59e0b" stroke={INK} strokeWidth={0.8} />
      <circle cx={50} cy={39} r={1} fill={INK} />
      <path d="M33,68 l-2,12 M40,68 l2,12 M27,80 h8 M38,80 h8" stroke={INK} strokeWidth={1.6} />
      <rect x={52} y={70} width={10} height={14} fill="#c81e1e" opacity={0.85} />
    </g>
  )
}

/** The "mouse wedding" print: mice carrying a red palanquin. */
function mouseWedding(x: number, y: number, w = 96, h = 90) {
  const mouse = (mx: number, my: number) => (
    <g key={`${mx}-${my}`}>
      <ellipse cx={mx} cy={my} rx={7} ry={4.5} fill="#6b7280" stroke={INK} strokeWidth={1.1} />
      <circle cx={mx + 6} cy={my - 3} r={2.4} fill="#6b7280" stroke={INK} strokeWidth={0.9} />
      <path d={`M${mx - 7},${my} q-6,-1 -9,4`} stroke={INK} strokeWidth={0.9} fill="none" />
    </g>
  )
  return (
    <g transform={`translate(${x},${y}) scale(${w / 96},${h / 90})`}>
      <rect width={96} height={90} fill="#f4e6c4" stroke={INK} strokeWidth={1.6} />
      <rect x={4} y={4} width={88} height={82} fill="none" stroke="#c9a96a" strokeWidth={0.8} />
      <line x1={14} y1={46} x2={74} y2={46} stroke={C.wood} strokeWidth={2} />
      <rect x={34} y={30} width={22} height={16} fill="#c81e1e" stroke={INK} strokeWidth={1.2} />
      <path d="M32,30 L45,22 L58,30 Z" fill="#f59e0b" stroke={INK} strokeWidth={1} />
      {[[22, 52], [66, 52], [14, 70], [36, 70], [58, 70], [80, 70]].map(([mx, my]) => mouse(mx, my))}
      <path d="M78,26 q8,-10 12,0 q-6,4 -12,0 Z" fill="#f59e0b" stroke={INK} strokeWidth={0.8} />
    </g>
  )
}

/** A rolled master print lying on a shelf, with a hanging name slip. `x, y` is the left end of the roll. */
function masterPrint(x: number, y: number, slip: string, w = 48) {
  return (
    <g>
      <rect x={x} y={y - 12} width={w} height={12} rx={6} fill="#f4e6c4" stroke={INK} strokeWidth={1.4} />
      <ellipse cx={x + w} cy={y - 6} rx={3} ry={6} fill="#e6d3a8" stroke={INK} strokeWidth={1.1} />
      <line x1={x + 10} y1={y - 12} x2={x + 10} y2={y} stroke="#c9a96a" strokeWidth={1} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + 6} stroke={INK} strokeWidth={0.9} />
      <rect x={x + w / 2 - 6} y={y + 6} width={12} height={16} fill={slip} stroke={INK} strokeWidth={1} />
      <line x1={x + w / 2 - 3} y1={y + 11} x2={x + w / 2 + 3} y2={y + 11} stroke="#f4e6c4" strokeWidth={1} />
      <line x1={x + w / 2 - 3} y1={y + 15} x2={x + w / 2 + 3} y2={y + 15} stroke="#f4e6c4" strokeWidth={1} />
    </g>
  )
}

const DRY = [
  { x: 560, color: '#dc2626' },
  { x: 642, color: '#2563eb' },
  { x: 724, color: '#eab308' },
]

const prototype: LegacySceneDefinition = {
  slug: 'prototype',
  title: { en: 'Prototype: copying Đông Hồ master prints', vi: 'Prototype: nhân bản tranh mẫu Đông Hồ' },
  sky: 'interior',
  tags: [
    { nodeId: 'registry', method: 'get', caption: { en: 'master prints, by name', vi: 'tranh mẫu theo tên' }, at: [122, 104], to: [122, 168] },
    { nodeId: 'client', caption: { en: 'the printer', vi: 'người thợ in' }, at: [292, 412], to: [292, 362] },
    { nodeId: 'proto', method: 'clone', caption: { en: 'press a copy, never redraw', vi: 'in bản mới, không vẽ lại' }, at: [430, 246], to: [418, 328] },
    { nodeId: 'concA', caption: { en: 'same design, new colours', vi: 'cùng mẫu, màu khác' }, at: [646, 290], to: [640, 236] },
    { nodeId: 'concB', caption: { en: 'the mouse wedding', vi: 'đám cưới chuột' }, at: [856, 300], to: [868, 238] },
  ],
  calls: [
    { nodeId: 'registry', method: 'get', d: 'M282,296 C250,268 228,250 206,240', at: [246, 262] },
    { nodeId: 'proto', method: 'clone', d: 'M470,318 C510,300 538,268 556,240', at: [524, 296] },
  ],
  untagged: [],
  Art: function PrototypeArt({ lang }: SceneArtProps) {
    return (
      <g>
        {/* Workshop wall and floor */}
        <rect width={W} height={360} fill="#ded0ba" />
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1={i * 62 + 20} y1={0} x2={i * 62 + 20} y2={360} stroke="#8b755e" strokeWidth={1} opacity={0.28} />
        ))}
        <rect x={0} y={60} width={W} height={10} fill={C.woodDark} stroke={INK} strokeWidth={1.5} />
        <rect y={358} width={W} height={82} fill="#c6b090" />
        {[372, 392, 416].map(y => <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="#8b755e" strokeWidth={1} opacity={0.5} />)}

        <Board x={360} y={18} w={240} h={30}>
          <Caption x={480} y={38} size={13} fill={C.gold}>{lang === 'vi' ? 'Làng tranh Đông Hồ' : 'Đông Hồ print village'}</Caption>
        </Board>
        <Lantern x={320} y={110} r={12} cord={40} />
        <Lantern x={940} y={100} r={12} cord={30} color="#f2a03b" />

        {/* The registry: a shelf of rolled master prints, each with a name slip */}
        <Shelf x={40} y={360} w={164} h={196} rows={3} />
        {masterPrint(54, 199, '#a93c31')}
        {masterPrint(120, 199, '#9a7137')}
        {masterPrint(54, 248, '#356659')}
        {masterPrint(120, 248, '#a93c31')}
        {masterPrint(87, 297, '#9a7137')}

        {/* Printing table: a block pressed onto fresh paper */}
        <Table x={330} y={370} w={170} h={34} color={C.wood} />
        {rooster(372, 296, '#dc2626', 50, 32)}
        <rect x={430} y={300} width={52} height={26} rx={2} fill="#5b3418" stroke={INK} strokeWidth={1.6} />
        <rect x={446} y={290} width={20} height={10} rx={2} fill={C.woodDark} stroke={INK} strokeWidth={1.4} />
        {['#dc2626', '#2563eb', '#eab308'].map((c, i) => (
          <ellipse key={c} cx={350 + i * 14} cy={334} rx={6} ry={3} fill={c} stroke={INK} strokeWidth={1} />
        ))}
        <Person x={292} y={372} s={1.1} robe="#7a3b1e" pants="#2b2118" hat="khanXep" pose="work" />

        {/* Drying line: the same rooster block in different colours, and the mouse-wedding block */}
        <path d="M530,118 Q730,150 940,120" stroke={INK} strokeWidth={2} fill="none" />
        {DRY.map(({ x, color }) => (
          <g key={x}>
            {rooster(x, 140, color)}
            <rect x={x + 30} y={134} width={10} height={10} fill="#a16207" stroke={INK} strokeWidth={1} />
          </g>
        ))}
        {mouseWedding(820, 140)}
        <rect x={862} y={134} width={10} height={10} fill="#a16207" stroke={INK} strokeWidth={1} />
      </g>
    )
  },
}

export default prototype
