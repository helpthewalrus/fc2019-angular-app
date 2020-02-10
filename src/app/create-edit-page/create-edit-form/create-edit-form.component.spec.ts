import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateEditFormComponent } from "./create-edit-form.component";
import { DataService } from "src/app/shared/services/data.service";
import { createSpy } from "src/app/shared/createSpy";

describe("CreateEditFormComponent", () => {
  let component: CreateEditFormComponent;
  let fixture: ComponentFixture<CreateEditFormComponent>;
  let dataSevice: jasmine.SpyObj<DataService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditFormComponent],
      providers: [
        { provide: DataService, useValue: createSpy(DataService.prototype) }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    dataSevice = TestBed.get(DataService);
    fixture = TestBed.createComponent(CreateEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
