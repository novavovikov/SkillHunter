import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Skill } from '../skill/skill.entity'
import { User } from '../user/user.entity'

@Entity()
export class Skillset {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column({ unique: true })
  name: string

  @Column({ default: false })
  accepted: boolean

  @ManyToMany(() => Skill, (skill: Skill) => skill.skillsets)
  @JoinTable({ name: 'skillset_skills' })
  skills: Skill[]

  @ManyToMany(() => User, (user: User) => user.skillsets)
  users: User[]
}
