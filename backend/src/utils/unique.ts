export const unique = (data: any[], key: string = 'id') => data.
  reduce((acc, skill) => (
    acc.find(s => s[key] === skill[key])
      ? acc
      : [...acc, skill]
  ), [])
