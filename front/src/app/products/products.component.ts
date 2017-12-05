import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';


@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products;
    showDetails: boolean[];

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
            this.products = listProducts;
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
}