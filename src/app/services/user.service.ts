import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiUrl = "https://localhost:44327/api/";

  constructor(private httpClient:HttpClient) { }

  updateUser(user:User){
    let newUrl = this.apiUrl + "users/update";
    return this.httpClient.post<ResponseModel>(newUrl,user);
  }

  getUserByMail(email:string):Observable<SingleResponseModel<User>>{
    let newUrl = this.apiUrl + "users/getbymail?email=" + email;
    return this.httpClient.get<SingleResponseModel<User>>(newUrl);
  }

  getUserById(userId:number):Observable<SingleResponseModel<User>>{
    let newUrl = this.apiUrl + "users/getbyid?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newUrl);
  }
}
