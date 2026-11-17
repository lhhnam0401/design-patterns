/**
 * Hand-crafted SVG scenes for each design pattern, themed around
 * Vietnamese traditional culture.
 */

interface SceneProps {
  width?: number
  height?: number
}

// ── Creational ────────────────────────────────────────────────

export function FactoryMethodScene({ width = 480, height = 220 }: SceneProps) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      {/* Sky */}
      <rect width={width} height={height} fill="#1a1a2e" />
      <rect width={width} height={height * 0.55} fill="url(#sky-fm)" />
      <defs>
        <linearGradient id="sky-fm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2027" />
          <stop offset="100%" stopColor="#c9a227" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Ground */}
      <rect x={0} y={height * 0.72} width={width} height={height * 0.28} fill="#2d1b00" />

      {/* North workshop - Bánh Chưng */}
      <rect x={30} y={height * 0.38} width={150} height={height * 0.35} rx={4} fill="#3b1c0a" stroke="#c9a227" strokeWidth={1.5} />
      <text x={105} y={height * 0.35} textAnchor="middle" fontSize={11} fill="#f59e0b" fontWeight="bold">Xưởng Miền Bắc</text>
      {/* Bánh Chưng squares */}
      {[0,1,2].map(i => (
        <rect key={i} x={48 + i * 38} y={height * 0.48} width={28} height={28} rx={2}
          fill="#4a7c59" stroke="#22c55e" strokeWidth={1} />
      ))}
      <text x={105} y={height * 0.69} textAnchor="middle" fontSize={9} fill="#86efac">🟫 Bánh Chưng</text>

      {/* South workshop - Bánh Tét */}
      <rect x={300} y={height * 0.38} width={150} height={height * 0.35} rx={4} fill="#1a1248" stroke="#a78bfa" strokeWidth={1.5} />
      <text x={375} y={height * 0.35} textAnchor="middle" fontSize={11} fill="#a78bfa" fontWeight="bold">Xưởng Miền Nam</text>
      {/* Bánh Tét cylinders */}
      {[0,1,2].map(i => (
        <ellipse key={i} cx={318 + i * 38} cy={height * 0.55} rx={10} ry={16} fill="#78350f" stroke="#f59e0b" strokeWidth={1} />
      ))}
      <text x={375} y={height * 0.69} textAnchor="middle" fontSize={9} fill="#fcd34d">🟤 Bánh Tét</text>

      {/* Center factory interface */}
      <rect x={180} y={height * 0.25} width={120} height={44} rx={6} fill="#1e293b" stroke="#64748b" strokeWidth={1.5} />
      <text x={240} y={height * 0.37} textAnchor="middle" fontSize={10} fill="#94a3b8" fontStyle="italic">«abstract»</text>
      <text x={240} y={height * 0.49} textAnchor="middle" fontSize={10} fill="#e2e8f0" fontWeight="bold">BanhFactory</text>
      <text x={240} y={height * 0.6} textAnchor="middle" fontSize={8} fill="#64748b">+ makeBanh(): Banh</text>

      {/* Arrows from factory to workshops */}
      <line x1={190} y1={height * 0.52} x2={180} y2={height * 0.55} stroke="#64748b" strokeWidth={1} strokeDasharray="4,2" />
      <line x1={290} y1={height * 0.52} x2={300} y2={height * 0.55} stroke="#64748b" strokeWidth={1} strokeDasharray="4,2" />

      {/* Lanterns */}
      {[60, 160, 320, 420].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy={height * 0.15} rx={10} ry={14} fill={i % 2 === 0 ? '#dc2626' : '#d97706'} opacity={0.85} />
          <line x1={x} y1={height * 0.01} x2={x} y2={height * 0.1} stroke="#92400e" strokeWidth={1} />
        </g>
      ))}

      {/* Stars */}
      {[[20,20],[100,15],[200,8],[350,12],[460,18]].map(([sx,sy], i) => (
        <circle key={i} cx={sx} cy={sy} r={1.5} fill="#fef3c7" opacity={0.6} />
      ))}
    </svg>
  )
}

