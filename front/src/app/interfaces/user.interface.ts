export interface AppUser {
    auth0Id: string,
    username: string,
    email: string,
    description: string,
    isProfilePublic: boolean,
    avatar?: string,
    age?: number,
    pronouns?: Pronouns,

}

export enum Pronouns {
    HE_HIM = "He/Him",
    SHE_HER = "She/Her",
    THEY_THEM = "They/Them",
    OTHER = "Other"
}