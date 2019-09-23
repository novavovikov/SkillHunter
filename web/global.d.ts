declare module '*.gif' {
  const value: any
  export = value
}

declare module '*.png' {
  const value: any
  export = value
}

declare module '*.svg?inline' {
  const value: any
  export = value
}

declare module '*.svg' {
  const value: any
  export = value
}

declare module '*.json' {
  const value: any
  export = value
}

declare module 'unfluff' {
  interface Data {
    text: string,
    href: string
  }

  const value: {
    lazy: (html: any, locale: string) => {
      title: () => string
      softTitle: () => string
      date: () => string
      copyright: () => string
      author: () => string[]
      publisher: () => string
      text: () => string
      image: () => string
      tags: () => string[]
      videos: () => Data[]
      canonicalLink: () => string
      lang: () => string
      description: () => string
      favicon: () => string
      links: () => Data[]
    }
  }
  export = value
}

declare interface Navigator {
  share: any
}

declare interface Window {
  dataLayer: any[],
  process: {
    env: {
      NODE_ENV: 'production' | 'development'
    }
  },
  amplitude: {
    getInstance: () => {
      setUserId: (userId: string) => void,
      setUserProperties: (properties: any) => void,
      logEvent: (category: string, data: any) => void
    }
  }
}

interface Element {
  mozRequestFullScreen: () => void
  webkitRequestFullscreen: () => void
  msRequestFullscreen: () => void
}
