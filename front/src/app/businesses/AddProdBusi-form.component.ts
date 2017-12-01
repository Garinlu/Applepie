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
    productsName;
    products;
    productChoose;

    constructor(private router: Router, private route: ActivatedRoute, private productServ: ProductService, private businessServ: BusinessService) {
    }

    myCallback(val) {
        this.productChoose = val;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id_business = +params['id'];
        });
        this.productServ.getProducts().subscribe(products => {
            this.products = products;
            console.log(this.products);
            let productsN = [];
            products.forEach(function (element) {
                productsN.push({key: element.id, value: element.productPrice.product.name + " - " + element.productPrice.price + "€"});

            });
            this.productsName = productsN;

        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSubmit(value): void {
        if (value.quantity > this.getMaxQuantity())
        {
            alert('Quantité trop élevé');
            return;
        }
        this.businessServ.putBusinessProduct(this.id_business, this.productChoose, value.quantity).subscribe(
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