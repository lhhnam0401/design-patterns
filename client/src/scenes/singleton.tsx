import { Gate, Hall } from './print/architecture'
import { Person } from './print/figures'
import { GroundBand, Hills, Moon, Stars } from './print/nature'
import { INK, PIGMENT, TINT } from './print/pigments'
import { Banner, BronzeDrum } from './print/props'
import { Backdrop, Caption, Part } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const FEET = 398
const TERRACE_Y = 262
const COURT_X = 480
const X = { army: 118, people: 300, court: COURT_X, officials: 828 } as const

const tr = (lang: SceneArtProps['lang'], en: string, vi: string) => (lang === 'vi' ? vi : en)

/** A stone court terrace of stepped tiers. `cx` is the centre, `y` the top surface. */
function terrace(cx: number, y: number, w: number) {
  return (
    <g>
      <rect x={cx - w / 2} y={y} width={w} height={16} fill={PIGMENT.stone} stroke={INK} strokeWidth={2.6} />
      <rect x={cx - w / 2 - 16} y={y + 16} width={w + 32} height={12} fill={PIGMENT.stoneDark} stroke={INK} strokeWidth={2.2} />
      <rect x={cx - w / 2 - 32} y={y + 28} width={w + 64} height={12} fill={PIGMENT.stone} stroke={INK} strokeWidth={2} />
    </g>
  )
}

