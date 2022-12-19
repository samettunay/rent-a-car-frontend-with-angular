import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiUrl = "https://localhost:44327/api/";

  constructor(private httpClient:HttpClient) { }

  getUserByMail(email:string):Observable<SingleResponseModel<User>>{
    let newUrl = this.apiUrl + "users/getbymail?email=" + email;
    return this.httpClient.get<SingleResponseModel<User>>(newUrl);
  }
}
