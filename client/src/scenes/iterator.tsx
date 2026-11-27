import { Person } from './print/figures'
import { smooth } from './print/geometry'
import { GroundBand, Grass } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './print/pigments'
import { Lantern } from './print/props'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { Point, SceneArtProps, SceneDefinition } from './types'

const FEET = 378
const GUIDE = { district: 300, era: 430 } as const

/** The sites on the map, in scene coordinates. */
const SITE = {
  thanh: [630, 206] as Point,
  chua: [716, 262] as Point,
  mieu: [648, 330] as Point,
  ho: [852, 300] as Point,
  lang: [800, 198] as Point,
}
const BY_DISTRICT: (keyof typeof SITE)[] = ['ho', 'thanh', 'chua', 'lang', 'mieu']
const BY_ERA: (keyof typeof SITE)[] = ['thanh', 'chua', 'mieu', 'ho', 'lang']

/** A route ribbon through the sites in one order, shifted a little so the two don't overlap. */
function route(order: (keyof typeof SITE)[], off: number): string {
  return smooth(order.map(k => [SITE[k][0] + off, SITE[k][1] + off] as Point))
}

/** A small swallow-tail pennant on a pole; `x, y` is the foot of the pole. */
function pennant(x: number, y: number, color: string, trim: string) {
  const top = y - 128
  return (
    <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
      <line x1={x} y1={y} x2={x} y2={top} stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <line x1={x} y1={y} x2={x} y2={top} stroke={PIGMENT.wood} strokeWidth={2.6} strokeLinecap="round" />
      <path d={`M${x + 2},${top} L${x + 50},${top + 6} L${x + 40},${top + 18} L${x + 50},${top + 30} L${x + 2},${top + 36} Z`} fill={color} />
      <line x1={x + 8} y1={top + 10} x2={x + 40} y2={top + 13} stroke={trim} strokeWidth={2.6} />
    </g>
  )
}

/** The landmark icons drawn on the map; each is a flat pigment shape with an ink outline. */
function citadel([x, y]: Point) {
  return (
    <g stroke={INK} strokeWidth={2.6} strokeLinejoin="round">
      <rect x={x - 24} y={y - 14} width={48} height={22} fill={PIGMENT.tile} />
      <rect x={x - 7} y={y - 8} width={14} height={16} fill={PIGMENT.woodDark} />
      <path d={`M${x - 28},${y - 14} L${x + 28},${y - 14} L${x + 18},${y - 28} L${x - 18},${y - 28} Z`} fill={PIGMENT.red} />
      <rect x={x - 6} y={y - 40} width={12} height={12} fill={PIGMENT.red} />
    </g>
  )
}
function pagoda([x, y]: Point) {
  return (
    <g stroke={INK} strokeWidth={2.6} strokeLinejoin="round">
      <ellipse cx={x} cy={y + 8} rx={26} ry={8} fill={TINT.blue} />
      <rect x={x - 4} y={y - 14} width={8} height={22} fill={PIGMENT.woodDark} />
      <rect x={x - 14} y={y - 26} width={28} height={14} fill={PIGMENT.red} />
      <path d={`M${x - 20},${y - 26} L${x + 20},${y - 26} L${x + 11},${y - 38} L${x - 11},${y - 38} Z`} fill={PIGMENT.tile} />
    </g>
  )
}
function temple([x, y]: Point) {
  return (
    <g stroke={INK} strokeWidth={2.6} strokeLinejoin="round">
      <rect x={x - 16} y={y - 16} width={32} height={22} fill={PIGMENT.red} />
      <circle cx={x} cy={y - 24} r={6} fill="none" stroke={PIGMENT.yellow} strokeWidth={2.4} />
      <path d={`M${x - 22},${y - 16} L${x + 22},${y - 16} L${x + 13},${y - 26} L${x - 13},${y - 26} Z`} fill={PIGMENT.tile} />
      <path d={`M${x - 17},${y - 32} L${x + 17},${y - 32} L${x + 9},${y - 42} L${x - 9},${y - 42} Z`} fill={PIGMENT.tile} />
    </g>
  )
}
function lake([x, y]: Point) {
  return (
    <g stroke={INK} strokeWidth={2.6} strokeLinejoin="round">
      <ellipse cx={x} cy={y} rx={48} ry={28} fill={TINT.blue} />
      <ellipse cx={x + 8} cy={y + 4} rx={9} ry={5} fill={PIGMENT.green} />
      <rect x={x + 4} y={y - 12} width={9} height={12} fill={PIGMENT.stone} />
      <path d={`M${x - 42},${y - 16} Q${x - 28},${y - 30} ${x - 14},${y - 18}`} fill="none" stroke={PIGMENT.red} strokeWidth={3} />
    </g>
  )
}
function mausoleum([x, y]: Point) {
  return (
    <g stroke={INK} strokeWidth={2.6} strokeLinejoin="round">
      <rect x={x - 26} y={y - 24} width={52} height={28} fill={PIGMENT.stone} />
      <rect x={x - 26} y={y - 30} width={52} height={7} fill={PIGMENT.stoneDark} />
      {[-16, 0, 16].map(dx => <rect key={dx} x={x + dx - 3} y={y - 22} width={6} height={24} fill={PIGMENT.stoneDark} />)}
    </g>
  )
}

