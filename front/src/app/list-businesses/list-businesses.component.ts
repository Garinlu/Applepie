import {Component, OnInit} from '@angular/core';
import {Business} from '../business/business.model';
import {Router} from '@angular/router';
import {BusinessService} from '../business/business.service';
import * as _ from "lodash";

@Component({
    selector: 'app-list-businesses',
    templateUrl: './list-businesses.component.html',
    styleUrls: ['./list-businesses.component.css']
})
export class ListBusinessesComponent implements OnInit {
    myBusiness_all: Business[];
    myBusiness: Business[];
    dataSearch;
    listPage;
    currentPage = 1;

    ngOnInit(): void {
        this.busiServ.getBusinesses(this.currentPage).subscribe(businesses => {
            this.myBusiness_all = businesses['business'];
            this.myBusiness = this.myBusiness_all;
            this.listPage = _.range(1, businesses['nb_pages'] + 1);
        });
    }

    constructor(private busiServ: BusinessService, private router: Router) {
    }

    goToDetail(id: number): void {
        this.router.navigate(['/business', id]);
    }

    setFilter() {
        this.myBusiness = _.filter(this.myBusiness_all, function (o) {
            let reg = new RegExp(this.dataSearch, "i");
            return (reg.test(o.name));
        }.bind(this));
    }

    goToPage(page){
        this.currentPage = page;
        this.busiServ.getBusinesses(this.currentPage).subscribe(businesses => {
            this.myBusiness_all = businesses['business'];
            this.myBusiness = this.myBusiness_all;
            this.listPage = _.range(1, businesses['nb_pages'] + 1);
        });
    }
}
