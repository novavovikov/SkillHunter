export enum SUGGESTS {
  profession,
  skill
}

export const HH_URI = {
  [SUGGESTS.profession]: 'http://api.hh.ru/suggests/positions?text=',
  [SUGGESTS.skill]: 'http://hh.ru/autosuggest/multiprefix/v2?d=key_skill&q='
}
