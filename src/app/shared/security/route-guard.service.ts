import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenModel} from '../../views/login/models/authen-model';
import {Store} from '@ngrx/store'
import {AppUtil} from '../../conf/app-util';

@Injectable()
export class RouteGuardService implements CanActivate {

    private login$: Observable<AuthenModel>;
    private authorized = false;

    constructor(private router: Router,
                private store: Store<AuthenModel>) {
        this.login$ = store.select('login');
        this.login$.subscribe(data => this.authorized = AppUtil.isUserLoggedIn());
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log('LoggedIn?: ' + this.authorized);
        if (this.authorized) return true;
        this.router.navigate(['/login']);
        return false;
    }

}
