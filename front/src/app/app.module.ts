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
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import {AlertService} from './alert/alert.service';
import {BusinessFormComponent} from './business/business-form.component';
import {AddProdBusiFormComponent} from './businesses/AddProdBusi-form.component';
import {AddBusiUserFormComponent} from './business/AddBusiUser-form.component';
import { ListBusinessesComponent } from './list-businesses/list-businesses.component';

@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        HeaderComponent,
        FooterComponent,
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
        ListBusinessesComponent
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
    bootstrap: [AppComponent]
})
export class AppModule {

}
