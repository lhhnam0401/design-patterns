import { Person } from './print/figures'
import { Bamboo, GroundBand, Moon } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './print/pigments'
import { Lantern } from './print/props'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const FEET = 378
const KEYBOARD_X = 322
const ADAPTER_X = 500

/** Screen and desk of the recording software, beside the engineer. */
function console_(x: number) {
  return (
    <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
      <rect x={x} y={342} width={92} height={10} fill={PIGMENT.woodDark} />
      <rect x={x + 8} y={352} width={9} height={26} fill={PIGMENT.wood} />
      <rect x={x + 75} y={352} width={9} height={26} fill={PIGMENT.wood} />
      <rect x={x + 6} y={282} width={80} height={56} rx={4} fill={PIGMENT.iron} />
      <rect x={x + 12} y={288} width={68} height={44} fill={PAPER_LIGHT} strokeWidth={1.6} />
      <path d={`M${x + 16},312 l8,-12 l8,22 l8,-18 l8,14 l8,-10 l8,6 l6,-3`} fill="none" stroke={PIGMENT.green} strokeWidth={2.6} />
      <circle cx={x + 74} cy={294} r={3.5} fill={PIGMENT.red} strokeWidth={1.4} />
    </g>
  )
}

/** A MIDI keyboard on an X stand, with a small display on top. */
function keyboard(cx: number) {
  const left = cx - 60
  return (
    <g stroke={INK} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round">
      <path d={`M${cx - 38},334 L${cx + 30},378 M${cx + 38},334 L${cx - 30},378`} fill="none" strokeWidth={5} />
      <rect x={left + 14} y={278} width={92} height={24} rx={3} fill={PIGMENT.blueDark} />
      <rect x={left + 20} y={283} width={80} height={14} fill={PAPER_LIGHT} strokeWidth={1.4} />
      <rect x={left} y={300} width={120} height={36} rx={5} fill={PIGMENT.iron} />
      <rect x={left + 6} y={308} width={108} height={24} fill={PAPER_LIGHT} strokeWidth={1.6} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <line key={i} x1={left + 20 + i * 12} y1={308} x2={left + 20 + i * 12} y2={332} strokeWidth={1.2} />)}
      {[0, 1, 3, 4, 5].map(i => <rect key={i} x={left + 15 + i * 12} y={308} width={9} height={14} fill={INK} strokeWidth={1} />)}
    </g>
  )
}

/** A lacquered box with five buttons, one per mapped string: the adapter. */
function adapterBox(cx: number) {
  return (
    <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
      <rect x={cx - 46} y={360} width={92} height={18} fill={PIGMENT.woodDark} />
      <rect x={cx - 60} y={272} width={120} height={90} rx={6} fill={PIGMENT.red} />
      <rect x={cx - 52} y={280} width={104} height={74} rx={4} fill="none" stroke={PIGMENT.yellow} strokeWidth={2} />
      {[0, 1, 2, 3, 4].map(i => (
        <circle key={i} cx={cx - 40 + i * 20} cy={304} r={7.5} fill={PAPER_LIGHT} strokeWidth={1.6} />
      ))}
      <circle cx={cx} cy={304} r={12} fill="none" stroke={PIGMENT.yellow} strokeWidth={2} strokeDasharray="3 3" />
      <rect x={cx - 38} y={326} width={76} height={8} rx={3} fill={PIGMENT.redDark} strokeWidth={1.6} />
      <circle cx={cx - 66} cy={332} r={7} fill={PIGMENT.steel} strokeWidth={2} />
      <circle cx={cx + 66} cy={332} r={7} fill={PIGMENT.steel} strokeWidth={2} />
    </g>
  )
}

/** A zither on two legs. */
function zither(x: number) {
  return (
    <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
      <rect x={x + 14} y={322} width={10} height={56} fill={PIGMENT.woodDark} />
      <rect x={x + 136} y={322} width={10} height={56} fill={PIGMENT.woodDark} />
      <rect x={x} y={284} width={160} height={40} rx={16} fill={PIGMENT.wood} />
      <rect x={x + 10} y={290} width={140} height={22} rx={9} fill={PIGMENT.amber} strokeWidth={1.6} />
      {[0, 1, 2, 3, 4, 5, 6].map(i => <line key={i} x1={x + 18} y1={293 + i * 3} x2={x + 142} y2={293 + i * 3} stroke={PIGMENT.straw} strokeWidth={1} />)}
      {[0, 1, 2, 3, 4, 5, 6].map(i => <path key={i} d={`M${x + 36 + i * 15},312 l3,-8 l3,8 Z`} fill={PAPER_LIGHT} strokeWidth={1.2} />)}
      <circle cx={x + 144} cy={301} r={5} fill={PIGMENT.yellow} strokeWidth={1.6} />
    </g>
  )
}

