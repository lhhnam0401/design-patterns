import { Gate, Hall } from './kit/architecture'
import { Person } from './kit/figures'
import { band } from './kit/geometry'
import { Bamboo, Cloud, Hills, Path, Stars, Sun, Tree } from './kit/nature'
import { Caption } from './kit/overlay'
import { C, INK, SCENE_COLORS } from './kit/palette'
import { RolledScroll } from './kit/props'
import type { SceneArtProps, SceneDefinition } from './types'

const chain: SceneDefinition = {
  slug: 'chain-of-responsibility',
  title: { en: 'Chain of Responsibility: a petition climbs the ranks', vi: 'Chain of Responsibility: lá đơn đi lên từng cấp' },
  sky: 'dawn',
  tags: [
    { nodeId: 'client', method: 'filePetition', caption: { en: 'a villager files it', vi: 'người dân nộp đơn' }, at: [86, 208], to: [66, 330] },
    { nodeId: 'req', caption: { en: 'level + content', vi: 'mức độ + nội dung' }, at: [290, 418], to: [240, 392] },
    { nodeId: 'h1', caption: { en: 'settles level 1', vi: 'xử đơn mức 1' }, at: [210, 280], to: [168, 334] },
    { nodeId: 'h2', caption: { en: 'up to level 2', vi: 'xử tới mức 2' }, at: [368, 196], to: [368, 254] },
    { nodeId: 'h3', caption: { en: 'up to level 3', vi: 'xử tới mức 3' }, at: [586, 128], to: [592, 186] },
    { nodeId: 'h4', caption: { en: 'up to level 4', vi: 'xử tới mức 4' }, at: [690, 46], to: [800, 82] },
    { nodeId: 'handler', method: 'setSuperior', caption: { en: 'each knows the next one up', vi: 'mỗi quan biết cấp trên' }, at: [470, 412], to: [472, 322] },
    { nodeId: 'base', method: 'handle', caption: { en: 'passes it up by default', vi: 'mặc định chuyển lên trên' }, at: [724, 334], to: [716, 236] },
  ],
  calls: [
    { nodeId: 'client', method: 'filePetition', d: 'M86,352 C106,346 118,350 128,358' },
    { nodeId: 'base', method: 'handle', d: 'M206,352 C250,320 290,300 320,296', at: [262, 318] },
    { nodeId: 'base', method: 'handle', d: 'M426,292 C470,264 510,246 540,236' },
    { nodeId: 'base', method: 'handle', d: 'M652,226 C700,196 740,176 766,168' },
    { nodeId: 'base', method: 'handle', d: 'M900,150 C918,138 930,128 942,116' },
  ],
  untagged: [],
  Art: function ChainArt({ lang, compact }: SceneArtProps) {
    return (
      <g>
        <Stars seed={3} count={18} maxY={80} />
        <Sun x={150} y={150} r={30} />
        <Cloud x={380} y={70} s={1} color="#fde68a" />
        <Hills y={200} amp={50} color="#4b2e55" seed={7} />
        {/* The hill the road climbs */}
        <path d={band([[0, 420], [200, 380], [400, 320], [600, 252], [820, 180], [960, 150]], 440)} fill="#baa78c" />
        <path d={band([[0, 440], [300, 430], [600, 400], [960, 360]], 440)} fill="#c9b89e" />
        <Path points={[[20, 448], [150, 404], [360, 334], [590, 266], [830, 196], [950, 150]]} width={20} />
        <Tree x={480} y={300} s={0.7} />
        <Bamboo x={900} y={210} h={120} count={3} seed={4} />

        {/* Village gate, district office, prefecture, citadel */}
        <Gate cx={150} y={398} w={120} h={60} />
        <Hall cx={368} y={322} w={110} h={42} roofH={34} doors={2} />
        <Hall cx={592} y={256} w={124} h={46} roofH={38} />
        <Hall cx={830} y={186} w={150} h={54} roofH={40} tiers={2} />

        {/* A signpost by the road */}
        <line x1={472} y1={330} x2={472} y2={292} stroke={INK} strokeWidth={4} />
        <path d="M452,296 L494,290 L500,298 L494,306 L452,310 Z" fill={C.paper} stroke={INK} strokeWidth={1.5} />

        {/* One petition settled at the district office */}
        <RolledScroll x={402} y={340} w={30} />
        <path d="M440,334 l6,6 l12,-14" stroke={C.jade} strokeWidth={4} fill="none" strokeLinecap="round" />
        <Caption x={432} y={362} size={10} fill={INK}>{lang === 'vi' ? 'xử lý tại đây' : 'settled here'}</Caption>

        {/* One petition beyond every rank leaves the end of the chain */}
        <RolledScroll x={910} y={98} w={26} />
        <g stroke={C.lacquer} strokeWidth={3} strokeLinecap="round">
          <line x1={940} y1={80} x2={952} y2={92} />
          <line x1={952} y1={80} x2={940} y2={92} />
        </g>
        {!compact && <rect x={900} y={50} width={58} height={15} rx={2} fill={SCENE_COLORS.paperLight} stroke={C.lacquerDark} strokeWidth={0.8} />}
        <Caption x={954} y={61} size={10} anchor="end" fill={C.lacquerDark}>{lang === 'vi' ? 'bị trả về' : 'unhandled'}</Caption>

        {/* The villager and the petition */}
        <Person x={66} y={432} s={1.05} robe="#6b4226" hat="nonLa" long={false} pose="reach" />
        <RolledScroll x={226} y={392} w={30} />
      </g>
    )
  },
}

export default chain
