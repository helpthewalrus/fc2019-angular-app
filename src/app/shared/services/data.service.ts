import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable } from "rxjs";
import { map, switchMap, scan, filter } from "rxjs/operators";

import { API_KEY, BASE_URL, PAGE_SIZE } from "../../core/constants";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private articlesByPageSubject: BehaviorSubject<number>;
  private currentPage: number = 1;

  private articles = new BehaviorSubject<string>("");
  public articles$ = this.articles.asObservable();

  private currentSource = new BehaviorSubject<string>("");
  public currentSource$ = this.currentSource.asObservable();

  private currentArticlesFilter = new BehaviorSubject<any>("");
  public currentArticlesFilter$ = this.currentArticlesFilter.asObservable();

  private isOnlyMyArticles = new BehaviorSubject<boolean>(false);
  public isOnlyMyArticles$ = this.isOnlyMyArticles.asObservable();

  private currentAppTitle = new BehaviorSubject<string>("News App");
  public currentAppTitle$ = this.currentAppTitle.asObservable();

  private currentArticle = new BehaviorSubject<any>({});
  public currentArticle$ = this.currentArticle.asObservable();

  constructor(private http: HttpClient) {}

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

  public getSources() {
    return this.http
      .get<any>(`${BASE_URL}sources?apiKey=${API_KEY}`)
      .pipe(map(response => response.sources));
  }

  public getArticlesStream(): Observable<any> {
    return this.articles$.pipe(
      filter((sourceId: string) => !!sourceId),
      switchMap((sourceId: string) => {
        this.articlesByPageSubject = new BehaviorSubject(this.currentPage);
        return this.articlesByPageSubject.asObservable().pipe(
          switchMap((currentPage: number) => {
            return this.http
              .get<any>(
                `${BASE_URL}everything?sources=${sourceId}&pageSize=${PAGE_SIZE}&page=${currentPage}&apiKey=${API_KEY}`
              )
              .pipe(map((response: any) => response.articles));
          }),
          scan((acc: any, current: any) => {
            acc = [...acc, ...current];
            return acc;
          }, [])
        );
      })
    );
  }

  public getArticlesByPage() {
    this.currentPage++;
    this.articlesByPageSubject.next(this.currentPage);
  }

  public getArticlesBySourceId(sourceId: string) {
    this.currentPage = 1;
    this.articles.next(sourceId);
  }
}
