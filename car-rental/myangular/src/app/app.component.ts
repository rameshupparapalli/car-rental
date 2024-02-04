import { Component } from '@angular/core';
import { car } from './models/car';
import { CarService } from './services/car.service';
import { Router } from '@angular/router';
import { UserServiceService } from './services/user-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myangular';
  cars:car[]=[];
  // carToEdit?:car;
  menuType:String='default';
  public role!:string;
  public fullEmail:string="";

  constructor(private carservice :CarService,private route:Router,private userstore:UserServiceService,private user:UserServiceService,private toast:NgToastService){}

  ngOnInit() : void{
    this.carservice.getcar()
    .subscribe((result:car[]) => (this.cars = result));
    this.route.events.subscribe((val:any) =>
    {
      // console.warn(val.url);
      if(localStorage.getItem('token') )
      {
        // console.warn("this is inside")
        this.menuType="logged"
        
      }
      else{
        // console.warn("outside");
        this.menuType="default"
      }
      
    })
    this.userstore.getRoleFromStore()
    .subscribe(val => {
      const roleFromToken=this.user.getRoleFromToken();
      this.role =val || roleFromToken;

    })
    this.userstore.getFullEmailFromStore().subscribe(val =>{
      // let FullNameFromToken=this.groceriesService.getFullNameFromToken();
      // this.fullName = val || FullNameFromToken
      const fullEmailFromToken = this.user.getFullEmailFromToken();
    this.fullEmail = val || fullEmailFromToken;

    // Update the full name in the store if it is not already set
    if (!val && fullEmailFromToken) {
      this.userstore.setFullEmailForStore(fullEmailFromToken);
    }

    });
    
  }
  logout()
  {
    this.user.signOut();
    this.toast.success({detail:"Success",summary:"LogOut successfully",duration:5000});
     

  }
 
  // updateCarList(ucar:car[])
  // {
  //   this.cars = ucar;
  // }
  // initNewCar()
  // {
  //   this.carToEdit=new car();
  // }
  // editCar(car:car)
  // {
  //   this.carToEdit=car;
  // }
}



