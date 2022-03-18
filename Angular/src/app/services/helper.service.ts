import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  baseUrl:string = "https://localhost:44300/api/helper"

  constructor(private httpClient:HttpClient) { }

  sendContactEmail(contact:Contact){
    return this.httpClient.post(this.baseUrl + "/SendContactEmail",contact)
  }
}
