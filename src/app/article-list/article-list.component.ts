import { Component, Input, OnInit, ElementRef } from '@angular/core';
import {ArticleService, SearchResult, Article} from '../article-service';
import {ArticleItem} from '../article-item';
import {Pager} from '../pager';

@Component({
  selector: 'article-list',
  providers: [ArticleService],
  directives: [ArticleItem, Pager],
  pipes: [],
  styles: [require('./article-list.scss')],
  template: require('./article-list.html')
})
export class ArticleList implements OnInit {
  private article: SearchResult<Article>;
  private static DEFAULT_PAGE_SIZE: number = 10;
  constructor(private articleService: ArticleService,  private elmRef: ElementRef) {

  }

  ngOnInit() {
    this.pageChange(1);
  }

  pageChange(pageIndex) {
    this.articleService.getArticles(pageIndex, ArticleList.DEFAULT_PAGE_SIZE)
      .subscribe(result => {
        this.article = result;
        // TODO: move to platform browser
        this.elmRef.nativeElement.ownerDocument.body.scrollIntoView();
      }, (e)=> console.log(e, 'component error'));
  }

}
