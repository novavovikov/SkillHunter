import TagManager from 'react-gtm-module'

export const initAnalytics = () => {
  TagManager.initialize({
    gtmId: 'GTM-K4FPF86',
  })
}

export const analytics = (event: any) => {
  if (!event) {
    return
  }

  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = []
  }

  window.dataLayer.push(event)
}
