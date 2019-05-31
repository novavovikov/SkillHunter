import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RoleType } from '../../constants/role-type'
import { Profession } from '../profession/profession.entity'
import { Resource } from '../resource/resource.entity'
import { Skill } from '../skill/skill.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column({ type: 'enum', enum: RoleType, default: RoleType.User })
  role: RoleType

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  picture: string

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  locale: string

  @Column({ nullable: true })
  googleId: string

  @Column({ nullable: true })
  facebookId: string

  @ManyToMany(() => Skill, (skill: Skill) => skill.users, { cascade: true })
  @JoinTable({ name: 'user_skills' })
  skills: Skill[]

  @ManyToMany(() => Profession, (profession: Profession) => profession.users, { cascade: true })
  @JoinTable({ name: 'user_professions' })
  professions: Profession[]

  @ManyToMany(() => Resource, (resource: Resource) => resource.users, { cascade: true })
  @JoinTable({ name: 'user_resources' })
  resources: Resource[]

  @ManyToMany(() => Resource, (resource: Resource) => resource.usersLikes)
  likedResources: Resource[]
}
