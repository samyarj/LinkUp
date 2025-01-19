import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUser } from 'src/entities/app-user.entity';
import { Note } from 'src/entities/note.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppUser, Note , Event]),
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
