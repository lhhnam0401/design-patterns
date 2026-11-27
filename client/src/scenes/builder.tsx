import { Roof } from './print/architecture'
import { Person } from './print/figures'
import { Bamboo, GroundBand, Hills, Sun } from './print/nature'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './print/pigments'
import { Backdrop, Caption, Part, Signboard } from './print/structure'
import type { SceneArtProps, SceneDefinition } from './types'

const TERRACE = 250
const FEET = 372
const X = { client: 58, director: 184, crew: 360, frame: 470, hall: 782, scribe: 430, easel: 726 } as const

const tr = (lang: SceneArtProps['lang'], en: string, vi: string) => (lang === 'vi' ? vi : en)

/** A stone plinth for a building. `y` is the floor line, `w` the width. */
function stoneBase(cx: number, y: number, w = 128) {
  return (
    <g>
      <rect x={cx - w / 2} y={y - 14} width={w} height={14} fill={PIGMENT.stone} stroke={INK} strokeWidth={2.6} />
      <rect x={cx - w / 2 - 8} y={y - 4} width={w + 16} height={6} fill={PIGMENT.stoneDark} stroke={INK} strokeWidth={2} />
    </g>
  )
}

/** Four lacquer columns on the plinth with a cross-beam. */
function columns(cx: number, y: number, h = 72) {
  return (
    <g>
      {[-44, -16, 16, 44].map(dx => (
        <rect key={dx} x={cx + dx - 4} y={y - 14 - h} width={8} height={h} fill={PIGMENT.red} stroke={INK} strokeWidth={2.2} />
      ))}
      <rect x={cx - 52} y={y - 20 - h} width={104} height={8} fill={PIGMENT.woodDark} stroke={INK} strokeWidth={2.4} />
    </g>
  )
}

/** Bamboo scaffolding lashed around the rising frame. */
function scaffold(cx: number, y: number, top: number) {
  return (
    <g stroke={PIGMENT.strawDark} strokeWidth={3} strokeLinecap="round" fill="none">
      <line x1={cx - 62} y1={y} x2={cx - 60} y2={top} />
      <line x1={cx + 62} y1={y} x2={cx + 60} y2={top} />
      <line x1={cx - 64} y1={y - 44} x2={cx + 64} y2={y - 44} />
      <line x1={cx - 62} y1={top + 16} x2={cx + 62} y2={top + 16} />
      <line x1={cx - 62} y1={y - 44} x2={cx - 24} y2={top + 16} strokeOpacity={0.7} />
      <line x1={cx + 62} y1={y - 44} x2={cx + 24} y2={top + 16} strokeOpacity={0.7} />
    </g>
  )
}

/** A finished communal house (đình) with a tiled, double-eaved roof and an altar inside. */
function finishedHall(cx: number, y: number) {
  return (
    <g>
      {stoneBase(cx, y, 168)}
      <rect x={cx - 74} y={y - 14 - 78} width={148} height={78} fill={PIGMENT.redDark} stroke={INK} strokeWidth={3} />
      {[-58, -30, 30, 58].map(dx => (
        <rect key={dx} x={cx + dx - 5} y={y - 14 - 78} width={10} height={78} fill={PIGMENT.red} stroke={INK} strokeWidth={2} />
      ))}
      <rect x={cx - 20} y={y - 62} width={40} height={48} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2.4} />
      <rect x={cx - 13} y={y - 54} width={26} height={30} fill={PIGMENT.red} stroke={INK} strokeWidth={1.8} />
      {[-11, 0, 11].map(dx => <line key={dx} x1={cx + dx} y1={y - 54} x2={cx + dx} y2={y - 66} stroke={PIGMENT.yellow} strokeWidth={1.6} />)}
      <rect x={cx - 80} y={y - 14 - 86} width={160} height={10} fill={PIGMENT.woodDark} stroke={INK} strokeWidth={2.4} />
      <Roof cx={cx} y={y - 14 - 94} w={190} h={54} />
      <Roof cx={cx} y={y - 14 - 150} w={132} h={44} />
    </g>
  )
}

