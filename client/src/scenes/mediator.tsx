import { Hall } from './kit/architecture'
import { Person } from './kit/figures'
import { Ground, Hills, Paddy, Sun, Tree } from './kit/nature'
import { C, INK } from './kit/palette'
import { Jar, Lantern } from './kit/props'
import type { SceneDefinition } from './types'

const mediator: SceneDefinition = {
  slug: 'mediator',
  title: { en: 'Mediator: the village council coordinates everyone', vi: 'Mediator: hội đồng làng điều phối mọi người' },
  sky: 'dawn',
  tags: [
    { nodeId: 'cmed', method: 'notify', caption: { en: 'decides who acts next', vi: 'quyết định ai làm tiếp' }, at: [480, 44], to: [480, 226] },
    { nodeId: 'med', caption: { en: 'the only channel', vi: 'đầu mối duy nhất' }, at: [290, 96], to: [376, 196] },
    { nodeId: 'comp', method: 'notifyCouncil', caption: { en: 'every villager only reports', vi: 'dân làng chỉ việc báo lên' }, at: [112, 176], to: [126, 300] },
    { nodeId: 'c1', method: 'harvest', caption: { en: 'the rice farmer', vi: 'người nông dân' }, at: [100, 412], to: [126, 368] },
    { nodeId: 'c3', method: 'makeJars', caption: { en: 'Bát Tràng potter', vi: 'thợ gốm Bát Tràng' }, at: [274, 412], to: [356, 372] },
    { nodeId: 'c2', method: 'sellAtMarket', caption: { en: 'the rice merchant', vi: 'thương nhân buôn lúa' }, at: [850, 220], to: [842, 300] },
  ],
  calls: [
    { nodeId: 'comp', method: 'notifyCouncil', d: 'M166,330 C250,300 330,290 404,284', at: [268, 296] },
    { nodeId: 'c3', method: 'makeJars', d: 'M440,312 C420,330 404,342 390,352', at: [356, 322] },
    { nodeId: 'c2', method: 'buyRice', d: 'M556,282 C640,288 720,298 792,318', at: [680, 278] },
    { nodeId: 'c2', method: 'sellAtMarket', d: 'M556,304 C650,326 730,342 796,350', at: [712, 352] },
  ],
  untagged: [],
  Art: function MediatorArt() {
    return (
      <g>
        <Sun x={800} y={150} r={30} />
        <Hills y={220} amp={30} color="#4b2e55" seed={9} />
        <Tree x={60} y={250} s={1} />
        <Tree x={910} y={250} s={1.05} />
        <Hall cx={480} y={262} w={280} h={72} roofH={54} />
        <Lantern x={360} y={196} r={9} cord={8} />
        <Lantern x={600} y={196} r={9} cord={8} />
        <Ground y={258} color="#3d2a1b" edge="#4d3524" />
        <rect x={250} y={258} width={460} height={60} fill="#5b4330" opacity={0.6} />

        {/* The council: three elders on a red mat */}
        <path d="M400,300 L560,300 L580,316 L380,316 Z" fill="#b91c1c" stroke={INK} strokeWidth={1.5} />
        {[430, 480, 530].map((x, i) => (
          <Person key={x} x={x} y={306} s={0.86} robe={['#7c2d12', '#1e3a8a', '#4b5563'][i]} hat="khanXep" pose="hold" />
        ))}

        {/* Farmer with sheaves beside a golden paddy */}
        <Paddy x={20} y={372} w={210} h={60} gold height={14} />
        <Person x={126} y={398} s={1.05} robe="#6b4226" pants="#3a2a1d" hat="nonLa" long={false} pose="hold">
          {[-6, -2, 2, 6].map(dx => <path key={dx} d={`M${dx * 0.4},-46 Q${dx},-62 ${dx * 1.8},-76`} stroke={C.gold} strokeWidth={2} fill="none" />)}
        </Person>

        {/* Potter with jars */}
        <Person x={370} y={426} s={1.0} robe="#57534e" pants="#292524" hat="topknot" long={false} pose="work" />
        <Jar x={418} y={430} s={0.9} />
        <Jar x={450} y={432} s={0.75} color="#7c5a3a" />
        <Jar x={312} y={432} s={0.8} color="#8a6a4a" />

        {/* Merchant with a carrying pole and two baskets */}
        <Person x={842} y={412} s={1.05} robe="#1f4e79" pants="#1a1a1a" hat="nonLa" long={false} pose="hold" />
        <line x1={790} y1={344} x2={894} y2={344} stroke={C.wood} strokeWidth={4} />
        {[796, 888].map(x => (
          <g key={x}>
            <line x1={x} y1={344} x2={x - 8} y2={380} stroke={INK} />
            <line x1={x} y1={344} x2={x + 8} y2={380} stroke={INK} />
            <path d={`M${x - 16},380 L${x + 16},380 L${x + 12},404 L${x - 12},404 Z`} fill="#a16207" stroke={INK} strokeWidth={1.5} />
          </g>
        ))}
      </g>
    )
  },
}

export default mediator
