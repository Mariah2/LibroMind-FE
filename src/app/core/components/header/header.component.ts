import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { BooksToReadService } from '../../services/books-to-read/books-to-read.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatMenuModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly booksToReadService = inject(BooksToReadService);

  isLoggedIn = false;
  userInfo$ = this.authenticationService.getUserInfo();

  ngOnInit(): void {
    this.authenticationService.getIsLoggedIn().subscribe({
      next: (value) => {
        this.isLoggedIn = value;
      }
    });
  }

  logout(): void {
    this.authenticationService.logout();
    this.booksToReadService.clearBooksToRead();
  }
}
