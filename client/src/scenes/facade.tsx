import { Hall, Roof } from './kit/architecture'
import { Person } from './kit/figures'
import { BlossomTree, Ground, Hills, Stars } from './kit/nature'
import { C, INK } from './kit/palette'
import { LanternString, Pot, Scroll } from './kit/props'
import type { LegacySceneDefinition } from './types'

const facade: LegacySceneDefinition = {
  slug: 'facade',
  title: { en: 'Facade: the master of ceremonies runs a Quan Họ wedding', vi: 'Facade: chủ hôn điều phối đám cưới Quan Họ' },
  sky: 'dusk',
  tags: [
    { nodeId: 'client', caption: { en: 'the couple ask once', vi: 'đôi uyên ương chỉ nhờ một lần' }, at: [104, 282], to: [90, 328] },
    { nodeId: 'facade', method: 'startWedding', caption: { en: 'master of ceremonies', vi: 'chủ hôn' }, at: [330, 404], to: [332, 372] },
    { nodeId: 'sub1', method: 'hangFlowers', caption: { en: 'flowers and lanterns', vi: 'hoa và đèn lồng' }, at: [480, 30], to: [480, 86] },
    { nodeId: 'sub2', method: 'dressBride', caption: { en: 'dressing the bride', vi: 'thay áo cô dâu' }, at: [214, 186], to: [214, 236] },
    { nodeId: 'sub4', method: 'ancestralRite', caption: { en: 'ancestral rite and rings', vi: 'lễ gia tiên, trao nhẫn' }, at: [500, 404], to: [480, 240] },
    { nodeId: 'sub3', method: 'sing', caption: { en: 'Quan Họ singers', vi: 'liền anh liền chị' }, at: [642, 250], to: [646, 298] },
    { nodeId: 'extra', method: 'prepareFeast', caption: { en: "the kitchen's own facade", vi: 'facade riêng của nhà bếp' }, at: [834, 230], to: [826, 300] },
    { nodeId: 'sub5', caption: { en: 'kitchen work', vi: 'việc bếp núc' }, at: [898, 404], to: [904, 352] },
  ],
  calls: [
    { nodeId: 'facade', method: 'startWedding', d: 'M136,352 C190,372 240,372 300,352', at: [214, 352] },
    { nodeId: 'sub2', method: 'dressBride', d: 'M318,296 C300,280 280,282 262,286' },
    { nodeId: 'sub4', method: 'ancestralRite', d: 'M352,300 C390,270 420,260 440,262' },
    { nodeId: 'sub1', method: 'hangFlowers', d: 'M330,292 C320,200 340,150 380,126' },
    { nodeId: 'sub3', method: 'sing', d: 'M360,330 C450,330 530,326 600,322' },
    { nodeId: 'extra', method: 'prepareFeast', d: 'M362,344 C520,362 680,356 790,340', at: [560, 352] },
    { nodeId: 'extra', method: 'prepareFeast', d: 'M110,430 C380,442 640,440 800,420' },
    { nodeId: 'sub5', method: 'cook', d: 'M846,344 C866,350 878,352 888,350' },
  ],
  untagged: [],
  Art: function FacadeArt() {
    return (
      <g>
        <Stars seed={4} count={30} maxY={110} />
        <Hills y={240} amp={30} color="#3b1f4a" seed={14} />
        <BlossomTree x={20} y={250} s={0.9} color="#fda4af" seed={3} />
        <LanternString x0={170} x1={790} y={66} sag={22} count={7} colors={['#d62828', '#f59e0b']} />
        <Hall cx={480} y={262} w={220} h={70} roofH={52} />
        {/* red double-happiness banner over the door */}
        <rect x={462} y={186} width={36} height={22} fill="#dc2626" stroke={C.gold} strokeWidth={1.4} />
        <path d="M470,191 h20 M470,197 h20 M470,203 h20 M476,188 v18 M484,188 v18" stroke={C.gold} strokeWidth={1.4} />
        <Ground y={258} color="#c1ac91" edge="#846d59" />

        {/* Dressing screen with the bride's red áo dài */}
        {[176, 204, 232].map((x, i) => (
          <rect key={x} x={x} y={232} width={28} height={98} fill={i === 1 ? '#7f1d1d' : '#5a2a14'} stroke={INK} strokeWidth={2} />
        ))}
        <path d="M206,246 L222,246 L226,300 L202,300 Z" fill="#dc2626" stroke={INK} strokeWidth={1.4} />
        <circle cx={214} cy={242} r={5} fill={C.gold} stroke={INK} />

        {/* The couple */}
        <Person x={62} y={424} s={1.08} robe="#dc2626" pants="#fff7ed" hat="khanXep" hatColor="#dc2626" />
        <Person x={112} y={424} s={1.1} robe="#1d4ed8" pants="#fff7ed" hat="khanXep" pose="wave" />

        {/* The master of ceremonies on a low platform */}
        <rect x={290} y={372} width={84} height={10} fill={C.stone} stroke={INK} strokeWidth={1.5} />
        <Person x={332} y={372} s={1.12} robe="#7c2d12" pants="#1f1410" hat="khanXep" pose="point">
          <Scroll x={-30} y={-58} w={16} h={20} lines={2} seal={false} />
        </Person>

        {/* Quan Họ singers with fans */}
        <Person x={618} y={404} s={0.98} robe="#4d7c0f" hat="nonLa" hatColor="#f5d58a" pose="hold">
          <path d="M-8,-58 L-22,-74 Q-6,-82 4,-70 Z" fill="#fde68a" stroke={INK} strokeWidth={1} />
        </Person>
        <Person x={672} y={404} s={0.98} robe="#1e3a8a" hat="khanXep" pose="hold">
          <path d="M8,-58 L22,-74 Q6,-82 -4,-70 Z" fill="#fde68a" stroke={INK} strokeWidth={1} />
        </Person>

        {/* The kitchen corner: head cook and the cooking itself */}
        <rect x={760} y={258} width={200} height={120} fill="#3a2016" stroke={INK} strokeWidth={2} />
        <Roof cx={860} y={258} w={210} h={36} ornaments={false} />
        <Person x={826} y={404} s={1.04} robe="#e5e7eb" pants="#374151" hat="topknot" pose="reach" />
        <Pot x={904} y={410} w={70} />
        {[0, 1].map(i => (
          <ellipse key={i} cx={786 + i * 26} cy={388 - i * 6} rx={16} ry={5} fill="#d6a76b" stroke={INK} strokeWidth={1.2} />
        ))}
      </g>
    )
  },
}

export default facade
