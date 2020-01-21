import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { ARTICLES } from "../../assets/mock-data/articles";
import { SOURCES } from "../../assets/mock-data/sources";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent implements OnInit {
  public currentSource: string = "";
  public currentSourceId: string = "";
  public checkboxState: boolean = false;
  public sources = SOURCES;
  public articles: any[] = [];

  constructor() {}

  ngOnInit() {}

  public onChangeCurrentSource({ name, id }) {
    this.currentSource = name;

    this.articles = ARTICLES.reduce((acc, sourceArticles: any) => {
      if (sourceArticles.source === id) {
        return [...acc, ...sourceArticles.articles];
      }
      return acc;
    }, []);
  }

  public onCurrentNewsFilterChange(currentNewsFilter: string): void {
    this.articles = this.articles.filter((article: any) =>
      article.title.includes(currentNewsFilter)
    );
  }

  public onChangeCurrentCheckboxState(currentCheckboxState: boolean): void {
    this.checkboxState = currentCheckboxState;
    console.log(currentCheckboxState);

    this.articles = ARTICLES.reduce((acc, sourceArticles: any) => {
      if (sourceArticles.source === "my-news") {
        return [...acc, ...sourceArticles.articles];
      }
      return acc;
    }, []);
    console.log(this.articles);
  }
}
