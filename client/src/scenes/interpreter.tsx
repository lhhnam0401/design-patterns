import { Person } from './print/figures'
import { GroundBand, Grass } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './print/pigments'
import { Jar, Lantern, Shelf, Table } from './print/props'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { Point, SceneArtProps, SceneDefinition } from './types'

const FEET = 378

/**
 * The tree parse() builds for "bảy mươi lăm nghìn": Multiply(Add(Multiply(bảy, mươi), lăm), nghìn).
 * The root hangs at the top; the words stand in reading order along the floor.
 */
const WORDS = ['bảy', 'mươi', 'lăm', 'nghìn'] as const
const LEAF_X = [280, 440, 570, 710] as const
const LEAF_TOP = 314
const LEAF_W = 92
const MUL1: Point = [360, 256]
const ADD: Point = [465, 204]
const ROOT: Point = [588, 142]
const R = 26
const R_ROOT = 30
const leafTop = (i: number): Point => [LEAF_X[i], LEAF_TOP]

/** The abacus that shows the result, right of the tree. */
const ABACUS = { x: 780, top: 212 } as const

const f = (n: number) => Math.round(n * 10) / 10

/** A straight arrow from `a` to `b`, trimmed at both ends and shifted sideways by `off`. */
function link(a: Point, b: Point, trimA: number, trimB: number, off: number): string {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const nx = -uy * off
  const ny = ux * off
  return `M${f(a[0] + ux * trimA + nx)},${f(a[1] + uy * trimA + ny)} L${f(b[0] - ux * trimB + nx)},${f(b[1] - uy * trimB + ny)}`
}

/** A wooden rod joining an expression to one of its parts. */
function rod(a: Point, b: Point) {
  const d = `M${a[0]},${a[1]} L${b[0]},${b[1]}`
  return (
    <g key={d}>
      <path d={d} stroke={INK} strokeWidth={8} strokeLinecap="round" />
      <path d={d} stroke={PIGMENT.wood} strokeWidth={4} strokeLinecap="round" />
    </g>
  )
}

/** A round lacquer seal with the operator drawn as a shape: × for Multiply, + for Add. */
function seal([cx, cy]: Point, r: number, color: string, op: 'times' | 'plus') {
  const arm = r * 0.52
  const bar = (rot: number) => (
    <rect
      key={rot}
      x={cx - arm}
      y={cy - 4.5}
      width={arm * 2}
      height={9}
      rx={2}
      fill={PAPER_LIGHT}
      stroke={INK}
      strokeWidth={2}
      transform={`rotate(${rot} ${cx} ${cy})`}
    />
  )
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={color} stroke={INK} strokeWidth={3} />
      <circle cx={cx} cy={cy} r={r - 6} fill="none" stroke={PIGMENT.yellow} strokeWidth={2} />
      {op === 'times' ? [bar(45), bar(-45)] : [bar(0), bar(90)]}
    </g>
  )
}

/** One carved word block. The word itself is story text; the block shape carries it on small plates. */
function block(i: number) {
  const x = LEAF_X[i] - LEAF_W / 2
  return (
    <g key={i}>
      <rect x={x} y={LEAF_TOP} width={LEAF_W} height={FEET - LEAF_TOP} rx={4} fill={PIGMENT.wood} stroke={INK} strokeWidth={3} />
      <rect x={x + 8} y={LEAF_TOP + 6} width={LEAF_W - 16} height={36} rx={2} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2} />
      <rect x={x + 6} y={FEET - 12} width={LEAF_W - 12} height={6} rx={2} fill={PIGMENT.woodDark} />
      <Caption x={LEAF_X[i]} y={LEAF_TOP + 32} size={22} weight={700}>{WORDS[i]}</Caption>
    </g>
  )
}

