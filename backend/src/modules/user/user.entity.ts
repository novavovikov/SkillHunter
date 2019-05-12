import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created: Date

  @Column({
    unique: true
  })
  email: string

  @Column({
    nullable: true
  })
  picture: string

  @Column({
    nullable: true
  })
  name: string

  @Column({
    nullable: true
  })
  locale: string

  @Column({
    nullable: true
  })
  googleId: string

  @Column({
    nullable: true
  })
  facebookId: string
}
