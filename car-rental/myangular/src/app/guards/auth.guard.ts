import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
 providedIn: 'root'
})
export class RoutegaurdGuard implements CanActivate {
  constructor(public rtr :Router,private auth:UserServiceService,private user:UserServiceService)
  {
    
  }
 canActivate(
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
   if(this.user.isLoggedIn())
   {
    return true
   }
   else
   {
   
    this.rtr.navigate(['/login'])
    return false;
   }
     
 return true;
 }

}