export function AbstractFactoryScene({ width = 480, height = 220 }: SceneProps) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      <rect width={width} height={height} fill="#0f172a" />
      {/* Table */}
      <rect x={60} y={height * 0.55} width={360} height={12} rx={3} fill="#451a03" stroke="#92400e" strokeWidth={1} />
      <rect x={80} y={height * 0.67} width={8} height={40} fill="#451a03" />
      <rect x={392} y={height * 0.67} width={8} height={40} fill="#451a03" />

      {/* North Tết set */}
      <text x={130} y={height * 0.25} textAnchor="middle" fontSize={11} fill="#f59e0b" fontWeight="bold">Miền Bắc</text>
      {/* Bánh Chưng */}
      <rect x={90} y={height * 0.32} width={36} height={36} rx={3} fill="#166534" stroke="#22c55e" strokeWidth={1.5} />
      <text x={108} y={height * 0.56} textAnchor="middle" fontSize={7.5} fill="#86efac">Bánh Chưng</text>
      {/* Giò Lụa */}
      <ellipse cx={152} cy={height * 0.47} rx={14} ry={9} fill="#7f1d1d" stroke="#f87171" strokeWidth={1} />
      <text x={152} y={height * 0.61} textAnchor="middle" fontSize={7.5} fill="#fca5a5">Giò Lụa</text>
      {/* Dưa Hành */}
      <ellipse cx={198} cy={height * 0.47} rx={12} ry={7} fill="#1e3a1e" stroke="#4ade80" strokeWidth={1} />
      <text x={198} y={height * 0.61} textAnchor="middle" fontSize={7.5} fill="#86efac">Dưa Hành</text>

      {/* South Tết set */}
      <text x={350} y={height * 0.25} textAnchor="middle" fontSize={11} fill="#a78bfa" fontWeight="bold">Miền Nam</text>
      {/* Bánh Tét */}
      <ellipse cx={300} cy={height * 0.47} rx={10} ry={18} fill="#92400e" stroke="#f59e0b" strokeWidth={1.5} />
      <text x={300} y={height * 0.61} textAnchor="middle" fontSize={7.5} fill="#fcd34d">Bánh Tét</text>
      {/* Chả Lụa */}
      <ellipse cx={348} cy={height * 0.47} rx={14} ry={8} fill="#9a3412" stroke="#fb923c" strokeWidth={1} />
      <text x={348} y={height * 0.61} textAnchor="middle" fontSize={7.5} fill="#fdba74">Chả Lụa</text>
      {/* Dưa Kiệu */}
      <ellipse cx={395} cy={height * 0.47} rx={12} ry={7} fill="#1e1a08" stroke="#facc15" strokeWidth={1} />
      <text x={395} y={height * 0.61} textAnchor="middle" fontSize={7.5} fill="#fde68a">Dưa Kiệu</text>

      {/* Divider */}
      <line x1={240} y1={height * 0.22} x2={240} y2={height * 0.68} stroke="#334155" strokeWidth={1} strokeDasharray="4,2" />
      <text x={240} y={height * 0.18} textAnchor="middle" fontSize={9} fill="#475569">«MamCoFactory»</text>

      {/* Lanterns top */}
      {[80, 240, 400].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy={height * 0.1} rx={9} ry={12} fill={['#dc2626','#d97706','#dc2626'][i]} opacity={0.9} />
          <line x1={x} y1={0} x2={x} y2={height * 0.07} stroke="#92400e" strokeWidth={1} />
          <text x={x} y={height * 0.12} textAnchor="middle" fontSize={8} fill="#fef3c7">喜</text>
        </g>
      ))}
    </svg>
  )
}

export function BuilderScene({ width = 480, height = 220 }: SceneProps) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      <rect width={width} height={height} fill="#0f172a" />
      {/* Ground */}
      <rect x={0} y={height * 0.8} width={width} height={height * 0.2} fill="#1c1408" />

      {/* Đình steps 1-4 building up */}
      {/* Step 1: Foundation */}
      <rect x={80} y={height * 0.75} width={70} height={10} rx={1} fill="#475569" stroke="#64748b" strokeWidth={1} />
      <text x={115} y={height * 0.92} textAnchor="middle" fontSize={8} fill="#94a3b8">① Nền móng</text>

      {/* Step 2: Columns */}
      <rect x={180} y={height * 0.5} width={70} height={30} rx={1} fill="#78350f" stroke="#92400e" strokeWidth={1} />
      <line x1={195} y1={height * 0.5} x2={195} y2={height * 0.8} stroke="#92400e" strokeWidth={4} />
      <line x1={235} y1={height * 0.5} x2={235} y2={height * 0.8} stroke="#92400e" strokeWidth={4} />
      <text x={215} y={height * 0.92} textAnchor="middle" fontSize={8} fill="#94a3b8">② Cột gỗ</text>

      {/* Step 3: Roof */}
      <polygon points={`${280},${height*0.25} ${350},${height*0.44} ${280},${height*0.44}`}
        fill="#991b1b" stroke="#b91c1c" strokeWidth={1.5} />
      <polygon points={`${350},${height*0.25} ${280},${height*0.44} ${350},${height*0.44}`}
        fill="#7f1d1d" stroke="#b91c1c" strokeWidth={1} />
      <rect x={280} y={height * 0.44} width={70} height={30} fill="#78350f" stroke="#92400e" strokeWidth={1} />
      <text x={315} y={height * 0.92} textAnchor="middle" fontSize={8} fill="#94a3b8">③ Mái cong</text>

      {/* Step 4: Full đình with dragon carvings */}
      <polygon points={`${370},${height*0.15} ${450},${height*0.37} ${370},${height*0.37}`}
        fill="#b91c1c" stroke="#ef4444" strokeWidth={1.5} />
      <polygon points={`${450},${height*0.15} ${370},${height*0.37} ${450},${height*0.37}`}
        fill="#991b1b" stroke="#ef4444" strokeWidth={1} />
      <rect x={370} y={height * 0.37} width={80} height={40} fill="#78350f" stroke="#ef4444" strokeWidth={1.5} />
      {/* Dragon motif */}
      <text x={410} y={height * 0.55} textAnchor="middle" fontSize={14}>🐉</text>
      <text x={410} y={height * 0.92} textAnchor="middle" fontSize={8} fill="#fca5a5">④ Hoàn chỉnh</text>

      {/* Director arrow */}
      <text x={30} y={height * 0.45} textAnchor="middle" fontSize={9} fill="#f59e0b">Thợ Cả</text>
      <line x1={50} y1={height * 0.42} x2={75} y2={height * 0.78} stroke="#f59e0b" strokeWidth={1} strokeDasharray="3,2" markerEnd="url(#arr-b)" />
      <line x1={50} y1={height * 0.42} x2={178} y2={height * 0.6} stroke="#f59e0b" strokeWidth={1} strokeDasharray="3,2" />
      <line x1={50} y1={height * 0.42} x2={279} y2={height * 0.4} stroke="#f59e0b" strokeWidth={1} strokeDasharray="3,2" />
      <line x1={50} y1={height * 0.42} x2={369} y2={height * 0.3} stroke="#f59e0b" strokeWidth={1} strokeDasharray="3,2" />
      <defs>
        <marker id="arr-b" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="#f59e0b" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  )
}

