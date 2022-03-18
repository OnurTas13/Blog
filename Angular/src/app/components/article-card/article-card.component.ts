import { Component, Input, OnInit } from '@angular/core';
import { ArticleDto } from 'src/app/models/articleDto';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  @Input() article:ArticleDto;

  constructor() { }

  ngOnInit(): void {
  }

}
