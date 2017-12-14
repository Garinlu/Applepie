import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    orders;

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
        this.productService.getOrders().subscribe(orders => {
            this.orders = orders;
        })
    }

}
