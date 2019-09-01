import { HttpService, Injectable } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { TELEGRAM_URI } from './constants/telegram'

@Injectable()
export class TelegramService {
  constructor (
    private readonly http: HttpService,
  ) {}

  sendEvent (method: string, params: any ) {
    try {
      const query = new URLSearchParams(params).toString()

      return this
        .http.get(encodeURI(`${TELEGRAM_URI}/${method}?${query}`))
        .pipe(map(({ data }) => data))
        .toPromise()
        .then((data) => {
          console.log(2, data)
        })
        .catch(err => {
           console.log(3, err)
          return []
        })
    } catch (err) {
      return []
    }
  }
}
