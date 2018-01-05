import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../user/user.model";

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

    user: User = null;

    constructor(private route: ActivatedRoute,
                private userService: UserService) {
    }

    ngOnInit(): void {
        let id = +this.route.snapshot.params['id'];
        this.userService.getUser(id).subscribe(user => {
          this.user = user;
        });
    }

}