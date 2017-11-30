import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';
import {User} from '../user/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    user: User;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        // this.userService.checkLogin().subscribe(user => this.user = user);
    }

    /*logout() {
        this.userService.logout();
        this.router.navigate(['./login']);
    }*/
}