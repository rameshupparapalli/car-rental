import { Injectable } from '@angular/core';
import { car } from '../models/car';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private url="Car";
  constructor(private http:HttpClient) { }

  public getcar():Observable<car[]>{
    
    // return this.http.get<car[]>(`${"http://localhost:28512/api"}/${this.url}`);
    return this.http.get<car[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getcarid(id:number):Observable<car>
  {
    return this.http.get<car>(`${environment.apiUrl}/${this.url}` + '/' + id); 
  }
  public updateCar(car:car):Observable<car[]>{
    return this.http.put<car[]>(`${environment.apiUrl}/${this.url}`,car);
  }
  public createCar(car:car):Observable<car[]>{
    console.log(typeof(car.rentalprice))
    return this.http.post<car[]>(`${environment.apiUrl}/${this.url}`,car);
  }
  public deleteCar(car:car):Observable<car[]>{
    return this.http.delete<car[]>(`${environment.apiUrl}/${this.url}/${car.id}`);
  }
}
