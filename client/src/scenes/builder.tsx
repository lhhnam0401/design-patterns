import { Hall, Roof } from './kit/architecture'
import { Person } from './kit/figures'
import { Bamboo, Cloud, Grass, Ground, Hills, Sun } from './kit/nature'
import { C, INK } from './kit/palette'
import { Scroll, Table } from './kit/props'
import type { SceneDefinition } from './types'

const BASE = 300
const STAGES = [262, 382, 502, 622, 800]
const mid = (i: number) => (STAGES[i] + STAGES[i + 1]) / 2 - (i === 3 ? 10 : 0)

function base(cx: number, w = 96) {
  return (
    <g>
      <rect x={cx - w / 2} y={BASE - 12} width={w} height={12} fill={C.stone} stroke={INK} strokeWidth={2} />
      <rect x={cx - w / 2 - 8} y={BASE - 3} width={w + 16} height={5} fill={C.stoneDark} stroke={INK} strokeWidth={1.4} />
    </g>
  )
}

function columns(cx: number, h = 46) {
  return (
    <g>
      {[-36, -12, 12, 36].map(dx => (
        <rect key={dx} x={cx + dx - 4} y={BASE - 12 - h} width={8} height={h} fill={C.lacquer} stroke={INK} strokeWidth={1.8} />
      ))}
      <rect x={cx - 46} y={BASE - 18 - h} width={92} height={7} fill={C.woodDark} stroke={INK} strokeWidth={1.8} />
    </g>
  )
}

function scaffold(cx: number, top: number) {
  return (
    <g stroke="#a3823f" strokeWidth={2.4} strokeLinecap="round">
      <line x1={cx - 56} y1={BASE} x2={cx - 54} y2={top} />
      <line x1={cx + 56} y1={BASE} x2={cx + 54} y2={top} />
      <line x1={cx - 58} y1={BASE - 30} x2={cx + 58} y2={BASE - 30} />
      <line x1={cx - 56} y1={top + 14} x2={cx + 56} y2={top + 14} />
      <line x1={cx - 56} y1={BASE - 30} x2={cx - 20} y2={top + 14} strokeOpacity={0.7} />
    </g>
  )
}

