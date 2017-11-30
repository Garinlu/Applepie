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
export class BusinessFormComponent {

    constructor(private businessService: BusinessService, private router: Router) {
    }
    onSubmit(value): void {
        const business = new Business(0, value.name);
        this.businessService.putBusiness(business).subscribe(mess => {
            if (mess) {
                this.router.navigate(['/businesses']);
            }
        });
    }
}