import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { RoleType } from '../../constants/role-type'
import { Skillset } from '../skillset/skillset.entity'
import { Resource } from '../resource/resource.entity'
import { UserResource } from '../user-resource/user-resource.entity'
import { UserSkill } from '../user-skill/user-skill.entity'
import { UserSettings } from '../user-settings/user-settings.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.User,
  })
  role: RoleType

  @Column({ nullable: true })
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

  @Column({ nullable: true })
  telegramId: number

  @OneToOne(() => UserSettings, settings => settings.user, {
    cascade: true,
  })
  settings: UserSettings

  @ManyToMany(() => Resource, (resource: Resource) => resource.usersLikes)
  likedResources: Resource[]

  @ManyToMany(() => Skillset, (skillset: Skillset) => skillset.users, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'user_skillsets' })
  skillsets: Skillset[]

  @OneToMany(() => UserSkill, (userSkill: UserSkill) => userSkill.user)
  skills: UserSkill[]

  @OneToMany(
    () => UserResource,
    (userResource: UserResource) => userResource.user
  )
  resources: UserResource[]
}
