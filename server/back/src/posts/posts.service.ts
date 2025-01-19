import { Injectable } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';
import { Event } from 'src/entities/event.entity';
import { Message } from 'src/entities/message.entity';
import { Friend } from 'src/entities/friend.entity';
import { In } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { EventDto, NoteDto } from 'src/dto/dtos';


@Injectable()
export class PostsService {
  private notes: Note[] = [];
  private events: Event[] = [];

  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async getNoteById(noteId: string): Promise<NoteDto> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['messages', 'user', 'location'],
    });
    if (!note) {
      throw new Error('Note not found');
    }
    return plainToInstance(NoteDto, note);
  }

  async getEventById(eventId: string): Promise<EventDto> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['messages', 'user', 'location'],
    });
    if (!event) {
      throw new Error('Event not found');
    }
    return plainToInstance(EventDto, event);
  }

  async getAllNotes(): Promise<NoteDto[]> {
    const currentDate = new Date();
    const notes = await this.noteRepository.find({
      where: {
        isPublic: true,
        expirationDate: MoreThan(currentDate),
      },
      relations: ['messages', 'user', 'location'],
    });
    return plainToInstance(NoteDto, notes);
  }

  async getAllEvents(): Promise<EventDto[]> {
    const currentDate = new Date();
    const events = await this.eventRepository.find({
      where: {
        isPublic: true,
        expirationDate: MoreThan(currentDate),
      },
      relations: ['messages', 'user', 'location'],
    });
    return plainToInstance(EventDto, events);
  }

  async getPrivateNotes(userId: string): Promise<NoteDto[]> {
    const friendIds = await this.getFriendIds(userId);
    const notes = await this.noteRepository.find({
      where: {
        isPublic: false,
        user: { id: In(friendIds) },
        expirationDate: MoreThan(new Date()),
      },
      relations: ['messages', 'user', 'location'],
    });
    return plainToInstance(NoteDto, notes);
  }

  async getPrivateEvents(userId: string): Promise<EventDto[]> {
    const friendIds = await this.getFriendIds(userId);
    const events = await this.eventRepository.find({
      where: {
        isPublic: false,
        user: { id: In(friendIds) },
        expirationDate: MoreThan(new Date()),
      },
      relations: ['messages', 'user', 'location'],
    });
    return plainToInstance(EventDto, events);
  }
  

  async addCommentToNoteById(noteId: string, comment: Message): Promise<NoteDto> {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['messages', 'user', 'location'],
    });
    if (!note) {
      throw new Error('Note not found');
    }
    note.messages.push(comment);
    const updatedNote = await this.noteRepository.save(note);
    return plainToInstance(NoteDto, updatedNote);
  }

  async addCommentToEventById(eventId: string, comment: Message): Promise<EventDto> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['messages', 'user', 'location'],
    });
    if (!event) {
      throw new Error('Event not found');
    }
    event.messages.push(comment);
    const updatedEvent = await this.eventRepository.save(event);
    return plainToInstance(EventDto, updatedEvent);
  }

  private async getFriendIds(userId: string): Promise<string[]> {
    const friends = await this.friendRepository.find({
      where: [{ user: { id: userId } }, { friend: { id: userId } }],
      relations: ['user', 'friend'],
    });
    return friends.map((f) => (f.user.id === userId ? f.friend.id : f.user.id));
  }
}
