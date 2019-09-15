import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Skill } from '../skill/skill.entity'
import { UserResource } from '../user-resource/user-resource.entity'
import { User } from '../user/user.entity'

@Entity()
@Index(['user', 'skillsetId', 'skill'], { unique: true })
export class UserSkill {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user: User) => user.skills)
  user: User

  @Column()
  skillsetId: number

  @ManyToOne(() => Skill, (skill: Skill) => skill.userSkills, { eager: true })
  skill: Skill

  @OneToMany(
    () => UserResource,
    (userResource: UserResource) => userResource.userSkill,
    { cascade: true }
  )
  userResources: UserResource[]
}
