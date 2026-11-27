import { Person } from './print/figures'
import { Kitchen } from './print/food'
import { Grass, GroundBand, LanternString } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT } from './print/pigments'
import { Lantern, Pot } from './print/props'
import { Backdrop, Part } from './print/structure'
import type { SceneDefinition } from './types'

const FEET = 378
const X = { bride: 38, groom: 100, mc: 238, deco: 345, dress: 440, music: 535, rite: 630, cook: 730, kitchen: 890 } as const

/** A flower arch with two red lanterns and a pot of lotus. */
function arch(x: number) {
  return (
    <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
      <rect x={x - 34} y={282} width={9} height={96} fill={PIGMENT.wood} />
      <rect x={x + 25} y={282} width={9} height={96} fill={PIGMENT.wood} />
      <path d={`M${x - 42},286 Q${x},262 ${x + 42},286 L${x + 42},296 L${x - 42},296 Z`} fill={PIGMENT.red} />
      <line x1={x - 16} y1={296} x2={x - 16} y2={306} strokeWidth={2} />
      <line x1={x + 16} y1={296} x2={x + 16} y2={306} strokeWidth={2} />
      <path d={`M${x - 28},348 L${x + 28},348 L${x + 22},378 L${x - 22},378 Z`} fill={PIGMENT.tile} />
      {[-14, 0, 14].map(dx => <circle key={dx} cx={x + dx} cy={336 - Math.abs(dx) / 3} r={9} fill={PIGMENT.pink} strokeWidth={2} />)}
      <circle cx={x} cy={334} r={4} fill={PIGMENT.yellow} strokeWidth={1.4} />
    </g>
  )
}

/** A dress form wearing the red áo dài and a turban. */
function dressForm(x: number) {
  return (
    <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
      <rect x={x - 3} y={330} width={6} height={44} fill={PIGMENT.woodDark} />
      <rect x={x - 22} y={372} width={44} height={8} fill={PIGMENT.woodDark} />
      <path d={`M${x - 14},304 Q${x},298 ${x + 14},304 L${x + 20},340 L${x + 30},372 L${x - 30},372 L${x - 20},340 Z`} fill={PIGMENT.red} />
      <line x1={x} y1={310} x2={x} y2={372} strokeWidth={1.6} />
      <rect x={x - 5} y={292} width={10} height={12} fill={PIGMENT.yellow} strokeWidth={2} />
      <circle cx={x} cy={278} r={13} fill={PIGMENT.skin} />
      <ellipse cx={x} cy={268} rx={17} ry={9} fill={INK} />
    </g>
  )
}

/** The family altar with incense bowl and two candles. */
function altar(x: number) {
  return (
    <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
      <rect x={x - 32} y={262} width={64} height={52} fill={PIGMENT.red} />
      <rect x={x - 24} y={270} width={48} height={36} fill="none" stroke={PIGMENT.yellow} strokeWidth={2} />
      <rect x={x - 42} y={316} width={84} height={10} rx={2} fill={PIGMENT.woodDark} />
      <rect x={x - 36} y={326} width={72} height={52} fill={PIGMENT.redDark} />
      <path d={`M${x - 16},316 L${x + 16},316 L${x + 12},300 L${x - 12},300 Z`} fill={PIGMENT.bronze} strokeWidth={2.4} />
      {[-30, 30].map(dx => (
        <g key={dx}>
          <rect x={x + dx - 4} y={298} width={8} height={18} fill={PIGMENT.white} strokeWidth={2} />
          <path d={`M${x + dx},286 q5,7 0,12 q-5,-5 0,-12 Z`} fill={PIGMENT.yellow} strokeWidth={1.6} />
        </g>
      ))}
    </g>
  )
}

