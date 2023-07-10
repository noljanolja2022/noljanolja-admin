interface BaseUser {
    id: string;
    name?: string;
    avatar?: string;
    phone?: string;
    email?: string;
    gender: Gender;
    dob?: Date;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isBlocked: boolean;
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

export type UpdateUserPayload = {
    name: string;
    avatar: Nullable<File>;
    phone?: string;
    email?: string;
    gender?: Gender;
    dob?: Date;
}