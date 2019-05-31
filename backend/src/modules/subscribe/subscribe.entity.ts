import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

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


  @Column({ nullable: true })
  profession: string


  @Column({ nullable: true })
  expectations: string
}
