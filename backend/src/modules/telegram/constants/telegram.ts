export const TELEGRAM_BOT_ID = process.env.TELEGRAM_BOT_ID

export const TELEGRAM_URI_BY_ENV = {
  production: `https://app.skillhunter.io/api/telegram/`,
  development: `https://api.telegram.org/bot`,
}

export const TELEGRAM_URI = `${TELEGRAM_URI_BY_ENV[process.env.NODE_ENV]}${TELEGRAM_BOT_ID}`
