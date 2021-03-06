import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user/user.model";
import {TemplateComponent} from "../template/template.component";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
    me: User;

    constructor(private template: TemplateComponent, private userService: UserService) {
    }

    ngOnInit() {
        this.me = this.template.user;
    }

    updateUser() {
        this.userService.post(this.me)
            .subscribe(data => {
                location.reload();
            });
    }

}
