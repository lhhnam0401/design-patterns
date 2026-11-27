import { Person, type Pose } from './print/figures'
import { Grass, GroundBand, Hills, Sun } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './print/pigments'
import { Banner, RolledScroll } from './print/props'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const FEET = 378
const MASTER_X = 108
const WARRIOR_X = 360
/** One column per school: a banner on the left, a fighter in its stance on the right. */
const SCHOOLS = [
  { id: 's1', x: 590, flag: PIGMENT.red, robe: PIGMENT.red, pose: 'point' as Pose, name: 'Bình Định' },
  { id: 's2', x: 730, flag: PIGMENT.blue, robe: PIGMENT.blue, pose: 'wave' as Pose, name: 'Tây Sơn' },
  { id: 's3', x: 870, flag: PIGMENT.green, robe: PIGMENT.green, pose: 'hold' as Pose, name: 'Thiếu Lâm' },
] as const
const BANNER_H = 180

/** The emblem on each school's banner: a burst for strength, speed strokes, a round shield. */
function emblem(i: number, cx: number, cy: number) {
  if (i === 0) {
    const d = Array.from({ length: 16 }, (_, k) => {
      const a = (Math.PI * 2 * k) / 16 - Math.PI / 2
      const r = k % 2 ? 6 : 15
      return `${k ? 'L' : 'M'}${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`
    }).join(' ') + ' Z'
    return <path d={d} fill={PIGMENT.yellow} stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
  }
  if (i === 1) {
    return (
      <g strokeLinecap="round">
        {[-10, 0, 10].map(dy => (
          <g key={dy}>
            <path d={`M${cx - 12},${cy + dy + 4} L${cx + 12},${cy + dy - 4}`} stroke={INK} strokeWidth={6} />
            <path d={`M${cx - 12},${cy + dy + 4} L${cx + 12},${cy + dy - 4}`} stroke={PAPER_LIGHT} strokeWidth={3} />
          </g>
        ))}
      </g>
    )
  }
  return (
    <g>
      <circle cx={cx} cy={cy} r={14} fill={PIGMENT.bronze} stroke={INK} strokeWidth={2.2} />
      <circle cx={cx} cy={cy} r={8} fill="none" stroke={PIGMENT.bronzeDark} strokeWidth={2} />
      <circle cx={cx} cy={cy} r={2.6} fill={PIGMENT.yellow} stroke={INK} strokeWidth={1} />
    </g>
  )
}

/** What each fighter adds to his stance, in the figure's own coordinates. */
function stance(i: number) {
  if (i === 0) {
    const d = Array.from({ length: 12 }, (_, k) => {
      const a = (Math.PI * 2 * k) / 12
      const r = k % 2 ? 4 : 10
      return `${k ? 'L' : 'M'}${(48 + Math.cos(a) * r).toFixed(1)},${(-72 + Math.sin(a) * r).toFixed(1)}`
    }).join(' ') + ' Z'
    return <path d={d} fill={PIGMENT.yellow} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
  }
  if (i === 1) {
    return (
      <g stroke={INK} strokeWidth={2.4} strokeLinecap="round">
        <path d="M34,-96 l10,-4 M36,-86 l12,-2 M34,-76 l10,1" />
      </g>
    )
  }
  return (
    <g>
      <circle cx={0} cy={-56} r={15} fill={PIGMENT.bronze} stroke={INK} strokeWidth={2.4} />
      <circle cx={0} cy={-56} r={8} fill="none" stroke={PIGMENT.bronzeDark} strokeWidth={2} />
    </g>
  )
}

/** The master's rack of school scrolls, one per school he knows. `x` is its left side. */
function rack(x: number) {
  return (
    <g stroke={INK} strokeLinejoin="round">
      <rect x={x + 4} y={300} width={7} height={78} fill={PIGMENT.woodDark} strokeWidth={2.2} />
      <rect x={x + 35} y={300} width={7} height={78} fill={PIGMENT.woodDark} strokeWidth={2.2} />
      <rect x={x} y={292} width={46} height={9} rx={2} fill={PIGMENT.wood} strokeWidth={2.4} />
      {[318, 338, 358].map(y => <rect key={y} x={x + 2} y={y + 6} width={42} height={5} fill={PIGMENT.wood} strokeWidth={1.4} />)}
      {SCHOOLS.map((s, i) => <RolledScroll key={s.id} x={x + 4} y={318 + i * 20} w={36} ribbon={s.flag} />)}
    </g>
  )
}

