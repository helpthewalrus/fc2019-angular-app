import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

import { DataService } from "src/app/shared/services/data.service";

@Component({
  selector: "app-news-filter",
  templateUrl: "./news-filter.component.html",
  styleUrls: ["./news-filter.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFilterComponent implements OnInit {
  @Input() sources: any[];
  @Input() currentSource: { name: string; id: string };
  @Input() checkboxState: boolean;
  @Input() currentNewsFilter: string;

  @Output() currentSourceChange: EventEmitter<any> = new EventEmitter();
  @Output() currentNewsFilterChange: EventEmitter<string> = new EventEmitter();
  @Output() currentCheckboxState: EventEmitter<boolean> = new EventEmitter();

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  public onSourceChange({ target }) {
    this.currentSourceChange.emit({
      name: target.innerText,
      id: target.dataset.srcid
    });

    this.dataService.changeTitle(target.innerText);
  }

  public onEnterNewsFilter(currentNewsFilter: string): void {
    this.currentNewsFilterChange.emit(currentNewsFilter);
  }

  public onCheckboxClicked({ target: { checked } }): void {
    this.currentCheckboxState.emit(checked);
    this.dataService.changeTitle("My News");
  }

  public onAddArticle(): void {
    this.dataService.changeTitle("Create");
    this.dataService.setCurrentArticle({});
  }
}
