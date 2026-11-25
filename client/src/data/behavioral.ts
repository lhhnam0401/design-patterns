import type { Pattern } from '../types/pattern'

export const behavioralPatterns: Omit<Pattern, 'diagram'>[] = [
  {
    id: 'chain-of-responsibility',
    slug: 'chain-of-responsibility',
    name: { en: 'Chain of Responsibility', vi: 'Chuỗi Trách Nhiệm' },
    category: 'behavioral',
    complexity: 2,
    popularity: 2,
    also_known_as: [
      { en: 'CoR', vi: 'CoR' },
      { en: 'Chain of Command', vi: 'Chuỗi mệnh lệnh' },
    ],
    intent: {
      en: 'Chain of Responsibility is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.',
      vi: 'Chain of Responsibility là một mẫu thiết kế hành vi, cho phép bạn chuyển yêu cầu dọc theo một chuỗi các handler. Khi nhận được yêu cầu, mỗi handler quyết định hoặc tự xử lý yêu cầu, hoặc chuyển nó cho handler tiếp theo trong chuỗi.',
    },
    problem: {
      en: 'Imagine an online ordering system where only authenticated users may create orders, and users with administrative permissions get full access to all orders. These checks must run sequentially: if authentication fails, there is no reason to run any other check. Over the following months you add more sequential checks: a validation step that sanitizes the request data, a filter that blocks repeated failed requests from the same IP address to stop brute-force password cracking, and a check that returns a cached result for repeated requests with the same data. The code of the checks gets more bloated with every feature, changing one check sometimes affects the others, and reusing the checks to protect other components means duplicating code, because those components need some of the checks but not all of them. The system becomes very hard to understand and expensive to maintain.',
      vi: 'Hãy tưởng tượng một hệ thống đặt hàng trực tuyến, trong đó chỉ người dùng đã xác thực mới được tạo đơn hàng, còn người dùng có quyền quản trị được truy cập đầy đủ mọi đơn hàng. Các bước kiểm tra này phải chạy tuần tự: nếu xác thực thất bại thì không có lý do gì để chạy các bước kiểm tra khác. Trong vài tháng sau đó, bạn thêm nhiều bước kiểm tra tuần tự nữa: một bước làm sạch dữ liệu trong yêu cầu, một bộ lọc chặn các yêu cầu thất bại lặp lại từ cùng một địa chỉ IP để chống dò mật khẩu kiểu brute force, và một bước trả về kết quả đã cache cho các yêu cầu lặp lại có cùng dữ liệu. Mã kiểm tra ngày càng phình to theo từng tính năng, sửa một bước kiểm tra đôi khi ảnh hưởng tới các bước khác, và muốn dùng lại các bước kiểm tra để bảo vệ những thành phần khác thì phải sao chép mã, vì các thành phần đó chỉ cần một vài bước chứ không cần tất cả. Hệ thống trở nên rất khó hiểu và tốn kém để bảo trì.',
    },
    solution: {
      en: 'Turn particular behaviors into stand-alone objects called handlers: each check moves into its own class with a single method that performs it, and the request, along with its data, is passed to that method as an argument. Then link the handlers into a chain. Each handler has a field storing a reference to the next handler; besides processing the request, it passes the request further along, so the request travels until every handler has had a chance to process it. A handler can also decide not to pass the request on, which stops any further processing. In a slightly different and more canonical approach, a handler first decides whether it can process the request, and if it can, it does not pass it on; so either exactly one handler processes the request or none does. This is common for events in stacks of GUI elements: a click on a button propagates through its containers (forms, panels) up to the main window and is processed by the first element capable of handling it, which also shows that a chain can be extracted from an object tree. All handler classes must implement the same interface, and each concrete handler should only care that the next one has the execute method. This way you can compose chains at runtime without coupling your code to concrete handler classes.',
      vi: 'Biến các hành vi cụ thể thành những đối tượng độc lập gọi là handler: mỗi bước kiểm tra được tách ra một lớp riêng với một phương thức duy nhất thực hiện bước đó, còn yêu cầu cùng dữ liệu của nó được truyền vào phương thức này dưới dạng tham số. Sau đó nối các handler thành một chuỗi. Mỗi handler có một trường lưu tham chiếu tới handler kế tiếp; ngoài việc xử lý yêu cầu, nó còn chuyển yêu cầu đi tiếp, nhờ vậy yêu cầu đi dọc chuỗi cho tới khi mọi handler đều có cơ hội xử lý. Một handler cũng có thể quyết định không chuyển yêu cầu đi nữa, và khi đó việc xử lý dừng lại. Theo một cách làm hơi khác và chuẩn mực hơn, handler xét trước xem mình có xử lý được yêu cầu không; nếu được thì nó không chuyển yêu cầu đi tiếp, nên hoặc chỉ đúng một handler xử lý yêu cầu, hoặc không handler nào cả. Cách này rất phổ biến khi xử lý sự kiện trong chồng các phần tử giao diện: một cú nhấp vào nút được lan truyền qua các phần tử chứa nó (form, panel) lên tới cửa sổ chính, và được xử lý bởi phần tử đầu tiên có khả năng xử lý; ví dụ này cũng cho thấy một chuỗi luôn có thể được tách ra từ một cây đối tượng. Mọi lớp handler phải triển khai cùng một giao diện, và mỗi handler cụ thể chỉ cần biết handler kế tiếp có phương thức thực thi. Nhờ vậy bạn có thể ghép chuỗi lúc chạy mà mã không bị phụ thuộc vào các lớp handler cụ thể.',
    },
    applicability: {
      en: 'Use Chain of Responsibility when your program is expected to process different kinds of requests in various ways, but the exact types of requests and their sequences are unknown beforehand: you link several handlers into one chain and, when a request arrives, ask each handler whether it can process it, so every handler gets a chance. Use it when it is essential to execute several handlers in a particular order: since you can link the handlers in any order, all requests go through the chain exactly as you planned. Use it when the set of handlers and their order are supposed to change at runtime: if the handler classes provide setters for their reference field, you can insert, remove or reorder handlers dynamically.',
      vi: 'Dùng Chain of Responsibility khi chương trình phải xử lý nhiều loại yêu cầu theo nhiều cách khác nhau, nhưng chưa biết trước chính xác loại yêu cầu và thứ tự của chúng: bạn nối nhiều handler thành một chuỗi và khi có yêu cầu đến thì "hỏi" từng handler xem nó có xử lý được không, nhờ đó mọi handler đều có cơ hội. Dùng khi bắt buộc phải chạy nhiều handler theo một thứ tự nhất định: vì bạn có thể nối các handler theo bất kỳ thứ tự nào, mọi yêu cầu sẽ đi qua chuỗi đúng như bạn đã định. Dùng khi tập handler và thứ tự của chúng cần thay đổi lúc chạy: nếu các lớp handler có setter cho trường tham chiếu, bạn có thể chèn, gỡ bỏ hoặc sắp xếp lại các handler một cách linh động.',
    },
    vietnamese_example: {
      title: { en: 'Petitioning the Imperial Court', vi: 'Dâng Đơn Lên Triều Đình' },
      description: {
        en: 'In old Vietnam, a citizen\'s petition (Petition, the request object) travels up the ladder of officials. Each petition carries a level that says how much authority it takes to settle it, from 1 for a quarrel over a field boundary to 4 for a war. Official is the Handler interface, with setSuperior() and handle(). BaseOfficial is the Base Handler: it stores the superior official in superior and, by default, forwards the petition to him. The Concrete Handlers VillageChief (village chief), DistrictMagistrate (district magistrate), Prefect (prefect) and Emperor (the Emperor) may settle petitions up to level 1, 2, 3 and 4 respectively. Each one reads the level and either settles the petition or calls the base method to pass it up, so a petition stops at the lowest official with enough authority. The order of the links matters: if the Emperor stood first, he would end up settling every field quarrel himself. This is the canonical variant, where at most one official handles a petition. The client builds the chain with setSuperior() and files petitions with filePetition(). A land dispute filed directly with the district is settled there without the village chief. A request for rain, which no official has the power to grant, reaches the end of the chain and comes back unresolved.',
        vi: 'Thời xưa, lá đơn thỉnh cầu của người dân (Petition, đối tượng yêu cầu) được chuyển dần lên các cấp quan. Mỗi lá đơn mang một mức độ (level) cho biết cần quyền hạn tới đâu mới xử được, từ 1 cho một vụ tranh chấp bờ ruộng tới 4 cho chuyện chiến tranh. Official là giao diện Handler, gồm setSuperior() và handle(). BaseOfficial là Base Handler: nó lưu quan cấp trên trong superior và mặc định chuyển đơn lên cho người đó. Các Concrete Handler là VillageChief (xã trưởng), DistrictMagistrate (quan huyện), Prefect (tri phủ) và Emperor (Hoàng Đế), lần lượt được xử các lá đơn tới mức 1, 2, 3 và 4. Mỗi người xem mức độ của lá đơn rồi hoặc tự giải quyết, hoặc gọi phương thức của lớp cơ sở để chuyển đơn lên trên, nên lá đơn dừng lại ở vị quan thấp nhất đủ quyền xử nó. Thứ tự các mắt xích vì thế rất quan trọng: nếu Hoàng Đế đứng đầu chuỗi, ngài sẽ phải tự xử mọi vụ tranh chấp bờ ruộng. Đây là biến thể chuẩn mực, trong đó mỗi lá đơn được tối đa một vị quan xử lý. Client dựng chuỗi bằng setSuperior() và nộp đơn qua filePetition(). Lá đơn tranh chấp đất nộp thẳng lên huyện được xử ngay ở huyện mà không qua xã trưởng. Lá đơn xin trời làm mưa, việc không vị quan nào có quyền làm, sẽ đi tới cuối chuỗi rồi bị trả về.',
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
            return f"Xã Trưởng hòa giải: {petition.content}"
        return super().handle(petition)


class DistrictMagistrate(BaseOfficial):
    def handle(self, petition: Petition) -> Optional[str]:
        if petition.level <= 2:
            return f"Quan Huyện xét xử: {petition.content}"
        return super().handle(petition)


class Prefect(BaseOfficial):
    def handle(self, petition: Petition) -> Optional[str]:
        if petition.level <= 3:
            return f"Tri Phủ giải quyết: {petition.content}"
        return super().handle(petition)


class Emperor(BaseOfficial):
    def handle(self, petition: Petition) -> Optional[str]:
        if petition.level <= 4:
            return f"Hoàng Đế 👑 ra chiếu: {petition.content}"
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
# Xã Trưởng hòa giải: tranh chấp bờ ruộng
# Quan Huyện xét xử: mất trộm trâu
# Tri Phủ giải quyết: đê sông Hồng sắp vỡ
# Hoàng Đế 👑 ra chiếu: giặc tràn qua biên giới
# ❌ Không quan nào đủ quyền xử: xin trời làm mưa
# Đơn nộp thẳng lên huyện:
# Quan Huyện xét xử: lấn đất làng bên`,
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
    if (petition.level <= 1) return \`Xã Trưởng hòa giải: \${petition.content}\`
    return super.handle(petition)
  }
}

class DistrictMagistrate extends BaseOfficial {
  handle(petition: Petition): string | null {
    if (petition.level <= 2) return \`Quan Huyện xét xử: \${petition.content}\`
    return super.handle(petition)
  }
}

class Prefect extends BaseOfficial {
  handle(petition: Petition): string | null {
    if (petition.level <= 3) return \`Tri Phủ giải quyết: \${petition.content}\`
    return super.handle(petition)
  }
}

class Emperor extends BaseOfficial {
  handle(petition: Petition): string | null {
    if (petition.level <= 4) return \`Hoàng Đế 👑 ra chiếu: \${petition.content}\`
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
      en: 'Handler declares the interface common to all concrete handlers. It usually contains just a single method for handling requests, but sometimes also a method for setting the next handler in the chain. Base Handler is an optional class holding boilerplate shared by all handlers: usually a field storing a reference to the next handler, which clients set through the constructor or a setter of the previous handler, plus default handling behavior that passes execution to the next handler after checking that it exists. Concrete Handlers contain the actual code for processing requests: on receiving a request, each one decides whether to process it and whether to pass it along the chain. Handlers are usually self-contained and immutable, accepting all necessary data once through the constructor. Client may compose chains once or dynamically, depending on the application\'s logic, and a request can be sent to any handler in the chain, not only the first one. The diagram shows the link to the next handler as the superior field of BaseOfficial rather than as a separate arrow. Petition is not a role of its own in the structure; it is the request object every handler receives.',
      vi: 'Handler khai báo giao diện chung cho mọi handler cụ thể. Thường nó chỉ có một phương thức xử lý yêu cầu, nhưng đôi khi có thêm phương thức đặt handler kế tiếp trong chuỗi. Base Handler là lớp tùy chọn chứa phần mã lặp lại dùng chung cho mọi handler: thường là một trường lưu tham chiếu tới handler kế tiếp, được client gán qua hàm khởi tạo hoặc setter của handler đứng trước, cùng hành vi xử lý mặc định là chuyển việc cho handler kế tiếp sau khi kiểm tra nó có tồn tại. Concrete Handler chứa mã xử lý yêu cầu thực sự: khi nhận yêu cầu, mỗi handler quyết định có xử lý nó không và có chuyển nó đi dọc chuỗi không. Handler thường độc lập và bất biến, nhận mọi dữ liệu cần thiết một lần qua hàm khởi tạo. Client có thể ghép chuỗi một lần hoặc ghép linh động tùy logic ứng dụng, và yêu cầu có thể được gửi tới bất kỳ handler nào trong chuỗi, không nhất thiết là handler đầu tiên. Sơ đồ thể hiện liên kết tới handler kế tiếp bằng trường superior của BaseOfficial thay vì vẽ một mũi tên riêng. Petition không phải một vai trò riêng trong cấu trúc; nó là đối tượng yêu cầu mà mọi handler nhận vào.',
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
      en: 'Command is a behavioral design pattern that turns a request into a stand-alone object that contains all information about the request. This transformation lets you pass requests as method arguments, delay or queue a request\'s execution, and support undoable operations.',
      vi: 'Command là một mẫu thiết kế hành vi, biến một yêu cầu thành một đối tượng độc lập chứa mọi thông tin về yêu cầu đó. Phép biến đổi này cho phép bạn truyền yêu cầu làm tham số của phương thức, trì hoãn hoặc xếp hàng việc thực thi yêu cầu, và hỗ trợ các thao tác có thể hoàn tác.',
    },
    problem: {
      en: 'Imagine a new text-editor app. You build a neat Button class that is used for the toolbar and for generic buttons in various dialogs. The buttons look alike but must do different things, so the simplest option is a subclass for every place a button is used, holding the code to run on click. Soon you have an enormous number of subclasses that risk breaking whenever you modify the base Button class: the GUI code has become awkwardly dependent on the volatile code of the business logic. Worse, some operations, such as copying and pasting text, must be invoked from several places: a small Copy button on the toolbar, the context menu, or Ctrl+C on the keyboard. Once you add context menus and shortcuts, you must either duplicate the operation\'s code in many classes or make menus dependent on buttons, which is even worse.',
      vi: 'Hãy tưởng tượng bạn đang viết một ứng dụng soạn thảo văn bản mới. Bạn tạo một lớp Button gọn gàng, dùng cho các nút trên thanh công cụ lẫn các nút thông thường trong nhiều hộp thoại. Các nút trông giống nhau nhưng phải làm những việc khác nhau, nên cách đơn giản nhất là tạo một lớp con cho mỗi chỗ dùng nút, chứa đoạn mã chạy khi nhấp. Chẳng bao lâu bạn có vô số lớp con, và chúng có nguy cơ hỏng mỗi khi bạn sửa lớp Button cơ sở: mã giao diện đã phụ thuộc một cách vụng về vào mã nghiệp vụ hay thay đổi. Tệ hơn nữa, một số thao tác như sao chép và dán văn bản phải được gọi từ nhiều nơi: nút Copy nhỏ trên thanh công cụ, menu ngữ cảnh, hoặc tổ hợp phím Ctrl+C. Khi thêm menu ngữ cảnh và phím tắt, bạn buộc phải hoặc sao chép mã của thao tác vào nhiều lớp, hoặc cho menu phụ thuộc vào các nút, và cách sau còn tệ hơn.',
    },
    solution: {
      en: 'Good design separates concerns, usually into layers such as a GUI layer and a business logic layer. When the GUI needs something important done, it calls a method of a business logic object with some arguments, which is described as one object sending another a request. The Command pattern says GUI objects shouldn\'t send these requests directly. Instead, extract all of the request details (the object being called, the name of the method and the list of arguments) into a separate command class with a single method that triggers the request. Commands become links between GUI and business logic objects: the GUI object no longer needs to know which business object will receive the request or how it will be processed; it just triggers the command. Next, make all commands implement the same interface, usually a single execution method that takes no parameters. This lets one sender work with various commands without being coupled to their concrete classes, and you can switch the command linked to a sender to change its behavior at runtime. Since the execution method has no parameters, the command must either be pre-configured with the request data or be able to get it on its own. In the text editor, the base Button class just needs one field referencing a command and executes it on click; menus, shortcuts and dialogs linked to the same operation share the same command, so no code is duplicated. Commands become a convenient middle layer that reduces coupling between the GUI and business logic layers.',
      vi: 'Thiết kế tốt thường tách biệt các mối quan tâm, thường thành các tầng như tầng giao diện và tầng nghiệp vụ. Khi cần làm việc gì quan trọng, tầng giao diện gọi một phương thức của đối tượng nghiệp vụ kèm vài tham số, và quá trình này được mô tả là một đối tượng gửi yêu cầu cho đối tượng khác. Mẫu Command cho rằng đối tượng giao diện không nên gửi trực tiếp các yêu cầu này. Thay vào đó, hãy tách mọi chi tiết của yêu cầu (đối tượng được gọi, tên phương thức và danh sách tham số) ra một lớp command riêng, có một phương thức duy nhất để kích hoạt yêu cầu. Command trở thành cầu nối giữa đối tượng giao diện và đối tượng nghiệp vụ: đối tượng giao diện không cần biết đối tượng nghiệp vụ nào sẽ nhận yêu cầu hay yêu cầu được xử lý ra sao; nó chỉ việc kích hoạt command. Bước tiếp theo là cho mọi command triển khai cùng một giao diện, thường chỉ có một phương thức thực thi không nhận tham số. Nhờ đó một sender có thể làm việc với nhiều command khác nhau mà không phụ thuộc vào lớp cụ thể của chúng, và bạn có thể đổi command gắn với sender để thay đổi hành vi của nó lúc chạy. Vì phương thức thực thi không có tham số, command phải được cấu hình sẵn dữ liệu của yêu cầu hoặc tự lấy được dữ liệu đó. Trong ứng dụng soạn thảo, lớp Button cơ sở chỉ cần một trường tham chiếu tới command và thực thi nó khi được nhấp; menu, phím tắt và hộp thoại gắn với cùng một thao tác sẽ dùng chung một command, nên không còn mã bị lặp. Command trở thành một tầng trung gian tiện lợi giúp giảm sự phụ thuộc giữa tầng giao diện và tầng nghiệp vụ.',
    },
    applicability: {
      en: 'Use Command when you want to parameterize objects with operations: a command turns a specific method call into a stand-alone object, so you can pass commands as method arguments, store them inside other objects or switch linked commands at runtime, for example to let users configure context menu items that trigger operations. Use it when you want to queue operations, schedule their execution or execute them remotely: like any other object, a command can be serialized to a string that can be written to a file or a database and later restored as the original command, so you can delay and schedule its execution, and in the same way queue, log or send commands over the network. Use it when you want to implement reversible operations: Command is perhaps the most popular way to implement undo/redo. You keep a history, a stack of executed command objects together with backups of the application\'s state. This has two drawbacks. First, saving the application\'s state isn\'t easy because some of it can be private, which the Memento pattern can mitigate. Second, the state backups may consume a lot of RAM, so instead a command can perform the inverse operation rather than restore a past state, although the inverse operation may be hard or even impossible to implement.',
      vi: 'Dùng Command khi muốn tham số hóa đối tượng bằng các thao tác: command biến một lời gọi phương thức cụ thể thành một đối tượng độc lập, nên bạn có thể truyền command làm tham số của phương thức, lưu nó bên trong đối tượng khác hoặc đổi command được gắn lúc chạy, ví dụ để người dùng tự cấu hình các mục trong menu ngữ cảnh kích hoạt thao tác nào. Dùng khi muốn xếp hàng thao tác, lên lịch thực thi hoặc thực thi từ xa: như mọi đối tượng khác, command có thể được tuần tự hóa thành chuỗi để ghi vào tệp hoặc cơ sở dữ liệu, rồi sau đó khôi phục lại thành command ban đầu, nhờ vậy bạn có thể trì hoãn và lên lịch thực thi, và theo cách tương tự có thể xếp hàng, ghi log hoặc gửi command qua mạng. Dùng khi muốn triển khai các thao tác có thể đảo ngược: Command có lẽ là cách phổ biến nhất để làm undo/redo. Bạn lưu một lịch sử, tức một ngăn xếp gồm các command đã thực thi cùng bản sao lưu trạng thái ứng dụng. Cách này có hai nhược điểm. Thứ nhất, lưu trạng thái ứng dụng không dễ vì một phần trạng thái có thể là riêng tư; mẫu Memento có thể giảm bớt vấn đề này. Thứ hai, các bản sao lưu trạng thái có thể tốn nhiều RAM, nên command có thể thực hiện thao tác ngược thay vì khôi phục trạng thái cũ, dù thao tác ngược có thể khó hoặc thậm chí không thể triển khai.',
    },
    vietnamese_example: {
      title: { en: 'Royal Decree System (Chiếu Chỉ)', vi: 'Hệ Thống Chiếu Chỉ Triều Đình' },
      description: {
        en: 'At the imperial court, the Emperor\'s decrees (chiếu chỉ) are command objects. Decree is the Command interface, with execute() and undo(). BuildCitadelCommand and CutTaxCommand are Concrete Commands: each stores its receiver, the city City, plus any parameter (how many percent of tax to cut) as fields set in the constructor, and passes the call on to the city\'s buildCitadel(), demolishCitadel(), cutTax() or raiseTax() methods. City is the Receiver that does the real work. RoyalSecretary, the royal secretary, is the Sender: he receives finished decrees, keeps them in a queue until proclamation day, executes them with proclaim() and records each one in a history, so revoke() can revoke the latest decree by calling its undo(). The secretary only knows the Decree interface and never writes a decree himself. The client code plays the Emperor: it creates the city, writes the decrees and hands them to the secretary. Undo here uses the inverse operation (tear the citadel down, raise the tax back) rather than a state backup.',
        vi: 'Ở triều đình, chiếu chỉ của Hoàng Đế chính là các đối tượng command. Decree là giao diện Command, gồm execute() và undo(). BuildCitadelCommand và CutTaxCommand là các Concrete Command: mỗi chiếu lưu receiver của nó, tức thành phố City, cùng các tham số (giảm thuế bao nhiêu phần trăm) trong các trường được gán qua hàm khởi tạo, rồi chuyển lời gọi tới các phương thức buildCitadel(), demolishCitadel(), cutTax() hoặc raiseTax() của thành phố. City là Receiver làm công việc thực sự. RoyalSecretary, viên thư ký hoàng gia, là Sender: ông nhận các chiếu chỉ đã soạn sẵn, giữ chúng trong hàng chờ đến ngày ban bố, thực thi chúng bằng proclaim() và ghi từng chiếu vào sổ lịch sử, nhờ vậy revoke() có thể thu hồi chiếu gần nhất bằng cách gọi undo() của nó. Thư ký chỉ biết giao diện Decree và không bao giờ tự soạn chiếu. Mã client đóng vai Hoàng Đế: tạo thành phố, soạn chiếu chỉ rồi giao cho thư ký. Ở đây undo dùng thao tác ngược (dỡ thành, tăng thuế trở lại) thay vì sao lưu trạng thái.',
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
      en: 'Sender (also called Invoker) is responsible for initiating requests. It has a field storing a reference to a command object and triggers that command instead of sending the request directly to the receiver. The sender isn\'t responsible for creating the command object; it usually gets a pre-created command from the client via the constructor. Command interface usually declares just a single method for executing the command. Concrete Commands implement various kinds of requests. A concrete command isn\'t supposed to do the work on its own but to pass the call to one of the business logic objects, although these classes can be merged to simplify the code. Parameters needed to call a method on the receiving object can be declared as fields of the concrete command, and the command can be made immutable by allowing those fields to be set only through the constructor. Receiver contains some business logic, and almost any object can act as one: most commands only handle the details of how a request reaches the receiver, while the receiver does the actual work. Client creates and configures concrete command objects, passing all request parameters, including a receiver instance, into the command\'s constructor; the resulting command can then be associated with one or more senders. In this example the Command interface also declares undo() and the sender keeps a queue and a history; these support the queuing and undo uses of the pattern and are not part of its minimal structure.',
      vi: 'Sender (còn gọi là Invoker) chịu trách nhiệm khởi phát yêu cầu. Nó có một trường lưu tham chiếu tới đối tượng command và kích hoạt command đó thay vì gửi yêu cầu thẳng tới receiver. Sender không chịu trách nhiệm tạo command; thông thường nó nhận một command đã tạo sẵn từ client qua hàm khởi tạo. Giao diện Command thường chỉ khai báo một phương thức duy nhất để thực thi command. Concrete Command triển khai các loại yêu cầu khác nhau. Concrete command không tự làm công việc mà chuyển lời gọi cho một đối tượng nghiệp vụ, dù có thể gộp hai lớp này để mã đơn giản hơn. Các tham số cần để gọi phương thức trên đối tượng nhận có thể được khai báo thành trường của concrete command, và có thể làm command bất biến bằng cách chỉ cho phép gán các trường này qua hàm khởi tạo. Receiver chứa logic nghiệp vụ, và hầu như đối tượng nào cũng có thể làm receiver: phần lớn command chỉ lo chi tiết chuyển yêu cầu tới receiver, còn receiver mới làm công việc thực sự. Client tạo và cấu hình các concrete command, truyền mọi tham số của yêu cầu, kể cả một thể hiện receiver, vào hàm khởi tạo của command; sau đó command có thể được gắn với một hoặc nhiều sender. Trong ví dụ này, giao diện Command còn khai báo undo() và sender giữ một hàng chờ cùng sổ lịch sử; các phần này phục vụ việc xếp hàng và hoàn tác, không thuộc cấu trúc tối thiểu của mẫu.',
    },
  },

  {
    id: 'interpreter',
    slug: 'interpreter',
    name: { en: 'Interpreter', vi: 'Thông Dịch' },
    category: 'behavioral',
    complexity: 3,
    popularity: 1,
    intent: {
      en: 'Interpreter turns each rule of a small language into a class, so that a sentence in that language becomes a tree of objects that can work out its own meaning.',
      vi: 'Interpreter biến mỗi quy tắc của một ngôn ngữ nhỏ thành một lớp, nhờ đó mỗi câu trong ngôn ngữ ấy trở thành một cây đối tượng tự tính ra được ý nghĩa của mình.',
    },
    problem: {
      en: 'Some programs keep receiving short sentences in a tiny language of their own: a search box that accepts "red AND (shoes OR boots)", a pricing rule such as "10% off orders above 500.000", a unit converter, or an amount of money written out in words. The quick fix is one function full of string checks and nested ifs. It copes with the first few sentences, but after that every new word or rule means reopening the function, and the grammar lives only in the head of whoever wrote it. When the same sentences need a second job, such as printing them back or checking them for mistakes, someone writes a second tangle that has to agree with the first.',
      vi: 'Có những chương trình liên tục nhận vào các câu ngắn viết bằng một ngôn ngữ rất nhỏ của riêng chúng: ô tìm kiếm chấp nhận "đỏ AND (giày OR ủng)", một luật giá như "giảm 10% cho đơn trên 500.000", một bộ đổi đơn vị, hay một số tiền được viết bằng chữ. Cách làm nhanh là viết một hàm đầy những phép so sánh chuỗi và if lồng nhau. Hàm đó đối phó được vài câu đầu, nhưng sau đó mỗi chữ hay quy tắc mới lại buộc phải mở hàm ra sửa, còn ngữ pháp chỉ nằm trong đầu người đã viết nó. Khi cùng những câu ấy cần thêm một việc khác, chẳng hạn in lại hay kiểm tra lỗi, ai đó lại viết thêm một mớ rối thứ hai và phải giữ cho nó khớp với mớ thứ nhất.',
    },
    solution: {
      en: 'Write the grammar down as a handful of rules, then give each rule its own class. Symbols that stand alone, such as a single number word, become terminal expressions. Rules that combine other parts, such as "a number times a unit", become nonterminal expressions that keep their parts as fields. A sentence is then represented as a tree of these objects, called an abstract syntax tree. To find out what the sentence means, the client calls interpret() on the root. Every node interprets its children first and combines their results, so the work spreads down the tree on its own. Turning text into the tree is a separate job: the pattern does not say how to parse, and a small hand-written parser is usually enough. Because each rule is a class, a new rule means a new class, and a new way of reading the tree, such as printing it, means a new method on the expression classes.',
      vi: 'Hãy viết ngữ pháp ra thành một vài quy tắc, rồi cho mỗi quy tắc một lớp riêng. Những ký hiệu đứng một mình, chẳng hạn một chữ số, trở thành biểu thức kết thúc (terminal expression). Những quy tắc ghép các phần khác lại, chẳng hạn "một số nhân với một đơn vị", trở thành biểu thức không kết thúc (nonterminal expression), giữ các phần của nó làm trường. Khi đó mỗi câu được biểu diễn bằng một cây gồm các đối tượng này, gọi là cây cú pháp trừu tượng (abstract syntax tree). Muốn biết câu mang nghĩa gì, client gọi interpret() trên nút gốc. Mỗi nút thông dịch các nút con trước rồi kết hợp kết quả của chúng, nên công việc tự lan xuống khắp cây. Biến văn bản thành cây là một việc riêng: mẫu này không quy định cách phân tích cú pháp (parse), và thường chỉ cần một bộ phân tích nhỏ tự viết. Vì mỗi quy tắc là một lớp, thêm quy tắc mới nghĩa là thêm lớp mới, còn thêm một cách đọc cây mới, chẳng hạn in cây ra, nghĩa là thêm một phương thức vào các lớp biểu thức.',
    },
    applicability: {
      en: 'Use Interpreter when a problem keeps arriving as sentences in a simple language and you want the grammar to be visible in the code: search filters, pricing or validation rules, unit formulas, small query or template languages. It suits grammars with a few dozen rules at most. With hundreds of rules the class hierarchy becomes hard to manage, and a parser generator or an existing library is the better tool. It also assumes that speed is not critical. Walking a tree of objects is slower than running a sentence that has been translated into something flatter first, which is why fast regular-expression engines turn each expression into a state machine before matching. If what you mostly need is many different operations over a grammar that rarely changes, pair the tree with Visitor instead of adding a method to every class.',
      vi: 'Dùng Interpreter khi một bài toán liên tục xuất hiện dưới dạng các câu trong một ngôn ngữ đơn giản và bạn muốn ngữ pháp hiện rõ trong mã: bộ lọc tìm kiếm, luật tính giá hay luật kiểm tra dữ liệu, công thức đổi đơn vị, ngôn ngữ truy vấn hay ngôn ngữ mẫu (template) nhỏ. Mẫu này hợp với những ngữ pháp có nhiều nhất vài chục quy tắc. Khi có hàng trăm quy tắc, cây phân cấp lớp trở nên khó quản lý, và một công cụ sinh bộ phân tích cú pháp hay một thư viện có sẵn sẽ phù hợp hơn. Mẫu này cũng giả định rằng tốc độ không quá quan trọng. Duyệt một cây đối tượng chậm hơn chạy một câu đã được dịch trước sang dạng phẳng hơn, vì thế các bộ máy biểu thức chính quy nhanh thường biến mỗi biểu thức thành một máy trạng thái rồi mới so khớp. Nếu điều bạn cần chủ yếu là nhiều thao tác khác nhau trên một ngữ pháp ít thay đổi, hãy ghép cây với Visitor thay vì thêm một phương thức vào mọi lớp.',
    },
    vietnamese_example: {
      title: { en: 'Reading an Amount Written in Words', vi: 'Đọc Số Tiền Viết Bằng Chữ' },
      description: {
        en: 'On Vietnamese invoices, receipts and bank slips, the total is written twice: once in digits and once in words after "Bằng chữ:" ("in words"), so that nobody can quietly add a zero. ReceiptReader reads the words back into a number so the two can be compared. The language is small. Không to chín are the digits, and a few of them change with position: mốt and tư replace một and bốn right after mươi (hai mươi mốt is 21), lăm or nhăm replaces năm right after mười or mươi (mười lăm is 15), and linh, or lẻ in the South, marks an empty tens place (sáu trăm linh năm is 605). Mươi and trăm multiply the word just before them by ten and a hundred; nghìn, or ngàn in the South, and triệu multiply the whole group before them by a thousand and a million. AmountExpression is the abstract expression, with interpret(). NumberWord is the terminal expression: one word and its value. Multiply and Add are the nonterminal expressions: each holds two smaller expressions and combines what they interpret to. "Bảy mươi lăm nghìn" becomes the tree (bảy × mươi + lăm) × nghìn, and interpreting it gives 75.000. The reader\'s parse() builds the tree; parsing sits outside the pattern, which only describes how the tree is represented and evaluated. explain() is a second operation on the same tree that prints it with brackets.',
        vi: 'Trên hóa đơn, biên lai và giấy nộp tiền ở Việt Nam, số tiền được ghi hai lần: một lần bằng số và một lần bằng chữ sau dòng "Bằng chữ:", để không ai lén thêm được một số 0. ReceiptReader đọc phần chữ thành con số để so với phần số. Ngôn ngữ này rất nhỏ. Từ không đến chín là các chữ số, và vài chữ đổi cách viết theo vị trí: mốt và tư thay cho một và bốn khi đứng ngay sau mươi (hai mươi mốt là 21), lăm hoặc nhăm thay cho năm khi đứng ngay sau mười hoặc mươi (mười lăm là 15), còn linh, hay lẻ ở miền Nam, đánh dấu hàng chục bị trống (sáu trăm linh năm là 605). Mươi và trăm nhân chữ đứng ngay trước chúng với mười và một trăm; nghìn, hay ngàn ở miền Nam, và triệu nhân cả nhóm đứng trước với một nghìn và một triệu. AmountExpression là biểu thức trừu tượng, có interpret(). NumberWord là biểu thức kết thúc: một chữ cùng giá trị của nó. Multiply và Add là các biểu thức không kết thúc: mỗi lớp giữ hai biểu thức nhỏ hơn và kết hợp kết quả thông dịch của chúng. "Bảy mươi lăm nghìn" trở thành cây (bảy × mươi + lăm) × nghìn, và thông dịch cây đó cho ra 75.000. Phương thức parse() của ReceiptReader dựng cây; việc phân tích cú pháp nằm ngoài mẫu, vì mẫu chỉ mô tả cách biểu diễn và tính giá trị của cây. explain() là thao tác thứ hai trên cùng cái cây, in cây ra kèm dấu ngoặc.',
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
      en: 'The Gang of Four name five participants. AbstractExpression declares the interpret operation that every node of the syntax tree shares; here it is AmountExpression. A TerminalExpression handles one symbol of the grammar and has no children; NumberWord is a single word such as bảy or nghìn. A NonterminalExpression stands for one rule that combines other symbols. It keeps a field for each part and interprets itself by interpreting those parts; Multiply and Add each hold a left and a right expression. Context carries information the whole tree needs while it is being interpreted, such as the values of variables. Every Vietnamese number word has a fixed value, so this example needs no Context. The Client builds the syntax tree, or is handed one, and calls interpret() on its root; ReceiptReader does both. The syntax tree is a Composite: nonterminal expressions are containers and terminal expressions are leaves. Identical terminals can be shared as flyweights, because a word like mươi means the same thing wherever it appears. When the list of operations keeps growing, a Visitor can hold them instead of the expression classes.',
      vi: 'Gang of Four nêu năm thành phần. AbstractExpression khai báo thao tác interpret mà mọi nút của cây cú pháp đều có; ở đây là AmountExpression. TerminalExpression xử lý một ký hiệu của ngữ pháp và không có nút con; NumberWord là một chữ như bảy hay nghìn. NonterminalExpression đại diện cho một quy tắc ghép các ký hiệu khác lại. Nó giữ một trường cho mỗi phần và tự thông dịch bằng cách thông dịch các phần đó; Multiply và Add mỗi lớp giữ một biểu thức bên trái và một biểu thức bên phải. Context chứa thông tin mà cả cây cần trong lúc được thông dịch, chẳng hạn giá trị của các biến. Mỗi chữ số tiếng Việt có giá trị cố định, nên ví dụ này không cần Context. Client dựng cây cú pháp, hoặc nhận một cây có sẵn, rồi gọi interpret() trên nút gốc; ReceiptReader làm cả hai việc. Cây cú pháp chính là một Composite: các biểu thức không kết thúc là vật chứa, các biểu thức kết thúc là lá. Những nút kết thúc giống nhau có thể được dùng chung theo kiểu Flyweight, vì một chữ như mươi mang cùng một nghĩa ở bất cứ đâu nó xuất hiện. Khi danh sách thao tác cứ dài thêm, Visitor có thể giữ các thao tác đó thay cho các lớp biểu thức.',
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
      en: 'Iterator is a behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).',
      vi: 'Iterator là một mẫu thiết kế hành vi, cho phép bạn duyệt qua các phần tử của một tập hợp mà không làm lộ cấu trúc biểu diễn bên dưới của nó (danh sách, ngăn xếp, cây, v.v.).',
    },
    problem: {
      en: 'Collections are one of the most used data types, yet a collection is just a container for a group of objects. Most collections store their elements in simple lists, but some are built on stacks, trees, graphs and other complex structures. Whatever the structure, the collection must provide a way to go through each element without visiting the same ones over and over. That is easy for a list, but a tree might need depth-first traversal one day, breadth-first the next, and random access the week after. Adding more and more traversal algorithms to the collection gradually blurs its primary responsibility, which is efficient data storage, and some algorithms are tailored to one specific application, so putting them into a generic collection class would be odd. Meanwhile, client code that doesn\'t care how elements are stored still has to couple itself to specific collection classes, because each collection offers its own way of accessing elements.',
      vi: 'Tập hợp (collection) là một trong những kiểu dữ liệu được dùng nhiều nhất, nhưng suy cho cùng nó chỉ là nơi chứa một nhóm đối tượng. Phần lớn tập hợp lưu phần tử trong danh sách đơn giản, nhưng có những tập hợp được xây dựng trên ngăn xếp, cây, đồ thị và các cấu trúc phức tạp khác. Dù cấu trúc ra sao, tập hợp vẫn phải cung cấp cách đi qua từng phần tử mà không lặp lại những phần tử đã đi qua. Với danh sách thì việc này dễ, nhưng với cây, hôm nay bạn có thể cần duyệt theo chiều sâu, hôm sau cần duyệt theo chiều rộng, tuần sau lại cần truy cập ngẫu nhiên. Thêm ngày càng nhiều thuật toán duyệt vào tập hợp sẽ làm lu mờ trách nhiệm chính của nó là lưu trữ dữ liệu hiệu quả, và có những thuật toán chỉ phục vụ một ứng dụng cụ thể, nên đặt chúng vào một lớp tập hợp dùng chung là không hợp lý. Trong khi đó, mã client vốn không quan tâm phần tử được lưu thế nào vẫn buộc phải phụ thuộc vào từng lớp tập hợp cụ thể, vì mỗi tập hợp lại có cách truy cập phần tử riêng.',
    },
    solution: {
      en: 'Extract the traversal behavior of a collection into a separate object called an iterator. Besides implementing the algorithm itself, the iterator encapsulates all traversal details, such as the current position and how many elements are left until the end. Because of this, several iterators can go through the same collection at the same time, independently of each other. Iterators usually provide one primary method for fetching elements; the client keeps calling it until it returns nothing, which means every element has been traversed. All iterators implement the same interface, which makes the client compatible with any collection type or traversal algorithm as long as a proper iterator exists. When you need a special way to traverse a collection, you create a new iterator class without changing the collection or the client.',
      vi: 'Tách hành vi duyệt của tập hợp ra một đối tượng riêng gọi là iterator. Ngoài việc cài đặt thuật toán duyệt, iterator còn đóng gói mọi chi tiết của quá trình duyệt, như vị trí hiện tại và còn bao nhiêu phần tử nữa thì hết. Nhờ vậy, nhiều iterator có thể cùng lúc duyệt một tập hợp mà không ảnh hưởng đến nhau. Iterator thường có một phương thức chính để lấy phần tử; client cứ gọi phương thức này cho đến khi nó không trả về gì nữa, nghĩa là đã duyệt hết mọi phần tử. Mọi iterator đều triển khai cùng một giao diện, nên client có thể làm việc với bất kỳ loại tập hợp hay thuật toán duyệt nào, miễn là có iterator phù hợp. Khi cần một cách duyệt đặc biệt, bạn chỉ cần tạo một lớp iterator mới mà không phải sửa tập hợp hay client.',
    },
    applicability: {
      en: 'Use Iterator when your collection has a complex data structure under the hood but you want to hide that complexity from clients, for convenience or for security: the iterator gives the client a few simple methods for accessing elements, and it protects the collection from careless or malicious actions the client could perform if it worked with the collection directly. Use it to reduce duplication of traversal code across your app: non-trivial iteration algorithms tend to be bulky, and when placed inside business logic they blur that code\'s responsibility and make it harder to maintain, so moving them into dedicated iterators keeps the application code lean and clean. Use it when your code must be able to traverse different data structures, or when the types of those structures are unknown beforehand: the pattern provides generic interfaces for both collections and iterators, so code written against those interfaces keeps working when you pass it any collection and iterator that implement them.',
      vi: 'Dùng Iterator khi tập hợp có cấu trúc dữ liệu phức tạp bên dưới nhưng bạn muốn che giấu sự phức tạp đó khỏi client, vì sự tiện lợi hoặc vì an toàn: iterator cho client vài phương thức đơn giản để truy cập phần tử, đồng thời bảo vệ tập hợp khỏi những thao tác bất cẩn hoặc có ý đồ xấu mà client có thể làm nếu được truy cập trực tiếp. Dùng mẫu này để giảm việc lặp lại mã duyệt trong ứng dụng: thuật toán duyệt không đơn giản thường cồng kềnh, và khi nằm lẫn trong logic nghiệp vụ, chúng làm lu mờ trách nhiệm của đoạn mã đó và khiến nó khó bảo trì, nên chuyển chúng vào các iterator riêng giúp mã ứng dụng gọn và sạch hơn. Dùng Iterator khi mã cần duyệt được nhiều cấu trúc dữ liệu khác nhau, hoặc khi chưa biết trước kiểu của các cấu trúc đó: mẫu này cung cấp giao diện chung cho cả tập hợp lẫn iterator, nên mã viết theo các giao diện đó vẫn chạy đúng khi bạn truyền vào bất kỳ tập hợp và iterator nào triển khai chúng.',
    },
    vietnamese_example: {
      title: { en: 'Touring Vietnamese Historical Sites', vi: 'Du Lịch Các Di Tích Lịch Sử Việt Nam' },
      description: {
        en: 'Hanoi\'s historical sites form the collection. HanoiTour (the Concrete Collection) stores them grouped by district in a map of lists, a detail no visitor needs to know. It implements SiteCollection and hands out two kinds of TourIterator: ByDistrictIterator walks district by district (Hoàn Kiếm, then Ba Đình, then Đống Đa), and ByEraIterator sorts the sites once, on first use, and walks from the oldest, Hoàng Thành Thăng Long (1010), to the newest, Lăng Bác (1975). The tourist Tourist is the client: its visit() method only calls hasMore() and getNext(), so the same code follows either route. Each iterator keeps its own position, so two iterators can walk the same collection at the same time without disturbing each other. A new route, such as a VIP tour, would be one new iterator class, with no change to HanoiTour or Tourist.',
        vi: 'Các di tích lịch sử của Hà Nội tạo thành tập hợp. HanoiTour (Concrete Collection) lưu chúng theo từng quận trong một bảng ánh xạ quận sang danh sách di tích, chi tiết mà du khách không cần biết. Lớp này triển khai SiteCollection và cung cấp hai loại TourIterator: ByDistrictIterator đi lần lượt từng quận (Hoàn Kiếm, rồi Ba Đình, rồi Đống Đa), còn ByEraIterator sắp xếp các di tích một lần ở lần dùng đầu tiên rồi đi từ di tích cổ nhất là Hoàng Thành Thăng Long (1010) đến mới nhất là Lăng Bác (1975). Du khách Tourist là client: phương thức visit() chỉ gọi hasMore() và getNext(), nên cùng một đoạn mã đi được cả hai lộ trình. Mỗi iterator tự giữ vị trí của mình, nên hai iterator có thể cùng lúc duyệt một tập hợp mà không ảnh hưởng nhau. Muốn thêm lộ trình mới, chẳng hạn tour VIP, chỉ cần thêm một lớp iterator, không phải sửa HanoiTour hay Tourist.',
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
      en: 'The Iterator interface declares the operations required for traversing a collection: fetching the next element, retrieving the current position, restarting iteration, etc. Concrete Iterators implement specific traversal algorithms and track the traversal progress on their own, which lets several iterators traverse the same collection independently. The Iterable Collection interface declares one or more methods for getting iterators; their return type must be the iterator interface so that concrete collections can return various kinds of iterators. Concrete Collections return a new instance of a particular concrete iterator each time the client requests one; the rest of the collection\'s code lives in the same class but is not essential to the pattern. The Client works with both collections and iterators through their interfaces, so it isn\'t coupled to concrete classes and the same client code works with various collections and iterators. Clients usually get iterators from collections, but a client can create one directly, for example when it defines its own special iterator. Here TourIterator is the Iterator, ByDistrictIterator and ByEraIterator are Concrete Iterators, SiteCollection is the Iterable Collection, HanoiTour is the Concrete Collection and Tourist is the Client. For space, the diagram draws the "creates" arrow only to ByDistrictIterator (HanoiTour creates ByEraIterator the same way) and leaves out the Site element class.',
      vi: 'Giao diện Iterator khai báo các thao tác cần để duyệt tập hợp: lấy phần tử tiếp theo, lấy vị trí hiện tại, bắt đầu duyệt lại, v.v. Concrete Iterator cài đặt từng thuật toán duyệt cụ thể và tự theo dõi tiến độ duyệt, nhờ đó nhiều iterator có thể duyệt cùng một tập hợp một cách độc lập. Giao diện Iterable Collection khai báo một hoặc nhiều phương thức để lấy iterator; kiểu trả về phải là giao diện iterator để các tập hợp cụ thể có thể trả về nhiều loại iterator khác nhau. Concrete Collection trả về một đối tượng mới của một lớp iterator cụ thể mỗi khi client yêu cầu; phần mã còn lại của tập hợp vẫn nằm trong cùng lớp nhưng không quan trọng đối với mẫu này. Client làm việc với cả tập hợp lẫn iterator qua giao diện của chúng, nên không phụ thuộc vào lớp cụ thể và cùng một đoạn mã client dùng được với nhiều loại tập hợp và iterator. Client thường lấy iterator từ tập hợp, nhưng cũng có thể tự tạo iterator, chẳng hạn khi client định nghĩa iterator đặc biệt của riêng mình. Ở đây TourIterator là Iterator, ByDistrictIterator và ByEraIterator là Concrete Iterator, SiteCollection là Iterable Collection, HanoiTour là Concrete Collection và Tourist là Client. Để tiết kiệm chỗ, sơ đồ chỉ vẽ mũi tên "creates" tới ByDistrictIterator (HanoiTour tạo ByEraIterator theo cách tương tự) và lược bỏ lớp phần tử Site.',
    },
  },

  {
    id: 'mediator',
    slug: 'mediator',
    name: { en: 'Mediator', vi: 'Trung Gian' },
    category: 'behavioral',
    complexity: 2,
    popularity: 1,
    also_known_as: [
      { en: 'Intermediary', vi: 'Người trung gian' },
      { en: 'Controller', vi: 'Bộ điều khiển' },
    ],
    intent: {
      en: 'Mediator is a behavioral design pattern that lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.',
      vi: 'Mediator là một mẫu thiết kế hành vi, giúp giảm bớt các phụ thuộc chằng chịt giữa các đối tượng. Mẫu này hạn chế việc các đối tượng giao tiếp trực tiếp với nhau và buộc chúng chỉ cộng tác thông qua một đối tượng trung gian (mediator).',
    },
    problem: {
      en: 'Say you have a dialog for creating and editing customer profiles, made of form controls such as text fields, checkboxes and buttons. Some elements interact with others: selecting the "I have a dog" checkbox reveals a hidden text field for the dog\'s name, and the submit button has to validate the values of all fields before saving the data. As the application evolves, these relations become chaotic, and a change to one element may affect the others. With this logic implemented directly inside the form elements, their classes become much harder to reuse in other forms of the app: you can\'t use the checkbox class in another form, because it is coupled to the dog\'s text field. You can use either all the classes involved in rendering the profile form, or none at all.',
      vi: 'Giả sử bạn có một hộp thoại để tạo và sửa hồ sơ khách hàng, gồm nhiều điều khiển như ô nhập văn bản, ô đánh dấu (checkbox) và nút bấm. Một số phần tử tương tác với phần tử khác: đánh dấu ô "Tôi có nuôi chó" sẽ hiện ra một ô nhập ẩn để điền tên con chó, còn nút gửi phải kiểm tra giá trị của mọi ô trước khi lưu dữ liệu. Khi ứng dụng phát triển, các mối quan hệ này trở nên rối rắm, và thay đổi một phần tử có thể ảnh hưởng đến các phần tử khác. Nếu logic này được viết thẳng vào mã của các phần tử biểu mẫu, các lớp đó sẽ rất khó tái sử dụng ở những biểu mẫu khác trong ứng dụng: bạn không thể dùng lớp checkbox ở biểu mẫu khác vì nó đã gắn chặt với ô nhập tên chó. Bạn chỉ có thể dùng tất cả các lớp tham gia hiển thị biểu mẫu hồ sơ, hoặc không dùng lớp nào cả.',
    },
    solution: {
      en: 'Cease all direct communication between the components you want to make independent of each other. Instead, the components collaborate indirectly by calling a special mediator object that redirects the calls to the appropriate components. As a result, each component depends on a single mediator class instead of being coupled to dozens of its colleagues. In the profile form, the dialog class itself can act as the mediator; it most likely already knows all of its sub-elements, so it needs no new dependencies. The biggest change happens in the form elements. The submit button no longer validates every field; its single job is to notify the dialog about the click, and the dialog then performs the validation itself or passes the task to the individual elements. You can make the dependency even looser by extracting a common interface for all dialogs that declares the notification method elements use to report events; the button then works with any dialog that implements it. This way the mediator encapsulates a complex web of relations between objects inside a single object, and the fewer dependencies a class has, the easier it is to modify, extend or reuse.',
      vi: 'Chấm dứt mọi giao tiếp trực tiếp giữa các thành phần mà bạn muốn làm cho độc lập với nhau. Thay vào đó, các thành phần cộng tác gián tiếp bằng cách gọi một đối tượng trung gian đặc biệt, đối tượng này chuyển lời gọi tới đúng thành phần cần xử lý. Kết quả là mỗi thành phần chỉ phụ thuộc vào một lớp mediator thay vì gắn chặt với hàng chục thành phần khác. Trong biểu mẫu hồ sơ, chính lớp hộp thoại có thể đóng vai mediator; nhiều khả năng nó đã biết mọi phần tử con của mình, nên không cần thêm phụ thuộc mới. Thay đổi lớn nhất nằm ở các phần tử biểu mẫu. Nút gửi không còn tự kiểm tra từng ô; việc duy nhất của nó là báo cho hộp thoại biết mình vừa được bấm, rồi hộp thoại tự kiểm tra hoặc giao việc đó cho từng phần tử. Bạn có thể nới lỏng phụ thuộc hơn nữa bằng cách tách ra một giao diện chung cho mọi hộp thoại, khai báo phương thức thông báo mà các phần tử dùng để báo sự kiện; khi đó nút gửi làm việc được với bất kỳ hộp thoại nào triển khai giao diện này. Bằng cách đó, mediator gói cả một mạng quan hệ phức tạp giữa các đối tượng vào một đối tượng duy nhất, và một lớp càng ít phụ thuộc thì càng dễ sửa, mở rộng và tái sử dụng.',
    },
    applicability: {
      en: 'Use Mediator when it\'s hard to change some classes because they are tightly coupled to a bunch of other classes: the pattern extracts all the relationships between classes into a separate class, isolating changes to a specific component from the rest of the components. Use it when you can\'t reuse a component in a different program because it depends too much on other components: after applying Mediator, components are unaware of each other and communicate only indirectly through the mediator, so to reuse a component in another app you just provide it with a new mediator class. Use it when you find yourself creating tons of component subclasses just to reuse some basic behavior in various contexts: since all relations between components live in the mediator, you can define entirely new ways for the components to collaborate by introducing new mediator classes, without changing the components themselves.',
      vi: 'Dùng Mediator khi khó thay đổi một số lớp vì chúng gắn chặt với hàng loạt lớp khác: mẫu này tách mọi quan hệ giữa các lớp vào một lớp riêng, nên thay đổi ở một thành phần không lan sang các thành phần còn lại. Dùng khi không thể tái sử dụng một thành phần ở chương trình khác vì nó phụ thuộc quá nhiều vào các thành phần khác: sau khi áp dụng Mediator, các thành phần không biết đến nhau và chỉ giao tiếp gián tiếp qua mediator, nên muốn dùng lại một thành phần ở ứng dụng khác, bạn chỉ cần cung cấp cho nó một lớp mediator mới. Dùng khi bạn thấy mình phải tạo hàng loạt lớp con của thành phần chỉ để dùng lại một hành vi cơ bản trong nhiều ngữ cảnh: vì mọi quan hệ giữa các thành phần đều nằm trong mediator, bạn có thể định nghĩa những cách cộng tác hoàn toàn mới bằng cách thêm lớp mediator mới, mà không phải sửa chính các thành phần.',
    },
    vietnamese_example: {
      title: { en: 'Village Council (Hội Đồng Làng)', vi: 'Hội Đồng Làng - Điều Phối Xã Hội' },
      description: {
        en: 'In a Vietnamese village (làng), the farmer, the merchant and the potter don\'t knock on each other\'s doors; they bring their news to the Village Council (Hội Đồng Làng). Farmer, Merchant and Potter are the components. They extend Villager, which holds a reference to the Mediator interface, and each does its own work: harvest(), buyRice() and makeJars(). When something important happens, a villager only calls notifyCouncil(), which sends notify(this, event) to the mediator. VillageCouncil is the concrete mediator: it keeps a reference to every villager, recognizes who sent each event and decides who acts next. This season the harvest is poor. The council knows the village needs 100 baskets of rice to last until the next harvest, so it asks the merchant to buy the shortfall from the neighbouring village. Once the rice is bought, it orders from the potter just as many jars as the rice will fill, then tells the village it has enough to eat. Without the council, the farmer would need references to both the merchant and the potter, the merchant would have to tell the potter how much rice to store, and every new trade in the village would add more of these direct links. No villager knows the others exist, so a Bát Tràng potter can work in any village, or with no council at all, and another village can change the whole arrangement by providing its own mediator.',
        vi: 'Trong làng Việt Nam, người nông dân, thương nhân và thợ gốm không tự gõ cửa nhà nhau; họ mang tin tức lên Hội Đồng Làng. Farmer, Merchant và Potter là các thành phần (component). Chúng kế thừa Villager, lớp giữ tham chiếu tới giao diện Mediator, và mỗi người tự lo việc của mình: harvest(), buyRice() và makeJars(). Khi có chuyện quan trọng, dân làng chỉ gọi notifyCouncil(), phương thức này gửi notify(this, event) lên mediator. VillageCouncil là mediator cụ thể: nó giữ tham chiếu tới từng người dân, nhận ra ai gửi sự kiện và quyết định ai làm tiếp. Vụ này mất mùa. Hội đồng biết làng cần 100 thúng lúa để ăn tới vụ sau, nên nhờ thương nhân mua phần còn thiếu ở làng bên. Lúa mua về rồi, hội đồng đặt thợ gốm nặn vừa đủ số chum để chứa chỗ lúa đó, rồi báo cho cả làng biết đã đủ ăn. Nếu không có hội đồng, nông dân phải giữ tham chiếu tới cả thương nhân lẫn thợ gốm, thương nhân phải tự báo thợ gốm cần chứa bao nhiêu lúa, và mỗi nghề mới trong làng lại thêm những mối liên hệ trực tiếp như thế. Không người dân nào biết đến những người khác, nên một thợ gốm Bát Tràng có thể làm việc ở bất kỳ làng nào, kể cả khi không có hội đồng, và một làng khác có thể thay đổi cả cách phối hợp chỉ bằng cách dùng mediator của riêng mình.',
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
      en: 'Components are classes that contain some business logic. Each component holds a reference to a mediator, declared with the type of the mediator interface, so it doesn\'t know the mediator\'s actual class and can be reused in other programs by linking it to a different mediator. The Mediator interface declares methods of communication with components, usually just a single notification method. Components may pass any context as its arguments, including themselves, but only in a way that doesn\'t couple the receiving component to the sender\'s class. Concrete Mediators encapsulate the relations between components; they often keep references to all the components they manage and sometimes even manage their lifecycle. Components must not be aware of other components: when something important happens to a component, it only notifies the mediator, which can identify the sender and decide which component to trigger in return. From a component\'s point of view everything is a black box: the sender doesn\'t know who will handle its request, and the receiver doesn\'t know who sent it. Here Villager is the base component that holds the Mediator reference, Farmer, Merchant and Potter are the concrete components, Mediator is the interface and VillageCouncil is the concrete mediator. VillageCouncil holds a reference to each of the three concrete components; the diagram draws that as a single "manages" arrow to Villager. The pattern needs no separate client class, so the client code at the end of each example only links the components to VillageCouncil and triggers the first event.',
      vi: 'Component là các lớp chứa logic nghiệp vụ. Mỗi component giữ một tham chiếu tới mediator, được khai báo bằng kiểu của giao diện mediator, nên nó không biết lớp thật của mediator và có thể được dùng lại ở chương trình khác bằng cách nối với một mediator khác. Giao diện Mediator khai báo các phương thức giao tiếp với component, thường chỉ gồm một phương thức thông báo. Component có thể truyền bất kỳ ngữ cảnh nào làm đối số, kể cả chính nó, nhưng chỉ theo cách không khiến component nhận bị phụ thuộc vào lớp của bên gửi. Concrete Mediator gói các quan hệ giữa các component; nó thường giữ tham chiếu tới mọi component mà nó quản lý và đôi khi còn quản lý cả vòng đời của chúng. Component không được biết đến các component khác: khi có chuyện quan trọng xảy ra với một component, nó chỉ báo cho mediator, mediator nhận ra bên gửi và quyết định cần kích hoạt component nào tiếp theo. Từ góc nhìn của component, mọi thứ là một hộp đen: bên gửi không biết ai sẽ xử lý yêu cầu, còn bên nhận không biết ai đã gửi. Ở đây Villager là component cơ sở giữ tham chiếu Mediator, Farmer, Merchant và Potter là các component cụ thể, Mediator là giao diện và VillageCouncil là mediator cụ thể. VillageCouncil giữ tham chiếu tới cả ba component cụ thể; sơ đồ thể hiện điều đó bằng một mũi tên "manages" duy nhất tới Villager. Mẫu này không cần lớp client riêng, nên phần mã client ở cuối mỗi ví dụ chỉ nối các component với VillageCouncil và kích hoạt sự kiện đầu tiên.',
    },
  },

  {
    id: 'memento',
    slug: 'memento',
    name: { en: 'Memento', vi: 'Kỷ Niệm' },
    category: 'behavioral',
    complexity: 2,
    popularity: 1,
    also_known_as: [{ en: 'Snapshot', vi: 'Ảnh chụp trạng thái' }],
    intent: {
      en: 'Memento is a behavioral design pattern that lets you save and restore the previous state of an object without revealing the details of its implementation.',
      vi: 'Memento là một mẫu thiết kế hành vi, cho phép bạn lưu và khôi phục trạng thái trước đó của một đối tượng mà không làm lộ chi tiết cài đặt của nó.',
    },
    problem: {
      en: 'Imagine a text editor that can also format text and insert inline images, and you want users to be able to undo any operation. The direct approach: before each operation, record the state of all objects in some storage, and on undo fetch the latest snapshot from the history and restore every object from it. But how do you produce a snapshot? You would go over all the fields of an object and copy their values, which only works if the object has relaxed access restrictions; most real objects hide their significant data in private fields. Even if objects kept their state public, any later refactoring that adds or removes fields would also require changing the classes that copy that state. The snapshot itself is a problem too. It must hold at least the text, the cursor coordinates and the scroll position, so it ends up as a container class with almost no methods and lots of fields mirroring the editor\'s state. To let other objects read and write it, its fields would have to be public, exposing all of the editor\'s state, private or not, and making other classes depend on every small change to the snapshot class. It looks like a dead end: either expose all internal details of classes, making them fragile, or restrict access to their state, making snapshots impossible.',
      vi: 'Hãy tưởng tượng một trình soạn thảo văn bản có thể định dạng chữ và chèn ảnh, và bạn muốn người dùng hoàn tác (undo) được mọi thao tác. Cách làm trực tiếp: trước mỗi thao tác, ghi lại trạng thái của mọi đối tượng vào một nơi lưu trữ, rồi khi hoàn tác thì lấy ảnh chụp gần nhất trong lịch sử ra để khôi phục từng đối tượng. Nhưng làm sao để tạo ảnh chụp? Bạn sẽ phải đi qua mọi trường của đối tượng và sao chép giá trị của chúng, việc này chỉ làm được nếu đối tượng nới lỏng quyền truy cập; phần lớn đối tượng thực tế giấu dữ liệu quan trọng trong các trường private. Kể cả khi đối tượng để trạng thái ở dạng public, mỗi lần tái cấu trúc thêm hay bớt trường về sau cũng buộc phải sửa các lớp chịu trách nhiệm sao chép trạng thái đó. Bản thân ảnh chụp cũng là vấn đề. Nó phải chứa ít nhất nội dung văn bản, tọa độ con trỏ và vị trí cuộn, nên cuối cùng sẽ thành một lớp chứa gần như không có phương thức nhưng có rất nhiều trường sao y trạng thái của trình soạn thảo. Để các đối tượng khác đọc và ghi được, các trường đó phải là public, làm lộ toàn bộ trạng thái của trình soạn thảo dù private hay không, và khiến các lớp khác phụ thuộc vào mọi thay đổi nhỏ của lớp ảnh chụp. Có vẻ như đã vào ngõ cụt: hoặc làm lộ mọi chi tiết bên trong của các lớp khiến chúng dễ vỡ, hoặc hạn chế quyền truy cập trạng thái khiến không thể tạo ảnh chụp.',
    },
    solution: {
      en: 'These problems come from broken encapsulation: some objects try to do more than they should and invade the private space of other objects to collect data. Memento delegates creating state snapshots to the actual owner of that state, the originator object. Instead of other objects copying the editor\'s state from the "outside", the editor class makes the snapshot itself, since it has full access to its own state. The copy is stored in a special object called a memento, whose contents are not accessible to any object except the one that produced it. Other objects talk to mementos through a limited interface that may expose metadata (creation time, the name of the performed operation, etc.) but not the originator\'s state stored in the snapshot. This restrictive policy lets you keep mementos inside other objects, usually called caretakers. The caretaker works with a memento only through the limited interface, so it can\'t tamper with the stored state, while the originator has access to all of the memento\'s fields and can restore its previous state at will. In the editor example, a separate history class acts as the caretaker: its stack of mementos grows each time the editor is about to execute an operation, and it could even be shown in the UI as the history of performed operations. On undo, the history takes the most recent memento from the stack and passes it back to the editor, which restores its own state from the memento\'s values.',
      vi: 'Các vấn đề trên đều bắt nguồn từ việc phá vỡ tính đóng gói: một số đối tượng cố làm nhiều hơn phận sự của mình và xâm phạm vùng riêng tư của đối tượng khác để lấy dữ liệu. Memento giao việc tạo ảnh chụp trạng thái cho chính chủ sở hữu của trạng thái đó, tức đối tượng originator. Thay vì để các đối tượng khác sao chép trạng thái của trình soạn thảo "từ bên ngoài", chính lớp trình soạn thảo tự tạo ảnh chụp, vì nó có toàn quyền truy cập trạng thái của mình. Bản sao được lưu trong một đối tượng đặc biệt gọi là memento, và nội dung của memento không đối tượng nào truy cập được, trừ đối tượng đã tạo ra nó. Các đối tượng khác làm việc với memento qua một giao diện hạn chế, giao diện này có thể cho xem siêu dữ liệu (thời điểm tạo, tên thao tác đã thực hiện, v.v.) nhưng không cho xem trạng thái của originator nằm trong ảnh chụp. Chính sách chặt chẽ này cho phép cất memento bên trong các đối tượng khác, thường gọi là caretaker. Caretaker chỉ làm việc với memento qua giao diện hạn chế nên không thể can thiệp vào trạng thái đã lưu, còn originator truy cập được mọi trường của memento và có thể khôi phục trạng thái cũ bất cứ lúc nào. Trong ví dụ trình soạn thảo, một lớp lịch sử riêng đóng vai caretaker: ngăn xếp memento của nó lớn dần mỗi khi trình soạn thảo sắp thực hiện một thao tác, và thậm chí có thể hiển thị trên giao diện như lịch sử các thao tác đã làm. Khi hoàn tác, lớp lịch sử lấy memento mới nhất khỏi ngăn xếp và trả lại cho trình soạn thảo, trình soạn thảo tự khôi phục trạng thái của mình từ các giá trị trong memento.',
    },
    applicability: {
      en: 'Use Memento when you want to produce snapshots of an object\'s state to be able to restore a previous state of the object: the pattern lets you make full copies of an object\'s state, including private fields, and store them separately from the object. Most people remember it for "undo", but it is also indispensable for transactions, when you need to roll back an operation on error. Use it when direct access to the object\'s fields, getters or setters would violate its encapsulation: Memento makes the object itself responsible for creating a snapshot of its state, and no other object can read the snapshot, which keeps the original object\'s state data safe and secure.',
      vi: 'Dùng Memento khi bạn muốn tạo ảnh chụp trạng thái của một đối tượng để có thể khôi phục trạng thái trước đó: mẫu này cho phép sao chép toàn bộ trạng thái của đối tượng, kể cả các trường private, và lưu tách riêng khỏi đối tượng. Phần lớn mọi người nhớ đến mẫu này qua chức năng "hoàn tác", nhưng nó cũng không thể thiếu khi làm việc với giao dịch (transaction), lúc bạn cần quay lui một thao tác khi có lỗi. Dùng khi việc truy cập trực tiếp vào các trường, getter hoặc setter của đối tượng sẽ phá vỡ tính đóng gói của nó: Memento giao cho chính đối tượng trách nhiệm tạo ảnh chụp trạng thái của mình, và không đối tượng nào khác đọc được ảnh chụp đó, nhờ vậy dữ liệu trạng thái của đối tượng gốc được giữ an toàn.',
    },
    vietnamese_example: {
      title: { en: 'Taking Back a Move in Cờ Tướng', vi: 'Xin Đi Lại Một Nước Cờ Tướng' },
      description: {
        en: 'On a Hà Nội sidewalk, two neighbours play cờ tướng (Vietnamese chess) on a board laid across a wooden crate, and a bystander keeps the game in his notebook. ChessBoard is the originator: where every piece stands and whose turn it is are private, and only the board can copy them with save() or put them back with restore(). Each copy is a BoardSnapshot, an immutable concrete memento that receives its label, the squares and the turn once, through its constructor. MoveHistory is the caretaker. Before every move, its play() asks the board for a snapshot, labels it with the move, such as "Nước 3: Pháo 5 tấn 4" (move 3: the cannon on file 5 advances four points), and pushes it onto a stack. It handles snapshots only through the Snapshot interface, which shows nothing but the label (getLabel()). In the sample, Red\'s cannon grabs a soldier, then Red sees that Black\'s horse can now take the cannon and asks "xin đi lại", to take the move back, as friendly sidewalk games often allow. takeBack() pops the last snapshot and hands it to the board, which restores its own squares and turn: the soldier is back and it is Red\'s move again. The bystander decides when to save and when to roll back, but he never reads or changes a position.',
        vi: 'Trên vỉa hè Hà Nội, hai ông hàng xóm đánh cờ tướng trên bàn cờ đặt trên một thùng gỗ, còn một người đứng xem ghi lại ván cờ vào sổ. ChessBoard là originator: vị trí của từng quân và lượt đi là dữ liệu private, chỉ bàn cờ mới chép được chúng bằng save() hoặc đặt lại bằng restore(). Mỗi bản chép là một BoardSnapshot, memento cụ thể bất biến, chỉ nhận nhãn, vị trí các quân và lượt đi đúng một lần qua hàm khởi tạo. MoveHistory là caretaker. Trước mỗi nước, phương thức play() của nó xin bàn cờ một bản chép, ghi nhãn theo nước đi, ví dụ "Nước 3: Pháo 5 tấn 4", rồi đưa vào một ngăn xếp. Nó chỉ làm việc với các bản chép qua giao diện Snapshot, giao diện này không cho xem gì ngoài nhãn (getLabel()). Trong ví dụ, Pháo đỏ ăn một quân Tốt, rồi bên Đỏ nhận ra Mã đen giờ có thể ăn lại Pháo nên xin đi lại, chuyện thường được châm chước trong những ván cờ vỉa hè giữa bạn bè. takeBack() lấy bản chép mới nhất ra và trả cho bàn cờ để bàn cờ tự khôi phục vị trí các quân và lượt đi: quân Tốt trở về chỗ cũ và lại đến lượt Đỏ. Người xem quyết định lúc nào chép và lúc nào quay lại, nhưng không bao giờ đọc hay sửa thế cờ bên trong.',
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
      en: 'Three roles take part. The Originator is the object whose state may need to come back later; it is the only class that writes a memento and the only one that reads one. The Memento is a record of the originator\'s state at one moment, set once and never changed afterwards. The Caretaker keeps mementos and decides when to take one and when to hand one back, but never looks inside. The Gang of Four describe a memento as having two faces: a wide one for the originator, which may read everything, and a narrow one for every other object, which shows only what is safe to share, such as a label. Languages build those faces in different ways. In C++ the memento can declare the originator a friend, and in Java or C# it can be a nested class of the originator. TypeScript and Python have neither, so these examples use an interface for the narrow face: MoveHistory sees each snapshot only as a Snapshot with getLabel(), while ChessBoard checks that it received a BoardSnapshot before calling getState(). Neither language can stop determined code from reaching the fields, because private and a leading underscore are a compile-time check and a naming convention. Mind the cost when mementos are taken often. Copying a 32-piece board before every move is cheap, but a memento of a large object may need to store only what changed since the previous one.',
      vi: 'Có ba vai trò. Originator là đối tượng mà trạng thái có thể cần được lấy lại về sau; nó là lớp duy nhất ghi ra memento và cũng là lớp duy nhất đọc memento. Memento là bản ghi trạng thái của originator tại một thời điểm, được gán một lần và không bao giờ thay đổi sau đó. Caretaker cất giữ các memento, quyết định lúc nào lấy một bản và lúc nào trả lại, nhưng không bao giờ nhìn vào bên trong. Nhóm tác giả Gang of Four mô tả memento có hai mặt: mặt rộng dành cho originator, được đọc mọi thứ, và mặt hẹp dành cho mọi đối tượng khác, chỉ cho thấy những gì an toàn để chia sẻ, chẳng hạn một cái nhãn. Mỗi ngôn ngữ dựng hai mặt đó theo cách riêng. Trong C++, memento có thể khai báo originator là friend; trong Java hay C#, memento có thể là lớp lồng bên trong originator. TypeScript và Python không có cả hai cơ chế này, nên các ví dụ ở đây dùng một giao diện cho mặt hẹp: MoveHistory chỉ thấy mỗi bản chép như một Snapshot có getLabel(), còn ChessBoard kiểm tra rằng mình nhận được một BoardSnapshot rồi mới gọi getState(). Cả hai ngôn ngữ đều không ngăn được đoạn mã cố tình chạm vào các trường, vì private và dấu gạch dưới ở đầu tên chỉ là kiểm tra lúc biên dịch và quy ước đặt tên. Hãy để ý chi phí khi memento được tạo thường xuyên. Chép một bàn cờ 32 quân trước mỗi nước đi thì rẻ, nhưng memento của một đối tượng lớn có thể chỉ nên lưu phần đã thay đổi so với bản trước.',
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
      en: 'Observer is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they\'re observing.',
      vi: 'Observer là một mẫu thiết kế hành vi, cho phép bạn định nghĩa một cơ chế đăng ký để thông báo cho nhiều đối tượng về bất kỳ sự kiện nào xảy ra với đối tượng mà chúng đang quan sát.',
    },
    problem: {
      en: 'Imagine two types of objects: a Customer and a Store. The customer is very interested in a particular product, say a new iPhone model, that should arrive at the store very soon. The customer could visit the store every day to check whether it is available, but while the product is still on its way, most of those trips are pointless. Alternatively, the store could email all customers each time a new product arrives. That would save some customers the trips, but it would upset the others who aren\'t interested in new products and see the emails as spam. It is a conflict: either the customer wastes time checking availability, or the store wastes resources notifying the wrong customers.',
      vi: 'Hãy tưởng tượng có hai loại đối tượng: Khách hàng (Customer) và Cửa hàng (Store). Khách hàng rất quan tâm đến một sản phẩm cụ thể, chẳng hạn một mẫu iPhone mới, sắp được bày bán ở cửa hàng. Khách hàng có thể ghé cửa hàng mỗi ngày để xem đã có hàng chưa, nhưng khi hàng còn đang trên đường về, phần lớn những chuyến đi đó là vô ích. Ngược lại, cửa hàng có thể gửi email cho tất cả khách hàng mỗi khi có sản phẩm mới. Cách này giúp một số khách khỏi phải đi lại, nhưng lại làm phiền những khách không quan tâm đến sản phẩm mới, vì với họ đó là thư rác. Hai cách đều có vấn đề: hoặc khách hàng mất thời gian đi kiểm tra, hoặc cửa hàng tốn công sức thông báo cho nhầm người.',
    },
    solution: {
      en: 'The object that has some interesting state is often called the subject, but since it also notifies other objects about changes to its state, it is called the publisher. All objects that want to track those changes are called subscribers. The pattern adds a subscription mechanism to the publisher class so individual objects can subscribe to or unsubscribe from the stream of events coming from it. In practice this mechanism is just an array field that stores references to subscriber objects, plus a few public methods that add subscribers to and remove them from that list. Whenever an important event happens, the publisher goes over its subscribers and calls a specific notification method on each one. Real apps may have dozens of subscriber classes interested in the same publisher, and some may not even be known when the publisher is written, so the publisher must not be coupled to them. That is why all subscribers implement the same interface and the publisher talks to them only through it. The interface declares the notification method along with parameters the publisher can use to pass contextual data. If the app has several types of publishers, you can go further and make them all follow a common publisher interface that describes the subscription methods, so subscribers can observe any publisher without coupling to its concrete class.',
      vi: 'Đối tượng có trạng thái đáng quan tâm thường được gọi là subject, nhưng vì nó còn thông báo cho các đối tượng khác về thay đổi trạng thái của mình, ta gọi nó là publisher (bên phát). Mọi đối tượng muốn theo dõi các thay đổi đó được gọi là subscriber (người đăng ký). Mẫu này thêm vào lớp publisher một cơ chế đăng ký, để từng đối tượng có thể đăng ký hoặc hủy đăng ký nhận luồng sự kiện từ publisher. Thực tế, cơ chế này chỉ gồm một trường mảng lưu tham chiếu đến các đối tượng subscriber, cùng vài phương thức công khai để thêm subscriber vào hoặc xóa khỏi danh sách đó. Mỗi khi có sự kiện quan trọng, publisher duyệt qua danh sách subscriber và gọi một phương thức thông báo cụ thể trên từng đối tượng. Ứng dụng thực tế có thể có hàng chục lớp subscriber cùng quan tâm đến một publisher, và có những lớp còn chưa tồn tại khi publisher được viết, nên publisher không được phụ thuộc vào chúng. Vì vậy mọi subscriber phải triển khai cùng một giao diện, và publisher chỉ giao tiếp với chúng qua giao diện đó. Giao diện này khai báo phương thức thông báo cùng các tham số để publisher truyền kèm dữ liệu ngữ cảnh. Nếu ứng dụng có nhiều loại publisher, bạn có thể cho tất cả cùng tuân theo một giao diện publisher chung mô tả các phương thức đăng ký, để subscriber quan sát được bất kỳ publisher nào mà không phụ thuộc vào lớp cụ thể của nó.',
    },
    applicability: {
      en: 'Use the Observer pattern when changes to the state of one object may require changing other objects, and the actual set of objects is unknown beforehand or changes dynamically. You often meet this with graphical user interface classes: you create custom button classes and want clients to hook their own code to the buttons so it fires whenever a user presses one. Since any object that implements the subscriber interface can subscribe to a publisher\'s events, you add the subscription mechanism to the buttons and clients hook up their code through custom subscriber classes. Use the pattern when some objects in your app must observe others, but only for a limited time or in specific cases: the subscription list is dynamic, so subscribers can join or leave it whenever they need to.',
      vi: 'Dùng Observer khi thay đổi trạng thái của một đối tượng có thể đòi hỏi thay đổi các đối tượng khác, và tập các đối tượng đó không biết trước hoặc thay đổi lúc chạy. Bạn hay gặp vấn đề này với các lớp giao diện đồ họa: bạn tạo các lớp nút bấm riêng và muốn client gắn mã của họ vào nút để mã đó chạy mỗi khi người dùng bấm. Vì bất kỳ đối tượng nào triển khai giao diện subscriber cũng có thể đăng ký nhận sự kiện từ publisher, bạn chỉ cần thêm cơ chế đăng ký vào các nút, và client gắn mã của họ qua các lớp subscriber riêng. Dùng mẫu này khi một số đối tượng trong ứng dụng phải quan sát đối tượng khác, nhưng chỉ trong một khoảng thời gian hoặc trong những trường hợp nhất định: danh sách đăng ký là động, nên subscriber có thể tham gia hoặc rời đi bất cứ lúc nào.',
    },
    vietnamese_example: {
      title: { en: 'Trống Đồng (Bronze Drum) Signals', vi: 'Tiếng Trống Đồng - Tín Hiệu Làng' },
      description: {
        en: 'The Đông Sơn bronze drum (Trống Đồng) was used to send signals across villages. In the code, BronzeDrum is the Publisher: it keeps a list of Listener objects, lets villagers join with subscribe() and leave with unsubscribe(), and when it is struck with strike() it stores the new signal in signal and calls notifyListeners(), which calls react() on everyone in the list. Listener is the Subscriber interface. Farmer (farmer), Soldier (soldier) and Trader (trader) are Concrete Subscribers that react differently to the same beat: on an invasion alarm the farmer runs back to the village, the soldier takes up arms and the trader closes his stall. The drum passes itself to react(), so each subscriber reads the signal it needs. The client creates the drum and the villagers separately and registers them; later the trader unsubscribes when he leaves to trade far away, so he no longer reacts to the festival drum. Adding a new kind of villager means adding one subscriber class, without touching BronzeDrum.',
        vi: 'Trống Đồng thời Đông Sơn được dùng để truyền tín hiệu giữa các làng. Trong mã, BronzeDrum là Publisher: nó giữ danh sách các đối tượng Listener, cho dân làng tham gia bằng subscribe() và rời đi bằng unsubscribe(); khi được đánh bằng strike(), nó lưu tín hiệu mới vào signal rồi gọi notifyListeners(), phương thức này gọi react() trên từng người trong danh sách. Listener là giao diện Subscriber. Farmer (nông dân), Soldier (chiến sĩ) và Trader (thương nhân) là các Concrete Subscriber, mỗi người phản ứng khác nhau với cùng một hồi trống: khi trống báo giặc, nông dân bỏ cày chạy vào làng, chiến sĩ cầm vũ khí, thương nhân đóng hàng. Trống truyền chính nó vào react(), nên mỗi subscriber tự đọc tín hiệu mình cần. Client tạo trống và dân làng riêng rẽ rồi đăng ký họ; sau đó thương nhân hủy đăng ký vì đi buôn xa, nên không còn phản ứng với tiếng trống lễ hội. Muốn thêm một kiểu dân làng mới chỉ cần thêm một lớp subscriber, không phải sửa BronzeDrum.',
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from typing import List


# Subscriber interface: declares the notification method
class Listener(ABC):
    @abstractmethod
    def react(self, drum: "BronzeDrum") -> None: ...


# Publisher: owns the subscription list and issues events
class BronzeDrum:
    def __init__(self) -> None:
        self._listeners: List[Listener] = []
        self.signal = ""  # state that subscribers care about

    def subscribe(self, listener: Listener) -> None:  # subscribe
        self._listeners.append(listener)

    def unsubscribe(self, listener: Listener) -> None:  # unsubscribe
        self._listeners.remove(listener)

    # notifySubscribers: passes itself so subscribers can read its state
    def notify_listeners(self) -> None:
        for listener in self._listeners:
            listener.react(self)

    # Main business logic: change state, then notify
    def strike(self, signal: str) -> None:
        self.signal = signal
        print(f"🥁 Trống Đồng: {signal}")
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
# 🥁 Trống Đồng: giặc đến!
#   🌾 Nguyễn A: Bỏ cày, chạy vào làng!
#   ⚔️ Trần B: Cầm vũ khí, tập hợp đội hình!
#   🏪 Lê C: Đóng hàng, cất tiền!
# === Lê C đi buôn xa, hủy đăng ký ===
# === Tiếng trống báo lễ hội ===
# 🥁 Trống Đồng: lễ hội Đền Hùng!
#   🌾 Nguyễn A: Mặc áo đẹp đi xem hội!
#   ⚔️ Trần B: Canh gác lễ hội!`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Subscriber interface: declares the notification method
interface Listener {
  react(drum: BronzeDrum): void
}

// Publisher: owns the subscription list and issues events
class BronzeDrum {
  private listeners: Listener[] = []
  signal = '' // state that subscribers care about

  // subscribe
  subscribe(listener: Listener): void {
    this.listeners.push(listener)
  }

  // unsubscribe
  unsubscribe(listener: Listener): void {
    this.listeners = this.listeners.filter(x => x !== listener)
  }

  // notifySubscribers: passes itself so subscribers can read its state
  notifyListeners(): void {
    for (const listener of this.listeners) listener.react(this)
  }

  // Main business logic: change state, then notify
  strike(signal: string): void {
    this.signal = signal
    console.log(\`🥁 Trống Đồng: \${signal}\`)
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
      en: 'The Publisher issues events of interest to other objects; these events occur when the publisher changes its state or executes some behavior. It contains a subscription infrastructure that lets new subscribers join and current subscribers leave the list. When a new event happens, the publisher goes over the subscription list and calls the notification method declared in the Subscriber interface on each subscriber. The Subscriber interface declares the notification interface; in most cases it is a single update method whose parameters let the publisher pass event details along with the update. Concrete Subscribers perform actions in response to notifications issued by the publisher, and all of them implement the same interface so the publisher isn\'t coupled to concrete classes. Subscribers usually need some contextual information to handle an update, so publishers often pass context data as arguments of the notification method; the publisher can pass itself, letting a subscriber fetch any data it needs directly (here BronzeDrum passes itself to react()). The Client creates publisher and subscriber objects separately and then registers subscribers for publisher updates. The diagram omits the optional common publisher interface, since there is only one publisher type.',
      vi: 'Publisher phát ra các sự kiện mà đối tượng khác quan tâm; các sự kiện này xảy ra khi publisher thay đổi trạng thái hoặc thực hiện một hành vi nào đó. Publisher chứa hạ tầng đăng ký, cho phép subscriber mới tham gia và subscriber hiện tại rời khỏi danh sách. Khi có sự kiện mới, publisher duyệt danh sách đăng ký và gọi phương thức thông báo được khai báo trong giao diện Subscriber trên từng subscriber. Giao diện Subscriber khai báo giao diện thông báo; thường chỉ gồm một phương thức update, với các tham số để publisher truyền kèm chi tiết sự kiện. Concrete Subscriber thực hiện hành động để đáp lại thông báo từ publisher, và tất cả đều triển khai cùng một giao diện để publisher không phụ thuộc vào lớp cụ thể. Subscriber thường cần thông tin ngữ cảnh để xử lý đúng, nên publisher hay truyền dữ liệu ngữ cảnh làm đối số của phương thức thông báo; publisher cũng có thể truyền chính nó, để subscriber tự lấy dữ liệu cần thiết (ở đây BronzeDrum truyền chính nó vào react()). Client tạo publisher và subscriber riêng rẽ, rồi đăng ký các subscriber nhận cập nhật từ publisher. Sơ đồ không vẽ giao diện publisher chung (tùy chọn), vì chỉ có một loại publisher.',
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
      en: 'State is a behavioral design pattern that lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.',
      vi: 'State là một mẫu thiết kế hành vi, cho phép một đối tượng thay đổi hành vi khi trạng thái bên trong của nó thay đổi. Trông như thể đối tượng đã đổi sang một lớp khác.',
    },
    problem: {
      en: 'The State pattern is closely related to the finite-state machine: at any moment a program can be in one of a finite number of states, it behaves differently in each, and it can switch between them instantly, but only along a finite, predetermined set of transitions. Apply this to a Document class that can be Draft, Moderation or Published. Its publish() method works differently in each state: in Draft it moves the document to moderation; in Moderation it makes the document public, but only if the current user is an administrator; in Published it does nothing. Such state machines are usually built with lots of if or switch statements that pick the behavior based on field values. The weakness shows once you add more states and state-dependent behaviors: most methods fill up with monstrous conditionals, and any change to the transition logic may require changing the conditionals in every method. Since it is hard to predict all states and transitions at design time, a lean state machine with a few conditionals tends to grow into a bloated mess as the project evolves.',
      vi: 'Mẫu State gắn liền với khái niệm máy trạng thái hữu hạn: tại mỗi thời điểm, chương trình ở một trong số hữu hạn trạng thái, hành xử khác nhau ở mỗi trạng thái, và có thể chuyển trạng thái ngay lập tức, nhưng chỉ theo một tập quy tắc chuyển (transition) hữu hạn và định trước. Áp dụng điều này cho lớp Document có thể ở một trong ba trạng thái: Draft (bản nháp), Moderation (chờ duyệt) và Published (đã xuất bản). Phương thức publish() hoạt động khác nhau ở mỗi trạng thái: ở Draft, nó chuyển tài liệu sang chờ duyệt; ở Moderation, nó công khai tài liệu, nhưng chỉ khi người dùng hiện tại là quản trị viên; ở Published, nó không làm gì cả. Máy trạng thái kiểu này thường được viết bằng rất nhiều câu lệnh if hoặc switch để chọn hành vi theo giá trị các trường. Điểm yếu lộ ra khi bạn thêm ngày càng nhiều trạng thái và hành vi phụ thuộc trạng thái: hầu hết phương thức chứa những khối điều kiện khổng lồ, và mỗi thay đổi về logic chuyển trạng thái có thể buộc bạn sửa điều kiện trong mọi phương thức. Vì khó lường trước mọi trạng thái và cách chuyển ngay từ lúc thiết kế, một máy trạng thái gọn gàng với vài câu điều kiện dần phình thành một mớ hỗn độn khi dự án phát triển.',
    },
    solution: {
      en: 'Create a new class for every possible state of an object and extract all state-specific behaviors into these classes. Instead of implementing all behaviors itself, the original object, called the context, stores a reference to one of the state objects that represents its current state and delegates all state-related work to it. To transition the context to another state, replace the active state object with another object that represents the new state. This only works if all state classes follow the same interface and the context works with them through that interface. The structure looks similar to Strategy, with one key difference: in State, the particular states may know about each other and initiate transitions from one state to another, whereas strategies almost never know about each other.',
      vi: 'Tạo một lớp mới cho mỗi trạng thái có thể có của đối tượng và chuyển toàn bộ hành vi riêng của từng trạng thái vào các lớp đó. Thay vì tự triển khai mọi hành vi, đối tượng gốc, gọi là context, lưu một tham chiếu đến một trong các đối tượng trạng thái, đại diện cho trạng thái hiện tại, và ủy quyền mọi công việc liên quan đến trạng thái cho đối tượng đó. Để chuyển context sang trạng thái khác, chỉ cần thay đối tượng trạng thái đang hoạt động bằng một đối tượng đại diện cho trạng thái mới. Điều này chỉ làm được khi mọi lớp trạng thái tuân theo cùng một giao diện và context làm việc với chúng qua giao diện đó. Cấu trúc này trông giống mẫu Strategy, nhưng có một khác biệt quan trọng: trong State, các trạng thái cụ thể có thể biết về nhau và tự khởi động việc chuyển từ trạng thái này sang trạng thái khác, còn các strategy gần như không bao giờ biết về nhau.',
    },
    applicability: {
      en: 'Use the State pattern when you have an object that behaves differently depending on its current state, the number of states is enormous, and the state-specific code changes frequently: extracting all state-specific code into distinct classes lets you add new states or change existing ones independently of each other, which reduces maintenance cost. Use it when a class is polluted with massive conditionals that alter its behavior according to the current values of its fields: the branches become methods of the corresponding state classes, and you can also clean temporary fields and helper methods involved in state-specific code out of the main class. Use it when there is a lot of duplicate code across similar states and transitions of a condition-based state machine: you can compose hierarchies of state classes and reduce duplication by extracting common code into abstract base classes.',
      vi: 'Dùng State khi bạn có một đối tượng hành xử khác nhau tùy theo trạng thái hiện tại, số trạng thái rất lớn và mã riêng của từng trạng thái thay đổi thường xuyên: tách toàn bộ mã đó vào các lớp riêng giúp bạn thêm trạng thái mới hoặc sửa trạng thái cũ một cách độc lập, nhờ đó giảm chi phí bảo trì. Dùng khi một lớp bị lấp đầy bởi các khối điều kiện khổng lồ thay đổi hành vi theo giá trị hiện tại của các trường: mỗi nhánh điều kiện trở thành phương thức của lớp trạng thái tương ứng, đồng thời bạn có thể dọn khỏi lớp chính các trường tạm và phương thức phụ trợ chỉ phục vụ mã theo trạng thái. Dùng khi có nhiều mã lặp lại giữa các trạng thái và cách chuyển tương tự nhau trong một máy trạng thái dựa trên điều kiện: bạn có thể xây dựng hệ thống phân cấp lớp trạng thái và giảm trùng lặp bằng cách đưa mã chung vào các lớp cơ sở trừu tượng.',
    },
    vietnamese_example: {
      title: { en: 'A Rice Paddy Through the Seasons', vi: 'Ruộng Lúa - Các Giai Đoạn Sinh Trưởng' },
      description: {
        en: 'A Vietnamese rice paddy goes through distinct stages: Cày Bừa (plowing), Cấy Lúa (transplanting), Đang Lớn (growing), Trổ Bông (flowering) and Thu Hoạch (harvesting). In the code, RicePaddy is the Context: the farmer always calls the same three methods, water(), fertilize() and harvest(), and the paddy delegates each call to its current stage object. RiceStage is the State: it declares those three methods and holds a backreference paddy to the paddy, set by the context\'s setter changeStage(). Plowing, Transplanting, Growing, Flowering and Harvesting are Concrete States. The same action means different things in each: harvesting during Cày Bừa is refused, fertilizing while the rice flowers is refused, and watering at harvest time is a mistake because the field must be dry. The states also drive the transitions themselves through the backreference: fertilize() in Plowing moves the paddy to Transplanting, harvest() in Flowering moves it to Harvesting, and finishing the harvest starts a new season with Plowing. RicePaddy contains no conditionals about the stage.',
        vi: 'Ruộng lúa Việt Nam trải qua các giai đoạn rõ rệt: Cày Bừa, Cấy Lúa, Đang Lớn, Trổ Bông và Thu Hoạch. Trong mã, RicePaddy là Context: người nông dân luôn gọi cùng ba phương thức water(), fertilize() và harvest(), còn ruộng ủy quyền mỗi lời gọi cho đối tượng giai đoạn hiện tại. RiceStage là State: nó khai báo ba phương thức đó và giữ tham chiếu ngược paddy tới thửa ruộng, được gán qua setter changeStage() của context. Plowing, Transplanting, Growing, Flowering và Harvesting là các Concrete State. Cùng một hành động mang ý nghĩa khác nhau ở mỗi giai đoạn: gặt lúa lúc đang cày bừa bị từ chối, bón phân khi lúa trổ bông bị từ chối, còn tưới nước lúc thu hoạch là sai vì ruộng cần khô. Chính các trạng thái tự thực hiện việc chuyển giai đoạn qua tham chiếu ngược: fertilize() ở Plowing chuyển ruộng sang Transplanting, harvest() ở Flowering chuyển sang Harvesting, và gặt xong thì bắt đầu vụ mới với Plowing. RicePaddy không chứa câu điều kiện nào về giai đoạn.',
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
      en: 'The Context stores a reference to one of the concrete state objects and delegates all state-specific work to it. It communicates with the state object through the State interface and exposes a setter for passing it a new state object (changeStage() here). The State interface declares the state-specific methods; they should make sense for all concrete states, so no state ends up with useless methods that are never called. Concrete States provide their own implementations of the state-specific methods; to avoid duplicating similar code across states, you may add intermediate abstract classes that encapsulate common behavior. State objects may store a backreference to the context, through which they can fetch any required info from the context and initiate state transitions; here RiceStage is an abstract class so it can hold that paddy field. Both the context and the concrete states can set the next state and perform the actual transition by replacing the state object linked to the context. The diagram draws only one backreference edge (from Plowing) and omits the per-state transition arrows to keep it readable; in the code every concrete state uses paddy to switch to the next stage.',
      vi: 'Context lưu tham chiếu đến một trong các đối tượng trạng thái cụ thể và ủy quyền toàn bộ công việc theo trạng thái cho nó. Context giao tiếp với đối tượng trạng thái qua giao diện State và cung cấp một setter để truyền vào đối tượng trạng thái mới (ở đây là changeStage()). Giao diện State khai báo các phương thức theo trạng thái; các phương thức này phải có ý nghĩa với mọi trạng thái cụ thể, để không trạng thái nào phải mang những phương thức vô dụng không bao giờ được gọi. Concrete State tự triển khai các phương thức theo trạng thái; để tránh lặp mã giống nhau giữa các trạng thái, bạn có thể thêm các lớp trừu tượng trung gian chứa hành vi chung. Đối tượng trạng thái có thể giữ tham chiếu ngược đến context, qua đó lấy thông tin cần thiết từ context và khởi động việc chuyển trạng thái; ở đây RiceStage là lớp trừu tượng để có thể giữ trường paddy đó. Cả context lẫn các trạng thái cụ thể đều có thể đặt trạng thái tiếp theo và thực hiện việc chuyển bằng cách thay đối tượng trạng thái gắn với context. Sơ đồ chỉ vẽ một cạnh tham chiếu ngược (từ Plowing) và lược bỏ các mũi tên chuyển trạng thái giữa từng giai đoạn cho dễ đọc; trong mã, mọi trạng thái cụ thể đều dùng paddy để chuyển sang giai đoạn kế tiếp.',
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
      en: 'Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.',
      vi: 'Strategy là một mẫu thiết kế hành vi, cho phép bạn định nghĩa một họ thuật toán, đặt mỗi thuật toán vào một lớp riêng và làm cho các đối tượng của chúng có thể thay thế cho nhau.',
    },
    problem: {
      en: 'You build a navigation app for casual travelers, centered on a map, and its most requested feature is automatic route planning: enter an address and see the fastest route. The first version only builds routes over roads, which pleases drivers. Then you add walking routes, then public transport, and later you plan routes for cyclists and routes through all of a city\'s tourist attractions. The app is a business success, but every new routing algorithm doubles the size of the navigator\'s main class until it becomes too hard to maintain. Any change to one algorithm, even a small bug fix or a tweak to the street score, touches the whole class and risks breaking code that already works. Teamwork suffers too: new teammates spend too much time resolving merge conflicts, because every feature requires changing the same huge class.',
      vi: 'Bạn xây dựng một ứng dụng chỉ đường cho khách du lịch, lấy bản đồ làm trung tâm, và tính năng được yêu cầu nhiều nhất là tự động lập lộ trình: nhập địa chỉ là thấy đường đi nhanh nhất. Phiên bản đầu chỉ lập lộ trình đường bộ cho ô tô, làm người lái xe rất hài lòng. Sau đó bạn thêm lộ trình đi bộ, rồi phương tiện công cộng, và dự định thêm lộ trình cho người đi xe đạp và lộ trình qua mọi điểm tham quan trong thành phố. Về kinh doanh, ứng dụng thành công, nhưng mỗi thuật toán lập lộ trình mới lại làm lớp chính của trình chỉ đường to gấp đôi, đến mức không thể bảo trì nổi. Bất kỳ thay đổi nào ở một thuật toán, dù chỉ là sửa một lỗi nhỏ hay chỉnh điểm đánh giá đường phố, đều ảnh hưởng cả lớp và dễ làm hỏng mã đang chạy tốt. Làm việc nhóm cũng kém hiệu quả: đồng đội mới phải tốn nhiều thời gian giải quyết xung đột khi gộp mã, vì tính năng nào cũng phải sửa cùng một lớp khổng lồ.',
    },
    solution: {
      en: 'Take a class that does something specific in a lot of different ways and extract all of these algorithms into separate classes called strategies. The original class, called the context, has a field that stores a reference to one of the strategies and delegates the work to that object instead of executing it itself. The context isn\'t responsible for selecting an appropriate algorithm; the client passes the desired strategy to it. The context knows little about strategies: it works with all of them through the same generic interface, which exposes a single method for triggering the encapsulated algorithm. This makes the context independent of concrete strategies, so you can add new algorithms or modify existing ones without changing the context or other strategies. In the navigation app, each routing algorithm becomes its own class with a single buildRoute method that takes an origin and destination and returns the route\'s checkpoints. Each class may build a different route from the same arguments, but the navigator doesn\'t care, since its main job is to render the checkpoints. It has a method for switching the active routing strategy, so its clients, such as buttons in the user interface, can replace the current routing behavior with another one.',
      vi: 'Lấy một lớp làm một việc cụ thể theo nhiều cách khác nhau và tách tất cả các thuật toán đó ra thành các lớp riêng gọi là strategy (chiến lược). Lớp gốc, gọi là context, có một trường lưu tham chiếu đến một trong các strategy và ủy quyền công việc cho đối tượng đó thay vì tự thực hiện. Context không chịu trách nhiệm chọn thuật toán phù hợp; client mới là bên truyền strategy mong muốn vào context. Context biết rất ít về các strategy: nó làm việc với tất cả qua cùng một giao diện chung, giao diện này chỉ có một phương thức để kích hoạt thuật toán được đóng gói bên trong. Nhờ vậy context độc lập với các strategy cụ thể, và bạn có thể thêm thuật toán mới hoặc sửa thuật toán cũ mà không phải thay đổi context hay các strategy khác. Trong ứng dụng chỉ đường, mỗi thuật toán lập lộ trình trở thành một lớp riêng với một phương thức buildRoute duy nhất, nhận điểm đi và điểm đến rồi trả về danh sách các điểm mốc của lộ trình. Với cùng tham số, mỗi lớp có thể vạch ra một lộ trình khác nhau, nhưng trình chỉ đường không quan tâm, vì việc chính của nó là vẽ các điểm mốc lên bản đồ. Nó có một phương thức để đổi strategy lập lộ trình đang dùng, nên các client của nó, như các nút trên giao diện, có thể thay hành vi lập lộ trình hiện tại bằng một hành vi khác.',
    },
    applicability: {
      en: 'Use the Strategy pattern when you want to use different variants of an algorithm within an object and be able to switch from one algorithm to another during runtime: it lets you indirectly alter the object\'s behavior at runtime by associating it with different sub-objects that perform specific sub-tasks in different ways. Use it when you have a lot of similar classes that only differ in the way they execute some behavior: you extract the varying behavior into a separate class hierarchy and combine the original classes into one, reducing duplicate code. Use it to isolate the business logic of a class from the implementation details of algorithms that may not be as important in the context of that logic: the code, internal data and dependencies of the algorithms are isolated from the rest of the code, and clients get a simple interface to execute the algorithms and switch them at runtime. Use it when your class has a massive conditional statement that switches between different variants of the same algorithm: you get rid of the conditional by extracting all algorithms into separate classes that implement the same interface, and the original object delegates execution to one of them.',
      vi: 'Dùng Strategy khi bạn muốn dùng các biến thể khác nhau của một thuật toán bên trong một đối tượng và có thể chuyển từ thuật toán này sang thuật toán khác lúc chạy: mẫu này cho phép gián tiếp thay đổi hành vi của đối tượng lúc chạy bằng cách gắn nó với các đối tượng con khác nhau, mỗi đối tượng làm một phần việc cụ thể theo cách riêng. Dùng khi có nhiều lớp tương tự nhau, chỉ khác ở cách thực hiện một hành vi nào đó: bạn tách phần hành vi thay đổi ra một hệ thống lớp riêng và gộp các lớp ban đầu thành một, nhờ đó giảm mã trùng lặp. Dùng để tách logic nghiệp vụ của một lớp khỏi chi tiết triển khai của các thuật toán không quan trọng lắm đối với logic đó: mã, dữ liệu nội bộ và các phụ thuộc của từng thuật toán được cô lập khỏi phần mã còn lại, còn client có một giao diện đơn giản để chạy thuật toán và đổi chúng lúc chạy. Dùng khi lớp của bạn có một câu lệnh điều kiện khổng lồ để chọn giữa các biến thể của cùng một thuật toán: bạn bỏ được câu điều kiện đó bằng cách tách mọi thuật toán thành các lớp riêng cùng triển khai một giao diện, và đối tượng gốc ủy quyền việc thực thi cho một trong số chúng.',
    },
    vietnamese_example: {
      title: { en: 'Martial Arts Schools (Võ Phái)', vi: 'Các Võ Phái Việt Nam' },
      description: {
        en: 'Vietnamese traditional martial arts (Võ cổ truyền) has many schools, each a different way of doing the same thing: fighting an opponent. In the code, MartialSchool is the Strategy interface with a single method attack(opponent). BinhDinhSchool (powerful strikes), TaySonSchool (fast combinations) and ThieuLamSchool (defend, then counter) are Concrete Strategies. Warrior, the warrior, is the Context: it stores one MartialSchool, and its fight() method simply calls attack() on whatever style is linked, without knowing which one it is. The warrior does not choose the style; the client does. The client function chooseSchool() knows the differences between the styles and picks one for each situation (Bình Định against heavy armor, Tây Sơn when surrounded, Thiếu Lâm against a stronger opponent), then hands it to the warrior through the setter changeSchool() at runtime. Adding a new school means adding one class that implements MartialSchool, without touching Warrior.',
        vi: 'Võ cổ truyền Việt Nam có nhiều võ phái, mỗi võ phái là một cách khác nhau để làm cùng một việc: đánh bại đối thủ. Trong mã, MartialSchool là giao diện Strategy với một phương thức duy nhất attack(opponent). BinhDinhSchool (đòn mạnh), TaySonSchool (liên hoàn nhanh) và ThieuLamSchool (phòng thủ rồi phản đòn) là các Concrete Strategy. Warrior, người võ sĩ, là Context: nó giữ một MartialSchool, và phương thức fight() chỉ việc gọi attack() trên võ phái đang được gắn, mà không cần biết đó là võ phái nào. Võ sĩ không tự chọn võ phái; client mới là bên chọn. Hàm client chooseSchool() hiểu sự khác nhau giữa các võ phái và chọn một võ phái cho từng tình huống (Bình Định khi đối thủ mặc giáp dày, Tây Sơn khi bị bao vây, Thiếu Lâm khi đối thủ mạnh hơn), rồi trao cho võ sĩ qua setter changeSchool() lúc chạy. Thêm một võ phái mới chỉ cần thêm một lớp triển khai MartialSchool, không phải sửa Warrior.',
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
        return f"💪 Song Phi uy lực vào {opponent}!"


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
# ⚔️ Nguyễn Huệ: 💪 Song Phi uy lực vào cọc gỗ luyện tập!
# Tình huống: giáp dày
# ⚔️ Nguyễn Huệ: 💪 Song Phi uy lực vào kỵ binh giặc Thanh!
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
    return \`💪 Song Phi uy lực vào \${opponent}!\`
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
      en: 'The Context maintains a reference to one of the concrete strategies and communicates with it only through the Strategy interface. The Strategy interface is common to all concrete strategies and declares the method the context uses to execute a strategy. Concrete Strategies implement different variations of the algorithm the context uses. Each time the context needs to run the algorithm, it calls the execution method on the linked strategy object; it doesn\'t know what type of strategy it works with or how the algorithm is executed. The Client creates a specific strategy object and passes it to the context. The context exposes a setter that lets clients replace the associated strategy at runtime. Here Warrior is the Context, MartialSchool the Strategy with attack() as the execution method, the three schools are Concrete Strategies, and chooseSchool() plays the Client.',
      vi: 'Context giữ tham chiếu đến một trong các strategy cụ thể và chỉ giao tiếp với nó qua giao diện Strategy. Giao diện Strategy dùng chung cho mọi strategy cụ thể và khai báo phương thức mà context dùng để thực thi strategy. Concrete Strategy triển khai các biến thể khác nhau của thuật toán mà context sử dụng. Mỗi khi cần chạy thuật toán, context gọi phương thức thực thi trên đối tượng strategy đang được gắn; nó không biết mình đang làm việc với loại strategy nào hay thuật toán được thực hiện ra sao. Client tạo một đối tượng strategy cụ thể và truyền vào context. Context cung cấp một setter để client thay strategy đang gắn lúc chạy. Ở đây Warrior là Context, MartialSchool là Strategy với attack() là phương thức thực thi, ba võ phái là các Concrete Strategy, còn chooseSchool() đóng vai Client.',
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
      en: 'Template Method is a behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.',
      vi: 'Template Method là một mẫu thiết kế hành vi, định nghĩa bộ khung của một thuật toán ở lớp cha nhưng cho phép các lớp con ghi đè những bước cụ thể của thuật toán mà không thay đổi cấu trúc của nó.',
    },
    problem: {
      en: 'Imagine a data mining app that analyzes corporate documents. Users feed it documents in various formats (PDF, DOC, CSV), and it tries to extract meaningful data from them in a uniform format. The first version only handled DOC files, the next one added CSV, and a month later PDF. At some point you notice that the three classes share a lot of similar code: the code for dealing with each data format is entirely different, but the code for processing and analyzing the data is almost identical. You want to get rid of that duplication while keeping the algorithm structure intact. There is a second problem in the client code: it is full of conditionals that pick a course of action depending on the class of the processing object. If the three classes had a common interface or base class, the client could drop those conditionals and use polymorphism.',
      vi: 'Hãy tưởng tượng một ứng dụng khai phá dữ liệu chuyên phân tích tài liệu của doanh nghiệp. Người dùng đưa vào tài liệu ở nhiều định dạng (PDF, DOC, CSV), và ứng dụng cố gắng trích xuất dữ liệu có ý nghĩa theo một định dạng thống nhất. Phiên bản đầu chỉ xử lý được tệp DOC, phiên bản sau hỗ trợ thêm CSV, và một tháng sau thì đến PDF. Đến một lúc, bạn nhận ra ba lớp này có rất nhiều mã giống nhau: phần làm việc với từng định dạng thì hoàn toàn khác, nhưng phần xử lý và phân tích dữ liệu gần như y hệt. Bạn muốn loại bỏ sự trùng lặp đó mà vẫn giữ nguyên cấu trúc thuật toán. Còn một vấn đề nữa ở mã client: nó chứa đầy câu lệnh điều kiện để chọn cách xử lý tùy theo lớp của đối tượng xử lý. Nếu ba lớp có chung một giao diện hoặc lớp cơ sở, client có thể bỏ các điều kiện đó và dùng đa hình.',
    },
    solution: {
      en: 'Break the algorithm into a series of steps, turn each step into a method, and put a series of calls to these methods inside a single template method. To use the algorithm, the client provides its own subclass, implements all abstract steps and overrides some of the optional ones if needed, but never the template method itself. In the data mining app, a base class for the three parsers defines the template method. Opening and closing files and extracting and parsing data differ per format, so they stay in the subclasses; analyzing the raw data and composing reports are almost the same everywhere, so they are pulled up into the base class and shared. This gives two types of steps: abstract steps, which every subclass must implement, and optional steps, which already have a default implementation but can still be overridden. A third type is the hook: an optional step with an empty body. The template method works even if a hook is not overridden; hooks are usually placed before and after crucial steps to give subclasses extra extension points. Consider making the template method final so subclasses cannot override it.',
      vi: 'Chia thuật toán thành một chuỗi các bước, biến mỗi bước thành một phương thức, rồi đặt chuỗi lời gọi tới các phương thức này vào một phương thức khuôn mẫu (template method) duy nhất. Để dùng thuật toán, client cung cấp lớp con của riêng mình, triển khai mọi bước trừu tượng và ghi đè một số bước tùy chọn nếu cần, nhưng không bao giờ ghi đè chính phương thức khuôn mẫu. Trong ứng dụng khai phá dữ liệu, một lớp cơ sở chung cho ba bộ phân tích định nghĩa phương thức khuôn mẫu. Việc mở, đóng tệp và trích xuất, phân tích cú pháp dữ liệu khác nhau theo định dạng nên vẫn nằm ở lớp con; việc phân tích dữ liệu thô và soạn báo cáo gần như giống nhau nên được đưa lên lớp cơ sở để các lớp con dùng chung. Từ đó có hai loại bước: bước trừu tượng, mà mọi lớp con phải triển khai, và bước tùy chọn, đã có sẵn cài đặt mặc định nhưng vẫn có thể ghi đè. Loại bước thứ ba là hook: một bước tùy chọn có thân rỗng. Phương thức khuôn mẫu vẫn chạy được dù hook không được ghi đè; hook thường được đặt trước và sau các bước quan trọng để lớp con có thêm điểm mở rộng. Nên cân nhắc đánh dấu phương thức khuôn mẫu là final để lớp con không thể ghi đè nó.',
    },
    applicability: {
      en: 'Use Template Method when you want to let clients extend only particular steps of an algorithm, but not the whole algorithm or its structure: the pattern turns a monolithic algorithm into a series of individual steps that subclasses can easily extend, while the structure defined in the superclass stays intact. Use it when you have several classes that contain almost identical algorithms with some minor differences, so that you might need to modify all of them whenever the algorithm changes: once the algorithm becomes a template method, you can pull the steps with similar implementations up into the superclass and eliminate the duplication, while code that varies stays in the subclasses.',
      vi: 'Dùng Template Method khi bạn muốn cho client mở rộng chỉ một số bước cụ thể của thuật toán, chứ không phải toàn bộ thuật toán hay cấu trúc của nó: mẫu này biến một thuật toán nguyên khối thành chuỗi các bước riêng lẻ mà lớp con dễ dàng mở rộng, trong khi cấu trúc do lớp cha định nghĩa vẫn được giữ nguyên. Dùng khi bạn có nhiều lớp chứa các thuật toán gần như giống hệt nhau với vài khác biệt nhỏ, khiến mỗi lần thuật toán thay đổi bạn có thể phải sửa tất cả các lớp: khi thuật toán đã thành phương thức khuôn mẫu, bạn có thể đưa các bước có cài đặt giống nhau lên lớp cha để loại bỏ trùng lặp, còn phần mã khác nhau vẫn nằm ở lớp con.',
    },
    vietnamese_example: {
      title: { en: 'Cooking Vietnamese Soup Dishes', vi: 'Nấu Các Món Nước Việt Nam' },
      description: {
        en: 'Every Vietnamese soup dish (món nước) is cooked in the same order: prepare the broth, add the main ingredients, season, put it in the bowl, and garnish. The abstract class SoupRecipe fixes that order in its template method cook(). The broth and the ingredients differ for every dish, so prepareBroth() and addIngredients() are abstract steps. Seasoning with fish sauce (season()) and sprinkling spring onions (garnish()) are optional steps with a default that most dishes share. beforeLadle() is a hook with an empty body, called just before the soup is ladled into the bowl. GourdBoneSoup (gourd and pork-bone soup) implements only the abstract steps and keeps every default. SourFishSoup (sour fish soup) also overrides garnish() with sawtooth herb and chili. HueBeefNoodleSoup overrides season() to add Huế shrimp paste (mắm ruốc), uses the hook to blanch the noodles into the bowl before the broth goes in, and overrides garnish() to add fresh herbs and chili sa tế. The cooking order never changes; the client just calls cook() on any SoupRecipe.',
        vi: 'Món nước Việt nào cũng được nấu theo cùng một trình tự: chuẩn bị nước dùng, cho nguyên liệu chính, nêm nếm, múc ra tô, rồi trang trí. Lớp trừu tượng SoupRecipe cố định trình tự đó trong phương thức khuôn mẫu cook(). Nước dùng và nguyên liệu khác nhau theo từng món, nên prepareBroth() và addIngredients() là bước trừu tượng. Nêm nước mắm (season()) và rắc hành lá (garnish()) là bước tùy chọn có cài đặt mặc định mà phần lớn các món dùng chung. beforeLadle() là hook có thân rỗng, được gọi ngay trước khi múc canh ra tô. GourdBoneSoup chỉ triển khai các bước trừu tượng và giữ nguyên mọi mặc định. SourFishSoup ghi đè thêm garnish() để rắc ngò gai và ớt đỏ. HueBeefNoodleSoup ghi đè season() để thêm mắm ruốc Huế, dùng hook để trụng bún vào tô trước khi chan nước dùng, và ghi đè garnish() để thêm rau sống và sa tế. Trình tự nấu không bao giờ thay đổi; client chỉ việc gọi cook() trên bất kỳ SoupRecipe nào.',
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
    def dish_name(self) -> str: return "Canh Chua Cá Lóc"
    def prepare_broth(self) -> None: print("  🍅 Nấu nước me chua với cà chua")
    def add_ingredients(self) -> None: print("  🐟 Thêm cá lóc, dứa, giá đỗ")
    def garnish(self) -> None: print("  🌿 Rắc ngò gai và ớt đỏ")


class GourdBoneSoup(SoupRecipe):
    # Only the abstract steps; every default is kept
    def dish_name(self) -> str: return "Canh Bí Xương"
    def prepare_broth(self) -> None: print("  🦴 Hầm xương heo 2 tiếng")
    def add_ingredients(self) -> None: print("  🥬 Thêm bí đao và hành tím")


class HueBeefNoodleSoup(SoupRecipe):
    def dish_name(self) -> str: return "Bún Bò Huế"
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
# 🍲 Nấu Canh Chua Cá Lóc:
#   🍅 Nấu nước me chua với cà chua
#   🐟 Thêm cá lóc, dứa, giá đỗ
#   🐟 Nêm nước mắm, muối, đường
#   🌿 Rắc ngò gai và ớt đỏ
# 🍲 Nấu Canh Bí Xương:
#   🦴 Hầm xương heo 2 tiếng
#   🥬 Thêm bí đao và hành tím
#   🐟 Nêm nước mắm, muối, đường
#   🌿 Rắc hành lá
# 🍲 Nấu Bún Bò Huế:
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
  dishName() { return 'Canh Chua Cá Lóc' }
  protected prepareBroth() { console.log('  🍅 Nấu nước me chua với cà chua') }
  protected addIngredients() { console.log('  🐟 Thêm cá lóc, dứa, giá đỗ') }
  protected garnish() { console.log('  🌿 Rắc ngò gai và ớt đỏ') }
}

class GourdBoneSoup extends SoupRecipe {
  // Only the abstract steps; every default is kept
  dishName() { return 'Canh Bí Xương' }
  protected prepareBroth() { console.log('  🦴 Hầm xương heo 2 tiếng') }
  protected addIngredients() { console.log('  🥬 Thêm bí đao và hành tím') }
}

class HueBeefNoodleSoup extends SoupRecipe {
  dishName() { return 'Bún Bò Huế' }
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
      en: 'The Abstract Class declares methods that act as steps of an algorithm, as well as the actual template method, which calls these methods in a specific order. The steps may either be declared abstract or have some default implementation; a hook is a step whose default body is empty. Concrete Classes can override all of the steps, but not the template method itself. In the diagram, methods marked * are abstract steps. Each concrete class box lists only the steps that class overrides, and dishName() is left out of those boxes for space.',
      vi: 'Abstract Class khai báo các phương thức đóng vai trò là các bước của thuật toán, cùng với chính phương thức khuôn mẫu, phương thức gọi các bước đó theo một thứ tự nhất định. Các bước có thể được khai báo là trừu tượng hoặc có cài đặt mặc định; hook là một bước có thân mặc định rỗng. Concrete Class có thể ghi đè mọi bước, nhưng không được ghi đè chính phương thức khuôn mẫu. Trong sơ đồ, các phương thức có dấu * là bước trừu tượng. Hộp của mỗi lớp cụ thể chỉ liệt kê các bước mà lớp đó ghi đè, và bỏ qua dishName() cho gọn.',
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
      en: 'Visitor is a behavioral design pattern that lets you separate algorithms from the objects on which they operate.',
      vi: 'Visitor là một mẫu thiết kế hành vi, cho phép bạn tách các thuật toán khỏi những đối tượng mà chúng thao tác.',
    },
    problem: {
      en: 'Imagine that your team develops an app that works with geographic information structured as one colossal graph. Each node may represent a complex entity such as a city, or more granular things like industries or sightseeing areas, and each node type is its own class. You get a task to export the graph into XML. The obvious plan is to add an export method to each node class and recurse over the graph, but the system architect refuses to let you alter the node classes: the code is already in production, and he does not want to risk breaking it because of a bug in your change. He also questions whether XML export belongs in classes whose primary job is working with geodata. And once this feature ships, someone from marketing will probably ask for a different export format or some other odd behavior, forcing you to change those precious and fragile classes again.',
      vi: 'Hãy tưởng tượng nhóm của bạn phát triển một ứng dụng làm việc với thông tin địa lý được tổ chức thành một đồ thị khổng lồ. Mỗi nút có thể là một thực thể phức tạp như thành phố, hoặc những thứ chi tiết hơn như khu công nghiệp hay điểm tham quan, và mỗi loại nút là một lớp riêng. Bạn được giao nhiệm vụ xuất đồ thị ra định dạng XML. Cách hiển nhiên là thêm phương thức xuất vào từng lớp nút rồi duyệt đệ quy qua đồ thị, nhưng kiến trúc sư hệ thống không cho sửa các lớp nút: mã đã chạy trên môi trường production và ông không muốn mạo hiểm làm hỏng nó vì một lỗi trong thay đổi của bạn. Ông cũng nghi ngờ việc đặt mã xuất XML vào những lớp vốn có nhiệm vụ chính là xử lý dữ liệu địa lý. Hơn nữa, sau tính năng này, rất có thể bộ phận marketing sẽ yêu cầu xuất sang định dạng khác hoặc thêm một hành vi kỳ quặc nào đó, buộc bạn lại phải sửa những lớp quý giá và mong manh ấy.',
    },
    solution: {
      en: 'Place the new behavior into a separate class called a visitor instead of integrating it into existing classes. The object that had to perform the behavior is passed to one of the visitor\'s methods as an argument, which gives the method access to all the data it needs. Because the behavior differs per node class, the visitor defines a set of methods, one per class (doForCity, doForIndustry, doForSightSeeing). Calling the right one is the hard part: the methods have different signatures, so polymorphism does not apply, and checking each node\'s class with conditionals is a nightmare. Method overloading does not help either: the exact class of a node is unknown in advance, so the language would pick the method that takes the base Node class. Visitor solves this with a technique called Double Dispatch. Instead of the client selecting the method, each element "accepts" a visitor and calls the visiting method that matches its own class (City.accept(v) calls v.doForCity(this)). The node classes still have to change once, but the change is trivial and lets you add further behaviors without touching them again. With a common interface for all visitors, every existing node works with any visitor you introduce, so a new behavior only needs a new visitor class.',
      vi: 'Đặt hành vi mới vào một lớp riêng gọi là visitor thay vì cố tích hợp nó vào các lớp hiện có. Đối tượng lẽ ra phải thực hiện hành vi giờ được truyền vào một phương thức của visitor dưới dạng tham số, giúp phương thức đó truy cập mọi dữ liệu cần thiết của đối tượng. Vì hành vi khác nhau theo từng lớp nút, visitor định nghĩa một tập phương thức, mỗi phương thức cho một lớp (doForCity, doForIndustry, doForSightSeeing). Khó khăn nằm ở việc gọi đúng phương thức: các phương thức có chữ ký khác nhau nên không dùng được đa hình, còn kiểm tra lớp của từng nút bằng câu lệnh điều kiện thì rất rối rắm. Nạp chồng phương thức (overloading) cũng không giúp được: lớp chính xác của nút không biết trước, nên ngôn ngữ sẽ chọn phương thức nhận lớp cơ sở Node. Visitor giải quyết việc này bằng kỹ thuật Double Dispatch (điều phối kép). Thay vì để client chọn phương thức, mỗi phần tử "chấp nhận" (accept) visitor và tự gọi phương thức thăm ứng với lớp của chính nó (City.accept(v) gọi v.doForCity(this)). Các lớp nút vẫn phải sửa một lần, nhưng thay đổi rất nhỏ và cho phép thêm các hành vi khác về sau mà không phải sửa lại. Khi có một giao diện chung cho mọi visitor, mọi nút hiện có đều làm việc được với bất kỳ visitor nào bạn thêm vào, nên muốn có hành vi mới chỉ cần thêm một lớp visitor.',
    },
    applicability: {
      en: 'Use Visitor when you need to perform an operation on all elements of a complex object structure, such as an object tree: a visitor object implements several variants of the same operation, one for each target class, so it can run over a set of objects of different classes. Use it to clean up the business logic of auxiliary behaviors: the primary classes of your app stay focused on their main jobs, while all other behaviors are extracted into a set of visitor classes. Use it when a behavior makes sense only in some classes of a class hierarchy but not in others: extract the behavior into a visitor class and implement only the visiting methods for the relevant classes, leaving the rest empty.',
      vi: 'Dùng Visitor khi cần thực hiện một thao tác trên mọi phần tử của một cấu trúc đối tượng phức tạp, chẳng hạn một cây đối tượng: đối tượng visitor cài đặt nhiều biến thể của cùng một thao tác, mỗi biến thể cho một lớp đích, nên có thể chạy thao tác trên một tập đối tượng thuộc nhiều lớp khác nhau. Dùng để tách các hành vi phụ trợ ra khỏi logic nghiệp vụ: các lớp chính của ứng dụng tập trung vào nhiệm vụ chính, còn mọi hành vi khác được chuyển sang một tập lớp visitor. Dùng khi một hành vi chỉ có ý nghĩa với một số lớp trong hệ phân cấp mà không có ý nghĩa với các lớp khác: tách hành vi đó ra một lớp visitor và chỉ cài đặt các phương thức thăm cho những lớp liên quan, để trống các phương thức còn lại.',
    },
    vietnamese_example: {
      title: { en: 'Tax Collector Visiting Guilds', vi: 'Quan Thu Thuế Thăm Các Phường Hội' },
      description: {
        en: 'In the old capital (kinh thành), each guild (phường hội) practices its own craft: SilkWeaversGuild weaves silk, PotteryGuild fires pottery, CarpentryGuild does woodwork. The guilds implement the Element interface Guild, whose only extra duty is accept(visitor). Court officials are the visitors: the GuildVisitor interface has one visiting method per guild (visitSilkWeaversGuild, visitPotteryGuild, visitCarpentryGuild). TaxCollectorVisitor (the tax collector) applies a different rate to each guild and keeps a running total. InspectorVisitor (the inspector) checks only the goods sent as tribute to the king, silk and pottery, so it leaves visitCarpentryGuild empty. The Capital client walks its list of guilds and calls accept on each one; each guild calls back the visiting method meant for its own class, which is the double dispatch. A new official, such as a census taker, is one new visitor class, and the guild classes stay unchanged.',
        vi: 'Trong kinh thành xưa, mỗi phường hội làm một nghề riêng: SilkWeaversGuild dệt lụa, PotteryGuild nung gốm, CarpentryGuild làm đồ gỗ. Các phường triển khai giao diện Element là Guild, với nghĩa vụ thêm duy nhất là accept(visitor). Các quan triều đình là visitor: giao diện GuildVisitor có một phương thức thăm cho mỗi phường (visitSilkWeaversGuild, visitPotteryGuild, visitCarpentryGuild). TaxCollectorVisitor áp mức thuế khác nhau cho từng phường và cộng dồn tổng thuế. InspectorVisitor chỉ kiểm tra hàng tiến vua là lụa và gốm, nên để trống visitCarpentryGuild. Client Capital duyệt danh sách phường hội và gọi accept trên từng phường; mỗi phường gọi lại đúng phương thức thăm dành cho lớp của mình, đó chính là điều phối kép. Thêm một vị quan mới, chẳng hạn quan điều tra dân số, chỉ cần thêm một lớp visitor, còn các lớp phường hội giữ nguyên.',
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
    name = "Phường Dệt Lụa"
    revenue = 10_000_000
    silk_bolt_count = 120

    def accept(self, visitor: GuildVisitor) -> None:
        visitor.visit_silk_weavers_guild(self)


class PotteryGuild(Guild):
    name = "Phường Gốm Sứ"
    revenue = 5_000_000
    kiln_count = 4

    def accept(self, visitor: GuildVisitor) -> None:
        visitor.visit_pottery_guild(self)


class CarpentryGuild(Guild):
    name = "Phường Mộc"
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
# 💰 Phường Dệt Lụa: 1,000,000đ (10%)
# 💰 Phường Gốm Sứ: 400,000đ (8%)
# 💰 Phường Mộc: 960,000đ (12%)
# Tổng thuế: 2,360,000đ
# === QUAN KIỂM TRA ===
# 🔍 Phường Dệt Lụa: 120 tấm lụa đạt chuẩn tiến vua
# 🔍 Phường Gốm Sứ: 4 lò nung, men gốm cần cải thiện`,
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
  readonly name = 'Phường Dệt Lụa'
  readonly revenue = 10_000_000
  readonly silkBoltCount = 120
  accept(visitor: GuildVisitor) { visitor.visitSilkWeaversGuild(this) }
}

class PotteryGuild implements Guild {
  readonly name = 'Phường Gốm Sứ'
  readonly revenue = 5_000_000
  readonly kilnCount = 4
  accept(visitor: GuildVisitor) { visitor.visitPotteryGuild(this) }
}

class CarpentryGuild implements Guild {
  readonly name = 'Phường Mộc'
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
      en: 'The Visitor interface declares a set of visiting methods that take concrete elements of an object structure as arguments; in a language with overloading they may share one name, but their parameter types must differ. Each Concrete Visitor implements several versions of the same behavior, tailored for different concrete element classes. The Element interface declares a method for accepting visitors, with one parameter typed as the visitor interface. Each Concrete Element must implement the acceptance method so that it redirects the call to the visiting method that matches its own class; even if a base element class implements this method, every subclass must still override it and call the right visiting method. The Client usually represents a collection or another complex object, such as a Composite tree, and works with its elements through the abstract Element interface without knowing their concrete classes. The diagram leaves out the dependencies from the visiting methods\' parameter types to each concrete element class, to keep the lines readable.',
      vi: 'Giao diện Visitor khai báo một tập phương thức thăm nhận các phần tử cụ thể của cấu trúc đối tượng làm tham số; với ngôn ngữ hỗ trợ nạp chồng, các phương thức này có thể trùng tên nhưng kiểu tham số phải khác nhau. Mỗi Concrete Visitor cài đặt nhiều phiên bản của cùng một hành vi, mỗi phiên bản dành cho một lớp phần tử cụ thể. Giao diện Element khai báo một phương thức để chấp nhận visitor, với một tham số có kiểu là giao diện visitor. Mỗi Concrete Element phải cài đặt phương thức chấp nhận sao cho nó chuyển lời gọi tới đúng phương thức thăm ứng với lớp của mình; kể cả khi lớp phần tử cơ sở đã cài đặt phương thức này, mọi lớp con vẫn phải ghi đè nó và gọi đúng phương thức thăm. Client thường là một tập hợp hoặc một đối tượng phức tạp khác, ví dụ cây Composite, và làm việc với các phần tử qua giao diện Element trừu tượng mà không cần biết lớp cụ thể của chúng. Sơ đồ không vẽ các quan hệ phụ thuộc từ kiểu tham số của phương thức thăm tới từng lớp phần tử cụ thể, để các đường nối dễ đọc.',
    },
  },
]
