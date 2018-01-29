import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: ''
        },
        children: [
            {
                path: '',
                component: CartComponent,
                data: {
                    title: 'Shop'
                }

            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
