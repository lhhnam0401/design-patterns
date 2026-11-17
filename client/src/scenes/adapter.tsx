import { Person } from './kit/figures'
import { url, useSceneIds } from './kit/ids'
import { Bamboo, Moon } from './kit/nature'
import { Caption } from './kit/overlay'
import { C, INK, W } from './kit/palette'
import { Lantern, Table } from './kit/props'
import type { SceneArtProps, SceneDefinition } from './types'

const NOTES = { en: ['Hò', 'Xự', 'Xang', 'Xê', 'Cống'], vi: ['Hò', 'Xự', 'Xang', 'Xê', 'Cống'] }

const adapter: SceneDefinition = {
  slug: 'adapter',
  title: { en: 'Adapter: recording a đàn tranh through MIDI', vi: 'Adapter: thu âm đàn tranh qua MIDI' },
  sky: 'interior',
  tags: [
    { nodeId: 'adaptee', method: 'pluckString', caption: { en: 'knows strings, not MIDI', vi: 'chỉ biết dây đàn, không biết MIDI' }, at: [150, 132], to: [214, 284] },
    { nodeId: 'adapter', method: 'sendMidi', caption: { en: 'turns notes into plucks', vi: 'đổi nốt nhạc thành cú gảy' }, at: [440, 402], to: [470, 336] },
    { nodeId: 'target', caption: { en: 'the port it expects', vi: 'cổng mà phần mềm cần' }, at: [600, 222], to: [688, 300] },
    { nodeId: 'keyboard', caption: { en: 'already speaks MIDI', vi: 'vốn đã nói MIDI' }, at: [616, 418], to: [616, 374] },
    { nodeId: 'client', method: 'record', caption: { en: 'the recording software', vi: 'phần mềm thu âm' }, at: [806, 112], to: [800, 226] },
  ],
  calls: [
    { nodeId: 'target', method: 'sendMidi', d: 'M730,292 Q712,300 700,308', at: [756, 334] },
    { nodeId: 'adaptee', method: 'pluckString', d: 'M400,290 C380,268 356,266 338,280', at: [372, 250] },
  ],
  untagged: [],
  Art: function AdapterArt({ lang }: SceneArtProps) {
    const ids = useSceneIds()
    return (
      <g>
        <rect width={W} height={340} fill="#2b170d" />
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1={i * 62 + 10} y1={0} x2={i * 62 + 10} y2={340} stroke="#1a0d07" strokeWidth={3} />
        ))}
        {/* Moon window looking onto the garden */}
        <circle cx={480} cy={130} r={78} fill="#0b1533" stroke={C.woodDark} strokeWidth={10} />
        <circle cx={480} cy={130} r={78} fill="none" stroke={INK} strokeWidth={2} />
        <Moon x={510} y={100} r={14} />
        <g opacity={0.8}><Bamboo x={430} y={208} h={120} seed={5} count={3} color="#24452a" /></g>
        <circle cx={480} cy={130} r={83} fill="none" stroke={C.wood} strokeWidth={4} />
        <Lantern x={300} y={80} r={12} cord={50} />
        <Lantern x={660} y={80} r={12} cord={50} color="#f2a03b" />

        <rect y={338} width={W} height={102} fill="#5a3a22" />
        {[352, 374, 402].map(y => <line key={y} x1={0} y1={y} x2={W} y2={y} stroke="#3e2615" strokeWidth={2} />)}
        <rect x={0} y={330} width={W} height={10} fill={C.woodDark} stroke={INK} strokeWidth={1.5} />

        {/* The musician and her 16-string zither */}
        <Person x={176} y={352} s={1.12} robe="#9f1d1d" pants="#1f1410" hat="bun" pose="reach" />
        <g transform="translate(60,300) rotate(-6)">
          <rect x={4} y={30} width={10} height={40} fill={C.woodDark} stroke={INK} strokeWidth={1.5} />
          <rect x={256} y={30} width={10} height={36} fill={C.woodDark} stroke={INK} strokeWidth={1.5} />
          <rect x={0} y={0} width={280} height={36} rx={14} fill="#7a3b1e" stroke={INK} strokeWidth={2.5} />
          <rect x={10} y={4} width={260} height={18} rx={8} fill="#a0623a" stroke={INK} strokeWidth={1} />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={18} y1={6 + i * 2} x2={262} y2={6 + i * 2} stroke="#fde68a" strokeWidth={0.7} opacity={0.9} />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <path key={`b${i}`} d={`M${70 + i * 18},${20} l3,-6 l3,6 Z`} fill={C.paper} stroke={INK} strokeWidth={0.8} />
          ))}
          <circle cx={248} cy={13} r={5} fill={C.gold} stroke={INK} />
        </g>
        <path d="M336,288 C366,300 386,306 404,302" stroke={INK} strokeWidth={4} fill="none" />
        <path d="M336,288 C366,300 386,306 404,302" stroke="#9ca3af" strokeWidth={2} fill="none" />

        {/* The adapter: a lacquered box with the five pentatonic notes */}
        <rect x={430} y={330} width={100} height={8} fill={C.woodDark} stroke={INK} strokeWidth={1.4} />
        <rect x={404} y={262} width={152} height={70} rx={6} fill={C.lacquer} stroke={INK} strokeWidth={2.5} />
        <rect x={410} y={268} width={140} height={58} rx={4} fill="none" stroke={C.gold} strokeWidth={1.4} />
        {NOTES[lang].map((n, i) => (
          <g key={n}>
            <circle cx={424 + i * 28} cy={288} r={6} fill="#fde68a" opacity={i === 2 ? 1 : 0.55} stroke={INK} strokeWidth={1} />
            {i === 2 && <circle cx={424 + i * 28} cy={288} r={14} fill={url(ids.lamp)} />}
            <Caption x={424 + i * 28} y={314} size={9} fill={C.gold} weight={600}>{n}</Caption>
          </g>
        ))}
        <path d="M556,300 C590,310 625,312 680,312" stroke={INK} strokeWidth={4} fill="none" />
        <path d="M556,300 C590,310 625,312 680,312" stroke="#9ca3af" strokeWidth={2} fill="none" />

        {/* The recording console with its MIDI port */}
        <Table x={680} y={372} w={230} h={36} color={C.wood} />
        <rect x={680} y={292} width={22} height={36} rx={3} fill="#b7791f" stroke={INK} strokeWidth={1.8} />
        <circle cx={691} cy={304} r={4} fill={INK} />
        <circle cx={691} cy={318} r={4} fill={INK} />
        <rect x={730} y={228} width={150} height={92} rx={6} fill="#0f172a" stroke={INK} strokeWidth={2.5} />
        <rect x={738} y={236} width={134} height={72} rx={3} fill="#111c35" />
        <path d={'M742,276 ' + Array.from({ length: 26 }, (_, i) => `L${746 + i * 5},${276 + Math.sin(i * 1.3) * (6 + (i % 5) * 3)}`).join(' ')} stroke="#4ade80" strokeWidth={1.5} fill="none" />
        {[0, 1, 2, 3, 4].map(i => <rect key={i} x={748 + i * 24} y={292 - i * 3} width={18} height={4} rx={2} fill="#fbbf24" />)}
        <rect x={790} y={320} width={30} height={8} fill="#1f2937" stroke={INK} strokeWidth={1.2} />
        <circle cx={760} cy={250} r={4} fill="#ef4444" />

        {/* A MIDI keyboard plugged into the same port */}
        <line x1={572} y1={366} x2={566} y2={400} stroke={INK} strokeWidth={4} />
        <line x1={660} y1={366} x2={666} y2={400} stroke={INK} strokeWidth={4} />
        <rect x={556} y={348} width={120} height={22} rx={3} fill="#1f2937" stroke={INK} strokeWidth={2} />
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={560 + i * 8} y={356} width={7} height={12} fill="#f8fafc" stroke={INK} strokeWidth={0.6} />
        ))}
        {[0, 1, 3, 4, 5, 7, 8, 10, 11, 12].map(i => <rect key={`k${i}`} x={565 + i * 8} y={356} width={4} height={7} fill={INK} />)}
        <path d="M676,356 C690,350 692,340 691,322" stroke="#9ca3af" strokeWidth={2} fill="none" />
      </g>
    )
  },
}

export default adapter
