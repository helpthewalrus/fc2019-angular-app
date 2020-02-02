import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { DataService } from "../shared/services/data.service";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent implements OnInit {
  public currentSourceId: string = "";
  public checkboxState: boolean = false;
  public articles$: Observable<any>;
  public allFoundArticles: any[];
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
    console.log(newValue);
    // if (newValue === true) {
    //   this.allFoundArticles = ARTICLES.reduce((acc, sourceArticles: any) => {
    //     if (sourceArticles.source === "my-news") {
    //       return [...acc, ...sourceArticles.articles];
    //     }
    //     return acc;
    //   }, []);

    //   this.articles = this.allFoundArticles.slice(0, 5);
    //   this.counter = 5;
    // } else {
    //   this.articles = [];
    // }
  }

  public onLoadMoreButtonClicked(): void {
    this.dataService.getArticlesByPage();

    this.dataService.changeCurrentArticlesFilter("");
  }
}