export function PrototypeScene({ width = 480, height = 220 }: SceneProps) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      <rect width={width} height={height} fill="#0f172a" />

      {/* Woodblock */}
      <rect x={30} y={height * 0.2} width={100} height={height * 0.55} rx={6}
        fill="#451a03" stroke="#92400e" strokeWidth={2} />
      <text x={80} y={height * 0.4} textAnchor="middle" fontSize={22}>🐓</text>
      <text x={80} y={height * 0.58} textAnchor="middle" fontSize={9} fill="#fcd34d">Bản gỗ gốc</text>
      <text x={80} y={height * 0.68} textAnchor="middle" fontSize={8} fill="#92400e">(Prototype)</text>

      {/* Press arrow */}
      <text x={165} y={height * 0.48} textAnchor="middle" fontSize={9} fill="#64748b">clone()</text>
      {[0.22, 0.48, 0.74].map((_t, i) => (
        <line key={i} x1={140} y1={height * 0.48} x2={195} y2={height * (0.22 + i * 0.26)}
          stroke="#475569" strokeWidth={1.2} strokeDasharray="4,2"
          markerEnd="url(#arr-p)" />
      ))}
      <defs>
        <marker id="arr-p" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="#475569" strokeWidth="1" />
        </marker>
      </defs>

      {/* Three prints with different colors */}
      {[
        { y: 0.08, color: '#dc2626', colorText: '#fca5a5', label: 'Đỏ son' },
        { y: 0.38, color: '#1d4ed8', colorText: '#93c5fd', label: 'Xanh lam' },
        { y: 0.68, color: '#d97706', colorText: '#fcd34d', label: 'Vàng nghệ' },
      ].map(({ y, color, colorText, label }, i) => (
        <g key={i}>
          <rect x={200} y={height * y} width={80} height={height * 0.24} rx={4}
            fill={color} fillOpacity={0.15} stroke={color} strokeWidth={1.5} />
          <text x={240} y={height * (y + 0.12)} textAnchor="middle" fontSize={16}>🐓</text>
          <text x={240} y={height * (y + 0.21)} textAnchor="middle" fontSize={8} fill={colorText}>{label}</text>
        </g>
      ))}

      {/* Labels */}
      <text x={300} y={height * 0.5} textAnchor="start" fontSize={9} fill="#64748b">Tranh Đông Hồ</text>
      <text x={300} y={height * 0.6} textAnchor="start" fontSize={8} fill="#475569">(mỗi bản in có thể</text>
      <text x={300} y={height * 0.68} textAnchor="start" fontSize={8} fill="#475569">tô màu khác nhau)</text>

      {/* Rice paper texture dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i}
          cx={320 + (i % 4) * 30}
          cy={height * 0.77 + Math.floor(i / 4) * 14}
          r={1} fill="#334155" />
      ))}
    </svg>
  )
}

export function SingletonScene({ width = 480, height = 220 }: SceneProps) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      <rect width={width} height={height} fill="#0f172a" />
      {/* Palace backdrop */}
      <polygon points={`${160},${height*0.08} ${320},${height*0.08} ${340},${height*0.25} ${140},${height*0.25}`}
        fill="#7f1d1d" />
      <rect x={140} y={height * 0.25} width={200} height={height * 0.35} fill="#991b1b" />
      <rect x={160} y={height * 0.35} width={160} height={height * 0.25} fill="#7f1d1d" />

      {/* Crown / throne */}
      <text x={240} y={height * 0.42} textAnchor="middle" fontSize={28}>👑</text>
      <text x={240} y={height * 0.58} textAnchor="middle" fontSize={10} fill="#fcd34d" fontWeight="bold">Hùng Vương</text>
      <text x={240} y={height * 0.67} textAnchor="middle" fontSize={8} fill="#f59e0b">(duy nhất)</text>

      {/* Three petitioners */}
      {[
        { x: 60, label: 'Quân 🪖', color: '#3b82f6' },
        { x: 240, label: 'Dân 🌾', color: '#22c55e' },
        { x: 420, label: 'Quan 📜', color: '#a855f7' },
      ].map(({ x, label, color }) => (
        <g key={x}>
          <circle cx={x} cy={height * 0.82} r={16} fill={color} fillOpacity={0.2} stroke={color} strokeWidth={1.5} />
          <text x={x} y={height * 0.84} textAnchor="middle" fontSize={9} fill={color}>{label}</text>
          {/* Arrow to palace */}
          <line x1={x + (x < 240 ? 16 : x > 240 ? -16 : 0)} y1={height * 0.82}
            x2={x < 240 ? 195 : x > 240 ? 285 : 240}
            y2={height * 0.62}
            stroke={color} strokeWidth={1} strokeDasharray="4,2" opacity={0.6} />
        </g>
      ))}

      {/* getInstance() lock */}
      <rect x={195} y={height * 0.7} width={90} height={18} rx={9} fill="#1e293b" stroke="#475569" strokeWidth={1} />
      <text x={240} y={height * 0.795} textAnchor="middle" fontSize={8} fill="#94a3b8">🔒 getInstance()</text>

      {/* Stars */}
      {[[30,20],[80,10],[160,5],[320,8],[400,14],[460,6]].map(([sx,sy],i)=>(
        <circle key={i} cx={sx} cy={sy} r={1.5} fill="#fef3c7" opacity={0.5} />
      ))}
    </svg>
  )
}

