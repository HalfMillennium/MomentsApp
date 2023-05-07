import { ActionCreator, createAction } from '@ngrx/store';
import { AuthTypesEnum } from 'src/app/utils/resources';

export function register(type: AuthTypesEnum): ActionCreator {
    return createAction(`[Auth Dialog Component] Register [${type}]`);
}
export function signIn(type: AuthTypesEnum): ActionCreator {
    return createAction(`[Auth Dialog Component] Sign In [${type}]`);
}