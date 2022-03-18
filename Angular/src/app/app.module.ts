import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListByCategoryComponent } from './components/list-by-category/list-by-category.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { AdminAddArticleComponent } from './components/admin-add-article/admin-add-article.component';
import { LoginComponent } from './components/login/login.component';
import { LoginInterceptor } from './interceptors/login.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MainLayoutComponent,
    ArticleListComponent,
    ListByCategoryComponent,
    ArticleCardComponent,
    FooterComponent,
    NavbarComponent,
    ArticleDetailComponent,
    ContactComponent,
    CommentCardComponent,
    AddCommentComponent,
    AdminNavbarComponent,
    AdminListComponent,
    AdminEditComponent,
    AdminAddArticleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })

    
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:LoginInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
