export const logger = (place: string, error: Error) => {
  console.warn(`${place}: ${error}`)
}
