import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm'
import { Skill } from '../skill/skill.entity'
import { UserResource } from '../user-resource/user-resource.entity'
import { User } from '../user/user.entity'

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column({ nullable: true })
  title: string

  @Column({ type: 'simple-array', nullable: true })
  author: string[]

  @Column()
  link: string

  @Column({ nullable: true })
  picture: string

  @Column({ default: true })
  accepted: boolean

  @ManyToMany(() => Skill, (skill: Skill) => skill.resources, { cascade: true })
  @JoinTable({ name: 'skill_resources' })
  skills: Skill[]

  @ManyToMany(() => User, (user: User) => user.likedResources, { cascade: true })
  @JoinTable({ name: 'resource_likes' })
  usersLikes: User[]

  @RelationId((resource: Resource) => resource.usersLikes)
  userIdsLikes: number[]

  @OneToMany(() => UserResource, (userResource: UserResource) => userResource.resource)
  userResources: UserResource[]
}
