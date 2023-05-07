import { UserCredential } from "firebase/auth"
import { AuthTypesEnum } from "./resources"

/** Interface for menu items */
export interface MenuItem {
    name: string,
    icon: string,
    label: string,
    routerLink: string,
    auth?: boolean
}

export interface SpaceInfo {
    id?: string|null,
    title?: string|null,
    desc?: string|null,
    images?: string[]|null,
    alt?: string|null
}

export interface CarouselSlides {
    id: string,
    src: string,
    title: string,
    subtitle: string,
    routerLink: string
}

export interface User {
    uid: string,
    email: string|null,
    displayName: string|null,
    photoURL?: string|null,
    emailVerified: boolean,
}

export interface AuthError {
    type: AuthTypesEnum,
    code: string,
    message: string
}

export interface Credentials {
    type: string;
    [x: string]: any;
}

export interface SignUpDialogData {
    email: string,
    password: string,
    confPassword: string,
}

export interface SessionState {
    userCredential: UserCredential|undefined;
    // TODO: Add more values
}