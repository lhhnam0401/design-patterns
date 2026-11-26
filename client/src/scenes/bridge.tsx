import { Person } from './kit/figures'
import { Caption } from './kit/overlay'
import { C, INK, W } from './kit/palette'
import { Lantern, Table } from './kit/props'
import type { SceneArtProps, LegacySceneDefinition } from './types'

/** An áo dài on a dress form. `cx, top` is the shoulder line; `fabric` decides the look. */
function aoDai(cx: number, top: number, color: string, modern: boolean, s = 1, brocade = false) {
  const flap = modern ? 104 : 150
  return (
    <g transform={`translate(${cx},${top}) scale(${s})`}>
      <line x1={0} y1={150} x2={0} y2={190} stroke={INK} strokeWidth={4} />
      <ellipse cx={0} cy={192} rx={22} ry={5} fill={C.woodDark} stroke={INK} strokeWidth={1.5} />
      <ellipse cx={0} cy={-20} rx={9} ry={12} fill="#d6c3a5" stroke={INK} strokeWidth={1.5} />
      <rect x={-14} y={40} width={28} height={110} fill="#f8fafc" stroke={INK} strokeWidth={1.5} />
      <path
        d={`M-17,0 Q0,-6 17,0 L${modern ? 20 : 26},${modern ? 30 : 60} L${modern ? 15 : 20},${modern ? 34 : 64} L13,30 L11,40 L12,${flap} L-12,${flap} L-11,40 L-13,30 L${modern ? -15 : -20},${modern ? 34 : 64} L${modern ? -20 : -26},${modern ? 30 : 60} Z`}
        fill={color}
        stroke={INK}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <rect x={-5} y={-9} width={10} height={9} fill={color} stroke={INK} strokeWidth={1.4} />
      <path d={`M0,0 Q8,10 12,24`} stroke={INK} strokeWidth={1} fill="none" />
      {brocade && Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={-7 + (i % 3) * 7} cy={14 + Math.floor(i / 3) * 22} r={2.2} fill={C.gold} stroke={INK} strokeWidth={0.5} />
      ))}
      {!brocade && <path d={`M-8,8 Q-2,40 -6,${flap - 10}`} stroke="#fff" strokeOpacity={0.35} strokeWidth={3} fill="none" />}
    </g>
  )
}

