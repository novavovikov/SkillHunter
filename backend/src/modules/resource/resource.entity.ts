import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import { ResourceType } from '../../constants/resource-type'
import { Skill } from '../skill/skill.entity'
import { User } from '../user/user.entity'

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column({ default: ResourceType.article })
  type: ResourceType

  @Column()
  title: string

  @Column({ unique: true })
  link: string

  @Column()
  icon: string

  @ManyToMany(() => User, (user: User) => user.resources)
  users: User[]

  @ManyToMany(() => Skill, (skill: Skill) => skill.resources, { cascade: true })
  @JoinTable({ name: 'skill_resources' })
  skills: Skill[]

  @ManyToMany(() => User, (user: User) => user.likedResources, { cascade: true })
  @JoinTable({ name: 'resource_likes' })
  usersLikes: User[]

  @RelationId((resource: Resource) => resource.usersLikes)
  userIdsLikes: number[]
}
