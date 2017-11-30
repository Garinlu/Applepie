import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string;
    password: string;

    error: string = '';

    constructor(private userService: UserService, private router: Router) {

    }

    public login() {
        this.userService.login(this.username, this.password)
            .subscribe(
                data => {
                    console.log(data);
                },
                error => {
                    this.error = error.message;
                    console.log(error);
                }
            );
    }

}
