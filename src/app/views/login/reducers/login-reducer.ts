import {AuthenModel} from '../models/authen-model';
import {Action} from '@ngrx/store'
import * as loginActions from '../actions/login-action'

export function LoginReducer(state: AuthenModel = new AuthenModel(), action: Action) {
    switch (action.type) {
        case loginActions.ActionTypes.login:
            return Object.assign(new AuthenModel(), state, {authorized: action.payload})
        default:
            return state;
    }
}
