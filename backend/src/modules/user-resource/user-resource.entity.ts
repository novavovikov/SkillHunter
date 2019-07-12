import { AfterLoad, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ResourceType } from '../../constants/resource-type'
import { UserResourceStatusType } from '../../constants/status-type'
import { Resource } from '../resource/resource.entity'
import { UserSkill } from '../user-skill/user-skill.entity'
import { User } from '../user/user.entity'

@Entity()
@Index(['user', 'skillsetId', 'userSkill', 'resource'], { unique: true })
export class UserResource {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user: User) => user.resources)
  user: User

  @Column()
  skillsetId: number

  @Column({ type: 'enum', enum: UserResourceStatusType, default: UserResourceStatusType.Backlog })
  status: string

  @Column({ nullable: true })
  author: string

  @Column({ nullable: true })
  title: string

  @Column({ default: ResourceType.article })
  type: ResourceType

  @ManyToOne(() => UserSkill, (userSkill: UserSkill) => userSkill.userResources, { eager: true })
  userSkill: UserSkill

  @ManyToOne(() => Resource, (resource: Resource) => resource.userResources, { eager: true })
  resource: Resource

  likes: number

  @AfterLoad()
  getLikes () {
    if (this.resource) {
      this.likes = this.resource.userIdsLikes.length
    }
  }
}
