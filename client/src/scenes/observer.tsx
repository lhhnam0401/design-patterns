import { Person } from './print/figures'
import { Grass, GroundBand, Moon, Stars } from './print/nature'
import { INK, PIGMENT } from './print/pigments'
import { BronzeDrum, HangingScroll } from './print/props'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const FEET = 378
const LISTENERS = { o1: 590, o2: 730, o3: 870 } as const

const observer: SceneDefinition = {
  slug: 'observer',
  title: { en: 'Observer: the bronze drum signals the village', vi: 'Observer: tiếng trống đồng báo hiệu cả làng' },
  setting: 'night',
  pins: [
    { nodeId: 'client', caption: { en: 'the elder signs people up and strikes the drum', vi: 'cụ trưởng làng ghi tên và đánh trống' }, at: [92, 360] },
    { nodeId: 'pub', methods: ['subscribe', 'unsubscribe', 'strike'], caption: { en: 'keeps the list, beats once for everyone on it', vi: 'giữ danh sách, đánh một hồi cho mọi người trong đó' }, at: [330, 330] },
    { nodeId: 'obs', methods: ['react'], caption: { en: 'everyone on the list is told', vi: 'ai có tên trong danh sách đều được báo' }, at: [586, 44], side: 'left' },
    { nodeId: 'o1', caption: { en: 'runs back to the village', vi: 'chạy về làng' }, at: [LISTENERS.o1, 362], showName: false },
    { nodeId: 'o2', caption: { en: 'takes up arms', vi: 'cầm vũ khí' }, at: [LISTENERS.o2, 362], showName: false },
    { nodeId: 'o3', caption: { en: 'unsubscribes before a long trip', vi: 'đi buôn xa, hủy đăng ký' }, at: [LISTENERS.o3, 362], showName: false },
  ],
  calls: [
    { id: 'subscribe', nodeId: 'pub', method: 'subscribe', d: 'M118,244 C150,196 230,186 290,194' },
    { id: 'unsubscribe', nodeId: 'pub', method: 'unsubscribe', d: 'M124,270 C170,240 240,226 290,224' },
    { id: 'strike', nodeId: 'pub', method: 'strike', d: 'M176,318 L246,318' },
    { id: 'react-o1', nodeId: 'o1', method: 'react', d: 'M412,300 C470,284 520,284 556,296' },
    { id: 'react-o2', nodeId: 'o2', method: 'react', d: 'M408,282 C480,196 640,190 698,268' },
    { id: 'react-o3', nodeId: 'o3', method: 'react', d: 'M402,266 C470,130 790,124 838,262' },
  ],
  steps: [
    {
      calls: ['subscribe'],
      nodes: ['client', 'pub', 'o1', 'o2', 'o3'],
      at: [205, 182],
      caption: { en: 'The elder writes the farmer, the soldier and the trader on the drum’s list.', vi: 'Cụ trưởng làng ghi tên người nông dân, người lính và người lái buôn vào danh sách của trống.' },
    },
    {
      calls: ['strike', 'react-o1', 'react-o2', 'react-o3'],
      nodes: ['client', 'pub', 'obs', 'o1', 'o2', 'o3'],
      at: [482, 232],
      caption: { en: 'Enemies are coming: one strike, and the drum calls react() on each listener, who responds in their own way.', vi: 'Giặc đến: chỉ một hồi trống, trống gọi react() của từng người có tên, mỗi người phản ứng theo cách riêng.' },
    },
    {
      calls: ['unsubscribe'],
      nodes: ['client', 'pub', 'o3'],
      at: [196, 240],
      caption: { en: 'The trader leaves to trade far away, so the elder crosses him off the list.', vi: 'Người lái buôn đi buôn xa, nên cụ trưởng làng gạch tên khỏi danh sách.' },
    },
    {
      calls: ['strike', 'react-o1', 'react-o2'],
      nodes: ['client', 'pub', 'obs', 'o1', 'o2'],
      at: [212, 296],
      caption: { en: 'The festival strike now notifies only the farmer and the soldier, the two still on the list.', vi: 'Hồi trống lễ hội giờ chỉ báo cho người nông dân và người lính, hai người còn trong danh sách.' },
    },
  ],
  focus: [210, 70, 720, 312],
  untagged: [],
  Art: function ObserverArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Moon x={88} y={50} r={22} />
          <Stars seed={17} count={14} x0={170} x1={540} y0={12} y1={86} />
          <GroundBand />
          <Grass x0={430} x1={560} seed={4} count={6} />
          <Grass x0={10} x1={60} seed={6} count={3} />
        </Backdrop>

        {/* The subscriber interface hangs over exactly the three subscribers */}
        <Part node="obs">
          <Signboard x={730} w={320} tone="interface" span={[LISTENERS.o1, LISTENERS.o3]} ticks={Object.values(LISTENERS)}>
            <Caption x={730} y={53}>{lang === 'vi' ? 'Ai có tên đều được báo' : 'Everyone on the list'}</Caption>
          </Signboard>
        </Part>

        {/* The drum, its frame and the list of listeners it keeps */}
        <Part node="pub">
          <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
            <rect x={238} y={160} width={9} height={220} fill={PIGMENT.wood} />
            <rect x={413} y={160} width={9} height={220} fill={PIGMENT.wood} />
            <path d="M216,150 Q228,160 240,156 L420,156 Q432,160 444,150 L440,166 L220,166 Z" fill={PIGMENT.red} />
          </g>
          <line x1={312} y1={166} x2={312} y2={178} stroke={INK} strokeWidth={2} />
          <line x1={348} y1={166} x2={348} y2={178} stroke={INK} strokeWidth={2} />
          <HangingScroll x={298} y={180} w={64} h={62} lines={3} struck={2} />
          <rect x={262} y={370} width={136} height={10} fill={PIGMENT.woodDark} stroke={INK} strokeWidth={2.5} />
          <BronzeDrum cx={330} y={372} w={140} h={96} />
          {[0, 1, 2].map(i => (
            <path key={i} d={`M${244 - i * 2},${300 + i * 12} l-10,${-4 + i * 4}`} stroke={PIGMENT.yellowDark} strokeWidth={3} strokeLinecap="round" />
          ))}
        </Part>

        {/* The elder: signs people up and strikes the drum */}
        <Part node="client">
          <Person x={92} y={FEET} s={1.3} robe={PIGMENT.blue} pants={PIGMENT.blueDark} hat="khanXep" pose="reach">
            <line x1={32} y1={-60} x2={54} y2={-45} stroke={INK} strokeWidth={5} strokeLinecap="round" />
            <line x1={32} y1={-60} x2={54} y2={-45} stroke={PIGMENT.wood} strokeWidth={2.6} strokeLinecap="round" />
            <circle cx={57} cy={-43} r={5} fill={PIGMENT.red} stroke={INK} strokeWidth={1.8} />
          </Person>
        </Part>

        {/* The farmer runs home with his hoe */}
        <Part node="o1">
          <Person x={LISTENERS.o1} y={FEET} s={1.2} robe={PIGMENT.amber} pants={PIGMENT.woodDark} hat="nonLa" long={false}>
            <line x1={26} y1={-112} x2={26} y2={-8} stroke={INK} strokeWidth={5.5} strokeLinecap="round" />
            <line x1={26} y1={-112} x2={26} y2={-8} stroke={PIGMENT.wood} strokeWidth={3} strokeLinecap="round" />
            <path d="M16,-10 L36,-10 L34,0 L18,0 Z" fill={PIGMENT.steel} stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
          </Person>
        </Part>

        {/* The soldier takes up his spear */}
        <Part node="o2">
          <Person x={LISTENERS.o2} y={FEET} s={1.2} robe={PIGMENT.red} pants={PIGMENT.woodDark} hat="helmet" armor>
            <line x1={20} y1={-20} x2={22} y2={-122} stroke={INK} strokeWidth={5.5} strokeLinecap="round" />
            <line x1={20} y1={-20} x2={22} y2={-122} stroke={PIGMENT.wood} strokeWidth={3} strokeLinecap="round" />
            <path d="M22,-122 l-5,-3 l5,-16 l5,16 Z" fill={PIGMENT.steel} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
          </Person>
        </Part>

        {/* The trader carries his goods on a shoulder pole */}
        <Part node="o3">
          <Person x={LISTENERS.o3} y={FEET} s={1.2} robe={PIGMENT.green} pants={PIGMENT.woodDark} hat="nonLa" long={false} pose="hold">
            <line x1={-36} y1={-70} x2={36} y2={-70} stroke={INK} strokeWidth={6} strokeLinecap="round" />
            <line x1={-36} y1={-70} x2={36} y2={-70} stroke={PIGMENT.wood} strokeWidth={3} strokeLinecap="round" />
            {[-32, 32].map(bx => (
              <g key={bx}>
                <path d={`M${bx - 8},-70 L${bx - 11},-42 M${bx + 8},-70 L${bx + 11},-42`} stroke={INK} strokeWidth={1.4} />
                <path d={`M${bx - 13},-42 L${bx + 13},-42 L${bx + 9},-24 L${bx - 9},-24 Z`} fill={PIGMENT.yellow} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
                <path d={`M${bx - 11},-35 L${bx + 11},-35`} stroke={PIGMENT.yellowDark} strokeWidth={1.4} />
              </g>
            ))}
          </Person>
        </Part>
      </>
    )
  },
}

export default observer
