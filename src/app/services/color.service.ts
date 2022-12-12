import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:44327/api/";
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newUrl = this.apiUrl + "colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }

  add(color:Color):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "colors/add"
    return this.httpClient.post<ResponseModel>(newUrl, color);
  }
}
