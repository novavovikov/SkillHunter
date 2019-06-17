import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { Resource } from '../resource/resource.entity'

@Entity()
export class UserResource {
  @PrimaryColumn()
  userId: number

  @PrimaryColumn()
  professionId: number

  @PrimaryColumn()
  skillId: number

  @Column()
  status: string

  @ManyToOne(() => Resource, (resource: Resource) => resource.userResources, {
    eager: true
  })
  resource: Resource
}
