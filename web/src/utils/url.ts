export const urlNormalizer = (url: string) => {
  return url.replace(/([^:]\/)\/+/g, '$1')
}

export const validateUrl = (url: string) => {
  const regExp = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i

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
