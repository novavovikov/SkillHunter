export const urlNormalizer = (url: string) => {
  return url.replace(/([^:]\/)\/+/g, '$1')
}

export const getUrl = (url: string) => {
  try {
    return new URL(url)
  } catch (e) {
    return null
  }
}

export const getUrlFromClipboard = () => {
  return navigator.
    clipboard.
    readText().
    then((url: string) => {
      return getUrl(url)
    }).
    catch(() => {
      return null
    })
}
