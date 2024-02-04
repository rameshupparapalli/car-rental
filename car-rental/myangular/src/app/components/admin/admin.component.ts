import { Component, EventEmitter, Input, Output } from '@angular/core';
import { car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
 cars:car[]=[];
 @Input() car?:car;
 @Output() carUpdated = new EventEmitter<car[]>();
 carToEdit?:car;
  public fullEmail:string="";
  public role!:string;

 constructor(private carservice:CarService,private router: Router,private userstore:UserServiceService,private user:UserServiceService,private toast:NgToastService){}

 
 ngOnInit() : void{
  this.userstore.getRoleFromStore()
    .subscribe(val => {
      const roleFromToken=this.user.getRoleFromToken();
      this.role =val || roleFromToken;
    })
    this.userstore.getFullEmailFromStore()
    .subscribe(val =>{
      const usernameFromToken=this.userstore.getFullEmailFromToken();
      this.fullEmail=val || usernameFromToken;
      console.log(this.fullEmail)
     
    })



  this.carservice.getcar()
  .subscribe((result:car[]) => (this.cars = result));

}
deleteCar(car:car){
  this.carservice.deleteCar(car).subscribe((cars:car[]) => 
  this.carUpdated.emit(cars)
  )
  
  // this.router.navigate(['/admin']);
  this.toast.success({detail:"Success",summary:"Item Deleted",duration:5000});
  window.location.reload();

}
createCar(car:car){
  this.carservice.createCar(car).subscribe((cars:car[]) => this.carUpdated.emit(cars))

}
// initNewCar()
// {
//   this.carToEdit=new car();
// }

}
