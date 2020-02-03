import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { DataService } from "src/app/shared/services/data.service";
import { ArticleInterface } from "src/app/core/models";

@Component({
  selector: "app-create-edit-form",
  templateUrl: "./create-edit-form.component.html",
  styleUrls: ["./create-edit-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditFormComponent implements OnInit, OnDestroy {
  public currentArticleSubscription: Subscription;
  public article: ArticleInterface;

  public articleForm: FormGroup;

  public radioButtonValue: boolean = false;
  public image: string;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentArticleSubscription = this.dataService.currentArticle$.subscribe(
      (article: ArticleInterface) => (this.article = article)
    );

    const {
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content
    } = this.article;

    this.articleForm = this.fb.group({
      heading: [title, Validators.required],
      shortDescription: [description],
      content: [content, Validators.required],
      photo: this.fb.group({
        radioType: ["url"],
        inputUrl: [urlToImage],
        inputImg: [""]
      }),
      date: [publishedAt],
      author: [author],
      sourceUrl: [url]
    });
  }

  public ngOnDestroy() {
    this.currentArticleSubscription.unsubscribe();
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
    this.dataService.processArticle(this.articleForm.value);
    this.router.navigate(["../"]);
  }

  private get photo(): any {
    return this.articleForm.get("photo").get("inputImg");
  }
}
