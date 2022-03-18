import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminAddArticleComponent } from './components/admin-add-article/admin-add-article.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListByCategoryComponent } from './components/list-by-category/list-by-category.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {path:"main", component:MainLayoutComponent, children:[
    {
      path:"home/:page", component:ArticleListComponent
    },
    {
      path:"category/:page/:categoryId", component:ListByCategoryComponent
    },
    {
      path:"detail/:articleId", component:ArticleDetailComponent
    },
    {
      path:"contact", component:ContactComponent
    }
    
  ]},
  {path:"admin", component:AdminLayoutComponent, canActivate:[LoginGuard], children:[
    {
      path:"home/:page", component:AdminListComponent, canActivate:[LoginGuard]
    },
    {
      path:"edit/:id", component:AdminEditComponent, canActivate:[LoginGuard]
    },
    {
      path:"add", component:AdminAddArticleComponent, canActivate:[LoginGuard]
    }
  ]},
  {path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
