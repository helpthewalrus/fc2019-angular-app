import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from "@angular/core";

import { Observable } from "rxjs";

import { DataService } from "src/app/shared/services/data.service";
import { SourceInterface, ArticleInterface } from "src/app/core/models";

@Component({
  selector: "app-news-filter",
  templateUrl: "./news-filter.component.html",
  styleUrls: ["./news-filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFilterComponent implements OnInit {
  @Output() currentSourceChange: EventEmitter<{
    name: string;
    id: string;
  }> = new EventEmitter();
  @Output() currentNewsFilterChange: EventEmitter<string> = new EventEmitter();
  @Output() currentCheckboxState: EventEmitter<boolean> = new EventEmitter();

  public currentSource$: Observable<string>;
  public sources$: Observable<SourceInterface[]>;
  public currentNewsFilter$: Observable<string>;
  public isOnlyMyArticles$: Observable<boolean>;

  constructor(private dataService: DataService) {
    this.currentSource$ = this.dataService.currentSource$;
    this.sources$ = this.dataService.getSources();
    this.currentNewsFilter$ = this.dataService.currentArticlesFilter$;
    this.isOnlyMyArticles$ = this.dataService.isOnlyMyArticles$;
  }

  ngOnInit() {}

  public onSourceChange({ target }) {
    const {
      innerText,
      dataset: { srcid }
    } = target;
    this.currentSourceChange.emit({
      name: innerText,
      id: srcid
    });

    this.dataService.changeCurrentSource(innerText);
    this.dataService.changeCurrentArticlesFilter("");
    this.dataService.changeAppTitle(innerText);
  }

  public onEnterNewsFilter({ target: { value } }): void {
    this.dataService.changeCurrentArticlesFilter(value);
  }

  public onCheckboxClicked({ target: { checked } }): void {
    this.currentCheckboxState.emit(checked);

    this.dataService.changeCurrentSource("");
    this.dataService.changeCurrentArticlesFilter("");
    this.dataService.changeIsOnlyMyArticles(checked);
    this.dataService.changeAppTitle("My News");
    this.dataService.getArticlesBySourceId("my-news");
  }

  public onAddArticle(): void {
    const emptyArticle: ArticleInterface = {
      source: {
        id: "my-news",
        name: "My News"
      },
      author: "",
      title: "",
      description: "",
      url: "",
      urlToImage: "",
      publishedAt: new Date().toISOString(),
      content: "",
      myNews: true
    };
    this.dataService.setCurrentArticle(emptyArticle);
    this.dataService.changeAppTitle("Create");
  }
}
