import { Person } from './print/figures'
import { Kitchen, LogCake, SquareCake } from './print/food'
import { BlossomTree, Grass, GroundBand, Moon, Stars } from './print/nature'
import { INK, PIGMENT, TINT } from './print/pigments'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

/** Two rows: the Northern household on a raised terrace, the Southern one on the ground. */
const NORTH = 232
const SOUTH = 380
const KITCHEN_X = 165
const COOK_X = 285
const CAKE_X = 690

const tr = (lang: SceneArtProps['lang'], en: string, vi: string) => (lang === 'vi' ? vi : en)

/** A lacquered tray the finished cakes sit on. `y` is the floor. */
function tray(x: number, y: number, w: number) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 8} width={w} height={8} rx={2} fill={PIGMENT.redDark} stroke={INK} strokeWidth={2.4} />
      <line x1={x - w / 2 + 6} y1={y - 4} x2={x + w / 2 - 6} y2={y - 4} stroke={PIGMENT.yellow} strokeWidth={1.4} />
    </g>
  )
}

/** A leaf held in the cook's hand, in the figure's own coordinates. */
function leaf(color: string) {
  return (
    <g>
      <path d="M22,-50 Q30,-70 50,-66 Q44,-48 22,-50 Z" fill={color} stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M24,-51 Q36,-60 47,-64" fill="none" stroke={PIGMENT.greenDark} strokeWidth={1.2} />
    </g>
  )
}

/** A pale Tết firework: rays and sparks in tints only. */
function firework(x: number, y: number, r: number, color: string) {
  return (
    <g stroke={color} strokeWidth={2} strokeLinecap="round">
      {Array.from({ length: 12 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 12
        return <line key={i} x1={x + Math.cos(a) * r * 0.35} y1={y + Math.sin(a) * r * 0.35} x2={x + Math.cos(a) * r} y2={y + Math.sin(a) * r} />
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (Math.PI * 2 * (i + 0.5)) / 12
        return <circle key={`s${i}`} cx={x + Math.cos(a) * r * 0.8} cy={y + Math.sin(a) * r * 0.8} r={1.6} fill={color} stroke="none" />
      })}
    </g>
  )
}

