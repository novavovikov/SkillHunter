import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../user/user.entity'

@Entity()
export class Subscribe {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column({
    unique: true,
  })
  email: string

  @Column()
  feature: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
