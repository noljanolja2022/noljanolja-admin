import { AccountType } from '../enums/AccountType';

export type ClientUser = {
    id: string;
    name: string;
    email?: string;
    picture?: string;
    accountType: AccountType
}