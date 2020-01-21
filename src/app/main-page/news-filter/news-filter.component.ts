import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

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

  constructor() {}

  ngOnInit() {
    console.log(this.sources);
  }

  public onSourceChange({ target }) {
    console.log("===============onSourceChange");
    this.currentSourceChange.emit({
      name: target.innerText,
      id: target.dataset.srcid
    });
  }

  public onEnterNewsFilter(currentNewsFilter: string): void {
    console.log("===============onEnterNewsFilter");
    this.currentNewsFilterChange.emit(currentNewsFilter);
  }

  public onCheckboxClicked({ target: { checked } }): void {
    console.log("===============onCheckboxClicked");
    this.currentCheckboxState.emit(checked);
  }
}
