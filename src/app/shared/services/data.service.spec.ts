import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { SourceInterface, ArticleInterface } from "src/app/core/models";
import { DataService } from "./data.service";

describe("DataService", () => {
  let mockedSources: SourceInterface[] = [
    {
      id: "bbc-news",
      name: "BBC News",
      description: "BBC News",
      url: "http://www.bbc.co.uk/news",
      category: "general",
      language: "en",
      country: "gb"
    },
    {
      id: "bbc-sport",
      name: "BBC Sport",
      description: "BBC Sport",
      url: "http://www.bbc.co.uk/sport",
      category: "sports",
      language: "en",
      country: "gb"
    }
  ];

  const article: ArticleInterface = {
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
    publishedAt: "2020-02-08T11:45:53Z",
    content: "Test Content",
    myNews: true
  };

  let dataService: DataService;
  let httpMock: HttpTestingController;

  beforeEach(async () =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    }).compileComponents()
  );

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(dataService).toBeTruthy();
  });

  describe("changeAppTitle", () => {
    beforeEach(() => {
      dataService.changeAppTitle("Title");
    });

    it("current app title should equal to 'Title'", () => {
      dataService.currentAppTitle$.subscribe((title: string) => {
        expect(title).toEqual("Title");
      });
    });
  });

  describe("changeCurrentSource", () => {
    beforeEach(() => {
      dataService.changeCurrentSource("BBC Sport");
    });

    it("current articles source should equal to 'BBC Sport'", () => {
      dataService.currentSource$.subscribe((source: string) => {
        expect(source).toEqual("BBC Sport");
      });
    });
  });

  describe("changeCurrentArticlesFilter", () => {
    beforeEach(() => {
      dataService.changeCurrentArticlesFilter("Filter");
    });

    it("current articles filter should equal to 'Filter'", () => {
      dataService.currentArticlesFilter$.subscribe((search: string) => {
        expect(search).toEqual("Filter");
      });
    });
  });

  describe("changeIsOnlyMyArticles", () => {
    beforeEach(() => {
      dataService.changeIsOnlyMyArticles(true);
    });

    it("current flag isOnlyMyArticles is equal to true", () => {
      dataService.isOnlyMyArticles$.subscribe((isOnlyMyArticles: boolean) => {
        expect(isOnlyMyArticles).toEqual(true);
      });
    });
  });

  describe("setCurrentArticle", () => {
    beforeEach(() => {
      dataService.setCurrentArticle(article);
    });

    it("current flag isOnlyMyArticles is equal to true", () => {
      dataService.currentArticle$.subscribe(
        (currentArticle: ArticleInterface) => {
          expect(currentArticle).toEqual(article);
        }
      );
    });
  });
});
