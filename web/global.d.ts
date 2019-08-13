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
