import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewsListComponent } from "./news-list.component";

describe("NewsListComponent", () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onLoadMoreClicked", () => {
    beforeEach(() => {
      spyOn(component.loadMoreClicked, "emit").and.callThrough();
      component.onLoadMoreClicked();
    });

    it("should emit event that 'Load more' button was clicked", () => {
      expect(component.loadMoreClicked.emit).toHaveBeenCalled();
    });
  });

  describe("trackByIndex", () => {
    it("should return index provided as argument", () => {
      const expectedResult: number = component.trackByIndex(1);

      expect(expectedResult).toEqual(1);
    });
  });
});
