import {Headers, RequestOptions} from "@angular/http";

export class AppUtil {
    static isUserLoggedIn(): boolean {
        return !!localStorage.getItem('token')
    }

    static getCurrentUser() {
        return this.getTokenDetails().email;
    }

    private static getTokenDetails() {
        return JSON.parse(localStorage.getItem('token'));
    }

    static getUserRole(): number {
        return this.getTokenDetails().role_value;
    }

    static headers(): RequestOptions {
        let token = localStorage.getItem('token');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({headers: headers});
    }
}