// ── Structural ────────────────────────────────────────────────

export function AdapterScene({ width = 480, height = 220 }: SceneProps) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      <rect width={width} height={height} fill="#0f172a" />

      {/* Đàn Tranh */}
      <rect x={20} y={height * 0.25} width={110} height={height * 0.5} rx={6} fill="#451a03" stroke="#92400e" strokeWidth={1.5} />
      <text x={75} y={height * 0.38} textAnchor="middle" fontSize={11} fill="#fcd34d" fontWeight="bold">Đàn Tranh</text>
      {/* Strings */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={30} y1={height * (0.44 + i * 0.05)} x2={120} y2={height * (0.44 + i * 0.05)}
          stroke="#f59e0b" strokeWidth={i === 2 ? 1.5 : 1} opacity={0.8} />
      ))}
      <text x={75} y={height * 0.82} textAnchor="middle" fontSize={8} fill="#92400e">Adaptee</text>

      {/* Adapter box */}
      <rect x={170} y={height * 0.28} width={140} height={height * 0.44} rx={6}
        fill="#1e293b" stroke="#a78bfa" strokeWidth={2} />
      <text x={240} y={height * 0.42} textAnchor="middle" fontSize={9} fill="#c4b5fd" fontStyle="italic">Adapter</text>
      <text x={240} y={height * 0.52} textAnchor="middle" fontSize={10} fill="#e2e8f0" fontWeight="bold">DanTranhMidi</text>
      <text x={240} y={height * 0.63} textAnchor="middle" fontSize={8} fill="#64748b">gayDay() →</text>
      <text x={240} y={height * 0.71} textAnchor="middle" fontSize={8} fill="#64748b">sendMidi()</text>

      {/* DAW / Software */}
      <rect x={360} y={height * 0.25} width={100} height={height * 0.5} rx={6} fill="#0f1f40" stroke="#3b82f6" strokeWidth={1.5} />
      <text x={410} y={height * 0.43} textAnchor="middle" fontSize={10} fill="#93c5fd" fontWeight="bold">DAW</text>
      <text x={410} y={height * 0.55} textAnchor="middle" fontSize={8} fill="#3b82f6">Software</text>
      <text x={410} y={height * 0.64} textAnchor="middle" fontSize={8} fill="#64748b">sendMidi()</text>
      <text x={410} y={height * 0.82} textAnchor="middle" fontSize={8} fill="#3b82f6">Client</text>

      {/* Arrows */}
      <line x1={130} y1={height * 0.5} x2={168} y2={height * 0.5} stroke="#f59e0b" strokeWidth={1.5}
        markerEnd="url(#arr-a)" />
      <line x1={312} y1={height * 0.5} x2={358} y2={height * 0.5} stroke="#3b82f6" strokeWidth={1.5}
        markerEnd="url(#arr-a2)" />
      <text x={148} y={height * 0.45} textAnchor="middle" fontSize={7.5} fill="#92400e">pluck</text>
      <text x={335} y={height * 0.45} textAnchor="middle" fontSize={7.5} fill="#3b82f6">MIDI</text>

      <defs>
        <marker id="arr-a" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="#f59e0b" strokeWidth="1" />
        </marker>
        <marker id="arr-a2" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="#3b82f6" strokeWidth="1" />
        </marker>
      </defs>

      {/* Musical notes */}
      {['♪','♫','♩'].map((n, i) => (
        <text key={i} x={150 + i * 20} y={height * 0.18} fontSize={14} fill="#f59e0b" opacity={0.6 + i * 0.1}>{n}</text>
      ))}
    </svg>
  )
}

