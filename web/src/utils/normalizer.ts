export const textNormalizer = (text: string) => {
  const trimmedText = text.trim()
  return trimmedText.trim().substring(0, 1).toUpperCase() + trimmedText.substring(1)
}
