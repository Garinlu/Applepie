import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ProductFormComponent} from './product/product-form.component';
import {BusinessesComponent} from './businesses/businesses.component';
import {LoginComponent} from './login/login.component';
import {IndexComponent} from './index/index.component';
import {BusinessComponent} from './business/business.component';
import {BusinessFormComponent} from './business/business-form.component';
import {AddProdBusiFormComponent} from './businesses/AddProdBusi-form.component';
import {AddBusiUserFormComponent} from './business/AddBusiUser-form.component';

const APP_ROUTES: Routes = [
    {
        path: 'index',
        component: IndexComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'productsGroup',
        component: ProductsComponent
    },
    {
        path: 'businesses',
        component: BusinessesComponent
    },
    {
        path: 'business/:id',
        component: BusinessComponent
    },
    {
        path: 'addProduct',
        component: ProductFormComponent
    },
    {
        path: 'addBusiness',
        component: BusinessFormComponent
    },
    {
        path: 'addBusinessProduct/:id',
        component: AddProdBusiFormComponent
    },
    {
        path: 'addBusinessUser/:id',
        component: AddBusiUserFormComponent
    },
    { path: '**', redirectTo: 'index' }
];

export const Routing = RouterModule.forRoot(APP_ROUTES, {useHash: true});