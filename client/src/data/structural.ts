import type { Pattern } from '../types/pattern'

export const structuralPatterns: Omit<Pattern, 'diagram'>[] = [
  {
    id: 'adapter',
    slug: 'adapter',
    name: { en: 'Adapter', vi: 'Bộ chuyển đổi' },
    category: 'structural',
    complexity: 1,
    popularity: 3,
    also_known_as: [{ en: 'Wrapper', vi: 'Lớp bao bọc' }],
    intent: {
      en: 'Adapter is a structural design pattern that lets objects with incompatible interfaces work together.',
      vi: 'Adapter là một mẫu thiết kế cấu trúc, giúp các đối tượng có giao diện không tương thích làm việc được với nhau.',
    },
    problem: {
      en: 'Imagine a stock market monitoring app. It downloads stock data from several sources in XML and shows it to the user as charts. You want to add a third-party analytics library, but the library accepts only JSON, so you can\'t pass it your XML data as is. You could change the library to read XML, but that might break existing code that depends on it, and you may not have its source code at all.',
      vi: 'Hãy hình dung một ứng dụng theo dõi thị trường chứng khoán. Ứng dụng tải dữ liệu cổ phiếu từ nhiều nguồn ở định dạng XML rồi hiển thị thành biểu đồ. Bạn muốn tích hợp thêm một thư viện phân tích của bên thứ ba, nhưng thư viện này chỉ nhận dữ liệu JSON, nên bạn không thể đưa nguyên dữ liệu XML vào. Bạn có thể sửa thư viện để nó đọc được XML, nhưng việc đó có thể làm hỏng mã khác đang dùng thư viện, và có khi bạn không có mã nguồn của nó.',
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Create an adapter: an object that converts the interface of one object so that another object can use it. The adapter wraps one of the objects and hides the conversion; the wrapped object doesn\'t know the adapter exists. For example, an adapter can wrap an object that works in meters and kilometers and convert all of its data to feet and miles.' },
        { type: 'paragraph', text: 'An adapter can also let objects with different interfaces call each other. The adapter exposes an interface that one existing object already understands, and that object calls the adapter\'s methods through it. On each call, the adapter forwards the request to the second object in the format and order that object expects. You can even build a two-way adapter that converts calls in both directions.' },
        { type: 'paragraph', text: 'In the stock app, you create an XML-to-JSON adapter for each class of the analytics library that your code uses directly. Your code then talks to the library only through these adapters. Each adapter converts the incoming XML into JSON and passes the call to the matching methods of the wrapped analytics object.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Tạo một adapter: một đối tượng chuyển đổi giao diện của một đối tượng để đối tượng khác dùng được. Adapter bọc một trong hai đối tượng và che đi việc chuyển đổi; đối tượng được bọc không biết adapter tồn tại. Ví dụ, một adapter có thể bọc một đối tượng làm việc theo mét và kilômét rồi đổi toàn bộ dữ liệu của nó sang feet và dặm.' },
        { type: 'paragraph', text: 'Adapter còn giúp các đối tượng có giao diện khác nhau gọi được nhau. Adapter đưa ra một giao diện mà một đối tượng hiện có đã hiểu, và đối tượng đó gọi phương thức của adapter qua giao diện này. Mỗi lần nhận lời gọi, adapter chuyển yêu cầu sang đối tượng thứ hai theo đúng định dạng và thứ tự mà đối tượng đó cần. Bạn thậm chí có thể tạo adapter hai chiều, chuyển đổi lời gọi theo cả hai hướng.' },
        { type: 'paragraph', text: 'Trong ứng dụng chứng khoán, bạn tạo một adapter XML sang JSON cho mỗi lớp của thư viện phân tích mà mã của bạn dùng trực tiếp. Từ đó mã của bạn chỉ làm việc với thư viện qua các adapter này. Mỗi adapter đổi dữ liệu XML nhận vào thành JSON rồi chuyển lời gọi tới phương thức tương ứng của đối tượng phân tích mà nó bọc.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use the Adapter pattern when:' },
        { type: 'list', items: [
          'you want to use an existing class whose interface doesn\'t match the rest of your code. The adapter sits between your code and a legacy class, a third-party class or any other class with an unusual interface, and translates between them.',
          'you want to reuse several existing subclasses that all lack the same functionality, and you can\'t add it to their superclass. Instead of extending each subclass and duplicating the code, put the missing functionality in an adapter and wrap the objects in it. This works only if the wrapped classes share a common interface and the adapter\'s field uses that interface, which makes the approach close to the Decorator pattern.',
        ] },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Adapter khi:' },
        { type: 'list', items: [
          'bạn muốn dùng một lớp có sẵn nhưng giao diện của nó không khớp với phần còn lại của mã. Adapter đứng giữa mã của bạn và một lớp cũ, một lớp của bên thứ ba hoặc bất kỳ lớp nào có giao diện khác thường, và phiên dịch giữa hai bên.',
          'bạn muốn tái sử dụng nhiều lớp con có sẵn cùng thiếu một chức năng, và không thể thêm chức năng đó vào lớp cha. Thay vì kế thừa từng lớp con và lặp lại cùng một đoạn mã, hãy đặt chức năng còn thiếu vào một adapter rồi bọc các đối tượng bằng adapter đó. Cách này chỉ hoạt động khi các lớp được bọc có chung một giao diện và trường của adapter dùng giao diện đó, nên nó rất gần với mẫu Decorator.',
        ] },
      ],
    },
    vietnamese_example: {
      title: { en: 'Recording a đàn tranh through a MIDI adapter', vi: 'Thu âm đàn tranh qua bộ chuyển đổi MIDI' },
      description: {
        en: [
          { type: 'paragraph', text: 'A musician plays the đàn tranh, a Vietnamese zither, by plucking a numbered string softly, medium or hard. The recording software accepts only MIDI messages: a note number and a velocity from 0 to 127.' },
          { type: 'paragraph', text: 'RecordingSoftware is the Client: record() keeps calling readNote() and writes down every note it receives. MidiDevice, with readNote(), is the Client Interface the software expects. Zither is the Service. It is useful, but it only knows strings and plucking strength: pluckString(stringNumber, strength) is the musician\'s action, and nextPluck() hands over each pluck in its own format.' },
          { type: 'paragraph', text: 'ZitherMidiAdapter is the Adapter, like a pickup clipped onto the instrument. It implements MidiDevice and wraps a Zither. Each time the software asks for a note, the adapter takes the next pluck from the zither and translates it: the string number becomes a MIDI note through a lookup table, and soft, medium or hard becomes a velocity of 40, 80 or 110.' },
          { type: 'paragraph', text: 'The lookup table is an illustrative mapping made for this example. It labels strings 1 to 5 with the note names hò, xự, xang, xê and cống and maps them to C, D, F, G and A; it does not describe how a đàn tranh is tuned. The software records the zither the same way it records a MidiKeyboard, and neither the instrument class nor the software had to change.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Nghệ sĩ chơi đàn tranh bằng cách gảy một dây đã đánh số, nhẹ, vừa hoặc mạnh. Phần mềm thu âm chỉ nhận tín hiệu MIDI: số hiệu nốt và velocity (độ mạnh) từ 0 đến 127.' },
          { type: 'paragraph', text: 'RecordingSoftware là Client: record() liên tục gọi readNote() và ghi lại mọi nốt nhận được. MidiDevice, với readNote(), là Client Interface mà phần mềm cần. Zither là Service: lớp này hữu ích nhưng chỉ biết dây đàn và lực gảy. pluckString(stringNumber, strength) là động tác của nghệ sĩ, còn nextPluck() trao từng cú gảy theo định dạng riêng của lớp.' },
          { type: 'paragraph', text: 'ZitherMidiAdapter là Adapter, giống một bộ thu tín hiệu kẹp vào thân đàn. Lớp này triển khai MidiDevice và bọc một Zither. Mỗi lần phần mềm xin một nốt, adapter lấy cú gảy kế tiếp từ đàn rồi chuyển đổi: số dây được tra bảng để ra nốt MIDI, còn lực nhẹ, vừa, mạnh thành velocity 40, 80 hoặc 110.' },
          { type: 'paragraph', text: 'Bảng tra này chỉ là cách ánh xạ minh họa cho ví dụ. Bảng gắn dây 1 đến 5 với tên nốt hò, xự, xang, xê, cống và ứng chúng với C, D, F, G, A; bảng không mô tả cách lên dây đàn tranh. Phần mềm thu đàn tranh giống hệt cách thu một MidiKeyboard, và cả lớp đàn lẫn phần mềm đều không phải sửa.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from typing import NamedTuple, Optional


# Service: a useful existing class with an incompatible interface.
# It knows strings and plucking strength, not MIDI notes and velocity.
class Zither:
    STRING_NAMES = {1: "Hò", 2: "Xự", 3: "Xang", 4: "Xê", 5: "Cống"}

    def __init__(self) -> None:
        self._plucks: list[tuple[int, str]] = []

    # The musician's action
    def pluck_string(self, string_number: int, strength: str) -> None:
        print(f"🪕 Gảy dây {string_number} ({self.STRING_NAMES[string_number]}), lực {strength}")
        self._plucks.append((string_number, strength))

    # Hands over the next pluck, or None when the musician has stopped
    def next_pluck(self) -> Optional[tuple[int, str]]:
        return self._plucks.pop(0) if self._plucks else None


# What the recording software understands: a MIDI note and its velocity
class MidiNote(NamedTuple):
    note: int
    velocity: int


# Client Interface: the protocol the recording software expects
class MidiDevice(ABC):
    @abstractmethod
    def read_note(self) -> Optional[MidiNote]: ...


# A device that already follows the client interface
class MidiKeyboard(MidiDevice):
    def __init__(self, keys: list[tuple[int, int]]) -> None:
        self._pressed = [MidiNote(note, velocity) for note, velocity in keys]

    def read_note(self) -> Optional[MidiNote]:
        return self._pressed.pop(0) if self._pressed else None


# Adapter: implements the client interface and wraps the service
class ZitherMidiAdapter(MidiDevice):
    # Illustrative mapping for this example, not a tuning: string -> MIDI note (hò xự xang xê cống = C D F G A)
    STRING_TO_NOTE = {1: 60, 2: 62, 3: 65, 4: 67, 5: 69}
    STRENGTH_TO_VELOCITY = {"nhẹ": 40, "vừa": 80, "mạnh": 110}

    def __init__(self, zither: Zither) -> None:
        self._zither = zither

    def read_note(self) -> Optional[MidiNote]:
        # Translate what the service produces into what the client expects
        pluck = self._zither.next_pluck()
        if pluck is None:
            return None
        string_number, strength = pluck
        return MidiNote(self.STRING_TO_NOTE[string_number], self.STRENGTH_TO_VELOCITY[strength])


# Client: existing business logic that only knows MidiDevice
class RecordingSoftware:
    def record(self, device: MidiDevice) -> None:
        track = []
        while (midi := device.read_note()) is not None:
            track.append(f"nốt {midi.note} (velocity {midi.velocity})")
        print(f"🎙️ Đã thu: {', '.join(track)}")


daw = RecordingSoftware()
daw.record(MidiKeyboard([(60, 90), (62, 90)]))

# daw.record(Zither()) would fail: Zither has no read_note()
zither = Zither()
zither.pluck_string(1, "mạnh")
zither.pluck_string(3, "vừa")
zither.pluck_string(5, "nhẹ")
daw.record(ZitherMidiAdapter(zither))

# Output:
# 🎙️ Đã thu: nốt 60 (velocity 90), nốt 62 (velocity 90)
# 🪕 Gảy dây 1 (Hò), lực mạnh
# 🪕 Gảy dây 3 (Xang), lực vừa
# 🪕 Gảy dây 5 (Cống), lực nhẹ
# 🎙️ Đã thu: nốt 60 (velocity 110), nốt 65 (velocity 80), nốt 69 (velocity 40)`,
      },
      {
        language: 'typescript',
        label: 'TypeScript',
        code: `// Service: a useful existing class with an incompatible interface.
// It knows strings and plucking strength, not MIDI notes and velocity.
class Zither {
  private stringNames: Record<number, string> = { 1: 'Hò', 2: 'Xự', 3: 'Xang', 4: 'Xê', 5: 'Cống' }
  private plucks: [number, string][] = []

  // The musician's action
  pluckString(stringNumber: number, strength: string): void {
    console.log(\`🪕 Gảy dây \${stringNumber} (\${this.stringNames[stringNumber]}), lực \${strength}\`)
    this.plucks.push([stringNumber, strength])
  }

  // Hands over the next pluck, or null when the musician has stopped
  nextPluck(): [number, string] | null {
    return this.plucks.shift() ?? null
  }
}

// What the recording software understands: a MIDI note and its velocity
type MidiNote = { note: number; velocity: number }

// Client Interface: the protocol the recording software expects
interface MidiDevice {
  readNote(): MidiNote | null
}

// A device that already follows the client interface
class MidiKeyboard implements MidiDevice {
  private pressed: MidiNote[]

  constructor(keys: [number, number][]) {
    this.pressed = keys.map(([note, velocity]) => ({ note, velocity }))
  }

  readNote(): MidiNote | null {
    return this.pressed.shift() ?? null
  }
}

// Adapter: implements the client interface and wraps the service
class ZitherMidiAdapter implements MidiDevice {
  // Illustrative mapping for this example, not a tuning: string -> MIDI note (hò xự xang xê cống = C D F G A)
  private stringToNote: Record<number, number> = { 1: 60, 2: 62, 3: 65, 4: 67, 5: 69 }
  private strengthToVelocity: Record<string, number> = { 'nhẹ': 40, 'vừa': 80, 'mạnh': 110 }

  constructor(private zither: Zither) {}

  readNote(): MidiNote | null {
    // Translate what the service produces into what the client expects
    const pluck = this.zither.nextPluck()
    if (!pluck) return null
    const [stringNumber, strength] = pluck
    return { note: this.stringToNote[stringNumber], velocity: this.strengthToVelocity[strength] }
  }
}

// Client: existing business logic that only knows MidiDevice
class RecordingSoftware {
  record(device: MidiDevice): void {
    const track: string[] = []
    for (let midi = device.readNote(); midi; midi = device.readNote()) {
      track.push(\`nốt \${midi.note} (velocity \${midi.velocity})\`)
    }
    console.log(\`🎙️ Đã thu: \${track.join(', ')}\`)
  }
}

const daw = new RecordingSoftware()
daw.record(new MidiKeyboard([[60, 90], [62, 90]]))

// daw.record(new Zither()) won't compile: Zither has no readNote()
const zither = new Zither()
zither.pluckString(1, 'mạnh')
zither.pluckString(3, 'vừa')
zither.pluckString(5, 'nhẹ')
daw.record(new ZitherMidiAdapter(zither))`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'The diagram and code show the object adapter, which uses composition: the adapter implements the interface of one object and wraps the other. This variant works in every popular programming language.' },
        { type: 'paragraph', text: 'The Client (RecordingSoftware) holds the existing business logic. The Client Interface (MidiDevice) describes the protocol other classes must follow to work with the client. The Service (Zither) is a useful class, often third-party or legacy, that the client can\'t use directly because its interface is incompatible. The Adapter (ZitherMidiAdapter) implements the client interface and wraps the service object. It receives calls through the client interface, turns them into calls the service understands and converts the results back: here, each pluck from nextPluck() becomes the MIDI note that readNote() returns. MidiKeyboard is an extra class that already follows the client interface; it shows that the client treats it and the adapter the same way.' },
        { type: 'paragraph', text: 'Because the client knows the adapter only through the client interface, you can add new adapters, for example when the service\'s interface changes or the service is replaced, without changing the client. The other variant, the class adapter, inherits interfaces from the client and the service at the same time, so it wraps nothing and does the conversion in overridden methods. It needs multiple inheritance, as in C++, so it isn\'t shown here.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Sơ đồ và mã minh họa object adapter (adapter đối tượng), dựa trên kết hợp đối tượng: adapter triển khai giao diện của một đối tượng và bọc đối tượng kia. Biến thể này dùng được trong mọi ngôn ngữ lập trình phổ biến.' },
        { type: 'paragraph', text: 'Client (RecordingSoftware) chứa logic nghiệp vụ hiện có. Client Interface (MidiDevice) mô tả giao thức mà các lớp khác phải tuân theo để làm việc với client. Service (Zither) là một lớp hữu ích, thường của bên thứ ba hoặc mã cũ, mà client không dùng trực tiếp được vì giao diện không tương thích. Adapter (ZitherMidiAdapter) triển khai client interface và bọc đối tượng service. Nó nhận lời gọi qua client interface, đổi thành lời gọi mà service hiểu, rồi chuyển kết quả trở lại: ở đây, mỗi cú gảy lấy từ nextPluck() trở thành nốt MIDI do readNote() trả về. MidiKeyboard là lớp bổ sung vốn đã theo client interface; nó cho thấy client đối xử với nó và với adapter như nhau.' },
        { type: 'paragraph', text: 'Vì client chỉ biết adapter qua client interface, bạn có thể thêm adapter mới, chẳng hạn khi giao diện của service thay đổi hoặc service bị thay thế, mà không phải sửa client. Biến thể còn lại, class adapter (adapter lớp), kế thừa giao diện của cả client lẫn service cùng lúc, nên không bọc đối tượng nào mà chuyển đổi ngay trong các phương thức ghi đè. Biến thể này cần đa kế thừa, như trong C++, nên không được minh họa ở đây.' },
      ],
    },
  },

  {
    id: 'bridge',
    slug: 'bridge',
    name: { en: 'Bridge', vi: 'Cầu nối' },
    category: 'structural',
    complexity: 3,
    popularity: 1,
    intent: {
      en: 'Bridge is a structural design pattern that splits a large class, or a set of closely related classes, into two separate hierarchies, abstraction and implementation, which can be developed independently of each other.',
      vi: 'Bridge là một mẫu thiết kế cấu trúc, tách một lớp lớn hoặc một nhóm lớp liên quan chặt chẽ thành hai hệ phân cấp riêng, abstraction (phần trừu tượng) và implementation (phần triển khai), để có thể phát triển độc lập với nhau.',
    },
    problem: {
      en: 'Say you have a Shape class with two subclasses, Circle and Square. You want to add colors, so you plan to create Red and Blue shape subclasses. Because there are already two shapes, you need four combinations, such as BlueCircle and RedSquare. Every new shape or color multiplies the classes: adding a triangle needs two subclasses, one per color, and adding a third color then needs three, one per shape. The hierarchy keeps growing with every combination.',
      vi: 'Giả sử bạn có lớp Shape với hai lớp con là Circle và Square. Bạn muốn thêm màu sắc, nên định tạo các lớp con Red và Blue. Vì đã có hai hình, bạn sẽ cần bốn tổ hợp, chẳng hạn BlueCircle và RedSquare. Mỗi hình hoặc màu mới lại nhân số lớp lên: thêm hình tam giác cần hai lớp con, mỗi màu một lớp, rồi thêm màu thứ ba lại cần ba lớp con, mỗi hình một lớp. Hệ phân cấp cứ phình ra theo từng tổ hợp.',
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'The problem comes from extending the shape classes in two independent dimensions, form and color, which is a common issue with class inheritance. Bridge replaces inheritance with object composition: you extract one dimension into its own class hierarchy, and the original classes reference an object of that hierarchy instead of holding all the state and behavior themselves.' },
        { type: 'paragraph', text: 'Here, the color code moves into a Color class with Red and Blue subclasses. Shape gets a field that references a color object and delegates all color work to it. That reference is the bridge between Shape and Color: from then on, adding a color doesn\'t require changing the shape hierarchy, and adding a shape doesn\'t require changing the colors.' },
        { type: 'paragraph', text: 'In Bridge terminology, the high-level control layer is the Abstraction (sometimes called the interface), and the layer that does the real work is the Implementation (sometimes called the platform). These terms don\'t mean the interfaces or abstract classes of your programming language. For example, an app\'s GUI can be the abstraction and the operating system API the implementation: the GUI object controls what the user sees and delegates the actual work to the linked API object. Implementations are interchangeable as long as they share a common interface, so you can change GUI classes without touching API classes, and supporting another operating system needs only a new subclass in the implementation hierarchy.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Vấn đề nảy sinh vì các lớp hình được mở rộng theo hai chiều độc lập, hình dạng và màu sắc, một tình huống thường gặp khi dùng kế thừa. Bridge thay kế thừa bằng kết hợp đối tượng: bạn tách một chiều ra thành hệ phân cấp lớp riêng, và các lớp ban đầu tham chiếu tới một đối tượng của hệ đó thay vì tự giữ toàn bộ trạng thái và hành vi.' },
        { type: 'paragraph', text: 'Ở ví dụ này, phần mã về màu được chuyển sang lớp Color với hai lớp con Red và Blue. Shape có một trường tham chiếu tới đối tượng màu và giao mọi việc liên quan đến màu cho đối tượng đó. Tham chiếu ấy là cầu nối giữa Shape và Color: từ đó, thêm màu mới không phải sửa hệ phân cấp hình, và thêm hình mới cũng không phải sửa các lớp màu.' },
        { type: 'paragraph', text: 'Theo thuật ngữ của Bridge, tầng điều khiển cấp cao là Abstraction (đôi khi gọi là interface), còn tầng làm việc thực sự là Implementation (đôi khi gọi là platform). Các thuật ngữ này không có nghĩa là interface hay lớp trừu tượng trong ngôn ngữ lập trình. Ví dụ, giao diện đồ họa (GUI) của ứng dụng có thể là abstraction, còn API của hệ điều hành là implementation: đối tượng GUI điều khiển những gì người dùng thấy và giao phần việc thực sự cho đối tượng API được liên kết. Các implementation thay thế được cho nhau miễn là có chung một giao diện, nên bạn có thể sửa lớp GUI mà không đụng tới lớp API, và hỗ trợ thêm một hệ điều hành chỉ cần thêm một lớp con trong hệ phân cấp implementation.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use the Bridge pattern when:' },
        { type: 'list', items: [
          'you want to split up a monolithic class that has several variants of some functionality, for example a class that works with several database servers. The bigger a class gets, the harder it is to understand and change, and a change to one variant can spread through the whole class. Splitting it into hierarchies lets you change each hierarchy on its own, which makes maintenance easier and lowers the risk of breaking existing code.',
          'you need to extend a class in several orthogonal (independent) dimensions. Extract a separate hierarchy for each dimension, and let the original class delegate the related work to objects of those hierarchies instead of doing everything itself.',
          'you need to switch implementations at runtime. This is optional, but the pattern lets you replace the implementation object inside the abstraction by assigning a new value to a field.',
        ] },
        { type: 'paragraph', text: 'The last point is the main reason Bridge is often confused with Strategy. A pattern is more than a way to arrange classes; it also tells the reader which problem the code addresses.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Bridge khi:' },
        { type: 'list', items: [
          'bạn muốn chia nhỏ một lớp nguyên khối có nhiều biến thể của cùng một chức năng, ví dụ một lớp làm việc với nhiều loại máy chủ cơ sở dữ liệu. Lớp càng lớn càng khó hiểu và khó sửa, và sửa một biến thể có thể kéo theo thay đổi khắp lớp. Tách lớp thành các hệ phân cấp giúp bạn sửa từng hệ một cách độc lập, nên dễ bảo trì hơn và ít rủi ro làm hỏng mã hiện có.',
          'bạn cần mở rộng một lớp theo nhiều chiều trực giao (độc lập). Hãy tách mỗi chiều thành một hệ phân cấp riêng, và để lớp ban đầu giao phần việc liên quan cho các đối tượng thuộc những hệ đó thay vì tự làm tất cả.',
          'bạn cần đổi implementation khi chương trình đang chạy. Việc này không bắt buộc, nhưng mẫu cho phép thay đối tượng implementation bên trong abstraction chỉ bằng cách gán giá trị mới cho một trường.',
        ] },
        { type: 'paragraph', text: 'Điểm cuối là lý do chính khiến Bridge hay bị nhầm với Strategy. Một mẫu thiết kế không chỉ là cách sắp xếp lớp; nó còn cho người đọc biết đoạn mã đang giải quyết vấn đề gì.' },
      ],
    },
    vietnamese_example: {
      title: { en: 'Áo dài styles and fabrics', vi: 'Kiểu dáng và chất liệu áo dài' },
      description: {
        en: [
          { type: 'paragraph', text: 'In this example an áo dài varies in two independent dimensions: style and fabric. With inheritance alone, every style needs one subclass per fabric (TraditionalSilk, TraditionalBrocade, ModernSilk and ModernBrocade). Two styles and two fabrics already need four classes, and every new option multiplies the count.' },
          { type: 'paragraph', text: 'With Bridge, the style hierarchy is the Abstraction. Style decides which parts to cut and in what order (sew()), and the Refined Abstractions Traditional and Modern vary that logic. Their features belong to the two teaching variants in this code, not to a definition of either style: Traditional cuts a high collar and ankle-length flaps, and Modern cuts a boat neck and knee-length flaps and adds lotus embroidery.' },
          { type: 'paragraph', text: 'The fabric hierarchy is the Implementation. Fabric declares the primitive steps name(), cut() and embroider(), and the Concrete Implementations Silk and Brocade carry them out in their own way. Style keeps a Fabric in its fabric field, and that field is the bridge. Any style can be sewn in any fabric, so 2 + 2 classes cover all four combinations. Adding cotton then takes one new Fabric class, where inheritance would need one new subclass per style (TraditionalCotton and ModernCotton), and the styles stay unchanged.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Trong ví dụ này, áo dài thay đổi theo hai chiều độc lập: kiểu dáng và chất liệu. Nếu chỉ dùng kế thừa, mỗi kiểu dáng cần một lớp con cho mỗi chất liệu (TraditionalSilk, TraditionalBrocade, ModernSilk và ModernBrocade). Hai kiểu dáng và hai chất liệu đã cần bốn lớp, và mỗi lựa chọn mới lại nhân số lớp lên.' },
          { type: 'paragraph', text: 'Với Bridge, hệ phân cấp kiểu dáng là Abstraction. Style quyết định cắt những phần nào và theo thứ tự nào (sew()), còn các Refined Abstraction là Traditional và Modern thay đổi logic đó. Đặc điểm của chúng chỉ thuộc về hai biến thể minh họa trong mã, không phải định nghĩa của từng kiểu áo: Traditional cắt cổ cao và tà dài chấm gót, còn Modern cắt cổ thuyền, tà ngắn qua gối và thêu thêm hoa sen.' },
          { type: 'paragraph', text: 'Hệ phân cấp chất liệu là Implementation. Fabric khai báo các bước cơ bản name(), cut() và embroider(), và các Concrete Implementation là Silk (lụa) và Brocade (gấm) thực hiện chúng theo cách riêng. Style giữ một Fabric trong trường fabric, và trường đó chính là cầu nối. Kiểu dáng nào cũng may được bằng chất liệu nào, nên 2 + 2 lớp đủ cho cả bốn tổ hợp. Muốn thêm vải cotton chỉ cần một lớp Fabric mới, trong khi kế thừa phải thêm một lớp con cho mỗi kiểu dáng (TraditionalCotton và ModernCotton), và các kiểu dáng không phải sửa.' },
        ],
      },
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
      en: [
        { type: 'paragraph', text: 'The Abstraction (Style) provides high-level control logic and relies on the implementation object in its fabric field to do the low-level work. The Implementation (Fabric) declares the interface common to all concrete implementations; the abstraction can talk to an implementation object only through the methods declared here. The abstraction may list the same methods as the implementation, but it usually declares more complex behaviors built from several primitive operations, as sew() is built from name(), cut() and embroider().' },
        { type: 'paragraph', text: 'Concrete Implementations (Silk, Brocade) contain the platform-specific code, here the fabric-specific work. Refined Abstractions (Traditional, Modern) provide variants of the control logic and, like their parent, work with any implementation through the implementation interface. The Client usually cares only about the abstraction, but it is responsible for linking the abstraction with an implementation object, here through the constructor.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Abstraction (Style) chứa logic điều khiển cấp cao và dựa vào đối tượng implementation trong trường fabric để làm phần việc cấp thấp. Implementation (Fabric) khai báo giao diện chung cho mọi concrete implementation; abstraction chỉ giao tiếp được với đối tượng implementation qua các phương thức khai báo ở đây. Abstraction có thể liệt kê đúng các phương thức của implementation, nhưng thường khai báo những hành vi phức tạp hơn, ghép từ nhiều thao tác cơ bản, như sew() được ghép từ name(), cut() và embroider().' },
        { type: 'paragraph', text: 'Concrete Implementation (Silk, Brocade) chứa mã riêng cho từng nền tảng, ở đây là cách xử lý riêng của từng loại vải. Refined Abstraction (Traditional, Modern) cung cấp các biến thể của logic điều khiển và, giống lớp cha, làm việc với mọi implementation qua giao diện implementation. Client thường chỉ quan tâm tới abstraction, nhưng có nhiệm vụ liên kết abstraction với một đối tượng implementation, ở đây là qua hàm khởi tạo.' },
      ],
    },
  },

  {
    id: 'composite',
    slug: 'composite',
    name: { en: 'Composite', vi: 'Tổ hợp' },
    category: 'structural',
    complexity: 2,
    popularity: 2,
    also_known_as: [{ en: 'Object Tree', vi: 'Cây đối tượng' }],
    intent: {
      en: 'Composite is a structural design pattern that lets you compose objects into tree structures and then work with those structures as if they were individual objects.',
      vi: 'Composite là một mẫu thiết kế cấu trúc, cho phép ghép các đối tượng thành cấu trúc cây rồi làm việc với cấu trúc đó như với từng đối tượng riêng lẻ.',
    },
    problem: {
      en: [
        { type: 'paragraph', text: 'Composite makes sense only when the core model of your app can be represented as a tree. Imagine two kinds of objects: Products and Boxes. A Box can contain several Products as well as smaller Boxes, which can in turn hold Products or even smaller Boxes, and so on.' },
        { type: 'paragraph', text: 'You are building an ordering system on these classes. An order can contain loose products as well as boxes filled with products and other boxes. How do you find the total price of such an order? You could unwrap every box, go through all the products and add up the prices. That works with real boxes, but in a program it takes more than a simple loop: you have to know in advance the classes of the Products and Boxes you visit, how deeply the boxes are nested and other details. That makes the direct approach awkward or even impossible.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Composite chỉ hợp lý khi mô hình cốt lõi của ứng dụng biểu diễn được dưới dạng cây. Hãy hình dung hai loại đối tượng: Product (sản phẩm) và Box (hộp). Một Box có thể chứa vài Product và cả những Box nhỏ hơn, các Box nhỏ đó lại chứa Product hoặc Box nhỏ hơn nữa, cứ thế tiếp tục.' },
        { type: 'paragraph', text: 'Bạn đang xây dựng hệ thống đặt hàng dựa trên các lớp này. Một đơn hàng có thể gồm sản phẩm để rời và cả những hộp chứa sản phẩm lẫn hộp khác. Làm sao tính tổng giá của đơn hàng như vậy? Bạn có thể mở hết các hộp, duyệt mọi sản phẩm rồi cộng giá lại. Với hộp thật thì làm được, nhưng trong chương trình thì không chỉ là một vòng lặp đơn giản: bạn phải biết trước lớp của từng Product và Box sẽ duyệt, độ sâu lồng nhau của các hộp và nhiều chi tiết khác. Vì vậy cách làm trực tiếp trở nên vụng về, thậm chí không làm được.' },
      ],
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Work with Products and Boxes through a common interface that declares a method for calculating the total price. For a product, the method returns the product\'s price. For a box, it goes through each item in the box, asks for its price and returns the box\'s total. If an item is a smaller box, that box goes through its own contents in the same way, until every inner component has been priced. A box can also add its own cost to the result, such as packaging.' },
        { type: 'paragraph', text: 'The main benefit is that you don\'t need to know the concrete classes of the objects in the tree. You don\'t have to check whether an object is a simple product or a box, because you treat both the same way through the common interface. When you call the method, the objects pass the request down the tree themselves.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Làm việc với Product và Box qua một giao diện chung có khai báo phương thức tính tổng giá. Với một sản phẩm, phương thức trả về giá của sản phẩm đó. Với một hộp, phương thức duyệt từng món trong hộp, hỏi giá của món đó rồi trả về tổng giá của hộp. Nếu một món là hộp nhỏ hơn, hộp ấy cũng duyệt các món bên trong theo cùng cách, cho tới khi mọi thành phần bên trong đều đã được tính giá. Hộp còn có thể cộng thêm chi phí riêng, chẳng hạn phí đóng gói.' },
        { type: 'paragraph', text: 'Lợi ích chính là bạn không cần biết lớp cụ thể của các đối tượng trong cây. Bạn không phải kiểm tra một đối tượng là sản phẩm đơn giản hay là hộp, vì cả hai được xử lý như nhau qua giao diện chung. Khi bạn gọi phương thức, chính các đối tượng chuyển yêu cầu xuống dưới theo cây.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use the Composite pattern when:' },
        { type: 'list', items: [
          'you need to implement a tree-like object structure. The pattern gives you two basic element types that share an interface: simple leaves and complex containers. Because a container can hold both leaves and other containers, you can build a nested, recursive structure shaped like a tree.',
          'you want client code to treat simple and complex elements the same way. All elements in the pattern share a common interface, so the client doesn\'t need to know the concrete class of the object it works with.',
        ] },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Composite khi:' },
        { type: 'list', items: [
          'bạn cần triển khai một cấu trúc đối tượng dạng cây. Mẫu này cho bạn hai loại phần tử cơ bản có chung một giao diện: lá đơn giản và container phức tạp. Vì container có thể chứa cả lá lẫn container khác, bạn dựng được một cấu trúc đệ quy lồng nhau có hình cây.',
          'bạn muốn mã client xử lý phần tử đơn giản và phần tử phức tạp theo cùng một cách. Mọi phần tử trong mẫu có chung một giao diện, nên client không cần biết lớp cụ thể của đối tượng mà nó làm việc cùng.',
        ] },
      ],
    },
    vietnamese_example: {
      title: { en: 'A simplified Tây Sơn chain of command', vi: 'Hệ thống chỉ huy quân Tây Sơn giản lược' },
      description: {
        en: [
          { type: 'paragraph', text: 'This example uses a simplified, fictional chain of command loosely set in the Tây Sơn army. The unit names corps, battalion and squad are modern teaching labels, not a record of how the Tây Sơn forces were organized. In the example, a corps is made of battalions, a battalion of squads and a squad of soldiers, and orders start at the top and pass down level by level.' },
          { type: 'paragraph', text: 'MilitaryUnit is the Component interface, with attack() and getStrength(). Soldier is the Leaf: it has no sub-units and does the real work, charging forward and reporting its own strength. MilitaryUnitComposite is the Container: a corps, battalion or squad that holds Soldier objects or smaller MilitaryUnitComposite objects and knows them only as MilitaryUnit. When it receives attack(), it passes the order to every member; for getStrength(), it adds up its members\' results.' },
          { type: 'paragraph', text: 'General is the Client. The same giveOrder() call works on a single soldier or on the whole corps, and the general doesn\'t need to know which one it received.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Ví dụ này dùng một hệ thống chỉ huy giản lược và hư cấu, lấy bối cảnh phỏng theo quân Tây Sơn. Các tên đơn vị quân đoàn, tiểu đoàn và tiểu đội là nhãn hiện đại dùng để minh họa, không phải ghi chép về cách tổ chức thực tế của quân Tây Sơn. Trong ví dụ, quân đoàn gồm các tiểu đoàn, tiểu đoàn gồm các tiểu đội, tiểu đội gồm các chiến sĩ, và mệnh lệnh bắt đầu từ cấp cao nhất rồi truyền xuống từng cấp.' },
          { type: 'paragraph', text: 'MilitaryUnit là giao diện Component, với attack() (tiến công) và getStrength() (sức mạnh). Soldier là Leaf: không có đơn vị con và làm phần việc thực sự, xông lên và báo sức mạnh của chính mình. MilitaryUnitComposite là Container: một quân đoàn, tiểu đoàn hay tiểu đội chứa các Soldier hoặc MilitaryUnitComposite nhỏ hơn, và chỉ biết chúng qua giao diện MilitaryUnit. Khi nhận attack(), nó chuyển lệnh cho mọi thành viên; với getStrength(), nó cộng kết quả của các thành viên.' },
          { type: 'paragraph', text: 'General (vị tướng) là Client. Cùng một lời gọi giveOrder() dùng được cho một chiến sĩ hay cả quân đoàn, và vị tướng không cần biết mình đang ra lệnh cho đối tượng nào.' },
        ],
      },
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


# A simplified, fictional chain of command for teaching
squad = MilitaryUnitComposite("Tiểu đội 1")
squad.add(Soldier("Nguyễn Văn An", 100))
squad.add(Soldier("Trần Văn Bình", 90))

infantry = MilitaryUnitComposite("Tiểu đoàn bộ binh")
infantry.add(squad)

cavalry = MilitaryUnitComposite("Tiểu đoàn kỵ binh")
cavalry.add(Soldier("Lê Văn Cường", 150))

corps = MilitaryUnitComposite("Quân đoàn Tây Sơn")
corps.add(infantry)
corps.add(cavalry)
corps.add(Soldier("Phạm Văn Dũng", 80))  # a leaf next to containers

general = General()
general.give_order(Soldier("Đinh Văn Hùng", 70))  # a single leaf
general.give_order(corps)                         # the whole tree, same call

corps.remove(cavalry)
print(f"Sức mạnh sau khi điều kỵ binh đi: {corps.get_strength()}")

# Output:
# ⚔️ Chiến sĩ Đinh Văn Hùng xung phong!
# Tổng sức mạnh: 70
# 🏴 Quân đoàn Tây Sơn nhận lệnh tiến công!
#   🏴 Tiểu đoàn bộ binh nhận lệnh tiến công!
#     🏴 Tiểu đội 1 nhận lệnh tiến công!
#       ⚔️ Chiến sĩ Nguyễn Văn An xung phong!
#       ⚔️ Chiến sĩ Trần Văn Bình xung phong!
#   🏴 Tiểu đoàn kỵ binh nhận lệnh tiến công!
#     ⚔️ Chiến sĩ Lê Văn Cường xung phong!
#   ⚔️ Chiến sĩ Phạm Văn Dũng xung phong!
# Tổng sức mạnh: 420
# Sức mạnh sau khi điều kỵ binh đi: 270`,
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

// A simplified, fictional chain of command for teaching
const squad = new MilitaryUnitComposite('Tiểu đội 1')
squad.add(new Soldier('Nguyễn Văn An', 100))
squad.add(new Soldier('Trần Văn Bình', 90))

const infantry = new MilitaryUnitComposite('Tiểu đoàn bộ binh')
infantry.add(squad)

const cavalry = new MilitaryUnitComposite('Tiểu đoàn kỵ binh')
cavalry.add(new Soldier('Lê Văn Cường', 150))

const corps = new MilitaryUnitComposite('Quân đoàn Tây Sơn')
corps.add(infantry)
corps.add(cavalry)
corps.add(new Soldier('Phạm Văn Dũng', 80)) // a leaf next to containers

const general = new General()
general.giveOrder(new Soldier('Đinh Văn Hùng', 70)) // a single leaf
general.giveOrder(corps)                            // the whole tree, same call

corps.remove(cavalry)
console.log(\`Sức mạnh sau khi điều kỵ binh đi: \${corps.getStrength()}\`)`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'The Component interface (MilitaryUnit) describes the operations common to simple and complex elements of the tree. The Leaf (Soldier) is a basic element with no sub-elements; leaves usually do most of the real work, since they have no one to delegate it to. The Container, also called the composite (MilitaryUnitComposite), is an element with sub-elements: leaves or other containers. It doesn\'t know the concrete classes of its children and works with them only through the component interface. When it receives a request, a container delegates the work to its sub-elements, processes the intermediate results and returns the final result, as getStrength() sums its members\' strength. The Client (General) works with every element through the component interface, so it treats simple and complex elements the same way.' },
        { type: 'paragraph', text: 'Here the child-management methods add() and remove() are declared only in the container. Declaring them in the component interface would let the client treat all elements alike even while building the tree, at the cost of empty methods in the leaf. In the diagram, the "implements" and "children" links between MilitaryUnitComposite and MilitaryUnit are drawn on the same line.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Giao diện Component (MilitaryUnit) mô tả các thao tác chung cho phần tử đơn giản và phần tử phức tạp của cây. Leaf (Soldier) là phần tử cơ bản, không có phần tử con; lá thường làm phần lớn công việc thực sự, vì không có ai để giao việc. Container, còn gọi là composite (MilitaryUnitComposite), là phần tử có phần tử con: lá hoặc container khác. Nó không biết lớp cụ thể của các phần tử con và chỉ làm việc với chúng qua giao diện component. Khi nhận yêu cầu, container giao việc cho các phần tử con, xử lý kết quả trung gian rồi trả về kết quả cuối cùng, như getStrength() cộng sức mạnh của các thành viên. Client (General) làm việc với mọi phần tử qua giao diện component, nên xử lý phần tử đơn giản và phức tạp theo cùng một cách.' },
        { type: 'paragraph', text: 'Ở đây các phương thức quản lý phần tử con add() và remove() chỉ được khai báo trong container. Nếu khai báo chúng trong giao diện component, client có thể đối xử với mọi phần tử như nhau ngay cả khi dựng cây, nhưng lớp lá sẽ phải chứa các phương thức rỗng. Trong sơ đồ, hai liên kết "implements" và "children" giữa MilitaryUnitComposite và MilitaryUnit được vẽ trùng trên một đường.' },
      ],
    },
  },

  {
    id: 'decorator',
    slug: 'decorator',
    name: { en: 'Decorator', vi: 'Trang trí' },
    category: 'structural',
    complexity: 2,
    popularity: 2,
    also_known_as: [{ en: 'Wrapper', vi: 'Lớp bao bọc' }],
    intent: {
      en: 'Decorator is a structural design pattern that lets you attach new behaviors to an object by placing it inside special wrapper objects that contain those behaviors.',
      vi: 'Decorator là một mẫu thiết kế cấu trúc, cho phép gắn thêm hành vi mới cho một đối tượng bằng cách đặt nó vào bên trong các đối tượng bao bọc (wrapper) đặc biệt chứa những hành vi đó.',
    },
    problem: {
      en: 'Imagine a notification library whose first version has a Notifier class with one method, send(message), that emails a list of addresses. Users soon want more: SMS for critical issues, Facebook messages, Slack for company teams. You add each channel as a Notifier subclass, and the client picks one. Then someone asks why they can\'t use several channels at once; if the house is on fire, they want to hear about it on every channel. Subclasses that combine channels (SMS + Facebook, SMS + Slack, ...) quickly bloat both the library and the client code, because every combination needs its own class.',
      vi: 'Hãy hình dung một thư viện gửi thông báo mà phiên bản đầu chỉ có lớp Notifier với một phương thức send(message) gửi email tới một danh sách địa chỉ. Chẳng bao lâu người dùng muốn nhiều hơn: SMS cho sự cố nghiêm trọng, tin nhắn Facebook, Slack cho các nhóm trong công ty. Bạn thêm mỗi kênh thành một lớp con của Notifier, và client chọn một lớp. Rồi có người hỏi sao không dùng được nhiều kênh cùng lúc; nếu nhà cháy, họ muốn được báo trên mọi kênh. Các lớp con kết hợp nhiều kênh (SMS + Facebook, SMS + Slack, ...) nhanh chóng làm phình cả mã thư viện lẫn mã client, vì mỗi tổ hợp cần một lớp riêng.',
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'Inheritance has two limits here. It is static, so you can\'t change the behavior of an existing object at runtime, and a subclass can have only one parent. Aggregation or composition avoids both: an object holds a reference to a helper object and delegates work to it, and the helper can be swapped at runtime.' },
        { type: 'paragraph', text: 'A wrapper is an object linked to a target object. It has the same methods as the target, delegates every request to it, and can do something before or after passing the request on. Because the wrapper implements the same interface as the wrapped object, the client can\'t tell them apart. If the wrapper\'s reference field accepts any object that follows that interface, you can wrap an object in several wrappers and get the combined behavior of all of them.' },
        { type: 'paragraph', text: 'In the notification example, plain email stays in the base Notifier, and SMS, Facebook and Slack become decorators. The client wraps a basic notifier in the decorators it needs, forming a stack, and then works with the outermost decorator without knowing how many layers it has.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Kế thừa có hai hạn chế ở đây. Nó là tĩnh, nên không đổi được hành vi của một đối tượng đang tồn tại lúc chạy, và một lớp con chỉ có một lớp cha. Aggregation (kết tập) hoặc composition (hợp thành) tránh được cả hai: một đối tượng giữ tham chiếu tới một đối tượng trợ giúp và ủy quyền công việc cho nó, và đối tượng trợ giúp có thể được thay lúc chạy.' },
        { type: 'paragraph', text: 'Wrapper là một đối tượng liên kết với một đối tượng đích. Nó có cùng các phương thức với đích, chuyển mọi yêu cầu cho đích, và có thể làm thêm việc trước hoặc sau khi chuyển yêu cầu. Vì wrapper triển khai cùng giao diện với đối tượng được bọc, client không phân biệt được hai bên. Nếu trường tham chiếu của wrapper nhận mọi đối tượng theo giao diện đó, bạn có thể bọc một đối tượng trong nhiều lớp wrapper và có được hành vi kết hợp của tất cả.' },
        { type: 'paragraph', text: 'Trong ví dụ thông báo, việc gửi email đơn giản được giữ ở lớp Notifier cơ sở, còn SMS, Facebook và Slack trở thành các decorator. Client bọc một notifier cơ bản bằng các decorator cần dùng, tạo thành một chồng lớp, rồi làm việc với decorator ngoài cùng mà không cần biết chồng có bao nhiêu lớp.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use the Decorator pattern when:' },
        { type: 'list', items: [
          'you need to add behaviors to objects at runtime without breaking the code that uses them. Split the business logic into layers, create a decorator for each layer, and combine them at runtime. The client treats every combination the same way, because all of them share one interface.',
          'extending an object\'s behavior with inheritance is awkward or impossible. Many languages have a final keyword that prevents subclassing; for a final class, wrapping it in your own decorator is the only way to reuse and extend its behavior.',
        ] },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Decorator khi:' },
        { type: 'list', items: [
          'bạn cần thêm hành vi cho đối tượng lúc chạy mà không làm hỏng mã đang dùng chúng. Hãy chia logic nghiệp vụ thành từng lớp, tạo một decorator cho mỗi lớp, rồi ghép chúng lúc chạy. Client đối xử với mọi tổ hợp như nhau, vì tất cả có chung một giao diện.',
          'việc mở rộng hành vi bằng kế thừa bất tiện hoặc không làm được. Nhiều ngôn ngữ có từ khóa final để chặn kế thừa; với một lớp final, bọc nó trong decorator của riêng bạn là cách duy nhất để tái sử dụng và mở rộng hành vi của nó.',
        ] },
      ],
    },
    vietnamese_example: {
      title: { en: 'A bowl of phở, one topping at a time', vi: 'Bát phở, thêm từng món một' },
      description: {
        en: [
          { type: 'paragraph', text: 'In this example, every bowl starts as a PlainNoodleSoup, the Concrete Component, at 40.000đ. The customer then picks toppings: beef (thịt bò), egg (trứng), chili (ớt) and spring onion (hành lá). The menu and prices are illustrative.' },
          { type: 'paragraph', text: 'Each topping is a Concrete Decorator (AddBeef, AddEgg, AddChili, AddSpringOnion) that extends the Base Decorator NoodleSoupDecorator. NoodleSoupDecorator holds a reference to any NoodleSoup and delegates describe() and price() to it. Each topping calls the parent method first, then appends its name and adds its price.' },
          { type: 'paragraph', text: 'The order-taking code wraps the bowl at runtime, one topping at a time, so PlainNoodleSoup → AddBeef → AddEgg → AddChili → AddSpringOnion costs 75.000đ without a class for each combination. The bill printer is the Client: it sees only the NoodleSoup interface and treats a plain bowl and a fully loaded one the same way.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Trong ví dụ này, bát phở nào cũng bắt đầu là một PlainNoodleSoup, tức Concrete Component, giá 40.000đ. Sau đó khách chọn thêm: thịt bò, trứng, ớt và hành lá. Thực đơn và giá chỉ để minh họa.' },
          { type: 'paragraph', text: 'Mỗi món thêm là một Concrete Decorator (AddBeef, AddEgg, AddChili, AddSpringOnion) kế thừa Base Decorator NoodleSoupDecorator. NoodleSoupDecorator giữ tham chiếu tới một NoodleSoup bất kỳ và ủy quyền describe() và price() cho nó. Mỗi món thêm gọi phương thức của lớp cha trước, rồi nối thêm tên và cộng thêm giá của mình.' },
          { type: 'paragraph', text: 'Mã nhận món bọc bát phở lúc chạy, từng món một, nên PlainNoodleSoup → AddBeef → AddEgg → AddChili → AddSpringOnion có giá 75.000đ mà không cần lớp riêng cho mỗi tổ hợp. Phần in hóa đơn là Client: nó chỉ thấy giao diện NoodleSoup và đối xử với bát phở không và bát đủ món theo cùng một cách.' },
        ],
      },
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
      en: 'Component declares the interface common to wrappers and wrapped objects. Concrete Component is the class of the objects being wrapped; it defines the basic behavior, which decorators can change. Base Decorator has a field that references a wrapped object. The field\'s type is the component interface, so it can hold concrete components as well as decorators, and the base decorator delegates all operations to that object. Concrete Decorators define extra behaviors that can be added to components at runtime; they override methods of the base decorator and run their behavior before or after calling the parent method. The Client can wrap components in several layers of decorators, as long as it works with all objects through the component interface.',
      vi: 'Component khai báo giao diện chung cho cả wrapper lẫn đối tượng được bọc. Concrete Component là lớp của các đối tượng được bọc; nó định nghĩa hành vi cơ bản mà decorator có thể thay đổi. Base Decorator có một trường tham chiếu tới đối tượng được bọc. Kiểu của trường là giao diện component, nên trường chứa được cả concrete component lẫn decorator, và base decorator ủy quyền mọi thao tác cho đối tượng đó. Concrete Decorator định nghĩa các hành vi bổ sung có thể gắn vào component lúc chạy; chúng ghi đè phương thức của base decorator và thực hiện hành vi của mình trước hoặc sau khi gọi phương thức của lớp cha. Client có thể bọc component trong nhiều lớp decorator, miễn là nó làm việc với mọi đối tượng qua giao diện component.',
    },
  },

  {
    id: 'facade',
    slug: 'facade',
    name: { en: 'Facade', vi: 'Mặt tiền' },
    category: 'structural',
    complexity: 1,
    popularity: 2,
    intent: {
      en: 'Facade is a structural design pattern that provides a simplified interface to a library, a framework or any other complex set of classes.',
      vi: 'Facade là một mẫu thiết kế cấu trúc, cung cấp một giao diện đơn giản cho một thư viện, một framework hoặc bất kỳ tập hợp lớp phức tạp nào khác.',
    },
    problem: {
      en: 'Imagine your code has to work with a large set of objects from a sophisticated library or framework. You would normally have to initialize all those objects, track their dependencies, call their methods in the right order, and so on. Your business logic then becomes tightly coupled to the implementation details of third-party classes, which makes it hard to understand and maintain.',
      vi: 'Hãy hình dung mã của bạn phải làm việc với rất nhiều đối tượng thuộc một thư viện hoặc framework phức tạp. Thông thường bạn phải khởi tạo tất cả các đối tượng đó, theo dõi phụ thuộc giữa chúng, gọi phương thức theo đúng thứ tự, và nhiều việc khác. Khi đó logic nghiệp vụ của bạn bị gắn chặt với chi tiết triển khai của các lớp bên thứ ba, khiến mã khó hiểu và khó bảo trì.',
    },
    solution: {
      en: 'A facade is a class that provides a simple interface to a complex subsystem with many moving parts. It may offer less functionality than the subsystem itself, but it covers the features clients actually need. A facade is useful when you integrate your app with a library that has dozens of features but you need only a few of them. For example, an app that uploads short cat videos to social media could use a professional video conversion library, yet all it needs is a class with one method, encode(filename, format). Once you write that class and connect it to the library, you have your first facade.',
      vi: 'Facade là một lớp cung cấp giao diện đơn giản cho một hệ thống con phức tạp có nhiều thành phần. Nó có thể cung cấp ít chức năng hơn chính hệ thống con, nhưng có đủ những tính năng mà client thực sự cần. Facade hữu ích khi bạn tích hợp ứng dụng với một thư viện có hàng chục tính năng nhưng chỉ cần vài tính năng trong số đó. Ví dụ, một ứng dụng đăng video mèo ngắn lên mạng xã hội có thể dùng một thư viện chuyển đổi video chuyên nghiệp, nhưng thứ nó cần chỉ là một lớp có một phương thức encode(filename, format). Khi bạn viết lớp đó và nối nó với thư viện, bạn đã có facade đầu tiên.',
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use the Facade pattern when:' },
        { type: 'list', items: [
          'you need a limited but simple interface to a complex subsystem. Subsystems tend to grow more complex over time, and even applying design patterns adds classes, so the setup code a client must write keeps growing. A facade offers a shortcut to the most-used features, which covers most client needs.',
          'you want to organize a subsystem into layers. Create a facade as the entry point to each layer, and reduce coupling between subsystems by making them talk to each other only through facades. For example, a video conversion framework can be split into a video layer and an audio layer, each with its own facade. This approach resembles the Mediator pattern.',
        ] },
      ],
      vi: [
        { type: 'paragraph', text: 'Dùng Facade khi:' },
        { type: 'list', items: [
          'bạn cần một giao diện hạn chế nhưng đơn giản tới một hệ thống con phức tạp. Hệ thống con thường phức tạp dần theo thời gian, và ngay cả việc áp dụng mẫu thiết kế cũng sinh thêm lớp, nên lượng mã thiết lập mà client phải viết cứ tăng lên. Facade cung cấp lối tắt tới những tính năng hay dùng nhất, đủ cho phần lớn nhu cầu của client.',
          'bạn muốn tổ chức hệ thống con thành các tầng. Hãy tạo một facade làm điểm vào cho mỗi tầng, và giảm phụ thuộc giữa các hệ thống con bằng cách cho chúng giao tiếp với nhau chỉ qua facade. Ví dụ, một framework chuyển đổi video có thể tách thành tầng video và tầng âm thanh, mỗi tầng có facade riêng. Cách làm này giống mẫu Mediator.',
        ] },
      ],
    },
    vietnamese_example: {
      title: { en: 'One coordinator for a quan họ wedding', vi: 'Một người điều phối cho đám cưới quan họ' },
      description: {
        en: [
          { type: 'paragraph', text: 'This example is a simplified, fictional wedding workflow with a quan họ theme. The services and their order were chosen to show the pattern; they don\'t describe how a quan họ wedding is or must be held.' },
          { type: 'paragraph', text: 'The wedding depends on several services that run in a set order: Decoration, BridalDress (dressing the bride), Music (the quan họ singers), Ceremony (the ancestral rite and the ring exchange) and Cooking (the feast). These classes form the Complex Subsystem, and they don\'t know who coordinates them.' },
          { type: 'paragraph', text: 'MasterOfCeremonies is the Facade. The couple, the Client, make one call, startWedding(bride, groom, trayCount), and MasterOfCeremonies drives every service in the right sequence. Cooking has several steps of its own, so it sits behind an Additional Facade, HeadCook, whose prepareFeast(trayCount) calls prepareIngredients(), cook() and serveTrays(). MasterOfCeremonies uses HeadCook instead of talking to Cooking, and the family can also call HeadCook directly for a smaller meal, such as the lại mặt visit after the wedding.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Ví dụ này là một quy trình đám cưới giản lược và hư cấu, lấy chủ đề quan họ. Các dịch vụ và thứ tự của chúng được chọn để minh họa mẫu thiết kế, không mô tả cách một đám cưới quan họ được hay phải được tổ chức.' },
          { type: 'paragraph', text: 'Đám cưới cần nhiều dịch vụ chạy theo một thứ tự định sẵn: Decoration (trang trí), BridalDress (sửa soạn cho cô dâu), Music (liền anh, liền chị hát quan họ), Ceremony (lễ gia tiên và trao nhẫn) và Cooking (nấu cỗ). Các lớp này tạo thành Complex Subsystem, và chúng không biết ai đang điều phối mình.' },
          { type: 'paragraph', text: 'MasterOfCeremonies (người điều phối) là Facade. Cô dâu chú rể, tức Client, chỉ gọi một lệnh startWedding(bride, groom, trayCount), và MasterOfCeremonies điều khiển mọi dịch vụ theo đúng trình tự. Riêng việc nấu nướng có nhiều bước, nên nó nằm sau một Additional Facade là HeadCook (bếp trưởng), với prepareFeast(trayCount) gọi prepareIngredients(), cook() và serveTrays(). MasterOfCeremonies dùng HeadCook thay vì làm việc trực tiếp với Cooking, và gia đình cũng có thể gọi thẳng HeadCook cho một bữa cỗ nhỏ hơn, như lễ lại mặt sau đám cưới.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `# Complex Subsystem: services of a simplified, fictional wedding. They work on their own
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
        print("🎵 Liền anh, liền chị quan họ vào chỗ")

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
# 🎵 Liền anh, liền chị quan họ vào chỗ
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
        code: `// Complex Subsystem: services of a simplified, fictional wedding. They work on their own
// and do not know that a facade exists.
class Decoration {
  hangFlowers() { console.log('🌸 Treo hoa sen và cúc vạn thọ') }
  lightLanterns() { console.log('🏮 Thắp đèn lồng đỏ') }
}

class BridalDress {
  dressBride(person: string) { console.log(\`👘 Cô dâu \${person} mặc áo dài đỏ, đội khăn vấn\`) }
}

class Music {
  start() { console.log('🎵 Liền anh, liền chị quan họ vào chỗ') }
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
      en: 'The Facade gives convenient access to a particular part of the subsystem\'s functionality. It knows where to direct each client request and how to operate all the moving parts. An Additional Facade keeps a single facade from filling up with unrelated features and turning into another complex structure; both clients and other facades can use it. The Complex Subsystem consists of many different objects. To make them do something useful, you need to know their implementation details, such as initializing objects in the right order and passing them data in the right format. Subsystem classes aren\'t aware of the facade; they work within the system and with each other directly. The Client uses the facade instead of calling subsystem objects directly.',
      vi: 'Facade cung cấp lối truy cập thuận tiện tới một phần chức năng cụ thể của hệ thống con. Nó biết chuyển mỗi yêu cầu của client tới đâu và vận hành các thành phần ra sao. Additional Facade giúp một facade không bị nhồi các tính năng không liên quan và trở thành thêm một cấu trúc phức tạp nữa; cả client lẫn các facade khác đều dùng được nó. Complex Subsystem gồm nhiều đối tượng khác nhau. Muốn chúng làm được việc có ích, bạn phải nắm chi tiết triển khai của chúng, như khởi tạo đối tượng theo đúng thứ tự và truyền dữ liệu đúng định dạng. Các lớp của hệ thống con không biết đến facade; chúng hoạt động bên trong hệ thống và làm việc trực tiếp với nhau. Client dùng facade thay vì gọi trực tiếp các đối tượng của hệ thống con.',
    },
  },

  {
    id: 'flyweight',
    slug: 'flyweight',
    name: { en: 'Flyweight', vi: 'Hạng ruồi' },
    category: 'structural',
    complexity: 3,
    popularity: 1,
    also_known_as: [{ en: 'Cache', vi: 'Bộ nhớ đệm' }],
    intent: {
      en: 'Flyweight is a structural design pattern that lets you fit more objects into the available RAM by sharing common parts of their state instead of keeping all of the data in each object.',
      vi: 'Flyweight là một mẫu thiết kế cấu trúc, giúp chứa được nhiều đối tượng hơn trong lượng RAM có sẵn bằng cách dùng chung những phần trạng thái giống nhau thay vì giữ toàn bộ dữ liệu trong từng đối tượng.',
    },
    problem: {
      en: 'Imagine a simple video game in which players move around a map and shoot each other. Its main feature is a realistic particle system: large numbers of bullets, missiles and pieces of shrapnel fly across the map. The game runs well on your computer, but on a friend\'s less powerful machine it crashes after a few minutes. The debug logs show that it runs out of RAM. Each particle is a separate object with a lot of data, and when the action peaks, new particles no longer fit into the remaining memory.',
      vi: 'Hãy hình dung một trò chơi đơn giản, trong đó người chơi di chuyển trên bản đồ và bắn nhau. Điểm nổi bật của trò chơi là hệ thống hạt (particle) chân thực: rất nhiều đạn, tên lửa và mảnh vỡ bay khắp bản đồ. Trò chơi chạy tốt trên máy của bạn, nhưng trên máy yếu hơn của một người bạn thì cứ vài phút lại bị sập. Nhật ký gỡ lỗi cho thấy trò chơi hết RAM. Mỗi hạt là một đối tượng riêng chứa nhiều dữ liệu, và khi trận đấu lên cao trào, các hạt mới không còn chỗ trong bộ nhớ còn lại.',
    },
    solution: {
      en: [
        { type: 'paragraph', text: 'In the Particle class, the color and sprite fields use far more memory than the other fields, and they are almost the same for every particle: all bullets share one color and sprite. The coordinates, movement vector and speed, on the other hand, are unique to each particle and change over time. The constant data is the intrinsic state: it lives inside the object, and other objects can only read it. The rest of the state, often changed from outside, is the extrinsic state.' },
        { type: 'paragraph', text: 'The pattern says to stop storing extrinsic state inside the object and to pass it to the methods that need it instead. Only the intrinsic state stays in the object, so one object can be reused in many contexts. You then need only as many objects as there are combinations of intrinsic state: three (bullet, missile, shrapnel) instead of thousands. Such an object is called a flyweight. The extrinsic state moves to a container object or, better, to small context objects that each store it together with a reference to a flyweight. There are still many contexts, but the heavy fields now exist only in a few flyweights.' },
        { type: 'paragraph', text: 'Because a flyweight is shared, it must be immutable: it receives its state once through constructor parameters and exposes no setters or public fields. For convenient access, a factory method manages a pool of flyweights. It takes the intrinsic state, returns a matching flyweight if one exists, or creates a new one and adds it to the pool. That method can live in the container, in a separate factory class, or as a static method of the flyweight class.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Trong lớp Particle, hai trường màu sắc và sprite tốn bộ nhớ hơn hẳn các trường khác, và gần như giống nhau ở mọi hạt: mọi viên đạn có chung màu và sprite. Ngược lại, tọa độ, vectơ chuyển động và tốc độ là riêng cho từng hạt và thay đổi theo thời gian. Dữ liệu không đổi là trạng thái nội tại (intrinsic): nó nằm trong đối tượng, và các đối tượng khác chỉ được đọc. Phần trạng thái còn lại, thường bị thay đổi từ bên ngoài, là trạng thái ngoại tại (extrinsic).' },
        { type: 'paragraph', text: 'Mẫu này đề nghị thôi lưu trạng thái ngoại tại trong đối tượng mà truyền nó vào các phương thức cần đến. Chỉ trạng thái nội tại còn ở lại, nên một đối tượng có thể được dùng lại trong nhiều ngữ cảnh. Khi đó bạn chỉ cần số đối tượng bằng số tổ hợp trạng thái nội tại: ba (đạn, tên lửa, mảnh vỡ) thay vì hàng nghìn. Đối tượng như vậy gọi là flyweight. Trạng thái ngoại tại được chuyển sang một đối tượng chứa (container), hoặc tốt hơn là sang các đối tượng ngữ cảnh (context) nhỏ, mỗi đối tượng lưu trạng thái đó cùng một tham chiếu tới flyweight. Số context vẫn nhiều, nhưng các trường nặng giờ chỉ còn trong vài flyweight.' },
        { type: 'paragraph', text: 'Vì flyweight được dùng chung, nó phải bất biến: trạng thái chỉ được gán một lần qua tham số hàm khởi tạo, và không có setter hay trường public. Để truy cập tiện lợi, một phương thức factory quản lý một pool các flyweight. Phương thức nhận trạng thái nội tại, trả về flyweight có sẵn nếu khớp, hoặc tạo flyweight mới và thêm vào pool. Phương thức này có thể đặt trong container, trong một lớp factory riêng, hoặc là phương thức static của chính lớp flyweight.' },
      ],
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Use the Flyweight pattern only when your program must support a huge number of objects that barely fit into the available RAM. How much it helps depends on how and where you use it. It is most useful when:' },
        { type: 'list', items: [
          'the application needs to create a huge number of similar objects;',
          'those objects use up the RAM available on the target device;',
          'the objects contain duplicate state that can be extracted and shared among them.',
        ] },
      ],
      vi: [
        { type: 'paragraph', text: 'Chỉ dùng Flyweight khi chương trình phải hỗ trợ một số lượng đối tượng khổng lồ, gần như không vừa RAM hiện có. Lợi ích của mẫu phụ thuộc vào việc bạn dùng nó ở đâu và như thế nào. Mẫu hữu ích nhất khi:' },
        { type: 'list', items: [
          'ứng dụng cần tạo rất nhiều đối tượng giống nhau;',
          'các đối tượng đó dùng hết RAM có trên thiết bị đích;',
          'các đối tượng chứa trạng thái trùng lặp có thể tách ra để dùng chung.',
        ] },
      ],
    },
    vietnamese_example: {
      title: { en: 'A lantern release in Hội An', vi: 'Thả đèn lồng ở Hội An' },
      description: {
        en: [
          { type: 'paragraph', text: 'This example is a fictional lantern release on the Thu Bồn river in Hội An. The three designs and the count of 10,006 lanterns are invented for the code, not facts about a real festival. The designs are a red round lantern with lotuses, a yellow square one with a dragon and a pink round one with peach blossoms.' },
          { type: 'paragraph', text: 'Color (đỏ/vàng/hồng), shape (tròn/vuông) and pattern (hoa sen/rồng/hoa đào) repeat across thousands of lanterns, so they are the intrinsic state. They live in the Flyweight LanternFlyweight, which is immutable. Each lantern\'s position on the river and the wish written on it are unique, so they are the extrinsic state. They are stored in the Context Lantern, together with a reference to its flyweight; Lantern.display() passes x, y and wish to the flyweight\'s display().' },
          { type: 'paragraph', text: 'The Flyweight Factory LanternFactory keeps a pool keyed by color, shape and pattern, and returns an existing lantern type or creates a new one. The Client LanternFestival stores the contexts and asks the factory for a type each time it releases a lantern, so 10,006 lanterns share only 3 flyweight objects, one per design.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Ví dụ này là một buổi thả đèn hư cấu trên sông Thu Bồn ở Hội An. Ba mẫu đèn và con số 10.006 chiếc đèn được đặt ra cho đoạn mã, không phải số liệu về một lễ hội có thật. Ba mẫu gồm đèn đỏ tròn vẽ hoa sen, đèn vàng vuông vẽ rồng và đèn hồng tròn vẽ hoa đào.' },
          { type: 'paragraph', text: 'Màu sắc (đỏ/vàng/hồng), hình dáng (tròn/vuông) và họa tiết (hoa sen/rồng/hoa đào) lặp lại trên hàng nghìn chiếc đèn, nên đó là trạng thái nội tại. Chúng nằm trong Flyweight LanternFlyweight và không thể thay đổi. Vị trí trên sông và lời ước viết trên mỗi chiếc đèn là riêng, nên đó là trạng thái ngoại tại. Chúng được lưu trong Context Lantern cùng một tham chiếu tới flyweight của đèn; Lantern.display() truyền x, y và wish vào display() của flyweight.' },
          { type: 'paragraph', text: 'Flyweight Factory LanternFactory giữ một pool theo khóa màu, hình dáng và họa tiết, trả về kiểu đèn có sẵn hoặc tạo kiểu mới. Client LanternFestival lưu các context và xin factory một kiểu đèn mỗi lần thả, nên 10.006 chiếc đèn chỉ dùng chung 3 đối tượng flyweight, mỗi mẫu một đối tượng.' },
        ],
      },
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
thu_bon_river.release_lantern(12, 1, "Ước đỗ đạt", "hồng", "tròn", "hoa đào")
thu_bon_river.display()

# Release 10,000 more lanterns in the three designs: the pool does not grow
designs = [
    ("Ước bình an", "đỏ", "tròn", "hoa sen"),
    ("Ước an khang", "vàng", "vuông", "rồng"),
    ("Ước sum vầy", "hồng", "tròn", "hoa đào"),
]
for i in range(10000):
    wish, color, shape, pattern = designs[i % 3]
    thu_bon_river.release_lantern(i, i % 7, wish, color, shape, pattern)

print(f"{len(thu_bon_river.lanterns)} đèn lồng, {LanternFactory.type_count()} flyweight")

# Output:
# 🏮 đỏ/tròn/hoa sen tại (10, 3): Ước bình an
# 🏮 đỏ/tròn/hoa sen tại (20, 5): Ước hạnh phúc
# 🏮 vàng/vuông/rồng tại (15, 4): Ước thành công
# 🏮 đỏ/tròn/hoa sen tại (8, 6): Ước sức khỏe
# 🏮 vàng/vuông/rồng tại (25, 2): Ước phú quý
# 🏮 hồng/tròn/hoa đào tại (12, 1): Ước đỗ đạt
# 10006 đèn lồng, 3 flyweight`,
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
thuBonRiver.releaseLantern(12, 1, 'Ước đỗ đạt', 'hồng', 'tròn', 'hoa đào')
thuBonRiver.display()

// Release 10,000 more lanterns in the three designs: the pool does not grow
const designs: [string, string, string, string][] = [
  ['Ước bình an', 'đỏ', 'tròn', 'hoa sen'],
  ['Ước an khang', 'vàng', 'vuông', 'rồng'],
  ['Ước sum vầy', 'hồng', 'tròn', 'hoa đào'],
]
for (let i = 0; i < 10000; i++) {
  const [wish, color, shape, pattern] = designs[i % 3]
  thuBonRiver.releaseLantern(i, i % 7, wish, color, shape, pattern)
}

console.log(\`\${thuBonRiver.lanterns.length} đèn lồng, \${LanternFactory.typeCount()} flyweight\`)`,
      },
    ],
    structure_notes: {
      en: [
        { type: 'paragraph', text: 'The Flyweight pattern is only an optimization. Before applying it, make sure your program really has a RAM problem caused by many similar objects in memory at once, and that the problem can\'t be solved another way. The Flyweight class contains the part of the original object\'s state that many objects can share; the same flyweight can be used in many different contexts. The state stored inside a flyweight is called intrinsic; the state passed to its methods is called extrinsic.' },
        { type: 'paragraph', text: 'The Context class contains the extrinsic state, unique to each original object; a context paired with a flyweight represents the full state of the original object. Usually the behavior stays in the flyweight, so whoever calls its methods must pass the extrinsic state as parameters. Alternatively, the behavior can move to the context, which then uses the flyweight only as a data object. The Client calculates or stores the extrinsic state; to the client, a flyweight is a template object configured at runtime through method parameters. The Flyweight Factory manages a pool of existing flyweights: clients don\'t create flyweights directly but call the factory with the intrinsic state they want, and the factory returns a matching flyweight or creates a new one.' },
      ],
      vi: [
        { type: 'paragraph', text: 'Flyweight chỉ là một kỹ thuật tối ưu. Trước khi áp dụng, hãy chắc chắn chương trình thực sự gặp vấn đề về RAM do có quá nhiều đối tượng giống nhau trong bộ nhớ cùng lúc, và vấn đề đó không giải quyết được bằng cách khác. Lớp Flyweight chứa phần trạng thái của đối tượng gốc mà nhiều đối tượng có thể dùng chung; cùng một flyweight có thể được dùng trong nhiều ngữ cảnh khác nhau. Trạng thái lưu bên trong flyweight gọi là nội tại (intrinsic); trạng thái được truyền vào phương thức của nó gọi là ngoại tại (extrinsic).' },
        { type: 'paragraph', text: 'Lớp Context chứa trạng thái ngoại tại, riêng cho từng đối tượng gốc; một context ghép với một flyweight thể hiện đầy đủ trạng thái của đối tượng gốc. Thông thường hành vi vẫn nằm trong flyweight, nên ai gọi phương thức của nó phải truyền trạng thái ngoại tại qua tham số. Cách khác là chuyển hành vi sang context, khi đó context chỉ dùng flyweight như một đối tượng dữ liệu. Client tính toán hoặc lưu trữ trạng thái ngoại tại; với client, flyweight là một đối tượng mẫu được cấu hình lúc chạy qua tham số của phương thức. Flyweight Factory quản lý một pool các flyweight có sẵn: client không tự tạo flyweight mà gọi factory với trạng thái nội tại mong muốn, và factory trả về flyweight khớp hoặc tạo một flyweight mới.' },
      ],
    },
  },

  {
    id: 'proxy',
    slug: 'proxy',
    name: { en: 'Proxy', vi: 'Đại diện' },
    category: 'structural',
    complexity: 2,
    popularity: 1,
    intent: {
      en: 'Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, so you can do something before or after a request reaches it.',
      vi: 'Proxy là một mẫu thiết kế cấu trúc, cho phép cung cấp một đối tượng thay thế hoặc giữ chỗ cho một đối tượng khác. Proxy kiểm soát việc truy cập vào đối tượng gốc, nhờ đó bạn có thể làm thêm việc trước hoặc sau khi yêu cầu tới được đối tượng gốc.',
    },
    problem: {
      en: 'Why control access to an object? Say you have a large object that uses a lot of system resources, such as a database that answers slow queries. You need it from time to time, but not always. You could use lazy initialization and create the object only when it is needed, but then every client of the object would have to run some deferred initialization code, which likely means a lot of duplicated code. Ideally this code would go into the object\'s own class, but that isn\'t always possible: the class may belong to a closed third-party library.',
      vi: 'Vì sao cần kiểm soát việc truy cập vào một đối tượng? Giả sử bạn có một đối tượng lớn tốn nhiều tài nguyên hệ thống, ví dụ một cơ sở dữ liệu trả lời truy vấn chậm. Bạn chỉ thỉnh thoảng mới cần đến nó. Bạn có thể dùng khởi tạo trễ (lazy initialization), tức là chỉ tạo đối tượng khi cần, nhưng khi đó mọi client của đối tượng đều phải chạy một đoạn mã khởi tạo trễ, nhiều khả năng dẫn đến lặp mã. Tốt nhất là đặt đoạn mã này ngay trong lớp của đối tượng, nhưng không phải lúc nào cũng làm được: lớp đó có thể thuộc một thư viện bên thứ ba đóng mã nguồn.',
    },
    solution: {
      en: 'Create a proxy class with the same interface as the original service object, then change the app so it passes the proxy to all of the original object\'s clients. When the proxy receives a request from a client, it creates the real service object if needed and delegates the work to it. In the database example, the proxy poses as the database object and handles lazy initialization and result caching without the client or the real database knowing. The benefit is that if you need to run something before or after the main logic of a class, the proxy lets you do it without changing that class. Because the proxy implements the same interface as the original class, you can pass it to any client that expects the real service object.',
      vi: 'Tạo một lớp proxy có cùng giao diện với đối tượng dịch vụ gốc, rồi sửa ứng dụng để truyền proxy cho mọi client của đối tượng gốc. Khi nhận yêu cầu từ client, proxy tạo đối tượng dịch vụ thật nếu cần và ủy quyền công việc cho nó. Trong ví dụ cơ sở dữ liệu, proxy đóng vai đối tượng cơ sở dữ liệu và lo việc khởi tạo trễ cùng cache kết quả mà cả client lẫn cơ sở dữ liệu thật đều không hay biết. Lợi ích là nếu cần chạy thêm việc gì đó trước hoặc sau logic chính của một lớp, proxy cho phép làm điều đó mà không phải sửa lớp ấy. Vì proxy triển khai cùng giao diện với lớp gốc, bạn có thể truyền nó cho bất kỳ client nào đang cần đối tượng dịch vụ thật.',
    },
    applicability: {
      en: [
        { type: 'paragraph', text: 'Proxy has many uses. The most common are:' },
        { type: 'list', items: [
          'Lazy initialization (virtual proxy): a heavyweight service object wastes system resources by running all the time, although you need it only occasionally. Instead of creating it when the app starts, the proxy delays its creation until it is actually needed.',
          'Access control (protection proxy): only specific clients should be able to use the service object, for example when the service is a critical part of an operating system and the clients are various launched applications, some possibly malicious. The proxy passes a request on only if the client\'s credentials meet certain criteria.',
          'Local execution of a remote service (remote proxy): the service object lives on a remote server. The proxy sends the client request over the network and handles the networking details.',
          'Logging requests (logging proxy): you want to keep a history of requests to the service object. The proxy logs each request before passing it on.',
          'Caching request results (caching proxy): you need to cache the results of client requests and manage the life cycle of that cache, especially when the results are large. The proxy caches repeated requests that always return the same result, using the request parameters as cache keys.',
          'Smart reference: you need to release a heavyweight object once no client uses it. The proxy keeps track of the clients that obtained a reference to the service or its results, checks from time to time whether they are still active, and frees the service when the list is empty. It can also track whether a client changed the service object, so unchanged objects can be reused by other clients.',
        ] },
      ],
      vi: [
        { type: 'paragraph', text: 'Proxy có nhiều cách dùng. Phổ biến nhất là:' },
        { type: 'list', items: [
          'Khởi tạo trễ (virtual proxy): một đối tượng dịch vụ nặng chạy suốt và lãng phí tài nguyên hệ thống, dù bạn chỉ thỉnh thoảng mới cần. Thay vì tạo nó khi ứng dụng khởi động, proxy hoãn việc tạo cho tới khi thật sự cần.',
          'Kiểm soát truy cập (protection proxy): chỉ một số client nhất định được dùng đối tượng dịch vụ, ví dụ khi dịch vụ là thành phần quan trọng của hệ điều hành còn client là các ứng dụng được chạy, trong đó có thể có ứng dụng độc hại. Proxy chỉ chuyển yêu cầu đi nếu thông tin xác thực của client đạt tiêu chí nhất định.',
          'Thực thi cục bộ một dịch vụ từ xa (remote proxy): đối tượng dịch vụ nằm trên máy chủ từ xa. Proxy gửi yêu cầu của client qua mạng và lo các chi tiết về mạng.',
          'Ghi log yêu cầu (logging proxy): bạn muốn lưu lịch sử các yêu cầu gửi tới đối tượng dịch vụ. Proxy ghi log từng yêu cầu trước khi chuyển tiếp.',
          'Cache kết quả (caching proxy): bạn cần cache kết quả các yêu cầu của client và quản lý vòng đời của cache đó, nhất là khi kết quả có kích thước lớn. Proxy cache các yêu cầu lặp lại luôn cho cùng một kết quả, dùng tham số của yêu cầu làm khóa cache.',
          'Tham chiếu thông minh (smart reference): bạn cần giải phóng một đối tượng nặng ngay khi không còn client nào dùng nó. Proxy theo dõi các client đã lấy tham chiếu tới dịch vụ hoặc kết quả của nó, thỉnh thoảng kiểm tra xem chúng còn hoạt động không, và giải phóng dịch vụ khi danh sách trống. Proxy cũng có thể theo dõi xem client có sửa đối tượng dịch vụ hay không, để các đối tượng chưa bị sửa được tái sử dụng cho client khác.',
        ] },
      ],
    },
    vietnamese_example: {
      title: { en: 'A mandarin guards the emperor', vi: 'Viên quan giữ cửa yết kiến' },
      description: {
        en: [
          { type: 'paragraph', text: 'This example is a simplified, fictional imperial court in which petitioners don\'t reach the emperor directly. CourtSession is the Client: it holds a reference of type Emperor, the Service Interface, and calls grantAudience() without knowing who answers. RealEmperor is the Service, and summoning him to the throne hall is costly.' },
          { type: 'paragraph', text: 'MandarinProxy is the Proxy: the mandarin implements the same Emperor interface and stands in front of the emperor. He does two jobs. He turns away anyone who isn\'t on his list of officials, which makes him a protection proxy. He also summons the emperor only when the first valid petition arrives, so a quiet day never disturbs the court, which makes him a virtual proxy. The RealEmperor class never changes, and the court session can\'t tell whether it is talking to the mandarin or to the emperor.' },
          { type: 'paragraph', text: 'The same gate could do other jobs too: a mandarin who records every petition in a ledger would be a logging proxy, and one who answers a repeated petition with the decree already issued would be a caching proxy.' },
        ],
        vi: [
          { type: 'paragraph', text: 'Ví dụ này là một triều đình giản lược và hư cấu, nơi người dâng đơn không gặp thẳng nhà vua. CourtSession (buổi thiết triều) là Client: nó giữ một tham chiếu kiểu Emperor, tức Service Interface, và gọi grantAudience() mà không cần biết ai sẽ trả lời. RealEmperor là Service, và việc mời nhà vua ra điện rất tốn kém.' },
          { type: 'paragraph', text: 'MandarinProxy là Proxy: viên quan triển khai cùng giao diện Emperor và đứng chắn trước nhà vua. Ông làm hai việc. Ông từ chối người không có tên trong danh sách các quan, nên ông là protection proxy. Ông cũng chỉ mời nhà vua ra khi có lá đơn hợp lệ đầu tiên, nên một ngày yên ắng không làm phiền triều đình; vì vậy ông còn là virtual proxy. Lớp RealEmperor không hề thay đổi, và buổi thiết triều không phân biệt được mình đang nói chuyện với viên quan hay với chính nhà vua.' },
          { type: 'paragraph', text: 'Cùng cửa ải đó còn có thể làm việc khác: viên quan ghi mọi lá đơn vào sổ sẽ là logging proxy, còn viên quan trả lời đơn trùng lặp bằng chiếu chỉ đã ban sẽ là caching proxy.' },
        ],
      },
    },
    code_examples: [
      {
        language: 'python',
        label: 'Python',
        code: `from abc import ABC, abstractmethod
from typing import Optional, Set


# Service Interface: the proxy must follow it to pass as the real Emperor
class Emperor(ABC):
    @abstractmethod
    def grant_audience(self, name: str, petition: str) -> str: ...


# Service: the real Emperor, costly to summon to the throne hall
class RealEmperor(Emperor):
    def __init__(self) -> None:
        print("👑 Triệu Hoàng đế ra điện Kính Thiên")

    def grant_audience(self, name: str, petition: str) -> str:
        return f"Hoàng đế phán: chuẩn tấu việc '{petition}'"


# Proxy: same interface, holds a reference to the service and manages its lifecycle
class MandarinProxy(Emperor):
    def __init__(self, permitted: Set[str]) -> None:
        self._emperor: Optional[RealEmperor] = None
        self._permitted = permitted

    def grant_audience(self, name: str, petition: str) -> str:
        # Protection proxy: only officials on the list get through
        if name not in self._permitted:
            return f"🚫 {name} không được yết kiến"

        # Virtual proxy: summon the Emperor only for the first valid petition
        if self._emperor is None:
            self._emperor = RealEmperor()

        return self._emperor.grant_audience(name, petition)


# Client: works only through the Emperor interface,
# so it accepts the proxy or the real service alike
class CourtSession:
    def __init__(self, emperor: Emperor) -> None:
        self._emperor = emperor

    def submit_petition(self, name: str, petition: str) -> None:
        print(self._emperor.grant_audience(name, petition))


court = CourtSession(MandarinProxy({"Tể tướng", "Đại tướng"}))
court.submit_petition("Dân thường", "giảm thuế")
court.submit_petition("Tể tướng", "mở khoa thi")
court.submit_petition("Đại tướng", "đắp đê sông Hồng")

# Output:
# 🚫 Dân thường không được yết kiến
# 👑 Triệu Hoàng đế ra điện Kính Thiên
# Hoàng đế phán: chuẩn tấu việc 'mở khoa thi'
# Hoàng đế phán: chuẩn tấu việc 'đắp đê sông Hồng'`,
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
    console.log('👑 Triệu Hoàng đế ra điện Kính Thiên')
  }

  grantAudience(name: string, petition: string): string {
    return \`Hoàng đế phán: chuẩn tấu việc '\${petition}'\`
  }
}

// Proxy: same interface, holds a reference to the service and manages its lifecycle
class MandarinProxy implements Emperor {
  private emperor: RealEmperor | null = null

  constructor(private readonly permitted: Set<string>) {}

  grantAudience(name: string, petition: string): string {
    // Protection proxy: only officials on the list get through
    if (!this.permitted.has(name)) return \`🚫 \${name} không được yết kiến\`

    // Virtual proxy: summon the Emperor only for the first valid petition
    if (this.emperor === null) this.emperor = new RealEmperor()

    return this.emperor.grantAudience(name, petition)
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

const court = new CourtSession(new MandarinProxy(new Set(['Tể tướng', 'Đại tướng'])))
court.submitPetition('Dân thường', 'giảm thuế')
court.submitPetition('Tể tướng', 'mở khoa thi')
court.submitPetition('Đại tướng', 'đắp đê sông Hồng')`,
      },
    ],
    structure_notes: {
      en: 'The Service Interface declares the interface of the Service; the proxy must follow it to pass as a service object. The Service is a class that provides some useful business logic. The Proxy has a field that references a service object. After the proxy finishes its own processing (lazy initialization, logging, access control, caching and so on), it passes the request to the service object. Proxies usually manage the full life cycle of their service objects. The Client works with services and proxies through the same interface, so you can pass a proxy into any code that expects a service object. In this example the proxy combines two of these jobs: access control (the permitted field) and lazy initialization (the emperor field).',
      vi: 'Service Interface khai báo giao diện của Service; proxy phải tuân theo giao diện này để có thể đóng vai đối tượng dịch vụ. Service là lớp cung cấp một logic nghiệp vụ hữu ích nào đó. Proxy có một trường tham chiếu tới đối tượng dịch vụ. Sau khi xử lý xong phần việc của mình (khởi tạo trễ, ghi log, kiểm soát truy cập, cache, v.v.), proxy chuyển yêu cầu cho đối tượng dịch vụ. Thông thường proxy quản lý toàn bộ vòng đời của đối tượng dịch vụ. Client làm việc với cả dịch vụ lẫn proxy qua cùng một giao diện, nhờ đó bạn có thể truyền proxy vào bất kỳ đoạn mã nào đang cần một đối tượng dịch vụ. Trong ví dụ này, proxy kết hợp hai việc trong số đó: kiểm soát truy cập (trường permitted) và khởi tạo trễ (trường emperor).',
    },
  },
]
