import { Component, EventEmitter, Output } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { booking } from 'src/app/models/booking';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css']
})
export class BookedComponent {
  @Output() carUpdated = new EventEmitter<booking[]>();
  bookingcars:booking[]=[];
  public fullEmail:string="";
  public role!:string;
  dataLoaded = false; 
  constructor(private bookservice:BookingServiceService,private userstore:UserServiceService,private toast:NgToastService)
  {

 }
 ngOnInit():void{
  this.userstore.getRoleFromStore()
  .subscribe(val => {
    const roleFromToken=this.userstore.getRoleFromToken();
    this.role =val || roleFromToken;
  })

  this.userstore.getFullEmailFromStore().subscribe(val =>{
  
    const fullEmailFromToken = this.userstore.getFullEmailFromToken();
  this.fullEmail = val || fullEmailFromToken;

  if (!val && fullEmailFromToken) {
    this.userstore.setFullEmailForStore(fullEmailFromToken);
  }

  });
  
      this.bookservice.getbookedcar()
      .subscribe((result:booking[]) => 
      {
        console.log('Data received:',result);
        // (this.bookingcars=result)
        this.bookingcars = result.map(item => ({ ...item, isBooked: !!item.isBooked }));
        this.dataLoaded = true;
      }
     
      
      
      )
      if (this.bookingcars.length > 0) {
        console.log(typeof this.bookingcars[0].totalprice);
      }
      else{
        console.log("hii")
      }

 }
 requestreturn(item:booking)
 {
  item.request = "waiting";
  const bookedItem: booking = { ...item, request: "waiting" };
  this.bookservice.updatebookingCar(bookedItem).subscribe(
    (updatedCars: booking[]) => {
      this.carUpdated.emit(updatedCars);
    },
    (error) => {
      console.error("Error booking car:", error);
      this.toast.error({ detail: "Error booking car", summary: "Error", duration: 5000 });
    }
  );

 }

}


