import { addMonths } from 'date-fns'

export const BACK_URL = '/login'

export const AUTH_COOKIE_OPTIONS = {
  domain: process.env.DOMAIN,
  path: '/',
  expires: addMonths(new Date(), 1)
}

export const JWT_STRATEGY = {
  secretOrKey: '0KPQsdC40LnQutCwINC80LDQutCw0YDQvtC9',
  expiresIn: '30d',
}

export const GOOGLE_STRATEGY = {
  callbackURL: '/api/auth/google/callback',
  passReqToCallback: true,
  scope: ['profile', 'email'],
}

export const FACEBOOK_STRATEGY = {
  // fb expects absolute path
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'photos', 'email'],
}
