import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-news-list",
  templateUrl: "./news-list.component.html",
  styleUrls: ["./news-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent {
  @Input() articles: any[];

  @Output() loadMoreClicked: EventEmitter<{}> = new EventEmitter();

  public onLoadMoreClicked(): void {
    this.loadMoreClicked.emit({});
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
