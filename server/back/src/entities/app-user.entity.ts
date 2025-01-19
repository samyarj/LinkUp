import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Note } from './note.entity';
import { FriendRequest } from './friend-request.entity';
import { Message } from './message.entity';
import { Friend } from './friend.entity';

@Entity()
export class AppUser {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column({ default: true })
  isPublic: boolean;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  pronouns: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.sender)
  sentRequests: FriendRequest[];

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.receiver)
  receivedRequests: FriendRequest[];

  @OneToMany(() => Friend, (friend) => friend.user)
  sentFriends: Friend[];

  @OneToMany(() => Friend, (friend) => friend.friend)
  receivedFriends: Friend[];
}