const iterator: SceneDefinition = {
  slug: 'iterator',
  title: { en: 'Iterator: two ways to tour Hanoi’s historic sites', vi: 'Iterator: hai cách đi thăm di tích Hà Nội' },
  setting: 'interior',
  pins: [
    { nodeId: 'client', methods: ['visit'], caption: { en: 'the same code for any route', vi: 'một đoạn mã cho mọi lộ trình' }, at: [95, 330] },
    { nodeId: 'coll', caption: { en: 'hands out tour routes', vi: 'cung cấp các lộ trình tham quan' }, at: [605, 44], showName: false },
    { nodeId: 'concColl', methods: ['add'], caption: { en: 'the sites, kept by district', vi: 'các di tích, lưu theo quận' }, at: [730, 232], showName: false },
    { nodeId: 'iter', methods: ['hasMore'], caption: { en: 'any route: a next stop?', vi: 'lộ trình nào cũng hỏi: còn điểm nào?' }, at: [230, 44], showName: false },
    { nodeId: 'iterA', caption: { en: 'district by district', vi: 'đi lần lượt từng quận' }, at: [GUIDE.district, 330], showName: false },
    { nodeId: 'iterB', caption: { en: 'oldest to newest', vi: 'từ cổ nhất đến mới nhất' }, at: [GUIDE.era, 330], showName: false },
  ],
  calls: [
    { id: 'make-d', nodeId: 'concColl', method: 'byDistrictIterator', d: 'M128,296 C190,276 240,284 272,300' },
    { id: 'make-e', nodeId: 'concColl', method: 'byEraIterator', d: 'M130,312 C214,332 340,332 402,318' },
    { id: 'has-d', nodeId: 'iterA', method: 'hasMore', d: 'M322,292 C410,252 486,224 566,212' },
    { id: 'next-d', nodeId: 'iterA', method: 'getNext', d: 'M330,312 C420,300 492,286 564,268' },
    { id: 'has-e', nodeId: 'iterB', method: 'hasMore', d: 'M454,300 C500,292 528,298 560,302' },
    { id: 'next-e', nodeId: 'iterB', method: 'getNext', d: 'M460,316 C502,322 528,318 560,314' },
  ],
  steps: [
    {
      calls: ['make-d'],
      nodes: ['client', 'coll', 'concColl', 'iterA'],
      at: [210, 250],
      caption: { en: 'The tourist asks the collection for a district route; byDistrictIterator() hands back a ByDistrictIterator.', vi: 'Du khách yêu cầu tập hợp một lộ trình theo quận; byDistrictIterator() trả về một ByDistrictIterator.' },
    },
    {
      calls: ['has-d', 'next-d'],
      nodes: ['client', 'iter', 'iterA', 'concColl'],
      at: [372, 232],
      caption: { en: 'visit() loops: hasMore() asks if a stop is left, getNext() takes the next site, district by district.', vi: 'visit() lặp: hasMore() hỏi còn điểm không, getNext() lấy di tích kế tiếp, lần lượt từng quận.' },
    },
    {
      calls: ['make-e'],
      nodes: ['client', 'coll', 'concColl', 'iterB'],
      at: [268, 150],
      caption: { en: 'The same tourist calls byEraIterator() and gets a second iterator over the same sites.', vi: 'Vẫn du khách ấy gọi byEraIterator(): một iterator thứ hai duyệt đúng những di tích đó.' },
    },
    {
      calls: ['has-e', 'next-e'],
      nodes: ['client', 'iter', 'iterB', 'concColl'],
      at: [500, 170],
      caption: { en: 'The same visit() code now walks the sites from oldest to newest: the iterator alone decides the order.', vi: 'Cùng đoạn visit() ấy giờ đi từ di tích cổ nhất đến mới nhất: chính iterator quyết định thứ tự.' },
    },
  ],
  focus: [240, 110, 680, 290],
  untagged: [],
  Art: function IteratorArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Lantern x={70} y={60} r={12} cord={34} pale />
          <Lantern x={520} y={54} r={10} cord={24} pale />
          <GroundBand />
          <Grass x0={150} x1={200} seed={4} count={3} color={TINT.amber} />
        </Backdrop>

        {/* The rail: the collection interface over the map, the iterator interface over the two routes */}
        <Part node="coll">
          <Signboard x={730} w={300} tone="interface" span={[690, 770]} ticks={[730]}>
            <Caption x={745} y={53}>{lang === 'vi' ? 'Nguồn các di tích' : 'The sites to tour'}</Caption>
          </Signboard>
        </Part>
        <Part node="iter">
          <Signboard x={375} w={320} tone="interface" span={[GUIDE.district, GUIDE.era]} ticks={[GUIDE.district, GUIDE.era]}>
            <Caption x={390} y={53}>{lang === 'vi' ? 'Mọi lộ trình cùng hỏi' : 'Every route asks the same'}</Caption>
          </Signboard>
        </Part>

        {/* The Hanoi map: a hung scroll with district tints and five landmarks */}
        <Part node="concColl">
          <rect x={560} y={150} width={352} height={216} fill={PAPER_LIGHT} stroke={INK} strokeWidth={3} />
          <rect x={548} y={144} width={376} height={10} rx={5} fill={PIGMENT.wood} stroke={INK} strokeWidth={2.4} />
          <rect x={548} y={362} width={376} height={10} rx={5} fill={PIGMENT.wood} stroke={INK} strokeWidth={2.4} />
          <path d="M600,176 Q640,190 648,236 Q656,286 636,336" fill={TINT.green} opacity={0.5} stroke="none" />
          <ellipse cx={792} cy={250} rx={96} ry={92} fill={TINT.amber} opacity={0.4} />
          <path d="M700,150 C690,210 712,270 702,366" stroke={TINT.blue} strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.7} />
          {citadel(SITE.thanh)}
          {pagoda(SITE.chua)}
          {temple(SITE.mieu)}
          {lake(SITE.ho)}
          {mausoleum(SITE.lang)}
        </Part>

        {/* District route: a red ribbon and its guide, walking grouped by district */}
        <Part node="iterA">
          <path d={route(BY_DISTRICT, -5)} fill="none" stroke={PIGMENT.red} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          <Person x={GUIDE.district} y={FEET} s={1.2} robe={PIGMENT.red} pants={PIGMENT.woodDark} hat="nonLa" long={false} pose="point">
            {pennant(28, -2, PIGMENT.red, PIGMENT.yellow)}
          </Person>
        </Part>

        {/* Era route: an ochre dashed ribbon and its guide, oldest to newest */}
        <Part node="iterB">
          <path d={route(BY_ERA, 5)} fill="none" stroke={PIGMENT.amber} strokeWidth={5} strokeDasharray="12 7" strokeLinecap="round" strokeLinejoin="round" />
          <Person x={GUIDE.era} y={FEET} s={1.2} robe={PIGMENT.amber} pants={PIGMENT.woodDark} hat="nonLa" long={false} pose="point">
            {pennant(28, -2, PIGMENT.amber, PIGMENT.redDark)}
          </Person>
        </Part>

        {/* The tourist, whose visit() code never changes */}
        <Part node="client">
          <Person x={95} y={FEET} s={1.25} robe={PIGMENT.blue} pants={PIGMENT.blueDark} hat="khanXep" pose="hold">
            <rect x={-16} y={-70} width={32} height={22} rx={2} fill={PIGMENT.red} stroke={INK} strokeWidth={2} />
            <line x1={0} y1={-70} x2={0} y2={-48} stroke={INK} strokeWidth={1.6} />
          </Person>
        </Part>
      </>
    )
  },
}

export default iterator
