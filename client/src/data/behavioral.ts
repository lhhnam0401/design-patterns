import type { Pattern } from '../types/pattern'

export const behavioralPatterns: Omit<Pattern, 'diagram'>[] = [
  {
    id: 'chain-of-responsibility',
    slug: 'chain-of-responsibility',
    name: { en: 'Chain of Responsibility', vi: 'Chuỗi trách nhiệm' },
    category: 'behavioral',
    complexity: 2,
    popularity: 2,
    also_known_as: [
      { en: 'CoR', vi: 'CoR' },
      { en: 'Chain of Command', vi: 'Chuỗi mệnh lệnh' },
    ],
    intent: {
      en: 'Chain of Responsibility is a behavioral design pattern that passes a request along a chain of handlers. Each handler decides whether to process the request, pass it to the next handler, or both.',
      vi: 'Chain of Responsibility là mẫu thiết kế hành vi, chuyển một yêu cầu dọc theo chuỗi các bộ xử lý (handler). Mỗi bộ xử lý tự quyết định xử lý yêu cầu, chuyển nó cho bộ xử lý kế tiếp, hoặc làm cả hai.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'An online ordering system lets only authenticated users create orders, and gives users with administrative permissions full access to every order. These checks must run in sequence: if authentication fails, no other check needs to run.' },
        { type: 'paragraph', text: 'Over the next months, more checks are added: validation that sanitizes request data, a filter that blocks repeated failed requests from one IP address to slow brute-force password guessing, and a cache lookup for repeated requests with the same data.' },
        { type: 'paragraph', text: 'The checking code grows with every feature. Changing one check can break another. Other components need only some of the checks, so reusing them means copying code. The system becomes hard to read and expensive to maintain.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Một hệ thống đặt hàng trực tuyến chỉ cho phép người dùng đã xác thực tạo đơn hàng, và cho người dùng có quyền quản trị truy cập mọi đơn hàng. Các bước kiểm tra này phải chạy tuần tự: nếu xác thực thất bại thì không cần chạy các bước còn lại.' },
        { type: 'paragraph', text: 'Qua các tháng sau, hệ thống có thêm nhiều bước kiểm tra: làm sạch dữ liệu của yêu cầu, chặn các yêu cầu thất bại lặp lại từ cùng một địa chỉ IP để làm chậm việc dò mật khẩu, và tra bộ nhớ đệm (cache) cho các yêu cầu lặp lại có cùng dữ liệu.' },
        { type: 'paragraph', text: 'Mã kiểm tra phình to theo từng tính năng. Sửa một bước có thể làm hỏng bước khác. Các thành phần khác chỉ cần một số bước, nên muốn dùng lại thì phải sao chép mã. Hệ thống trở nên khó đọc và tốn kém để bảo trì.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Turn each check into a stand-alone object called a handler. Each handler has one method that performs its check, and the request with its data is passed to that method as an argument.' },
        { type: 'paragraph', text: 'Link the handlers into a chain. Each handler stores a reference to the next one. After processing a request, a handler can pass it along, so the request travels down the chain until every handler has seen it. A handler can also stop the chain by not passing the request on.' },
        { type: 'paragraph', text: 'There are two common variants. In one, several handlers may act on the same request in turn. In the other, a handler first decides whether it can handle the request. If it can, it handles the request and stops, so at most one handler acts. GUI event propagation uses the second variant: a click travels from a button up through its containers and is handled by the first element that can handle it.' },
        { type: 'paragraph', text: 'All handlers implement the same interface. A handler only needs to know that the next handler has the method that handles requests, so chains can be assembled at runtime without coupling the client to concrete handler classes.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Biến mỗi bước kiểm tra thành một đối tượng độc lập gọi là bộ xử lý (handler). Mỗi bộ xử lý có một phương thức thực hiện bước kiểm tra của nó, và yêu cầu cùng dữ liệu được truyền vào phương thức đó dưới dạng tham số.' },
        { type: 'paragraph', text: 'Nối các bộ xử lý thành một chuỗi. Mỗi bộ xử lý lưu tham chiếu tới bộ xử lý kế tiếp. Sau khi xử lý, nó có thể chuyển yêu cầu đi tiếp, nên yêu cầu đi dọc chuỗi cho tới khi mọi bộ xử lý đều đã xem qua. Một bộ xử lý cũng có thể dừng chuỗi bằng cách không chuyển yêu cầu đi nữa.' },
        { type: 'paragraph', text: 'Có hai biến thể phổ biến. Ở biến thể thứ nhất, nhiều bộ xử lý lần lượt tác động lên cùng một yêu cầu. Ở biến thể thứ hai, bộ xử lý xét trước xem mình có xử lý được yêu cầu không. Nếu được, nó xử lý rồi dừng, nên tối đa một bộ xử lý hành động. Việc lan truyền sự kiện giao diện dùng biến thể thứ hai: một cú nhấp đi từ nút lên các phần tử chứa nó và được phần tử đầu tiên có thể xử lý đảm nhận.' },
        { type: 'paragraph', text: 'Mọi bộ xử lý cùng triển khai một giao diện. Mỗi bộ xử lý chỉ cần biết bộ xử lý kế tiếp có phương thức xử lý yêu cầu, nên có thể ghép chuỗi lúc chạy mà client không phụ thuộc vào các lớp bộ xử lý cụ thể.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Chain of Responsibility when:' },
        { type: 'list', items: [
          'the program must process different kinds of requests in different ways, and the exact types and order of requests are not known in advance;',
          'several handlers must run in a specific order, which you control by linking them in that order;',
          'the set of handlers and their order must change at runtime, for example through setters on the reference to the next handler.',
        ] },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Chain of Responsibility khi:' },
        { type: 'list', items: [
          'chương trình phải xử lý nhiều loại yêu cầu theo nhiều cách khác nhau, và chưa biết trước chính xác loại yêu cầu cũng như thứ tự của chúng;',
          'nhiều bộ xử lý phải chạy theo một thứ tự nhất định, thứ tự này do bạn quyết định khi nối chúng;',
          'tập bộ xử lý và thứ tự của chúng cần thay đổi lúc chạy, chẳng hạn qua setter của tham chiếu tới bộ xử lý kế tiếp.',
        ] },
      ],
    },
    vietnamese_example: {
      title: { en: 'Petitions in a fictional imperial court', vi: 'Đơn thỉnh cầu trong một triều đình hư cấu' },
      description: {
        en: [
          { type: 'paragraph', text: 'This is a fictional teaching analogy, not a record of how any historical administration worked. A villager\'s petition (Petition, the request) climbs a ladder of officials. Each petition has a level that says how much authority it takes to settle it, from 1 for a field-boundary quarrel to 4 for a war.' },
          { type: 'paragraph', text: 'Official is the Handler interface, with setSuperior() and handle(). BaseOfficial is the Base Handler: it stores the superior in superior and forwards the petition to him by default. The Concrete Handlers are VillageChief, DistrictMagistrate, Prefect and Emperor, which may settle petitions up to level 1, 2, 3 and 4. Each one either settles the petition or calls the base method to pass it up, so a petition stops at the lowest official with enough authority.' },
          { type: 'paragraph', text: 'Link order matters: if the Emperor stood first, he would settle every field quarrel himself. In this example at most one official handles each petition. The client builds the chain with setSuperior() and files petitions with filePetition(). A petition filed directly with the district is settled there, skipping the village chief. A request for rain, which no official can grant, reaches the end of the chain unresolved.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Đây là một phép so sánh hư cấu để minh họa, không mô tả cách vận hành của bất kỳ bộ máy hành chính lịch sử nào. Đơn thỉnh cầu của dân làng (Petition, tức yêu cầu) được chuyển dần lên các cấp quan. Mỗi đơn có một mức (level) cho biết cần quyền hạn tới đâu mới giải quyết được, từ 1 cho tranh chấp bờ ruộng tới 4 cho chiến tranh.' },
          { type: 'paragraph', text: 'Official là giao diện Handler, gồm setSuperior() và handle(). BaseOfficial là Base Handler: nó lưu quan cấp trên trong superior và mặc định chuyển đơn lên cho người đó. Các Concrete Handler là VillageChief, DistrictMagistrate, Prefect và Emperor, lần lượt được giải quyết đơn tới mức 1, 2, 3 và 4. Mỗi người hoặc tự giải quyết, hoặc gọi phương thức của lớp cơ sở để chuyển đơn lên, nên đơn dừng ở vị quan thấp nhất đủ quyền xử lý.' },
          { type: 'paragraph', text: 'Thứ tự mắt xích rất quan trọng: nếu Emperor đứng đầu chuỗi, ngài sẽ phải tự giải quyết mọi vụ tranh chấp bờ ruộng. Trong ví dụ này, mỗi đơn được tối đa một vị quan xử lý. Client dựng chuỗi bằng setSuperior() và nộp đơn qua filePetition(). Đơn nộp thẳng lên huyện được giải quyết ngay tại đó, không qua xã trưởng. Đơn xin mưa, việc không vị quan nào có quyền làm, đi tới cuối chuỗi mà không được giải quyết.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from typing import Optional


# The request: all of its data travels in one object.
# level: the authority it takes to settle it, from 1 (village) to 4 (throne)
class Petition:
    def __init__(self, level: int, content: str) -> None:
        self.level = level
        self.content = content


# Handler: the interface shared by every official
class Official(ABC):
    @abstractmethod
    def set_superior(self, superior: "Official") -> "Official": ...

    @abstractmethod
    def handle(self, petition: Petition) -> Optional[str]: ...


# Base Handler: stores the next link and forwards by default
class BaseOfficial(Official):
    def __init__(self) -> None:
        self._superior: Optional[Official] = None

    def set_superior(self, superior: Official) -> Official:
        self._superior = superior
        # Returning the next handler lets the client chain the calls
        return superior

    def handle(self, petition: Petition) -> Optional[str]:
        if self._superior is not None:
            return self._superior.handle(petition)
        return None  # end of the chain: nobody handled it


# Concrete Handlers: each one settles what lies within its authority
# and passes anything more serious up to the next official
class VillageChief(BaseOfficial):
    def handle(self, petition: Petition) -> Optional[str]:
        if petition.level <= 1:
            return f"Xã trưởng hòa giải: {petition.content}"
        return super().handle(petition)


class DistrictMagistrate(BaseOfficial):
    def handle(self, petition: Petition) -> Optional[str]:
        if petition.level <= 2:
            return f"Quan huyện xét xử: {petition.content}"
        return super().handle(petition)


class Prefect(BaseOfficial):
    def handle(self, petition: Petition) -> Optional[str]:
        if petition.level <= 3:
            return f"Tri phủ giải quyết: {petition.content}"
        return super().handle(petition)


class Emperor(BaseOfficial):
    def handle(self, petition: Petition) -> Optional[str]:
        if petition.level <= 4:
            return f"Hoàng đế 👑 ra chiếu: {petition.content}"
        return super().handle(petition)


# Client: can send a petition to any official in the chain
def file_petition(official: Official, petition: Petition) -> None:
    result = official.handle(petition)
    print(result if result else f"❌ Không quan nào đủ quyền xử: {petition.content}")


# Client: builds the chain Xã → Huyện → Phủ → Triều đình
village = VillageChief()
district = DistrictMagistrate()
village.set_superior(district).set_superior(Prefect()).set_superior(Emperor())

print("Dân nộp đơn ở xã:")
file_petition(village, Petition(1, "tranh chấp bờ ruộng"))
file_petition(village, Petition(2, "mất trộm trâu"))
file_petition(village, Petition(3, "đê sông Hồng sắp vỡ"))
file_petition(village, Petition(4, "giặc tràn qua biên giới"))
# Above every official: only Heaven can make it rain
file_petition(village, Petition(5, "xin trời làm mưa"))

# The request can enter at any link, not only the first one
print("Đơn nộp thẳng lên huyện:")
file_petition(district, Petition(1, "lấn đất làng bên"))

# Output:
# Dân nộp đơn ở xã:
# Xã trưởng hòa giải: tranh chấp bờ ruộng
# Quan huyện xét xử: mất trộm trâu
# Tri phủ giải quyết: đê sông Hồng sắp vỡ
# Hoàng đế 👑 ra chiếu: giặc tràn qua biên giới
# ❌ Không quan nào đủ quyền xử: xin trời làm mưa
# Đơn nộp thẳng lên huyện:
# Quan huyện xét xử: lấn đất làng bên`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// The request: all of its data travels in one object.
// level: the authority it takes to settle it, from 1 (village) to 4 (throne)
interface Petition {
  level: number
  content: string
}

// Handler: the interface shared by every official
interface Official {
  setSuperior(superior: Official): Official
  handle(petition: Petition): string | null
}

// Base Handler: stores the next link and forwards by default
abstract class BaseOfficial implements Official {
  private superior: Official | null = null

  setSuperior(superior: Official): Official {
    this.superior = superior
    // Returning the next handler lets the client chain the calls
    return superior
  }

  handle(petition: Petition): string | null {
    // End of the chain: nobody handled it
    return this.superior ? this.superior.handle(petition) : null
  }
}

// Concrete Handlers: each one settles what lies within its authority
// and passes anything more serious up to the next official
class VillageChief extends BaseOfficial {
  handle(petition: Petition): string | null {
    if (petition.level <= 1) return \`Xã trưởng hòa giải: \${petition.content}\`
    return super.handle(petition)
  }
}

class DistrictMagistrate extends BaseOfficial {
  handle(petition: Petition): string | null {
    if (petition.level <= 2) return \`Quan huyện xét xử: \${petition.content}\`
    return super.handle(petition)
  }
}

class Prefect extends BaseOfficial {
  handle(petition: Petition): string | null {
    if (petition.level <= 3) return \`Tri phủ giải quyết: \${petition.content}\`
    return super.handle(petition)
  }
}

class Emperor extends BaseOfficial {
  handle(petition: Petition): string | null {
    if (petition.level <= 4) return \`Hoàng đế 👑 ra chiếu: \${petition.content}\`
    return super.handle(petition)
  }
}

// Client: can send a petition to any official in the chain
function filePetition(official: Official, petition: Petition): void {
  console.log(official.handle(petition) ?? \`❌ Không quan nào đủ quyền xử: \${petition.content}\`)
}

// Client: builds the chain Xã → Huyện → Phủ → Triều đình
const village = new VillageChief()
const district = new DistrictMagistrate()
village.setSuperior(district).setSuperior(new Prefect()).setSuperior(new Emperor())

console.log('Dân nộp đơn ở xã:')
filePetition(village, { level: 1, content: 'tranh chấp bờ ruộng' })
filePetition(village, { level: 2, content: 'mất trộm trâu' })
filePetition(village, { level: 3, content: 'đê sông Hồng sắp vỡ' })
filePetition(village, { level: 4, content: 'giặc tràn qua biên giới' })
// Above every official: only Heaven can make it rain
filePetition(village, { level: 5, content: 'xin trời làm mưa' })

// The request can enter at any link, not only the first one
console.log('Đơn nộp thẳng lên huyện:')
filePetition(district, { level: 1, content: 'lấn đất làng bên' })`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'Handler declares the interface common to all concrete handlers. It usually has one method for handling requests, and sometimes a method for setting the next handler.' },
        { type: 'paragraph', text: 'Base Handler is an optional class for code shared by all handlers. It usually holds a reference to the next handler, set through the constructor or a setter on the previous handler, and a default handling method that passes the request on after checking that a next handler exists.' },
        { type: 'paragraph', text: 'Concrete Handlers contain the code that processes requests. On receiving a request, each decides whether to process it and whether to pass it along. Handlers are usually self-contained and immutable, taking all the data they need through the constructor.' },
        { type: 'paragraph', text: 'Client may assemble chains once or dynamically, and may send a request to any handler in the chain, not only the first. In the diagram, the link to the next handler is the superior field of BaseOfficial, not a separate arrow. Petition is not a role in the structure; it is the request object every handler receives.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Handler khai báo giao diện chung cho mọi bộ xử lý cụ thể. Thường nó có một phương thức xử lý yêu cầu, và đôi khi có thêm phương thức đặt bộ xử lý kế tiếp.' },
        { type: 'paragraph', text: 'Base Handler là lớp tùy chọn chứa mã dùng chung cho mọi bộ xử lý. Nó thường giữ tham chiếu tới bộ xử lý kế tiếp, được gán qua hàm khởi tạo hoặc setter của bộ xử lý đứng trước, và có phương thức xử lý mặc định chuyển yêu cầu đi tiếp sau khi kiểm tra bộ xử lý kế tiếp có tồn tại.' },
        { type: 'paragraph', text: 'Concrete Handler chứa mã xử lý yêu cầu. Khi nhận yêu cầu, mỗi bộ xử lý quyết định có xử lý không và có chuyển đi tiếp không. Bộ xử lý thường độc lập và bất biến, nhận mọi dữ liệu cần thiết qua hàm khởi tạo.' },
        { type: 'paragraph', text: 'Client có thể ghép chuỗi một lần hoặc linh động, và có thể gửi yêu cầu tới bất kỳ bộ xử lý nào trong chuỗi, không nhất thiết là bộ đầu tiên. Trong sơ đồ, liên kết tới bộ xử lý kế tiếp là trường superior của BaseOfficial, không phải một mũi tên riêng. Petition không phải một vai trò trong cấu trúc; nó là đối tượng yêu cầu mà mọi bộ xử lý nhận vào.' },
      ],
    },
  },

  {
    id: 'command',
    slug: 'command',
    name: { en: 'Command', vi: 'Lệnh' },
    category: 'behavioral',
    complexity: 2,
    popularity: 3,
    also_known_as: [
      { en: 'Action', vi: 'Hành động' },
      { en: 'Transaction', vi: 'Giao dịch' },
    ],
    intent: {
      en: 'Command is a behavioral design pattern that turns a request into a stand-alone object containing everything about the request. You can then pass requests as method arguments, delay or queue them, and undo them.',
      vi: 'Command là mẫu thiết kế hành vi, biến một yêu cầu thành một đối tượng độc lập chứa mọi thông tin về yêu cầu đó. Nhờ vậy có thể truyền yêu cầu làm tham số của phương thức, trì hoãn hoặc xếp hàng yêu cầu, và hoàn tác chúng.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'A text editor has a Button class used for the toolbar and for buttons in dialogs. The buttons look alike but do different things, so the first idea is a subclass for every place a button appears, each holding the code to run on click.' },
        { type: 'paragraph', text: 'Soon there are many subclasses, and each one can break when the base Button class changes. The interface code now depends on business logic that changes often.' },
        { type: 'paragraph', text: 'Some operations, such as copy and paste, must run from several places: a toolbar button, a context menu and Ctrl+C. The operation\'s code then has to be copied into many classes, or menus must depend on buttons, which is worse.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Một trình soạn thảo văn bản có lớp Button dùng cho thanh công cụ và các nút trong hộp thoại. Các nút trông giống nhau nhưng làm việc khác nhau, nên cách nghĩ đầu tiên là tạo một lớp con cho mỗi chỗ đặt nút, mỗi lớp chứa mã chạy khi nhấp.' },
        { type: 'paragraph', text: 'Chẳng bao lâu có rất nhiều lớp con, và lớp nào cũng có thể hỏng khi lớp Button cơ sở thay đổi. Mã giao diện giờ phụ thuộc vào logic nghiệp vụ vốn hay thay đổi.' },
        { type: 'paragraph', text: 'Một số thao tác như sao chép và dán phải chạy được từ nhiều nơi: nút trên thanh công cụ, menu ngữ cảnh và phím Ctrl+C. Khi đó hoặc phải chép mã của thao tác vào nhiều lớp, hoặc để menu phụ thuộc vào nút, và cách sau còn tệ hơn.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Good design separates concerns, often into an interface layer and a business logic layer. Normally an interface object calls a method on a business object directly. Command says the interface object should not send that request itself.' },
        { type: 'paragraph', text: 'Instead, move the request details (the target object, the method name and the arguments) into a separate command class with one method that triggers the request. The interface object no longer needs to know who receives the request or how it is processed. It just triggers the command.' },
        { type: 'paragraph', text: 'All commands implement the same interface, usually one execution method with no parameters. One sender can then work with many commands, and you can swap the command linked to a sender at runtime. Because the method takes no parameters, the command is configured with the request data in advance or fetches it itself.' },
        { type: 'paragraph', text: 'In the text editor, Button needs one field that references a command and executes it on click. A menu item, a shortcut and a button for the same operation share one command, so no code is duplicated.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Thiết kế tốt tách biệt các mối quan tâm, thường thành tầng giao diện và tầng nghiệp vụ. Thông thường đối tượng giao diện gọi thẳng một phương thức của đối tượng nghiệp vụ. Command đề xuất rằng đối tượng giao diện không nên tự gửi yêu cầu đó.' },
        { type: 'paragraph', text: 'Thay vào đó, hãy chuyển các chi tiết của yêu cầu (đối tượng đích, tên phương thức và tham số) vào một lớp command riêng, có một phương thức kích hoạt yêu cầu. Đối tượng giao diện không cần biết ai nhận yêu cầu hay yêu cầu được xử lý thế nào. Nó chỉ việc kích hoạt command.' },
        { type: 'paragraph', text: 'Mọi command triển khai cùng một giao diện, thường chỉ có một phương thức thực thi không nhận tham số. Nhờ đó một sender làm việc được với nhiều command, và có thể đổi command gắn với sender lúc chạy. Vì phương thức không nhận tham số, command phải được cấu hình sẵn dữ liệu của yêu cầu hoặc tự lấy dữ liệu đó.' },
        { type: 'paragraph', text: 'Trong trình soạn thảo, Button chỉ cần một trường tham chiếu tới command và thực thi nó khi được nhấp. Mục menu, phím tắt và nút cho cùng một thao tác dùng chung một command, nên không có mã bị lặp.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Command when you need to:' },
        { type: 'list', items: [
          'parameterize objects with operations, for example letting users choose what a context menu item does;',
          'queue operations, schedule them or run them remotely, since a command can be serialized, stored and restored later;',
          'support undo and redo by keeping a history of executed commands.',
        ] },
        { type: 'paragraph', text: 'Undo has two costs. Saving application state is hard when part of it is private, which Memento can help with. State backups can also use a lot of memory, so a command may perform the inverse operation instead, if one can be implemented.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Command khi cần:' },
        { type: 'list', items: [
          'tham số hóa đối tượng bằng thao tác, ví dụ cho người dùng chọn việc mà một mục menu ngữ cảnh thực hiện;',
          'xếp hàng thao tác, lên lịch hoặc chạy từ xa, vì command có thể được tuần tự hóa, lưu lại rồi khôi phục sau;',
          'hỗ trợ hoàn tác và làm lại bằng cách lưu lịch sử các command đã thực thi.',
        ] },
        { type: 'paragraph', text: 'Hoàn tác có hai cái giá. Lưu trạng thái ứng dụng khó khi một phần trạng thái là riêng tư, và Memento có thể giúp ở điểm này. Bản sao lưu trạng thái cũng có thể tốn nhiều bộ nhớ, nên command có thể thực hiện thao tác ngược thay thế, nếu triển khai được thao tác đó.' },
      ],
    },
    vietnamese_example: {
      title: { en: 'Royal decrees', vi: 'Chiếu chỉ của triều đình' },
      description: {
        en: [
          { type: 'paragraph', text: 'In this teaching example, the Emperor\'s decrees are command objects. Decree is the Command interface, with execute() and undo(). BuildCitadelCommand and CutTaxCommand are Concrete Commands. Each stores its receiver, City, and its parameters, such as the tax cut in percent, in fields set by the constructor. Each forwards the call to buildCitadel(), demolishCitadel(), cutTax() or raiseTax() on the city.' },
          { type: 'paragraph', text: 'City is the Receiver and does the real work. RoyalSecretary is the Sender. It receives finished decrees, queues them until proclamation day, executes them with proclaim() and records each one in a history, so revoke() can undo the latest decree. The secretary knows only the Decree interface and never writes a decree.' },
          { type: 'paragraph', text: 'The client code plays the Emperor: it creates the city, writes the decrees and hands them to the secretary. Undo here uses the inverse operation (demolish the citadel, raise the tax back) instead of a state backup.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Trong ví dụ minh họa này, chiếu chỉ của Hoàng đế là các đối tượng command. Decree là giao diện Command, gồm execute() và undo(). BuildCitadelCommand và CutTaxCommand là các Concrete Command. Mỗi chiếu lưu receiver của nó là City cùng các tham số, chẳng hạn số phần trăm thuế được giảm, trong các trường gán qua hàm khởi tạo. Mỗi chiếu chuyển lời gọi tới buildCitadel(), demolishCitadel(), cutTax() hoặc raiseTax() của thành.' },
          { type: 'paragraph', text: 'City là Receiver và làm công việc thực sự. RoyalSecretary là Sender. Viên thư ký nhận các chiếu đã soạn, giữ chúng trong hàng chờ tới ngày ban bố, thực thi bằng proclaim() và ghi từng chiếu vào sổ lịch sử, nên revoke() có thể hoàn tác chiếu gần nhất. Thư ký chỉ biết giao diện Decree và không bao giờ tự soạn chiếu.' },
          { type: 'paragraph', text: 'Mã client đóng vai Hoàng đế: tạo thành, soạn chiếu rồi giao cho thư ký. Ở đây hoàn tác dùng thao tác ngược (dỡ thành, tăng thuế trở lại) thay vì sao lưu trạng thái.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from typing import List


# Receiver: the city holds the real business logic
class City:
    def __init__(self, name: str) -> None:
        self.name = name
        self.citadel_count = 0
        self.tax = 30

    def build_citadel(self) -> None:
        self.citadel_count += 1
        print(f"🏰 {self.name}: xây thành, có {self.citadel_count} tòa")

    def demolish_citadel(self) -> None:
        self.citadel_count -= 1
        print(f"💥 {self.name}: dỡ thành, còn {self.citadel_count} tòa")

    def cut_tax(self, percent: int) -> None:
        self.tax -= percent
        print(f"💰 {self.name}: giảm thuế {percent}%, còn {self.tax}%")

    def raise_tax(self, percent: int) -> None:
        self.tax += percent
        print(f"💰 {self.name}: tăng thuế {percent}%, lên {self.tax}%")


# Command: the interface every decree follows
class Decree(ABC):
    @abstractmethod
    def execute(self) -> None: ...

    @abstractmethod
    def undo(self) -> None: ...


# Concrete Commands: store the receiver and the parameters,
# then pass the call on to the receiver
class BuildCitadelCommand(Decree):
    def __init__(self, city: City) -> None:
        self._city = city

    def execute(self) -> None:
        self._city.build_citadel()

    def undo(self) -> None:
        self._city.demolish_citadel()


class CutTaxCommand(Decree):
    def __init__(self, city: City, percent: int) -> None:
        self._city = city
        self._percent = percent

    def execute(self) -> None:
        self._city.cut_tax(self._percent)

    def undo(self) -> None:
        self._city.raise_tax(self._percent)


# Sender (Invoker): queues and triggers decrees, keeps a history for undo.
# It never creates decrees and only knows the Decree interface.
class RoyalSecretary:
    def __init__(self) -> None:
        self._pending_queue: List[Decree] = []
        self._history: List[Decree] = []

    def receive_decree(self, decree: Decree) -> None:
        self._pending_queue.append(decree)

    def proclaim(self) -> None:
        print(f"📜 Ban bố {len(self._pending_queue)} chiếu chỉ")
        while self._pending_queue:
            decree = self._pending_queue.pop(0)
            decree.execute()
            self._history.append(decree)

    def revoke(self) -> None:
        if self._history:
            print("↩️ Thu hồi chiếu chỉ gần nhất")
            self._history.pop().undo()


# Client (the Emperor): creates the receiver and the decrees,
# then hands the decrees to the sender
capital = City("Thăng Long")
secretary = RoyalSecretary()
secretary.receive_decree(BuildCitadelCommand(capital))
secretary.receive_decree(CutTaxCommand(capital, 10))
secretary.receive_decree(CutTaxCommand(capital, 5))
print("Chiếu chỉ đã soạn, chờ ngày ban bố")  # nothing has run yet

secretary.proclaim()
secretary.revoke()
secretary.revoke()

# Output:
# Chiếu chỉ đã soạn, chờ ngày ban bố
# 📜 Ban bố 3 chiếu chỉ
# 🏰 Thăng Long: xây thành, có 1 tòa
# 💰 Thăng Long: giảm thuế 10%, còn 20%
# 💰 Thăng Long: giảm thuế 5%, còn 15%
# ↩️ Thu hồi chiếu chỉ gần nhất
# 💰 Thăng Long: tăng thuế 5%, lên 20%
# ↩️ Thu hồi chiếu chỉ gần nhất
# 💰 Thăng Long: tăng thuế 10%, lên 30%`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Receiver: the city holds the real business logic
class City {
  citadelCount = 0
  tax = 30

  constructor(public readonly name: string) {}

  buildCitadel(): void {
    this.citadelCount += 1
    console.log(\`🏰 \${this.name}: xây thành, có \${this.citadelCount} tòa\`)
  }

  demolishCitadel(): void {
    this.citadelCount -= 1
    console.log(\`💥 \${this.name}: dỡ thành, còn \${this.citadelCount} tòa\`)
  }

  cutTax(percent: number): void {
    this.tax -= percent
    console.log(\`💰 \${this.name}: giảm thuế \${percent}%, còn \${this.tax}%\`)
  }

  raiseTax(percent: number): void {
    this.tax += percent
    console.log(\`💰 \${this.name}: tăng thuế \${percent}%, lên \${this.tax}%\`)
  }
}

// Command: the interface every decree follows
interface Decree {
  execute(): void
  undo(): void
}

// Concrete Commands: store the receiver and the parameters,
// then pass the call on to the receiver
class BuildCitadelCommand implements Decree {
  constructor(private readonly city: City) {}
  execute(): void { this.city.buildCitadel() }
  undo(): void { this.city.demolishCitadel() }
}

class CutTaxCommand implements Decree {
  constructor(private readonly city: City, private readonly percent: number) {}
  execute(): void { this.city.cutTax(this.percent) }
  undo(): void { this.city.raiseTax(this.percent) }
}

// Sender (Invoker): queues and triggers decrees, keeps a history for undo.
// It never creates decrees and only knows the Decree interface.
class RoyalSecretary {
  private pendingQueue: Decree[] = []
  private history: Decree[] = []

  receiveDecree(decree: Decree): void {
    this.pendingQueue.push(decree)
  }

  proclaim(): void {
    console.log(\`📜 Ban bố \${this.pendingQueue.length} chiếu chỉ\`)
    let decree: Decree | undefined
    while ((decree = this.pendingQueue.shift()) !== undefined) {
      decree.execute()
      this.history.push(decree)
    }
  }

  revoke(): void {
    const decree = this.history.pop()
    if (decree === undefined) return
    console.log('↩️ Thu hồi chiếu chỉ gần nhất')
    decree.undo()
  }
}

// Client (the Emperor): creates the receiver and the decrees,
// then hands the decrees to the sender
const capital = new City('Thăng Long')
const secretary = new RoyalSecretary()
secretary.receiveDecree(new BuildCitadelCommand(capital))
secretary.receiveDecree(new CutTaxCommand(capital, 10))
secretary.receiveDecree(new CutTaxCommand(capital, 5))
console.log('Chiếu chỉ đã soạn, chờ ngày ban bố') // nothing has run yet

secretary.proclaim()
secretary.revoke()
secretary.revoke()`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'Sender (also called Invoker) starts requests. It holds a reference to a command and triggers it instead of calling the receiver directly. The sender does not create the command; it usually receives one from the client through the constructor.' },
        { type: 'paragraph', text: 'Command usually declares one method for executing the command. Concrete Commands implement different kinds of requests. A concrete command normally passes the call to a business object rather than doing the work itself, though the two can be merged to simplify code. The parameters for the receiver\'s method can be fields of the command, set only in the constructor to keep the command immutable.' },
        { type: 'paragraph', text: 'Receiver contains business logic, and almost any object can be one. Client creates and configures concrete commands, passing every request parameter, including the receiver, to the constructor. The command can then be linked to one or more senders.' },
        { type: 'paragraph', text: 'In this example, Command also declares undo(), and the sender keeps a queue and a history. These support queuing and undo; they are not part of the minimal structure.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Sender (còn gọi là Invoker) khởi phát yêu cầu. Nó giữ tham chiếu tới một command và kích hoạt command đó thay vì gọi thẳng receiver. Sender không tạo command; thường nó nhận command từ client qua hàm khởi tạo.' },
        { type: 'paragraph', text: 'Command thường khai báo một phương thức để thực thi. Concrete Command triển khai các loại yêu cầu khác nhau. Concrete command thường chuyển lời gọi cho một đối tượng nghiệp vụ thay vì tự làm, dù có thể gộp hai lớp này để mã đơn giản hơn. Tham số cho phương thức của receiver có thể là các trường của command, chỉ gán trong hàm khởi tạo để command bất biến.' },
        { type: 'paragraph', text: 'Receiver chứa logic nghiệp vụ, và hầu như đối tượng nào cũng có thể là receiver. Client tạo và cấu hình concrete command, truyền mọi tham số của yêu cầu, kể cả receiver, vào hàm khởi tạo. Sau đó command có thể được gắn với một hoặc nhiều sender.' },
        { type: 'paragraph', text: 'Trong ví dụ này, Command còn khai báo undo(), và sender giữ một hàng chờ cùng sổ lịch sử. Các phần này phục vụ xếp hàng và hoàn tác; chúng không thuộc cấu trúc tối thiểu.' },
      ],
    },
  },

  {
    id: 'interpreter',
    slug: 'interpreter',
    name: { en: 'Interpreter', vi: 'Thông dịch' },
    category: 'behavioral',
    complexity: 3,
    popularity: 1,
    intent: {
      en: 'Interpreter is a behavioral design pattern that turns each rule of a small language into a class. A sentence in that language becomes a tree of objects that can compute its own meaning.',
      vi: 'Interpreter là mẫu thiết kế hành vi, biến mỗi quy tắc của một ngôn ngữ nhỏ thành một lớp. Mỗi câu trong ngôn ngữ đó trở thành một cây đối tượng tự tính ra được ý nghĩa của mình.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'Some programs keep receiving short sentences in a tiny language of their own: a search box that accepts "red AND (shoes OR boots)", a pricing rule such as "10% off orders above 500.000", a unit converter, or an amount of money written in words.' },
        { type: 'paragraph', text: 'The quick fix is one function full of string checks and nested if statements. It handles the first few sentences, but every new word or rule means editing that function again, and the grammar exists only in its author\'s head. When the same sentences need a second job, such as printing them or checking them for errors, someone writes a second tangle that must agree with the first.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Có những chương trình liên tục nhận các câu ngắn viết bằng một ngôn ngữ rất nhỏ của riêng chúng: ô tìm kiếm chấp nhận "đỏ AND (giày OR ủng)", một luật giá như "giảm 10% cho đơn trên 500.000", một bộ đổi đơn vị, hay một số tiền viết bằng chữ.' },
        { type: 'paragraph', text: 'Cách làm nhanh là viết một hàm đầy phép so sánh chuỗi và lệnh if lồng nhau. Hàm đó xử lý được vài câu đầu, nhưng mỗi chữ hay quy tắc mới lại buộc phải sửa hàm, còn ngữ pháp chỉ nằm trong đầu người viết. Khi cùng những câu ấy cần thêm một việc khác, chẳng hạn in lại hay kiểm tra lỗi, ai đó lại viết thêm một mớ mã rối thứ hai và phải giữ nó khớp với mớ thứ nhất.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Write the grammar as a handful of rules and give each rule its own class. Symbols that stand alone, such as a single number word, become terminal expressions. Rules that combine other parts, such as "a number times a unit", become nonterminal expressions that keep their parts as fields.' },
        { type: 'paragraph', text: 'A sentence is then a tree of these objects, called an abstract syntax tree. To get its meaning, the client calls interpret() on the root. Each node interprets its children first and combines their results, so the work spreads down the tree.' },
        { type: 'paragraph', text: 'Turning text into a tree is a separate job. The pattern does not define how to parse, and a small hand-written parser is usually enough. A new rule means a new class. A new operation on the tree, such as printing it, means a new method on the expression classes.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Hãy viết ngữ pháp thành một vài quy tắc và cho mỗi quy tắc một lớp riêng. Ký hiệu đứng một mình, chẳng hạn một chữ số, trở thành biểu thức kết thúc (terminal expression). Quy tắc ghép các phần khác lại, chẳng hạn "một số nhân với một đơn vị", trở thành biểu thức không kết thúc (nonterminal expression), giữ các phần của nó làm trường.' },
        { type: 'paragraph', text: 'Khi đó mỗi câu là một cây gồm các đối tượng này, gọi là cây cú pháp trừu tượng. Muốn biết nghĩa của câu, client gọi interpret() trên nút gốc. Mỗi nút thông dịch các nút con trước rồi kết hợp kết quả của chúng, nên công việc lan xuống khắp cây.' },
        { type: 'paragraph', text: 'Biến văn bản thành cây là một việc riêng. Mẫu này không quy định cách phân tích cú pháp, và thường chỉ cần một bộ phân tích nhỏ tự viết. Thêm quy tắc mới nghĩa là thêm lớp mới. Thêm thao tác mới trên cây, chẳng hạn in cây ra, nghĩa là thêm một phương thức vào các lớp biểu thức.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Interpreter when:' },
        { type: 'list', items: [
          'a problem keeps arriving as sentences in a simple language, such as search filters, pricing or validation rules, unit formulas, or small query and template languages;',
          'you want the grammar to be visible in the code;',
          'the grammar has a few dozen rules at most;',
          'speed is not critical.',
        ] },
        { type: 'paragraph', text: 'With hundreds of rules the class hierarchy becomes hard to manage, and a parser generator or an existing library fits better. Walking a tree of objects is slower than running a sentence translated into a flatter form first, which is why fast regular-expression engines compile each expression into a state machine. If you mainly need many operations over a grammar that rarely changes, pair the tree with Visitor instead of adding a method to every class.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Interpreter khi:' },
        { type: 'list', items: [
          'bài toán liên tục xuất hiện dưới dạng câu trong một ngôn ngữ đơn giản, như bộ lọc tìm kiếm, luật tính giá hay kiểm tra dữ liệu, công thức đổi đơn vị, hoặc ngôn ngữ truy vấn và ngôn ngữ mẫu nhỏ;',
          'bạn muốn ngữ pháp hiện rõ trong mã;',
          'ngữ pháp có nhiều nhất vài chục quy tắc;',
          'tốc độ không quá quan trọng.',
        ] },
        { type: 'paragraph', text: 'Khi có hàng trăm quy tắc, cây phân cấp lớp trở nên khó quản lý, và công cụ sinh bộ phân tích cú pháp hay một thư viện có sẵn sẽ phù hợp hơn. Duyệt cây đối tượng chậm hơn chạy một câu đã được dịch trước sang dạng phẳng hơn, vì thế các bộ máy biểu thức chính quy nhanh thường biên dịch mỗi biểu thức thành một máy trạng thái. Nếu chủ yếu cần nhiều thao tác trên một ngữ pháp ít thay đổi, hãy ghép cây với Visitor thay vì thêm phương thức vào mọi lớp.' },
      ],
    },
    vietnamese_example: {
      title: { en: 'Reading an amount written in words', vi: 'Đọc số tiền viết bằng chữ' },
      description: {
        en: [
          { type: 'paragraph', text: 'Vietnamese invoices, receipts and bank slips commonly show the total twice: in digits and in words after "Bằng chữ:" ("in words"), so that nobody can quietly add a zero. ReceiptReader reads the words back into a number so the two can be compared.' },
          { type: 'paragraph', text: 'The language is small. Không to chín are the digits, and some change with position: mốt and tư replace một and bốn right after mươi (hai mươi mốt is 21), lăm or nhăm replaces năm right after mười or mươi (mười lăm is 15), and linh, or lẻ in the South, marks an empty tens place (sáu trăm linh năm is 605). Mươi and trăm multiply the word just before them by ten and a hundred. Nghìn, or ngàn in the South, and triệu multiply the whole group before them by a thousand and a million.' },
          { type: 'paragraph', text: 'AmountExpression is the abstract expression, with interpret(). NumberWord is the terminal expression: one word and its value. Multiply and Add are nonterminal expressions: each holds two smaller expressions and combines their results. "Bảy mươi lăm nghìn" becomes the tree (bảy × mươi + lăm) × nghìn, which interprets to 75.000. ReceiptReader\'s parse() builds the tree; parsing sits outside the pattern. explain() is a second operation on the same tree that prints it with brackets.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Trên hóa đơn, biên lai và giấy nộp tiền ở Việt Nam, số tiền thường được ghi hai lần: bằng số và bằng chữ sau dòng "Bằng chữ:", để không ai lén thêm được một số 0. ReceiptReader đọc phần chữ thành con số để so với phần số.' },
          { type: 'paragraph', text: 'Ngôn ngữ này rất nhỏ. Từ không đến chín là các chữ số, và vài chữ đổi theo vị trí: mốt và tư thay cho một và bốn khi đứng ngay sau mươi (hai mươi mốt là 21), lăm hoặc nhăm thay cho năm khi đứng ngay sau mười hoặc mươi (mười lăm là 15), còn linh, hay lẻ ở miền Nam, đánh dấu hàng chục trống (sáu trăm linh năm là 605). Mươi và trăm nhân chữ đứng ngay trước với mười và một trăm. Nghìn, hay ngàn ở miền Nam, và triệu nhân cả nhóm đứng trước với một nghìn và một triệu.' },
          { type: 'paragraph', text: 'AmountExpression là biểu thức trừu tượng, có interpret(). NumberWord là biểu thức kết thúc: một chữ cùng giá trị của nó. Multiply và Add là biểu thức không kết thúc: mỗi lớp giữ hai biểu thức nhỏ hơn và kết hợp kết quả của chúng. "Bảy mươi lăm nghìn" trở thành cây (bảy × mươi + lăm) × nghìn, thông dịch ra 75.000. Phương thức parse() của ReceiptReader dựng cây; việc phân tích cú pháp nằm ngoài mẫu. explain() là thao tác thứ hai trên cùng cây, in cây ra kèm dấu ngoặc.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from functools import reduce


# Abstract Expression: every node of the tree can interpret itself
class AmountExpression(ABC):
    @abstractmethod
    def interpret(self) -> int: ...

    # A second operation on the same tree: write it out with brackets
    @abstractmethod
    def explain(self, in_product: bool = False) -> str: ...


# Terminal Expression: one number word and its value
class NumberWord(AmountExpression):
    VALUES = {
        "không": 0, "linh": 0, "lẻ": 0, "một": 1, "mốt": 1, "hai": 2, "ba": 3,
        "bốn": 4, "tư": 4, "năm": 5, "lăm": 5, "nhăm": 5, "sáu": 6, "bảy": 7,
        "tám": 8, "chín": 9, "mười": 10, "mươi": 10, "trăm": 100,
        "nghìn": 1_000, "ngàn": 1_000, "triệu": 1_000_000,
    }

    def __init__(self, word: str) -> None:
        if word not in self.VALUES:
            raise ValueError(f'Không hiểu chữ "{word}"')
        self.word = word

    def interpret(self) -> int:
        return self.VALUES[self.word]

    def explain(self, in_product: bool = False) -> str:
        return self.word


# Nonterminal Expressions: each holds smaller expressions
# and interprets itself by interpreting them first
class Multiply(AmountExpression):
    def __init__(self, left: AmountExpression, right: AmountExpression) -> None:
        self.left = left
        self.right = right

    def interpret(self) -> int:
        return self.left.interpret() * self.right.interpret()

    def explain(self, in_product: bool = False) -> str:
        return f"{self.left.explain(True)} × {self.right.explain(True)}"


class Add(AmountExpression):
    def __init__(self, left: AmountExpression, right: AmountExpression) -> None:
        self.left = left
        self.right = right

    def interpret(self) -> int:
        return self.left.interpret() + self.right.interpret()

    def explain(self, in_product: bool = False) -> str:
        text = f"{self.left.explain()} + {self.right.explain()}"
        return f"({text})" if in_product else text  # brackets only inside a product


# Joins parts left to right: a + b + c becomes Add(Add(a, b), c)
def add_all(parts: list[AmountExpression]) -> AmountExpression:
    return reduce(Add, parts)


# Client: builds the tree for a sentence, then asks the tree what it means.
# parse() is not part of the pattern: the Gang of Four leave parsing to the client.
class ReceiptReader:
    SMALL_UNITS = ("mươi", "trăm")  # multiply the word just before them
    LARGE_UNITS = ("nghìn", "ngàn", "triệu")  # multiply the whole group before them

    def parse(self, words: list[str]) -> AmountExpression:
        terms: list[AmountExpression] = []
        group: list[AmountExpression] = []
        for word in words:
            if word in self.SMALL_UNITS:
                group.append(Multiply(group.pop(), NumberWord(word)))
            elif word in self.LARGE_UNITS:
                terms.append(Multiply(add_all(group), NumberWord(word)))
                group = []
            else:
                group.append(NumberWord(word))
        if group:
            terms.append(add_all(group))
        return add_all(terms)

    def read(self, line: str) -> None:
        words = line.removeprefix("Bằng chữ:").removesuffix("đồng").lower().split()
        tree = self.parse(words)
        amount = f"{tree.interpret():,}".replace(",", ".")
        print(line)
        print(f"→ {tree.explain()} = {amount}")


reader = ReceiptReader()
reader.read("Bằng chữ: Bảy mươi lăm nghìn đồng")
reader.read("Bằng chữ: Sáu trăm linh năm nghìn đồng")
reader.read("Bằng chữ: Một triệu không trăm hai mươi tư nghìn đồng")

# Output:
# Bằng chữ: Bảy mươi lăm nghìn đồng
# → (bảy × mươi + lăm) × nghìn = 75.000
# Bằng chữ: Sáu trăm linh năm nghìn đồng
# → (sáu × trăm + linh + năm) × nghìn = 605.000
# Bằng chữ: Một triệu không trăm hai mươi tư nghìn đồng
# → một × triệu + (không × trăm + hai × mươi + tư) × nghìn = 1.024.000`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Abstract Expression: every node of the tree can interpret itself
interface AmountExpression {
  interpret(): number
  // A second operation on the same tree: write it out with brackets
  explain(inProduct?: boolean): string
}

// Terminal Expression: one number word and its value
class NumberWord implements AmountExpression {
  private static readonly VALUES: Record<string, number> = {
    'không': 0, 'linh': 0, 'lẻ': 0, 'một': 1, 'mốt': 1, 'hai': 2, 'ba': 3,
    'bốn': 4, 'tư': 4, 'năm': 5, 'lăm': 5, 'nhăm': 5, 'sáu': 6, 'bảy': 7,
    'tám': 8, 'chín': 9, 'mười': 10, 'mươi': 10, 'trăm': 100,
    'nghìn': 1_000, 'ngàn': 1_000, 'triệu': 1_000_000,
  }

  constructor(private readonly word: string) {
    if (!(word in NumberWord.VALUES)) throw new Error(\`Không hiểu chữ "\${word}"\`)
  }

  interpret(): number { return NumberWord.VALUES[this.word] }

  explain(): string { return this.word }
}

// Nonterminal Expressions: each holds smaller expressions
// and interprets itself by interpreting them first
class Multiply implements AmountExpression {
  constructor(private readonly left: AmountExpression, private readonly right: AmountExpression) {}

  interpret(): number { return this.left.interpret() * this.right.interpret() }

  explain(): string { return \`\${this.left.explain(true)} × \${this.right.explain(true)}\` }
}

class Add implements AmountExpression {
  constructor(private readonly left: AmountExpression, private readonly right: AmountExpression) {}

  interpret(): number { return this.left.interpret() + this.right.interpret() }

  explain(inProduct = false): string {
    const text = \`\${this.left.explain()} + \${this.right.explain()}\`
    return inProduct ? \`(\${text})\` : text // brackets only inside a product
  }
}

// Joins parts left to right: a + b + c becomes Add(Add(a, b), c)
const addAll = (parts: AmountExpression[]): AmountExpression =>
  parts.reduce((total, part) => new Add(total, part))

// Client: builds the tree for a sentence, then asks the tree what it means.
// parse() is not part of the pattern: the Gang of Four leave parsing to the client.
class ReceiptReader {
  private static readonly SMALL_UNITS = ['mươi', 'trăm'] // multiply the word just before them
  private static readonly LARGE_UNITS = ['nghìn', 'ngàn', 'triệu'] // multiply the whole group before them

  parse(words: string[]): AmountExpression {
    const terms: AmountExpression[] = []
    let group: AmountExpression[] = []
    for (const word of words) {
      if (ReceiptReader.SMALL_UNITS.includes(word)) {
        group.push(new Multiply(group.pop()!, new NumberWord(word)))
      } else if (ReceiptReader.LARGE_UNITS.includes(word)) {
        terms.push(new Multiply(addAll(group), new NumberWord(word)))
        group = []
      } else {
        group.push(new NumberWord(word))
      }
    }
    if (group.length > 0) terms.push(addAll(group))
    return addAll(terms)
  }

  read(line: string): void {
    const words = line.replace('Bằng chữ:', '').replace(/đồng$/, '').toLowerCase().trim().split(/\\s+/)
    const tree = this.parse(words)
    console.log(line)
    console.log(\`→ \${tree.explain()} = \${tree.interpret().toLocaleString('vi-VN')}\`)
  }
}

const reader = new ReceiptReader()
reader.read('Bằng chữ: Bảy mươi lăm nghìn đồng')
reader.read('Bằng chữ: Sáu trăm linh năm nghìn đồng')
reader.read('Bằng chữ: Một triệu không trăm hai mươi tư nghìn đồng')`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'The Gang of Four name five participants:' },
        { type: 'list', items: [
          'AbstractExpression declares the interpret operation shared by every node; here it is AmountExpression.',
          'TerminalExpression handles one grammar symbol and has no children; NumberWord is one word such as bảy or nghìn.',
          'NonterminalExpression represents a rule that combines other symbols and interprets itself by interpreting its parts; Multiply and Add each hold a left and a right expression.',
          'Context carries information the whole tree needs during interpretation, such as variable values. Every number word here has a fixed value, so this example needs no Context.',
          'Client builds the syntax tree, or receives one, and calls interpret() on its root; ReceiptReader does both.',
        ] },
        { type: 'paragraph', text: 'The syntax tree is a Composite: nonterminal expressions are containers and terminal expressions are leaves. Identical terminals can be shared as flyweights, because a word like mươi means the same thing wherever it appears. When the list of operations keeps growing, a Visitor can hold them instead of the expression classes.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Gang of Four nêu năm thành phần:' },
        { type: 'list', items: [
          'AbstractExpression khai báo thao tác interpret chung cho mọi nút; ở đây là AmountExpression.',
          'TerminalExpression xử lý một ký hiệu của ngữ pháp và không có nút con; NumberWord là một chữ như bảy hay nghìn.',
          'NonterminalExpression đại diện cho một quy tắc ghép các ký hiệu khác và tự thông dịch bằng cách thông dịch các phần của nó; Multiply và Add mỗi lớp giữ một biểu thức trái và một biểu thức phải.',
          'Context chứa thông tin cả cây cần trong lúc thông dịch, chẳng hạn giá trị biến. Mỗi chữ số ở đây có giá trị cố định, nên ví dụ không cần Context.',
          'Client dựng cây cú pháp, hoặc nhận cây có sẵn, rồi gọi interpret() trên nút gốc; ReceiptReader làm cả hai việc.',
        ] },
        { type: 'paragraph', text: 'Cây cú pháp là một Composite: biểu thức không kết thúc là vật chứa, biểu thức kết thúc là lá. Các nút kết thúc giống nhau có thể dùng chung theo kiểu Flyweight, vì một chữ như mươi mang cùng nghĩa ở mọi chỗ nó xuất hiện. Khi danh sách thao tác cứ dài thêm, Visitor có thể giữ các thao tác đó thay cho các lớp biểu thức.' },
      ],
    },
  },

  {
    id: 'iterator',
    slug: 'iterator',
    name: { en: 'Iterator', vi: 'Bộ lặp' },
    category: 'behavioral',
    complexity: 2,
    popularity: 3,
    intent: {
      en: 'Iterator is a behavioral design pattern that lets you traverse the elements of a collection without exposing its underlying representation, such as a list, stack or tree.',
      vi: 'Iterator là mẫu thiết kế hành vi, cho phép duyệt các phần tử của một tập hợp mà không để lộ cách biểu diễn bên dưới của nó, như danh sách, ngăn xếp hay cây.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'A collection is a container for a group of objects. Most store elements in simple lists, but some are built on stacks, trees, graphs or other structures. Whatever the structure, the collection must offer a way to visit each element once.' },
        { type: 'paragraph', text: 'That is easy for a list. A tree, however, may need depth-first traversal one day and breadth-first the next. Adding more traversal algorithms to the collection blurs its main job, which is storing data efficiently, and some algorithms serve only one application.' },
        { type: 'paragraph', text: 'Meanwhile, client code that does not care how elements are stored still depends on specific collection classes, because each collection exposes its own way of accessing elements.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Tập hợp (collection) là nơi chứa một nhóm đối tượng. Phần lớn tập hợp lưu phần tử trong danh sách đơn giản, nhưng có tập hợp được xây trên ngăn xếp, cây, đồ thị hay cấu trúc khác. Dù cấu trúc thế nào, tập hợp vẫn phải có cách đi qua mỗi phần tử đúng một lần.' },
        { type: 'paragraph', text: 'Với danh sách thì việc này dễ. Nhưng với cây, hôm nay có thể cần duyệt theo chiều sâu, hôm sau lại cần duyệt theo chiều rộng. Thêm ngày càng nhiều thuật toán duyệt vào tập hợp làm lu mờ nhiệm vụ chính của nó là lưu trữ dữ liệu hiệu quả, và có thuật toán chỉ phục vụ một ứng dụng.' },
        { type: 'paragraph', text: 'Trong khi đó, mã client vốn không quan tâm phần tử được lưu thế nào vẫn phụ thuộc vào từng lớp tập hợp cụ thể, vì mỗi tập hợp có cách truy cập phần tử riêng.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Move the traversal behavior into a separate object called an iterator. Besides the algorithm, the iterator holds all traversal details, such as the current position and how many elements remain. Several iterators can therefore walk the same collection at the same time, independently.' },
        { type: 'paragraph', text: 'An iterator usually has one main method for fetching elements. The client keeps calling it until it returns nothing, which means the traversal is complete.' },
        { type: 'paragraph', text: 'All iterators implement the same interface, so the client works with any collection or traversal algorithm that has a suitable iterator. A new way of traversing means a new iterator class, with no change to the collection or the client.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Chuyển hành vi duyệt ra một đối tượng riêng gọi là iterator. Ngoài thuật toán, iterator giữ mọi chi tiết của quá trình duyệt, như vị trí hiện tại và số phần tử còn lại. Nhờ vậy nhiều iterator có thể cùng lúc duyệt một tập hợp một cách độc lập.' },
        { type: 'paragraph', text: 'Iterator thường có một phương thức chính để lấy phần tử. Client cứ gọi phương thức này cho tới khi nó không trả về gì, nghĩa là đã duyệt xong.' },
        { type: 'paragraph', text: 'Mọi iterator triển khai cùng một giao diện, nên client làm việc được với bất kỳ tập hợp hay thuật toán duyệt nào có iterator phù hợp. Muốn có cách duyệt mới thì thêm một lớp iterator, không phải sửa tập hợp hay client.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Iterator when:' },
        { type: 'list', items: [
          'a collection has a complex structure that you want to hide from clients, for convenience or safety;',
          'you want to remove duplicated traversal code from business logic;',
          'your code must traverse different data structures, or structures whose types are not known in advance.',
        ] },
        { type: 'paragraph', text: 'An iterator gives the client a few simple methods and protects the collection from careless direct access. Code written against the collection and iterator interfaces keeps working with any new collection or iterator that implements them.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Iterator khi:' },
        { type: 'list', items: [
          'tập hợp có cấu trúc phức tạp mà bạn muốn che khỏi client, vì tiện lợi hoặc vì an toàn;',
          'bạn muốn bỏ mã duyệt bị lặp lại trong logic nghiệp vụ;',
          'mã phải duyệt nhiều cấu trúc dữ liệu khác nhau, hoặc những cấu trúc chưa biết trước kiểu.',
        ] },
        { type: 'paragraph', text: 'Iterator cho client vài phương thức đơn giản và bảo vệ tập hợp khỏi việc truy cập trực tiếp thiếu cẩn thận. Mã viết theo giao diện tập hợp và giao diện iterator vẫn chạy đúng với mọi tập hợp hay iterator mới triển khai các giao diện đó.' },
      ],
    },
    vietnamese_example: {
      title: { en: 'Touring historical sites in Hanoi', vi: 'Tham quan di tích lịch sử ở Hà Nội' },
      description: {
        en: [
          { type: 'paragraph', text: 'A selection of Hanoi\'s historical sites forms the collection. HanoiTour (the Concrete Collection) stores them grouped by district in a map of lists, a detail visitors do not need to know. It implements SiteCollection and hands out two kinds of TourIterator.' },
          { type: 'paragraph', text: 'ByDistrictIterator walks district by district: Hoàn Kiếm, then Ba Đình, then Đống Đa. ByEraIterator sorts the sites once, on first use, and walks from the oldest year in the data, Hoàng Thành Thăng Long (1010), to the newest, Lăng Bác (1975).' },
          { type: 'paragraph', text: 'Tourist is the client. Its visit() method calls only hasMore() and getNext(), so the same code follows either route. Each iterator keeps its own position, so two can walk the collection at once. A new route would be one new iterator class, with no change to HanoiTour or Tourist.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Một số di tích lịch sử ở Hà Nội tạo thành tập hợp. HanoiTour (Concrete Collection) lưu chúng theo quận trong một bảng ánh xạ từ quận sang danh sách di tích, chi tiết mà du khách không cần biết. Lớp này triển khai SiteCollection và cung cấp hai loại TourIterator.' },
          { type: 'paragraph', text: 'ByDistrictIterator đi lần lượt từng quận: Hoàn Kiếm, rồi Ba Đình, rồi Đống Đa. ByEraIterator sắp xếp các di tích một lần ở lần dùng đầu tiên, rồi đi từ năm sớm nhất trong dữ liệu là Hoàng thành Thăng Long (1010) tới muộn nhất là Lăng Bác (1975).' },
          { type: 'paragraph', text: 'Tourist là client. Phương thức visit() chỉ gọi hasMore() và getNext(), nên cùng một đoạn mã đi được cả hai lộ trình. Mỗi iterator tự giữ vị trí của mình, nên hai iterator có thể cùng lúc duyệt tập hợp. Lộ trình mới chỉ cần thêm một lớp iterator, không phải sửa HanoiTour hay Tourist.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from typing import Optional


class Site:
    def __init__(self, name: str, year: int):
        self.name = name
        self.year = year


# Iterator: the operations required to traverse the collection
class TourIterator(ABC):
    @abstractmethod
    def get_next(self) -> Optional[Site]: ...

    @abstractmethod
    def has_more(self) -> bool: ...


# Iterable Collection: methods that return iterators.
# The return type is the Iterator interface, not a concrete class.
class SiteCollection(ABC):
    @abstractmethod
    def by_district_iterator(self) -> TourIterator: ...

    @abstractmethod
    def by_era_iterator(self) -> TourIterator: ...


# Concrete Collection: stores sites grouped by district (a dict of lists)
class HanoiTour(SiteCollection):
    def __init__(self) -> None:
        self._by_district: dict[str, list[Site]] = {}

    def add(self, district: str, site: Site) -> None:
        self._by_district.setdefault(district, []).append(site)

    def districts(self) -> list[str]:
        return list(self._by_district)

    def sites_of(self, district: str) -> list[Site]:
        return self._by_district[district]

    # Each call returns a new iterator linked to this collection
    def by_district_iterator(self) -> TourIterator:
        return ByDistrictIterator(self)

    def by_era_iterator(self) -> TourIterator:
        return ByEraIterator(self)


# Concrete Iterator: district by district; tracks its own position
class ByDistrictIterator(TourIterator):
    def __init__(self, tour: HanoiTour) -> None:
        self._tour = tour
        self._districts = tour.districts()
        self._district_index = 0
        self._position = 0

    def has_more(self) -> bool:
        while self._district_index < len(self._districts):
            if self._position < len(self._tour.sites_of(self._districts[self._district_index])):
                return True
            self._district_index += 1
            self._position = 0
        return False

    def get_next(self) -> Optional[Site]:
        if not self.has_more():
            return None
        site = self._tour.sites_of(self._districts[self._district_index])[self._position]
        self._position += 1
        return site


# Concrete Iterator: oldest to newest; sorts once, on first use
class ByEraIterator(TourIterator):
    def __init__(self, tour: HanoiTour) -> None:
        self._tour = tour
        self._cache: Optional[list[Site]] = None
        self._position = 0

    def _sites(self) -> list[Site]:
        if self._cache is None:
            all_sites = [s for d in self._tour.districts() for s in self._tour.sites_of(d)]
            self._cache = sorted(all_sites, key=lambda s: s.year)
        return self._cache

    def has_more(self) -> bool:
        return self._position < len(self._sites())

    def get_next(self) -> Optional[Site]:
        if not self.has_more():
            return None
        self._position += 1
        return self._sites()[self._position - 1]


# Client: works only through the Iterator interface
class Tourist:
    def __init__(self, name: str) -> None:
        self.name = name

    def visit(self, iterator: TourIterator) -> None:
        route = []
        while iterator.has_more():
            site = iterator.get_next()
            if site:
                route.append(f"{site.name} ({site.year})")
        print(f"{self.name}: " + " → ".join(route))


tour = HanoiTour()
tour.add("Hoàn Kiếm", Site("Hồ Hoàn Kiếm", 1428))
tour.add("Ba Đình", Site("Hoàng Thành Thăng Long", 1010))
tour.add("Ba Đình", Site("Chùa Một Cột", 1049))
tour.add("Ba Đình", Site("Lăng Bác", 1975))
tour.add("Đống Đa", Site("Văn Miếu", 1070))

Tourist("Lan (theo quận)").visit(tour.by_district_iterator())
Tourist("Minh (theo niên đại)").visit(tour.by_era_iterator())

# Two iterators over the same collection keep separate positions
a = tour.by_era_iterator()
b = tour.by_era_iterator()
a.get_next()
a.get_next()
print(f"Iterator a đang ở: {a.get_next().name}; iterator b đang ở: {b.get_next().name}")

# Output:
# Lan (theo quận): Hồ Hoàn Kiếm (1428) → Hoàng Thành Thăng Long (1010) → Chùa Một Cột (1049) → Lăng Bác (1975) → Văn Miếu (1070)
# Minh (theo niên đại): Hoàng Thành Thăng Long (1010) → Chùa Một Cột (1049) → Văn Miếu (1070) → Hồ Hoàn Kiếm (1428) → Lăng Bác (1975)
# Iterator a đang ở: Văn Miếu; iterator b đang ở: Hoàng Thành Thăng Long`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `class Site {
  constructor(public readonly name: string, public readonly year: number) {}
}

// Iterator: the operations required to traverse the collection
interface TourIterator {
  getNext(): Site | null
  hasMore(): boolean
}

// Iterable Collection: methods that return iterators.
// The return type is the Iterator interface, not a concrete class.
interface SiteCollection {
  byDistrictIterator(): TourIterator
  byEraIterator(): TourIterator
}

// Concrete Collection: stores sites grouped by district (a map of lists)
class HanoiTour implements SiteCollection {
  private byDistrict = new Map<string, Site[]>()

  add(district: string, site: Site): void {
    const list = this.byDistrict.get(district) ?? []
    list.push(site)
    this.byDistrict.set(district, list)
  }

  districts(): string[] { return [...this.byDistrict.keys()] }
  sitesOf(district: string): Site[] { return this.byDistrict.get(district) ?? [] }

  // Each call returns a new iterator linked to this collection
  byDistrictIterator(): TourIterator { return new ByDistrictIterator(this) }
  byEraIterator(): TourIterator { return new ByEraIterator(this) }
}

// Concrete Iterator: district by district; tracks its own position
class ByDistrictIterator implements TourIterator {
  private districts: string[]
  private districtIndex = 0
  private position = 0

  constructor(private tour: HanoiTour) {
    this.districts = tour.districts()
  }

  hasMore(): boolean {
    while (this.districtIndex < this.districts.length) {
      if (this.position < this.tour.sitesOf(this.districts[this.districtIndex]).length) return true
      this.districtIndex++
      this.position = 0
    }
    return false
  }

  getNext(): Site | null {
    if (!this.hasMore()) return null
    return this.tour.sitesOf(this.districts[this.districtIndex])[this.position++]
  }
}

// Concrete Iterator: oldest to newest; sorts once, on first use
class ByEraIterator implements TourIterator {
  private cache: Site[] | null = null
  private position = 0

  constructor(private tour: HanoiTour) {}

  private sites(): Site[] {
    if (this.cache === null) {
      const allSites = this.tour.districts().flatMap(d => this.tour.sitesOf(d))
      this.cache = allSites.sort((a, b) => a.year - b.year)
    }
    return this.cache
  }

  hasMore(): boolean { return this.position < this.sites().length }

  getNext(): Site | null {
    return this.hasMore() ? this.sites()[this.position++] : null
  }
}

// Client: works only through the Iterator interface
class Tourist {
  constructor(private name: string) {}

  visit(iterator: TourIterator): void {
    const route: string[] = []
    while (iterator.hasMore()) {
      const site = iterator.getNext()
      if (site) route.push(\`\${site.name} (\${site.year})\`)
    }
    console.log(\`\${this.name}: \${route.join(' → ')}\`)
  }
}

const tour = new HanoiTour()
tour.add('Hoàn Kiếm', new Site('Hồ Hoàn Kiếm', 1428))
tour.add('Ba Đình', new Site('Hoàng Thành Thăng Long', 1010))
tour.add('Ba Đình', new Site('Chùa Một Cột', 1049))
tour.add('Ba Đình', new Site('Lăng Bác', 1975))
tour.add('Đống Đa', new Site('Văn Miếu', 1070))

new Tourist('Lan (theo quận)').visit(tour.byDistrictIterator())
new Tourist('Minh (theo niên đại)').visit(tour.byEraIterator())

// Two iterators over the same collection keep separate positions
const a = tour.byEraIterator()
const b = tour.byEraIterator()
a.getNext()
a.getNext()
console.log(\`Iterator a đang ở: \${a.getNext()?.name}; iterator b đang ở: \${b.getNext()?.name}\`)`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'Iterator declares the operations for traversing a collection, such as fetching the next element, reading the current position or restarting. Concrete Iterators implement specific traversal algorithms and track their own progress, so several can traverse one collection independently.' },
        { type: 'paragraph', text: 'Iterable Collection declares one or more methods that return iterators. Their return type is the iterator interface, so concrete collections can return different kinds of iterators. A Concrete Collection returns a new concrete iterator each time the client asks for one.' },
        { type: 'paragraph', text: 'Client works with collections and iterators through their interfaces, so it is not coupled to concrete classes. Clients usually get iterators from collections, but a client can create one directly, for example when it defines its own iterator.' },
        { type: 'paragraph', text: 'Here TourIterator is the Iterator, ByDistrictIterator and ByEraIterator are Concrete Iterators, SiteCollection is the Iterable Collection, HanoiTour is the Concrete Collection and Tourist is the Client. To save space, the diagram draws the "creates" arrow only to ByDistrictIterator (HanoiTour creates ByEraIterator the same way) and omits the Site element class.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Iterator khai báo các thao tác để duyệt tập hợp, như lấy phần tử tiếp theo, đọc vị trí hiện tại hay bắt đầu lại. Concrete Iterator cài đặt từng thuật toán duyệt cụ thể và tự theo dõi tiến độ, nên nhiều iterator có thể duyệt một tập hợp một cách độc lập.' },
        { type: 'paragraph', text: 'Iterable Collection khai báo một hoặc nhiều phương thức trả về iterator. Kiểu trả về là giao diện iterator, nên tập hợp cụ thể có thể trả về nhiều loại iterator khác nhau. Concrete Collection trả về một iterator cụ thể mới mỗi khi client yêu cầu.' },
        { type: 'paragraph', text: 'Client làm việc với tập hợp và iterator qua giao diện của chúng, nên không phụ thuộc vào lớp cụ thể. Client thường lấy iterator từ tập hợp, nhưng cũng có thể tự tạo, chẳng hạn khi client định nghĩa iterator riêng.' },
        { type: 'paragraph', text: 'Ở đây TourIterator là Iterator, ByDistrictIterator và ByEraIterator là Concrete Iterator, SiteCollection là Iterable Collection, HanoiTour là Concrete Collection và Tourist là Client. Để tiết kiệm chỗ, sơ đồ chỉ vẽ mũi tên "creates" tới ByDistrictIterator (HanoiTour tạo ByEraIterator theo cách tương tự) và lược bỏ lớp phần tử Site.' },
      ],
    },
  },

  {
    id: 'mediator',
    slug: 'mediator',
    name: { en: 'Mediator', vi: 'Trung gian' },
    category: 'behavioral',
    complexity: 2,
    popularity: 1,
    also_known_as: [
      { en: 'Intermediary', vi: 'Người trung gian' },
      { en: 'Controller', vi: 'Bộ điều khiển' },
    ],
    intent: {
      en: 'Mediator is a behavioral design pattern that reduces tangled dependencies between objects. It stops the objects from communicating directly and makes them collaborate only through a mediator object.',
      vi: 'Mediator là mẫu thiết kế hành vi, giảm các phụ thuộc chằng chịt giữa các đối tượng. Mẫu này không cho các đối tượng giao tiếp trực tiếp và buộc chúng chỉ cộng tác qua một đối tượng trung gian (mediator).',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'A dialog for creating and editing customer profiles contains text fields, checkboxes and buttons. Some of them interact: ticking "I have a dog" reveals a hidden field for the dog\'s name, and the submit button must validate every field before saving.' },
        { type: 'paragraph', text: 'As the application grows, these relations become tangled, and changing one element can affect others. If the logic lives inside the form elements, their classes are hard to reuse: the checkbox cannot move to another form because it is tied to the dog-name field. You can reuse all the classes of the profile form or none of them.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Một hộp thoại tạo và sửa hồ sơ khách hàng có các ô nhập văn bản, ô đánh dấu và nút bấm. Một số phần tử tương tác với nhau: đánh dấu ô "Tôi có nuôi chó" làm hiện ô nhập tên chó, còn nút gửi phải kiểm tra mọi ô trước khi lưu.' },
        { type: 'paragraph', text: 'Khi ứng dụng lớn dần, các quan hệ này trở nên rối, và sửa một phần tử có thể ảnh hưởng tới phần tử khác. Nếu logic nằm trong chính các phần tử biểu mẫu, các lớp đó khó dùng lại: ô đánh dấu không thể chuyển sang biểu mẫu khác vì đã gắn với ô nhập tên chó. Bạn chỉ có thể dùng lại toàn bộ các lớp của biểu mẫu hồ sơ, hoặc không lớp nào.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Stop direct communication between the components you want to make independent. Instead, they call a mediator object, which forwards each call to the right components. Each component then depends on one mediator class instead of many colleagues.' },
        { type: 'paragraph', text: 'In the profile form, the dialog class can act as the mediator, since it already knows its sub-elements. The submit button no longer validates fields. It only tells the dialog that it was clicked, and the dialog performs the validation or delegates it to the elements.' },
        { type: 'paragraph', text: 'To loosen the coupling further, extract a common interface for all dialogs that declares the notification method. The button then works with any dialog that implements it. The mediator keeps the web of relations inside one object, and classes with fewer dependencies are easier to change, extend and reuse.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Ngừng mọi giao tiếp trực tiếp giữa các thành phần cần độc lập với nhau. Thay vào đó, chúng gọi một đối tượng mediator, đối tượng này chuyển mỗi lời gọi tới đúng thành phần. Khi đó mỗi thành phần chỉ phụ thuộc vào một lớp mediator thay vì nhiều thành phần khác.' },
        { type: 'paragraph', text: 'Trong biểu mẫu hồ sơ, lớp hộp thoại có thể làm mediator, vì nó đã biết các phần tử con. Nút gửi không còn tự kiểm tra các ô. Nó chỉ báo cho hộp thoại biết mình vừa được bấm, rồi hộp thoại tự kiểm tra hoặc giao việc đó cho các phần tử.' },
        { type: 'paragraph', text: 'Để nới lỏng phụ thuộc hơn nữa, hãy tách một giao diện chung cho mọi hộp thoại, khai báo phương thức thông báo. Khi đó nút gửi làm việc được với mọi hộp thoại triển khai giao diện này. Mediator gom mạng quan hệ vào một đối tượng, và lớp càng ít phụ thuộc thì càng dễ sửa, mở rộng và dùng lại.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Mediator when:' },
        { type: 'list', items: [
          'some classes are hard to change because they are tightly coupled to many others;',
          'you cannot reuse a component elsewhere because it depends too much on other components;',
          'you are creating many component subclasses just to reuse basic behavior in different contexts.',
        ] },
        { type: 'paragraph', text: 'With all relations in the mediator, components do not know each other. To reuse a component in another program, give it a new mediator. To change how components collaborate, add a new mediator class without changing the components.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Mediator khi:' },
        { type: 'list', items: [
          'một số lớp khó sửa vì gắn chặt với nhiều lớp khác;',
          'không thể dùng lại một thành phần ở nơi khác vì nó phụ thuộc quá nhiều vào các thành phần khác;',
          'bạn phải tạo nhiều lớp con của thành phần chỉ để dùng lại hành vi cơ bản trong các ngữ cảnh khác nhau.',
        ] },
        { type: 'paragraph', text: 'Khi mọi quan hệ nằm trong mediator, các thành phần không biết nhau. Muốn dùng lại một thành phần ở chương trình khác, hãy cho nó một mediator mới. Muốn đổi cách các thành phần cộng tác, hãy thêm một lớp mediator mới mà không phải sửa các thành phần.' },
      ],
    },
    vietnamese_example: {
      title: { en: 'A village council', vi: 'Hội đồng làng' },
      description: {
        en: [
          { type: 'paragraph', text: 'In this simplified village, the farmer, the merchant and the potter do not deal with each other directly; they bring their news to the village council. Farmer, Merchant and Potter are the components. They extend Villager, which holds a reference to the Mediator interface, and each does its own work: harvest(), buyRice() and makeJars(). When something important happens, a villager calls notifyCouncil(), which sends notify(this, event) to the mediator.' },
          { type: 'paragraph', text: 'VillageCouncil is the concrete mediator. It keeps a reference to every villager, recognizes who sent each event and decides who acts next. This season the harvest is poor. The council knows the village needs 100 baskets of rice until the next harvest, so it asks the merchant to buy the shortfall from the neighbouring village. Then it orders as many jars from the potter as the rice will fill, and tells the village there is enough to eat.' },
          { type: 'paragraph', text: 'Without the council, the farmer would need references to both the merchant and the potter, and every new trade would add more direct links. Because no villager knows the others, a Bát Tràng potter can work in any village, and another village can change the arrangement by providing its own mediator.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Trong ngôi làng giản lược này, người nông dân, thương nhân và thợ gốm không làm việc trực tiếp với nhau; họ mang tin lên hội đồng làng. Farmer, Merchant và Potter là các thành phần (component). Chúng kế thừa Villager, lớp giữ tham chiếu tới giao diện Mediator, và mỗi người tự lo việc của mình: harvest(), buyRice() và makeJars(). Khi có chuyện quan trọng, người dân gọi notifyCouncil(), phương thức này gửi notify(this, event) lên mediator.' },
          { type: 'paragraph', text: 'VillageCouncil là mediator cụ thể. Nó giữ tham chiếu tới từng người dân, nhận ra ai gửi sự kiện và quyết định ai làm tiếp. Vụ này mất mùa. Hội đồng biết làng cần 100 thúng lúa để ăn tới vụ sau, nên nhờ thương nhân mua phần còn thiếu ở làng bên. Sau đó hội đồng đặt thợ gốm nặn vừa đủ số chum để chứa lúa, rồi báo cả làng đã đủ ăn.' },
          { type: 'paragraph', text: 'Nếu không có hội đồng, nông dân phải giữ tham chiếu tới cả thương nhân lẫn thợ gốm, và mỗi nghề mới lại thêm những mối liên hệ trực tiếp. Vì không người dân nào biết những người khác, một thợ gốm Bát Tràng có thể làm việc ở bất kỳ làng nào, và một làng khác có thể đổi cách phối hợp bằng mediator của riêng mình.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from math import ceil
from typing import Optional


# Mediator interface: a single notification method
class Mediator(ABC):
    @abstractmethod
    def notify(self, sender: "Villager", event: str) -> None: ...


# Base Component: knows the mediator only through its interface
class Villager:
    def __init__(self, name: str) -> None:
        self.name = name
        self.mediator: Optional[Mediator] = None

    def notify_council(self, event: str) -> None:
        if self.mediator:
            self.mediator.notify(self, event)


# Concrete Components: do their own work and never call each other
class Farmer(Villager):
    baskets = 0

    def harvest(self, baskets: int) -> None:
        self.baskets = baskets
        print(f"🌾 {self.name}: gặt được {baskets} thúng lúa")
        self.notify_council("harvested")


class Merchant(Villager):
    baskets = 0

    def buy_rice(self, baskets: int) -> None:
        self.baskets = baskets
        print(f"💰 {self.name}: mua {baskets} thúng lúa ở làng bên")
        self.notify_council("rice_bought")


class Potter(Villager):
    def make_jars(self, count: int) -> None:
        print(f"🏺 {self.name}: nặn xong {count} chum")
        self.notify_council("jars_ready")


# Concrete Mediator: holds every component and decides who acts next
class VillageCouncil(Mediator):
    NEED = 100  # baskets the village eats until the next harvest
    BASKETS_PER_JAR = 10

    def __init__(self, farmer: Farmer, merchant: Merchant, potter: Potter) -> None:
        self.farmer = farmer
        self.merchant = merchant
        self.potter = potter
        for villager in (farmer, merchant, potter):
            villager.mediator = self

    def notify(self, sender: Villager, event: str) -> None:
        if sender is self.farmer and event == "harvested":
            shortfall = self.NEED - self.farmer.baskets
            if shortfall > 0:
                print(f"⚖️ Hội đồng: mất mùa, làng còn thiếu {shortfall} thúng")
                self.merchant.buy_rice(shortfall)
            else:
                self._order_jars(self.farmer.baskets)
        elif sender is self.merchant and event == "rice_bought":
            self._order_jars(self.farmer.baskets + self.merchant.baskets)
        elif sender is self.potter and event == "jars_ready":
            print("⚖️ Hội đồng: lúa đã vào chum, làng đủ ăn tới vụ sau")

    # The jar order depends on what two other villagers did
    def _order_jars(self, baskets: int) -> None:
        jars = ceil(baskets / self.BASKETS_PER_JAR)
        print(f"⚖️ Hội đồng: {baskets} thúng lúa cần {jars} chum")
        self.potter.make_jars(jars)


# Client code: links the components to the mediator, then triggers one event
farmer = Farmer("Nông dân Nguyễn")
merchant = Merchant("Thương nhân Lê")
potter = Potter("Thợ gốm Trần")
VillageCouncil(farmer, merchant, potter)

# A poor season: the harvest falls short of what the village needs
farmer.harvest(60)

# A component without a mediator still works on its own
print("---")
Potter("Thợ gốm Bát Tràng").make_jars(3)

# Output:
# 🌾 Nông dân Nguyễn: gặt được 60 thúng lúa
# ⚖️ Hội đồng: mất mùa, làng còn thiếu 40 thúng
# 💰 Thương nhân Lê: mua 40 thúng lúa ở làng bên
# ⚖️ Hội đồng: 100 thúng lúa cần 10 chum
# 🏺 Thợ gốm Trần: nặn xong 10 chum
# ⚖️ Hội đồng: lúa đã vào chum, làng đủ ăn tới vụ sau
# ---
# 🏺 Thợ gốm Bát Tràng: nặn xong 3 chum`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Mediator interface: a single notification method
interface Mediator {
  notify(sender: Villager, event: string): void
}

// Base Component: knows the mediator only through its interface
class Villager {
  mediator: Mediator | null = null

  constructor(public readonly name: string) {}

  notifyCouncil(event: string): void {
    this.mediator?.notify(this, event)
  }
}

// Concrete Components: do their own work and never call each other
class Farmer extends Villager {
  baskets = 0

  harvest(baskets: number): void {
    this.baskets = baskets
    console.log(\`🌾 \${this.name}: gặt được \${baskets} thúng lúa\`)
    this.notifyCouncil('harvested')
  }
}

class Merchant extends Villager {
  baskets = 0

  buyRice(baskets: number): void {
    this.baskets = baskets
    console.log(\`💰 \${this.name}: mua \${baskets} thúng lúa ở làng bên\`)
    this.notifyCouncil('rice_bought')
  }
}

class Potter extends Villager {
  makeJars(count: number): void {
    console.log(\`🏺 \${this.name}: nặn xong \${count} chum\`)
    this.notifyCouncil('jars_ready')
  }
}

// Concrete Mediator: holds every component and decides who acts next
class VillageCouncil implements Mediator {
  private static readonly NEED = 100 // baskets the village eats until the next harvest
  private static readonly BASKETS_PER_JAR = 10

  constructor(
    private farmer: Farmer,
    private merchant: Merchant,
    private potter: Potter,
  ) {
    for (const villager of [farmer, merchant, potter]) villager.mediator = this
  }

  notify(sender: Villager, event: string): void {
    if (sender === this.farmer && event === 'harvested') {
      const shortfall = VillageCouncil.NEED - this.farmer.baskets
      if (shortfall > 0) {
        console.log(\`⚖️ Hội đồng: mất mùa, làng còn thiếu \${shortfall} thúng\`)
        this.merchant.buyRice(shortfall)
      } else {
        this.orderJars(this.farmer.baskets)
      }
    } else if (sender === this.merchant && event === 'rice_bought') {
      this.orderJars(this.farmer.baskets + this.merchant.baskets)
    } else if (sender === this.potter && event === 'jars_ready') {
      console.log('⚖️ Hội đồng: lúa đã vào chum, làng đủ ăn tới vụ sau')
    }
  }

  // The jar order depends on what two other villagers did
  private orderJars(baskets: number): void {
    const jars = Math.ceil(baskets / VillageCouncil.BASKETS_PER_JAR)
    console.log(\`⚖️ Hội đồng: \${baskets} thúng lúa cần \${jars} chum\`)
    this.potter.makeJars(jars)
  }
}

// Client code: links the components to the mediator, then triggers one event
const farmer = new Farmer('Nông dân Nguyễn')
const merchant = new Merchant('Thương nhân Lê')
const potter = new Potter('Thợ gốm Trần')
new VillageCouncil(farmer, merchant, potter)

// A poor season: the harvest falls short of what the village needs
farmer.harvest(60)

// A component without a mediator still works on its own
console.log('---')
new Potter('Thợ gốm Bát Tràng').makeJars(3)`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'Components are classes with business logic. Each holds a reference to a mediator typed as the mediator interface, so it does not know the mediator\'s concrete class and can be reused with a different mediator.' },
        { type: 'paragraph', text: 'Mediator declares methods for communicating with components, usually one notification method. Components may pass any context as arguments, including themselves, as long as the receiving component does not become coupled to the sender\'s class.' },
        { type: 'paragraph', text: 'Concrete Mediators hold the relations between components. They often keep references to all the components they manage and sometimes manage their lifecycle. A component only notifies the mediator; the mediator identifies the sender and decides which component acts next. The sender does not know who handles its request, and the receiver does not know who sent it.' },
        { type: 'paragraph', text: 'Here Villager is the base component holding the Mediator reference, Farmer, Merchant and Potter are concrete components, and VillageCouncil is the concrete mediator. VillageCouncil references all three concrete components; the diagram draws this as one "manages" arrow to Villager. The client code at the end of each sample only links the components to VillageCouncil and triggers the first event.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Component là các lớp chứa logic nghiệp vụ. Mỗi component giữ một tham chiếu tới mediator theo kiểu giao diện mediator, nên nó không biết lớp cụ thể của mediator và có thể dùng lại với một mediator khác.' },
        { type: 'paragraph', text: 'Mediator khai báo các phương thức giao tiếp với component, thường chỉ một phương thức thông báo. Component có thể truyền bất kỳ ngữ cảnh nào làm đối số, kể cả chính nó, miễn là component nhận không bị phụ thuộc vào lớp của bên gửi.' },
        { type: 'paragraph', text: 'Concrete Mediator giữ các quan hệ giữa component. Nó thường giữ tham chiếu tới mọi component mà nó quản lý và đôi khi quản lý cả vòng đời của chúng. Component chỉ báo cho mediator; mediator nhận ra bên gửi và quyết định component nào làm tiếp. Bên gửi không biết ai xử lý yêu cầu, bên nhận không biết ai đã gửi.' },
        { type: 'paragraph', text: 'Ở đây Villager là component cơ sở giữ tham chiếu Mediator, Farmer, Merchant và Potter là các component cụ thể, còn VillageCouncil là mediator cụ thể. VillageCouncil tham chiếu tới cả ba component cụ thể; sơ đồ vẽ điều này bằng một mũi tên "manages" tới Villager. Mã client ở cuối mỗi ví dụ chỉ nối các component với VillageCouncil và kích hoạt sự kiện đầu tiên.' },
      ],
    },
  },

  {
    id: 'memento',
    slug: 'memento',
    name: { en: 'Memento', vi: 'Ghi nhớ' },
    category: 'behavioral',
    complexity: 2,
    popularity: 1,
    also_known_as: [{ en: 'Snapshot', vi: 'Ảnh chụp trạng thái' }],
    intent: {
      en: 'Memento is a behavioral design pattern that lets you save and restore an earlier state of an object without revealing the details of its implementation.',
      vi: 'Memento là mẫu thiết kế hành vi, cho phép lưu và khôi phục một trạng thái trước đó của đối tượng mà không để lộ chi tiết cài đặt của nó.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'A text editor formats text and inserts images, and users should be able to undo any operation. The direct approach is to record the state of every object before each operation, then restore the latest record on undo.' },
        { type: 'paragraph', text: 'Producing that record is the hard part. Copying an object\'s fields from outside works only if the fields are accessible, and most real objects keep important data private. Even with public state, every refactoring that adds or removes a field also forces changes in the classes that copy it.' },
        { type: 'paragraph', text: 'The record itself is a problem too. It needs at least the text, the cursor position and the scroll position, so it becomes a class with many fields and almost no methods. If other objects must read and write it, its fields must be public, which exposes all of the editor\'s state. You seem to choose between exposing internals, which makes classes fragile, and hiding them, which makes snapshots impossible.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Một trình soạn thảo văn bản định dạng chữ và chèn ảnh, và người dùng phải hoàn tác được mọi thao tác. Cách làm trực tiếp là ghi lại trạng thái của mọi đối tượng trước mỗi thao tác, rồi khôi phục bản ghi gần nhất khi hoàn tác.' },
        { type: 'paragraph', text: 'Khó nhất là tạo bản ghi. Chép các trường của đối tượng từ bên ngoài chỉ làm được khi các trường đó truy cập được, trong khi phần lớn đối tượng thực tế giữ dữ liệu quan trọng ở dạng private. Kể cả khi trạng thái là public, mỗi lần tái cấu trúc thêm hay bớt trường cũng buộc phải sửa các lớp chịu trách nhiệm sao chép.' },
        { type: 'paragraph', text: 'Bản thân bản ghi cũng là vấn đề. Nó cần ít nhất nội dung văn bản, vị trí con trỏ và vị trí cuộn, nên thành một lớp nhiều trường mà gần như không có phương thức. Nếu đối tượng khác phải đọc và ghi nó, các trường phải là public, làm lộ toàn bộ trạng thái của trình soạn thảo. Có vẻ như chỉ còn hai lựa chọn: để lộ chi tiết bên trong khiến lớp dễ vỡ, hoặc che chúng đi khiến không tạo được bản ghi.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'The trouble comes from broken encapsulation: some objects reach into others to collect data. Memento gives the job of making a snapshot to the owner of the state, the originator. The editor makes its own snapshot, because it has full access to its own state.' },
        { type: 'paragraph', text: 'The snapshot is stored in an object called a memento. Only the originator that produced it should read its contents. Other objects use a narrow interface that may show metadata, such as creation time or the operation name, but not the saved state.' },
        { type: 'paragraph', text: 'Mementos can then be kept by other objects, called caretakers. A caretaker uses only the narrow interface, so it cannot change the stored state, while the originator reads the memento and restores itself. In the editor, a history class is the caretaker: it pushes a memento before each operation, and on undo it pops the latest one and passes it back to the editor.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Rắc rối bắt nguồn từ việc phá vỡ tính đóng gói: một số đối tượng thò vào bên trong đối tượng khác để lấy dữ liệu. Memento giao việc tạo ảnh chụp cho chính chủ của trạng thái, tức originator. Trình soạn thảo tự tạo ảnh chụp của mình, vì nó có toàn quyền truy cập trạng thái của chính nó.' },
        { type: 'paragraph', text: 'Ảnh chụp được lưu trong một đối tượng gọi là memento. Chỉ originator đã tạo ra nó mới nên đọc nội dung bên trong. Các đối tượng khác dùng một giao diện hẹp, có thể cho xem siêu dữ liệu như thời điểm tạo hay tên thao tác, nhưng không cho xem trạng thái đã lưu.' },
        { type: 'paragraph', text: 'Nhờ vậy memento có thể do đối tượng khác cất giữ, gọi là caretaker. Caretaker chỉ dùng giao diện hẹp nên không sửa được trạng thái đã lưu, còn originator đọc memento và tự khôi phục. Trong trình soạn thảo, một lớp lịch sử làm caretaker: nó đẩy một memento vào ngăn xếp trước mỗi thao tác, và khi hoàn tác thì lấy memento mới nhất ra trả lại cho trình soạn thảo.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Memento when:' },
        { type: 'list', items: [
          'you need snapshots of an object\'s state, including private fields, to restore it later, as in undo or in rolling back a failed transaction;',
          'direct access to the object\'s fields, getters or setters would break its encapsulation.',
        ] },
        { type: 'paragraph', text: 'The object itself creates the snapshot, and other objects handle it without reading its contents.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Memento khi:' },
        { type: 'list', items: [
          'cần ảnh chụp trạng thái của đối tượng, kể cả các trường private, để khôi phục về sau, như khi hoàn tác hay quay lui một giao dịch bị lỗi;',
          'truy cập trực tiếp vào trường, getter hoặc setter của đối tượng sẽ phá vỡ tính đóng gói của nó.',
        ] },
        { type: 'paragraph', text: 'Chính đối tượng tạo ảnh chụp, còn các đối tượng khác cất giữ ảnh chụp mà không đọc nội dung bên trong.' },
      ],
    },
    vietnamese_example: {
      title: { en: 'Taking back a move in cờ tướng', vi: 'Xin đi lại một nước cờ tướng' },
      description: {
        en: [
          { type: 'paragraph', text: 'Two neighbours play cờ tướng (Vietnamese chess) on a sidewalk, and a bystander keeps the game in his notebook. ChessBoard is the originator: where each piece stands and whose turn it is are private, and only the board copies them with save() or puts them back with restore().' },
          { type: 'paragraph', text: 'Each copy is a BoardSnapshot, an immutable concrete memento that receives its label, squares and turn once, through its constructor. MoveHistory is the caretaker. Before every move, play() asks the board for a snapshot, labels it with the move, such as "Nước 3: Pháo 5 tấn 4" (move 3: the cannon on file 5 advances four points), and pushes it onto a stack. It handles snapshots only through the Snapshot interface, which exposes only getLabel().' },
          { type: 'paragraph', text: 'In the sample, Red\'s cannon takes a soldier. Red then sees that Black\'s horse can take the cannon and asks "xin đi lại", to take the move back, which friendly games may allow. takeBack() pops the last snapshot and hands it to the board, which restores its own squares and turn: the soldier returns and it is Red\'s move again. The bystander decides when to save and when to roll back, but never reads or changes a position.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Hai ông hàng xóm đánh cờ tướng trên vỉa hè, còn một người đứng xem ghi ván cờ vào sổ. ChessBoard là originator: vị trí từng quân và lượt đi là dữ liệu private, chỉ bàn cờ chép được chúng bằng save() hoặc đặt lại bằng restore().' },
          { type: 'paragraph', text: 'Mỗi bản chép là một BoardSnapshot, memento cụ thể bất biến, nhận nhãn, vị trí các quân và lượt đi đúng một lần qua hàm khởi tạo. MoveHistory là caretaker. Trước mỗi nước, play() xin bàn cờ một bản chép, ghi nhãn theo nước đi, ví dụ "Nước 3: Pháo 5 tấn 4", rồi đưa vào ngăn xếp. Nó chỉ làm việc với bản chép qua giao diện Snapshot, giao diện này chỉ có getLabel().' },
          { type: 'paragraph', text: 'Trong ví dụ, Pháo đỏ ăn một quân Tốt. Bên Đỏ nhận ra Mã đen giờ có thể ăn Pháo nên xin đi lại, điều mà ván cờ giữa bạn bè có thể châm chước. takeBack() lấy bản chép mới nhất ra và trả cho bàn cờ để bàn cờ tự khôi phục vị trí các quân và lượt đi: quân Tốt trở về và lại đến lượt Đỏ. Người xem quyết định lúc nào chép và lúc nào quay lại, nhưng không bao giờ đọc hay sửa thế cờ.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod


# Memento interface: all the caretaker may read is the label
class Snapshot(ABC):
    @abstractmethod
    def get_label(self) -> str: ...


# Concrete Memento: a frozen copy of the board, filled once in the constructor
class BoardSnapshot(Snapshot):
    def __init__(self, label: str, squares: dict[str, str], turn: str) -> None:
        self._label = label
        self._squares = dict(squares)  # a copy: later moves don't change it
        self._turn = turn

    def get_label(self) -> str:
        return self._label

    # Meant for the originator only
    def get_state(self) -> tuple[dict[str, str], str]:
        return dict(self._squares), self._turn


# Squares: files a–i from Red's left, ranks 0–9 from Red's side
def opening_position() -> dict[str, str]:
    squares: dict[str, str] = {}
    back_rank = ["Xe", "Mã", "Tượng", "Sĩ", "Tướng", "Sĩ", "Tượng", "Mã", "Xe"]
    for side, back, cannons, soldiers in (("đỏ", 0, 2, 3), ("đen", 9, 7, 6)):
        for file, piece in zip("abcdefghi", back_rank):
            squares[f"{file}{back}"] = f"{piece} {side}"
        for file in "bh":
            squares[f"{file}{cannons}"] = f"Pháo {side}"
        for file in "acegi":
            squares[f"{file}{soldiers}"] = f"Tốt {side}"
    return squares


# Originator: only the board knows where every piece stands and whose turn it is
class ChessBoard:
    def __init__(self) -> None:
        self._squares = opening_position()
        self._turn = "Đỏ"

    # The board only moves pieces; keeping to the rules is up to the players
    def move(self, notation: str, start: str, end: str) -> None:
        captured = self._squares.get(end)
        self._squares[end] = self._squares.pop(start)
        print(f"{self._turn} đi {notation}" + (f", ăn {captured}" if captured else ""))
        self._turn = "Đen" if self._turn == "Đỏ" else "Đỏ"

    def status(self) -> str:
        red = sum(piece.endswith("đỏ") for piece in self._squares.values())
        black = len(self._squares) - red
        return f"Đỏ {red} quân, Đen {black} quân, lượt {self._turn}"

    def save(self, label: str) -> Snapshot:
        return BoardSnapshot(label, self._squares, self._turn)

    def restore(self, snapshot: Snapshot) -> None:
        # The originator works with the concrete memento class directly
        if not isinstance(snapshot, BoardSnapshot):
            raise TypeError("Không phải thế cờ của bàn này")
        self._squares, self._turn = snapshot.get_state()
        print(f'↩️ Rút lại "{snapshot.get_label()}": {self.status()}')


# Caretaker: saves before every move and can take one back,
# but sees nothing of a snapshot except its label
class MoveHistory:
    def __init__(self, board: ChessBoard) -> None:
        self._board = board
        self._snapshots: list[Snapshot] = []

    def play(self, notation: str, start: str, end: str) -> None:
        label = f"Nước {len(self._snapshots) + 1}: {notation}"
        self._snapshots.append(self._board.save(label))
        self._board.move(notation, start, end)

    def take_back(self) -> None:
        if self._snapshots:
            self._board.restore(self._snapshots.pop())

    def show_moves(self) -> None:
        print("📒 Sổ ghi: " + " | ".join(s.get_label() for s in self._snapshots))


board = ChessBoard()
notebook = MoveHistory(board)

notebook.play("Pháo 2 bình 5", "h2", "e2")
notebook.play("Mã 8 tấn 7", "h9", "g7")
# The cannon takes the middle soldier, but the horse on g7 can now take the cannon
notebook.play("Pháo 5 tấn 4", "e2", "e6")
print(f"Thế cờ: {board.status()}")

print('Đỏ: "Cho xin đi lại!"')
notebook.take_back()

notebook.play("Mã 2 tấn 3", "h0", "g2")
notebook.show_moves()

# Output:
# Đỏ đi Pháo 2 bình 5
# Đen đi Mã 8 tấn 7
# Đỏ đi Pháo 5 tấn 4, ăn Tốt đen
# Thế cờ: Đỏ 16 quân, Đen 15 quân, lượt Đen
# Đỏ: "Cho xin đi lại!"
# ↩️ Rút lại "Nước 3: Pháo 5 tấn 4": Đỏ 16 quân, Đen 16 quân, lượt Đỏ
# Đỏ đi Mã 2 tấn 3
# 📒 Sổ ghi: Nước 1: Pháo 2 bình 5 | Nước 2: Mã 8 tấn 7 | Nước 3: Mã 2 tấn 3`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `type Side = 'Đỏ' | 'Đen'

// Memento interface: all the caretaker may read is the label
interface Snapshot {
  getLabel(): string
}

// Concrete Memento: a frozen copy of the board, filled once in the constructor
class BoardSnapshot implements Snapshot {
  private readonly squares: ReadonlyMap<string, string>

  constructor(private readonly label: string, squares: Map<string, string>, private readonly turn: Side) {
    this.squares = new Map(squares) // a copy: later moves don't change it
  }

  getLabel(): string { return this.label }

  // Meant for the originator only
  getState(): [Map<string, string>, Side] { return [new Map(this.squares), this.turn] }
}

// Squares: files a–i from Red's left, ranks 0–9 from Red's side
function openingPosition(): Map<string, string> {
  const squares = new Map<string, string>()
  const backRank = ['Xe', 'Mã', 'Tượng', 'Sĩ', 'Tướng', 'Sĩ', 'Tượng', 'Mã', 'Xe']
  for (const [side, back, cannons, soldiers] of [['đỏ', 0, 2, 3], ['đen', 9, 7, 6]] as const) {
    backRank.forEach((piece, i) => squares.set(\`\${'abcdefghi'[i]}\${back}\`, \`\${piece} \${side}\`))
    for (const file of 'bh') squares.set(\`\${file}\${cannons}\`, \`Pháo \${side}\`)
    for (const file of 'acegi') squares.set(\`\${file}\${soldiers}\`, \`Tốt \${side}\`)
  }
  return squares
}

// Originator: only the board knows where every piece stands and whose turn it is
class ChessBoard {
  private squares = openingPosition()
  private turn: Side = 'Đỏ'

  // The board only moves pieces; keeping to the rules is up to the players
  move(notation: string, start: string, end: string): void {
    const captured = this.squares.get(end)
    this.squares.set(end, this.squares.get(start)!)
    this.squares.delete(start)
    console.log(\`\${this.turn} đi \${notation}\${captured ? \`, ăn \${captured}\` : ''}\`)
    this.turn = this.turn === 'Đỏ' ? 'Đen' : 'Đỏ'
  }

  status(): string {
    const red = [...this.squares.values()].filter(piece => piece.endsWith('đỏ')).length
    return \`Đỏ \${red} quân, Đen \${this.squares.size - red} quân, lượt \${this.turn}\`
  }

  save(label: string): Snapshot {
    return new BoardSnapshot(label, this.squares, this.turn)
  }

  restore(snapshot: Snapshot): void {
    // The originator works with the concrete memento class directly
    if (!(snapshot instanceof BoardSnapshot)) throw new Error('Không phải thế cờ của bàn này')
    ;[this.squares, this.turn] = snapshot.getState()
    console.log(\`↩️ Rút lại "\${snapshot.getLabel()}": \${this.status()}\`)
  }
}

// Caretaker: saves before every move and can take one back,
// but sees nothing of a snapshot except its label
class MoveHistory {
  private snapshots: Snapshot[] = []

  constructor(private board: ChessBoard) {}

  play(notation: string, start: string, end: string): void {
    this.snapshots.push(this.board.save(\`Nước \${this.snapshots.length + 1}: \${notation}\`))
    this.board.move(notation, start, end)
  }

  takeBack(): void {
    const snapshot = this.snapshots.pop()
    if (snapshot) this.board.restore(snapshot)
  }

  showMoves(): void {
    console.log('📒 Sổ ghi: ' + this.snapshots.map(s => s.getLabel()).join(' | '))
  }
}

const board = new ChessBoard()
const notebook = new MoveHistory(board)

notebook.play('Pháo 2 bình 5', 'h2', 'e2')
notebook.play('Mã 8 tấn 7', 'h9', 'g7')
// The cannon takes the middle soldier, but the horse on g7 can now take the cannon
notebook.play('Pháo 5 tấn 4', 'e2', 'e6')
console.log(\`Thế cờ: \${board.status()}\`)

console.log('Đỏ: "Cho xin đi lại!"')
notebook.takeBack()

notebook.play('Mã 2 tấn 3', 'h0', 'g2')
notebook.showMoves()`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'Three roles take part:' },
        { type: 'list', items: [
          'Originator is the object whose state may need to come back; it is the only class meant to write and read a memento\'s state.',
          'Memento records the originator\'s state at one moment, set once and never changed.',
          'Caretaker keeps mementos and decides when to take one and when to hand one back, but never looks inside.',
        ] },
        { type: 'paragraph', text: 'The Gang of Four describe two interfaces on a memento: a wide one for the originator, which may read everything, and a narrow one for other objects, which shows only what is safe to share, such as a label. In C++ the memento can declare the originator a friend, and in Java or C# it can be a nested class of the originator.' },
        { type: 'paragraph', text: 'TypeScript and Python have neither mechanism, so these samples use an interface for the narrow side. MoveHistory sees each snapshot only as a Snapshot with getLabel(). ChessBoard checks that it received a BoardSnapshot before calling getState(). getState() is still a public method, TypeScript private is checked only at compile time, and a leading underscore in Python is only a naming convention, so code that deliberately casts or reaches into the object can still read the state.' },
        { type: 'paragraph', text: 'Watch the cost when mementos are taken often. Copying a 32-piece board before each move is cheap, but a memento of a large object may need to store only what changed since the previous one.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Có ba vai trò:' },
        { type: 'list', items: [
          'Originator là đối tượng mà trạng thái có thể cần lấy lại; nó là lớp duy nhất được định ra để ghi và đọc trạng thái trong memento.',
          'Memento ghi lại trạng thái của originator tại một thời điểm, được gán một lần và không thay đổi.',
          'Caretaker cất giữ memento, quyết định lúc nào lấy một bản và lúc nào trả lại, nhưng không bao giờ nhìn vào bên trong.',
        ] },
        { type: 'paragraph', text: 'Gang of Four mô tả memento có hai giao diện: giao diện rộng cho originator, được đọc mọi thứ, và giao diện hẹp cho các đối tượng khác, chỉ cho thấy những gì an toàn để chia sẻ, chẳng hạn một cái nhãn. Trong C++, memento có thể khai báo originator là friend; trong Java hay C#, memento có thể là lớp lồng trong originator.' },
        { type: 'paragraph', text: 'TypeScript và Python không có hai cơ chế này, nên các ví dụ dùng một giao diện cho phía hẹp. MoveHistory chỉ thấy mỗi bản chép như một Snapshot có getLabel(). ChessBoard kiểm tra mình nhận được BoardSnapshot rồi mới gọi getState(). Tuy vậy getState() vẫn là phương thức public, private trong TypeScript chỉ được kiểm tra lúc biên dịch, còn dấu gạch dưới đầu tên trong Python chỉ là quy ước, nên đoạn mã cố tình ép kiểu hoặc thò vào đối tượng vẫn đọc được trạng thái.' },
        { type: 'paragraph', text: 'Hãy để ý chi phí khi memento được tạo thường xuyên. Chép một bàn cờ 32 quân trước mỗi nước đi thì rẻ, nhưng memento của một đối tượng lớn có thể chỉ nên lưu phần đã thay đổi so với bản trước.' },
      ],
    },
  },

  {
    id: 'observer',
    slug: 'observer',
    name: { en: 'Observer', vi: 'Người quan sát' },
    category: 'behavioral',
    complexity: 2,
    popularity: 3,
    also_known_as: [
      { en: 'Event-Subscriber', vi: 'Người đăng ký sự kiện' },
      { en: 'Listener', vi: 'Trình lắng nghe' },
    ],
    intent: {
      en: 'Observer is a behavioral design pattern that defines a subscription mechanism. One object, the publisher, notifies every object that has subscribed to it when an event happens.',
      vi: 'Observer là mẫu thiết kế hành vi, định nghĩa một cơ chế đăng ký. Một đối tượng, gọi là bên phát (publisher), báo cho mọi đối tượng đã đăng ký với nó mỗi khi có sự kiện xảy ra.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'Consider two objects, a Customer and a Store. The customer wants a product that will arrive at the store soon. The customer could visit every day to check, but until the product arrives, most of those trips are wasted.' },
        { type: 'paragraph', text: 'Alternatively, the store could email every customer whenever any product arrives. That saves some customers a trip but annoys those who are not interested. Either the customer wastes time checking, or the store wastes effort notifying the wrong people.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Xét hai đối tượng, khách hàng (Customer) và cửa hàng (Store). Khách hàng muốn mua một sản phẩm sắp về cửa hàng. Khách có thể ghé mỗi ngày để xem, nhưng trước khi hàng về, phần lớn những chuyến đi đó là phí công.' },
        { type: 'paragraph', text: 'Ngược lại, cửa hàng có thể gửi email cho mọi khách hàng mỗi khi có bất kỳ sản phẩm nào về. Cách này giúp vài khách khỏi đi lại nhưng làm phiền những người không quan tâm. Hoặc khách hàng mất thời gian kiểm tra, hoặc cửa hàng tốn công báo nhầm người.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'The object whose state others care about is often called the subject. Because it also sends notifications, it is called the publisher here. The objects that want to know about its changes are subscribers.' },
        { type: 'paragraph', text: 'The publisher gets a subscription mechanism: a list of references to subscribers, plus public methods that add a subscriber to the list and remove one from it. When an important event happens, the publisher goes through the list and calls a notification method on each subscriber.' },
        { type: 'paragraph', text: 'A publisher may have many subscriber classes, some written after the publisher. To avoid coupling to them, every subscriber implements the same interface, and the publisher calls subscribers only through it. That interface declares the notification method and its parameters for event data. If there are several kinds of publisher, they can share a publisher interface with the subscription methods.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Đối tượng có trạng thái mà đối tượng khác quan tâm thường được gọi là subject. Vì nó còn gửi thông báo, ở đây ta gọi nó là bên phát (publisher). Các đối tượng muốn biết khi nó thay đổi là bên đăng ký (subscriber).' },
        { type: 'paragraph', text: 'Bên phát có thêm một cơ chế đăng ký: một danh sách tham chiếu tới các bên đăng ký, cùng các phương thức public để thêm một bên đăng ký vào danh sách và xóa khỏi danh sách. Khi có sự kiện quan trọng, bên phát duyệt danh sách và gọi một phương thức thông báo trên từng bên đăng ký.' },
        { type: 'paragraph', text: 'Một bên phát có thể có nhiều lớp đăng ký, kể cả những lớp được viết sau nó. Để không phụ thuộc vào chúng, mọi bên đăng ký triển khai cùng một giao diện, và bên phát chỉ gọi chúng qua giao diện đó. Giao diện này khai báo phương thức thông báo cùng các tham số chứa dữ liệu sự kiện. Nếu có nhiều loại bên phát, chúng có thể dùng chung một giao diện bên phát chứa các phương thức đăng ký.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Observer when:' },
        { type: 'list', items: [
          'a change in one object may require changes in others, and the set of those objects is not known in advance or changes at runtime;',
          'some objects must observe others only for a while or only in certain cases.',
        ] },
        { type: 'paragraph', text: 'Graphical interfaces are a common case: a button class offers a subscription mechanism, and clients attach their own code through subscriber classes. Because the subscription list is dynamic, subscribers can join or leave whenever they need to.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Observer khi:' },
        { type: 'list', items: [
          'thay đổi ở một đối tượng có thể đòi hỏi thay đổi ở các đối tượng khác, và tập các đối tượng đó không biết trước hoặc thay đổi lúc chạy;',
          'một số đối tượng chỉ cần quan sát đối tượng khác trong một thời gian hoặc trong những trường hợp nhất định.',
        ] },
        { type: 'paragraph', text: 'Giao diện đồ họa là trường hợp hay gặp: lớp nút bấm cung cấp cơ chế đăng ký, và client gắn mã của mình qua các lớp đăng ký. Vì danh sách đăng ký là động, bên đăng ký có thể tham gia hoặc rời đi khi cần.' },
      ],
    },
    vietnamese_example: {
      title: { en: 'A village drum signal', vi: 'Tiếng trống làng báo hiệu' },
      description: {
        en: [
          { type: 'paragraph', text: 'This example imagines a bronze drum, in the style of the Đông Sơn drums, used to signal a village. It is a teaching analogy; how those ancient drums were actually used is still discussed by historians.' },
          { type: 'paragraph', text: 'BronzeDrum is the publisher. It keeps a list of Listener objects, lets villagers join with subscribe() and leave with unsubscribe(), and when struck with strike() it stores the new signal in signal and calls notifyListeners(), which calls react() on every listener in the list.' },
          { type: 'paragraph', text: 'Listener is the subscriber interface. Farmer, Soldier and Trader are concrete subscribers that react differently to the same beat: on an invasion alarm, the farmer runs back to the village, the soldier takes up arms and the trader closes his stall. The drum passes itself to react(), so each subscriber reads the signal itself.' },
          { type: 'paragraph', text: 'The client creates the drum and the villagers separately and registers them. Later the trader unsubscribes before a long trip, so he no longer reacts to the festival drum. A new kind of villager is one new subscriber class, with no change to BronzeDrum.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Ví dụ này hình dung một chiếc trống đồng, theo kiểu trống Đông Sơn, được dùng để báo hiệu cho một làng. Đây là phép so sánh để minh họa; công dụng thực sự của những chiếc trống cổ ấy vẫn còn được giới sử học bàn luận.' },
          { type: 'paragraph', text: 'BronzeDrum là bên phát. Nó giữ danh sách các đối tượng Listener, cho dân làng tham gia bằng subscribe() và rời đi bằng unsubscribe(). Khi được đánh bằng strike(), nó lưu tín hiệu mới vào signal rồi gọi notifyListeners(), phương thức này gọi react() trên từng người trong danh sách.' },
          { type: 'paragraph', text: 'Listener là giao diện bên đăng ký. Farmer, Soldier và Trader là các bên đăng ký cụ thể, phản ứng khác nhau với cùng một hồi trống: khi trống báo giặc, nông dân chạy vào làng, người lính cầm vũ khí, thương nhân đóng hàng. Trống truyền chính nó vào react(), nên mỗi bên đăng ký tự đọc tín hiệu.' },
          { type: 'paragraph', text: 'Client tạo trống và dân làng riêng rẽ rồi đăng ký họ. Sau đó thương nhân hủy đăng ký trước chuyến đi buôn xa, nên không còn phản ứng với tiếng trống lễ hội. Thêm một kiểu dân làng mới chỉ cần thêm một lớp đăng ký, không phải sửa BronzeDrum.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from typing import List


# Subscriber interface: the one method the publisher calls on every subscriber
class Listener(ABC):
    @abstractmethod
    def react(self, drum: "BronzeDrum") -> None: ...


# Publisher: owns the subscription list and sends each event to every subscriber
class BronzeDrum:
    def __init__(self) -> None:
        self._listeners: List[Listener] = []
        self.signal = ""  # state that subscribers care about

    # Subscription management: listeners join and leave the list
    def subscribe(self, listener: Listener) -> None:
        self._listeners.append(listener)

    def unsubscribe(self, listener: Listener) -> None:
        self._listeners.remove(listener)

    # Notification: the publisher passes itself so each subscriber can read the signal
    def notify_listeners(self) -> None:
        for listener in self._listeners:
            listener.react(self)

    # Main business logic: change state, then notify
    def strike(self, signal: str) -> None:
        self.signal = signal
        print(f"🥁 Trống đồng: {signal}")
        self.notify_listeners()


# Concrete Subscribers: each reacts to the same event in its own way
class Farmer(Listener):
    def __init__(self, name: str) -> None:
        self.name = name

    def react(self, drum: BronzeDrum) -> None:
        if "giặc" in drum.signal:
            print(f"  🌾 {self.name}: Bỏ cày, chạy vào làng!")
        else:
            print(f"  🌾 {self.name}: Mặc áo đẹp đi xem hội!")


class Soldier(Listener):
    def __init__(self, name: str) -> None:
        self.name = name

    def react(self, drum: BronzeDrum) -> None:
        if "giặc" in drum.signal:
            print(f"  ⚔️ {self.name}: Cầm vũ khí, tập hợp đội hình!")
        else:
            print(f"  ⚔️ {self.name}: Canh gác lễ hội!")


class Trader(Listener):
    def __init__(self, name: str) -> None:
        self.name = name

    def react(self, drum: BronzeDrum) -> None:
        if "giặc" in drum.signal:
            print(f"  🏪 {self.name}: Đóng hàng, cất tiền!")
        else:
            print(f"  🏪 {self.name}: Mở hàng bán đồ lễ hội!")


# Client: creates the publisher and subscribers separately, then registers them
bronze_drum = BronzeDrum()
trader = Trader("Lê C")
bronze_drum.subscribe(Farmer("Nguyễn A"))
bronze_drum.subscribe(Soldier("Trần B"))
bronze_drum.subscribe(trader)

print("=== Tiếng trống báo giặc ===")
bronze_drum.strike("giặc đến!")

# Subscribers can leave the list at runtime
print("=== Lê C đi buôn xa, hủy đăng ký ===")
bronze_drum.unsubscribe(trader)

print("=== Tiếng trống báo lễ hội ===")
bronze_drum.strike("lễ hội Đền Hùng!")

# Output:
# === Tiếng trống báo giặc ===
# 🥁 Trống đồng: giặc đến!
#   🌾 Nguyễn A: Bỏ cày, chạy vào làng!
#   ⚔️ Trần B: Cầm vũ khí, tập hợp đội hình!
#   🏪 Lê C: Đóng hàng, cất tiền!
# === Lê C đi buôn xa, hủy đăng ký ===
# === Tiếng trống báo lễ hội ===
# 🥁 Trống đồng: lễ hội Đền Hùng!
#   🌾 Nguyễn A: Mặc áo đẹp đi xem hội!
#   ⚔️ Trần B: Canh gác lễ hội!`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Subscriber interface: the one method the publisher calls on every subscriber
interface Listener {
  react(drum: BronzeDrum): void
}

// Publisher: owns the subscription list and sends each event to every subscriber
class BronzeDrum {
  private listeners: Listener[] = []
  signal = '' // state that subscribers care about

  // Subscription management: listeners join and leave the list
  subscribe(listener: Listener): void {
    this.listeners.push(listener)
  }

  unsubscribe(listener: Listener): void {
    this.listeners = this.listeners.filter(x => x !== listener)
  }

  // Notification: the publisher passes itself so each subscriber can read the signal
  notifyListeners(): void {
    for (const listener of this.listeners) listener.react(this)
  }

  // Main business logic: change state, then notify
  strike(signal: string): void {
    this.signal = signal
    console.log(\`🥁 Trống đồng: \${signal}\`)
    this.notifyListeners()
  }
}

// Concrete Subscribers: each reacts to the same event in its own way
class Farmer implements Listener {
  constructor(private name: string) {}
  react(drum: BronzeDrum): void {
    const action = drum.signal.includes('giặc') ? 'Bỏ cày, chạy vào làng!' : 'Mặc áo đẹp đi xem hội!'
    console.log(\`  🌾 \${this.name}: \${action}\`)
  }
}

class Soldier implements Listener {
  constructor(private name: string) {}
  react(drum: BronzeDrum): void {
    const action = drum.signal.includes('giặc') ? 'Cầm vũ khí, tập hợp đội hình!' : 'Canh gác lễ hội!'
    console.log(\`  ⚔️ \${this.name}: \${action}\`)
  }
}

class Trader implements Listener {
  constructor(private name: string) {}
  react(drum: BronzeDrum): void {
    const action = drum.signal.includes('giặc') ? 'Đóng hàng, cất tiền!' : 'Mở hàng bán đồ lễ hội!'
    console.log(\`  🏪 \${this.name}: \${action}\`)
  }
}

// Client: creates the publisher and subscribers separately, then registers them
const bronzeDrum = new BronzeDrum()
const trader = new Trader('Lê C')
bronzeDrum.subscribe(new Farmer('Nguyễn A'))
bronzeDrum.subscribe(new Soldier('Trần B'))
bronzeDrum.subscribe(trader)

console.log('=== Tiếng trống báo giặc ===')
bronzeDrum.strike('giặc đến!')

// Subscribers can leave the list at runtime
console.log('=== Lê C đi buôn xa, hủy đăng ký ===')
bronzeDrum.unsubscribe(trader)

console.log('=== Tiếng trống báo lễ hội ===')
bronzeDrum.strike('lễ hội Đền Hùng!')`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'Publisher issues events that other objects care about. Events occur when the publisher changes state or runs some behavior. The publisher owns the subscription list and the methods that let subscribers join and leave it. When an event occurs, it calls the notification method on each subscriber in the list.' },
        { type: 'paragraph', text: 'Subscriber declares the notification interface, usually one update method whose parameters carry event details. Concrete Subscribers react to notifications. They all implement the same interface, so the publisher does not depend on their classes.' },
        { type: 'paragraph', text: 'Subscribers often need context to handle an update, so the publisher passes data as arguments, or passes itself so each subscriber can read what it needs. Here BronzeDrum passes itself to react(). Client creates the publisher and the subscribers separately, then registers the subscribers with the publisher. The diagram omits the optional common publisher interface because there is only one kind of publisher.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Publisher (bên phát) phát ra các sự kiện mà đối tượng khác quan tâm. Sự kiện xảy ra khi bên phát đổi trạng thái hoặc thực hiện một hành vi. Bên phát sở hữu danh sách đăng ký và các phương thức cho bên đăng ký tham gia và rời khỏi danh sách. Khi có sự kiện, nó gọi phương thức thông báo trên từng bên đăng ký trong danh sách.' },
        { type: 'paragraph', text: 'Subscriber (bên đăng ký) khai báo giao diện thông báo, thường là một phương thức update có tham số chứa chi tiết sự kiện. Concrete Subscriber phản ứng với thông báo. Tất cả triển khai cùng một giao diện, nên bên phát không phụ thuộc vào lớp của chúng.' },
        { type: 'paragraph', text: 'Bên đăng ký thường cần ngữ cảnh để xử lý thông báo, nên bên phát truyền dữ liệu làm đối số, hoặc truyền chính nó để mỗi bên đăng ký tự đọc thứ mình cần. Ở đây BronzeDrum truyền chính nó vào react(). Client tạo bên phát và các bên đăng ký riêng rẽ, rồi đăng ký chúng với bên phát. Sơ đồ không vẽ giao diện bên phát chung (tùy chọn) vì chỉ có một loại bên phát.' },
      ],
    },
  },

  {
    id: 'state',
    slug: 'state',
    name: { en: 'State', vi: 'Trạng thái' },
    category: 'behavioral',
    complexity: 1,
    popularity: 2,
    intent: {
      en: 'State is a behavioral design pattern that lets an object change its behavior when its internal state changes. The object appears to change its class.',
      vi: 'State là mẫu thiết kế hành vi, cho phép một đối tượng đổi hành vi khi trạng thái bên trong của nó thay đổi. Trông như thể đối tượng đã đổi sang một lớp khác.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'State is closely related to the finite-state machine. At any moment, a program is in one of a finite number of states, behaves differently in each, and can switch between them only along a fixed set of transitions.' },
        { type: 'paragraph', text: 'A Document can be in Draft, Moderation or Published. Its publish() method differs by state: in Draft it sends the document to moderation; in Moderation it makes the document public, but only for an administrator; in Published it does nothing.' },
        { type: 'paragraph', text: 'Such machines are usually written with many if or switch statements on field values. As states and state-dependent behaviors grow, most methods fill with large conditionals, and a change to the transition logic means editing conditionals in every method.' },
      ],
      vi: [
        { type: 'paragraph', text: 'State gắn liền với máy trạng thái hữu hạn. Tại mỗi thời điểm, chương trình ở một trong số hữu hạn trạng thái, hành xử khác nhau ở mỗi trạng thái, và chỉ chuyển trạng thái theo một tập quy tắc chuyển cố định.' },
        { type: 'paragraph', text: 'Một Document có thể ở Draft (bản nháp), Moderation (chờ duyệt) hoặc Published (đã xuất bản). Phương thức publish() khác nhau theo trạng thái: ở Draft, nó gửi tài liệu đi duyệt; ở Moderation, nó công khai tài liệu, nhưng chỉ khi người dùng là quản trị viên; ở Published, nó không làm gì.' },
        { type: 'paragraph', text: 'Máy trạng thái kiểu này thường được viết bằng nhiều lệnh if hoặc switch theo giá trị các trường. Khi số trạng thái và hành vi phụ thuộc trạng thái tăng lên, hầu hết phương thức đầy những khối điều kiện lớn, và mỗi lần đổi logic chuyển trạng thái lại phải sửa điều kiện trong mọi phương thức.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Create a class for each possible state and move the state-specific behavior into those classes. The original object, called the context, stores a reference to the object for its current state and delegates state-related work to it.' },
        { type: 'paragraph', text: 'To change state, the context replaces its state object with one that represents the new state. This works because all state classes share one interface, and the context uses them only through it.' },
        { type: 'paragraph', text: 'The structure resembles Strategy. The difference is in who chooses: in State, concrete states may know each other and trigger transitions themselves. In Strategy, the client usually chooses the strategy, and strategies rarely know about each other.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Tạo một lớp cho mỗi trạng thái có thể có và chuyển hành vi riêng của từng trạng thái vào các lớp đó. Đối tượng gốc, gọi là context, lưu tham chiếu tới đối tượng ứng với trạng thái hiện tại và ủy quyền cho nó mọi việc liên quan đến trạng thái.' },
        { type: 'paragraph', text: 'Để đổi trạng thái, context thay đối tượng trạng thái của mình bằng đối tượng ứng với trạng thái mới. Cách này làm được vì mọi lớp trạng thái dùng chung một giao diện, và context chỉ làm việc với chúng qua giao diện đó.' },
        { type: 'paragraph', text: 'Cấu trúc này giống Strategy. Khác biệt nằm ở bên quyết định: trong State, các trạng thái cụ thể có thể biết nhau và tự kích hoạt việc chuyển trạng thái. Trong Strategy, client thường chọn chiến lược, và các chiến lược hiếm khi biết về nhau.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use State when:' },
        { type: 'list', items: [
          'an object behaves differently depending on its current state, there are many states, and state-specific code changes often;',
          'a class is filled with large conditionals that change its behavior according to field values;',
          'similar states and transitions of a condition-based state machine contain a lot of duplicated code.',
        ] },
        { type: 'paragraph', text: 'Each conditional branch becomes a method of a state class, and temporary fields and helpers for state-specific code can leave the main class. Shared code can move into abstract base state classes.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng State khi:' },
        { type: 'list', items: [
          'một đối tượng hành xử khác nhau tùy trạng thái hiện tại, có nhiều trạng thái, và mã riêng của từng trạng thái thay đổi thường xuyên;',
          'một lớp đầy những khối điều kiện lớn thay đổi hành vi theo giá trị các trường;',
          'các trạng thái và cách chuyển tương tự nhau trong máy trạng thái dựa trên điều kiện chứa nhiều mã lặp lại.',
        ] },
        { type: 'paragraph', text: 'Mỗi nhánh điều kiện trở thành một phương thức của lớp trạng thái, và các trường tạm hay phương thức phụ trợ cho mã theo trạng thái có thể rời khỏi lớp chính. Mã dùng chung có thể chuyển vào các lớp trạng thái cơ sở trừu tượng.' },
      ],
    },
    vietnamese_example: {
      title: { en: 'A rice paddy through the season', vi: 'Ruộng lúa qua từng giai đoạn' },
      description: {
        en: [
          { type: 'paragraph', text: 'In this simplified season, a rice paddy passes through five stages: plowing, transplanting, growing, flowering and harvesting. RicePaddy is the context. The farmer always calls the same three methods, water(), fertilize() and harvest(), and the paddy delegates each call to its current stage object.' },
          { type: 'paragraph', text: 'RiceStage is the state. It declares those three methods and holds a backreference, paddy, set when the context\'s changeStage() installs it. Plowing, Transplanting, Growing, Flowering and Harvesting are concrete states, and the same action means something different in each: harvesting while plowing is refused, fertilizing while the rice flowers is refused, and watering at harvest is a mistake because the field must be dry.' },
          { type: 'paragraph', text: 'The states trigger the transitions themselves through the backreference: fertilize() in Plowing moves the paddy to Transplanting, harvest() in Flowering moves it to Harvesting, and finishing the harvest starts a new season with Plowing. RicePaddy contains no conditionals about the stage.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Trong một vụ lúa được giản lược, thửa ruộng trải qua năm giai đoạn: cày bừa, cấy, lúa đang lớn, trổ bông và thu hoạch. RicePaddy là context. Người nông dân luôn gọi cùng ba phương thức water(), fertilize() và harvest(), còn thửa ruộng ủy quyền mỗi lời gọi cho đối tượng giai đoạn hiện tại.' },
          { type: 'paragraph', text: 'RiceStage là state. Nó khai báo ba phương thức đó và giữ tham chiếu ngược paddy, được gán khi changeStage() của context đặt nó vào. Plowing, Transplanting, Growing, Flowering và Harvesting là các trạng thái cụ thể, và cùng một hành động mang nghĩa khác nhau ở mỗi giai đoạn: gặt lúc đang cày bừa bị từ chối, bón phân khi lúa trổ bông bị từ chối, còn tưới nước lúc thu hoạch là sai vì ruộng cần khô.' },
          { type: 'paragraph', text: 'Chính các trạng thái kích hoạt việc chuyển giai đoạn qua tham chiếu ngược: fertilize() ở Plowing chuyển ruộng sang Transplanting, harvest() ở Flowering chuyển sang Harvesting, và gặt xong thì bắt đầu vụ mới với Plowing. RicePaddy không chứa câu điều kiện nào về giai đoạn.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from __future__ import annotations
from abc import ABC, abstractmethod


# State: declares the state-specific methods and keeps a backreference to the context
class RiceStage(ABC):
    paddy: RicePaddy

    def set_paddy(self, paddy: RicePaddy) -> None:
        self.paddy = paddy

    @abstractmethod
    def water(self) -> None: ...

    @abstractmethod
    def fertilize(self) -> None: ...

    @abstractmethod
    def harvest(self) -> None: ...


# Context: stores the current state and delegates all state-specific work to it
class RicePaddy:
    def __init__(self, stage: RiceStage) -> None:
        self.change_stage(stage)

    # Setter used by the client or by states to switch the active state
    def change_stage(self, stage: RiceStage) -> None:
        print(f"  → Chuyển sang: {type(stage).__name__}")
        self._stage = stage
        stage.set_paddy(self)

    def water(self) -> None:
        self._stage.water()

    def fertilize(self) -> None:
        self._stage.fertilize()

    def harvest(self) -> None:
        self._stage.harvest()


# Concrete States: each stage handles the same actions differently
# and may trigger the transition to the next stage
class Plowing(RiceStage):
    def water(self) -> None: print("🚜 Đang cày bừa, chưa cần tưới")
    def fertilize(self) -> None:
        print("🌱 Bón lót xong, bắt đầu cấy mạ")
        self.paddy.change_stage(Transplanting())
    def harvest(self) -> None: print("❌ Chưa có lúa để gặt!")


class Transplanting(RiceStage):
    def water(self) -> None:
        print("💧 Giữ nước 5cm, mạ bén rễ")
        self.paddy.change_stage(Growing())
    def fertilize(self) -> None: print("🌿 Mạ còn yếu, chỉ bón nhẹ")
    def harvest(self) -> None: print("❌ Lúa còn non!")


class Growing(RiceStage):
    def water(self) -> None: print("💧 Tưới đều, lúa đẻ nhánh")
    def fertilize(self) -> None:
        print("🌿 Bón thúc đòng")
        self.paddy.change_stage(Flowering())
    def harvest(self) -> None: print("❌ Chưa đến vụ!")


class Flowering(RiceStage):
    def water(self) -> None: print("💧 Giữ nước nông cho lúa trổ bông")
    def fertilize(self) -> None: print("⚠️ Không bón phân khi lúa trổ bông!")
    def harvest(self) -> None:
        print("🌾 Lúa chín vàng, bắt đầu gặt!")
        self.paddy.change_stage(Harvesting())


class Harvesting(RiceStage):
    def water(self) -> None: print("⚠️ Không tưới, ruộng cần khô để gặt!")
    def fertilize(self) -> None: print("❌ Đang thu hoạch, không bón phân!")
    def harvest(self) -> None:
        print("🎉 Gặt xong, vụ mùa bội thu! Sang vụ mới")
        self.paddy.change_stage(Plowing())


# Client: sets the initial state, then only talks to the context
paddy = RicePaddy(Plowing())
paddy.harvest()    # refused while plowing
paddy.fertilize()  # Plowing → Transplanting
paddy.water()      # Transplanting → Growing
paddy.fertilize()  # Growing → Flowering
paddy.fertilize()  # same call, refused while flowering
paddy.harvest()    # Flowering → Harvesting
paddy.water()      # wrong action at harvest time
paddy.harvest()    # Harvesting → Plowing (new season)

# Output:
#   → Chuyển sang: Plowing
# ❌ Chưa có lúa để gặt!
# 🌱 Bón lót xong, bắt đầu cấy mạ
#   → Chuyển sang: Transplanting
# 💧 Giữ nước 5cm, mạ bén rễ
#   → Chuyển sang: Growing
# 🌿 Bón thúc đòng
#   → Chuyển sang: Flowering
# ⚠️ Không bón phân khi lúa trổ bông!
# 🌾 Lúa chín vàng, bắt đầu gặt!
#   → Chuyển sang: Harvesting
# ⚠️ Không tưới, ruộng cần khô để gặt!
# 🎉 Gặt xong, vụ mùa bội thu! Sang vụ mới
#   → Chuyển sang: Plowing`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// State: declares the state-specific methods and keeps a backreference to the context
abstract class RiceStage {
  protected paddy!: RicePaddy

  setPaddy(paddy: RicePaddy): void {
    this.paddy = paddy
  }

  abstract water(): void
  abstract fertilize(): void
  abstract harvest(): void
}

// Context: stores the current state and delegates all state-specific work to it
class RicePaddy {
  private stage!: RiceStage

  constructor(stage: RiceStage) {
    this.changeStage(stage)
  }

  // Setter used by the client or by states to switch the active state
  changeStage(stage: RiceStage): void {
    console.log(\`  → Chuyển sang: \${stage.constructor.name}\`)
    this.stage = stage
    stage.setPaddy(this)
  }

  water(): void { this.stage.water() }
  fertilize(): void { this.stage.fertilize() }
  harvest(): void { this.stage.harvest() }
}

// Concrete States: each stage handles the same actions differently
// and may trigger the transition to the next stage
class Plowing extends RiceStage {
  water(): void { console.log('🚜 Đang cày bừa, chưa cần tưới') }
  fertilize(): void {
    console.log('🌱 Bón lót xong, bắt đầu cấy mạ')
    this.paddy.changeStage(new Transplanting())
  }
  harvest(): void { console.log('❌ Chưa có lúa để gặt!') }
}

class Transplanting extends RiceStage {
  water(): void {
    console.log('💧 Giữ nước 5cm, mạ bén rễ')
    this.paddy.changeStage(new Growing())
  }
  fertilize(): void { console.log('🌿 Mạ còn yếu, chỉ bón nhẹ') }
  harvest(): void { console.log('❌ Lúa còn non!') }
}

class Growing extends RiceStage {
  water(): void { console.log('💧 Tưới đều, lúa đẻ nhánh') }
  fertilize(): void {
    console.log('🌿 Bón thúc đòng')
    this.paddy.changeStage(new Flowering())
  }
  harvest(): void { console.log('❌ Chưa đến vụ!') }
}

class Flowering extends RiceStage {
  water(): void { console.log('💧 Giữ nước nông cho lúa trổ bông') }
  fertilize(): void { console.log('⚠️ Không bón phân khi lúa trổ bông!') }
  harvest(): void {
    console.log('🌾 Lúa chín vàng, bắt đầu gặt!')
    this.paddy.changeStage(new Harvesting())
  }
}

class Harvesting extends RiceStage {
  water(): void { console.log('⚠️ Không tưới, ruộng cần khô để gặt!') }
  fertilize(): void { console.log('❌ Đang thu hoạch, không bón phân!') }
  harvest(): void {
    console.log('🎉 Gặt xong, vụ mùa bội thu! Sang vụ mới')
    this.paddy.changeStage(new Plowing())
  }
}

// Client: sets the initial state, then only talks to the context
const paddy = new RicePaddy(new Plowing())
paddy.harvest()    // refused while plowing
paddy.fertilize()  // Plowing → Transplanting
paddy.water()      // Transplanting → Growing
paddy.fertilize()  // Growing → Flowering
paddy.fertilize()  // same call, refused while flowering
paddy.harvest()    // Flowering → Harvesting
paddy.water()      // wrong action at harvest time
paddy.harvest()    // Harvesting → Plowing (new season)`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'Context stores a reference to one concrete state object and delegates state-specific work to it. It talks to the state through the State interface and exposes a setter for installing a new state object, here changeStage().' },
        { type: 'paragraph', text: 'State declares the state-specific methods. They should make sense for every concrete state, so no state carries methods that are never called. Concrete States implement those methods; intermediate abstract classes can hold behavior shared by several states.' },
        { type: 'paragraph', text: 'A state object may keep a backreference to the context, to read data from it and trigger transitions. RiceStage is an abstract class so it can hold the paddy field. Both the context and the concrete states can perform a transition by replacing the context\'s state object. The diagram draws one backreference edge, from Plowing, and omits the transition arrows between stages to stay readable; in the code every concrete state uses paddy to switch to the next stage.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Context lưu tham chiếu tới một đối tượng trạng thái cụ thể và ủy quyền cho nó công việc theo trạng thái. Context làm việc với trạng thái qua giao diện State và có một setter để đặt đối tượng trạng thái mới, ở đây là changeStage().' },
        { type: 'paragraph', text: 'State khai báo các phương thức theo trạng thái. Các phương thức này phải có nghĩa với mọi trạng thái cụ thể, để không trạng thái nào mang phương thức không bao giờ được gọi. Concrete State triển khai các phương thức đó; lớp trừu tượng trung gian có thể chứa hành vi chung của vài trạng thái.' },
        { type: 'paragraph', text: 'Đối tượng trạng thái có thể giữ tham chiếu ngược tới context, để đọc dữ liệu và kích hoạt việc chuyển trạng thái. RiceStage là lớp trừu tượng để giữ được trường paddy. Cả context lẫn các trạng thái cụ thể đều có thể chuyển trạng thái bằng cách thay đối tượng trạng thái của context. Sơ đồ chỉ vẽ một cạnh tham chiếu ngược, từ Plowing, và lược bỏ các mũi tên chuyển giữa các giai đoạn cho dễ đọc; trong mã, mọi trạng thái cụ thể đều dùng paddy để chuyển sang giai đoạn kế tiếp.' },
      ],
    },
  },

  {
    id: 'strategy',
    slug: 'strategy',
    name: { en: 'Strategy', vi: 'Chiến lược' },
    category: 'behavioral',
    complexity: 1,
    popularity: 3,
    intent: {
      en: 'Strategy is a behavioral design pattern that defines a family of algorithms, puts each one in a separate class, and makes their objects interchangeable.',
      vi: 'Strategy là mẫu thiết kế hành vi, định nghĩa một họ thuật toán, đặt mỗi thuật toán vào một lớp riêng và cho các đối tượng của chúng thay thế được cho nhau.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'A navigation app plans routes: enter an address and see the fastest way there. The first version plans only car routes. Then come walking routes, public transport, cycling and sightseeing tours.' },
        { type: 'paragraph', text: 'Each new routing algorithm makes the navigator\'s main class much bigger. A small fix to one algorithm touches the whole class and can break code that already works. Teammates also spend time on merge conflicts, because every feature edits the same large class.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Một ứng dụng chỉ đường lập lộ trình: nhập địa chỉ là thấy đường nhanh nhất. Phiên bản đầu chỉ lập lộ trình cho ô tô. Sau đó có thêm đi bộ, phương tiện công cộng, xe đạp và tuyến tham quan.' },
        { type: 'paragraph', text: 'Mỗi thuật toán lập lộ trình mới làm lớp chính của trình chỉ đường to thêm nhiều. Một chỉnh sửa nhỏ ở một thuật toán cũng chạm tới cả lớp và có thể làm hỏng mã đang chạy tốt. Đồng đội còn mất thời gian xử lý xung đột khi gộp mã, vì tính năng nào cũng sửa cùng một lớp lớn.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Take a class that does one thing in many different ways and move each way into its own class, called a strategy. The original class, the context, stores a reference to one strategy and delegates the work to it.' },
        { type: 'paragraph', text: 'The context does not choose the algorithm. The client chooses a strategy and passes it to the context. The context uses every strategy through one interface with a single method that runs the algorithm, so new or changed algorithms need no change to the context.' },
        { type: 'paragraph', text: 'In the navigation app, each routing algorithm becomes a class with one buildRoute method that takes an origin and a destination and returns checkpoints. The navigator only draws the checkpoints. It offers a method for switching strategies, so interface buttons can replace the routing behavior at runtime.' },
        { type: 'paragraph', text: 'Strategy differs from State in who switches the behavior: the client sets a strategy, while states usually trigger their own transitions. It differs from Template Method in mechanism: Strategy swaps whole algorithm objects through composition, while Template Method varies steps of one algorithm through subclasses.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Lấy một lớp làm một việc theo nhiều cách và chuyển mỗi cách vào một lớp riêng, gọi là chiến lược (strategy). Lớp gốc, gọi là context, lưu tham chiếu tới một chiến lược và ủy quyền công việc cho nó.' },
        { type: 'paragraph', text: 'Context không tự chọn thuật toán. Client chọn một chiến lược và truyền vào context. Context dùng mọi chiến lược qua một giao diện có một phương thức chạy thuật toán, nên thêm hay sửa thuật toán không cần sửa context.' },
        { type: 'paragraph', text: 'Trong ứng dụng chỉ đường, mỗi thuật toán lập lộ trình thành một lớp có một phương thức buildRoute, nhận điểm đi, điểm đến và trả về các điểm mốc. Trình chỉ đường chỉ vẽ các điểm mốc. Nó có phương thức đổi chiến lược, nên các nút trên giao diện có thể thay cách lập lộ trình lúc chạy.' },
        { type: 'paragraph', text: 'Strategy khác State ở bên đổi hành vi: client đặt chiến lược, còn các trạng thái thường tự kích hoạt việc chuyển. Strategy khác Template Method ở cơ chế: Strategy thay cả đối tượng thuật toán qua kết hợp (composition), còn Template Method thay đổi từng bước của một thuật toán qua lớp con.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Strategy when:' },
        { type: 'list', items: [
          'an object needs different variants of an algorithm and must switch between them at runtime;',
          'many similar classes differ only in how they perform one behavior;',
          'you want to isolate a class\'s business logic from the implementation details of its algorithms;',
          'a class has a large conditional that chooses between variants of the same algorithm.',
        ] },
        { type: 'paragraph', text: 'Each variant moves into a class that implements the shared interface, and the original object delegates to one of them.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Strategy khi:' },
        { type: 'list', items: [
          'một đối tượng cần nhiều biến thể của một thuật toán và phải đổi giữa chúng lúc chạy;',
          'nhiều lớp tương tự nhau chỉ khác ở cách thực hiện một hành vi;',
          'bạn muốn tách logic nghiệp vụ của một lớp khỏi chi tiết cài đặt các thuật toán của nó;',
          'một lớp có khối điều kiện lớn để chọn giữa các biến thể của cùng một thuật toán.',
        ] },
        { type: 'paragraph', text: 'Mỗi biến thể chuyển vào một lớp triển khai giao diện chung, và đối tượng gốc ủy quyền cho một trong số chúng.' },
      ],
    },
    vietnamese_example: {
      title: { en: 'Martial arts styles', vi: 'Các lối đánh võ' },
      description: {
        en: [
          { type: 'paragraph', text: 'Vietnamese traditional martial arts (võ cổ truyền) has many schools. This example uses three school names as labels for three ways of fighting an opponent; the one-line descriptions are simplified for teaching and do not describe the real schools\' techniques.' },
          { type: 'paragraph', text: 'MartialSchool is the strategy interface, with one method, attack(opponent). BinhDinhSchool (powerful strikes), TaySonSchool (fast combinations) and ThieuLamSchool (defend, then counter) are concrete strategies. Warrior is the context: it stores one MartialSchool, and fight() calls attack() on whichever style is linked, without knowing which one it is.' },
          { type: 'paragraph', text: 'The warrior does not choose the style; the client does. chooseSchool() knows the differences and picks a style for each situation: BinhDinhSchool against heavy armor, TaySonSchool when surrounded, ThieuLamSchool against a stronger opponent. It hands the style to the warrior through changeSchool() at runtime. A new style is one new class that implements MartialSchool, with no change to Warrior.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Võ cổ truyền Việt Nam có nhiều môn phái. Ví dụ này dùng tên ba môn phái làm nhãn cho ba cách đánh một đối thủ; các mô tả ngắn được giản lược để minh họa, không mô tả kỹ thuật thực của các môn phái đó.' },
          { type: 'paragraph', text: 'MartialSchool là giao diện chiến lược, có một phương thức attack(opponent). BinhDinhSchool (đòn mạnh), TaySonSchool (liên hoàn nhanh) và ThieuLamSchool (đỡ rồi phản đòn) là các chiến lược cụ thể. Warrior là context: nó giữ một MartialSchool, và fight() gọi attack() trên lối đánh đang gắn mà không cần biết đó là lối nào.' },
          { type: 'paragraph', text: 'Võ sĩ không tự chọn lối đánh; client chọn. chooseSchool() biết sự khác nhau và chọn một lối cho từng tình huống: BinhDinhSchool khi đối thủ mặc giáp dày, TaySonSchool khi bị bao vây, ThieuLamSchool khi đối thủ mạnh hơn. Nó trao lối đánh cho võ sĩ qua changeSchool() lúc chạy. Thêm một lối đánh mới chỉ cần thêm một lớp triển khai MartialSchool, không phải sửa Warrior.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod


# Strategy: the interface common to all fighting styles
class MartialSchool(ABC):
    @abstractmethod
    def attack(self, opponent: str) -> str: ...


# Concrete Strategies: different variants of the same "fight" algorithm
class BinhDinhSchool(MartialSchool):
    def attack(self, opponent: str) -> str:
        return f"💪 Song phi uy lực vào {opponent}!"


class TaySonSchool(MartialSchool):
    def attack(self, opponent: str) -> str:
        return f"⚡ Liên hoàn 7 đòn vào {opponent}!"


class ThieuLamSchool(MartialSchool):
    def attack(self, opponent: str) -> str:
        return f"🛡️ Đỡ đòn rồi phản công {opponent}, lấy nhu chế cương!"


# Context: keeps one strategy and works with it only through MartialSchool
class Warrior:
    def __init__(self, name: str, school: MartialSchool) -> None:
        self.name = name
        self._school = school

    # Setter: lets the client replace the strategy at runtime
    def change_school(self, school: MartialSchool) -> None:
        self._school = school

    # Delegates the work; Warrior does not know which style is linked
    def fight(self, opponent: str) -> None:
        print(f"⚔️ {self.name}: {self._school.attack(opponent)}")


# Client: knows the differences between styles and picks one per situation
def choose_school(situation: str) -> MartialSchool:
    if situation == "giáp dày":
        return BinhDinhSchool()
    if situation == "bị bao vây":
        return TaySonSchool()
    return ThieuLamSchool()


hero = Warrior("Nguyễn Huệ", BinhDinhSchool())
hero.fight("cọc gỗ luyện tập")

battles = [
    ("giáp dày", "kỵ binh giặc Thanh"),
    ("bị bao vây", "toán quân phục kích"),
    ("đối thủ mạnh hơn", "tướng giặc to khỏe"),
]
for situation, opponent in battles:
    print(f"Tình huống: {situation}")
    hero.change_school(choose_school(situation))
    hero.fight(opponent)

# Output:
# ⚔️ Nguyễn Huệ: 💪 Song phi uy lực vào cọc gỗ luyện tập!
# Tình huống: giáp dày
# ⚔️ Nguyễn Huệ: 💪 Song phi uy lực vào kỵ binh giặc Thanh!
# Tình huống: bị bao vây
# ⚔️ Nguyễn Huệ: ⚡ Liên hoàn 7 đòn vào toán quân phục kích!
# Tình huống: đối thủ mạnh hơn
# ⚔️ Nguyễn Huệ: 🛡️ Đỡ đòn rồi phản công tướng giặc to khỏe, lấy nhu chế cương!`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Strategy: the interface common to all fighting styles
interface MartialSchool {
  attack(opponent: string): string
}

// Concrete Strategies: different variants of the same "fight" algorithm
class BinhDinhSchool implements MartialSchool {
  attack(opponent: string): string {
    return \`💪 Song phi uy lực vào \${opponent}!\`
  }
}

class TaySonSchool implements MartialSchool {
  attack(opponent: string): string {
    return \`⚡ Liên hoàn 7 đòn vào \${opponent}!\`
  }
}

class ThieuLamSchool implements MartialSchool {
  attack(opponent: string): string {
    return \`🛡️ Đỡ đòn rồi phản công \${opponent}, lấy nhu chế cương!\`
  }
}

// Context: keeps one strategy and works with it only through MartialSchool
class Warrior {
  constructor(private name: string, private school: MartialSchool) {}

  // Setter: lets the client replace the strategy at runtime
  changeSchool(school: MartialSchool): void {
    this.school = school
  }

  // Delegates the work; Warrior does not know which style is linked
  fight(opponent: string): void {
    console.log(\`⚔️ \${this.name}: \${this.school.attack(opponent)}\`)
  }
}

// Client: knows the differences between styles and picks one per situation
type Situation = 'giáp dày' | 'bị bao vây' | 'đối thủ mạnh hơn'

function chooseSchool(situation: Situation): MartialSchool {
  switch (situation) {
    case 'giáp dày': return new BinhDinhSchool()
    case 'bị bao vây': return new TaySonSchool()
    default: return new ThieuLamSchool()
  }
}

const hero = new Warrior('Nguyễn Huệ', new BinhDinhSchool())
hero.fight('cọc gỗ luyện tập')

const battles: [Situation, string][] = [
  ['giáp dày', 'kỵ binh giặc Thanh'],
  ['bị bao vây', 'toán quân phục kích'],
  ['đối thủ mạnh hơn', 'tướng giặc to khỏe'],
]
for (const [situation, opponent] of battles) {
  console.log(\`Tình huống: \${situation}\`)
  hero.changeSchool(chooseSchool(situation))
  hero.fight(opponent)
}`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'Context keeps a reference to one concrete strategy and talks to it only through the Strategy interface. Strategy is common to all concrete strategies and declares the method the context calls to run the algorithm. Concrete Strategies implement different variants of that algorithm.' },
        { type: 'paragraph', text: 'When the context needs the algorithm, it calls the method on the linked strategy, without knowing its type or how it works. Client creates a concrete strategy and passes it to the context, which offers a setter for replacing it at runtime.' },
        { type: 'paragraph', text: 'Here Warrior is the Context, MartialSchool is the Strategy with attack() as the method, the three schools are Concrete Strategies, and chooseSchool() acts as the Client.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Context giữ tham chiếu tới một chiến lược cụ thể và chỉ làm việc với nó qua giao diện Strategy. Strategy dùng chung cho mọi chiến lược cụ thể và khai báo phương thức mà context gọi để chạy thuật toán. Concrete Strategy triển khai các biến thể khác nhau của thuật toán đó.' },
        { type: 'paragraph', text: 'Khi cần thuật toán, context gọi phương thức trên chiến lược đang gắn mà không biết kiểu của nó hay nó làm thế nào. Client tạo một chiến lược cụ thể và truyền vào context, context có setter để thay chiến lược lúc chạy.' },
        { type: 'paragraph', text: 'Ở đây Warrior là Context, MartialSchool là Strategy với phương thức attack(), ba môn phái là các Concrete Strategy, còn chooseSchool() đóng vai Client.' },
      ],
    },
  },

  {
    id: 'template-method',
    slug: 'template-method',
    name: { en: 'Template Method', vi: 'Phương thức khuôn mẫu' },
    category: 'behavioral',
    complexity: 1,
    popularity: 2,
    intent: {
      en: 'Template Method is a behavioral design pattern that defines the skeleton of an algorithm in a superclass and lets subclasses override specific steps without changing the algorithm\'s structure.',
      vi: 'Template Method là mẫu thiết kế hành vi, định nghĩa bộ khung của một thuật toán ở lớp cha và cho lớp con ghi đè từng bước cụ thể mà không đổi cấu trúc của thuật toán.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'A data mining app analyzes company documents in several formats (PDF, DOC, CSV) and extracts data in one uniform format. The first version handled only DOC, the next added CSV, and a month later came PDF.' },
        { type: 'paragraph', text: 'The three classes now share a lot of code. Reading each format is completely different, but processing and analyzing the data is almost identical. You want to remove the duplication while keeping the algorithm\'s structure.' },
        { type: 'paragraph', text: 'The client code has a second problem: it is full of conditionals that choose what to do based on the class of the processing object. With a common base class, the client could use polymorphism instead.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Một ứng dụng khai phá dữ liệu phân tích tài liệu doanh nghiệp ở nhiều định dạng (PDF, DOC, CSV) và trích xuất dữ liệu theo một định dạng thống nhất. Phiên bản đầu chỉ xử lý DOC, phiên bản sau thêm CSV, và một tháng sau là PDF.' },
        { type: 'paragraph', text: 'Ba lớp giờ có rất nhiều mã giống nhau. Phần đọc từng định dạng hoàn toàn khác, nhưng phần xử lý và phân tích dữ liệu gần như y hệt. Bạn muốn bỏ sự trùng lặp mà vẫn giữ cấu trúc thuật toán.' },
        { type: 'paragraph', text: 'Mã client còn một vấn đề nữa: nó đầy câu điều kiện chọn cách xử lý theo lớp của đối tượng xử lý. Nếu có lớp cơ sở chung, client có thể dùng đa hình thay thế.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Break the algorithm into steps, turn each step into a method, and call those methods in order from one template method. To use the algorithm, a subclass implements the abstract steps and overrides optional ones if needed, but does not override the template method.' },
        { type: 'paragraph', text: 'In the data mining app, a base class for the three parsers defines the template method. Opening files and extracting data differ by format, so those steps stay in subclasses. Analyzing raw data and writing reports are nearly the same, so they move up into the base class.' },
        { type: 'paragraph', text: 'This gives three kinds of step:' },
        { type: 'list', items: [
          'abstract steps, which every subclass must implement;',
          'optional steps, which have a default implementation that subclasses may override;',
          'hooks, optional steps with an empty body, usually placed before or after important steps as extra extension points.',
        ] },
        { type: 'paragraph', text: 'Where the language allows it, mark the template method final. Template Method varies parts of one algorithm through inheritance and is fixed when the class is chosen; Strategy swaps whole algorithm objects through composition, even at runtime.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Chia thuật toán thành các bước, biến mỗi bước thành một phương thức, rồi gọi các phương thức đó theo thứ tự từ một phương thức khuôn mẫu (template method). Để dùng thuật toán, lớp con triển khai các bước trừu tượng và ghi đè bước tùy chọn nếu cần, nhưng không ghi đè phương thức khuôn mẫu.' },
        { type: 'paragraph', text: 'Trong ứng dụng khai phá dữ liệu, lớp cơ sở của ba bộ phân tích định nghĩa phương thức khuôn mẫu. Mở tệp và trích xuất dữ liệu khác nhau theo định dạng, nên các bước đó nằm ở lớp con. Phân tích dữ liệu thô và viết báo cáo gần như giống nhau, nên được đưa lên lớp cơ sở.' },
        { type: 'paragraph', text: 'Từ đó có ba loại bước:' },
        { type: 'list', items: [
          'bước trừu tượng, mọi lớp con phải triển khai;',
          'bước tùy chọn, có cài đặt mặc định mà lớp con có thể ghi đè;',
          'hook, bước tùy chọn có thân rỗng, thường đặt trước hoặc sau các bước quan trọng để làm điểm mở rộng.',
        ] },
        { type: 'paragraph', text: 'Nếu ngôn ngữ cho phép, hãy đánh dấu phương thức khuôn mẫu là final. Template Method thay đổi từng phần của một thuật toán qua kế thừa và được cố định khi chọn lớp; Strategy thay cả đối tượng thuật toán qua kết hợp, kể cả lúc chạy.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Template Method when:' },
        { type: 'list', items: [
          'clients should extend only particular steps of an algorithm, not the whole algorithm or its structure;',
          'several classes contain almost identical algorithms with minor differences, so a change to the algorithm means editing every class.',
        ] },
        { type: 'paragraph', text: 'Steps with the same implementation move up into the superclass, and the code that varies stays in subclasses.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Template Method khi:' },
        { type: 'list', items: [
          'client chỉ nên mở rộng một số bước của thuật toán, không phải toàn bộ thuật toán hay cấu trúc của nó;',
          'nhiều lớp chứa thuật toán gần như giống hệt nhau với vài khác biệt nhỏ, nên mỗi lần đổi thuật toán phải sửa mọi lớp.',
        ] },
        { type: 'paragraph', text: 'Các bước có cài đặt giống nhau được đưa lên lớp cha, còn phần mã khác nhau ở lại lớp con.' },
      ],
    },
    vietnamese_example: {
      title: { en: 'Cooking Vietnamese soups', vi: 'Nấu các món canh và bún' },
      description: {
        en: [
          { type: 'paragraph', text: 'This example uses a simplified recipe model in which every soup follows the same order: prepare the broth, add the main ingredients, season, ladle into the bowl, and garnish. The abstract class SoupRecipe fixes that order in its template method cook().' },
          { type: 'paragraph', text: 'The broth and ingredients differ for each dish, so prepareBroth() and addIngredients() are abstract steps. Seasoning with fish sauce (season()) and adding spring onions (garnish()) are optional steps with defaults most dishes share. beforeLadle() is a hook with an empty body, called just before the soup is ladled.' },
          { type: 'paragraph', text: 'GourdBoneSoup implements only the abstract steps and keeps every default. SourFishSoup also overrides garnish() with sawtooth herb and chili. HueBeefNoodleSoup overrides season() to add Huế shrimp paste (mắm ruốc), uses the hook to blanch the noodles into the bowl, and overrides garnish() with fresh herbs and chili sa tế. The order never changes; the client just calls cook() on any SoupRecipe.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Ví dụ này dùng một mô hình công thức giản lược, trong đó món nào cũng theo cùng một trình tự: chuẩn bị nước dùng, cho nguyên liệu chính, nêm nếm, múc ra tô, rồi trang trí. Lớp trừu tượng SoupRecipe cố định trình tự đó trong phương thức khuôn mẫu cook().' },
          { type: 'paragraph', text: 'Nước dùng và nguyên liệu khác nhau theo từng món, nên prepareBroth() và addIngredients() là bước trừu tượng. Nêm nước mắm (season()) và rắc hành lá (garnish()) là bước tùy chọn có mặc định mà phần lớn các món dùng chung. beforeLadle() là hook có thân rỗng, được gọi ngay trước khi múc ra tô.' },
          { type: 'paragraph', text: 'GourdBoneSoup chỉ triển khai các bước trừu tượng và giữ mọi mặc định. SourFishSoup ghi đè thêm garnish() để rắc ngò gai và ớt đỏ. HueBeefNoodleSoup ghi đè season() để thêm mắm ruốc Huế, dùng hook để trụng bún vào tô, và ghi đè garnish() để thêm rau sống và sa tế. Trình tự không bao giờ đổi; client chỉ việc gọi cook() trên bất kỳ SoupRecipe nào.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod


# Abstract Class: declares the steps and the template method
class SoupRecipe(ABC):
    # Template method: fixes the order of the steps.
    # Python has no "final", so subclasses must simply not override it.
    def cook(self) -> None:
        print(f"🍲 Nấu {self.dish_name()}:")
        self.prepare_broth()
        self.add_ingredients()
        self.season()
        self.before_ladle()
        self.garnish()

    # Abstract steps: every subclass must implement them
    @abstractmethod
    def dish_name(self) -> str: ...

    @abstractmethod
    def prepare_broth(self) -> None: ...

    @abstractmethod
    def add_ingredients(self) -> None: ...

    # Optional steps: a shared default that subclasses may override
    def season(self) -> None:
        print("  🐟 Nêm nước mắm, muối, đường")

    def garnish(self) -> None:
        print("  🌿 Rắc hành lá")

    # Hook: an empty optional step; the algorithm works without it
    def before_ladle(self) -> None:
        pass


# Concrete Classes: implement the abstract steps, override some optional ones
class SourFishSoup(SoupRecipe):
    def dish_name(self) -> str: return "Canh chua cá lóc"
    def prepare_broth(self) -> None: print("  🍅 Nấu nước me chua với cà chua")
    def add_ingredients(self) -> None: print("  🐟 Thêm cá lóc, dứa, giá đỗ")
    def garnish(self) -> None: print("  🌿 Rắc ngò gai và ớt đỏ")


class GourdBoneSoup(SoupRecipe):
    # Only the abstract steps; every default is kept
    def dish_name(self) -> str: return "Canh bí xương"
    def prepare_broth(self) -> None: print("  🦴 Hầm xương heo 2 tiếng")
    def add_ingredients(self) -> None: print("  🥬 Thêm bí đao và hành tím")


class HueBeefNoodleSoup(SoupRecipe):
    def dish_name(self) -> str: return "Bún bò Huế"
    def prepare_broth(self) -> None: print("  🌿 Hầm xương bò với sả")
    def add_ingredients(self) -> None: print("  🥩 Thêm bắp bò, chả cua, huyết")
    def season(self) -> None: print("  🦐 Nêm mắm ruốc Huế và nước mắm")
    def before_ladle(self) -> None: print("  🍜 Trụng bún, xếp vào tô")
    def garnish(self) -> None: print("  🌶️ Thêm rau sống và sa tế")


# Client: works with any dish through the abstract class
def serve(dish: SoupRecipe) -> None:
    dish.cook()


for dish in [SourFishSoup(), GourdBoneSoup(), HueBeefNoodleSoup()]:
    serve(dish)

# Output:
# 🍲 Nấu Canh chua cá lóc:
#   🍅 Nấu nước me chua với cà chua
#   🐟 Thêm cá lóc, dứa, giá đỗ
#   🐟 Nêm nước mắm, muối, đường
#   🌿 Rắc ngò gai và ớt đỏ
# 🍲 Nấu Canh bí xương:
#   🦴 Hầm xương heo 2 tiếng
#   🥬 Thêm bí đao và hành tím
#   🐟 Nêm nước mắm, muối, đường
#   🌿 Rắc hành lá
# 🍲 Nấu Bún bò Huế:
#   🌿 Hầm xương bò với sả
#   🥩 Thêm bắp bò, chả cua, huyết
#   🦐 Nêm mắm ruốc Huế và nước mắm
#   🍜 Trụng bún, xếp vào tô
#   🌶️ Thêm rau sống và sa tế`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Abstract Class: declares the steps and the template method
abstract class SoupRecipe {
  // Template method: fixes the order of the steps.
  // TypeScript has no "final", so subclasses must simply not override it.
  cook(): void {
    console.log(\`🍲 Nấu \${this.dishName()}:\`)
    this.prepareBroth()
    this.addIngredients()
    this.season()
    this.beforeLadle()
    this.garnish()
  }

  // Abstract steps: every subclass must implement them
  abstract dishName(): string
  protected abstract prepareBroth(): void
  protected abstract addIngredients(): void

  // Optional steps: a shared default that subclasses may override
  protected season(): void { console.log('  🐟 Nêm nước mắm, muối, đường') }
  protected garnish(): void { console.log('  🌿 Rắc hành lá') }

  // Hook: an empty optional step; the algorithm works without it
  protected beforeLadle(): void {}
}

// Concrete Classes: implement the abstract steps, override some optional ones
class SourFishSoup extends SoupRecipe {
  dishName() { return 'Canh chua cá lóc' }
  protected prepareBroth() { console.log('  🍅 Nấu nước me chua với cà chua') }
  protected addIngredients() { console.log('  🐟 Thêm cá lóc, dứa, giá đỗ') }
  protected garnish() { console.log('  🌿 Rắc ngò gai và ớt đỏ') }
}

class GourdBoneSoup extends SoupRecipe {
  // Only the abstract steps; every default is kept
  dishName() { return 'Canh bí xương' }
  protected prepareBroth() { console.log('  🦴 Hầm xương heo 2 tiếng') }
  protected addIngredients() { console.log('  🥬 Thêm bí đao và hành tím') }
}

class HueBeefNoodleSoup extends SoupRecipe {
  dishName() { return 'Bún bò Huế' }
  protected prepareBroth() { console.log('  🌿 Hầm xương bò với sả') }
  protected addIngredients() { console.log('  🥩 Thêm bắp bò, chả cua, huyết') }
  protected season() { console.log('  🦐 Nêm mắm ruốc Huế và nước mắm') }
  protected beforeLadle() { console.log('  🍜 Trụng bún, xếp vào tô') }
  protected garnish() { console.log('  🌶️ Thêm rau sống và sa tế') }
}

// Client: works with any dish through the abstract class
function serve(dish: SoupRecipe): void {
  dish.cook()
}

for (const dish of [new SourFishSoup(), new GourdBoneSoup(), new HueBeefNoodleSoup()]) {
  serve(dish)
}`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'Abstract Class declares the methods that are steps of the algorithm and the template method that calls them in a fixed order. A step may be abstract or have a default implementation; a hook is a step whose default body is empty.' },
        { type: 'paragraph', text: 'Concrete Classes may override any step, but not the template method. Neither TypeScript nor Python has a final modifier for methods, so the samples rely on the convention that subclasses leave cook() alone.' },
        { type: 'paragraph', text: 'In the diagram, methods marked * are abstract steps. Each concrete class box lists only the steps that class overrides, and dishName() is left out of those boxes to save space.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Abstract Class khai báo các phương thức là các bước của thuật toán và phương thức khuôn mẫu gọi chúng theo một thứ tự cố định. Mỗi bước có thể là trừu tượng hoặc có cài đặt mặc định; hook là bước có thân mặc định rỗng.' },
        { type: 'paragraph', text: 'Concrete Class có thể ghi đè bất kỳ bước nào, nhưng không ghi đè phương thức khuôn mẫu. Cả TypeScript lẫn Python đều không có từ khóa final cho phương thức, nên các ví dụ dựa vào quy ước rằng lớp con không đụng tới cook().' },
        { type: 'paragraph', text: 'Trong sơ đồ, phương thức có dấu * là bước trừu tượng. Hộp của mỗi lớp cụ thể chỉ liệt kê các bước lớp đó ghi đè, và bỏ qua dishName() cho gọn.' },
      ],
    },
  },

  {
    id: 'visitor',
    slug: 'visitor',
    name: { en: 'Visitor', vi: 'Khách thăm' },
    category: 'behavioral',
    complexity: 3,
    popularity: 1,
    intent: {
      en: 'Visitor is a behavioral design pattern that separates an operation from the classes of the objects it works on. You can add a new operation over an object structure without changing those classes.',
      vi: 'Visitor là mẫu thiết kế hành vi, tách một thao tác khỏi các lớp của những đối tượng mà nó xử lý. Nhờ vậy có thể thêm thao tác mới trên một cấu trúc đối tượng mà không sửa các lớp đó.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'A team maintains an app that stores geographic information as one large graph. Each node is a city, an industrial site, a sightseeing area or another entity, and each node type is its own class. The new task is to export the graph to XML.' },
        { type: 'paragraph', text: 'The obvious plan is to add an export method to each node class. The architect refuses: the code is in production, and XML export does not belong in classes whose job is geographic data. Once XML ships, other export formats will follow, and each would mean changing those fragile classes again.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Một nhóm bảo trì ứng dụng lưu thông tin địa lý dưới dạng một đồ thị lớn. Mỗi nút là một thành phố, một khu công nghiệp, một điểm tham quan hay một thực thể khác, và mỗi loại nút là một lớp riêng. Nhiệm vụ mới là xuất đồ thị ra XML.' },
        { type: 'paragraph', text: 'Cách hiển nhiên là thêm phương thức xuất vào từng lớp nút. Kiến trúc sư không đồng ý: mã đang chạy trên production, và việc xuất XML không thuộc về những lớp có nhiệm vụ xử lý dữ liệu địa lý. Sau XML sẽ còn những định dạng xuất khác, và mỗi lần như vậy lại phải sửa các lớp mong manh đó.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Put the new operation in a separate class called a visitor. The object the operation works on is passed to a visitor method as an argument, so the method can read the data it needs.' },
        { type: 'paragraph', text: 'Because the operation differs per node class, the visitor has one method per class, such as doForCity, doForIndustry and doForSightSeeing. The client cannot simply pick one: the node\'s exact class is not known at compile time, and overloading would select the method for the base Node type.' },
        { type: 'paragraph', text: 'Visitor uses double dispatch. Each element accepts a visitor and calls the visiting method for its own class: City.accept(v) calls v.doForCity(this). The first dispatch picks the element\'s accept() at runtime; the second picks the visitor\'s method for that element. The node classes change once to add accept(), and after that a new operation needs only a new visitor class.' },
        { type: 'paragraph', text: 'The trade-off runs the other way for new element classes: adding one means adding a visiting method to every visitor.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Đặt thao tác mới vào một lớp riêng gọi là visitor. Đối tượng mà thao tác xử lý được truyền vào một phương thức của visitor làm tham số, nên phương thức đó đọc được dữ liệu cần thiết.' },
        { type: 'paragraph', text: 'Vì thao tác khác nhau theo lớp nút, visitor có một phương thức cho mỗi lớp, như doForCity, doForIndustry và doForSightSeeing. Client không thể tự chọn: lúc biên dịch chưa biết lớp chính xác của nút, và nạp chồng (overloading) sẽ chọn phương thức cho kiểu cơ sở Node.' },
        { type: 'paragraph', text: 'Visitor dùng kỹ thuật điều phối kép (double dispatch). Mỗi phần tử nhận một visitor và gọi phương thức thăm ứng với lớp của chính nó: City.accept(v) gọi v.doForCity(this). Lần điều phối thứ nhất chọn accept() của phần tử lúc chạy; lần thứ hai chọn phương thức của visitor cho phần tử đó. Các lớp nút chỉ sửa một lần để thêm accept(), sau đó thao tác mới chỉ cần một lớp visitor mới.' },
        { type: 'paragraph', text: 'Cái giá nằm ở chiều ngược lại: thêm một lớp phần tử mới nghĩa là phải thêm phương thức thăm vào mọi visitor.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use Visitor when:' },
        { type: 'list', items: [
          'you need to run an operation over all elements of a complex structure, such as an object tree, whose elements belong to different classes;',
          'you want to move auxiliary behavior out of the main business classes;',
          'a behavior makes sense for only some classes in a hierarchy, so the visitor implements only those visiting methods and leaves the rest empty.',
        ] },
        { type: 'paragraph', text: 'Visitor fits best when the element classes are stable and operations change often.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Visitor khi:' },
        { type: 'list', items: [
          'cần chạy một thao tác trên mọi phần tử của một cấu trúc phức tạp, chẳng hạn cây đối tượng, mà các phần tử thuộc nhiều lớp khác nhau;',
          'bạn muốn chuyển hành vi phụ trợ ra khỏi các lớp nghiệp vụ chính;',
          'một hành vi chỉ có nghĩa với một số lớp trong hệ phân cấp, nên visitor chỉ cài đặt các phương thức thăm đó và để trống phần còn lại.',
        ] },
        { type: 'paragraph', text: 'Visitor phù hợp nhất khi các lớp phần tử ổn định còn thao tác thay đổi thường xuyên.' },
      ],
    },
    vietnamese_example: {
      title: { en: 'Court officials visiting craft guilds', vi: 'Quan triều đình đến các phường nghề' },
      description: {
        en: [
          { type: 'paragraph', text: 'This is a fictional teaching scene set in an old capital, not a description of historical tax rules. Each craft guild (phường) has its own trade: SilkWeaversGuild weaves silk, PotteryGuild fires pottery and CarpentryGuild makes woodwork. The guilds implement the element interface Guild, whose only extra duty is accept(visitor).' },
          { type: 'paragraph', text: 'Court officials are the visitors. GuildVisitor has one visiting method per guild: visitSilkWeaversGuild, visitPotteryGuild and visitCarpentryGuild. TaxCollectorVisitor applies a different rate to each guild and keeps a running total. InspectorVisitor checks only the goods sent as tribute in this story, silk and pottery, so visitCarpentryGuild stays empty.' },
          { type: 'paragraph', text: 'The client, Capital, walks its list of guilds and calls accept() on each. Each guild calls back the visiting method for its own class, which is the double dispatch. A new official, such as a census taker, is one new visitor class, and the guild classes stay unchanged.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Đây là một cảnh hư cấu để minh họa, đặt trong một kinh thành xưa, không mô tả quy định thuế trong lịch sử. Mỗi phường nghề làm một nghề riêng: SilkWeaversGuild dệt lụa, PotteryGuild nung gốm và CarpentryGuild làm đồ gỗ. Các phường triển khai giao diện phần tử Guild, với nghĩa vụ thêm duy nhất là accept(visitor).' },
          { type: 'paragraph', text: 'Các quan triều đình là visitor. GuildVisitor có một phương thức thăm cho mỗi phường: visitSilkWeaversGuild, visitPotteryGuild và visitCarpentryGuild. TaxCollectorVisitor áp mức thuế khác nhau cho từng phường và cộng dồn tổng thuế. InspectorVisitor chỉ kiểm tra hàng tiến vua trong câu chuyện này là lụa và gốm, nên visitCarpentryGuild để trống.' },
          { type: 'paragraph', text: 'Client là Capital, duyệt danh sách phường và gọi accept() trên từng phường. Mỗi phường gọi lại đúng phương thức thăm dành cho lớp của mình, đó là điều phối kép. Thêm một vị quan mới, chẳng hạn quan điều tra dân số, chỉ cần thêm một lớp visitor, còn các lớp phường giữ nguyên.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod


# Visitor: one visiting method per Concrete Element class
class GuildVisitor(ABC):
    @abstractmethod
    def visit_silk_weavers_guild(self, g: "SilkWeaversGuild") -> None: ...

    @abstractmethod
    def visit_pottery_guild(self, g: "PotteryGuild") -> None: ...

    @abstractmethod
    def visit_carpentry_guild(self, g: "CarpentryGuild") -> None: ...


# Element: declares the accept method, typed with the Visitor interface
class Guild(ABC):
    @abstractmethod
    def accept(self, visitor: GuildVisitor) -> None: ...


# Concrete Elements: accept() calls the visiting method for its own class
class SilkWeaversGuild(Guild):
    name = "Phường dệt lụa"
    revenue = 10_000_000
    silk_bolt_count = 120

    def accept(self, visitor: GuildVisitor) -> None:
        visitor.visit_silk_weavers_guild(self)


class PotteryGuild(Guild):
    name = "Phường gốm sứ"
    revenue = 5_000_000
    kiln_count = 4

    def accept(self, visitor: GuildVisitor) -> None:
        visitor.visit_pottery_guild(self)


class CarpentryGuild(Guild):
    name = "Phường mộc"
    revenue = 8_000_000

    def accept(self, visitor: GuildVisitor) -> None:
        visitor.visit_carpentry_guild(self)


# Concrete Visitor 1: tax collection with a different rate per guild.
# A visitor can accumulate state while it visits.
class TaxCollectorVisitor(GuildVisitor):
    def __init__(self) -> None:
        self.total_tax = 0

    def _collect(self, name: str, tax: int, rate: int) -> None:
        self.total_tax += tax
        print(f"💰 {name}: {tax:,}đ ({rate}%)")

    def visit_silk_weavers_guild(self, g: SilkWeaversGuild) -> None:
        self._collect(g.name, g.revenue * 10 // 100, 10)

    def visit_pottery_guild(self, g: PotteryGuild) -> None:
        self._collect(g.name, g.revenue * 8 // 100, 8)

    def visit_carpentry_guild(self, g: CarpentryGuild) -> None:
        self._collect(g.name, g.revenue * 12 // 100, 12)


# Concrete Visitor 2: inspects tribute goods only, so one method stays empty
class InspectorVisitor(GuildVisitor):
    def visit_silk_weavers_guild(self, g: SilkWeaversGuild) -> None:
        print(f"🔍 {g.name}: {g.silk_bolt_count} tấm lụa đạt chuẩn tiến vua")

    def visit_pottery_guild(self, g: PotteryGuild) -> None:
        print(f"🔍 {g.name}: {g.kiln_count} lò nung, men gốm cần cải thiện")

    def visit_carpentry_guild(self, g: CarpentryGuild) -> None:
        pass  # woodwork is not a tribute good: nothing to inspect


# Client: a collection that works with guilds only through Guild
class Capital:
    def __init__(self) -> None:
        self.guilds: list[Guild] = [SilkWeaversGuild(), PotteryGuild(), CarpentryGuild()]

    def welcome_visitor(self, visitor: GuildVisitor) -> None:
        for g in self.guilds:
            g.accept(visitor)


capital = Capital()

print("=== QUAN THU THUẾ ===")
tax_collector = TaxCollectorVisitor()
capital.welcome_visitor(tax_collector)
print(f"Tổng thuế: {tax_collector.total_tax:,}đ")

print("=== QUAN KIỂM TRA ===")
capital.welcome_visitor(InspectorVisitor())

# Output:
# === QUAN THU THUẾ ===
# 💰 Phường dệt lụa: 1,000,000đ (10%)
# 💰 Phường gốm sứ: 400,000đ (8%)
# 💰 Phường mộc: 960,000đ (12%)
# Tổng thuế: 2,360,000đ
# === QUAN KIỂM TRA ===
# 🔍 Phường dệt lụa: 120 tấm lụa đạt chuẩn tiến vua
# 🔍 Phường gốm sứ: 4 lò nung, men gốm cần cải thiện`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Visitor: one visiting method per Concrete Element class
interface GuildVisitor {
  visitSilkWeaversGuild(g: SilkWeaversGuild): void
  visitPotteryGuild(g: PotteryGuild): void
  visitCarpentryGuild(g: CarpentryGuild): void
}

// Element: declares the accept method, typed with the Visitor interface
interface Guild {
  accept(visitor: GuildVisitor): void
}

// Concrete Elements: accept() calls the visiting method for its own class
class SilkWeaversGuild implements Guild {
  readonly name = 'Phường dệt lụa'
  readonly revenue = 10_000_000
  readonly silkBoltCount = 120
  accept(visitor: GuildVisitor) { visitor.visitSilkWeaversGuild(this) }
}

class PotteryGuild implements Guild {
  readonly name = 'Phường gốm sứ'
  readonly revenue = 5_000_000
  readonly kilnCount = 4
  accept(visitor: GuildVisitor) { visitor.visitPotteryGuild(this) }
}

class CarpentryGuild implements Guild {
  readonly name = 'Phường mộc'
  readonly revenue = 8_000_000
  accept(visitor: GuildVisitor) { visitor.visitCarpentryGuild(this) }
}

// Concrete Visitor 1: tax collection with a different rate per guild.
// A visitor can accumulate state while it visits.
class TaxCollectorVisitor implements GuildVisitor {
  totalTax = 0

  private collect(name: string, tax: number, rate: number) {
    this.totalTax += tax
    console.log(\`💰 \${name}: \${tax.toLocaleString('en-US')}đ (\${rate}%)\`)
  }

  visitSilkWeaversGuild(g: SilkWeaversGuild) { this.collect(g.name, g.revenue * 10 / 100, 10) }
  visitPotteryGuild(g: PotteryGuild) { this.collect(g.name, g.revenue * 8 / 100, 8) }
  visitCarpentryGuild(g: CarpentryGuild) { this.collect(g.name, g.revenue * 12 / 100, 12) }
}

// Concrete Visitor 2: inspects tribute goods only, so one method stays empty
class InspectorVisitor implements GuildVisitor {
  visitSilkWeaversGuild(g: SilkWeaversGuild) {
    console.log(\`🔍 \${g.name}: \${g.silkBoltCount} tấm lụa đạt chuẩn tiến vua\`)
  }
  visitPotteryGuild(g: PotteryGuild) {
    console.log(\`🔍 \${g.name}: \${g.kilnCount} lò nung, men gốm cần cải thiện\`)
  }
  visitCarpentryGuild(_g: CarpentryGuild) {
    // woodwork is not a tribute good: nothing to inspect
  }
}

// Client: a collection that works with guilds only through Guild
class Capital {
  private guilds: Guild[] = [new SilkWeaversGuild(), new PotteryGuild(), new CarpentryGuild()]

  welcomeVisitor(visitor: GuildVisitor) {
    for (const g of this.guilds) g.accept(visitor)
  }
}

const capital = new Capital()

console.log('=== QUAN THU THUẾ ===')
const taxCollector = new TaxCollectorVisitor()
capital.welcomeVisitor(taxCollector)
console.log(\`Tổng thuế: \${taxCollector.totalTax.toLocaleString('en-US')}đ\`)

console.log('=== QUAN KIỂM TRA ===')
capital.welcomeVisitor(new InspectorVisitor())`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'Visitor declares a visiting method for each concrete element class, taking that element as its argument. In languages with overloading the methods may share a name, but their parameter types differ. Each Concrete Visitor implements one operation, with a version for every concrete element class.' },
        { type: 'paragraph', text: 'Element declares accept(), with one parameter typed as the visitor interface. Each Concrete Element implements accept() by calling the visiting method for its own class. Even if a base element class implements accept(), every subclass must still override it to call the right method.' },
        { type: 'paragraph', text: 'Client is usually a collection or another complex object, such as a Composite tree, and works with elements through the Element interface without knowing their classes. The diagram omits the dependencies from the visiting methods\' parameter types to each concrete element class to keep the lines readable.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Visitor khai báo một phương thức thăm cho mỗi lớp phần tử cụ thể, nhận phần tử đó làm tham số. Với ngôn ngữ hỗ trợ nạp chồng, các phương thức có thể trùng tên nhưng kiểu tham số khác nhau. Mỗi Concrete Visitor cài đặt một thao tác, có một phiên bản cho từng lớp phần tử cụ thể.' },
        { type: 'paragraph', text: 'Element khai báo accept(), có một tham số kiểu giao diện visitor. Mỗi Concrete Element cài đặt accept() bằng cách gọi phương thức thăm ứng với lớp của mình. Kể cả khi lớp phần tử cơ sở đã cài đặt accept(), mọi lớp con vẫn phải ghi đè để gọi đúng phương thức.' },
        { type: 'paragraph', text: 'Client thường là một tập hợp hoặc đối tượng phức tạp khác, như cây Composite, và làm việc với các phần tử qua giao diện Element mà không cần biết lớp của chúng. Sơ đồ không vẽ các quan hệ phụ thuộc từ kiểu tham số của phương thức thăm tới từng lớp phần tử cụ thể, để đường nối dễ đọc.' },
      ],
    },
  },
]
