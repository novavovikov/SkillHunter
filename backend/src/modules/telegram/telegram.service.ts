import { HttpService, Injectable } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { TELEGRAM_URI } from './constants/telegram'

@Injectable()
export class TelegramService {
  constructor (
    private readonly http: HttpService,
  ) {}

  sendMessage (chatId: number | string, text: string) {
    try {
      return this
        .http.get(encodeURI(`${TELEGRAM_URI}/sendMessage?chat_id=${chatId}&text=${text}`))
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
