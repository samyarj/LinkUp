import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { Friend } from 'src/entities/friend.entity';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { Status } from 'src/enums/status.enum';
import { FriendDto, FriendRequestDto } from 'src/dto/dtos';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get(':userId')
  async getAllFriends(@Param('userId') userId: string): Promise<FriendDto[]> {
    return this.friendsService.getAllFriends(userId);
  }

  @Delete(':userId/:friendId')
  async removeFriend(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string,
  ): Promise<void> {
    return this.friendsService.removeFriend(userId, friendId);
  }

  @Post(':userId/:friendId')
  async addFriend(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string,
  ): Promise<FriendDto> {
    return this.friendsService.addFriend(userId, friendId);
  }

  @Get(':userId/:friendId')
  async consultFriendRequest(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string,
  ): Promise<FriendRequestDto[]> {
    return this.friendsService.consultFriendRequest(userId, friendId);
  }

  @Post('request/:friendRequestId')
  async acceptOrDeclineFriendRequest(
    @Param('friendRequestId') friendRequestId: string,
    @Body('status') status: Status,
  ): Promise<FriendRequestDto> {
    return this.friendsService.acceptOrDeclineFriendRequest(friendRequestId, status);
  }
}
