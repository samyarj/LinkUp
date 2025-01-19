import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from 'src/entities/friend.entity';
import { Status } from 'src/enums/status.enum';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { AppUser } from 'src/entities/app-user.entity';
import { FriendDto, FriendRequestDto } from 'src/dto/dtos';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,

    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
  ) {}

  async getAllFriends(userId: string): Promise<FriendDto[]> {
    const friends = await this.friendRepository.find({
      where: [{ user: { id: userId } }, { friend: { id: userId } }],
      relations: ['user', 'friend'],
    });

    return plainToInstance(FriendDto, friends);
  }

  async removeFriend(userId: string, friendId: string): Promise<void> {
    const result = await this.friendRepository.delete({
      user: { id: userId },
      friend: { id: friendId },
    });
    if (result.affected === 0) {
      throw new Error('Friend not found or could not be removed');
    }
  }

  async addFriend(userId: string, friendId: string): Promise<FriendDto> {
    const existingFriend = await this.friendRepository.findOne({
      where: [
        { user: { id: userId }, friend: { id: friendId } },
        { user: { id: friendId }, friend: { id: userId } },
      ],
    });
    if (existingFriend) {
      throw new Error('Friend relationship already exists');
    }

    const friend = new Friend();
    friend.user = { id: userId } as AppUser;
    friend.friend = { id: friendId } as AppUser;
    friend.date = new Date();

    const savedFriend = await this.friendRepository.save(friend);
    return plainToInstance(FriendDto, savedFriend);
  }

  async consultFriendRequest(userId: string, friendId: string): Promise<FriendRequestDto[]> {
    const friendRequests = await this.friendRequestRepository.find({
      where: [
        { sender: { id: userId }, receiver: { id: friendId } },
        { sender: { id: friendId }, receiver: { id: userId } },
      ],
      relations: ['sender', 'receiver'],
    });

    return plainToInstance(FriendRequestDto, friendRequests);
  }

  async acceptOrDeclineFriendRequest(friendRequestId: string, status: Status): Promise<FriendRequestDto> {
    if (!Object.values(Status).includes(status)) {
      throw new Error('Invalid status value');
    }

    const friendRequest = await this.friendRequestRepository.findOne({
      where: { id: friendRequestId },
    });

    if (!friendRequest) {
      throw new Error('Friend request not found');
    }

    friendRequest.status = status;
    const updatedFriendRequest = await this.friendRequestRepository.save(friendRequest);
    return plainToInstance(FriendRequestDto, updatedFriendRequest);
  }
}