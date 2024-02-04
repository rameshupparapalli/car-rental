import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent {
  carRequest:car =new car;
  submitted: boolean = false;

  constructor(private carservice :CarService,private router:Router,private toast:NgToastService)
  {

  }
  addcar()
  {
    console.log(this.carRequest)
    this.submitted = true;
    this.carservice.createCar(this.carRequest).subscribe({
      next:(data) =>{
        console.log(data);
        this.router.navigate([''])
        this.toast.success({detail:"Success",summary:"Create successfully",duration:5000});


      }
    })
  }
  validateCarId(control: FormControl) {
    // Custom validation logic (e.g., checking against a pattern)
    const pattern = /^[A-Za-z0-9]+$/;
    return pattern.test(control.value) ? null : { invalidCarId: true };
  }

}
