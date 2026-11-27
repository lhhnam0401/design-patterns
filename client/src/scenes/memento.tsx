import { useId } from 'react'
import { Person, type Pose } from './print/figures'
import { GroundBand, Tree } from './print/nature'
import { INK, PAPER_LIGHT, PAPER_SHADE, PIGMENT, TINT } from './print/pigments'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { Point, SceneArtProps, SceneDefinition } from './types'

const FEET = 372
const SEAT = FEET - 30

/** The board laid across a crate, in a shallow oblique view. */
const BOARD = { fl: [300, 322] as Point, fr: [470, 322] as Point, bl: [320, 276] as Point, br: [450, 276] as Point }

function onBoard(u: number, v: number): Point {
  const front: Point = [BOARD.fl[0] + (BOARD.fr[0] - BOARD.fl[0]) * u, BOARD.fl[1]]
  const back: Point = [BOARD.bl[0] + (BOARD.br[0] - BOARD.bl[0]) * u, BOARD.bl[1]]
  return [front[0] + (back[0] - front[0]) * v, front[1] + (back[1] - front[1]) * v]
}

/** The crate and the grid of a cờ tướng board, with a few pieces as discs. */
function chessBoard() {
  const files = Array.from({ length: 7 }, (_, i) => i / 6)
  const ranks = [0, 0.25, 0.5, 0.75, 1]
  const grid = [
    ...files.map(u => `M${onBoard(u, 0).join(',')} L${onBoard(u, 1).join(',')}`),
    ...ranks.map(v => `M${onBoard(0, v).join(',')} L${onBoard(1, v).join(',')}`),
  ].join(' ')
  const reds: [number, number][] = [[0.1, 0.2], [0.5, 0.15], [0.85, 0.25], [0.3, 0.55], [0.7, 0.5]]
  const blacks: [number, number][] = [[0.15, 0.85], [0.45, 0.8], [0.8, 0.9], [0.6, 0.55]]
  const corners = [BOARD.fl, BOARD.fr, BOARD.br, BOARD.bl].map(p => p.join(',')).join(' ')
  return (
    <g>
      <rect x={298} y={322} width={174} height={44} fill={PIGMENT.wood} stroke={INK} strokeWidth={3} />
      <rect x={298} y={322} width={10} height={44} fill={PIGMENT.woodDark} stroke={INK} strokeWidth={2} />
      <rect x={462} y={322} width={10} height={44} fill={PIGMENT.woodDark} stroke={INK} strokeWidth={2} />
      <polygon points={corners} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2.6} />
      <path d={grid} stroke={INK} strokeWidth={1} opacity={0.7} fill="none" />
      {reds.map(([u, v], i) => {
        const [x, y] = onBoard(u, v)
        return <g key={`r${i}`}><ellipse cx={x} cy={y} rx={6} ry={3} fill={PAPER_SHADE} stroke={PIGMENT.red} strokeWidth={1.6} /><circle cx={x} cy={y - 0.5} r={1.8} fill={PIGMENT.red} /></g>
      })}
      {blacks.map(([u, v], i) => {
        const [x, y] = onBoard(u, v)
        return <g key={`b${i}`}><ellipse cx={x} cy={y} rx={6} ry={3} fill={PAPER_SHADE} stroke={INK} strokeWidth={1.6} /><circle cx={x} cy={y - 0.5} r={1.8} fill={INK} /></g>
      })}
    </g>
  )
}

/** A player on a low stool; the figure is clipped at the seat and its legs fold at the knee. */
function seated(x: number, facing: 1 | -1, robe: string, pants: string, seat: string, pose: Pose, clipId: string) {
  const leg = (dx: number) => `M${x + facing * 2 + dx},${SEAT - 4} L${x + facing * 20 + dx},${SEAT - 12} L${x + facing * 24 + dx},${FEET - 3}`
  return (
    <g>
      <path d={`M${x - 16},${SEAT + 1} L${x + 16},${SEAT + 1} L${x + 13},${FEET} L${x - 13},${FEET} Z`} fill={seat} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
      <rect x={x - 18} y={SEAT - 4} width={36} height={6} rx={2} fill={seat} stroke={INK} strokeWidth={2.4} />
      {[-4, 4].map(dx => (
        <g key={dx}>
          <path d={leg(dx)} stroke={INK} strokeWidth={11} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <path d={leg(dx)} stroke={pants} strokeWidth={7} fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <ellipse cx={x + facing * 27 + dx} cy={FEET - 2} rx={7} ry={3} fill={INK} />
        </g>
      ))}
      <g clipPath={`url(#${clipId})`}>
        <Person x={x} y={SEAT + 44} s={1.18} robe={robe} pants={pants} long={false} pose={pose} flip={facing === -1} hat="khanXep" />
      </g>
    </g>
  )
}

/** One sealed envelope with a readable label tab. `x` is its centre, `y` its bottom. */
function envelope(x: number, y: number, h: number, lit: boolean) {
  return (
    <g>
      <rect x={x - 30} y={y - h} width={60} height={h} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2.6} />
      <path d={`M${x - 30},${y - h} L${x},${y - h + 16} L${x + 30},${y - h} Z`} fill={PAPER_SHADE} stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
      <circle cx={x} cy={y - h + 20} r={5} fill={PIGMENT.red} stroke={INK} strokeWidth={1.4} />
      <rect x={x - 22} y={y - 14} width={44} height={10} rx={2} fill={lit ? PIGMENT.yellow : PAPER_SHADE} stroke={INK} strokeWidth={1.6} />
    </g>
  )
}

