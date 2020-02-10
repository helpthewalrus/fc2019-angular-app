import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { of } from "rxjs";

import { HeaderComponent } from "./header.component";
import { DataService } from "src/app/shared/services/data.service";
import { createSpy } from "src/app/shared/createSpy";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: DataService, useValue: createSpy(DataService.prototype) }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    beforeEach(() => {
      dataService.currentAppTitle$ = of("Title");
      component.ngOnInit();
    });

    it("should set current app title to 'Title'", () => {
      component.currentAppTitle$.subscribe((title: string) => {
        expect(title).toEqual("Title");
      });
    });
  });

  describe("onChangeTitle", () => {
    beforeEach(() => {
      component.onChangeTitle("New Title");
    });

    it("should call dataService method that changes current app title", () => {
      expect(dataService.changeAppTitle).toHaveBeenCalledWith("New Title");
    });
  });
});
