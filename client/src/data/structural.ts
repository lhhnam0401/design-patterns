import type { Pattern } from '../types/pattern'

export const structuralPatterns: Omit<Pattern, 'diagram'>[] = [
  {
    id: 'adapter',
    slug: 'adapter',
    name: { en: 'Adapter', vi: 'Bộ Chuyển Đổi' },
    category: 'structural',
    complexity: 1,
    popularity: 3,
    also_known_as: [{ en: 'Wrapper', vi: 'Lớp bao bọc' }],
    intent: {
      en: 'Adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate.',
      vi: 'Adapter là một mẫu thiết kế cấu trúc, cho phép các đối tượng có giao diện không tương thích làm việc cùng nhau.',
    },
    problem: {
      en: 'Imagine a stock market monitoring app. It downloads stock data from multiple sources in XML format and then displays nice-looking charts and diagrams for the user. You decide to improve the app by integrating a smart 3rd-party analytics library, but the library only works with data in JSON format. You can\'t use it as is, because it expects data in a format that is incompatible with your app. You could change the library to work with XML, but that might break existing code that relies on the library, and you might not even have access to its source code.',
      vi: 'Hãy tưởng tượng một ứng dụng theo dõi thị trường chứng khoán. Ứng dụng tải dữ liệu cổ phiếu từ nhiều nguồn ở định dạng XML rồi hiển thị biểu đồ cho người dùng. Bạn muốn nâng cấp ứng dụng bằng cách tích hợp một thư viện phân tích thông minh của bên thứ ba, nhưng thư viện này chỉ làm việc với dữ liệu JSON. Bạn không thể dùng nguyên trạng thư viện, vì nó đòi hỏi dữ liệu ở định dạng không tương thích với ứng dụng. Bạn có thể sửa thư viện để nó đọc được XML, nhưng việc đó có thể làm hỏng mã hiện có đang dựa vào thư viện, và có khi bạn còn không có mã nguồn của nó.',
    },
    solution: {
      en: 'Create an adapter: a special object that converts the interface of one object so that another object can understand it. The adapter wraps one of the objects to hide the complexity of the conversion, and the wrapped object isn\'t even aware of the adapter; for example, an adapter can wrap an object that works in meters and kilometers and convert all of its data to feet and miles. Adapters can also help objects with different interfaces collaborate: the adapter gets an interface compatible with one of the existing objects; using this interface, that object can safely call the adapter\'s methods; on each call, the adapter passes the request to the second object in the format and order that the second object expects. Sometimes you can even create a two-way adapter that converts calls in both directions. In the stock app, you create XML-to-JSON adapters for every class of the analytics library that your code works with directly, and your code talks to the library only through these adapters. Each adapter translates the incoming XML data into a JSON structure and passes the call to the right methods of the wrapped analytics object.',
      vi: 'Tạo một adapter: một đối tượng đặc biệt chuyển đổi giao diện của một đối tượng để đối tượng khác có thể hiểu được. Adapter bao bọc một trong hai đối tượng để che giấu sự phức tạp của việc chuyển đổi, và đối tượng được bao bọc thậm chí không biết adapter tồn tại; ví dụ, một adapter có thể bao bọc đối tượng làm việc với mét và kilômét rồi đổi toàn bộ dữ liệu của nó sang feet và dặm. Adapter còn giúp các đối tượng có giao diện khác nhau phối hợp với nhau: adapter có một giao diện tương thích với một trong các đối tượng hiện có; qua giao diện này, đối tượng đó có thể gọi các phương thức của adapter một cách an toàn; mỗi khi nhận lời gọi, adapter chuyển yêu cầu sang đối tượng thứ hai theo đúng định dạng và thứ tự mà đối tượng đó mong đợi. Đôi khi bạn còn có thể tạo adapter hai chiều, chuyển đổi lời gọi theo cả hai hướng. Trong ứng dụng chứng khoán, bạn tạo các adapter XML sang JSON cho mọi lớp của thư viện phân tích mà mã của bạn làm việc trực tiếp, và mã chỉ giao tiếp với thư viện qua các adapter này. Mỗi adapter dịch dữ liệu XML nhận vào thành cấu trúc JSON rồi chuyển lời gọi tới đúng phương thức của đối tượng phân tích mà nó bao bọc.',
    },
    applicability: {
      en: 'Use the Adapter class when you want to use some existing class, but its interface isn\'t compatible with the rest of your code: the adapter is a middle-layer class that translates between your code and a legacy class, a 3rd-party class or any other class with an unusual interface. Use the pattern when you want to reuse several existing subclasses that lack some common functionality that can\'t be added to the superclass. Extending each subclass would duplicate the missing code across all the new child classes; instead, put the missing functionality into an adapter class and wrap the objects in it, gaining the needed features dynamically. For this to work, the target classes must have a common interface and the adapter\'s field must follow that interface, which makes this approach look very similar to the Decorator pattern.',
      vi: 'Dùng lớp Adapter khi bạn muốn dùng một lớp có sẵn nhưng giao diện của nó không tương thích với phần còn lại của mã: adapter là một lớp trung gian làm nhiệm vụ phiên dịch giữa mã của bạn và một lớp cũ, một lớp của bên thứ ba hoặc bất kỳ lớp nào có giao diện khác thường. Dùng mẫu này khi bạn muốn tái sử dụng nhiều lớp con có sẵn cùng thiếu một chức năng chung mà không thể thêm vào lớp cha. Nếu kế thừa từng lớp con để bổ sung, bạn sẽ phải lặp lại cùng một đoạn mã ở tất cả các lớp con mới; thay vào đó, hãy đặt chức năng còn thiếu vào một lớp adapter và bao bọc các đối tượng bằng nó để có thêm tính năng một cách linh hoạt. Để cách này hoạt động, các lớp đích phải có chung một giao diện và trường của adapter phải theo giao diện đó, nên cách làm này trông rất giống mẫu Decorator.',
    },
    vietnamese_example: {
      title: { en: 'Đàn Tranh → MIDI Adapter', vi: 'Đàn Tranh → Bộ Chuyển MIDI' },
      description: {
        en: 'A Đàn Tranh (Vietnamese zither) is played by plucking a numbered string with a chosen strength, while the recording software only understands MIDI messages: a note number and a velocity from 0 to 127. RecordingSoftware (the recording software) is the Client, and MidiDevice with sendMidi(note, velocity) is the Client Interface it expects. Zither is the Service: useful, but its pluckString(string, strength) method does not match MidiDevice. ZitherMidiAdapter implements MidiDevice and wraps a Zither. When the software calls sendMidi(), the adapter looks up which string plays that note of the pentatonic scale (Hò, Xự, Xang, Xê, Cống), turns the velocity into a soft, medium or strong pluck, and calls pluckString(). The software records the Đàn Tranh exactly like a MIDI keyboard (MidiKeyboard), and neither the instrument nor the software had to change.',
        vi: 'Đàn Tranh được chơi bằng cách gảy một dây đã đánh số với một lực nhất định, còn phần mềm ghi âm chỉ hiểu tín hiệu MIDI: số hiệu nốt và velocity (độ mạnh) từ 0 đến 127. RecordingSoftware (phần mềm ghi âm) là Client, và MidiDevice với phương thức sendMidi(note, velocity) là Client Interface mà nó mong đợi. Zither là Service: hữu ích, nhưng phương thức pluckString(dây, lực) của nó không khớp với MidiDevice. ZitherMidiAdapter triển khai MidiDevice và bao bọc một Zither. Khi phần mềm gọi sendMidi(), adapter tra xem dây nào phát nốt đó trong thang ngũ cung (Hò, Xự, Xang, Xê, Cống), đổi velocity thành lực gảy nhẹ, vừa hoặc mạnh, rồi gọi pluckString(). Phần mềm ghi âm Đàn Tranh y như ghi một bàn phím MIDI (MidiKeyboard), và cả cây đàn lẫn phần mềm đều không phải thay đổi.',
      },
      illustration: '🎵 Đàn Tranh → MIDI\n\n[RecordingSoftware]   (Client)\n      │ sendMidi(note, vel)\n      ▼\n«MidiDevice»     (Client Interface)\n      ▲ implements\n      │\n[ZitherMidiAdapter]  (Adapter)\n      │ pluckString(string, strength)\n      ▼\n[Zither]       (Service)',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod


# Service: a useful existing class with an incompatible interface.
# It knows strings and plucking strength, not MIDI notes and velocity.
class Zither:
    STRING_NAMES = {1: "Hò", 2: "Xự", 3: "Xang", 4: "Xê", 5: "Cống"}

    def pluck_string(self, string_number: int, strength: str) -> str:
        return f"Đàn Tranh: gảy dây {string_number} ({self.STRING_NAMES[string_number]}), lực {strength}"


# Client Interface: the protocol the recording software expects
class MidiDevice(ABC):
    @abstractmethod
    def send_midi(self, note: int, velocity: int) -> str: ...


# A device that already follows the client interface
class MidiKeyboard(MidiDevice):
    def send_midi(self, note: int, velocity: int) -> str:
        return f"Bàn phím MIDI: nốt {note}, velocity {velocity}"


# Adapter: implements the client interface and wraps the service
class ZitherMidiAdapter(MidiDevice):
    # MIDI note -> string number (Hò Xự Xang Xê Cống = C D F G A)
    NOTE_TO_STRING = {60: 1, 62: 2, 65: 3, 67: 4, 69: 5}

    def __init__(self, zither: Zither):
        self._zither = zither

    def send_midi(self, note: int, velocity: int) -> str:
        # Translate the call into the format the service expects
        if note not in self.NOTE_TO_STRING:
            raise ValueError(f"Đàn Tranh không có nốt {note}")
        string_number = self.NOTE_TO_STRING[note]
        strength = "mạnh" if velocity >= 100 else "vừa" if velocity >= 50 else "nhẹ"
        return self._zither.pluck_string(string_number, strength)


# Client: existing business logic that only knows MidiDevice
class RecordingSoftware:
    def record(self, device: MidiDevice, melody: list[tuple[int, int]]) -> None:
        for note, velocity in melody:
            print(device.send_midi(note, velocity))


daw = RecordingSoftware()
daw.record(MidiKeyboard(), [(60, 90), (62, 90)])

# daw.record(Zither(), ...) would fail: Zither has no send_midi()
adapter = ZitherMidiAdapter(Zither())
daw.record(adapter, [(60, 110), (65, 80), (69, 40)])

# Output:
# Bàn phím MIDI: nốt 60, velocity 90
# Bàn phím MIDI: nốt 62, velocity 90
# Đàn Tranh: gảy dây 1 (Hò), lực mạnh
# Đàn Tranh: gảy dây 3 (Xang), lực vừa
# Đàn Tranh: gảy dây 5 (Cống), lực nhẹ`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Service: a useful existing class with an incompatible interface.
// It knows strings and plucking strength, not MIDI notes and velocity.
class Zither {
  private stringNames: Record<number, string> = { 1: 'Hò', 2: 'Xự', 3: 'Xang', 4: 'Xê', 5: 'Cống' }

  pluckString(stringNumber: number, strength: string): string {
    return \`Đàn Tranh: gảy dây \${stringNumber} (\${this.stringNames[stringNumber]}), lực \${strength}\`
  }
}

// Client Interface: the protocol the recording software expects
interface MidiDevice {
  sendMidi(note: number, velocity: number): string
}

// A device that already follows the client interface
class MidiKeyboard implements MidiDevice {
  sendMidi(note: number, velocity: number): string {
    return \`Bàn phím MIDI: nốt \${note}, velocity \${velocity}\`
  }
}

// Adapter: implements the client interface and wraps the service
class ZitherMidiAdapter implements MidiDevice {
  // MIDI note -> string number (Hò Xự Xang Xê Cống = C D F G A)
  private noteToString: Record<number, number> = { 60: 1, 62: 2, 65: 3, 67: 4, 69: 5 }

  constructor(private zither: Zither) {}

  sendMidi(note: number, velocity: number): string {
    // Translate the call into the format the service expects
    const stringNumber = this.noteToString[note]
    if (stringNumber === undefined) throw new Error(\`Đàn Tranh không có nốt \${note}\`)
    const strength = velocity >= 100 ? 'mạnh' : velocity >= 50 ? 'vừa' : 'nhẹ'
    return this.zither.pluckString(stringNumber, strength)
  }
}

// Client: existing business logic that only knows MidiDevice
class RecordingSoftware {
  record(device: MidiDevice, melody: [number, number][]): void {
    for (const [note, velocity] of melody) {
      console.log(device.sendMidi(note, velocity))
    }
  }
}

const daw = new RecordingSoftware()
daw.record(new MidiKeyboard(), [[60, 90], [62, 90]])

// daw.record(new Zither(), ...) won't compile: Zither has no sendMidi()
const adapter = new ZitherMidiAdapter(new Zither())
daw.record(adapter, [[60, 110], [65, 80], [69, 40]])`,
      },
    ],
    structure_notes: {
      en: 'The diagram and code show the object adapter, which uses composition: the adapter implements the interface of one object and wraps the other, and it works in all popular languages. The Client (RecordingSoftware) contains the existing business logic of the program. The Client Interface (MidiDevice) describes the protocol other classes must follow to collaborate with the client code. The Service (Zither) is a useful class, usually 3rd-party or legacy, that the client can\'t use directly because its interface is incompatible. The Adapter (ZitherMidiAdapter) implements the client interface while wrapping the service object; it receives calls through the client interface and translates them into calls the wrapped service understands. Because the client works with the adapter only through the client interface, you can add new adapters, for example when the service\'s interface changes or is replaced, without changing the client. MidiKeyboard is an extra class that already follows the client interface, to show that the client treats it and the adapter the same way. The second variant, the class adapter, inherits interfaces from both the client and the service at the same time, so it doesn\'t wrap any object: the adaptation happens in overridden methods, and the adapter can be used in place of an existing client class. It needs multiple inheritance (as in C++), so it is not shown here.',
      vi: 'Sơ đồ và mã minh họa object adapter (adapter đối tượng), dùng nguyên tắc kết hợp đối tượng: adapter triển khai giao diện của một đối tượng và bao bọc đối tượng kia; cách này dùng được trong mọi ngôn ngữ phổ biến. Client (RecordingSoftware) chứa logic nghiệp vụ hiện có của chương trình. Client Interface (MidiDevice) mô tả giao thức mà các lớp khác phải tuân theo để làm việc được với mã client. Service (Zither) là một lớp hữu ích, thường của bên thứ ba hoặc mã cũ, mà client không dùng trực tiếp được vì giao diện không tương thích. Adapter (ZitherMidiAdapter) triển khai client interface đồng thời bao bọc đối tượng service; nó nhận lời gọi qua client interface rồi dịch thành lời gọi mà service bên trong hiểu được. Vì client chỉ làm việc với adapter qua client interface, bạn có thể thêm adapter mới, chẳng hạn khi giao diện của service thay đổi hoặc bị thay thế, mà không phải sửa client. MidiKeyboard là một lớp bổ sung vốn đã theo client interface, để cho thấy client đối xử với nó và với adapter như nhau. Biến thể thứ hai, class adapter (adapter lớp), kế thừa giao diện của cả client lẫn service cùng lúc, nên không cần bao bọc đối tượng nào: việc chuyển đổi diễn ra trong các phương thức được ghi đè, và adapter có thể dùng thay cho một lớp client có sẵn. Biến thể này cần đa kế thừa (như trong C++), nên không được minh họa ở đây.',
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
      en: 'Bridge is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies, abstraction and implementation, which can be developed independently of each other.',
      vi: 'Bridge là một mẫu thiết kế cấu trúc, cho phép bạn tách một lớp lớn hoặc một nhóm lớp liên quan chặt chẽ thành hai hệ phân cấp riêng biệt, abstraction (phần trừu tượng) và implementation (phần triển khai), để có thể phát triển độc lập với nhau.',
    },
    problem: {
      en: 'Say you have a geometric Shape class with two subclasses, Circle and Square. You want to extend this hierarchy to incorporate colors, so you plan to create Red and Blue shape subclasses. Since you already have two subclasses, you need four class combinations such as BlueCircle and RedSquare. Adding new shapes and colors makes the hierarchy grow exponentially: adding a triangle needs two subclasses, one for each color, and after that a new color needs three subclasses, one for each shape. The further you go, the worse it becomes.',
      vi: 'Giả sử bạn có lớp hình học Shape với hai lớp con là Circle và Square. Bạn muốn mở rộng hệ phân cấp này để thêm màu sắc, nên định tạo các lớp con Red và Blue. Nhưng vì đã có sẵn hai lớp con, bạn sẽ cần bốn tổ hợp lớp như BlueCircle và RedSquare. Mỗi lần thêm hình hoặc màu mới, hệ phân cấp lại phình to theo cấp số nhân: thêm hình tam giác cần hai lớp con, mỗi màu một lớp, rồi thêm một màu mới lại cần ba lớp con, mỗi hình một lớp. Càng đi xa, tình hình càng tệ.',
    },
    solution: {
      en: 'The problem comes from extending the shape classes in two independent dimensions, form and color, which is a very common issue with class inheritance. Bridge switches from inheritance to object composition: you extract one of the dimensions into a separate class hierarchy, so the original classes reference an object of the new hierarchy instead of keeping all state and behavior in one class. Here, the color code moves into its own Color class with Red and Blue subclasses; Shape gets a reference field pointing to a color object and delegates all color-related work to it. That reference is the bridge between Shape and Color: from then on, adding colors doesn\'t require changing the shape hierarchy, and vice versa. In the GoF terms, the Abstraction (also called interface) is a high-level control layer that shouldn\'t do any real work on its own; it delegates the work to the Implementation (also called platform). These are not the interfaces or abstract classes of your programming language. For example, an app\'s GUI can be the abstraction and the operating system API the implementation: the GUI object controls the appearance and delegates the actual work to the linked API object. Implementations are interchangeable as long as they follow a common interface, so you can change GUI classes without touching API classes, and supporting another operating system only needs a new subclass in the implementation hierarchy.',
      vi: 'Vấn đề nảy sinh vì ta mở rộng các lớp hình theo hai chiều độc lập, hình dạng và màu sắc, một lỗi rất thường gặp khi dùng kế thừa. Bridge chuyển từ kế thừa sang kết hợp đối tượng: bạn tách một trong hai chiều ra thành một hệ phân cấp lớp riêng, để các lớp ban đầu tham chiếu tới một đối tượng của hệ phân cấp mới thay vì giữ toàn bộ trạng thái và hành vi trong một lớp. Ở ví dụ này, mã liên quan đến màu được chuyển sang lớp Color riêng với hai lớp con Red và Blue; Shape có một trường tham chiếu tới một đối tượng màu và giao mọi việc liên quan đến màu cho đối tượng đó. Tham chiếu ấy chính là cây cầu nối giữa Shape và Color: từ đó, thêm màu mới không phải sửa hệ phân cấp hình, và ngược lại. Theo thuật ngữ của sách GoF, Abstraction (còn gọi là interface) là tầng điều khiển cấp cao, tự nó không làm việc thực sự nào mà giao việc cho Implementation (còn gọi là platform). Đây không phải là interface hay lớp trừu tượng trong ngôn ngữ lập trình. Ví dụ, giao diện đồ họa (GUI) của ứng dụng có thể là abstraction, còn API của hệ điều hành là implementation: đối tượng GUI điều khiển giao diện và giao phần việc thực sự cho đối tượng API được liên kết. Các implementation có thể thay thế cho nhau miễn là cùng theo một giao diện chung, nên bạn có thể sửa các lớp GUI mà không đụng tới các lớp API, và hỗ trợ thêm một hệ điều hành chỉ cần thêm một lớp con trong hệ phân cấp implementation.',
    },
    applicability: {
      en: 'Use the Bridge pattern when you want to divide and organize a monolithic class that has several variants of some functionality (for example, a class that can work with various database servers): the bigger a class becomes, the harder it is to understand and the longer it takes to change, and a change to one variant may require changes across the whole class; splitting it into several hierarchies lets you change the classes in each hierarchy independently, which simplifies maintenance and lowers the risk of breaking existing code. Use the pattern when you need to extend a class in several orthogonal (independent) dimensions: extract a separate class hierarchy for each dimension, and let the original class delegate the related work to objects of those hierarchies instead of doing everything on its own. Use Bridge if you need to switch implementations at runtime: although optional, the pattern lets you replace the implementation object inside the abstraction just by assigning a new value to a field. This last point is the main reason people confuse Bridge with Strategy; a pattern is more than a way to structure classes, it also communicates intent and the problem being addressed.',
      vi: 'Dùng Bridge khi bạn muốn chia nhỏ và sắp xếp lại một lớp nguyên khối có nhiều biến thể của cùng một chức năng (ví dụ, một lớp làm việc được với nhiều loại máy chủ cơ sở dữ liệu): lớp càng lớn thì càng khó hiểu và càng tốn thời gian sửa, và sửa một biến thể có thể kéo theo sửa khắp cả lớp; tách lớp thành nhiều hệ phân cấp giúp bạn sửa các lớp trong từng hệ một cách độc lập, nên dễ bảo trì hơn và ít rủi ro làm hỏng mã hiện có. Dùng mẫu này khi bạn cần mở rộng một lớp theo nhiều chiều trực giao (độc lập): tách mỗi chiều thành một hệ phân cấp lớp riêng, và để lớp ban đầu giao phần việc liên quan cho các đối tượng thuộc những hệ đó thay vì tự làm tất cả. Dùng Bridge nếu bạn cần đổi implementation khi chương trình đang chạy: tuy không bắt buộc, mẫu này cho phép thay đối tượng implementation bên trong abstraction chỉ bằng cách gán giá trị mới cho một trường. Điểm cuối này là lý do chính khiến nhiều người nhầm Bridge với Strategy; một mẫu thiết kế không chỉ là cách sắp xếp lớp, nó còn truyền đạt ý định và vấn đề cần giải quyết.',
    },
    vietnamese_example: {
      title: { en: 'Áo Dài Styles & Fabrics', vi: 'Áo Dài - Kiểu Dáng & Chất Liệu' },
      description: {
        en: 'An Áo Dài varies in two independent dimensions: style (kiểu dáng) and fabric (chất liệu). With inheritance alone, every style needs one subclass per fabric (TraditionalSilk, TraditionalBrocade, ModernSilk and so on), so 3 styles and 3 fabrics already need 9 classes. With Bridge, the style hierarchy is the Abstraction: Style decides which parts to cut and in what order (sew()), and the Refined Abstractions Traditional (high collar, ankle-length flaps) and Modern (boat neck, knee-length flaps, plus embroidery) vary that logic. The fabric hierarchy is the Implementation: Fabric declares the primitive steps name(), cut() and embroider(), and the Concrete Implementations Silk and Brocade carry them out in their own way. Style keeps a Fabric in its fabric field, which is the bridge, so any style can be sewn in any fabric and 3 + 3 classes cover all 9 combinations. Adding Cotton means one new Fabric class, without touching the styles.',
        vi: 'Áo Dài thay đổi theo hai chiều độc lập: kiểu dáng và chất liệu. Nếu chỉ dùng kế thừa, mỗi kiểu dáng cần một lớp con cho mỗi chất liệu (TraditionalSilk, TraditionalBrocade, ModernSilk...), nên 3 kiểu dáng và 3 chất liệu đã cần tới 9 lớp. Với Bridge, hệ phân cấp kiểu dáng là Abstraction: Style quyết định cắt những phần nào và theo thứ tự nào (sew()), còn các Refined Abstraction là Traditional (cổ cao, tà dài chấm gót) và Modern (cổ thuyền, tà ngắn qua gối, thêm thêu hoa) thay đổi logic đó. Hệ phân cấp chất liệu là Implementation: Fabric khai báo các bước cơ bản name(), cut() và embroider(), và các Concrete Implementation là Silk (tơ lụa) và Brocade (gấm) thực hiện chúng theo cách riêng. Style giữ một Fabric trong trường fabric, đó chính là cây cầu nối, nên kiểu dáng nào cũng may được bằng chất liệu nào, và 3 + 3 lớp đủ cho cả 9 tổ hợp. Thêm vải Cotton chỉ cần một lớp Fabric mới, không phải sửa các kiểu dáng.',
      },
      illustration: '👘 Áo Dài Bridge\nAbstraction              Implementation\n  Style ──fabric──▶ «Fabric»\n  │                        │\n  ├─ Traditional           ├─ Silk\n  └─ Modern                └─ Brocade\n\n(m + n classes, not m × n)',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod


# Implementation: primitive operations every fabric supports.
# It doesn't have to match the abstraction's interface.
class Fabric(ABC):
    @abstractmethod
    def name(self) -> str: ...

    @abstractmethod
    def cut(self, part: str) -> str: ...

    @abstractmethod
    def embroider(self, motif: str) -> str: ...


# Concrete Implementations: fabric-specific work
class Silk(Fabric):
    def name(self) -> str: return "tơ lụa"
    def cut(self, part: str) -> str: return f"cắt {part}"
    def embroider(self, motif: str) -> str: return f"thêu {motif} bằng chỉ tơ"


class Brocade(Fabric):
    def name(self) -> str: return "gấm"
    def cut(self, part: str) -> str: return f"cắt {part} khớp hoa văn"
    def embroider(self, motif: str) -> str: return f"thêu {motif} bằng chỉ kim tuyến"


# Abstraction: high-level control logic. It keeps a reference to an
# implementation object and delegates the real work to it.
class Style:
    style_name = "Áo dài"
    parts = ["thân áo", "tà áo"]

    def __init__(self, fabric: Fabric):
        self.fabric = fabric  # the bridge

    def sew(self) -> str:
        steps = [self.fabric.cut(p) for p in self.parts]
        return f"{self.style_name} bằng {self.fabric.name()}: " + ", ".join(steps)


# Refined Abstractions: variants of the control logic,
# developed independently from the fabric classes
class Traditional(Style):
    style_name = "Áo dài truyền thống"
    parts = ["cổ cao", "tà dài chấm gót"]


class Modern(Style):
    style_name = "Áo dài cách tân"
    parts = ["cổ thuyền", "tà ngắn qua gối"]

    def sew(self) -> str:
        return super().sew() + ", " + self.fabric.embroider("hoa sen")


# Client: links an abstraction with an implementation via the
# constructor, then works only with the abstraction
garment = Traditional(Silk())
print(garment.sew())
print(Modern(Silk()).sew())
print(Modern(Brocade()).sew())

# The implementation can be swapped at runtime
garment.fabric = Brocade()
print(garment.sew())

# Output:
# Áo dài truyền thống bằng tơ lụa: cắt cổ cao, cắt tà dài chấm gót
# Áo dài cách tân bằng tơ lụa: cắt cổ thuyền, cắt tà ngắn qua gối, thêu hoa sen bằng chỉ tơ
# Áo dài cách tân bằng gấm: cắt cổ thuyền khớp hoa văn, cắt tà ngắn qua gối khớp hoa văn, thêu hoa sen bằng chỉ kim tuyến
# Áo dài truyền thống bằng gấm: cắt cổ cao khớp hoa văn, cắt tà dài chấm gót khớp hoa văn`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Implementation: primitive operations every fabric supports.
// It doesn't have to match the abstraction's interface.
interface Fabric {
  name(): string
  cut(part: string): string
  embroider(motif: string): string
}

// Concrete Implementations: fabric-specific work
class Silk implements Fabric {
  name() { return 'tơ lụa' }
  cut(part: string) { return \`cắt \${part}\` }
  embroider(motif: string) { return \`thêu \${motif} bằng chỉ tơ\` }
}

class Brocade implements Fabric {
  name() { return 'gấm' }
  cut(part: string) { return \`cắt \${part} khớp hoa văn\` }
  embroider(motif: string) { return \`thêu \${motif} bằng chỉ kim tuyến\` }
}

// Abstraction: high-level control logic. It keeps a reference to an
// implementation object and delegates the real work to it.
class Style {
  protected styleName = 'Áo dài'
  protected parts = ['thân áo', 'tà áo']

  constructor(public fabric: Fabric) {} // the bridge

  sew(): string {
    const steps = this.parts.map(p => this.fabric.cut(p))
    return \`\${this.styleName} bằng \${this.fabric.name()}: \${steps.join(', ')}\`
  }
}

// Refined Abstractions: variants of the control logic,
// developed independently from the fabric classes
class Traditional extends Style {
  protected styleName = 'Áo dài truyền thống'
  protected parts = ['cổ cao', 'tà dài chấm gót']
}

class Modern extends Style {
  protected styleName = 'Áo dài cách tân'
  protected parts = ['cổ thuyền', 'tà ngắn qua gối']

  sew(): string {
    return super.sew() + ', ' + this.fabric.embroider('hoa sen')
  }
}

// Client: links an abstraction with an implementation via the
// constructor, then works only with the abstraction
const garment = new Traditional(new Silk())
console.log(garment.sew())
console.log(new Modern(new Silk()).sew())
console.log(new Modern(new Brocade()).sew())

// The implementation can be swapped at runtime
garment.fabric = new Brocade()
console.log(garment.sew())`,
      },
    ],
    structure_notes: {
      en: 'The Abstraction (Style) provides high-level control logic and relies on the implementation object, held in its fabric field, to do the actual low-level work. The Implementation (Fabric) declares the interface common to all concrete implementations; the abstraction can only communicate with an implementation object through the methods declared here. The abstraction may list the same methods as the implementation, but usually it declares complex behaviors that rely on a variety of primitive operations of the implementation, as sew() is built from name(), cut() and embroider(). Concrete Implementations (Silk, Brocade) contain the platform-specific code, here the fabric-specific work. Refined Abstractions (Traditional, Modern) provide variants of the control logic and, like their parent, work with any implementation through the general implementation interface. The Client is usually only interested in working with the abstraction, but it is the client\'s job to link the abstraction object with one of the implementation objects, which it does through the constructor.',
      vi: 'Abstraction (Style) chứa logic điều khiển cấp cao và dựa vào đối tượng implementation, giữ trong trường fabric, để làm phần việc cấp thấp thực sự. Implementation (Fabric) khai báo giao diện chung cho mọi implementation cụ thể; abstraction chỉ có thể giao tiếp với đối tượng implementation qua các phương thức được khai báo ở đây. Abstraction có thể liệt kê đúng các phương thức của implementation, nhưng thường nó khai báo các hành vi phức tạp dựa trên nhiều thao tác cơ bản của implementation, như sew() được xây từ name(), cut() và embroider(). Concrete Implementation (Silk, Brocade) chứa mã riêng cho từng nền tảng, ở đây là cách xử lý riêng của từng loại vải. Refined Abstraction (Traditional, Modern) cung cấp các biến thể của logic điều khiển và, giống lớp cha, làm việc với mọi implementation qua giao diện implementation chung. Client thường chỉ quan tâm tới abstraction, nhưng chính client có nhiệm vụ liên kết đối tượng abstraction với một đối tượng implementation, ở đây là qua hàm khởi tạo.',
    },
  },

  {
    id: 'composite',
    slug: 'composite',
    name: { en: 'Composite', vi: 'Tổ Hợp' },
    category: 'structural',
    complexity: 2,
    popularity: 2,
    also_known_as: [{ en: 'Object Tree', vi: 'Cây đối tượng' }],
    intent: {
      en: 'Composite is a structural design pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects.',
      vi: 'Composite là một mẫu thiết kế cấu trúc, cho phép bạn kết hợp các đối tượng thành cấu trúc cây rồi làm việc với cấu trúc đó như thể chúng là những đối tượng riêng lẻ.',
    },
    problem: {
      en: 'Composite only makes sense when the core model of your app can be represented as a tree. Imagine you have two types of objects: Products and Boxes. A Box can contain several Products as well as a number of smaller Boxes, which can in turn hold Products or even smaller Boxes, and so on. You are building an ordering system on these classes, where an order can contain simple products without any wrapping as well as boxes stuffed with products and other boxes. How do you determine the total price of such an order? The direct approach is to unwrap all the boxes, go over all the products and add up the total. That works in the real world, but in a program it is not as simple as running a loop: you have to know the classes of Products and Boxes you are going through, the nesting level of the boxes and other details beforehand, which makes the direct approach awkward or even impossible.',
      vi: 'Composite chỉ hợp lý khi mô hình cốt lõi của ứng dụng có thể biểu diễn dưới dạng cây. Hãy tưởng tượng bạn có hai loại đối tượng: Product (sản phẩm) và Box (hộp). Một Box có thể chứa vài Product và cả những Box nhỏ hơn, các Box nhỏ đó lại có thể chứa Product hoặc Box nhỏ hơn nữa, cứ thế tiếp tục. Bạn đang xây dựng hệ thống đặt hàng dựa trên các lớp này, trong đó một đơn hàng có thể gồm sản phẩm không đóng gói và cả những hộp chứa đầy sản phẩm lẫn hộp khác. Làm sao tính tổng giá của một đơn hàng như vậy? Cách trực tiếp là mở hết các hộp, duyệt qua mọi sản phẩm rồi cộng lại. Ngoài đời thì làm được, nhưng trong chương trình thì không đơn giản là chạy một vòng lặp: bạn phải biết trước lớp của từng Product và Box đang duyệt, độ sâu lồng nhau của các hộp và nhiều chi tiết khác, khiến cách trực tiếp trở nên rất vụng về, thậm chí không thể làm được.',
    },
    solution: {
      en: 'Work with Products and Boxes through a common interface that declares a method for calculating the total price. For a product, the method simply returns the product\'s price. For a box, it goes over each item the box contains, asks its price and returns the total for the box. If one of those items is a smaller box, that box also goes over its own contents, and so on, until the prices of all inner components are calculated. A box can even add extra cost to the result, such as packaging. The greatest benefit is that you don\'t need to care about the concrete classes of the objects in the tree: you don\'t need to know whether an object is a simple product or a complex box, because you treat them all the same through the common interface. When you call a method, the objects themselves pass the request down the tree.',
      vi: 'Làm việc với Product và Box qua một giao diện chung có khai báo phương thức tính tổng giá. Với một sản phẩm, phương thức chỉ cần trả về giá của sản phẩm đó. Với một hộp, phương thức duyệt qua từng món trong hộp, hỏi giá của nó rồi trả về tổng giá của hộp. Nếu một món trong đó là hộp nhỏ hơn, hộp ấy cũng duyệt qua các món bên trong nó, cứ thế cho tới khi tính xong giá của mọi thành phần bên trong. Hộp còn có thể cộng thêm chi phí vào kết quả, chẳng hạn phí đóng gói. Lợi ích lớn nhất là bạn không cần quan tâm tới lớp cụ thể của các đối tượng tạo nên cây: không cần biết một đối tượng là sản phẩm đơn giản hay hộp phức tạp, vì bạn xử lý tất cả như nhau qua giao diện chung. Khi bạn gọi một phương thức, chính các đối tượng sẽ chuyển yêu cầu xuống dưới theo cây.',
    },
    applicability: {
      en: 'Use the Composite pattern when you have to implement a tree-like object structure: the pattern gives you two basic element types that share a common interface, simple leaves and complex containers, and since a container can be composed of both leaves and other containers, you can build a nested recursive structure that resembles a tree. Use the pattern when you want the client code to treat both simple and complex elements uniformly: all elements defined by the pattern share a common interface, so the client doesn\'t have to worry about the concrete class of the objects it works with.',
      vi: 'Dùng Composite khi bạn phải triển khai một cấu trúc đối tượng dạng cây: mẫu này cung cấp hai loại phần tử cơ bản có chung một giao diện, lá đơn giản và container phức tạp, và vì một container có thể chứa cả lá lẫn container khác, bạn có thể dựng một cấu trúc đệ quy lồng nhau giống hình cây. Dùng mẫu này khi bạn muốn mã client xử lý phần tử đơn giản và phần tử phức tạp theo cùng một cách: mọi phần tử trong mẫu Composite có chung một giao diện, nên client không phải bận tâm tới lớp cụ thể của các đối tượng mà nó làm việc cùng.',
    },
    vietnamese_example: {
      title: { en: 'Vietnamese Army Hierarchy (Quân Đội)', vi: 'Hệ Thống Quân Đội Việt Nam' },
      description: {
        en: 'Like most armies, the Tây Sơn army was organized as a hierarchy: a corps (Quân Đoàn) is made of battalions (Tiểu Đoàn), a battalion of squads (Tiểu Đội), and a squad of soldiers. Orders are given at the top and passed down level by level. In the code, MilitaryUnit is the Component interface with attack() (advance) and getStrength() (strength). Soldier (a soldier) is the Leaf: it has no sub-units and does the real work, charging forward and reporting its own strength. MilitaryUnitComposite is the Container: a corps, battalion or squad that holds Soldier objects or smaller MilitaryUnitComposite objects and knows them only as MilitaryUnit. When it receives attack(), it passes the order to every member; for getStrength() it adds up its members\' results. General (the general) is the Client: the same giveOrder() call works on a single soldier or on the whole Quân Đoàn Tây Sơn, without knowing which one it got.',
        vi: 'Giống quân đội của hầu hết các nước, quân Tây Sơn được tổ chức theo hệ thống cấp bậc: Quân Đoàn gồm các Tiểu Đoàn, Tiểu Đoàn gồm các Tiểu Đội, và Tiểu Đội gồm các chiến sĩ. Mệnh lệnh được ban ra từ cấp cao nhất rồi truyền xuống từng cấp. Trong mã, MilitaryUnit là giao diện Component với attack() (tiến công) và getStrength() (sức mạnh). Soldier là Leaf: không có đơn vị con và làm phần việc thực sự, xông lên và báo sức mạnh của chính mình. MilitaryUnitComposite là Container: một quân đoàn, tiểu đoàn hay tiểu đội chứa các Soldier hoặc các MilitaryUnitComposite nhỏ hơn, và chỉ biết chúng qua giao diện MilitaryUnit. Khi nhận lệnh attack(), nó truyền lệnh cho mọi thành viên; với getStrength(), nó cộng kết quả của các thành viên. General (đại tướng) là Client: cùng một lời gọi giveOrder() dùng được cho một chiến sĩ hay cả Quân Đoàn Tây Sơn, mà không cần biết mình đang ra lệnh cho đối tượng nào.',
      },
      illustration: '⚔️ Quân Đội Việt Nam\n🏴 Quân Đoàn Tây Sơn\n├── 🏴 Tiểu Đoàn Bộ Binh\n│   └── 🏴 Tiểu Đội 1\n│       ├── 🪖 Nguyễn Văn An\n│       └── 🪖 Trần Văn Bình\n├── 🏴 Tiểu Đoàn Kỵ Binh\n│   └── 🪖 Lê Văn Cường\n└── 🪖 Phạm Văn Dũng\n\nattack() works on every level!',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod


# Component: operations common to simple and complex elements
class MilitaryUnit(ABC):
    @abstractmethod
    def attack(self, level: int = 0) -> None: ...

    @abstractmethod
    def get_strength(self) -> int: ...


# Leaf: has no sub-elements, so it does the real work itself
class Soldier(MilitaryUnit):
    def __init__(self, name: str, strength: int):
        self.name = name
        self.strength = strength

    def attack(self, level: int = 0) -> None:
        print("  " * level + f"⚔️ Chiến sĩ {self.name} xung phong!")

    def get_strength(self) -> int:
        return self.strength


# Container (Composite): holds leaves or other containers,
# and knows them only through the MilitaryUnit interface
class MilitaryUnitComposite(MilitaryUnit):
    def __init__(self, name: str):
        self.name = name
        self.members: list[MilitaryUnit] = []

    def add(self, unit: MilitaryUnit) -> None:
        self.members.append(unit)

    def remove(self, unit: MilitaryUnit) -> None:
        self.members.remove(unit)

    def attack(self, level: int = 0) -> None:
        # Pass the order down to every sub-element
        print("  " * level + f"🏴 {self.name} nhận lệnh tiến công!")
        for member in self.members:
            member.attack(level + 1)

    def get_strength(self) -> int:
        # Collect the children's results and sum them up
        return sum(member.get_strength() for member in self.members)


# Client: works with every element through the MilitaryUnit interface
class General:
    def give_order(self, unit: MilitaryUnit) -> None:
        unit.attack()
        print(f"Tổng sức mạnh: {unit.get_strength()}")


squad = MilitaryUnitComposite("Tiểu Đội 1")
squad.add(Soldier("Nguyễn Văn An", 100))
squad.add(Soldier("Trần Văn Bình", 90))

infantry = MilitaryUnitComposite("Tiểu Đoàn Bộ Binh")
infantry.add(squad)

cavalry = MilitaryUnitComposite("Tiểu Đoàn Kỵ Binh")
cavalry.add(Soldier("Lê Văn Cường", 150))

corps = MilitaryUnitComposite("Quân Đoàn Tây Sơn")
corps.add(infantry)
corps.add(cavalry)
corps.add(Soldier("Phạm Văn Dũng", 80))  # a leaf next to containers

general = General()
general.give_order(Soldier("Đinh Văn Hùng", 70))  # a single leaf
general.give_order(corps)                         # the whole tree, same call

corps.remove(cavalry)
print(f"Sức mạnh sau khi điều Kỵ Binh đi: {corps.get_strength()}")

# Output:
# ⚔️ Chiến sĩ Đinh Văn Hùng xung phong!
# Tổng sức mạnh: 70
# 🏴 Quân Đoàn Tây Sơn nhận lệnh tiến công!
#   🏴 Tiểu Đoàn Bộ Binh nhận lệnh tiến công!
#     🏴 Tiểu Đội 1 nhận lệnh tiến công!
#       ⚔️ Chiến sĩ Nguyễn Văn An xung phong!
#       ⚔️ Chiến sĩ Trần Văn Bình xung phong!
#   🏴 Tiểu Đoàn Kỵ Binh nhận lệnh tiến công!
#     ⚔️ Chiến sĩ Lê Văn Cường xung phong!
#   ⚔️ Chiến sĩ Phạm Văn Dũng xung phong!
# Tổng sức mạnh: 420
# Sức mạnh sau khi điều Kỵ Binh đi: 270`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Component: operations common to simple and complex elements
interface MilitaryUnit {
  attack(level?: number): void
  getStrength(): number
}

// Leaf: has no sub-elements, so it does the real work itself
class Soldier implements MilitaryUnit {
  constructor(private name: string, private strength: number) {}

  attack(level = 0): void {
    console.log('  '.repeat(level) + \`⚔️ Chiến sĩ \${this.name} xung phong!\`)
  }

  getStrength(): number { return this.strength }
}

// Container (Composite): holds leaves or other containers,
// and knows them only through the MilitaryUnit interface
class MilitaryUnitComposite implements MilitaryUnit {
  private members: MilitaryUnit[] = []

  constructor(private name: string) {}

  add(unit: MilitaryUnit): void { this.members.push(unit) }

  remove(unit: MilitaryUnit): void {
    this.members = this.members.filter(member => member !== unit)
  }

  attack(level = 0): void {
    // Pass the order down to every sub-element
    console.log('  '.repeat(level) + \`🏴 \${this.name} nhận lệnh tiến công!\`)
    this.members.forEach(member => member.attack(level + 1))
  }

  getStrength(): number {
    // Collect the children's results and sum them up
    return this.members.reduce((sum, member) => sum + member.getStrength(), 0)
  }
}

// Client: works with every element through the MilitaryUnit interface
class General {
  giveOrder(unit: MilitaryUnit): void {
    unit.attack()
    console.log(\`Tổng sức mạnh: \${unit.getStrength()}\`)
  }
}

const squad = new MilitaryUnitComposite('Tiểu Đội 1')
squad.add(new Soldier('Nguyễn Văn An', 100))
squad.add(new Soldier('Trần Văn Bình', 90))

const infantry = new MilitaryUnitComposite('Tiểu Đoàn Bộ Binh')
infantry.add(squad)

const cavalry = new MilitaryUnitComposite('Tiểu Đoàn Kỵ Binh')
cavalry.add(new Soldier('Lê Văn Cường', 150))

const corps = new MilitaryUnitComposite('Quân Đoàn Tây Sơn')
corps.add(infantry)
corps.add(cavalry)
corps.add(new Soldier('Phạm Văn Dũng', 80)) // a leaf next to containers

const general = new General()
general.giveOrder(new Soldier('Đinh Văn Hùng', 70)) // a single leaf
general.giveOrder(corps)                            // the whole tree, same call

corps.remove(cavalry)
console.log(\`Sức mạnh sau khi điều Kỵ Binh đi: \${corps.getStrength()}\`)`,
      },
    ],
    structure_notes: {
      en: 'The Component interface (MilitaryUnit) describes operations that are common to both simple and complex elements of the tree. The Leaf (Soldier) is a basic element that has no sub-elements; leaves usually end up doing most of the real work, since they have no one to delegate it to. The Container, also called composite (MilitaryUnitComposite), is an element that has sub-elements: leaves or other containers. It doesn\'t know the concrete classes of its children and works with them only through the component interface. On receiving a request, a container delegates the work to its sub-elements, processes the intermediate results and returns the final result to the client, as getStrength() sums its members\' strength. The Client (General) works with all elements through the component interface, so it handles simple and complex elements of the tree the same way. Here the child-management methods add() and remove() are declared only in the container; declaring them in the component interface would let the client treat all elements equally even while building the tree, at the cost of empty methods in the leaf. In the diagram, the "implements" and "children" links between MilitaryUnitComposite and MilitaryUnit are drawn on the same line.',
      vi: 'Giao diện Component (MilitaryUnit) mô tả các thao tác chung cho cả phần tử đơn giản lẫn phần tử phức tạp của cây. Leaf (Soldier) là phần tử cơ bản, không có phần tử con; lá thường là nơi làm phần lớn công việc thực sự, vì chúng không có ai để giao việc. Container, còn gọi là composite (MilitaryUnitComposite), là phần tử có các phần tử con: lá hoặc container khác. Nó không biết lớp cụ thể của các con và chỉ làm việc với chúng qua giao diện component. Khi nhận yêu cầu, container giao việc cho các phần tử con, xử lý kết quả trung gian rồi trả kết quả cuối cùng cho client, như getStrength() cộng sức mạnh của các thành viên. Client (General) làm việc với mọi phần tử qua giao diện component, nên xử lý phần tử đơn giản và phức tạp của cây theo cùng một cách. Ở đây các phương thức quản lý con add() và remove() chỉ được khai báo trong container; nếu khai báo chúng trong giao diện component, client có thể đối xử với mọi phần tử như nhau ngay cả khi dựng cây, nhưng lớp lá sẽ phải chứa các phương thức rỗng. Trong sơ đồ, hai liên kết "implements" và "children" giữa MilitaryUnitComposite và MilitaryUnit được vẽ trùng trên một đường.',
    },
  },

  {
    id: 'decorator',
    slug: 'decorator',
    name: { en: 'Decorator', vi: 'Trang Trí' },
    category: 'structural',
    complexity: 2,
    popularity: 2,
    also_known_as: [{ en: 'Wrapper', vi: 'Lớp bao bọc (Wrapper)' }],
    intent: {
      en: 'Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.',
      vi: 'Decorator là một mẫu thiết kế cấu trúc, cho phép gắn thêm hành vi mới cho đối tượng bằng cách đặt đối tượng đó vào bên trong các đối tượng bao bọc (wrapper) đặc biệt chứa các hành vi này.',
    },
    problem: {
      en: 'Imagine a notification library whose first version has a Notifier class with a single send(message) method that emails a list of addresses. Users soon want more: SMS for critical issues, Facebook messages, Slack for corporate teams. You add each channel as a Notifier subclass, and the client picks one. Then someone asks why they can\'t use several channels at once; if the house is on fire, they want to hear about it everywhere. Creating subclasses that combine channels (SMS + Facebook, SMS + Slack, ...) quickly bloats both the library and the client code, and the number of combinations keeps exploding.',
      vi: 'Hãy tưởng tượng một thư viện gửi thông báo mà phiên bản đầu chỉ có lớp Notifier với một phương thức send(message) gửi email tới một danh sách địa chỉ. Chẳng bao lâu người dùng muốn nhiều hơn: SMS cho sự cố nghiêm trọng, tin nhắn Facebook, Slack cho các nhóm trong doanh nghiệp. Bạn thêm mỗi kênh thành một lớp con của Notifier, và client chọn một lớp. Rồi có người hỏi tại sao không dùng được nhiều kênh cùng lúc; nếu nhà cháy, họ muốn được báo qua mọi kênh. Tạo các lớp con kết hợp nhiều kênh (SMS + Facebook, SMS + Slack, ...) nhanh chóng làm phình to cả mã thư viện lẫn mã client, và số tổ hợp cứ tăng vọt.',
    },
    solution: {
      en: 'Inheritance has two caveats here: it is static, so you can\'t change an existing object\'s behavior at runtime, and a subclass can have only one parent. Aggregation or composition avoids both: an object holds a reference to a helper and delegates work to it, and the helper can be swapped at runtime. A wrapper is an object linked to a target; it has the same methods as the target, delegates every request to it, and may do something before or after passing the request on. Because the wrapper implements the same interface as the wrapped object, the client sees no difference. If the wrapper\'s reference field accepts any object that follows that interface, you can cover an object in several wrappers and get the combined behavior of all of them. In the notification example, plain email stays in the base Notifier and SMS, Facebook and Slack become decorators. The client wraps a basic notifier in the decorators it wants, forming a stack, and works with the last decorator in the stack without caring whether it is decorated.',
      vi: 'Kế thừa có hai nhược điểm ở đây: nó là tĩnh, nên không thể đổi hành vi của một đối tượng đang tồn tại lúc chạy, và một lớp con chỉ có một lớp cha. Aggregation (kết tập) hoặc composition (hợp thành) tránh được cả hai: một đối tượng giữ tham chiếu tới một đối tượng trợ giúp và ủy quyền công việc cho nó, và đối tượng trợ giúp có thể được thay lúc chạy. Wrapper là một đối tượng liên kết với một đối tượng đích; nó có cùng các phương thức với đích, chuyển mọi yêu cầu cho đích, và có thể làm thêm việc gì đó trước hoặc sau khi chuyển yêu cầu. Vì wrapper triển khai cùng giao diện với đối tượng được bọc, client không thấy khác biệt. Nếu trường tham chiếu của wrapper chấp nhận mọi đối tượng theo giao diện đó, bạn có thể bọc một đối tượng trong nhiều lớp wrapper và nhận được hành vi kết hợp của tất cả. Trong ví dụ thông báo, việc gửi email đơn giản được giữ ở lớp Notifier cơ sở, còn SMS, Facebook và Slack trở thành các decorator. Client bọc một notifier cơ bản bằng các decorator nó cần, tạo thành một ngăn xếp, và làm việc với decorator cuối cùng trong ngăn xếp mà không cần biết đối tượng đã được trang trí hay chưa.',
    },
    applicability: {
      en: 'Use the Decorator pattern when you need to assign extra behaviors to objects at runtime without breaking the code that uses these objects: you split business logic into layers, create a decorator for each layer, and compose objects with different combinations of that logic at runtime, while the client treats them all the same because they share a common interface. Use it when it\'s awkward or impossible to extend an object\'s behavior with inheritance: many languages have a final keyword that prevents subclassing, and for a final class the only way to reuse its behavior is to wrap it in your own decorator.',
      vi: 'Dùng Decorator khi cần gán thêm hành vi cho đối tượng lúc chạy mà không làm hỏng mã đang dùng các đối tượng đó: bạn chia logic nghiệp vụ thành các lớp, tạo một decorator cho mỗi lớp, rồi ghép đối tượng với các tổ hợp logic khác nhau lúc chạy, trong khi client vẫn đối xử với chúng như nhau vì chúng có chung một giao diện. Dùng khi việc mở rộng hành vi bằng kế thừa bất tiện hoặc không thể làm được: nhiều ngôn ngữ có từ khóa final để chặn kế thừa, và với một lớp final, cách duy nhất để tái sử dụng hành vi của nó là bọc nó trong decorator của riêng bạn.',
    },
    vietnamese_example: {
      title: { en: 'Phở Broth Customization', vi: 'Tùy Chỉnh Nước Dùng Phở' },
      description: {
        en: 'Every bowl starts as a plain PlainNoodleSoup (the Concrete Component, 40.000đ). Customers then choose toppings: thịt bò (beef), trứng (egg), ớt (chili), hành lá (spring onion). Each topping is a Concrete Decorator (AddBeef, AddEgg, AddChili, AddSpringOnion) that extends the base decorator NoodleSoupDecorator, which holds a reference to any NoodleSoup and delegates describe() and price() to it. Each topping calls the parent method first, then appends its name and adds its price. The order-taking code wraps the bowl at runtime, one topping at a time, so PlainNoodleSoup → AddBeef → AddEgg → AddChili → AddSpringOnion costs 75.000đ without a class for each combination. The bill printer, the client, only sees the NoodleSoup interface and treats a plain bowl and a fully loaded one the same way.',
        vi: 'Bát phở nào cũng bắt đầu là một PlainNoodleSoup (Concrete Component, 40.000đ). Sau đó khách chọn thêm: thịt bò, trứng, ớt, hành lá. Mỗi món thêm là một Concrete Decorator (AddBeef, AddEgg, AddChili, AddSpringOnion) kế thừa decorator cơ sở NoodleSoupDecorator; lớp này giữ tham chiếu tới một NoodleSoup bất kỳ và ủy quyền describe() và price() cho nó. Mỗi món thêm gọi phương thức của lớp cha trước, rồi nối thêm tên và cộng thêm giá của mình. Mã nhận order bọc bát phở lúc chạy, từng món một, nên PlainNoodleSoup → AddBeef → AddEgg → AddChili → AddSpringOnion có giá 75.000đ mà không cần một lớp cho mỗi tổ hợp. Phần in hóa đơn, tức client, chỉ thấy giao diện NoodleSoup và đối xử với bát phở không như bát đầy đủ topping theo cùng một cách.',
      },
      illustration: '🍜 Phở Decorator Stack\n\nAddSpringOnion 🌿      (+0đ)\n └─ AddChili 🌶️       (+5.000đ)\n     └─ AddEgg 🥚  (+10.000đ)\n         └─ AddBeef 🥩 (+20.000đ)\n             └─ PlainNoodleSoup 🍜 (40.000đ)\n\nTổng: 75.000đ',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod


# Component: the common interface for wrapped objects and wrappers
class NoodleSoup(ABC):
    @abstractmethod
    def describe(self) -> str: ...

    @abstractmethod
    def price(self) -> int: ...


# Concrete Component: the basic bowl, whose behavior decorators can alter
class PlainNoodleSoup(NoodleSoup):
    def describe(self) -> str:
        return "🍜 Phở cơ bản"

    def price(self) -> int:
        return 40000


# Base Decorator: references a wrapped NoodleSoup and delegates all work to it.
# The field's type is the Component, so it can hold a bowl or another decorator.
class NoodleSoupDecorator(NoodleSoup):
    def __init__(self, soup: NoodleSoup) -> None:
        self._soup = soup

    def describe(self) -> str:
        return self._soup.describe()

    def price(self) -> int:
        return self._soup.price()


# Concrete Decorators: call the parent method, then add their own behavior
class AddBeef(NoodleSoupDecorator):
    def describe(self) -> str:
        return super().describe() + " + 🥩 thịt bò"

    def price(self) -> int:
        return super().price() + 20000


class AddEgg(NoodleSoupDecorator):
    def describe(self) -> str:
        return super().describe() + " + 🥚 trứng"

    def price(self) -> int:
        return super().price() + 10000


class AddChili(NoodleSoupDecorator):
    def describe(self) -> str:
        return super().describe() + " + 🌶️ ớt"

    def price(self) -> int:
        return super().price() + 5000


class AddSpringOnion(NoodleSoupDecorator):
    def describe(self) -> str:
        return super().describe() + " + 🌿 hành lá"

    def price(self) -> int:
        return super().price()  # spring onion is free


# The order-taking code assembles a decorator stack at runtime
TOPPINGS = {"bo": AddBeef, "trung": AddEgg, "ot": AddChili, "hanh": AddSpringOnion}


def order_dish(toppings: list) -> NoodleSoup:
    soup: NoodleSoup = PlainNoodleSoup()
    for topping_name in toppings:
        soup = TOPPINGS[topping_name](soup)
    return soup


# Client: works with every bowl only through the NoodleSoup interface
def print_bill(table: str, soup: NoodleSoup) -> None:
    price = f"{soup.price():,}".replace(",", ".")
    print(f"{table}: {soup.describe()} = {price}đ")


print_bill("Bàn 1", order_dish([]))
print_bill("Bàn 2", order_dish(["bo", "hanh"]))
print_bill("Bàn 3", order_dish(["bo", "trung", "ot", "hanh"]))

# Output:
# Bàn 1: 🍜 Phở cơ bản = 40.000đ
# Bàn 2: 🍜 Phở cơ bản + 🥩 thịt bò + 🌿 hành lá = 60.000đ
# Bàn 3: 🍜 Phở cơ bản + 🥩 thịt bò + 🥚 trứng + 🌶️ ớt + 🌿 hành lá = 75.000đ`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Component: the common interface for wrapped objects and wrappers
interface NoodleSoup {
  describe(): string
  price(): number
}

// Concrete Component: the basic bowl, whose behavior decorators can alter
class PlainNoodleSoup implements NoodleSoup {
  describe() { return '🍜 Phở cơ bản' }
  price() { return 40000 }
}

// Base Decorator: references a wrapped NoodleSoup and delegates all work to it.
// The field's type is the Component, so it can hold a bowl or another decorator.
abstract class NoodleSoupDecorator implements NoodleSoup {
  constructor(protected readonly soup: NoodleSoup) {}
  describe(): string { return this.soup.describe() }
  price(): number { return this.soup.price() }
}

// Concrete Decorators: call the parent method, then add their own behavior
class AddBeef extends NoodleSoupDecorator {
  describe() { return super.describe() + ' + 🥩 thịt bò' }
  price() { return super.price() + 20000 }
}

class AddEgg extends NoodleSoupDecorator {
  describe() { return super.describe() + ' + 🥚 trứng' }
  price() { return super.price() + 10000 }
}

class AddChili extends NoodleSoupDecorator {
  describe() { return super.describe() + ' + 🌶️ ớt' }
  price() { return super.price() + 5000 }
}

class AddSpringOnion extends NoodleSoupDecorator {
  describe() { return super.describe() + ' + 🌿 hành lá' }
  price() { return super.price() } // spring onion is free
}

// The order-taking code assembles a decorator stack at runtime
type Topping = 'bo' | 'trung' | 'ot' | 'hanh'
const TOPPINGS: Record<Topping, new (soup: NoodleSoup) => NoodleSoup> = {
  bo: AddBeef, trung: AddEgg, ot: AddChili, hanh: AddSpringOnion,
}

function orderDish(toppings: Topping[]): NoodleSoup {
  let soup: NoodleSoup = new PlainNoodleSoup()
  for (const toppingName of toppings) soup = new TOPPINGS[toppingName](soup)
  return soup
}

// Client: works with every bowl only through the NoodleSoup interface
function printBill(table: string, soup: NoodleSoup): void {
  const price = String(soup.price()).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.')
  console.log(\`\${table}: \${soup.describe()} = \${price}đ\`)
}

printBill('Bàn 1', orderDish([]))
printBill('Bàn 2', orderDish(['bo', 'hanh']))
printBill('Bàn 3', orderDish(['bo', 'trung', 'ot', 'hanh']))`,
      },
    ],
    structure_notes: {
      en: 'Component declares the common interface for both wrappers and wrapped objects. Concrete Component is the class of objects being wrapped; it defines the basic behavior, which decorators can alter. Base Decorator has a field that references a wrapped object; the field\'s type is the component interface, so it can hold both concrete components and decorators, and the base decorator delegates all operations to it. Concrete Decorators define extra behaviors that can be added to components dynamically; they override methods of the base decorator and run their behavior before or after calling the parent method. The Client can wrap components in multiple layers of decorators, as long as it works with all objects through the component interface. The diagram shows two of the four concrete decorators; AddChili and AddSpringOnion follow the same shape.',
      vi: 'Component khai báo giao diện chung cho cả wrapper lẫn đối tượng được bọc. Concrete Component là lớp của các đối tượng được bọc; nó định nghĩa hành vi cơ bản mà decorator có thể thay đổi. Base Decorator có một trường tham chiếu tới đối tượng được bọc; kiểu của trường là giao diện component, nên nó chứa được cả concrete component lẫn decorator, và base decorator ủy quyền mọi thao tác cho đối tượng đó. Concrete Decorator định nghĩa các hành vi bổ sung có thể gắn vào component một cách động; chúng ghi đè phương thức của base decorator và thực hiện hành vi của mình trước hoặc sau khi gọi phương thức của lớp cha. Client có thể bọc component trong nhiều lớp decorator, miễn là nó làm việc với mọi đối tượng qua giao diện component. Sơ đồ chỉ vẽ hai trong bốn concrete decorator; AddChili và AddSpringOnion có cấu trúc giống hệt.',
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
      en: 'Facade is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes.',
      vi: 'Facade là một mẫu thiết kế cấu trúc, cung cấp một giao diện đơn giản hóa cho một thư viện, một framework, hoặc bất kỳ tập hợp lớp phức tạp nào khác.',
    },
    problem: {
      en: 'Imagine your code must work with a broad set of objects that belong to a sophisticated library or framework. Normally you would have to initialize all of those objects, keep track of their dependencies, call their methods in the correct order, and so on. As a result, the business logic of your classes becomes tightly coupled to the implementation details of third-party classes, which makes it hard to understand and maintain.',
      vi: 'Hãy tưởng tượng mã của bạn phải làm việc với rất nhiều đối tượng thuộc một thư viện hoặc framework phức tạp. Thông thường bạn phải khởi tạo tất cả các đối tượng đó, theo dõi các phụ thuộc giữa chúng, gọi phương thức theo đúng thứ tự, và nhiều việc khác. Kết quả là logic nghiệp vụ trong các lớp của bạn bị gắn chặt với chi tiết triển khai của các lớp bên thứ ba, khiến mã khó hiểu và khó bảo trì.',
    },
    solution: {
      en: 'A facade is a class that provides a simple interface to a complex subsystem with many moving parts. It may offer less functionality than working with the subsystem directly, but it includes only the features clients really care about. A facade is handy when you integrate your app with a library that has dozens of features but you need only a small part of them. For example, an app that uploads short funny cat videos to social media could use a professional video conversion library, yet all it really needs is a class with a single method encode(filename, format). Once you create that class and connect it to the library, you have your first facade.',
      vi: 'Facade là một lớp cung cấp giao diện đơn giản cho một hệ thống con phức tạp có nhiều thành phần chuyển động. Nó có thể cung cấp ít chức năng hơn so với làm việc trực tiếp với hệ thống con, nhưng chỉ gồm những tính năng mà client thực sự cần. Facade hữu ích khi bạn tích hợp ứng dụng với một thư viện có hàng chục tính năng nhưng chỉ cần một phần nhỏ trong đó. Ví dụ, một ứng dụng tải video mèo hài hước lên mạng xã hội có thể dùng một thư viện chuyển đổi video chuyên nghiệp, nhưng thứ nó thực sự cần chỉ là một lớp với một phương thức encode(filename, format). Khi bạn tạo lớp đó và nối nó với thư viện, bạn đã có facade đầu tiên.',
    },
    applicability: {
      en: 'Use the Facade pattern when you need a limited but straightforward interface to a complex subsystem: subsystems tend to grow more complex over time, and even applying design patterns adds more classes, so the configuration and boilerplate a client must write keeps growing; a facade gives a shortcut to the most-used features that fit most client needs. Use it when you want to structure a subsystem into layers: create a facade as the entry point to each layer, and reduce coupling between subsystems by making them talk to each other only through facades. For example, a video conversion framework can be split into a video layer and an audio layer, each with its own facade, which looks very similar to the Mediator pattern.',
      vi: 'Dùng Facade khi bạn cần một giao diện hạn chế nhưng dễ dùng tới một hệ thống con phức tạp: hệ thống con thường ngày càng phức tạp hơn, ngay cả việc áp dụng mẫu thiết kế cũng sinh thêm lớp, nên lượng cấu hình và mã lặp lại mà client phải viết cứ tăng lên; facade cung cấp lối tắt tới những tính năng hay dùng nhất, đủ cho phần lớn nhu cầu của client. Dùng khi muốn tổ chức hệ thống con thành các tầng: tạo một facade làm điểm vào cho mỗi tầng, và giảm sự phụ thuộc giữa các hệ thống con bằng cách buộc chúng chỉ giao tiếp với nhau qua facade. Ví dụ, một framework chuyển đổi video có thể tách thành tầng video và tầng âm thanh, mỗi tầng có facade riêng; cách làm này rất giống mẫu Mediator.',
    },
    vietnamese_example: {
      title: { en: 'Quan Họ Wedding Ceremony Coordinator', vi: 'Người Tổ Chức Đám Cưới Quan Họ' },
      description: {
        en: 'A traditional Quan Họ wedding depends on many services that must run in the right order: Decoration (decoration), BridalDress (dressing the bride), Music (the Quan Họ singers), Ceremony (the ancestral ceremony and ring exchange) and Cooking (the feast). These classes form the Complex Subsystem; they know nothing about who coordinates them. The master of ceremonies, MasterOfCeremonies, is the Facade: the couple (the Client) make one call, startWedding(bride, groom, trayCount), and MasterOfCeremonies drives every service in the correct sequence. Cooking alone has its own steps, so it lives behind an Additional Facade, HeadCook (the head cook), whose prepareFeast(trayCount) handles prepareIngredients(), cook() and serveTrays(). MasterOfCeremonies uses HeadCook instead of talking to Cooking, and the family can also call HeadCook directly for a smaller feast such as the lại mặt visit after the wedding.',
        vi: 'Một đám cưới Quan Họ truyền thống cần nhiều dịch vụ phải chạy đúng thứ tự: Decoration (trang trí), BridalDress (thay áo cho cô dâu), Music (liền anh liền chị hát Quan Họ), Ceremony (lễ gia tiên và trao nhẫn) và Cooking (nấu cỗ). Các lớp này tạo thành Complex Subsystem; chúng không biết ai đang điều phối mình. Chủ hôn, MasterOfCeremonies, là Facade: đôi uyên ương (Client) chỉ gọi một lệnh startWedding(bride, groom, trayCount), và MasterOfCeremonies điều khiển mọi dịch vụ theo đúng trình tự. Riêng việc nấu nướng đã có nhiều bước, nên nó nằm sau một Additional Facade là HeadCook (trưởng bếp), với prepareFeast(trayCount) lo prepareIngredients(), cook() và serveTrays(). MasterOfCeremonies dùng HeadCook thay vì làm việc trực tiếp với Cooking, và gia đình cũng có thể gọi thẳng HeadCook cho một bữa cỗ nhỏ hơn như lễ lại mặt sau đám cưới.',
      },
      illustration: '💒 Đám Cưới Quan Họ\n\n[Cô Dâu / Chú Rể]  (Client)\n        │ startWedding()\n        ▼\n[MasterOfCeremonies - Facade] ──▶ [HeadCook - Additional Facade]\n  │    │    │    │              │\n  ▼    ▼    ▼    ▼              ▼\n 🌸   👘   🎵   📜             🍽️\nTrang Áo  Âm   Lễ            Nấu Ăn\n Trí  Dài Nhạc Nghi',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `# Complex Subsystem: wedding services. They work on their own
# and do not know that a facade exists.
class Decoration:
    def hang_flowers(self) -> None:
        print("🌸 Treo hoa sen và cúc vạn thọ")

    def light_lanterns(self) -> None:
        print("🏮 Thắp đèn lồng đỏ")


class BridalDress:
    def dress_bride(self, person: str) -> None:
        print(f"👘 Cô dâu {person} mặc áo dài đỏ, đội khăn vấn")


class Music:
    def start(self) -> None:
        print("🎵 Liền anh liền chị Quan Họ vào chỗ")

    def sing(self, song: str) -> None:
        print(f"🎵 Hát: {song}")


class Ceremony:
    def ancestral_rite(self, bride: str, groom: str) -> None:
        print(f"📜 {groom} và {bride} làm lễ gia tiên")

    def exchange_rings(self) -> None:
        print("💍 Trao nhẫn cưới")


class Cooking:
    def prepare_ingredients(self) -> None:
        print("🔪 Sơ chế gà, giò, xôi")

    def cook(self, dish: str) -> None:
        print(f"🍲 Nấu {dish}")

    def serve_trays(self, tray_count: int) -> None:
        print(f"🍽️ Bày {tray_count} mâm cỗ")


# Additional Facade: keeps the kitchen steps out of the main facade
class HeadCook:
    def __init__(self) -> None:
        self._cooking = Cooking()

    def prepare_feast(self, tray_count: int) -> None:
        self._cooking.prepare_ingredients()
        self._cooking.cook("canh măng, gà luộc")
        self._cooking.serve_trays(tray_count)


# Facade: knows which service handles what and in which order
class MasterOfCeremonies:
    def __init__(self) -> None:
        self._decoration = Decoration()
        self._dress = BridalDress()
        self._music = Music()
        self._ceremony = Ceremony()
        self._head_cook = HeadCook()  # a facade can use another facade

    def start_wedding(self, bride: str, groom: str, tray_count: int) -> None:
        print("💒 === BẮT ĐẦU LỄ CƯỚI QUAN HỌ ===")
        self._decoration.hang_flowers()
        self._decoration.light_lanterns()
        self._dress.dress_bride(bride)
        self._music.start()
        self._music.sing("Mời trầu")
        self._ceremony.ancestral_rite(bride, groom)
        self._ceremony.exchange_rings()
        self._head_cook.prepare_feast(tray_count)
        print("💒 === LỄ CƯỚI HOÀN THÀNH ===")


# Client: the couple make one call instead of driving every service
MasterOfCeremonies().start_wedding("Lan", "Minh", 12)

# Clients can also use the additional facade directly
print("--- Lễ lại mặt ---")
HeadCook().prepare_feast(3)

# Output:
# 💒 === BẮT ĐẦU LỄ CƯỚI QUAN HỌ ===
# 🌸 Treo hoa sen và cúc vạn thọ
# 🏮 Thắp đèn lồng đỏ
# 👘 Cô dâu Lan mặc áo dài đỏ, đội khăn vấn
# 🎵 Liền anh liền chị Quan Họ vào chỗ
# 🎵 Hát: Mời trầu
# 📜 Minh và Lan làm lễ gia tiên
# 💍 Trao nhẫn cưới
# 🔪 Sơ chế gà, giò, xôi
# 🍲 Nấu canh măng, gà luộc
# 🍽️ Bày 12 mâm cỗ
# 💒 === LỄ CƯỚI HOÀN THÀNH ===
# --- Lễ lại mặt ---
# 🔪 Sơ chế gà, giò, xôi
# 🍲 Nấu canh măng, gà luộc
# 🍽️ Bày 3 mâm cỗ`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Complex Subsystem: wedding services. They work on their own
// and do not know that a facade exists.
class Decoration {
  hangFlowers() { console.log('🌸 Treo hoa sen và cúc vạn thọ') }
  lightLanterns() { console.log('🏮 Thắp đèn lồng đỏ') }
}

class BridalDress {
  dressBride(person: string) { console.log(\`👘 Cô dâu \${person} mặc áo dài đỏ, đội khăn vấn\`) }
}

class Music {
  start() { console.log('🎵 Liền anh liền chị Quan Họ vào chỗ') }
  sing(song: string) { console.log(\`🎵 Hát: \${song}\`) }
}

class Ceremony {
  ancestralRite(bride: string, groom: string) { console.log(\`📜 \${groom} và \${bride} làm lễ gia tiên\`) }
  exchangeRings() { console.log('💍 Trao nhẫn cưới') }
}

class Cooking {
  prepareIngredients() { console.log('🔪 Sơ chế gà, giò, xôi') }
  cook(dish: string) { console.log(\`🍲 Nấu \${dish}\`) }
  serveTrays(trayCount: number) { console.log(\`🍽️ Bày \${trayCount} mâm cỗ\`) }
}

// Additional Facade: keeps the kitchen steps out of the main facade
class HeadCook {
  private cooking = new Cooking()

  prepareFeast(trayCount: number): void {
    this.cooking.prepareIngredients()
    this.cooking.cook('canh măng, gà luộc')
    this.cooking.serveTrays(trayCount)
  }
}

// Facade: knows which service handles what and in which order
class MasterOfCeremonies {
  private decoration = new Decoration()
  private dress = new BridalDress()
  private music = new Music()
  private ceremony = new Ceremony()
  private headCook = new HeadCook() // a facade can use another facade

  startWedding(bride: string, groom: string, trayCount: number): void {
    console.log('💒 === BẮT ĐẦU LỄ CƯỚI QUAN HỌ ===')
    this.decoration.hangFlowers()
    this.decoration.lightLanterns()
    this.dress.dressBride(bride)
    this.music.start()
    this.music.sing('Mời trầu')
    this.ceremony.ancestralRite(bride, groom)
    this.ceremony.exchangeRings()
    this.headCook.prepareFeast(trayCount)
    console.log('💒 === LỄ CƯỚI HOÀN THÀNH ===')
  }
}

// Client: the couple make one call instead of driving every service
new MasterOfCeremonies().startWedding('Lan', 'Minh', 12)

// Clients can also use the additional facade directly
console.log('--- Lễ lại mặt ---')
new HeadCook().prepareFeast(3)`,
      },
    ],
    structure_notes: {
      en: 'The Facade provides convenient access to a particular part of the subsystem\'s functionality; it knows where to direct the client\'s request and how to operate all the moving parts. An Additional Facade can be created to keep a single facade from filling up with unrelated features and turning into another complex structure; additional facades can be used by both clients and other facades. The Complex Subsystem consists of many different objects; to make them do something meaningful you have to know their implementation details, such as initializing objects in the correct order and passing them data in the proper format. Subsystem classes aren\'t aware of the facade; they operate within the system and work with each other directly. The Client uses the facade instead of calling the subsystem objects directly.',
      vi: 'Facade cung cấp lối truy cập thuận tiện tới một phần chức năng cụ thể của hệ thống con; nó biết chuyển yêu cầu của client tới đâu và cách vận hành mọi thành phần chuyển động. Additional Facade có thể được tạo ra để một facade không bị nhồi các tính năng không liên quan và trở thành thêm một cấu trúc phức tạp nữa; facade bổ sung có thể được dùng bởi cả client lẫn các facade khác. Complex Subsystem gồm nhiều đối tượng khác nhau; muốn chúng làm được việc có ý nghĩa, bạn phải nắm chi tiết triển khai của chúng, như khởi tạo đối tượng theo đúng thứ tự và truyền dữ liệu đúng định dạng. Các lớp của hệ thống con không biết đến facade; chúng hoạt động bên trong hệ thống và làm việc trực tiếp với nhau. Client dùng facade thay vì gọi trực tiếp các đối tượng của hệ thống con.',
    },
  },

  {
    id: 'flyweight',
    slug: 'flyweight',
    name: { en: 'Flyweight', vi: 'Nhẹ Cân' },
    category: 'structural',
    complexity: 3,
    popularity: 1,
    also_known_as: [{ en: 'Cache', vi: 'Bộ nhớ đệm (Cache)' }],
    intent: {
      en: 'Flyweight is a structural design pattern that lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.',
      vi: 'Flyweight là một mẫu thiết kế cấu trúc, cho phép chứa được nhiều đối tượng hơn trong lượng RAM có sẵn bằng cách chia sẻ những phần trạng thái chung giữa nhiều đối tượng, thay vì giữ toàn bộ dữ liệu trong từng đối tượng.',
    },
    problem: {
      en: 'Imagine you build a simple video game where players move around a map and shoot each other, with a realistic particle system as its signature feature: huge numbers of bullets, missiles and shrapnel fly across the map. The game runs fine on your machine, but on a friend\'s less powerful computer it keeps crashing after a few minutes. The debug logs show it runs out of RAM. Each particle is a separate object holding plenty of data, and when the action peaks, newly created particles no longer fit into the remaining memory.',
      vi: 'Hãy tưởng tượng bạn làm một trò chơi đơn giản, người chơi di chuyển trên bản đồ và bắn nhau, với điểm nhấn là một hệ thống hạt (particle) chân thực: vô số đạn, tên lửa và mảnh vỡ bay khắp bản đồ. Trò chơi chạy tốt trên máy bạn, nhưng trên máy yếu hơn của một người bạn thì cứ chơi vài phút là bị sập. Nhật ký gỡ lỗi cho thấy trò chơi hết RAM. Mỗi hạt là một đối tượng riêng chứa rất nhiều dữ liệu, và khi trận đánh lên cao trào, các hạt mới tạo ra không còn đủ chỗ trong bộ nhớ còn lại.',
    },
    solution: {
      en: 'In the Particle class, the color and sprite fields take far more memory than the others and are almost identical across particles (all bullets share one color and sprite), while coordinates, movement vector and speed are unique and change over time. The constant data is the intrinsic state: it lives inside the object, and other objects can only read it. The rest, often changed from outside, is the extrinsic state. The pattern says to stop storing extrinsic state in the object and pass it to the methods that need it instead. Only intrinsic state stays, so one object can be reused in many contexts, and you need only as many objects as there are intrinsic variations: three (bullet, missile, shrapnel) instead of thousands. Such an object is called a flyweight. The extrinsic state moves to a container, or better, to small context objects that each store it plus a reference to a flyweight; you still have many contexts, but the heavy fields now exist only in a few flyweights. Because a flyweight is shared, it must be immutable: it sets its state once through constructor parameters and exposes no setters or public fields. For convenient access, a factory method manages a pool of flyweights: it takes the intrinsic state, returns a matching existing flyweight, or creates a new one and adds it to the pool. That method can live in the container, in a separate factory class, or as a static method on the flyweight class.',
      vi: 'Trong lớp Particle, hai trường màu sắc và sprite tốn bộ nhớ hơn hẳn các trường khác và gần như giống hệt nhau giữa các hạt (mọi viên đạn có chung màu và sprite), còn tọa độ, vectơ chuyển động và tốc độ thì riêng cho từng hạt và thay đổi theo thời gian. Dữ liệu không đổi là trạng thái nội tại (intrinsic): nó nằm trong đối tượng, và các đối tượng khác chỉ được đọc. Phần còn lại, thường bị thay đổi từ bên ngoài, là trạng thái ngoại tại (extrinsic). Mẫu này đề nghị thôi lưu trạng thái ngoại tại trong đối tượng mà truyền nó vào các phương thức cần đến. Chỉ trạng thái nội tại được giữ lại, nên một đối tượng có thể được dùng lại trong nhiều ngữ cảnh, và bạn chỉ cần số đối tượng bằng số biến thể nội tại: ba (đạn, tên lửa, mảnh vỡ) thay vì hàng nghìn. Đối tượng như vậy gọi là flyweight. Trạng thái ngoại tại được chuyển sang đối tượng chứa (container), hoặc tốt hơn là sang các đối tượng ngữ cảnh (context) nhỏ, mỗi đối tượng lưu trạng thái đó cùng một tham chiếu tới flyweight; số context vẫn nhiều, nhưng các trường nặng giờ chỉ tồn tại trong vài flyweight. Vì flyweight được dùng chung, nó phải bất biến: trạng thái chỉ được gán một lần qua tham số hàm khởi tạo, không có setter hay trường public. Để truy cập tiện lợi, một phương thức factory quản lý một pool các flyweight: nó nhận trạng thái nội tại, trả về flyweight có sẵn nếu khớp, hoặc tạo flyweight mới và thêm vào pool. Phương thức này có thể đặt trong container, trong một lớp factory riêng, hoặc là phương thức static của chính lớp flyweight.',
    },
    applicability: {
      en: 'Use the Flyweight pattern only when your program must support a huge number of objects which barely fit into available RAM. How much it helps depends on how and where it is used; it is most useful when an application needs to spawn a huge number of similar objects, this drains all available RAM on the target device, and the objects contain duplicate state that can be extracted and shared between multiple objects.',
      vi: 'Chỉ dùng Flyweight khi chương trình phải hỗ trợ một số lượng đối tượng khổng lồ, gần như không vừa RAM hiện có. Lợi ích của mẫu này phụ thuộc nhiều vào việc dùng nó ở đâu và như thế nào; nó hữu ích nhất khi ứng dụng cần tạo ra rất nhiều đối tượng giống nhau, việc đó làm cạn RAM trên thiết bị đích, và các đối tượng chứa trạng thái trùng lặp có thể tách ra để dùng chung giữa nhiều đối tượng.',
    },
    vietnamese_example: {
      title: { en: 'Lantern Festival (Hội An Đèn Lồng)', vi: 'Lễ Hội Đèn Lồng Hội An' },
      description: {
        en: 'During the Hội An Lantern Festival, thousands of lanterns float on the Thu Bồn river. Their color (đỏ/vàng), shape (tròn/vuông) and pattern (hoa sen/rồng) repeat across thousands of lanterns, so they are the intrinsic state kept in the Flyweight LanternFlyweight, which is immutable. Each lantern\'s position on the river and the wish written on it are unique, so they are the extrinsic state stored in the Context Lantern, together with a reference to its flyweight; Lantern.display() passes x, y and wish into the flyweight\'s display(). The Flyweight Factory LanternFactory keeps a pool keyed by color, shape and pattern and returns an existing lantern type or creates a new one. The Client LanternFestival stores the contexts and asks the factory for a type each time it releases a lantern, so 10,005 lanterns share just 2 flyweight objects.',
        vi: 'Trong Lễ hội Đèn Lồng Hội An, hàng nghìn chiếc đèn trôi trên sông Thu Bồn. Màu sắc (đỏ/vàng), hình dáng (tròn/vuông) và họa tiết (hoa sen/rồng) lặp lại trên hàng nghìn chiếc đèn, nên đó là trạng thái nội tại, được giữ trong Flyweight LanternFlyweight và không thể thay đổi. Vị trí trên sông và lời ước viết trên mỗi chiếc đèn là riêng, nên đó là trạng thái ngoại tại, được lưu trong Context Lantern cùng một tham chiếu tới flyweight của nó; Lantern.display() truyền x, y và wish vào display() của flyweight. Flyweight Factory LanternFactory giữ một pool theo khóa màu, hình dáng và họa tiết, trả về kiểu đèn có sẵn hoặc tạo kiểu mới. Client LanternFestival lưu các context và hỏi factory lấy kiểu đèn mỗi lần thả đèn, nên 10.005 chiếc đèn chỉ dùng chung 2 đối tượng flyweight.',
      },
      illustration: '🏮 Lễ Hội Đèn Lồng\nLanternFactory (pool)\n  "đỏ+tròn+hoa sen"  ──▶ [LanternFlyweight #1]\n  "vàng+vuông+rồng" ──▶ [LanternFlyweight #2]\n\nLantern (context, extrinsic):\n  (x=10, y=3, "Ước bình an")   ──▶ #1\n  (x=20, y=5, "Ước hạnh phúc") ──▶ #1\n  (x=15, y=4, "Ước thành công") ─▶ #2\n  ↑ same flyweight, different context!',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from dataclasses import dataclass


# Flyweight: holds the intrinsic state shared by many lanterns.
# frozen=True makes it immutable: state is set once in the constructor.
@dataclass(frozen=True)
class LanternFlyweight:
    color: str    # color
    shape: str    # shape
    pattern: str  # pattern (imagine a heavy texture here)

    # Extrinsic state arrives through method parameters
    def display(self, x: int, y: int, wish: str) -> str:
        return f"🏮 {self.color}/{self.shape}/{self.pattern} tại ({x}, {y}): {wish}"


# Flyweight Factory: returns an existing flyweight or creates and pools a new one
class LanternFactory:
    _pool: dict = {}

    @classmethod
    def get_lantern(cls, color: str, shape: str, pattern: str) -> LanternFlyweight:
        key = (color, shape, pattern)
        if key not in cls._pool:
            cls._pool[key] = LanternFlyweight(color, shape, pattern)
        return cls._pool[key]

    @classmethod
    def type_count(cls) -> int:
        return len(cls._pool)


# Context: the extrinsic state of one lantern plus a reference to its flyweight
class Lantern:
    def __init__(self, x: int, y: int, wish: str, flyweight: LanternFlyweight) -> None:
        self.x = x
        self.y = y
        self.wish = wish
        self.flyweight = flyweight

    def display(self) -> str:
        return self.flyweight.display(self.x, self.y, self.wish)


# Client: stores the contexts and gets flyweights only through the factory
class LanternFestival:
    def __init__(self) -> None:
        self.lanterns: list = []

    def release_lantern(self, x: int, y: int, wish: str, color: str, shape: str, pattern: str) -> None:
        flyweight = LanternFactory.get_lantern(color, shape, pattern)
        self.lanterns.append(Lantern(x, y, wish, flyweight))

    def display(self) -> None:
        for lantern in self.lanterns:
            print(lantern.display())


thu_bon_river = LanternFestival()
thu_bon_river.release_lantern(10, 3, "Ước bình an", "đỏ", "tròn", "hoa sen")
thu_bon_river.release_lantern(20, 5, "Ước hạnh phúc", "đỏ", "tròn", "hoa sen")
thu_bon_river.release_lantern(15, 4, "Ước thành công", "vàng", "vuông", "rồng")
thu_bon_river.release_lantern(8, 6, "Ước sức khỏe", "đỏ", "tròn", "hoa sen")
thu_bon_river.release_lantern(25, 2, "Ước phú quý", "vàng", "vuông", "rồng")
thu_bon_river.display()

# Release 10,000 more lanterns: the pool does not grow
for i in range(10000):
    if i % 2 == 0:
        thu_bon_river.release_lantern(i, i % 7, "Ước bình an", "đỏ", "tròn", "hoa sen")
    else:
        thu_bon_river.release_lantern(i, i % 7, "Ước an khang", "vàng", "vuông", "rồng")

print(f"{len(thu_bon_river.lanterns)} đèn lồng, {LanternFactory.type_count()} flyweight")

# Output:
# 🏮 đỏ/tròn/hoa sen tại (10, 3): Ước bình an
# 🏮 đỏ/tròn/hoa sen tại (20, 5): Ước hạnh phúc
# 🏮 vàng/vuông/rồng tại (15, 4): Ước thành công
# 🏮 đỏ/tròn/hoa sen tại (8, 6): Ước sức khỏe
# 🏮 vàng/vuông/rồng tại (25, 2): Ước phú quý
# 10005 đèn lồng, 2 flyweight`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Flyweight: holds the intrinsic state shared by many lanterns.
// Fields are private and readonly: state is set once in the constructor.
class LanternFlyweight {
  constructor(
    private readonly color: string,    // color
    private readonly shape: string,    // shape
    private readonly pattern: string,  // pattern (imagine a heavy texture here)
  ) {}

  // Extrinsic state arrives through method parameters
  display(x: number, y: number, wish: string): string {
    return \`🏮 \${this.color}/\${this.shape}/\${this.pattern} tại (\${x}, \${y}): \${wish}\`
  }
}

// Flyweight Factory: returns an existing flyweight or creates and pools a new one
class LanternFactory {
  private static pool = new Map<string, LanternFlyweight>()

  static getLantern(color: string, shape: string, pattern: string): LanternFlyweight {
    const key = \`\${color}|\${shape}|\${pattern}\`
    let flyweight = this.pool.get(key)
    if (!flyweight) {
      flyweight = new LanternFlyweight(color, shape, pattern)
      this.pool.set(key, flyweight)
    }
    return flyweight
  }

  static typeCount(): number { return this.pool.size }
}

// Context: the extrinsic state of one lantern plus a reference to its flyweight
class Lantern {
  constructor(
    private x: number,
    private y: number,
    private wish: string,
    private flyweight: LanternFlyweight,
  ) {}

  display(): string { return this.flyweight.display(this.x, this.y, this.wish) }
}

// Client: stores the contexts and gets flyweights only through the factory
class LanternFestival {
  readonly lanterns: Lantern[] = []

  releaseLantern(x: number, y: number, wish: string, color: string, shape: string, pattern: string): void {
    const flyweight = LanternFactory.getLantern(color, shape, pattern)
    this.lanterns.push(new Lantern(x, y, wish, flyweight))
  }

  display(): void {
    for (const lantern of this.lanterns) console.log(lantern.display())
  }
}

const thuBonRiver = new LanternFestival()
thuBonRiver.releaseLantern(10, 3, 'Ước bình an', 'đỏ', 'tròn', 'hoa sen')
thuBonRiver.releaseLantern(20, 5, 'Ước hạnh phúc', 'đỏ', 'tròn', 'hoa sen')
thuBonRiver.releaseLantern(15, 4, 'Ước thành công', 'vàng', 'vuông', 'rồng')
thuBonRiver.releaseLantern(8, 6, 'Ước sức khỏe', 'đỏ', 'tròn', 'hoa sen')
thuBonRiver.releaseLantern(25, 2, 'Ước phú quý', 'vàng', 'vuông', 'rồng')
thuBonRiver.display()

// Release 10,000 more lanterns: the pool does not grow
for (let i = 0; i < 10000; i++) {
  if (i % 2 === 0) thuBonRiver.releaseLantern(i, i % 7, 'Ước bình an', 'đỏ', 'tròn', 'hoa sen')
  else thuBonRiver.releaseLantern(i, i % 7, 'Ước an khang', 'vàng', 'vuông', 'rồng')
}

console.log(\`\${thuBonRiver.lanterns.length} đèn lồng, \${LanternFactory.typeCount()} flyweight\`)`,
      },
    ],
    structure_notes: {
      en: 'The Flyweight pattern is only an optimization: before applying it, make sure your program really has a RAM problem caused by a massive number of similar objects in memory at once, and that the problem can\'t be solved another way. The Flyweight class contains the part of the original object\'s state that can be shared between many objects; the same flyweight can be used in many different contexts. The state stored inside a flyweight is called intrinsic; the state passed to its methods is called extrinsic. The Context class contains the extrinsic state, unique to each original object; a context paired with a flyweight represents the full state of the original object. Usually the original behavior stays in the flyweight, so whoever calls its methods must pass the extrinsic state as parameters; alternatively the behavior can move to the context, which then uses the flyweight only as a data object. The Client calculates or stores the extrinsic state; to it, a flyweight is a template object configured at runtime through method parameters. The Flyweight Factory manages a pool of existing flyweights: clients don\'t create flyweights directly but call the factory with the intrinsic state they want, and the factory returns a matching flyweight or creates a new one.',
      vi: 'Flyweight chỉ là một kỹ thuật tối ưu: trước khi áp dụng, hãy chắc chắn chương trình thực sự gặp vấn đề tiêu tốn RAM do có quá nhiều đối tượng giống nhau trong bộ nhớ cùng lúc, và vấn đề đó không giải quyết được bằng cách khác hợp lý hơn. Lớp Flyweight chứa phần trạng thái của đối tượng gốc có thể dùng chung giữa nhiều đối tượng; cùng một flyweight có thể được dùng trong nhiều ngữ cảnh khác nhau. Trạng thái lưu bên trong flyweight gọi là nội tại (intrinsic); trạng thái được truyền vào phương thức của nó gọi là ngoại tại (extrinsic). Lớp Context chứa trạng thái ngoại tại, riêng cho từng đối tượng gốc; một context ghép với một flyweight thể hiện đầy đủ trạng thái của đối tượng gốc. Thông thường hành vi gốc vẫn nằm trong flyweight, nên ai gọi phương thức của nó phải truyền trạng thái ngoại tại qua tham số; cách khác là chuyển hành vi sang context, khi đó context chỉ dùng flyweight như một đối tượng dữ liệu. Client tính toán hoặc lưu trữ trạng thái ngoại tại; với client, flyweight là một đối tượng mẫu được cấu hình lúc chạy qua tham số của phương thức. Flyweight Factory quản lý một pool các flyweight có sẵn: client không tự tạo flyweight mà gọi factory với trạng thái nội tại mong muốn, và factory trả về flyweight khớp hoặc tạo một flyweight mới.',
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
      en: 'Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.',
      vi: 'Proxy là một mẫu thiết kế cấu trúc, cho phép bạn cung cấp một vật thay thế hoặc vật giữ chỗ cho một đối tượng khác. Proxy kiểm soát việc truy cập vào đối tượng gốc, cho phép bạn làm một việc gì đó trước hoặc sau khi yêu cầu được chuyển tới đối tượng gốc.',
    },
    problem: {
      en: 'Why would you want to control access to an object? Say you have a massive object that consumes a vast amount of system resources, such as a database that answers slow queries. You need it from time to time, but not always. You could use lazy initialization and create the object only when it is actually needed, but then every client of the object would have to run some deferred initialization code, which probably means a lot of duplicated code. Ideally this code would go straight into the object\'s class, but that isn\'t always possible: the class may be part of a closed third-party library.',
      vi: 'Vì sao lại cần kiểm soát việc truy cập vào một đối tượng? Giả sử bạn có một đối tượng khổng lồ tiêu tốn rất nhiều tài nguyên hệ thống, ví dụ một cơ sở dữ liệu trả lời truy vấn rất chậm. Bạn chỉ thỉnh thoảng mới cần đến nó. Bạn có thể dùng khởi tạo trễ (lazy initialization), tức là chỉ tạo đối tượng khi thật sự cần, nhưng khi đó mọi client của đối tượng đều phải chạy một đoạn mã khởi tạo trễ, nhiều khả năng dẫn đến rất nhiều mã bị lặp lại. Lý tưởng nhất là đặt đoạn mã này ngay trong lớp của đối tượng, nhưng không phải lúc nào cũng làm được: lớp đó có thể thuộc một thư viện bên thứ ba đóng mã nguồn.',
    },
    solution: {
      en: 'Create a new proxy class with the same interface as the original service object, then update the app so it passes the proxy object to all of the original object\'s clients. When the proxy receives a request from a client, it creates a real service object and delegates all the work to it. In the database example, the proxy disguises itself as the database object and handles lazy initialization and result caching without the client or the real database object even knowing. The benefit: if you need to run something before or after the primary logic of a class, the proxy lets you do it without changing that class. Because the proxy implements the same interface as the original class, it can be passed to any client that expects a real service object.',
      vi: 'Tạo một lớp proxy mới có cùng giao diện với đối tượng dịch vụ gốc, rồi sửa ứng dụng để truyền đối tượng proxy cho mọi client của đối tượng gốc. Khi nhận yêu cầu từ client, proxy tạo một đối tượng dịch vụ thật và ủy quyền toàn bộ công việc cho nó. Trong ví dụ cơ sở dữ liệu, proxy đóng giả làm đối tượng cơ sở dữ liệu và lo việc khởi tạo trễ cùng cache kết quả mà cả client lẫn đối tượng cơ sở dữ liệu thật đều không hề hay biết. Lợi ích là: nếu cần chạy thêm việc gì đó trước hoặc sau logic chính của một lớp, proxy cho phép làm điều đó mà không phải sửa lớp ấy. Vì proxy triển khai cùng giao diện với lớp gốc, nó có thể được truyền vào bất kỳ client nào đang chờ một đối tượng dịch vụ thật.',
    },
    applicability: {
      en: 'There are dozens of ways to use Proxy; these are the most popular. Lazy initialization (virtual proxy): when a heavyweight service object wastes system resources by being always up even though you only need it from time to time, delay its initialization until it is really needed instead of creating it at app launch. Access control (protection proxy): when only specific clients should be able to use the service object, for instance when the objects are crucial parts of an operating system and the clients are various launched applications (including malicious ones), the proxy passes the request on only if the client\'s credentials match some criteria. Local execution of a remote service (remote proxy): when the service object lives on a remote server, the proxy passes the client request over the network and handles all the nasty details of networking. Logging requests (logging proxy): when you want to keep a history of requests to the service object, the proxy logs each request before passing it on. Caching request results (caching proxy): when you need to cache results of client requests and manage the life cycle of that cache, especially if results are large, the proxy can cache recurring requests that always yield the same results, using request parameters as cache keys. Smart reference: when you need to dismiss a heavyweight object once no clients use it, the proxy keeps track of clients that obtained a reference to the service or its results, checks from time to time whether they are still active, and frees the service once the list is empty; it can also track whether a client modified the service object, so unchanged objects can be reused by other clients.',
      vi: 'Có hàng chục cách dùng Proxy; sau đây là những cách phổ biến nhất. Khởi tạo trễ (virtual proxy): khi một đối tượng dịch vụ nặng nề luôn chạy và lãng phí tài nguyên hệ thống dù bạn chỉ thỉnh thoảng mới cần, hãy hoãn việc khởi tạo nó đến lúc thật sự cần thay vì tạo ngay khi ứng dụng khởi động. Kiểm soát truy cập (protection proxy): khi chỉ một số client nhất định được dùng đối tượng dịch vụ, ví dụ khi các đối tượng là thành phần quan trọng của hệ điều hành còn client là các ứng dụng được chạy (kể cả ứng dụng độc hại), proxy chỉ chuyển yêu cầu đi nếu thông tin xác thực của client thỏa mãn tiêu chí nào đó. Thực thi cục bộ một dịch vụ từ xa (remote proxy): khi đối tượng dịch vụ nằm trên máy chủ từ xa, proxy chuyển yêu cầu của client qua mạng và lo hết các chi tiết phiền phức của việc làm việc với mạng. Ghi log yêu cầu (logging proxy): khi muốn lưu lịch sử các yêu cầu gửi tới đối tượng dịch vụ, proxy ghi log từng yêu cầu trước khi chuyển tiếp. Cache kết quả (caching proxy): khi cần cache kết quả các yêu cầu của client và quản lý vòng đời của cache đó, nhất là khi kết quả có kích thước lớn, proxy có thể cache các yêu cầu lặp lại luôn cho cùng kết quả, dùng tham số của yêu cầu làm khóa cache. Tham chiếu thông minh (smart reference): khi cần giải phóng một đối tượng nặng nề ngay khi không còn client nào dùng nó, proxy theo dõi các client đã lấy tham chiếu tới dịch vụ hoặc kết quả của nó, thỉnh thoảng kiểm tra xem chúng còn hoạt động không, và giải phóng dịch vụ khi danh sách trống; proxy cũng có thể theo dõi xem client có sửa đối tượng dịch vụ hay không, để các đối tượng chưa bị sửa được tái sử dụng cho client khác.',
    },
    vietnamese_example: {
      title: { en: 'Quan Lại (Mandarin) Access Control', vi: 'Quan Lại - Kiểm Soát Tiếp Cận' },
      description: {
        en: 'At the imperial court, petitioners never reach the Emperor directly. CourtSession (the court session) is the Client: it holds a reference of type Emperor, the Service Interface, and calls grantAudience() without knowing who answers. The real Emperor, RealEmperor, is the Service, and summoning him to the throne hall is costly. MandarinProxy, the mandarin, is the Proxy: he implements the same Emperor interface and stands in front of the Emperor. He records every petition (logging proxy), turns away anyone not on his list (protection proxy), summons the Emperor only when the first valid petition arrives (virtual proxy), and answers a repeated petition from the earlier decree (caching proxy). The Emperor\'s class never changes, and the court session cannot tell whether it is talking to the mandarin or to the Emperor himself.',
        vi: 'Ở triều đình, người dâng đơn không bao giờ gặp thẳng Hoàng Đế. CourtSession (buổi thiết triều) là Client: nó giữ một tham chiếu kiểu Emperor, tức Service Interface, và gọi grantAudience() mà không cần biết ai sẽ trả lời. Hoàng Đế thật, RealEmperor, là Service, và việc mời ngài ra điện rất tốn kém. MandarinProxy, viên quan lại, là Proxy: ông triển khai cùng giao diện Emperor và đứng chắn trước Hoàng Đế. Ông ghi sổ mọi lá đơn (logging proxy), từ chối người không có tên trong danh sách (protection proxy), chỉ mời Hoàng Đế ra khi có lá đơn hợp lệ đầu tiên (virtual proxy), và trả lời đơn trùng lặp bằng chiếu chỉ đã ban trước đó (caching proxy). Lớp của Hoàng Đế không hề thay đổi, và buổi thiết triều không phân biệt được mình đang nói chuyện với quan lại hay với chính Hoàng Đế.',
      },
      illustration: '👑 Triều Đình Proxy\n\n[CourtSession] ──grantAudience()──▶ [MandarinProxy]\n                                  │ ghi sổ\n                                  │ kiểm tra quyền\n                                  │ có chiếu cũ? → trả lời ngay\n                                  ▼\n                            [RealEmperor]\n                                  │\n                                  ▼\n                              chiếu chỉ',
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from typing import Dict, Optional, Set


# Service Interface: the proxy must follow it to pass as the real Emperor
class Emperor(ABC):
    @abstractmethod
    def grant_audience(self, name: str, petition: str) -> str: ...


# Service: the real Emperor, costly to summon to the throne hall
class RealEmperor(Emperor):
    def __init__(self) -> None:
        print("👑 Triệu Hoàng Đế ra điện Kính Thiên")

    def grant_audience(self, name: str, petition: str) -> str:
        return f"Hoàng Đế phán: chuẩn tấu việc '{petition}'"


# Proxy: same interface, holds a reference to the service and manages its lifecycle
class MandarinProxy(Emperor):
    def __init__(self, permitted: Set[str]) -> None:
        self._emperor: Optional[RealEmperor] = None
        self._permitted = permitted
        self._decrees: Dict[str, str] = {}

    def grant_audience(self, name: str, petition: str) -> str:
        # Logging proxy: record the request before anything else
        print(f"[Quan Lại] ghi sổ: {name} xin tâu '{petition}'")

        # Protection proxy: only listed officials get through
        if name not in self._permitted:
            return f"🚫 {name} không được yết kiến"

        # Caching proxy: the petition is the cache key
        if petition in self._decrees:
            return f"📜 Theo chiếu cũ: {self._decrees[petition]}"

        # Virtual proxy: create the service only when it is really needed
        if self._emperor is None:
            self._emperor = RealEmperor()

        result = self._emperor.grant_audience(name, petition)
        self._decrees[petition] = result
        return result


# Client: works only through the Emperor interface,
# so it accepts the proxy or the real service alike
class CourtSession:
    def __init__(self, emperor: Emperor) -> None:
        self._emperor = emperor

    def submit_petition(self, name: str, petition: str) -> None:
        print(self._emperor.grant_audience(name, petition))


court = CourtSession(MandarinProxy({"Tể Tướng", "Đại Tướng"}))
court.submit_petition("Dân Thường", "giảm thuế")
court.submit_petition("Tể Tướng", "mở khoa thi")
court.submit_petition("Đại Tướng", "mở khoa thi")

# Output:
# [Quan Lại] ghi sổ: Dân Thường xin tâu 'giảm thuế'
# 🚫 Dân Thường không được yết kiến
# [Quan Lại] ghi sổ: Tể Tướng xin tâu 'mở khoa thi'
# 👑 Triệu Hoàng Đế ra điện Kính Thiên
# Hoàng Đế phán: chuẩn tấu việc 'mở khoa thi'
# [Quan Lại] ghi sổ: Đại Tướng xin tâu 'mở khoa thi'
# 📜 Theo chiếu cũ: Hoàng Đế phán: chuẩn tấu việc 'mở khoa thi'`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Service Interface: the proxy must follow it to pass as the real Emperor
interface Emperor {
  grantAudience(name: string, petition: string): string
}

// Service: the real Emperor, costly to summon to the throne hall
class RealEmperor implements Emperor {
  constructor() {
    console.log('👑 Triệu Hoàng Đế ra điện Kính Thiên')
  }

  grantAudience(name: string, petition: string): string {
    return \`Hoàng Đế phán: chuẩn tấu việc '\${petition}'\`
  }
}

// Proxy: same interface, holds a reference to the service and manages its lifecycle
class MandarinProxy implements Emperor {
  private emperor: RealEmperor | null = null
  private decrees = new Map<string, string>()

  constructor(private readonly permitted: Set<string>) {}

  grantAudience(name: string, petition: string): string {
    // Logging proxy: record the request before anything else
    console.log(\`[Quan Lại] ghi sổ: \${name} xin tâu '\${petition}'\`)

    // Protection proxy: only listed officials get through
    if (!this.permitted.has(name)) return \`🚫 \${name} không được yết kiến\`

    // Caching proxy: the petition is the cache key
    const oldDecree = this.decrees.get(petition)
    if (oldDecree !== undefined) return \`📜 Theo chiếu cũ: \${oldDecree}\`

    // Virtual proxy: create the service only when it is really needed
    if (this.emperor === null) this.emperor = new RealEmperor()

    const result = this.emperor.grantAudience(name, petition)
    this.decrees.set(petition, result)
    return result
  }
}

// Client: works only through the Emperor interface,
// so it accepts the proxy or the real service alike
class CourtSession {
  constructor(private emperor: Emperor) {}

  submitPetition(name: string, petition: string): void {
    console.log(this.emperor.grantAudience(name, petition))
  }
}

const court = new CourtSession(new MandarinProxy(new Set(['Tể Tướng', 'Đại Tướng'])))
court.submitPetition('Dân Thường', 'giảm thuế')
court.submitPetition('Tể Tướng', 'mở khoa thi')
court.submitPetition('Đại Tướng', 'mở khoa thi')`,
      },
    ],
    structure_notes: {
      en: 'Service Interface declares the interface of the Service; the proxy must follow this interface to be able to disguise itself as a service object. Service is a class that provides some useful business logic. Proxy has a reference field that points to a service object; after the proxy finishes its own processing (lazy initialization, logging, access control, caching, etc.), it passes the request to the service object. Proxies usually manage the full lifecycle of their service objects. Client works with both services and proxies through the same interface, so you can pass a proxy into any code that expects a service object. For space, the diagram leaves out the proxy\'s list of permitted officials.',
      vi: 'Service Interface khai báo giao diện của Service; proxy phải tuân theo giao diện này để có thể đóng giả làm đối tượng dịch vụ. Service là lớp cung cấp một logic nghiệp vụ hữu ích nào đó. Proxy có một trường tham chiếu trỏ tới đối tượng dịch vụ; sau khi xử lý xong phần việc của mình (khởi tạo trễ, ghi log, kiểm soát truy cập, cache, v.v.), proxy chuyển yêu cầu cho đối tượng dịch vụ. Thông thường proxy quản lý toàn bộ vòng đời của đối tượng dịch vụ. Client làm việc với cả dịch vụ lẫn proxy qua cùng một giao diện, nhờ đó bạn có thể truyền proxy vào bất kỳ đoạn mã nào đang chờ một đối tượng dịch vụ. Để gọn, sơ đồ lược bỏ danh sách quan được phép yết kiến của proxy.',
    },
  },
]
