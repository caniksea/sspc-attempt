import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {Credentials} from "../../../shared/models/credentials";
import {Store} from '@ngrx/store'
import {AuthenModel} from "../models/authen-model";
import * as loginActions from '../actions/login-action'
import {AppUtil} from "../../../conf/app-util";
import {UserService} from "../../../shared/services/user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginService, UserService]
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;

    constructor(private builder: FormBuilder, private router: Router,
                private loginService: LoginService, private store: Store<AuthenModel>,
                private userService: UserService) {
    }

    ngOnInit() {

        this.loginService.logout();

        this.loginForm = this.builder.group({
            'email': ['', [Validators.required, Validators.minLength(5)]],
            'password': ['', Validators.required]
        });
        this.email = this.loginForm.controls['email'];
        this.password = this.loginForm.controls['password'];
    }

    login(model, isValid: boolean) {
        if (isValid) {
            const c = new Credentials();
            c.email = model.email;
            c.password = model.password;
            this.userService.getUsers().subscribe(data => {
                if (data && data.length > 0) {
                    const located = data.filter(user => user.email === c.email);
                    const seen: Credentials = located && located.length > 0 ? located[0] : undefined;
                    if (seen && seen.password.trim() === c.password) {
                        this.loginService.getUserRole().subscribe(tokenData => {
                            if (tokenData && tokenData.length > 0) {
                                const sToken = tokenData.filter(td => td.email === seen.email);
                                const token = sToken ? sToken[0] : undefined;
                                if (token) {
                                    localStorage.setItem('token', JSON.stringify(token));
                                    this.store.dispatch(new loginActions.LoginAction(AppUtil.isUserLoggedIn()));
                                    this.router.navigate(['']);
                                }
                            }
                        });
                    }
                }
            });
        }
    }

}
