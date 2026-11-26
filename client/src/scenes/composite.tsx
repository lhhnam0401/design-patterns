import { Horse, Person } from './kit/figures'
import { Cloud, Grass, Ground, Hills, Sun } from './kit/nature'
import { C, INK } from './kit/palette'
import { Banner } from './kit/props'
import type { LegacySceneDefinition } from './types'

const FEET = 380

function soldier(x: number, key: string, color = '#7f1d1d') {
  return (
    <Person key={key} x={x} y={FEET} s={0.6} robe={color} pants="#2a1a12" hat="helmet" armor>
      <line x1={17} y1={-20} x2={19} y2={-128} stroke={INK} strokeWidth={4} />
      <path d="M19,-128 l-4,-2 l4,-14 l4,14 Z" fill="#cbd5e1" stroke={INK} strokeWidth={1.2} />
    </Person>
  )
}

/** A dashed outline around a group of units. */
function unit(x: number, y: number, w: number, h: number, color: string, dash = '8 5') {
  return <rect x={x} y={y} width={w} height={h} rx={14} fill={color} fillOpacity={0.08} stroke={color} strokeWidth={2.2} strokeDasharray={dash} />
}

const SQUADS = [
  { x: 340, color: '#7f1d1d' },
  { x: 470, color: '#7f1d1d' },
  { x: 660, color: '#1e3a8a' },
  { x: 790, color: '#1e3a8a' },
]

const composite: LegacySceneDefinition = {
  slug: 'composite',
  title: { en: 'Composite: the Tây Sơn army, units inside units', vi: 'Composite: quân Tây Sơn, đơn vị lồng đơn vị' },
  sky: 'dusk',
  tags: [
    { nodeId: 'client', method: 'giveOrder', caption: { en: 'one order for any unit', vi: 'một mệnh lệnh cho mọi cấp' }, at: [124, 112], to: [128, 214] },
    { nodeId: 'comp', method: 'getStrength', caption: { en: 'a soldier or a whole corps', vi: 'một người hay cả đạo quân' }, at: [470, 40], to: [500, 174] },
    { nodeId: 'composite', method: 'add', caption: { en: 'a unit made of units', vi: 'đơn vị gồm các đơn vị' }, at: [790, 112], to: [790, 174] },
    { nodeId: 'leaf', method: 'attack', caption: { en: 'one fighter', vi: 'một người lính' }, at: [236, 412], to: [356, 330] },
  ],
  calls: [
    { nodeId: 'comp', method: 'attack', d: 'M182,250 C230,236 260,236 296,246', at: [240, 222] },
    { nodeId: 'composite', method: 'attack', d: 'M600,188 C560,192 520,198 470,212' },
    { nodeId: 'composite', method: 'attack', d: 'M640,188 C680,192 720,198 770,212' },
    { nodeId: 'comp', method: 'getStrength', d: 'M298,330 C260,346 220,344 186,326', at: [244, 360] },
  ],
  untagged: [],
  Art: function CompositeArt() {
    return (
      <g>
        <Sun x={860} y={196} r={34} />
        <Cloud x={260} y={90} s={1} />
        <Cloud x={640} y={70} s={1.2} />
        <Hills y={220} amp={40} color="#b6aa98" seed={21} />
        <Hills y={250} amp={20} color="#a79a87" seed={3} step={80} />
        <Ground y={240} color="#c1ad8f" edge="#866f58" />
        <Grass y={300} x0={0} x1={960} seed={8} count={30} color="#4a5a2a" />

        {/* The general on horseback, on a small rise */}
        <path d="M0,330 Q120,290 250,330 L250,440 L0,440 Z" fill="#b9a383" />
        <Banner x={60} y={318} h={150} w={40} color={C.lacquer} />
        <Horse x={130} y={330} s={1.05} color="#5b3418" />
        <Person x={124} y={292} s={1.0} robe="#b91c1c" pants="#1f1410" hat="helmet" hatColor={C.gold} armor pose="point" />

        {/* Corps → battalions → squads → soldiers */}
        {unit(300, 176, 640, 240, C.gold, '12 6')}
        {unit(318, 214, 286, 190, '#fca5a5')}
        {unit(638, 214, 286, 190, '#93c5fd')}
        <Banner x={330} y={296} h={70} w={22} color="#b91c1c" />
        <Banner x={650} y={296} h={70} w={22} color="#1d4ed8" />
        {SQUADS.map(({ x, color }) => (
          <g key={x}>
            {unit(x, 262, 124, 134, '#e5e7eb', '5 4')}
            {[0, 1, 2].map(i => soldier(x + 24 + i * 38, `${x}-${i}`, color))}
          </g>
        ))}
        <Grass y={440} seed={2} count={40} />
      </g>
    )
  },
}

export default composite
