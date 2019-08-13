import { EResourceTypes } from '../../types'
import articleIcon from './icons/article.svg'
import bookIcon from './icons/book.svg'
import courseIcon from './icons/course.svg'
import mediaIcon from './icons/media.svg'

export const getIconByType = (type: EResourceTypes) => {
  switch (type) {
    case EResourceTypes.Article:
      return articleIcon
    case EResourceTypes.Media:
      return mediaIcon
    case EResourceTypes.Book:
      return bookIcon
    case EResourceTypes.Course:
      return courseIcon
    default:
      return articleIcon
  }
}
