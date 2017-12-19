import {Injectable} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import {Router} from "@angular/router";
import {AlertService} from './alert/alert.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private router: Router, private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .map((event: HttpEvent<any>) => {
                return event;
            })
            .catch((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401 || err.status === 403 || err.status === 0) {
                        this.router.navigate(['/login']);
                    }
                    else if (err.status === 500) {
                        let err_mess = err.error.error.exception[0].message;
                        if (err_mess) {
                            this.alertService.error(err_mess);
                        }
                    }
                    return Observable.throw(err);
                }
            });
    }
}