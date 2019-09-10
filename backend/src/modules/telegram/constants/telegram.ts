export const TELEGRAM_BOT_ID = process.env.TELEGRAM_BOT_ID

export const TELEGRAM_CACHE_KEY = `tg`

export const TELEGRAM_URI_BY_ENV = {
  prod: `https://api.telegram.org/bot`,
  // proxy server for local development
  dev: `https://app.skillhunter.io/api/telegram/`,
}

export const TELEGRAM_URI = `${TELEGRAM_URI_BY_ENV[process.env.NODE_ENV]}${TELEGRAM_BOT_ID}`
