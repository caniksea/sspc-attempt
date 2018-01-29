import {Component, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../services/product.service';
import {AppUtil} from "../../../conf/app-util";
import {Router} from "@angular/router";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    providers: [ProductService]
})
export class ProductsComponent implements OnInit {

    products: Product[];
    pTitle: string;
    pPrice: number;
    pDesc: string;

    productForm: FormGroup;
    title: AbstractControl;
    price: AbstractControl;
    description: AbstractControl;

    constructor(private builder: FormBuilder,
                private productService: ProductService,
                private router: Router) {
    }

    ngOnInit() {
        if(!AppUtil.isUserLoggedIn()) this.router.navigate(['']);
        this.productForm = this.builder.group({
            'title': ['', Validators.required],
            'price': ['', Validators.required],
            'description': ['', Validators.required]
        });

        this.title = this.productForm.controls['title'];
        this.price = this.productForm.controls['price'];
        this.description = this.productForm.controls['description'];

        this.getProducts();
    }

    private getProducts() {
        this.productService.getProducts().subscribe(p => {
            if (p) this.products = p;
        });
    }

    saveProduct(model, isValid: boolean) {
        console.log(model);
        if (isValid) {
            const product = new Product();
            product.price = +model.price;
            product.description = model.description;
            product.title = model.title;
            this.productService.addProduct(product).subscribe(p => {
                if (p) {
                    console.log('Product with ID: ' + p.productID + ' added!');
                }
            });
        }
    }
}
