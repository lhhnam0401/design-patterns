import { Hall } from './kit/architecture'
import { Person } from './kit/figures'
import { BlossomTree, Ground, Hills, Stars } from './kit/nature'
import { Caption } from './kit/overlay'
import { C, INK } from './kit/palette'
import { Board, Dish, LanternString, LogCake, SquareCake, Table } from './kit/props'
import type { SceneArtProps, SceneDefinition } from './types'

const TABLE_TOP = 344

const abstractFactory: SceneDefinition = {
  slug: 'abstract-factory',
  title: { en: 'Abstract Factory: matching Tết feast trays', vi: 'Abstract Factory: mâm cỗ Tết đồng bộ theo vùng' },
  sky: 'night',
  tags: [
    { nodeId: 'factory', caption: { en: 'every kitchen makes one full tray', vi: 'bếp nào cũng làm đủ một mâm' }, at: [480, 24], to: [480, 52] },
    { nodeId: 'facN', caption: { en: 'Northern kitchen', vi: 'bếp miền Bắc' }, at: [118, 96], to: [160, 146] },
    { nodeId: 'facS', caption: { en: 'Southern kitchen', vi: 'bếp miền Nam' }, at: [842, 96], to: [800, 146] },
    { nodeId: 'riceCakeI', caption: { en: 'a rice cake', vi: 'một loại bánh' }, at: [370, 204], to: [410, 158] },
    { nodeId: 'porkRollI', caption: { en: 'a pork roll', vi: 'một loại giò chả' }, at: [480, 204], to: [480, 158] },
    { nodeId: 'pickleI', caption: { en: 'a pickle', vi: 'một loại dưa' }, at: [592, 204], to: [550, 158] },
    { nodeId: 'client', method: 'prepare', caption: { en: 'the host sets the tray', vi: 'gia chủ bày mâm' }, at: [610, 272], to: [500, 290] },
    { nodeId: 'cakeN', caption: { en: 'bánh chưng', vi: 'bánh chưng' }, at: [142, 410], to: [182, 330] },
    { nodeId: 'rollN', caption: { en: 'giò lụa', vi: 'giò lụa' }, at: [262, 410], to: [265, 334] },
    { nodeId: 'pickN', caption: { en: 'dưa hành', vi: 'dưa hành' }, at: [382, 410], to: [350, 334] },
    { nodeId: 'cakeS', caption: { en: 'bánh tét', vi: 'bánh tét' }, at: [575, 410], to: [612, 330] },
    { nodeId: 'rollS', caption: { en: 'chả lụa', vi: 'chả lụa' }, at: [705, 410], to: [695, 334] },
    { nodeId: 'pickS', caption: { en: 'dưa kiệu', vi: 'dưa kiệu' }, at: [845, 410], to: [780, 334] },
  ],
  calls: [
    { nodeId: 'facN', method: 'makeRiceCake', d: 'M196,250 C210,280 225,300 238,318' },
    { nodeId: 'facS', method: 'makeRiceCake', d: 'M764,250 C750,280 735,300 722,318' },
  ],
  untagged: [],
  Art: function AbstractFactoryArt({ lang }: SceneArtProps) {
    return (
      <g>
        <Stars seed={8} count={50} maxY={150} />
        <LanternString x0={-10} x1={300} y={6} sag={16} count={4} />
        <LanternString x0={660} x1={970} y={6} sag={16} count={4} colors={['#f2a03b', '#d62828']} />
        <Hills y={250} amp={26} color="#b7aa98" seed={6} />
        <BlossomTree x={36} y={262} s={0.95} color="#f9a8d4" seed={2} />
        <BlossomTree x={924} y={262} s={0.95} color="#facc15" seed={9} flip />
        <Hall cx={170} y={258} w={210} h={66} roofH={48} />
        <Hall cx={790} y={258} w={210} h={66} roofH={48} wall="#6f3a1a" />
        <Person x={150} y={250} s={0.72} robe="#9f1d1d" hat="bun" pose="hold" />
        <Person x={812} y={250} s={0.72} robe="#4f7064" hat="nonLa" long={false} pose="hold" />
        <Ground y={256} color="#c8b597" edge="#8e765e" />

        {/* Banner shared by both kitchens */}
        <line x1={340} y1={42} x2={340} y2={52} stroke={INK} strokeWidth={2} />
        <line x1={620} y1={42} x2={620} y2={52} stroke={INK} strokeWidth={2} />
        <Board x={330} y={52} w={300} h={30}>
          <Caption x={480} y={72} size={13} fill={C.gold}>{lang === 'vi' ? 'Mâm cỗ ngày Tết' : 'The Tết feast tray'}</Caption>
        </Board>

        {/* Menu board: the three kinds of dish every tray needs */}
        <rect x={360} y={98} width={240} height={72} rx={5} fill={C.paper} stroke={INK} strokeWidth={2.5} />
        <Caption x={480} y={116} size={11} fill="#7c2d12">{lang === 'vi' ? 'Mỗi mâm cần' : 'Every tray needs'}</Caption>
        <g fill="none" stroke="#7c2d12" strokeWidth={1.6} strokeDasharray="4 3">
          <rect x={396} y={128} width={28} height={28} rx={2} />
          <rect x={460} y={134} width={40} height={18} rx={9} />
          <ellipse cx={550} cy={143} rx={18} ry={11} />
        </g>

        {/* The host stands behind the long table */}
        <Person x={480} y={366} s={1.05} robe="#7c2d12" pants="#1f1410" hat="khanXep" pose="hold" />

        <Table x={80} y={384} w={800} h={32} color={C.lacquerDark} />
        <rect x={92} y={TABLE_TOP + 2} width={776} height={26} fill={C.lacquer} stroke={INK} strokeWidth={2} />
        <path d={`M100,${TABLE_TOP + 15} H860`} stroke={C.gold} strokeOpacity={0.55} strokeWidth={1.2} strokeDasharray="10 6" />
        <rect x={120} y={TABLE_TOP - 4} width={290} height={6} rx={3} fill="#b91c1c" stroke={INK} strokeWidth={1} />
        <rect x={550} y={TABLE_TOP - 4} width={290} height={6} rx={3} fill="#b91c1c" stroke={INK} strokeWidth={1} />

        {/* Northern tray */}
        <SquareCake x={182} y={TABLE_TOP - 2} size={34} />
        <Dish x={265} y={TABLE_TOP - 8} w={58} food="#efe2c8" kind="roll" />
        <Dish x={350} y={TABLE_TOP - 8} w={52} food="#f1f5f9" kind="pickles" />

        {/* Southern tray */}
        <LogCake x={612} y={TABLE_TOP - 2} w={62} h={24} />
        <Dish x={695} y={TABLE_TOP - 8} w={58} food="#d6a76b" kind="slices" />
        <Dish x={780} y={TABLE_TOP - 8} w={52} food="#f5e6b0" kind="pickles" />
      </g>
    )
  },
}

export default abstractFactory
