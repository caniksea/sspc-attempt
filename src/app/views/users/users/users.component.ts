import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Credentials} from '../../../shared/models/credentials';
import {UserService} from '../../../shared/services/user.service';
import * as loginActions from '../../login/actions/login-action';
import {AppUtil} from '../../../conf/app-util';
import {TokenModel} from '../../login/models/token-model';
import {UserDetails} from '../../../shared/models/user-details';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    public addUserForm: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;

    users: Credentials[];

    constructor(private builder: FormBuilder,
                private userService: UserService) {
    }

    ngOnInit() {
        this.addUserForm = this.builder.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });

        this.email = this.addUserForm.controls['email'];
        this.password = this.addUserForm.controls['password'];

        this.getUsers();
    }

    addUser(model, isValid: boolean) {
        if (isValid) {
            const userLogin = new Credentials();
            userLogin.email = model.email;
            userLogin.password = model.password;
            this.userService.getUsers().subscribe(data => {
                    if (data && data.length > 0) {
                        const located = data.filter(user => user.email === userLogin.email);
                        const seen: Credentials = located && located.length > 0 ? located[0] : undefined;
                        if (seen) {
                            console.log('user already exist.')
                        } else {
                            this.userService.addUser(userLogin).subscribe(user => {
                                if (user) {
                                    console.log('user added.');
                                    this.addUserRole(user.email);
                                    this.addUserDetails(user.email);
                                }
                            })
                        }
                    }
                },
                error => {
                    console.error('Error occurred: ' + error.message);
                });
        }
    }

    private addUserRole(email: string) {
        const tm = new TokenModel();
        tm.email = email;
        tm.role_value = 1;
        this.userService.addUserRole(tm).subscribe(ur => {
            if (ur) {
                console.log('user role added.');
            }
        });
    }

    private addUserDetails(email: string) {
        const ud = new UserDetails();
        ud.email = email;
        this.userService.addUserDetails(ud).subscribe(d => {
            if (d) {
                console.log('user details added.')
            }
        });
    }

    private getUsers() {
        this.userService.getUsers().subscribe(data => {
                if (data && data.length > 0) {
                    this.users = data;
                }
            },
            error => {
                console.error('Error occurred: ' + error.message);
            });
    }
}
