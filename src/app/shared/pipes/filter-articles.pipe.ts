import { Pipe, PipeTransform } from "@angular/core";
import { ArticleInterface } from "src/app/core/models";

@Pipe({
  name: "filter"
})
export class FilterArticlesPipe implements PipeTransform {
  transform(
    articles: ArticleInterface[],
    search: string = ""
  ): ArticleInterface[] {
    if (!search.trim()) {
      return articles;
    }

    return articles.filter((article: ArticleInterface) =>
      article.title.toUpperCase().includes(search.toUpperCase())
    );
  }
}
