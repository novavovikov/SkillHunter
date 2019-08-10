export const ROUTES = {
  HOME: '/',
  USERS: '/users',
  SUBSCRIBERS: '/subscribers',
  SKILLSETS: '/skillsets',
  SKILLS: '/skills',
  RESOURCES: '/resources',
}

export const MENU = [
  {
    label: 'Dashboard',
    to: ROUTES.HOME,
    exact: true
  },
  {
    label: 'Subscribers',
    to: ROUTES.SUBSCRIBERS
  },
  {
    label: 'Users',
    to: ROUTES.USERS,
  },
  {
    label: 'Skillsets',
    to: ROUTES.SKILLSETS,
  },
  {
    label: 'Skills',
    to: ROUTES.SKILLS,
  },
  {
    label: 'Resources',
    to: ROUTES.RESOURCES,
  },
]
