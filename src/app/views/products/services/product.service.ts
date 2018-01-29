import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {REST_SERVICE_URL, SERVICE_BASE_URL} from "../../../conf/util";
import {Observable} from "rxjs/Observable";
import {Product} from "../models/product";
import {MiscService} from "../../../shared/services/misc.service";

@Injectable()
export class ProductService {

    private REST_URL = REST_SERVICE_URL;
    private BASE_URL: string = SERVICE_BASE_URL;

    constructor(private http: Http) {
    }

    getProducts(): Observable<Product[]> {
        return this.http.get(this.BASE_URL + 'products.json')
            .map(res => res.json())
            .catch(MiscService.handleError);
    }

    addProduct(product: Product): Observable<Product> {
        return this.http.post(this.REST_URL + 'addProduct', product)
            .map(res => res.json())
            .catch(MiscService.handleError);
    }
}
