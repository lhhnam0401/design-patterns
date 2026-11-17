import type { Pattern } from '../types/pattern'

export const creationalPatterns: Omit<Pattern, 'diagram'>[] = [
  {
    id: 'factory-method',
    slug: 'factory-method',
    name: { en: 'Factory Method', vi: 'Phương Thức Nhà Máy' },
    category: 'creational',
    complexity: 1,
    popularity: 3,
    also_known_as: [{ en: 'Virtual Constructor', vi: 'Hàm khởi tạo ảo' }],
    intent: {
      en: 'Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.',
      vi: 'Factory Method là một mẫu thiết kế khởi tạo, cung cấp một giao diện để tạo đối tượng ở lớp cha, nhưng cho phép các lớp con thay đổi loại đối tượng sẽ được tạo ra.',
    },
    problem: {
      en: 'Imagine a logistics app whose first version only handles trucks, so most of the code lives inside the Truck class. Later, sea transport companies ask for ships. Because the code is coupled to Truck, adding Ship means changing the whole codebase, and every new transport type means doing it again. You end up with code full of conditionals that switch behavior depending on the transport class.',
      vi: 'Hãy tưởng tượng một ứng dụng logistics mà phiên bản đầu chỉ hỗ trợ xe tải, nên phần lớn mã nằm trong lớp Truck. Sau đó, các công ty vận tải biển muốn thêm tàu thủy. Vì mã đã phụ thuộc chặt vào Truck, thêm Ship đồng nghĩa với việc sửa toàn bộ mã nguồn, và mỗi loại phương tiện mới lại phải làm lại như vậy. Kết quả là mã chứa đầy câu lệnh điều kiện để đổi hành vi theo từng lớp phương tiện.',
    },
    solution: {
      en: 'Replace direct construction calls (the new operator) with calls to a special factory method. Objects are still created with new, but from inside the factory method; the returned objects are called products. Subclasses can override the factory method to change the class of products it creates. The one limitation: all products must share a common base class or interface (e.g. Truck and Ship both implement Transport with a deliver() method), and the factory method in the base class must declare that interface as its return type. The client code then treats every product as an abstract Transport and does not care how each one implements deliver().',
      vi: 'Thay các lệnh tạo đối tượng trực tiếp (toán tử new) bằng lời gọi tới một phương thức nhà máy đặc biệt. Đối tượng vẫn được tạo bằng new, nhưng bên trong phương thức nhà máy; các đối tượng được trả về gọi là sản phẩm (product). Lớp con có thể ghi đè phương thức nhà máy để thay đổi lớp của sản phẩm được tạo. Hạn chế duy nhất: mọi sản phẩm phải có chung một lớp cơ sở hoặc giao diện (ví dụ Truck và Ship cùng triển khai Transport với phương thức deliver()), và phương thức nhà máy ở lớp cơ sở phải khai báo kiểu trả về là giao diện đó. Khi đó, mã client coi mọi sản phẩm là một Transport trừu tượng và không cần biết từng loại triển khai deliver() ra sao.',
    },
    applicability: {
      en: 'Use Factory Method when you don\'t know beforehand the exact types and dependencies of the objects your code should work with: construction code is separated from the code that uses the product, so adding a product type only needs a new creator subclass. Use it when you want users of your library or framework to extend its internal components: they subclass the component and override the factory method (e.g. UIWithRoundButtons overrides createButton() to return RoundButton). Use it when you want to save resources by reusing existing objects such as database connections: a constructor must always return a new object, but a factory method can return an existing instance from a cache or pool.',
      vi: 'Dùng Factory Method khi bạn không biết trước chính xác loại và phụ thuộc của các đối tượng mà mã cần làm việc cùng: mã khởi tạo được tách khỏi mã sử dụng sản phẩm, nên thêm loại sản phẩm mới chỉ cần thêm một lớp creator con. Dùng khi muốn người dùng thư viện hoặc framework của bạn mở rộng các thành phần bên trong: họ kế thừa thành phần đó và ghi đè phương thức nhà máy (ví dụ UIWithRoundButtons ghi đè createButton() để trả về RoundButton). Dùng khi muốn tiết kiệm tài nguyên bằng cách tái sử dụng đối tượng có sẵn như kết nối cơ sở dữ liệu: hàm khởi tạo luôn phải trả về đối tượng mới, còn phương thức nhà máy có thể trả về đối tượng có sẵn từ cache hoặc pool.',
    },
    vietnamese_example: {
      title: { en: 'Bánh Chưng & Bánh Tét Workshop', vi: 'Xưởng Làm Bánh Chưng & Bánh Tét' },
      description: {
        en: 'Before Tết (Vietnamese New Year), every workshop follows the same routine: wrap the cakes, boil them, and place them on the ancestral altar. That routine is the core business logic of the base RiceCakeFactory class, and it works only with the abstract RiceCake interface (wrap() and boil()). The one step that differs by region is which cake gets made, so it is pulled into the factory method makeRiceCake(). The Northern workshop (NorthernFactory) overrides it to return a square Bánh Chưng wrapped in lá dong; the Southern workshop (SouthernFactory) returns a cylindrical Bánh Tét wrapped in banana leaves. Adding a new region means adding one creator subclass, without touching the Tết routine.',
        vi: 'Trước Tết, xưởng nào cũng làm theo cùng một quy trình: gói bánh, luộc bánh, rồi bày lên bàn thờ tổ tiên. Quy trình đó là logic nghiệp vụ chính của lớp cơ sở RiceCakeFactory, và nó chỉ làm việc với giao diện trừu tượng RiceCake (wrap() và boil()). Bước duy nhất khác nhau giữa các vùng là làm loại bánh nào, nên bước này được tách ra thành phương thức nhà máy makeRiceCake(). Xưởng miền Bắc (NorthernFactory) ghi đè để trả về Bánh Chưng vuông gói lá dong; xưởng miền Nam (SouthernFactory) trả về Bánh Tét hình trụ gói lá chuối. Thêm một vùng mới chỉ cần thêm một lớp creator con, không phải sửa quy trình đón Tết.',
      },
      illustration: '🏮 Xưởng Bánh Tết\n┌───────────────────────────┐\n│   RiceCakeFactory         │\n│ + makeRiceCake(): RiceCake│\n│ + prepareForNewYear()     │\n└─────────────┬─────────────┘\n              │\n        ┌─────┴──────┐\n        ▼            ▼\n┌────────────┐  ┌────────────┐\n│Northern    │  │Southern    │\n│Factory 🟫  │  │Factory 🟤  │\n│Bánh Chưng  │  │Bánh Tét    │\n└────────────┘  └────────────┘',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod


# Product: the interface every cake must follow
class RiceCake(ABC):
    @abstractmethod
    def wrap(self) -> str: ...

    @abstractmethod
    def boil(self) -> str: ...


# Concrete Products
class ChungCake(RiceCake):
    def wrap(self) -> str:
        return "Gói Bánh Chưng vuông bằng lá dong"

    def boil(self) -> str:
        return "Luộc Bánh Chưng 10-12 tiếng"


class TetCake(RiceCake):
    def wrap(self) -> str:
        return "Gói Bánh Tét hình trụ bằng lá chuối"

    def boil(self) -> str:
        return "Luộc Bánh Tét 6-8 tiếng"


# Creator: declares the factory method and holds the core business logic
class RiceCakeFactory(ABC):
    # Factory method: the return type is the Product interface
    @abstractmethod
    def make_rice_cake(self) -> RiceCake: ...

    # Creating cakes is not the creator's main job; preparing for Tết is.
    # This logic only depends on the RiceCake interface.
    def prepare_for_new_year(self) -> str:
        cake = self.make_rice_cake()
        return " → ".join([cake.wrap(), cake.boil(), "Bày lên bàn thờ tổ tiên 🎋"])


# Concrete Creators override the factory method to change the product type
class NorthernFactory(RiceCakeFactory):
    def make_rice_cake(self) -> RiceCake:
        return ChungCake()


class SouthernFactory(RiceCakeFactory):
    def make_rice_cake(self) -> RiceCake:
        return TetCake()


# The application picks a concrete creator from configuration
def create_factory(region: str) -> RiceCakeFactory:
    if region == "north":
        return NorthernFactory()
    if region == "south":
        return SouthernFactory()
    raise ValueError(f"Unknown region: {region}")


# Client code works with the creator only through the base class
for region in ["north", "south"]:
    print(create_factory(region).prepare_for_new_year())

# Output:
# Gói Bánh Chưng vuông bằng lá dong → Luộc Bánh Chưng 10-12 tiếng → Bày lên bàn thờ tổ tiên 🎋
# Gói Bánh Tét hình trụ bằng lá chuối → Luộc Bánh Tét 6-8 tiếng → Bày lên bàn thờ tổ tiên 🎋`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Product: the interface every cake must follow
interface RiceCake {
  wrap(): string
  boil(): string
}

// Concrete Products
class ChungCake implements RiceCake {
  wrap() { return 'Gói Bánh Chưng vuông bằng lá dong' }
  boil() { return 'Luộc Bánh Chưng 10-12 tiếng' }
}

class TetCake implements RiceCake {
  wrap() { return 'Gói Bánh Tét hình trụ bằng lá chuối' }
  boil() { return 'Luộc Bánh Tét 6-8 tiếng' }
}

// Creator: declares the factory method and holds the core business logic
abstract class RiceCakeFactory {
  // Factory method: the return type is the Product interface
  abstract makeRiceCake(): RiceCake

  // Creating cakes is not the creator's main job; preparing for Tết is.
  // This logic only depends on the RiceCake interface.
  prepareForNewYear(): string {
    const cake = this.makeRiceCake()
    return [cake.wrap(), cake.boil(), 'Bày lên bàn thờ tổ tiên 🎋'].join(' → ')
  }
}

// Concrete Creators override the factory method to change the product type
class NorthernFactory extends RiceCakeFactory {
  makeRiceCake(): RiceCake { return new ChungCake() }
}

class SouthernFactory extends RiceCakeFactory {
  makeRiceCake(): RiceCake { return new TetCake() }
}

// The application picks a concrete creator from configuration
function createFactory(region: 'north' | 'south'): RiceCakeFactory {
  switch (region) {
    case 'north': return new NorthernFactory()
    case 'south': return new SouthernFactory()
    default: throw new Error('Unknown region: ' + region)
  }
}

// Client code works with the creator only through the base class
for (const region of ['north', 'south'] as const) {
  console.log(createFactory(region).prepareForNewYear())
}`,
      },
    ],
    structure_notes: {
      en: 'Product declares the interface common to all objects the creator and its subclasses can produce. Concrete Products are different implementations of that interface. Creator declares the factory method, whose return type must be the Product interface; it can be abstract to force every subclass to implement it, or return a default product. Despite the name, creating products is not the Creator\'s main responsibility: it usually holds core business logic that relies on the products, and the factory method decouples that logic from concrete product classes. Concrete Creators override the factory method to return a different product type. The factory method does not have to create a new instance every time; it can return existing objects from a cache or pool.',
      vi: 'Product khai báo giao diện chung cho mọi đối tượng mà creator và các lớp con của nó có thể tạo ra. Concrete Product là các triển khai khác nhau của giao diện đó. Creator khai báo phương thức nhà máy với kiểu trả về phải là giao diện Product; phương thức này có thể là trừu tượng để buộc mọi lớp con tự triển khai, hoặc trả về một sản phẩm mặc định. Dù tên gọi như vậy, tạo sản phẩm không phải trách nhiệm chính của Creator: nó thường chứa logic nghiệp vụ cốt lõi dựa trên sản phẩm, và phương thức nhà máy giúp tách logic đó khỏi các lớp sản phẩm cụ thể. Concrete Creator ghi đè phương thức nhà máy để trả về loại sản phẩm khác. Phương thức nhà máy không nhất thiết lúc nào cũng tạo đối tượng mới; nó có thể trả về đối tượng có sẵn từ cache hoặc pool.',
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
      en: 'Abstract Factory is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.',
      vi: 'Abstract Factory là một mẫu thiết kế khởi tạo, cho phép bạn tạo ra các họ đối tượng liên quan với nhau mà không cần chỉ định lớp cụ thể của chúng.',
    },
    problem: {
      en: 'Imagine a furniture shop simulator. The code has a family of related products (Chair + Sofa + CoffeeTable) and several variants of that family (Modern, Victorian, ArtDeco). You need to create furniture objects so that they match other objects of the same family, because customers get mad when they receive a Modern sofa with Victorian chairs. You also don\'t want to change existing code every time you add new products or families, since furniture vendors update their catalogs very often.',
      vi: 'Hãy tưởng tượng một trò chơi mô phỏng cửa hàng nội thất. Mã có một họ sản phẩm liên quan (Chair + Sofa + CoffeeTable) và nhiều biến thể của họ đó (Modern, Victorian, ArtDeco). Bạn cần tạo các đối tượng nội thất sao cho chúng khớp với các đối tượng khác cùng họ, vì khách hàng sẽ rất khó chịu khi nhận được sofa kiểu Modern đi kèm ghế kiểu Victorian. Bạn cũng không muốn sửa mã hiện có mỗi khi thêm sản phẩm hoặc họ sản phẩm mới, vì các nhà cung cấp nội thất cập nhật danh mục rất thường xuyên.',
    },
    solution: {
      en: 'First, declare an interface for each distinct product of the family (Chair, Sofa, CoffeeTable) and make every variant implement it. Next, declare the Abstract Factory: an interface with a creation method for each product in the family (createChair, createSofa, createCoffeeTable), each returning the abstract product type. For each variant, create a concrete factory class that returns only products of that variant; ModernFurnitureFactory can only create ModernChair, ModernSofa and ModernCoffeeTable. The client works with factories and products only through their abstract interfaces, so you can switch the factory without breaking the client, and whatever chair it gets always matches the sofa from the same factory. The application usually creates the concrete factory at initialization, choosing its type from the configuration or environment.',
      vi: 'Trước tiên, khai báo một giao diện cho mỗi sản phẩm riêng biệt trong họ (Chair, Sofa, CoffeeTable) và cho mọi biến thể triển khai giao diện đó. Tiếp theo, khai báo Abstract Factory: một giao diện có một phương thức tạo cho mỗi sản phẩm trong họ (createChair, createSofa, createCoffeeTable), mỗi phương thức trả về kiểu sản phẩm trừu tượng. Với mỗi biến thể, tạo một lớp factory cụ thể chỉ trả về sản phẩm thuộc biến thể đó; ModernFurnitureFactory chỉ có thể tạo ModernChair, ModernSofa và ModernCoffeeTable. Client chỉ làm việc với factory và sản phẩm qua các giao diện trừu tượng, nên bạn có thể đổi factory mà không làm hỏng client, và chiếc ghế nhận được luôn khớp với sofa do cùng factory tạo ra. Ứng dụng thường tạo factory cụ thể ở giai đoạn khởi tạo, chọn loại factory dựa trên cấu hình hoặc môi trường.',
    },
    applicability: {
      en: 'Use Abstract Factory when your code needs to work with various families of related products, but you don\'t want it to depend on their concrete classes, either because they are unknown beforehand or because you want to allow future extensibility. As long as your code creates objects through the factory interface, it can\'t create a product variant that doesn\'t match the products it already has. Also consider it when a class has a set of Factory Methods that blur its primary responsibility: extract them into a stand-alone factory class or a full Abstract Factory.',
      vi: 'Dùng Abstract Factory khi mã cần làm việc với nhiều họ sản phẩm liên quan nhưng bạn không muốn nó phụ thuộc vào các lớp cụ thể của chúng, vì chưa biết trước các lớp đó hoặc vì muốn dễ mở rộng về sau. Miễn là mã tạo đối tượng qua giao diện factory, nó không thể tạo ra một biến thể sản phẩm không khớp với các sản phẩm đã có. Cũng nên cân nhắc mẫu này khi một lớp có nhiều Factory Method làm lu mờ trách nhiệm chính của nó: hãy tách chúng ra thành một lớp factory riêng hoặc một Abstract Factory hoàn chỉnh.',
    },
    vietnamese_example: {
      title: { en: 'Traditional Tết Feast Set', vi: 'Bộ Mâm Cỗ Tết Truyền Thống' },
      description: {
        en: 'A Tết feast (mâm cỗ) is a product family of three dish types: bánh, giò and dưa. Each dish type comes in a Northern and a Southern variant: Bánh Chưng + Giò Lụa + Dưa Hành in the North, Bánh Tét + Chả Lụa + Dưa Kiệu in the South. The dishes on one tray must come from the same region. The FeastFactory interface declares makeRiceCake(), makePorkRoll() and makePickle(), and each regional factory (NorthernFactory, SouthernFactory) creates only its own region\'s dishes. The Feast client prepares the tray using only the abstract RiceCake, PorkRoll and Pickle types, so it can never end up with a Bánh Chưng next to a Dưa Kiệu. Adding a Central region means adding one new factory and its three dishes, without changing Feast.',
        vi: 'Mâm cỗ Tết là một họ sản phẩm gồm ba loại món: bánh, giò và dưa. Mỗi loại món có một biến thể miền Bắc và một biến thể miền Nam: Bánh Chưng + Giò Lụa + Dưa Hành ở miền Bắc, Bánh Tét + Chả Lụa + Dưa Kiệu ở miền Nam. Các món trên cùng một mâm phải cùng một vùng. Giao diện FeastFactory khai báo makeRiceCake(), makePorkRoll() và makePickle(), và mỗi factory vùng miền (NorthernFactory, SouthernFactory) chỉ tạo các món của vùng mình. Client Feast bày mâm chỉ thông qua các kiểu trừu tượng RiceCake, PorkRoll và Pickle, nên không bao giờ có chuyện Bánh Chưng nằm cạnh Dưa Kiệu. Thêm miền Trung chỉ cần thêm một factory mới cùng ba món của nó, không phải sửa Feast.',
      },
      illustration: '🏮 Mâm Cỗ Tết\n       «interface»\n       FeastFactory\n  +makeRiceCake() +makePorkRoll()\n  +makePickle()\n       │\n  ┌────┴─────┐\n  ▼          ▼\nNorthern  Southern\n🟫Bánh    🟤Bánh\n Chưng     Tét\n🥩Giò     🥩Chả\n Lụa       Lụa\n🧅Dưa     🫙Dưa\n Hành      Kiệu',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod


# Abstract Products: one interface per product type in the family
class RiceCake(ABC):
    @abstractmethod
    def serve(self) -> str: ...


class PorkRoll(ABC):
    @abstractmethod
    def serve(self) -> str: ...


class Pickle(ABC):
    @abstractmethod
    def serve(self) -> str: ...

    # Products of a family can work together. The argument is the
    # abstract type, but it only makes sense with the same variant.
    @abstractmethod
    def eat_with(self, cake: RiceCake) -> str: ...


# Concrete Products, Northern variant
class ChungCake(RiceCake):
    def serve(self) -> str: return "🟫 Bánh Chưng"

class SilkPorkRoll(PorkRoll):
    def serve(self) -> str: return "🥩 Giò Lụa"

class PickledOnion(Pickle):
    def serve(self) -> str: return "🧅 Dưa Hành"
    def eat_with(self, cake: RiceCake) -> str:
        return f"{self.serve()} ăn kèm {cake.serve()}"


# Concrete Products, Southern variant
class TetCake(RiceCake):
    def serve(self) -> str: return "🟤 Bánh Tét"

class SteamedPorkRoll(PorkRoll):
    def serve(self) -> str: return "🥩 Chả Lụa"

class PickledRakkyo(Pickle):
    def serve(self) -> str: return "🫙 Dưa Kiệu"
    def eat_with(self, cake: RiceCake) -> str:
        return f"{self.serve()} ăn kèm {cake.serve()}"


# Abstract Factory: one creation method per product type,
# each returning the abstract product
class FeastFactory(ABC):
    @abstractmethod
    def make_rice_cake(self) -> RiceCake: ...

    @abstractmethod
    def make_pork_roll(self) -> PorkRoll: ...

    @abstractmethod
    def make_pickle(self) -> Pickle: ...


# Concrete Factories: each one creates a single variant,
# so the products it returns always match
class NorthernFactory(FeastFactory):
    def make_rice_cake(self) -> RiceCake: return ChungCake()
    def make_pork_roll(self) -> PorkRoll: return SilkPorkRoll()
    def make_pickle(self) -> Pickle: return PickledOnion()


class SouthernFactory(FeastFactory):
    def make_rice_cake(self) -> RiceCake: return TetCake()
    def make_pork_roll(self) -> PorkRoll: return SteamedPorkRoll()
    def make_pickle(self) -> Pickle: return PickledRakkyo()


# Client: works only with the abstract types
class Feast:
    def __init__(self, factory: FeastFactory):
        self.factory = factory

    def prepare(self) -> str:
        cake = self.factory.make_rice_cake()
        pork_roll = self.factory.make_pork_roll()
        pickle = self.factory.make_pickle()
        return f"Mâm cỗ: {cake.serve()} + {pork_roll.serve()} | {pickle.eat_with(cake)}"


# The application picks the factory from configuration at startup
def create_factory(region: str) -> FeastFactory:
    if region == "north":
        return NorthernFactory()
    if region == "south":
        return SouthernFactory()
    raise ValueError(f"Unknown region: {region}")


for region in ["north", "south"]:
    print(Feast(create_factory(region)).prepare())

# Output:
# Mâm cỗ: 🟫 Bánh Chưng + 🥩 Giò Lụa | 🧅 Dưa Hành ăn kèm 🟫 Bánh Chưng
# Mâm cỗ: 🟤 Bánh Tét + 🥩 Chả Lụa | 🫙 Dưa Kiệu ăn kèm 🟤 Bánh Tét`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Abstract Products: one interface per product type in the family
interface RiceCake { serve(): string }
interface PorkRoll { serve(): string }
interface Pickle {
  serve(): string
  // Products of a family can work together. The argument is the
  // abstract type, but it only makes sense with the same variant.
  eatWith(cake: RiceCake): string
}

// Concrete Products, Northern variant
class ChungCake implements RiceCake { serve() { return '🟫 Bánh Chưng' } }
class SilkPorkRoll implements PorkRoll { serve() { return '🥩 Giò Lụa' } }
class PickledOnion implements Pickle {
  serve() { return '🧅 Dưa Hành' }
  eatWith(cake: RiceCake) { return \`\${this.serve()} ăn kèm \${cake.serve()}\` }
}

// Concrete Products, Southern variant
class TetCake implements RiceCake { serve() { return '🟤 Bánh Tét' } }
class SteamedPorkRoll implements PorkRoll { serve() { return '🥩 Chả Lụa' } }
class PickledRakkyo implements Pickle {
  serve() { return '🫙 Dưa Kiệu' }
  eatWith(cake: RiceCake) { return \`\${this.serve()} ăn kèm \${cake.serve()}\` }
}

// Abstract Factory: one creation method per product type,
// each returning the abstract product
interface FeastFactory {
  makeRiceCake(): RiceCake
  makePorkRoll(): PorkRoll
  makePickle(): Pickle
}

// Concrete Factories: each one creates a single variant,
// so the products it returns always match
class NorthernFactory implements FeastFactory {
  makeRiceCake(): RiceCake { return new ChungCake() }
  makePorkRoll(): PorkRoll { return new SilkPorkRoll() }
  makePickle(): Pickle { return new PickledOnion() }
}

class SouthernFactory implements FeastFactory {
  makeRiceCake(): RiceCake { return new TetCake() }
  makePorkRoll(): PorkRoll { return new SteamedPorkRoll() }
  makePickle(): Pickle { return new PickledRakkyo() }
}

// Client: works only with the abstract types
class Feast {
  constructor(private factory: FeastFactory) {}

  prepare(): string {
    const cake = this.factory.makeRiceCake()
    const porkRoll = this.factory.makePorkRoll()
    const pickle = this.factory.makePickle()
    return \`Mâm cỗ: \${cake.serve()} + \${porkRoll.serve()} | \${pickle.eatWith(cake)}\`
  }
}

// The application picks the factory from configuration at startup
function createFactory(region: 'north' | 'south'): FeastFactory {
  switch (region) {
    case 'north': return new NorthernFactory()
    case 'south': return new SouthernFactory()
    default: throw new Error('Unknown region: ' + region)
  }
}

for (const region of ['north', 'south'] as const) {
  console.log(new Feast(createFactory(region)).prepare())
}`,
      },
    ],
    structure_notes: {
      en: 'Abstract Products declare interfaces for a set of distinct but related products that make up a family. Concrete Products implement them, grouped by variant; every abstract product must be implemented in every variant. The Abstract Factory interface declares a creation method for each abstract product. Concrete Factories implement those methods, one factory per variant, and create only that variant\'s products. Concrete factories instantiate concrete products, but their method signatures return the abstract products, so the Client can work with any factory and variant through the abstract interfaces. The diagram shows two of the three product types; Pickle follows the same shape.',
      vi: 'Abstract Product khai báo giao diện cho một tập sản phẩm khác nhau nhưng liên quan, tạo thành một họ. Concrete Product triển khai các giao diện đó, được nhóm theo biến thể; mỗi sản phẩm trừu tượng phải được triển khai ở mọi biến thể. Giao diện Abstract Factory khai báo một phương thức tạo cho mỗi sản phẩm trừu tượng. Concrete Factory triển khai các phương thức đó, mỗi factory ứng với một biến thể và chỉ tạo sản phẩm của biến thể đó. Concrete factory khởi tạo sản phẩm cụ thể, nhưng chữ ký phương thức trả về sản phẩm trừu tượng, nên Client có thể làm việc với bất kỳ factory và biến thể nào qua các giao diện trừu tượng. Sơ đồ chỉ thể hiện hai trong ba loại sản phẩm; Pickle có cấu trúc tương tự.',
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
      en: 'Builder is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.',
      vi: 'Builder là một mẫu thiết kế khởi tạo, cho phép bạn xây dựng các đối tượng phức tạp theo từng bước. Mẫu này cho phép tạo ra nhiều kiểu và nhiều biểu diễn khác nhau của một đối tượng bằng cùng một đoạn mã xây dựng.',
    },
    problem: {
      en: 'Imagine a complex object that needs laborious, step-by-step initialization of many fields and nested objects. That code usually ends up inside a monstrous constructor with lots of parameters, or worse, scattered all over the client code. Take a House object: a simple house needs four walls, a floor, a door, a pair of windows and a roof, but a bigger, brighter house may also want a backyard, heating, plumbing and electrical wiring. Creating a House subclass for every combination of parameters gives you a huge hierarchy, and every new parameter, such as the porch style, makes it grow again. A giant constructor in the base House class with every possible parameter removes the subclasses, but most calls leave most parameters unused: only a fraction of houses have a swimming pool, so the pool parameters are useless nine times out of ten, and the constructor calls become ugly.',
      vi: 'Hãy tưởng tượng một đối tượng phức tạp cần được khởi tạo công phu, từng bước, với nhiều trường và đối tượng lồng nhau. Đoạn mã đó thường bị nhét vào một hàm khởi tạo khổng lồ với rất nhiều tham số, hoặc tệ hơn là rải rác khắp mã client. Lấy ví dụ đối tượng House: một ngôi nhà đơn giản cần bốn bức tường, sàn nhà, một cửa ra vào, một cặp cửa sổ và mái nhà, nhưng một ngôi nhà lớn và sáng sủa hơn có thể cần thêm sân sau, hệ thống sưởi, đường ống nước và hệ thống điện. Tạo một lớp con của House cho mỗi tổ hợp tham số sẽ sinh ra một cây kế thừa rất lớn, và mỗi tham số mới, chẳng hạn kiểu hiên nhà, lại làm nó phình thêm. Một hàm khởi tạo khổng lồ trong lớp House chứa mọi tham số có thể sẽ loại bỏ được các lớp con, nhưng phần lớn lời gọi lại bỏ trống phần lớn tham số: chỉ một số ít ngôi nhà có bể bơi, nên các tham số về bể bơi vô dụng chín trên mười lần, và các lời gọi hàm khởi tạo trở nên rất rối.',
    },
    solution: {
      en: 'Extract the object construction code out of its own class and move it into separate objects called builders. The pattern organizes construction into a set of steps (buildWalls, buildDoor, etc.). To create an object, you execute a series of these steps on a builder, and you only call the steps needed for the configuration you want. The builder does not let other objects access the product while it is being built. When some steps need a different implementation for different representations (a cabin\'s walls are wood, a castle\'s are stone), you create several builder classes that implement the same steps in different ways; calling the same steps then yields a regular house, a small castle or a palace. This only works if the code calling the steps talks to the builders through a common interface. You can go further and extract the sequence of step calls into a director class: the director defines the order of the steps, and the builder implements them. A director is not strictly necessary, since the client can call the steps directly, but it is a good place for reusable construction routines, and it hides construction details from the client. The client only links a builder with the director, launches construction through the director, and gets the result from the builder.',
      vi: 'Tách mã xây dựng đối tượng ra khỏi chính lớp của nó và chuyển sang các đối tượng riêng gọi là builder. Mẫu này chia việc xây dựng thành một tập các bước (buildWalls, buildDoor, v.v.). Để tạo một đối tượng, bạn thực hiện một chuỗi các bước đó trên builder, và chỉ cần gọi những bước cần thiết cho cấu hình mong muốn. Builder không cho đối tượng khác truy cập sản phẩm khi nó đang được xây dựng. Khi một số bước cần cách làm khác nhau cho từng biểu diễn (tường nhà gỗ làm bằng gỗ, tường lâu đài làm bằng đá), bạn tạo nhiều lớp builder cùng triển khai một tập bước nhưng theo cách khác nhau; khi đó cùng một chuỗi bước sẽ cho ra một ngôi nhà thường, một lâu đài nhỏ hoặc một cung điện. Điều này chỉ hoạt động nếu mã gọi các bước làm việc với builder qua một giao diện chung. Bạn có thể đi xa hơn và tách chuỗi lời gọi các bước vào một lớp director: director quyết định thứ tự các bước, còn builder triển khai từng bước. Director không bắt buộc, vì client có thể tự gọi các bước, nhưng đây là nơi phù hợp để đặt các quy trình xây dựng dùng lại được, và nó che giấu chi tiết xây dựng khỏi client. Client chỉ cần gắn một builder với director, cho director bắt đầu xây dựng, rồi lấy kết quả từ builder.',
    },
    applicability: {
      en: 'Use Builder to get rid of a "telescoping constructor": with ten optional parameters you end up overloading several shorter constructors that pass default values to the main one (only possible in languages with method overloading, such as C# or Java); a builder lets you build the object step by step using only the steps you need, so constructors no longer take dozens of parameters. Use it when your code must create different representations of a product, such as stone and wooden houses, whose construction involves similar steps that differ only in details: the base builder interface defines all possible steps, concrete builders implement them for each representation, and the director guides the order. Use it to construct Composite trees or other complex objects: steps can be deferred without breaking the final product or called recursively to build an object tree, and because a builder does not expose the unfinished product while the steps run, client code cannot fetch an incomplete result.',
      vi: 'Dùng Builder để loại bỏ "telescoping constructor": với mười tham số tùy chọn, bạn sẽ phải nạp chồng nhiều hàm khởi tạo ngắn hơn, mỗi hàm truyền giá trị mặc định cho hàm khởi tạo chính (chỉ làm được trong các ngôn ngữ hỗ trợ nạp chồng phương thức như C# hoặc Java); builder cho phép xây dựng đối tượng từng bước và chỉ dùng những bước thực sự cần, nên hàm khởi tạo không còn phải nhận hàng chục tham số. Dùng khi mã cần tạo nhiều biểu diễn khác nhau của một sản phẩm, chẳng hạn nhà bằng đá và nhà bằng gỗ, mà quá trình xây dựng gồm các bước tương tự nhau, chỉ khác ở chi tiết: giao diện builder cơ sở định nghĩa mọi bước có thể có, các builder cụ thể triển khai các bước đó cho từng biểu diễn, còn director điều khiển thứ tự. Dùng để xây dựng cây Composite hoặc các đối tượng phức tạp khác: có thể hoãn một số bước mà không làm hỏng sản phẩm cuối, hoặc gọi các bước đệ quy để dựng cây đối tượng, và vì builder không để lộ sản phẩm dở dang khi đang chạy các bước, mã client không thể lấy về một kết quả chưa hoàn chỉnh.',
    },
    vietnamese_example: {
      title: { en: 'Building a Traditional Đình (Communal House)', vi: 'Xây Đình Làng Truyền Thống' },
      description: {
        en: 'Building a communal house (đình làng) is a long, step-by-step job: lay the foundation, raise the ironwood columns, put up the curved roof, add dragon and phoenix carvings, and set up the altar to the village guardian god (Thành Hoàng). The HouseBuilder interface declares these steps. The master carpenter (thợ cả), HouseDirector, knows the order of steps for a simple đình and for a grand đình, and works with whatever builder it is given; the simple đình skips the carving step entirely. CommunalHouseBuilder carries out the steps to raise a real CommunalHouse, while BlueprintBuilder records the same steps as a Blueprint (construction drawing). The finished đình and its drawing are unrelated classes, so the client takes each result from the builder that made it with getProduct(), not from the director. For a one-off building, the client can also call the builder\'s steps directly without the director.',
        vi: 'Xây một ngôi đình làng là công việc dài và theo từng bước: đặt nền móng, dựng cột gỗ lim, lợp mái cong, chạm khắc rồng phượng, rồi lập bàn thờ Thành Hoàng. Giao diện HouseBuilder khai báo các bước này. Thợ cả, tức HouseDirector, nắm thứ tự các bước để dựng một ngôi đình đơn giản hay một ngôi đình bề thế, và làm việc với bất kỳ builder nào được giao; đình đơn giản bỏ hẳn bước chạm khắc. CommunalHouseBuilder thực hiện các bước để dựng một CommunalHouse thật, còn BlueprintBuilder ghi lại cùng các bước đó thành một Blueprint (bản vẽ thi công). Ngôi đình và bản vẽ là hai lớp không liên quan, nên client lấy từng kết quả bằng getProduct() từ chính builder đã làm ra nó, chứ không lấy từ director. Với một công trình chỉ làm một lần, client cũng có thể tự gọi các bước của builder mà không cần director.',
      },
      illustration: '🏛️ Xây Đình Làng\nHouseDirector (Thợ Cả)\n   │ buildGrandHouse(builder)\n   ├──▶ buildFoundation()  🪨\n   ├──▶ buildColumns()     🪵\n   ├──▶ buildRoof()        🏗️\n   ├──▶ addCarving()       🐉\n   └──▶ setupAltar()       🕯️\n          │\n    ┌─────┴──────┐\n    ▼            ▼\n CommunalHouse Blueprint\n Builder       Builder\n 🏛️ Đình       📜 Bản vẽ',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod


# Products: two unrelated classes with no common interface
class CommunalHouse:
    def __init__(self) -> None:
        self.parts: list[str] = []

    def describe(self) -> str:
        return "🏛️ Đình làng: " + ", ".join(self.parts)


class Blueprint:
    def __init__(self) -> None:
        self.lines: list[str] = []

    def show(self) -> str:
        return "📜 Bản vẽ: " + " | ".join(self.lines)


# Builder: construction steps common to all builders
class HouseBuilder(ABC):
    @abstractmethod
    def reset(self) -> None: ...
    @abstractmethod
    def build_foundation(self, material: str) -> None: ...
    @abstractmethod
    def build_columns(self, count: int) -> None: ...
    @abstractmethod
    def build_roof(self, style: str) -> None: ...
    @abstractmethod
    def add_carving(self, motif: str) -> None: ...
    @abstractmethod
    def setup_altar(self) -> None: ...


# Concrete Builder 1: raises a real communal house
class CommunalHouseBuilder(HouseBuilder):
    def __init__(self) -> None: self.reset()
    def reset(self) -> None: self._house = CommunalHouse()
    def build_foundation(self, material: str) -> None: self._house.parts.append(f"nền {material}")
    def build_columns(self, count: int) -> None: self._house.parts.append(f"{count} cột gỗ lim")
    def build_roof(self, style: str) -> None: self._house.parts.append(style)
    def add_carving(self, motif: str) -> None: self._house.parts.append(f"chạm {motif}")
    def setup_altar(self) -> None: self._house.parts.append("bàn thờ Thành Hoàng")

    # Not in the interface: each builder returns its own product type.
    # The builder resets itself so it is ready for the next product.
    def get_product(self) -> CommunalHouse:
        product = self._house
        self.reset()
        return product


# Concrete Builder 2: the same steps, recorded as a construction drawing
class BlueprintBuilder(HouseBuilder):
    def __init__(self) -> None: self.reset()
    def reset(self) -> None: self._blueprint = Blueprint()
    def build_foundation(self, material: str) -> None: self._blueprint.lines.append(f"móng {material}")
    def build_columns(self, count: int) -> None: self._blueprint.lines.append(f"bố trí {count} cột")
    def build_roof(self, style: str) -> None: self._blueprint.lines.append(f"vẽ {style}")
    def add_carving(self, motif: str) -> None: self._blueprint.lines.append(f"hoa văn {motif}")
    def setup_altar(self) -> None: self._blueprint.lines.append("hậu cung đặt bàn thờ")

    def get_product(self) -> Blueprint:
        product = self._blueprint
        self.reset()
        return product


# Director: the master carpenter (thợ cả) knows the order of steps
class HouseDirector:
    def build_simple_house(self, builder: HouseBuilder) -> None:
        builder.reset()
        builder.build_foundation("đá xanh")
        builder.build_columns(4)
        builder.build_roof("mái ngói đơn")
        builder.setup_altar()  # no carving: not every step is needed

    def build_grand_house(self, builder: HouseBuilder) -> None:
        builder.reset()
        builder.build_foundation("đá ong")
        builder.build_columns(16)
        builder.build_roof("mái cong đầu đao")
        builder.add_carving("rồng chầu")
        builder.add_carving("phượng múa")
        builder.setup_altar()


# Client: passes a builder to the director, then takes the result from the builder
director = HouseDirector()

house_builder = CommunalHouseBuilder()
director.build_grand_house(house_builder)
print(house_builder.get_product().describe())

blueprint_builder = BlueprintBuilder()
director.build_grand_house(blueprint_builder)
print(blueprint_builder.get_product().show())

director.build_simple_house(house_builder)
print(house_builder.get_product().describe())

# The client can also run the steps itself for a one-off configuration
house_builder.build_foundation("đất nện")
house_builder.build_roof("mái rạ")
print(house_builder.get_product().describe())

# Output:
# 🏛️ Đình làng: nền đá ong, 16 cột gỗ lim, mái cong đầu đao, chạm rồng chầu, chạm phượng múa, bàn thờ Thành Hoàng
# 📜 Bản vẽ: móng đá ong | bố trí 16 cột | vẽ mái cong đầu đao | hoa văn rồng chầu | hoa văn phượng múa | hậu cung đặt bàn thờ
# 🏛️ Đình làng: nền đá xanh, 4 cột gỗ lim, mái ngói đơn, bàn thờ Thành Hoàng
# 🏛️ Đình làng: nền đất nện, mái rạ`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Products: two unrelated classes with no common interface
class CommunalHouse {
  parts: string[] = []
  describe() { return '🏛️ Đình làng: ' + this.parts.join(', ') }
}

class Blueprint {
  lines: string[] = []
  show() { return '📜 Bản vẽ: ' + this.lines.join(' | ') }
}

// Builder: construction steps common to all builders
interface HouseBuilder {
  reset(): void
  buildFoundation(material: string): void
  buildColumns(count: number): void
  buildRoof(style: string): void
  addCarving(motif: string): void
  setupAltar(): void
}

// Concrete Builder 1: raises a real communal house
class CommunalHouseBuilder implements HouseBuilder {
  private house = new CommunalHouse()

  reset() { this.house = new CommunalHouse() }
  buildFoundation(material: string) { this.house.parts.push(\`nền \${material}\`) }
  buildColumns(count: number) { this.house.parts.push(\`\${count} cột gỗ lim\`) }
  buildRoof(style: string) { this.house.parts.push(style) }
  addCarving(motif: string) { this.house.parts.push(\`chạm \${motif}\`) }
  setupAltar() { this.house.parts.push('bàn thờ Thành Hoàng') }

  // Not in the interface: each builder returns its own product type.
  // The builder resets itself so it is ready for the next product.
  getProduct(): CommunalHouse {
    const product = this.house
    this.reset()
    return product
  }
}

// Concrete Builder 2: the same steps, recorded as a construction drawing
class BlueprintBuilder implements HouseBuilder {
  private blueprint = new Blueprint()

  reset() { this.blueprint = new Blueprint() }
  buildFoundation(material: string) { this.blueprint.lines.push(\`móng \${material}\`) }
  buildColumns(count: number) { this.blueprint.lines.push(\`bố trí \${count} cột\`) }
  buildRoof(style: string) { this.blueprint.lines.push(\`vẽ \${style}\`) }
  addCarving(motif: string) { this.blueprint.lines.push(\`hoa văn \${motif}\`) }
  setupAltar() { this.blueprint.lines.push('hậu cung đặt bàn thờ') }

  getProduct(): Blueprint {
    const product = this.blueprint
    this.reset()
    return product
  }
}

// Director: the master carpenter (thợ cả) knows the order of steps
class HouseDirector {
  buildSimpleHouse(builder: HouseBuilder) {
    builder.reset()
    builder.buildFoundation('đá xanh')
    builder.buildColumns(4)
    builder.buildRoof('mái ngói đơn')
    builder.setupAltar() // no carving: not every step is needed
  }

  buildGrandHouse(builder: HouseBuilder) {
    builder.reset()
    builder.buildFoundation('đá ong')
    builder.buildColumns(16)
    builder.buildRoof('mái cong đầu đao')
    builder.addCarving('rồng chầu')
    builder.addCarving('phượng múa')
    builder.setupAltar()
  }
}

// Client: passes a builder to the director, then takes the result from the builder
const director = new HouseDirector()

const houseBuilder = new CommunalHouseBuilder()
director.buildGrandHouse(houseBuilder)
console.log(houseBuilder.getProduct().describe())

const blueprintBuilder = new BlueprintBuilder()
director.buildGrandHouse(blueprintBuilder)
console.log(blueprintBuilder.getProduct().show())

director.buildSimpleHouse(houseBuilder)
console.log(houseBuilder.getProduct().describe())

// The client can also run the steps itself for a one-off configuration
houseBuilder.buildFoundation('đất nện')
houseBuilder.buildRoof('mái rạ')
console.log(houseBuilder.getProduct().describe())`,
      },
    ],
    structure_notes: {
      en: 'The Builder interface (HouseBuilder) declares the construction steps common to all types of builders. Concrete Builders (CommunalHouseBuilder, BlueprintBuilder) provide different implementations of those steps and may produce products that do not follow a common interface, which is why getProduct() is declared in each concrete builder rather than in the interface. Products (CommunalHouse, Blueprint) are the resulting objects; products built by different builders do not have to belong to the same class hierarchy or interface. The Director (HouseDirector) defines the order in which to call the construction steps, so specific product configurations can be created and reused. The Client must associate a builder with the director. Usually this is done once, through the director\'s constructor, and the director then uses that builder for all further construction; the alternative, used here, is to pass the builder to each production method of the director, so a different builder can be used each time.',
      vi: 'Giao diện Builder (HouseBuilder) khai báo các bước xây dựng chung cho mọi loại builder. Concrete Builder (CommunalHouseBuilder, BlueprintBuilder) triển khai các bước đó theo những cách khác nhau và có thể tạo ra sản phẩm không theo một giao diện chung, vì vậy getProduct() được khai báo trong từng builder cụ thể chứ không nằm trong giao diện. Product (CommunalHouse, Blueprint) là các đối tượng kết quả; sản phẩm do các builder khác nhau tạo ra không cần thuộc cùng một cây kế thừa hay giao diện. Director (HouseDirector) quyết định thứ tự gọi các bước xây dựng, nhờ đó có thể tạo và dùng lại những cấu hình sản phẩm cụ thể. Client phải gắn một builder với director. Thông thường việc này chỉ làm một lần, qua tham số của hàm khởi tạo director, sau đó director dùng builder đó cho mọi lần xây dựng tiếp theo; cách còn lại, được dùng ở đây, là truyền builder vào từng phương thức xây dựng của director, nhờ đó mỗi lần có thể dùng một builder khác.',
    },
  },

  {
    id: 'prototype',
    slug: 'prototype',
    name: { en: 'Prototype', vi: 'Nguyên Mẫu' },
    category: 'creational',
    complexity: 1,
    popularity: 2,
    also_known_as: [{ en: 'Clone', vi: 'Nhân bản' }],
    intent: {
      en: 'Prototype is a creational design pattern that lets you copy existing objects without making your code dependent on their classes.',
      vi: 'Prototype là một mẫu thiết kế khởi tạo, cho phép bạn sao chép các đối tượng có sẵn mà không làm mã của bạn phụ thuộc vào lớp của chúng.',
    },
    problem: {
      en: 'Say you have an object and want an exact copy of it. The direct approach is to create a new object of the same class, then go through all the fields of the original and copy their values over. But not every object can be copied that way, because some of its fields may be private and invisible from outside the object. The direct approach has another catch: you must know the object\'s class to create the duplicate, so your code becomes dependent on that class. And sometimes you only know the interface the object follows, not its concrete class, for example when a method parameter accepts any object that follows some interface.',
      vi: 'Giả sử bạn có một đối tượng và muốn tạo một bản sao y hệt. Cách trực tiếp là tạo một đối tượng mới cùng lớp, rồi duyệt qua mọi trường của đối tượng gốc và chép giá trị sang. Nhưng không phải đối tượng nào cũng chép được theo cách đó, vì một số trường có thể là riêng tư và không nhìn thấy được từ bên ngoài đối tượng. Cách trực tiếp còn một vướng mắc nữa: bạn phải biết lớp của đối tượng mới tạo được bản sao, nên mã của bạn bị phụ thuộc vào lớp đó. Và đôi khi bạn chỉ biết giao diện mà đối tượng tuân theo chứ không biết lớp cụ thể của nó, chẳng hạn khi một tham số của phương thức nhận bất kỳ đối tượng nào tuân theo một giao diện nào đó.',
    },
    solution: {
      en: 'Prototype delegates the cloning process to the objects being cloned. It declares a common interface for all objects that support cloning, usually with a single clone method, so you can clone an object without coupling your code to its class. The clone method looks much the same in every class: it creates an object of the current class and carries over all field values of the old object into the new one. It can even copy private fields, because most languages let an object access the private fields of other objects of the same class. An object that supports cloning is called a prototype. When your objects have dozens of fields and hundreds of possible configurations, cloning can replace subclassing: you create a set of objects configured in various ways, and when you need an object like one of them, you clone that prototype instead of constructing a new object from scratch.',
      vi: 'Prototype giao việc nhân bản cho chính các đối tượng được nhân bản. Mẫu này khai báo một giao diện chung cho mọi đối tượng hỗ trợ nhân bản, thường chỉ có một phương thức clone, nhờ đó bạn nhân bản được một đối tượng mà mã không bị gắn chặt với lớp của nó. Phương thức clone ở các lớp gần như giống nhau: nó tạo một đối tượng của lớp hiện tại và chép toàn bộ giá trị các trường của đối tượng cũ sang đối tượng mới. Nó chép được cả các trường riêng tư, vì phần lớn ngôn ngữ cho phép một đối tượng truy cập trường riêng tư của đối tượng khác cùng lớp. Đối tượng hỗ trợ nhân bản được gọi là prototype (nguyên mẫu). Khi đối tượng có hàng chục trường và hàng trăm cấu hình có thể, nhân bản có thể thay cho việc tạo lớp con: bạn tạo sẵn một tập đối tượng được cấu hình theo nhiều cách, và khi cần một đối tượng giống một trong số đó, bạn nhân bản nguyên mẫu ấy thay vì dựng một đối tượng mới từ đầu.',
    },
    applicability: {
      en: 'Use Prototype when your code should not depend on the concrete classes of the objects you need to copy. This happens a lot when your code works with objects passed to you from third-party code through some interface: their concrete classes are unknown, and you could not depend on them even if you wanted to. The pattern gives client code a general interface for working with all objects that support cloning, which makes it independent of the concrete classes of the objects it clones. Use it when you want to reduce the number of subclasses that differ only in how they initialize their objects. If a complex class needs laborious configuration before use and several common configurations are scattered through your app, putting each one into its own subclass removes the duplication but leaves you with lots of dummy subclasses. With Prototype, you keep a set of pre-built objects configured in various ways, and instead of instantiating a subclass that matches some configuration, the client looks for the right prototype and clones it.',
      vi: 'Dùng Prototype khi mã của bạn không nên phụ thuộc vào lớp cụ thể của các đối tượng cần sao chép. Điều này rất hay gặp khi mã làm việc với các đối tượng do mã bên thứ ba truyền vào qua một giao diện nào đó: lớp cụ thể của chúng không được biết, và dù muốn bạn cũng không thể phụ thuộc vào chúng. Mẫu này cung cấp cho mã client một giao diện chung để làm việc với mọi đối tượng hỗ trợ nhân bản, nhờ đó mã client không phụ thuộc vào lớp cụ thể của các đối tượng mà nó nhân bản. Dùng khi muốn giảm số lớp con chỉ khác nhau ở cách khởi tạo đối tượng. Nếu một lớp phức tạp cần cấu hình công phu trước khi dùng và có vài cấu hình phổ biến nằm rải rác trong ứng dụng, việc đưa mỗi cấu hình vào một lớp con riêng sẽ hết trùng lặp nhưng để lại rất nhiều lớp con hình thức. Với Prototype, bạn giữ sẵn một tập đối tượng được cấu hình theo nhiều cách, và thay vì khởi tạo lớp con ứng với một cấu hình, client chỉ cần tìm nguyên mẫu phù hợp rồi nhân bản nó.',
    },
    vietnamese_example: {
      title: { en: 'Woodblock Printing (Tranh Đông Hồ)', vi: 'In Tranh Đông Hồ Bằng Bản Khắc Gỗ' },
      description: {
        en: 'Tranh Đông Hồ are folk woodblock prints from Bắc Ninh province, printed on giấy điệp (dó paper coated with powdered seashell). A craftsman carves a woodblock once; after that, nobody redraws the painting, they press a new print from the block. In the code, DongHoPainting is the Prototype: it holds the title, the list of colours and a private paper field, and declares clone(). RoosterPainting (the rooster painting with its Đại Cát caption) and MouseWeddingPainting (Đám Cưới Chuột, the mouse wedding) are Concrete Prototypes. Each clone() calls its own class\'s copy constructor, which lets the parent copy its fields first, including the private one, and then copies the subclass\'s own field. The workshop\'s block store, WoodblockRegistry, is the Prototype Registry: the client asks for "ga" or "chuot" and gets a fresh copy without knowing its class. Each print can then be coloured differently without changing the original, because the colour list is copied, not shared.',
        vi: 'Tranh Đông Hồ là tranh khắc gỗ dân gian của tỉnh Bắc Ninh, in trên giấy điệp (giấy dó quét bột vỏ sò điệp). Nghệ nhân chỉ khắc bản gỗ một lần; sau đó không ai vẽ lại bức tranh, mà chỉ ấn bản khắc để in ra tờ mới. Trong mã, DongHoPainting là Prototype: nó giữ tên tranh, danh sách màu và một trường riêng tư về loại giấy, đồng thời khai báo clone(). RoosterPainting (tranh gà trống có chữ Đại Cát) và MouseWeddingPainting (tranh Đám Cưới Chuột) là các Concrete Prototype. Mỗi clone() gọi hàm khởi tạo sao chép của chính lớp đó, hàm này để lớp cha chép các trường của nó trước, kể cả trường riêng tư, rồi mới chép trường riêng của lớp con. Kho bản khắc của xưởng, WoodblockRegistry, là Prototype Registry: client xin "ga" hoặc "chuot" và nhận về một bản sao mới mà không cần biết lớp của nó. Sau đó mỗi bản in có thể tô màu khác nhau mà không ảnh hưởng tới bản gốc, vì danh sách màu được chép ra chứ không dùng chung.',
      },
      illustration: '🎨 Tranh Đông Hồ\nBản gỗ gốc (Prototype)\n    🪵 [Gà Trống]\n         │ clone()\n    ┌────┼────┐\n    ▼    ▼    ▼\n  🖼️   🖼️   🖼️\n  Đỏ  Xanh  Vàng\n(mỗi bản in có thể\n tô màu khác nhau)',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from typing import Optional


# Prototype: declares the cloning method. The base class also holds
# the shared fields and the prototype constructor that copies them.
class DongHoPainting(ABC):
    def __init__(self, source: Optional["DongHoPainting"] = None) -> None:
        if source is None:  # regular constructor
            self.title = ""
            self.colors: list[str] = []
            self._paper = "giấy điệp"  # private: clients never touch it
        else:  # prototype constructor: copy every field from source
            self.title = source.title
            self.colors = list(source.colors)  # copy the list, do not share it
            self._paper = source._paper

    @abstractmethod
    def clone(self) -> "DongHoPainting": ...

    def describe(self) -> str:
        return f"{self.title} [{', '.join(self.colors)}] trên {self._paper}"


# Concrete Prototypes: each copies its parent's fields, then its own
class RoosterPainting(DongHoPainting):
    def __init__(self, source: Optional["RoosterPainting"] = None) -> None:
        super().__init__(source)  # the parent copies its own fields first
        self.caption = source.caption if source else ""

    # Every class overrides clone() with its own class name;
    # otherwise the copy would be a parent-class object
    def clone(self) -> "RoosterPainting":
        return RoosterPainting(self)

    def describe(self) -> str:
        return f"🐓 {super().describe()} | chữ: {self.caption}"


class MouseWeddingPainting(DongHoPainting):
    def __init__(self, source: Optional["MouseWeddingPainting"] = None) -> None:
        super().__init__(source)
        self.mouse_count = source.mouse_count if source else 0

    def clone(self) -> "MouseWeddingPainting":
        return MouseWeddingPainting(self)

    def describe(self) -> str:
        return f"🐭 {super().describe()} | {self.mouse_count} con chuột"


# Prototype Registry: a name -> prototype map of pre-built woodblocks
class WoodblockRegistry:
    def __init__(self) -> None:
        self._items: dict[str, DongHoPainting] = {}

    def add(self, key: str, prototype: DongHoPainting) -> None:
        self._items[key] = prototype

    def get(self, key: str) -> DongHoPainting:
        return self._items[key].clone()


# Client: configure the prototypes once
rooster = RoosterPainting()
rooster.title, rooster.colors, rooster.caption = "Gà Trống", ["đỏ son"], "Đại Cát"
mouse = MouseWeddingPainting()
mouse.title, mouse.colors, mouse.mouse_count = "Đám Cưới Chuột", ["vàng nghệ", "đen than"], 12

registry = WoodblockRegistry()
registry.add("ga", rooster)
registry.add("chuot", mouse)

# Press new prints without knowing their concrete classes
proof_1 = registry.get("ga")
proof_2 = registry.get("ga")
proof_2.colors.append("xanh lam")  # recolour one print; the original is untouched
proof_3 = registry.get("chuot")
for proof in [proof_1, proof_2, proof_3]:
    print(proof.describe())
print(f"Bản gốc: {rooster.describe()}")

# Copy a mixed list: each clone() call runs the real class's method
copies = [t.clone() for t in [rooster, mouse]]
print(", ".join(type(t).__name__ for t in copies), copies[0] is not rooster)

# Output:
# 🐓 Gà Trống [đỏ son] trên giấy điệp | chữ: Đại Cát
# 🐓 Gà Trống [đỏ son, xanh lam] trên giấy điệp | chữ: Đại Cát
# 🐭 Đám Cưới Chuột [vàng nghệ, đen than] trên giấy điệp | 12 con chuột
# Bản gốc: 🐓 Gà Trống [đỏ son] trên giấy điệp | chữ: Đại Cát
# RoosterPainting, MouseWeddingPainting True`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Prototype: declares the cloning method. The base class also holds
// the shared fields and the prototype constructor that copies them.
abstract class DongHoPainting {
  title = ''
  colors: string[] = []
  private paper = 'giấy điệp' // private: clients never touch it

  // Regular constructor without a source,
  // prototype constructor when given an existing object
  constructor(source?: DongHoPainting) {
    if (source) {
      this.title = source.title
      this.colors = [...source.colors] // copy the array, do not share it
      this.paper = source.paper // allowed: same class
    }
  }

  abstract clone(): DongHoPainting

  describe() { return \`\${this.title} [\${this.colors.join(', ')}] trên \${this.paper}\` }
}

// Concrete Prototypes: each copies its parent's fields, then its own
class RoosterPainting extends DongHoPainting {
  caption = ''

  constructor(source?: RoosterPainting) {
    super(source) // the parent copies its own fields, private ones included
    if (source) this.caption = source.caption
  }

  // Every class overrides clone() with its own class name;
  // otherwise the copy would be a parent-class object
  clone(): RoosterPainting { return new RoosterPainting(this) }

  describe() { return \`🐓 \${super.describe()} | chữ: \${this.caption}\` }
}

class MouseWeddingPainting extends DongHoPainting {
  mouseCount = 0

  constructor(source?: MouseWeddingPainting) {
    super(source)
    if (source) this.mouseCount = source.mouseCount
  }

  clone(): MouseWeddingPainting { return new MouseWeddingPainting(this) }

  describe() { return \`🐭 \${super.describe()} | \${this.mouseCount} con chuột\` }
}

// Prototype Registry: a name -> prototype map of pre-built woodblocks
class WoodblockRegistry {
  private items = new Map<string, DongHoPainting>()

  add(key: string, prototype: DongHoPainting) { this.items.set(key, prototype) }

  get(key: string): DongHoPainting {
    const prototype = this.items.get(key)
    if (!prototype) throw new Error('Không có bản khắc: ' + key)
    return prototype.clone()
  }
}

// Client: configure the prototypes once
const rooster = new RoosterPainting()
rooster.title = 'Gà Trống'
rooster.colors = ['đỏ son']
rooster.caption = 'Đại Cát'
const mouse = new MouseWeddingPainting()
mouse.title = 'Đám Cưới Chuột'
mouse.colors = ['vàng nghệ', 'đen than']
mouse.mouseCount = 12

const registry = new WoodblockRegistry()
registry.add('ga', rooster)
registry.add('chuot', mouse)

// Press new prints without knowing their concrete classes
const proof1 = registry.get('ga')
const proof2 = registry.get('ga')
proof2.colors.push('xanh lam') // recolour one print; the original is untouched
const proof3 = registry.get('chuot')
for (const proof of [proof1, proof2, proof3]) console.log(proof.describe())
console.log(\`Bản gốc: \${rooster.describe()}\`)

// Copy a mixed list: each clone() call runs the real class's method
const copies = [rooster, mouse].map(t => t.clone())
console.log(copies.map(t => t.constructor.name).join(', '), copies[0] !== rooster)`,
      },
    ],
    structure_notes: {
      en: 'The Prototype (DongHoPainting) declares the cloning methods; in most cases it is a single clone(). Here it is an abstract base class, like Shape in the page\'s pseudocode, so it also holds the shared fields and the prototype constructor that copies them, including the private paper field (paper) that only the class itself can see. Concrete Prototypes (RoosterPainting, MouseWeddingPainting) implement clone() by calling their own prototype constructor, which first lets the parent copy its fields and then copies the subclass\'s own field. Besides copying data, a clone method may also handle edge cases such as cloning linked objects or untangling recursive dependencies; here it copies the colour list so that a clone never shares it with the original. The Client can produce a copy of any object that follows the prototype interface. In the registry implementation, the Prototype Registry (WoodblockRegistry) provides easy access to frequently used prototypes by storing pre-built objects that are ready to be copied. The simplest registry is a name → prototype hash map, as here; if you need better search criteria than a name, you can build a more elaborate one. The page\'s Structure also shows a subclass of a concrete prototype; the diagram leaves it out because RoosterPainting and MouseWeddingPainting already show the same chained copying through the parent constructor.',
      vi: 'Prototype (DongHoPainting) khai báo các phương thức nhân bản; trong hầu hết trường hợp chỉ có một phương thức clone(). Ở đây nó là một lớp cơ sở trừu tượng, giống lớp Shape trong mã giả của trang gốc, nên nó còn giữ các trường dùng chung và hàm khởi tạo nguyên mẫu để chép các trường đó, kể cả trường riêng tư về loại giấy (paper) mà chỉ bản thân lớp mới thấy được. Concrete Prototype (RoosterPainting, MouseWeddingPainting) triển khai clone() bằng cách gọi hàm khởi tạo nguyên mẫu của chính lớp mình, hàm này để lớp cha chép các trường của nó trước rồi mới chép trường riêng của lớp con. Ngoài việc chép dữ liệu, phương thức clone còn có thể xử lý các trường hợp đặc biệt như nhân bản các đối tượng liên kết hoặc gỡ các phụ thuộc vòng; ở đây nó chép danh sách màu để bản sao không bao giờ dùng chung danh sách với bản gốc. Client có thể tạo bản sao của bất kỳ đối tượng nào tuân theo giao diện prototype. Trong cách triển khai có registry, Prototype Registry (WoodblockRegistry) giúp truy cập nhanh các nguyên mẫu hay dùng bằng cách lưu sẵn các đối tượng chờ được sao chép. Registry đơn giản nhất là một bảng băm tên → nguyên mẫu, như ở đây; nếu cần tiêu chí tìm kiếm tốt hơn tên gọi, bạn có thể xây một registry phức tạp hơn. Phần Structure của trang gốc còn có một lớp con của concrete prototype; sơ đồ bỏ qua lớp này vì RoosterPainting và MouseWeddingPainting đã thể hiện cùng cách sao chép nối tiếp qua hàm khởi tạo của lớp cha.',
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
      en: 'Singleton is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.',
      vi: 'Singleton là một mẫu thiết kế khởi tạo, cho phép bạn đảm bảo một lớp chỉ có duy nhất một thể hiện, đồng thời cung cấp một điểm truy cập toàn cục tới thể hiện đó.',
    },
    problem: {
      en: 'Singleton solves two problems at the same time, which violates the Single Responsibility Principle. First, it ensures that a class has just a single instance, most often to control access to a shared resource such as a database or a file: if you create an object and later ask for a new one, you get the one you already created. A regular constructor cannot do this, because a constructor call must always return a new object. Second, it provides a global access point to that instance. Global variables that hold essential objects are handy but unsafe, since any code can overwrite them and crash the app. Singleton lets you reach the object from anywhere, like a global variable, but protects the instance from being overwritten. You also do not want the code that solves the first problem scattered across your program; it is better kept within one class. Today the pattern is so popular that people call something a singleton even if it solves only one of these problems.',
      vi: 'Singleton giải quyết cùng lúc hai vấn đề, và vì thế vi phạm Nguyên tắc Đơn trách nhiệm. Thứ nhất, nó đảm bảo một lớp chỉ có duy nhất một thể hiện, thường là để kiểm soát truy cập tới một tài nguyên dùng chung như cơ sở dữ liệu hay một tệp: nếu bạn đã tạo một đối tượng và sau đó yêu cầu tạo đối tượng mới, bạn sẽ nhận lại chính đối tượng đã tạo. Hàm khởi tạo thông thường không làm được điều này, vì theo thiết kế, mỗi lời gọi hàm khởi tạo luôn phải trả về một đối tượng mới. Thứ hai, nó cung cấp một điểm truy cập toàn cục tới thể hiện đó. Biến toàn cục chứa các đối tượng quan trọng tuy tiện nhưng không an toàn, vì bất kỳ đoạn mã nào cũng có thể ghi đè lên chúng và làm ứng dụng gặp sự cố. Singleton cho phép truy cập đối tượng từ bất cứ đâu giống như biến toàn cục, nhưng bảo vệ thể hiện đó khỏi bị mã khác ghi đè. Bạn cũng không muốn đoạn mã giải quyết vấn đề thứ nhất nằm rải rác khắp chương trình; tốt hơn là gom nó vào một lớp. Ngày nay mẫu này phổ biến đến mức người ta gọi một thứ là singleton ngay cả khi nó chỉ giải quyết một trong hai vấn đề trên.',
    },
    solution: {
      en: 'All implementations of Singleton share two steps. Make the default constructor private, so that other objects cannot use the new operator with the Singleton class. Then create a static creation method that acts as a constructor: under the hood it calls the private constructor to create an object and saves it in a static field, and all following calls return the cached object. Any code that has access to the Singleton class can call this static method, and it always gets the same object. In a multithreaded program the creation method needs special care so that several threads do not create the instance at the same time; the page\'s pseudocode takes a lock and checks the field again once it holds the lock.',
      vi: 'Mọi cách triển khai Singleton đều có chung hai bước. Đặt hàm khởi tạo mặc định ở chế độ riêng tư, để đối tượng khác không thể dùng toán tử new với lớp Singleton. Sau đó tạo một phương thức tạo tĩnh đóng vai trò hàm khởi tạo: bên trong, nó gọi hàm khởi tạo riêng tư để tạo đối tượng và lưu đối tượng đó vào một trường tĩnh, và mọi lời gọi sau đều trả về đối tượng đã lưu. Bất kỳ đoạn mã nào truy cập được lớp Singleton đều gọi được phương thức tĩnh này và luôn nhận về cùng một đối tượng. Trong chương trình đa luồng, phương thức tạo cần được xử lý cẩn thận để nhiều luồng không cùng lúc tạo ra thể hiện; mã giả của trang gốc lấy khóa (lock) rồi kiểm tra lại trường đó một lần nữa sau khi đã giữ khóa.',
    },
    applicability: {
      en: 'Use Singleton when a class in your program should have just a single instance available to all clients, for example a single database object shared by different parts of the program: the pattern disables every other way of creating objects of the class except the special creation method, which either creates a new object or returns the existing one if it has already been created. Use it when you need stricter control over global variables: unlike global variables, Singleton guarantees that there is just one instance of a class, and nothing except the Singleton class itself can replace the cached instance. You can always relax this limit and allow any number of Singleton instances; the only code that needs to change is the body of the getInstance method.',
      vi: 'Dùng Singleton khi một lớp trong chương trình chỉ nên có duy nhất một thể hiện dùng chung cho mọi client, ví dụ một đối tượng cơ sở dữ liệu được nhiều phần của chương trình dùng chung: mẫu này chặn mọi cách tạo đối tượng của lớp, trừ phương thức tạo đặc biệt, phương thức này hoặc tạo đối tượng mới, hoặc trả về đối tượng có sẵn nếu đã được tạo trước đó. Dùng khi cần kiểm soát biến toàn cục chặt chẽ hơn: khác với biến toàn cục, Singleton đảm bảo lớp chỉ có đúng một thể hiện, và ngoài chính lớp Singleton, không gì có thể thay thế thể hiện đã lưu. Bạn luôn có thể nới lỏng giới hạn này và cho phép tạo bao nhiêu thể hiện Singleton tùy ý; chỉ cần sửa phần thân của phương thức getInstance.',
    },
    vietnamese_example: {
      title: { en: 'The King of Hùng (Vua Hùng)', vi: 'Vua Hùng - Một Vị Vua Duy Nhất' },
      description: {
        en: 'In Vietnamese legend, the Hùng Kings ruled Văn Lang, the first Vietnamese state, from a single royal court. The army (quân), the people (dân) and the officials (quan) all deal with that same court, and nobody can set up a second one. RoyalCourt is the Singleton: its constructor is private, and the only way in is RoyalCourt.getInstance(), which creates the court on its first call (the "Lập triều đình" message prints once) and returns the cached object on every later call. Its business method issueDecree() numbers each decree it issues; because every caller shares the one court, the numbering carries on from one caller to the next. As in the page\'s government analogy, no matter who is asking, "the court of Văn Lang" always means the same group in charge. The Python version also starts eight threads at once and shows they still get a single court, thanks to the lock and the second check inside get_instance().',
        vi: 'Theo truyền thuyết, các vua Hùng trị vì nước Văn Lang, nhà nước đầu tiên của người Việt, từ một triều đình duy nhất. Quân, dân và quan đều làm việc với cùng một triều đình ấy, và không ai có thể lập ra triều đình thứ hai. RoyalCourt là Singleton: hàm khởi tạo của nó là riêng tư, và cách duy nhất để tiếp cận là RoyalCourt.getInstance(), phương thức này tạo triều đình ở lần gọi đầu tiên (dòng "Lập triều đình" chỉ in ra một lần) và trả về đối tượng đã lưu ở mọi lần gọi sau. Phương thức nghiệp vụ issueDecree() đánh số từng tờ chiếu được ban ra; vì mọi nơi gọi đều dùng chung một triều đình, số thứ tự cứ thế nối tiếp từ nơi này sang nơi khác. Giống ví dụ về chính phủ trên trang gốc, dù ai hỏi thì "triều đình Văn Lang" vẫn luôn chỉ cùng một bộ máy cầm quyền. Bản Python còn khởi chạy cùng lúc tám luồng và cho thấy chúng vẫn chỉ nhận được một triều đình, nhờ khóa và lần kiểm tra thứ hai bên trong get_instance().',
      },
      illustration: '👑 Triều Đình Văn Lang\n┌──────────────────────┐\n│  RoyalCourt          │\n│  - instance: static  │\n│  - constructor() 🔒  │\n│  + getInstance()     │\n│  + issueDecree()     │\n└──────────────────────┘\n         │ (1 instance)\n    ┌────┼────┐\n    ▼    ▼    ▼\n  Quân  Dân  Quan\n (all see same court)',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `import threading
from typing import Optional


# Singleton: the royal court of Văn Lang. Only one may ever exist.
class RoyalCourt:
    # The field that stores the single instance is static (class-level)
    _instance: Optional["RoyalCourt"] = None
    _lock = threading.Lock()
    _token = object()

    # Python has no private constructors, so __init__ refuses
    # every caller that does not hold the class's private token
    def __init__(self, token: object = None) -> None:
        if token is not RoyalCourt._token:
            raise RuntimeError("Hãy dùng RoyalCourt.get_instance()")
        print("🏯 Lập triều đình Văn Lang (chỉ một lần)")
        self.king = "Hùng Vương"
        self._decree_count = 0

    # Static creation method: the only way to reach the court
    @classmethod
    def get_instance(cls) -> "RoyalCourt":
        if cls._instance is None:
            with cls._lock:
                # Check again: another thread may have created it while we waited
                if cls._instance is None:
                    cls._instance = cls(cls._token)
        return cls._instance

    # Business logic that runs on the single instance
    def issue_decree(self, recipient: str, order: str) -> str:
        self._decree_count += 1
        return f"📜 Chiếu số {self._decree_count} của {self.king} gửi {recipient}: {order}"


# Client: eight threads ask for the court at the same moment
results: list[RoyalCourt] = []
threads = [threading.Thread(target=lambda: results.append(RoyalCourt.get_instance())) for _ in range(8)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(f"8 luồng, số triều đình: {len({id(court) for court in results})}")

# Every part of the kingdom gets the same court, so decree numbers continue
for recipient, order in [("Quân", "Giữ yên bờ cõi"), ("Dân", "Mở hội làng"), ("Quan", "Đắp đê trị thủy")]:
    print(RoyalCourt.get_instance().issue_decree(recipient, order))
print(f"Cùng một triều đình: {RoyalCourt.get_instance() is RoyalCourt.get_instance()}")

# Direct construction is refused
try:
    RoyalCourt()
except RuntimeError as e:
    print(f"⛔ {e}")

# Output:
# 🏯 Lập triều đình Văn Lang (chỉ một lần)
# 8 luồng, số triều đình: 1
# 📜 Chiếu số 1 của Hùng Vương gửi Quân: Giữ yên bờ cõi
# 📜 Chiếu số 2 của Hùng Vương gửi Dân: Mở hội làng
# 📜 Chiếu số 3 của Hùng Vương gửi Quan: Đắp đê trị thủy
# Cùng một triều đình: True
# ⛔ Hãy dùng RoyalCourt.get_instance()`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Singleton: the royal court of Văn Lang. Only one may ever exist.
class RoyalCourt {
  // The field that stores the single instance is static
  private static instance: RoyalCourt | null = null
  private decreeCount = 0
  readonly king = 'Hùng Vương'

  // Private constructor: calling new RoyalCourt() outside the class
  // is a compile-time error
  private constructor() {
    console.log('🏯 Lập triều đình Văn Lang (chỉ một lần)')
  }

  // Static creation method: the only way to reach the court.
  // JavaScript runs this code on a single thread, so no lock is needed.
  static getInstance(): RoyalCourt {
    if (RoyalCourt.instance === null) {
      RoyalCourt.instance = new RoyalCourt()
    }
    return RoyalCourt.instance
  }

  // Business logic that runs on the single instance
  issueDecree(recipient: string, order: string): string {
    this.decreeCount += 1
    return \`📜 Chiếu số \${this.decreeCount} của \${this.king} gửi \${recipient}: \${order}\`
  }
}

// Client: every part of the kingdom gets the same court,
// so decree numbers continue from one caller to the next
const calls: [string, string][] = [
  ['Quân', 'Giữ yên bờ cõi'],
  ['Dân', 'Mở hội làng'],
  ['Quan', 'Đắp đê trị thủy'],
]
for (const [recipient, order] of calls) {
  console.log(RoyalCourt.getInstance().issueDecree(recipient, order))
}
console.log(\`Cùng một triều đình: \${RoyalCourt.getInstance() === RoyalCourt.getInstance()}\`)

// const impostor = new RoyalCourt()
// ❌ Error: Constructor of class 'RoyalCourt' is private`,
      },
    ],
    structure_notes: {
      en: 'The Singleton class (RoyalCourt) declares the static method getInstance that returns the same instance of its own class, kept in a private static field. The Singleton\'s constructor should be hidden from client code, so calling getInstance is the only way to get the Singleton object. TypeScript enforces this with a private constructor. Python has no private constructors, so the Python example makes __init__ reject any caller that does not pass the class\'s private token. Any business logic, such as issueDecree(), runs on that one instance. The diagram draws the client as three callers (Quân, Dân, Quan) to show that they all receive the same object.',
      vi: 'Lớp Singleton (RoyalCourt) khai báo phương thức tĩnh getInstance trả về cùng một thể hiện của chính lớp đó, được lưu trong một trường tĩnh riêng tư. Hàm khởi tạo của Singleton phải được ẩn khỏi mã client, để gọi getInstance là cách duy nhất lấy được đối tượng Singleton. TypeScript đảm bảo điều này bằng hàm khởi tạo private. Python không có hàm khởi tạo riêng tư, nên ví dụ Python cho __init__ từ chối mọi nơi gọi không truyền vào mã thông hành riêng của lớp. Mọi logic nghiệp vụ, như issueDecree(), đều chạy trên thể hiện duy nhất đó. Sơ đồ vẽ client thành ba nơi gọi (Quân, Dân, Quan) để cho thấy tất cả đều nhận về cùng một đối tượng.',
    },
  },
]
