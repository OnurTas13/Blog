import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from '../models/categoryDto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl:string = "https://localhost:44300/api/Category"

  constructor(private httpClient:HttpClient) {}

  getCategories():Observable<CategoryDto[]>{
    return this.httpClient.get<CategoryDto[]>( this.baseUrl + "/list")
  }


}
