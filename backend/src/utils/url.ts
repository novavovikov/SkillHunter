export const urlNormalizer = (url: string) => {
  const link = url.replace(/([^:]\/)\/+/g, '$1')

  if (!/^https?:/i.test(url)) {
    return `http:${link}`
  }
  return link
}

export const isUrl = (url: string) => {
  const pattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/

  return pattern.test(url)
}
