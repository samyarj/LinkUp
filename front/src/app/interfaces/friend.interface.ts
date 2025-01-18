export interface FriendRequest {
    senderId: string,
    receiverId: string,
    date: Date,
    status: Status
}

export enum Status {
    PENDING = "Pending",
    ACCEPTED = "Accepted",
    REJECTED = "Rejected"
}