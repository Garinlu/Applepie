import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product/product.service';
import * as _ from "lodash";
import {ConfirmModal} from "../modal/modal.component";
import {SuiModalService} from "ng2-semantic-ui";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    orders;

    constructor(private productService: ProductService, private modalService: SuiModalService) {
    }

    ngOnInit() {
        this.productService.getOrders().subscribe(orders => {
            this.orders = orders;
        })
    }

    delete(id: number) {
        this.modalService
            .open(new ConfirmModal("Suppression", "Êtes vous sûr de vouloir supprimer cette commande ? Vous ne pourrez pas revenir en arrière. " +
                "Il est important aussi de noter que le stock de ce produit va diminuer de la quantité que vous supprimez. " +
                "Il se peut donc que le stock devienne négatif, ce qui est anormal."))
            .onApprove(() => this.productService.deleteOrder(id).subscribe(() => {
                this.orders = _.remove(this.orders, function (n) {
                    return n.id != id;
                });
            }));
    }

    setActive(id_order: number) {
        let index_order = _.findIndex(this.orders, function (n) {
            return n.id = id_order;
        });

        this.productService.setActiveProduct(id_order, !this.orders[index_order].active).subscribe(data => {
            console.log(this.orders[index_order].active);
            console.log(!this.orders[index_order].active);
            this.orders[index_order].active = !this.orders[index_order].active;
        });
    }

}