const memento: SceneDefinition = {
  slug: 'memento',
  title: { en: 'Memento: asking to take back a move in cờ tướng', vi: 'Memento: xin đi lại một nước cờ tướng' },
  setting: 'dawn',
  pins: [
    { nodeId: 'orig', methods: ['save', 'restore'], caption: { en: 'only the board may copy or reopen a position', vi: 'chỉ bàn cờ mới chép hay mở lại thế cờ' }, at: [372, 300], showName: false },
    { nodeId: 'cmem', methods: ['getState'], caption: { en: 'a whole position, sealed', vi: 'cả một thế cờ, niêm kín' }, at: [628, 300], showName: false },
    { nodeId: 'mem', methods: ['getLabel'], caption: { en: 'the keeper may read only the label', vi: 'người giữ chỉ được đọc cái nhãn' }, at: [500, 44], showName: false },
    { nodeId: 'care', methods: ['takeBack'], caption: { en: 'saves before each move, hands the last one back', vi: 'chép trước mỗi nước, trả lại bản cuối' }, at: [864, 300], showName: false },
  ],
  calls: [
    { id: 'play', nodeId: 'care', method: 'play', d: 'M838,284 C720,240 520,244 392,278' },
    { id: 'save', nodeId: 'orig', method: 'save', d: 'M470,296 C520,268 560,268 596,286' },
    { id: 'move', nodeId: 'orig', method: 'move', d: 'M300,316 C318,338 360,338 382,320' },
    { id: 'take-back', nodeId: 'care', method: 'takeBack', d: 'M842,306 C800,324 740,324 702,312' },
    { id: 'restore', nodeId: 'orig', method: 'restore', d: 'M596,316 C520,360 456,360 414,330' },
  ],
  steps: [
    {
      calls: ['play', 'save'],
      nodes: ['care', 'orig', 'cmem', 'mem'],
      at: [496, 236],
      caption: { en: 'Before every move, play() has the board save() a copy of itself; the keeper seals it with a label.', vi: 'Trước mỗi nước, play() bảo bàn cờ save() một bản chép; người giữ niêm lại kèm một cái nhãn.' },
    },
    {
      calls: ['move'],
      nodes: ['orig'],
      at: [300, 212],
      caption: { en: 'The board moves a piece with move(). More moves follow, each saved first, so the sealed copies pile up.', vi: 'Bàn cờ đi một quân bằng move(). Các nước sau cũng vậy, chép trước rồi đi, nên bản niêm cứ chồng lên.' },
    },
    {
      calls: ['take-back'],
      nodes: ['care', 'cmem', 'mem'],
      at: [756, 240],
      caption: { en: 'Red asks to take the move back. takeBack() pops the last envelope; the keeper knows it only by its label.', vi: 'Đỏ xin đi lại. takeBack() lấy phong bì cuối ra; người giữ chỉ nhận ra nó qua cái nhãn.' },
    },
    {
      calls: ['restore'],
      nodes: ['orig', 'cmem'],
      at: [500, 348],
      caption: { en: 'The board opens its own sealed copy: restore() puts every piece and the turn back as they were.', vi: 'Bàn cờ tự mở bản niêm của mình: restore() đặt lại từng quân và lượt đi như cũ.' },
    },
  ],
  focus: [180, 110, 740, 322],
  untagged: [],
  Art: function MementoArt({ lang }: SceneArtProps) {
    const clip = 's' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
    return (
      <>
        <Backdrop>
          <Tree x={70} y={FEET} s={1.5} pale />
          <GroundBand y={FEET} color={TINT.ground} edge={TINT.groundEdge} />
        </Backdrop>

        {/* The rail: the Snapshot interface, the narrow face the keeper is allowed to see */}
        <Part node="mem">
          <Signboard x={628} w={300} tone="interface" span={[576, 680]} ticks={[576, 628, 680]}>
            <Caption x={644} y={53}>{lang === 'vi' ? 'Chỉ đọc được cái nhãn' : 'Only the label shows'}</Caption>
          </Signboard>
        </Part>

        {/* The board and the two players: only the board (originator) sees the whole position */}
        <Part node="orig">
          <clipPath id={`${clip}-red`}><rect x={200} y={0} width={120} height={SEAT + 2} /></clipPath>
          <clipPath id={`${clip}-black`}><rect x={440} y={0} width={120} height={SEAT + 2} /></clipPath>
          {seated(258, 1, PIGMENT.red, PIGMENT.redDark, PIGMENT.blue, 'wave', `${clip}-red`)}
          {seated(500, -1, PIGMENT.stone, PIGMENT.woodDark, PIGMENT.tile, 'reach', `${clip}-black`)}
          {chessBoard()}
          <Caption x={236} y={250} size={18}>{lang === 'vi' ? '“Cho xin đi lại!”' : '“Let me take it back!”'}</Caption>
        </Part>

        {/* The sealed copies: one per move, the newest at the right */}
        <Part node="cmem">
          <rect x={556} y={316} width={150} height={10} fill={PIGMENT.woodDark} stroke={INK} strokeWidth={2.4} />
          {envelope(588, 316, 40, false)}
          {envelope(628, 314, 44, false)}
          {envelope(668, 312, 48, true)}
        </Part>

        {/* The keeper: holds the copies but reads only their labels */}
        <Part node="care">
          <Person x={866} y={FEET} s={1.28} robe={PIGMENT.green} pants={PIGMENT.woodDark} hat="official" pose="hold" flip>
            <rect x={-22} y={-74} width={44} height={30} rx={2} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2.4} />
            {[-64, -58, -52].map(y => <line key={y} x1={-16} y1={y + 10} x2={16} y2={y + 10} stroke={INK} strokeWidth={1.6} opacity={0.6} />)}
          </Person>
        </Part>
      </>
    )
  },
}

export default memento
