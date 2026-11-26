import { Person } from './kit/figures'
import { Caption } from './kit/overlay'
import { C, INK, SCENE_COLORS, W } from './kit/palette'
import { Jar, Shelf } from './kit/props'
import type { Point, LegacySceneDefinition } from './types'

const COUNTER = 372

/** The words of the receipt line, laid out as tiles: [word, left edge, width]. */
const TILES: [string, number, number][] = [['bảy', 430, 70], ['mươi', 520, 80], ['lăm', 620, 70], ['nghìn', 710, 90]]
const TILE_TOP = 120
const TILE_BOTTOM = 152
const centre = (i: number) => TILES[i][1] + TILES[i][2] / 2

/** One bracket of the tree: joins two points from above into a node with an operator. */
function bracket(left: Point, right: Point, y: number, symbol: string) {
  const mid = (left[0] + right[0]) / 2
  return (
    <g>
      <path d={`M${left[0]},${left[1]} L${left[0]},${y} L${right[0]},${y} L${right[0]},${right[1]}`} stroke={INK} strokeWidth={1.4} fill="none" />
      <circle cx={mid} cy={y + 10} r={10} fill={SCENE_COLORS.paperLight} stroke={INK} strokeWidth={1.4} />
      <Caption x={mid} y={y + 15} size={14} weight={700}>{symbol}</Caption>
    </g>
  )
}

/** A bàn tính with two beads above the beam and five below on each rod, set to `digits`. */
function abacus(x: number, y: number, digits: number[]) {
  const width = digits.length * 24 + 16
  const beam = y + 22
  const bottom = y + 70
  return (
    <g>
      <rect x={x} y={y} width={width} height={bottom - y} fill={SCENE_COLORS.paperShade} />
      {digits.map((digit, i) => {
        const cx = x + 20 + i * 24
        const fives = Math.floor(digit / 5)
        const ones = digit % 5
        // Beads are counted by pushing them against the beam
        const upper = [0, 1].map(k => (k < fives ? beam - 3.5 - k * 6 : y + 11 - k * 6))
        const lower = [0, 1, 2, 3, 4].map(k => (k < ones ? beam + 3.5 + k * 6 : bottom - 28 + k * 6))
        return (
          <g key={i}>
            <line x1={cx} y1={y + 2} x2={cx} y2={bottom - 2} stroke={INK} strokeWidth={1} />
            {[...upper, ...lower].map((by, k) => (
              <ellipse key={k} cx={cx} cy={by} rx={9} ry={2.8} fill={k < 2 ? C.tile : C.wood} stroke={INK} strokeWidth={0.9} />
            ))}
          </g>
        )
      })}
      <rect x={x} y={beam - 1.5} width={width} height={3} fill={C.woodDark} />
      <rect x={x} y={y} width={width} height={bottom - y} fill="none" stroke={C.woodDark} strokeWidth={5} />
      <rect x={x - 2.5} y={y - 2.5} width={width + 5} height={bottom - y + 5} fill="none" stroke={INK} strokeWidth={1.2} />
    </g>
  )
}

