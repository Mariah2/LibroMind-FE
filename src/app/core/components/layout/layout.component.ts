import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  standalone: true,
  selector: 'app-layout',
  template: `
    <app-header></app-header>
    <main class="h-full">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    `
  ,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent { }