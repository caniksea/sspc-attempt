import {Action} from '@ngrx/store'

export const ActionTypes = {
    login: 'login'
}

export class LoginAction implements Action {
    type: string = ActionTypes.login;
    constructor(public payload: boolean) {}
}
