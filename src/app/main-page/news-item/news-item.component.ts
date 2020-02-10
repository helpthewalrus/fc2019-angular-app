import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";

import { DataService } from "src/app/shared/services/data.service";
import { ArticleInterface } from "src/app/core/models";

@Component({
  selector: "app-news-item",
  templateUrl: "./news-item.component.html",
  styleUrls: ["./news-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsItemComponent implements OnInit {
  @Input() article: ArticleInterface;

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  public onEditArticle() {
    this.dataService.setCurrentArticle(this.article);
    this.dataService.changeAppTitle("Edit");
  }

  public onReadArticle() {
    this.dataService.setCurrentArticle(this.article);
    this.dataService.changeAppTitle("Read chosen article");
  }

  public onDeleteArticle(id: string) {
    this.dataService.deleteMyArticle(id);
  }
}
