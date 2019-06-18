import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Skill } from '../skill/skill.entity'
import { User } from './user.entity'

@Entity()
@Index(['user', 'professionId', 'skill'], { unique: true })
export class UserSkill {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user: User) => user.skills)
  user: User

  @Column()
  professionId: number

  @ManyToOne(() => Skill, (skill: Skill) => skill.userSkills, { eager: true })
  skill: Skill
}
