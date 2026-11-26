import { Gate, Hall } from './kit/architecture'
import { Person } from './kit/figures'
import { Cloud, Ground, Hills, Sun } from './kit/nature'
import { C, INK } from './kit/palette'
import { Jar, LanternString } from './kit/props'
import type { LegacySceneDefinition } from './types'

const visitor: LegacySceneDefinition = {
  slug: 'visitor',
  title: { en: 'Visitor: officials make the rounds of the craft guilds', vi: 'Visitor: các quan đi thăm phường thủ công' },
  sky: 'dawn',
  tags: [
    { nodeId: 'client', method: 'welcomeVisitor', caption: { en: 'the capital lets them in', vi: 'kinh thành mở cửa đón' }, at: [96, 170], to: [84, 252] },
    { nodeId: 'e1', caption: { en: 'silk weavers', vi: 'phường dệt lụa' }, at: [300, 112], to: [300, 170] },
    { nodeId: 'e2', caption: { en: 'potters', vi: 'phường gốm' }, at: [520, 112], to: [520, 170] },
    { nodeId: 'e3', caption: { en: 'carpenters', vi: 'phường mộc' }, at: [740, 112], to: [740, 170] },
    { nodeId: 'elem', method: 'accept', caption: { en: 'opens its door', vi: 'mở cửa đón khách' }, at: [886, 200], to: [776, 262] },
    { nodeId: 'visitor', caption: { en: 'one visit per kind of guild', vi: 'mỗi loại phường một cách thăm' }, at: [540, 410], to: [540, 362] },
    { nodeId: 'v1', caption: { en: 'counts the tax', vi: 'tính thuế' }, at: [270, 404], to: [404, 360] },
    { nodeId: 'v2', caption: { en: 'checks the quality', vi: 'kiểm tra chất lượng' }, at: [806, 404], to: [676, 360] },
  ],
  calls: [
    { nodeId: 'visitor', method: 'visitSilkWeaversGuild', d: 'M404,334 C372,320 344,312 316,304', at: [306, 324] },
    { nodeId: 'visitor', method: 'visitPotteryGuild', d: 'M650,334 C614,320 574,312 536,304', at: [560, 330] },
    { nodeId: 'visitor', method: 'visitCarpentryGuild', d: 'M680,334 C710,320 734,312 756,304', at: [790, 330] },
  ],
  untagged: [],
  Art: function VisitorArt() {
    return (
      <g>
        <Sun x={880} y={120} r={30} />
        <Cloud x={420} y={60} s={1} color="#fde68a" />
        <Hills y={220} amp={30} color="#b5aa9a" seed={13} />
        <LanternString x0={170} x1={880} y={150} sag={10} count={8} r={8} />
        <Ground y={296} color="#c2af95" edge="#8c755f" />
        <rect y={300} width={960} height={140} fill="#ad987d" opacity={0.4} />

        <Gate cx={80} y={330} w={140} h={84} />

        {/* Silk weavers: a loom and hanging skeins */}
        <Hall cx={300} y={300} w={170} h={70} roofH={46} doors={2} />
        {['#f9a8d4', '#93c5fd', '#fde68a'].map((c, i) => (
          <rect key={c} x={236 + i * 14} y={248} width={9} height={32} rx={3} fill={c} stroke={INK} strokeWidth={1} />
        ))}
        <rect x={300} y={256} width={50} height={30} fill="none" stroke={C.wood} strokeWidth={3} />
        {[0, 1, 2, 3, 4].map(i => <line key={i} x1={304 + i * 10} y1={256} x2={304 + i * 10} y2={286} stroke="#fef3c7" strokeWidth={1} />)}

        {/* Potters: a kiln and jars */}
        <Hall cx={520} y={300} w={170} h={70} roofH={46} doors={2} />
        <path d="M570,300 Q600,240 630,300 Z" fill="#8a4b2a" stroke={INK} strokeWidth={2} />
        <rect x={596} y={278} width={10} height={14} fill="#f97316" />
        <Jar x={470} y={302} s={0.7} />
        <Jar x={496} y={302} s={0.55} color="#5b7c99" glaze="#cbd5e1" />

        {/* Carpenters: stacked logs and a saw horse */}
        <Hall cx={740} y={300} w={170} h={70} roofH={46} doors={2} />
        {[0, 1, 2].map(i => <ellipse key={i} cx={672 + i * 14} cy={292 - (i === 1 ? 10 : 0)} rx={7} ry={7} fill="#c08a4a" stroke={INK} strokeWidth={1.2} />)}
        <path d="M790,300 l10,-24 l10,24 M786,280 h28" stroke={C.wood} strokeWidth={3} fill="none" />

        {/* The two visitors walking the street */}
        <Person x={420} y={432} s={1.05} robe="#1e3a8a" hat="official" pose="hold">
          <rect x={-14} y={-66} width={28} height={18} fill={C.wood} stroke={INK} strokeWidth={1.2} />
          {[0, 1, 2].map(r => [0, 1, 2, 3].map(c => <circle key={`${r}-${c}`} cx={-9 + c * 6} cy={-62 + r * 5} r={1.6} fill="#fde68a" />))}
        </Person>
        <Person x={660} y={432} s={1.05} robe="#14532d" hat="official" pose="hold">
          <rect x={-7} y={-64} width={14} height={14} fill="#b91c1c" stroke={INK} strokeWidth={1.2} />
        </Person>
      </g>
    )
  },
}

export default visitor
