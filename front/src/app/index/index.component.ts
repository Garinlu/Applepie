import {Component, OnInit} from '@angular/core';
import {BusinessService} from '../business/business.service';
import {Business} from '../business/business.model';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
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
