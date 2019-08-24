import * as user from './user'
import * as skillset from './skillset'
import * as skills from './skills'
import * as resources from './resources'
import * as recommendedResources from './recommendedResources'
import * as userSkill from './userSkill'
import * as notifications from './notifications'
import * as loading from './loading'

export default {
  ...user,
  ...skillset,
  ...skills,
  ...resources,
  ...recommendedResources,
  ...userSkill,
  ...notifications,
  ...loading
}
