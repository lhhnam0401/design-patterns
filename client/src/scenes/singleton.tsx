import { Gate, Hall, Terrace } from './kit/architecture'
import { Person } from './kit/figures'
import { band } from './kit/geometry'
import { Cloud, Grass, Ground, Hills, Moon, Path, Stars, Tree, Bamboo } from './kit/nature'
import { Caption } from './kit/overlay'
import { C, INK } from './kit/palette'
import { Banner, BronzeDrum, Lantern, Scroll } from './kit/props'
import type { SceneArtProps, SceneDefinition } from './types'

const singleton: SceneDefinition = {
  slug: 'singleton',
  title: { en: 'Singleton: the one royal court of Văn Lang', vi: 'Singleton: triều đình duy nhất của Văn Lang' },
  sky: 'dusk',
  tags: [
    { nodeId: 'sing', caption: { en: 'the one royal court', vi: 'triều đình duy nhất' }, at: [245, 132], to: [392, 160] },
    { nodeId: 'sing', method: 'getInstance', caption: { en: 'the only way in', vi: 'lối vào duy nhất' }, at: [650, 268], to: [508, 312] },
    { nodeId: 'sing', method: 'issueDecree', caption: { en: 'numbered decrees', vi: 'chiếu chỉ đánh số' }, at: [872, 300], to: [800, 352] },
    { nodeId: 'c1', caption: { en: 'the army', vi: 'quân lính' }, at: [112, 290], to: [150, 318] },
    { nodeId: 'c2', caption: { en: 'the people', vi: 'người dân' }, at: [276, 296], to: [324, 322] },
    { nodeId: 'c3', caption: { en: 'the officials', vi: 'quan lại' }, at: [672, 408], to: [770, 384] },
  ],
  calls: [
    { nodeId: 'sing', method: 'getInstance', d: 'M182,352 C260,334 360,340 444,336' },
    { nodeId: 'sing', method: 'getInstance', d: 'M352,366 C392,350 420,346 456,342' },
    { nodeId: 'sing', method: 'getInstance', d: 'M766,350 C690,330 600,336 518,336' },
  ],
  untagged: [],
  Art: function SingletonArt({ lang }: SceneArtProps) {
  return (
    <g>
      <Stars seed={11} count={55} maxY={200} />
      <Moon x={110} y={72} r={24} />
      <Cloud x={340} y={64} s={0.8} />
      <Cloud x={660} y={96} s={1.1} />
      <Hills y={265} amp={45} color="#2c1b47" seed={4} step={110} />

      {/* A second court can't exist: its faded outline is crossed out */}
      <Hills y={288} amp={22} color="#21142f" seed={8} step={140} />
      <Hall cx={850} y={236} w={110} h={30} roofH={26} doors={2} glow={false} dim />
      <g stroke="#ef4444" strokeWidth={5} strokeLinecap="round" opacity={0.85}>
        <line x1={792} y1={168} x2={908} y2={238} />
        <line x1={908} y1={168} x2={792} y2={238} />
      </g>
      <Caption x={850} y={258} size={11} fill="#fca5a5">
        {lang === 'vi' ? 'không có triều đình thứ hai' : 'no second court'}
      </Caption>

      {/* The one palace on its hill */}
      <path d={band([[250, 340], [360, 258], [480, 226], [600, 258], [710, 340]], 440)} fill="#2b1b13" />
      <Terrace cx={480} y={205} w={236} />
      <BronzeDrum cx={338} y={232} w={42} h={26} />
      <BronzeDrum cx={622} y={232} w={42} h={26} />
      <Hall cx={480} y={205} w={200} h={56} roofH={40} tiers={2} />

      <Ground y={342} color="#22150f" edge="#33201a" />
      <Path points={[[30, 450], [150, 410], [300, 372], [452, 348]]} />
      <Path points={[[290, 450], [350, 404], [420, 368], [466, 350]]} width={22} />
      <Path points={[[940, 450], [820, 410], [660, 372], [508, 348]]} />

      <Bamboo x={8} y={350} h={200} seed={3} count={4} />
      <Tree x={925} y={352} s={0.95} />

      <Banner x={392} y={348} h={118} color={C.lacquer} />
      <Banner x={568} y={348} h={118} color={C.lacquer} />
      <Gate cx={480} y={348} w={160} h={74} />
      <Lantern x={432} y={300} r={9} cord={6} />
      <Lantern x={528} y={300} r={9} cord={6} />

      <Grass y={440} seed={14} count={40} />

      {/* Quân: a soldier with a spear */}
      <Person x={150} y={428} s={1.15} robe="#7f1d1d" pants="#2a1a12" hat="helmet" armor>
        <line x1={17} y1={-20} x2={19} y2={-132} stroke={INK} strokeWidth={4} />
        <line x1={17} y1={-20} x2={19} y2={-132} stroke={C.wood} strokeWidth={2} />
        <path d="M19,-132 l-4,-2 l4,-14 l4,14 Z" fill="#cbd5e1" stroke={INK} strokeWidth={1.2} />
      </Person>

      {/* Dân: a farmer carrying a rice sheaf */}
      <Person x={330} y={434} s={1.12} robe="#6b4226" pants="#3a2a1d" sash="#a16207" hat="nonLa" long={false} pose="hold">
        {[-8, -4, 0, 4, 8].map(dx => (
          <path key={dx} d={`M${dx * 0.3},-46 Q${dx},-62 ${dx * 1.8},-74`} stroke={C.gold} strokeWidth={2} fill="none" />
        ))}
        <rect x={-6} y={-58} width={12} height={4} fill="#a16207" stroke={INK} strokeWidth={0.8} />
      </Person>

      {/* Quan: an official holding a numbered decree */}
      <Person x={790} y={424} s={1.15} robe="#1e3a8a" pants="#111827" hat="official" pose="hold">
        <Scroll x={-15} y={-70} w={30} h={22} lines={2} />
      </Person>
    </g>
  )
  },
}

export default singleton
