import { enableProdMode } from '@angular/core';
import { provideRouter, Route } from "@angular/router";
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

const appRoutes: Route[] = [
  {
    path: "",
    loadComponent: () => import("./app/core/components/layout/layout.component").then((m) => m.LayoutComponent),
    loadChildren: () => import("./app/core/components/layout/layout.routes").then((m) => m.routes),
  }
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideAnimations()
  ]
})
  .catch(err => console.error(err));