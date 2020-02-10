import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs";

import { DataService } from "src/app/shared/services/data.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public currentAppTitle$: Observable<string>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.currentAppTitle$ = this.dataService.currentAppTitle$;
  }

  public onChangeTitle(newValue: string) {
    this.dataService.changeAppTitle(newValue);
  }
}
