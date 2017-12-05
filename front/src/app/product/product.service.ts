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
    putProduct(product: Product): Observable<Product> {
        const url = `/product/`;
        return this.http.put(url, product);
    }
    deleteProductOrder(id: number) {
        /*NOT SURE, DELETE THE PRODUCT OR AN ORDER*/
        const body = {id_product_order: id};
        const url = `/product/order`;
        return this.http.delete(url, body);
    }

    getProductsDetail(): Observable<any> {
        const url = `/product/details`;
        return this.http.get(url);
    }

    getProductsFree(): Observable<any> {
        const url = `/product/free`;
        return this.http.get(url);
    }
}