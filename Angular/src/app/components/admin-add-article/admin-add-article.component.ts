import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArticleDto } from 'src/app/models/articleDto';
import { CategoryDto } from 'src/app/models/categoryDto';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-add-article',
  templateUrl: './admin-add-article.component.html',
  styleUrls: ['./admin-add-article.component.css']
})
export class AdminAddArticleComponent implements OnInit {
  categories:CategoryDto[]
  articleForm:FormGroup
  article:ArticleDto = new ArticleDto()
  submitted:boolean
  fileData:File;
  picture:string;

  constructor(private categoryService:CategoryService,private articleService:ArticleService,
     private fb:FormBuilder, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.createArticleForm()
    this.getCategories()
  }

  upload(files:any){
     this.fileData = files.target.files[0];
     let formData = new FormData()

     formData.append("picture", this.fileData)

     this.articleService.saveArticlePicture(formData).subscribe(x =>{
       this.article.picture = x.path
     })
  }

  createArticleForm(){
    this.articleForm = this.fb.group({
      title:["",Validators.required],
      contentSummary:["",Validators.required],
      contentMain:["", Validators.required],
      categoryId:["",Validators.required]
    })
  }


  getCategories(){
    this.categoryService.getCategories().subscribe(data => {this.categories = data})
  }

  onSubmit(){
    this.submitted = true
      if (this.articleForm.valid) {
        this.mapArticle()
        this.articleService.addArticle(this.article).subscribe(success =>{
          this.toastr.success("it has been successfully added")
          this.onReset()
        },
        error => {
         this.toastr.error("some unknown error occured")
        })
      }
  }

  onReset(){
    this.submitted = false
    this.articleForm.reset()
  }

  mapArticle(){
    this.article.title = this.articleForm.value.title;
    this.article.contentSummary= this.articleForm.value.contentSummary;
    this.article.contentMain = this.articleForm.value.contentMain;
    this.article.categoryId = this.articleForm.value.categoryId;
  }

}
