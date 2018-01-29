import {Component, ElementRef} from '@angular/core';
import {AppUtil} from "../../conf/app-util";

@Component({
    selector: 'app-sidebar',
    templateUrl: './app-sidebar.component.html'
})
export class AppSidebar {

    isAdmin: boolean;

    constructor(private el: ElementRef) {
    }

    //wait for the component to render completely
    ngOnInit(): void {
        var nativeElement: HTMLElement = this.el.nativeElement,
            parentElement: HTMLElement = nativeElement.parentElement;
        // move all children out of the element
        while (nativeElement.firstChild) {
            parentElement.insertBefore(nativeElement.firstChild, nativeElement);
        }
        // remove the empty element(the host)
        parentElement.removeChild(nativeElement);
        this.isAdmin = AppUtil.getUserRole() === 0;
    }
}
