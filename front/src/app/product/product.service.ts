import {Injectable} from '@angular/core';
import {Product} from './product.model';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {id} from "@swimlane/ngx-datatable/release/utils";

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

    putProduct(product: Product) {
        const url = `/product/`;
        return this.http.put(url, product);
    }

    setActiveProduct(id_order, active) {
        const url = `/product/order`;
        let body = {id_order: id_order, active: active};
        return this.http.post(url, body);
    }

    deleteOrder(id: number) {
        const url = `/product/order/` + id;
        return this.http.delete(url);
    }
}