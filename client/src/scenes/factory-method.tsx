import { Hall } from './kit/architecture'
import { Person } from './kit/figures'
import { BlossomTree, Firework, Grass, Ground, Hills, Stars } from './kit/nature'
import { Caption } from './kit/overlay'
import { C, INK } from './kit/palette'
import { LanternString, LogCake, Pot, SquareCake, Table } from './kit/props'
import type { SceneArtProps, SceneDefinition } from './types'

const factoryMethod: SceneDefinition = {
  slug: 'factory-method',
  title: { en: 'Factory Method: two Tết rice-cake workshops', vi: 'Factory Method: hai xưởng làm bánh Tết' },
  sky: 'night',
  tags: [
    { nodeId: 'creator', method: 'prepareForNewYear', caption: { en: 'the shared Tết routine', vi: 'quy trình đón Tết chung' }, at: [480, 82], to: [480, 128] },
    { nodeId: 'concA', method: 'makeRiceCake', caption: { en: 'Northern workshop', vi: 'xưởng miền Bắc' }, at: [190, 124], to: [190, 182] },
    { nodeId: 'concB', method: 'makeRiceCake', caption: { en: 'Southern workshop', vi: 'xưởng miền Nam' }, at: [770, 124], to: [770, 182] },
    { nodeId: 'prodA', caption: { en: 'square, in lá dong', vi: 'vuông, gói lá dong' }, at: [92, 262], to: [170, 300] },
    { nodeId: 'prodB', caption: { en: 'round, in banana leaf', vi: 'tròn, gói lá chuối' }, at: [876, 262], to: [800, 318] },
    { nodeId: 'product', caption: { en: 'all the routine knows', vi: 'thứ quy trình biết' }, at: [604, 296], to: [512, 356] },
  ],
  calls: [
    { nodeId: 'concA', method: 'makeRiceCake', d: 'M196,306 Q204,326 214,338' },
    { nodeId: 'concB', method: 'makeRiceCake', d: 'M764,306 Q756,326 748,340' },
    { nodeId: 'product', method: 'wrap', d: 'M424,236 Q356,262 296,318', at: [362, 262] },
    { nodeId: 'product', method: 'boil', d: 'M480,236 L480,300', at: [480, 266] },
  ],
  untagged: [],
  Art: function FactoryMethodArt({ lang }: SceneArtProps) {
    return (
      <g>
        <Stars seed={5} count={60} maxY={170} />
        <Firework x={320} y={70} r={30} color="#f87171" />
        <Firework x={660} y={56} r={36} color="#fbbf24" />
        <Firework x={590} y={128} r={20} color="#86efac" />
        <LanternString x0={-10} x1={340} y={10} sag={18} count={4} />
        <LanternString x0={620} x1={970} y={10} sag={18} count={4} colors={['#f2a03b', '#d62828']} />
        <Hills y={300} amp={30} color="#141a3a" seed={2} />

        <Hall cx={190} y={320} w={220} h={70} roofH={52} />
        <Hall cx={770} y={320} w={220} h={70} roofH={52} wall="#6f3a1a" />
        <BlossomTree x={36} y={330} s={1.05} color="#f9a8d4" seed={4} />
        <BlossomTree x={926} y={330} s={1.05} color="#facc15" seed={7} flip />
        <Ground y={318} color="#24160f" edge="#3a2418" />

        {/* The shared routine, painted on a board: wrap → boil → offer at the altar */}
        <line x1={420} y1={232} x2={414} y2={330} stroke={INK} strokeWidth={5} />
        <line x1={540} y1={232} x2={546} y2={330} stroke={INK} strokeWidth={5} />
        <rect x={404} y={128} width={152} height={106} rx={6} fill={C.paper} stroke={INK} strokeWidth={2.5} />
        <rect x={410} y={134} width={140} height={94} rx={4} fill="none" stroke="#b45309" strokeWidth={1.2} />
        <Caption x={480} y={154} size={12} fill="#7c2d12">{lang === 'vi' ? 'Quy trình đón Tết' : 'Tết routine'}</Caption>
        <g transform="translate(0,4)">
          <rect x={420} y={176} width={24} height={24} rx={2} fill="#3d7a35" stroke={INK} strokeWidth={1.4} />
          <line x1={432} y1={176} x2={432} y2={200} stroke="#e8d9a8" strokeWidth={1.4} />
          <path d="M449,188 l10,0 m-4,-4 l4,4 l-4,4" stroke={INK} strokeWidth={1.6} fill="none" />
          <path d="M466,178 L494,178 Q494,200 480,202 Q466,200 466,178 Z" fill="#2f2a28" stroke={INK} strokeWidth={1.4} />
          <path d="M474,174 q-3,-6 0,-10 M486,174 q3,-6 0,-10" stroke="#9ca3af" strokeWidth={1.2} fill="none" />
          <path d="M499,188 l10,0 m-4,-4 l4,4 l-4,4" stroke={INK} strokeWidth={1.6} fill="none" />
          <rect x={514} y={190} width={30} height={10} fill={C.lacquer} stroke={INK} strokeWidth={1.4} />
          {[522, 529, 536].map(x => <line key={x} x1={x} y1={190} x2={x} y2={174} stroke="#f59e0b" strokeWidth={1.4} />)}
        </g>
        <Caption x={480} y={222} size={10} fill="#7c2d12" weight={500}>{lang === 'vi' ? 'gói · luộc · dâng' : 'wrap · boil · offer'}</Caption>

        <Pot x={480} y={404} w={84} />
        <SquareCake x={466} y={344} size={16} />
        <LogCake x={496} y={344} w={30} h={12} />

        {/* North: square bánh chưng */}
        <Table x={118} y={404} w={190} h={26} />
        {[[160, 370], [190, 370], [220, 370], [250, 370], [175, 344], [205, 344], [235, 344], [190, 318], [220, 318]].map(([x, y], i) => (
          <SquareCake key={i} x={x} y={y} />
        ))}
        <Person x={330} y={420} s={1.05} robe="#9f1d1d" pants="#2a1a12" hat="bun" pose="work" flip>
          <path d="M18,-54 l14,-6 l4,12 l-14,6 Z" fill="#3d7a35" stroke={INK} strokeWidth={1} />
        </Person>

        {/* South: round bánh tét */}
        <Table x={652} y={404} w={190} h={26} />
        {[[690, 370], [748, 370], [806, 370], [719, 350], [777, 350], [748, 330]].map(([x, y], i) => (
          <LogCake key={i} x={x} y={y} />
        ))}
        <Person x={630} y={420} s={1.05} robe="#1f4e79" pants="#1a1a1a" sash="#dc2626" hat="nonLa" long={false} pose="work">
          <path d="M18,-54 l16,-2 l0,10 l-16,2 Z" fill="#4f8a3a" stroke={INK} strokeWidth={1} />
        </Person>
        <Grass y={440} seed={3} count={36} />
      </g>
    )
  },
}

export default factoryMethod
