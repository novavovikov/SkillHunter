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
      const query = Object.keys(params).reduce(((query, param, i) => {
        const value = params[param]

        if (i === 0) {
          return `?${param}=${value}`
        }

        return `${query}&${param}=${value}`
      }))

      return this
        .http.get(encodeURI(`${TELEGRAM_URI}/${method}${query}`))
        .pipe(map(({ data }) => data))
        .toPromise()
        .then((data) => {
          console.log(2, data)
        })
        .catch(err => {
          return []
        })
    } catch (err) {
      return []
    }
  }
}
