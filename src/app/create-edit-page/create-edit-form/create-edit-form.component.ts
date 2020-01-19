import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-create-edit-form',
  templateUrl: './create-edit-form.component.html',
  styleUrls: ['./create-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
