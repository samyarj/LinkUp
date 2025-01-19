import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { AppUser } from './app-user.entity';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AppUser, (user) => user.sentFriends, { cascade: true })
  user: AppUser;

  @ManyToOne(() => AppUser, (user) => user.receivedFriends, { cascade: true })
  friend: AppUser;

  @Column()
  date: Date;
}