import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from "@angular/core";

import { Observable } from "rxjs";

import { DataService } from "src/app/shared/services/data.service";

@Component({
  selector: "app-news-filter",
  templateUrl: "./news-filter.component.html",
  styleUrls: ["./news-filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFilterComponent implements OnInit {
  @Output() currentSourceChange: EventEmitter<any> = new EventEmitter();
  @Output() currentNewsFilterChange: EventEmitter<string> = new EventEmitter();
  @Output() currentCheckboxState: EventEmitter<boolean> = new EventEmitter();

  public currentSource$: Observable<string>;
  public sources$: Observable<any>;
  public currentNewsFilter$: Observable<string>;
  public isOnlyMyArticles$: Observable<boolean>;

  constructor(private dataService: DataService) {
    this.currentSource$ = this.dataService.currentSource$;
    this.sources$ = this.dataService.sources$;
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
  }

  public onAddArticle(): void {
    this.dataService.setCurrentArticle({});
    this.dataService.changeAppTitle("Create");
  }
}
