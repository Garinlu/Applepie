import {Injectable} from '@angular/core';
import {Business} from './business.model';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable()
export class BusinessService {
    constructor(private http: HttpClient) {}


    getBusinesses(): Observable<Business[]> {
        const url = `/business/`;
        return this.http.get(url).map(response => response as Business[]);
    }

    getBusiness(id: number): Observable<Business> {
        return this.getBusinesses().map(businesses => businesses.find(business => business.id === id));
    }

    getProductFromBusiness(id: number) {
        const url = `/product?business=` + id;
        return this.http.get(url);
    }

    putBusiness(business: Business): Observable<Business> {
        const url = `/business/`;
        return this.http.put(url, business);
    }

    putBusinessProduct(id_business: number, id_product: number, quantity: number) {
        const url = `/business/product`;
        const body = {id_business: id_business, id_product: id_product, quantity: quantity};
        return this.http.put(url, body);
    }

    deleteProduct(id_business_product: number) {
        const body = {id_businessProduct: id_business_product};
        const url = `/business/product`;
        return this.http.delete(url, body);
    }
}