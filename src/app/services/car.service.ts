import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  
  apiUrl = "https://localhost:44327/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newUrl = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }
  getCarsByBrand(brandId:number){
    let newUrl = this.apiUrl + "cars/getcardetailsbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }
  getCarsByColor(colorId:number){
    let newUrl = this.apiUrl + "cars/getcardetailsbycolorid?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }
  getCarsByColorAndBrand(brandId:number, colorId:number){
    let newUrl = this.apiUrl + 
    "cars/getcardetailsbycolorandbrand?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }
  getCarsById(carId:number){
    let newUrl = this.apiUrl + "cars/getcardetailbyid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newUrl);
  }
}
