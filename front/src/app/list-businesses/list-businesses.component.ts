import { Component, OnInit } from '@angular/core';
import {Business} from '../business/business.model';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-businesses',
  templateUrl: './list-businesses.component.html',
  styleUrls: ['./list-businesses.component.css']
})
export class ListBusinessesComponent implements OnInit {
  myBusiness: Business[];

  ngOnInit(): void {
    this.userServ.getUser().subscribe(user => {
      this.myBusiness = user.business;
    });
  }

  constructor(private userServ: UserService, private router: Router) {
  }

  goToDetail(id: number): void {
    this.router.navigate(['/business', id]);
  }
}
