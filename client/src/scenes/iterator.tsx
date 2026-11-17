import { Person } from './kit/figures'
import { smooth } from './kit/geometry'
import { Caption } from './kit/overlay'
import { C, INK } from './kit/palette'
import type { SceneArtProps, SceneDefinition } from './types'

type P = [number, number]
const SITES: Record<string, { at: P; year: string; name: { en: string; vi: string } }> = {
  thanh: { at: [200, 160], year: '1010', name: { en: 'Thăng Long Citadel', vi: 'Hoàng Thành' } },
  chua: { at: [306, 226], year: '1049', name: { en: 'One Pillar Pagoda', vi: 'Chùa Một Cột' } },
  mieu: { at: [300, 340], year: '1070', name: { en: 'Temple of Literature', vi: 'Văn Miếu' } },
  ho: { at: [690, 300], year: '1428', name: { en: 'Hoàn Kiếm Lake', vi: 'Hồ Gươm' } },
  lang: { at: [400, 136], year: '1975', name: { en: 'Hồ Chí Minh Mausoleum', vi: 'Lăng Bác' } },
}
const BY_DISTRICT = ['ho', 'thanh', 'chua', 'lang', 'mieu']
const BY_ERA = ['thanh', 'chua', 'mieu', 'ho', 'lang']

function route(order: string[], offset: number): string {
  return smooth(order.map(k => [SITES[k].at[0] + offset, SITES[k].at[1] + offset] as P))
}

function icon(kind: string, [x, y]: P) {
  switch (kind) {
    case 'thanh':
      return (
        <g>
          <rect x={x - 22} y={y - 14} width={44} height={20} fill="#9a4126" stroke={INK} strokeWidth={1.5} />
          <path d={`M${x - 6},${y + 6} v-10 q6,-6 12,0 v10 Z`} fill={INK} />
          <path d={`M${x - 26},${y - 14} L${x + 26},${y - 14} L${x + 18},${y - 24} L${x - 18},${y - 24} Z`} fill={C.tile} stroke={INK} strokeWidth={1.5} />
        </g>
      )
    case 'chua':
      return (
        <g>
          <ellipse cx={x} cy={y + 6} rx={24} ry={7} fill="#5b8fb9" stroke={INK} strokeWidth={1.2} />
          <rect x={x - 3} y={y - 10} width={6} height={16} fill={C.stone} stroke={INK} strokeWidth={1.2} />
          <rect x={x - 11} y={y - 20} width={22} height={10} fill="#9a4126" stroke={INK} strokeWidth={1.2} />
          <path d={`M${x - 16},${y - 20} L${x + 16},${y - 20} L${x + 8},${y - 30} L${x - 8},${y - 30} Z`} fill={C.tile} stroke={INK} strokeWidth={1.2} />
        </g>
      )
    case 'mieu':
      return (
        <g>
          <rect x={x - 12} y={y - 14} width={24} height={20} fill="#9a4126" stroke={INK} strokeWidth={1.4} />
          <circle cx={x} cy={y - 22} r={6} fill="none" stroke={INK} strokeWidth={1.4} />
          <path d={`M${x - 18},${y - 14} L${x + 18},${y - 14} L${x + 10},${y - 20} L${x - 10},${y - 20} Z`} fill={C.tile} stroke={INK} strokeWidth={1.2} />
          <path d={`M${x - 14},${y - 28} L${x + 14},${y - 28} L${x + 7},${y - 36} L${x - 7},${y - 36} Z`} fill={C.tile} stroke={INK} strokeWidth={1.2} />
        </g>
      )
    case 'ho':
      return (
        <g>
          <ellipse cx={x} cy={y} rx={56} ry={34} fill="#5b8fb9" stroke={INK} strokeWidth={1.6} />
          <ellipse cx={x + 6} cy={y + 4} rx={8} ry={4} fill="#4d7c0f" stroke={INK} strokeWidth={1} />
          <rect x={x + 2} y={y - 8} width={8} height={10} fill="#d6c3a5" stroke={INK} strokeWidth={1} />
          <path d={`M${x - 50},${y - 22} Q${x - 36},${y - 36} ${x - 22},${y - 26}`} stroke="#dc2626" strokeWidth={3} fill="none" />
        </g>
      )
    default:
      return (
        <g>
          <rect x={x - 22} y={y - 12} width={44} height={18} fill="#9ca3af" stroke={INK} strokeWidth={1.5} />
          {[-14, -5, 4, 13].map(dx => <rect key={dx} x={x + dx - 1.5} y={y - 10} width={3} height={14} fill="#4b5563" />)}
          <rect x={x - 26} y={y - 18} width={52} height={6} fill="#6b7280" stroke={INK} strokeWidth={1.2} />
        </g>
      )
  }
}