/** A rolled bolt of cloth lying on a shelf. */
function bolt(x: number, y: number, color: string, brocade: boolean) {
  return (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={70} height={26} rx={4} fill={color} stroke={INK} strokeWidth={1.6} />
      <ellipse cx={x + 70} cy={y + 13} rx={6} ry={13} fill={color} stroke={INK} strokeWidth={1.4} />
      <ellipse cx={x + 70} cy={y + 13} rx={2} ry={5} fill={INK} opacity={0.5} />
      {brocade
        ? [10, 26, 42, 58].map(dx => <path key={dx} d={`M${x + dx},${y + 13} l4,-6 l4,6 l-4,6 Z`} fill={C.gold} stroke={INK} strokeWidth={0.6} />)
        : <path d={`M${x + 6},${y + 7} H${x + 60}`} stroke="#fff" strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round" />}
    </g>
  )
}

const bridge: LegacySceneDefinition = {
  slug: 'bridge',
  title: { en: 'Bridge: áo dài styles and fabrics vary on their own', vi: 'Bridge: kiểu áo dài và loại vải thay đổi độc lập' },
  sky: 'interior',
  tags: [
    { nodeId: 'abstraction', method: 'sew', caption: { en: 'the style: a cutting pattern', vi: 'kiểu may: bộ rập cắt' }, at: [350, 54], to: [350, 98] },
    { nodeId: 'impl', caption: { en: 'any fabric', vi: 'loại vải bất kỳ' }, at: [770, 54], to: [770, 92] },
    { nodeId: 'refA', caption: { en: 'long, high collar', vi: 'tà dài, cổ cao' }, at: [92, 112], to: [92, 160] },
    { nodeId: 'refB', method: 'sew', caption: { en: 'shorter, modern cut', vi: 'tà ngắn, dáng hiện đại' }, at: [214, 410], to: [206, 352] },
    { nodeId: 'ciA', caption: { en: 'smooth silk', vi: 'lụa trơn' }, at: [586, 214], to: [656, 140] },
    { nodeId: 'ciB', caption: { en: 'woven brocade', vi: 'gấm dệt hoa' }, at: [586, 276], to: [656, 252] },
    { nodeId: 'client', caption: { en: 'places an order', vi: 'khách đặt may' }, at: [334, 268], to: [334, 318] },
  ],
  calls: [
    { nodeId: 'impl', method: 'cut', d: 'M404,118 C460,40 590,40 646,104', at: [524, 66] },
    { nodeId: 'impl', method: 'embroider', d: 'M404,168 C470,112 580,112 646,176', at: [524, 128] },
  ],
  untagged: [],
  Art: function BridgeArt({ lang }: SceneArtProps) {
    return (
      <g>
        <rect width={W} height={360} fill="#ded0ba" />
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1={i * 62 + 30} y1={0} x2={i * 62 + 30} y2={360} stroke="#8b755e" strokeWidth={1} opacity={0.28} />
        ))}
        <rect y={358} width={W} height={82} fill="#c6b090" />
        {[374, 398, 424].map(y => <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="#8b755e" strokeWidth={1} opacity={0.5} />)}
        <Lantern x={480} y={210} r={11} cord={30} />

        {/* Two styles on dress forms */}
        {aoDai(92, 168, '#b91c1c', false, 0.95)}
        {aoDai(206, 168, '#7c3aed', true, 0.95)}

        {/* The pattern board: the style, independent of any fabric */}
        <rect x={300} y={96} width={104} height={110} rx={4} fill={C.paper} stroke={INK} strokeWidth={2.5} />
        <g fill="none" stroke="#7c2d12" strokeWidth={1.4} strokeDasharray="4 3">
          <path d="M318,112 L340,108 L344,150 L330,196 L316,196 Z" />
          <path d="M386,112 L364,108 L360,150 L374,196 L388,196 Z" />
          <path d="M346,120 L358,120 L356,190 L348,190 Z" />
        </g>
        <circle cx={352} cy={104} r={3} fill="#c81e1e" />

        {/* The fabric shelf */}
        <rect x={640} y={88} width={268} height={252} fill={C.woodDark} stroke={INK} strokeWidth={2.5} />
        <rect x={648} y={96} width={252} height={236} fill="#b99b78" />
        <rect x={644} y={208} width={260} height={6} fill={C.wood} stroke={INK} strokeWidth={1} />
        <rect x={644} y={330} width={260} height={6} fill={C.wood} stroke={INK} strokeWidth={1} />
        {[['#f9a8d4', 656, 126], ['#93c5fd', 740, 126], ['#fde68a', 824, 126], ['#fbcfe8', 698, 178], ['#a7f3d0', 782, 178]].map(([c, x, y]) => bolt(x as number, y as number, c as string, false))}
        {[['#7f1d1d', 656, 248], ['#1e3a8a', 740, 248], ['#14532d', 824, 248], ['#581c87', 698, 300], ['#7c2d12', 782, 300]].map(([c, x, y]) => bolt(x as number, y as number, c as string, true))}

        {/* The tailor works at the cutting table */}
        <Person x={500} y={394} s={1.06} robe="#334155" hat="topknot" pose="work">
          <path d="M22,-52 l10,-10 M22,-52 l12,-4" stroke="#cbd5e1" strokeWidth={2} />
        </Person>
        <Table x={420} y={406} w={190} h={34} color={C.wood} />
        <path d="M434,364 L520,360 L560,368 L470,372 Z" fill="#f9a8d4" stroke={INK} strokeWidth={1.4} />

        {/* The customer */}
        <Person x={334} y={426} s={1.04} robe="#0f766e" hat="nonLa" pose="point" flip />

        {/* Four combinations from two styles and two fabrics */}
        <line x1={650} y1={352} x2={930} y2={352} stroke={INK} strokeWidth={3} />
        <line x1={650} y1={352} x2={650} y2={432} stroke={INK} strokeWidth={3} />
        <line x1={930} y1={352} x2={930} y2={432} stroke={INK} strokeWidth={3} />
        {aoDai(684, 368, '#f9a8d4', false, 0.36)}
        {aoDai(752, 368, '#f9a8d4', true, 0.36)}
        {aoDai(828, 368, '#7f1d1d', false, 0.36, true)}
        {aoDai(896, 368, '#7f1d1d', true, 0.36, true)}
        <Caption x={790} y={436} size={10} fill={C.gold}>{lang === 'vi' ? '4 kiểu áo, chỉ cần 2 + 2 lớp' : '4 dresses from 2 + 2 classes'}</Caption>
      </g>
    )
  },
}

export default bridge
