export const unique = (data: any[], key: string = 'id') => data.
  reduce((acc, item) => (
    acc.find(s => s[key] === item[key])
      ? acc
      : [...acc, item]
  ), [])
