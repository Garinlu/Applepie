import { Component, OnInit } from '@angular/core';
import {Business} from '../business/business.model';
import {Router} from '@angular/router';
import {BusinessService} from '../business/business.service';

@Component({
  selector: 'app-list-businesses',
  templateUrl: './list-businesses.component.html',
  styleUrls: ['./list-businesses.component.css']
})
export class ListBusinessesComponent implements OnInit {
  myBusiness: Business[];

  ngOnInit(): void {
    this.busiServ.getBusinesses().subscribe(businesses => {
      this.myBusiness = businesses;
    });
  }

  constructor(private busiServ: BusinessService, private router: Router) {
  }

  goToDetail(id: number): void {
    this.router.navigate(['/business', id]);
  }
}
