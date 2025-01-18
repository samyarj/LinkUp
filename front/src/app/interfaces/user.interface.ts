export interface AppUser {
    id: string,
    username: string,
    email: string,
    description: string,
    isPublic: boolean,
    avatar?: string,
    age?: number,
    pronouns?: Pronouns,
    location?: [number, number];
}

export enum Pronouns {
    HE_HIM = "He/Him",
    SHE_HER = "She/Her",
    THEY_THEM = "They/Them",
    OTHER = "Other"
}