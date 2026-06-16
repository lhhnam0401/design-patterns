import type { Diagram } from '../types/pattern'

export const patternDiagrams: Record<string, Diagram> = {

  // ── CREATIONAL ──────────────────────────────────────────────

  'factory-method': {
    nodes: [
      { id: 'creator', label: 'BanhFactory', kind: 'abstract', x: 1, y: 0,
        methods: ['+ makeBanh(): Banh', '+ prepareForTet()'], role: 'Creator' },
      { id: 'product', label: 'Banh', kind: 'interface', x: 3, y: 0,
        methods: ['+ describe(): str'], role: 'Product' },
      { id: 'concA', label: 'MienBacFactory', kind: 'class', x: 0, y: 2,
        methods: ['+ makeBanh(): BanhChung'], role: 'ConcreteCreator' },
      { id: 'concB', label: 'MienNamFactory', kind: 'class', x: 2, y: 2,
        methods: ['+ makeBanh(): BanhTet'], role: 'ConcreteCreator' },
      { id: 'prodA', label: 'BanhChung', kind: 'class', x: 3, y: 2,
        role: 'ConcreteProduct' },
      { id: 'prodB', label: 'BanhTet', kind: 'class', x: 4, y: 2,
        role: 'ConcreteProduct' },
    ],
    edges: [
      { from: 'concA', to: 'creator', kind: 'inherits' },
      { from: 'concB', to: 'creator', kind: 'inherits' },
      { from: 'prodA', to: 'product', kind: 'implements' },
      { from: 'prodB', to: 'product', kind: 'implements' },
      { from: 'creator', to: 'product', kind: 'depends', label: 'creates' },
    ],
  },

  'abstract-factory': {
    nodes: [
      { id: 'factory', label: 'MamCoFactory', kind: 'interface', x: 1, y: 0,
        methods: ['+ makeBanh(): Banh', '+ makeGio(): Gio'], role: 'AbstractFactory' },
      { id: 'banhI', label: 'Banh', kind: 'interface', x: 3, y: 0,
        methods: ['+ describe()'], role: 'AbstractProduct A' },
      { id: 'gioI', label: 'Gio', kind: 'interface', x: 3, y: 1,
        methods: ['+ describe()'], role: 'AbstractProduct B' },
      { id: 'facN', label: 'MienBacFactory', kind: 'class', x: 0, y: 2,
        methods: ['+ makeBanh()', '+ makeGio()'], role: 'ConcreteFactory' },
      { id: 'facS', label: 'MienNamFactory', kind: 'class', x: 2, y: 2,
        methods: ['+ makeBanh()', '+ makeGio()'], role: 'ConcreteFactory' },
      { id: 'banhN', label: 'BanhChung', kind: 'class', x: 3, y: 2, role: 'Product A1' },
      { id: 'banhS', label: 'BanhTet', kind: 'class', x: 4, y: 2, role: 'Product A2' },
    ],
    edges: [
      { from: 'facN', to: 'factory', kind: 'implements' },
      { from: 'facS', to: 'factory', kind: 'implements' },
      { from: 'banhN', to: 'banhI', kind: 'implements' },
      { from: 'banhS', to: 'banhI', kind: 'implements' },
      { from: 'factory', to: 'banhI', kind: 'depends' },
      { from: 'factory', to: 'gioI', kind: 'depends' },
    ],
  },

  'builder': {
    nodes: [
      { id: 'director', label: 'DinhDirector', kind: 'class', x: 0, y: 0,
        methods: ['+ buildSimpleDinh()', '+ buildGrandDinh()'], role: 'Director' },
      { id: 'builder', label: 'DinhBuilder', kind: 'class', x: 2, y: 0,
        methods: ['+ buildFoundation()', '+ buildColumns()', '+ buildRoof()', '+ build(): DinhLang'],
        role: 'Builder' },
      { id: 'product', label: 'DinhLang', kind: 'class', x: 4, y: 0,
        methods: ['foundation: str', 'columns: int', 'roof_style: str', 'carvings: list'],
        role: 'Product' },
    ],
    edges: [
      { from: 'director', to: 'builder', kind: 'associates', label: 'uses' },
      { from: 'builder', to: 'product', kind: 'composes', label: 'builds' },
    ],
  },

  'prototype': {
    nodes: [
      { id: 'proto', label: 'TrainhDongHo', kind: 'abstract', x: 1, y: 0,
        methods: ['+ clone(): TrainhDongHo', '+ describe()'], role: 'Prototype' },
      { id: 'concA', label: 'GaGayTranh', kind: 'class', x: 0, y: 2,
        methods: ['+ clone()'], role: 'ConcretePrototype' },
      { id: 'concB', label: 'DamCuoiTranh', kind: 'class', x: 2, y: 2,
        methods: ['+ clone()'], role: 'ConcretePrototype' },
      { id: 'client', label: 'Client', kind: 'class', x: 3, y: 0,
        role: 'Client' },
    ],
    edges: [
      { from: 'concA', to: 'proto', kind: 'inherits' },
      { from: 'concB', to: 'proto', kind: 'inherits' },
      { from: 'client', to: 'proto', kind: 'depends', label: 'clone()' },
    ],
  },

  'singleton': {
    nodes: [
      { id: 'sing', label: 'TrieuDinh', kind: 'class', x: 1, y: 0,
        methods: ['- _instance: TrieuDinh', '- __new__(cls)', '+ set_vua()', '+ ban_lenh()'],
        role: 'Singleton' },
      { id: 'c1', label: 'Client A', kind: 'class', x: 0, y: 2, role: 'Client' },
      { id: 'c2', label: 'Client B', kind: 'class', x: 2, y: 2, role: 'Client' },
    ],
    edges: [
      { from: 'c1', to: 'sing', kind: 'depends', label: 'getInstance()' },
      { from: 'c2', to: 'sing', kind: 'depends', label: 'getInstance()' },
    ],
  },

  // ── STRUCTURAL ──────────────────────────────────────────────

  'adapter': {
    nodes: [
      { id: 'target', label: 'MidiDevice', kind: 'interface', x: 0, y: 0,
        methods: ['+ sendMidi(note, vel)'], role: 'Target' },
      { id: 'adaptee', label: 'DanTranh', kind: 'class', x: 3, y: 0,
        methods: ['+ gayDay(dayNumber)'], role: 'Adaptee' },
      { id: 'adapter', label: 'DanTranhMidiAdapter', kind: 'class', x: 1, y: 2,
        methods: ['+ sendMidi(note, vel)'], role: 'Adapter' },
      { id: 'client', label: 'DAW Client', kind: 'class', x: 0, y: 2, role: 'Client' },
    ],
    edges: [
      { from: 'adapter', to: 'target', kind: 'implements' },
      { from: 'adapter', to: 'adaptee', kind: 'composes', label: 'wraps' },
      { from: 'client', to: 'target', kind: 'depends' },
    ],
  },

  'bridge': {
    nodes: [
      { id: 'abstraction', label: 'KieuDang', kind: 'abstract', x: 0, y: 0,
        methods: ['# chatLieu: ChatLieu', '+ moTaAoDai()'], role: 'Abstraction' },
      { id: 'impl', label: 'ChatLieu', kind: 'interface', x: 3, y: 0,
        methods: ['+ moTa(): str'], role: 'Implementation' },
      { id: 'refA', label: 'TruyenThong', kind: 'class', x: 0, y: 2, role: 'Refined A' },
      { id: 'refB', label: 'TanThoi', kind: 'class', x: 1, y: 2, role: 'Refined B' },
      { id: 'ciA', label: 'ToLua', kind: 'class', x: 3, y: 2, role: 'ConcreteImpl A' },
      { id: 'ciB', label: 'Gam', kind: 'class', x: 4, y: 2, role: 'ConcreteImpl B' },
    ],
    edges: [
      { from: 'refA', to: 'abstraction', kind: 'inherits' },
      { from: 'refB', to: 'abstraction', kind: 'inherits' },
      { from: 'ciA', to: 'impl', kind: 'implements' },
      { from: 'ciB', to: 'impl', kind: 'implements' },
      { from: 'abstraction', to: 'impl', kind: 'associates', label: 'bridge →' },
    ],
  },

  'composite': {
    nodes: [
      { id: 'comp', label: 'DonVi', kind: 'interface', x: 1, y: 0,
        methods: ['+ tienCong()', '+ getSucManh(): int'], role: 'Component' },
      { id: 'leaf', label: 'ChienSi', kind: 'class', x: 0, y: 2,
        methods: ['+ tienCong()', '+ getSucManh()'], role: 'Leaf' },
      { id: 'composite', label: 'DonViComposite', kind: 'class', x: 2, y: 2,
        methods: ['+ them(dv: DonVi)', '+ tienCong()', '+ getSucManh()'], role: 'Composite' },
    ],
    edges: [
      { from: 'leaf', to: 'comp', kind: 'implements' },
      { from: 'composite', to: 'comp', kind: 'implements' },
      { from: 'composite', to: 'comp', kind: 'aggregates', label: 'children[]' },
    ],
  },

  'decorator': {
    nodes: [
      { id: 'comp', label: 'Pho', kind: 'interface', x: 1, y: 0,
        methods: ['+ moTa(): str', '+ gia(): int'], role: 'Component' },
      { id: 'concrete', label: 'PhoCoBan', kind: 'class', x: 0, y: 2,
        methods: ['+ moTa()', '+ gia()'], role: 'ConcreteComponent' },
      { id: 'decorator', label: 'PhoDecorator', kind: 'abstract', x: 2, y: 1,
        methods: ['# pho: Pho', '+ moTa()', '+ gia()'], role: 'BaseDecorator' },
      { id: 'decA', label: 'ThemThitBo', kind: 'class', x: 2, y: 2,
        methods: ['+ moTa()', '+ gia()'], role: 'ConcreteDecorator' },
      { id: 'decB', label: 'ThemTrung', kind: 'class', x: 3, y: 2,
        methods: ['+ moTa()', '+ gia()'], role: 'ConcreteDecorator' },
    ],
    edges: [
      { from: 'concrete', to: 'comp', kind: 'implements' },
      { from: 'decorator', to: 'comp', kind: 'implements' },
      { from: 'decorator', to: 'comp', kind: 'composes', label: 'wraps' },
      { from: 'decA', to: 'decorator', kind: 'inherits' },
      { from: 'decB', to: 'decorator', kind: 'inherits' },
    ],
  },

  'facade': {
    nodes: [
      { id: 'facade', label: 'ChuHon', kind: 'class', x: 1, y: 0,
        methods: ['+ batDauLeCuoi()'], role: 'Facade' },
      { id: 'sub1', label: 'LeNghi', kind: 'class', x: 0, y: 2,
        methods: ['+ chuanBiLe()', '+ docLoiThe()'], role: 'Subsystem' },
      { id: 'sub2', label: 'AmNhac', kind: 'class', x: 1, y: 2,
        methods: ['+ khoiDong()', '+ hatBaiChao()'], role: 'Subsystem' },
      { id: 'sub3', label: 'NauAn', kind: 'class', x: 2, y: 2,
        methods: ['+ chuanBiMamCo()'], role: 'Subsystem' },
      { id: 'client', label: 'CoDau / ChuRe', kind: 'class', x: 3, y: 0,
        role: 'Client' },
    ],
    edges: [
      { from: 'client', to: 'facade', kind: 'depends' },
      { from: 'facade', to: 'sub1', kind: 'associates' },
      { from: 'facade', to: 'sub2', kind: 'associates' },
      { from: 'facade', to: 'sub3', kind: 'associates' },
    ],
  },

  'flyweight': {
    nodes: [
      { id: 'factory', label: 'DenLongFactory', kind: 'class', x: 1, y: 0,
        methods: ['- cache: dict', '+ getDenLong(mau,hinh,hoa)'], role: 'FlyweightFactory' },
      { id: 'flyweight', label: 'DenLongFlyweight', kind: 'class', x: 0, y: 2,
        methods: ['# mauSac (intrinsic)', '# hinhDang (intrinsic)', '+ hienThi(x,y,uoc)'],
        role: 'Flyweight' },
      { id: 'context', label: 'Context', kind: 'class', x: 2, y: 2,
        methods: ['x, y, loiUoc (extrinsic)', '+ ref: DenLongFlyweight'],
        role: 'Context' },
    ],
    edges: [
      { from: 'factory', to: 'flyweight', kind: 'composes', label: 'caches' },
      { from: 'context', to: 'flyweight', kind: 'associates', label: 'shares' },
    ],
  },

  'proxy': {
    nodes: [
      { id: 'iface', label: 'HoangDe', kind: 'interface', x: 1, y: 0,
        methods: ['+ tiepKien(ten, don)'], role: 'ServiceInterface' },
      { id: 'real', label: 'HoangDeThuc', kind: 'class', x: 0, y: 2,
        methods: ['+ tiepKien(ten, don)'], role: 'RealSubject' },
      { id: 'proxy', label: 'QuanLaiProxy', kind: 'class', x: 2, y: 2,
        methods: ['- hoangDe: HoangDeThuc', '- duocPhep: set', '+ tiepKien(ten, don)'],
        role: 'Proxy' },
      { id: 'client', label: 'Dan / Client', kind: 'class', x: 3, y: 0,
        role: 'Client' },
    ],
    edges: [
      { from: 'real', to: 'iface', kind: 'implements' },
      { from: 'proxy', to: 'iface', kind: 'implements' },
      { from: 'proxy', to: 'real', kind: 'composes', label: 'lazy init' },
      { from: 'client', to: 'iface', kind: 'depends' },
    ],
  },

  // ── BEHAVIORAL ──────────────────────────────────────────────

  'chain-of-responsibility': {
    nodes: [
      { id: 'handler', label: 'QuanChuc', kind: 'abstract', x: 1, y: 0,
        methods: ['# capTren: QuanChuc', '+ xuLy(don: DonThinh)'], role: 'Handler' },
      { id: 'h1', label: 'XaTruong', kind: 'class', x: 0, y: 2, role: 'ConcreteHandler' },
      { id: 'h2', label: 'HuyenQuan', kind: 'class', x: 1, y: 2, role: 'ConcreteHandler' },
      { id: 'h3', label: 'HoangDe', kind: 'class', x: 2, y: 2, role: 'ConcreteHandler' },
      { id: 'req', label: 'DonThinh', kind: 'class', x: 3, y: 0,
        methods: ['noiDung: str', 'capYeuCau: CapDo'], role: 'Request' },
    ],
    edges: [
      { from: 'h1', to: 'handler', kind: 'inherits' },
      { from: 'h2', to: 'handler', kind: 'inherits' },
      { from: 'h3', to: 'handler', kind: 'inherits' },
      { from: 'handler', to: 'handler', kind: 'associates', label: 'next →' },
    ],
  },

  'command': {
    nodes: [
      { id: 'cmd', label: 'ChieuChi', kind: 'interface', x: 1, y: 0,
        methods: ['+ execute()', '+ undo()'], role: 'Command' },
      { id: 'c1', label: 'XayThanhCommand', kind: 'class', x: 0, y: 2,
        methods: ['+ execute()', '+ undo()'], role: 'ConcreteCommand' },
      { id: 'c2', label: 'GiamThueCommand', kind: 'class', x: 2, y: 2,
        methods: ['+ execute()', '+ undo()'], role: 'ConcreteCommand' },
      { id: 'recv', label: 'ThanhPho', kind: 'class', x: 4, y: 1,
        methods: ['+ xayThanh()', '+ giamThue()'], role: 'Receiver' },
      { id: 'inv', label: 'ThuKyHoangGia', kind: 'class', x: 3, y: 0,
        methods: ['- lichSu: list', '+ thucThi(cmd)', '+ thuHoi()'], role: 'Invoker' },
    ],
    edges: [
      { from: 'c1', to: 'cmd', kind: 'implements' },
      { from: 'c2', to: 'cmd', kind: 'implements' },
      { from: 'c1', to: 'recv', kind: 'associates' },
      { from: 'c2', to: 'recv', kind: 'associates' },
      { from: 'inv', to: 'cmd', kind: 'composes' },
    ],
  },

  'iterator': {
    nodes: [
      { id: 'iter', label: 'Iterator', kind: 'interface', x: 0, y: 0,
        methods: ['+ hasNext(): bool', '+ next(): DiTich'], role: 'Iterator' },
      { id: 'coll', label: 'TourHaNoi', kind: 'class', x: 2, y: 0,
        methods: ['- diaDiem: list', '+ __iter__()', '+ lichSuIterator()'],
        role: 'IterableCollection' },
      { id: 'site', label: 'DiTich', kind: 'class', x: 2, y: 2,
        methods: ['ten: str', 'namXay: int', 'moTa: str'], role: 'Element' },
    ],
    edges: [
      { from: 'coll', to: 'iter', kind: 'depends', label: 'creates' },
      { from: 'coll', to: 'site', kind: 'aggregates' },
    ],
  },

  'mediator': {
    nodes: [
      { id: 'med', label: 'HoiDong', kind: 'class', x: 1, y: 0,
        methods: ['- thanhVien: list', '+ them()', '+ hoaGiai(nguoi, nd)'],
        role: 'Mediator' },
      { id: 'comp', label: 'DanLang', kind: 'class', x: 3, y: 0,
        methods: ['# hoiDong: HoiDong', '+ guiDon(nd)', '+ nhanThongBao(tb)'],
        role: 'Component' },
      { id: 'c1', label: 'NongDan', kind: 'class', x: 2, y: 2, role: 'ConcreteComponent' },
      { id: 'c2', label: 'ThoThuCong', kind: 'class', x: 3, y: 2, role: 'ConcreteComponent' },
      { id: 'c3', label: 'ThuongNhan', kind: 'class', x: 4, y: 2, role: 'ConcreteComponent' },
    ],
    edges: [
      { from: 'c1', to: 'comp', kind: 'inherits' },
      { from: 'c2', to: 'comp', kind: 'inherits' },
      { from: 'c3', to: 'comp', kind: 'inherits' },
      { from: 'comp', to: 'med', kind: 'associates', label: 'notifies' },
      { from: 'med', to: 'comp', kind: 'associates', label: 'broadcasts' },
    ],
  },

  'memento': {
    nodes: [
      { id: 'orig', label: 'VuaHung', kind: 'class', x: 0, y: 1,
        methods: ['- _danSo', '- _khoBau', '+ luuSuKy(): SuKy', '+ khoiPhuc(SuKy)'],
        role: 'Originator' },
      { id: 'mem', label: 'SuKy', kind: 'class', x: 2, y: 0,
        methods: ['danSo: int', 'khoBau: int', 'nienHieu: str'],
        role: 'Memento' },
      { id: 'care', label: 'SuQuan', kind: 'class', x: 2, y: 2,
        methods: ['- daiVietSuKy: list[SuKy]', '+ ghiChep(vua)', '+ traCuu(i)'],
        role: 'Caretaker' },
    ],
    edges: [
      { from: 'orig', to: 'mem', kind: 'depends', label: 'creates' },
      { from: 'care', to: 'mem', kind: 'aggregates' },
      { from: 'care', to: 'orig', kind: 'associates' },
    ],
  },

  'observer': {
    nodes: [
      { id: 'pub', label: 'TrongDong', kind: 'class', x: 0, y: 1,
        methods: ['- nguoiNghe: list', '+ dangKy(n)', '+ huyDangKy(n)', '+ danhTrong(th)'],
        role: 'Publisher' },
      { id: 'obs', label: 'NguoiNghe', kind: 'interface', x: 3, y: 0,
        methods: ['+ phanUng(tinHieu: str)'], role: 'Subscriber' },
      { id: 'o1', label: 'NongDan', kind: 'class', x: 2, y: 2, role: 'ConcreteSubscriber' },
      { id: 'o2', label: 'ChienSi', kind: 'class', x: 3, y: 2, role: 'ConcreteSubscriber' },
      { id: 'o3', label: 'ThuNhan', kind: 'class', x: 4, y: 2, role: 'ConcreteSubscriber' },
    ],
    edges: [
      { from: 'pub', to: 'obs', kind: 'depends', label: 'notifies' },
      { from: 'o1', to: 'obs', kind: 'implements' },
      { from: 'o2', to: 'obs', kind: 'implements' },
      { from: 'o3', to: 'obs', kind: 'implements' },
    ],
  },

  'state': {
    nodes: [
      { id: 'ctx', label: 'RuongLua', kind: 'class', x: 0, y: 1,
        methods: ['- giaiDoan: GiaiDoanLua', '+ tuoiNuoc()', '+ bonPhan()', '+ gatLua()'],
        role: 'Context' },
      { id: 'state', label: 'GiaiDoanLua', kind: 'interface', x: 3, y: 0,
        methods: ['+ tuoiNuoc(r)', '+ bonPhan(r)', '+ gatLua(r)'], role: 'State' },
      { id: 's1', label: 'CayBua', kind: 'class', x: 2, y: 2, role: 'ConcreteState' },
      { id: 's2', label: 'DangLon', kind: 'class', x: 3, y: 2, role: 'ConcreteState' },
      { id: 's3', label: 'ThuHoach', kind: 'class', x: 4, y: 2, role: 'ConcreteState' },
    ],
    edges: [
      { from: 'ctx', to: 'state', kind: 'associates', label: 'current' },
      { from: 's1', to: 'state', kind: 'implements' },
      { from: 's2', to: 'state', kind: 'implements' },
      { from: 's3', to: 'state', kind: 'implements' },
    ],
  },

  'strategy': {
    nodes: [
      { id: 'ctx', label: 'VoSi', kind: 'class', x: 0, y: 1,
        methods: ['- voPhai: VoPhai', '+ doiVoPhai(vp)', '+ chienDau(dt)'],
        role: 'Context' },
      { id: 'strat', label: 'VoPhai', kind: 'interface', x: 3, y: 0,
        methods: ['+ tanCong(doiThu): str'], role: 'Strategy' },
      { id: 's1', label: 'VoBinhDinh', kind: 'class', x: 2, y: 2, role: 'ConcreteStrategy' },
      { id: 's2', label: 'VoTaySon', kind: 'class', x: 3, y: 2, role: 'ConcreteStrategy' },
      { id: 's3', label: 'VoThieuLam', kind: 'class', x: 4, y: 2, role: 'ConcreteStrategy' },
    ],
    edges: [
      { from: 'ctx', to: 'strat', kind: 'associates', label: 'delegates to' },
      { from: 's1', to: 'strat', kind: 'implements' },
      { from: 's2', to: 'strat', kind: 'implements' },
      { from: 's3', to: 'strat', kind: 'implements' },
    ],
  },

  'template-method': {
    nodes: [
      { id: 'abstract', label: 'NauCanh', kind: 'abstract', x: 1, y: 0,
        methods: ['+ nau() ← template', '# chuanBiNuocDung()', '# themNguyenLieu()', '- nemNem() ← fixed', '# trangTri()'],
        role: 'AbstractClass' },
      { id: 'c1', label: 'CanhChua', kind: 'class', x: 0, y: 2, role: 'ConcreteClass' },
      { id: 'c2', label: 'CanhBi', kind: 'class', x: 1, y: 2, role: 'ConcreteClass' },
      { id: 'c3', label: 'BunBoHue', kind: 'class', x: 2, y: 2, role: 'ConcreteClass' },
    ],
    edges: [
      { from: 'c1', to: 'abstract', kind: 'inherits' },
      { from: 'c2', to: 'abstract', kind: 'inherits' },
      { from: 'c3', to: 'abstract', kind: 'inherits' },
    ],
  },

  'visitor': {
    nodes: [
      { id: 'visitor', label: 'KhachTham', kind: 'interface', x: 3, y: 0,
        methods: ['+ thamDetLua(p)', '+ thamGomSu(p)', '+ thamMoc(p)'],
        role: 'Visitor' },
      { id: 'elem', label: 'PhuongHoi', kind: 'abstract', x: 0, y: 0,
        methods: ['+ chapNhan(visitor)', '+ doanhThu'], role: 'Element' },
      { id: 'v1', label: 'QuanThuThue', kind: 'class', x: 3, y: 2, role: 'ConcreteVisitor' },
      { id: 'v2', label: 'QuanKiemTra', kind: 'class', x: 4, y: 2, role: 'ConcreteVisitor' },
      { id: 'e1', label: 'PhuongDetLua', kind: 'class', x: 0, y: 2, role: 'ConcreteElement' },
      { id: 'e2', label: 'PhuongGomSu', kind: 'class', x: 1, y: 2, role: 'ConcreteElement' },
    ],
    edges: [
      { from: 'v1', to: 'visitor', kind: 'implements' },
      { from: 'v2', to: 'visitor', kind: 'implements' },
      { from: 'e1', to: 'elem', kind: 'inherits' },
      { from: 'e2', to: 'elem', kind: 'inherits' },
      { from: 'elem', to: 'visitor', kind: 'depends', label: 'accept(v)' },
    ],
  },

}
