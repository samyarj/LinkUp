import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { AppUser } from 'src/entities/app-user.entity';
import { Note } from 'src/entities/note.entity';
import { AppUserDto, EventDto, NoteDto } from 'src/dto/dtos';
import { Event } from 'src/entities/event.entity';

@Controller('profile')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: Partial<AppUser>): Promise<AppUserDto> {
    return this.usersService.createUser(user);
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<AppUserDto> {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: Partial<AppUser>): Promise<AppUserDto> {
    return this.usersService.updateUser(id, user);
  }

  @Get(':id/notes')
  getUserNotes(@Param('id') userId: string): Promise<NoteDto[]> {
    return this.usersService.getUserNotes(userId);
  }

  @Get(':id/events')
  getUserEvents(@Param('id') userId: string): Promise<NoteDto[]> {
    return this.usersService.getUserEvents(userId);
  }

  @Delete('notes/:noteId')
  deleteNoteById(@Param('noteId') noteId: string): Promise<void> {
    return this.usersService.deleteNoteById(noteId);
  }

  @Post(':id/notes')
  createNoteByUser(@Param('id') userId: string, @Body() note: Partial<Note>): Promise<NoteDto> {
    return this.usersService.createNoteByUser(note, userId);
  }

  @Put('notes/:noteId')
  updateNoteByUser(
    @Param('noteId') noteId: string,
    @Body() note: Partial<Note>,
  ): Promise<NoteDto> {
    return this.usersService.updateNoteByUser(noteId, note);
  }


  @Delete('events/:eventId')
  deleteEventById(@Param('eventId') eventId: string): Promise<void> {
    return this.usersService.deleteEventById(eventId);
  }

  @Post(':id/events')
  createEventByUser(@Param('id') userId: string, @Body() event: Partial<Event>): Promise<EventDto> {
    return this.usersService.createEventByUser(event, userId);
  }

  @Put('events/:eventId')
  updateEventByUser(
    @Param('eventId') eventId: string,
    @Body() event: Partial<Event>,
  ): Promise<EventDto> {
    return this.usersService.updateEventByUser(eventId, event);
  }
}