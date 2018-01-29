import {Component, ElementRef} from '@angular/core';
import {AppUtil} from "../../conf/app-util";
import {UserService} from "../../shared/services/user.service";
import {UserDetails} from "../../shared/models/user-details";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    providers: [UserService]
})
export class AppHeader {

    name: string;
    email: string;
    isAdmin: boolean;

    constructor(private el: ElementRef, private userService: UserService,
                private router: Router) {
    }

    //wait for the component to render completely
    ngOnInit(): void {
        if(!AppUtil.isUserLoggedIn()) this.router.navigate(['login']);
        else {
            var nativeElement: HTMLElement = this.el.nativeElement,
                parentElement: HTMLElement = nativeElement.parentElement;
            // move all children out of the element
            while (nativeElement.firstChild) {
                parentElement.insertBefore(nativeElement.firstChild, nativeElement);
            }
            // remove the empty element(the host)
            parentElement.removeChild(nativeElement);

            this.email = AppUtil.getCurrentUser();
            this.getUserDetails();
            this.isAdmin = AppUtil.getUserRole() === 0;
        }
    }

    private getUserDetails() {
        this.userService.getUsersData().subscribe(userData => {
            if (userData) {
                let seen = userData.filter(ud => ud.email === this.email);
                let userDetail: UserDetails = (seen && seen.length > 0) ? seen[0] : undefined;
                this.name = userDetail ? (userDetail.firstName ? userDetail.firstName : '')
                    + ' ' + (userDetail.lastName ? userDetail.lastName : '') : undefined;
                this.name = (this.name && this.name.trim().length > 0) ? this.name : '<please update details>';
            }
        });
    }
}
