import { Address } from "./address.interface";
import { Message } from "./message.interface";

export interface Note {
    id: string;
    description: string;
    title: string;
    date: Date;
    expirationDate: Date;
    location: Address;
    isPublic: boolean;
    publicationDate: Date;
    userId: string;
    messages: Message[];
}

export interface Event extends Note{
    startingHour: number;
    endingHour: number;
}