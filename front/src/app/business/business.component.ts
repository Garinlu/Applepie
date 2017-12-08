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
    @Input() users;
    @Input() users_print;
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

        this.route.paramMap
            .switchMap((params: ParamMap) => this.businessService.getUsersFromBusiness(+params.get('id')))
            .subscribe(users => {
                this.users = users;
                let users_tmp = [];
                this.users.forEach(function (user) {
                    console.log(user);
                    users_tmp[user.id] = true;
                });
                this.users_print = users_tmp;
                console.log(this.users_print);
            });

    }

    actionDetail(name: string) {
        this.showDetails[name] = !this.showDetails[name];
        return;
    }

    clickDeleteProduct(product) {
        this.productChoose = product;
        this.modalService
            .open(new ConfirmModal("Suppression", "Êtes vous sûr de vouloir supprimer du chantier cette utilisation :" +
                " Nom : " + this.productChoose.product.productDetail.name + " / Quantité : "
                + this.productChoose.quantity))
            .onApprove(() => this.businessService.deleteProductFromBusiness(this.productChoose.id).subscribe(() => location.reload()));
    }

    deleteUser(id) {
        this.modalService
            .open(new ConfirmModal("Suppression", "Êtes vous sûr de vouloir supprimer cet utilisateur du chantier ?"))
            .onApprove(() => this.route.paramMap
                .switchMap((params: ParamMap) => this.businessService.deleteUserFromBusiness(+params.get('id'), id))
                .subscribe(() => {
                    this.users_print[id] = false
                })
            )
        ;

    }

    changeStatus() {
        this.modalService
            .open(new ConfirmModal("Suppression", "Êtes vous sûr de vouloir changer le status de ce chantier ? Si vous " +
                "le désactivé, seul un administrateur pourra le réactiver."))
            .onApprove(() => this.route.paramMap
                .switchMap((params: ParamMap) => this.businessService.postBusinessStatus(+params.get('id')))
                .subscribe(() => this.router.navigate(['/businesses'])))
            .onDeny(() => location.reload());

    }
}
