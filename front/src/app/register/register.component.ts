import {Component, OnInit} from '@angular/core';
import {AlertService} from "../alert/alert.service";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import * as _ from "lodash";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    email: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;

    constructor(private userService: UserService, private router: Router, private alertService: AlertService) {

    }

    public register() {
        this.userService.register(this.email, this.username, this.password, this.firstname, this.lastname)
            .subscribe(
                data => {
                },
                error => {
                    if (_.includes(error.url, 'login')) {
                        this.alertService.error('Connexion impossible. Veuillez vérifier vos identifiants.');
                    }
                },
                () => {
                    this.router.navigate(['/index']);
                }
            );
    }

}
