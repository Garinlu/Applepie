import {Component, OnInit} from '@angular/core';
import {UserService} from "../user/user.service";
import * as _ from "lodash";
import {ConfirmModal} from "../modal/modal.component";
import {SuiModalService} from "ng2-semantic-ui";
import {User} from "../user/user.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users;
    dataSearch;

    constructor(private userServ: UserService, private modalService: SuiModalService, private router: Router) {
    }

    ngOnInit() {
        this.userServ.getAll('').subscribe(data => this.users = data);
    }

    setFilter() {
        this.userServ.getAll(this.dataSearch).subscribe(data => this.users = data);
    }

    getRole(userRole) {
        if (_.includes(userRole, 'ROLE_ADMIN')) return "Administrateur";
        return "Utilisateur";
    }

    delete(id: string) {
        this.modalService
            .open(new ConfirmModal("Suppression", "Êtes vous sûr de vouloir supprimer cet utilisateur ? Vous ne pourrez pas revenir en arrière."))
            .onApprove(() => this.userServ.delete(id).subscribe(() => {
                this.users = _.remove(this.users, function (n) {
                    return n.id != id;
                });
            }));
    }

    goEdit(user: User): void {
        let link = ['/user/edit', user.id];
        this.router.navigate(link);
    }
}