export function DecoratorScene({ width = 480, height = 220 }: SceneProps) {
  const layers = [
    { label: 'Phở cơ bản 🍜', fill: '#451a03', stroke: '#92400e', w: 380, x: 50 },
    { label: '+ Thịt bò 🥩', fill: '#7f1d1d', stroke: '#ef4444', w: 300, x: 90 },
    { label: '+ Trứng 🥚', fill: '#1e3a1e', stroke: '#22c55e', w: 220, x: 130 },
    { label: '+ Ớt 🌶️', fill: '#422006', stroke: '#f97316', w: 140, x: 170 },
    { label: '+ Hành lá 🌿', fill: '#1a2e1a', stroke: '#4ade80', w: 60, x: 210 },
  ]
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      <rect width={width} height={height} fill="#0f172a" />
      {layers.map(({ label, fill, stroke, w, x }, i) => (
        <g key={i}>
          <rect x={x} y={height * (0.12 + i * 0.14)} width={w} height={height * 0.12}
            rx={6} fill={fill} stroke={stroke} strokeWidth={1.5} />
          <text x={x + w / 2} y={height * (0.12 + i * 0.14) + height * 0.075}
            textAnchor="middle" fontSize={10} fill="#e2e8f0">{label}</text>
        </g>
      ))}
      <text x={240} y={height * 0.9} textAnchor="middle" fontSize={9} fill="#94a3b8">
        75,000đ — Decorator Stack
      </text>
      {/* Brace on left */}
      <path d={`M48,${height*0.12} L40,${height*0.12} L40,${height*0.82} L48,${height*0.82}`}
        fill="none" stroke="#475569" strokeWidth={1.5} />
      <text x={28} y={height * 0.47} textAnchor="middle" fontSize={8} fill="#64748b"
        transform={`rotate(-90, 28, ${height*0.47})`}>wraps</text>
    </svg>
  )
}

export function ObserverScene({ width = 480, height = 220 }: SceneProps) {
  const subscribers = [
    { x: 60, y: 0.72, icon: '🌾', label: 'Nông Dân', color: '#22c55e' },
    { x: 180, y: 0.72, icon: '⚔️', label: 'Chiến Sĩ', color: '#3b82f6' },
    { x: 300, y: 0.72, icon: '🏪', label: 'Thương Nhân', color: '#f59e0b' },
    { x: 420, y: 0.72, icon: '📜', label: 'Văn Nhân', color: '#a855f7' },
  ]
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      <rect width={width} height={height} fill="#0f172a" />

      {/* Bronze drum */}
      <ellipse cx={240} cy={height * 0.28} rx={50} ry={22} fill="#7c2d12" stroke="#f59e0b" strokeWidth={2} />
      <ellipse cx={240} cy={height * 0.28} rx={34} ry={14} fill="#451a03" stroke="#f59e0b" strokeWidth={1} />
      <ellipse cx={240} cy={height * 0.28} rx={18} ry={7} fill="#92400e" />
      <text x={240} y={height * 0.32} textAnchor="middle" fontSize={8} fill="#fcd34d">🥁 Trống Đồng</text>

      {/* Ripple waves */}
      {[1, 1.6, 2.2].map((r, i) => (
        <ellipse key={i} cx={240} cy={height * 0.28} rx={50 * r} ry={22 * r}
          fill="none" stroke="#f59e0b" strokeWidth={0.8} opacity={0.3 - i * 0.08} />
      ))}

      {/* Notification lines */}
      {subscribers.map(({ x, y, color }) => (
        <line key={x} x1={240} y1={height * 0.5} x2={x} y2={height * y}
          stroke={color} strokeWidth={1.2} strokeDasharray="5,3" opacity={0.7}
          markerEnd="url(#arr-obs)" />
      ))}
      <defs>
        <marker id="arr-obs" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="#64748b" strokeWidth="1" />
        </marker>
      </defs>

      {/* Subscribers */}
      {subscribers.map(({ x, y, icon, label, color }) => (
        <g key={x}>
          <circle cx={x} cy={height * y} r={22} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={1.5} />
          <text x={x} y={height * (y - 0.02)} textAnchor="middle" fontSize={15}>{icon}</text>
          <text x={x} y={height * (y + 0.07)} textAnchor="middle" fontSize={7} fill={color}>{label}</text>
        </g>
      ))}

      <text x={240} y={height * 0.12} textAnchor="middle" fontSize={9} fill="#64748b">Publisher notifies all subscribers</text>
    </svg>
  )
}

