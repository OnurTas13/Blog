import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDto } from 'src/app/models/articleDto';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-list-by-category',
  templateUrl: './list-by-category.component.html',
  styleUrls: ['./list-by-category.component.css']
})
export class ListByCategoryComponent implements OnInit {

  totalCount:number;
  pageSize:number = 5;
  page:number = 1;
  articles:ArticleDto[];
  categoryId:number;

  constructor(private articleService:ArticleService, private activatedRoute:ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.categoryId = Number(params["categoryId"])
      this.page = Number(params["page"])
      if (this.page) {
        this.getArticlesPgnByCategory()
      } 
    })
  }

  getArticlesPgnByCategory(){
    this.articleService.getArticlesPgnByCategory(this.categoryId,this.page,this.pageSize).subscribe(data =>{
      this.totalCount = data.totalCount;
      this.articles = data.articles;
    } )
  }

  pageChange($event:any){
      this.page = $event;
      this.route.navigate(["main/category/",{page:this.page}])
  }

  

}
