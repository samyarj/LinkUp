import { AppUser } from "./user.interface";

export interface Message {
    id: string;
    content: string;
    user: AppUser;
    date: Date;
}