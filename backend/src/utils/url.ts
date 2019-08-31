export const urlNormalizer = (url: string) => {
  return url.replace(/([^:]\/)\/+/g, '$1')
}

export const isUrl = (url: string) => {
  const pattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/

  return pattern.test(url)
}
