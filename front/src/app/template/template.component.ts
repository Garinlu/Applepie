import {Component, OnInit} from '@angular/core';
import {User} from '../user/user.model';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';
import * as _ from "lodash";


@Component({
    selector: 'app-header',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

    user: User;
    role;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.userService.getMe().subscribe(user => {
                this.user = user as User;
                if (_.includes(this.user.roles, 'ROLE_ADMIN')) {
                    this.role = 'ADMINISTRATEUR';
                } else {
                    this.role = 'UTILISATEUR';
                }
            },
            error => {
                if (_.includes(error.url, 'login'))
                    this.router.navigate(['/login']);
            });
    }

    logout() {
        this.userService.logout().subscribe(data => {
                this.router.navigate(['/login'])
            },
            error => {
                this.router.navigate(['/login'])
            },
            () => {
                this.router.navigate(['/login'])
            });

    }
}