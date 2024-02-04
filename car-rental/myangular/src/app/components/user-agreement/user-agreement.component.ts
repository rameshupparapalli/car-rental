import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { booking } from 'src/app/models/booking';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.css']
})
export class UserAgreementComponent 
{
@Output() carUpdated = new EventEmitter<booking[]>();
 bookingcars:booking[]=[];
 checkbookedcar: booking[] = [];
 submitted: boolean = false;
 public fullEmail:string="";
 public role!:string;
 constructor(private bookservice:BookingServiceService,private userstore:UserServiceService,private toast:NgToastService,private route:Router)
 {

 }
 matchingItemsFound = false;
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
      }
     
      
      
      )
      if (this.bookingcars.length > 0) {
        console.log(typeof this.bookingcars[0].totalprice);
      }
      else{
        console.log("hii")
      }

 }
 deleteBookedCar(bookedcar:booking){
  this.bookservice.deletebookedCar(bookedcar).subscribe((deletedcar:booking[]) => 
  this.carUpdated.emit(deletedcar)
  )
  this.toast.success({detail:"Success",summary:"Item Deleted",duration:5000});
  window.location.reload();
 }
 


booknow(item: booking) {
  console.log(item);

  if (item && typeof item.isBooked !== 'undefined') {
    // console.log(item);

    if (item.isBooked) {
      this.toast.warning({ detail: "Car is already booked.", summary: "Warning", duration: 5000 });
      return;
    }

    this.bookservice.getdatebookingcar(item.carid).subscribe((resultset: booking[] | undefined) => {
      if (resultset) {

        this.checkbookedcar = resultset;
        console.log(this.checkbookedcar.length);
        
      
  
        const BookingCarStarttime = new Date(item.startdate);
        const BookingCarEndtime = new Date(item.enddate);
  
        // Initialize a flag to check if there's an overlap
        let hasOverlap = false;
  
        // Iterate through existing bookings
        for (const item of this.checkbookedcar) {
          const CheckBookedStarttime = new Date(item.startdate);
          const CheckBookedEndtime = new Date(item.enddate);
          const status = item.isBooked;
          const availability_request = item.request;
          console.log(item.request)
         
          console.log('BookingCarStarttime:', BookingCarStarttime);
          console.log('BookingCarEndtime:', BookingCarEndtime);
          console.log('CheckBookedStarttime:', CheckBookedStarttime);
          console.log('CheckBookedEndtime:', CheckBookedEndtime);
  
      
            if (
              ((BookingCarStarttime <= CheckBookedEndtime && BookingCarEndtime >= CheckBookedStarttime) ||
              (CheckBookedStarttime <= BookingCarEndtime && CheckBookedEndtime >= BookingCarStarttime)) && status===true && (availability_request === 'request' || availability_request === 'waiting')
            ) {
            hasOverlap = true;
            break; 
          }
        }
  
        console.log('hasOverlap:', hasOverlap);
  
        // If there's an overlap, show a warning message and don't book
        if (hasOverlap) {
          this.toast.warning({ detail: "Car is already booked for this date range.", summary: "Warning", duration: 5000 });
        } 
        else
         {
          const bookedItem: booking = { ...item, isBooked: true };

    this.bookservice.updatebookingCar(bookedItem).subscribe(
      (updatedCars: booking[]) => {
        this.carUpdated.emit(updatedCars);
        this.route.navigate(['/booking'])
      },
      (error) => {
        console.error("Error booking car:", error);
        this.toast.error({ detail: "Error booking car", summary: "Error", duration: 5000 });
      }
    );
        }
      }
     
    });

   
  }
}




 
}
