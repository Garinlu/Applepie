import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BusinessService} from './business.service';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'business',
    templateUrl: './business.component.html',
    styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
    @Input() business;
    @Input() productsGroup;
    @Input() products;
    showDetails: boolean[];



    deleteProduct(id: number): void {
        this.businessService.deleteProduct(id).subscribe(() => location.reload());
    }

    constructor(private businessService: BusinessService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.businessService.getBusiness(+params.get('id')))
            .subscribe(business => {
                this.business = business;
                if (!this.business)
                    this.router.navigate(['/businesses']);
            });

        this.route.paramMap
            .switchMap((params: ParamMap) => this.businessService.getProductFromBusiness(+params.get('id'), true))
            .subscribe(data => {
                this.productsGroup = data;
                let tmpBool = [];
                this.productsGroup.forEach(function (prod) {
                    tmpBool.splice(prod.name, 0, false);
                });
                this.showDetails = tmpBool;
            });

        this.route.paramMap
            .switchMap((params: ParamMap) => this.businessService.getProductFromBusiness(+params.get('id'), false))
            .subscribe(datas => {
                this.products = datas;
            });

    }

    actionDetail(name: string) {
        this.showDetails[name] = !this.showDetails[name];
        return;
    }
}
