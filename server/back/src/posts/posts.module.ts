import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Friend } from 'src/entities/friend.entity';
import { Event } from 'src/entities/event.entity';
import { Note } from 'src/entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({  
  imports: [
  TypeOrmModule.forFeature([Note, Event, Friend]),
],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
