import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { loginRes } from '../models/loginRes';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  baseUrl:string = "https://localhost:44300/api/Account"

  constructor(private httpClient:HttpClient) { }

  login(login:Login){
     return this.httpClient.post<loginRes>(this.baseUrl + "/login", login)
  }
}
