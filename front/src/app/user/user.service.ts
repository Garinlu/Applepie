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
        let body = new FormData();
        body.append('_username', username);
        body.append('_password', password);

        return this.http
            .post(url, body);
    }

    register(email: string, username: string, password: string, passwordVerif: string, firstname: string,
             lastname: string, role: string, gender: string, phone: string) {
        let url = '/user/createUser';
        let b = {
            user:
                {
                    email: email,
                    username: username,
                    plainPassword: password,
                    plainPasswordVerif: passwordVerif,
                    firstname: firstname,
                    lastname: lastname,
                    role: role,
                    gender: gender,
                    phone: phone
                }
        };

        return this.http
            .post(url, JSON.stringify(b));
    }

    post(user: User) {
        let url = '/user/' + user.id;
        let b = {
            user:
                {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    roles: user.roles,
                    gender: user.gender,
                    phone: user.phone,
                }
        };

        return this.http
            .post(url, JSON.stringify(b));
    }

    logout() {
        return this.http.get('/logout');
    }

    getMe(): Observable<User> {
        return this.http.get('/user/me').map(user => user as User);
    }

    getUser(id: number): Observable<User> {
        return this.http.get('/user/' + id).map(user => user as User);
    }

    getAll(): Observable<User[]> {
        return this.http.get('/user/all').map(users => users as User[]);
    }

    getUserNotBusiness(id_business): Observable<User[]> {
        const url = `/business/users/` + id_business;
        return this.http.get(url).map(response => response as User[]);
    }

    delete(id: string) {
        let url = '/user/' + id;
        return this.http
            .delete(url);
    }
}