const singleton: SceneDefinition = {
  slug: 'singleton',
  title: { en: 'Singleton: the one royal court of Văn Lang', vi: 'Singleton: triều đình duy nhất của Văn Lang' },
  setting: 'dusk',
  pins: [
    { nodeId: 'c1', caption: { en: 'the army asks for the court', vi: 'quân lính xin gặp triều đình' }, at: [X.army, 318], showName: false },
    { nodeId: 'c2', caption: { en: 'the people ask for the court', vi: 'người dân xin gặp triều đình' }, at: [X.people, 322], showName: false },
    { nodeId: 'c3', caption: { en: 'the officials ask for the court', vi: 'quan lại xin gặp triều đình' }, at: [X.officials, 318], showName: false },
    { nodeId: 'sing', methods: ['getInstance', 'issueDecree'], caption: { en: 'the one royal court, the only way in', vi: 'triều đình duy nhất, lối vào duy nhất' }, at: [COURT_X, 150], showName: false },
  ],
  calls: [
    { id: 'gi-army', nodeId: 'sing', method: 'getInstance', d: 'M158,352 C280,322 380,312 452,320' },
    { id: 'gi-people', nodeId: 'sing', method: 'getInstance', d: 'M340,352 C392,336 420,328 452,324' },
    { id: 'gi-officials', nodeId: 'sing', method: 'getInstance', d: 'M786,352 C676,320 574,312 510,320' },
    { id: 'dec-army', nodeId: 'sing', method: 'issueDecree', d: 'M452,338 C360,356 260,362 162,360', kind: 'return' },
    { id: 'dec-people', nodeId: 'sing', method: 'issueDecree', d: 'M452,342 C414,356 388,360 344,362', kind: 'return' },
    { id: 'dec-officials', nodeId: 'sing', method: 'issueDecree', d: 'M510,338 C600,356 700,362 788,360', kind: 'return' },
  ],
  steps: [
    {
      calls: ['gi-army', 'gi-people', 'gi-officials'],
      nodes: ['c1', 'c2', 'c3', 'sing'],
      at: [226, 238],
      caption: { en: 'Army, people and officials all call getInstance(), and all three reach the same court.', vi: 'Quân, dân và quan đều gọi getInstance(), và cả ba cùng tới một triều đình duy nhất.' },
    },
    {
      calls: ['dec-army'],
      nodes: ['sing', 'c1'],
      at: [206, 372],
      caption: { en: 'The court issues decree №1 to the army through issueDecree().', vi: 'Triều đình ban chiếu số 1 cho quân lính qua issueDecree().' },
    },
    {
      calls: ['dec-people'],
      nodes: ['sing', 'c2'],
      at: [300, 232],
      caption: { en: 'issueDecree() runs again, and the shared court numbers this decree №2, not №1.', vi: 'issueDecree() chạy lần nữa, và triều đình chung đánh số tờ chiếu này là 2, không phải 1.' },
    },
    {
      calls: ['dec-officials'],
      nodes: ['sing', 'c3'],
      at: [706, 372],
      caption: { en: 'The officials’ decree is №3: one court keeps one running count for every caller.', vi: 'Chiếu của quan lại là số 3: một triều đình giữ một dãy số chung cho mọi nơi gọi.' },
    },
  ],
  focus: [60, 96, 840, 344],
  untagged: [],
  Art: function SingletonArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Moon x={96} y={64} r={20} />
          <Stars seed={11} count={12} x0={140} x1={420} y0={14} y1={92} />
          <Hills y={286} amp={26} seed={4} step={140} color={TINT.blue} />
          <GroundBand />
          {/* A second court cannot exist: a pale outline, crossed out */}
          <g opacity={0.9}>
            <Hall cx={742} y={214} w={104} h={30} roofH={24} tiers={2} doors={2} glow={false} pale />
            <g stroke={PIGMENT.red} strokeWidth={4} strokeLinecap="round">
              <line x1={690} y1={150} x2={796} y2={214} />
              <line x1={796} y1={150} x2={690} y2={214} />
            </g>
          </g>
          <Caption x={742} y={236} size={18} fill={PIGMENT.redDark}>{tr(lang, 'no second court', 'không triều đình thứ hai')}</Caption>
        </Backdrop>

        {/* The one and only court, raised on its terrace in the centre */}
        <Part node="sing">
          {terrace(COURT_X, TERRACE_Y, 210)}
          <BronzeDrum cx={COURT_X - 150} y={TERRACE_Y + 40} w={66} h={46} />
          <BronzeDrum cx={COURT_X + 150} y={TERRACE_Y + 40} w={66} h={46} />
          <Banner x={COURT_X - 118} y={TERRACE_Y} h={118} color={PIGMENT.red} />
          <Banner x={COURT_X + 118} y={TERRACE_Y} h={118} color={PIGMENT.red} />
          <Hall cx={COURT_X} y={TERRACE_Y} w={196} h={58} roofH={44} tiers={2} doors={3} />
          <Gate cx={COURT_X} y={TERRACE_Y + 40} w={150} h={64} />
        </Part>

        {/* Quân: a soldier with a spear, from the left */}
        <Part node="c1">
          <Person x={X.army} y={FEET} s={1.2} robe={PIGMENT.redDark} pants={PIGMENT.woodDark} hat="helmet" armor>
            <line x1={18} y1={-18} x2={20} y2={-126} stroke={INK} strokeWidth={5} strokeLinecap="round" />
            <line x1={18} y1={-18} x2={20} y2={-126} stroke={PIGMENT.wood} strokeWidth={2.6} strokeLinecap="round" />
            <path d="M20,-126 l-5,-3 l5,-15 l5,15 Z" fill={PIGMENT.steel} stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
          </Person>
        </Part>

        {/* Dân: a farmer carrying a rice sheaf, from the left */}
        <Part node="c2">
          <Person x={X.people} y={FEET + 2} s={1.18} robe={PIGMENT.wood} pants={PIGMENT.woodDark} sash={PIGMENT.yellowDark} hat="nonLa" long={false} pose="hold">
            {[-8, -4, 0, 4, 8].map(dx => (
              <path key={dx} d={`M${dx * 0.3},-46 Q${dx},-62 ${dx * 1.8},-76`} stroke={PIGMENT.yellow} strokeWidth={2.2} fill="none" strokeLinecap="round" />
            ))}
            <rect x={-6} y={-58} width={12} height={4} fill={PIGMENT.yellowDark} stroke={INK} strokeWidth={0.8} />
          </Person>
        </Part>

        {/* Quan: an official with a decree scroll, from the right */}
        <Part node="c3">
          <Person x={X.officials} y={FEET} s={1.2} robe={PIGMENT.blue} pants={PIGMENT.blueDark} hat="official" pose="hold" flip>
            <rect x={-18} y={-74} width={36} height={16} rx={2} fill={TINT.red} stroke={INK} strokeWidth={1.8} />
            <line x1={-12} y1={-70} x2={12} y2={-70} stroke={PIGMENT.red} strokeWidth={1.6} />
            <line x1={-12} y1={-64} x2={12} y2={-64} stroke={PIGMENT.red} strokeWidth={1.6} />
          </Person>
        </Part>
      </>
    )
  },
}

export default singleton
