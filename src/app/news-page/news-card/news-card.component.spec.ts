import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { of } from "rxjs";

import { NewsCardComponent } from "./news-card.component";
import { DataService } from "src/app/shared/services/data.service";
import { createSpy } from "src/app/shared/createSpy";
import { ArticleInterface } from "src/app/core/models";

describe("NewsCardComponent", () => {
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

  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsCardComponent],
      providers: [
        { provide: DataService, useValue: createSpy(DataService.prototype) }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    beforeEach(() => {
      dataService.currentArticle$ = of(article);
      component.ngOnInit();
    });

    it("should set component current article", () => {
      component.currentArticle$.subscribe(
        (currentArticle: ArticleInterface) => {
          expect(currentArticle).toEqual(article);
        }
      );
    });
  });

  describe("onEditArticle", () => {
    beforeEach(() => {
      component.onEditArticle(article);
    });

    it("should call dataService set current article and app title functions", () => {
      expect(dataService.changeAppTitle).toHaveBeenCalledWith("Edit");
      expect(dataService.setCurrentArticle).toHaveBeenCalledWith(article);
    });
  });
});
