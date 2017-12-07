import {Component, OnDestroy, OnInit} from '@angular/core';
import {Business} from '../business/business.model';
import {BusinessService} from '../business/business.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../product/product.service';
@Component({
    selector: 'AddProdBusi-form',
    templateUrl: 'AddProdBusi-form.component.html',
    styles: [`
        .ng-valid {
            border-color: green;
        }

        .ng-invalid {
            border-color: red;
        }
    `]
})
export class AddProdBusiFormComponent implements OnInit, OnDestroy {
    id_business: number;
    private sub: any;
    products;
    productChoose;
    quantity;

    constructor(private router: Router, private route: ActivatedRoute, private productServ: ProductService, private businessServ: BusinessService) {
    }

    myCallback(val) {
        this.productChoose = val;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id_business = +params['id'];
        });
        this.productServ.getProductsFree().subscribe(products => {
            this.products = products;

        });
        this.quantity = 1;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onChange(model:Array<string>) {
        this.productChoose = model.toString().split(';')[0];
        console.log(this.quantity);
    }

    addProdToBusiness(): void {
        this.businessServ.putBusinessProduct(this.id_business, this.productChoose, this.quantity).subscribe(
            () => this.router.navigate(['/business', this.id_business])
        );
    }


    getMaxQuantity(): number {
        if (!this.productChoose)
            return 1;
        for (let element in this.products) {
            if (this.products[element].id == this.productChoose)
                return this.products[element].quantity;
        }
        return 0;
    }
}