import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { CreateCarComponent } from './components/create-car/create-car.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { UserViewComponent } from './components/user-view/user-view.component';
import { SinglePageComponent } from './components/single-page/single-page.component';
import { UserAgreementComponent } from './components/user-agreement/user-agreement.component';
import { UseragreeupdateComponent } from './components/useragreeupdate/useragreeupdate.component';
import { BookedComponent } from './components/booked/booked.component';
import { CarreturnComponent } from './components/carreturn/carreturn.component';
@NgModule({
  declarations: [
    AppComponent,
    EditCarComponent,
    AdminComponent,
    CreateCarComponent,
    LoginComponent,
    UserViewComponent,
    SinglePageComponent,
    UserAgreementComponent,
    UseragreeupdateComponent,
    BookedComponent,
    CarreturnComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgToastModule,
   
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
