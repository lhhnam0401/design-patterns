import { Roof } from './print/architecture'
import { Person } from './print/figures'
import { Cloud, Grass, GroundBand, Hills } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT, TONES } from './print/pigments'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

/** The villager at the foot of the stairs, then one official per step, rising to the right. */
const VILLAGER = { x: 80, feet: 378 } as const
const RANK = {
  h1: { x: 280, feet: 352 },
  h2: { x: 460, feet: 326 },
  h3: { x: 640, feet: 300 },
  h4: { x: 830, feet: 274 },
} as const
const RANK_X = Object.values(RANK).map(r => r.x)

/** The rail: the interface board on the left, the base class board over the four officials. */
const IFACE_BOARD = { x: 200, w: 200 } as const
const BASE_BOARD = { x: 560, w: 300 } as const

const tr = (lang: SceneArtProps['lang'], en: string, vi: string) => (lang === 'vi' ? vi : en)

/** The petition: an open scroll with ruled lines, a red seal and four level marks, one filled. */
function petition(x: number, y: number) {
  const w = 58
  const h = 86
  return (
    <g stroke={INK} strokeLinejoin="round">
      <rect x={x} y={y} width={w} height={h} fill={PAPER_LIGHT} strokeWidth={2.6} />
      <rect x={x - 5} y={y - 4} width={w + 10} height={8} rx={4} fill={PIGMENT.wood} strokeWidth={2} />
      <rect x={x - 5} y={y + h - 4} width={w + 10} height={8} rx={4} fill={PIGMENT.wood} strokeWidth={2} />
      {[0, 1, 2].map(i => (
        <line key={i} x1={x + 9} y1={y + 34 + i * 12} x2={x + w - 9} y2={y + 34 + i * 12} strokeWidth={2.2} strokeLinecap="round" />
      ))}
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={x + 9 + i * 11} y={y + h - 20} width={8} height={8} fill={i === 0 ? PIGMENT.red : PAPER_LIGHT} strokeWidth={1.4} />
      ))}
    </g>
  )
}

/** A red parasol of state over the Emperor. `x` is the pole, `top` the canopy's crown. */
function parasol(x: number, top: number, feet: number) {
  return (
    <g stroke={INK} strokeLinejoin="round">
      <line x1={x} y1={top} x2={x} y2={feet} strokeWidth={5.5} strokeLinecap="round" />
      <line x1={x} y1={top} x2={x} y2={feet} stroke={PIGMENT.wood} strokeWidth={3} strokeLinecap="round" />
      <path d={`M${x - 44},${top + 22} Q${x},${top - 8} ${x + 44},${top + 22} Z`} fill={PIGMENT.red} strokeWidth={3} />
      <path d={`M${x - 44},${top + 22} L${x + 44},${top + 22} L${x + 40},${top + 30} L${x - 40},${top + 30} Z`} fill={PIGMENT.yellow} strokeWidth={2} />
    </g>
  )
}

