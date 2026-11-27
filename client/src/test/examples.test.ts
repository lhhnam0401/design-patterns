/// <reference types="node" />
import { describe, expect, it } from 'vitest'
import { allPatterns } from '../data'
import { DESIGNS as LANTERN_DESIGNS } from '../scenes/flyweight'
import { codeFor } from './codeNames'
import { runTypeScript } from './sampleRunner'

const patternOf = (slug: string) => {
  const pattern = allPatterns.find(p => p.slug === slug)
  if (!pattern) throw new Error(`No pattern ${slug}`)
  return pattern
}

/** The source text of one class, from its declaration to the next top-level declaration. */
function classBody(code: string, name: string): string {
  const start = code.indexOf(`class ${name}`)
  if (start === -1) throw new Error(`No class ${name}`)
  const rest = code.slice(start + 1)
  const next = rest.search(/\n(?:abstract class|class|interface|type|function|const) /)
  return next === -1 ? code.slice(start) : code.slice(start, start + 1 + next)
}

describe('adapter example', () => {
  const pattern = patternOf('adapter')
  const ts = codeFor(pattern, 'typescript')

  it('records the đàn tranh through the same interface as a MIDI keyboard', () => {
    const output = runTypeScript(ts)
    expect(output).toContain('🎙️ Đã thu: nốt 60 (velocity 90), nốt 62 (velocity 90)')
    expect(output).toContain('🎙️ Đã thu: nốt 60 (velocity 110), nốt 65 (velocity 80), nốt 69 (velocity 40)')
  })

  it('has the software read notes from the client interface', () => {
    const target = pattern.diagram.nodes.find(n => n.id === 'target')!
    expect(target.methods).toEqual(['+ readNote(): MidiNote | null'])
  })

  it('lets the adapter pull each pluck from the zither and return a note', () => {
    const adapter = classBody(ts, 'ZitherMidiAdapter')
    expect(adapter).toContain('readNote(): MidiNote | null')
    expect(adapter).toContain('this.zither.nextPluck()')
  })
})

describe('flyweight example', () => {
  it('shares as many lantern designs as the scene draws', () => {
    const output = runTypeScript(codeFor(patternOf('flyweight'), 'typescript'))
    const summary = output.find(line => /flyweight$/.test(line))
    expect(summary).toBe(`10006 đèn lồng, ${LANTERN_DESIGNS.length} flyweight`)
  })
})

describe('proxy example', () => {
  it('turns away an unlisted petitioner and summons the Emperor once, for the first permitted petition', () => {
    expect(runTypeScript(codeFor(patternOf('proxy'), 'typescript'))).toEqual([
      '🚫 Dân thường không được yết kiến',
      '👑 Triệu Hoàng đế ra điện Kính Thiên',
      "Hoàng đế phán: chuẩn tấu việc 'mở khoa thi'",
      "Hoàng đế phán: chuẩn tấu việc 'đắp đê sông Hồng'",
    ])
  })
})

describe('chain of responsibility example', () => {
  const ts = codeFor(patternOf('chain-of-responsibility'), 'typescript')
  const ranks = ['VillageChief', 'DistrictMagistrate', 'Prefect', 'Emperor']

  it('gives each official in the chain more authority than the one before', () => {
    ranks.forEach((name, i) => expect(classBody(ts, name)).toContain(`petition.level <= ${i + 1}`))
  })

  it('stops each petition at the lowest official who may settle it', () => {
    expect(runTypeScript(ts)).toEqual([
      'Dân nộp đơn ở xã:',
      'Xã trưởng hòa giải: tranh chấp bờ ruộng',
      'Quan huyện xét xử: mất trộm trâu',
      'Tri phủ giải quyết: đê sông Hồng sắp vỡ',
      'Hoàng đế 👑 ra chiếu: giặc tràn qua biên giới',
      '❌ Không quan nào đủ quyền xử: xin trời làm mưa',
      'Đơn nộp thẳng lên huyện:',
      'Quan huyện xét xử: lấn đất làng bên',
    ])
  })
})

describe('mediator example', () => {
  const ts = codeFor(patternOf('mediator'), 'typescript')
  const villagers = ['Farmer', 'Merchant', 'Potter']

  it('keeps every villager unaware of the others', () => {
    for (const name of villagers) {
      const body = classBody(ts, name)
      for (const other of villagers.filter(v => v !== name)) expect(body).not.toMatch(new RegExp(`\\b${other}\\b`))
    }
  })

  it('has the council buy the shortfall and size the jar order to the rice', () => {
    const output = runTypeScript(ts)
    expect(output).toContain('💰 Thương nhân Lê: mua 40 thúng lúa ở làng bên')
    expect(output).toContain('⚖️ Hội đồng: 100 thúng lúa cần 10 chum')
    expect(output).toContain('🏺 Thợ gốm Trần: nặn xong 10 chum')
  })
})

describe('memento example', () => {
  const pattern = patternOf('memento')
  const ts = codeFor(pattern, 'typescript')

  it('saves a chess board instead of a king who undoes a war', () => {
    const labels = pattern.diagram.nodes.map(n => n.label)
    expect(labels).not.toContain('HungKing')
    expect(labels).toEqual(expect.arrayContaining(['ChessBoard', 'BoardSnapshot', 'Snapshot', 'MoveHistory']))
  })

  it('puts the captured soldier back and gives the move back to Red', () => {
    const output = runTypeScript(ts)
    expect(output).toContain('Thế cờ: Đỏ 16 quân, Đen 15 quân, lượt Đen')
    expect(output).toContain('↩️ Rút lại "Nước 3: Pháo 5 tấn 4": Đỏ 16 quân, Đen 16 quân, lượt Đỏ')
    expect(output.at(-1)).toBe('📒 Sổ ghi: Nước 1: Pháo 2 bình 5 | Nước 2: Mã 8 tấn 7 | Nước 3: Mã 2 tấn 3')
  })

  it('lets the caretaker read nothing but labels', () => {
    const caretaker = classBody(ts, 'MoveHistory')
    expect(caretaker).not.toMatch(/getState|BoardSnapshot/)
  })
})

describe('interpreter example', () => {
  const ts = codeFor(patternOf('interpreter'), 'typescript')

  it('reads three amounts written in words', () => {
    const totals = runTypeScript(ts).filter(line => line.startsWith('→')).map(line => line.split(' = ').at(-1))
    expect(totals).toEqual(['75.000', '605.000', '1.024.000'])
  })

  it('keeps parsing in the client, outside the expression classes', () => {
    for (const name of ['NumberWord', 'Multiply', 'Add']) expect(classBody(ts, name)).not.toMatch(/\bparse\b/)
  })
})
