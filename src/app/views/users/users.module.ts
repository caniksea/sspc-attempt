import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
      ReactiveFormsModule
  ],
  declarations: [UsersComponent],
    providers: [UserService]
})
export class UsersModule { }