export function StrategyScene({ width = 480, height = 220 }: SceneProps) {
  const styles = [
    { x: 50, label: 'Võ Bình Định', sub: 'Đòn mạnh 💪', color: '#ef4444' },
    { x: 190, label: 'Võ Tây Sơn', sub: 'Liên hoàn ⚡', color: '#3b82f6' },
    { x: 330, label: 'Thiếu Lâm', sub: 'Phòng thủ 🛡️', color: '#22c55e' },
  ]
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      <rect width={width} height={height} fill="#0f172a" />

      {/* Context - Warrior */}
      <rect x={170} y={height * 0.07} width={140} height={55} rx={6} fill="#1e293b" stroke="#f59e0b" strokeWidth={2} />
      <text x={240} y={height * 0.2} textAnchor="middle" fontSize={10} fill="#fcd34d" fontWeight="bold">⚔️ Võ Sĩ (Context)</text>
      <text x={240} y={height * 0.3} textAnchor="middle" fontSize={8} fill="#94a3b8">chienDau(doiThu)</text>

      {/* Arrows to strategies */}
      {styles.map(({ x, color }) => (
        <line key={x} x1={240} y1={height * 0.38} x2={x + 60} y2={height * 0.52}
          stroke={color} strokeWidth={1.2} strokeDasharray="5,3"
          markerEnd="url(#arr-s)" />
      ))}
      <defs>
        <marker id="arr-s" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="#64748b" strokeWidth="1" />
        </marker>
      </defs>

      {/* Strategy boxes */}
      {styles.map(({ x, label, sub, color }) => (
        <g key={x}>
          <rect x={x} y={height * 0.52} width={120} height={55} rx={6}
            fill={color} fillOpacity={0.12} stroke={color} strokeWidth={1.5} />
          <text x={x + 60} y={height * 0.62} textAnchor="middle" fontSize={9} fill={color} fontWeight="bold">{label}</text>
          <text x={x + 60} y={height * 0.71} textAnchor="middle" fontSize={8} fill="#94a3b8">{sub}</text>
          <text x={x + 60} y={height * 0.79} textAnchor="middle" fontSize={7.5} fill="#475569">tanCong()</text>
        </g>
      ))}

      <text x={240} y={height * 0.94} textAnchor="middle" fontSize={9} fill="#64748b">
        Runtime strategy switch — đổi võ phái lúc chạy
      </text>
    </svg>
  )
}

export function StateScene({ width = 480, height = 220 }: SceneProps) {
  const states = [
    { x: 40, label: 'Cày Bừa', icon: '🚜', color: '#78350f' },
    { x: 140, label: 'Cấy Lúa', icon: '🌱', color: '#166534' },
    { x: 240, label: 'Đang Lớn', icon: '🌿', color: '#15803d' },
    { x: 340, label: 'Trổ Bông', icon: '🌾', color: '#ca8a04' },
    { x: 420, label: 'Thu Hoạch', icon: '🎉', color: '#d97706' },
  ]
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      <rect width={width} height={height} fill="#0f172a" />
      {/* Ground */}
      <rect x={0} y={height * 0.82} width={width} height={height * 0.18} fill="#1c1408" />

      {/* State bubbles */}
      {states.map(({ x, label, icon, color }, i) => (
        <g key={x}>
          <circle cx={x + 30} cy={height * 0.45} r={32} fill={color} fillOpacity={0.2} stroke={color} strokeWidth={1.5} />
          <text x={x + 30} y={height * 0.42} textAnchor="middle" fontSize={18}>{icon}</text>
          <text x={x + 30} y={height * 0.55} textAnchor="middle" fontSize={7.5} fill={color}>{label}</text>
          {i < states.length - 1 && (
            <line x1={x + 62} y1={height * 0.45} x2={x + 100} y2={height * 0.45}
              stroke="#475569" strokeWidth={1.2} markerEnd="url(#arr-st)" />
          )}
        </g>
      ))}
      <defs>
        <marker id="arr-st" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="#475569" strokeWidth="1" />
        </marker>
      </defs>

      {/* Season sun/moon */}
      <circle cx={440} cy={30} r={18} fill="#ca8a04" opacity={0.7} />
      <text x={240} y={height * 0.88} textAnchor="middle" fontSize={9} fill="#94a3b8">
        Ruộng Lúa — vòng đời sinh trưởng
      </text>
      <text x={240} y={height * 0.96} textAnchor="middle" fontSize={8} fill="#475569">
        Mỗi giai đoạn: hành vi tuoi_nuoc() + bon_phan() + gat_lua() khác nhau
      </text>
    </svg>
  )
}

