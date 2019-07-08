export const generateHash = () => Math.random().toString(36).substring(7)

export class Hash {
  static readonly algorithm = 'SHA-256'

  static hexString (buffer: ArrayBuffer) {
    const byteArray = new Uint8Array(buffer)

    const hexCodes = [...byteArray].map(value => {
      const hexCode = value.toString(16)
      return hexCode.padStart(2, '0')
    })

    return hexCodes.join('')
  }

  static async generate (message: string | number) {
    const encoder = new TextEncoder()
    const data = encoder.encode(message as any)
    const buffer = await window.crypto.subtle.digest(Hash.algorithm, data)

    return await Hash.hexString(buffer)
  }

  static generateNumeric (text: string) {
    return Array.from(text).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0)
  }
}
