import {Routes, RouterModule} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ProductFormComponent} from './product/product-form.component';
import {BusinessesComponent} from './businesses/businesses.component';
import {LoginComponent} from './login/login.component';
import {IndexComponent} from './index/index.component';
import {BusinessComponent} from './business/business.component';
import {BusinessFormComponent} from './business/business-form.component';
import {AddProdBusiFormComponent} from './businesses/AddProdBusi-form.component';
import {AddBusiUserFormComponent} from './business/AddBusiUser-form.component';
import {OrdersComponent} from './orders/orders.component';
import {TemplateComponent} from './template/template.component';
import {RegisterComponent} from "./register/register.component";
import {TemplateLoginComponent} from "./template-login/template-login.component";
import {UsersComponent} from "./users/users.component";
import {EditUserComponent} from "./edit-user/edit-user.component";

const APP_ROUTES: Routes = [
    {
        path: '', component: TemplateComponent,
        children: [
            {
                path: 'index',
                component: IndexComponent
            },
            {
                path: 'businesses',
                component: BusinessesComponent
            },
            {
                path: 'products',
                component: ProductsComponent
            },
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'user/edit/:id',
                component: EditUserComponent
            },
            {
                path: 'orders',
                component: OrdersComponent
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
            {
                path: 'register',
                component: RegisterComponent
            }
        ]

    },
    {
        path: '', component: TemplateLoginComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            }]
    },
    {path: '**', redirectTo: 'index'}
];

export const Routing = RouterModule.forRoot(APP_ROUTES, {useHash: true});