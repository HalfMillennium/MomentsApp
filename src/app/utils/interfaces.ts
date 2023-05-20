import { UserCredential } from "firebase/auth"
import { AuthTypesEnum, WarningsEnum } from "./resources"
import { Action, ActionReducer } from "@ngrx/store"
import {FormControl} from "@angular/forms"
import { Store } from "@ngrx/store"

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
    authType: AuthTypesEnum,
    errorType: WarningsEnum,
    code: string,
    message: string
}

export interface Credentials {
    type: AuthTypesEnum;
    [x: string]: any;
}

export interface SignUpDialogData {
    userName: FormControl<string>,
    email: FormControl<string>,
    password: FormControl<string>,
    confPassword: FormControl<string>,
}

export interface RegisterRequest {
    type: string,
    credentials: Credentials,
}

export interface EmailAuthCredentials extends Credentials {
    userEmail: string,
    userPassword: string
}

export interface AuthState {
    userCredential?: UserCredential|undefined;
    userAuthError?: AuthError|undefined;
}

export interface UserState {
    displayName?: string;
    photoURL?: string;
}

export declare interface MetaStores {
    auth: AuthState;
    // other stores to follow..
}