import { HttpService, Injectable } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { isUrl, urlNormalizer } from './url'

@Injectable()
export class Favicon {
  constructor (
    private readonly http: HttpService,
  ) {}

  getFaviconFromDocument = async (
    document: Document,
    urlOrigin?: string
  ) => {
    let icon: HTMLLinkElement = document.querySelector('link[rel=icon]')

    if (!icon) {
      icon = document.querySelector('link[rel="shortcut icon"]')
    }

    if (!icon && urlOrigin) {
      return this.validateFaviconUrl(`${urlOrigin}/favicon.ico`)
    }

    const href = icon && icon.href

    if (href && isUrl(href)) {
      return this.validateFaviconUrl(href)
    }

    if (href) {
      return this.validateFaviconUrl(`${urlOrigin}/${href}`)
    }

    return null
  }

  async validateFaviconUrl (iconUrl: string) {
    const url = urlNormalizer(iconUrl)

    try {
      await this.http.get(url).
        pipe(map((res) => res)).
        toPromise()

      return url
    } catch (e) {
      return null
    }
  }
}
