import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { DataService } from "src/app/shared/services/data.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public title: Observable<string>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.title = this.dataService.currentTitle;
  }

  public onChangeTitle(title: string) {
    this.dataService.changeTitle(title);
  }
}
