import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { booking } from 'src/app/models/booking';
import { car } from 'src/app/models/car';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { CarService } from 'src/app/services/car.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css']
})
export class SinglePageComponent {
  public fullEmail:string="";
  submitted: boolean = false;

  cardetails :car={
    id:0,
    carid:'',
    image:'',
    maker:'',
    brand:'',
    rentalprice:0,
    availability:''
  }
  carbooking:booking ={
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
  bookingcars:booking[]=[];
  checkbookedcar: booking[] = [];
  currentDate = new Date();
  numberOfDays: number = 0;
  constructor(private route:ActivatedRoute,private carservice:CarService,private userstore:UserServiceService,private user:UserServiceService,
    private booking:BookingServiceService,private router:Router,private toast:NgToastService)
  {

  }
  ngOnInit():void{
    //test car

    this.booking.getbookedcar()
    .subscribe((result:booking[]) => 
    {
      console.log('Data received:',result);
      // (this.bookingcars=result)
      this.bookingcars = result.map(item => ({ ...item, isBooked: !!item.isBooked }));
      
      
    });

    //test car
    this.route.paramMap.subscribe({
      next:(params) => {
        const id = parseInt(params.get('id') || '0');


        if(id)
        {
          this.carservice.getcarid(id).subscribe({
            next:(response) => {
              console.log(response);
              this.cardetails=response
            },
            error: (error) => {
              console.error('Error loading car details:', error);
            }
          });
        }
      }
    });
    this.userstore.getFullEmailFromStore().subscribe(val =>{
     
      const fullEmailFromToken = this.user.getFullEmailFromToken();
    this.fullEmail = val || fullEmailFromToken;

    
    if (!val && fullEmailFromToken) {
      this.userstore.setFullEmailForStore(fullEmailFromToken);
    }

    });
  }

  duration() {
    
    if (this.carbooking.startdate && this.carbooking.enddate) {
      const startDate = new Date(this.carbooking.startdate);
      const endDate = new Date(this.carbooking.enddate);

    
      const timeDifference = endDate.getTime() - startDate.getTime();


      this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    } else {
      this.numberOfDays = 0; 
    }

    return this.numberOfDays
  }
  TotalPrice() {
    
  
    let totalprice = 0; // Initialize totalprice outside the if block
  
    if (this.carbooking.startdate && this.carbooking.enddate && this.cardetails && typeof this.cardetails.rentalprice === 'number') {
      const startDate = new Date(this.carbooking.startdate);
      const endDate = new Date(this.carbooking.enddate);
  
      const timeDifference = endDate.getTime() - startDate.getTime();
  
      this.numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      totalprice = this.numberOfDays * this.cardetails.rentalprice; // Use this.cardetails.rentalprice
    }
  
 
  
    return totalprice;
  }
  
  bookcar()
  {  
   
    this.carbooking.carid=this.cardetails.carid;
    this.carbooking.image=this.cardetails.image;
    this.carbooking.brand=this.cardetails.brand;
    this.carbooking.maker=this.cardetails.maker;
    this.carbooking.rentalprice=this.cardetails.rentalprice;
    this.carbooking.startdate=this.carbooking.startdate;
    this.carbooking.enddate=this.carbooking.enddate;
    this.carbooking.noofdays=this.duration();
    this.carbooking.totalprice=this.TotalPrice();
    this.carbooking.email=this.fullEmail;

    console.log(this.carbooking.carid)
  
  
      this.submitted = true;
      
      this.booking.bookcar(this.carbooking).subscribe({
        next: (data) => {
          this.router.navigate(['/useragreement']);
        }
      }); 
       
  }
  

}
