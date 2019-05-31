import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Profession } from '../profession/profession.entity'
import { Resource } from '../resource/resource.entity'
import { User } from '../user/user.entity'

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column({
    unique: true,
  })
  name: string

  @Column({
    default: false
  })
  accepted: boolean

  @ManyToMany(() => User, (user: User) => user.skills)
  users: User[]

  @ManyToMany(() => Profession, (profession: Profession) => profession.skills)
  professions: Profession[]

  @ManyToMany(() => Resource, (resource: Resource) => resource.skills)
  resources: Resource[]
}
