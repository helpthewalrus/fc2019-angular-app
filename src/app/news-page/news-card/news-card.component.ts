import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs";

import { DataService } from "src/app/shared/services/data.service";

@Component({
  selector: "app-news-card",
  templateUrl: "./news-card.component.html",
  styleUrls: ["./news-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsCardComponent implements OnInit {
  public currentArticle$: Observable<any>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.currentArticle$ = this.dataService.currentArticle$;
  }

  public onEditArticle(article: any) {
    this.dataService.changeAppTitle("Edit");
    this.dataService.setCurrentArticle(article);
  }
}
