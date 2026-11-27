import { Hall } from './print/architecture'
import { Person } from './print/figures'
import { GroundBand, Grass, Hills, Paddy } from './print/nature'
import { INK, PIGMENT, TINT } from './print/pigments'
import { Jar } from './print/props'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const FEET = 378
const X = { farmer: 110, merchant: 250, potter: 390, hall: 724 } as const

/** A shoulder pole with two baskets of rice. `x` is the figure's hand height centre. */
function carryPole() {
  return (
    <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
      <line x1={-40} y1={-70} x2={40} y2={-70} stroke={INK} strokeWidth={6} strokeLinecap="round" />
      <line x1={-40} y1={-70} x2={40} y2={-70} stroke={PIGMENT.wood} strokeWidth={3} strokeLinecap="round" />
      {[-36, 36].map(bx => (
        <g key={bx}>
          <path d={`M${bx - 9},-70 L${bx - 12},-44 M${bx + 9},-70 L${bx + 12},-44`} stroke={INK} strokeWidth={1.4} />
          <path d={`M${bx - 14},-44 L${bx + 14},-44 L${bx + 10},-24 L${bx - 10},-24 Z`} fill={PIGMENT.straw} strokeWidth={2} />
          {[-6, 0, 6].map(gx => <circle key={gx} cx={bx + gx} cy={-40} r={2.4} fill={PIGMENT.yellow} stroke="none" />)}
        </g>
      ))}
    </g>
  )
}

