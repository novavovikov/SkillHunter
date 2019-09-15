import { HttpService, Injectable } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { TELEGRAM_URI } from './constants/telegram'

@Injectable()
export class TelegramService {
  constructor(private readonly http: HttpService) {}

  sendEvent(method: string, params: any) {
    try {
      return this.http
        .post(`${TELEGRAM_URI}/${method}`, params)
        .pipe(map(({ data }) => data))
        .toPromise()
        .catch(err => {
          console.log('TelegramService: ', err)
          return []
        })
    } catch (err) {
      return []
    }
  }
}
