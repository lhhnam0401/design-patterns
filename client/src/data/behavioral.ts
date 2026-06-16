import type { Pattern } from '../types/pattern'

export const behavioralPatterns: Pattern[] = [
  {
    id: 'chain-of-responsibility',
    slug: 'chain-of-responsibility',
    name: { en: 'Chain of Responsibility', vi: 'Chuỗi Trách Nhiệm' },
    category: 'behavioral',
    complexity: 2,
    popularity: 2,
    intent: {
      en: 'Avoids coupling the sender of a request to its receiver by giving more than one object a chance to handle it. Chain the receiving objects and pass the request along the chain.',
      vi: 'Tránh kết hợp chặt chẽ người gửi yêu cầu với người nhận bằng cách cho nhiều đối tượng cơ hội xử lý nó. Nối các đối tượng nhận và chuyển yêu cầu dọc theo chuỗi.',
    },
    problem: {
      en: 'A request must pass through several handlers, each deciding to either process it or pass it on. The sender should not know which handler will ultimately process the request.',
      vi: 'Một yêu cầu phải đi qua một số handler, mỗi handler quyết định xử lý hoặc chuyển tiếp nó. Người gửi không nên biết handler nào cuối cùng sẽ xử lý yêu cầu.',
    },
    solution: {
      en: 'Transform particular behaviors into stand-alone objects called handlers. Each handler has a reference to the next handler. A handler can either process a request or pass it to the next handler.',
      vi: 'Biến các hành vi cụ thể thành các đối tượng độc lập gọi là handler. Mỗi handler có tham chiếu đến handler tiếp theo. Một handler có thể xử lý yêu cầu hoặc chuyển nó cho handler tiếp theo.',
    },
    applicability: {
      en: 'Use when more than one object may handle a request, and the handler isn\'t known a priori. Use when you want to issue a request to several objects without specifying the receiver explicitly.',
      vi: 'Sử dụng khi nhiều đối tượng có thể xử lý một yêu cầu và handler không được biết trước. Sử dụng khi muốn gửi yêu cầu đến nhiều đối tượng mà không chỉ định rõ người nhận.',
    },
    vietnamese_example: {
      title: { en: 'Petitioning the Imperial Court', vi: 'Dâng Đơn Lên Triều Đình' },
      description: {
        en: 'In ancient Vietnam, a citizen\'s petition (đơn thỉnh cầu) would travel up the chain: first to Xã Trưởng (village chief), then Huyện Quan (district magistrate), then Phủ Doãn (provincial governor), and finally to the Emperor. Each official handles what\'s within their authority. A minor land dispute is resolved by the Xã Trưởng; a military matter goes all the way to the Emperor.',
        vi: 'Trong Việt Nam cổ đại, đơn thỉnh cầu của người dân sẽ đi lên chuỗi: đầu tiên đến Xã Trưởng, sau đó Huyện Quan, rồi Phủ Doãn, và cuối cùng đến Hoàng Đế. Mỗi quan chức xử lý những gì trong thẩm quyền của họ. Tranh chấp đất đai nhỏ do Xã Trưởng giải quyết; vấn đề quân sự đến tận Hoàng Đế.',
      },
      illustration: '📜 Chuỗi Thỉnh Cầu\n[Đơn] ──▶ Xã Trưởng\n             │ (nhỏ→xử lý)\n             │ (lớn→chuyển)\n             ▼\n          Huyện Quan\n             │\n             ▼\n          Phủ Doãn\n             │\n             ▼\n          Hoàng Đế 👑',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from enum import Enum

class CapDo(Enum):
    XA = 1
    HUYEN = 2
    PHU = 3
    TRIEU_DINH = 4

class DonThinh:
    def __init__(self, noi_dung: str, cap_yeu_cau: CapDo):
        self.noi_dung = noi_dung
        self.cap_yeu_cau = cap_yeu_cau

class QuanChuc(ABC):
    def __init__(self, ten: str, cap: CapDo):
        self.ten = ten
        self.cap = cap
        self._cap_tren: 'QuanChuc | None' = None

    def set_cap_tren(self, cap_tren: 'QuanChuc') -> 'QuanChuc':
        self._cap_tren = cap_tren
        return cap_tren

    def xu_ly(self, don: DonThinh):
        if don.cap_yeu_cau.value <= self.cap.value:
            print(f"✅ {self.ten} xử lý: '{don.noi_dung}'")
        elif self._cap_tren:
            print(f"📨 {self.ten} chuyển lên {self._cap_tren.ten}")
            self._cap_tren.xu_ly(don)
        else:
            print(f"❌ Không ai có thể xử lý: '{don.noi_dung}'")

class XaTruong(QuanChuc):
    def __init__(self): super().__init__("Xã Trưởng", CapDo.XA)

class HuyenQuan(QuanChuc):
    def __init__(self): super().__init__("Huyện Quan", CapDo.HUYEN)

class PhuDoan(QuanChuc):
    def __init__(self): super().__init__("Phủ Doãn", CapDo.PHU)

class HoangDe(QuanChuc):
    def __init__(self): super().__init__("Hoàng Đế 👑", CapDo.TRIEU_DINH)

# Build the chain
xa = XaTruong()
huyen = HuyenQuan()
phu = PhuDoan()
vua = HoangDe()
xa.set_cap_tren(huyen).set_cap_tren(phu).set_cap_tren(vua)

# Test different request levels
xa.xu_ly(DonThinh("Tranh chấp bờ ruộng", CapDo.XA))
xa.xu_ly(DonThinh("Vụ trộm lớn", CapDo.HUYEN))
xa.xu_ly(DonThinh("Kế hoạch chống giặc ngoại xâm", CapDo.TRIEU_DINH))`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `enum CapDo { XA = 1, HUYEN = 2, PHU = 3, TRIEU_DINH = 4 }

interface DonThinh { noiDung: string; capYeuCau: CapDo }

abstract class QuanChuc {
  protected capTren: QuanChuc | null = null

  constructor(protected ten: string, protected cap: CapDo) {}

  setCapTren(next: QuanChuc): QuanChuc { this.capTren = next; return next }

  xuLy(don: DonThinh): void {
    if (don.capYeuCau <= this.cap) {
      console.log(\`✅ \${this.ten} xử lý: "\${don.noiDung}"\`)
    } else if (this.capTren) {
      console.log(\`📨 \${this.ten} → \${this.capTren['ten']}\`)
      this.capTren.xuLy(don)
    }
  }
}

class XaTruong extends QuanChuc { constructor() { super('Xã Trưởng', CapDo.XA) } }
class HuyenQuan extends QuanChuc { constructor() { super('Huyện Quan', CapDo.HUYEN) } }
class HoangDe extends QuanChuc { constructor() { super('Hoàng Đế 👑', CapDo.TRIEU_DINH) } }

const xa = new XaTruong(), huyen = new HuyenQuan(), vua = new HoangDe()
xa.setCapTren(huyen).setCapTren(vua)

xa.xuLy({ noiDung: 'Tranh chấp ruộng', capYeuCau: CapDo.XA })
xa.xuLy({ noiDung: 'Chống giặc ngoại xâm', capYeuCau: CapDo.TRIEU_DINH })`,
      },
    ],
    structure_notes: {
      en: 'Handler interface declares the handling method. BaseHandler implements default handling: forward to next. ConcreteHandlers handle requests they can, pass others.',
      vi: 'Giao diện Handler khai báo phương thức xử lý. BaseHandler triển khai xử lý mặc định: chuyển tiếp cho handler tiếp theo. ConcreteHandler xử lý yêu cầu chúng có thể, chuyển tiếp các yêu cầu khác.',
    },
  },

  {
    id: 'command',
    slug: 'command',
    name: { en: 'Command', vi: 'Lệnh' },
    category: 'behavioral',
    complexity: 2,
    popularity: 3,
    intent: {
      en: 'Encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.',
      vi: 'Đóng gói một yêu cầu thành đối tượng, từ đó cho phép bạn tham số hóa client với các yêu cầu khác nhau, xếp hàng hoặc ghi log yêu cầu, và hỗ trợ các hoạt động có thể hoàn tác.',
    },
    problem: {
      en: 'You want to decouple the object that invokes an operation from the one that knows how to perform it. You need undo/redo functionality or request queuing.',
      vi: 'Bạn muốn tách biệt đối tượng gọi hoạt động khỏi đối tượng biết cách thực hiện nó. Bạn cần chức năng undo/redo hoặc xếp hàng yêu cầu.',
    },
    solution: {
      en: 'Turn requests into Command objects with an execute() method. Store commands in a queue or history. Implement undo by reversing the command\'s effects.',
      vi: 'Biến các yêu cầu thành đối tượng Command với phương thức execute(). Lưu trữ các lệnh trong hàng đợi hoặc lịch sử. Triển khai undo bằng cách đảo ngược hiệu ứng của lệnh.',
    },
    applicability: {
      en: 'Use to parameterize objects with operations, queue operations, implement reversible operations, or implement transaction systems.',
      vi: 'Sử dụng để tham số hóa đối tượng với các hoạt động, xếp hàng hoạt động, triển khai hoạt động có thể đảo ngược, hoặc triển khai hệ thống giao dịch.',
    },
    vietnamese_example: {
      title: { en: 'Royal Decree System (Chiếu Chỉ)', vi: 'Hệ Thống Chiếu Chỉ Triều Đình' },
      description: {
        en: 'In the Vietnamese imperial court, the Emperor issues decrees (Chiếu Chỉ) that can be executed, queued, logged in the royal archives, and — in some cases — revoked (undo). A "Build the Citadel" decree, a "Reduce taxes" decree, and a "Dispatch army" decree are all Command objects. The Royal Secretary (Thư Ký) queues and executes them; the Royal Historian (Sử Quan) logs everything for the history books.',
        vi: 'Trong triều đình Việt Nam, Hoàng Đế ban chiếu chỉ có thể được thực thi, xếp hàng, ghi vào hồ sơ hoàng gia, và trong một số trường hợp — thu hồi (undo). Chiếu chỉ "Xây Thành", "Giảm Thuế", và "Điều Quân" đều là đối tượng Command. Thư Ký Hoàng Gia xếp hàng và thực thi chúng; Sử Quan ghi lại tất cả.',
      },
      illustration: '📜 Hệ Thống Chiếu Chỉ\nHoàng Đế ──tạo──▶ ChieuChi (Command)\n                       │ execute()\n                       │ undo()\n                       ▼\n              ThiHanhVien (Receiver)\n                       │\n              ThuKy (Invoker)\n              stores history[]',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from typing import List

class ThanhPho:
    """Receiver"""
    def __init__(self, ten: str):
        self.ten = ten
        self.thue_suat = 100
        self.quan_doi = 0

    def xay_thanh(self):
        print(f"🏰 Xây thành {self.ten}!")

    def pha_thanh(self):
        print(f"💥 Phá thành {self.ten}!")

    def giam_thue(self, so: int):
        self.thue_suat -= so
        print(f"💰 Giảm thuế {so}%, còn {self.thue_suat}%")

    def tang_thue(self, so: int):
        self.thue_suat += so
        print(f"💰 Tăng thuế {so}%, còn {self.thue_suat}%")

class ChieuChi(ABC):
    @abstractmethod
    def execute(self): pass
    @abstractmethod
    def undo(self): pass

class XayThanhCommand(ChieuChi):
    def __init__(self, tp: ThanhPho):
        self._tp = tp
    def execute(self): self._tp.xay_thanh()
    def undo(self): self._tp.pha_thanh()

class GiamThueCommand(ChieuChi):
    def __init__(self, tp: ThanhPho, so: int):
        self._tp, self._so = tp, so
    def execute(self): self._tp.giam_thue(self._so)
    def undo(self): self._tp.tang_thue(self._so)

class ThuKyHoangGia:
    """Invoker with history"""
    def __init__(self):
        self._lich_su: List[ChieuChi] = []

    def thuc_thi(self, chieu_chi: ChieuChi):
        chieu_chi.execute()
        self._lich_su.append(chieu_chi)

    def thu_hoi(self):
        if self._lich_su:
            chieu_chi = self._lich_su.pop()
            print("↩️ Thu hồi chiếu chỉ:")
            chieu_chi.undo()

# Imperial command system
ha_noi = ThanhPho("Hà Nội")
thu_ky = ThuKyHoangGia()

thu_ky.thuc_thi(XayThanhCommand(ha_noi))
thu_ky.thuc_thi(GiamThueCommand(ha_noi, 20))
thu_ky.thuc_thi(GiamThueCommand(ha_noi, 10))

print("--- Thu hồi ---")
thu_ky.thu_hoi()  # undo reduce tax 10%
thu_ky.thu_hoi()  # undo reduce tax 20%`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `interface ChieuChi {
  execute(): void
  undo(): void
}

class ThanhPho {
  thueSuat = 100
  constructor(public ten: string) {}
  xayThanh() { console.log(\`🏰 Xây thành \${this.ten}!\`) }
  phaThanh() { console.log(\`💥 Phá thành \${this.ten}!\`) }
  giamThue(so: number) { this.thueSuat -= so; console.log(\`Thuế: \${this.thueSuat}%\`) }
  tangThue(so: number) { this.thueSuat += so; console.log(\`Thuế: \${this.thueSuat}%\`) }
}

class XayThanhCommand implements ChieuChi {
  constructor(private tp: ThanhPho) {}
  execute() { this.tp.xayThanh() }
  undo() { this.tp.phaThanh() }
}

class GiamThueCommand implements ChieuChi {
  constructor(private tp: ThanhPho, private so: number) {}
  execute() { this.tp.giamThue(this.so) }
  undo() { this.tp.tangThue(this.so) }
}

class ThuKyHoangGia {
  private lichSu: ChieuChi[] = []
  thucThi(cc: ChieuChi) { cc.execute(); this.lichSu.push(cc) }
  thuHoi() { this.lichSu.pop()?.undo() }
}

const haNoi = new ThanhPho('Hà Nội')
const thuKy = new ThuKyHoangGia()
thuKy.thucThi(new XayThanhCommand(haNoi))
thuKy.thucThi(new GiamThueCommand(haNoi, 20))
thuKy.thuHoi()`,
      },
    ],
    structure_notes: {
      en: 'Invoker triggers commands. Command interface has execute()/undo(). ConcreteCommand implements actions on Receiver. Client creates and configures commands.',
      vi: 'Invoker kích hoạt lệnh. Giao diện Command có execute()/undo(). ConcreteCommand thực hiện hành động trên Receiver. Client tạo và cấu hình các lệnh.',
    },
  },

  {
    id: 'iterator',
    slug: 'iterator',
    name: { en: 'Iterator', vi: 'Bộ Lặp' },
    category: 'behavioral',
    complexity: 2,
    popularity: 3,
    intent: {
      en: 'Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.',
      vi: 'Cung cấp một cách truy cập các phần tử của đối tượng tổng hợp một cách tuần tự mà không tiết lộ biểu diễn cơ bản của nó.',
    },
    problem: {
      en: 'You need to traverse a complex collection without exposing its internal structure. You may also want multiple traversal algorithms for the same collection.',
      vi: 'Bạn cần duyệt qua một bộ sưu tập phức tạp mà không tiết lộ cấu trúc nội tại của nó. Bạn cũng có thể muốn nhiều thuật toán duyệt cho cùng một bộ sưu tập.',
    },
    solution: {
      en: 'Extract the traversal behavior into a separate iterator object. The iterator tracks the traversal progress and knows how to fetch the next element.',
      vi: 'Tách hành vi duyệt thành đối tượng iterator riêng biệt. Iterator theo dõi tiến độ duyệt và biết cách lấy phần tử tiếp theo.',
    },
    applicability: {
      en: 'Use when a collection has a complex data structure underneath, but you want to hide its complexity from clients.',
      vi: 'Sử dụng khi bộ sưu tập có cấu trúc dữ liệu phức tạp bên dưới, nhưng bạn muốn ẩn sự phức tạp đó khỏi client.',
    },
    vietnamese_example: {
      title: { en: 'Touring Vietnamese Historical Sites', vi: 'Du Lịch Các Di Tích Lịch Sử Việt Nam' },
      description: {
        en: 'A tour guide (Iterator) leads tourists through historical Vietnamese sites: Văn Miếu (Temple of Literature), Hồ Gươm (Sword Lake), Lăng Bác (Ho Chi Minh Mausoleum), Hoàng Thành Thăng Long (Imperial Citadel). The tourist doesn\'t need to know the map\'s internal structure — they just call next() to visit the next site. Different iterators can offer different tours: chronological order, geographic order, or VIP priority order.',
        vi: 'Hướng dẫn viên du lịch (Iterator) dẫn khách tham quan các di tích lịch sử Việt Nam: Văn Miếu, Hồ Gươm, Lăng Bác, Hoàng Thành Thăng Long. Du khách không cần biết cấu trúc nội tại của bản đồ — họ chỉ cần gọi next() để thăm địa điểm tiếp theo.',
      },
      illustration: '🗺️ Tour Di Tích Hà Nội\n[DiTichCollection]\n   │ tao_huong_dan()\n   ▼\n[HuongDanVien - Iterator]\n   │ has_next()\n   │ next() ──▶ Văn Miếu\n   │ next() ──▶ Hồ Gươm\n   │ next() ──▶ Lăng Bác\n   └─ next() ──▶ Hoàng Thành',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from typing import Iterator, List

class DiTich:
    def __init__(self, ten: str, nam_xay: int, mo_ta: str):
        self.ten = ten
        self.nam_xay = nam_xay
        self.mo_ta = mo_ta

    def __str__(self):
        return f"🏛️ {self.ten} ({self.nam_xay}) - {self.mo_ta}"

class TourHaNoi:
    """Iterable collection of historical sites"""
    def __init__(self):
        self._dia_diem: List[DiTich] = [
            DiTich("Văn Miếu - Quốc Tử Giám", 1070, "Trường đại học đầu tiên VN"),
            DiTich("Hồ Hoàn Kiếm", 1428, "Huyền thoại gươm thần Lê Lợi"),
            DiTich("Lăng Chủ Tịch Hồ Chí Minh", 1975, "Lăng của Bác Hồ"),
            DiTich("Hoàng Thành Thăng Long", 1010, "Kinh đô nghìn năm"),
            DiTich("Chùa Một Cột", 1049, "Chùa hình hoa sen độc đáo"),
        ]

    def __iter__(self) -> Iterator[DiTich]:
        return iter(self._dia_diem)

    def lich_su_iterator(self) -> Iterator[DiTich]:
        """Iterate in historical order"""
        return iter(sorted(self._dia_diem, key=lambda d: d.nam_xay))

# Using standard iterator
tour = TourHaNoi()

print("📅 Tour theo thứ tự mặc định:")
for dia_diem in tour:
    print(f"  {dia_diem}")

print("\n📅 Tour theo thứ tự lịch sử:")
for dia_diem in tour.lich_su_iterator():
    print(f"  {dia_diem}")`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `class DiTich {
  constructor(
    public ten: string,
    public namXay: number,
    public moTa: string
  ) {}
  toString() { return \`🏛️ \${this.ten} (\${this.namXay}) - \${this.moTa}\` }
}

class TourHaNoi implements Iterable<DiTich> {
  private diaDiem: DiTich[] = [
    new DiTich('Văn Miếu', 1070, 'Trường đại học đầu tiên VN'),
    new DiTich('Hồ Hoàn Kiếm', 1428, 'Huyền thoại gươm thần'),
    new DiTich('Hoàng Thành Thăng Long', 1010, 'Kinh đô nghìn năm'),
    new DiTich('Chùa Một Cột', 1049, 'Chùa hình hoa sen'),
  ]

  [Symbol.iterator](): Iterator<DiTich> {
    let index = 0
    const sites = this.diaDiem
    return {
      next(): IteratorResult<DiTich> {
        if (index < sites.length) {
          return { value: sites[index++], done: false }
        }
        return { value: undefined as any, done: true }
      }
    }
  }

  lichSuIterator(): DiTich[] {
    return [...this.diaDiem].sort((a, b) => a.namXay - b.namXay)
  }
}

const tour = new TourHaNoi()
for (const site of tour) {
  console.log(site.toString())
}`,
      },
    ],
    structure_notes: {
      en: 'Iterator interface declares traversal operations. ConcreteIterator implements traversal algorithm. Collection interface declares a factory method for iterators.',
      vi: 'Giao diện Iterator khai báo các thao tác duyệt. ConcreteIterator triển khai thuật toán duyệt. Giao diện Collection khai báo phương thức factory cho iterator.',
    },
  },

  {
    id: 'mediator',
    slug: 'mediator',
    name: { en: 'Mediator', vi: 'Trung Gian' },
    category: 'behavioral',
    complexity: 2,
    popularity: 1,
    intent: {
      en: 'Defines an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly.',
      vi: 'Định nghĩa một đối tượng đóng gói cách một tập hợp đối tượng tương tác. Mediator thúc đẩy liên kết lỏng bằng cách ngăn các đối tượng tham chiếu lẫn nhau một cách rõ ràng.',
    },
    problem: {
      en: 'Classes become tangled up with dependencies between each other. Changing one class may require changes to many others. Communication becomes difficult to understand.',
      vi: 'Các lớp trở nên rối rắm với các phụ thuộc lẫn nhau. Thay đổi một lớp có thể yêu cầu thay đổi nhiều lớp khác. Giao tiếp trở nên khó hiểu.',
    },
    solution: {
      en: 'Force components to collaborate only via a mediator object. Instead of calling each other directly, components call the mediator which redirects calls to appropriate components.',
      vi: 'Buộc các thành phần chỉ cộng tác qua đối tượng mediator. Thay vì gọi trực tiếp nhau, các thành phần gọi mediator, mediator chuyển hướng lệnh gọi đến thành phần thích hợp.',
    },
    applicability: {
      en: 'Use when it\'s hard to change some of the classes because they are tightly coupled to a bunch of other classes, or when you can\'t reuse a component because it depends on others.',
      vi: 'Sử dụng khi khó thay đổi một số lớp vì chúng liên kết chặt chẽ với nhiều lớp khác, hoặc khi không thể tái sử dụng một thành phần vì nó phụ thuộc vào các thành phần khác.',
    },
    vietnamese_example: {
      title: { en: 'Village Council (Hội Đồng Làng)', vi: 'Hội Đồng Làng - Điều Phối Xã Hội' },
      description: {
        en: 'In a Vietnamese village (làng), disputes between farmers (nông dân), craftsmen (thợ thủ công), merchants (thương nhân), and scholars (văn nhân) are mediated by the Village Elder Council (Hội Đồng Làng). Instead of villagers arguing directly with each other, they bring their matters to the council. The council hears all sides and announces decisions. This prevents direct conflicts and keeps village harmony (đoàn kết làng xã).',
        vi: 'Trong làng Việt Nam, tranh chấp giữa nông dân, thợ thủ công, thương nhân, và văn nhân được hòa giải bởi Hội Đồng Làng. Thay vì dân làng tranh luận trực tiếp, họ đưa vấn đề lên hội đồng. Hội đồng lắng nghe tất cả các bên và thông báo quyết định. Điều này ngăn chặn xung đột trực tiếp và duy trì đoàn kết làng xã.',
      },
      illustration: '🏘️ Hội Đồng Làng\nNongDan    ThoThu\n  │    ╲  ╱   │\n  │     ╲╱    │\n  └──▶ HoiDong ◀──┘\n  ┌──── Làng ────┐\nVanNhan   ThuongNhan\n  └──────▶ ◀────┘',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod

class DanLang(ABC):
    def __init__(self, ten: str, hoi_dong: 'HoiDong'):
        self.ten = ten
        self._hoi_dong = hoi_dong

    def gui_don(self, noi_dung: str):
        print(f"📨 {self.ten} gửi: '{noi_dung}'")
        self._hoi_dong.hoa_giai(self, noi_dung)

    def nhan_thong_bao(self, thong_bao: str):
        print(f"📢 {self.ten} nhận: {thong_bao}")

class HoiDong:
    """Mediator - Village Council"""
    def __init__(self):
        self._thanh_vien: list[DanLang] = []

    def them(self, nguoi: DanLang):
        self._thanh_vien.append(nguoi)

    def hoa_giai(self, nguoi_gui: DanLang, noi_dung: str):
        print(f"⚖️ Hội đồng xem xét: '{noi_dung}'")
        for nguoi in self._thanh_vien:
            if nguoi is not nguoi_gui:
                nguoi.nhan_thong_bao(f"HĐ thông báo từ {nguoi_gui.ten}: {noi_dung}")

class NongDan(DanLang): pass
class ThoThuCong(DanLang): pass
class ThuongNhan(DanLang): pass

hoi_dong = HoiDong()
nguyen = NongDan("Nguyễn Văn A (Nông dân)", hoi_dong)
tran = ThoThuCong("Trần Thị B (Thợ gốm)", hoi_dong)
le = ThuongNhan("Lê Văn C (Thương nhân)", hoi_dong)

for nguoi in [nguyen, tran, le]:
    hoi_dong.them(nguoi)

nguyen.gui_don("Xin cấp thêm nước tưới cho ruộng")`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `class HoiDong {
  private thanhVien: DanLang[] = []
  them(nguoi: DanLang) { this.thanhVien.push(nguoi) }
  hoaGiai(nguoiGui: DanLang, noiDung: string) {
    console.log(\`⚖️ Hội đồng xem xét: "\${noiDung}"\`)
    this.thanhVien
      .filter(n => n !== nguoiGui)
      .forEach(n => n.nhanThongBao(\`Từ \${nguoiGui.ten}: \${noiDung}\`))
  }
}

class DanLang {
  constructor(public ten: string, private hoiDong: HoiDong) {}
  guiDon(noiDung: string) {
    console.log(\`📨 \${this.ten}: "\${noiDung}"\`)
    this.hoiDong.hoaGiai(this, noiDung)
  }
  nhanThongBao(tb: string) { console.log(\`📢 \${this.ten} nhận: \${tb}\`) }
}

const hd = new HoiDong()
const nguyen = new DanLang('Nguyễn (Nông dân)', hd)
const tran = new DanLang('Trần (Thợ gốm)', hd)
;[nguyen, tran].forEach(n => hd.them(n))
nguyen.guiDon('Xin nước tưới ruộng')`,
      },
    ],
    structure_notes: {
      en: 'Mediator interface declares communication methods. ConcreteMediaator coordinates components. Components hold a reference to the mediator and communicate through it.',
      vi: 'Giao diện Mediator khai báo các phương thức giao tiếp. ConcreteMediator điều phối các thành phần. Các thành phần giữ tham chiếu đến mediator và giao tiếp qua nó.',
    },
  },

  {
    id: 'memento',
    slug: 'memento',
    name: { en: 'Memento', vi: 'Kỷ Niệm' },
    category: 'behavioral',
    complexity: 2,
    popularity: 1,
    intent: {
      en: 'Without violating encapsulation, captures and externalizes an object\'s internal state so that the object can be restored to this state later.',
      vi: 'Mà không vi phạm đóng gói, nắm bắt và ngoại hóa trạng thái nội tại của đối tượng để đối tượng có thể được khôi phục về trạng thái này sau.',
    },
    problem: {
      en: 'You need to implement snapshots of an object\'s state, but making all fields public violates encapsulation. You need undo functionality without exposing internal state.',
      vi: 'Bạn cần triển khai ảnh chụp trạng thái của đối tượng, nhưng việc công khai tất cả các trường vi phạm đóng gói. Bạn cần chức năng undo mà không tiết lộ trạng thái nội tại.',
    },
    solution: {
      en: 'Delegate creating state snapshots to the owner (Originator). Store copies of the state in a Memento object. Only the originator can access memento\'s content.',
      vi: 'Ủy quyền tạo ảnh chụp trạng thái cho chủ sở hữu (Originator). Lưu trữ bản sao trạng thái trong đối tượng Memento. Chỉ có originator mới có thể truy cập nội dung memento.',
    },
    applicability: {
      en: 'Use when you want to produce snapshots of an object\'s state to be able to restore a previous state, or when direct access to the object\'s state would violate encapsulation.',
      vi: 'Sử dụng khi bạn muốn tạo ảnh chụp trạng thái của đối tượng để có thể khôi phục trạng thái trước đó, hoặc khi truy cập trực tiếp vào trạng thái đối tượng sẽ vi phạm đóng gói.',
    },
    vietnamese_example: {
      title: { en: 'Royal Historian (Sử Quan)', vi: 'Sử Quan - Ghi Chép Lịch Sử' },
      description: {
        en: 'The Royal Historian (Sử Quan) of the Vietnamese imperial court records the state of the kingdom at each major event: territorial boundaries, population, treasury. If the Emperor makes a disastrous decision, advisors can consult the Đại Việt Sử Ký (historical records) to restore policies to a previous prosperous state. The historian records the snapshots (Memento); the Emperor can restore from any recorded state.',
        vi: 'Sử Quan của triều đình Việt Nam ghi lại trạng thái vương quốc tại mỗi sự kiện lớn: biên giới lãnh thổ, dân số, ngân khố. Nếu Hoàng Đế đưa ra quyết định thảm khốc, các cố vấn có thể tham khảo Đại Việt Sử Ký để khôi phục chính sách về trạng thái thịnh vượng trước đó.',
      },
      illustration: '📚 Đại Việt Sử Ký\nVuaHung (Originator)\n  │ save() ──▶ SuKy (Memento)\n  │              {dan_so, kho}\n  │ restore() ◀─ SuKy\n  │\nSuQuan (Caretaker)\n  stores history[]',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from dataclasses import dataclass
from typing import List

@dataclass
class SuKy:
    """Memento - Historical record"""
    dan_so: int
    kho_bau: int
    lanh_tho: str
    nien_hieu: str

    def mo_ta(self):
        return f"[{self.nien_hieu}] Dân: {self.dan_so:,}, Kho: {self.kho_bau:,}đ, Lãnh thổ: {self.lanh_tho}"

class VuaHung:
    """Originator - The Emperor"""
    def __init__(self, nien_hieu: str):
        self.nien_hieu = nien_hieu
        self._dan_so = 1_000_000
        self._kho_bau = 5_000_000
        self._lanh_tho = "Văn Lang"

    def ban_chinh_sach(self, chinh_sach: str, thay_doi: dict):
        print(f"📜 {self.nien_hieu}: {chinh_sach}")
        self._dan_so += thay_doi.get('dan_so', 0)
        self._kho_bau += thay_doi.get('kho_bau', 0)

    def luu_su_ky(self) -> SuKy:
        return SuKy(self._dan_so, self._kho_bau, self._lanh_tho, self.nien_hieu)

    def khoi_phuc(self, su_ky: SuKy):
        print(f"↩️ Khôi phục về: {su_ky.mo_ta()}")
        self._dan_so = su_ky.dan_so
        self._kho_bau = su_ky.kho_bau
        self._lanh_tho = su_ky.lanh_tho

    def hien_trang(self):
        print(f"📊 Hiện trạng: Dân {self._dan_so:,}, Kho {self._kho_bau:,}đ")

class SuQuan:
    """Caretaker - Royal Historian"""
    def __init__(self):
        self._dai_viet_su_ky: List[SuKy] = []

    def ghi_chep(self, vua: VuaHung):
        su_ky = vua.luu_su_ky()
        self._dai_viet_su_ky.append(su_ky)
        print(f"📝 Sử quan ghi: {su_ky.mo_ta()}")

    def tra_cuu(self, index: int) -> SuKy:
        return self._dai_viet_su_ky[index]

# History of the kingdom
vua = VuaHung("Hùng Vương thứ Sáu")
su_quan = SuQuan()
su_quan.ghi_chep(vua)  # Save initial state

vua.ban_chinh_sach("Mở rộng canh tác", {"dan_so": 200_000, "kho_bau": 1_000_000})
su_quan.ghi_chep(vua)

vua.ban_chinh_sach("Chiến tranh thất bại 😢", {"dan_so": -500_000, "kho_bau": -3_000_000})
vua.hien_trang()

# Restore to better time
vua.khoi_phuc(su_quan.tra_cuu(1))
vua.hien_trang()`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `class SuKy {
  constructor(
    public readonly danSo: number,
    public readonly khoBau: number,
    public readonly nienHieu: string
  ) {}
  moTa() { return \`[\${this.nienHieu}] Dân: \${this.danSo.toLocaleString()}, Kho: \${this.khoBau.toLocaleString()}đ\` }
}

class VuaHung {
  private danSo = 1_000_000
  private khoBau = 5_000_000
  constructor(private nienHieu: string) {}

  banChinhSach(cs: string, ddSo: number, ddKho: number) {
    console.log(\`📜 \${cs}\`)
    this.danSo += ddSo; this.khoBau += ddKho
  }

  luuSuKy(): SuKy { return new SuKy(this.danSo, this.khoBau, this.nienHieu) }
  khoiPhuc(sk: SuKy) { this.danSo = sk.danSo; this.khoBau = sk.khoBau; console.log(\`↩️ \${sk.moTa()}\`) }
  hienTrang() { console.log(\`Dân: \${this.danSo.toLocaleString()}, Kho: \${this.khoBau.toLocaleString()}\`) }
}

const vua = new VuaHung('Hùng Vương VI')
const history: SuKy[] = []
history.push(vua.luuSuKy())
vua.banChinhSach('Chiến tranh', -500_000, -3_000_000)
vua.hienTrang()
vua.khoiPhuc(history[0]) // restore`,
      },
    ],
    structure_notes: {
      en: 'Originator creates mementos and uses them to restore state. Memento is a value object with no methods. Caretaker stores and retrieves mementos without inspecting them.',
      vi: 'Originator tạo memento và sử dụng chúng để khôi phục trạng thái. Memento là value object không có phương thức. Caretaker lưu trữ và truy xuất memento mà không kiểm tra chúng.',
    },
  },

  {
    id: 'observer',
    slug: 'observer',
    name: { en: 'Observer', vi: 'Quan Sát Viên' },
    category: 'behavioral',
    complexity: 2,
    popularity: 3,
    also_known_as: [
      { en: 'Event-Subscriber', vi: 'Người đăng ký sự kiện' },
      { en: 'Listener', vi: 'Trình lắng nghe' },
    ],
    intent: {
      en: 'Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.',
      vi: 'Định nghĩa mối quan hệ một-nhiều giữa các đối tượng để khi một đối tượng thay đổi trạng thái, tất cả các đối tượng phụ thuộc được thông báo và cập nhật tự động.',
    },
    problem: {
      en: 'You need to notify multiple objects about state changes in another object, without making assumptions about who those objects are.',
      vi: 'Bạn cần thông báo cho nhiều đối tượng về thay đổi trạng thái trong một đối tượng khác, mà không cần giả định những đối tượng đó là gì.',
    },
    solution: {
      en: 'Add a subscription mechanism to the publisher class so individual objects can subscribe/unsubscribe from events. When an event occurs, the publisher notifies all subscribers.',
      vi: 'Thêm cơ chế đăng ký vào lớp publisher để các đối tượng riêng lẻ có thể đăng ký/hủy đăng ký các sự kiện. Khi sự kiện xảy ra, publisher thông báo cho tất cả subscribers.',
    },
    applicability: {
      en: 'Use when changes to one object require changing others, and you don\'t know how many objects need to change. Use for implementing distributed event handling systems.',
      vi: 'Sử dụng khi thay đổi một đối tượng cần thay đổi các đối tượng khác và bạn không biết bao nhiêu đối tượng cần thay đổi. Sử dụng để triển khai hệ thống xử lý sự kiện phân tán.',
    },
    vietnamese_example: {
      title: { en: 'Trống Đồng (Bronze Drum) Signals', vi: 'Tiếng Trống Đồng - Tín Hiệu Làng' },
      description: {
        en: 'The legendary Trống Đồng (Bronze Drum) of the Đông Sơn culture was used to send signals across villages. When the drum (Subject/Publisher) beats with different rhythms, all villages subscribed to the signal respond: farmers drop plows, soldiers assemble, craftsmen stop work, traders close stalls. Each observer reacts differently to the same drum beat. This is pure Observer pattern: one publisher, many subscribers reacting to events.',
        vi: 'Trống Đồng huyền thoại của văn hóa Đông Sơn được dùng để gửi tín hiệu qua các làng. Khi trống (Subject/Publisher) đánh với các nhịp khác nhau, tất cả các làng đã đăng ký tín hiệu đều phản ứng: nông dân bỏ cày, chiến sĩ tập hợp, thợ thủ công dừng việc, thương nhân đóng hàng. Mỗi observer phản ứng khác nhau với cùng một tiếng trống.',
      },
      illustration: '🥁 Trống Đồng Publisher\n  đăng ký(nongDan)\n  đăng ký(chienSi)\n  đăng ký(thuNhan)\n       │\n       │ danh_trong("giặc đến!")\n       │\n    ┌──┼──┐\n    ▼  ▼  ▼\n  🌾 ⚔️ 🏪\n (each reacts differently)',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from typing import List

class NguoiNghe(ABC):
    """Observer interface"""
    @abstractmethod
    def phan_ung(self, tin_hieu: str): pass

class TrongDong:
    """Subject/Publisher - Bronze Drum"""
    def __init__(self):
        self._nguoi_nghe: List[NguoiNghe] = []

    def dang_ky(self, nguoi: NguoiNghe):
        self._nguoi_nghe.append(nguoi)

    def huy_dang_ky(self, nguoi: NguoiNghe):
        self._nguoi_nghe.remove(nguoi)

    def danh_trong(self, tin_hieu: str):
        print(f"🥁 Trống Đồng: '{tin_hieu}'")
        for nguoi in self._nguoi_nghe:
            nguoi.phan_ung(tin_hieu)

class NongDan(NguoiNghe):
    def __init__(self, ten: str): self.ten = ten
    def phan_ung(self, tin_hieu: str):
        if "giặc" in tin_hieu:
            print(f"🌾 {self.ten}: Bỏ cày xuống, chạy vào làng!")
        elif "lễ hội" in tin_hieu:
            print(f"🌾 {self.ten}: Mặc áo đẹp đi xem hội!")

class ChienSi(NguoiNghe):
    def __init__(self, ten: str): self.ten = ten
    def phan_ung(self, tin_hieu: str):
        if "giặc" in tin_hieu:
            print(f"⚔️ {self.ten}: Cầm vũ khí, tập hợp đội hình!")
        elif "lễ hội" in tin_hieu:
            print(f"⚔️ {self.ten}: Canh gác lễ hội!")

class ThuNhan(NguoiNghe):
    def __init__(self, ten: str): self.ten = ten
    def phan_ung(self, tin_hieu: str):
        if "giặc" in tin_hieu:
            print(f"🏪 {self.ten}: Đóng hàng, cất tiền!")
        elif "lễ hội" in tin_hieu:
            print(f"🏪 {self.ten}: Mở hàng bán đồ lễ hội!")

# Set up the drum and observers
trong_dong = TrongDong()
trong_dong.dang_ky(NongDan("Nguyễn A"))
trong_dong.dang_ky(ChienSi("Trần B"))
trong_dong.dang_ky(ThuNhan("Lê C"))

print("=== Tiếng trống báo giặc ===")
trong_dong.danh_trong("giặc đến!")

print("\n=== Tiếng trống báo lễ hội ===")
trong_dong.danh_trong("lễ hội Đền Hùng!")`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `interface NguoiNghe {
  phanUng(tinHieu: string): void
}

class TrongDong {
  private nguoiNghe: NguoiNghe[] = []
  dangKy(n: NguoiNghe) { this.nguoiNghe.push(n) }
  huyDangKy(n: NguoiNghe) { this.nguoiNghe = this.nguoiNghe.filter(x => x !== n) }

  danhTrong(tinHieu: string) {
    console.log(\`🥁 Trống Đồng: "\${tinHieu}"\`)
    this.nguoiNghe.forEach(n => n.phanUng(tinHieu))
  }
}

class NongDan implements NguoiNghe {
  constructor(private ten: string) {}
  phanUng(th: string) {
    console.log(\`🌾 \${this.ten}: \${th.includes('giặc') ? 'Chạy vào làng!' : 'Đi xem hội!'}\`)
  }
}

class ChienSi implements NguoiNghe {
  constructor(private ten: string) {}
  phanUng(th: string) {
    console.log(\`⚔️ \${this.ten}: \${th.includes('giặc') ? 'Tập hợp đội hình!' : 'Canh gác!'}\`)
  }
}

const trong = new TrongDong()
trong.dangKy(new NongDan('Nguyễn A'))
trong.dangKy(new ChienSi('Trần B'))
trong.danhTrong('giặc đến!')`,
      },
    ],
    structure_notes: {
      en: 'Publisher maintains a list of subscribers. When an event occurs, the publisher goes over the list and calls the notification method in each subscriber object.',
      vi: 'Publisher duy trì danh sách subscribers. Khi sự kiện xảy ra, publisher duyệt qua danh sách và gọi phương thức thông báo trong mỗi đối tượng subscriber.',
    },
  },

  {
    id: 'state',
    slug: 'state',
    name: { en: 'State', vi: 'Trạng Thái' },
    category: 'behavioral',
    complexity: 1,
    popularity: 2,
    intent: {
      en: 'Allows an object to alter its behavior when its internal state changes. The object will appear to change its class.',
      vi: 'Cho phép một đối tượng thay đổi hành vi của nó khi trạng thái nội tại thay đổi. Đối tượng sẽ xuất hiện như thể thay đổi lớp của nó.',
    },
    problem: {
      en: 'An object\'s behavior depends on its state, and it must change behavior at runtime based on that state. State-dependent code is scattered across many conditional statements.',
      vi: 'Hành vi của đối tượng phụ thuộc vào trạng thái của nó và nó phải thay đổi hành vi lúc chạy dựa trên trạng thái đó. Mã phụ thuộc vào trạng thái bị phân tán qua nhiều câu lệnh điều kiện.',
    },
    solution: {
      en: 'Create state objects for each state. The Context delegates state-dependent behavior to the current State object. State objects can transition to each other.',
      vi: 'Tạo đối tượng trạng thái cho mỗi trạng thái. Context ủy quyền hành vi phụ thuộc vào trạng thái cho đối tượng State hiện tại. Các đối tượng State có thể chuyển đổi lẫn nhau.',
    },
    applicability: {
      en: 'Use when an object\'s behavior depends on its state and it must change behavior at runtime, or when operations have large conditional statements that depend on the object\'s state.',
      vi: 'Sử dụng khi hành vi đối tượng phụ thuộc vào trạng thái và phải thay đổi lúc chạy, hoặc khi các thao tác có câu lệnh điều kiện lớn phụ thuộc vào trạng thái đối tượng.',
    },
    vietnamese_example: {
      title: { en: 'Rice Paddy Water Levels (Đồng Lúa)', vi: 'Ruộng Lúa - Các Giai Đoạn Sinh Trưởng' },
      description: {
        en: 'A Vietnamese rice paddy (đồng lúa) goes through distinct states: Cày bừa (plowing), Cấy lúa (transplanting seedlings), Đang Lớn (growing), Trổ Bông (flowering), Thu Hoạch (harvesting). The farmer\'s actions (water, fertilize, harvest) behave differently based on current state. Watering during "growing" helps; watering during "harvest" ruins the crop. The State pattern models each stage as an object.',
        vi: 'Ruộng lúa Việt Nam trải qua các giai đoạn khác nhau: Cày Bừa, Cấy Lúa, Đang Lớn, Trổ Bông, Thu Hoạch. Hành động của người nông dân (tưới nước, bón phân, gặt) hoạt động khác nhau tùy theo trạng thái hiện tại. Tưới nước khi "đang lớn" có ích; tưới khi "thu hoạch" làm hỏng mùa màng.',
      },
      illustration: '🌾 Vòng Đời Lúa\nCàyBừa ──▶ CấyLúa\n                │\n                ▼\n            ĐangLớn\n                │\n                ▼\n           TrổBông\n                │\n                ▼\n           ThuHoạch',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod

class GiaiDoanLua(ABC):
    """State interface"""
    @abstractmethod
    def tuoi_nuoc(self, ruong: 'RuongLua'): pass
    @abstractmethod
    def bon_phan(self, ruong: 'RuongLua'): pass
    @abstractmethod
    def gat_lua(self, ruong: 'RuongLua'): pass

class RuongLua:
    def __init__(self):
        self._giai_doan: GiaiDoanLua = CayBua()

    def doi_giai_doan(self, gd: GiaiDoanLua):
        print(f"  → Chuyển sang: {type(gd).__name__}")
        self._giai_doan = gd

    def tuoi_nuoc(self): self._giai_doan.tuoi_nuoc(self)
    def bon_phan(self): self._giai_doan.bon_phan(self)
    def gat_lua(self): self._giai_doan.gat_lua(self)

class CayBua(GiaiDoanLua):
    def tuoi_nuoc(self, r): print("🚜 Đang cày, chưa cần tưới")
    def bon_phan(self, r): print("🌱 Bón phân nền trước khi cấy"); r.doi_giai_doan(CayLua())
    def gat_lua(self, r): print("❌ Chưa có lúa để gặt!")

class CayLua(GiaiDoanLua):
    def tuoi_nuoc(self, r): print("💧 Giữ mực nước 5cm, tốt cho cây con"); r.doi_giai_doan(DangLon())
    def bon_phan(self, r): print("🌿 Bón đạm khi cấy xong")
    def gat_lua(self, r): print("❌ Lúa còn non!")

class DangLon(GiaiDoanLua):
    def tuoi_nuoc(self, r): print("💧 Tưới đều đặn, lúa đang lớn nhanh!")
    def bon_phan(self, r): print("🌿 Bón thúc lần 2"); r.doi_giai_doan(TroBong())
    def gat_lua(self, r): print("❌ Chưa đến vụ!")

class TroBong(GiaiDoanLua):
    def tuoi_nuoc(self, r): print("💧 Tưới nhẹ, lúa đang trổ bông vàng!")
    def bon_phan(self, r): print("⚠️ Không bón phân khi lúa trổ bông!")
    def gat_lua(self, r): print("🌾 Bắt đầu gặt!"); r.doi_giai_doan(ThuHoach())

class ThuHoach(GiaiDoanLua):
    def tuoi_nuoc(self, r): print("⚠️ Không tưới nước! Cần ruộng khô để gặt")
    def bon_phan(self, r): print("❌ Đang thu hoạch, không bón phân!")
    def gat_lua(self, r): print("🎉 Thu hoạch vụ mùa bội thu!")

ruong = RuongLua()
ruong.bon_phan()   # cày bừa → bón nền → cấy lúa
ruong.tuoi_nuoc()  # cấy lúa → tưới → đang lớn
ruong.bon_phan()   # đang lớn → bón thúc → trổ bông
ruong.gat_lua()    # trổ bông → gặt → thu hoạch
ruong.gat_lua()    # thu hoạch!`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `interface GiaiDoanLua {
  tuoiNuoc(ruong: RuongLua): void
  bonPhan(ruong: RuongLua): void
  gatLua(ruong: RuongLua): void
}

class RuongLua {
  private giaiDoan: GiaiDoanLua = new CayBua()
  doiGiaiDoan(gd: GiaiDoanLua) { this.giaiDoan = gd }
  tuoiNuoc() { this.giaiDoan.tuoiNuoc(this) }
  bonPhan() { this.giaiDoan.bonPhan(this) }
  gatLua() { this.giaiDoan.gatLua(this) }
}

class CayBua implements GiaiDoanLua {
  tuoiNuoc(r: RuongLua) { console.log('🚜 Đang cày') }
  bonPhan(r: RuongLua) { console.log('🌱 Bón nền'); r.doiGiaiDoan(new DangLon()) }
  gatLua(r: RuongLua) { console.log('❌ Chưa có lúa!') }
}

class DangLon implements GiaiDoanLua {
  tuoiNuoc(r: RuongLua) { console.log('💧 Tưới đều, lúa lớn nhanh!') }
  bonPhan(r: RuongLua) { console.log('🌿 Bón thúc'); r.doiGiaiDoan(new ThuHoach()) }
  gatLua(r: RuongLua) { console.log('❌ Chưa đến vụ!') }
}

class ThuHoach implements GiaiDoanLua {
  tuoiNuoc(r: RuongLua) { console.log('⚠️ Không tưới khi gặt!') }
  bonPhan(r: RuongLua) { console.log('❌ Đang thu hoạch!') }
  gatLua(r: RuongLua) { console.log('🎉 Thu hoạch bội thu!') }
}

const ruong = new RuongLua()
ruong.bonPhan()
ruong.tuoiNuoc()
ruong.gatLua()`,
      },
    ],
    structure_notes: {
      en: 'Context stores a reference to one of the concrete State objects and delegates state-specific work to it. States can transition the context to another state.',
      vi: 'Context lưu tham chiếu đến một đối tượng State cụ thể và ủy quyền công việc theo trạng thái cho nó. Các State có thể chuyển đổi context sang trạng thái khác.',
    },
  },

  {
    id: 'strategy',
    slug: 'strategy',
    name: { en: 'Strategy', vi: 'Chiến Lược' },
    category: 'behavioral',
    complexity: 1,
    popularity: 3,
    intent: {
      en: 'Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.',
      vi: 'Định nghĩa một họ thuật toán, đóng gói từng cái và làm cho chúng có thể hoán đổi cho nhau. Strategy cho phép thuật toán biến thiên độc lập với client sử dụng nó.',
    },
    problem: {
      en: 'You have multiple ways to perform an operation, and you want to switch between them at runtime without many conditional statements.',
      vi: 'Bạn có nhiều cách thực hiện một thao tác và muốn chuyển đổi giữa chúng lúc chạy mà không có nhiều câu lệnh điều kiện.',
    },
    solution: {
      en: 'Extract all algorithms into separate classes called strategies. The Context stores a strategy and delegates the work to it. Client passes the desired strategy to the context.',
      vi: 'Trích xuất tất cả thuật toán vào các lớp riêng biệt gọi là strategy. Context lưu trữ một strategy và ủy quyền công việc cho nó. Client truyền strategy mong muốn cho context.',
    },
    applicability: {
      en: 'Use when you want to swap algorithms inside an object at runtime, or when you have many similar classes differing only in the way they execute some behavior.',
      vi: 'Sử dụng khi muốn hoán đổi thuật toán bên trong đối tượng lúc chạy, hoặc khi có nhiều lớp tương tự chỉ khác nhau ở cách thực hiện một số hành vi.',
    },
    vietnamese_example: {
      title: { en: 'Martial Arts Schools (Võ Phái)', vi: 'Các Võ Phái Việt Nam' },
      description: {
        en: 'Vietnamese martial arts (Võ cổ truyền) has many different schools (võ phái): Bình Định Võ with powerful strikes, Võ Tây Sơn with fast multiple attacks, Thiếu Lâm with defensive blocks. A warrior (Context) can choose which style (Strategy) to use in different situations — powerful strikes against an armored opponent, fast attacks against multiple opponents. The warrior\'s "fight" method delegates to whichever strategy is selected.',
        vi: 'Võ cổ truyền Việt Nam có nhiều võ phái khác nhau: Võ Bình Định với đòn mạnh, Võ Tây Sơn với tấn công nhanh, Thiếu Lâm với phòng thủ. Một võ sĩ (Context) có thể chọn phong cách nào (Strategy) để sử dụng trong các tình huống khác nhau. Phương thức "chiến đấu" của võ sĩ ủy quyền cho bất kỳ strategy nào được chọn.',
      },
      illustration: '⚔️ Võ Phái Strategy\nVoSi (Context)\n  - vo_phong: VoPhai\n  + chien_dau()\n       │ delegates to\n  ┌────┼────┐\n  ▼    ▼    ▼\nBình Tây  Thiếu\nĐịnh Sơn  Lâm\n💪  ⚡   🛡️',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod

class VoPhai(ABC):
    """Strategy interface"""
    @abstractmethod
    def tan_cong(self, doi_thu: str) -> str: pass

class VoBinhDinh(VoPhai):
    """Powerful strikes - Bình Định style"""
    def tan_cong(self, doi_thu: str) -> str:
        return f"💪 Võ Bình Định: Đánh 'Song Phi' vào {doi_thu}! Uy lực tối đa!"

class VoTaySon(VoPhai):
    """Fast multiple attacks - Tây Sơn style"""
    def tan_cong(self, doi_thu: str) -> str:
        return f"⚡ Võ Tây Sơn: Liên hoàn 7 đòn vào {doi_thu}! Tốc độ như điện!"

class VoThieuLam(VoPhai):
    """Defensive blocking - Thiếu Lâm style"""
    def tan_cong(self, doi_thu: str) -> str:
        return f"🛡️ Thiếu Lâm: Phòng thủ rồi phản đòn {doi_thu}! Lấy nhu chế cương!"

class VoSi:
    """Context"""
    def __init__(self, ten: str, vo_phong: VoPhai):
        self.ten = ten
        self._vo_phong = vo_phong

    def doi_vo_phong(self, vo_phong: VoPhai):
        print(f"🔄 {self.ten} đổi sang: {type(vo_phong).__name__}")
        self._vo_phong = vo_phong

    def chien_dau(self, doi_thu: str):
        ket_qua = self._vo_phong.tan_cong(doi_thu)
        print(f"⚔️ {self.ten}: {ket_qua}")

# A warrior choosing different strategies
hero = VoSi("Nguyễn Huệ", VoBinhDinh())
hero.chien_dau("giặc Thanh")

hero.doi_vo_phong(VoTaySon())  # Switch strategy at runtime
hero.chien_dau("kẻ thù bao vây")

hero.doi_vo_phong(VoThieuLam())
hero.chien_dau("đòn tấn công mạnh")`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `interface VoPhai {
  tanCong(doiThu: string): string
}

class VoBinhDinh implements VoPhai {
  tanCong(dt: string) { return \`💪 Đánh Song Phi vào \${dt}!\` }
}

class VoTaySon implements VoPhai {
  tanCong(dt: string) { return \`⚡ Liên hoàn 7 đòn vào \${dt}!\` }
}

class VoThieuLam implements VoPhai {
  tanCong(dt: string) { return \`🛡️ Phòng thủ rồi phản đòn \${dt}!\` }
}

class VoSi {
  constructor(private ten: string, private voPhai: VoPhai) {}

  doiVoPhai(vp: VoPhai) { this.voPhai = vp }

  chienDau(doiThu: string) {
    console.log(\`⚔️ \${this.ten}: \${this.voPhai.tanCong(doiThu)}\`)
  }
}

const hero = new VoSi('Nguyễn Huệ', new VoBinhDinh())
hero.chienDau('giặc Thanh')
hero.doiVoPhai(new VoTaySon())
hero.chienDau('kẻ thù bao vây')`,
      },
    ],
    structure_notes: {
      en: 'Context maintains a reference to one of the strategy objects. Strategy interface declares the algorithm method. ConcreteStrategies implement different algorithm variations.',
      vi: 'Context duy trì tham chiếu đến một đối tượng strategy. Giao diện Strategy khai báo phương thức thuật toán. ConcreteStrategy triển khai các biến thể thuật toán khác nhau.',
    },
  },

  {
    id: 'template-method',
    slug: 'template-method',
    name: { en: 'Template Method', vi: 'Phương Thức Khuôn Mẫu' },
    category: 'behavioral',
    complexity: 1,
    popularity: 2,
    intent: {
      en: 'Defines the skeleton of an algorithm in the base class, letting subclasses override specific steps without changing the algorithm\'s overall structure.',
      vi: 'Định nghĩa bộ khung của thuật toán trong lớp cơ sở, để các lớp con ghi đè các bước cụ thể mà không thay đổi cấu trúc tổng thể của thuật toán.',
    },
    problem: {
      en: 'You have multiple classes that contain almost identical algorithms with minor differences. The overall structure should be fixed, but individual steps can vary.',
      vi: 'Bạn có nhiều lớp chứa các thuật toán gần như giống nhau với sự khác biệt nhỏ. Cấu trúc tổng thể phải được cố định, nhưng các bước riêng lẻ có thể biến thiên.',
    },
    solution: {
      en: 'Break the algorithm into steps and define the overall sequence in a base class method. Let subclasses override steps but keep the template method intact.',
      vi: 'Chia thuật toán thành các bước và định nghĩa trình tự tổng thể trong phương thức lớp cơ sở. Cho phép các lớp con ghi đè các bước nhưng giữ nguyên phương thức khuôn mẫu.',
    },
    applicability: {
      en: 'Use when you want clients to extend only particular steps of an algorithm, but not the whole algorithm and its structure.',
      vi: 'Sử dụng khi muốn client chỉ mở rộng các bước cụ thể của thuật toán, nhưng không phải toàn bộ thuật toán và cấu trúc của nó.',
    },
    vietnamese_example: {
      title: { en: 'Cooking Traditional Vietnamese Soup', vi: 'Nấu Canh Truyền Thống Việt Nam' },
      description: {
        en: 'Every Vietnamese soup (canh) follows the same template: 1) Prepare broth (nước dùng), 2) Add main ingredient, 3) Season with fish sauce (nước mắm), 4) Garnish and serve. But the specific steps differ by dish: Canh Chua (sour soup) uses tamarind + fish, Canh Bí (gourd soup) uses pork + gourd, Bún Bò Huế uses lemongrass + beef. The template is fixed; the steps are customized.',
        vi: 'Mỗi món canh Việt Nam đều theo cùng một khuôn mẫu: 1) Chuẩn bị nước dùng, 2) Thêm nguyên liệu chính, 3) Nêm nếm với nước mắm, 4) Trang trí và phục vụ. Nhưng các bước cụ thể khác nhau theo món: Canh Chua dùng me + cá, Canh Bí dùng thịt heo + bí, Bún Bò Huế dùng sả + bò.',
      },
      illustration: '🍲 Khuôn Nấu Canh\nNauCanh.nau() [Template]\n  │\n  ├── 1. chuan_bi_nuoc_dung() ← override\n  ├── 2. them_nguyen_lieu()    ← override\n  ├── 3. nem_nem()  [fish sauce - fixed]\n  └── 4. trang_tri()          ← override\n\nCanhChua  CanhBi  BunBoHue',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod

class NauCanh(ABC):
    """Template Method - Abstract cooking class"""

    def nau(self):
        """Template method - defines the algorithm skeleton"""
        print(f"🍲 Bắt đầu nấu {self.ten_mon()}...")
        self.chuan_bi_nuoc_dung()
        self.them_nguyen_lieu()
        self.nem_nem()  # Fixed step - always use fish sauce
        self.trang_tri()
        print(f"✅ {self.ten_mon()} hoàn thành!\n")

    @abstractmethod
    def ten_mon(self) -> str: pass

    @abstractmethod
    def chuan_bi_nuoc_dung(self): pass

    @abstractmethod
    def them_nguyen_lieu(self): pass

    def nem_nem(self):
        """Fixed step - Vietnamese always season with nước mắm"""
        print("  🐟 Nêm nước mắm Phú Quốc, muối, đường...")

    @abstractmethod
    def trang_tri(self): pass

class CanhChua(NauCanh):
    def ten_mon(self): return "Canh Chua Cá Lóc"
    def chuan_bi_nuoc_dung(self): print("  🍅 Nấu nước dùng với cà chua và me chua")
    def them_nguyen_lieu(self): print("  🐟 Thêm cá lóc, dứa, giá đỗ")
    def trang_tri(self): print("  🌿 Rắc ngò gai và ớt đỏ lên trên")

class CanhBi(NauCanh):
    def ten_mon(self): return "Canh Bí Xương"
    def chuan_bi_nuoc_dung(self): print("  🦴 Hầm xương heo 2 tiếng")
    def them_nguyen_lieu(self): print("  🥬 Thêm bí đao và hành tím")
    def trang_tri(self): print("  🌿 Rắc hành lá xắt nhỏ")

class BunBoHue(NauCanh):
    def ten_mon(self): return "Bún Bò Huế"
    def chuan_bi_nuoc_dung(self): print("  🌿 Hầm xương bò với sả và mắm ruốc Huế")
    def them_nguyen_lieu(self): print("  🥩 Thêm thịt bò, chả cua, huyết")
    def trang_tri(self): print("  🌶️ Rắc hành tím, rau sống, ớt sa tế")

# Cook different soups using the same template
for mon in [CanhChua(), CanhBi(), BunBoHue()]:
    mon.nau()`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `abstract class NauCanh {
  nau(): void {
    console.log(\`🍲 Nấu \${this.tenMon()}...\`)
    this.chuanBiNuocDung()
    this.themNguyenLieu()
    this.nemNem()
    this.trangTri()
    console.log(\`✅ \${this.tenMon()} xong!\n\`)
  }

  abstract tenMon(): string
  abstract chuanBiNuocDung(): void
  abstract themNguyenLieu(): void
  abstract trangTri(): void

  private nemNem(): void {
    console.log('  🐟 Nêm nước mắm Phú Quốc...')
  }
}

class CanhChua extends NauCanh {
  tenMon() { return 'Canh Chua Cá Lóc' }
  chuanBiNuocDung() { console.log('  🍅 Nấu nước me chua + cà chua') }
  themNguyenLieu() { console.log('  🐟 Thêm cá lóc + dứa + giá') }
  trangTri() { console.log('  🌿 Ngò gai + ớt đỏ') }
}

class BunBoHue extends NauCanh {
  tenMon() { return 'Bún Bò Huế' }
  chuanBiNuocDung() { console.log('  🌿 Hầm xương bò + sả + mắm ruốc') }
  themNguyenLieu() { console.log('  🥩 Thịt bò + chả cua + huyết') }
  trangTri() { console.log('  🌶️ Hành tím + rau sống + sa tế') }
}

new CanhChua().nau()
new BunBoHue().nau()`,
      },
    ],
    structure_notes: {
      en: 'Abstract Class defines the template method and abstract primitive operations. Concrete Class implements the primitive operations to carry out subclass-specific steps.',
      vi: 'Lớp Abstract định nghĩa phương thức khuôn mẫu và các thao tác nguyên thủy trừu tượng. Concrete Class triển khai các thao tác nguyên thủy cho các bước theo lớp con.',
    },
  },

  {
    id: 'visitor',
    slug: 'visitor',
    name: { en: 'Visitor', vi: 'Khách Thăm' },
    category: 'behavioral',
    complexity: 3,
    popularity: 1,
    intent: {
      en: 'Lets you add further operations to objects without modifying them. Defines a new operation to be performed on elements of an object structure.',
      vi: 'Cho phép bạn thêm các thao tác vào đối tượng mà không sửa đổi chúng. Định nghĩa thao tác mới cần thực hiện trên các phần tử của cấu trúc đối tượng.',
    },
    problem: {
      en: 'You need to add new operations to a class hierarchy without modifying those classes. The operations don\'t logically belong to those classes.',
      vi: 'Bạn cần thêm các thao tác mới vào hệ thống phân cấp lớp mà không sửa đổi các lớp đó. Các thao tác không thuộc về các lớp đó một cách hợp lý.',
    },
    solution: {
      en: 'Place new behavior into a separate class called a visitor. The objects that need the behavior accept visitors and call the appropriate visitor method.',
      vi: 'Đặt hành vi mới vào một lớp riêng biệt gọi là visitor. Các đối tượng cần hành vi chấp nhận visitor và gọi phương thức visitor thích hợp.',
    },
    applicability: {
      en: 'Use when you need to perform operations on all elements of a complex object structure, or when you want to collect related operations into one class.',
      vi: 'Sử dụng khi cần thực hiện các thao tác trên tất cả phần tử của cấu trúc đối tượng phức tạp, hoặc khi muốn thu thập các thao tác liên quan vào một lớp.',
    },
    vietnamese_example: {
      title: { en: 'Tax Collector Visiting Guilds', vi: 'Quan Thu Thuế Thăm Các Phường Hội' },
      description: {
        en: 'In ancient Vietnamese cities (kinh thành), a Royal Tax Collector (Quan Thu Thuế) visits different guilds: Silk Weavers (Phường Dệt Lụa), Potters (Phường Gốm Sứ), Carpenters (Phường Mộc). Each guild has a different tax calculation method, but the guilds themselves don\'t need to know about tax — they just accept the collector. A second visitor (Royal Auditor) can inspect the same guilds for quality instead. New visitor types (health inspector, census taker) can be added without changing the guilds.',
        vi: 'Trong kinh thành Việt Nam cổ, Quan Thu Thuế đến thăm các phường hội khác nhau: Phường Dệt Lụa, Phường Gốm Sứ, Phường Mộc. Mỗi phường có phương pháp tính thuế khác nhau, nhưng bản thân các phường không cần biết về thuế — họ chỉ cần chấp nhận người thu thuế.',
      },
      illustration: '🏛️ Quan Thu Thuế Visitor\n\nPhuongHoi ──accept(visitor)──▶\n  │                    ThuThueVisitor\n  ├─ PhuongDetLua         visit(lua)\n  ├─ PhuongGomSu    or    visit(gom)\n  └─ PhuongMoc            visit(moc)\n\nNew visitor = new operations!',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod

class PhuongHoi(ABC):
    @abstractmethod
    def chap_nhan(self, visitor: 'KhachTham'): pass
    @property
    @abstractmethod
    def doanh_thu(self) -> int: pass

class PhuongDetLua(PhuongHoi):
    @property
    def doanh_thu(self): return 10_000_000
    def chap_nhan(self, visitor): visitor.tham_phuong_det_lua(self)
    def __str__(self): return "Phường Dệt Lụa"

class PhuongGomSu(PhuongHoi):
    @property
    def doanh_thu(self): return 5_000_000
    def chap_nhan(self, visitor): visitor.tham_phuong_gom_su(self)
    def __str__(self): return "Phường Gốm Sứ"

class PhuongMoc(PhuongHoi):
    @property
    def doanh_thu(self): return 8_000_000
    def chap_nhan(self, visitor): visitor.tham_phuong_moc(self)
    def __str__(self): return "Phường Mộc"

class KhachTham(ABC):
    @abstractmethod
    def tham_phuong_det_lua(self, p: PhuongDetLua): pass
    @abstractmethod
    def tham_phuong_gom_su(self, p: PhuongGomSu): pass
    @abstractmethod
    def tham_phuong_moc(self, p: PhuongMoc): pass

class QuanThuThue(KhachTham):
    """Visitor 1: Tax collection"""
    def tham_phuong_det_lua(self, p):
        thue = p.doanh_thu * 0.10
        print(f"💰 Thuế {p} (lụa): {thue:,.0f}đ (10%)")

    def tham_phuong_gom_su(self, p):
        thue = p.doanh_thu * 0.08
        print(f"💰 Thuế {p} (gốm): {thue:,.0f}đ (8%)")

    def tham_phuong_moc(self, p):
        thue = p.doanh_thu * 0.12
        print(f"💰 Thuế {p} (mộc): {thue:,.0f}đ (12%)")

class QuanKiemTra(KhachTham):
    """Visitor 2: Quality audit - different operation, same structure"""
    def tham_phuong_det_lua(self, p): print(f"🔍 Kiểm tra chất lượng lụa: ✅ Đạt tiêu chuẩn")
    def tham_phuong_gom_su(self, p): print(f"🔍 Kiểm tra gốm sứ: ⚠️ Cần cải thiện men gốm")
    def tham_phuong_moc(self, p): print(f"🔍 Kiểm tra đồ mộc: ✅ Gỗ tốt, kỹ thuật đỉnh")

phuong_hoi = [PhuongDetLua(), PhuongGomSu(), PhuongMoc()]

print("=== QUAN THU THUẾ ===")
quan_thue = QuanThuThue()
for ph in phuong_hoi:
    ph.chap_nhan(quan_thue)

print("\n=== QUAN KIỂM TRA ===")
quan_kt = QuanKiemTra()
for ph in phuong_hoi:
    ph.chap_nhan(quan_kt)`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `interface KhachTham {
  thamPhuongDetLua(p: PhuongDetLua): void
  thamPhuongGomSu(p: PhuongGomSu): void
  thamPhuongMoc(p: PhuongMoc): void
}

abstract class PhuongHoi {
  abstract chapNhan(visitor: KhachTham): void
  abstract get doanhThu(): number
}

class PhuongDetLua extends PhuongHoi {
  get doanhThu() { return 10_000_000 }
  chapNhan(v: KhachTham) { v.thamPhuongDetLua(this) }
}

class PhuongGomSu extends PhuongHoi {
  get doanhThu() { return 5_000_000 }
  chapNhan(v: KhachTham) { v.thamPhuongGomSu(this) }
}

class PhuongMoc extends PhuongHoi {
  get doanhThu() { return 8_000_000 }
  chapNhan(v: KhachTham) { v.thamPhuongMoc(this) }
}

class QuanThuThue implements KhachTham {
  thamPhuongDetLua(p: PhuongDetLua) { console.log(\`💰 Lụa: \${p.doanhThu * 0.1}đ thuế\`) }
  thamPhuongGomSu(p: PhuongGomSu) { console.log(\`💰 Gốm: \${p.doanhThu * 0.08}đ thuế\`) }
  thamPhuongMoc(p: PhuongMoc) { console.log(\`💰 Mộc: \${p.doanhThu * 0.12}đ thuế\`) }
}

const guilds: PhuongHoi[] = [new PhuongDetLua(), new PhuongGomSu(), new PhuongMoc()]
const thuThue = new QuanThuThue()
guilds.forEach(g => g.chapNhan(thuThue))`,
      },
    ],
    structure_notes: {
      en: 'Visitor interface declares visit methods for each ConcreteElement. Element interface declares accept(visitor) method. ConcreteVisitors implement operations without modifying elements.',
      vi: 'Giao diện Visitor khai báo các phương thức visit cho mỗi ConcreteElement. Giao diện Element khai báo phương thức accept(visitor). ConcreteVisitor triển khai các thao tác mà không sửa đổi các phần tử.',
    },
  },
]
