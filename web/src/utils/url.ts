export const urlNormalizer = (url: string) => {
  return url.replace(/([^:]\/)\/+/g, '$1')
}

export const validateUrl = (url: string) => {
  const regExp =  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

  return regExp.test(url)
}

export const getUrl = (url: string): URL | null => {
  try {
    const isValid = validateUrl(url)

    if (!isValid) {
      throw new Error('invalid url')
    }

    return new URL(url)
  } catch (e) {
    return null
  }
}

export const getUrlFromClipboard = () => {
  return navigator
    .clipboard
    .readText()
    .then(getUrl)
    .catch(() => null)
}

export const addParamToQuery = (
  search: string,
  param: string,
  value: string,
) => {
  const urlSearchParams = new URLSearchParams(search)
  urlSearchParams.append(param, value)

  return urlSearchParams.toString()
}

export const deleteParamFromQuery = (
  search: string,
  param: string,
) => {
  const urlSearchParams = new URLSearchParams(search)
  urlSearchParams.delete(param)

  return urlSearchParams.toString()
}
