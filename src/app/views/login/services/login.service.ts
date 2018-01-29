import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Credentials} from '../../../shared/models/credentials';
import {Observable} from 'rxjs';
import {SERVICE_BASE_URL} from "../../../conf/util";
import {TokenModel} from "../models/token-model";
import {Store} from '@ngrx/store';
import {AuthenModel} from "../models/authen-model";
import * as loginActions from '../actions/login-action';
import {AppUtil} from "../../../conf/app-util";
import {Router} from "@angular/router";
import {MiscService} from "../../../shared/services/misc.service";

@Injectable()
export class LoginService {

    private BASE_URL = SERVICE_BASE_URL;

    constructor(private http: Http,
                private store: Store<AuthenModel>,
                private router: Router) { }

    public getUserRole(): Observable<TokenModel[]> {
        return this.http.get(this.BASE_URL + 'user_roles.json')
            .map(res => res.json())
            .catch(MiscService.handleError)
    }

    logout() {
        localStorage.removeItem('token');
        this.store.dispatch(new loginActions.LoginAction(AppUtil.isUserLoggedIn()));
        this.router.navigate([''])
    }
}
