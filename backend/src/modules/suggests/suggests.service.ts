import { HttpService, Injectable } from '@nestjs/common'
import { map } from 'rxjs/operators'

@Injectable()
export class SuggestsService {
  constructor (private readonly http: HttpService) {}

  async getByPosition (position: string) {
    return await this.http
    .get(encodeURI(`https://api.hh.ru/suggests/positions?text=${position}`))
    .pipe(map(({ data }) => data))
  }

  async getBySkill (skill: string) {
    return await this.http
    .get(encodeURI(`https://hh.ru/autosuggest/multiprefix/v2?d=key_skill&q=${skill}`))
    .pipe(map(({ data }) => data))
  }
}