/** A bàn tính: two beads above the beam and five below on each rod, set to `digits`. */
function abacus(digits: number[]) {
  const { x, top } = ABACUS
  const pitch = 20
  const w = digits.length * pitch + 20
  const inner = top + 8
  const beamTop = inner + 30
  const beamBottom = beamTop + 6
  const bottom = beamBottom + 59
  const bead = 9
  return (
    <g>
      <rect x={x} y={top} width={w} height={bottom + 8 - top} rx={4} fill={PIGMENT.wood} stroke={INK} strokeWidth={3} />
      <rect x={x + 8} y={inner} width={w - 16} height={bottom - inner} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2} />
      {digits.map((digit, i) => {
        const cx = x + 20 + i * pitch
        const fives = Math.floor(digit / 5)
        const ones = digit % 5
        // Counted beads are pushed against the beam and printed red
        const upper = [0, 1].map(j => (j >= 2 - fives ? { y: beamTop - bead / 2 - (1 - j) * bead, on: true } : { y: inner + bead / 2 + j * bead, on: false }))
        const lower = [0, 1, 2, 3, 4].map(j => (j < ones ? { y: beamBottom + bead / 2 + j * bead, on: true } : { y: bottom - bead / 2 - (4 - j) * bead, on: false }))
        return (
          <g key={i}>
            <line x1={cx} y1={inner} x2={cx} y2={bottom} stroke={INK} strokeWidth={1.6} />
            {[...upper, ...lower].map((b, k) => (
              <ellipse key={k} cx={cx} cy={b.y} rx={8.5} ry={4.3} fill={b.on ? PIGMENT.red : PIGMENT.woodDark} stroke={INK} strokeWidth={1.4} />
            ))}
          </g>
        )
      })}
      <rect x={x + 8} y={beamTop} width={w - 16} height={beamBottom - beamTop} fill={PIGMENT.woodDark} stroke={INK} strokeWidth={1.6} />
      {/* A dot on the beam marks the thousands */}
      <circle cx={x + 20 + 3 * pitch + pitch / 2} cy={(beamTop + beamBottom) / 2} r={2.4} fill={PIGMENT.yellow} />
    </g>
  )
}

