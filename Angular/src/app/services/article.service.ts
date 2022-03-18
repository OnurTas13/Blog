import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDto } from '../models/articleDto';
import { ArticlePgn } from '../models/articlePgn';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl:string = "https://localhost:44300/api/Article"

  constructor(private httpClient:HttpClient) { }

  addArticle(article:ArticleDto){
    return this.httpClient.post(this.baseUrl + "/add", article)
  }

  updateArticle(article:ArticleDto){
    return this.httpClient.post(this.baseUrl + "/update", article)
  }

  getArticlesPgn(page:number, pageSize:number):Observable<ArticlePgn>{
    return this.httpClient.get<ArticlePgn>(this.baseUrl + "/pgn/" + page + "/" + pageSize)
  }

  getArticleById(id:number):Observable<ArticleDto>{
    return this.httpClient.get<ArticleDto>(this.baseUrl + "/" + id)
  }

  getArticlesPgnByCategory(categoryId:number, page:number, pageSize:number):Observable<ArticlePgn>{
    return this.httpClient.get<ArticlePgn>(this.baseUrl + "/GetArticlesPgnByCategory/" + categoryId + "/" + page + "/" + pageSize)
  }

  articleViewCountUp(id:number){
    return this.httpClient.get(this.baseUrl + "/ArticleViewCountUp/" + id)
  }

  deleteArticle(id:number){
    return this.httpClient.delete(this.baseUrl + "/delete/" + id)
  }

  saveArticlePicture(image:any){
    return this.httpClient.post<any>(this.baseUrl + "/SaveArticlePicture", image)
  }

  
}
