import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-news-list",
  templateUrl: "./news-list.component.html",
  styleUrls: ["./news-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {
  public newsList: string[] = ["winter", "spring", "summer", "autumn"];

  constructor() {}

  ngOnInit() {}
}
