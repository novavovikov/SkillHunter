import { urlNormalizer } from './url'

export enum SHARE_SITES {
  facebook,
  twitter,
  linkedIn,
  reddit,
  vk,
  telegram
}

const SITES_LINKS = {
  [SHARE_SITES.facebook]: 'https://www.facebook.com/sharer/sharer.php',
  [SHARE_SITES.twitter]: 'https://twitter.com/share',
  [SHARE_SITES.linkedIn]: 'https://linkedin.com/shareArticle',
  [SHARE_SITES.reddit]: 'https://www.reddit.com/submit',
  [SHARE_SITES.vk]: 'https://vk.com/share.php',
  [SHARE_SITES.telegram]: 'https://telegram.me/share',
}

export interface ShareParams {
  url: string
  text: string
  via?: string
  hashTags?: string[]
}

const QUERY_KEYS: any = {
  [SHARE_SITES.facebook]: {
    u: 'url',
    quote: 'text',
    hashTag: 'hashTags',
  },
  [SHARE_SITES.twitter]: {
    url: 'url',
    text: 'text',
    via: 'via',
    hashtags: 'hashTags',
  },
  [SHARE_SITES.linkedIn]: {
    url: 'url',
  },
  [SHARE_SITES.reddit]: {
    url: 'url',
    title: 'text',
  },
  [SHARE_SITES.vk]: {
    url: 'url',
    title: 'text',
    description: 'description',
    image: 'image',
  },
  [SHARE_SITES.telegram]: {
    url: 'url',
    title: 'text',
  },
}

const paramsToQueryKeys = (site: SHARE_SITES, params?: any) => {
  const queryKeys = QUERY_KEYS[site]

  if (!queryKeys) {
    return {}
  }

  return Object.keys(queryKeys).reduce((acc, key: string) => {
    const param = queryKeys[key]
    const paramValue = params[param]

    if (paramValue) {
      return {
        ...acc,
        [key]: paramValue,
      }
    }

    return acc
  }, {})
}

const objectToGetParams = (object?: any) => {
  if (!object) {
    return ''
  }

  const query = new URLSearchParams()

  for (const param in object) {
    query.append(param, object[param])
  }

  return `?${query.toString()}`
}

export const getShareLink = (site: SHARE_SITES, params: ShareParams) => {
  const url = SITES_LINKS[site]
  const queryParams = paramsToQueryKeys(site, params)
  const query = objectToGetParams(queryParams)

  return urlNormalizer(`${url}${query}`)
}
