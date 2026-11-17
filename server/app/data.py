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
            en="Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.",
            vi="Factory Method là một mẫu thiết kế khởi tạo, cung cấp một giao diện để tạo đối tượng ở lớp cha, nhưng cho phép các lớp con thay đổi loại đối tượng sẽ được tạo ra.",
        ),
        problem=LocalizedText(
            en="Imagine a logistics app whose first version only handles trucks, so most of the code lives inside the Truck class. Later, sea transport companies ask for ships. Because the code is coupled to Truck, adding Ship means changing the whole codebase, and every new transport type means doing it again. You end up with code full of conditionals that switch behavior depending on the transport class.",
            vi="Hãy tưởng tượng một ứng dụng logistics mà phiên bản đầu chỉ hỗ trợ xe tải, nên phần lớn mã nằm trong lớp Truck. Sau đó, các công ty vận tải biển muốn thêm tàu thủy. Vì mã đã phụ thuộc chặt vào Truck, thêm Ship đồng nghĩa với việc sửa toàn bộ mã nguồn, và mỗi loại phương tiện mới lại phải làm lại như vậy. Kết quả là mã chứa đầy câu lệnh điều kiện để đổi hành vi theo từng lớp phương tiện.",
        ),
        solution=LocalizedText(
            en="Replace direct construction calls (the new operator) with calls to a special factory method. Objects are still created with new, but from inside the factory method; the returned objects are called products. Subclasses can override the factory method to change the class of products it creates. The one limitation: all products must share a common base class or interface (e.g. Truck and Ship both implement Transport with a deliver() method), and the factory method in the base class must declare that interface as its return type. The client code then treats every product as an abstract Transport and does not care how each one implements deliver().",
            vi="Thay các lệnh tạo đối tượng trực tiếp (toán tử new) bằng lời gọi tới một phương thức nhà máy đặc biệt. Đối tượng vẫn được tạo bằng new, nhưng bên trong phương thức nhà máy; các đối tượng được trả về gọi là sản phẩm (product). Lớp con có thể ghi đè phương thức nhà máy để thay đổi lớp của sản phẩm được tạo. Hạn chế duy nhất: mọi sản phẩm phải có chung một lớp cơ sở hoặc giao diện (ví dụ Truck và Ship cùng triển khai Transport với phương thức deliver()), và phương thức nhà máy ở lớp cơ sở phải khai báo kiểu trả về là giao diện đó. Khi đó, mã client coi mọi sản phẩm là một Transport trừu tượng và không cần biết từng loại triển khai deliver() ra sao.",
        ),
        applicability=LocalizedText(
            en="Use Factory Method when you don't know beforehand the exact types and dependencies of the objects your code should work with: construction code is separated from the code that uses the product, so adding a product type only needs a new creator subclass. Use it when you want users of your library or framework to extend its internal components: they subclass the component and override the factory method (e.g. UIWithRoundButtons overrides createButton() to return RoundButton). Use it when you want to save resources by reusing existing objects such as database connections: a constructor must always return a new object, but a factory method can return an existing instance from a cache or pool.",
            vi="Dùng Factory Method khi bạn không biết trước chính xác loại và phụ thuộc của các đối tượng mà mã cần làm việc cùng: mã khởi tạo được tách khỏi mã sử dụng sản phẩm, nên thêm loại sản phẩm mới chỉ cần thêm một lớp creator con. Dùng khi muốn người dùng thư viện hoặc framework của bạn mở rộng các thành phần bên trong: họ kế thừa thành phần đó và ghi đè phương thức nhà máy (ví dụ UIWithRoundButtons ghi đè createButton() để trả về RoundButton). Dùng khi muốn tiết kiệm tài nguyên bằng cách tái sử dụng đối tượng có sẵn như kết nối cơ sở dữ liệu: hàm khởi tạo luôn phải trả về đối tượng mới, còn phương thức nhà máy có thể trả về đối tượng có sẵn từ cache hoặc pool.",
        ),
        vietnamese_example=VietnameseExample(
            title=LocalizedText(en="Bánh Chưng & Bánh Tét Workshop", vi="Xưởng Làm Bánh Chưng & Bánh Tét"),
            description=LocalizedText(
                en="Before Tết (Vietnamese New Year), every workshop follows the same routine: wrap the cakes, boil them, and place them on the ancestral altar. That routine is the core business logic of the base BanhFactory class, and it works only with the abstract Banh interface (wrap() and boil()). The one step that differs by region is which cake gets made, so it is pulled into the factory method makeBanh(). The Northern workshop (MienBacFactory) overrides it to return a square Bánh Chưng wrapped in lá dong; the Southern workshop (MienNamFactory) returns a cylindrical Bánh Tét wrapped in banana leaves. Adding a new region means adding one creator subclass, without touching the Tết routine.",
                vi="Trước Tết, xưởng nào cũng làm theo cùng một quy trình: gói bánh, luộc bánh, rồi bày lên bàn thờ tổ tiên. Quy trình đó là logic nghiệp vụ chính của lớp cơ sở BanhFactory, và nó chỉ làm việc với giao diện trừu tượng Banh (wrap() và boil()). Bước duy nhất khác nhau giữa các vùng là làm loại bánh nào, nên bước này được tách ra thành phương thức nhà máy makeBanh(). Xưởng miền Bắc (MienBacFactory) ghi đè để trả về Bánh Chưng vuông gói lá dong; xưởng miền Nam (MienNamFactory) trả về Bánh Tét hình trụ gói lá chuối. Thêm một vùng mới chỉ cần thêm một lớp creator con, không phải sửa quy trình đón Tết.",
            ),
            illustration="🏮 Xưởng Bánh Tết\n┌─────────────────────┐\n│   BanhFactory       │\n│  + makeBanh(): Banh │\n│  + prepareForTet()  │\n└─────────┬───────────┘\n          │\n    ┌─────┴──────┐\n    ▼            ▼\n┌───────┐  ┌──────────┐\n│Miền   │  │ Miền     │\n│Bắc 🟫 │  │ Nam 🟤   │\n│Bánh   │  │ Bánh Tét │\n│Chưng  │  │          │\n└───────┘  └──────────┘",
        ),
        code_examples=[
            CodeExample(
                language="python",
                label="Python",
                code="""from abc import ABC, abstractmethod


# Product: the interface every cake must follow
class Banh(ABC):
    @abstractmethod
    def wrap(self) -> str: ...

    @abstractmethod
    def boil(self) -> str: ...


# Concrete Products
class BanhChung(Banh):
    def wrap(self) -> str:
        return "Gói Bánh Chưng vuông bằng lá dong"

    def boil(self) -> str:
        return "Luộc Bánh Chưng 10-12 tiếng"


class BanhTet(Banh):
    def wrap(self) -> str:
        return "Gói Bánh Tét hình trụ bằng lá chuối"

    def boil(self) -> str:
        return "Luộc Bánh Tét 6-8 tiếng"


# Creator: declares the factory method and holds the core business logic
class BanhFactory(ABC):
    # Factory method: the return type is the Product interface
    @abstractmethod
    def make_banh(self) -> Banh: ...

    # Creating cakes is not the creator's main job; preparing for Tết is.
    # This logic only depends on the Banh interface.
    def prepare_for_tet(self) -> str:
        banh = self.make_banh()
        return " → ".join([banh.wrap(), banh.boil(), "Bày lên bàn thờ tổ tiên 🎋"])


# Concrete Creators override the factory method to change the product type
class MienBacFactory(BanhFactory):
    def make_banh(self) -> Banh:
        return BanhChung()


class MienNamFactory(BanhFactory):
    def make_banh(self) -> Banh:
        return BanhTet()


# The application picks a concrete creator from configuration
def create_factory(region: str) -> BanhFactory:
    if region == "north":
        return MienBacFactory()
    if region == "south":
        return MienNamFactory()
    raise ValueError(f"Unknown region: {region}")


# Client code works with the creator only through the base class
for region in ["north", "south"]:
    print(create_factory(region).prepare_for_tet())

# Output:
# Gói Bánh Chưng vuông bằng lá dong → Luộc Bánh Chưng 10-12 tiếng → Bày lên bàn thờ tổ tiên 🎋
# Gói Bánh Tét hình trụ bằng lá chuối → Luộc Bánh Tét 6-8 tiếng → Bày lên bàn thờ tổ tiên 🎋""",
            )
        ],
        structure_notes=LocalizedText(
            en="Product declares the interface common to all objects the creator and its subclasses can produce. Concrete Products are different implementations of that interface. Creator declares the factory method, whose return type must be the Product interface; it can be abstract to force every subclass to implement it, or return a default product. Despite the name, creating products is not the Creator's main responsibility: it usually holds core business logic that relies on the products, and the factory method decouples that logic from concrete product classes. Concrete Creators override the factory method to return a different product type. The factory method does not have to create a new instance every time; it can return existing objects from a cache or pool.",
            vi="Product khai báo giao diện chung cho mọi đối tượng mà creator và các lớp con của nó có thể tạo ra. Concrete Product là các triển khai khác nhau của giao diện đó. Creator khai báo phương thức nhà máy với kiểu trả về phải là giao diện Product; phương thức này có thể là trừu tượng để buộc mọi lớp con tự triển khai, hoặc trả về một sản phẩm mặc định. Dù tên gọi như vậy, tạo sản phẩm không phải trách nhiệm chính của Creator: nó thường chứa logic nghiệp vụ cốt lõi dựa trên sản phẩm, và phương thức nhà máy giúp tách logic đó khỏi các lớp sản phẩm cụ thể. Concrete Creator ghi đè phương thức nhà máy để trả về loại sản phẩm khác. Phương thức nhà máy không nhất thiết lúc nào cũng tạo đối tượng mới; nó có thể trả về đối tượng có sẵn từ cache hoặc pool.",
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
