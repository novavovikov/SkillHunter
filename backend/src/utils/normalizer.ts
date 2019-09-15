import { UserResource } from '../modules/user-resource/user-resource.entity'

export const textNormalizer = (text: string) => {
  const trimmedText = text.trim()
  return (
    trimmedText
      .trim()
      .substring(0, 1)
      .toUpperCase() + trimmedText.substring(1)
  )
}

export const getUserResourceWithLikedField = (
  userId: number,
  userResource: UserResource
) => {
  const { userIdsLikes } = userResource.resource

  return {
    ...userResource,
    isAuthorized: true,
    viewOnly: userResource.ownerUserId !== userId,
    isLiked: userIdsLikes ? userIdsLikes.includes(userId) : false,
  }
}

export const excludeFieldsFromObject = (fields: string[], data: object) => {
  return Object.keys(data).reduce((result, fieldName: string) => {
    if (fields.includes(fieldName)) {
      return result
    }

    return {
      ...result,
      [fieldName]: data[fieldName],
    }
  }, {})
}