const interpreter: LegacySceneDefinition = {
  slug: 'interpreter',
  title: { en: 'Interpreter: reading an amount written in words', vi: 'Interpreter: đọc số tiền viết bằng chữ' },
  sky: 'interior',
  tags: [
    { nodeId: 'client', method: 'read', caption: { en: 'reads the words back', vi: 'đọc lại phần bằng chữ' }, at: [110, 210], to: [160, 270] },
    { nodeId: 'term', caption: { en: 'one word, one value', vi: 'một chữ, một giá trị' }, at: [880, 136], to: [806, 136] },
    { nodeId: 'mul', caption: { en: 'bảy × mươi = 70', vi: 'bảy × mươi = 70' }, at: [380, 188], to: [495, 188] },
    { nodeId: 'add', caption: { en: '70 + lăm = 75', vi: '70 + lăm = 75' }, at: [430, 246], to: [566, 228] },
    { nodeId: 'expr', method: 'interpret', caption: { en: 'each bracket works out its value', vi: 'mỗi ngoặc tự tính ra giá trị' }, at: [470, 318], to: [652, 268] },
  ],
  calls: [
    { nodeId: 'client', method: 'read', d: 'M220,316 C238,230 280,104 336,60', at: [264, 172] },
    { nodeId: 'client', method: 'parse', d: 'M468,84 C468,96 466,104 465,116', at: [520, 100] },
    { nodeId: 'expr', method: 'interpret', d: 'M721,294 C740,294 752,304 762,316', at: [758, 270] },
  ],
  untagged: [],
  Art: function InterpreterArt() {
    const b1: Point = [(centre(0) + centre(1)) / 2, 198]
    const b2: Point = [(b1[0] + centre(2)) / 2, 238]
    const b3: Point = [(b2[0] + centre(3)) / 2, 278]
    return (
      <g>
        {/* A grocery shelf behind the cashier */}
        <Shelf x={24} y={COUNTER} w={250} h={260} rows={3} />
        {[60, 98].map(x => <Jar key={x} x={x} y={177} s={0.55} />)}
        {/* Bottles of nước mắm and a stack of instant-noodle packets */}
        {[138, 156].map(x => (
          <g key={x}>
            <rect x={x - 5} y={145} width={10} height={32} rx={2} fill={C.goldDark} stroke={INK} strokeWidth={1} />
            <rect x={x - 2.5} y={137} width={5} height={9} fill={C.goldDark} stroke={INK} strokeWidth={0.8} />
            <rect x={x - 3} y={133} width={6} height={4} fill={C.lacquer} stroke={INK} strokeWidth={0.8} />
            <rect x={x - 5} y={155} width={10} height={9} fill={C.paper} stroke={INK} strokeWidth={0.6} />
          </g>
        ))}
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={178 + (i % 2) * 3} y={169 - i * 8} width={46} height={8} rx={1.5} fill={i % 2 ? C.gold : C.tile} stroke={INK} strokeWidth={0.9} />
        ))}
        {/* Tins of biscuits, a sack of rice and a basket of eggs */}
        {[[48, 24], [76, 18]].map(([x, h]) => (
          <g key={x}>
            <rect x={x} y={242 - h} width={22} height={h} fill={C.bronze} stroke={INK} strokeWidth={1} />
            <ellipse cx={x + 11} cy={242 - h} rx={11} ry={3} fill={C.gold} stroke={INK} strokeWidth={1} />
          </g>
        ))}
        <path d="M112,242 L110,214 Q122,206 134,214 L136,242 Z" fill={SCENE_COLORS.paperShade} stroke={INK} strokeWidth={1} />
        <path d="M190,242 L194,228 L238,228 L242,242 Z" fill={C.wood} stroke={INK} strokeWidth={1} />
        {[200, 210, 220, 230].map(x => <ellipse key={x} cx={x} cy={226} rx={5} ry={4} fill={SCENE_COLORS.paperLight} stroke={INK} strokeWidth={0.8} />)}

        {/* The cashier holds the receipt; the line in words is drawn large beside her */}
        <rect x={198} y={318} width={20} height={28} fill={C.paper} stroke={INK} strokeWidth={1.2} />
        {[0, 1, 2, 3].map(i => <line key={i} x1={201} y1={325 + i * 5} x2={215} y2={325 + i * 5} stroke={INK} strokeWidth={0.6} opacity={0.6} />)}
        <Person x={160} y={420} s={1.5} robe="#5f7f86" hat="bun" pose="reach" long={false} />

        <path d="M340,24 L920,24 L920,80 L908,74 L896,80 L884,74 L872,80 L860,74 L848,80 L836,74 L824,80 L812,74 L800,80 L788,74 L776,80 L764,74 L752,80 L740,74 L728,80 L716,74 L704,80 L692,74 L680,80 L668,74 L656,80 L644,74 L632,80 L620,74 L608,80 L596,74 L584,80 L572,74 L560,80 L548,74 L536,80 L524,74 L512,80 L500,74 L488,80 L476,74 L464,80 L452,74 L440,80 L428,74 L416,80 L404,74 L392,80 L380,74 L368,80 L356,74 L340,80 Z" fill={C.paper} stroke={INK} strokeWidth={1.4} />
        <line x1={356} y1={50} x2={904} y2={50} stroke={INK} strokeWidth={0.6} strokeDasharray="2 3" opacity={0.5} />
        {/* The receipt itself stays in Vietnamese in both languages */}
        <Caption x={356} y={44} size={11} anchor="start" fill={SCENE_COLORS.inkMuted}>Cộng: 75.000 đ</Caption>
        <Caption x={630} y={68} size={16}>Bằng chữ: Bảy mươi lăm nghìn đồng</Caption>

        {/* The same words as tiles, grouped by brackets into a tree */}
        {TILES.map(([word, x, w]) => (
          <g key={word}>
            <rect x={x} y={TILE_TOP} width={w} height={TILE_BOTTOM - TILE_TOP} rx={3} fill="#efe2c6" stroke={INK} strokeWidth={1.3} />
            <rect x={x + 1} y={TILE_BOTTOM - 5} width={w - 2} height={4} fill={C.wood} opacity={0.7} />
            <Caption x={x + w / 2} y={142} size={15}>{word}</Caption>
          </g>
        ))}
        {bracket([centre(0), TILE_BOTTOM], [centre(1), TILE_BOTTOM], 178, '×')}
        {bracket(b1, [centre(2), TILE_BOTTOM], 218, '+')}
        {bracket(b2, [centre(3), TILE_BOTTOM], 258, '×')}
        <line x1={b3[0]} y1={b3[1]} x2={b3[0]} y2={282} stroke={INK} strokeWidth={1.4} />
        <rect x={b3[0] - 50} y={282} width={100} height={24} rx={2} fill={SCENE_COLORS.paperLight} stroke={INK} strokeWidth={1.4} />
        <Caption x={b3[0]} y={299} size={15} weight={700}>75.000</Caption>

        {/* The counter, with the bàn tính showing the same amount */}
        <rect x={0} y={COUNTER} width={W} height={440 - COUNTER} fill={C.wood} />
        <rect x={0} y={COUNTER - 6} width={W} height={9} fill={C.woodDark} stroke={INK} strokeWidth={1.4} />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1={60 + i * 120} y1={COUNTER + 3} x2={60 + i * 120} y2={440} stroke={INK} strokeWidth={1} opacity={0.45} />
        ))}
        {abacus(760, 296, [0, 0, 7, 5, 0, 0, 0])}
      </g>
    )
  },
}

export default interpreter
