import { Hall } from './kit/architecture'
import { Person } from './kit/figures'
import { band } from './kit/geometry'
import { Bamboo, Ground, Hills, Moon, Paddy, Stars } from './kit/nature'
import { C, INK } from './kit/palette'
import { BronzeDrum, Scroll } from './kit/props'
import type { SceneDefinition } from './types'

const observer: SceneDefinition = {
  slug: 'observer',
  title: { en: 'Observer: the bronze drum signals the village', vi: 'Observer: tiếng trống đồng báo hiệu cả làng' },
  sky: 'night',
  tags: [
    { nodeId: 'pub', method: 'strike', caption: { en: 'one beat for everyone', vi: 'một hồi trống cho tất cả' }, at: [330, 54], to: [440, 136] },
    { nodeId: 'pub', method: 'subscribe', caption: { en: 'the list of listeners', vi: 'danh sách người nghe' }, at: [620, 54], to: [608, 186] },
    { nodeId: 'client', caption: { en: 'the elder signs them up', vi: 'cụ trưởng làng ghi tên' }, at: [780, 140], to: [696, 182] },
    { nodeId: 'obs', method: 'react', caption: { en: 'anyone who hears it', vi: 'ai nghe trống cũng phản ứng' }, at: [346, 330], to: [404, 262] },
    { nodeId: 'o1', caption: { en: 'runs back to the village', vi: 'chạy về làng' }, at: [100, 300], to: [146, 334] },
    { nodeId: 'o2', caption: { en: 'takes up arms', vi: 'cầm vũ khí' }, at: [660, 330], to: [572, 344] },
    { nodeId: 'o3', caption: { en: 'left to trade far away', vi: 'đi buôn xa, hủy đăng ký' }, at: [866, 300], to: [884, 334] },
  ],
  calls: [
    { nodeId: 'obs', method: 'react', d: 'M418,214 C330,250 240,290 176,330', at: [270, 266] },
    { nodeId: 'obs', method: 'react', d: 'M528,216 C570,250 586,290 576,326' },
    { nodeId: 'pub', method: 'unsubscribe', d: 'M870,326 C820,262 720,232 642,224', at: [760, 246] },
  ],
  untagged: [],
  Art: function ObserverArt() {
    return (
      <g>
        <Stars seed={17} count={60} maxY={180} />
        <Moon x={860} y={60} r={22} />
        <Hills y={240} amp={40} color="#141a3a" seed={11} />
        <path d={band([[240, 330], [340, 268], [480, 252], [640, 266], [740, 330]], 440)} fill="#2a1d14" />

        {/* Sound rings spreading from the drum */}
        {[1, 2, 3, 4].map(i => (
          <ellipse key={i} cx={470} cy={170} rx={70 + i * 70} ry={34 + i * 34} fill="none" stroke={C.gold} strokeOpacity={0.32 - i * 0.06} strokeWidth={3} />
        ))}
        <BronzeDrum cx={470} y={250} w={130} h={80} />
        <Person x={386} y={262} s={1.05} robe="#7f1d1d" hat="khanXep" pose="wave">
          <line x1={22} y1={-100} x2={40} y2={-116} stroke={C.wood} strokeWidth={5} strokeLinecap="round" />
          <circle cx={42} cy={-118} r={6} fill="#a16207" stroke={INK} />
        </Person>

        {/* The list of listeners and the elder who keeps it */}
        <Scroll x={584} y={190} w={48} h={50} lines={3} seal={false} />
        <Person x={690} y={262} s={0.92} robe="#4b5563" hat="khanXep" pose="reach" flip />

        <Ground y={350} color="#1f1710" edge="#2c2016" />
        <Paddy x={10} y={360} w={230} h={64} height={12} />
        <Bamboo x={240} y={360} h={140} seed={8} count={3} />
        <Hall cx={780} y={360} w={120} h={38} roofH={28} doors={2} glow={false} />

        {/* Farmer runs home, soldier takes up arms */}
        <Person x={146} y={428} s={1.05} robe="#6b4226" pants="#3a2a1d" hat="nonLa" long={false} pose="wave" />
        <Person x={572} y={430} s={1.1} robe="#7f1d1d" pants="#2a1a12" hat="helmet" armor pose="wave">
          <line x1={22} y1={-60} x2={26} y2={-150} stroke={INK} strokeWidth={4} />
          <path d="M26,-150 l-4,-2 l4,-14 l4,14 Z" fill="#cbd5e1" stroke={INK} strokeWidth={1.2} />
        </Person>

        {/* The trader unsubscribed and is walking away */}
        <Person x={884} y={424} s={1.0} robe="#1f4e79" hat="nonLa" long={false} pose="hold" dim>
          <line x1={-30} y1={-68} x2={30} y2={-68} stroke={C.wood} strokeWidth={4} />
          <path d="M-40,-48 L-20,-48 L-24,-30 L-36,-30 Z M20,-48 L40,-48 L36,-30 L24,-30 Z" fill="#a16207" stroke={INK} strokeWidth={1.4} />
        </Person>
      </g>
    )
  },
}

export default observer
