import { Injectable } from '@nestjs/common'
import { User } from '../user/user.entity'
import { UserResourceService } from '../user-resource/user-resource.service'
import { UserResourceStatusType } from '../../constants/status-type'
import { UserResource } from '../user-resource/user-resource.entity'

@Injectable()
export class ActivityService {
  constructor (
    private userResourceService: UserResourceService,
  ) {}

  async progressByUserResources (user: User, data: Partial<UserResource>) {
    const resources = await this.userResourceService.find({
      user,
      ...data,
    }, {
      select: ['status'],
    })

    const statusCounters = resources.reduce((acc, { status }) => {
      const count = acc[status]

      return {
        ...acc,
        [status]: count + 1,
      }
    }, {
      [UserResourceStatusType.Backlog]: 0,
      [UserResourceStatusType.Plan]: 0,
      [UserResourceStatusType.Done]: 0,
    })

    return {
      Total: resources.length,
      ...statusCounters
    }
  }
}
