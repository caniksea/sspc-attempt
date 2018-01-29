import { Component, OnInit } from '@angular/core';
import {AppUtil} from "../../conf/app-util";

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayout implements OnInit {

    isAdmin: boolean;

  // public disabled = false;
  // public status: {isopen: boolean} = {isopen: false};
  //
  // public toggled(open: boolean): void {
  //   console.log('Dropdown is now: ', open);
  // }
  //
  // public toggleDropdown($event: MouseEvent): void {
  //   $event.preventDefault();
  //   $event.stopPropagation();
  //   this.status.isopen = !this.status.isopen;
  // }

  ngOnInit(): void {
    this.isAdmin = AppUtil.getUserRole() === 0;
  }
}
