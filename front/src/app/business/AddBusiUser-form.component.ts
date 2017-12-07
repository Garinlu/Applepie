import {Component, OnDestroy, OnInit} from '@angular/core';
import {Business} from './business.model';
import {BusinessService} from './business.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Component({
    selector: 'addbusiuser-form',
    templateUrl: 'AddBusiUser-form.component.html',
    styles: [`
        .ng-valid { border-color: green; }
        .ng-invalid { border-color: red; }
    `]
})


export class AddBusiUserFormComponent implements OnInit, OnDestroy {
    id_business: number;
    private sub: any;
    user_select;

    list_users;

    constructor(private router: Router, private route: ActivatedRoute, private userServ: UserService, private businessServ: BusinessService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id_business = +params['id'];
        });
        this.userServ.getUserNotBusiness(this.id_business).subscribe(users => {
            this.list_users = users;

        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onChange(model:Array<string>) {
        this.user_select = model.toString().split(';')[0];
    }

    addUserToBusiness(): void {
        this.businessServ.putBusinessUser(this.id_business, this.user_select).subscribe(
            () => this.router.navigate(['/business', this.id_business])
        );
    }

}