"""
Pattern data definitions matching the TypeScript client data.
This serves as the source of truth for the REST API.
"""
from .models import Pattern, LocalizedText, CodeExample, VietnameseExample

PATTERNS: list[Pattern] = [
    # ── CREATIONAL ────────────────────────────────────────────────
    Pattern(
        id="factory-method",
        slug="factory-method",
        name=LocalizedText(en="Factory Method", vi="Phương Thức Nhà Máy"),
        category="creational",
        complexity=1,
        popularity=3,
        also_known_as=[LocalizedText(en="Virtual Constructor", vi="Hàm khởi tạo ảo")],
        intent=LocalizedText(
            en="Defines an interface for creating an object, but lets subclasses decide which class to instantiate.",
            vi="Định nghĩa một giao diện để tạo đối tượng, nhưng để các lớp con quyết định lớp nào sẽ được khởi tạo.",
        ),
        problem=LocalizedText(
            en="You need to create objects but don't know in advance which exact class you'll need.",
            vi="Bạn cần tạo đối tượng nhưng không biết trước lớp chính xác nào cần dùng.",
        ),
        solution=LocalizedText(
            en="Replace direct object construction with calls to a factory method. Subclasses can override this method.",
            vi="Thay thế tạo đối tượng trực tiếp bằng cách gọi phương thức nhà máy. Các lớp con có thể ghi đè phương thức này.",
        ),
        applicability=LocalizedText(
            en="Use when you don't know ahead of time what class you need to instantiate, or when subclasses should specify the objects they create.",
            vi="Sử dụng khi bạn không biết trước lớp nào cần khởi tạo, hoặc khi muốn lớp con chỉ định đối tượng chúng tạo.",
        ),
        vietnamese_example=VietnameseExample(
            title=LocalizedText(en="Bánh Chưng & Bánh Tét Workshop", vi="Xưởng Làm Bánh Chưng & Bánh Tét"),
            description=LocalizedText(
                en="During Tết, workshops in the North make Bánh Chưng (square) and in the South make Bánh Tét (cylindrical). The factory method lets each regional workshop decide what to create.",
                vi="Trong dịp Tết, xưởng miền Bắc làm Bánh Chưng (vuông) và miền Nam làm Bánh Tét (tròn). Phương thức nhà máy cho mỗi xưởng quyết định loại bánh cần tạo.",
            ),
            illustration="🏮 Xưởng Bánh Tết\n┌─────────────────────┐\n│   BanhFactory       │\n│  + makeBanh()       │\n└─────────┬───────────┘\n          │\n    ┌─────┴──────┐\n    ▼            ▼\n┌───────┐  ┌──────────┐\n│Miền   │  │ Miền     │\n│Bắc 🟫 │  │ Nam 🟤   │\n│Bánh   │  │ Bánh Tét │\n│Chưng  │  │          │\n└───────┘  └──────────┘",
        ),
        code_examples=[
            CodeExample(
                language="python",
                label="Python",
                code="""from abc import ABC, abstractmethod

class BanhFactory(ABC):
    @abstractmethod
    def make_banh(self) -> str:
        pass

    def prepare_for_tet(self) -> str:
        banh = self.make_banh()
        return f"🎋 Chuẩn bị Tết: {banh} đã sẵn sàng!"

class MienBacFactory(BanhFactory):
    def make_banh(self) -> str:
        return "🟫 Bánh Chưng (hình vuông, miền Bắc)"

class MienNamFactory(BanhFactory):
    def make_banh(self) -> str:
        return "🟤 Bánh Tét (hình trụ, miền Nam)"

for factory in [MienBacFactory(), MienNamFactory()]:
    print(factory.prepare_for_tet())""",
            )
        ],
        structure_notes=LocalizedText(
            en="Creator declares the factory method returning Product. Concrete Creators override the factory method to return different types of products.",
            vi="Creator khai báo phương thức nhà máy trả về Product. Concrete Creator ghi đè phương thức nhà máy để trả về các loại sản phẩm khác nhau.",
        ),
    ),

    Pattern(
        id="singleton",
        slug="singleton",
        name=LocalizedText(en="Singleton", vi="Đơn Thể"),
        category="creational",
        complexity=1,
        popularity=2,
        intent=LocalizedText(
            en="Ensures a class has only one instance, and provides a global point of access to it.",
            vi="Đảm bảo một lớp chỉ có một thể hiện duy nhất và cung cấp điểm truy cập toàn cục đến nó.",
        ),
        problem=LocalizedText(
            en="Some components should have exactly one instance: a config manager, a thread pool, a logging service.",
            vi="Một số thành phần chỉ nên có đúng một thể hiện: quản lý cấu hình, thread pool, dịch vụ ghi log.",
        ),
        solution=LocalizedText(
            en="Make the default constructor private, create a static creation method that caches the created object.",
            vi="Đặt constructor mặc định là riêng tư, tạo phương thức tạo tĩnh lưu cache đối tượng đã tạo.",
        ),
        applicability=LocalizedText(
            en="Use when a class should have exactly one instance available to all clients.",
            vi="Sử dụng khi một lớp nên có đúng một thể hiện dành cho tất cả client.",
        ),
        vietnamese_example=VietnameseExample(
            title=LocalizedText(en="The Hùng Kings (Vua Hùng)", vi="Vua Hùng - Một Vị Vua Duy Nhất"),
            description=LocalizedText(
                en="In Vietnamese mythology, there can only be ONE reigning Hùng King at a time. All subjects access the same king — you cannot create a 'second king'.",
                vi="Trong thần thoại Việt Nam, chỉ có THỂ có MỘT Hùng Vương trị vì. Tất cả thần dân đều tiếp cận cùng một vị vua.",
            ),
            illustration="👑 Triều Đình Văn Lang\n┌──────────────────────┐\n│  TrieuDinh           │\n│  - instance: static  │\n│  + getInstance() 🔒  │\n└──────────────────────┘\n         │ (1 instance only)\n    ┌────┼────┐\n    ▼    ▼    ▼\n  Quân  Dân  Quan",
        ),
        code_examples=[
            CodeExample(
                language="python",
                label="Python",
                code="""import threading

class TrieuDinh:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._vua = None
        return cls._instance

    def set_vua(self, ten_vua: str):
        self._vua = ten_vua
        print(f"👑 Hùng Vương {ten_vua} lên ngôi!")

    def ban_lenh(self, lenh: str):
        print(f"📜 Chiếu chỉ của Hùng Vương {self._vua}: {lenh}")

td1 = TrieuDinh()
td2 = TrieuDinh()
print(td1 is td2)  # True!
td1.set_vua("thứ Sáu")
td2.ban_lenh("Xây dựng đất nước Văn Lang")""",
            )
        ],
        structure_notes=LocalizedText(
            en="Singleton declares a static getInstance() method. Constructor is kept private.",
            vi="Singleton khai báo phương thức tĩnh getInstance(). Constructor được giữ riêng tư.",
        ),
    ),

    Pattern(
        id="observer",
        slug="observer",
        name=LocalizedText(en="Observer", vi="Quan Sát Viên"),
        category="behavioral",
        complexity=2,
        popularity=3,
        also_known_as=[
            LocalizedText(en="Event-Subscriber", vi="Người đăng ký sự kiện"),
            LocalizedText(en="Listener", vi="Trình lắng nghe"),
        ],
        intent=LocalizedText(
            en="Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically.",
            vi="Định nghĩa mối quan hệ một-nhiều giữa các đối tượng để khi một đối tượng thay đổi trạng thái, tất cả các đối tượng phụ thuộc được thông báo tự động.",
        ),
        problem=LocalizedText(
            en="You need to notify multiple objects about state changes in another object without tight coupling.",
            vi="Bạn cần thông báo cho nhiều đối tượng về thay đổi trạng thái trong một đối tượng khác mà không liên kết chặt.",
        ),
        solution=LocalizedText(
            en="Add a subscription mechanism. When an event occurs, the publisher notifies all subscribers.",
            vi="Thêm cơ chế đăng ký. Khi sự kiện xảy ra, publisher thông báo cho tất cả subscribers.",
        ),
        applicability=LocalizedText(
            en="Use when changes to one object require changing others, and you don't know how many objects need to change.",
            vi="Sử dụng khi thay đổi một đối tượng cần thay đổi các đối tượng khác và bạn không biết bao nhiêu đối tượng cần thay đổi.",
        ),
        vietnamese_example=VietnameseExample(
            title=LocalizedText(en="Trống Đồng (Bronze Drum) Signals", vi="Tiếng Trống Đồng - Tín Hiệu Làng"),
            description=LocalizedText(
                en="The legendary Trống Đồng sends signals to all subscribed villages. Each observer reacts differently to the same drum beat.",
                vi="Trống Đồng huyền thoại gửi tín hiệu đến tất cả các làng đã đăng ký. Mỗi observer phản ứng khác nhau với cùng tiếng trống.",
            ),
            illustration="🥁 Trống Đồng Publisher\n  đăng ký(nongDan)\n  đăng ký(chienSi)\n       │\n       │ danh_trong('giặc đến!')\n       │\n    ┌──┼──┐\n    ▼  ▼  ▼\n  🌾 ⚔️ 🏪",
        ),
        code_examples=[
            CodeExample(
                language="python",
                label="Python",
                code="""from abc import ABC, abstractmethod

class NguoiNghe(ABC):
    @abstractmethod
    def phan_ung(self, tin_hieu: str): pass

class TrongDong:
    def __init__(self):
        self._nguoi_nghe = []

    def dang_ky(self, nguoi: NguoiNghe):
        self._nguoi_nghe.append(nguoi)

    def danh_trong(self, tin_hieu: str):
        print(f"🥁 Trống Đồng: '{tin_hieu}'")
        for nguoi in self._nguoi_nghe:
            nguoi.phan_ung(tin_hieu)

class NongDan(NguoiNghe):
    def phan_ung(self, th: str):
        action = "Chạy vào làng!" if "giặc" in th else "Đi xem hội!"
        print(f"🌾 Nông dân: {action}")

class ChienSi(NguoiNghe):
    def phan_ung(self, th: str):
        action = "Tập hợp đội hình!" if "giặc" in th else "Canh gác!"
        print(f"⚔️ Chiến sĩ: {action}")

trong = TrongDong()
trong.dang_ky(NongDan())
trong.dang_ky(ChienSi())
trong.danh_trong("giặc đến!")
trong.danh_trong("lễ hội Đền Hùng!")""",
            )
        ],
        structure_notes=LocalizedText(
            en="Publisher maintains a list of subscribers and notifies them all when an event occurs.",
            vi="Publisher duy trì danh sách subscribers và thông báo cho tất cả khi sự kiện xảy ra.",
        ),
    ),

    Pattern(
        id="strategy",
        slug="strategy",
        name=LocalizedText(en="Strategy", vi="Chiến Lược"),
        category="behavioral",
        complexity=1,
        popularity=3,
        intent=LocalizedText(
            en="Defines a family of algorithms, encapsulates each one, and makes them interchangeable.",
            vi="Định nghĩa một họ thuật toán, đóng gói từng cái và làm cho chúng có thể hoán đổi cho nhau.",
        ),
        problem=LocalizedText(
            en="You have multiple ways to perform an operation and want to switch between them at runtime.",
            vi="Bạn có nhiều cách thực hiện một thao tác và muốn chuyển đổi giữa chúng lúc chạy.",
        ),
        solution=LocalizedText(
            en="Extract all algorithms into separate strategy classes. The Context delegates work to the current strategy.",
            vi="Trích xuất tất cả thuật toán vào các lớp strategy riêng biệt. Context ủy quyền công việc cho strategy hiện tại.",
        ),
        applicability=LocalizedText(
            en="Use when you want to swap algorithms inside an object at runtime.",
            vi="Sử dụng khi muốn hoán đổi thuật toán bên trong đối tượng lúc chạy.",
        ),
        vietnamese_example=VietnameseExample(
            title=LocalizedText(en="Vietnamese Martial Arts Schools (Võ Phái)", vi="Các Võ Phái Việt Nam"),
            description=LocalizedText(
                en="A warrior can choose different martial art styles: Bình Định (powerful), Tây Sơn (fast), Thiếu Lâm (defensive) based on the situation.",
                vi="Một võ sĩ có thể chọn phong cách võ khác nhau: Bình Định (mạnh), Tây Sơn (nhanh), Thiếu Lâm (phòng thủ) tùy tình huống.",
            ),
            illustration="⚔️ Võ Phái Strategy\nVoSi (Context)\n  - vo_phong: VoPhai\n  + chien_dau()\n       │\n  ┌────┼────┐\n  ▼    ▼    ▼\nBình Tây  Thiếu\nĐịnh Sơn  Lâm\n💪  ⚡   🛡️",
        ),
        code_examples=[
            CodeExample(
                language="python",
                label="Python",
                code="""from abc import ABC, abstractmethod

class VoPhai(ABC):
    @abstractmethod
    def tan_cong(self, doi_thu: str) -> str: pass

class VoBinhDinh(VoPhai):
    def tan_cong(self, dt: str) -> str:
        return f"💪 Đánh 'Song Phi' vào {dt}! Uy lực tối đa!"

class VoTaySon(VoPhai):
    def tan_cong(self, dt: str) -> str:
        return f"⚡ Liên hoàn 7 đòn vào {dt}! Tốc độ như điện!"

class VoThieuLam(VoPhai):
    def tan_cong(self, dt: str) -> str:
        return f"🛡️ Phòng thủ rồi phản đòn {dt}! Lấy nhu chế cương!"

class VoSi:
    def __init__(self, ten: str, vo_phong: VoPhai):
        self.ten = ten
        self._vo_phong = vo_phong

    def doi_vo_phong(self, vo_phong: VoPhai):
        self._vo_phong = vo_phong

    def chien_dau(self, doi_thu: str):
        print(f"⚔️ {self.ten}: {self._vo_phong.tan_cong(doi_thu)}")

hero = VoSi("Nguyễn Huệ", VoBinhDinh())
hero.chien_dau("giặc Thanh")
hero.doi_vo_phong(VoTaySon())
hero.chien_dau("kẻ thù bao vây")""",
            )
        ],
        structure_notes=LocalizedText(
            en="Context maintains a reference to one of the strategy objects and delegates work to it.",
            vi="Context duy trì tham chiếu đến một đối tượng strategy và ủy quyền công việc cho nó.",
        ),
    ),
]

# Index by slug for O(1) lookup
PATTERNS_BY_SLUG: dict[str, Pattern] = {p.slug: p for p in PATTERNS}
