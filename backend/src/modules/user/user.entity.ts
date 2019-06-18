import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RoleType } from '../../constants/role-type'
import { Profession } from '../profession/profession.entity'
import { Resource } from '../resource/resource.entity'
import { UserResource } from './userResource.entity'
import { UserSkill } from './userSkill.entity'

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

  @ManyToMany(() => Resource, (resource: Resource) => resource.usersLikes)
  likedResources: Resource[]

  @ManyToMany(() => Profession, (profession: Profession) => profession.users, { cascade: true })
  @JoinTable({ name: 'user_professions' })
  professions: Profession[]

  @OneToMany(() => UserSkill, (userSkill: UserSkill) => userSkill.user)
  skills: UserSkill[]

  @OneToMany(() => UserResource, (userResource: UserResource) => userResource.user)
  resources: UserResource[]
}
