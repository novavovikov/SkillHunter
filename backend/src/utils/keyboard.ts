interface GenerateKeyboardOptions {
  count: number
  field: string
}

const initialOptions = {
  count: 2,
  field: 'value', // support nested (delimiter - dot)
}

export const generateKeyboard = (
  data: any[],
  options: Partial<GenerateKeyboardOptions> = {},
) => {
  const config = {
    ...initialOptions,
    ...options,
  }

  return data.reduce((acc, item) => {
    const lastRow = acc[acc.length - 1]
    const text = config.field.split('.').reduce((value, item) => {
      return value[item] || {}
    }, item)

    const button = {
      text,
      callback_data: item.id,
    }

    if (!lastRow) {
      return [[button]]
    }

    if (lastRow.length === config.count) {
      return [...acc, [button]]
    }

    if (acc.length === 1) {
      const [row] = acc

      return [[...row, button]]
    }

    const rows = acc.slice(0, -1)
    return [...rows, [...lastRow, button]]
  }, [])
}
