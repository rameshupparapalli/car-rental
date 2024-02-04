import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private email$=new BehaviorSubject<string>("");
  private role$=new BehaviorSubject<string>("");
private userUrl ="http://localhost:10520/api/User/";
private userPayLoad:any;
  constructor(private http: HttpClient,private rtr:Router) {
    this.userPayLoad=this.decodedToken();
   }

  login(loginObj:any)
  {
   return this.http.post<any>(`${this.userUrl}authenticate`,loginObj);
  }
  storeToken(tokenvalue:string)
  {
   localStorage.setItem('token',tokenvalue)
   this.userPayLoad = this.decodedToken();
  }
  
  decodedToken()
  {
  
  const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    if (token) {
      console.log(jwtHelper.decodeToken(token));
      return jwtHelper.decodeToken(token);
    }
    return null;
  }
  getRoleFromToken()
  {

  if (this.userPayLoad) {
    return this.userPayLoad.role;
  }
  return null;

  }
  getFullEmailFromToken()
  {
    
    if (this.userPayLoad) {
      return this.userPayLoad.email;
    }
    return null;
  }
  getToken()
  {
   return localStorage.getItem('token')
  }
  isLoggedIn():boolean
  {
   return !! localStorage.getItem('token')
  }
  signOut()
  {
   localStorage.clear();
   this.userPayLoad = null;
   this.rtr.navigate(['login'])

  }
  public getRoleFromStore()
  {
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string)
  {
    this.role$.next(role);
  }

  public getFullEmailFromStore()
  {
    return this.email$.asObservable();
  }
  public setFullEmailForStore(email:string)
  {
    this.email$.next(email)
  }

 
}
