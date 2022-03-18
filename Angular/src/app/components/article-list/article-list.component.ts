import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDto } from 'src/app/models/articleDto';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  page:number=1;
  pageSize:number=6;
  totalCount:number;
  articles:ArticleDto[];


  constructor(private articleService:ArticleService, private activatedRoute:ActivatedRoute, private route:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.page = Number(params["page"])
      if (this.page) {
        this.getArticlesPgn();
      } 
    })
  }

  getArticlesPgn(){
    this.articleService.getArticlesPgn(this.page, this.pageSize).subscribe(data =>{
      this.totalCount = data.totalCount;
      this.articles = data.articles;
    } )
  }

  pageChange($event:any){
      this.page = $event;
      this.route.navigate(["main/home/"+ this.page])
  }


}
