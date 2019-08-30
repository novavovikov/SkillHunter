import { getUrl } from './url'

export const getVideoURL = (link: string): string | null => {
  const url = getUrl(link)

  if (!url) {
    return null
  }

  if (url.host.includes('youtube.com')) {
    const videoId = url.searchParams.get('v')
    return videoId && `//www.youtube.com/embed/${videoId}`
  }

  if (url.host.includes('vimeo.com')) {
    return `//player.vimeo.com/video${url.pathname}`
  }

  if (url.host.includes('coub.com')) {
    const pathname = url.pathname.split('/')
    const videoId = pathname.slice(-1).pop()
    return `//coub.com/embed/${videoId}`
  }

  if (url.host.includes('ted.com')) {
    return `//embed.ted.com/${url.pathname}`
  }

  return null
}
