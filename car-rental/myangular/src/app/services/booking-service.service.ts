import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { booking } from '../models/booking';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
 private url ='Booking';

 constructor(private http:HttpClient) { }

 public bookcar(booking:booking):Observable<booking[]>{
  console.log(typeof(booking.rentalprice))
  return this.http.post<[]>(`${environment.apiUrl}/${this.url}`,booking);
}
public getbookedcar():Observable<booking[]>{
    
  return this.http.get<booking[]>(`${environment.apiUrl}/${this.url}`);
}

public getcarid(id:number):Observable<booking>
{
  return this.http.get<booking>(`${environment.apiUrl}/${this.url}` + '/' + id); 
}
public updatebookingCar(booking:booking):Observable<booking[]>{
  return this.http.put<booking[]>(`${environment.apiUrl}/${this.url}`,booking);
}
public deletebookedCar(booking:booking):Observable<booking[]>{
  return this.http.delete<booking[]>(`${environment.apiUrl}/${this.url}/${booking.id}`);
}
// public getdatebookingcar(booking:booking):Observable<booking[]>{
//   return this.http.get<booking[]>(`${environment.apiUrl}/${this.url}/getbookedcar/${booking.carid}`);
// }
public getdatebookingcar(carid: string): Observable<booking[]> {
 
  return this.http.get<booking[]>(`${environment.apiUrl}/${this.url}/getbookedcar/${carid}`);
}

}
