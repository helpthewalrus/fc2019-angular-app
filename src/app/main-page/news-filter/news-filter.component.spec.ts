import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { of } from "rxjs";

import { DataService } from "src/app/shared/services/data.service";
import { createSpy } from "src/app/shared/createSpy";
import { SourceInterface, ArticleInterface } from "src/app/core/models";
import { NewsFilterComponent } from "./news-filter.component";

describe("NewsFilterComponent", () => {
  const emptyArticle: ArticleInterface = {
    source: {
      id: "my-news",
      name: "My News"
    },
    author: "",
    title: "",
    description: "",
    url: "",
    urlToImage: "",
    publishedAt: new Date().toISOString(),
    content: "",
    myNews: true
  };

  const sources: SourceInterface[] = [
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
  let component: NewsFilterComponent;
  let fixture: ComponentFixture<NewsFilterComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsFilterComponent],
      providers: [
        { provide: DataService, useValue: createSpy(DataService.prototype) }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    dataService = TestBed.get(DataService);

    dataService.currentSource$ = of("");
    dataService.getSources.and.returnValue(of(sources));
    dataService.currentArticlesFilter$ = of("");
    dataService.isOnlyMyArticles$ = of(false);

    fixture = TestBed.createComponent(NewsFilterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onSourceChange", () => {
    beforeEach(() => {
      const mockEvent = {
        target: {
          innerText: "BBC News",
          dataset: { srcid: "bbc-news" }
        }
      };
      spyOn(component.currentSourceChange, "emit").and.callThrough();
      component.onSourceChange(mockEvent);
    });

    it("should change current source, reset filter, change app title, emit source", () => {
      expect(component.currentSourceChange.emit).toHaveBeenCalledWith({
        name: "BBC News",
        id: "bbc-news"
      });
      expect(dataService.changeCurrentSource).toHaveBeenCalledWith("BBC News");
      expect(dataService.changeCurrentArticlesFilter).toHaveBeenCalledWith("");
      expect(dataService.changeAppTitle).toHaveBeenCalledWith("BBC News");
    });
  });

  describe("onEnterNewsFilter", () => {
    beforeEach(() => {
      const mockEvent = {
        target: {
          value: "Test"
        }
      };
      component.onEnterNewsFilter(mockEvent);
    });

    it("should call dataService function that changs articles filter", () => {
      expect(dataService.changeCurrentArticlesFilter).toHaveBeenCalledWith(
        "Test"
      );
    });
  });

  describe("onCheckboxClicked", () => {
    beforeEach(() => {
      const mockEvent = {
        target: {
          checked: true
        }
      };
      spyOn(component.currentCheckboxState, "emit").and.callThrough();
      component.onCheckboxClicked(mockEvent);
    });

    it("should create empty article and set it as current one and change app title", () => {
      expect(dataService.changeCurrentSource).toHaveBeenCalledWith("");
      expect(dataService.changeCurrentArticlesFilter).toHaveBeenCalledWith("");
      expect(dataService.changeIsOnlyMyArticles).toHaveBeenCalledWith(true);
      expect(dataService.changeAppTitle).toHaveBeenCalledWith("My News");
      expect(dataService.getArticlesBySourceId).toHaveBeenCalledWith("my-news");
    });
  });

  describe("onAddArticle", () => {
    beforeEach(() => {
      spyOn(component, "createEmptyArticle").and.returnValue(emptyArticle);
      component.onAddArticle();
    });

    it("should create empty article and set it as current one and change app title", () => {
      expect(component.createEmptyArticle).toHaveBeenCalled();
      expect(dataService.setCurrentArticle).toHaveBeenCalledWith(emptyArticle);
      expect(dataService.changeAppTitle).toHaveBeenCalledWith("Create");
    });
  });
});
