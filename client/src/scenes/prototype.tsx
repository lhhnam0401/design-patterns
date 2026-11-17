import { Person } from './kit/figures'
import { Caption } from './kit/overlay'
import { C, INK, W } from './kit/palette'
import { Board, Lantern, Shelf, Table } from './kit/props'
import type { SceneArtProps, SceneDefinition } from './types'

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

/** A carved woodblock seen from the front. */
function block(x: number, y: number, w = 52, h = 38) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} fill="#5b3418" stroke={INK} strokeWidth={1.6} />
      <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} fill="#7a4a24" stroke={INK} strokeWidth={0.8} />
      <path d={`M${x + 12},${y + h - 10} q8,-18 20,-12 q8,4 10,-6`} stroke="#c08a4a" strokeWidth={2} fill="none" />
      <circle cx={x + w - 14} cy={y + 12} r={3} fill="#c08a4a" />
    </g>
  )
}

const DRY = [
  { x: 560, color: '#dc2626' },
  { x: 642, color: '#2563eb' },
  { x: 724, color: '#eab308' },
]

const prototype: SceneDefinition = {
  slug: 'prototype',
  title: { en: 'Prototype: printing copies from a Đông Hồ woodblock', vi: 'Prototype: in tranh Đông Hồ từ bản khắc gỗ' },
  sky: 'interior',
  tags: [
    { nodeId: 'registry', method: 'get', caption: { en: 'carved blocks, by name', vi: 'các bản khắc theo tên' }, at: [122, 104], to: [122, 168] },
    { nodeId: 'client', caption: { en: 'the printer', vi: 'người thợ in' }, at: [292, 412], to: [292, 362] },
    { nodeId: 'proto', method: 'clone', caption: { en: 'press a copy, never redraw', vi: 'in bản mới, không vẽ lại' }, at: [430, 246], to: [418, 328] },
    { nodeId: 'concA', caption: { en: 'same block, new colours', vi: 'cùng bản khắc, màu khác' }, at: [646, 290], to: [640, 236] },
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
        <rect width={W} height={360} fill="#2b170d" />
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1={i * 62 + 20} y1={0} x2={i * 62 + 20} y2={360} stroke="#1a0d07" strokeWidth={3} />
        ))}
        <rect x={0} y={60} width={W} height={10} fill={C.woodDark} stroke={INK} strokeWidth={1.5} />
        <rect y={358} width={W} height={82} fill="#5a3a22" />
        {[372, 392, 416].map(y => <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="#3e2615" strokeWidth={2} />)}

        <Board x={360} y={18} w={240} h={30}>
          <Caption x={480} y={38} size={13} fill={C.gold}>{lang === 'vi' ? 'Làng tranh Đông Hồ' : 'Đông Hồ print village'}</Caption>
        </Board>
        <Lantern x={320} y={110} r={12} cord={40} />
        <Lantern x={940} y={100} r={12} cord={30} color="#f2a03b" />

        {/* The registry: a shelf of named woodblocks */}
        <Shelf x={40} y={360} w={164} h={196} rows={3} />
        {block(52, 175)}
        {block(116, 175)}
        {block(52, 224)}
        {block(116, 224)}
        {block(84, 273)}

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
