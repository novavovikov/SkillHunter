import TagManager from 'react-gtm-module'

interface Event {
  event: string
}

export const initAnalytics = () => {
  const { NODE_ENV } = process.env as any
  window.dataLayer = window.dataLayer || []

  if (NODE_ENV === 'production') {
    TagManager.initialize({
      gtmId: 'GTM-K4FPF86',
    })
  }
}

export const analytics = (event: Required<Event> & any) => {
  window.dataLayer.push(event)
}
