import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Profession } from '../profession/profession.entity'
import { Resource } from '../resource/resource.entity'
import { UserSkill } from '../user/userSkill.entity'

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

  @ManyToMany(() => Profession, (profession: Profession) => profession.skills)
  professions: Profession[]

  @ManyToMany(() => Resource, (resource: Resource) => resource.skills)
  resources: Resource[]

  @OneToMany(() => UserSkill, (userSkill: UserSkill) => userSkill.skill)
  userSkills: UserSkill[]
}
