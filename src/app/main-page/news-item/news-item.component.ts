import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";

import { DataService } from "src/app/shared/services/data.service";

@Component({
  selector: "app-news-item",
  templateUrl: "./news-item.component.html",
  styleUrls: ["./news-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit {
  @Input() article: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  public onEditArticle() {
    this.dataService.changeTitle("Edit");
    this.dataService.setCurrentArticle(this.article);
  }

  public onWatchArticle() {
    this.dataService.changeTitle("Read chosen article");
    this.dataService.setCurrentArticle(this.article);
  }
}
