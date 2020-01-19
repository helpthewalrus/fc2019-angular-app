import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEditPageRoutingModule } from './create-edit-page-routing.module';
import { CreateEditPageComponent } from './create-edit-page.component';
import { CreateEditFormComponent } from './create-edit-form/create-edit-form.component';


@NgModule({
  declarations: [CreateEditPageComponent, CreateEditFormComponent],
  imports: [
    CommonModule,
    CreateEditPageRoutingModule
  ]
})
export class CreateEditPageModule { }
