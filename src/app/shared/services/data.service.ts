import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private titleSource = new BehaviorSubject<string>("News App");
  private editedArticle = new BehaviorSubject<any>({});
  public currentTitle = this.titleSource.asObservable();
  public currentArticle = this.editedArticle.asObservable();

  public changeTitle(title: string): void {
    this.titleSource.next(title);
  }

  public setCurrentArticle(article: any): void {
    this.editedArticle.next(article);
  }
}
