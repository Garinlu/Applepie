import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {SuiModule} from 'ng2-semantic-ui';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Ng2AutoCompleteModule} from 'ng2-auto-complete';


import {AppInterceptor} from './app.interceptor';
import {Routing} from './app.routing';

import {AppComponent} from './app.component';
import {ProductComponent} from './product/product.component';
import {ProductsComponent} from './products/products.component';
import {ProductService} from './product/product.service';
import {BusinessComponent} from './business/business.component';
import {BusinessesComponent} from './businesses/businesses.component';
import {BusinessService} from './business/business.service';
import {ProductFormComponent} from './product/product-form.component';
import {AppService} from './app.service';
import {LoginComponent} from './login/login.component';
import {AlertComponent} from './alert/alert.component';
import {UserService} from './user/user.service';
import { TemplateComponent } from './template/template.component';
import { IndexComponent } from './index/index.component';
import { UserComponent } from './user/user.component';
import {AlertService} from './alert/alert.service';
import {BusinessFormComponent} from './business/business-form.component';
import {AddProdBusiFormComponent} from './businesses/AddProdBusi-form.component';
import {AddBusiUserFormComponent} from './business/AddBusiUser-form.component';
import { ListBusinessesComponent } from './list-businesses/list-businesses.component';
import { ModalComponent } from './modal/modal.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterComponent } from './register/register.component';
import { TemplateLoginComponent } from './template-login/template-login.component';
import { UsersComponent } from './users/users.component';
import { ShadowRowTableDirective } from './shadow-row-table.directive';
import { UserRoleColorPipe } from './user-role-color.pipe';
import { UserFormComponent } from './user-form/user-form.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ResponsiveMenuDirective } from './responsive-menu.directive';

@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        TemplateComponent,
        LoginComponent,
        IndexComponent,
        ProductsComponent,
        ProductComponent,
        ProductFormComponent,
        BusinessComponent,
        BusinessesComponent,
        BusinessFormComponent,
        AddProdBusiFormComponent,
        AddBusiUserFormComponent,
        AlertComponent,
        ListBusinessesComponent,
        ModalComponent,
        OrdersComponent,
        RegisterComponent,
        TemplateLoginComponent,
        UsersComponent,
        ShadowRowTableDirective,
        UserRoleColorPipe,
        UserFormComponent,
        EditUserComponent,
        ResponsiveMenuDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        Routing,
        Ng2AutoCompleteModule,
        SuiModule
    ],
    providers: [ProductService, BusinessService, AppService, UserService, AlertService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [ModalComponent]
})
export class AppModule {

}
