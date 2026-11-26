import { Person } from './kit/figures'
import { Hills, Paddy, Sun } from './kit/nature'
import { Caption } from './kit/overlay'
import { C, INK, SCENE_COLORS } from './kit/palette'
import type { SceneArtProps, LegacySceneDefinition } from './types'

const XS = [100, 290, 480, 670, 860]
const TOP = 56
const PW = 160
const PH = 96
const CURRENT = 3

/** Water buffalo pulling a plough, for the first panel. */
function buffalo(x: number, y: number) {
  return (
    <g>
      <ellipse cx={x} cy={y - 14} rx={22} ry={11} fill="#3f3f46" stroke={INK} strokeWidth={1.5} />
      <ellipse cx={x + 24} cy={y - 18} rx={8} ry={6} fill="#3f3f46" stroke={INK} strokeWidth={1.5} />
      <path d={`M${x + 20},${y - 24} q-6,-8 4,-8 M${x + 28},${y - 24} q6,-8 -4,-8`} stroke="#e5e7eb" strokeWidth={2} fill="none" />
      {[-14, -6, 8, 16].map(dx => <line key={dx} x1={x + dx} y1={y - 6} x2={x + dx} y2={y + 2} stroke={INK} strokeWidth={3} />)}
      <path d={`M${x - 22},${y - 14} L${x - 44},${y - 4} L${x - 48},${y + 4}`} stroke={C.wood} strokeWidth={3} fill="none" />
    </g>
  )
}

function panel(i: number) {
  const x = XS[i] - PW / 2
  const y = TOP
  const inner = { x: x + 10, y: y + 50, w: PW - 20, h: 34 }
  return (
    <g key={i}>
      {i === CURRENT && <rect x={x - 8} y={y - 8} width={PW + 16} height={PH + 16} rx={6} fill="none" stroke={SCENE_COLORS.vermilion} strokeWidth={2} strokeDasharray="4 3" />}
      <rect x={x} y={y} width={PW} height={PH} rx={3} fill={SCENE_COLORS.paperLight} stroke={i === CURRENT ? SCENE_COLORS.vermilion : INK} strokeWidth={i === CURRENT ? 3 : 1.5} />
      <rect x={x + 4} y={y + 4} width={PW - 8} height={44} rx={1} fill={['#c6d2ca', '#ccd7ce', '#d5d8b7', '#dbc082', '#cda967'][i]} />
      {i === 0 && (
        <g>
          <rect x={inner.x} y={inner.y} width={inner.w} height={inner.h} fill="#5b3a22" stroke={INK} strokeWidth={1.5} />
          {[0, 1, 2].map(k => <line key={k} x1={inner.x + 6} y1={inner.y + 9 + k * 9} x2={inner.x + inner.w - 6} y2={inner.y + 9 + k * 9} stroke="#3e2615" strokeWidth={2} />)}
          {buffalo(XS[i] + 18, inner.y + 18)}
        </g>
      )}
      {i === 1 && (
        <g>
          <Paddy x={inner.x + 10} y={inner.y} w={inner.w - 20} h={inner.h} rows={2} height={6} />
          <Person x={XS[i] + 36} y={inner.y + 22} s={0.42} robe="#6b4226" hat="nonLa" long={false} pose="work" />
        </g>
      )}
      {i === 2 && <Paddy x={inner.x + 10} y={inner.y} w={inner.w - 20} h={inner.h} rows={3} height={14} plant="#4d9a2a" />}
      {i === 3 && <Paddy x={inner.x + 10} y={inner.y} w={inner.w - 20} h={inner.h} rows={3} height={16} plant="#7fae3c" gold />}
      {i === 4 && (
        <g>
          <Paddy x={inner.x + 10} y={inner.y} w={inner.w - 20} h={inner.h} rows={2} height={8} water="#8a6a2a" plant="#ca8a04" />
          {[-30, 0, 30].map(dx => (
            <g key={dx}>
              <path d={`M${XS[i] + dx - 6},${inner.y + 30} L${XS[i] + dx},${inner.y + 2} L${XS[i] + dx + 6},${inner.y + 30} Z`} fill={C.gold} stroke={INK} strokeWidth={1.2} />
              <line x1={XS[i] + dx - 5} y1={inner.y + 18} x2={XS[i] + dx + 5} y2={inner.y + 18} stroke="#7c2d12" strokeWidth={2} />
            </g>
          ))}
        </g>
      )}
    </g>
  )
}

const state: LegacySceneDefinition = {
  slug: 'state',
  title: { en: 'State: a rice paddy through the seasons', vi: 'State: ruộng lúa qua các giai đoạn' },
  sky: 'dawn',
  tags: [
    { nodeId: 's1', caption: { en: 'plowing', vi: 'cày bừa' }, at: [XS[0], 182], to: [XS[0], 152] },
    { nodeId: 's2', caption: { en: 'transplanting', vi: 'cấy lúa' }, at: [XS[1], 182], to: [XS[1], 152] },
    { nodeId: 's3', caption: { en: 'growing', vi: 'đang lớn' }, at: [XS[2], 182], to: [XS[2], 152] },
    { nodeId: 's4', caption: { en: 'flowering (now)', vi: 'trổ bông (hiện tại)' }, at: [XS[3], 182], to: [XS[3], 152] },
    { nodeId: 's5', caption: { en: 'harvesting', vi: 'thu hoạch' }, at: [XS[4], 182], to: [XS[4], 152] },
    { nodeId: 'ctx', method: 'changeStage', caption: { en: 'no if-else about stages', vi: 'không có if-else theo giai đoạn' }, at: [250, 300], to: [400, 316] },
    { nodeId: 'state', caption: { en: 'the current stage object', vi: 'đối tượng giai đoạn hiện tại' }, at: [720, 262], to: [670, 206] },
    { nodeId: 'client', caption: { en: 'always calls the same 3 methods', vi: 'luôn gọi cùng 3 phương thức' }, at: [740, 330], to: [548, 318] },
  ],
  calls: [
    ...(['fertilize', 'water', 'fertilize', 'harvest'] as const).map((method, i) => ({
      nodeId: 'state',
      method,
      d: `M${XS[i] + 40},${TOP - 2} C${XS[i] + 70},10 ${XS[i + 1] - 70},10 ${XS[i + 1] - 44},${TOP - 4}`,
      at: [(XS[i] + XS[i + 1]) / 2, 22] as const,
    })),
    { nodeId: 'state', method: 'harvest', d: `M${XS[4]},208 C${XS[4]},420 ${XS[0]},420 ${XS[0]},212`, at: [480, 368] },
  ],
  untagged: [],
  Art: function StateArt({ lang }: SceneArtProps) {
    return (
      <g>
        <Sun x={170} y={300} r={36} />
        <Hills y={300} amp={30} color="#b8a992" seed={4} />
        <Hills y={330} amp={16} color="#9f927e" seed={9} step={80} />
        <rect x={0} y={340} width={960} height={100} fill="#c5b292" />
        {XS.map((_, i) => panel(i))}

        {/* The paddy (context) and the farmer (client) */}
        <Paddy x={410} y={290} w={140} h={56} gold height={14} />
        <Person x={548} y={350} s={1.05} robe="#6b4226" pants="#3a2a1d" hat="nonLa" long={false} pose="hold">
          <path d="M-8,-54 q12,-10 20,4" stroke="#d1d5db" strokeWidth={3} fill="none" />
        </Person>
        <Caption x={480} y={428} size={11} fill={INK}>{lang === 'vi' ? 'một vụ mới bắt đầu lại' : 'a new season starts again'}</Caption>
      </g>
    )
  },
}

export default state
