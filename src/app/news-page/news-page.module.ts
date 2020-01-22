import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NewsPageRoutingModule } from "./news-page-routing.module";
import { NewsPageComponent } from "./news-page.component";
import { NewsCardComponent } from "./news-card/news-card.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [NewsPageComponent, NewsCardComponent],
  imports: [CommonModule, FormsModule, NewsPageRoutingModule]
})
export class NewsPageModule {}
