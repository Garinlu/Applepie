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
        const url = `/product`;
        return this.http.put(url, product);
    }
    deleteProduct(id: number) {
        /*NOT SURE, DELETE THE PRODUCT OR AN ORDER*/
        const body = {id_product: id};
        const url = `/product`;
        return this.http.delete(url, body);
    }

    getProductsDetail(): Observable<any> {
        const url = `/products/details`;
        return this.http.get(url);
    }
}