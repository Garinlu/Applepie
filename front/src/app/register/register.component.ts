import {Component, OnInit} from '@angular/core';
import {AlertService} from "../alert/alert.service";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import * as _ from "lodash";
import {User} from "../user/user.model";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
    user: User;
    passwordVerif: string;

    constructor(private userService: UserService, private router: Router, private alertService: AlertService) {

    }

    ngOnInit(): void {
        this.user = new User();
    }

    public register() {
        if (this.user.password != this.passwordVerif) {
            this.alertService.error('Mots de passes pas identiques.');
            return;
        }

        this.userService.register(this.user)
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
