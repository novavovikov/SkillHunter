export const urlNormalizer = (url: string) => {
  return url.replace(/([^:]\/)\/+/g, '$1')
}