const iterator: SceneDefinition = {
  slug: 'iterator',
  title: { en: 'Iterator: two ways to tour Hanoi’s historic sites', vi: 'Iterator: hai cách đi thăm di tích Hà Nội' },
  sky: 'interior',
  tags: [
    { nodeId: 'concColl', method: 'add', caption: { en: 'the sites, kept by district', vi: 'di tích, lưu theo quận' }, at: [136, 60], to: [150, 100] },
    { nodeId: 'coll', caption: { en: 'hands out tour routes', vi: 'cung cấp các lộ trình' }, at: [310, 60], to: [250, 100] },
    { nodeId: 'iter', method: 'hasMore', caption: { en: 'any route: next stop?', vi: 'lộ trình nào cũng hỏi: còn điểm nào?' }, at: [826, 164], to: [826, 116] },
    { nodeId: 'iterA', caption: { en: 'district by district', vi: 'đi lần lượt từng quận' }, at: [610, 156], to: [586, 246] },
    { nodeId: 'iterB', caption: { en: 'oldest to newest', vi: 'từ cổ nhất đến mới nhất' }, at: [470, 410], to: [496, 320] },
    { nodeId: 'client', method: 'visit', caption: { en: 'the same code for any route', vi: 'một đoạn mã cho mọi lộ trình' }, at: [700, 412], to: [858, 336] },
  ],
  calls: [
    { nodeId: 'iter', method: 'getNext', d: 'M862,332 C830,318 790,306 752,300', at: [812, 288] },
  ],
  untagged: [],
  Art: function IteratorArt({ lang }: SceneArtProps) {
    return (
      <g>
        <rect width={960} height={440} fill="#2b170d" />
        {/* The map scroll */}
        <rect x={40} y={34} width={880} height={372} fill="#efdcae" stroke={INK} strokeWidth={2.5} />
        <rect x={50} y={44} width={860} height={352} fill="none" stroke="#b08a4a" strokeWidth={1.2} />
        <rect x={30} y={26} width={900} height={12} rx={6} fill={C.wood} stroke={INK} strokeWidth={2} />
        <rect x={30} y={402} width={900} height={12} rx={6} fill={C.wood} stroke={INK} strokeWidth={2} />

        {/* Districts */}
        <g fill="none" stroke="#a16207" strokeWidth={1.6} strokeDasharray="7 5">
          <path d="M90,100 L470,100 L470,256 L90,256 Z" />
          <path d="M90,270 L470,270 L470,380 L90,380 Z" />
          <path d="M560,220 L860,220 L860,380 L560,380 Z" />
        </g>
        <Caption x={110} y={248} size={12} anchor="start" fill="#7c2d12">Ba Đình</Caption>
        <Caption x={110} y={292} size={12} anchor="start" fill="#7c2d12">Đống Đa</Caption>
        <Caption x={580} y={242} size={12} anchor="start" fill="#7c2d12">Hoàn Kiếm</Caption>
        <path d="M480,60 C470,160 520,260 500,400" stroke="#8fb3d9" strokeWidth={10} fill="none" opacity={0.6} />

        {/* Map title cartouche */}
        <rect x={110} y={100} width={170} height={22} rx={3} fill={C.lacquer} stroke={INK} strokeWidth={1.6} />
        <Caption x={195} y={116} size={12} fill={C.gold}>{lang === 'vi' ? 'Bản đồ Hà Nội' : 'Map of Hanoi'}</Caption>

        {/* The two routes */}
        <path d={route(BY_DISTRICT, -4)} stroke="#dc2626" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.85} />
        <path d={route(BY_ERA, 4)} stroke="#b45309" strokeWidth={3} fill="none" strokeDasharray="9 6" strokeLinecap="round" />

        {Object.entries(SITES).map(([k, s]) => (
          <g key={k}>
            {icon(k, s.at)}
            <Caption x={s.at[0]} y={s.at[1] + (k === 'ho' ? 50 : 24)} size={10} fill="#3f2a14">{s.name[lang]}</Caption>
            <rect x={s.at[0] + 24} y={s.at[1] - 34} width={34} height={15} rx={7} fill="#b45309" stroke={INK} strokeWidth={1} />
            <Caption x={s.at[0] + 41} y={s.at[1] - 23} size={10} fill="#fff7ed">{s.year}</Caption>
          </g>
        ))}

        {/* Legend */}
        <rect x={740} y={56} width={170} height={58} rx={4} fill="#f6ead2" stroke={INK} strokeWidth={1.5} />
        <line x1={752} y1={76} x2={790} y2={76} stroke="#dc2626" strokeWidth={4} />
        <line x1={752} y1={98} x2={790} y2={98} stroke="#b45309" strokeWidth={3} strokeDasharray="9 6" />
        <Caption x={798} y={80} size={11} anchor="start" fill="#3f2a14">{lang === 'vi' ? 'theo quận' : 'by district'}</Caption>
        <Caption x={798} y={102} size={11} anchor="start" fill="#3f2a14">{lang === 'vi' ? 'theo niên đại' : 'by era'}</Caption>

        {/* The tourist with a guidebook */}
        <Person x={880} y={432} s={1.1} robe="#0f766e" pants="#1f2937" hat="nonLa" pose="hold">
          <rect x={-12} y={-66} width={24} height={16} fill="#dc2626" stroke={INK} strokeWidth={1.2} />
        </Person>
      </g>
    )
  },
}

export default iterator
