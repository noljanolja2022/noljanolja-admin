interface BaseUser {
    id: string;
    name?: string;
    avatar?: string;
    phone?: string;
    email?: string;
    gender: Gender;
    dob?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User extends BaseUser {
}

export interface ApiUser extends BaseUser {
    isEmailVerified: boolean;
    preferences: Preference;
}

export type Preference = {
    collectAndUsePersonalInfo: boolean;
}

export enum Gender {
    MALE, FEMALE, OTHER
}