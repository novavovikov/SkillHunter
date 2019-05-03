import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm'

@Entity()
export class SubscribeEntity {
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
  profession: string

  @Column({
    nullable: true
  })
  expectations: string
}
