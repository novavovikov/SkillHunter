import * as app from './app'
import * as user from './user'
import * as userSettings from './userSettings'
import * as skillset from './skillset'
import * as skills from './skills'
import * as resources from './resources'
import * as recommendedResources from './recommendedResources'
import * as userSkill from './userSkill'
import * as notifications from './notifications'
import * as activity from './activity'
import * as loading from './loading'

export default {
  ...app,
  ...user,
  ...userSettings,
  ...skillset,
  ...skills,
  ...resources,
  ...recommendedResources,
  ...userSkill,
  ...notifications,
  ...activity,
  ...loading
}
