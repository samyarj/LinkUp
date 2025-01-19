import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Note } from 'src/entities/note.entity';
import { Event } from 'src/entities/event.entity';
import { Message } from 'src/entities/message.entity';
import { EventDto, NoteDto } from 'src/dto/dtos';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('note/:id')
  async getNoteById(@Param('id') noteId: string): Promise<NoteDto> {
    return this.postsService.getNoteById(noteId);
  }

  @Get('event/:id')
  async getEventById(@Param('id') eventId: string): Promise<EventDto> {
    return this.postsService.getEventById(eventId);
  }

  @Get()
  async getAllNotes(): Promise<NoteDto[]> {
    return this.postsService.getAllNotes();
  }

  @Get('/events')
  async getAllEvents(): Promise<EventDto[]> {
    return this.postsService.getAllEvents();
  }

  @Post(':noteId/comment')
  async addCommentToNoteById(
    @Param('noteId') noteId: string,
    @Body() comment: Message,
  ): Promise<NoteDto> {
    return this.postsService.addCommentToNoteById(noteId, comment);
  }

  @Post(':eventId/comment')
  async addCommentToEventById(
    @Param('eventId') eventId: string,
    @Body() comment: Message,
  ): Promise<EventDto> {
    return this.postsService.addCommentToEventById(eventId, comment);
  }

  @Get('private-notes/:userId')
  async getPrivateNotes(@Param('userId') userId: string): Promise<NoteDto[]> {
    return this.postsService.getPrivateNotes(userId);
  }

  @Get('private-events/:userId')
  async getPrivateEvents(@Param('userId') userId: string): Promise<EventDto[]> {
    return this.postsService.getPrivateEvents(userId);
  }
}
