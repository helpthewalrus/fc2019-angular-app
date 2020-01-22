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
  public article: Observable<any>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.article = this.dataService.currentArticle;
  }

  public onEditArticle(article: any) {
    this.dataService.changeTitle("Edit");
    this.dataService.setCurrentArticle(article);
  }
}
