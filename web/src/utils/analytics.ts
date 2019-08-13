import TagManager from 'react-gtm-module'

interface Event {
  event: string
}

export const initAnalytics = () => {
  const { NODE_ENV } = process.env
  window.dataLayer = window.dataLayer || []

  if (NODE_ENV === 'production') {
    TagManager.initialize({
      gtmId: 'GTM-K4FPF86',
    })
  }
}

export const analytics = (analyticEvent: Required<Event> & any) => {
  window.dataLayer.push(analyticEvent)

  if (window.amplitude) {
    const { event, ...rest } = analyticEvent

    console.log(window.amplitude.getInstance().Identify)

    window.amplitude.getInstance().logEvent(event, rest)
  }
}