const chain: SceneDefinition = {
  slug: 'chain-of-responsibility',
  title: { en: 'Chain of Responsibility: a petition climbs a fictional court', vi: 'Chain of Responsibility: lá đơn đi lên một triều đình hư cấu' },
  setting: 'dawn',
  pins: [
    { nodeId: 'client', methods: ['filePetition'], caption: { en: 'a villager files it', vi: 'người dân nộp đơn' }, at: [VILLAGER.x, 336], showName: false },
    { nodeId: 'req', caption: { en: 'level + content', vi: 'mức độ + nội dung' }, at: [149, 226], showName: false },
    { nodeId: 'handler', methods: ['setSuperior'], caption: { en: 'each knows the next one up', vi: 'mỗi quan biết cấp trên' }, at: [126, 44], showName: false },
    { nodeId: 'base', methods: ['handle'], caption: { en: 'passes it up by default', vi: 'mặc định chuyển lên trên' }, at: [434, 44], showName: false },
    { nodeId: 'h1', caption: { en: 'settles level 1', vi: 'xử đơn mức 1' }, at: [RANK.h1.x, RANK.h1.feet - 34], showName: false },
    { nodeId: 'h2', caption: { en: 'up to level 2', vi: 'xử tới mức 2' }, at: [RANK.h2.x, RANK.h2.feet - 34], showName: false },
    { nodeId: 'h3', caption: { en: 'up to level 3', vi: 'xử tới mức 3' }, at: [RANK.h3.x, RANK.h3.feet - 34], showName: false },
    { nodeId: 'h4', caption: { en: 'up to level 4', vi: 'xử tới mức 4' }, at: [RANK.h4.x, RANK.h4.feet - 34], showName: false },
  ],
  calls: [
    { id: 'file', nodeId: 'client', method: 'filePetition', d: 'M12,232 C18,262 30,290 50,306' },
    { id: 'chief', nodeId: 'h1', method: 'handle', d: 'M182,276 C206,272 230,278 250,290' },
    { id: 'magistrate', nodeId: 'h2', method: 'handle', d: 'M306,282 C350,252 396,246 432,256' },
    { id: 'prefect', nodeId: 'h3', method: 'handle', d: 'M486,256 C530,226 576,220 612,230' },
    { id: 'emperor', nodeId: 'h4', method: 'handle', d: 'M666,230 C712,200 760,194 800,204' },
    { id: 'unresolved', nodeId: 'base', method: 'handle', kind: 'return', d: 'M884,256 C934,300 930,414 780,420 L180,420 C140,420 118,408 110,390' },
  ],
  steps: [
    {
      calls: ['file', 'chief'],
      nodes: ['client', 'req', 'handler', 'h1'],
      at: [226, 236],
      caption: { en: 'filePetition() hands a level-1 field quarrel to the village chief’s handle(). He may settle it, so it goes no further.', vi: 'filePetition() trao vụ tranh chấp bờ ruộng mức 1 cho handle() của xã trưởng. Ông đủ quyền giải quyết, nên đơn dừng ở đó.' },
    },
    {
      calls: ['chief', 'magistrate'],
      nodes: ['req', 'h1', 'base', 'h2'],
      at: [370, 214],
      caption: { en: 'A stolen buffalo is level 2: the chief’s handle() falls back on BaseOfficial and passes it up. The magistrate settles it.', vi: 'Mất trộm trâu là mức 2: handle() của xã trưởng gọi lại BaseOfficial để chuyển đơn lên. Quan huyện xử vụ này.' },
    },
    {
      calls: ['chief', 'magistrate', 'prefect'],
      nodes: ['req', 'h1', 'h2', 'base', 'h3'],
      at: [550, 188],
      caption: { en: 'A dyke about to break is level 3. It passes the chief and the magistrate and stops at the prefect.', vi: 'Đê sắp vỡ là mức 3. Đơn đi qua xã trưởng và quan huyện rồi dừng ở tri phủ.' },
    },
    {
      calls: ['chief', 'magistrate', 'prefect', 'emperor'],
      nodes: ['req', 'h1', 'h2', 'h3', 'base', 'h4'],
      at: [735, 162],
      caption: { en: 'An invasion is level 4: every official below passes it up, and the Emperor decides.', vi: 'Giặc tràn qua biên giới là mức 4: mọi quan bên dưới đều chuyển lên, và Hoàng đế quyết định.' },
    },
    {
      calls: ['chief', 'magistrate', 'prefect', 'emperor', 'unresolved'],
      nodes: ['client', 'req', 'h1', 'h2', 'h3', 'h4', 'base'],
      at: [520, 392],
      caption: { en: 'Nobody may grant rain. Past the Emperor there is no superior, so handle() returns null and the villager gets nothing.', vi: 'Không ai có quyền làm mưa. Trên Hoàng đế không còn cấp nào, nên handle() trả về null và người dân ra về tay không.' },
    },
  ],
  focus: [0, 40, 960, 400],
  untagged: [],
  Art: function ChainArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Cloud x={720} y={150} s={0.8} />
          <Hills y={250} amp={30} seed={7} step={160} />
          <GroundBand />
          {/* The stone stairs, one step per rank */}
          <path
            d={`M190,380 L190,${RANK.h1.feet} L370,${RANK.h1.feet} L370,${RANK.h2.feet} L550,${RANK.h2.feet} L550,${RANK.h3.feet} L730,${RANK.h3.feet} L730,${RANK.h4.feet} L960,${RANK.h4.feet} L960,380 Z`}
            fill={TINT.ground}
            stroke={TINT.groundEdge}
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <Roof cx={880} y={RANK.h4.feet - 150} w={150} h={34} pale />
          <Grass x0={10} x1={170} seed={3} count={5} />
          {([
            ['h1', 'village', 'xã'],
            ['h2', 'district', 'huyện'],
            ['h3', 'province', 'phủ'],
            ['h4', 'court', 'triều đình'],
          ] as const).map(([id, en, vi]) => (
            <Caption key={id} x={RANK[id].x} y={RANK[id].feet + 21} fill={INK}>{tr(lang, en, vi)}</Caption>
          ))}
        </Backdrop>

        {/* The rail: the interface realized by the base class, which every official extends */}
        <Part node="handler">
          <Signboard x={IFACE_BOARD.x} w={IFACE_BOARD.w} tone="interface">
            <Caption x={IFACE_BOARD.x + 14} y={53}>{tr(lang, 'Every rank', 'Mọi cấp quan')}</Caption>
          </Signboard>
          <path
            d={`M${IFACE_BOARD.x + IFACE_BOARD.w / 2},39 L${BASE_BOARD.x - BASE_BOARD.w / 2 - 4},39 M${BASE_BOARD.x - BASE_BOARD.w / 2 - 12},31 L${BASE_BOARD.x - BASE_BOARD.w / 2 - 4},39 L${BASE_BOARD.x - BASE_BOARD.w / 2 - 12},47`}
            fill="none"
            stroke={TONES.interface}
            strokeWidth={3}
            strokeDasharray="8 6"
            strokeLinecap="round"
          />
        </Part>
        <Part node="base">
          <Signboard x={BASE_BOARD.x} w={BASE_BOARD.w} tone="abstract" span={[RANK.h1.x, RANK.h4.x]} ticks={RANK_X}>
            <Caption x={BASE_BOARD.x + 18} y={53}>{tr(lang, 'If not mine, send it up', 'Không xử thì trình lên')}</Caption>
          </Signboard>
        </Part>

        {/* The four officials, one per step */}
        <Part node="h1">
          <Person x={RANK.h1.x} y={RANK.h1.feet} s={1.15} robe={PIGMENT.amber} pants={PIGMENT.woodDark} hat="khanXep" pose="hold">
            <line x1={-24} y1={-4} x2={-22} y2={-60} stroke={INK} strokeWidth={5} strokeLinecap="round" />
            <line x1={-24} y1={-4} x2={-22} y2={-60} stroke={PIGMENT.wood} strokeWidth={2.6} strokeLinecap="round" />
          </Person>
        </Part>
        <Part node="h2">
          <Person x={RANK.h2.x} y={RANK.h2.feet} s={1.15} robe={PIGMENT.blue} pants={PIGMENT.blueDark} hat="official" pose="hold">
            <rect x={-6} y={-70} width={12} height={22} rx={2} fill={PIGMENT.white} stroke={INK} strokeWidth={1.6} />
          </Person>
        </Part>
        <Part node="h3">
          <Person x={RANK.h3.x} y={RANK.h3.feet} s={1.15} robe={PIGMENT.green} pants={PIGMENT.greenDark} sash={PIGMENT.red} hat="official" pose="hold">
            <rect x={-6} y={-70} width={12} height={22} rx={2} fill={PIGMENT.white} stroke={INK} strokeWidth={1.6} />
          </Person>
        </Part>
        <Part node="h4">
          {parasol(RANK.h4.x + 42, RANK.h4.feet - 156, RANK.h4.feet)}
          <Person x={RANK.h4.x} y={RANK.h4.feet} s={1.2} robe={PIGMENT.yellow} pants={PIGMENT.redDark} sash={PIGMENT.red} hat="crown" pose="hold">
            <rect x={-6} y={-70} width={12} height={22} rx={2} fill={PIGMENT.red} stroke={INK} strokeWidth={1.6} />
          </Person>
        </Part>

        {/* The villager at the foot of the stairs, holding up the petition */}
        <Part node="client">
          <Person x={VILLAGER.x} y={VILLAGER.feet} s={1.25} robe={PIGMENT.blue} pants={PIGMENT.woodDark} hat="nonLa" long={false} pose="reach" />
        </Part>
        <Part node="req">{petition(120, 212)}</Part>
      </>
    )
  },
}

export default chain
