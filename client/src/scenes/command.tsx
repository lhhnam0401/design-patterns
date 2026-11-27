import { Roof } from './print/architecture'
import { Person } from './print/figures'
import { Grass, GroundBand, Hills, Sun } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT } from './print/pigments'
import { RolledScroll, Scroll, Table } from './print/props'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const FEET = 378
const EMPEROR_X = 78
const SECRETARY_X = 330
/** The two decrees hang side by side, the second lower so each has its own lane to the city. */
const DECREE = {
  c1: { x: 500, top: 140 },
  c2: { x: 650, top: 222 },
} as const
const DECREE_W = 76
const DECREE_H = 110
const CITY_X = 860

/** A hanging decree scroll with a picture of what it orders. */
function decree(id: keyof typeof DECREE) {
  const { x, top } = DECREE[id]
  const left = x - DECREE_W / 2
  const bottom = top + DECREE_H
  return (
    <g stroke={INK} strokeLinejoin="round">
      <line x1={x} y1={112} x2={x} y2={top - 4} strokeWidth={2.2} />
      <rect x={left} y={top} width={DECREE_W} height={DECREE_H} fill={PAPER_LIGHT} strokeWidth={2.8} />
      <rect x={left - 6} y={top - 5} width={DECREE_W + 12} height={9} rx={4} fill={PIGMENT.red} strokeWidth={2.2} />
      <rect x={left - 6} y={bottom - 4} width={DECREE_W + 12} height={9} rx={4} fill={PIGMENT.red} strokeWidth={2.2} />
      <circle cx={left - 6} cy={bottom} r={3.5} fill={PIGMENT.yellow} strokeWidth={1.4} />
      <circle cx={left + DECREE_W + 6} cy={bottom} r={3.5} fill={PIGMENT.yellow} strokeWidth={1.4} />
      {id === 'c1' ? (
        // A citadel: a wall with merlons and an arched gate
        <g>
          <rect x={x - 26} y={top + 26} width={52} height={32} fill={PIGMENT.tile} strokeWidth={2} />
          {[0, 1, 2, 3, 4].map(i => <rect key={i} x={x - 26 + i * 11.5} y={top + 18} width={6.5} height={8} fill={PIGMENT.tile} strokeWidth={1.6} />)}
          <path d={`M${x - 8},${top + 58} L${x - 8},${top + 44} Q${x},${top + 34} ${x + 8},${top + 44} L${x + 8},${top + 58} Z`} fill={INK} strokeWidth={1.4} />
        </g>
      ) : (
        // Fewer coins: a stack of three with a downward arrow
        <g>
          {[0, 1, 2].map(i => <ellipse key={i} cx={x - 8} cy={top + 54 - i * 9} rx={15} ry={5} fill={PIGMENT.yellow} strokeWidth={1.8} />)}
          <path d={`M${x + 20},${top + 18} L${x + 20},${top + 52} M${x + 12},${top + 44} L${x + 20},${top + 54} L${x + 28},${top + 44}`} fill="none" stroke={PIGMENT.green} strokeWidth={3.6} strokeLinecap="round" />
        </g>
      )}
      {[0, 1].map(i => <line key={i} x1={left + 12} y1={top + 74 + i * 11} x2={left + DECREE_W - 24} y2={top + 74 + i * 11} strokeWidth={2} strokeLinecap="round" />)}
      <rect x={left + DECREE_W - 20} y={top + 76} width={12} height={12} fill={PIGMENT.red} strokeWidth={1.4} />
    </g>
  )
}

/** The emperor's writing desk: a fresh scroll, an ink stone and a brush. */
function desk() {
  return (
    <g>
      <Table x={100} y={FEET} w={100} h={50} />
      <Scroll x={118} y={306} w={44} h={14} lines={1} seal={false} />
      <rect x={168} y={308} width={18} height={10} rx={2} fill={PIGMENT.iron} stroke={INK} strokeWidth={1.6} />
      <line x1={150} y1={296} x2={164} y2={312} stroke={INK} strokeWidth={3} strokeLinecap="round" />
    </g>
  )
}

