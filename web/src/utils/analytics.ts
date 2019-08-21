import TagManager from 'react-gtm-module'
import { PAGE_VIEW_EVENT } from '../constants/analytics'

interface Event {
  event: string
  userId?: number
  [key: string]: any
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

export const analytics = (analyticEvent: Event) => {
  window.dataLayer.push(analyticEvent)

  if (!window.amplitude) {
    return null
  }

  const amplitude =  window.amplitude.getInstance()
  const { event, ...properties } = analyticEvent

  if (event === PAGE_VIEW_EVENT && properties.userId) {
    const { userId, ...otherProperties } = properties

    amplitude.setUserId(String(userId))
    amplitude.setUserProperties(otherProperties)
  } else {
    amplitude.logEvent(event, properties)
  }
}