/** A tripod easel holding a blueprint: a blue sheet with the house drawn in white lines. */
function easel(x: number, y: number) {
  return (
    <g>
      <g stroke={PIGMENT.woodDark} strokeWidth={4} strokeLinecap="round" fill="none">
        <line x1={x - 28} y1={y} x2={x - 8} y2={y - 64} />
        <line x1={x + 28} y1={y} x2={x + 8} y2={y - 64} />
        <line x1={x} y1={y - 20} x2={x} y2={y} />
      </g>
      <rect x={x - 48} y={y - 118} width={96} height={66} fill={PIGMENT.blue} stroke={INK} strokeWidth={2.8} />
      <g stroke={PAPER_LIGHT} strokeWidth={2} fill="none" strokeLinecap="round">
        <path d={`M${x - 30},${y - 60} L${x - 30},${y - 90} L${x},${y - 106} L${x + 30},${y - 90} L${x + 30},${y - 60}`} />
        <line x1={x - 20} y1={y - 60} x2={x - 20} y2={y - 85} />
        <line x1={x + 20} y1={y - 60} x2={x + 20} y2={y - 85} />
        <line x1={x - 36} y1={y - 90} x2={x + 36} y2={y - 90} strokeDasharray="4 3" />
      </g>
    </g>
  )
}

