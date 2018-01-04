import {Injectable} from '@angular/core';
import {Product} from './product.model';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {}

    getProducts(): Observable<any> {
        const url = `/product/`;
        return this.http.get(url);
    }

    getOrders(): Observable<any> {
        const url = `/product/orders`;
        return this.http.get(url);
    }

    getProductsDetail(): Observable<any> {
        const url = `/product/details`;
        return this.http.get(url);
    }

    getProductsFree(): Observable<any> {
        const url = `/product/free`;
        return this.http.get(url);
    }

    putProduct(product: Product): Observable<Product> {
        const url = `/product/`;
        return this.http.put(url, product);
    }

    deleteOrder(id: number) {
        const url = `/product/order/` + id;
        return this.http.delete(url);
    }
}