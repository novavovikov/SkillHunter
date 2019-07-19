import { UserResource } from '../modules/user-resource/user-resource.entity'

export const textNormalizer = (text: string) => {
  const trimmedText = text.trim()
  return trimmedText.trim().substring(0, 1).toUpperCase() + trimmedText.substring(1)
}

export const getUserResourceWithLikedField = (
  userResource: UserResource,
  userId: number,
) => {
  const { userIdsLikes } = userResource.resource

  return {
    ...userResource,
    isLiked: userIdsLikes ? userIdsLikes.includes(userId) : false,
  }
}
