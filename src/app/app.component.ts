import { Component, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { DomSanitizer } from "@angular/platform-browser";

import { FooterComponent } from "./layout/footer/footer.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public footer: any = null;

  constructor(public injector: Injector, domSanitizier: DomSanitizer) {
    const FooterElement = createCustomElement(FooterComponent, {
      injector: injector
    });
    customElements.define("my-footer", FooterElement);
    this.footer = domSanitizier.bypassSecurityTrustHtml(
      "<my-footer footer='Powered by NewsApi'></my-footer>"
    );
  }
}
