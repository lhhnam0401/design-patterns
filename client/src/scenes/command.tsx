import { Wall } from './kit/architecture'
import { Person } from './kit/figures'
import { Cloud, Grass, Hills, Sun } from './kit/nature'
import { Caption } from './kit/overlay'
import { C, INK, W } from './kit/palette'
import { Banner, Lantern, RolledScroll, Scroll, Table } from './kit/props'
import type { SceneArtProps, SceneDefinition } from './types'

/** An open decree scroll with a small picture of what it orders. */
function decree(x: number, y: number, kind: 'citadel' | 'tax') {
  return (
    <g>
      <Scroll x={x} y={y} w={74} h={50} lines={0} />
      {kind === 'citadel' ? (
        <g>
          <rect x={x + 14} y={y + 22} width={40} height={18} fill="#9a4126" stroke={INK} strokeWidth={1.2} />
          {[0, 1, 2, 3].map(i => <rect key={i} x={x + 14 + i * 11} y={y + 16} width={7} height={6} fill="#9a4126" stroke={INK} strokeWidth={1} />)}
          <path d={`M${x + 30},${y + 40} v-10 q4,-5 8,0 v10`} fill={INK} />
        </g>
      ) : (
        <g>
          {[0, 1, 2].map(i => <ellipse key={i} cx={x + 30} cy={y + 38 - i * 6} rx={12} ry={4} fill={C.gold} stroke={INK} strokeWidth={1} />)}
          <path d={`M${x + 50},${y + 18} v18 m-5,-5 l5,5 l5,-5`} stroke="#16a34a" strokeWidth={2.4} fill="none" />
        </g>
      )}
    </g>
  )
}

const command: SceneDefinition = {
  slug: 'command',
  title: { en: 'Command: the Emperor’s decrees as objects', vi: 'Command: chiếu chỉ của Hoàng Đế là các đối tượng' },
  sky: 'dawn',
  tags: [
    { nodeId: 'client', caption: { en: 'writes the decrees', vi: 'soạn chiếu chỉ' }, at: [118, 196], to: [112, 286] },
    { nodeId: 'cmd', caption: { en: 'every decree can execute and undo', vi: 'chiếu nào cũng thi hành và thu hồi được' }, at: [400, 34], to: [400, 112] },
    { nodeId: 'c1', caption: { en: 'build a citadel', vi: 'xây thành' }, at: [250, 112], to: [300, 140] },
    { nodeId: 'c2', caption: { en: 'cut tax by 10%', vi: 'giảm thuế 10%' }, at: [566, 112], to: [512, 140] },
    { nodeId: 'inv', method: 'revoke', caption: { en: 'keeps the queue and the history', vi: 'giữ hàng chờ và sổ lịch sử' }, at: [410, 244], to: [404, 316] },
    { nodeId: 'recv', method: 'buildCitadel', caption: { en: 'does the real work', vi: 'làm việc thật sự' }, at: [810, 110], to: [800, 232] },
  ],
  calls: [
    { nodeId: 'inv', method: 'receiveDecree', d: 'M224,336 C262,320 292,326 316,342', at: [262, 306] },
    { nodeId: 'inv', method: 'proclaim', d: 'M436,302 C510,268 590,258 646,272', at: [552, 256] },
    { nodeId: 'cmd', method: 'undo', d: 'M528,394 C600,414 660,410 716,384', at: [624, 414] },
  ],
  untagged: [],
  Art: function CommandArt({ lang }: SceneArtProps) {
    return (
      <g>
        <Sun x={880} y={130} r={30} />
        <Cloud x={720} y={60} s={1} color="#fde68a" />
        <Hills y={250} amp={30} color="#b5aa99" seed={2} />

        {/* Palace interior on the left: red columns and floor */}
        <rect x={0} y={60} width={600} height={300} fill="#ded0ba" />
        <rect x={0} y={60} width={600} height={14} fill={C.woodDark} stroke={INK} strokeWidth={2} />
        {[20, 230, 580].map(x => <rect key={x} x={x} y={74} width={16} height={286} fill={C.lacquer} stroke={INK} strokeWidth={2} />)}
        <rect x={0} y={358} width={W} height={82} fill="#cbb99f" />
        <rect x={0} y={358} width={600} height={82} fill="#c3a988" />
        <Lantern x={130} y={130} r={11} cord={40} />
        <Lantern x={470} y={110} r={11} cord={30} color="#f2a03b" />

        {/* The two decrees, written but not yet carried out */}
        {decree(300, 120, 'citadel')}
        {decree(440, 120, 'tax')}

        {/* Emperor at his writing desk */}
        <Person x={112} y={372} s={1.12} robe="#ca8a04" pants="#7c2d12" hat="crown" pose="work" />
        <Table x={50} y={392} w={176} h={30} color={C.lacquerDark} />
        <Scroll x={150} y={340} w={36} h={14} lines={1} seal={false} />

        {/* The royal secretary: pending tray and history chest */}
        <Table x={300} y={396} w={70} h={22} color={C.wood} />
        {[0, 1, 2].map(i => <RolledScroll key={i} x={310} y={362 - i * 9} w={46} />)}
        <Person x={406} y={406} s={1.08} robe="#1e3a8a" hat="official" pose="hold" />
        <rect x={452} y={366} width={78} height={40} rx={3} fill={C.lacquerDark} stroke={INK} strokeWidth={2} />
        <rect x={452} y={360} width={78} height={10} rx={2} fill={C.lacquer} stroke={INK} strokeWidth={1.5} />
        <circle cx={491} cy={386} r={5} fill={C.gold} stroke={INK} />
        <Caption x={335} y={432} size={10} fill="#fde68a">{lang === 'vi' ? 'chờ ban bố' : 'pending'}</Caption>
        <Caption x={491} y={432} size={10} fill="#fde68a">{lang === 'vi' ? 'đã ban bố' : 'proclaimed'}</Caption>

        {/* The city: a citadel going up and the tax office */}
        <Banner x={630} y={358} h={110} color="#b91c1c" />
        <Wall x={660} y={358} w={280} h={70} />
        <g stroke="#a3823f" strokeWidth={2.4}>
          <line x1={760} y1={288} x2={760} y2={230} />
          <line x1={830} y1={288} x2={830} y2={230} />
          <line x1={756} y1={244} x2={834} y2={244} />
        </g>
        <rect x={770} y={250} width={50} height={38} fill="#9a4126" stroke={INK} strokeWidth={2} />
        {[0, 1, 2, 3].map(i => <rect key={i} x={770 + i * 13} y={242} width={9} height={8} fill="#9a4126" stroke={INK} strokeWidth={1.2} />)}
        <Person x={714} y={410} s={0.95} robe="#57534e" hat="nonLa" long={false} pose="hold">
          <rect x={-12} y={-66} width={24} height={12} fill="#9a4126" stroke={INK} strokeWidth={1} />
        </Person>
        {[0, 1, 2, 3].map(i => <ellipse key={i} cx={890} cy={400 - i * 7} rx={20} ry={6} fill={C.gold} stroke={INK} strokeWidth={1.2} />)}
        <Grass y={440} x0={600} x1={960} seed={5} count={16} />
      </g>
    )
  },
}

export default command
