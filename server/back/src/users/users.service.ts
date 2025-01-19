import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUser } from 'src/entities/app-user.entity';
import { Note } from 'src/entities/note.entity';
import { Event } from 'src/entities/event.entity';
import { AppUserDto, EventDto, NoteDto } from 'src/dto/dtos';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(AppUser)
      private userRepository: Repository<AppUser>,

      @InjectRepository(Note)
      private noteRepository: Repository<Note>,
      
      @InjectRepository(Event)
      private eventRepository: Repository<Event>,
      ) {}

  async createUser(user: Partial<AppUser>): Promise<AppUserDto> {
    const newUser = await this.userRepository.save(user);
    return plainToInstance(AppUserDto, newUser);
  }

  async getUserById(id: string): Promise<AppUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    return plainToInstance(AppUserDto, user);
  }

  async updateUser(id: string, user: Partial<AppUser>): Promise<AppUserDto> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.getUserById(id);
    return plainToInstance(AppUserDto, updatedUser);
  }

  async getUserNotes(userId: string): Promise<NoteDto[]> {
    const notes = await this.noteRepository.find({
      where: { user: { id: userId } },
      relations: ['messages', 'location'],
    });
    return plainToInstance(NoteDto, notes);
  }

  async getUserEvents(userId: string): Promise<EventDto[]> {
    const events = await this.eventRepository.find({
      where: { user: { id: userId }, isPublic: true },
      relations: ['messages', 'location'],
    });
    return plainToInstance(EventDto, events);
  }

  async deleteNoteById(noteId: string): Promise<void> {
    await this.noteRepository.delete(noteId);
  }

  async createNoteByUser(note: Partial<Note>, userId: string): Promise<NoteDto> {
    const newNote = this.noteRepository.create({
      ...note,
      user: { id: userId } as AppUser,
    });
    const savedNote = await this.noteRepository.save(newNote);
    return plainToInstance(NoteDto, savedNote);
  }

  async updateNoteByUser(noteId: string, note: Partial<Note>): Promise<NoteDto> {
    await this.noteRepository.update(noteId, note);
    const updatedNote = await this.noteRepository.findOne({ where: { id: noteId } });
    return plainToInstance(NoteDto, updatedNote);
  }

  async deleteEventById(eventId: string): Promise<void> {
    await this.eventRepository.delete(eventId);
  }

  async createEventByUser(event: Partial<Event>, userId: string): Promise<EventDto> {
    const newEvent = this.eventRepository.create({
      ...event,
      user: { id: userId } as AppUser,
    });
    const savedEvent = await this.eventRepository.save(newEvent);
    return plainToInstance(EventDto, savedEvent);
  }

  async updateEventByUser(eventId: string, event: Partial<Event>): Promise<EventDto> {
    await this.eventRepository.update(eventId, event);
    const updatedEvent = await this.eventRepository.findOne({ where: { id: eventId } });
    return plainToInstance(EventDto, updatedEvent);
  }
}