import { Component, OnInit } from '@angular/core';
import { CategoryDto } from '../models/categoryDto';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  categories:CategoryDto[]

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(data => {this.categories= data})
  }



}
