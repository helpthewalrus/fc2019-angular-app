import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DataService } from "src/app/shared/services/data.service";
import { createSpy } from "src/app/shared/createSpy";
import { ArticleInterface } from "src/app/core/models";
import { NewsItemComponent } from "./news-item.component";

describe("NewsItemComponent", () => {
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

  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;

  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsItemComponent],
      providers: [
        { provide: DataService, useValue: createSpy(DataService.prototype) }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;
    component.article = article;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onEditArticle", () => {
    beforeEach(() => {
      component.onEditArticle();
    });

    it("should call dataService function for setting current article and app title", () => {
      expect(dataService.setCurrentArticle).toHaveBeenCalledWith(article);
      expect(dataService.changeAppTitle).toHaveBeenCalledWith("Edit");
    });
  });

  describe("onReadArticle", () => {
    beforeEach(() => {
      component.onReadArticle();
    });

    it("should call dataService function for setting current article and app title", () => {
      expect(dataService.setCurrentArticle).toHaveBeenCalledWith(article);
      expect(dataService.changeAppTitle).toHaveBeenCalledWith(
        "Read chosen article"
      );
    });
  });

  describe("onDeleteArticle", () => {
    beforeEach(() => {
      component.onDeleteArticle("111");
    });

    it("should call dataService function for setting current article and app title", () => {
      expect(dataService.deleteMyArticle).toHaveBeenCalledWith("111");
    });
  });
});
