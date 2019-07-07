import { HttpService, Injectable } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { urlNormalizer } from './url'

@Injectable()
export class Favicon {
  constructor (
    private readonly http: HttpService,
  ) {}

  getFaviconFromDocument = async (document: Document, urlOrigin?: string) => {
    let icon: HTMLLinkElement = document.querySelector('link[rel=icon]')

    if (!icon) {
      icon = document.querySelector('link[rel="shortcut icon"]')
    }

    if (!icon && urlOrigin) {
      const iconUrl = urlNormalizer(`${urlOrigin}/favicon.ico`)

      return await this.checkFaviconUrl(iconUrl) ? iconUrl : null
    }

    const href = icon && icon.href

    if (href && !href.includes('http')) {
      return urlNormalizer(`${urlOrigin}/${href}`)
    }

    if (href) {
      return urlNormalizer(href)
    }

    return null
  }

  async checkFaviconUrl (iconUrl: string) {
    try {
      await this.http.get(iconUrl).
        pipe(map((res) => res)).
        toPromise()

      return true
    } catch (e) {
      return false
    }
  }
}
