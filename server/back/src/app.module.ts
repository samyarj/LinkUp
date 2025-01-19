import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUser } from './entities/app-user.entity';
import { Note } from './entities/note.entity';
import { Message } from './entities/message.entity';
import { FriendRequest } from './entities/friend-request.entity';
import { Address } from './entities/address.entity';
import { Event } from './entities/event.entity';
import { PostsModule } from './posts/posts.module';
import { FriendsModule } from './friends/friends.module';
import { UsersModule } from './users/users.module';
import { Friend } from './entities/friend.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Google1992!',
      database: 'hackathon',
      entities: [
        AppUser,
        Note,
        Message,
        FriendRequest,
        Address,
        Event,
        Friend,
      ],
      synchronize: true,
      logging: true,
    }),
    PostsModule,
    FriendsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
