import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable } from "rxjs";
import { map, switchMap, scan, filter, tap, first } from "rxjs/operators";

import { API_KEY, BASE_URL, PAGE_SIZE } from "../../core/constants";
import { SourceInterface, ArticleInterface } from "../../core/models/index";

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

  private currentArticlesFilter = new BehaviorSubject<string>("");
  public currentArticlesFilter$ = this.currentArticlesFilter.asObservable();

  private isOnlyMyArticles = new BehaviorSubject<boolean>(false);
  public isOnlyMyArticles$ = this.isOnlyMyArticles.asObservable();

  private currentAppTitle = new BehaviorSubject<string>("News App");
  public currentAppTitle$ = this.currentAppTitle.asObservable();

  private currentArticle = new BehaviorSubject<ArticleInterface>({});
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

  public setCurrentArticle(article: ArticleInterface): void {
    this.currentArticle.next(article);
  }

  public getSources(): Observable<SourceInterface[]> {
    return this.http
      .get<{ status: string; sources: SourceInterface[] }>(
        `${BASE_URL}sources?apiKey=${API_KEY}`
      )
      .pipe(map(({ sources }) => sources));
  }

  public getArticlesStream(): Observable<ArticleInterface[]> {
    return this.articles$.pipe(
      filter((sourceId: string) => !!sourceId),
      switchMap((sourceId: string) => {
        if (sourceId === "my-news") {
          return this.getMyNews();
        }
        this.articlesByPageSubject = new BehaviorSubject(this.currentPage);
        return this.articlesByPageSubject.asObservable().pipe(
          switchMap((currentPage: number) => {
            return this.http
              .get<{
                status: string;
                totalResults: number;
                articles: ArticleInterface[];
              }>(
                `${BASE_URL}everything?sources=${sourceId}&pageSize=${PAGE_SIZE}&page=${currentPage}&apiKey=${API_KEY}`
              )
              .pipe(map(({ articles }) => articles));
          }),
          scan((acc: ArticleInterface[], current: ArticleInterface[]) => {
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

  public getMyNews(): Observable<any> {
    return this.http.post(`http://localhost:3001/api/user/login`, {
      email: "test3@test.com",
      password: "qwerty123"
    });
  }

  public deleteMyArticle(id: string): any {
    this.http
      .delete(`http://localhost:3001/api/news/${id}`)
      .pipe(
        tap((response: any) => alert(response.message)),
        first()
      )
      .subscribe();
    return this.getArticlesBySourceId("my-news");
  }

  public postMyArticle(article: ArticleInterface): Observable<any> {
    return this.http.post(`http://localhost:3001/api/news`, article);
  }

  public updateMyArticle(
    article: ArticleInterface,
    id: string
  ): Observable<any> {
    return this.http.patch(`http://localhost:3001/api/news/${id}`, article);
  }

  public processArticle(formValue: any): any {
    this.currentArticle
      .pipe(
        switchMap((currentArticle: ArticleInterface) => {
          let resultArticle: ArticleInterface = {
            source: {
              id: "my-news",
              name: "My News"
            },
            author: formValue.author,
            title: formValue.heading,
            description: formValue.shortDescription,
            url: formValue.sourceUrl,
            urlToImage: formValue.photo.inputUrl,
            publishedAt: formValue.date,
            content: formValue.content,
            myNews: true
          };

          if (currentArticle._id) {
            return this.updateMyArticle(resultArticle, currentArticle._id);
          }
          return this.postMyArticle(resultArticle);
        }),
        tap((response: any) => alert(response.message)),
        first()
      )
      .subscribe();
  }
}