const factoryMethod: SceneDefinition = {
  slug: 'factory-method',
  title: { en: 'Factory Method: two households wrap their Tết cakes', vi: 'Factory Method: hai gia đình gói bánh Tết' },
  setting: 'night',
  pins: [
    { nodeId: 'creator', methods: ['prepareForNewYear'], caption: { en: 'the shared Tết routine', vi: 'quy trình đón Tết chung' }, at: [119, 44], showName: false },
    { nodeId: 'concA', methods: ['makeRiceCake'], caption: { en: 'a Northern household', vi: 'một nhà miền Bắc' }, at: [138, 208], showName: false },
    { nodeId: 'concB', methods: ['makeRiceCake'], caption: { en: 'a Southern household', vi: 'một nhà miền Nam' }, at: [138, 352], showName: false },
    { nodeId: 'product', caption: { en: 'all the routine knows about the cake', vi: 'tất cả những gì quy trình biết về chiếc bánh' }, at: [529, 44] },
    { nodeId: 'prodA', caption: { en: 'square bánh chưng, in lá dong', vi: 'bánh chưng vuông, gói lá dong' }, at: [715, 199], showName: false },
    { nodeId: 'prodB', caption: { en: 'cylindrical bánh tét, in banana leaf', vi: 'bánh tét hình trụ, gói lá chuối' }, at: [690, 349], showName: false },
  ],
  calls: [
    { id: 'prepare-n', nodeId: 'creator', method: 'prepareForNewYear', d: 'M8,200 L98,200' },
    { id: 'make-n', nodeId: 'concA', method: 'makeRiceCake', d: 'M342,150 L656,150' },
    { id: 'wrap-n', nodeId: 'product', method: 'wrap', d: 'M342,182 L632,182' },
    { id: 'boil-n', nodeId: 'product', method: 'boil', d: 'M342,214 L632,214' },
    { id: 'prepare-s', nodeId: 'creator', method: 'prepareForNewYear', d: 'M8,344 L98,344' },
    { id: 'make-s', nodeId: 'concB', method: 'makeRiceCake', d: 'M342,298 L630,298' },
    { id: 'wrap-s', nodeId: 'product', method: 'wrap', d: 'M342,330 L614,330' },
    { id: 'boil-s', nodeId: 'product', method: 'boil', d: 'M342,362 L610,362' },
  ],
  steps: [
    {
      calls: ['prepare-n'],
      nodes: ['creator', 'concA'],
      at: [44, 166],
      caption: { en: 'prepareForNewYear() runs the Tết routine shared by the TetHousehold subclasses, here in the Northern home.', vi: 'prepareForNewYear() chạy quy trình đón Tết dùng chung cho các lớp con của TetHousehold, ở đây là nhà miền Bắc.' },
    },
    {
      calls: ['make-n'],
      nodes: ['creator', 'concA', 'prodA'],
      at: [490, 126],
      caption: { en: 'The routine first calls makeRiceCake(). The Northern household overrides it to return a square bánh chưng.', vi: 'Quy trình gọi makeRiceCake() trước. Nhà miền Bắc ghi đè phương thức này để trả về bánh chưng vuông.' },
    },
    {
      calls: ['wrap-n', 'boil-n'],
      nodes: ['creator', 'concA', 'product', 'prodA'],
      at: [490, 248],
      caption: { en: 'Then it calls wrap() and boil(). It knows the cake only as a RiceCake, not which kind it got.', vi: 'Rồi quy trình gọi wrap() và boil(). Nó chỉ biết đó là một RiceCake, không biết là loại bánh nào.' },
    },
    {
      calls: ['prepare-s', 'make-s', 'wrap-s', 'boil-s'],
      nodes: ['creator', 'concB', 'product', 'prodB'],
      at: [44, 310],
      caption: { en: 'The Southern household overrides only makeRiceCake(), so the same routine now wraps and boils a cylindrical bánh tét.', vi: 'Nhà miền Nam chỉ ghi đè makeRiceCake(), nên cùng quy trình ấy giờ gói và luộc bánh tét hình trụ.' },
    },
  ],
  focus: [80, 100, 700, 298],
  untagged: [],
  Art: function FactoryMethodArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Moon x={46} y={40} r={18} />
          <Stars seed={5} count={10} x0={360} x1={500} y0={10} y1={88} />
          {firework(432, 46, 30, TINT.red)}
          {firework(918, 52, 24, TINT.yellow)}
          <GroundBand />
          {/* The Northern row stands on a raised terrace, the Southern row on the ground */}
          <rect x={60} y={NORTH} width={860} height={14} fill={TINT.ground} />
          <line x1={60} y1={NORTH + 1} x2={920} y2={NORTH + 1} stroke={TINT.groundEdge} strokeWidth={3} />
          <BlossomTree x={858} y={NORTH} s={0.7} flower="dao" seed={4} pale />
          <BlossomTree x={860} y={SOUTH} s={0.85} flower="mai" seed={7} flip pale />
          <Grass x0={390} x1={560} y={SOUTH + 2} seed={3} count={6} />
        </Backdrop>

        {/* The rail: the abstract household over both homes, the cake interface over both cakes */}
        <Part node="creator">
          <Signboard x={225} w={260} tone="abstract" span={[150, 300]} ticks={[225]}>
            <Caption x={245} y={53}>{tr(lang, 'One Tết routine', 'Một nếp đón Tết')}</Caption>
          </Signboard>
        </Part>
        <Part node="product">
          <Signboard x={CAKE_X} w={370} tone="interface" span={[640, 740]} ticks={[CAKE_X]}>
            <Caption x={798} y={53}>{tr(lang, 'Any Tết cake', 'Mọi loại bánh')}</Caption>
          </Signboard>
        </Part>

        {/* The Northern household: a kitchen and a cook wrapping in lá dong */}
        <Part node="concA">
          <Kitchen x={KITCHEN_X} y={NORTH} tile={PIGMENT.tile}>
            <Caption x={KITCHEN_X - 16} y={NORTH - 110 + 51}>{tr(lang, 'North', 'Miền Bắc')}</Caption>
          </Kitchen>
          <Person x={COOK_X} y={NORTH} s={1.15} robe={PIGMENT.red} pants={PIGMENT.redDark} hat="bun" pose="work">
            {leaf(PIGMENT.green)}
          </Person>
        </Part>

        {/* The Southern household: a kitchen and a cook wrapping in banana leaf */}
        <Part node="concB">
          <Kitchen x={KITCHEN_X} y={SOUTH} tile={PIGMENT.green}>
            <Caption x={KITCHEN_X - 16} y={SOUTH - 110 + 51}>{tr(lang, 'South', 'Miền Nam')}</Caption>
          </Kitchen>
          <Person x={COOK_X} y={SOUTH} s={1.15} robe={PIGMENT.blue} pants={PIGMENT.blueDark} sash={PIGMENT.red} hat="nonLa" long={false} pose="work">
            {leaf(PIGMENT.leaf)}
          </Person>
        </Part>

        {/* Square bánh chưng, stacked on a tray */}
        <Part node="prodA">
          {tray(CAKE_X, NORTH, 140)}
          <SquareCake x={CAKE_X - 25} y={NORTH - 8} size={50} />
          <SquareCake x={CAKE_X + 25} y={NORTH - 8} size={50} />
          <SquareCake x={CAKE_X} y={NORTH - 58} size={50} />
        </Part>

        {/* Cylindrical bánh tét, stacked on a tray */}
        <Part node="prodB">
          {tray(CAKE_X, SOUTH, 170)}
          <LogCake x={CAKE_X} y={SOUTH - 8} w={150} h={46} />
          <LogCake x={CAKE_X + 10} y={SOUTH - 54} w={124} h={42} />
        </Part>
      </>
    )
  },
}

export default factoryMethod
