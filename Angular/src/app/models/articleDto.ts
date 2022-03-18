import { CategoryDto } from "./categoryDto";


export class ArticleDto {
    id:number;
    title:string;
    contentSummary:string;
    contentMain:string;
    picture?:string;
    publishDate:Date;
    categoryId:number;
    categoryDto:CategoryDto;
    viewCount:number;
    commentCount:number;
}