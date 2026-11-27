import { Person } from './print/figures'
import { GroundBand, Grass, Hills } from './print/nature'
import { INK, PIGMENT } from './print/pigments'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const FEET = 378
const CORPS = { x: 595, y: 138 }
const BATTALIONS = [{ x: 440, y: 205 }, { x: 750, y: 205 }]
const SQUADS = [{ x: 365, y: 255 }, { x: 515, y: 255 }, { x: 675, y: 255 }, { x: 825, y: 255 }]
const SOLDIERS = [315, 415, 465, 565, 625, 725, 775, 875]

/** A swallow-tail pennant centred on x, y. */
function pennant(x: number, y: number, w: number, h: number, color: string, trim: string) {
  const l = x - w / 2
  const t = y - h / 2
  return (
    <g>
      <path d={`M${l},${t} L${l + w},${t} L${l + w - 10},${y} L${l + w},${t + h} L${l},${t + h} Z`} fill={color} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <line x1={l + 6} y1={t + 7} x2={l + w - 16} y2={t + 7} stroke={trim} strokeWidth={2.4} />
      <line x1={l + 6} y1={t + h - 7} x2={l + w - 16} y2={t + h - 7} stroke={trim} strokeWidth={2.4} />
    </g>
  )
}

/** The general's horse, facing right. `x` is the body centre. */
function horse(x: number) {
  return (
    <g stroke={INK} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round">
      <path d={`M${x - 54},300 Q${x - 84},320 ${x - 76},366`} fill="none" stroke={INK} strokeWidth={9} />
      <path d={`M${x - 54},300 Q${x - 84},320 ${x - 76},366`} fill="none" stroke={PIGMENT.woodDark} strokeWidth={4} />
      {[-40, -24, 26, 42].map(dx => <rect key={dx} x={x + dx} y={326} width={12} height={52} fill={PIGMENT.amberDark} />)}
      <ellipse cx={x} cy={316} rx={60} ry={30} fill={PIGMENT.amber} />
      <path d={`M${x + 40},300 L${x + 66},248 L${x + 100},254 L${x + 104},276 Q${x + 80},282 ${x + 66},312 Z`} fill={PIGMENT.amber} />
      <path d={`M${x + 70},244 L${x + 74},236 L${x + 80},248 Z`} fill={PIGMENT.amberDark} strokeWidth={2} />
      <circle cx={x + 90} cy={262} r={3.2} fill={INK} />
      <path d={`M${x + 44},296 Q${x + 54},262 ${x + 64},250`} fill="none" stroke={PIGMENT.woodDark} strokeWidth={6} />
      <path d={`M${x - 26},290 L${x + 26},290 L${x + 30},322 L${x - 30},322 Z`} fill={PIGMENT.red} strokeWidth={2.6} />
      <line x1={x - 24} y1={298} x2={x + 24} y2={298} stroke={PIGMENT.yellow} strokeWidth={2} />
    </g>
  )
}

