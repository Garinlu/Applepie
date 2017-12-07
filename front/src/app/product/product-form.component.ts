import {Component, OnInit} from '@angular/core';
import { Product } from './product.model';
import {ProductService} from './product.service';
import {Router} from '@angular/router';
@Component({
    selector: 'product-form',
    templateUrl: 'product-form.component.html',
    styles: [`
        .ng-valid { border-color: green; }
        .ng-invalid { border-color: red; }
    `]
})
export class ProductFormComponent implements OnInit {
    productsName: string[] = [];
    ngOnInit() {
        this.productService.getProductsDetail().subscribe(products => {
            let productsN = [];
            products.forEach(function(element) {
                productsN.push(element.name);
            });
            this.productsName = productsN;

        });
    }
    constructor(private productService: ProductService, private router: Router) {
    }
    onSubmit(value): void {
        const product = new Product(value.name, value.quantity, value.price);
        this.productService.putProduct(product).subscribe(mess => {
            if (mess) {
                this.router.navigate(['/productsGroup']);
            }
        });
    }
}