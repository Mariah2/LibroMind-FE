import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Observable } from 'rxjs';
import UserModel from 'src/app/shared/models/users/user.model';
import { UsersService } from '../../services/users/users.service';
import { BooksToReadService } from '../../services/books-to-read/books-to-read.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatMenuModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userId: number | undefined;
  user$: Observable<UserModel> | undefined;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly booksToReadService: BooksToReadService) { }

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
