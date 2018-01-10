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
    product: Product;
    productsName: string[] = [];
    ngOnInit() {
        this.productService.getProductsDetail().subscribe(products => {
            let productsN = [];
            products.forEach(function(element) {
                productsN.push(element.name);
            });
            this.productsName = productsN;

        });
        this.product = new Product();
    }
    constructor(private productService: ProductService, private router: Router) {
    }
    onSubmit(): void {
        this.productService.putProduct(this.product).subscribe(mess => {
            if (mess) {
                this.router.navigate(['/orders']);
            }
        });
    }
}