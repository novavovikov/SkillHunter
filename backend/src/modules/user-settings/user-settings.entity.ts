import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../user/user.entity'

@Entity()
export class UserSettings {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'boolean', default: false })
  private: boolean

  @Column({ type: 'boolean', default: true })
  onboarding: boolean

  @Column({ type: 'boolean', default: true })
  newsletter: boolean

  @Column({ type: 'boolean', default: true })
  push: boolean

  @OneToOne(
    () => User,
    user => user.settings,
  )
  user: User
}
