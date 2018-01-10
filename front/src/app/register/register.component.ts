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
    passwordVerif: string;
    firstname: string;
    lastname: string;
    role;
    gender;
    phone;

    constructor(private userService: UserService, private router: Router, private alertService: AlertService) {

    }

    public register() {
        this.userService.register(this.email, this.username, this.password, this.passwordVerif, this.firstname,
            this.lastname, this.role, this.gender, this.phone)
            .subscribe(
                data => {
                    if (data && !_.isEmpty(_.head(data))) {
                        let string = "";
                        _.forEach(data, function (value) {
                            string += value + " ";
                        });
                        this.alertService.error(string);
                        return;
                    }
                    this.redirect();
                }
            );
    }
    public redirect() {
        this.router.navigate(['/users']);

    }

}
