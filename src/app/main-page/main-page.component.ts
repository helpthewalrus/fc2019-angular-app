import { Component } from "@angular/core";

import { Observable } from "rxjs";

import { ARTICLES } from "../../assets/mock-data/articles";
import { DataService } from "../shared/services/data.service";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent {
  public currentSourceId: string = "";
  public checkboxState: boolean = false;
  public articles: any[] = [];
  public allFoundArticles: any[];
  public counter: number = 0;
  public currentNewsFilter$: Observable<string>;

  constructor(private dataService: DataService) {
    this.currentNewsFilter$ = this.dataService.currentArticlesFilter$;
  }

  public onChangeCurrentSource({ name, id }) {
    this.allFoundArticles = ARTICLES.reduce((acc, sourceArticles: any) => {
      if (sourceArticles.source === id || id === "all-sources") {
        return [...acc, ...sourceArticles.articles];
      }
      return acc;
    }, []);
    this.articles = this.allFoundArticles.slice(0, 5);
    this.counter = 5;
  }

  public onChangeIsOnlyMyArticles(newValue: boolean): void {
    if (newValue === true) {
      this.allFoundArticles = ARTICLES.reduce((acc, sourceArticles: any) => {
        if (sourceArticles.source === "my-news") {
          return [...acc, ...sourceArticles.articles];
        }
        return acc;
      }, []);

      this.articles = this.allFoundArticles.slice(0, 5);
      this.counter = 5;
    } else {
      this.articles = [];
    }
  }

  public onLoadMoreButtonClicked(): void {
    this.articles = [
      ...this.articles.concat(
        this.allFoundArticles.slice(this.counter, this.counter + 5)
      )
    ];
    this.counter += 5;

    this.dataService.changeCurrentArticlesFilter("");
  }
}
