import { Person } from './kit/figures'
import { rng } from './kit/geometry'
import { Ground, Stars } from './kit/nature'
import { Caption } from './kit/overlay'
import { C, INK, W } from './kit/palette'
import { LanternString, Pot, Table } from './kit/props'
import type { SceneArtProps, SceneDefinition } from './types'

const BOWL = 'M340,200 L700,200 Q694,372 520,394 Q346,372 340,200 Z'

const decorator: SceneDefinition = {
  slug: 'decorator',
  title: { en: 'Decorator: a bowl of phở, one topping at a time', vi: 'Decorator: bát phở, thêm từng món một' },
  sky: 'night',
  tags: [
    { nodeId: 'comp', method: 'price', caption: { en: 'a bowl, plain or loaded', vi: 'bát phở, không hay đủ món' }, at: [520, 46], to: [520, 196] },
    { nodeId: 'decorator', caption: { en: 'each topping wraps the bowl', vi: 'mỗi món thêm bọc bát bên dưới' }, at: [200, 128], to: [346, 204] },
    { nodeId: 'decD', caption: { en: 'spring onion, +0đ', vi: 'hành lá, +0đ' }, at: [200, 196], to: [380, 207] },
    { nodeId: 'decB', caption: { en: 'egg, +10.000đ', vi: 'trứng, +10.000đ' }, at: [200, 262], to: [392, 250] },
    { nodeId: 'concrete', caption: { en: 'plain phở, 40.000đ', vi: 'phở không, 40.000đ' }, at: [200, 344], to: [420, 340] },
    { nodeId: 'decC', caption: { en: 'chili, +5.000đ', vi: 'ớt, +5.000đ' }, at: [836, 218], to: [672, 226] },
    { nodeId: 'decA', caption: { en: 'beef, +20.000đ', vi: 'thịt bò, +20.000đ' }, at: [836, 282], to: [660, 282] },
    { nodeId: 'client', caption: { en: 'prints the bill', vi: 'in hóa đơn' }, at: [770, 412], to: [858, 380] },
  ],
  calls: [
    { nodeId: 'comp', method: 'price', d: 'M848,362 C800,376 740,378 690,356', at: [776, 356] },
  ],
  untagged: [],
  Art: function DecoratorArt({ lang }: SceneArtProps) {
    const r = rng(17)
    return (
      <g>
        <Stars seed={13} count={40} maxY={140} />
        <LanternString x0={-10} x1={970} y={8} sag={26} count={8} />
        {/* Street front: shop houses */}
        <rect x={0} y={96} width={W} height={300} fill="#d8cbbb" />
        {[0, 1, 2, 3, 4, 5].map(i => (
          <g key={i}>
            <rect x={i * 165 + 8} y={120} width={150} height={260} fill={i % 2 ? '#c9b9a7' : '#d4c5b3'} stroke={INK} strokeWidth={2} />
            <rect x={i * 165 + 34} y={150} width={40} height={50} fill="#efe5d2" stroke={INK} />
            <rect x={i * 165 + 92} y={150} width={40} height={50} fill="#e2d3bb" stroke={INK} />
          </g>
        ))}
        <Ground y={380} color="#bca78c" edge="#806e5c" />

        {/* The stall: a broth pot and a price board */}
        <Pot x={70} y={392} w={86} />
        <rect x={14} y={204} width={110} height={88} rx={2} fill="#f1e8d8" stroke={C.woodDark} strokeWidth={3} />
        <Caption x={69} y={226} size={13} fill={C.gold}>{lang === 'vi' ? 'Phở bò' : 'Beef phở'}</Caption>
        {['40.000', '+20.000', '+10.000', '+5.000'].map((p, i) => (
          <Caption key={p} x={69} y={244 + i * 13} size={10} fill="#e2e8f0" weight={500}>{p}</Caption>
        ))}

        {/* The bowl in cross-section: plain soup at the bottom, each topping a layer above */}
        <ellipse cx={520} cy={398} rx={90} ry={8} fill={INK} opacity={0.14} />
        <path d={BOWL} fill="#f1ede4" stroke={INK} strokeWidth={3} />
        <path d="M352,226 L688,226 Q682,372 520,388 Q358,372 352,226 Z" fill="#c2782f" stroke={INK} strokeWidth={1.5} />
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M${380 + (i % 2) * 10},${300 + i * 10} q30,-8 60,0 t60,0 t60,0 t60,0`} stroke="#fff7e0" strokeWidth={2.4} fill="none" opacity={0.9} />
        ))}
        {/* beef slices */}
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse key={i} cx={384 + i * 38} cy={282 + (i % 2) * 6} rx={20} ry={7} fill="#8b3a2e" stroke={INK} strokeWidth={1.2} />
        ))}
        {/* egg */}
        <ellipse cx={470} cy={250} rx={34} ry={14} fill="#fffbeb" stroke={INK} strokeWidth={1.4} />
        <circle cx={470} cy={250} r={9} fill="#f59e0b" stroke={INK} strokeWidth={1} />
        <ellipse cx={590} cy={252} rx={30} ry={12} fill="#fffbeb" stroke={INK} strokeWidth={1.4} />
        <circle cx={590} cy={252} r={8} fill="#f59e0b" stroke={INK} strokeWidth={1} />
        {/* chili rings */}
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx={400 + i * 34 + r() * 10} cy={230 + r() * 8} r={5} fill="none" stroke="#dc2626" strokeWidth={3} />
        ))}
        {/* spring onion */}
        {Array.from({ length: 22 }, (_, i) => (
          <rect key={i} x={366 + i * 14 + r() * 6} y={208 + r() * 6} width={7} height={3.5} rx={1.5} fill="#56785f" stroke={INK} strokeWidth={0.6} />
        ))}
        <path d="M340,200 L700,200" stroke={INK} strokeWidth={3} />
        {[-30, 0, 30].map(dx => (
          <path key={dx} d={`M${520 + dx},188 q-10,-16 0,-32 q10,-16 0,-32`} stroke="#6c6459" strokeOpacity={0.4} strokeWidth={2} fill="none" strokeLinecap="round" />
        ))}

        {/* The customer's table and bill */}
        <Table x={820} y={420} w={130} h={40} color={C.wood} />
        <rect x={846} y={348} width={48} height={30} fill={C.paper} stroke={INK} strokeWidth={1.5} transform="rotate(-6 870 363)" />
        <Caption x={870} y={368} size={10} fill="#7c2d12">75.000đ</Caption>
        <Person x={930} y={420} s={0.95} robe="#475569" hat="nonLa" pose="reach" flip />
      </g>
    )
  },
}

export default decorator
