import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';


@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products;

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
            let tmpProducts = [];
            let indexKnowing = [];
            listProducts.forEach(function (product) {
                let name = product.productPrice.product.name;
                if(!indexKnowing.hasOwnProperty(name)){
                    tmpProducts.push({name: name, products: []});
                    indexKnowing[name] = tmpProducts.length-1;
                }
                tmpProducts[indexKnowing[name]].products.push(product);

            });
            this.products = tmpProducts;
            console.log(this.products);
        });
    }

    deleteProduct(id: number): void {
        this.productService.deleteProduct(id).subscribe(() => location.reload());
    }
}