const interpreter: SceneDefinition = {
  slug: 'interpreter',
  title: { en: 'Interpreter: reading an amount written in words', vi: 'Interpreter: đọc số tiền viết bằng chữ' },
  setting: 'interior',
  pins: [
    { nodeId: 'client', methods: ['read', 'parse'], caption: { en: 'reads the words back and builds the tree', vi: 'đọc lại phần bằng chữ và dựng cây' }, at: [100, 345], showName: false },
    { nodeId: 'expr', methods: ['interpret'], caption: { en: 'every node works out its own value', vi: 'mỗi nút tự tính ra giá trị của mình' }, at: [356, 44], side: 'left' },
    { nodeId: 'term', caption: { en: 'one word, one value', vi: 'một chữ, một giá trị' }, at: [LEAF_X[0], 372], showName: false },
    { nodeId: 'mul', caption: { en: 'bảy × mươi = 70, then 75 × nghìn', vi: 'bảy × mươi = 70, rồi 75 × nghìn' }, at: [ROOT[0], 198], showName: false },
    { nodeId: 'add', caption: { en: '70 + lăm = 75', vi: '70 + lăm = 75' }, at: [ADD[0], 266], showName: false },
  ],
  calls: [
    { id: 'read', nodeId: 'client', method: 'read', d: 'M18,140 C40,172 56,206 70,236' },
    { id: 'parse', nodeId: 'client', method: 'parse', d: 'M212,240 C236,252 248,276 250,302' },
    { id: 'interpret', nodeId: 'expr', method: 'interpret', d: 'M176,214 C214,146 430,108 556,120' },
    { id: 'ret-bay', nodeId: 'term', method: 'interpret', kind: 'return', d: link(leafTop(0), MUL1, 4, R + 6, -13) },
    { id: 'ret-muoi', nodeId: 'term', method: 'interpret', kind: 'return', d: link(leafTop(1), MUL1, 4, R + 6, 13) },
    { id: 'ret-lam', nodeId: 'term', method: 'interpret', kind: 'return', d: link(leafTop(2), ADD, 4, R + 6, 13) },
    { id: 'ret-nghin', nodeId: 'term', method: 'interpret', kind: 'return', d: link(leafTop(3), ROOT, 4, R_ROOT + 6, 13) },
    { id: 'ret-mul', nodeId: 'mul', method: 'interpret', kind: 'return', d: link(MUL1, ADD, R + 4, R + 6, -13) },
    { id: 'ret-add', nodeId: 'add', method: 'interpret', kind: 'return', d: link(ADD, ROOT, R + 4, R_ROOT + 6, -13) },
    { id: 'ret-root', nodeId: 'mul', method: 'interpret', kind: 'return', d: 'M622,150 C682,152 730,196 770,236' },
  ],
  steps: [
    {
      calls: ['read'],
      nodes: ['client'],
      at: [30, 232],
      caption: { en: 'The reader gets the line “Bằng chữ: Bảy mươi lăm nghìn đồng”, and read() splits it into four words.', vi: 'Người đọc nhận dòng “Bằng chữ: Bảy mươi lăm nghìn đồng”, và read() tách nó thành bốn chữ.' },
    },
    {
      calls: ['parse'],
      nodes: ['client', 'term', 'mul', 'add'],
      at: [250, 206],
      caption: { en: 'parse() builds the tree (bảy × mươi + lăm) × nghìn: each word becomes a NumberWord leaf.', vi: 'parse() dựng cây (bảy × mươi + lăm) × nghìn: mỗi chữ thành một lá NumberWord.' },
    },
    {
      calls: ['interpret', 'ret-bay', 'ret-muoi', 'ret-lam', 'ret-nghin'],
      nodes: ['client', 'expr', 'term', 'mul', 'add'],
      at: [318, 186],
      caption: { en: 'The reader calls interpret() on the root. The call runs down to the words, and each returns its value: 7, 10, 5, 1000.', vi: 'Người đọc gọi interpret() trên gốc. Lời gọi chạy xuống các chữ, mỗi chữ trả về giá trị: 7, 10, 5, 1000.' },
    },
    {
      calls: ['ret-mul', 'ret-add'],
      nodes: ['mul', 'add'],
      at: [384, 168],
      caption: { en: 'Multiply gives 7 × 10 = 70, and Add gives 70 + 5 = 75.', vi: 'Multiply cho 7 × 10 = 70, rồi Add cho 70 + 5 = 75.' },
    },
    {
      calls: ['ret-root'],
      nodes: ['mul', 'client'],
      at: [704, 136],
      caption: { en: 'The top Multiply gives 75 × 1000: interpret() returns 75.000, and the abacus shows it.', vi: 'Multiply ở gốc cho 75 × 1000: interpret() trả về 75.000, và bàn tính hiện đúng số ấy.' },
    },
  ],
  focus: [220, 100, 720, 300],
  untagged: [],
  Art: function InterpreterArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          {/* A grocery shelf behind the cashier, and the counter's table under the abacus */}
          <Shelf x={8} y={FEET} w={200} h={236} rows={3} pale />
          {[40, 78, 170].map(x => <Jar key={x} x={x} y={FEET - 236 + 59} s={0.6} pale />)}
          <Lantern x={900} y={54} r={13} cord={30} pale />
          <Lantern x={850} y={42} r={10} cord={20} pale />
          <GroundBand />
          <Table x={770} y={FEET} w={182} h={44} pale />
          <Grass x0={220} x1={240} seed={3} count={2} color={TINT.amber} />
        </Backdrop>

        {/* The rail: every node of the tree can work out its own value */}
        <Part node="expr">
          <Signboard x={500} w={320} tone="interface" span={[LEAF_X[0], LEAF_X[3]]} ticks={[LEAF_X[0], ROOT[0], LEAF_X[3]]}>
            <Caption x={515} y={53}>{lang === 'vi' ? 'Mỗi phần tự tính giá trị' : 'Each part knows its value'}</Caption>
          </Signboard>
        </Part>

        {/* The words of the line, in reading order */}
        <Part node="term">{[0, 1, 2, 3].map(block)}</Part>

        {/* The two products: bảy × mươi, and the whole group × nghìn */}
        <Part node="mul">
          {rod(MUL1, leafTop(0))}
          {rod(MUL1, leafTop(1))}
          {rod(ROOT, ADD)}
          {rod(ROOT, leafTop(3))}
          {seal(MUL1, R, PIGMENT.red, 'times')}
          {seal(ROOT, R_ROOT, PIGMENT.red, 'times')}
        </Part>

        {/* The sum: 70 + lăm */}
        <Part node="add">
          {rod(ADD, MUL1)}
          {rod(ADD, leafTop(2))}
          {seal(ADD, R, PIGMENT.blue, 'plus')}
        </Part>

        {/* The cashier with the receipt, and her abacus showing the result */}
        <Part node="client">
          <g transform="rotate(-4 170 257)">
            <rect x={134} y={214} width={72} height={86} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2.6} />
            <rect x={136} y={216} width={68} height={8} fill={PIGMENT.red} />
            <Caption x={170} y={248} size={18} weight={700}>75.000</Caption>
            {[260, 270].map(y => <line key={y} x1={142} y1={y} x2={198} y2={y} stroke={INK} strokeWidth={2} strokeLinecap="round" />)}
            <line x1={142} y1={282} x2={186} y2={282} stroke={PIGMENT.red} strokeWidth={3} strokeLinecap="round" />
            <circle cx={192} cy={288} r={7} fill="none" stroke={PIGMENT.red} strokeWidth={2.4} />
          </g>
          <Person x={100} y={FEET} s={1.3} robe={PIGMENT.green} pants={PIGMENT.woodDark} hat="bun" pose="reach" long={false} />
          {abacus([0, 0, 7, 5, 0, 0, 0])}
        </Part>
      </>
    )
  },
}

export default interpreter
