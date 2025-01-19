import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AppUser } from './app-user.entity';

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => AppUser, (user) => user.sentRequests, { cascade: true })
  sender: AppUser;

  @ManyToOne(() => AppUser, (user) => user.receivedRequests, { cascade: true })
  receiver: AppUser;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'enum', enum: ['Pending', 'Accepted', 'Rejected'] })
  status: string;
}
