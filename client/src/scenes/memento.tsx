import { useId } from 'react'
import { Person, type Pose } from './kit/figures'
import { Tree } from './kit/nature'
import { Caption } from './kit/overlay'
import { C, INK, SCENE_COLORS, W } from './kit/palette'
import type { Point, SceneArtProps, SceneDefinition } from './types'

const GROUND = 356

/** The board on the crate, in an oblique view: u runs from Red (left) to Black (right), v from front to back. */
const BOARD = { fl: [398, 311], fr: [562, 311], bl: [416, 267], br: [544, 267] } as const

function onBoard(u: number, v: number): Point {
  const front = BOARD.fl[0] + (BOARD.fr[0] - BOARD.fl[0]) * u
  const back = BOARD.bl[0] + (BOARD.br[0] - BOARD.bl[0]) * u
  return [front + (back - front) * v, BOARD.fl[1] + (BOARD.bl[1] - BOARD.fl[1]) * v]
}

const rankU = (rank: number) => 0.05 + rank * 0.1
/** Red sits on the left facing right, so his left-hand file (a) lies at the back. */
const fileV = (file: number) => 0.9 - file * 0.1

/** A grid point such as "e6": files a–i from Red's left, ranks 0–9 from Red's side. */
function square(name: string): Point {
  return onBoard(rankU(Number(name.slice(1))), fileV(name.charCodeAt(0) - 97))
}

const line = (a: Point, b: Point) => `M${a[0].toFixed(1)},${a[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)}`

/** The position when Red asks to take back his cannon's capture on e6. */
const RED = ['a0', 'b0', 'c0', 'd0', 'e0', 'f0', 'g0', 'h0', 'i0', 'b2', 'e6', 'a3', 'c3', 'e3', 'g3', 'i3']
const BLACK = ['a9', 'b9', 'c9', 'd9', 'e9', 'f9', 'g9', 'g7', 'i9', 'b7', 'h7', 'a6', 'c6', 'g6', 'i6']

function chessBoardTop() {
  const files = Array.from({ length: 9 }, (_, f) => {
    const v = fileV(f)
    // Inner files stop at the river; the two edge files run straight across
    return f === 0 || f === 8
      ? line(onBoard(rankU(0), v), onBoard(rankU(9), v))
      : `${line(onBoard(rankU(0), v), onBoard(rankU(4), v))} ${line(onBoard(rankU(5), v), onBoard(rankU(9), v))}`
  })
  const ranks = Array.from({ length: 10 }, (_, r) => line(onBoard(rankU(r), fileV(0)), onBoard(rankU(r), fileV(8))))
  const palaces = [0, 7].map(r =>
    `${line(onBoard(rankU(r), fileV(3)), onBoard(rankU(r + 2), fileV(5)))} ${line(onBoard(rankU(r), fileV(5)), onBoard(rankU(r + 2), fileV(3)))}`)
  const corners = [BOARD.fl, BOARD.fr, BOARD.br, BOARD.bl].map(([x, y]) => `${x},${y}`).join(' ')
  const cannon = square('e6')
  const horse = square('g7')

  return (
    <g>
      <polygon points={corners} fill="#ebdfc4" stroke={INK} strokeWidth={1.4} />
      <path d={[...files, ...ranks, ...palaces].join(' ')} stroke={INK} strokeWidth={0.8} opacity={0.75} fill="none" />
      {[...RED.map(s => [s, C.lacquer] as const), ...BLACK.map(s => [s, INK] as const)].map(([s, rim]) => {
        const [x, y] = square(s)
        return (
          <g key={s}>
            <ellipse cx={x} cy={y} rx={4.4} ry={2.1} fill="#f3e7cb" stroke={rim} strokeWidth={1.1} />
            <ellipse cx={x} cy={y} rx={1.7} ry={0.8} fill={rim} />
          </g>
        )
      })}
      {/* The cannon that grabbed a soldier, and the horse that can now take it */}
      <ellipse cx={cannon[0]} cy={cannon[1]} rx={7.6} ry={3.7} fill="none" stroke={C.lacquer} strokeWidth={1.3} />
      <path d={`M${horse[0]},${horse[1]} Q${(horse[0] + cannon[0]) / 2 + 2},${horse[1] + 6} ${cannon[0] + 5},${cannon[1] + 2}`} stroke={INK} strokeWidth={1} strokeDasharray="2 2" fill="none" />
    </g>
  )
}

/** Low plastic stool. `y` is the ground line; the seat is 24 above it. */
function stool(x: number, y: number, color: string) {
  const seat = y - 24
  return (
    <g>
      <path d={`M${x - 15},${seat + 1} L${x + 15},${seat + 1} L${x + 12},${y} L${x - 12},${y} Z`} fill={color} stroke={INK} strokeWidth={1.5} />
      <path d={`M${x - 7},${y} L${x - 6},${seat + 14} L${x + 6},${seat + 14} L${x + 7},${y} Z`} fill={INK} opacity={0.35} />
      <ellipse cx={x} cy={seat + 8} rx={5} ry={2.2} fill={INK} opacity={0.45} />
      <rect x={x - 17} y={seat - 4} width={34} height={5} rx={1.5} fill={color} stroke={INK} strokeWidth={1.5} />
    </g>
  )
}

