import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/entities/friend.entity';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { AppUser } from 'src/entities/app-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friend, FriendRequest, AppUser]),
  ],
  providers: [FriendsService],
  controllers: [FriendsController]
})
export class FriendsModule {}
