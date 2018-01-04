import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import * as _ from "lodash";

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

    delete(id: number) {
        console.log(id);
        this.productService.deleteOrder(id).subscribe(() => {
            this.orders = _.remove(this.orders, function (n) {
                return n.id != id;
            });
        });
    }

}