function rope(x1: number, y1: number, x2: number, y2: number) {
  return <line key={`${x1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={2.4} strokeDasharray="5 4" />
}

const composite: SceneDefinition = {
  slug: 'composite',
  title: { en: 'Composite: a simplified Tây Sơn chain of command', vi: 'Composite: hệ thống chỉ huy quân Tây Sơn giản lược' },
  setting: 'dawn',
  pins: [
    { nodeId: 'client', methods: ['giveOrder'], caption: { en: 'gives one order, to a soldier or to the whole corps', vi: 'ra một lệnh, cho một chiến sĩ hay cả quân đoàn' }, at: [96, 322], showName: false },
    { nodeId: 'comp', methods: ['attack', 'getStrength'], caption: { en: 'what every unit can do, large or small', vi: 'việc mà đơn vị nào cũng làm được, dù lớn hay nhỏ' }, at: [461, 44], side: 'left' },
    { nodeId: 'composite', methods: ['attack', 'getStrength'], caption: { en: 'corps, battalions and squads pass orders down and add strength up', vi: 'quân đoàn, tiểu đoàn, tiểu đội truyền lệnh xuống và cộng sức mạnh lên' }, at: [595, 138], showName: false },
    { nodeId: 'leaf', methods: ['attack', 'getStrength'], caption: { en: 'a single soldier does the real work', vi: 'một chiến sĩ làm phần việc thực sự' }, at: [565, 330], showName: false },
  ],
  calls: [
    { id: 'give', nodeId: 'client', method: 'giveOrder', d: 'M150,214 C240,110 400,100 536,128' },
    { id: 'atk-b1', nodeId: 'composite', method: 'attack', d: 'M540,158 C492,156 462,168 454,182' },
    { id: 'atk-b2', nodeId: 'composite', method: 'attack', d: 'M650,158 C700,156 730,168 738,182' },
    { id: 'atk-s1', nodeId: 'composite', method: 'attack', d: 'M418,224 C398,228 384,234 378,238' },
    { id: 'atk-s2', nodeId: 'composite', method: 'attack', d: 'M464,226 C490,230 506,234 512,238' },
    { id: 'atk-l', nodeId: 'leaf', method: 'attack', d: 'M356,272 C340,270 330,272 322,276' },
    { id: 'ret-l', nodeId: 'leaf', method: 'getStrength', d: 'M406,278 C396,272 388,270 380,270', kind: 'return' },
    { id: 'ret-s', nodeId: 'composite', method: 'getStrength', d: 'M392,236 C396,226 404,222 410,220', kind: 'return' },
    { id: 'ret-b', nodeId: 'composite', method: 'getStrength', d: 'M470,184 C490,176 510,170 530,166', kind: 'return' },
  ],
  steps: [
    {
      calls: ['give'],
      nodes: ['client', 'comp', 'composite'],
      at: [290, 160],
      caption: { en: 'The general calls giveOrder() once, on the whole corps.', vi: 'Vị tướng gọi giveOrder() một lần, cho cả quân đoàn.' },
    },
    {
      calls: ['atk-b1', 'atk-b2', 'atk-s1', 'atk-s2'],
      nodes: ['composite'],
      at: [596, 214],
      caption: { en: 'attack() spreads down: each unit passes the order to its members.', vi: 'attack() lan xuống: mỗi đơn vị chuyển lệnh cho các thành viên.' },
    },
    {
      calls: ['atk-l'],
      nodes: ['composite', 'leaf'],
      at: [250, 300],
      caption: { en: 'At the bottom, the soldiers charge: their attack() does the real work.', vi: 'Ở dưới cùng, các chiến sĩ xung phong: attack() của họ làm phần việc thực sự.' },
    },
    {
      calls: ['ret-l', 'ret-s', 'ret-b'],
      nodes: ['client', 'composite', 'leaf'],
      at: [520, 412],
      caption: { en: 'getStrength() adds up on the way back: soldiers, squads, battalions, corps.', vi: 'getStrength() cộng dồn trên đường về: chiến sĩ, tiểu đội, tiểu đoàn, quân đoàn.' },
    },
  ],
  focus: [0, 56, 960, 384],
  untagged: [],
  Art: function CompositeArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Hills y={330} amp={26} seed={4} step={150} />
          <GroundBand />
          <Grass x0={220} x1={300} seed={5} count={4} />
        </Backdrop>
        <Part node="comp">
          <Signboard x={595} w={300} tone="interface" span={[SOLDIERS[0], SOLDIERS[SOLDIERS.length - 1]]} ticks={[CORPS.x]}>
            <Caption x={611} y={53}>{lang === 'vi' ? 'Lệnh cho mọi đơn vị' : 'One order for any unit'}</Caption>
          </Signboard>
        </Part>
        <Part node="client">
          <Person x={96} y={312} s={1.15} robe={PIGMENT.red} pants={PIGMENT.woodDark} hat="helmet" armor pose="point" />
          {horse(96)}
        </Part>
        <Part node="composite">
          {BATTALIONS.map(b => rope(CORPS.x, CORPS.y + 25, b.x, b.y - 21))}
          {SQUADS.map((s, i) => rope(BATTALIONS[Math.floor(i / 2)].x, BATTALIONS[Math.floor(i / 2)].y + 21, s.x, s.y - 16))}
          {SOLDIERS.map((x, i) => rope(SQUADS[Math.floor(i / 2)].x, SQUADS[Math.floor(i / 2)].y + 16, x, 280))}
          {pennant(CORPS.x, CORPS.y, 110, 50, PIGMENT.red, PIGMENT.yellow)}
          {BATTALIONS.map(b => <g key={b.x}>{pennant(b.x, b.y, 78, 40, PIGMENT.yellow, PIGMENT.red)}</g>)}
          {SQUADS.map(s => <g key={s.x}>{pennant(s.x, s.y, 50, 32, PIGMENT.green, PIGMENT.yellow)}</g>)}
        </Part>
        <Part node="leaf">
          {SOLDIERS.map(x => (
            <Person key={x} x={x} y={FEET} s={0.98} robe={PIGMENT.blue} pants={PIGMENT.woodDark} hat="helmet" armor pose="hold">
              <line x1={22} y1={-10} x2={24} y2={-118} stroke={INK} strokeWidth={5.5} strokeLinecap="round" />
              <line x1={22} y1={-10} x2={24} y2={-118} stroke={PIGMENT.wood} strokeWidth={3} strokeLinecap="round" />
              <path d="M24,-118 l-5,-3 l5,-14 l5,14 Z" fill={PIGMENT.steel} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
            </Person>
          ))}
        </Part>
      </>
    )
  },
}

export default composite
