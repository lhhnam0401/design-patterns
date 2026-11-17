import { Roof } from './kit/architecture'
import { Person } from './kit/figures'
import { rng } from './kit/geometry'
import { url, useSceneIds } from './kit/ids'
import { Moon, Stars, Water } from './kit/nature'
import { C, INK } from './kit/palette'
import { Lantern } from './kit/props'
import type { SceneDefinition } from './types'

/** The three shared lantern designs (the intrinsic state). */
const DESIGNS = [
  { body: '#dc2626', petal: '#f87171' },
  { body: '#f59e0b', petal: '#fcd34d' },
  { body: '#db2777', petal: '#f9a8d4' },
]
const POOL: [number, number][] = [[70, 268], [128, 268], [186, 268]]

function floating(x: number, y: number, d: number, s: number, glow: string, key: string) {
  const { body, petal } = DESIGNS[d]
  return (
    <g key={key} transform={`translate(${x},${y}) scale(${s})`}>
      <circle cx={0} cy={-8} r={18} fill={glow} opacity={0.6} />
      <path d="M-14,0 Q-16,-12 -8,-10 Q-6,-20 0,-12 Q6,-20 8,-10 Q16,-12 14,0 Z" fill={petal} stroke={INK} strokeWidth={1.2} />
      <path d="M-10,0 L10,0 L7,5 L-7,5 Z" fill={body} stroke={INK} strokeWidth={1.2} />
      <circle cx={0} cy={-9} r={2.4} fill="#fff7d6" />
    </g>
  )
}

const flyweight: SceneDefinition = {
  slug: 'flyweight',
  title: { en: 'Flyweight: thousands of lanterns, three shared designs', vi: 'Flyweight: hàng nghìn đèn hoa đăng, ba mẫu dùng chung' },
  sky: 'night',
  tags: [
    { nodeId: 'factory', method: 'getLantern', caption: { en: 'lantern stall', vi: 'sạp bán đèn' }, at: [128, 120], to: [128, 214] },
    { nodeId: 'flyweight', caption: { en: '3 shared designs', vi: '3 mẫu đèn dùng chung' }, at: [306, 196], to: [196, 262] },
    { nodeId: 'context', method: 'display', caption: { en: 'keeps only its spot and wish', vi: 'chỉ giữ vị trí và lời ước' }, at: [640, 252], to: [758, 322] },
    { nodeId: 'client', method: 'releaseLantern', caption: { en: 'the festival on the river', vi: 'lễ hội trên sông' }, at: [470, 412], to: [356, 352] },
  ],
  calls: [
    { nodeId: 'factory', method: 'getLantern', d: 'M322,316 C290,284 262,276 236,276', at: [282, 258] },
    { nodeId: 'client', method: 'releaseLantern', d: 'M372,346 Q396,352 414,362' },
  ],
  untagged: [],
  Art: function FlyweightArt() {
    const ids = useSceneIds()
    const r = rng(31)
    const lanterns = Array.from({ length: 34 }, (_, i) => ({
      x: 420 + r() * 520,
      y: 318 + r() * 110,
      d: i % 3,
      key: `f${i}`,
    })).sort((a, b) => a.y - b.y)
    return (
      <g>
        <Stars seed={21} count={60} maxY={150} />
        <Moon x={820} y={64} r={22} />

        {/* Hội An shop houses along the far bank */}
        {[300, 420, 540, 660, 780, 900].map((x, i) => (
          <g key={x}>
            <rect x={x - 56} y={184} width={112} height={100} fill={i % 2 ? '#c98b2e' : '#d9a441'} stroke={INK} strokeWidth={2} />
            <rect x={x - 40} y={214} width={24} height={30} fill="#3a2614" stroke={INK} strokeWidth={1.5} />
            <rect x={x + 16} y={214} width={24} height={30} fill="#f4b44a" stroke={INK} strokeWidth={1.5} />
            <rect x={x - 14} y={252} width={28} height={32} fill="#3a2614" stroke={INK} strokeWidth={1.5} />
            <Roof cx={x} y={186} w={124} h={30} ornaments={false} />
            <Lantern x={x - 46} y={200} r={7} cord={8} color={i % 2 ? '#dc2626' : '#f59e0b'} />
            <Lantern x={x + 46} y={200} r={7} cord={8} color={i % 2 ? '#f59e0b' : '#dc2626'} />
          </g>
        ))}
        <rect x={240} y={284} width={720} height={10} fill={C.stoneDark} stroke={INK} strokeWidth={1.5} />

        {/* Left bank with the lantern stall */}
        <path d="M0,300 L250,300 L270,440 L0,440 Z" fill="#2f2219" stroke={INK} strokeWidth={2} />
        <rect x={28} y={216} width={200} height={84} fill="#4a2c1a" stroke={INK} strokeWidth={2} />
        <Roof cx={128} y={218} w={220} h={34} ornaments={false} color="#7f1d1d" dark="#5b1414" />
        <rect x={40} y={282} width={176} height={8} fill={C.wood} stroke={INK} strokeWidth={1.2} />
        {POOL.map(([x, y], d) => (
          <g key={d}>
            <circle cx={x} cy={y - 10} r={24} fill={url(ids.lamp)} />
            {floating(x, y, d, 1.5, 'none', `p${d}`)}
          </g>
        ))}
        <Person x={232} y={334} s={0.85} robe="#9a3412" hat="nonLa" pose="hold" flip />

        <Water y={294} x={240} w={720} h={146} seed={8} reflections={[{ x: 420, color: '#f59e0b' }, { x: 660, color: '#dc2626' }, { x: 900, color: '#f59e0b' }]} />

        {/* Every floating lantern points back to one of the three shared designs */}
        <g stroke="#fde68a" strokeOpacity={0.2} strokeWidth={1} strokeDasharray="2 4">
          {lanterns.filter((_, i) => i % 4 === 0).map(l => (
            <line key={`l${l.key}`} x1={l.x} y1={l.y - 6} x2={POOL[l.d][0]} y2={POOL[l.d][1] - 8} />
          ))}
        </g>
        {lanterns.map(l => floating(l.x, l.y, l.d, 0.7 + (l.y - 318) / 220, url(ids.lamp), l.key))}

        {/* A girl releases a lantern from a small boat */}
        <path d="M262,360 Q330,384 400,360 L392,372 Q330,392 270,372 Z" fill={C.wood} stroke={INK} strokeWidth={2} />
        <Person x={340} y={364} s={0.95} robe="#dc2626" hat="bun" pose="reach" />
        {floating(420, 366, 0, 0.9, url(ids.lamp), 'released')}
      </g>
    )
  },
}

export default flyweight
