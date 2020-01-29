import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

import { SOURCES } from "src/assets/mock-data/sources";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private currentSource = new BehaviorSubject<string>("");
  public currentSource$ = this.currentSource.asObservable();

  private sources = new BehaviorSubject<any>(SOURCES);
  public sources$ = this.sources.asObservable();

  private currentArticlesFilter = new BehaviorSubject<any>("");
  public currentArticlesFilter$ = this.currentArticlesFilter.asObservable();

  private isOnlyMyArticles = new BehaviorSubject<boolean>(false);
  public isOnlyMyArticles$ = this.isOnlyMyArticles.asObservable();

  private currentAppTitle = new BehaviorSubject<string>("News App");
  public currentAppTitle$ = this.currentAppTitle.asObservable();

  private currentArticle = new BehaviorSubject<any>({});
  public currentArticle$ = this.currentArticle.asObservable();

  public changeAppTitle(title: string): void {
    this.currentAppTitle.next(title);
  }

  public changeCurrentSource(newValue: string) {
    this.currentSource.next(newValue);
  }

  public changeCurrentArticlesFilter(search: string) {
    this.currentArticlesFilter.next(search);
  }

  public changeIsOnlyMyArticles(newValue: boolean) {
    this.isOnlyMyArticles.next(newValue);
  }

  public setCurrentArticle(article: any): void {
    this.currentArticle.next(article);
  }
}
