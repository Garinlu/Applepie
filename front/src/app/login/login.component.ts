import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import * as _ from "lodash";
import {AlertService} from '../alert/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string;
    password: string;

    error: string = '';

    constructor(private userService: UserService, private router: Router, private alertService: AlertService) {

    }

    public login() {
        this.userService.login(this.username, this.password)
            .subscribe(
                data => {
                    this.router.navigate(['/index']);
                },
                error => {
                    if (_.includes(error.url, 'login')) {
                        this.alertService.error('Connexion impossible. Veuillez vérifier vos identifiants.');
                    }
                }
            );
    }

    //TODO register : url

}
