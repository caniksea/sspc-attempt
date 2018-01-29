import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Cart} from "../models/cart";
import {REST_SERVICE_URL, SERVICE_BASE_URL} from "../../../conf/util";
import {MiscService} from "../../../shared/services/misc.service";
import {CartItem} from "../models/cart-item";

@Injectable()
export class CartService {

    private BASE_URL: string = SERVICE_BASE_URL;
    private REST_URL: string = REST_SERVICE_URL

    constructor(private http: Http) {
    }

    getCart(): Observable<Cart[]> {
        return this.http.get(this.BASE_URL + 'cart.json')
            .map(res => res.json())
            .catch(MiscService.handleError);
    }

    addToCart(ci: CartItem): Observable<Cart> {
        return this.http.post(this.REST_URL + 'addToCart', ci)
            .map(res => res.json())
            .catch(MiscService.handleError);
    }

    removeOne(p: CartItem): Observable<Cart> {
        return this.http.post(this.REST_URL + 'removeOne', p)
            .map(res => res.json())
            .catch(MiscService.handleError);
    }

    removeAll(p: CartItem): Observable<Cart> {
        return this.http.post(this.REST_URL + 'removeAll', p)
            .map(res => res.json())
            .catch(MiscService.handleError);
    }
}
