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


// TODO : LINK LIST USER AND SEND THE CHOOSE ONE
export class AddBusiUserFormComponent implements OnInit, OnDestroy {
    id_business: number;
    private sub: any;
    user_select;
    users_name;

    constructor(private router: Router, private route: ActivatedRoute, private userServ: UserService, private businessServ: BusinessService) {
    }


    myCallback(val) {
        this.user_select = val;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id_business = +params['id'];
        });
        this.userServ.getUserNotBusiness(this.id_business).subscribe(users => {
            let usersT = [];
            users.forEach(function (element) {
                usersT.push({
                    key: element.id,
                    value: element.firstname + " " + element.lastname
                });

            });
            this.users_name = usersT;

        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    onSubmit(): void {
        this.businessServ.putBusinessUser(this.id_business, this.user_select).subscribe(
            () => this.router.navigate(['/business', this.id_business])
        );
    }

}