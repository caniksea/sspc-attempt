import {Component, OnInit} from '@angular/core';
import {Product} from "../../products/models/product";
import {ProductService} from "../../products/services/product.service";
import {CartService} from "../services/cart.service";
import {Cart} from "../models/cart";
import {AppUtil} from "../../../conf/app-util";
import {CartItem} from "../models/cart-item";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    providers: [ProductService, CartService]
})
export class CartComponent implements OnInit {

    products: Product[];
    myCart: Cart;
    email: string;
    cartItems: CartItem[];

    constructor(private productService: ProductService,
                private cartService: CartService) {
    }

    ngOnInit() {
        this.email = AppUtil.getCurrentUser();
        this.getProducts();
        this.getCartItems();
    }

    private getProducts() {
        this.productService.getProducts().subscribe(ps => {
            if (ps) {
                this.products = ps;
            }
        });
    }

    private getCartItems() {
        this.myCart = new Cart();
        this.myCart.email = this.email;
        this.cartItems = [];
        this.myCart.cart = this.cartItems;
        this.cartService.getCart().subscribe(cart => {
            if(cart){
                const cartA = cart.filter(c => c.email === this.email);
                if(cartA && cartA.length > 0){
                    this.myCart = cartA[0];
                    this.cartItems = this.myCart.cart;
                }
            }
        });
    }

    addToCart(p: Product) {
        const ci = new CartItem();
        ci.productID = p.productID;
        ci.noOfProduct = 1;
        ci.product = p.title;
        ci.price = p.price;
        ci.customer = this.email;
        this.cartService.addToCart(ci).subscribe(cc => {
            if (cc) {
                console.log(cc)
                this.myCart = cc;
                this.cartItems = cc.cart;
            }
        });
    }

    removeAllSpecificItemsFromCart(p: CartItem) {
        p.customer = this.email;
        this.cartService.removeAll(p).subscribe();

    }

    removeOneItemFromCart(p: CartItem) {
        if(p.noOfProduct === 1) this.removeAllSpecificItemsFromCart(p);
        else {
            p.customer = this.email;
            this.cartService.removeOne(p).subscribe();
        }
    }
}
