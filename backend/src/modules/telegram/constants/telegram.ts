export const TELEGRAM_BOT_ID = process.env.TELEGRAM_BOT_ID

export const TELEGRAM_URI_BY_ENV = {
  production: `https://api.telegram.org/bot`,
  development: `https://app.skillhunter.io/api/telegram/`,
}

export const TELEGRAM_URI = `${TELEGRAM_URI_BY_ENV[process.env.NODE_ENV]}${TELEGRAM_BOT_ID}`
