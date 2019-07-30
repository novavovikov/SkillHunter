import TagManager from 'react-gtm-module'

interface Event {
  event: string
}

export const initAnalytics = () => {
  window.dataLayer = window.dataLayer || []

  TagManager.initialize({
    gtmId: 'GTM-K4FPF86',
  })
}

export const analytics = (event: Required<Event> & any) => {
  window.dataLayer.push(event)
}
