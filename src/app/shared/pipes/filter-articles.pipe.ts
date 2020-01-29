import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterArticlesPipe implements PipeTransform {
  transform(articles: any[], search: string = ""): any[] {
    if (!search.trim()) {
      return articles;
    }

    return articles.filter((article: any) =>
      article.title.toUpperCase().includes(search.toUpperCase())
    );
  }
}
