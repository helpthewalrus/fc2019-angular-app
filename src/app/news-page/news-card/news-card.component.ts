import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs";

import { DataService } from "src/app/shared/services/data.service";
import { ArticleInterface } from "src/app/core/models";

@Component({
  selector: "app-news-card",
  templateUrl: "./news-card.component.html",
  styleUrls: ["./news-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsCardComponent implements OnInit {
  public currentArticle$: Observable<ArticleInterface>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.currentArticle$ = this.dataService.currentArticle$;
  }

  public onEditArticle(article: ArticleInterface) {
    this.dataService.changeAppTitle("Edit");
    this.dataService.setCurrentArticle(article);
  }
}
