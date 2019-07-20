import articleIcon from './icons/article.svg'
import bookIcon from './icons/book.svg'
import courseIcon from './icons/course.svg'
import mediaIcon from './icons/media.svg'

export const getIconByType = (type: string) => {
  switch (type) {
    case 'article':
      return articleIcon
    case 'media':
      return mediaIcon
    case 'book':
      return bookIcon
    case 'course':
      return courseIcon
    default:
      return articleIcon
  }
}
