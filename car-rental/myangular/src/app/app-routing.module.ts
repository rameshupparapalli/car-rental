import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CreateCarComponent } from './components/create-car/create-car.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { LoginComponent } from './components/login/login.component';
import{RoutegaurdGuard} from './guards/auth.guard'
import { UserViewComponent } from './components/user-view/user-view.component';
import { SinglePageComponent } from './components/single-page/single-page.component';
import { UserAgreementComponent } from './components/user-agreement/user-agreement.component';
import { UseragreeupdateComponent } from './components/useragreeupdate/useragreeupdate.component';
import { BookedComponent } from './components/booked/booked.component';
import { CarreturnComponent } from './components/carreturn/carreturn.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    component:AdminComponent,
    path:''
   },
  { path: 'admin', component: AdminComponent,canActivate: [RoutegaurdGuard] }, 
  {path:'admin/addcar', component:CreateCarComponent, canActivate: [RoutegaurdGuard] },
  {path:'edit/:id',component:EditCarComponent, canActivate: [RoutegaurdGuard] },
  {path:'login',component:LoginComponent},
  {path:'user',component:UserViewComponent,canActivate:[RoutegaurdGuard]},
  {path:'singlepage/:id',component:SinglePageComponent,canActivate:[RoutegaurdGuard]},
  {path:'useragreement',component:UserAgreementComponent,canActivate:[RoutegaurdGuard]},
  {path:'useragreeupdate/:id',component:UseragreeupdateComponent,canActivate:[RoutegaurdGuard]},
  {path:'booking',component:BookedComponent,canActivate:[RoutegaurdGuard]},
  {path:'carreturn',component:CarreturnComponent,canActivate:[RoutegaurdGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
