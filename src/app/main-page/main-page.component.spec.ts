import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { of } from "rxjs";

import { DataService } from "../shared/services/data.service";
import { createSpy } from "../shared/createSpy";
import { ArticleInterface } from "../core/models";
import { FilterArticlesPipe } from "../shared/pipes/filter-articles.pipe";
import { MainPageComponent } from "./main-page.component";

describe("MainViewComponent", () => {
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
      publishedAt: "2020-02-08T11:57:32Z",
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
      publishedAt: "2020-02-08T11:57:32Z",
      content: "Test Content 2",
      myNews: true
    }
  ];

  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageComponent, FilterArticlesPipe],
      providers: [
        { provide: DataService, useValue: createSpy(DataService.prototype) }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    dataService.getArticlesStream.and.returnValue(of(articles));
    dataService.currentArticlesFilter$ = of("");

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should set component articles to articles fetched by dataService", () => {
      component.articles$.subscribe((currentArticles: ArticleInterface[]) => {
        expect(currentArticles).toEqual(articles);
      });
    });
  });

  describe("onChangeCurrentSource", () => {
    beforeEach(() => {
      component.onChangeCurrentSource({ id: "bbc-sport", name: "BBC Sport" });
    });

    it("should call dataService function that calls fetching articles according to sourceId", () => {
      expect(dataService.getArticlesBySourceId).toHaveBeenCalledWith(
        "bbc-sport"
      );
    });
  });

  describe("onChangeIsOnlyMyArticles", () => {
    beforeEach(() => {
      component.onChangeIsOnlyMyArticles();
    });

    it("should call dataService function that calls fetching articles according to sourceId", () => {
      expect(dataService.getArticlesBySourceId).toHaveBeenCalledWith("my-news");
    });
  });

  describe("onLoadMoreButtonClicked", () => {
    beforeEach(() => {
      component.onLoadMoreButtonClicked();
    });

    it("should call dataService function that calls fetching articles according to sourceId", () => {
      expect(dataService.getArticlesByPage).toHaveBeenCalled();
      expect(dataService.changeCurrentArticlesFilter).toHaveBeenCalledWith("");
    });
  });
});
