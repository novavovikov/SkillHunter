import { Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Skill } from '../skill/skill.entity'

@Entity()
export class UserSkill {
  @PrimaryColumn()
  userId: number

  @PrimaryColumn()
  professionId: number

  @ManyToOne(() => Skill, (skill: Skill) => skill.userSkills, {
    eager: true,
  })
  skill: Skill
}
