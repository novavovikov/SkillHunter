export const analytics = (analyticEvent) => {
  if (!dataLayer) {
    return null
  }

  dataLayer.push(analyticEvent)

  if (amplitude) {
    const { event, ...rest } = analyticEvent

    amplitude.getInstance().logEvent(event, rest)
  }
}
