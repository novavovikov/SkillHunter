import { HttpService, Injectable, Logger } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { HH_URI, SUGGESTS } from './constants/uri'

@Injectable()
export class SuggestsService {
  constructor (private readonly http: HttpService) {}

  async getDataFromHH (type: SUGGESTS, query: string) {
    try {
      return await this.http.get(encodeURI(`${HH_URI[type]}${query}`)).
        pipe(map(({ data }) => data)).
        toPromise().
        then(({ items }) => items.map(({ text }) => ({ name: text }))).
        catch(err => {
          Logger.log(JSON.stringify(err))
          return []
        })
    } catch (err) {
      Logger.log(JSON.stringify(err))

      return []
    }
  }
}
