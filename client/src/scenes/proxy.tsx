import { Gate, Hall, Wall } from './kit/architecture'
import { Person } from './kit/figures'
import { Cloud, Ground, Hills, Moon, Stars, Tree } from './kit/nature'
import { Caption } from './kit/overlay'
import { C, INK } from './kit/palette'
import { Lantern, Scroll, Table } from './kit/props'
import type { SceneArtProps, SceneDefinition } from './types'

const proxy: SceneDefinition = {
  slug: 'proxy',
  title: { en: 'Proxy: the mandarin at the palace gate', vi: 'Proxy: viên quan giữ cổng cung điện' },
  sky: 'dusk',
  tags: [
    { nodeId: 'client', method: 'submitPetition', caption: { en: 'petitioners at court', vi: 'dân chúng dâng đơn' }, at: [156, 236], to: [168, 318] },
    { nodeId: 'iface', caption: { en: 'all they ever deal with', vi: 'thứ duy nhất dân thấy' }, at: [470, 178], to: [470, 264] },
    { nodeId: 'proxy', method: 'grantAudience', caption: { en: 'screens, caches, wakes the court', vi: 'sàng lọc, nhớ chiếu, mới mời vua' }, at: [612, 410], to: [598, 362] },
    { nodeId: 'real', caption: { en: 'woken only when needed', vi: 'chỉ được mời khi cần' }, at: [826, 120], to: [810, 222] },
  ],
  calls: [
    { nodeId: 'iface', method: 'grantAudience', d: 'M292,334 C380,312 470,316 556,334', at: [420, 300] },
    { nodeId: 'real', method: 'grantAudience', d: 'M612,300 C650,268 690,262 724,276' },
  ],
  untagged: [],
  Art: function ProxyArt({ lang }: SceneArtProps) {
    return (
      <g>
        <Stars seed={9} count={40} maxY={140} />
        <Moon x={120} y={70} r={20} />
        <Cloud x={600} y={70} s={1} />
        <Hills y={250} amp={30} color="#b2a69a" seed={5} />
        <Ground y={300} color="#c3b095" edge="#89735f" />
        <Wall x={250} y={372} w={120} h={46} />
        <Wall x={570} y={372} w={130} h={46} />

        {/* The throne room, dark until the emperor is first needed */}
        <Hall cx={820} y={340} w={220} h={92} roofH={60} glow={false} />
        <rect x={790} y={300} width={60} height={30} fill={C.lacquerDark} stroke={INK} strokeWidth={1.5} opacity={0.6} />
        <Person x={820} y={312} s={0.9} robe="#ca8a04" hat="crown" pose="hold" dim />
        <Caption x={820} y={360} size={11} fill="#fde68a">{lang === 'vi' ? 'Zzz… chưa được mời' : 'Zzz… not yet woken'}</Caption>

        <Gate cx={470} y={372} w={210} h={108} />
        <Lantern x={410} y={300} r={9} cord={10} />
        <Lantern x={530} y={300} r={9} cord={10} />
        <Tree x={36} y={330} s={0.9} />

        {/* The queue of petitioners */}
        {[
          { x: 70, robe: '#57534e', hat: 'nonLa' as const },
          { x: 130, robe: '#6b4226', hat: 'khanXep' as const },
          { x: 190, robe: '#3f6212', hat: 'nonLa' as const },
          { x: 252, robe: '#7c2d12', hat: 'khanXep' as const },
        ].map(p => (
          <Person key={p.x} x={p.x} y={418} s={0.98} robe={p.robe} hat={p.hat} long={p.hat === 'khanXep'} pose="hold">
            <Scroll x={-8} y={-64} w={16} h={12} lines={1} seal={false} />
          </Person>
        ))}

        {/* The mandarin's desk with his ledger of past decrees */}
        <Person x={598} y={404} s={1.1} robe="#1e3a8a" hat="official" pose="reach" />
        <Table x={624} y={418} w={110} h={30} color={C.wood} />
        <rect x={640} y={370} width={64} height={12} fill={C.paper} stroke={INK} strokeWidth={1.4} />
        <line x1={672} y1={370} x2={672} y2={382} stroke={INK} />
        {[0, 1, 2].map(i => <rect key={i} x={708 + i * 6} y={358 - i * 8} width={22} height={10} rx={2} fill="#a16207" stroke={INK} strokeWidth={1} />)}
      </g>
    )
  },
}

export default proxy
