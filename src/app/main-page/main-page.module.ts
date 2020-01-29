import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MainPageRoutingModule } from "./main-page-routing.module";
import { MainPageComponent } from "./main-page.component";
import { NewsListComponent } from "./news-list/news-list.component";
import { NewsItemComponent } from "./news-item/news-item.component";
import { NewsFilterComponent } from "./news-filter/news-filter.component";
import { FilterArticlesPipe } from "../shared/pipes/filter-articles.pipe";

@NgModule({
  declarations: [
    MainPageComponent,
    NewsListComponent,
    NewsItemComponent,
    NewsFilterComponent,
    FilterArticlesPipe
  ],
  imports: [CommonModule, MainPageRoutingModule]
})
export class MainPageModule {}
