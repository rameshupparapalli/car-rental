import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent {
  @Input() car?:car;
  @Output() carUpdated = new EventEmitter<car[]>();



  cardetails :car={
    id:0,
    carid:'',
    image:'',
    maker:'',
    brand:'',
    rentalprice:0,
    availability:''
  }
  constructor(private carservice:CarService,private route:ActivatedRoute,private router:Router,private toast:NgToastService) {}

  ngOnInit():void{
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
  }

  updatedcar() {
    
    console.log('Updating car:', this.cardetails);
    if (this.cardetails.id !== undefined) {
      this.carservice.updateCar(this.cardetails).subscribe({
        next: (response) => {
          console.log('Car updated successfully:', response);
          this.router.navigate(['']);
          this.toast.success({detail:"Success",summary:"Update successfully",duration:5000});

        },
        error: (error) => {
          console.error('Error updating car:', error);

        }
      });
    }
  }
  // updateCar(car:car){
  //   this.carservice.updateCar(car).subscribe((cars:car[]) => this.carUpdated.emit(cars))
  // }
  // deleteCar(car:car){
  //   this.carservice.deleteCar(car).subscribe((cars:car[]) => this.carUpdated.emit(cars))

  // }
  // createCar(car:car){
  //   this.carservice.createCar(car).subscribe((cars:car[]) => this.carUpdated.emit(cars))

  // }
}
function output(): (target: EditCarComponent, propertyKey: "carUpdated") => void {
  throw new Error('Function not implemented.');
}

