import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";

@Component({
    selector: 'app-phone-directory',
    templateUrl: './phone-directory.component.html',
    styleUrls: ['./phone-directory.component.css']
})
export class PhoneDirectoryComponent implements OnInit {
    users: User[];
    dataSearch: string;

    constructor(private userServ: UserService) {
    }

    ngOnInit() {
        this.userServ.getAll('').subscribe(data => this.users = data);
    }

    setFilter() {
        this.userServ.getAll(this.dataSearch).subscribe(data => this.users = data);
    }
}
