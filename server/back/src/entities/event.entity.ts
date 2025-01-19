import { Entity, Column } from 'typeorm';
import { Note } from './note.entity';

@Entity()
export class Event extends Note {
  @Column()
  startingHour: number;

  @Column()
  endingHour: number;
}
