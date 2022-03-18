import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDto } from 'src/app/models/articleDto';
import { Comment } from 'src/app/models/comment';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  articleId:number;
  article:ArticleDto;
  comments:Comment[];

  constructor(private activatedRoute:ActivatedRoute, private articleService:ArticleService, private commentService:CommentService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>
      {
        this.articleId = Number( params["articleId"])
        this.getArticleById();
        this.getCommentByArticleId();
        this.articleViewCountUp();       
      } )
  }

  getArticleById(){
    this.articleService.getArticleById(this.articleId).subscribe(data => this.article = data)
  }

  articleViewCountUp(){
    this.articleService.articleViewCountUp(this.articleId).subscribe();
  }

  getCommentByArticleId(){
    this.commentService.getCommentsByArticleId(this.articleId).subscribe(data => this.comments = data)
  }



}
