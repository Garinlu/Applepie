import {Component, OnInit} from '@angular/core';
import { Business } from './business.model';
import {BusinessService} from './business.service';
import {Router} from '@angular/router';
@Component({
    selector: 'business-form',
    templateUrl: 'business-form.component.html',
    styles: [`
        .ng-valid { border-color: green; }
        .ng-invalid { border-color: red; }
    `]
})
export class BusinessFormComponent implements OnInit{
    business: Business;

    constructor(private businessService: BusinessService, private router: Router) {
    }
    ngOnInit() {
        this.business = new Business();
    }

    onSubmit(): void {
        this.businessService.putBusiness(this.business).subscribe(mess => {
            if (mess) {
                this.router.navigate(['/businesses']);
            }
        });
    }
}