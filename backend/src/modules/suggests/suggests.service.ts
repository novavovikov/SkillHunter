import { HttpService, Injectable } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { HH_URI, SUGGESTS } from './constants/uri'

@Injectable()
export class SuggestsService {
  constructor (private readonly http: HttpService) {}

  async getDataFromHH (type: SUGGESTS, query: string) {
    return await this.http
    .get(encodeURI(`${HH_URI[type]}${query}`))
    .pipe(map(({ data }) => data))
  }
}
