import { Component } from "@angular/core";

import { ARTICLES } from "../../assets/mock-data/articles";
import { SOURCES } from "../../assets/mock-data/sources";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent {
  public currentSource: string = "";
  public currentSourceId: string = "";
  public checkboxState: boolean = false;
  public sources = SOURCES;
  public articles: any[];
  public allFoundArticles: any[];
  public counter: number = 0;
  public currentNewsFilter: string = "";

  public onChangeCurrentSource({ name, id }) {
    this.currentSource = name;

    this.allFoundArticles = ARTICLES.reduce((acc, sourceArticles: any) => {
      if (sourceArticles.source === id || id === "all-sources") {
        return [...acc, ...sourceArticles.articles];
      }
      return acc;
    }, []);
    this.articles = this.allFoundArticles.slice(0, 5);
    this.counter = 5;

    this.currentNewsFilter = "";
  }

  public onChangeCurrentCheckboxState(currentCheckboxState: boolean): void {
    this.checkboxState = currentCheckboxState;

    if (currentCheckboxState === true) {
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
      this.currentSource = "";
    }

    this.currentNewsFilter = "";
  }

  public onCurrentNewsFilterChange(currentNewsFilter: string): void {
    this.articles = this.articles.filter((article: any) =>
      article.title.toUpperCase().includes(currentNewsFilter.toUpperCase())
    );
    this.currentNewsFilter = currentNewsFilter;
  }

  public onLoadMoreButtonClicked(): void {
    this.articles = [
      ...this.articles.concat(
        this.allFoundArticles.slice(this.counter, this.counter + 5)
      )
    ];
    this.counter += 5;

    this.currentNewsFilter = "";
  }
}
