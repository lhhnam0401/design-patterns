import type { Pattern } from '../types/pattern'

export const structuralPatterns: Pattern[] = [
  {
    id: 'adapter',
    slug: 'adapter',
    name: { en: 'Adapter', vi: 'Bộ Chuyển Đổi' },
    category: 'structural',
    complexity: 1,
    popularity: 3,
    also_known_as: [{ en: 'Wrapper', vi: 'Bao bọc' }],
    intent: {
      en: 'Converts the interface of a class into another interface that clients expect. Adapter lets classes work together that couldn\'t otherwise because of incompatible interfaces.',
      vi: 'Chuyển đổi giao diện của một lớp thành giao diện khác mà client mong đợi. Adapter cho phép các lớp làm việc cùng nhau mà không thể làm được do giao diện không tương thích.',
    },
    problem: {
      en: 'You have an existing class with a useful interface, but it\'s incompatible with the interface expected by your client code.',
      vi: 'Bạn có một lớp hiện có với giao diện hữu ích, nhưng nó không tương thích với giao diện mà mã client mong đợi.',
    },
    solution: {
      en: 'Create an adapter class that wraps the incompatible object and translates calls to the interface the client expects.',
      vi: 'Tạo lớp adapter bao bọc đối tượng không tương thích và dịch các lệnh gọi sang giao diện mà client mong đợi.',
    },
    applicability: {
      en: 'Use when you want to use an existing class but its interface is incompatible with the rest of your code, or when you want to reuse several existing subclasses that lack common functionality.',
      vi: 'Sử dụng khi bạn muốn dùng một lớp hiện có nhưng giao diện của nó không tương thích với phần còn lại của mã, hoặc khi muốn tái sử dụng một số lớp con hiện có thiếu chức năng chung.',
    },
    vietnamese_example: {
      title: { en: 'Đàn Tranh → MIDI Adapter', vi: 'Đàn Tranh → Bộ Chuyển MIDI' },
      description: {
        en: 'A traditional Vietnamese Đàn Tranh (zither) plays music through plucking strings. A modern digital audio workstation expects MIDI signals. An adapter (bộ chuyển đổi) sits between the Đàn Tranh and the DAW, converting the string vibrations into MIDI notes. The musician plays normally; the software receives standard digital signals. The Đàn Tranh (Adaptee) didn\'t need to change — the adapter bridged the gap.',
        vi: 'Đàn Tranh truyền thống Việt Nam phát nhạc qua việc gảy dây. Phần mềm âm thanh kỹ thuật số hiện đại mong đợi tín hiệu MIDI. Một adapter (bộ chuyển đổi) nằm giữa Đàn Tranh và DAW, chuyển đổi rung động dây thành nốt MIDI. Người nhạc sĩ chơi bình thường; phần mềm nhận tín hiệu kỹ thuật số chuẩn. Đàn Tranh (Adaptee) không cần thay đổi — adapter đã thu hẹp khoảng cách.',
      },
      illustration: '🎵 Đàn Tranh → MIDI\n\n[Đàn Tranh] ──gảy──▶ [DanTranhAdapter]\n (Adaptee)              │ pluck(string)\n                        │ converts to...\n                        ▼\n                   sendMidi(note, vel)\n                        │\n                        ▼\n                  [DAW Software]\n                   (Client)',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `class DanTranh:
    """Đàn Tranh - Traditional Vietnamese zither (Adaptee)"""
    def gay_day(self, day_so: int) -> str:
        notes = {1: "Hò", 2: "Xự", 3: "Xang", 4: "Xê", 5: "Cống"}
        return f"🎵 {notes.get(day_so, 'Phụ âm')} (dây {day_so})"

class MidiDevice:
    """Interface that modern software expects (Target)"""
    def send_midi(self, note: int, velocity: int) -> str:
        raise NotImplementedError

class DanTranhMidiAdapter(MidiDevice):
    """Adapter: bridges Đàn Tranh → MIDI protocol"""
    def __init__(self, dan_tranh: DanTranh):
        self._dan_tranh = dan_tranh

    def send_midi(self, note: int, velocity: int) -> str:
        # Map MIDI note to string number
        string_num = (note % 5) + 1
        am_thanh = self._dan_tranh.gay_day(string_num)
        return f"MIDI Note {note} (vel={velocity}) → {am_thanh}"

# Client code only knows MidiDevice interface
def record_music(device: MidiDevice, notes: list[int]):
    print("🎙️ Bắt đầu ghi âm...")
    for note in notes:
        print(f"  {device.send_midi(note, 80)}")

# Use Đàn Tranh through adapter
dan_tranh = DanTranh()
adapter = DanTranhMidiAdapter(dan_tranh)
record_music(adapter, [60, 62, 64, 65, 67])`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `class DanTranh {
  gayDay(dayNumber: number): string {
    const notes: Record<number, string> = { 1:'Hò', 2:'Xự', 3:'Xang', 4:'Xê', 5:'Cống' }
    return \`🎵 \${notes[dayNumber] ?? 'Note'} (dây \${dayNumber})\`
  }
}

interface MidiDevice {
  sendMidi(note: number, velocity: number): string
}

class DanTranhMidiAdapter implements MidiDevice {
  constructor(private danTranh: DanTranh) {}

  sendMidi(note: number, velocity: number): string {
    const stringNum = (note % 5) + 1
    const sound = this.danTranh.gayDay(stringNum)
    return \`MIDI \${note} (vel=\${velocity}) → \${sound}\`
  }
}

function recordMusic(device: MidiDevice, notes: number[]) {
  notes.forEach(note => console.log(device.sendMidi(note, 80)))
}

const adapter = new DanTranhMidiAdapter(new DanTranh())
recordMusic(adapter, [60, 62, 64, 65, 67])`,
      },
    ],
    structure_notes: {
      en: 'The Adapter implements the target interface and holds a reference to the Adaptee. It translates calls from the target interface to Adaptee methods.',
      vi: 'Adapter triển khai giao diện target và giữ tham chiếu đến Adaptee. Nó dịch các lệnh gọi từ giao diện target sang các phương thức của Adaptee.',
    },
  },

  {
    id: 'bridge',
    slug: 'bridge',
    name: { en: 'Bridge', vi: 'Cầu Nối' },
    category: 'structural',
    complexity: 3,
    popularity: 1,
    intent: {
      en: 'Decouples an abstraction from its implementation so that the two can vary independently.',
      vi: 'Tách rời một trừu tượng khỏi triển khai của nó để cả hai có thể thay đổi độc lập.',
    },
    problem: {
      en: 'You have a class hierarchy that grows exponentially when combining multiple dimensions of variation. Bridge separates the concerns into independent hierarchies.',
      vi: 'Bạn có một hệ thống phân cấp lớp tăng trưởng theo cấp số nhân khi kết hợp nhiều chiều biến thể. Bridge tách các mối quan tâm thành các hệ thống phân cấp độc lập.',
    },
    solution: {
      en: 'Split the classes into two hierarchies: abstraction (high-level control) and implementation (platform-specific work). Connect them via composition.',
      vi: 'Chia các lớp thành hai hệ thống phân cấp: trừu tượng (điều khiển cấp cao) và triển khai (công việc theo nền tảng). Kết nối chúng qua thành phần.',
    },
    applicability: {
      en: 'Use when you want to divide a monolithic class that has several variants, or when you need to extend a class in several independent dimensions.',
      vi: 'Sử dụng khi bạn muốn phân chia một lớp nguyên khối có nhiều biến thể, hoặc khi cần mở rộng lớp theo nhiều chiều độc lập.',
    },
    vietnamese_example: {
      title: { en: 'Áo Dài Styles & Fabrics', vi: 'Áo Dài - Kiểu Dáng & Chất Liệu' },
      description: {
        en: 'Vietnamese Áo Dài has two independent dimensions: Style (Traditional Huế, Modern Tân thời, Cách tân Reformed) and Fabric (Silk tơ lụa, Brocade gấm, Cotton). Without Bridge, you\'d need 9 classes (3 styles × 3 fabrics). With Bridge, the Style (abstraction) holds a reference to a Fabric (implementation). You can mix any style with any fabric independently.',
        vi: 'Áo Dài Việt Nam có hai chiều độc lập: Kiểu dáng (Truyền thống Huế, Hiện đại Tân thời, Cách tân) và Chất liệu (Tơ lụa, Gấm, Cotton). Không có Bridge, bạn cần 9 lớp (3 kiểu × 3 chất liệu). Với Bridge, Kiểu dáng (trừu tượng) giữ tham chiếu đến Chất liệu (triển khai). Bạn có thể kết hợp bất kỳ kiểu nào với bất kỳ chất liệu nào một cách độc lập.',
      },
      illustration: '👘 Áo Dài Bridge Pattern\nAbstraction        Implementation\n  KieuDang    ────▶  ChatLieu\n  │                  │\n  ├─ TruyenThong    ├─ ToLua\n  ├─ TanThoi        ├─ Gam\n  └─ CachTan        └─ Cotton\n\n(3+3 classes, not 3×3=9)',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod

# Implementation hierarchy (Fabric)
class ChatLieu(ABC):
    @abstractmethod
    def mo_ta(self) -> str: pass

class ToLua(ChatLieu):
    def mo_ta(self): return "🪡 Tơ lụa mềm mại"

class Gam(ChatLieu):
    def mo_ta(self): return "🧵 Gấm thêu hoa văn"

class Cotton(ChatLieu):
    def mo_ta(self): return "🌿 Cotton thoáng mát"

# Abstraction hierarchy (Style)
class KieuDang(ABC):
    def __init__(self, chat_lieu: ChatLieu):
        self._chat_lieu = chat_lieu  # Bridge!

    @abstractmethod
    def mo_ta_ao_dai(self) -> str: pass

class TruyenThong(KieuDang):
    def mo_ta_ao_dai(self):
        return f"👘 Áo Dài Truyền Thống Huế + {self._chat_lieu.mo_ta()}"

class TanThoi(KieuDang):
    def mo_ta_ao_dai(self):
        return f"👗 Áo Dài Tân Thời + {self._chat_lieu.mo_ta()}"

class CachTan(KieuDang):
    def mo_ta_ao_dai(self):
        return f"✨ Áo Dài Cách Tân + {self._chat_lieu.mo_ta()}"

# Mix any style with any fabric independently
print(TruyenThong(ToLua()).mo_ta_ao_dai())
print(TanThoi(Gam()).mo_ta_ao_dai())
print(CachTan(Cotton()).mo_ta_ao_dai())`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `interface ChatLieu {
  moTa(): string
}

class ToLua implements ChatLieu { moTa() { return '🪡 Tơ lụa mềm mại' } }
class Gam implements ChatLieu { moTa() { return '🧵 Gấm thêu hoa văn' } }
class Cotton implements ChatLieu { moTa() { return '🌿 Cotton thoáng mát' } }

abstract class KieuDang {
  constructor(protected chatLieu: ChatLieu) {}
  abstract moTaAoDai(): string
}

class TruyenThong extends KieuDang {
  moTaAoDai() { return \`👘 Truyền Thống Huế + \${this.chatLieu.moTa()}\` }
}

class TanThoi extends KieuDang {
  moTaAoDai() { return \`👗 Tân Thời + \${this.chatLieu.moTa()}\` }
}

// Mix freely
console.log(new TruyenThong(new ToLua()).moTaAoDai())
console.log(new TanThoi(new Gam()).moTaAoDai())`,
      },
    ],
    structure_notes: {
      en: 'Abstraction contains a reference to Implementation. RefinedAbstraction extends Abstraction. ConcreteImplementation provides platform-specific implementations.',
      vi: 'Abstraction chứa tham chiếu đến Implementation. RefinedAbstraction mở rộng Abstraction. ConcreteImplementation cung cấp các triển khai theo nền tảng cụ thể.',
    },
  },

  {
    id: 'composite',
    slug: 'composite',
    name: { en: 'Composite', vi: 'Tổ Hợp' },
    category: 'structural',
    complexity: 2,
    popularity: 2,
    intent: {
      en: 'Composes objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions uniformly.',
      vi: 'Tổ hợp các đối tượng thành cấu trúc cây để đại diện cho hệ thống phân cấp bộ phận-toàn thể. Composite cho phép client xử lý các đối tượng riêng lẻ và tổ hợp một cách thống nhất.',
    },
    problem: {
      en: 'You need to implement a tree-like object structure where both simple leaves and complex containers implement the same interface.',
      vi: 'Bạn cần triển khai cấu trúc đối tượng dạng cây trong đó cả lá đơn giản và container phức tạp đều triển khai cùng giao diện.',
    },
    solution: {
      en: 'Work with Products and Boxes through a common Component interface. For boxes, add and execute children recursively.',
      vi: 'Làm việc với Sản phẩm và Hộp qua giao diện Component chung. Đối với hộp, thêm và thực thi các con theo đệ quy.',
    },
    applicability: {
      en: 'Use when you need to implement a tree-like object structure, or when you want the client to treat both simple and complex elements uniformly.',
      vi: 'Sử dụng khi bạn cần triển khai cấu trúc đối tượng dạng cây, hoặc khi muốn client xử lý cả phần tử đơn giản và phức tạp một cách thống nhất.',
    },
    vietnamese_example: {
      title: { en: 'Vietnamese Army Hierarchy (Quân Đội)', vi: 'Hệ Thống Quân Đội Việt Nam' },
      description: {
        en: 'The legendary armies of Vietnam (from Hai Bà Trưng\'s uprising to the Tây Sơn dynasty) were organized as a tree: The Đại Tướng (General) commands armies; armies contain battalions (Tiểu Đoàn); battalions contain squads (Tiểu Đội); squads contain individual soldiers (Chiến Sĩ). A command to "advance!" applies to a single soldier OR an entire army — the Composite pattern treats them uniformly.',
        vi: 'Quân đội huyền thoại Việt Nam (từ cuộc khởi nghĩa Hai Bà Trưng đến triều Tây Sơn) được tổ chức như cây: Đại Tướng chỉ huy quân đội; quân đội gồm các Tiểu Đoàn; Tiểu Đoàn gồm các Tiểu Đội; Tiểu Đội gồm các Chiến Sĩ riêng lẻ. Lệnh "tiến công!" áp dụng cho một Chiến Sĩ hoặc toàn bộ quân đội — mẫu Composite xử lý chúng một cách thống nhất.',
      },
      illustration: '⚔️ Quân Đội Việt Nam\nĐại Tướng\n└── Quân Đoàn 1\n    ├── Tiểu Đoàn A\n    │   ├── 🪖 Chiến Sĩ 1\n    │   └── 🪖 Chiến Sĩ 2\n    └── Tiểu Đoàn B\n        └── 🪖 Chiến Sĩ 3\n\ntieuCong() works on ALL levels!',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from typing import List

class DonVi(ABC):
    """Component - Đơn vị quân đội"""
    @abstractmethod
    def tieu_cong(self) -> None: pass
    @abstractmethod
    def get_suc_manh(self) -> int: pass

class ChienSi(DonVi):
    """Leaf - Chiến sĩ"""
    def __init__(self, ten: str, suc_manh: int):
        self.ten = ten
        self._suc_manh = suc_manh

    def tieu_cong(self):
        print(f"  ⚔️ Chiến sĩ {self.ten} xung phong!")

    def get_suc_manh(self) -> int:
        return self._suc_manh

class DonViComposite(DonVi):
    """Composite - Đơn vị tổng hợp"""
    def __init__(self, ten: str):
        self.ten = ten
        self._thanh_vien: List[DonVi] = []

    def them(self, dv: DonVi): self._thanh_vien.append(dv)

    def tieu_cong(self):
        print(f"🏴 {self.ten} ra lệnh tiến công!")
        for tv in self._thanh_vien:
            tv.tieu_cong()

    def get_suc_manh(self) -> int:
        return sum(tv.get_suc_manh() for tv in self._thanh_vien)

# Build army tree
quan_doan = DonViComposite("Quân Đoàn Tây Sơn")

tieu_doan_a = DonViComposite("Tiểu Đoàn A")
tieu_doan_a.them(ChienSi("Nguyễn Văn A", 100))
tieu_doan_a.them(ChienSi("Trần Thị B", 90))

tieu_doan_b = DonViComposite("Tiểu Đoàn B - Kỵ Binh")
tieu_doan_b.them(ChienSi("Lê Văn C", 150))

quan_doan.them(tieu_doan_a)
quan_doan.them(tieu_doan_b)

# Same command works at all levels
quan_doan.tieu_cong()
print(f"Tổng sức mạnh: {quan_doan.get_suc_manh()}")`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `interface DonVi {
  tienCong(): void
  getSucManh(): number
}

class ChienSi implements DonVi {
  constructor(private ten: string, private sucManh: number) {}
  tienCong() { console.log(\`⚔️ Chiến sĩ \${this.ten} xung phong!\`) }
  getSucManh() { return this.sucManh }
}

class DonViComposite implements DonVi {
  private thanhVien: DonVi[] = []
  constructor(private ten: string) {}

  them(dv: DonVi) { this.thanhVien.push(dv) }
  tienCong() {
    console.log(\`🏴 \${this.ten} tiến công!\`)
    this.thanhVien.forEach(tv => tv.tienCong())
  }
  getSucManh() { return this.thanhVien.reduce((s, tv) => s + tv.getSucManh(), 0) }
}

const quanDoan = new DonViComposite('Quân Đoàn Tây Sơn')
const tieudoan = new DonViComposite('Tiểu Đoàn A')
tieudoan.them(new ChienSi('Nguyễn A', 100))
tieudoan.them(new ChienSi('Trần B', 90))
quanDoan.them(tieudoan)
quanDoan.tienCong()`,
      },
    ],
    structure_notes: {
      en: 'Component declares the interface for objects in the composition. Leaf has no children. Composite stores child components and implements child-related operations.',
      vi: 'Component khai báo giao diện cho các đối tượng trong tổ hợp. Leaf không có con. Composite lưu trữ các thành phần con và triển khai các thao tác liên quan đến con.',
    },
  },

  {
    id: 'decorator',
    slug: 'decorator',
    name: { en: 'Decorator', vi: 'Trang Trí' },
    category: 'structural',
    complexity: 2,
    popularity: 2,
    also_known_as: [{ en: 'Wrapper', vi: 'Bao bọc' }],
    intent: {
      en: 'Attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.',
      vi: 'Gắn các trách nhiệm bổ sung vào đối tượng một cách động. Decorator cung cấp một giải pháp thay thế linh hoạt cho việc kế thừa để mở rộng chức năng.',
    },
    problem: {
      en: 'You want to add behavior to individual objects without affecting other objects of the same class, and subclassing would lead to an explosion of subclasses.',
      vi: 'Bạn muốn thêm hành vi vào từng đối tượng mà không ảnh hưởng đến các đối tượng khác cùng lớp, và việc kế thừa sẽ dẫn đến bùng nổ lớp con.',
    },
    solution: {
      en: 'Create wrapper objects that contain the same interface as the wrapped object, forwarding requests to it but adding behavior before or after.',
      vi: 'Tạo các đối tượng wrapper chứa cùng giao diện với đối tượng được bao bọc, chuyển tiếp yêu cầu đến nó nhưng thêm hành vi trước hoặc sau.',
    },
    applicability: {
      en: 'Use when you need to assign extra behaviors to objects at runtime without breaking the code that uses these objects, or when inheritance is impractical.',
      vi: 'Sử dụng khi cần gán thêm hành vi cho đối tượng lúc chạy mà không phá vỡ mã sử dụng chúng, hoặc khi kế thừa không thực tế.',
    },
    vietnamese_example: {
      title: { en: 'Phở Broth Customization', vi: 'Tùy Chỉnh Nước Dùng Phở' },
      description: {
        en: 'A bowl of Phở starts with basic broth (Nước dùng cơ bản). Customers can dynamically add toppings: Thịt bò (beef), Giò heo (pork knuckle), Trứng (egg), Hành lá (spring onion), Ớt (chili). Each topping is a decorator that wraps the bowl and adds to the flavor and price. You stack decorators: Basic Phở → + Thịt bò → + Trứng → + Ớt. The final object has all the added behaviors without creating separate classes for each combination.',
        vi: 'Một bát phở bắt đầu với nước dùng cơ bản. Khách hàng có thể thêm topping động: Thịt bò, Giò heo, Trứng, Hành lá, Ớt. Mỗi topping là một decorator bao bọc bát phở và thêm vào hương vị và giá. Bạn xếp các decorator: Phở cơ bản → + Thịt bò → + Trứng → + Ớt. Đối tượng cuối cùng có tất cả các hành vi được thêm mà không cần tạo các lớp riêng biệt cho mỗi tổ hợp.',
      },
      illustration: '🍜 Phở Decorator Stack\n\nBasePho\n  └── ThitBoDecorator\n        └── TrungDecorator\n              └── OtDecorator\n                    └── HanhLaDecorator\n\n🍜+🥩+🥚+🌶️+🌿 = Full bowl!',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod

class Pho(ABC):
    @abstractmethod
    def mo_ta(self) -> str: pass
    @abstractmethod
    def gia(self) -> int: pass

class PhoCoBan(Pho):
    def mo_ta(self): return "🍜 Phở cơ bản"
    def gia(self): return 40000

class PhoDecorator(Pho):
    def __init__(self, pho: Pho):
        self._pho = pho
    def mo_ta(self): return self._pho.mo_ta()
    def gia(self): return self._pho.gia()

class ThemThitBo(PhoDecorator):
    def mo_ta(self): return self._pho.mo_ta() + " + 🥩 Thịt bò"
    def gia(self): return self._pho.gia() + 20000

class ThemTrung(PhoDecorator):
    def mo_ta(self): return self._pho.mo_ta() + " + 🥚 Trứng"
    def gia(self): return self._pho.gia() + 10000

class ThemOt(PhoDecorator):
    def mo_ta(self): return self._pho.mo_ta() + " + 🌶️ Ớt"
    def gia(self): return self._pho.gia() + 5000

# Build your bowl dynamically
bat_pho = PhoCoBan()
bat_pho = ThemThitBo(bat_pho)
bat_pho = ThemTrung(bat_pho)
bat_pho = ThemOt(bat_pho)

print(bat_pho.mo_ta())
print(f"Giá: {bat_pho.gia():,}đ")
# 🍜 Phở cơ bản + 🥩 Thịt bò + 🥚 Trứng + 🌶️ Ớt
# Giá: 75,000đ`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `interface Pho {
  moTa(): string
  gia(): number
}

class PhoCoBan implements Pho {
  moTa() { return '🍜 Phở cơ bản' }
  gia() { return 40000 }
}

abstract class PhoDecorator implements Pho {
  constructor(protected pho: Pho) {}
  moTa() { return this.pho.moTa() }
  gia() { return this.pho.gia() }
}

class ThemThitBo extends PhoDecorator {
  moTa() { return this.pho.moTa() + ' + 🥩 Thịt bò' }
  gia() { return this.pho.gia() + 20000 }
}

class ThemTrung extends PhoDecorator {
  moTa() { return this.pho.moTa() + ' + 🥚 Trứng' }
  gia() { return this.pho.gia() + 10000 }
}

let batPho: Pho = new PhoCoBan()
batPho = new ThemThitBo(batPho)
batPho = new ThemTrung(batPho)

console.log(batPho.moTa())
console.log(\`Giá: \${batPho.gia().toLocaleString('vi-VN')}đ\`)`,
      },
    ],
    structure_notes: {
      en: 'Component declares the interface. ConcreteComponent is the base object. BaseDecorator delegates work to the wrapped component. ConcreteDecorators add behaviors dynamically.',
      vi: 'Component khai báo giao diện. ConcreteComponent là đối tượng cơ sở. BaseDecorator ủy quyền công việc cho component được bao bọc. ConcreteDecorator thêm hành vi động.',
    },
  },

  {
    id: 'facade',
    slug: 'facade',
    name: { en: 'Facade', vi: 'Mặt Tiền' },
    category: 'structural',
    complexity: 1,
    popularity: 2,
    intent: {
      en: 'Provides a simplified interface to a library, framework, or any other complex set of classes.',
      vi: 'Cung cấp giao diện đơn giản hóa cho một thư viện, framework, hoặc bất kỳ tập hợp lớp phức tạp nào khác.',
    },
    problem: {
      en: 'Your code needs to work with a broad set of objects from a sophisticated library or framework. You must initialize all objects, track dependencies, and execute methods in the right order.',
      vi: 'Mã của bạn cần làm việc với nhiều đối tượng từ thư viện hoặc framework phức tạp. Bạn phải khởi tạo tất cả đối tượng, theo dõi các phụ thuộc, và thực thi các phương thức theo đúng thứ tự.',
    },
    solution: {
      en: 'Create a Facade class that provides a simple interface to complex subsystems. The facade delegates client calls to the appropriate subsystem objects.',
      vi: 'Tạo lớp Facade cung cấp giao diện đơn giản cho các hệ thống con phức tạp. Facade ủy quyền các lệnh gọi client đến các đối tượng hệ thống con thích hợp.',
    },
    applicability: {
      en: 'Use when you need a simple interface to a complex subsystem, or when you want to structure a subsystem into layers.',
      vi: 'Sử dụng khi bạn cần giao diện đơn giản cho hệ thống con phức tạp, hoặc khi muốn cấu trúc hệ thống con thành các lớp.',
    },
    vietnamese_example: {
      title: { en: 'Quan Họ Wedding Ceremony Coordinator', vi: 'Người Tổ Chức Đám Cưới Quan Họ' },
      description: {
        en: 'A traditional Vietnamese wedding involves dozens of complex subsystems: LễNghi (ceremonial protocol), ÂmNhạc (Quan Họ folk music ensemble), NấuĂn (feast preparation), TrangTrí (decoration), ĐóiÁo (costume dressing). The wedding coordinator (MC/Chủ hôn) acts as a Facade — the bride and groom just say "start the ceremony" and the coordinator handles all subsystems in the right order.',
        vi: 'Đám cưới truyền thống Việt Nam liên quan đến hàng chục hệ thống con phức tạp: Lễ Nghi, Âm Nhạc Quan Họ, Nấu Ăn, Trang Trí, Đội Áo. Người tổ chức đám cưới (Chủ hôn) đóng vai trò Facade — cô dâu và chú rể chỉ nói "bắt đầu lễ cưới" và người tổ chức xử lý tất cả hệ thống con theo đúng thứ tự.',
      },
      illustration: '💒 Đám Cưới Quan Họ\n\n[Cô Dâu/Chú Rể]\n       │ "bắt_dau_le()"\n       ▼\n[ChuHon - Facade]\n  │  │  │  │  │\n  ▼  ▼  ▼  ▼  ▼\n🎵 🍽️ 🌸 👘 📜\nÂm Nấu Trang Áo  Lễ\nNhạc Ăn  Trí  Dài Nghi',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `class LeNghi:
    def chuan_bi_le(self): print("📜 Chuẩn bị lễ nghi truyền thống")
    def doc_loi_the(self): print("📜 Đọc lời thề hôn nhân")

class AmNhac:
    def khoi_dong(self): print("🎵 Quan Họ ensemble khởi động")
    def hat_bai_chao(self): print("🎵 Hát bài: 'Người ơi người ở đừng về'")

class NauAn:
    def chuan_bi_mam_co(self): print("🍽️ Chuẩn bị 12 mâm cỗ")
    def pha_che(self): print("🍽️ Pha chế rượu nếp cái hoa vàng")

class TrangTri:
    def treo_hoa(self): print("🌸 Treo hoa sen và cúc vạn thọ")
    def thap_nen(self): print("🕯️ Thắp nến đèn lồng đỏ")

class ChuHon:
    """Facade - Người tổ chức đám cưới"""
    def __init__(self):
        self._le_nghi = LeNghi()
        self._am_nhac = AmNhac()
        self._nau_an = NauAn()
        self._trang_tri = TrangTri()

    def bat_dau_le_cuoi(self):
        print("💒 === BẮT ĐẦU LỄ CƯỚI QUAN HỌ ===")
        self._trang_tri.treo_hoa()
        self._trang_tri.thap_nen()
        self._am_nhac.khoi_dong()
        self._am_nhac.hat_bai_chao()
        self._nau_an.chuan_bi_mam_co()
        self._nau_an.pha_che()
        self._le_nghi.chuan_bi_le()
        self._le_nghi.doc_loi_the()
        print("💒 === LỄ CƯỚI HOÀN THÀNH ===")

# Client only needs one call
chu_hon = ChuHon()
chu_hon.bat_dau_le_cuoi()`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `class LeNghi {
  chuanBiLe() { console.log('📜 Chuẩn bị lễ nghi') }
  docLoiThe() { console.log('📜 Đọc lời thề hôn nhân') }
}

class AmNhac {
  khoiDong() { console.log('🎵 Quan Họ khởi động') }
  hatBaiChao() { console.log('🎵 Hát Người Ơi Người Ở') }
}

class NauAn {
  chuanBiMamCo() { console.log('🍽️ Chuẩn bị 12 mâm cỗ') }
}

// Facade
class ChuHon {
  private leNghi = new LeNghi()
  private amNhac = new AmNhac()
  private nauAn = new NauAn()

  batDauLeCuoi(): void {
    console.log('💒 === LỄ CƯỚI QUAN HỌ ===')
    this.amNhac.khoiDong()
    this.amNhac.hatBaiChao()
    this.nauAn.chuanBiMamCo()
    this.leNghi.chuanBiLe()
    this.leNghi.docLoiThe()
    console.log('💒 === HOÀN THÀNH ===')
  }
}

new ChuHon().batDauLeCuoi()`,
      },
    ],
    structure_notes: {
      en: 'Facade provides convenient access to a particular part of the subsystem\'s functionality. Subsystem classes aren\'t aware of the facade\'s existence.',
      vi: 'Facade cung cấp quyền truy cập thuận tiện vào một phần chức năng của hệ thống con. Các lớp hệ thống con không biết về sự tồn tại của facade.',
    },
  },

  {
    id: 'flyweight',
    slug: 'flyweight',
    name: { en: 'Flyweight', vi: 'Nhẹ Cân' },
    category: 'structural',
    complexity: 3,
    popularity: 1,
    also_known_as: [{ en: 'Cache', vi: 'Bộ nhớ đệm' }],
    intent: {
      en: 'Uses sharing to support large numbers of fine-grained objects efficiently by separating intrinsic (shared) state from extrinsic (context-specific) state.',
      vi: 'Sử dụng chia sẻ để hỗ trợ số lượng lớn các đối tượng nhỏ một cách hiệu quả bằng cách tách trạng thái nội tại (dùng chung) khỏi trạng thái ngoại tại (theo ngữ cảnh).',
    },
    problem: {
      en: 'Your program creates millions of objects that consume too much RAM. Objects share similar data, but this data is duplicated across all instances.',
      vi: 'Chương trình của bạn tạo ra hàng triệu đối tượng tiêu thụ quá nhiều RAM. Các đối tượng chia sẻ dữ liệu tương tự, nhưng dữ liệu này bị nhân đôi trên tất cả các thể hiện.',
    },
    solution: {
      en: 'Extract the repeating intrinsic state into shared Flyweight objects. Store extrinsic state (unique per context) outside, passing it to methods when needed.',
      vi: 'Trích xuất trạng thái nội tại lặp lại vào các đối tượng Flyweight được chia sẻ. Lưu trữ trạng thái ngoại tại (duy nhất theo ngữ cảnh) bên ngoài, truyền nó vào các phương thức khi cần.',
    },
    applicability: {
      en: 'Use only when your program must support a huge number of objects which barely fit into available RAM.',
      vi: 'Chỉ sử dụng khi chương trình của bạn phải hỗ trợ số lượng lớn đối tượng hầu như không vừa RAM hiện có.',
    },
    vietnamese_example: {
      title: { en: 'Lantern Festival (Hội An Đèn Lồng)', vi: 'Lễ Hội Đèn Lồng Hội An' },
      description: {
        en: 'During the Hội An Lantern Festival, thousands of floating lanterns (đèn lồng) are released on the Thu Bồn river. Each lantern has intrinsic shared state: color (đỏ/vàng/xanh), shape (hình tròn/hình vuông), pattern (hoa sen/rồng). But extrinsic state is unique: position on river, owner\'s wish written on it, time of release. Instead of creating 10,000 unique objects, the Flyweight factory reuses the same color+shape+pattern object and passes position as context.',
        vi: 'Trong Lễ hội Đèn Lồng Hội An, hàng nghìn đèn lồng nổi được thả trên sông Thu Bồn. Mỗi đèn có trạng thái nội tại dùng chung: màu sắc, hình dạng, họa tiết. Nhưng trạng thái ngoại tại là duy nhất: vị trí trên sông, lời ước của chủ nhân, thời gian thả. Thay vì tạo 10.000 đối tượng duy nhất, factory Flyweight tái sử dụng cùng đối tượng màu+hình+họa tiết và truyền vị trí làm ngữ cảnh.',
      },
      illustration: '🏮 Lễ Hội Đèn Lồng\nFlyweight Factory\n  "đỏ+tròn+sen" ──▶ [shared obj]\n  "vàng+vuông+rồng" ─▶ [shared obj]\n\nContext (extrinsic):\n  (đỏ+tròn, x=10, y=5, "Ước bình an")\n  (đỏ+tròn, x=20, y=3, "Ước thành công")\n  ↑ same Flyweight, different context!',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from dataclasses import dataclass
from typing import Dict

@dataclass(frozen=True)
class DenLongFlyweight:
    """Intrinsic state - shared"""
    mau_sac: str    # color
    hinh_dang: str  # shape
    hoa_tiet: str   # pattern

    def hien_thi(self, vi_tri_x: float, vi_tri_y: float, loi_uoc: str):
        """Extrinsic state passed as parameters"""
        print(f"🏮 Đèn [{self.mau_sac},{self.hinh_dang},{self.hoa_tiet}] "
              f"tại ({vi_tri_x:.1f},{vi_tri_y:.1f}): '{loi_uoc}'")

class DenLongFactory:
    _den_long: Dict[str, DenLongFlyweight] = {}

    @classmethod
    def get_den_long(cls, mau: str, hinh: str, hoa: str) -> DenLongFlyweight:
        key = f"{mau}_{hinh}_{hoa}"
        if key not in cls._den_long:
            cls._den_long[key] = DenLongFlyweight(mau, hinh, hoa)
            print(f"✨ Tạo mới flyweight: {key}")
        else:
            print(f"♻️ Tái sử dụng flyweight: {key}")
        return cls._den_long[key]

# Thả 5 đèn lồng - only 2 unique flyweight objects needed
festival_data = [
    ("đỏ", "tròn", "sen", 10.5, 3.2, "Ước bình an"),
    ("đỏ", "tròn", "sen", 20.1, 5.4, "Ước hạnh phúc"),
    ("vàng", "vuông", "rồng", 15.0, 4.0, "Ước thành công"),
    ("đỏ", "tròn", "sen", 8.3, 6.1, "Ước sức khỏe"),
    ("vàng", "vuông", "rồng", 25.0, 2.5, "Ước phú quý"),
]

for mau, hinh, hoa, x, y, uoc in festival_data:
    den = DenLongFactory.get_den_long(mau, hinh, hoa)
    den.hien_thi(x, y, uoc)`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `class DenLongFlyweight {
  constructor(
    private readonly mauSac: string,
    private readonly hinhDang: string,
    private readonly hoaTiet: string
  ) {}

  hienThi(x: number, y: number, loiUoc: string) {
    console.log(\`🏮[\${this.mauSac},\${this.hinhDang}] tại (\${x},\${y}): "\${loiUoc}"\`)
  }
}

class DenLongFactory {
  private static cache = new Map<string, DenLongFlyweight>()

  static getDenLong(mau: string, hinh: string, hoa: string): DenLongFlyweight {
    const key = \`\${mau}_\${hinh}_\${hoa}\`
    if (!this.cache.has(key)) {
      this.cache.set(key, new DenLongFlyweight(mau, hinh, hoa))
    }
    return this.cache.get(key)!
  }
}

// 5 lanterns, only 2 flyweight objects
DenLongFactory.getDenLong('đỏ','tròn','sen').hienThi(10,3,'Bình an')
DenLongFactory.getDenLong('đỏ','tròn','sen').hienThi(20,5,'Hạnh phúc')
DenLongFactory.getDenLong('vàng','vuông','rồng').hienThi(15,4,'Thành công')`,
      },
    ],
    structure_notes: {
      en: 'Flyweight stores intrinsic state that can be shared. Flyweight Factory caches and reuses flyweights. Context stores extrinsic state and references to flyweights.',
      vi: 'Flyweight lưu trữ trạng thái nội tại có thể chia sẻ. Factory Flyweight cache và tái sử dụng flyweight. Context lưu trữ trạng thái ngoại tại và tham chiếu đến flyweight.',
    },
  },

  {
    id: 'proxy',
    slug: 'proxy',
    name: { en: 'Proxy', vi: 'Đại Diện' },
    category: 'structural',
    complexity: 2,
    popularity: 1,
    intent: {
      en: 'Provides a surrogate or placeholder for another object to control access to it.',
      vi: 'Cung cấp một đại diện hoặc chỗ giữ chỗ cho đối tượng khác để kiểm soát quyền truy cập vào nó.',
    },
    problem: {
      en: 'You want to add additional behavior (lazy initialization, logging, access control, caching) around an object without changing the object\'s class.',
      vi: 'Bạn muốn thêm hành vi bổ sung (khởi tạo lazy, ghi log, kiểm soát truy cập, cache) xung quanh đối tượng mà không thay đổi lớp của đối tượng.',
    },
    solution: {
      en: 'Create a Proxy class that has the same interface as the real object. When a client request arrives, the proxy creates a real object and delegates the work.',
      vi: 'Tạo lớp Proxy có cùng giao diện với đối tượng thực. Khi yêu cầu client đến, proxy tạo đối tượng thực và ủy quyền công việc.',
    },
    applicability: {
      en: 'Use for lazy initialization, access control, local execution of remote service, logging, caching, or smart reference counting.',
      vi: 'Sử dụng cho khởi tạo lazy, kiểm soát truy cập, thực thi cục bộ dịch vụ từ xa, ghi log, cache, hoặc đếm tham chiếu thông minh.',
    },
    vietnamese_example: {
      title: { en: 'Quan Lại (Mandarin) Access Control', vi: 'Quan Lại - Kiểm Soát Tiếp Cận' },
      description: {
        en: 'In the Vietnamese imperial court (triều đình), citizens cannot directly approach the Emperor (Vua). They must go through a Quan Lại (mandarin official) who acts as a proxy: verifying credentials, logging the visit, filtering requests, and only passing through legitimate petitions. The Vua doesn\'t change — the Quan Lại adds access control, auditing, and caching of common decrees.',
        vi: 'Trong triều đình Việt Nam, dân thường không thể trực tiếp tiếp cận Hoàng Đế. Họ phải đi qua Quan Lại, người đóng vai trò proxy: xác minh thông tin, ghi lại cuộc thăm, lọc yêu cầu và chỉ chuyển tiếp những đơn thỉnh cầu hợp lệ. Nhà Vua không thay đổi — Quan Lại thêm kiểm soát truy cập, kiểm toán và cache các chiếu chỉ phổ biến.',
      },
      illustration: '👑 Triều Đình Proxy\n\n[Dân] ──thỉnh cầu──▶ [QuanLai Proxy]\n                          │ kiểm tra\n                          │ ghi log\n                          │ lọc\n                          ▼\n                    [Hoàng Đế - RealSubject]\n                          │\n                          ▼\n                       chiếu chỉ',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from datetime import datetime

class HoangDe(ABC):
    @abstractmethod
    def tiep_kien(self, ten_nguoi: str, don_tu: str) -> str: pass

class HoangDeThuc(HoangDe):
    """Real Subject"""
    def tiep_kien(self, ten_nguoi: str, don_tu: str) -> str:
        return f"👑 Hoàng Đế phán: Đơn của {ten_nguoi} về '{don_tu}' — Chấp thuận!"

class QuanLaiProxy(HoangDe):
    """Proxy with access control + logging"""
    def __init__(self):
        self._hoang_de: HoangDeThuc | None = None
        self._nguoi_duoc_phep = {"Thái Sư", "Đại Thần", "Tể Tướng"}

    def _kiem_tra_quyen(self, ten_nguoi: str) -> bool:
        return ten_nguoi in self._nguoi_duoc_phep

    def tiep_kien(self, ten_nguoi: str, don_tu: str) -> str:
        timestamp = datetime.now().strftime("%H:%M")
        print(f"📋 [{timestamp}] {ten_nguoi} xin yết kiến về: {don_tu}")

        if not self._kiem_tra_quyen(ten_nguoi):
            return f"🚫 Quan Lại ngăn lại: {ten_nguoi} không có quyền yết kiến!"

        # Lazy initialization of real emperor
        if self._hoang_de is None:
            print("👑 Hoàng Đế đang trong cung điện, triệu kiến...")
            self._hoang_de = HoangDeThuc()

        ket_qua = self._hoang_de.tiep_kien(ten_nguoi, don_tu)
        print(f"✅ Ghi sử: {ten_nguoi} đã yết kiến lúc {timestamp}")
        return ket_qua

# Client uses proxy, not emperor directly
quan_lai = QuanLaiProxy()
print(quan_lai.tiep_kien("Dân Thường", "xin giảm thuế"))    # Blocked
print(quan_lai.tiep_kien("Tể Tướng", "kế hoạch đánh giặc")) # Allowed`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `interface HoangDe {
  tiepKien(tenNguoi: string, donTu: string): string
}

class HoangDeThuc implements HoangDe {
  tiepKien(ten: string, don: string) {
    return \`👑 Chấp thuận đơn của \${ten}: "\${don}"\`
  }
}

class QuanLaiProxy implements HoangDe {
  private hoangDe: HoangDeThuc | null = null
  private readonly duocPhep = new Set(['Tể Tướng', 'Đại Thần'])

  tiepKien(ten: string, don: string): string {
    console.log(\`📋 \${ten} xin yết kiến: \${don}\`)

    if (!this.duocPhep.has(ten)) {
      return \`🚫 \${ten} không có quyền yết kiến!\`
    }

    if (!this.hoangDe) {
      this.hoangDe = new HoangDeThuc() // lazy init
    }

    return this.hoangDe.tiepKien(ten, don)
  }
}

const proxy = new QuanLaiProxy()
console.log(proxy.tiepKien('Dân Thường', 'giảm thuế'))    // blocked
console.log(proxy.tiepKien('Tể Tướng', 'kế hoạch quân')) // allowed`,
      },
    ],
    structure_notes: {
      en: 'ServiceInterface declares the interface of Service. Proxy implements ServiceInterface, maintains a reference to real Service, and controls access to it.',
      vi: 'ServiceInterface khai báo giao diện của Service. Proxy triển khai ServiceInterface, duy trì tham chiếu đến Service thực và kiểm soát quyền truy cập vào nó.',
    },
  },
]
