import {Component, OnInit, ElementRef} from '@angular/core';
import {ArticleService, SearchResult, Article} from '../article-service';
import {ArticleItem} from '../article-item';
import {Pager} from '../pager';
import config from 'config';
import {RebirthWindow} from 'rebirth-common';

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

  constructor(private articleService: ArticleService, private elmRef: ElementRef, private rebirthWindow: RebirthWindow) {

  }

  ngOnInit() {
    this.pageChange(1);
  }

  pageChange(pageIndex) {
    this.articleService.getArticles(pageIndex, config.article.pageSize)
      .subscribe(result => {
        this.article = result;
        this.rebirthWindow.scrollToTop(this.elmRef);
      }, (e) => console.log(e, 'component error'));
  }

}
