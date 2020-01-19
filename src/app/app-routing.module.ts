import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "404",
    loadChildren: () =>
      import("./not-found/not-found.module").then(m => m.NotFoundModule)
  },
  {
    path: "contact",
    loadChildren: () =>
      import("./contact/contact.module").then(m => m.ContactModule)
  },
  {
    path: "",
    loadChildren: () =>
      import("./main-page/main-page.module").then(m => m.MainPageModule),
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
