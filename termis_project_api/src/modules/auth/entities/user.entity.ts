import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  USER = 'User',
  ADMIN = 'Admin',
  DEV = 'Dev',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 }) // Corrigido de 'usename' para 'username'
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  // Se você ainda quiser o last_login do seu SQL:
  @Column({ type: 'datetime', nullable: true })
  last_login: Date;

  // O TypeORM tem decoradores específicos que facilitam a vida:
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}