import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RolesEnum {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  firstName: string;

  @Column({ default: null })
  lastName: string;

  @Column()
  password: string;

  @Column({ default: RolesEnum.USER })
  role: string;
}
