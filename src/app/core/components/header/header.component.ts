import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { BooksToReadService } from '../../services/books-to-read/books-to-read.service';
import { UsersService } from "../../services/users/users.service";
import { Observable } from "rxjs";
import UserModel from "../../../shared/models/users/user.model";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatMenuModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public toggleSidnav = new EventEmitter();

  private readonly authenticationService = inject(AuthenticationService);
  private readonly booksToReadService = inject(BooksToReadService);
  private readonly usersService = inject(UsersService);

  isLoggedIn = false;
  userInfo$ = this.authenticationService.getUserInfo();
  userProfile$: Observable<UserModel> | undefined;

  ngOnInit(): void {
    const id = this.authenticationService.getUserInfoData().id;

    if (id) {
      this.userProfile$ = this.usersService.getUserProfileById(id);
    }

    this.authenticationService.getIsLoggedIn().subscribe({
      next: (value) => {
        this.isLoggedIn = value;

        const id = this.authenticationService.getUserInfoData().id;

        if (id) {
          this.userProfile$ = this.usersService.getUserProfileById(id);
        }
      }
    });
  }

  toggleSidenav(): void {
    this.toggleSidnav.emit();
  };

  logout(): void {
    this.authenticationService.logout();
    this.booksToReadService.clearBooksToRead();
  }
}
