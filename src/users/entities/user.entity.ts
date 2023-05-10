import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column()
  userName: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
}
