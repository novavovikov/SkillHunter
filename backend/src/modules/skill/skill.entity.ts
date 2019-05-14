import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Profession } from '../profession/profession.entity'
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
  externalId: number

  @Column()
  name: string

  @ManyToMany(() => User, (user: User) => user.skills)
  users: User[]

  @ManyToMany(() => Profession, (profession: Profession) => profession.skills)
  professions: User[]
}