const strategy: SceneDefinition = {
  slug: 'strategy',
  title: { en: 'Strategy: one warrior, interchangeable martial schools', vi: 'Strategy: một võ sĩ, nhiều võ phái hoán đổi được' },
  setting: 'dusk',
  pins: [
    { nodeId: 'client', methods: ['chooseSchool'], caption: { en: 'the master knows the schools and picks one per fight', vi: 'sư phụ hiểu các võ phái và chọn một cho mỗi trận' }, at: [MASTER_X, 340], showName: false },
    { nodeId: 'ctx', methods: ['changeSchool', 'fight'], caption: { en: 'fights with the school he is given; never picks one himself', vi: 'đánh bằng võ phái được trao, không tự chọn võ phái' }, at: [WARRIOR_X + 12, 356] },
    { nodeId: 'strat', methods: ['attack'], caption: { en: 'one way to fight', vi: 'một cách đánh' }, at: [600, 44], side: 'left' },
    { nodeId: 's1', methods: ['attack'], caption: { en: 'Bình Định: powerful strikes', vi: 'Bình Định: đòn mạnh' }, at: [SCHOOLS[0].x + 34, 344], showName: false },
    { nodeId: 's2', methods: ['attack'], caption: { en: 'Tây Sơn: fast combinations', vi: 'Tây Sơn: liên hoàn nhanh' }, at: [SCHOOLS[1].x + 34, 344], showName: false },
    { nodeId: 's3', methods: ['attack'], caption: { en: 'Thiếu Lâm: defend, then counter', vi: 'Thiếu Lâm: thủ rồi phản đòn' }, at: [SCHOOLS[2].x + 34, 344], showName: false },
  ],
  calls: [
    { id: 'choose', nodeId: 'client', method: 'chooseSchool', d: 'M84,294 C76,246 38,238 34,282' },
    { id: 'change', nodeId: 'ctx', method: 'changeSchool', d: 'M150,290 C200,262 272,262 324,284' },
    { id: 'fight', nodeId: 'ctx', method: 'fight', d: 'M150,322 C200,344 272,344 326,326' },
    { id: 'attack-s1', nodeId: 's1', method: 'attack', d: 'M418,280 C460,250 510,236 550,232' },
    { id: 'attack-s2', nodeId: 's2', method: 'attack', d: 'M416,272 C470,150 630,150 690,232' },
    { id: 'attack-s3', nodeId: 's3', method: 'attack', d: 'M414,262 C470,80 800,80 830,226' },
  ],
  steps: [
    {
      calls: ['choose'],
      nodes: ['client', 's1'],
      at: [44, 214],
      caption: { en: 'Facing heavy armor, the master calls chooseSchool() and takes Bình Định, the school of powerful strikes.', vi: 'Gặp đối thủ giáp dày, sư phụ gọi chooseSchool() và chọn Bình Định, võ phái của những đòn mạnh.' },
    },
    {
      calls: ['change'],
      nodes: ['client', 'ctx', 'strat', 's1'],
      at: [214, 238],
      caption: { en: 'He gives it to the warrior with changeSchool(). The warrior keeps it only as a MartialSchool.', vi: 'Ông trao võ phái cho võ sĩ qua changeSchool(). Võ sĩ chỉ giữ nó như một MartialSchool.' },
    },
    {
      calls: ['fight', 'attack-s1'],
      nodes: ['client', 'ctx', 'strat', 's1'],
      at: [236, 372],
      caption: { en: 'fight() calls attack() on the school he holds: Bình Định’s flying kick hits the cavalry.', vi: 'fight() gọi attack() trên võ phái đang giữ: cú song phi của Bình Định đánh vào kỵ binh.' },
    },
    {
      calls: ['choose', 'change'],
      nodes: ['client', 'ctx', 'strat', 's2'],
      at: [100, 210],
      caption: { en: 'Caught in an ambush, the master calls chooseSchool() again, gets Tây Sơn and swaps it in with changeSchool().', vi: 'Bị phục kích, sư phụ lại gọi chooseSchool(), được Tây Sơn và thay vào bằng changeSchool().' },
    },
    {
      calls: ['fight', 'attack-s2'],
      nodes: ['client', 'ctx', 'strat', 's2'],
      at: [650, 214],
      caption: { en: 'The same fight() now runs Tây Sơn’s attack(): seven fast blows in a row. Nothing in Warrior changed.', vi: 'Vẫn fight() ấy giờ chạy attack() của Tây Sơn: liên hoàn bảy đòn. Warrior không phải sửa gì.' },
    },
    {
      calls: ['choose', 'change', 'fight', 'attack-s3'],
      nodes: ['client', 'ctx', 'strat', 's3'],
      at: [770, 170],
      caption: { en: 'Against a stronger opponent the same three calls bring Thiếu Lâm: attack() now blocks first, then counters.', vi: 'Gặp đối thủ mạnh hơn, cùng ba lời gọi ấy mang lại Thiếu Lâm: attack() giờ đỡ đòn trước rồi phản công.' },
    },
  ],
  focus: [20, 120, 780, 320],
  untagged: [],
  Art: function StrategyArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Sun x={210} y={70} r={26} />
          <Hills y={300} amp={26} color={TINT.red} seed={6} step={140} />
          <GroundBand />
          <Grass x0={170} x1={300} seed={3} count={4} />
          <Grass x0={440} x1={540} seed={7} count={3} />
        </Backdrop>

        {/* The rail: the interface over exactly the three schools */}
        <Part node="strat">
          <Signboard x={730} w={300} tone="interface" span={[SCHOOLS[0].x, SCHOOLS[2].x]} ticks={SCHOOLS.map(s => s.x)}>
            <Caption x={752} y={53}>{lang === 'vi' ? 'một cách đánh' : 'one way to fight'}</Caption>
          </Signboard>
        </Part>

        {/* Three schools: a banner and a fighter in the school's stance */}
        {SCHOOLS.map((s, i) => (
          <Part key={s.id} node={s.id}>
            <Banner x={s.x - 34} y={FEET} h={BANNER_H} w={46} color={s.flag}>
              {emblem(i, s.x - 10, FEET - BANNER_H + 48)}
            </Banner>
            <Person x={s.x + 34} y={FEET} s={1.05} robe={s.robe} pants={PIGMENT.woodDark} hat="khanXep" hatColor={s.flag} pose={s.pose}>
              {stance(i)}
            </Person>
            <Caption x={s.x + 6} y={414}>{s.name}</Caption>
          </Part>
        ))}

        {/* The warrior: fights with whatever school he holds */}
        <Part node="ctx">
          <Person x={WARRIOR_X} y={FEET} s={1.3} robe={PIGMENT.amber} pants={PIGMENT.woodDark} sash={PIGMENT.yellow} hat="khanXep" pose="point">
            <rect x={-21} y={-52} width={9} height={20} rx={3} fill={PAPER_LIGHT} stroke={INK} strokeWidth={1.6} />
            <rect x={-21.5} y={-45} width={10} height={4} fill={PIGMENT.yellow} stroke={INK} strokeWidth={1} />
          </Person>
        </Part>

        {/* The master and his rack of school scrolls */}
        <Part node="client">
          {rack(12)}
          <Person x={MASTER_X} y={FEET} s={1.25} robe={PIGMENT.white} pants={PIGMENT.stoneDark} sash={PIGMENT.red} hat="khanXep" pose="reach">
            <path d="M-6,-77 Q0,-62 6,-77 Z" fill={PIGMENT.steel} stroke={INK} strokeWidth={1.2} strokeLinejoin="round" />
          </Person>
        </Part>
      </>
    )
  },
}

export default strategy
