import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserResourceStatusType } from '../../constants/status-type'
import { Resource } from '../resource/resource.entity'
import { User } from '../user/user.entity'

@Entity()
@Index(['user', 'skillsetId', 'skillId', 'resource'], { unique: true })
export class UserResource {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user: User) => user.resources)
  user: User

  @Column()
  skillsetId: number

  @Column()
  skillId: number

  @Column({ type: 'enum', enum: UserResourceStatusType, default: UserResourceStatusType.Backlog })
  status: string

  @ManyToOne(() => Resource, (resource: Resource) => resource.userResources, { eager: true })
  resource: Resource
}