/** The history chest: a lacquered box holding the decrees already proclaimed. */
function historyChest(x: number) {
  return (
    <g stroke={INK} strokeLinejoin="round">
      <rect x={x} y={FEET - 34} width={66} height={34} rx={3} fill={PIGMENT.redDark} strokeWidth={2.6} />
      <rect x={x - 3} y={FEET - 42} width={72} height={10} rx={2} fill={PIGMENT.red} strokeWidth={2.2} />
      <circle cx={x + 33} cy={FEET - 18} r={5} fill={PIGMENT.yellow} strokeWidth={1.6} />
      <RolledScroll x={x + 8} y={FEET - 48} w={30} />
    </g>
  )
}

/** The city: a citadel wall with a gate tower, and the tax chest at its foot. */
function city() {
  const left = CITY_X - 90
  return (
    <g stroke={INK} strokeLinejoin="round">
      <rect x={left} y={FEET - 108} width={180} height={108} fill={PIGMENT.tile} strokeWidth={3} />
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={left + 2 + i * 23} y={FEET - 120} width={14} height={12} fill={PIGMENT.tile} strokeWidth={2} />)}
      {[1, 2, 3].map(r => <line key={r} x1={left} y1={FEET - 108 + r * 27} x2={left + 180} y2={FEET - 108 + r * 27} stroke={PIGMENT.tileDark} strokeWidth={1.6} />)}
      <path d={`M${CITY_X - 22},${FEET} L${CITY_X - 22},${FEET - 46} Q${CITY_X},${FEET - 70} ${CITY_X + 22},${FEET - 46} L${CITY_X + 22},${FEET} Z`} fill={PIGMENT.woodDark} strokeWidth={2.6} />
      <rect x={CITY_X - 36} y={FEET - 178} width={72} height={58} fill={PIGMENT.redDark} strokeWidth={2.8} />
      <rect x={CITY_X - 12} y={FEET - 166} width={24} height={30} fill={PAPER_LIGHT} strokeWidth={2} />
      <Roof cx={CITY_X} y={FEET - 176} w={96} h={30} ornaments={false} />
      <g>
        <rect x={left - 10} y={FEET - 30} width={44} height={30} rx={2} fill={PIGMENT.wood} strokeWidth={2.4} />
        {[0, 1, 2].map(i => <ellipse key={i} cx={left + 12} cy={FEET - 34 - i * 7} rx={16} ry={5} fill={PIGMENT.yellow} strokeWidth={1.6} />)}
      </g>
    </g>
  )
}

