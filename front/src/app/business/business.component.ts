import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BusinessService} from './business.service';
import 'rxjs/add/operator/switchMap';
import {ConfirmModal} from '../modal/modal.component';
import {SuiModalService} from "ng2-semantic-ui"

@Component({
    selector: 'business',
    templateUrl: './business.component.html',
    styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
    @Input() business;
    @Input() productsGroup;
    @Input() products;
    showDetails: boolean[];
    productChoose;

    constructor(private businessService: BusinessService,
                private route: ActivatedRoute,
                private router: Router,
                private modalService: SuiModalService) {
    }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.businessService.getBusiness(+params.get('id')))
            .subscribe(business => {
                this.business = business;
                if (!this.business)
                    this.router.navigate(['/businesses']);
            });

        this.route.paramMap
            .switchMap((params: ParamMap) => this.businessService.getProductFromBusiness(+params.get('id'), true))
            .subscribe(data => {
                this.productsGroup = data;
                let tmpBool = [];
                this.productsGroup.forEach(function (prod) {
                    tmpBool.splice(prod.name, 0, false);
                });
                this.showDetails = tmpBool;
            });

        this.route.paramMap
            .switchMap((params: ParamMap) => this.businessService.getProductFromBusiness(+params.get('id'), false))
            .subscribe(datas => {
                this.products = datas;
            });

    }

    actionDetail(name: string) {
        this.showDetails[name] = !this.showDetails[name];
        return;
    }

    deleteProduct(id: number): void {
        this.businessService.deleteProductFromBusiness(id).subscribe(() => location.reload());
    }

    clickDeleteProduct(product) {
        this.productChoose = product;
        console.log(product);
        this.modalService
            .open(new ConfirmModal("Suppression", "Êtes vous sûr de vouloir supprimer du chantier cette utilisation :" +
                " Nom : " + this.productChoose.product.productDetail.name + " / Quantité : "
                + this.productChoose.quantity))
            .onApprove(() => this.deleteProduct(this.productChoose.id));
    }

}
