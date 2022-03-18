import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticlePgn } from 'src/app/models/articlePgn';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  
  totalCount:number;
  page:number=1;
  pageSize:number=4;
  articlePgn:ArticlePgn;

  constructor(private articleService:ArticleService, private activatedRoute:ActivatedRoute, 
              private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.page = Number(params['page'])
      this.getArticlesPgn();
    })
      
  }

  getArticlesPgn(){
     this.articleService.getArticlesPgn(this.page, this.pageSize).subscribe(data => {
       this.articlePgn = data
       this.totalCount= data.totalCount
     })
  }

  pageChange($event:any){
    this.page = $event;
     this.router.navigate(["admin/home/"+ this.page])
  }

  
  deleteArticle(id:number){
    this.articleService.deleteArticle(id).subscribe(success => {
        this.toastr.success("it has been removed")
        this.getArticlesPgn()
    },error => {
        this.toastr.error("some unknown error occured")
    })
  }

}
