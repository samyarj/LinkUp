import { AppUser } from "./user.interface";

export interface FriendRequest {
    sender: AppUser,
    receiverId: string,
    date: Date,
    status: Status
}

export enum Status {
    PENDING = "Pending",
    ACCEPTED = "Accepted",
    REJECTED = "Rejected"
}