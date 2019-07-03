import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
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

  @ManyToOne(() => UserSkill, (userSkill: UserSkill) => userSkill.userResources, { eager: true })
  userSkill: UserSkill

  @ManyToOne(() => Resource, (resource: Resource) => resource.userResources, { eager: true })
  resource: Resource
}
