import type { Pattern } from '../types/pattern'

export const creationalPatterns: Omit<Pattern, 'diagram'>[] = [
  {
    id: 'factory-method',
    slug: 'factory-method',
    name: { en: 'Factory Method', vi: 'Phương thức nhà máy' },
    category: 'creational',
    complexity: 1,
    popularity: 3,
    also_known_as: [{ en: 'Virtual Constructor', vi: 'Hàm khởi tạo ảo' }],
    intent: {
      en: 'Factory Method is a creational design pattern that declares an interface for creating objects in a superclass and lets subclasses decide which class of object to create.',
      vi: 'Factory Method là một mẫu thiết kế khởi tạo: lớp cha khai báo giao diện để tạo đối tượng, còn lớp con quyết định đối tượng được tạo thuộc lớp nào.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'Imagine a logistics app. Its first version handles only trucks, so most of the code lives in the Truck class.' },
        { type: 'paragraph', text: 'Later, sea freight companies ask for ships. Because the code is tied to Truck, adding a Ship class means changes across the codebase, and every further transport type means the same work again. The code fills up with conditionals that pick behaviour by transport class.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Hãy hình dung một ứng dụng logistics. Phiên bản đầu chỉ hỗ trợ xe tải, nên phần lớn mã nằm trong lớp Truck.' },
        { type: 'paragraph', text: 'Sau đó, các công ty vận tải biển muốn dùng thêm tàu thủy. Vì mã gắn chặt với Truck, thêm lớp Ship đồng nghĩa với việc sửa nhiều chỗ trong mã nguồn, và mỗi loại phương tiện mới lại phải làm lại như vậy. Mã dần đầy những câu lệnh điều kiện để chọn hành vi theo từng lớp phương tiện.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Replace direct construction calls (the new operator) with calls to a factory method. Objects are still created with new, but inside the factory method. The objects it returns are called products.' },
        { type: 'paragraph', text: 'Subclasses can override the factory method to change the class of the products it creates. This works only if all products share a base class or interface. For example, Truck and Ship both implement Transport with a deliver() method, and the factory method in the base class declares Transport as its return type.' },
        { type: 'paragraph', text: 'Client code then treats every product as an abstract Transport. It calls deliver() without knowing how each transport implements it.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Thay các lời gọi tạo đối tượng trực tiếp (toán tử new) bằng lời gọi tới một phương thức nhà máy (factory method). Đối tượng vẫn được tạo bằng new, nhưng ở bên trong phương thức nhà máy. Các đối tượng mà phương thức này trả về được gọi là sản phẩm (product).' },
        { type: 'paragraph', text: 'Lớp con có thể ghi đè phương thức nhà máy để đổi lớp của sản phẩm được tạo. Cách này chỉ dùng được khi mọi sản phẩm có chung một lớp cơ sở hoặc giao diện. Ví dụ, Truck và Ship cùng triển khai Transport với phương thức deliver(), và phương thức nhà máy ở lớp cơ sở khai báo kiểu trả về là Transport.' },
        { type: 'paragraph', text: 'Khi đó, mã client coi mọi sản phẩm là một Transport trừu tượng. Nó gọi deliver() mà không cần biết từng phương tiện triển khai phương thức này ra sao.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Factory Method when:' },
        { type: 'list', items: [
          'you don\'t know in advance the exact types and dependencies of the objects your code will work with. Construction code stays separate from the code that uses the product, so adding a product type only needs a new creator subclass.',
          'you want users of your library or framework to extend its internal components. They subclass a component and override its factory method; for example, UIWithRoundButtons overrides createButton() to return a RoundButton.',
          'you want to save resources by reusing existing objects, such as database connections. A constructor always returns a new object, but a factory method can return an existing one from a cache or pool.',
        ] },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Factory Method khi:' },
        { type: 'list', items: [
          'bạn chưa biết trước chính xác loại và các phụ thuộc của những đối tượng mà mã sẽ làm việc cùng. Mã khởi tạo nằm tách khỏi mã dùng sản phẩm, nên thêm một loại sản phẩm chỉ cần thêm một lớp creator con.',
          'bạn muốn người dùng thư viện hoặc framework của mình mở rộng các thành phần bên trong. Họ kế thừa thành phần đó và ghi đè phương thức nhà máy; ví dụ, UIWithRoundButtons ghi đè createButton() để trả về RoundButton.',
          'bạn muốn tiết kiệm tài nguyên bằng cách dùng lại các đối tượng có sẵn, như kết nối cơ sở dữ liệu. Hàm khởi tạo luôn trả về một đối tượng mới, còn phương thức nhà máy có thể trả về đối tượng có sẵn trong cache hoặc pool.',
        ] },
      ],
    },
    vietnamese_example: {
      title: { en: 'Wrapping Tết cakes in two households', vi: 'Gói bánh Tết ở hai gia đình' },
      description: {
        en: [
          { type: 'paragraph', text: 'Many Vietnamese families make sticky-rice cakes for Tết, the Lunar New Year, and many others buy them. This example reduces the preparation to one routine: wrap the cake, boil it and place it on the ancestral altar. Real practice varies by family and locality.' },
          { type: 'paragraph', text: 'The routine is the core logic of the base class TetHousehold, in prepareForNewYear(). It works only with the RiceCake interface, through wrap() and boil(). The one step that changes is which cake gets made, so that step becomes the factory method makeRiceCake().' },
          { type: 'paragraph', text: 'To keep the example simple, each cake is paired with a region. NorthernHousehold overrides makeRiceCake() to return a ChungCake, a square bánh chưng wrapped in lá dong leaves. SouthernHousehold returns a TetCake, a cylindrical bánh tét wrapped in banana leaves. Both cakes are made in many parts of the country, so treat the pairing as a teaching simplification, not a rule.' },
          { type: 'paragraph', text: 'Adding another kind of household means adding one creator subclass. The Tết routine itself does not change.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Nhiều gia đình Việt tự gói bánh từ gạo nếp để đón Tết, nhiều nhà khác thì mua sẵn. Ví dụ này rút gọn việc chuẩn bị thành một quy trình: gói bánh, luộc bánh rồi bày lên bàn thờ tổ tiên. Thực tế mỗi gia đình, mỗi địa phương làm một khác.' },
          { type: 'paragraph', text: 'Quy trình này là logic chính của lớp cơ sở TetHousehold, nằm trong prepareForNewYear(). Nó chỉ làm việc với giao diện RiceCake, qua wrap() và boil(). Bước duy nhất thay đổi là làm loại bánh nào, nên bước đó được tách thành phương thức nhà máy makeRiceCake().' },
          { type: 'paragraph', text: 'Để ví dụ đơn giản, mỗi loại bánh được ghép với một miền. NorthernHousehold ghi đè makeRiceCake() để trả về ChungCake, tức bánh chưng vuông gói lá dong. SouthernHousehold trả về TetCake, tức bánh tét hình trụ gói lá chuối. Cả hai loại bánh đều được làm ở nhiều vùng trong nước, nên cách ghép này chỉ là đơn giản hóa để minh họa, không phải quy tắc.' },
          { type: 'paragraph', text: 'Thêm một kiểu gia đình khác chỉ cần thêm một lớp creator con. Bản thân quy trình đón Tết không phải sửa.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod


# Product: the interface every cake implements
class RiceCake(ABC):
    @abstractmethod
    def wrap(self) -> str: ...

    @abstractmethod
    def boil(self) -> str: ...


# Concrete Products
class ChungCake(RiceCake):
    def wrap(self) -> str:
        return "Gói bánh chưng vuông bằng lá dong"

    def boil(self) -> str:
        return "Luộc bánh chưng"


class TetCake(RiceCake):
    def wrap(self) -> str:
        return "Gói bánh tét hình trụ bằng lá chuối"

    def boil(self) -> str:
        return "Luộc bánh tét"


# Creator: declares the factory method and holds the core business logic
class TetHousehold(ABC):
    # Factory method: the return type is the Product interface
    @abstractmethod
    def make_rice_cake(self) -> RiceCake: ...

    # Creating cakes is not the creator's main job; preparing for Tết is.
    # This logic only depends on the RiceCake interface.
    def prepare_for_new_year(self) -> str:
        cake = self.make_rice_cake()
        return " → ".join([cake.wrap(), cake.boil(), "Bày lên bàn thờ tổ tiên"])


# Concrete Creators override the factory method to change the product type
class NorthernHousehold(TetHousehold):
    def make_rice_cake(self) -> RiceCake:
        return ChungCake()


class SouthernHousehold(TetHousehold):
    def make_rice_cake(self) -> RiceCake:
        return TetCake()


# The application picks a concrete creator from configuration
def create_household(region: str) -> TetHousehold:
    if region == "north":
        return NorthernHousehold()
    if region == "south":
        return SouthernHousehold()
    raise ValueError(f"Unknown region: {region}")


# Client code works with the creator only through the base class
for region in ["north", "south"]:
    print(create_household(region).prepare_for_new_year())

# Output:
# Gói bánh chưng vuông bằng lá dong → Luộc bánh chưng → Bày lên bàn thờ tổ tiên
# Gói bánh tét hình trụ bằng lá chuối → Luộc bánh tét → Bày lên bàn thờ tổ tiên`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Product: the interface every cake implements
interface RiceCake {
  wrap(): string
  boil(): string
}

// Concrete Products
class ChungCake implements RiceCake {
  wrap() { return 'Gói bánh chưng vuông bằng lá dong' }
  boil() { return 'Luộc bánh chưng' }
}

class TetCake implements RiceCake {
  wrap() { return 'Gói bánh tét hình trụ bằng lá chuối' }
  boil() { return 'Luộc bánh tét' }
}

// Creator: declares the factory method and holds the core business logic
abstract class TetHousehold {
  // Factory method: the return type is the Product interface
  abstract makeRiceCake(): RiceCake

  // Creating cakes is not the creator's main job; preparing for Tết is.
  // This logic only depends on the RiceCake interface.
  prepareForNewYear(): string {
    const cake = this.makeRiceCake()
    return [cake.wrap(), cake.boil(), 'Bày lên bàn thờ tổ tiên'].join(' → ')
  }
}

// Concrete Creators override the factory method to change the product type
class NorthernHousehold extends TetHousehold {
  makeRiceCake(): RiceCake { return new ChungCake() }
}

class SouthernHousehold extends TetHousehold {
  makeRiceCake(): RiceCake { return new TetCake() }
}

// The application picks a concrete creator from configuration
function createHousehold(region: 'north' | 'south'): TetHousehold {
  switch (region) {
    case 'north': return new NorthernHousehold()
    case 'south': return new SouthernHousehold()
    default: throw new Error('Unknown region: ' + region)
  }
}

// Client code works with the creator only through the base class
for (const region of ['north', 'south'] as const) {
  console.log(createHousehold(region).prepareForNewYear())
}`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'Product (RiceCake) declares the interface shared by every object that the creator and its subclasses can produce. Concrete Products (ChungCake, TetCake) are different implementations of that interface.' },
        { type: 'paragraph', text: 'Creator (TetHousehold) declares the factory method, makeRiceCake(), whose return type must be the Product interface. The method can be abstract, which forces every subclass to implement it, or it can return a default product.' },
        { type: 'paragraph', text: 'Despite its name, the Creator\'s main job is not creating products. It usually holds core business logic that relies on products, here prepareForNewYear(), and the factory method keeps that logic independent of the concrete product classes.' },
        { type: 'paragraph', text: 'Concrete Creators (NorthernHousehold, SouthernHousehold) override the factory method to return a different product type. A factory method does not have to create a new instance every time; it can also return an existing object from a cache or pool.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Product (RiceCake) khai báo giao diện chung cho mọi đối tượng mà creator và các lớp con của nó có thể tạo ra. Concrete Product (ChungCake, TetCake) là các cách triển khai khác nhau của giao diện đó.' },
        { type: 'paragraph', text: 'Creator (TetHousehold) khai báo phương thức nhà máy makeRiceCake(), với kiểu trả về phải là giao diện Product. Phương thức này có thể là trừu tượng để buộc mọi lớp con tự triển khai, hoặc trả về một sản phẩm mặc định.' },
        { type: 'paragraph', text: 'Dù tên gọi như vậy, việc chính của Creator không phải là tạo sản phẩm. Lớp này thường chứa logic nghiệp vụ cốt lõi dựa trên sản phẩm, ở đây là prepareForNewYear(), và phương thức nhà máy giúp logic đó không phụ thuộc vào các lớp sản phẩm cụ thể.' },
        { type: 'paragraph', text: 'Concrete Creator (NorthernHousehold, SouthernHousehold) ghi đè phương thức nhà máy để trả về loại sản phẩm khác. Phương thức nhà máy không nhất thiết lần nào cũng tạo đối tượng mới; nó cũng có thể trả về đối tượng có sẵn trong cache hoặc pool.' },
      ],
    },
  },

  {
    id: 'abstract-factory',
    slug: 'abstract-factory',
    name: { en: 'Abstract Factory', vi: 'Nhà máy trừu tượng' },
    category: 'creational',
    complexity: 2,
    popularity: 3,
    intent: {
      en: 'Abstract Factory is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.',
      vi: 'Abstract Factory là một mẫu thiết kế khởi tạo, cho phép tạo các họ đối tượng có liên quan mà không cần chỉ rõ lớp cụ thể của chúng.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'Imagine a furniture shop simulator. The code works with a family of related products, Chair, Sofa and CoffeeTable, and the family comes in several variants: Modern, Victorian and ArtDeco.' },
        { type: 'paragraph', text: 'You need a way to create furniture so that each piece matches the rest of its family. A customer who orders a Modern sofa will not be happy to receive Victorian chairs with it. You also don\'t want to change existing code each time you add a product or a variant, because furniture vendors update their catalogues often.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Hãy hình dung một trò chơi mô phỏng cửa hàng nội thất. Mã làm việc với một họ sản phẩm liên quan gồm Chair, Sofa và CoffeeTable, và họ này có nhiều biến thể: Modern, Victorian và ArtDeco.' },
        { type: 'paragraph', text: 'Bạn cần một cách tạo đồ nội thất sao cho mỗi món khớp với các món khác cùng họ. Khách đặt sofa kiểu Modern sẽ không vui khi nhận kèm ghế kiểu Victorian. Bạn cũng không muốn sửa mã hiện có mỗi khi thêm sản phẩm hoặc biến thể, vì nhà cung cấp nội thất cập nhật danh mục thường xuyên.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'First, declare an interface for each distinct product in the family (Chair, Sofa, CoffeeTable), and make every variant of that product implement it.' },
        { type: 'paragraph', text: 'Next, declare the Abstract Factory: an interface with one creation method per product in the family (createChair(), createSofa(), createCoffeeTable()). Each method returns the abstract product type.' },
        { type: 'paragraph', text: 'For each variant, create a concrete factory class that returns only products of that variant. ModernFurnitureFactory, for example, creates only ModernChair, ModernSofa and ModernCoffeeTable.' },
        { type: 'paragraph', text: 'The client works with factories and products only through their abstract interfaces. You can switch the factory without breaking the client, and the chair it gets always matches the sofa from the same factory. The application usually creates the concrete factory during initialization, choosing it from the configuration or the environment.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Trước tiên, khai báo một giao diện cho mỗi sản phẩm riêng biệt trong họ (Chair, Sofa, CoffeeTable), rồi cho mọi biến thể của sản phẩm đó triển khai giao diện này.' },
        { type: 'paragraph', text: 'Tiếp theo, khai báo Abstract Factory: một giao diện có một phương thức tạo cho mỗi sản phẩm trong họ (createChair(), createSofa(), createCoffeeTable()). Mỗi phương thức trả về kiểu sản phẩm trừu tượng.' },
        { type: 'paragraph', text: 'Với mỗi biến thể, tạo một lớp factory cụ thể chỉ trả về sản phẩm của biến thể đó. Ví dụ, ModernFurnitureFactory chỉ tạo ModernChair, ModernSofa và ModernCoffeeTable.' },
        { type: 'paragraph', text: 'Client chỉ làm việc với factory và sản phẩm qua các giao diện trừu tượng. Bạn có thể đổi factory mà không làm hỏng client, và chiếc ghế client nhận được luôn khớp với sofa do cùng factory tạo ra. Ứng dụng thường tạo factory cụ thể khi khởi động, chọn loại dựa trên cấu hình hoặc môi trường.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Abstract Factory when:' },
        { type: 'list', items: [
          'your code needs to work with several families of related products, but you don\'t want it to depend on their concrete classes. The classes may be unknown in advance, or you may want to leave room for new ones. As long as your code creates objects through the factory interface, it cannot create a product that doesn\'t match the others.',
          'a class has a set of factory methods that blur its main responsibility. Move them into a separate factory class or into a full Abstract Factory.',
        ] },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Abstract Factory khi:' },
        { type: 'list', items: [
          'mã cần làm việc với nhiều họ sản phẩm liên quan, nhưng bạn không muốn nó phụ thuộc vào các lớp cụ thể của chúng. Có thể bạn chưa biết trước các lớp đó, hoặc muốn chừa chỗ cho lớp mới. Miễn là mã tạo đối tượng qua giao diện factory, nó không thể tạo ra một sản phẩm lệch bộ với các sản phẩm còn lại.',
          'một lớp có nhiều factory method làm lu mờ trách nhiệm chính của nó. Hãy chuyển chúng sang một lớp factory riêng hoặc một Abstract Factory hoàn chỉnh.',
        ] },
      ],
    },
    vietnamese_example: {
      title: { en: 'Matching dishes on a Tết feast tray', vi: 'Mâm cỗ Tết đồng bộ theo vùng' },
      description: {
        en: [
          { type: 'paragraph', text: 'A Tết feast tray (mâm cỗ) holds several dishes served together. This example models the tray as a product family of three dish types: a rice cake, a meat dish and a pickle.' },
          { type: 'paragraph', text: 'To keep the code small, each dish type has two regional variants. The Northern set is bánh chưng, thịt đông (jellied pork) and dưa hành (pickled shallots), as ChungCake, JelliedPork and PickledOnion. The Southern set is bánh tét, thịt kho tàu (pork and eggs braised in coconut water) and dưa kiệu (pickled scallion bulbs), as TetCake, BraisedPorkWithEggs and PickledLeek.' },
          { type: 'paragraph', text: 'This split is a simplified teaching analogy, not a cultural rule. What goes on a tray varies by family and locality, and many of these dishes are eaten in both regions. The code needs only one constraint: the dishes on one tray come from the same set.' },
          { type: 'paragraph', text: 'The FeastFactory interface declares makeRiceCake(), makeMeatDish() and makePickle(). NorthernFactory and SouthernFactory each create only their own set. The Feast client prepares the tray through the abstract RiceCake, MeatDish and Pickle types, so a tray never mixes the two sets. Adding a Central set means one new factory and its three dishes, with no change to Feast.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Mâm cỗ Tết gồm nhiều món dọn cùng nhau. Ví dụ này mô hình hóa mâm cỗ thành một họ sản phẩm gồm ba loại món: bánh, món thịt và món dưa.' },
          { type: 'paragraph', text: 'Để mã gọn, mỗi loại món có hai biến thể theo miền. Bộ miền Bắc gồm bánh chưng, thịt đông và dưa hành, ứng với ChungCake, JelliedPork và PickledOnion. Bộ miền Nam gồm bánh tét, thịt kho tàu và dưa kiệu, ứng với TetCake, BraisedPorkWithEggs và PickledLeek.' },
          { type: 'paragraph', text: 'Cách chia này chỉ là một phép so sánh đơn giản để minh họa, không phải quy tắc văn hóa. Mâm cỗ mỗi nhà, mỗi nơi một khác, và nhiều món trong số này có mặt ở cả hai miền. Mã chỉ cần một ràng buộc: các món trên cùng một mâm thuộc cùng một bộ.' },
          { type: 'paragraph', text: 'Giao diện FeastFactory khai báo makeRiceCake(), makeMeatDish() và makePickle(). NorthernFactory và SouthernFactory mỗi lớp chỉ tạo bộ món của mình. Client Feast bày mâm qua các kiểu trừu tượng RiceCake, MeatDish và Pickle, nên một mâm không bao giờ lẫn hai bộ. Thêm bộ miền Trung chỉ cần một factory mới cùng ba món của nó, không phải sửa Feast.' },
        ],
      },
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


class MeatDish(ABC):
    @abstractmethod
    def serve(self) -> str: ...


class Pickle(ABC):
    @abstractmethod
    def serve(self) -> str: ...

    # Products of a family can work together. The argument is the
    # abstract type, but it only makes sense with a dish from the same set.
    @abstractmethod
    def eat_with(self, cake: RiceCake) -> str: ...


# Concrete Products: the Northern set
class ChungCake(RiceCake):
    def serve(self) -> str: return "🟫 bánh chưng"

class JelliedPork(MeatDish):
    def serve(self) -> str: return "🧊 thịt đông"

class PickledOnion(Pickle):
    def serve(self) -> str: return "🧅 dưa hành"
    def eat_with(self, cake: RiceCake) -> str:
        return f"{self.serve()} ăn kèm {cake.serve()}"


# Concrete Products: the Southern set
class TetCake(RiceCake):
    def serve(self) -> str: return "🟤 bánh tét"

class BraisedPorkWithEggs(MeatDish):
    def serve(self) -> str: return "🥚 thịt kho tàu"

class PickledLeek(Pickle):
    def serve(self) -> str: return "🫙 dưa kiệu"
    def eat_with(self, cake: RiceCake) -> str:
        return f"{self.serve()} ăn kèm {cake.serve()}"


# Abstract Factory: one creation method per product type,
# each returning the abstract product
class FeastFactory(ABC):
    @abstractmethod
    def make_rice_cake(self) -> RiceCake: ...

    @abstractmethod
    def make_meat_dish(self) -> MeatDish: ...

    @abstractmethod
    def make_pickle(self) -> Pickle: ...


# Concrete Factories: each one creates a single variant,
# so the products it returns always match
class NorthernFactory(FeastFactory):
    def make_rice_cake(self) -> RiceCake: return ChungCake()
    def make_meat_dish(self) -> MeatDish: return JelliedPork()
    def make_pickle(self) -> Pickle: return PickledOnion()


class SouthernFactory(FeastFactory):
    def make_rice_cake(self) -> RiceCake: return TetCake()
    def make_meat_dish(self) -> MeatDish: return BraisedPorkWithEggs()
    def make_pickle(self) -> Pickle: return PickledLeek()


# Client: works only with the abstract types
class Feast:
    def __init__(self, factory: FeastFactory):
        self.factory = factory

    def prepare(self) -> str:
        cake = self.factory.make_rice_cake()
        meat = self.factory.make_meat_dish()
        pickle = self.factory.make_pickle()
        return f"Mâm cỗ: {cake.serve()} + {meat.serve()} | {pickle.eat_with(cake)}"


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
# Mâm cỗ: 🟫 bánh chưng + 🧊 thịt đông | 🧅 dưa hành ăn kèm 🟫 bánh chưng
# Mâm cỗ: 🟤 bánh tét + 🥚 thịt kho tàu | 🫙 dưa kiệu ăn kèm 🟤 bánh tét`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Abstract Products: one interface per product type in the family
interface RiceCake { serve(): string }
interface MeatDish { serve(): string }
interface Pickle {
  serve(): string
  // Products of a family can work together. The argument is the
  // abstract type, but it only makes sense with a dish from the same set.
  eatWith(cake: RiceCake): string
}

// Concrete Products: the Northern set
class ChungCake implements RiceCake { serve() { return '🟫 bánh chưng' } }
class JelliedPork implements MeatDish { serve() { return '🧊 thịt đông' } }
class PickledOnion implements Pickle {
  serve() { return '🧅 dưa hành' }
  eatWith(cake: RiceCake) { return \`\${this.serve()} ăn kèm \${cake.serve()}\` }
}

// Concrete Products: the Southern set
class TetCake implements RiceCake { serve() { return '🟤 bánh tét' } }
class BraisedPorkWithEggs implements MeatDish { serve() { return '🥚 thịt kho tàu' } }
class PickledLeek implements Pickle {
  serve() { return '🫙 dưa kiệu' }
  eatWith(cake: RiceCake) { return \`\${this.serve()} ăn kèm \${cake.serve()}\` }
}

// Abstract Factory: one creation method per product type,
// each returning the abstract product
interface FeastFactory {
  makeRiceCake(): RiceCake
  makeMeatDish(): MeatDish
  makePickle(): Pickle
}

// Concrete Factories: each one creates a single variant,
// so the products it returns always match
class NorthernFactory implements FeastFactory {
  makeRiceCake(): RiceCake { return new ChungCake() }
  makeMeatDish(): MeatDish { return new JelliedPork() }
  makePickle(): Pickle { return new PickledOnion() }
}

class SouthernFactory implements FeastFactory {
  makeRiceCake(): RiceCake { return new TetCake() }
  makeMeatDish(): MeatDish { return new BraisedPorkWithEggs() }
  makePickle(): Pickle { return new PickledLeek() }
}

// Client: works only with the abstract types
class Feast {
  constructor(private factory: FeastFactory) {}

  prepare(): string {
    const cake = this.factory.makeRiceCake()
    const meat = this.factory.makeMeatDish()
    const pickle = this.factory.makePickle()
    return \`Mâm cỗ: \${cake.serve()} + \${meat.serve()} | \${pickle.eatWith(cake)}\`
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
      en: [
        { type: 'paragraph', text: 'Abstract Products (RiceCake, MeatDish, Pickle) declare interfaces for a set of distinct but related products that make up a family. Concrete Products implement them, grouped by variant, and every abstract product must be implemented in every variant.' },
        { type: 'paragraph', text: 'The Abstract Factory interface (FeastFactory) declares one creation method per abstract product. Concrete Factories (NorthernFactory, SouthernFactory) implement those methods; each one stands for a single variant and creates only that variant\'s products.' },
        { type: 'paragraph', text: 'Concrete factories instantiate concrete products, but their method signatures return abstract products. That lets the Client (Feast) work with any factory and any variant through the abstract interfaces.' },
        { type: 'paragraph', text: 'In the diagram, the Northern products sit in the middle row and the Southern products in the bottom row, each under the abstract product it implements.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Abstract Product (RiceCake, MeatDish, Pickle) khai báo giao diện cho một tập sản phẩm khác nhau nhưng có liên quan, tạo thành một họ. Concrete Product triển khai các giao diện đó, được nhóm theo biến thể, và mỗi sản phẩm trừu tượng phải được triển khai ở mọi biến thể.' },
        { type: 'paragraph', text: 'Giao diện Abstract Factory (FeastFactory) khai báo một phương thức tạo cho mỗi sản phẩm trừu tượng. Concrete Factory (NorthernFactory, SouthernFactory) triển khai các phương thức đó; mỗi factory ứng với một biến thể và chỉ tạo sản phẩm của biến thể đó.' },
        { type: 'paragraph', text: 'Factory cụ thể khởi tạo sản phẩm cụ thể, nhưng chữ ký phương thức của nó trả về sản phẩm trừu tượng. Nhờ vậy Client (Feast) làm việc được với bất kỳ factory và biến thể nào qua các giao diện trừu tượng.' },
        { type: 'paragraph', text: 'Trong sơ đồ, sản phẩm miền Bắc nằm ở hàng giữa và sản phẩm miền Nam ở hàng dưới, mỗi sản phẩm nằm dưới sản phẩm trừu tượng mà nó triển khai.' },
      ],
    },
  },

  {
    id: 'builder',
    slug: 'builder',
    name: { en: 'Builder', vi: 'Xây dựng từng bước' },
    category: 'creational',
    complexity: 2,
    popularity: 3,
    intent: {
      en: 'Builder is a creational design pattern that lets you construct complex objects step by step. The same construction code can produce different types and representations of an object.',
      vi: 'Builder là một mẫu thiết kế khởi tạo, cho phép xây dựng đối tượng phức tạp theo từng bước. Cùng một đoạn mã xây dựng có thể tạo ra nhiều kiểu và nhiều biểu diễn khác nhau của một đối tượng.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'Imagine a complex object that needs laborious, step-by-step initialization of many fields and nested objects. That code usually ends up in a huge constructor with many parameters or, worse, scattered across the client code.' },
        { type: 'paragraph', text: 'Take a House object. A simple house needs four walls, a floor, a door, two windows and a roof. A bigger, brighter house may also want a backyard, heating, plumbing and electrical wiring.' },
        { type: 'paragraph', text: 'A House subclass for every combination of options gives you a large class hierarchy, and each new option, such as a porch style, makes it grow again. A single constructor with every possible parameter avoids the subclasses, but most calls leave most parameters unused. Only a few houses have a swimming pool, so the pool parameters are wasted in most calls, and the constructor calls become hard to read.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Hãy hình dung một đối tượng phức tạp cần được khởi tạo công phu, từng bước, với nhiều trường và đối tượng lồng nhau. Đoạn mã đó thường bị dồn vào một hàm khởi tạo khổng lồ với rất nhiều tham số, hoặc tệ hơn là nằm rải rác khắp mã client.' },
        { type: 'paragraph', text: 'Lấy ví dụ đối tượng House. Một ngôi nhà đơn giản cần bốn bức tường, sàn, một cửa ra vào, hai cửa sổ và mái. Một ngôi nhà lớn và sáng sủa hơn có thể cần thêm sân sau, hệ thống sưởi, đường ống nước và hệ thống điện.' },
        { type: 'paragraph', text: 'Tạo một lớp con của House cho mỗi tổ hợp tùy chọn sẽ sinh ra một cây kế thừa rất lớn, và mỗi tùy chọn mới, chẳng hạn kiểu hiên nhà, lại làm cây đó phình thêm. Một hàm khởi tạo duy nhất chứa mọi tham số có thể giúp bỏ được các lớp con, nhưng phần lớn lời gọi lại bỏ trống phần lớn tham số. Chỉ ít ngôi nhà có bể bơi, nên các tham số về bể bơi thường bị bỏ phí, và lời gọi hàm khởi tạo trở nên khó đọc.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Move the construction code out of the object\'s own class and into separate objects called builders. The pattern splits construction into a set of steps, such as buildWalls() and buildDoor(). To create an object, you run a series of these steps on a builder, calling only the steps your configuration needs. The builder does not let other objects access the product while it is being built.' },
        { type: 'paragraph', text: 'Some steps may need different implementations for different representations: a cabin\'s walls are wood, a castle\'s are stone. In that case you create several builder classes that implement the same steps differently. Running the same steps then produces a regular house, a small castle or a palace. This works only if the code that calls the steps talks to the builders through a common interface.' },
        { type: 'paragraph', text: 'You can go further and move the sequence of step calls into a director class. The director defines the order of the steps, and the builder implements them. A director is optional, because the client can call the steps directly, but it is a good place for construction routines you want to reuse. It also hides construction details from the client, which only links a builder to the director, starts construction through the director and takes the result from the builder.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Chuyển mã xây dựng ra khỏi chính lớp của đối tượng, sang các đối tượng riêng gọi là builder. Mẫu này chia việc xây dựng thành một tập bước, như buildWalls() và buildDoor(). Để tạo một đối tượng, bạn chạy một chuỗi các bước đó trên builder và chỉ gọi những bước mà cấu hình của bạn cần. Builder không cho đối tượng khác truy cập sản phẩm khi sản phẩm đang được xây dựng.' },
        { type: 'paragraph', text: 'Một số bước có thể cần cách làm khác nhau cho từng biểu diễn: tường nhà gỗ làm bằng gỗ, tường lâu đài làm bằng đá. Khi đó bạn tạo nhiều lớp builder cùng triển khai một tập bước theo những cách khác nhau. Cùng một chuỗi bước sẽ cho ra một ngôi nhà thường, một lâu đài nhỏ hoặc một cung điện. Cách này chỉ dùng được khi mã gọi các bước làm việc với builder qua một giao diện chung.' },
        { type: 'paragraph', text: 'Bạn có thể đi xa hơn và chuyển chuỗi lời gọi các bước vào một lớp director. Director quyết định thứ tự các bước, còn builder triển khai từng bước. Director không bắt buộc, vì client có thể tự gọi các bước, nhưng đây là nơi phù hợp để đặt các quy trình xây dựng muốn dùng lại. Director cũng che chi tiết xây dựng khỏi client: client chỉ cần gắn một builder với director, cho director bắt đầu xây dựng, rồi lấy kết quả từ builder.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Builder when:' },
        { type: 'list', items: [
          'you want to get rid of a telescoping constructor. With ten optional parameters you end up overloading several shorter constructors that pass default values to the main one, which is only possible in languages with method overloading, such as C# or Java. A builder lets you build the object step by step, using only the steps you need.',
          'your code must create different representations of a product, such as stone and wooden houses, whose construction follows similar steps that differ only in details. The builder interface defines all possible steps, concrete builders implement them for each representation, and a director controls the order.',
          'you need to build Composite trees or other complex objects. Steps can be deferred without breaking the final product, or called recursively to build a tree. Because a builder does not expose the unfinished product while the steps run, client code cannot fetch an incomplete result.',
        ] },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Builder khi:' },
        { type: 'list', items: [
          'bạn muốn loại bỏ "telescoping constructor". Với mười tham số tùy chọn, bạn phải nạp chồng nhiều hàm khởi tạo ngắn hơn, mỗi hàm truyền giá trị mặc định cho hàm khởi tạo chính, và điều này chỉ làm được trong các ngôn ngữ hỗ trợ nạp chồng phương thức như C# hoặc Java. Builder cho phép xây dựng đối tượng từng bước và chỉ dùng những bước thực sự cần.',
          'mã cần tạo nhiều biểu diễn khác nhau của một sản phẩm, chẳng hạn nhà đá và nhà gỗ, với quá trình xây dựng gồm các bước tương tự nhau, chỉ khác ở chi tiết. Giao diện builder định nghĩa mọi bước có thể có, các builder cụ thể triển khai các bước đó cho từng biểu diễn, còn director điều khiển thứ tự.',
          'bạn cần xây dựng cây Composite hoặc các đối tượng phức tạp khác. Có thể hoãn một số bước mà không làm hỏng sản phẩm cuối, hoặc gọi các bước đệ quy để dựng cây. Vì builder không để lộ sản phẩm dở dang khi đang chạy các bước, mã client không thể lấy về một kết quả chưa hoàn chỉnh.',
        ] },
      ],
    },
    vietnamese_example: {
      title: { en: 'Raising a village đình step by step', vi: 'Dựng đình làng từng bước' },
      description: {
        en: [
          { type: 'paragraph', text: 'A đình is a Vietnamese village communal house, used for village meetings and for worshipping the village\'s guardian spirit (thành hoàng). This example reduces its construction to five steps: lay the foundation, raise the wooden columns, put up the roof, add carvings and set up the altar. Real đình differ widely in size, layout and decoration.' },
          { type: 'paragraph', text: 'The HouseBuilder interface declares these steps. HouseDirector plays the master carpenter (thợ cả): it knows the step order for a simple đình and for a grand one, and it works with whatever builder it is given. The simple đình skips the carving step.' },
          { type: 'paragraph', text: 'CommunalHouseBuilder runs the steps to raise a CommunalHouse. BlueprintBuilder records the same steps as a Blueprint, a construction drawing. The two products are unrelated classes, so the client takes each result from the builder that made it, with getProduct(), not from the director.' },
          { type: 'paragraph', text: 'For a one-off building, the client can also call a builder\'s steps directly, without the director.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Đình là ngôi nhà chung của làng ở Việt Nam, nơi dân làng hội họp và thờ thành hoàng làng. Ví dụ này rút gọn việc dựng đình thành năm bước: đặt móng, dựng cột gỗ, lợp mái, chạm khắc và lập bàn thờ. Đình thật khác nhau nhiều về quy mô, bố cục và trang trí.' },
          { type: 'paragraph', text: 'Giao diện HouseBuilder khai báo các bước này. HouseDirector đóng vai thợ cả: lớp này nắm thứ tự các bước để dựng một ngôi đình đơn giản hoặc một ngôi đình bề thế, và làm việc với bất kỳ builder nào được giao. Đình đơn giản bỏ qua bước chạm khắc.' },
          { type: 'paragraph', text: 'CommunalHouseBuilder thực hiện các bước để dựng một CommunalHouse. BlueprintBuilder ghi lại cùng các bước đó thành một Blueprint, tức bản vẽ thi công. Hai sản phẩm thuộc hai lớp không liên quan, nên client lấy từng kết quả bằng getProduct() từ chính builder đã làm ra nó, không lấy từ director.' },
          { type: 'paragraph', text: 'Với công trình chỉ làm một lần, client cũng có thể tự gọi các bước của builder mà không cần director.' },
        ],
      },
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


# Concrete Builder 1: raises a real đình
class CommunalHouseBuilder(HouseBuilder):
    def __init__(self) -> None: self.reset()
    def reset(self) -> None: self._house = CommunalHouse()
    def build_foundation(self, material: str) -> None: self._house.parts.append(f"nền {material}")
    def build_columns(self, count: int) -> None: self._house.parts.append(f"{count} cột gỗ lim")
    def build_roof(self, style: str) -> None: self._house.parts.append(style)
    def add_carving(self, motif: str) -> None: self._house.parts.append(f"chạm {motif}")
    def setup_altar(self) -> None: self._house.parts.append("bàn thờ thành hoàng")

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
# 🏛️ Đình làng: nền đá ong, 16 cột gỗ lim, mái cong đầu đao, chạm rồng chầu, chạm phượng múa, bàn thờ thành hoàng
# 📜 Bản vẽ: móng đá ong | bố trí 16 cột | vẽ mái cong đầu đao | hoa văn rồng chầu | hoa văn phượng múa | hậu cung đặt bàn thờ
# 🏛️ Đình làng: nền đá xanh, 4 cột gỗ lim, mái ngói đơn, bàn thờ thành hoàng
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

// Concrete Builder 1: raises a real đình
class CommunalHouseBuilder implements HouseBuilder {
  private house = new CommunalHouse()

  reset() { this.house = new CommunalHouse() }
  buildFoundation(material: string) { this.house.parts.push(\`nền \${material}\`) }
  buildColumns(count: number) { this.house.parts.push(\`\${count} cột gỗ lim\`) }
  buildRoof(style: string) { this.house.parts.push(style) }
  addCarving(motif: string) { this.house.parts.push(\`chạm \${motif}\`) }
  setupAltar() { this.house.parts.push('bàn thờ thành hoàng') }

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
      en: [
        { type: 'paragraph', text: 'The Builder interface (HouseBuilder) declares the construction steps common to all builders. Concrete Builders (CommunalHouseBuilder, BlueprintBuilder) implement those steps in different ways and may produce products that share no common interface. That is why getProduct() is declared in each concrete builder rather than in the interface.' },
        { type: 'paragraph', text: 'Products (CommunalHouse, Blueprint) are the resulting objects. Products made by different builders do not have to belong to the same class hierarchy or interface.' },
        { type: 'paragraph', text: 'The Director (HouseDirector) defines the order in which the construction steps are called, so specific product configurations can be created and reused.' },
        { type: 'paragraph', text: 'The Client must associate a builder with the director. Usually this happens once, through the director\'s constructor, and the director then uses that builder for all further construction. The alternative, used here, is to pass a builder to each production method of the director, so each call can use a different builder.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Giao diện Builder (HouseBuilder) khai báo các bước xây dựng chung cho mọi builder. Concrete Builder (CommunalHouseBuilder, BlueprintBuilder) triển khai các bước đó theo những cách khác nhau và có thể tạo ra sản phẩm không có giao diện chung. Vì vậy getProduct() được khai báo trong từng builder cụ thể chứ không nằm trong giao diện.' },
        { type: 'paragraph', text: 'Product (CommunalHouse, Blueprint) là các đối tượng kết quả. Sản phẩm do các builder khác nhau tạo ra không cần thuộc cùng một cây kế thừa hay giao diện.' },
        { type: 'paragraph', text: 'Director (HouseDirector) quyết định thứ tự gọi các bước xây dựng, nhờ đó có thể tạo và dùng lại những cấu hình sản phẩm cụ thể.' },
        { type: 'paragraph', text: 'Client phải gắn một builder với director. Thông thường việc này chỉ làm một lần, qua hàm khởi tạo của director, sau đó director dùng builder đó cho mọi lần xây dựng tiếp theo. Cách còn lại, được dùng ở đây, là truyền builder vào từng phương thức xây dựng của director, để mỗi lần gọi có thể dùng một builder khác.' },
      ],
    },
  },

  {
    id: 'prototype',
    slug: 'prototype',
    name: { en: 'Prototype', vi: 'Nguyên mẫu' },
    category: 'creational',
    complexity: 1,
    popularity: 2,
    also_known_as: [{ en: 'Clone', vi: 'Nhân bản' }],
    intent: {
      en: 'Prototype is a creational design pattern that lets you copy existing objects without making your code dependent on their classes.',
      vi: 'Prototype là một mẫu thiết kế khởi tạo, cho phép sao chép các đối tượng có sẵn mà không làm mã phụ thuộc vào lớp của chúng.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'Say you have an object and want an exact copy of it. The direct approach is to create a new object of the same class, then go through every field of the original and copy its value.' },
        { type: 'paragraph', text: 'Not every object can be copied that way, because some fields may be private and invisible from outside the object. The direct approach also requires you to know the object\'s class, so your code depends on that class. Sometimes you know only the interface an object follows, not its concrete class; for example, a method parameter may accept any object that implements some interface.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Giả sử bạn có một đối tượng và muốn tạo một bản sao y hệt. Cách trực tiếp là tạo một đối tượng mới cùng lớp, rồi duyệt qua mọi trường của đối tượng gốc và chép giá trị sang.' },
        { type: 'paragraph', text: 'Không phải đối tượng nào cũng chép được theo cách đó, vì một số trường có thể là riêng tư và không nhìn thấy được từ bên ngoài. Cách trực tiếp còn buộc bạn phải biết lớp của đối tượng, nên mã bị phụ thuộc vào lớp đó. Đôi khi bạn chỉ biết giao diện mà đối tượng tuân theo chứ không biết lớp cụ thể; ví dụ, một tham số của phương thức có thể nhận bất kỳ đối tượng nào triển khai một giao diện nào đó.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Prototype delegates cloning to the objects being cloned. The pattern declares a common interface for all objects that support cloning, usually with a single clone() method, so you can clone an object without coupling your code to its class.' },
        { type: 'paragraph', text: 'The clone() method looks much the same in every class: it creates an object of the current class and carries over every field value of the old object. It can copy private fields too, because most languages let an object access the private fields of other objects of the same class.' },
        { type: 'paragraph', text: 'An object that supports cloning is called a prototype. When objects have dozens of fields and hundreds of possible configurations, cloning can replace subclassing. You prepare a set of objects configured in different ways, and when you need an object like one of them, you clone that prototype instead of building a new object from scratch.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Prototype giao việc nhân bản cho chính các đối tượng được nhân bản. Mẫu này khai báo một giao diện chung cho mọi đối tượng hỗ trợ nhân bản, thường chỉ có một phương thức clone(), nhờ đó bạn nhân bản được một đối tượng mà mã không bị gắn chặt với lớp của nó.' },
        { type: 'paragraph', text: 'Phương thức clone() ở các lớp gần như giống nhau: nó tạo một đối tượng của lớp hiện tại và chép mọi giá trị trường của đối tượng cũ sang. Nó chép được cả trường riêng tư, vì phần lớn ngôn ngữ cho phép một đối tượng truy cập trường riêng tư của đối tượng khác cùng lớp.' },
        { type: 'paragraph', text: 'Đối tượng hỗ trợ nhân bản được gọi là prototype (nguyên mẫu). Khi đối tượng có hàng chục trường và hàng trăm cấu hình có thể, nhân bản có thể thay cho việc tạo lớp con. Bạn chuẩn bị sẵn một tập đối tượng được cấu hình theo nhiều cách, và khi cần một đối tượng giống một trong số đó, bạn nhân bản nguyên mẫu ấy thay vì dựng đối tượng mới từ đầu.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Prototype when:' },
        { type: 'list', items: [
          'your code should not depend on the concrete classes of the objects you need to copy. This often happens when third-party code passes you objects through some interface: their concrete classes are unknown, and you could not depend on them even if you wanted to. Prototype gives client code one interface for every object that supports cloning.',
          'you want to reduce the number of subclasses that differ only in how they initialize their objects. If a complex class needs careful configuration and a few common configurations are repeated across the app, a subclass for each one removes the duplication but adds many near-empty classes. With Prototype, you keep a set of pre-configured objects, and the client finds the right one and clones it.',
        ] },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Prototype khi:' },
        { type: 'list', items: [
          'mã không nên phụ thuộc vào lớp cụ thể của các đối tượng cần sao chép. Điều này hay gặp khi mã bên thứ ba truyền đối tượng cho bạn qua một giao diện nào đó: lớp cụ thể của chúng không được biết, và dù muốn bạn cũng không thể phụ thuộc vào chúng. Prototype cho mã client một giao diện chung cho mọi đối tượng hỗ trợ nhân bản.',
          'bạn muốn giảm số lớp con chỉ khác nhau ở cách khởi tạo đối tượng. Nếu một lớp phức tạp cần cấu hình công phu và vài cấu hình phổ biến lặp lại khắp ứng dụng, tạo một lớp con cho mỗi cấu hình sẽ hết trùng lặp nhưng sinh ra nhiều lớp gần như rỗng. Với Prototype, bạn giữ sẵn một tập đối tượng đã cấu hình, và client chỉ cần tìm đúng đối tượng rồi nhân bản nó.',
        ] },
      ],
    },
    vietnamese_example: {
      title: { en: 'Copying Đông Hồ master prints', vi: 'Nhân bản tranh mẫu Đông Hồ' },
      description: {
        en: [
          { type: 'paragraph', text: 'Đông Hồ prints (tranh Đông Hồ) are folk woodblock prints from Đông Hồ village in Bắc Ninh province. They are printed from carved woodblocks onto giấy điệp, dó paper coated with powdered seashell, so a design can be printed many times without being redrawn.' },
          { type: 'paragraph', text: 'This example simplifies the workshop. It keeps one finished master print of each design, and each new order is a copy of that master. A copy can then get an extra colour without changing the master.' },
          { type: 'paragraph', text: 'DongHoPainting is the Prototype. It holds the title, the list of colours and a private paper field, and it declares clone(). RoosterPainting, a rooster print with the caption Đại cát, and MouseWeddingPainting, the mouse wedding print (đám cưới chuột), are Concrete Prototypes. Each clone() calls its own class\'s copy constructor, which lets the parent copy its fields first, including the private one, and then copies the subclass\'s own field.' },
          { type: 'paragraph', text: 'The shelf of master prints, MasterPrintRegistry, is the Prototype Registry. The client asks for "ga" or "chuot" and gets a fresh copy without knowing its class. Each copy can be coloured differently because the colour list is copied, not shared.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Tranh Đông Hồ là tranh khắc gỗ dân gian của làng Đông Hồ, tỉnh Bắc Ninh. Tranh được in từ các bản khắc gỗ lên giấy điệp (giấy dó quét bột vỏ điệp), nên một mẫu có thể in nhiều lần mà không phải vẽ lại.' },
          { type: 'paragraph', text: 'Ví dụ này đơn giản hóa xưởng tranh. Xưởng giữ một tờ tranh mẫu hoàn chỉnh cho mỗi mẫu, và mỗi đơn hàng mới là một bản sao của tờ mẫu đó. Sau đó bản sao có thể được thêm màu mà không làm đổi tờ mẫu.' },
          { type: 'paragraph', text: 'DongHoPainting là Prototype: lớp này giữ tên tranh, danh sách màu và một trường riêng tư về loại giấy, đồng thời khai báo clone(). RoosterPainting (tranh gà trống có chữ Đại cát) và MouseWeddingPainting (tranh đám cưới chuột) là các Concrete Prototype. Mỗi clone() gọi hàm khởi tạo sao chép của chính lớp đó; hàm này để lớp cha chép các trường của nó trước, kể cả trường riêng tư, rồi mới chép trường riêng của lớp con.' },
          { type: 'paragraph', text: 'Kệ tranh mẫu, MasterPrintRegistry, là Prototype Registry. Client xin "ga" hoặc "chuot" và nhận về một bản sao mới mà không cần biết lớp của nó. Mỗi bản sao có thể tô màu khác nhau vì danh sách màu được chép ra chứ không dùng chung.' },
        ],
      },
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


# Prototype Registry: a name -> prototype map of master prints
class MasterPrintRegistry:
    def __init__(self) -> None:
        self._items: dict[str, DongHoPainting] = {}

    def add(self, key: str, prototype: DongHoPainting) -> None:
        self._items[key] = prototype

    def get(self, key: str) -> DongHoPainting:
        return self._items[key].clone()


# Client: configure the prototypes once
rooster = RoosterPainting()
rooster.title, rooster.colors, rooster.caption = "Gà trống", ["đỏ son"], "Đại cát"
mouse = MouseWeddingPainting()
mouse.title, mouse.colors, mouse.mouse_count = "Đám cưới chuột", ["vàng nghệ", "đen than"], 12

registry = MasterPrintRegistry()
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
# 🐓 Gà trống [đỏ son] trên giấy điệp | chữ: Đại cát
# 🐓 Gà trống [đỏ son, xanh lam] trên giấy điệp | chữ: Đại cát
# 🐭 Đám cưới chuột [vàng nghệ, đen than] trên giấy điệp | 12 con chuột
# Bản gốc: 🐓 Gà trống [đỏ son] trên giấy điệp | chữ: Đại cát
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

// Prototype Registry: a name -> prototype map of master prints
class MasterPrintRegistry {
  private items = new Map<string, DongHoPainting>()

  add(key: string, prototype: DongHoPainting) { this.items.set(key, prototype) }

  get(key: string): DongHoPainting {
    const prototype = this.items.get(key)
    if (!prototype) throw new Error('Không có tranh mẫu: ' + key)
    return prototype.clone()
  }
}

// Client: configure the prototypes once
const rooster = new RoosterPainting()
rooster.title = 'Gà trống'
rooster.colors = ['đỏ son']
rooster.caption = 'Đại cát'
const mouse = new MouseWeddingPainting()
mouse.title = 'Đám cưới chuột'
mouse.colors = ['vàng nghệ', 'đen than']
mouse.mouseCount = 12

const registry = new MasterPrintRegistry()
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
      en: [
        { type: 'paragraph', text: 'The Prototype (DongHoPainting) declares the cloning methods; in most cases there is a single clone(). Here it is an abstract base class, so it also holds the shared fields and the prototype constructor that copies them, including the private paper field that only the class itself can see.' },
        { type: 'paragraph', text: 'Concrete Prototypes (RoosterPainting, MouseWeddingPainting) implement clone() by calling their own prototype constructor, which first lets the parent copy its fields and then copies the subclass\'s own field. Besides copying data, a clone method may handle edge cases such as cloning linked objects or untangling recursive dependencies. Here it copies the colour list, so a clone never shares that list with the original.' },
        { type: 'paragraph', text: 'The Client can copy any object that follows the prototype interface. The Prototype Registry (MasterPrintRegistry) gives easy access to frequently used prototypes by storing pre-built objects that are ready to be copied. The simplest registry is a name → prototype map, as here; if you need better search criteria than a name, you can build a more elaborate one.' },
        { type: 'paragraph', text: 'A subclass of a concrete prototype would clone the same way, by letting its parent\'s copy constructor run first. The diagram leaves that level out because RoosterPainting and MouseWeddingPainting already show the chained copying.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Prototype (DongHoPainting) khai báo các phương thức nhân bản; trong hầu hết trường hợp chỉ có một phương thức clone(). Ở đây nó là một lớp cơ sở trừu tượng, nên còn giữ các trường dùng chung và hàm khởi tạo nguyên mẫu để chép các trường đó, kể cả trường riêng tư paper về loại giấy mà chỉ bản thân lớp mới thấy được.' },
        { type: 'paragraph', text: 'Concrete Prototype (RoosterPainting, MouseWeddingPainting) triển khai clone() bằng cách gọi hàm khởi tạo nguyên mẫu của chính lớp mình; hàm này để lớp cha chép các trường của nó trước rồi mới chép trường riêng của lớp con. Ngoài việc chép dữ liệu, phương thức clone còn có thể xử lý các trường hợp đặc biệt như nhân bản đối tượng liên kết hoặc gỡ phụ thuộc vòng. Ở đây nó chép danh sách màu, để bản sao không bao giờ dùng chung danh sách đó với bản gốc.' },
        { type: 'paragraph', text: 'Client có thể sao chép bất kỳ đối tượng nào tuân theo giao diện prototype. Prototype Registry (MasterPrintRegistry) giúp truy cập nhanh các nguyên mẫu hay dùng bằng cách lưu sẵn các đối tượng chờ được sao chép. Registry đơn giản nhất là một bảng tên → nguyên mẫu, như ở đây; nếu cần tiêu chí tìm kiếm tốt hơn tên gọi, bạn có thể xây một registry phức tạp hơn.' },
        { type: 'paragraph', text: 'Một lớp con của concrete prototype cũng nhân bản theo cách đó, bằng cách để hàm khởi tạo sao chép của lớp cha chạy trước. Sơ đồ bỏ qua tầng này vì RoosterPainting và MouseWeddingPainting đã cho thấy cách sao chép nối tiếp qua lớp cha.' },
      ],
    },
  },

  {
    id: 'singleton',
    slug: 'singleton',
    name: { en: 'Singleton', vi: 'Đơn thể' },
    category: 'creational',
    complexity: 1,
    popularity: 2,
    intent: {
      en: 'Singleton is a creational design pattern that ensures a class has only one instance and provides a global access point to that instance.',
      vi: 'Singleton là một mẫu thiết kế khởi tạo, đảm bảo một lớp chỉ có đúng một thể hiện và cung cấp một điểm truy cập toàn cục tới thể hiện đó.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'Singleton solves two problems at once, which violates the Single Responsibility Principle.' },
        { type: 'paragraph', text: 'First, it ensures that a class has only one instance. The usual reason is to control access to a shared resource, such as a database or a file: if you create an object and later ask for a new one, you get the one you already created. A regular constructor cannot do this, because a constructor call always returns a new object.' },
        { type: 'paragraph', text: 'Second, it provides a global access point to that instance. Global variables that hold essential objects are convenient but unsafe, because any code can overwrite them and break the app. Singleton lets you reach the object from anywhere, like a global variable, while protecting the instance from being overwritten. It also keeps the code that enforces the single instance in one class instead of scattered across the program.' },
        { type: 'paragraph', text: 'The pattern is so widespread that people often call something a singleton even when it solves only one of these problems.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Singleton giải quyết cùng lúc hai vấn đề, và vì thế vi phạm Nguyên tắc đơn trách nhiệm (Single Responsibility Principle).' },
        { type: 'paragraph', text: 'Thứ nhất, mẫu này đảm bảo một lớp chỉ có đúng một thể hiện. Lý do thường gặp là để kiểm soát truy cập tới một tài nguyên dùng chung, như cơ sở dữ liệu hay một tệp: nếu bạn đã tạo một đối tượng rồi sau đó xin một đối tượng mới, bạn sẽ nhận lại chính đối tượng đã tạo. Hàm khởi tạo thông thường không làm được điều này, vì mỗi lời gọi hàm khởi tạo luôn trả về một đối tượng mới.' },
        { type: 'paragraph', text: 'Thứ hai, mẫu này cung cấp một điểm truy cập toàn cục tới thể hiện đó. Biến toàn cục chứa các đối tượng quan trọng tuy tiện nhưng không an toàn, vì đoạn mã nào cũng có thể ghi đè lên chúng và làm hỏng ứng dụng. Singleton cho phép truy cập đối tượng từ bất cứ đâu như biến toàn cục, nhưng bảo vệ thể hiện đó khỏi bị ghi đè. Mẫu này cũng gom phần mã đảm bảo chỉ có một thể hiện vào một lớp, thay vì để rải rác khắp chương trình.' },
        { type: 'paragraph', text: 'Mẫu này phổ biến đến mức người ta thường gọi một thứ là singleton ngay cả khi nó chỉ giải quyết một trong hai vấn đề trên.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'All implementations of Singleton share two steps. Make the default constructor private, so other objects cannot use the new operator with the Singleton class. Then add a static creation method that acts as a constructor: it calls the private constructor once, stores the object in a static field and returns that cached object on every later call.' },
        { type: 'paragraph', text: 'Any code with access to the Singleton class can call this static method and always gets the same object. In a multithreaded program, the creation method needs care so that two threads do not create the instance at the same time. A common fix is double-checked locking: take a lock, then check the field again once the lock is held.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Mọi cách triển khai Singleton đều có chung hai bước. Đặt hàm khởi tạo mặc định ở chế độ riêng tư, để đối tượng khác không thể dùng toán tử new với lớp Singleton. Sau đó thêm một phương thức tạo tĩnh đóng vai trò hàm khởi tạo: phương thức này gọi hàm khởi tạo riêng tư một lần, lưu đối tượng vào một trường tĩnh và trả về đối tượng đã lưu ở mọi lần gọi sau.' },
        { type: 'paragraph', text: 'Đoạn mã nào truy cập được lớp Singleton cũng gọi được phương thức tĩnh này và luôn nhận về cùng một đối tượng. Trong chương trình đa luồng, phương thức tạo cần được viết cẩn thận để hai luồng không cùng lúc tạo ra thể hiện. Cách làm phổ biến là double-checked locking: lấy khóa (lock), rồi kiểm tra lại trường đó một lần nữa sau khi đã giữ khóa.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Singleton when:' },
        { type: 'list', items: [
          'a class should have only one instance shared by all clients, such as a single database object used by different parts of the program. The pattern disables every way to create objects of the class except the creation method, which either creates the object or returns the existing one.',
          'you need stricter control over global variables. Unlike a global variable, a Singleton guarantees that there is only one instance, and nothing except the Singleton class itself can replace the cached instance.',
        ] },
        { type: 'paragraph', text: 'You can relax this limit later and allow more instances; only the body of getInstance() needs to change.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Singleton khi:' },
        { type: 'list', items: [
          'một lớp chỉ nên có một thể hiện dùng chung cho mọi client, ví dụ một đối tượng cơ sở dữ liệu được nhiều phần của chương trình dùng chung. Mẫu này chặn mọi cách tạo đối tượng của lớp, trừ phương thức tạo; phương thức này hoặc tạo đối tượng, hoặc trả về đối tượng đã có.',
          'bạn cần kiểm soát biến toàn cục chặt chẽ hơn. Khác với biến toàn cục, Singleton đảm bảo chỉ có đúng một thể hiện, và ngoài chính lớp Singleton, không gì có thể thay thế thể hiện đã lưu.',
        ] },
        { type: 'paragraph', text: 'Về sau bạn có thể nới giới hạn này và cho phép nhiều thể hiện hơn; chỉ cần sửa phần thân của getInstance().' },
      ],
    },
    vietnamese_example: {
      title: { en: 'The royal court of Văn Lang', vi: 'Triều đình Văn Lang' },
      description: {
        en: [
          { type: 'paragraph', text: 'Văn Lang is the state that Vietnamese legend and traditional histories place under the Hùng kings, at the start of Vietnamese history. Little is known for certain about how it was governed, so this example treats it as a simple story: one kingdom, one royal court. The army (quân), the people (dân) and the officials (quan) all deal with that same court.' },
          { type: 'paragraph', text: 'RoyalCourt is the Singleton. Its constructor is private, and the only way in is RoyalCourt.getInstance(). The first call creates the court and prints the "Lập triều đình" line once; every later call returns the cached object.' },
          { type: 'paragraph', text: 'Its business method, issueDecree(), numbers each decree. Because every caller shares the one court, the numbering continues from one caller to the next. The Python version also starts eight threads at once and shows that they still get a single court, thanks to the lock and the second check inside get_instance().' },
        ],
        vi: [
          { type: 'paragraph', text: 'Theo truyền thuyết và sử cũ, Văn Lang là nhà nước do các vua Hùng đứng đầu, ở buổi đầu lịch sử Việt Nam. Ngày nay chưa biết chắc nhà nước này được tổ chức ra sao, nên ví dụ chỉ coi đây là một câu chuyện đơn giản: một nước, một triều đình. Quân, dân và quan đều làm việc với cùng một triều đình ấy.' },
          { type: 'paragraph', text: 'RoyalCourt là Singleton. Hàm khởi tạo của lớp này là riêng tư, và cách duy nhất để tiếp cận là RoyalCourt.getInstance(). Lần gọi đầu tiên tạo triều đình và in dòng "Lập triều đình" đúng một lần; mọi lần gọi sau trả về đối tượng đã lưu.' },
          { type: 'paragraph', text: 'Phương thức nghiệp vụ issueDecree() đánh số từng tờ chiếu. Vì mọi nơi gọi dùng chung một triều đình, số thứ tự nối tiếp từ nơi gọi này sang nơi gọi khác. Bản Python còn khởi chạy cùng lúc tám luồng và cho thấy chúng vẫn chỉ nhận được một triều đình, nhờ khóa và lần kiểm tra thứ hai trong get_instance().' },
        ],
      },
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
for recipient, order in [("quân", "giữ yên bờ cõi"), ("dân", "mở hội làng"), ("quan", "đắp đê trị thủy")]:
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
# 📜 Chiếu số 1 của Hùng Vương gửi quân: giữ yên bờ cõi
# 📜 Chiếu số 2 của Hùng Vương gửi dân: mở hội làng
# 📜 Chiếu số 3 của Hùng Vương gửi quan: đắp đê trị thủy
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
  ['quân', 'giữ yên bờ cõi'],
  ['dân', 'mở hội làng'],
  ['quan', 'đắp đê trị thủy'],
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
      en: [
        { type: 'paragraph', text: 'The Singleton class (RoyalCourt) declares the static method getInstance(), which returns the same instance of its own class, kept in a private static field.' },
        { type: 'paragraph', text: 'The Singleton\'s constructor should be hidden from client code, so calling getInstance() is the only way to get the Singleton object. TypeScript enforces this with a private constructor. Python has no private constructors, so the Python example makes __init__ reject any caller that does not pass the class\'s private token.' },
        { type: 'paragraph', text: 'Business logic, such as issueDecree(), runs on that one instance. The diagram draws the client as three callers (Quân, Dân, Quan) to show that they all receive the same object.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Lớp Singleton (RoyalCourt) khai báo phương thức tĩnh getInstance(), trả về cùng một thể hiện của chính lớp đó, được lưu trong một trường tĩnh riêng tư.' },
        { type: 'paragraph', text: 'Hàm khởi tạo của Singleton cần được ẩn khỏi mã client, để gọi getInstance() là cách duy nhất lấy được đối tượng Singleton. TypeScript đảm bảo điều này bằng hàm khởi tạo private. Python không có hàm khởi tạo riêng tư, nên ví dụ Python cho __init__ từ chối mọi nơi gọi không truyền vào token riêng của lớp.' },
        { type: 'paragraph', text: 'Logic nghiệp vụ, như issueDecree(), chạy trên thể hiện duy nhất đó. Sơ đồ vẽ client thành ba nơi gọi (Quân, Dân, Quan) để cho thấy tất cả đều nhận về cùng một đối tượng.' },
      ],
    },
  },
]
