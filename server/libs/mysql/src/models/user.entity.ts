import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { hashSync } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
