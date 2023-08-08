import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../images/entities/image.entity';

export enum RolesEnum {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  email: string;

  @Column()
  firstName: string;

  @Column({ default: null })
  lastName: string;

  @Column()
  password: string;

  @Column({ default: RolesEnum.USER })
  role: string;

  @Column({ type: 'datetime2' })
  @CreateDateColumn()
  createdDate: Date;

  @Column({ type: 'datetime2' })
  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];
}
