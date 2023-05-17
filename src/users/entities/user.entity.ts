import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RolesEnum {
  admin = 'admin',
  user = 'user',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userName: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ default: null })
  password: string;
  @Column({ default: RolesEnum.user })
  role: string;
}