/** A player on a low stool: the kit figure is clipped at the seat and its legs fold at the knee. */
function seated({ x, facing, shirt, pants, seat: seatColor, pose, clipId }: {
  x: number; facing: 1 | -1; shirt: string; pants: string; seat: string; pose: Pose; clipId: string
}) {
  const seat = GROUND - 24
  const leg = (dx: number) =>
    `M${x + facing * 2 + dx},${seat - 4} L${x + facing * 20 + dx},${seat - 12} L${x + facing * 24 + dx},${GROUND - 3}`
  return (
    <g>
      <clipPath id={clipId}><rect x={x - 60} y={0} width={120} height={seat + 1} /></clipPath>
      {stool(x, GROUND, seatColor)}
      {[-3, 3].map(dx => (
        <g key={dx}>
          <path d={leg(dx)} stroke={INK} strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <path d={leg(dx)} stroke={pants} strokeWidth={7} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <ellipse cx={x + facing * 27 + dx} cy={GROUND - 1} rx={6} ry={2.6} fill={INK} />
        </g>
      ))}
      <g clipPath={`url(#${clipId})`}>
        <Person x={x} y={seat + 38} robe={shirt} pants={pants} long={false} pose={pose} flip={facing === -1} />
      </g>
    </g>
  )
}

/** A glass of trà đá with ice. `y` is its base. */
function teaGlass(x: number, y: number) {
  return (
    <g>
      <path d={`M${x - 5.6},${y - 12} L${x + 5.6},${y - 12} L${x + 5},${y} L${x - 5},${y} Z`} fill="#a8733a" opacity={0.85} />
      <rect x={x - 4} y={y - 11} width={3.4} height={3.4} fill={SCENE_COLORS.paperLight} stroke={INK} strokeWidth={0.5} />
      <rect x={x + 0.6} y={y - 8} width={3.4} height={3.4} fill={SCENE_COLORS.paperLight} stroke={INK} strokeWidth={0.5} />
      <path d={`M${x - 6.5},${y - 18} L${x + 6.5},${y - 18} L${x + 5},${y} L${x - 5},${y} Z`} fill={SCENE_COLORS.paperLight} fillOpacity={0.25} stroke={INK} strokeWidth={1.2} />
    </g>
  )
}

