import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { Output, EventEmitter } from '@angular/core'; 

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Output() getCommentByArticleId = new EventEmitter<any>();
  articleId:number;
  commentForm:FormGroup;
  comment = new Comment();
  submitted:boolean;

  constructor(private activatedRoute:ActivatedRoute, private commentService:CommentService, 
              private fb:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    
    this.createCommentForm();

    this.activatedRoute.params.subscribe(params =>{
       this.articleId = Number(params['articleId'])
    })

  }

  createCommentForm(){
      this.commentForm = this.fb.group({
        name:["", Validators.required],
        content:["", Validators.required]
       })
  }

  onSubmit(){
    this.submitted = true;
       if (this.commentForm.valid) {
         this.mapComment()
         this.commentService.addComment(this.comment).subscribe(success =>
          {          
           this.toastr.success("Your comment has been successfully added")
          this.onReset()
          this.getCommentByArticleId.emit()
         },error =>{
           this.toastr.error("Some unknown error occured")
         })
       }
  }

  onReset(){
    this.submitted=false
    this.commentForm.reset()   
  }

  mapComment(){
    this.comment.name= this.commentForm.controls.name.value;
    this.comment.contentMain = this.commentForm.controls.content.value;
    this.comment.articleId = this.articleId;
  }



}
