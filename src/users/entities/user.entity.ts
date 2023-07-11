import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from '../../images/entities/image.entity';

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

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];
}