export function CommandScene({ width = 480, height = 220 }: SceneProps) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      <rect width={width} height={height} fill="#0f172a" />

      {/* Emperor */}
      <rect x={170} y={height * 0.05} width={140} height={50} rx={6} fill="#7f1d1d" stroke="#ef4444" strokeWidth={1.5} />
      <text x={240} y={height * 0.18} textAnchor="middle" fontSize={18}>👑</text>
      <text x={240} y={height * 0.28} textAnchor="middle" fontSize={9} fill="#fca5a5">Hoàng Đế (Invoker)</text>

      {/* Scroll / decree queue */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={140 + i * 8} y={height * 0.42 + i * 4} width={120} height={36} rx={4}
            fill="#451a03" stroke="#92400e" strokeWidth={1} />
          <text x={202 + i * 8} y={height * 0.54 + i * 4} textAnchor="middle" fontSize={8} fill="#fcd34d">
            {['📜 Xây Thành','📜 Giảm Thuế','📜 Điều Quân'][i]}
          </text>
        </g>
      ))}
      <text x={200} y={height * 0.38} textAnchor="middle" fontSize={8} fill="#64748b">Command Queue</text>

      {/* Undo arrow */}
      <path d={`M290,${height*0.55} C340,${height*0.55} 340,${height*0.35} 290,${height*0.35}`}
        fill="none" stroke="#3b82f6" strokeWidth={1.5} markerEnd="url(#arr-c)" />
      <text x={350} y={height * 0.48} textAnchor="start" fontSize={8} fill="#3b82f6">↩ undo()</text>

      <defs>
        <marker id="arr-c" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="#3b82f6" strokeWidth="1" />
        </marker>
      </defs>

      {/* City receiver */}
      <rect x={150} y={height * 0.72} width={180} height={40} rx={6} fill="#1e293b" stroke="#22c55e" strokeWidth={1.5} />
      <text x={240} y={height * 0.85} textAnchor="middle" fontSize={9} fill="#86efac">🏰 Thành Phố (Receiver)</text>
      <text x={240} y={height * 0.93} textAnchor="middle" fontSize={7.5} fill="#475569">xayThanh() | phaThanh()</text>

      {/* Execute arrow */}
      <line x1={200} y1={height * 0.6} x2={200} y2={height * 0.71} stroke="#22c55e" strokeWidth={1.2}
        strokeDasharray="3,2" markerEnd="url(#arr-c2)" />
      <defs>
        <marker id="arr-c2" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="#22c55e" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  )
}

export function FacadeScene({ width = 480, height = 220 }: SceneProps) {
  const systems: { x: number; label: string; color: string }[] = [
    { x: 20, label: '🎵 Âm Nhạc', color: '#a855f7' },
    { x: 110, label: '🍽️ Nấu Ăn', color: '#f59e0b' },
    { x: 200, label: '🌸 Trang Trí', color: '#ec4899' },
    { x: 290, label: '👘 Áo Dài', color: '#3b82f6' },
    { x: 380, label: '📜 Lễ Nghi', color: '#22c55e' },
  ]
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      <rect width={width} height={height} fill="#0f172a" />

      {/* Couple / Client */}
      <text x={50} y={height * 0.45} fontSize={24} textAnchor="middle">👰🤵</text>
      <text x={50} y={height * 0.58} textAnchor="middle" fontSize={8} fill="#94a3b8">Cô Dâu &</text>
      <text x={50} y={height * 0.65} textAnchor="middle" fontSize={8} fill="#94a3b8">Chú Rể</text>

      {/* Facade box */}
      <rect x={100} y={height * 0.28} width={120} height={60} rx={6} fill="#7f1d1d" stroke="#ef4444" strokeWidth={2} />
      <text x={160} y={height * 0.44} textAnchor="middle" fontSize={10} fill="#fca5a5" fontWeight="bold">👨‍💼 Chủ Hôn</text>
      <text x={160} y={height * 0.54} textAnchor="middle" fontSize={8} fill="#f87171">Facade</text>

      {/* Client → Facade */}
      <line x1={72} y1={height * 0.45} x2={98} y2={height * 0.45} stroke="#ef4444" strokeWidth={1.5}
        markerEnd="url(#arr-f)" />
      <text x={86} y={height * 0.38} textAnchor="middle" fontSize={7} fill="#f87171">batDau()</text>

      {/* Facade → subsystems */}
      {systems.map(({ x, label, color }) => (
        <g key={x}>
          <rect x={x + 228} y={height * 0.55} width={80} height={36} rx={4}
            fill={color} fillOpacity={0.15} stroke={color} strokeWidth={1.2} />
          <text x={x + 268} y={height * 0.72} textAnchor="middle" fontSize={8} fill={color}>{label}</text>
          <line x1={220} y1={height * 0.5} x2={x + 268} y2={height * 0.54}
            stroke={color} strokeWidth={1} strokeDasharray="3,2" markerEnd="url(#arr-f2)" opacity={0.7} />
        </g>
      ))}

      <defs>
        <marker id="arr-f" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="#ef4444" strokeWidth="1" />
        </marker>
        <marker id="arr-f2" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke="#64748b" strokeWidth="1" />
        </marker>
      </defs>
    </svg>
  )
}

