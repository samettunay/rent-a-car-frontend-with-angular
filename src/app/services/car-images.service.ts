import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImagesService {
  apiUrl = "https://localhost:44327/api/";
  constructor(private httpClient:HttpClient) { }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newUrl = this.apiUrl + "carimages/getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl);
  }

  getAllCarImages():Observable<ListResponseModel<CarImage>>{
    let newUrl = this.apiUrl + "carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl);
  }

  add(carImage:CarImage):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "carimages/add";
    return this.httpClient.post<ResponseModel>(newUrl, carImage);
  }
}
