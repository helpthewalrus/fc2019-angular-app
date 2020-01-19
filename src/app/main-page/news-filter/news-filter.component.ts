import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-news-filter',
  templateUrl: './news-filter.component.html',
  styleUrls: ['./news-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
