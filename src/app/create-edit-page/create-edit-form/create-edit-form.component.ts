import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { Observable } from "rxjs";

import { DataService } from "src/app/shared/services/data.service";

@Component({
  selector: "app-create-edit-form",
  templateUrl: "./create-edit-form.component.html",
  styleUrls: ["./create-edit-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditFormComponent implements OnInit {
  public currentArticle$: Observable<any>;

  public articleForm = this.fb.group({
    heading: ["", Validators.required],
    shortDescription: [""],
    content: ["", Validators.required],
    photo: this.fb.group({
      radioType: ["url"],
      inputUrl: [""],
      inputImg: [""]
    }),
    date: [""],
    author: [""],
    sourceUrl: [""]
  });

  public radioButtonValue: boolean = false;
  public image: string;

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit() {
    this.currentArticle$ = this.dataService.currentArticle$;
  }

  public onRadioClicked({ target: { value } }): void {
    this.radioButtonValue = value === "image" ? true : false;
  }

  public onFileSelect(event: any) {
    this.articleForm.patchValue({ photo: { inputUrl: "" } });

    const file = (event.target as HTMLInputElement).files[0];
    this.articleForm.patchValue({ photo: { inputImg: file } });
    this.photo.updateValueAndValidity();

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  public onUrlSelect() {
    this.articleForm.patchValue({ photo: { inputImg: "" } });
  }

  public onSubmit(): void {
    console.log("SAVE FORM", this.articleForm.value);
    alert("SAVE FORM");
  }

  public onCancel(): void {
    console.log("ON CANCEL FORM");
    alert("ON CANCEL FORM");
  }

  private get photo(): any {
    return this.articleForm.get("photo").get("inputImg");
  }
}
