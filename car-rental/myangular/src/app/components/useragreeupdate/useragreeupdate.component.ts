import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { booking } from 'src/app/models/booking';
import { BookingServiceService } from 'src/app/services/booking-service.service';

@Component({
  selector: 'app-useragreeupdate',
  templateUrl: './useragreeupdate.component.html',
  styleUrls: ['./useragreeupdate.component.css']
})
export class UseragreeupdateComponent {
  currentDate = new Date();
  checkbookedcar: booking[] = [];
 
  
  cardata :booking={
    id:0,
    carid:'',
    image:'',
    maker:'',
    brand:'',
    rentalprice:0,
    startdate:'',
    enddate:'',
    noofdays:0,
    totalprice:0,
    email:'',
    isBooked:false,
    request:''
  }

  constructor(private route:ActivatedRoute,private booking:BookingServiceService,private router:Router,private toast:NgToastService)
  {

  }
  ngOnInit():void{
    this.route.paramMap.subscribe({
      next:(params) =>
      {
        const id = parseInt(params.get('id') || '0');

        if(id)
        {
          this.booking.getcarid(id).subscribe({
            next:(response) =>
            {
              console.log(response);
              this.cardata =response
            },
            error:(error) =>
            {
              console.error('Error loading car updating details:', error);

            }
          })
        }



      }
    })
  }
  numberOfDays: number = this.cardata.noofdays || 0;
  duration() {
    
    if (this.cardata.startdate && this.cardata.enddate) {
      const startDate = new Date(this.cardata.startdate);
      const endDate = new Date(this.cardata.enddate);

    
      const timeDifference = endDate.getTime() - startDate.getTime();


      this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    } else {
      this.numberOfDays = this.cardata.noofdays || 0; 
    }

    return this.numberOfDays
  }
  TotalPrice() {
    
  
    let totalprice = this.cardata.totalprice; // Initialize totalprice outside the if block
  
    if (this.cardata.startdate && this.cardata.enddate && this.cardata && typeof this.cardata.rentalprice === 'number') {
      const startDate = new Date(this.cardata.startdate);
      const endDate = new Date(this.cardata.enddate);
  
      const timeDifference = endDate.getTime() - startDate.getTime();
  
      this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      totalprice = this.numberOfDays * this.cardata.rentalprice; // Use this.cardetails.rentalprice
    }
  
 
  
    return totalprice;
  }


  updatedbookedcar()
  {
   

    this.cardata.startdate=this.cardata.startdate;
    this.cardata.enddate=this.cardata.enddate;
    this.cardata.noofdays=this.duration();
    this.cardata.totalprice=this.TotalPrice();
    console.log("updating",this.cardata);


    this.booking.getdatebookingcar(this.cardata.carid).subscribe((resultset: booking[] | undefined) => {
      if (resultset) {
        this.checkbookedcar = resultset;
        console.log(this.checkbookedcar);
        const BookingCarStarttime = new Date(this.cardata.startdate);
        const BookingCarEndtime = new Date(this.cardata.enddate);
        let hasOverlap = false;
        for (const item of this.checkbookedcar) {
          const CheckBookedStarttime = new Date(item.startdate);
          const CheckBookedEndtime = new Date(item.enddate);
          const status = item.isBooked
          const availability_request = item.request;
          console.log('BookingCarStarttime:', status);
          
          if (
            ((BookingCarStarttime <= CheckBookedEndtime && BookingCarEndtime >= CheckBookedStarttime) ||
            (CheckBookedStarttime <= BookingCarEndtime && CheckBookedEndtime >= BookingCarStarttime)) && status===true &&  (availability_request === 'request' || availability_request === 'waiting')
          ) {
            hasOverlap = true;
            break; // Exit the loop if an overlap is found
          }
        }
        console.log('hasOverlap:', hasOverlap);
        if (hasOverlap) {
          this.toast.warning({ detail: "Car is already booked for this date range.", summary: "Warning", duration: 5000 });
        } 
        else{
          if (this.cardata.id !== undefined) {
            this.booking.updatebookingCar(this.cardata).subscribe({
              next: (response) => {
                console.log('Car updated successfully:', response);
                this.router.navigate(['/useragreement']);
                this.toast.success({detail:"Success",summary:"Update successfully",duration:5000});
      
              },
              error: (error) => {
                console.error('Error updating car:', error);
      
              }
            });
          }
        }
      }
    })


    



  }
}
