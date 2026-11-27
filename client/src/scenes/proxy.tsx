import { Gate, Hall, Wall } from './print/architecture'
import { Person } from './print/figures'
import { Cloud, GroundBand, Hills, Sun } from './print/nature'
import { INK, PIGMENT } from './print/pigments'
import { RolledScroll, Scroll } from './print/props'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const FEET = 378
/** Where each participant stands, in one line from the queue to the throne. */
const X = { official: 60, stranger: 150, mandarin: 450, emperor: 810 } as const

/** The throne behind the Emperor: a lacquered back with a gold rim. */
function throne(x: number) {
  return (
    <g stroke={INK} strokeLinejoin="round">
      <path d={`M${x - 42},${FEET - 10} L${x - 42},${FEET - 150} Q${x},${FEET - 176} ${x + 42},${FEET - 150} L${x + 42},${FEET - 10} Z`} fill={PIGMENT.red} strokeWidth={3} />
      <path d={`M${x - 32},${FEET - 20} L${x - 32},${FEET - 142} Q${x},${FEET - 162} ${x + 32},${FEET - 142} L${x + 32},${FEET - 20}`} fill="none" stroke={PIGMENT.yellow} strokeWidth={2.4} />
      <circle cx={x} cy={FEET - 152} r={6} fill={PIGMENT.yellow} strokeWidth={1.8} />
    </g>
  )
}

const proxy: SceneDefinition = {
  slug: 'proxy',
  title: { en: 'Proxy: the mandarin at the palace gate', vi: 'Proxy: viên quan giữ cổng cung điện' },
  setting: 'dusk',
  pins: [
    { nodeId: 'client', methods: ['submitPetition'], caption: { en: 'petitioners at court', vi: 'người dâng đơn ở triều đình' }, at: [X.official, 340], showName: false },
    { nodeId: 'iface', caption: { en: 'all they ever deal with', vi: 'thứ duy nhất họ làm việc cùng' }, at: [500, 44], side: 'left' },
    { nodeId: 'proxy', methods: ['grantAudience'], caption: { en: 'checks the list, then wakes the court', vi: 'xét danh sách rồi mới mời vua' }, at: [X.mandarin, 352], showName: false },
    { nodeId: 'real', caption: { en: 'woken only when needed', vi: 'chỉ được mời khi cần' }, at: [X.emperor, 346], showName: false },
  ],
  calls: [
    { id: 'ask-stranger', nodeId: 'iface', method: 'grantAudience', d: 'M212,304 L416,304' },
    { id: 'refuse', nodeId: 'proxy', method: 'grantAudience', kind: 'return', d: 'M416,346 L196,346' },
    { id: 'ask-official', nodeId: 'iface', method: 'grantAudience', d: 'M96,236 C170,150 330,240 420,276' },
    { id: 'pass', nodeId: 'real', method: 'grantAudience', d: 'M486,304 L766,304' },
    { id: 'answer', nodeId: 'real', method: 'grantAudience', kind: 'return', d: 'M766,346 L486,346' },
    { id: 'answer-out', nodeId: 'proxy', method: 'grantAudience', kind: 'return', d: 'M432,226 C350,118 160,118 84,226' },
  ],
  steps: [
    {
      calls: ['ask-stranger'],
      nodes: ['client', 'iface', 'proxy'],
      at: [300, 272],
      caption: { en: 'submitPetition() calls grantAudience() on what it knows only as an Emperor. The mandarin at the gate takes the call.', vi: 'submitPetition() gọi grantAudience() trên thứ nó chỉ biết là một Emperor. Viên quan ở cổng nhận lời gọi.' },
    },
    {
      calls: ['refuse'],
      nodes: ['client', 'proxy'],
      at: [300, 384],
      caption: { en: 'The commoner is not on the list, so the mandarin turns him away. The emperor is never woken.', vi: 'Người dân thường không có tên trong danh sách, nên viên quan từ chối. Nhà vua không bị đánh thức.' },
    },
    {
      calls: ['ask-official', 'pass'],
      nodes: ['client', 'iface', 'proxy', 'real'],
      at: [620, 268],
      caption: { en: 'The chancellor is on the list: the mandarin summons the RealEmperor, only this first time, and passes the petition on.', vi: 'Tể tướng có tên: viên quan mời RealEmperor ra điện, chỉ lần đầu này, rồi chuyển lá đơn vào.' },
    },
    {
      calls: ['answer', 'answer-out'],
      nodes: ['real', 'proxy', 'client'],
      at: [620, 384],
      caption: { en: 'The emperor’s answer comes back through the gate. The court cannot tell who it was talking to.', vi: 'Lời phán của nhà vua đi ngược qua cổng. Buổi thiết triều không biết mình vừa nói chuyện với ai.' },
    },
  ],
  focus: [96, 100, 768, 320],
  untagged: [],
  Art: function ProxyArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Sun x={84} y={150} r={26} />
          <Cloud x={250} y={120} s={0.8} />
          <Hills y={300} amp={26} seed={5} step={140} />
          <GroundBand />
          <Wall x={580} y={FEET} w={130} h={40} pale />
        </Backdrop>

        {/* The interface hangs over the two who answer to it: the mandarin and the real Emperor */}
        <Part node="iface">
          <Signboard x={640} w={300} tone="interface" span={[X.mandarin, X.emperor]} ticks={[X.mandarin, X.emperor]}>
            <Caption x={652} y={53}>{lang === 'vi' ? 'Tiếng nói của ngai vàng' : 'The voice of the throne'}</Caption>
          </Signboard>
        </Part>

        {/* The throne hall and the Emperor, summoned only for the first permitted petition */}
        <Part node="real">
          <Hall cx={X.emperor} y={FEET} w={200} h={136} roofH={62} doors={3} />
          {throne(X.emperor)}
          <Person x={X.emperor} y={FEET - 10} s={1.3} robe={PIGMENT.yellow} pants={PIGMENT.redDark} sash={PIGMENT.red} hat="crown" pose="hold">
            <rect x={-4} y={-74} width={8} height={22} rx={2} fill={PIGMENT.white} stroke={INK} strokeWidth={1.6} />
          </Person>
        </Part>

        {/* The mandarin in front of the gate, holding the list of who may pass */}
        <Part node="proxy">
          <Gate cx={X.mandarin} y={FEET} w={220} h={150} />
          <Person x={X.mandarin} y={FEET} s={1.3} robe={PIGMENT.blue} pants={PIGMENT.blueDark} sash={PIGMENT.yellow} hat="official" pose="hold">
            <Scroll x={-18} y={-68} w={36} h={26} lines={2} seal={false} />
            <path d="M8,-56 l3,3 l6,-7" stroke={PIGMENT.green} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </Person>
        </Part>

        {/* The queue: a commoner in front, the chancellor behind him */}
        <Part node="client">
          <Person x={X.official} y={FEET} s={1.2} robe={PIGMENT.green} pants={PIGMENT.woodDark} sash={PIGMENT.red} hat="official" pose="hold">
            <RolledScroll x={-14} y={-56} w={28} />
          </Person>
          <Person x={X.stranger} y={FEET} s={1.2} robe={PIGMENT.amber} pants={PIGMENT.woodDark} hat="nonLa" long={false} pose="reach">
            <RolledScroll x={26} y={-60} w={22} />
          </Person>
        </Part>
      </>
    )
  },
}

export default proxy
