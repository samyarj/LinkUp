import { BadRequestException, Injectable } from '@nestjs/common';
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
    try {
      const formattedNote = {
        ...note,
        date: note.date ? new Date(note.date).toISOString() : null,
        publicationDate: note.publicationDate ? new Date(note.publicationDate).toISOString() : null,
        expirationDate: note.expirationDate ? new Date(note.expirationDate).toISOString() : null,
        user: { id: userId } as AppUser,
      };
  
      const newNote = this.noteRepository.create(formattedNote);
      const savedNote = await this.noteRepository.save(newNote);
  
      return plainToInstance(NoteDto, savedNote);
    } catch (error) {
      console.error('Error creating note:', error.message);
      throw new BadRequestException('Invalid data provided for note creation');
    }
  }

  async updateNoteByUser(noteId: string, note: Partial<Note>): Promise<NoteDto> {
    try {
      const formattedNote = {
        ...note,
        date: note.date ? new Date(note.date).toISOString() : null,
        publicationDate: note.publicationDate ? new Date(note.publicationDate).toISOString() : null,
        expirationDate: note.expirationDate ? new Date(note.expirationDate).toISOString() : null,
      };
  
      await this.noteRepository.update(noteId, formattedNote);
  
      const updatedNote = await this.noteRepository.findOne({ where: { id: noteId } });
  
      if (!updatedNote) {
        throw new BadRequestException(`Note with ID ${noteId} not found`);
      }
  
      return plainToInstance(NoteDto, updatedNote);
    } catch (error) {
      console.error('Error updating note:', error.message);
      throw new BadRequestException('Invalid note data provided for update');
    }
  }

  async deleteEventById(eventId: string): Promise<void> {
    await this.eventRepository.delete(eventId);
  }

  async createEventByUser(event: Partial<EventDto>, userId: string): Promise<EventDto> {
    try {
      const formattedEvent = {
        ...event,
        date: event.date ? new Date(event.date).toISOString() : null,
        publicationDate: event.publicationDate ? new Date(event.publicationDate).toISOString() : null,
        expirationDate: event.expirationDate ? new Date(event.expirationDate).toISOString() : null,
        user: { id: userId } as AppUser,
      };
  
      const newEvent = this.eventRepository.create(formattedEvent);
      const savedEvent = await this.eventRepository.save(newEvent);
  
      return plainToInstance(EventDto, savedEvent);
    } catch (error) {
      console.error('Error creating event:', error.message);
      throw new BadRequestException('Invalid event data provided');
    }
  }
  
  async updateEventByUser(eventId: string, event: Partial<Event>): Promise<EventDto> {
    try {
      const formattedEvent = {
        ...event,
        date: event.date ? new Date(event.date).toISOString() : null,
        publicationDate: event.publicationDate ? new Date(event.publicationDate).toISOString() : null,
        expirationDate: event.expirationDate ? new Date(event.expirationDate).toISOString() : null,
      };
  
      await this.eventRepository.update(eventId, formattedEvent);
  
      const updatedEvent = await this.eventRepository.findOne({ where: { id: eventId } });
  
      if (!updatedEvent) {
        throw new BadRequestException(`Event with ID ${eventId} not found`);
      }
  
      return plainToInstance(EventDto, updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error.message);
      throw new BadRequestException('Invalid event data provided for update');
    }
  }
}
