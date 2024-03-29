export interface User {
    uid: string;
    email: string;
    displayName?: string;
    emailVerified?: boolean;
    photoURL?: string;
    admin?: boolean;
}
