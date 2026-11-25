import { Person } from './kit/figures'
import { Caption } from './kit/overlay'
import { C, INK, W } from './kit/palette'
import { Lantern, Pot } from './kit/props'
import type { SceneArtProps, SceneDefinition } from './types'

const STEP_X = [200, 340, 480, 620, 760]
const POTS = [
  { x: 200, own: [0, 1, 4], color: '#2f2a28' },
  { x: 480, own: [0, 1], color: '#3b302a' },
  { x: 760, own: [0, 1, 2, 3, 4], color: '#4a2a1e' },
]

/** Small pictures of the five steps on the recipe board. */
function stepIcon(i: number, x: number, y: number) {
  switch (i) {
    case 0:
      return <path d={`M${x - 16},${y - 8} L${x + 16},${y - 8} Q${x + 16},${y + 12} ${x},${y + 14} Q${x - 16},${y + 12} ${x - 16},${y - 8} Z`} fill="#2f2a28" stroke={INK} strokeWidth={1.4} />
    case 1:
      return (
        <g>
          <ellipse cx={x - 6} cy={y + 4} rx={10} ry={6} fill="#f59e0b" stroke={INK} strokeWidth={1.2} />
          <ellipse cx={x + 8} cy={y} rx={9} ry={7} fill="#dc2626" stroke={INK} strokeWidth={1.2} />
          <path d={`M${x - 2},${y - 12} q6,4 0,10`} stroke="#4d7c0f" strokeWidth={3} fill="none" />
        </g>
      )
    case 2:
      return (
        <g>
          <rect x={x - 6} y={y - 14} width={12} height={28} rx={4} fill="#a16207" stroke={INK} strokeWidth={1.4} />
          <rect x={x - 3} y={y - 20} width={6} height={7} fill="#7c2d12" stroke={INK} strokeWidth={1} />
        </g>
      )
    case 3:
      return <path d={`M${x - 18},${y - 4} L${x + 18},${y - 4} Q${x + 14},${y + 14} ${x},${y + 14} Q${x - 14},${y + 14} ${x - 18},${y - 4} Z`} fill="none" stroke="#7c2d12" strokeWidth={1.6} strokeDasharray="4 3" />
    default:
      return (
        <g>
          {[-10, -3, 4, 11].map(dx => <rect key={dx} x={x + dx - 2} y={y - 6 + (dx % 2) * 4} width={6} height={3} rx={1.5} fill="#22c55e" stroke={INK} strokeWidth={0.6} />)}
        </g>
      )
  }
}

const templateMethod: SceneDefinition = {
  slug: 'template-method',
  title: { en: 'Template Method: one cooking order for every soup', vi: 'Template Method: một trình tự nấu cho mọi món nước' },
  sky: 'interior',
  tags: [
    { nodeId: 'abstract', method: 'cook', caption: { en: 'the fixed cooking order', vi: 'trình tự nấu cố định' }, at: [480, 30], to: [480, 60] },
    { nodeId: 'c1', caption: { en: 'canh chua cá', vi: 'canh chua cá' }, at: [200, 412], to: [200, 372] },
    { nodeId: 'c2', caption: { en: 'canh bầu nấu xương', vi: 'canh bầu nấu xương' }, at: [480, 412], to: [480, 372] },
    { nodeId: 'c3', caption: { en: 'bún bò Huế', vi: 'bún bò Huế' }, at: [760, 412], to: [760, 372] },
  ],
  calls: (['prepareBroth', 'addIngredients', 'season', 'beforeLadle', 'garnish'] as const).map((method, i) => ({
    nodeId: 'abstract',
    method,
    d: `M${STEP_X[i]},148 L${STEP_X[i]},166`,
    at: [STEP_X[i], 182] as const,
  })),
  untagged: [],
  Art: function TemplateMethodArt({ lang }: SceneArtProps) {
    const steps = lang === 'vi'
      ? ['nước dùng', 'nguyên liệu', 'nêm nếm', '(tùy chọn)', 'trang trí']
      : ['broth', 'ingredients', 'season', '(optional)', 'garnish']
    return (
      <g>
        <rect width={W} height={440} fill="#ded0ba" />
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1={i * 62 + 14} y1={0} x2={i * 62 + 14} y2={300} stroke="#8b755e" strokeWidth={1} opacity={0.28} />
        ))}
        <rect y={300} width={W} height={140} fill="#c6b090" />
        <rect y={296} width={W} height={8} fill={C.woodDark} stroke={INK} strokeWidth={1.5} />
        <Lantern x={60} y={110} r={11} cord={50} />
        <Lantern x={900} y={110} r={11} cord={50} color="#f2a03b" />

        {/* The recipe board */}
        <rect x={120} y={60} width={720} height={88} rx={6} fill={C.paper} stroke={INK} strokeWidth={2.5} />
        <rect x={128} y={68} width={704} height={72} rx={4} fill="none" stroke="#b45309" strokeWidth={1.2} />
        {STEP_X.map((x, i) => (
          <g key={x}>
            <circle cx={x - 46} cy={84} r={10} fill={C.lacquer} stroke={INK} strokeWidth={1.2} />
            <Caption x={x - 46} y={88} size={11} fill={C.gold}>{String(i + 1)}</Caption>
            {stepIcon(i, x, 96)}
            <Caption x={x} y={132} size={11} fill="#7c2d12">{steps[i]}</Caption>
            {i < 4 && <path d={`M${x + 50},100 l16,0 m-5,-5 l5,5 l-5,5`} stroke="#7c2d12" strokeWidth={1.8} fill="none" />}
          </g>
        ))}

        {/* Three pots: dots show which steps each soup does its own way */}
        {POTS.map(p => (
          <g key={p.x}>
            <Pot x={p.x} y={392} w={112} color={p.color} />
            <rect x={p.x - 60} y={232} width={120} height={24} rx={2} fill="#f8f1e4" stroke={INK} />
            {[0, 1, 2, 3, 4].map(k => (
              <circle key={k} cx={p.x - 40 + k * 20} cy={244} r={6}
                fill={p.own.includes(k) ? C.gold : 'none'} stroke={C.gold} strokeWidth={1.6} />
            ))}
          </g>
        ))}
        <Caption x={480} y={222} size={11} fill={INK}>{lang === 'vi' ? '● bước riêng của món   ○ dùng mặc định' : '● its own step   ○ uses the default'}</Caption>
        <Person x={340} y={400} s={1.0} robe="#e5e7eb" pants="#374151" hat="topknot" pose="reach">
          <path d="M30,-58 L60,-74" stroke={C.wood} strokeWidth={3} />
          <ellipse cx={62} cy={-75} rx={6} ry={3} fill={C.wood} stroke={INK} />
        </Person>
      </g>
    )
  },
}

export default templateMethod
