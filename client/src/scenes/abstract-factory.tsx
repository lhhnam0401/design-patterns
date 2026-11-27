import { Person } from './print/figures'
import { BraisedPorkBowl, JelliedPork, Kitchen, LogCake, PickledLeekJar, PickledOnionBowl, SquareCake } from './print/food'
import { BlossomBranch, GroundBand, Moon } from './print/nature'
import { INK, PIGMENT, TINT } from './print/pigments'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

/** Columns of the matrix: the kitchens, then one column per kind of dish. */
const COL = { kitchen: 300, cake: 480, meat: 640, pickle: 800 } as const
/** Rows: the Northern tray sits on a raised terrace, the Southern tray on the ground. */
const NORTH = 222
const SOUTH = 366
const NORTH_TERRACE = 232

const tr = (lang: SceneArtProps['lang'], en: string, vi: string) => (lang === 'vi' ? vi : en)

const abstractFactory: SceneDefinition = {
  slug: 'abstract-factory',
  title: { en: 'Abstract Factory: matching Tết feast trays', vi: 'Abstract Factory: mâm cỗ Tết đồng bộ theo vùng' },
  setting: 'night',
  pins: [
    { nodeId: 'client', methods: ['prepare'], caption: { en: 'the host sets the tray, knowing only the interfaces', vi: 'gia chủ bày mâm, chỉ biết các giao diện' }, at: [100, 362] },
    { nodeId: 'factory', methods: ['makeRiceCake', 'makeMeatDish', 'makePickle'], caption: { en: 'each kitchen makes a full tray', vi: 'mỗi bếp làm đủ một mâm' }, at: [364, 44], showName: false },
    { nodeId: 'facN', caption: { en: 'the Northern kitchen', vi: 'bếp miền Bắc' }, at: [270, 205], showName: false },
    { nodeId: 'facS', caption: { en: 'the Southern kitchen', vi: 'bếp miền Nam' }, at: [284, 358], showName: false },
    { nodeId: 'riceCakeI', methods: ['serve'], caption: { en: 'a rice cake', vi: 'một loại bánh' }, at: [540, 44], showName: false },
    { nodeId: 'meatDishI', methods: ['serve'], caption: { en: 'a meat dish', vi: 'một món thịt' }, at: [700, 44], showName: false },
    { nodeId: 'pickleI', methods: ['serve', 'eatWith'], caption: { en: 'a pickle, eaten with the cake', vi: 'một món dưa, ăn kèm bánh' }, at: [860, 44], showName: false },
    { nodeId: 'cakeN', caption: { en: 'bánh chưng', vi: 'bánh chưng' }, at: [COL.cake, 196], showName: false },
    { nodeId: 'meatN', caption: { en: 'thịt đông', vi: 'thịt đông' }, at: [COL.meat, 200], showName: false },
    { nodeId: 'pickN', caption: { en: 'dưa hành', vi: 'dưa hành' }, at: [COL.pickle, 212], showName: false },
    { nodeId: 'cakeS', caption: { en: 'bánh tét', vi: 'bánh tét' }, at: [COL.cake, 351], showName: false },
    { nodeId: 'meatS', caption: { en: 'thịt kho tàu', vi: 'thịt kho tàu' }, at: [COL.meat, 350], showName: false },
    { nodeId: 'pickS', caption: { en: 'dưa kiệu', vi: 'dưa kiệu' }, at: [COL.pickle, 340], showName: false },
  ],
  calls: [
    { id: 'prepare', nodeId: 'client', method: 'prepare', d: 'M10,214 C40,214 62,228 78,248' },
    { id: 'cake-n', nodeId: 'facN', method: 'makeRiceCake', d: 'M152,278 C190,220 240,186 300,182 C364,178 410,178 444,192' },
    { id: 'meat-n', nodeId: 'facN', method: 'makeMeatDish', d: 'M152,278 C190,220 240,186 300,182 C400,152 540,148 598,184' },
    { id: 'pickle-n', nodeId: 'facN', method: 'makePickle', d: 'M152,278 C190,220 240,186 300,182 C420,130 700,124 758,178' },
    { id: 'eat-with', nodeId: 'pickleI', method: 'eatWith', d: 'M486,240 C520,264 760,264 794,240' },
    { id: 'cake-s', nodeId: 'facS', method: 'makeRiceCake', d: 'M152,296 C200,318 250,340 300,340 C350,340 392,346 426,352' },
    { id: 'meat-s', nodeId: 'facS', method: 'makeMeatDish', d: 'M152,296 C200,318 250,340 300,340 C400,300 540,294 594,326' },
    { id: 'pickle-s', nodeId: 'facS', method: 'makePickle', d: 'M152,296 C200,318 250,340 300,340 C420,276 700,268 766,312' },
  ],
  steps: [
    {
      calls: ['prepare'],
      nodes: ['client', 'factory', 'facN'],
      at: [38, 186],
      caption: { en: 'Given the Northern kitchen, the host starts prepare(). She knows it only as a FeastFactory.', vi: 'Được giao bếp miền Bắc, gia chủ bắt đầu prepare(). Bà chỉ biết đó là một FeastFactory.' },
    },
    {
      calls: ['cake-n', 'meat-n', 'pickle-n'],
      nodes: ['client', 'facN', 'cakeN', 'meatN', 'pickN', 'riceCakeI', 'meatDishI', 'pickleI'],
      at: [186, 232],
      caption: { en: 'She asks for a rice cake, a meat dish and a pickle. The Northern kitchen sends its set: bánh chưng, thịt đông and dưa hành.', vi: 'Bà xin một loại bánh, một món thịt và một món dưa. Bếp miền Bắc gửi bộ món của mình: bánh chưng, thịt đông và dưa hành.' },
    },
    {
      calls: ['eat-with'],
      nodes: ['client', 'cakeN', 'pickN', 'pickleI'],
      at: [560, 256],
      caption: { en: 'eatWith(cake): the dưa hành is served with the bánh chưng, and both came from the same kitchen.', vi: 'eatWith(cake): dưa hành được ăn kèm bánh chưng, và cả hai cùng do một bếp làm ra.' },
    },
    {
      calls: ['cake-s', 'meat-s', 'pickle-s'],
      nodes: ['client', 'factory', 'facS', 'cakeS', 'meatS', 'pickS'],
      at: [196, 314],
      caption: { en: 'Given the Southern kitchen, the same three calls bring bánh tét, thịt kho tàu and dưa kiệu. Her code stays the same.', vi: 'Được giao bếp miền Nam, cùng ba lời gọi ấy mang về bánh tét, thịt kho tàu và dưa kiệu. Mã của bà giữ nguyên.' },
    },
  ],
  focus: [200, 104, 700, 300],
  untagged: [],
  Art: function AbstractFactoryArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Moon x={58} y={48} r={18} />
          <BlossomBranch x={-6} y={84} s={0.9} />
          <GroundBand />
          {/* The Northern row stands on a raised terrace, the Southern row on the ground */}
          <rect x={226} y={NORTH_TERRACE} width={680} height={14} fill={TINT.ground} />
          <line x1={226} y1={NORTH_TERRACE + 1} x2={906} y2={NORTH_TERRACE + 1} stroke={TINT.groundEdge} strokeWidth={3} />
          {[NORTH, SOUTH].map(y => (
            <g key={y}>
              <rect x={396} y={y} width={488} height={10} rx={2} fill={TINT.red} stroke={INK} strokeOpacity={0.5} strokeWidth={1.5} />
              <line x1={404} y1={y + 5} x2={876} y2={y + 5} stroke={TINT.yellow} strokeWidth={1.5} strokeDasharray="10 6" />
            </g>
          ))}
          <rect x={404} y={SOUTH + 10} width={8} height={4} fill={TINT.ink} />
          <rect x={868} y={SOUTH + 10} width={8} height={4} fill={TINT.ink} />
        </Backdrop>

        {/* The rail: the factory interface over the kitchens, one product interface over each column of dishes */}
        <Part node="factory">
          <Signboard x={COL.kitchen} w={170} tone="interface" span={[COL.kitchen - 50, COL.kitchen + 50]} ticks={[COL.kitchen]}>
            <Caption x={COL.kitchen - 15} y={53}>{tr(lang, 'kitchen', 'bếp')}</Caption>
          </Signboard>
        </Part>
        <Part node="riceCakeI">
          <Signboard x={COL.cake} w={150} tone="interface" span={[COL.cake - 40, COL.cake + 40]} ticks={[COL.cake]}>
            <Caption x={COL.cake - 15} y={53}>{tr(lang, 'rice cake', 'bánh Tết')}</Caption>
          </Signboard>
        </Part>
        <Part node="meatDishI">
          <Signboard x={COL.meat} w={150} tone="interface" span={[COL.meat - 40, COL.meat + 40]} ticks={[COL.meat]}>
            <Caption x={COL.meat - 15} y={53}>{tr(lang, 'meat dish', 'món thịt')}</Caption>
          </Signboard>
        </Part>
        <Part node="pickleI">
          <Signboard x={COL.pickle} w={150} tone="interface" span={[COL.pickle - 40, COL.pickle + 40]} ticks={[COL.pickle]}>
            <Caption x={COL.pickle - 15} y={53}>{tr(lang, 'pickle', 'món dưa')}</Caption>
          </Signboard>
        </Part>

        {/* The two kitchens, one per row */}
        <Part node="facN">
          <Kitchen x={COL.kitchen} y={NORTH_TERRACE} tile={PIGMENT.red}>
            <Caption x={COL.kitchen - 16} y={NORTH_TERRACE - 110 + 51}>{tr(lang, 'North', 'Miền Bắc')}</Caption>
          </Kitchen>
        </Part>
        <Part node="facS">
          <Kitchen x={COL.kitchen} y={380} tile={PIGMENT.green}>
            <Caption x={COL.kitchen - 16} y={380 - 110 + 51}>{tr(lang, 'South', 'Miền Nam')}</Caption>
          </Kitchen>
        </Part>

        {/* Northern tray: bánh chưng, thịt đông, dưa hành */}
        <Part node="cakeN"><SquareCake x={COL.cake} y={NORTH} size={60} /></Part>
        <Part node="meatN"><JelliedPork x={COL.meat} y={NORTH - 10} /></Part>
        <Part node="pickN"><PickledOnionBowl x={COL.pickle} y={NORTH - 26} /></Part>

        {/* Southern tray: bánh tét, thịt kho tàu, dưa kiệu */}
        <Part node="cakeS"><LogCake x={COL.cake} y={SOUTH} w={100} h={38} /></Part>
        <Part node="meatS"><BraisedPorkBowl x={COL.meat} y={SOUTH - 36} /></Part>
        <Part node="pickS"><PickledLeekJar x={COL.pickle} y={SOUTH} /></Part>

        {/* The host points to the kitchens; she only knows the interfaces */}
        <Part node="client">
          <Person x={100} y={378} s={1.3} robe={PIGMENT.red} pants={PIGMENT.redDark} hat="khanXep" pose="point" />
        </Part>
      </>
    )
  },
}

export default abstractFactory
