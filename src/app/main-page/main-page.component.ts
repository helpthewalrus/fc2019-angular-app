import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { DataService } from "../shared/services/data.service";
import { ArticleInterface } from "../core/models/index";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent implements OnInit {
  public currentSourceId: string = "";
  public checkboxState: boolean = false;
  public articles$: Observable<ArticleInterface[]>;
  public counter: number = 0;
  public currentNewsFilter$: Observable<string>;

  constructor(private dataService: DataService) {
    this.currentNewsFilter$ = this.dataService.currentArticlesFilter$;
  }

  public ngOnInit() {
    this.articles$ = this.dataService.getArticlesStream();
  }

  public onChangeCurrentSource({ name, id }) {
    this.dataService.getArticlesBySourceId(id);
  }

  public onChangeIsOnlyMyArticles(newValue: boolean): void {
    this.dataService.getArticlesBySourceId("my-news");
  }

  public onLoadMoreButtonClicked(): void {
    this.dataService.getArticlesByPage();

    this.dataService.changeCurrentArticlesFilter("");
  }
}
