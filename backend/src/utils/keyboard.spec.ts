import { generateKeyboard } from './keyboard'

const DATA = [
  { id: 1, nested: { value: '1' } },
  { id: 2, nested: { value: '2' } },
  { id: 3, nested: { value: '3' } },
  { id: 4, nested: { value: '4' } },
  { id: 5, nested: { value: '5' } },
  { id: 6, nested: { value: '6' } },
  { id: 7, nested: { value: '7' } },
]

describe(('keyboard'), () => {
  test('should return array of double array', () => {
    expect(generateKeyboard(DATA, { field: 'nested.value' })).toEqual([
      [{ text: '1', callback_data: 1 }, { text: '2', callback_data: 2 }],
      [{ text: '3', callback_data: 3 }, { text: '4', callback_data: 4 }],
      [{ text: '5', callback_data: 5 }, { text: '6', callback_data: 6 }],
      [{ text: '7', callback_data: 7 }],
    ])
  })

  test('should return array of triple array', () => {
    expect(generateKeyboard(DATA, { count: 3, field: 'nested.value' })).toEqual([
      [{ text: '1', callback_data: 1 }, { text: '2', callback_data: 2 }, { text: '3', callback_data: 3 }],
      [{ text: '4', callback_data: 4 }, { text: '5', callback_data: 5 }, { text: '6', callback_data: 6 }],
      [{ text: '7', callback_data: 7 }],
    ])
  })

  test('should return array of fourth array', () => {
    expect(generateKeyboard(DATA, { count: 4, field: 'nested.value' })).toEqual([
      [
        { text: '1', callback_data: 1 },
        { text: '2', callback_data: 2 },
        { text: '3', callback_data: 3 },
        { text: '4', callback_data: 4 },
      ],
      [
        { text: '5', callback_data: 5 },
        { text: '6', callback_data: 6 },
        { text: '7', callback_data: 7 },
      ],
    ])
  })
})
