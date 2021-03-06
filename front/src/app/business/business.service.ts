import {Injectable} from '@angular/core';
import {Business} from './business.model';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable()
export class BusinessService {
    constructor(private http: HttpClient) {}


    getBusinesses(page: number){
        const url = `/business/all?page=` + page;
        return this.http.get(url);
    }

    getBusiness(id: number): Observable<Business> {
        const url = `/business/` + id;
        return this.http.get(url).map(response => response as Business);
    }

    getProductFromBusiness(id: number, grouped: boolean) {
        const url = `/product?business=` + id + `&group=` + grouped;
        return this.http.get(url);
    }

    getUsersFromBusiness(id: number) {
        const url = `/business/` + id + `/users`;
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

    putBusinessUser(id_business: number, id_user: number) {
        const url = `/business/user`;
        const body = {id_business: id_business, id_user: id_user};
        return this.http.put(url, body);
    }

    postBusinessStatus(id_business: number) {
        const url = `/business/status`;
        const body = {id_business: id_business};
        return this.http.post(url, body);
    }

    deleteProductFromBusiness(id_business_product) {
        const url = `/business/product/` + id_business_product;
        return this.http.delete(url);
    }

    deleteUserFromBusiness(id_business, id_user) {
        const url = `/business/` + id_business + `/user/` + id_user;
        return this.http.delete(url);
    }
}