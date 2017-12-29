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

    constructor(private userService: UserService, private router: Router, private alertService: AlertService) {

    }

    public register() {
        console.log(this.role);

        this.userService.register(this.email, this.username, this.password, this.passwordVerif, this.firstname, this.lastname, this.role)
            .subscribe(
                data => {
                    if (data) {
                        let string = "";
                        _.forEach(data, function (value) {
                            string += value + " ";
                        });
                        this.alertService.error(string);
                    } else {
                        this.router.navigate(['/users']);
                    }
                }
            );
    }

}
