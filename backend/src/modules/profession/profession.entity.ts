import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Skill } from '../skill/skill.entity'
import { User } from '../user/user.entity'

@Entity()
export class Profession {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column({ unique: true })
  name: string

  @Column({ default: false })
  accepted: boolean

  @ManyToMany(() => Skill, (skill: Skill) => skill.professions)
  @JoinTable({ name: 'profession_skills' })
  skills: Skill[]

  @ManyToMany(() => User, (user: User) => user.professions)
  users: User[]
}
