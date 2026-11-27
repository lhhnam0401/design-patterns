import { Gate, Hall } from './print/architecture'
import { Person } from './print/figures'
import { Cloud, GroundBand, Hills, Sun } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './print/pigments'
import { Jar } from './print/props'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const FEET = 378
const GATE_X = 96
/** The three guild houses along the street, and the two officials beyond them. */
const HOUSE_X = [300, 475, 650] as const
const OFFICIAL_X = { v1: 800, v2: 900 } as const
/** The street lane the capital walks to reach each guild's door. */
const STREET = 400

/** The capital calls accept() on guild i: down into the street, along it, and up to the door. */
const acceptPath = (i: number) => {
  const door = HOUSE_X[i] - 22
  return `M184,360 C188,392 200,${STREET} 222,${STREET} L${door - 18},${STREET} C${door - 4},${STREET} ${door},${STREET - 6} ${door},384`
}

/** Bolts of silk in three colours, stacked by the weavers' door. */
function silk(x: number) {
  return (
    <g stroke={INK} strokeLinejoin="round">
      {[PIGMENT.pink, PIGMENT.yellow, PIGMENT.blue].map((c, i) => (
        <g key={c}>
          <rect x={x - 22 + (i === 1 ? 6 : 0)} y={FEET - 14 - i * 13} width={40} height={13} rx={6.5} fill={c} strokeWidth={2} />
          <ellipse cx={x - 16 + (i === 1 ? 6 : 0)} cy={FEET - 7.5 - i * 13} rx={3} ry={6} fill={PAPER_LIGHT} strokeWidth={1.4} />
        </g>
      ))}
    </g>
  )
}

/** A stack of logs and a saw, by the carpenters' door. */
function timber(x: number) {
  return (
    <g stroke={INK} strokeLinejoin="round">
      {[[-14, -9], [2, -9], [18, -9], [-6, -24], [10, -24]].map(([dx, dy]) => (
        <g key={`${dx}${dy}`}>
          <circle cx={x + dx} cy={FEET + dy} r={8} fill={PIGMENT.wood} strokeWidth={2} />
          <circle cx={x + dx} cy={FEET + dy} r={3.5} fill="none" stroke={PIGMENT.woodDark} strokeWidth={1.4} />
        </g>
      ))}
      <path d={`M${x - 24},${FEET - 40} L${x + 22},${FEET - 48} L${x + 24},${FEET - 40} L${x - 22},${FEET - 33} Z`} fill={PIGMENT.steel} strokeWidth={1.8} />
      <rect x={x + 20} y={FEET - 54} width={8} height={16} rx={2} fill={PIGMENT.woodDark} strokeWidth={1.6} transform={`rotate(-10 ${x + 24} ${FEET - 46})`} />
    </g>
  )
}

/** A small kiln with a fire mouth, beside the potters' jars. */
function kiln(x: number) {
  return (
    <g stroke={INK} strokeLinejoin="round">
      <path d={`M${x - 20},${FEET} Q${x - 22},${FEET - 40} ${x},${FEET - 44} Q${x + 22},${FEET - 40} ${x + 20},${FEET} Z`} fill={PIGMENT.tile} strokeWidth={2.4} />
      <path d={`M${x - 8},${FEET} L${x - 8},${FEET - 12} Q${x},${FEET - 20} ${x + 8},${FEET - 12} L${x + 8},${FEET} Z`} fill={PIGMENT.yellow} strokeWidth={1.8} />
      <rect x={x - 5} y={FEET - 54} width={10} height={11} fill={PIGMENT.tileDark} strokeWidth={1.6} />
    </g>
  )
}

