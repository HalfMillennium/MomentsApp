import { UserCredential } from "firebase/auth"
import { AuthTypesEnum, WarningsEnum } from "./resources"
import { Action, ActionReducer } from "@ngrx/store"
import {FormControl} from "@angular/forms"

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

export interface SessionState {
    userCredential: Promise<UserCredential | undefined>|undefined;
    // TODO: Add more values
}

export interface Reducer {
    type: AuthTypesEnum;
    reduce: ((state: SessionState, action: Action) => SessionState)
}

// Includes all currently supported reducers
export interface ReducerState { 
    sessionReducer: ActionReducer<SessionState, Action>; 
}

export interface AuthState {
    userCredential?: UserCredential|AuthError;
    userAuthError?: AuthError|undefined;
}