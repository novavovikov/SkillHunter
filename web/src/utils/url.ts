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
