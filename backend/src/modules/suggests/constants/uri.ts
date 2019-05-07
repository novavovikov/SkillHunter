export enum SUGGESTS {
  position,
  skill
}

export const HH_URI = {
  [SUGGESTS.position]: 'http://api.hh.ru/suggests/positions?text=',
  [SUGGESTS.skill]: 'http://hh.ru/autosuggest/multiprefix/v2?d=key_skill&q='
}
