import * as user from './user'
import * as skills from './skills'
import * as resources from './resources'
import * as notifications from './notifications'
import * as loading from './loading'

export default {
  ...user,
  ...skills,
  ...resources,
  ...notifications,
  ...loading
}
