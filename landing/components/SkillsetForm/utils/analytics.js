export const analytics = (event) => {
  if (!dataLayer) {
    return null
  }

  return (
    dataLayer.push(event)
  )
}
