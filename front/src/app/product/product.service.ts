import {Injectable} from '@angular/core';
import {Product} from './product.model';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {}

    getProducts(): Observable<any> {
        const url = `/products`;
        return this.http.get(url);
    }
    putProduct(product: Product): Observable<Product> {
        const url = `/products`;
        return this.http.put(url, product);
    }
    deleteProduct(id: number) {
        const body = {id_product: id};
        const url = `/products/buys`;
        return this.http.delete(url, body);
    }

    getNameProducts(): Observable<any> {
        const url = `/products/name`;
        return this.http.get(url);
    }
}