const adapter: SceneDefinition = {
  slug: 'adapter',
  title: { en: 'Adapter: recording a đàn tranh through MIDI', vi: 'Adapter: thu âm đàn tranh qua MIDI' },
  setting: 'interior',
  pins: [
    { nodeId: 'client', methods: ['record'], caption: { en: 'records every note it receives', vi: 'ghi lại mọi nốt nhận được' }, at: [60, 320], showName: false },
    { nodeId: 'target', methods: ['readNote'], caption: { en: 'the port the software reads', vi: 'cổng mà phần mềm đọc' }, at: [266, 44], side: 'left' },
    { nodeId: 'keyboard', methods: ['readNote'], caption: { en: 'already speaks MIDI', vi: 'vốn đã dùng MIDI' }, at: [KEYBOARD_X, 318], showName: false },
    { nodeId: 'adapter', methods: ['readNote'], caption: { en: 'turns each pluck into a note', vi: 'đổi mỗi cú gảy thành một nốt' }, at: [ADAPTER_X, 346], showName: false },
    { nodeId: 'adaptee', methods: ['pluckString', 'nextPluck'], caption: { en: 'the musician plucks the strings', vi: 'nghệ sĩ gảy dây đàn' }, at: [740, 306], showName: false },
  ],
  calls: [
    { id: 'read-kb', nodeId: 'keyboard', method: 'readNote', d: 'M190,312 L256,312' },
    { id: 'read-ad', nodeId: 'adapter', method: 'readNote', d: 'M176,276 C230,150 400,140 482,266' },
    { id: 'next', nodeId: 'adaptee', method: 'nextPluck', d: 'M566,296 L670,296' },
    { id: 'back', nodeId: 'adaptee', method: 'nextPluck', d: 'M670,340 L566,340', kind: 'return' },
  ],
  steps: [
    {
      calls: ['read-kb'],
      nodes: ['client', 'target', 'keyboard'],
      at: [224, 356],
      caption: { en: 'The software calls readNote() on the keyboard, which returns a note right away.', vi: 'Phần mềm gọi readNote() trên bàn phím, và bàn phím trả về một nốt ngay.' },
    },
    {
      calls: ['read-ad'],
      nodes: ['client', 'target', 'adapter'],
      at: [328, 148],
      caption: { en: 'It asks the adapter the same way, with readNote(). The zither itself has no such method.', vi: 'Nó hỏi bộ chuyển đổi theo cùng cách, bằng readNote(). Bản thân đàn tranh không có phương thức này.' },
    },
    {
      calls: ['next'],
      nodes: ['adapter', 'adaptee'],
      at: [608, 246],
      caption: { en: 'The adapter asks the zither for its next pluck with nextPluck().', vi: 'Bộ chuyển đổi xin đàn tranh cú gảy kế tiếp bằng nextPluck().' },
    },
    {
      calls: ['back'],
      nodes: ['adapter', 'adaptee'],
      at: [608, 396],
      caption: { en: 'The pluck comes back as a string number and a strength; the adapter looks them up and returns a MIDI note.', vi: 'Cú gảy trở về dưới dạng số dây và lực gảy; bộ chuyển đổi tra bảng rồi trả về một nốt MIDI.' },
    },
  ],
  focus: [0, 56, 960, 384],
  untagged: [],
  Art: function AdapterArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <circle cx={690} cy={176} r={62} fill={TINT.green} stroke={INK} strokeWidth={3} />
          <circle cx={690} cy={176} r={72} fill="none" stroke={TINT.amber} strokeWidth={8} />
          <Moon x={716} y={150} r={14} />
          <Bamboo x={660} y={236} h={120} seed={5} count={3} pale />
          <Lantern x={850} y={90} r={14} cord={60} pale />
          <GroundBand />
        </Backdrop>
        <Part node="target">
          <Signboard x={410} w={320} tone="interface" span={[KEYBOARD_X, ADAPTER_X]}>
            <Caption x={426} y={53}>{lang === 'vi' ? 'Mọi nguồn nốt nhạc' : 'Any source of notes'}</Caption>
          </Signboard>
        </Part>
        <Part node="client">
          <Person x={58} y={FEET} s={1.25} robe={PIGMENT.blue} pants={PIGMENT.woodDark} hat="khanXep" pose="point" />
          {console_(96)}
        </Part>
        <Part node="keyboard">{keyboard(KEYBOARD_X)}</Part>
        <Part node="adapter">{adapterBox(ADAPTER_X)}</Part>
        <Part node="adaptee">
          {zither(680)}
          <Person x={886} y={FEET} s={1.25} robe={PIGMENT.red} pants={PIGMENT.woodDark} hat="bun" pose="reach" flip />
        </Part>
      </>
    )
  },
}

export default adapter