const command: SceneDefinition = {
  slug: 'command',
  title: { en: 'Command: the Emperor’s decrees as objects', vi: 'Command: chiếu chỉ của Hoàng đế là các đối tượng' },
  setting: 'dawn',
  pins: [
    { nodeId: 'client', caption: { en: 'writes the decrees', vi: 'soạn chiếu chỉ' }, at: [EMPEROR_X - 8, 338], showName: false },
    { nodeId: 'inv', methods: ['revoke'], caption: { en: 'keeps the queue and the history', vi: 'giữ hàng chờ và sổ lịch sử' }, at: [SECRETARY_X, 338], showName: false },
    { nodeId: 'cmd', caption: { en: 'every decree can execute and undo', vi: 'chiếu nào cũng thi hành và thu hồi được' }, at: [474, 44], side: 'left' },
    { nodeId: 'c1', caption: { en: 'build a citadel', vi: 'xây thành' }, at: [DECREE.c1.x, DECREE.c1.top + DECREE_H + 10], showName: false },
    { nodeId: 'c2', caption: { en: 'cut tax by 10%', vi: 'giảm thuế 10%' }, at: [DECREE.c2.x, DECREE.c2.top + DECREE_H + 22], showName: false },
    { nodeId: 'recv', methods: ['buildCitadel'], caption: { en: 'does the real work', vi: 'làm công việc thực sự' }, at: [CITY_X + 40, 330], showName: false },
  ],
  calls: [
    { id: 'receive', nodeId: 'inv', method: 'receiveDecree', d: 'M150,222 C190,188 246,188 284,226' },
    { id: 'proclaim', nodeId: 'inv', method: 'proclaim', d: 'M122,262 L296,262' },
    { id: 'revoke', nodeId: 'inv', method: 'revoke', d: 'M206,306 L296,306' },
    { id: 'exec-citadel', nodeId: 'c1', method: 'execute', d: 'M362,236 C392,214 420,200 454,196' },
    { id: 'exec-tax', nodeId: 'c2', method: 'execute', d: 'M364,290 L602,290' },
    { id: 'build', nodeId: 'recv', method: 'buildCitadel', d: 'M548,190 C640,176 720,180 782,202' },
    { id: 'cut', nodeId: 'recv', method: 'cutTax', d: 'M698,290 L764,290' },
    { id: 'undo', nodeId: 'c2', method: 'undo', d: 'M364,322 C440,340 540,340 602,324' },
    { id: 'raise', nodeId: 'recv', method: 'raiseTax', d: 'M698,324 L764,324' },
  ],
  steps: [
    {
      calls: ['receive'],
      nodes: ['client', 'inv', 'c1', 'c2'],
      at: [214, 160],
      caption: { en: 'The Emperor writes two decrees and hands each to the secretary with receiveDecree(). Nothing has happened in the city yet.', vi: 'Hoàng đế soạn hai chiếu chỉ và giao từng chiếu cho thư ký bằng receiveDecree(). Trong thành chưa có gì thay đổi.' },
    },
    {
      calls: ['proclaim', 'exec-citadel', 'exec-tax'],
      nodes: ['client', 'inv', 'cmd', 'c1', 'c2'],
      at: [410, 172],
      caption: { en: 'proclaim() takes each decree from the queue, calls its execute() and files it in the history.', vi: 'proclaim() lấy từng chiếu khỏi hàng chờ, gọi execute() của nó rồi cất vào sổ lịch sử.' },
    },
    {
      calls: ['build', 'cut'],
      nodes: ['c1', 'c2', 'recv'],
      at: [720, 146],
      caption: { en: 'Each decree passes the work to the city: buildCitadel() raises the citadel, cutTax() lowers the tax.', vi: 'Mỗi chiếu chuyển việc cho thành: buildCitadel() xây thành lũy, cutTax() giảm thuế.' },
    },
    {
      calls: ['revoke', 'undo', 'raise'],
      nodes: ['client', 'inv', 'cmd', 'c2', 'recv'],
      at: [240, 410],
      caption: { en: 'revoke() pops the latest decree from the history and calls its undo(): raiseTax() puts the tax back.', vi: 'revoke() lấy chiếu gần nhất khỏi sổ lịch sử và gọi undo(): raiseTax() trả mức thuế về như cũ.' },
    },
  ],
  focus: [0, 40, 960, 400],
  untagged: [],
  Art: function CommandArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Sun x={120} y={160} r={26} />
          <Hills y={300} amp={24} seed={2} step={150} />
          <GroundBand />
          <Grass x0={700} x1={960} seed={5} count={6} />
        </Backdrop>

        {/* The interface hangs over both decrees */}
        <Part node="cmd">
          <Signboard x={590} w={250} tone="interface" span={[DECREE.c1.x, DECREE.c2.x]} ticks={[DECREE.c1.x, DECREE.c2.x]}>
            <Caption x={606} y={53}>{lang === 'vi' ? 'Một đạo chiếu' : 'A royal order'}</Caption>
          </Signboard>
        </Part>

        {/* The Emperor at his writing desk */}
        <Part node="client">
          <Person x={EMPEROR_X} y={FEET} s={1.3} robe={PIGMENT.yellow} pants={PIGMENT.redDark} sash={PIGMENT.red} hat="crown" pose="work" />
          {desk()}
        </Part>

        {/* The royal secretary: the queue in his hands, the history chest at his feet */}
        <Part node="inv">
          {historyChest(226)}
          <Person x={SECRETARY_X} y={FEET} s={1.25} robe={PIGMENT.blue} pants={PIGMENT.blueDark} sash={PIGMENT.yellow} hat="official" pose="hold">
            <rect x={-16} y={-62} width={32} height={8} rx={2} fill={PIGMENT.wood} stroke={INK} strokeWidth={1.6} />
            <RolledScroll x={-14} y={-67} w={26} />
          </Person>
        </Part>

        {/* The two decrees: build a citadel, cut the tax */}
        <Part node="c1">{decree('c1')}</Part>
        <Part node="c2">{decree('c2')}</Part>

        {/* The city that does the real work */}
        <Part node="recv">{city()}</Part>
      </>
    )
  },
}

export default command
