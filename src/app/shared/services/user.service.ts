import {Injectable} from '@angular/core';
import {REST_SERVICE_URL, SERVICE_BASE_URL} from "../../conf/util";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {UserDetails} from "../models/user-details";
import {MiscService} from "./misc.service";
import {Credentials} from "../models/credentials";
import {TokenModel} from "../../views/login/models/token-model";

@Injectable()
export class UserService {

    private BASE_URL: string = SERVICE_BASE_URL;
    private REST_URL: string = REST_SERVICE_URL

    constructor(private http: Http) {
    }

    public getUsers(): Observable<Credentials[]> {
        return this.http.get(this.BASE_URL + 'logins.json')
            .map((res: Response) => res.json())
            .catch(MiscService.handleError);
    }

    public getUsersData(): Observable<UserDetails[]> {
        return this.http.get(this.BASE_URL + 'user_details.json')
            .map(res => res.json())
            .catch(MiscService.handleError);
    }

    addUser(userLogin: Credentials): Observable<Credentials> {
        return this.http.post(this.REST_URL + 'addUser', userLogin)
            .map(res => res.json())
            .catch(MiscService.handleError)
    }

    addUserRole(tm: TokenModel): Observable<TokenModel> {
        return this.http.post(this.REST_URL + 'addRole', tm)
            .map(res => res.json())
            .catch(MiscService.handleError)
    }

    addUserDetails(ud: UserDetails): Observable<UserDetails> {
        return this.http.post(this.REST_URL + 'addUserDetails', ud)
            .map(res => res.json())
            .catch(MiscService.handleError);
    }

    updateUserDetails(ud: UserDetails) {
        return this.http.post(this.REST_URL + 'updateUserDetails', ud)
            .map(res => res.json())
            .catch(MiscService.handleError);
    }
}
