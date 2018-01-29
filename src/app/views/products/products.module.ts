import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from './products/products.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        ProductsRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [ProductsComponent]
})
export class ProductsModule {
}
