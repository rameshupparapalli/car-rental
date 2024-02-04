import { Component } from '@angular/core';
import { car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  cars:car[]=[];
  minRentalPrice: number | null = null;
  filteredCars: car[] = []; // To store filtered cars
  searchText: string = ''; // To store the search text
  constructor(private carservice:CarService){}

  ngOnInit() : void{  
    this.carservice.getcar()
    .subscribe((result:car[]) => 
    {
      this.cars = result;
      // Initialize filteredCars with all cars initially
      this.filteredCars = result;
    }
    // (this.cars = result)
    );
  
  }

  onSearch(): void {
    const searchTerm = this.searchText.toLowerCase().trim();
    const minPrice = this.minRentalPrice;
    // Filter cars based on brand or maker containing the search term
    this.filteredCars = this.cars.filter((carItem) => {
      return (
        carItem.brand.toLowerCase().includes(searchTerm) ||
        carItem.maker.toLowerCase().includes(searchTerm)
      );
    });
    if(minPrice !==null)
    {
      this.filteredCars = this.filteredCars.filter((carItem) => {
        return carItem.rentalprice !== undefined && carItem .rentalprice >= minPrice;
      });
    }
    this.filteredCars = this.filteredCars;
  }

}
