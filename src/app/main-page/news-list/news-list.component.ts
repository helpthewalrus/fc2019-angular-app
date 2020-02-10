import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

import { ArticleInterface } from "src/app/core/models";

@Component({
  selector: "app-news-list",
  templateUrl: "./news-list.component.html",
  styleUrls: ["./news-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent {
  @Input() articles: ArticleInterface[];

  @Output() loadMoreClicked: EventEmitter<{}> = new EventEmitter();

  public onLoadMoreClicked(): void {
    this.loadMoreClicked.emit({});
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
