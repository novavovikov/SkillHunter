export const ROUTES = {
  APP: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://app.skillhunter.io',

  HOME: '/',
  WELCOME: '/welcome',
  TOS: '/tos',
  COOKIE: '/cookie',
  LOGIN: '/login',
  LANDING: '/landing',
  AUTH: '/auth',
  SHARE: '/share',
  SETTINGS: '/settings',
  LOGOUT: '/logout',
  INTRODUCTION: '/introduction',
  LIBRARY: '/library',
  SKILL: '/skill',
  RESOURCE: '/resource',
  UPDATE: '/update',
  PLAN: '/plan',
}

export const CREATOR_SKILL_QUERY = {
  param: 'creator',
  value: 'skill',
}

export const SIDEBAR_QUERY = {
  param: 'sidebar',
  value: 'visible',
}
