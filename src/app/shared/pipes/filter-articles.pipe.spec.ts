import { FilterArticlesPipe } from "./filter-articles.pipe";
import { ArticleInterface } from "src/app/core/models";

const articles: ArticleInterface[] = [
  {
    _id: "111",
    source: {
      id: "my-news",
      name: "My News"
    },
    author: "Test Author",
    title: "First Article Title",
    description: "Test Description",
    url: "Test Url",
    urlToImage: "Test Url To Image",
    publishedAt: "Test Date",
    content: "Test Content",
    myNews: true
  },
  {
    _id: "222",
    source: {
      id: "my-news",
      name: "My News"
    },
    author: "Test Author 2",
    title: "Second Article Title",
    description: "Test Description 2",
    url: "Test Url 2",
    urlToImage: "Test Url To Image 2",
    publishedAt: "Test Date 2",
    content: "Test Content 2",
    myNews: true
  }
];

const filteredArticles: ArticleInterface[] = [
  {
    _id: "222",
    source: {
      id: "my-news",
      name: "My News"
    },
    author: "Test Author 2",
    title: "Second Article Title",
    description: "Test Description 2",
    url: "Test Url 2",
    urlToImage: "Test Url To Image 2",
    publishedAt: "Test Date 2",
    content: "Test Content 2",
    myNews: true
  }
];

describe("FilterArticlesPipe", () => {
  let pipe: FilterArticlesPipe;

  beforeAll(() => {
    pipe = new FilterArticlesPipe();
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should return one article according to search input", () => {
    const expectedResult: ArticleInterface[] = pipe.transform(
      articles,
      "SECOND"
    );

    expect(expectedResult).toEqual(filteredArticles);
  });

  it("should return all articles if nosearch input was provided", () => {
    const expectedResult: ArticleInterface[] = pipe.transform(articles);

    expect(expectedResult).toEqual(articles);
  });
});
