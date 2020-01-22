import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-create-edit-form",
  templateUrl: "./create-edit-form.component.html",
  styleUrls: ["./create-edit-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditFormComponent implements OnInit {
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

  public hoho: boolean = false;
  public image: string;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  public onSubmit(): void {
    console.log(this.articleForm.value);
  }

  public onRadioClicked({ target: { value } }): void {
    console.log(value);
    this.hoho = value === "image" ? true : false;
  }

  public onFileSelect(event: any) {
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

  public get photo(): any {
    return this.articleForm.get("photo").get("inputImg");
  }

  public onCancel(): void {
    console.log("=======onCancel=====");
  }
}