const mediator: SceneDefinition = {
  slug: 'mediator',
  title: { en: 'Mediator: the village council coordinates everyone', vi: 'Mediator: hội đồng làng điều phối mọi người' },
  setting: 'dawn',
  pins: [
    { nodeId: 'comp', methods: ['notifyCouncil'], caption: { en: 'every villager only reports to the council', vi: 'dân làng chỉ việc báo lên hội đồng' }, at: [115, 44], showName: false },
    { nodeId: 'c1', methods: ['harvest'], caption: { en: 'this season the harvest is poor', vi: 'vụ này mất mùa' }, at: [X.farmer, 338], showName: false },
    { nodeId: 'c2', methods: ['buyRice'], caption: { en: 'buys the shortfall from the next village', vi: 'mua phần lúa thiếu ở làng bên' }, at: [X.merchant, 338], showName: false },
    { nodeId: 'c3', methods: ['makeJars'], caption: { en: 'makes jars to fit the rice', vi: 'nặn chum vừa đủ số lúa' }, at: [X.potter, 338], showName: false },
    { nodeId: 'med', caption: { en: 'the only channel between them', vi: 'đầu mối duy nhất giữa họ' }, at: [620, 44], showName: false },
    { nodeId: 'cmed', methods: ['notify'], caption: { en: 'decides who acts next', vi: 'quyết định ai làm tiếp theo' }, at: [X.hall, 300], showName: false },
  ],
  calls: [
    { id: 'harvest', nodeId: 'c1', method: 'harvest', d: 'M44,422 C70,398 92,384 106,370' },
    { id: 'notify-council', nodeId: 'comp', method: 'notifyCouncil', d: 'M130,300 C320,196 540,196 688,284' },
    { id: 'notify', nodeId: 'cmed', method: 'notify', d: 'M748,282 C796,262 804,306 762,316' },
    { id: 'buy-rice', nodeId: 'c2', method: 'buyRice', d: 'M692,300 C520,214 372,214 266,298' },
    { id: 'make-jars', nodeId: 'c3', method: 'makeJars', d: 'M704,314 C600,246 492,246 404,300' },
  ],
  steps: [
    {
      calls: ['harvest'],
      nodes: ['c1', 'comp'],
      at: [70, 262],
      caption: { en: 'A poor season: the farmer’s harvest() brings in only 60 of the 100 baskets the village needs.', vi: 'Vụ mất mùa: harvest() của nông dân chỉ được 60 trên 100 thúng mà cả làng cần.' },
    },
    {
      calls: ['notify-council', 'notify'],
      nodes: ['c1', 'comp', 'med', 'cmed'],
      at: [430, 176],
      caption: { en: 'He calls no one directly: notifyCouncil() sends notify() to the council, which alone knows who to turn to.', vi: 'Anh không gọi thẳng ai: notifyCouncil() gửi notify() lên hội đồng, nơi duy nhất biết cần nhờ ai.' },
    },
    {
      calls: ['buy-rice'],
      nodes: ['cmed', 'comp', 'c2'],
      at: [520, 250],
      caption: { en: 'Seeing the shortfall, the council asks the merchant to buyRice() for the 40 baskets still missing.', vi: 'Thấy còn thiếu, hội đồng nhờ thương nhân dùng buyRice() mua thêm 40 thúng.' },
    },
    {
      calls: ['make-jars'],
      nodes: ['cmed', 'comp', 'c3'],
      at: [540, 330],
      caption: { en: 'With the rice in, the council orders the potter to makeJars() to hold it. No villager ever called another.', vi: 'Lúa về, hội đồng đặt thợ gốm dùng makeJars() nặn chum để chứa. Không người dân nào gọi thẳng người khác.' },
    },
  ],
  focus: [60, 96, 800, 340],
  untagged: [],
  Art: function MediatorArt({ lang }: SceneArtProps) {
    return (
      <>
        <Backdrop>
          <Hills y={214} amp={22} seed={9} step={150} color={TINT.green} />
          <GroundBand />
          <Paddy x={18} y={392} w={150} h={44} rows={2} height={8} gold pale />
          <Grass x0={470} x1={560} seed={5} count={5} />
        </Backdrop>

        {/* The rail: the Mediator interface over the council, the Villager base class over the three villagers */}
        <Part node="med">
          <Signboard x={X.hall} w={240} tone="interface" span={[704, 744]} ticks={[X.hall]}>
            <Caption x={X.hall + 16} y={53}>{lang === 'vi' ? 'Đầu mối duy nhất' : 'The only channel'}</Caption>
          </Signboard>
        </Part>
        <Part node="comp">
          <Signboard x={262} w={344} tone="class" span={[X.farmer, X.potter]} ticks={[X.farmer, X.merchant, X.potter]}>
            <Caption x={278} y={53}>{lang === 'vi' ? 'Ai lo việc nấy' : 'Each to their own job'}</Caption>
          </Signboard>
        </Part>

        {/* The council hall: the one place everyone reports to */}
        <Part node="cmed">
          <Hall cx={X.hall} y={FEET} w={200} h={78} roofH={58} tiers={2} doors={3} />
          <path d={`M${X.hall - 14},300 L${X.hall + 14},300 L${X.hall + 10},318 L${X.hall - 10},318 Z`} fill={PIGMENT.yellow} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
          <circle cx={X.hall} cy={296} r={6} fill={PIGMENT.red} stroke={INK} strokeWidth={2} />
        </Part>

        {/* The farmer, with a thin harvest of rice sheaves */}
        <Part node="c1">
          <Person x={X.farmer} y={FEET} s={1.2} robe={PIGMENT.amber} pants={PIGMENT.woodDark} hat="nonLa" long={false} pose="hold">
            {[-8, -2, 4].map(dx => (
              <g key={dx}>
                <line x1={dx} y1={-48} x2={dx * 1.8} y2={-96} stroke={PIGMENT.yellowDark} strokeWidth={3} strokeLinecap="round" />
                <circle cx={dx * 1.8} cy={-98} r={3} fill={PIGMENT.yellow} stroke={INK} strokeWidth={1} />
              </g>
            ))}
          </Person>
        </Part>

        {/* The merchant, with a shoulder pole of bought rice */}
        <Part node="c2">
          <Person x={X.merchant} y={FEET} s={1.2} robe={PIGMENT.blue} pants={PIGMENT.woodDark} hat="nonLa" long={false} pose="hold">
            {carryPole()}
          </Person>
        </Part>

        {/* The potter, with the jars he throws */}
        <Part node="c3">
          <Person x={X.potter} y={FEET} s={1.2} robe={PIGMENT.stone} pants={PIGMENT.woodDark} hat="topknot" long={false} pose="work" />
          <Jar x={X.potter + 44} y={FEET} s={0.9} />
          <Jar x={X.potter + 76} y={FEET} s={0.72} color={PIGMENT.wood} />
          <Jar x={X.potter - 40} y={FEET} s={0.78} color={PIGMENT.amber} />
        </Part>
      </>
    )
  },
}

export default mediator
