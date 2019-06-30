import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Skillset } from '../skillset/skillset.entity'
import { Resource } from '../resource/resource.entity'
import { UserSkill } from '../user-skill/user-skill.entity'

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column({ unique: true })
  name: string

  @Column({ default: false })
  accepted: boolean

  @ManyToMany(() => Skillset, (skillset: Skillset) => skillset.skills)
  skillsets: Skillset[]

  @ManyToMany(() => Resource, (resource: Resource) => resource.skills)
  resources: Resource[]

  @OneToMany(() => UserSkill, (userSkill: UserSkill) => userSkill.skill)
  userSkills: UserSkill[]
}
