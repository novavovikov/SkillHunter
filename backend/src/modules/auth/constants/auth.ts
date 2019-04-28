export const BACK_URL = '/login'

export const JWT_STRATEGY = {
  secretOrKey: 'db9ab144efb9b4b2db5b1daeb4900999',
  expiresIn: '12h'
}

export const GOOGLE_STRATEGY = {
  callbackURL: '/api/auth/google/callback',
  passReqToCallback: true,
  scope: ['profile', 'email'],
}

export const FACEBOOK_STRATEGY = {
  callbackURL: 'https://skillhunter.io/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email'],
}
