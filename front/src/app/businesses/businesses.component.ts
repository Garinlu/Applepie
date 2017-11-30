import {Component, OnInit} from '@angular/core';
import {Business} from '../business/business.model';
import {Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Component({
    selector: 'businesses',
    templateUrl: './businesses.component.html',
    styleUrls: ['./businesses.component.css']
})

export class BusinessesComponent implements OnInit {
    businesses: Business[];
    columns = [
        {name: 'Id'},
        {name: 'Name'}
    ];

    ngOnInit(): void {
        this.userServ.getUser().subscribe(user => {
            this.businesses = user.business;
            console.log(this.businesses);
        });
    }

    constructor(private userServ: UserService, private router: Router) {
    }

    goToDetail(id: number): void {
        this.router.navigate(['/business', id]);
    }
}