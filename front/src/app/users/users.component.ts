import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import * as _ from "lodash";
import {discardPeriodicTasks} from "@angular/core/testing";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users;
  constructor(private userServ: UserService) { }

  ngOnInit() {
    this.userServ.getAll().subscribe(data=>this.users = data);
  }

  getRole(userRole) {
     if (_.includes(userRole, 'ROLE_ADMIN')) return "Administrateur";
     return "Utilisateur";
  }

}