const memento: SceneDefinition = {
  slug: 'memento',
  title: { en: 'Memento: asking to take back a move in cờ tướng', vi: 'Memento: xin đi lại một nước cờ tướng' },
  sky: 'dawn',
  tags: [
    { nodeId: 'orig', method: 'save', caption: { en: 'copies itself before each move', vi: 'tự chép lại trước mỗi nước' }, at: [250, 196], to: [452, 290] },
    { nodeId: 'mem', method: 'getLabel', caption: { en: 'the only part he may read', vi: 'người xem chỉ thấy nhãn' }, at: [872, 176], to: [803, 277] },
    { nodeId: 'cmem', method: 'getState', caption: { en: 'the whole position, sealed', vi: 'cả thế cờ, niêm kín' }, at: [700, 412], to: [782, 302] },
    { nodeId: 'care', method: 'takeBack', caption: { en: 'hands back the last copy', vi: 'trả lại bản chép cuối' }, at: [876, 412], to: [834, 314] },
  ],
  calls: [
    { nodeId: 'orig', method: 'save', d: 'M552,280 C604,226 726,226 774,282', at: [664, 240] },
    { nodeId: 'orig', method: 'restore', d: 'M792,280 C766,170 614,170 556,262', at: [686, 196] },
  ],
  untagged: [],
  Art: function MementoArt({ lang }: SceneArtProps) {
    const id = 's' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
    return (
      <g>
        {/* Overhead wires */}
        {[[18, 40], [30, 58], [44, 70]].map(([y, sag], i) => (
          <path key={i} d={`M0,${y} Q${W / 2},${y + sag} ${W},${y + 6}`} stroke={INK} strokeWidth={1} opacity={0.45} fill="none" />
        ))}

        {/* A Hà Nội shophouse: yellow wall, green shutters, open shopfront */}
        <rect x={228} y={46} width={W - 228} height={GROUND - 46} fill="#dcc79b" />
        <line x1={228} y1={46} x2={228} y2={GROUND} stroke={INK} strokeWidth={1.5} />
        {[268, 548, 688, 828].map(x => (
          <g key={x}>
            <rect x={x} y={68} width={70} height={56} fill={C.jade} opacity={0.6} stroke={INK} strokeWidth={1.2} />
            {[0, 1, 2, 3, 4, 5].map(i => <line key={i} x1={x} y1={76 + i * 8} x2={x + 70} y2={76 + i * 8} stroke={INK} strokeWidth={0.6} opacity={0.4} />)}
            <line x1={x + 35} y1={68} x2={x + 35} y2={124} stroke={INK} strokeWidth={1} />
          </g>
        ))}
        {/* One window thrown open, its shutters folded back */}
        <rect x={408} y={68} width={70} height={56} fill={SCENE_COLORS.inkMuted} opacity={0.55} stroke={INK} strokeWidth={1.2} />
        <path d="M408,68 L392,64 L392,128 L408,124 Z M478,68 L494,64 L494,128 L478,124 Z" fill={C.jade} opacity={0.6} stroke={INK} strokeWidth={1.2} />
        <rect x={228} y={132} width={W - 228} height={8} fill={C.stone} stroke={INK} strokeWidth={1.2} />
        {/* A potted plant and a hanging shirt on the balcony ledge */}
        <path d="M702,132 L722,132 L719,118 L705,118 Z" fill={C.tile} stroke={INK} strokeWidth={1} />
        {[[706, 110, 8], [716, 106, 9], [711, 98, 7]].map(([cx, cy, r]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={C.leaf} stroke={INK} strokeWidth={1} />)}
        <line x1={548} y1={130} x2={618} y2={130} stroke={INK} strokeWidth={0.8} />
        <path d="M570,130 L594,130 L598,142 L590,142 L590,158 L574,158 L574,142 L566,142 Z" fill={SCENE_COLORS.paperLight} stroke={INK} strokeWidth={1} />
        <rect x={250} y={186} width={W - 250} height={GROUND - 186} fill={SCENE_COLORS.inkMuted} opacity={0.22} />
        <rect x={250} y={180} width={W - 250} height={9} fill={C.stone} stroke={INK} strokeWidth={1} />

        {/* The shade tree and the sidewalk */}
        <Tree x={86} y={GROUND} s={1.9} />
        <rect x={0} y={GROUND} width={W} height={440 - GROUND} fill="#cbb99b" />
        <rect x={0} y={GROUND} width={W} height={3} fill="#8b755e" />
        {[378, 404, 432].map(y => <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="#8b755e" strokeWidth={1} opacity={0.45} />)}
        {Array.from({ length: 13 }, (_, i) => {
          const x = i * 80
          return <line key={i} x1={x} y1={GROUND} x2={x + (x - 480) * 0.15} y2={440} stroke="#8b755e" strokeWidth={1} opacity={0.45} />
        })}
        <ellipse cx={150} cy={366} rx={170} ry={12} fill={INK} opacity={0.08} />

        {/* Red, who wants his move back */}
        {seated({ x: 348, facing: 1, shirt: '#e4dccb', pants: '#4a4a44', seat: C.indigo, pose: 'wave', clipId: `${id}-red` })}
        <Caption x={290} y={256} size={11} fill={INK}>{lang === 'vi' ? '“Cho xin đi lại!”' : '“Let me take it back!”'}</Caption>

        {/* The board, laid across a wooden crate */}
        <path d="M388,314 L572,314 L552,262 L408,262 Z" fill={C.wood} stroke={INK} strokeWidth={1.8} />
        <rect x={392} y={314} width={176} height={42} fill={C.wood} stroke={INK} strokeWidth={1.8} />
        {[328, 342].map(y => <line key={y} x1={392} y1={y} x2={568} y2={y} stroke={INK} strokeWidth={1} opacity={0.6} />)}
        <rect x={392} y={314} width={9} height={42} fill={C.woodDark} stroke={INK} strokeWidth={1.2} />
        <rect x={559} y={314} width={9} height={42} fill={C.woodDark} stroke={INK} strokeWidth={1.2} />
        {chessBoardTop()}
        {teaGlass(406, 366)}
        {teaGlass(423, 368)}

        {/* Black, reaching for the horse */}
        {seated({ x: 612, facing: -1, shirt: '#6f8582', pants: '#33302b', seat: C.tile, pose: 'reach', clipId: `${id}-black` })}

        {/* The bystander's notebook: one sealed copy per move, each with a label tab */}
        <path d="M774,284 L792,288 L792,308 L774,304 Z" fill={C.paper} stroke={INK} strokeWidth={1.3} />
        <path d="M792,288 L810,284 L810,304 L792,308 Z" fill={C.paper} stroke={INK} strokeWidth={1.3} />
        {[0, 1, 2].map(i => <line key={i} x1={777} y1={290 + i * 4} x2={789} y2={293 + i * 4} stroke={INK} strokeWidth={0.6} opacity={0.5} />)}
        {[0, 1, 2].map(i => (
          <rect key={i} x={796 + i * 5} y={276 + i} width={4} height={9} fill={i === 2 ? C.lacquer : SCENE_COLORS.paperLight} stroke={INK} strokeWidth={0.8} />
        ))}
        <circle cx={782} cy={302} r={3.4} fill={C.lacquer} stroke={INK} strokeWidth={0.8} />
        <Person x={830} y={GROUND} s={1} robe="#8a7158" pants="#4a4239" long={false} pose="reach" flip />
      </g>
    )
  },
}

export default memento
