import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";

import { AuthenticationService } from "../../services/authentication/authentication.service";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  standalone: true,
  selector: 'app-layout',
  template: `
      <mat-sidenav-container class="h-full">
          <mat-sidenav #sidenav role="navigation" class="h-full block lg:hidden">
              <mat-drawer-container autosize *ngIf="userInfo$ | async as userInfo">
                  <div class="flex flex-col overflow-y-hidden w-64">
                      <div class="bg-primary flex items-center justify-end h-16">
                          <button mat-icon-button class="mr-4" (click)="toggleSidenav()">
                              <mat-icon>close</mat-icon>
                          </button>
                      </div>

                      <a mat-button (click)="toggleSidenav()" [routerLink]="['/books']" routerLinkActive="active"
                         class="py-8 font-mono font-semibold text-2xl text-secondary-darker">Books</a>

                      <a *ngIf="!isLoggedIn || userInfo.role === 'user'"
                         mat-button (click)="toggleSidenav()" [routerLink]="['/libraries']" routerLinkActive="active"
                         class="py-8 font-mono font-semibold text-2xl text-secondary-darker">Libraries</a>

                      <a *ngIf="userInfo.role === 'librarian'" routerLinkActive="active"
                         mat-button (click)="toggleSidenav()" [routerLink]="['/librarian/borrowings']"
                         class="py-8 font-mono font-semibold text-2xl text-secondary-darker">Borrowings</a>
                  </div>
              </mat-drawer-container>
          </mat-sidenav>

          <mat-sidenav-content class="h-full bg-light-grey flex-col justify-items-center">
              <app-header (toggleSidnav)="toggleSidenav()"></app-header>
              <main class="max-h-fullscreen h-fullscreen">
                  <router-outlet></router-outlet>
              </main>
              <app-footer></app-footer>
          </mat-sidenav-content>
      </mat-sidenav-container>
  `
  ,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterLink,
    RouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  private readonly authenticationService = inject(AuthenticationService);

  isLoggedIn = false;
  userInfo$ = this.authenticationService.getUserInfo();

  ngOnInit(): void {
    this.authenticationService.getIsLoggedIn().subscribe({
      next: (value) => {
        this.isLoggedIn = value;
      }
    });
  }

  toggleSidenav(): void {
    this.sidenav?.toggle();
  }
}
