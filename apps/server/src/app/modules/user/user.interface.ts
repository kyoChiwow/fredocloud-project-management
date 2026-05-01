export enum SystemRole {
    SUPER_ADMIN = "super_admin",
    USER = "user",
}

export interface IUser {
    id?: string; 
    name: string;
    email: string;
    password?: string;
    avatarUrl?: string;
    
    role: SystemRole;
    
    isDeleted: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}