const builder: SceneDefinition = {
  slug: 'builder',
  title: { en: 'Builder: raising a communal house step by step', vi: 'Builder: dựng đình làng từng bước' },
  sky: 'dawn',
  tags: [
    { nodeId: 'director', method: 'buildGrandHouse', caption: { en: 'master carpenter knows the order', vi: 'thợ cả nắm thứ tự các bước' }, at: [150, 92], to: [126, 262] },
    { nodeId: 'client', caption: { en: 'the village elder', vi: 'cụ trưởng làng' }, at: [64, 178], to: [50, 302] },
    { nodeId: 'builder', caption: { en: 'steps every builder has', vi: 'các bước builder nào cũng có' }, at: [540, 52], to: [540, 210] },
    { nodeId: 'p1', method: 'describe', caption: { en: 'the finished đình', vi: 'ngôi đình hoàn chỉnh' }, at: [812, 92], to: [800, 172] },
    { nodeId: 'cb1', method: 'getProduct', caption: { en: 'the building crew', vi: 'đội thợ dựng đình' }, at: [372, 404], to: [500, 352] },
    { nodeId: 'cb2', method: 'getProduct', caption: { en: 'the scribe draws it', vi: 'thầy đồ vẽ lại' }, at: [672, 404], to: [790, 352] },
    { nodeId: 'p2', method: 'show', caption: { en: 'paper drawing', vi: 'bản vẽ trên giấy' }, at: [896, 334], to: [868, 384] },
  ],
  calls: [
    { nodeId: 'builder', method: 'buildFoundation', d: 'M168,300 C190,318 200,318 210,308', at: [192, 340] },
    { nodeId: 'builder', method: 'buildColumns', d: `M${STAGES[0] + 50},316 L${STAGES[1] - 50},316`, at: [mid(0), 326] },
    { nodeId: 'builder', method: 'buildRoof', d: `M${STAGES[1] + 50},316 L${STAGES[2] - 50},316`, at: [mid(1), 326] },
    { nodeId: 'builder', method: 'addCarving', d: `M${STAGES[2] + 50},316 L${STAGES[3] - 50},316`, at: [mid(2), 326] },
    { nodeId: 'builder', method: 'setupAltar', d: `M${STAGES[3] + 50},316 L${STAGES[4] - 66},316`, at: [mid(3), 326] },
  ],
  untagged: [],
  Art: function BuilderArt() {
    return (
      <g>
        <Sun x={720} y={250} r={40} />
        <Cloud x={300} y={80} s={1.1} color="#fde68a" />
        <Cloud x={690} y={130} s={0.9} color="#fde68a" />
        <Hills y={250} amp={40} color="#4b2e55" seed={12} />
        <Hills y={282} amp={22} color="#3a2338" seed={15} step={90} />
        <Ground y={296} color="#3a2616" edge="#4d331d" />
        <Bamboo x={905} y={300} h={190} seed={6} count={4} />

        {/* ① foundation */}
        {base(STAGES[0])}
        {[[-30, 0], [-16, 0], [-23, -8]].map(([dx, dy], i) => (
          <rect key={i} x={STAGES[0] + dx} y={BASE - 24 + dy} width={14} height={10} fill={C.stone} stroke={INK} strokeWidth={1.2} />
        ))}
        {/* ② columns */}
        {base(STAGES[1])}
        {columns(STAGES[1])}
        {scaffold(STAGES[1], BASE - 90)}
        {/* ③ roof */}
        {base(STAGES[2])}
        {columns(STAGES[2])}
        <Roof cx={STAGES[2]} y={BASE - 66} w={128} h={42} ornaments={false} />
        {scaffold(STAGES[2], BASE - 110)}
        {/* ④ carvings */}
        {base(STAGES[3])}
        {columns(STAGES[3])}
        <rect x={STAGES[3] - 40} y={BASE - 58} width={80} height={46} fill="#7a2f1c" stroke={INK} strokeWidth={2} />
        <Roof cx={STAGES[3]} y={BASE - 66} w={128} h={42} />
        <path d={`M${STAGES[3] - 54},${BASE - 112} q12,-14 26,-4 q10,8 22,-2`} stroke={C.gold} strokeWidth={3} fill="none" strokeLinecap="round" />
        <path d={`M${STAGES[3] + 54},${BASE - 112} q-12,-14 -26,-4 q-10,8 -22,-2`} stroke={C.gold} strokeWidth={3} fill="none" strokeLinecap="round" />
        {/* ⑤ altar: the finished communal house */}
        <Hall cx={STAGES[4]} y={BASE} w={124} h={56} roofH={44} doors={3} />
        <rect x={STAGES[4] - 12} y={BASE - 36} width={24} height={14} fill={C.lacquer} stroke={INK} strokeWidth={1.4} />
        {[-6, 0, 6].map(dx => <line key={dx} x1={STAGES[4] + dx} y1={BASE - 36} x2={STAGES[4] + dx} y2={BASE - 48} stroke="#fde68a" strokeWidth={1.4} />)}

        {/* The elder (client) hands the job to the master carpenter (director) */}
        <Person x={50} y={398} s={0.98} robe="#4b5563" pants="#1f2937" hat="khanXep" pose="stand">
          <line x1={-17} y1={-40} x2={-20} y2={0} stroke={C.wood} strokeWidth={3} />
        </Person>
        <Person x={126} y={392} s={1.12} robe="#7a3b1e" hat="khanXep" hatColor="#7c2d12" pose="point">
          <Scroll x={-26} y={-58} w={16} h={22} lines={2} seal={false} />
        </Person>

        {/* The crew carries an ironwood beam */}
        <Person x={500} y={428} s={1.02} robe="#57534e" pants="#292524" hat="nonLa" long={false} pose="hold" />
        <Person x={580} y={428} s={1.02} robe="#6b4226" pants="#292524" hat="nonLa" long={false} pose="hold" />
        <rect x={462} y={364} width={160} height={11} rx={5} fill="#8a5a2b" stroke={INK} strokeWidth={1.8} />
        <ellipse cx={622} cy={369.5} rx={4} ry={5.5} fill="#c08a4a" stroke={INK} strokeWidth={1} />

        {/* The scribe draws a blueprint from the same steps */}
        <Person x={790} y={428} s={1.02} robe="#1e3a8a" hat="topknot" pose="reach">
          <line x1={30} y1={-58} x2={40} y2={-50} stroke={INK} strokeWidth={2} />
        </Person>
        <Table x={828} y={430} w={92} h={34} color={C.wood} />
        <rect x={834} y={376} width={78} height={18} fill="#1e3a8a" stroke={INK} strokeWidth={1.5} transform="skewX(-12) translate(80,0)" />
        <g stroke="#dbeafe" strokeWidth={1} fill="none" transform="skewX(-12) translate(80,0)">
          <path d="M846,390 L846,383 L858,378 L870,378 L882,383 L882,390" />
          <line x1={852} y1={390} x2={852} y2={384} />
          <line x1={876} y1={390} x2={876} y2={384} />
          <line x1={892} y1={381} x2={904} y2={381} />
          <line x1={892} y1={386} x2={904} y2={386} />
        </g>
        <Grass y={440} seed={4} count={34} />
      </g>
    )
  },
}

export default builder
