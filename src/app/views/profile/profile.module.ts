import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [ProfileComponent]
})
export class ProfileModule {
}
