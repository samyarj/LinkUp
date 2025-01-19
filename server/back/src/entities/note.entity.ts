import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { AppUser } from './app-user.entity';
import { Address } from './address.entity';
import { Message } from './message.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column()
  expirationDate: Date;

  @ManyToOne(() => Address, { cascade: true })
  location: Address;

  @Column({ default: true })
  isPublic: boolean;

  @Column()
  publicationDate: Date;

  @ManyToOne(() => AppUser, (user) => user.notes, {eager: true})
  user: AppUser;

  @OneToMany(() => Message, (message) => message.note)
  messages: Message[];
}
