import { Person } from './kit/figures'
import { Caption } from './kit/overlay'
import { C, INK, W } from './kit/palette'
import { Lantern, RolledScroll, Shelf, Table } from './kit/props'
import type { SceneArtProps, SceneDefinition } from './types'

const memento: SceneDefinition = {
  slug: 'memento',
  title: { en: 'Memento: the royal historian keeps sealed records', vi: 'Memento: sử quan giữ các bản ghi niêm phong' },
  sky: 'interior',
  tags: [
    { nodeId: 'orig', method: 'saveChronicle', caption: { en: 'only the king reads his state', vi: 'chỉ vua đọc được trạng thái' }, at: [160, 92], to: [154, 236] },
    { nodeId: 'cmem', method: 'getState', caption: { en: 'sealed: numbers inside', vi: 'niêm phong: số liệu bên trong' }, at: [480, 92], to: [480, 240] },
    { nodeId: 'mem', method: 'getName', caption: { en: 'the historian sees only this', vi: 'sử quan chỉ thấy tên' }, at: [790, 70], to: [806, 136] },
    { nodeId: 'care', method: 'undoLast', caption: { en: 'decides when to roll back', vi: 'quyết định khi nào quay lại' }, at: [820, 412], to: [706, 340] },
  ],
  calls: [
    { nodeId: 'orig', method: 'saveChronicle', d: 'M254,246 C320,226 380,226 438,244', at: [336, 220] },
    { nodeId: 'orig', method: 'restore', d: 'M440,300 C380,322 320,322 256,302', at: [346, 334] },
    { nodeId: 'care', method: 'record', d: 'M676,282 C630,262 580,256 530,258', at: [606, 246] },
  ],
  untagged: [],
  Art: function MementoArt({ lang }: SceneArtProps) {
    return (
      <g>
        <rect width={W} height={360} fill="#ded0ba" />
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1={i * 62 + 14} y1={0} x2={i * 62 + 14} y2={360} stroke="#8b755e" strokeWidth={1} opacity={0.28} />
        ))}
        {[24, 936].map(x => <rect key={x} x={x - 8} y={0} width={16} height={360} fill={C.lacquer} stroke={INK} strokeWidth={2} />)}
        <rect y={358} width={W} height={82} fill="#c6b090" />
        {[374, 398, 424].map(y => <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="#8b755e" strokeWidth={1} opacity={0.5} />)}
        <Lantern x={320} y={90} r={12} cord={60} />
        <Lantern x={640} y={90} r={12} cord={60} color="#f2a03b" />

        {/* The king on his dais, with the kingdom's state on a board */}
        <rect x={40} y={346} width={250} height={14} fill={C.stone} stroke={INK} strokeWidth={1.5} />
        <rect x={60} y={150} width={60} height={110} rx={4} fill={C.lacquerDark} stroke={C.gold} strokeWidth={1.5} />
        {[0, 1, 2, 3].map(i => (
          <g key={i}>
            <circle cx={78 + (i % 2) * 22} cy={172 + Math.floor(i / 2) * 22} r={5} fill="#fde68a" stroke={INK} />
            <rect x={73 + (i % 2) * 22} y={178 + Math.floor(i / 2) * 22} width={10} height={9} rx={2} fill="#fde68a" stroke={INK} />
          </g>
        ))}
        {[0, 1, 2].map(i => <ellipse key={i} cx={90} cy={248 - i * 6} rx={16} ry={4.5} fill={C.gold} stroke={INK} />)}
        <Caption x={90} y={276} size={10} fill={C.gold}>{lang === 'vi' ? 'dân · ngân khố' : 'people · treasury'}</Caption>
        <Person x={170} y={346} s={1.15} robe="#ca8a04" pants="#7c2d12" hat="crown" pose="reach" />

        {/* A sealed record between them */}
        <rect x={446} y={240} width={72} height={52} fill={C.paper} stroke={INK} strokeWidth={2} />
        <rect x={442} y={236} width={80} height={6} rx={3} fill={C.wood} stroke={INK} strokeWidth={1.2} />
        <rect x={442} y={290} width={80} height={6} rx={3} fill={C.wood} stroke={INK} strokeWidth={1.2} />
        <circle cx={482} cy={266} r={12} fill="#b91c1c" stroke={INK} strokeWidth={1.5} />
        <path d="M476,266 h12 M482,260 v12" stroke="#fca5a5" strokeWidth={2} />

        {/* The historian's shelf: each record shows only its name slip */}
        <Shelf x={730} y={340} w={190} h={210} rows={3} />
        {[0, 1, 2].flatMap(row => [0, 1, 2].map(col => {
          const x = 744 + col * 58
          const y = 172 + row * 52
          return (
            <g key={`${row}-${col}`}>
              <RolledScroll x={x} y={y} w={40} />
              {(row === 0 && col < 3) || row === 1 ? <path d={`M${x + 20},${y + 6} l-5,14 l10,0 Z`} fill="#f6ead2" stroke={INK} strokeWidth={0.8} /> : null}
            </g>
          )
        }))}
        <Table x={560} y={404} w={130} h={34} color={C.wood} />
        <rect x={578} y={352} width={94} height={14} fill={C.paper} stroke={INK} strokeWidth={1.4} />
        <line x1={625} y1={352} x2={625} y2={366} stroke={INK} />
        <Person x={706} y={408} s={1.1} robe="#334155" hat="khanXep" pose="reach">
          <path d="M28,-58 l12,-10" stroke={INK} strokeWidth={2} />
        </Person>
      </g>
    )
  },
}

export default memento
