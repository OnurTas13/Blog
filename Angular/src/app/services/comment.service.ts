import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl:string = "https://localhost:44300/api/Comment"

  constructor(private httpClient:HttpClient) { }

  getCommentsByArticleId(articleId:number):Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(this.baseUrl + "/listByArticle/" + articleId)
  }

  addComment(comment:Comment){
    return this.httpClient.post(this.baseUrl + "/Add", comment)
  }
}
