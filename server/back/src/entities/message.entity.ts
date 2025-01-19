import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AppUser } from './app-user.entity';
import { Note } from './note.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => AppUser, (user) => user.messages)
  user: AppUser;

  @Column()
  date: Date;

  @ManyToOne(() => Note, (note) => note.messages)
  note: Note;
}
