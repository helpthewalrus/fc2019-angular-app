import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
