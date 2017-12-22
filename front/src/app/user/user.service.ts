import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {User} from './user.model';
import {RequestOptions} from '@angular/http';

@Injectable()
export class UserService {
    user: User;

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string) {
        let url = '/login_check';
        let body     = new FormData();
        body.append('username', username);
        body.append('password', password);

        return this.http
            .post(url, body)
            .map((data: Response) => data.json());
    }

    register(email: string, username: string, password: string, firstname: string, lastname: string) {
        let url = '/register/';
        let body     = new FormData();
        body.append('email', email);
        body.append('username', username);
        body.append('password', password);
        //body.append('firstname', firstname);
        //body.append('lastname', lastname);

        return this.http
            .post(url, body)
            .map((data: Response) => data.json());
    }

    logout() {
        return this.http.get('/logout')
            .subscribe();
    }

    checkLogin(): Observable<User> {
        return this.http.get(`/user/login`).map(user => this.user as User);
    }

    getMe():Observable<User> {
        return this.http.get('/user/me').map(user => user as User);
    }

    getUserNotBusiness(id_business): Observable<User[]> {
        const url = `/business/users/` + id_business;
        return this.http.get(url).map(response => response as User[]);
    }
}