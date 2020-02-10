import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditPageComponent } from './create-edit-page.component';

const routes: Routes = [{ path: '', component: CreateEditPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEditPageRoutingModule { }
