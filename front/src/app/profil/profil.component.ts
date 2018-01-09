import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user/user.model";
import {TemplateComponent} from "../template/template.component";

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
    me: User;

    constructor(private template: TemplateComponent) {
    }

    ngOnInit() {
        this.me = this.template.user;
        console.log(this.me);
    }

}
