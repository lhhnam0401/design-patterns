import type { Pattern } from '../types/pattern'

export const creationalPatterns: Pattern[] = [
  {
    id: 'factory-method',
    slug: 'factory-method',
    name: { en: 'Factory Method', vi: 'Phương Thức Nhà Máy' },
    category: 'creational',
    complexity: 1,
    popularity: 3,
    also_known_as: [{ en: 'Virtual Constructor', vi: 'Hàm khởi tạo ảo' }],
    intent: {
      en: 'Defines an interface for creating an object, but lets subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.',
      vi: 'Định nghĩa một giao diện để tạo đối tượng, nhưng để các lớp con quyết định lớp nào sẽ được khởi tạo. Factory Method cho phép một lớp trì hoãn việc khởi tạo cho các lớp con.',
    },
    problem: {
      en: 'You need to create objects but don\'t know in advance which exact class you\'ll need. The object creation logic should be flexible and extensible without modifying existing code.',
      vi: 'Bạn cần tạo đối tượng nhưng không biết trước lớp chính xác nào cần dùng. Logic tạo đối tượng cần linh hoạt và có thể mở rộng mà không sửa đổi mã hiện có.',
    },
    solution: {
      en: 'Replace direct object construction with calls to a special "factory" method. Subclasses can override this method to change the class of objects being created.',
      vi: 'Thay thế việc tạo đối tượng trực tiếp bằng cách gọi một phương thức "nhà máy" đặc biệt. Các lớp con có thể ghi đè phương thức này để thay đổi lớp của đối tượng được tạo.',
    },
    applicability: {
      en: 'Use when you don\'t know ahead of time what class you need to instantiate, or when you want subclasses to specify the objects they create, or to encapsulate object creation logic.',
      vi: 'Sử dụng khi bạn không biết trước lớp nào cần khởi tạo, hoặc khi muốn lớp con chỉ định đối tượng chúng tạo, hoặc để đóng gói logic tạo đối tượng.',
    },
    vietnamese_example: {
      title: { en: 'Bánh Chưng & Bánh Tét Workshop', vi: 'Xưởng Làm Bánh Chưng & Bánh Tét' },
      description: {
        en: 'During Tết (Vietnamese New Year), different regions make different rice cakes. In the North, workshops make Bánh Chưng (square); in the South, they make Bánh Tét (cylindrical). Both are "sticky rice cake factories" but each produces its own regional variant. The factory method lets each workshop (subclass) decide what type of cake to create, while the customer just asks for "a Tết cake".',
        vi: 'Trong dịp Tết Nguyên Đán, các vùng miền khác nhau làm loại bánh khác nhau. Ở miền Bắc, xưởng làm Bánh Chưng (hình vuông); ở miền Nam, họ làm Bánh Tét (hình trụ). Cả hai đều là "xưởng bánh nếp" nhưng mỗi nơi sản xuất biến thể vùng miền của riêng mình. Phương thức nhà máy cho phép mỗi xưởng (lớp con) quyết định loại bánh nào cần tạo, trong khi khách hàng chỉ yêu cầu "một cái bánh Tết".',
      },
      illustration: '🏮 Xưởng Bánh Tết\n┌─────────────────────┐\n│   BanhFactory       │\n│  + makeBanh()       │\n└─────────┬───────────┘\n          │\n    ┌─────┴──────┐\n    ▼            ▼\n┌───────┐  ┌──────────┐\n│Miền   │  │ Miền     │\n│Bắc 🟫 │  │ Nam 🟤   │\n│Bánh   │  │ Bánh Tét │\n│Chưng  │  │          │\n└───────┘  └──────────┘',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod

class BanhFactory(ABC):
    """Factory Method - Xưởng bánh Tết"""

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

# Client code
factories = [MienBacFactory(), MienNamFactory()]
for factory in factories:
    print(factory.prepare_for_tet())

# Output:
# 🎋 Chuẩn bị Tết: 🟫 Bánh Chưng (hình vuông, miền Bắc) đã sẵn sàng!
# 🎋 Chuẩn bị Tết: 🟤 Bánh Tét (hình trụ, miền Nam) đã sẵn sàng!`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `interface Banh {
  name: string
  shape: string
  region: string
}

abstract class BanhFactory {
  abstract makeBanh(): Banh

  prepareForTet(): string {
    const banh = this.makeBanh()
    return \`🎋 Tết prep: \${banh.name} (\${banh.shape}) from \${banh.region}\`
  }
}

class MienBacFactory extends BanhFactory {
  makeBanh(): Banh {
    return { name: 'Bánh Chưng', shape: 'Square', region: 'North Vietnam' }
  }
}

class MienNamFactory extends BanhFactory {
  makeBanh(): Banh {
    return { name: 'Bánh Tét', shape: 'Cylindrical', region: 'South Vietnam' }
  }
}

const factories: BanhFactory[] = [new MienBacFactory(), new MienNamFactory()]
factories.forEach(f => console.log(f.prepareForTet()))`,
      },
    ],
    structure_notes: {
      en: 'The Creator declares the factory method that returns new Product objects. Concrete Creators override the factory method to return different types of products.',
      vi: 'Creator khai báo phương thức nhà máy trả về đối tượng Product mới. Các Concrete Creator ghi đè phương thức nhà máy để trả về các loại sản phẩm khác nhau.',
    },
  },

  {
    id: 'abstract-factory',
    slug: 'abstract-factory',
    name: { en: 'Abstract Factory', vi: 'Nhà Máy Trừu Tượng' },
    category: 'creational',
    complexity: 2,
    popularity: 3,
    intent: {
      en: 'Provides an interface for creating families of related or dependent objects without specifying their concrete classes.',
      vi: 'Cung cấp một giao diện để tạo ra các họ đối tượng liên quan hoặc phụ thuộc nhau mà không cần chỉ định các lớp cụ thể của chúng.',
    },
    problem: {
      en: 'Your code needs to work with various families of related products, but you don\'t want to depend on the concrete classes of those products.',
      vi: 'Mã của bạn cần hoạt động với nhiều họ sản phẩm liên quan, nhưng bạn không muốn phụ thuộc vào các lớp cụ thể của những sản phẩm đó.',
    },
    solution: {
      en: 'Declare interfaces for each distinct product, then make all variants of products follow those interfaces. Create an abstract factory interface with creation methods for all products.',
      vi: 'Khai báo giao diện cho mỗi sản phẩm riêng biệt, sau đó làm cho tất cả các biến thể sản phẩm tuân theo các giao diện đó. Tạo giao diện nhà máy trừu tượng với các phương thức tạo cho tất cả sản phẩm.',
    },
    applicability: {
      en: 'Use when code needs to work with various families of related products, or when you want to provide a library of products and reveal only their interfaces, not implementations.',
      vi: 'Sử dụng khi mã cần hoạt động với nhiều họ sản phẩm liên quan, hoặc khi bạn muốn cung cấp thư viện sản phẩm và chỉ tiết lộ giao diện của chúng, không phải triển khai.',
    },
    vietnamese_example: {
      title: { en: 'Traditional Tết Feast Set', vi: 'Bộ Mâm Cỗ Tết Truyền Thống' },
      description: {
        en: 'A Vietnamese Tết feast (mâm cỗ) requires a complete set of dishes that must match regionally. A Northern Tết set includes: Bánh Chưng + Giò Lụa + Dưa Hành. A Southern Tết set includes: Bánh Tét + Chả Lụa + Dưa Kiệu. Each "feast factory" produces a complete, consistent family of dishes. You cannot mix a Northern bánh with Southern giò — they must come from the same regional factory.',
        vi: 'Mâm cỗ Tết Việt Nam yêu cầu một bộ món ăn hoàn chỉnh phải phù hợp theo vùng miền. Bộ Tết miền Bắc gồm: Bánh Chưng + Giò Lụa + Dưa Hành. Bộ Tết miền Nam gồm: Bánh Tét + Chả Lụa + Dưa Kiệu. Mỗi "nhà máy mâm cỗ" sản xuất một họ món ăn hoàn chỉnh và nhất quán. Bạn không thể trộn bánh miền Bắc với giò miền Nam — chúng phải đến từ cùng một nhà máy vùng miền.',
      },
      illustration: '🏮 Mâm Cỗ Tết\n       «interface»\n      MamCoFactory\n  +makeBanh() +makeGio()\n  +makeDua()\n       │\n  ┌────┴─────┐\n  ▼          ▼\nMienBac   MienNam\n🟫Bánh    🟤Bánh\n🥩Giò     🥩Chả\n🫙Dưa     🫙Dưa\n Hành      Kiệu',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod

# Abstract products
class Banh(ABC):
    @abstractmethod
    def describe(self) -> str: pass

class Gio(ABC):
    @abstractmethod
    def describe(self) -> str: pass

# Concrete products - Miền Bắc
class BanhChung(Banh):
    def describe(self): return "🟫 Bánh Chưng vuông"

class GioLua(Gio):
    def describe(self): return "🥩 Giò Lụa"

# Concrete products - Miền Nam
class BanhTet(Banh):
    def describe(self): return "🟤 Bánh Tét tròn"

class ChaLua(Gio):
    def describe(self): return "🥩 Chả Lụa"

# Abstract Factory
class MamCoFactory(ABC):
    @abstractmethod
    def make_banh(self) -> Banh: pass
    @abstractmethod
    def make_gio(self) -> Gio: pass

# Concrete Factories
class MienBacFactory(MamCoFactory):
    def make_banh(self): return BanhChung()
    def make_gio(self): return GioLua()

class MienNamFactory(MamCoFactory):
    def make_banh(self): return BanhTet()
    def make_gio(self): return ChaLua()

# Client
def prepare_mam_co(factory: MamCoFactory):
    banh = factory.make_banh()
    gio = factory.make_gio()
    print(f"Mâm cỗ: {banh.describe()} + {gio.describe()}")

prepare_mam_co(MienBacFactory())  # 🟫 Bánh Chưng + 🥩 Giò Lụa
prepare_mam_co(MienNamFactory())  # 🟤 Bánh Tét + 🥩 Chả Lụa`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `interface Banh { describe(): string }
interface Gio { describe(): string }

class BanhChung implements Banh { describe() { return '🟫 Bánh Chưng vuông' } }
class GioLua implements Gio { describe() { return '🥩 Giò Lụa' } }
class BanhTet implements Banh { describe() { return '🟤 Bánh Tét tròn' } }
class ChaLua implements Gio { describe() { return '🥩 Chả Lụa' } }

interface MamCoFactory {
  makeBanh(): Banh
  makeGio(): Gio
}

class MienBacFactory implements MamCoFactory {
  makeBanh() { return new BanhChung() }
  makeGio() { return new GioLua() }
}

class MienNamFactory implements MamCoFactory {
  makeBanh() { return new BanhTet() }
  makeGio() { return new ChaLua() }
}

function prepareMamCo(factory: MamCoFactory) {
  const banh = factory.makeBanh()
  const gio = factory.makeGio()
  console.log(\`Mâm cỗ: \${banh.describe()} + \${gio.describe()}\`)
}

prepareMamCo(new MienBacFactory()) // 🟫 Bánh Chưng + 🥩 Giò Lụa
prepareMamCo(new MienNamFactory()) // 🟤 Bánh Tét + 🥩 Chả Lụa`,
      },
    ],
    structure_notes: {
      en: 'AbstractFactory declares creation methods for each product type. ConcreteFactories implement these methods for specific product families.',
      vi: 'AbstractFactory khai báo các phương thức tạo cho mỗi loại sản phẩm. ConcreteFactory thực hiện các phương thức này cho các họ sản phẩm cụ thể.',
    },
  },

  {
    id: 'builder',
    slug: 'builder',
    name: { en: 'Builder', vi: 'Xây Dựng Từng Bước' },
    category: 'creational',
    complexity: 2,
    popularity: 3,
    intent: {
      en: 'Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.',
      vi: 'Tách biệt việc xây dựng một đối tượng phức tạp khỏi đại diện của nó, cho phép cùng một quá trình xây dựng tạo ra các đại diện khác nhau.',
    },
    problem: {
      en: 'You need to create a complex object with many optional parts and configurations. A constructor with many parameters leads to a telescoping constructor problem.',
      vi: 'Bạn cần tạo một đối tượng phức tạp với nhiều phần và cấu hình tùy chọn. Hàm khởi tạo với nhiều tham số dẫn đến vấn đề "telescoping constructor".',
    },
    solution: {
      en: 'Extract the object construction code into a separate Builder class. Organize construction code as a series of steps, call only steps needed for a particular configuration.',
      vi: 'Tách mã xây dựng đối tượng vào một lớp Builder riêng biệt. Tổ chức mã xây dựng thành một loạt các bước, chỉ gọi các bước cần thiết cho một cấu hình cụ thể.',
    },
    applicability: {
      en: 'Use to get rid of a "telescoping constructor", or when you want your code to be able to create different representations of the same product.',
      vi: 'Sử dụng để loại bỏ "telescoping constructor", hoặc khi bạn muốn mã có thể tạo ra các đại diện khác nhau của cùng một sản phẩm.',
    },
    vietnamese_example: {
      title: { en: 'Building a Traditional Đình (Communal House)', vi: 'Xây Đình Làng Truyền Thống' },
      description: {
        en: 'Building a Vietnamese communal house (Đình làng) is a complex step-by-step process: first lay the foundation, erect the wooden columns (cột gỗ), build the curved roof (mái cong), add dragon carvings (chạm khắc rồng), and finally set up the altar (bàn thờ Thành Hoàng). A Director (the master carpenter - thợ cả) orchestrates these steps, while the Builder handles each specific task. Different builders can create a simple community hall or a grand royal đình using the same process.',
        vi: 'Xây dựng Đình làng Việt Nam là một quá trình phức tạp từng bước: đầu tiên đặt nền móng, dựng cột gỗ, xây mái cong, thêm chạm khắc rồng, và cuối cùng lập bàn thờ Thành Hoàng. Một Chỉ Đạo (thợ cả) điều phối các bước này, trong khi Builder xử lý từng nhiệm vụ cụ thể. Các builder khác nhau có thể tạo ra một nhà cộng đồng đơn giản hoặc một đình hoàng tráng bằng cùng một quy trình.',
      },
      illustration: '🏛️ Xây Đình Làng\nDirector (Thợ Cả)\n   │\n   ├──▶ buildFoundation()  🪨\n   ├──▶ buildColumns()     🪵\n   ├──▶ buildRoof()        🏗️\n   ├──▶ addCarvings()      🐉\n   └──▶ setupAltar()       🕯️\n\nĐình Đơn Giản  vs  Đình Hoàng',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from dataclasses import dataclass, field
from typing import List

@dataclass
class DinhLang:
    foundation: str = ""
    columns: int = 0
    roof_style: str = ""
    carvings: List[str] = field(default_factory=list)
    altar: bool = False

    def describe(self):
        print(f"🏛️ Đình làng:")
        print(f"  Nền: {self.foundation}")
        print(f"  Cột: {self.columns} cột gỗ")
        print(f"  Mái: {self.roof_style}")
        print(f"  Chạm khắc: {', '.join(self.carvings)}")
        print(f"  Bàn thờ: {'Có ✅' if self.altar else 'Không'}")

class DinhBuilder:
    def __init__(self):
        self._dinh = DinhLang()

    def build_foundation(self, material: str):
        self._dinh.foundation = material
        return self

    def build_columns(self, count: int):
        self._dinh.columns = count
        return self

    def build_roof(self, style: str):
        self._dinh.roof_style = style
        return self

    def add_carving(self, motif: str):
        self._dinh.carvings.append(motif)
        return self

    def setup_altar(self):
        self._dinh.altar = True
        return self

    def build(self) -> DinhLang:
        return self._dinh

class DinhDirector:
    def build_simple_dinh(self, builder: DinhBuilder) -> DinhLang:
        return (builder
            .build_foundation("Đá xanh")
            .build_columns(4)
            .build_roof("Mái ngói đơn")
            .setup_altar()
            .build())

    def build_grand_dinh(self, builder: DinhBuilder) -> DinhLang:
        return (builder
            .build_foundation("Đá granite")
            .build_columns(16)
            .build_roof("Mái cong tứ trụ")
            .add_carving("🐉 Rồng chầu")
            .add_carving("🦅 Phượng vũ")
            .add_carving("🦁 Lân múa")
            .setup_altar()
            .build())

director = DinhDirector()
simple = director.build_simple_dinh(DinhBuilder())
simple.describe()

grand = director.build_grand_dinh(DinhBuilder())
grand.describe()`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `class DinhLang {
  constructor(
    public foundation: string = '',
    public columns: number = 0,
    public roofStyle: string = '',
    public carvings: string[] = [],
    public altar: boolean = false
  ) {}

  describe() {
    console.log(\`🏛️ \${this.columns} cột, mái \${this.roofStyle}, \${this.carvings.join(', ')}\`)
  }
}

class DinhBuilder {
  private dinh = new DinhLang()

  buildFoundation(material: string) { this.dinh.foundation = material; return this }
  buildColumns(count: number) { this.dinh.columns = count; return this }
  buildRoof(style: string) { this.dinh.roofStyle = style; return this }
  addCarving(motif: string) { this.dinh.carvings.push(motif); return this }
  setupAltar() { this.dinh.altar = true; return this }
  build() { return this.dinh }
}

// Usage
const dinh = new DinhBuilder()
  .buildFoundation('Đá granite')
  .buildColumns(16)
  .buildRoof('Mái cong tứ trụ')
  .addCarving('🐉 Rồng chầu')
  .addCarving('🦅 Phượng vũ')
  .setupAltar()
  .build()

dinh.describe()`,
      },
    ],
    structure_notes: {
      en: 'Builder interface declares construction steps. ConcreteBuilder provides implementations and tracks the product. Director orchestrates the build order.',
      vi: 'Giao diện Builder khai báo các bước xây dựng. ConcreteBuilder cung cấp các triển khai và theo dõi sản phẩm. Director điều phối thứ tự xây dựng.',
    },
  },

  {
    id: 'prototype',
    slug: 'prototype',
    name: { en: 'Prototype', vi: 'Nguyên Mẫu' },
    category: 'creational',
    complexity: 1,
    popularity: 2,
    intent: {
      en: 'Specifies the kinds of objects to create using a prototypical instance, and creates new objects by copying this prototype.',
      vi: 'Chỉ định các loại đối tượng cần tạo bằng cách sử dụng một thể hiện nguyên mẫu, và tạo các đối tượng mới bằng cách sao chép nguyên mẫu này.',
    },
    problem: {
      en: 'You need to create copies of objects, but the class of the object is not known until runtime, or creating a new instance from scratch is more expensive than copying an existing one.',
      vi: 'Bạn cần tạo bản sao của đối tượng, nhưng lớp của đối tượng không được biết cho đến thời gian chạy, hoặc tạo một thể hiện mới từ đầu tốn kém hơn sao chép một thể hiện hiện có.',
    },
    solution: {
      en: 'Delegate the cloning process to the actual objects being cloned. Declare a common interface for all objects that support cloning with a clone() method.',
      vi: 'Ủy quyền quá trình nhân bản cho chính các đối tượng được nhân bản. Khai báo giao diện chung cho tất cả đối tượng hỗ trợ nhân bản với phương thức clone().',
    },
    applicability: {
      en: 'Use when your code shouldn\'t depend on the concrete classes of objects you need to copy, or when you want to reduce the number of subclasses.',
      vi: 'Sử dụng khi mã của bạn không nên phụ thuộc vào các lớp cụ thể của đối tượng cần sao chép, hoặc khi bạn muốn giảm số lượng lớp con.',
    },
    vietnamese_example: {
      title: { en: 'Woodblock Printing (Tranh Đông Hồ)', vi: 'In Tranh Đông Hồ Bằng Bản Khắc Gỗ' },
      description: {
        en: 'Tranh Đông Hồ (Đông Hồ folk paintings) are traditional Vietnamese woodblock prints from Bắc Ninh province. A master craftsman carves the original woodblock (the prototype). To create new paintings, you don\'t redraw each one — you press the woodblock onto paper to clone it. Each print is an exact copy of the prototype, but can then be individually hand-colored. This is Prototype pattern: the woodblock is the prototype, pressing it creates clones.',
        vi: 'Tranh Đông Hồ là những bức tranh khắc gỗ dân gian truyền thống Việt Nam từ tỉnh Bắc Ninh. Một nghệ nhân bậc thầy khắc bản gỗ gốc (nguyên mẫu). Để tạo tranh mới, bạn không vẽ lại từng bức — bạn ấn bản gỗ lên giấy để nhân bản nó. Mỗi bức in là bản sao chính xác của nguyên mẫu, nhưng sau đó có thể được tô màu thủ công riêng lẻ. Đây là mẫu Prototype: bản gỗ là nguyên mẫu, việc ấn bản tạo ra các bản sao.',
      },
      illustration: '🎨 Tranh Đông Hồ\nBản gỗ gốc (Prototype)\n    🪵 [Gà Trống]\n         │ clone()\n    ┌────┼────┐\n    ▼    ▼    ▼\n  🖼️   🖼️   🖼️\n  Đỏ  Xanh  Vàng\n(mỗi bản in có thể\n tô màu khác nhau)',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `import copy
from abc import ABC, abstractmethod

class TrainhDongHo(ABC):
    def __init__(self, motif: str, colors: list[str]):
        self.motif = motif
        self.colors = colors.copy()

    @abstractmethod
    def clone(self) -> 'TrainhDongHo':
        pass

    def describe(self):
        print(f"🎨 Tranh: {self.motif} | Màu: {', '.join(self.colors)}")

class GaGayTranh(TrainhDongHo):
    """Gà Gáy sáng - Rooster painting (prosperity)"""
    def clone(self) -> 'GaGayTranh':
        return copy.deepcopy(self)

class DamCuoiTranh(TrainhDongHo):
    """Đám Cưới Chuột - Mouse wedding (satire)"""
    def clone(self) -> 'DamCuoiTranh':
        return copy.deepcopy(self)

# Original prototype - carved woodblock
prototype_ga = GaGayTranh("🐓 Gà Gáy Sáng", ["Đỏ son", "Vàng nghệ"])

# Clone and customize each print
ban_in_1 = prototype_ga.clone()
ban_in_1.colors = ["Đỏ son", "Xanh lam"]  # Different coloring

ban_in_2 = prototype_ga.clone()
ban_in_2.colors = ["Vàng nghệ", "Nâu đất"]

prototype_ga.describe()  # 🎨 Tranh: 🐓 Gà Gáy Sáng | Màu: Đỏ son, Vàng nghệ
ban_in_1.describe()      # 🎨 Tranh: 🐓 Gà Gáy Sáng | Màu: Đỏ son, Xanh lam
ban_in_2.describe()      # 🎨 Tranh: 🐓 Gà Gáy Sáng | Màu: Vàng nghệ, Nâu đất`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `interface Cloneable<T> {
  clone(): T
}

class TranhDongHo implements Cloneable<TranhDongHo> {
  constructor(
    public motif: string,
    public colors: string[]
  ) {}

  clone(): TranhDongHo {
    return new TranhDongHo(this.motif, [...this.colors])
  }

  describe() {
    console.log(\`🎨 \${this.motif} | Colors: \${this.colors.join(', ')}\`)
  }
}

// Original woodblock prototype
const prototype = new TranhDongHo('🐓 Gà Gáy Sáng', ['Đỏ son', 'Vàng nghệ'])

// Create prints by cloning
const print1 = prototype.clone()
print1.colors = ['Đỏ son', 'Xanh lam']

const print2 = prototype.clone()
print2.colors = ['Vàng nghệ', 'Nâu đất']

prototype.describe() // Original
print1.describe()    // Custom blue
print2.describe()    // Custom earth tones`,
      },
    ],
    structure_notes: {
      en: 'Prototype interface declares the cloning method. ConcretePrototype implements the cloning. Client creates a copy of the prototype without coupling to its class.',
      vi: 'Giao diện Prototype khai báo phương thức nhân bản. ConcretePrototype thực hiện nhân bản. Client tạo bản sao của prototype mà không phụ thuộc vào lớp của nó.',
    },
  },

  {
    id: 'singleton',
    slug: 'singleton',
    name: { en: 'Singleton', vi: 'Đơn Thể' },
    category: 'creational',
    complexity: 1,
    popularity: 2,
    intent: {
      en: 'Ensures a class has only one instance, and provides a global point of access to it.',
      vi: 'Đảm bảo một lớp chỉ có một thể hiện duy nhất và cung cấp điểm truy cập toàn cục đến nó.',
    },
    problem: {
      en: 'Some components should have exactly one instance: a config manager, a thread pool, a logging service. You need both a single instance guarantee and global access.',
      vi: 'Một số thành phần chỉ nên có đúng một thể hiện: quản lý cấu hình, thread pool, dịch vụ ghi log. Bạn cần cả đảm bảo một thể hiện duy nhất và truy cập toàn cục.',
    },
    solution: {
      en: 'Make the default constructor private, create a static creation method that acts as a constructor — it calls the private constructor and saves the object in a static field.',
      vi: 'Đặt constructor mặc định là riêng tư, tạo phương thức tạo tĩnh đóng vai trò như constructor — nó gọi constructor riêng tư và lưu đối tượng vào trường tĩnh.',
    },
    applicability: {
      en: 'Use when a class should have exactly one instance available to all clients, such as a shared database connection or configuration object.',
      vi: 'Sử dụng khi một lớp nên có đúng một thể hiện dành cho tất cả client, chẳng hạn như kết nối cơ sở dữ liệu hoặc đối tượng cấu hình được chia sẻ.',
    },
    vietnamese_example: {
      title: { en: 'The King of Hùng (Vua Hùng)', vi: 'Vua Hùng - Một Vị Vua Duy Nhất' },
      description: {
        en: 'In Vietnamese mythology, the Hùng Kings (Hùng Vương) established the first Vietnamese nation — Văn Lang. There can only be ONE reigning king at a time. All subjects access the same king; you cannot create a "second king". When the old king abdicates, the throne passes to one successor. The royal court (TrieuDinhSingleton) ensures there is always exactly one reigning monarch, accessible to all.',
        vi: 'Trong thần thoại Việt Nam, Hùng Vương lập nên nước Văn Lang đầu tiên. Chỉ có THỂ có MỘT vị vua trị vì tại một thời điểm. Tất cả thần dân đều tiếp cận cùng một vị vua; bạn không thể tạo ra "vua thứ hai". Khi vua cũ nhường ngôi, ngai vàng truyền cho một người kế vị. Triều đình (TrieuDinhSingleton) đảm bảo luôn có đúng một vị vua trị vì, có thể tiếp cận được bởi tất cả mọi người.',
      },
      illustration: '👑 Triều Đình Văn Lang\n┌──────────────────────┐\n│  TrieuDinh           │\n│  - instance: static  │\n│  - vuaHung: VuaHung  │\n│  + getInstance() 🔒  │\n└──────────────────────┘\n         │ (1 instance)\n    ┌────┼────┐\n    ▼    ▼    ▼\n  Quân  Dân  Quan\n (all see same king)',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `import threading

class TrieuDinh:
    """Singleton - Triều đình Văn Lang chỉ có một vua"""
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:  # Double-checked locking
                    cls._instance = super().__new__(cls)
                    cls._instance._vua = None
        return cls._instance

    def set_vua(self, ten_vua: str):
        self._vua = ten_vua
        print(f"👑 Hùng Vương {ten_vua} lên ngôi!")

    def get_vua(self) -> str:
        return self._vua

    def ban_lenh(self, lenh: str):
        print(f"📜 Chiếu chỉ của Hùng Vương {self._vua}: {lenh}")

# Only one triều đình exists
trieu_dinh_1 = TrieuDinh()
trieu_dinh_2 = TrieuDinh()

print(trieu_dinh_1 is trieu_dinh_2)  # True - same instance!

trieu_dinh_1.set_vua("thứ Sáu")
trieu_dinh_2.ban_lenh("Xây dựng đất nước Văn Lang")

# Even from different parts of the kingdom, same king
print(f"Dân hỏi: Vua là ai? → {trieu_dinh_2.get_vua()}")`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `class TrieuDinh {
  private static instance: TrieuDinh
  private vuaHung: string = ''

  private constructor() {}

  static getInstance(): TrieuDinh {
    if (!TrieuDinh.instance) {
      TrieuDinh.instance = new TrieuDinh()
    }
    return TrieuDinh.instance
  }

  setVua(tenVua: string): void {
    this.vuaHung = tenVua
    console.log(\`👑 Hùng Vương \${tenVua} lên ngôi!\`)
  }

  banLenh(lenh: string): void {
    console.log(\`📜 Chiếu chỉ Hùng Vương \${this.vuaHung}: \${lenh}\`)
  }
}

// Only one instance - all parts of kingdom use the same court
const trieuDinh1 = TrieuDinh.getInstance()
const trieuDinh2 = TrieuDinh.getInstance()

console.log(trieuDinh1 === trieuDinh2) // true

trieuDinh1.setVua('thứ Sáu')
trieuDinh2.banLenh('Xây dựng đất nước Văn Lang')`,
      },
    ],
    structure_notes: {
      en: 'Singleton class declares a static getInstance() method that returns the same instance of its own class. The constructor is kept private to prevent direct instantiation.',
      vi: 'Lớp Singleton khai báo phương thức tĩnh getInstance() trả về cùng một thể hiện của lớp đó. Constructor được giữ riêng tư để ngăn chặn khởi tạo trực tiếp.',
    },
  },
]
