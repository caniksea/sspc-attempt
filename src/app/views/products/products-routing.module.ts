import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from "./products/products.component";

const routes: Routes = [
    {
        path: '',
        data: {
            title: ''
        },
        children: [
            {
                path: '',
                component: ProductsComponent,
                data: {
                    title: 'Products'
                }

            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