// Generic placeholder for other patterns
export function GenericScene({ title, emoji, color = '#3b82f6', width = 480, height = 220 }: {
  title: string; emoji: string; color?: string; width?: number; height?: number
}) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block' }}>
      <rect width={width} height={height} fill="#0f172a" />
      <circle cx={width / 2} cy={height * 0.45} r={60} fill={color} fillOpacity={0.12} stroke={color} strokeWidth={2} />
      <text x={width / 2} y={height * 0.42} textAnchor="middle" fontSize={36}>{emoji}</text>
      <text x={width / 2} y={height * 0.64} textAnchor="middle" fontSize={12} fill="#e2e8f0" fontWeight="bold">{title}</text>

      {/* Decorative nodes */}
      {[0,1,2,3,4,5].map(i => {
        const angle = (i / 6) * Math.PI * 2
        const r = 90
        const cx = width / 2 + Math.cos(angle) * r
        const cy = height * 0.45 + Math.sin(angle) * r * 0.7
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={8} fill={color} fillOpacity={0.3} stroke={color} strokeWidth={1} />
            <line x1={width / 2 + Math.cos(angle) * 62} y1={height * 0.45 + Math.sin(angle) * 44}
              x2={cx - Math.cos(angle) * 8} y2={cy - Math.sin(angle) * 8}
              stroke={color} strokeWidth={1} strokeDasharray="3,2" opacity={0.5} />
          </g>
        )
      })}
    </svg>
  )
}

// ── Registry: slug → scene component ─────────────────────────
export function getCulturalScene(slug: string) {
  const map: Record<string, React.ComponentType<SceneProps>> = {
    'factory-method':          FactoryMethodScene,
    'abstract-factory':        AbstractFactoryScene,
    'builder':                 BuilderScene,
    'prototype':               PrototypeScene,
    'singleton':               SingletonScene,
    'adapter':                 AdapterScene,
    'bridge':                  (p) => <GenericScene {...p} title="Áo Dài Bridge" emoji="👘" color="#3b82f6" />,
    'composite':               (p) => <GenericScene {...p} title="Quân Đội Composite" emoji="⚔️" color="#ef4444" />,
    'decorator':               DecoratorScene,
    'facade':                  FacadeScene,
    'flyweight':               (p) => <GenericScene {...p} title="Đèn Lồng Flyweight" emoji="🏮" color="#f59e0b" />,
    'proxy':                   (p) => <GenericScene {...p} title="Quan Lại Proxy" emoji="👑" color="#a855f7" />,
    'chain-of-responsibility': (p) => <GenericScene {...p} title="Chuỗi Thỉnh Cầu" emoji="📜" color="#22c55e" />,
    'command':                 CommandScene,
    'iterator':                (p) => <GenericScene {...p} title="Tour Di Tích Iterator" emoji="🗺️" color="#06b6d4" />,
    'mediator':                (p) => <GenericScene {...p} title="Hội Đồng Làng" emoji="🏘️" color="#8b5cf6" />,
    'memento':                 (p) => <GenericScene {...p} title="Đại Việt Sử Ký" emoji="📚" color="#ec4899" />,
    'observer':                ObserverScene,
    'state':                   StateScene,
    'strategy':                StrategyScene,
    'template-method':         (p) => <GenericScene {...p} title="Khuôn Nấu Canh" emoji="🍲" color="#f97316" />,
    'visitor':                 (p) => <GenericScene {...p} title="Quan Thu Thuế Visitor" emoji="🏛️" color="#14b8a6" />,
  }
  return map[slug] ?? ((p: SceneProps) => <GenericScene {...p} title={slug} emoji="📐" />)
}
