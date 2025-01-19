export class AddressDto {
    id?: string;
    location: [number, number];
    place?: string;
  }
  

export class FriendRequestDto {
  sender: AppUserDto;
  receiverId: string;
  date: Date;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

export class FriendDto {
    user: AppUserDto;
    friend: AppUserDto;
    date: Date;
}


export class MessageDto {
  id: string;
  content: string;
  user: AppUserDto;
  date: Date;
}

export class NoteDto {
    id: string;
    description: string;
    title: string;
    date: Date;
    expirationDate: Date;
    location: AddressDto;
    isPublic: boolean;
    publicationDate: Date;
    userId: string;
    messages: MessageDto[];
  }

  export class EventDto extends NoteDto {
    startingHour: number;
    endingHour: number;
  }

  export class AppUserDto {
    id: string;
    username: string;
    email: string;
    description: string;
    isPublic: boolean;
    avatar?: string;
    age?: number;
    pronouns?: 'He/Him' | 'She/Her' | 'They/Them' | 'Other';
    notes?: NoteDto[];
    events?: EventDto[];
  }   