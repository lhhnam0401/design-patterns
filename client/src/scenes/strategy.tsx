import { Hall } from './kit/architecture'
import { Person } from './kit/figures'
import { Ground, Hills, Sun, Tree } from './kit/nature'
import { C, INK } from './kit/palette'
import { Banner, RolledScroll } from './kit/props'
import type { SceneDefinition } from './types'

const SCHOOLS = [
  { x: 600, color: '#b91c1c', pose: 'point' as const, robe: '#7f1d1d' },
  { x: 730, color: '#1d4ed8', pose: 'wave' as const, robe: '#1e3a8a' },
  { x: 860, color: '#15803d', pose: 'hold' as const, robe: '#14532d' },
]

const strategy: SceneDefinition = {
  slug: 'strategy',
  title: { en: 'Strategy: one warrior, interchangeable martial schools', vi: 'Strategy: một võ sĩ, nhiều võ phái hoán đổi được' },
  sky: 'dusk',
  tags: [
    { nodeId: 's1', caption: { en: 'powerful strikes', vi: 'đòn mạnh' }, at: [600, 56], to: [612, 172] },
    { nodeId: 's2', caption: { en: 'fast combinations', vi: 'liên hoàn nhanh' }, at: [740, 108], to: [742, 172] },
    { nodeId: 's3', caption: { en: 'defend, then counter', vi: 'thủ rồi phản đòn' }, at: [868, 56], to: [872, 172] },
    { nodeId: 'strat', caption: { en: 'one way to fight', vi: 'một cách đánh' }, at: [730, 412], to: [730, 372] },
    { nodeId: 'ctx', method: 'fight', caption: { en: 'never picks a style itself', vi: 'không tự chọn võ phái' }, at: [370, 150], to: [376, 276] },
    { nodeId: 'client', method: 'chooseSchool', caption: { en: 'the master picks per fight', vi: 'sư phụ chọn theo trận' }, at: [130, 214], to: [130, 318] },
  ],
  calls: [
    { nodeId: 'ctx', method: 'changeSchool', d: 'M176,346 C230,326 280,326 334,338', at: [252, 318] },
    { nodeId: 'strat', method: 'attack', d: 'M424,300 C520,250 640,240 718,252', at: [560, 248] },
  ],
  untagged: [],
  Art: function StrategyArt() {
    return (
      <g>
        <Sun x={180} y={200} r={30} />
        <Hills y={220} amp={34} color="#3b1f4a" seed={6} />
        <Hall cx={300} y={262} w={300} h={70} roofH={50} />
        <Tree x={40} y={270} s={0.95} />
        <Ground y={260} color="#c1ad91" edge="#89735e" />
        <rect x={0} y={300} width={960} height={140} fill="#ac9679" opacity={0.45} />

        {/* Three school banners, each with a fighter in its stance */}
        {SCHOOLS.map(s => (
          <g key={s.x}>
            <Banner x={s.x - 40} y={360} h={190} w={40} color={s.color} />
            <Person x={s.x + 16} y={360} s={0.95} robe={s.robe} hat="khanXep" hatColor={s.color} pose={s.pose} />
          </g>
        ))}
        {/* motion lines for the fast school */}
        {[0, 1, 2].map(i => <path key={i} d={`M${700 - i * 4},${250 + i * 12} h-26`} stroke="#bfdbfe" strokeWidth={2} strokeLinecap="round" />)}
        {/* a shield for the defensive school */}
        <ellipse cx={866} cy={302} rx={13} ry={17} fill={C.bronze} stroke={INK} strokeWidth={1.6} />
        <rect x={680} y={362} width={100} height={6} rx={3} fill={INK} opacity={0.3} />

        {/* The master with a rack of school scrolls */}
        <Person x={130} y={412} s={1.08} robe="#e5e7eb" pants="#374151" hat="khanXep" pose="reach" />
        <rect x={50} y={360} width={36} height={52} fill={C.woodDark} stroke={INK} strokeWidth={1.6} />
        {['#b91c1c', '#1d4ed8', '#15803d'].map((c, i) => <RolledScroll key={c} x={46} y={372 + i * 14} w={30} ribbon={c} />)}

        {/* The warrior, holding the scroll of the school he uses now */}
        <Person x={378} y={414} s={1.28} robe="#991b1b" pants="#1f1410" hat="khanXep" hatColor="#7f1d1d" pose="point">
          <rect x={-22} y={-50} width={8} height={18} rx={2} fill={C.paper} stroke={INK} strokeWidth={1} />
          <rect x={-22} y={-44} width={8} height={4} fill="#1d4ed8" />
        </Person>
        {/* a training dummy */}
        <rect x={470} y={330} width={10} height={86} fill={C.wood} stroke={INK} strokeWidth={1.6} />
        <rect x={452} y={346} width={46} height={8} fill={C.wood} stroke={INK} strokeWidth={1.4} />
        <circle cx={475} cy={322} r={11} fill="#a16207" stroke={INK} strokeWidth={1.6} />
      </g>
    )
  },
}

export default strategy