const visitor: SceneDefinition = {
  slug: 'visitor',
  title: { en: 'Visitor: officials make the rounds of the craft guilds', vi: 'Visitor: các quan đi thăm phường thủ công' },
  setting: 'dawn',
  pins: [
    { nodeId: 'client', methods: ['welcomeVisitor'], caption: { en: 'the capital lets an official in and walks its list of guilds', vi: 'kinh thành đón quan vào và đi qua danh sách phường hội' }, at: [GATE_X, 334], showName: false },
    { nodeId: 'elem', methods: ['accept'], caption: { en: 'every guild opens its door to any official', vi: 'phường nào cũng mở cửa đón mọi vị quan' }, at: [380, 44], side: 'left' },
    { nodeId: 'visitor', methods: ['visitSilkWeaversGuild', 'visitPotteryGuild', 'visitCarpentryGuild'], caption: { en: 'one kind of visit for each kind of guild', vi: 'mỗi loại phường một cách thăm' }, at: [780, 44], showName: false },
    { nodeId: 'e1', methods: ['accept'], caption: { en: 'silk weavers', vi: 'phường dệt lụa' }, at: [HOUSE_X[0], 330], showName: false },
    { nodeId: 'e2', methods: ['accept'], caption: { en: 'potters', vi: 'phường gốm' }, at: [HOUSE_X[1], 330], showName: false },
    { nodeId: 'e3', methods: ['accept'], caption: { en: 'carpenters', vi: 'phường mộc' }, at: [HOUSE_X[2], 330], showName: false },
    { nodeId: 'v1', methods: ['visitSilkWeaversGuild', 'visitPotteryGuild', 'visitCarpentryGuild'], caption: { en: 'counts the tax at each guild’s own rate and keeps the total', vi: 'tính thuế theo mức riêng của từng phường và cộng dồn' }, at: [OFFICIAL_X.v1, 336], showName: false },
    { nodeId: 'v2', methods: ['visitSilkWeaversGuild', 'visitPotteryGuild', 'visitCarpentryGuild'], caption: { en: 'checks tribute silk and pottery; nothing to check at the carpenters', vi: 'kiểm tra lụa và gốm tiến vua; phường mộc không có gì để kiểm' }, at: [OFFICIAL_X.v2, 336], showName: false },
  ],
  calls: [
    { id: 'welcome', nodeId: 'client', method: 'welcomeVisitor', d: 'M16,146 C34,170 52,198 70,232' },
    { id: 'accept-e1', nodeId: 'e1', method: 'accept', d: acceptPath(0) },
    { id: 'accept-e2', nodeId: 'e2', method: 'accept', d: acceptPath(1) },
    { id: 'accept-e3', nodeId: 'e3', method: 'accept', d: acceptPath(2) },
    { id: 'tax-e1', nodeId: 'v1', method: 'visitSilkWeaversGuild', d: 'M324,232 C390,140 690,140 786,228' },
    { id: 'tax-e2', nodeId: 'v1', method: 'visitPotteryGuild', d: 'M499,232 C550,160 700,160 790,230' },
    { id: 'tax-e3', nodeId: 'v1', method: 'visitCarpentryGuild', d: 'M674,232 C700,190 750,186 794,232' },
    { id: 'insp-e1', nodeId: 'v2', method: 'visitSilkWeaversGuild', d: 'M276,232 C350,96 820,96 888,226' },
    { id: 'insp-e2', nodeId: 'v2', method: 'visitPotteryGuild', d: 'M451,232 C520,120 820,120 892,228' },
    { id: 'insp-e3', nodeId: 'v2', method: 'visitCarpentryGuild', d: 'M626,232 C680,150 840,140 896,230' },
  ],
  steps: [
    {
      calls: ['welcome'],
      nodes: ['client', 'visitor', 'v1'],
      at: [70, 150],
      caption: { en: 'welcomeVisitor(taxCollector): the gate opens for the tax collector, whom the capital knows only as a GuildVisitor.', vi: 'welcomeVisitor(taxCollector): kinh thành mở cổng đón quan thu thuế, chỉ biết ông là một GuildVisitor.' },
    },
    {
      calls: ['accept-e1', 'accept-e2', 'accept-e3', 'tax-e1', 'tax-e2', 'tax-e3'],
      nodes: ['client', 'elem', 'e1', 'e2', 'e3', 'visitor', 'v1'],
      at: [214, 340],
      caption: { en: 'The capital calls accept() on each guild, and each guild calls back the visit meant for its own class, such as visitPotteryGuild().', vi: 'Kinh thành gọi accept() trên từng phường, và mỗi phường gọi lại đúng phương thức thăm cho lớp của mình, như visitPotteryGuild().' },
    },
    {
      calls: ['tax-e1', 'tax-e2', 'tax-e3'],
      nodes: ['e1', 'e2', 'e3', 'visitor', 'v1'],
      at: [730, 412],
      caption: { en: 'Each visit adds that guild’s rate to totalTax: 10% of silk, 8% of pottery, 12% of carpentry, 2,360,000đ in all.', vi: 'Mỗi lần thăm cộng mức thuế riêng vào totalTax: lụa 10%, gốm 8%, mộc 12%, tổng cộng 2.360.000đ.' },
    },
    {
      calls: ['welcome', 'accept-e1', 'accept-e2', 'accept-e3', 'insp-e1', 'insp-e2', 'insp-e3'],
      nodes: ['client', 'elem', 'e1', 'e2', 'e3', 'visitor', 'v2'],
      at: [850, 412],
      caption: { en: 'welcomeVisitor() with the inspector: the same accept() calls now check silk and pottery. Not one line of guild code changed.', vi: 'welcomeVisitor() với quan kiểm tra: cùng các lời gọi accept() giờ kiểm lụa và gốm. Mã của các phường không đổi một dòng.' },
    },
  ],
  focus: [60, 100, 820, 340],
  untagged: [],
  Art: function VisitorArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Sun x={672} y={58} r={24} />
          <Cloud x={130} y={64} s={0.7} />
          <Hills y={300} amp={24} color={TINT.amber} seed={13} step={150} />
          <GroundBand />
          <line x1={180} y1={STREET} x2={960} y2={STREET} stroke={TINT.groundEdge} strokeWidth={2} strokeDasharray="14 10" />
        </Backdrop>

        {/* The rail: one interface over the guilds, one over the officials */}
        <Part node="elem">
          <Signboard x={475} w={240} tone="interface" span={[HOUSE_X[0], HOUSE_X[2]]} ticks={[...HOUSE_X]}>
            <Caption x={500} y={53}>{lang === 'vi' ? 'mỗi phường nghề' : 'any craft guild'}</Caption>
          </Signboard>
        </Part>
        <Part node="visitor">
          <Signboard x={850} w={200} tone="interface" span={[OFFICIAL_X.v1, OFFICIAL_X.v2]}>
            <Caption x={872} y={53}>{lang === 'vi' ? 'một vị quan' : 'an official'}</Caption>
          </Signboard>
        </Part>

        {/* The capital's gate */}
        <Part node="client">
          <Gate cx={GATE_X} y={FEET} w={168} h={110} />
        </Part>

        {/* Three guild houses, each with its craft by the door */}
        <Part node="e1">
          <Hall cx={HOUSE_X[0]} y={FEET} w={100} h={74} roofH={50} doors={2} />
          {silk(HOUSE_X[0] - 58)}
        </Part>
        <Part node="e2">
          <Hall cx={HOUSE_X[1]} y={FEET} w={100} h={74} roofH={50} doors={2} wall={PIGMENT.amberDark} />
          <Jar x={HOUSE_X[1] - 66} y={FEET} s={0.8} />
          <Jar x={HOUSE_X[1] - 44} y={FEET} s={0.62} color={PIGMENT.blue} glaze={PAPER_LIGHT} />
          {kiln(HOUSE_X[1] + 68)}
        </Part>
        <Part node="e3">
          <Hall cx={HOUSE_X[2]} y={FEET} w={100} h={74} roofH={50} doors={2} wall={PIGMENT.woodDark} />
          {timber(HOUSE_X[2] - 60)}
        </Part>

        {/* The tax collector, with his abacus and the chest that holds the total */}
        <Part node="v1">
          <rect x={742} y={354} width={26} height={24} rx={2} fill={PIGMENT.redDark} stroke={INK} strokeWidth={2.2} />
          <rect x={740} y={350} width={30} height={7} rx={2} fill={PIGMENT.red} stroke={INK} strokeWidth={2} />
          {[748, 755, 762].map(cx => <circle key={cx} cx={cx} cy={346} r={4} fill={PIGMENT.yellow} stroke={INK} strokeWidth={1.4} />)}
          <Person x={OFFICIAL_X.v1} y={FEET} s={1.25} robe={PIGMENT.blue} pants={PIGMENT.blueDark} hat="official" pose="hold">
            <rect x={-15} y={-68} width={30} height={20} rx={1.5} fill={PIGMENT.wood} stroke={INK} strokeWidth={1.6} />
            {[0, 1, 2].map(r => [0, 1, 2, 3].map(c => <circle key={`${r}-${c}`} cx={-9 + c * 6} cy={-63 + r * 5} r={1.8} fill={PIGMENT.yellow} stroke={INK} strokeWidth={0.6} />))}
          </Person>
        </Part>

        {/* The inspector, with a scroll of tribute goods and a red seal */}
        <Part node="v2">
          <Person x={OFFICIAL_X.v2} y={FEET} s={1.25} robe={PIGMENT.green} pants={PIGMENT.greenDark} hat="official" pose="hold">
            <rect x={-15} y={-70} width={30} height={20} fill={PAPER_LIGHT} stroke={INK} strokeWidth={1.6} />
            {[0, 1, 2].map(r => <line key={r} x1={-11} y1={-65 + r * 5} x2={5} y2={-65 + r * 5} stroke={INK} strokeWidth={1.2} />)}
            <rect x={6} y={-60} width={8} height={8} fill={PIGMENT.red} stroke={INK} strokeWidth={1.2} />
          </Person>
        </Part>
      </>
    )
  },
}

export default visitor