const facade: SceneDefinition = {
  slug: 'facade',
  title: { en: 'Facade: a quan họ wedding with one coordinator', vi: 'Facade: đám cưới quan họ có một người điều phối' },
  setting: 'dusk',
  pins: [
    { nodeId: 'client', caption: { en: 'the couple make one call', vi: 'cô dâu chú rể chỉ gọi một lần' }, at: [70, 324], showName: false },
    { nodeId: 'facade', methods: ['startWedding'], caption: { en: 'knows who does what, and in which order', vi: 'biết việc nào do ai làm, theo thứ tự nào' }, at: [X.mc, 316], showName: false },
    { nodeId: 'sub1', methods: ['hangFlowers'], caption: { en: 'hangs lotus and lanterns', vi: 'treo hoa sen và đèn lồng' }, at: [X.deco, 336], showName: false },
    { nodeId: 'sub2', methods: ['dressBride'], caption: { en: 'dresses the bride in red', vi: 'mặc áo dài đỏ cho cô dâu' }, at: [X.dress, 336], showName: false },
    { nodeId: 'sub3', methods: ['sing'], caption: { en: 'sings quan họ songs', vi: 'hát các làn điệu quan họ' }, at: [X.music, 336], showName: false },
    { nodeId: 'sub4', methods: ['ancestralRite'], caption: { en: 'leads the rite at the family altar', vi: 'làm lễ gia tiên' }, at: [X.rite, 336], showName: false },
    { nodeId: 'extra', methods: ['prepareFeast'], caption: { en: 'runs the kitchen for the feast', vi: 'bếp trưởng lo mâm cỗ' }, at: [X.cook, 316], showName: false },
    { nodeId: 'sub5', methods: ['cook'], caption: { en: 'the stove and the trays', vi: 'bếp lửa và mâm cỗ' }, at: [X.kitchen, 340], showName: false },
  ],
  calls: [
    { id: 'start', nodeId: 'facade', method: 'startWedding', d: 'M136,262 L200,262' },
    { id: 'hang', nodeId: 'sub1', method: 'hangFlowers', d: 'M262,244 C290,210 320,214 340,256' },
    { id: 'dress', nodeId: 'sub2', method: 'dressBride', d: 'M266,240 C310,170 400,170 436,254' },
    { id: 'sing', nodeId: 'sub3', method: 'sing', d: 'M268,236 C340,130 490,130 532,248' },
    { id: 'rite', nodeId: 'sub4', method: 'ancestralRite', d: 'M270,232 C360,100 580,100 628,244' },
    { id: 'feast', nodeId: 'extra', method: 'prepareFeast', d: 'M274,226 C400,30 640,30 712,246' },
    { id: 'cook', nodeId: 'sub5', method: 'cook', d: 'M794,300 L834,300' },
    { id: 'direct', nodeId: 'extra', method: 'prepareFeast', d: 'M60,398 C250,432 560,432 706,386' },
  ],
  steps: [
    {
      calls: ['start'],
      nodes: ['client', 'facade'],
      at: [168, 214],
      caption: { en: 'The couple call startWedding() once, on the master of ceremonies.', vi: 'Cô dâu chú rể gọi startWedding() một lần, với người điều phối.' },
    },
    {
      calls: ['hang', 'dress'],
      nodes: ['facade', 'sub1', 'sub2'],
      at: [392, 214],
      caption: { en: 'He calls hangFlowers() and dressBride(): the flowers go up and the bride is dressed.', vi: 'Ông gọi hangFlowers() và dressBride(): hoa được treo, cô dâu mặc áo.' },
    },
    {
      calls: ['sing', 'rite'],
      nodes: ['facade', 'sub3', 'sub4'],
      at: [585, 158],
      caption: { en: 'Then sing() starts the quan họ songs and ancestralRite() performs the rite at the family altar.', vi: 'Rồi sing() bắt đầu các làn điệu quan họ và ancestralRite() làm lễ gia tiên.' },
    },
    {
      calls: ['feast'],
      nodes: ['facade', 'extra'],
      at: [500, 62],
      caption: { en: 'He hands the feast to the head cook with prepareFeast().', vi: 'Ông giao mâm cỗ cho bếp trưởng bằng prepareFeast().' },
    },
    {
      calls: ['cook'],
      nodes: ['extra', 'sub5'],
      at: [800, 232],
      caption: { en: 'The head cook handles the cooking steps: cook() and the rest.', vi: 'Bếp trưởng lo các bước nấu nướng: cook() và những việc còn lại.' },
    },
    {
      calls: ['direct'],
      nodes: ['client', 'extra'],
      at: [380, 412],
      caption: { en: 'For the smaller lại mặt meal, the family can call prepareFeast() on the head cook directly.', vi: 'Với bữa cỗ lại mặt nhỏ hơn, gia đình gọi thẳng prepareFeast() cho bếp trưởng.' },
    },
  ],
  focus: [0, 40, 960, 400],
  untagged: [],
  Art: function FacadeArt() {
    return (
      <>
        <Backdrop>
          <LanternString x0={20} x1={940} y={30} sag={16} count={9} />
          <GroundBand />
          <Grass x0={160} x1={200} seed={3} count={3} />
        </Backdrop>
        <Part node="client">
          <Person x={X.bride} y={FEET} s={1.2} robe={PIGMENT.red} pants={PIGMENT.white} hat="bun" pose="stand" />
          <Person x={X.groom} y={FEET} s={1.2} robe={PIGMENT.blue} pants={PIGMENT.woodDark} hat="khanXep" pose="point" />
        </Part>
        <Part node="facade">
          <Person x={X.mc} y={FEET} s={1.3} robe={PIGMENT.yellow} pants={PIGMENT.woodDark} hat="official" sash={PIGMENT.red} pose="point">
            <line x1={-30} y1={-118} x2={-30} y2={-4} stroke={INK} strokeWidth={5.5} strokeLinecap="round" />
            <line x1={-30} y1={-118} x2={-30} y2={-4} stroke={PIGMENT.wood} strokeWidth={3} strokeLinecap="round" />
          </Person>
        </Part>
        <Part node="sub1">{arch(X.deco)}</Part>
        <Part node="sub2">{dressForm(X.dress)}</Part>
        <Part node="sub3">
          <Person x={X.music} y={FEET} s={1.2} robe={PIGMENT.green} pants={PIGMENT.woodDark} hat="nonLa" hatColor={PIGMENT.straw} pose="wave" />
        </Part>
        <Part node="sub4">{altar(X.rite)}</Part>
        <Part node="extra">
          <Person x={X.cook} y={FEET} s={1.3} robe={PAPER_LIGHT} pants={PIGMENT.woodDark} hat="khanXep" hatColor={PAPER_LIGHT} pose="work">
            <line x1={28} y1={-62} x2={44} y2={-100} stroke={INK} strokeWidth={5} strokeLinecap="round" />
            <circle cx={46} cy={-104} r={7} fill={PIGMENT.steel} stroke={INK} strokeWidth={2} />
          </Person>
        </Part>
        <Part node="sub5">
          <Kitchen x={X.kitchen} y={FEET} w={120} h={130}>
            <Pot x={X.kitchen} y={FEET - 4} w={64} />
          </Kitchen>
          <Lantern x={X.kitchen + 44} y={290} r={9} glow={false} />
        </Part>
      </>
    )
  },
}

export default facade