const builder: SceneDefinition = {
  slug: 'builder',
  title: { en: 'Builder: raising a communal house step by step', vi: 'Builder: dựng đình làng từng bước' },
  setting: 'dawn',
  pins: [
    { nodeId: 'client', caption: { en: 'a village elder orders the đình', vi: 'cụ bô lão đặt dựng đình' }, at: [X.client, 322], showName: false },
    { nodeId: 'director', methods: ['buildSimpleHouse', 'buildGrandHouse'], caption: { en: 'the master carpenter knows the step order', vi: 'thợ cả nắm thứ tự các bước' }, at: [X.director, 320], showName: false },
    { nodeId: 'builder', methods: ['buildFoundation', 'buildColumns', 'buildRoof', 'addCarving', 'setupAltar'], caption: { en: 'the steps every builder has', vi: 'các bước mọi builder đều có' }, at: [378, 44], showName: false },
    { nodeId: 'cb1', methods: ['getProduct'], caption: { en: 'the crew raising a real đình', vi: 'đội thợ dựng ngôi đình thật' }, at: [X.frame, 196], showName: false },
    { nodeId: 'p1', methods: ['describe'], caption: { en: 'the finished đình', vi: 'ngôi đình hoàn chỉnh' }, at: [X.hall, 196], showName: false },
    { nodeId: 'cb2', methods: ['getProduct'], caption: { en: 'the draftsman records the same steps', vi: 'người vẽ ghi lại cùng các bước' }, at: [X.scribe, 326], showName: false },
    { nodeId: 'p2', methods: ['show'], caption: { en: 'a paper drawing', vi: 'bản vẽ trên giấy' }, at: [X.easel, 292], showName: false },
  ],
  calls: [
    { id: 'order', nodeId: 'director', method: 'buildGrandHouse', d: 'M92,306 L150,306' },
    { id: 'found', nodeId: 'builder', method: 'buildFoundation', d: 'M214,300 C286,282 360,262 424,250' },
    { id: 'cols', nodeId: 'builder', method: 'buildColumns', d: 'M214,290 C296,250 372,214 432,198' },
    { id: 'roof', nodeId: 'builder', method: 'buildRoof', d: 'M214,282 C300,220 384,172 448,158' },
    { id: 'carve', nodeId: 'builder', method: 'addCarving', d: 'M220,298 C330,250 412,206 468,186' },
    { id: 'altar', nodeId: 'builder', method: 'setupAltar', d: 'M218,306 C332,280 414,252 460,232' },
    { id: 'get-house', nodeId: 'cb1', method: 'getProduct', d: 'M536,208 L724,206' },
    { id: 'found2', nodeId: 'builder', method: 'buildFoundation', d: 'M214,330 C282,344 332,352 380,356' },
    { id: 'cols2', nodeId: 'builder', method: 'buildColumns', d: 'M214,338 C282,352 332,360 380,363' },
    { id: 'altar2', nodeId: 'builder', method: 'setupAltar', d: 'M214,346 C282,360 332,368 380,370' },
    { id: 'get-draw', nodeId: 'cb2', method: 'getProduct', d: 'M478,352 C566,330 632,312 700,302' },
  ],
  steps: [
    {
      calls: ['order', 'found', 'cols', 'roof'],
      nodes: ['client', 'director', 'builder', 'cb1'],
      at: [262, 152],
      caption: { en: 'The elder asks for a grand đình. The director runs buildFoundation(), buildColumns() and buildRoof() in order.', vi: 'Cụ bô lão xin dựng một ngôi đình bề thế. Thợ cả gọi buildFoundation(), buildColumns() rồi buildRoof() theo thứ tự.' },
    },
    {
      calls: ['carve', 'altar'],
      nodes: ['director', 'builder', 'cb1'],
      at: [352, 128],
      caption: { en: 'Then addCarving() adds the dragons and phoenixes, and setupAltar() sets up the altar to the guardian spirit.', vi: 'Rồi addCarving() chạm rồng phượng và setupAltar() lập bàn thờ thành hoàng để hoàn thiện khung đình.' },
    },
    {
      calls: ['get-house'],
      nodes: ['cb1', 'p1'],
      at: [620, 200],
      caption: { en: 'getProduct() hands back the finished đình. The method belongs to the crew, not the director.', vi: 'getProduct() trả về ngôi đình hoàn chỉnh. Phương thức này thuộc về đội thợ, không phải thợ cả.' },
    },
    {
      calls: ['found2', 'cols2', 'altar2', 'get-draw'],
      nodes: ['director', 'builder', 'cb2', 'p2'],
      at: [300, 372],
      caption: { en: 'Sent to the draftsman, the same steps build nothing solid: getProduct() now returns a paper drawing.', vi: 'Giao cho người vẽ, cùng các bước ấy không dựng gì bằng gỗ đá: getProduct() giờ trả về một bản vẽ trên giấy.' },
    },
  ],
  focus: [180, 110, 700, 294],
  untagged: [],
  Art: function BuilderArt({ lang }: SceneArtProps) {
    const frameTop = TERRACE - 14 - 72 - 20
    return (
      <>
        <Backdrop>
          <Sun x={820} y={120} r={30} />
          <Hills y={260} amp={30} seed={12} step={150} color={TINT.amber} />
          <GroundBand />
          {/* The raised terrace the real house is built on */}
          <rect x={312} y={TERRACE} width={600} height={14} fill={TINT.ground} />
          <line x1={312} y1={TERRACE + 1} x2={912} y2={TERRACE + 1} stroke={TINT.groundEdge} strokeWidth={3} />
          <Bamboo x={906} y={TERRACE} h={150} seed={6} count={3} pale />
        </Backdrop>

        {/* The rail: the builder interface over the two builders */}
        <Part node="builder">
          <Signboard x={470} w={260} tone="interface" span={[X.frame - 70, X.scribe + 60]} ticks={[X.frame, X.scribe]}>
            <Caption x={500} y={53}>{tr(lang, 'Each step in order', 'Các bước theo thứ tự')}</Caption>
          </Signboard>
        </Part>

        {/* The elder (client) hands the job to the master carpenter (director) */}
        <Part node="client">
          <Person x={X.client} y={FEET} s={1.2} robe={PIGMENT.stone} pants={PIGMENT.stoneDark} hat="khanXep" pose="stand">
            <line x1={-20} y1={-44} x2={-22} y2={-2} stroke={PIGMENT.wood} strokeWidth={3} strokeLinecap="round" />
          </Person>
        </Part>
        <Part node="director">
          <Person x={X.director} y={FEET} s={1.28} robe={PIGMENT.amber} pants={PIGMENT.woodDark} hat="khanXep" hatColor={PIGMENT.woodDark} pose="point" />
        </Part>

        {/* The crew raising the real đình (ConcreteBuilder 1) */}
        <Part node="cb1">
          {scaffold(X.frame, TERRACE, frameTop)}
          {stoneBase(X.frame, TERRACE)}
          {columns(X.frame, TERRACE)}
          <Roof cx={X.frame} y={frameTop + 2} w={132} h={40} ornaments={false} />
          <Person x={X.crew} y={TERRACE} s={1.0} robe={PIGMENT.wood} pants={PIGMENT.woodDark} hat="nonLa" long={false} pose="work" />
        </Part>

        {/* The finished communal house (Product 1) */}
        <Part node="p1">{finishedHall(X.hall, TERRACE)}</Part>

        {/* The draftsman recording the same steps (ConcreteBuilder 2) */}
        <Part node="cb2">
          <Person x={X.scribe} y={FEET} s={1.2} robe={PIGMENT.blueDark} pants={PIGMENT.woodDark} hat="topknot" pose="reach">
            <g transform="rotate(-8 -44 -58)">
              <rect x={-60} y={-78} width={34} height={44} fill={PIGMENT.blue} stroke={INK} strokeWidth={2.4} />
              <g stroke={PAPER_LIGHT} strokeWidth={1.4} fill="none">
                <path d="M-54,-44 L-54,-62 L-43,-70 L-32,-62 L-32,-44" />
                <line x1={-48} y1={-44} x2={-48} y2={-58} />
              </g>
            </g>
            <line x1={30} y1={-58} x2={44} y2={-50} stroke={INK} strokeWidth={4} strokeLinecap="round" />
            <circle cx={46} cy={-49} r={4.5} fill={PIGMENT.redDark} stroke={INK} strokeWidth={1.4} />
          </Person>
        </Part>

        {/* The paper drawing (Product 2) */}
        <Part node="p2">{easel(X.easel, FEET)}</Part>
      </>
    )
  },
}

export default builder
