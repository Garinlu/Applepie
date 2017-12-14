import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';

import * as _ from "lodash";

@Component({
    selector: 'productsGroup',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products_all;
    products;
    showDetails: boolean[];
    dataSearch;

    columns = [
        {name: 'Id'},
        {name: 'Name'},
        {name: 'stockquantity'},
        {name: 'Price'},
    ];

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(listProducts => {
            this.products_all = listProducts;
            this.products = this.products_all;
            let tmpBool = [];
            this.products.forEach(function (prod) {
                tmpBool.splice(prod.name, 0, false);
            });
            this.showDetails = tmpBool;
            console.log(this.showDetails);
        });
    }


    actionDetail(name: string) {
        this.showDetails[name] = !this.showDetails[name];
        return;
    }

    deleteProduct(id: number): void {
        this.productService.deleteProductOrder(id).subscribe(() => location.reload());
    }

    setFilter() {
        this.products = _.filter(this.products_all, function (o) {
            let reg = new RegExp(this.dataSearch, "i");
            return (reg.test(o.name));
        }.bind(this));
    }
}