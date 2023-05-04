import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { BooksToReadService } from 'src/app/core/services/books-to-read/books-to-read.service';
import { BookCardComponent } from 'src/app/shared/components/book-card/book-card.component';

import BookUserCardModel from "../../shared/models/book-users/book-user-card.model";

@Component({
  selector: 'app-books-to-read',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    MatTooltipModule,
    BookCardComponent],
  templateUrl: './books-to-read.component.html',
  styleUrls: ['./books-to-read.component.scss']
})
export class BooksToReadComponent {
  bookUserCards$: Observable<BookUserCardModel[]> | undefined;
  userId : number | undefined;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly booksToReadService: BooksToReadService,
    private readonly router: Router) { }

  ngOnInit() {
    this.userId = this.authenticationService.getUserInfoData().id;

    if (this.userId) {
      this.bookUserCards$ = this.booksToReadService.getBooksToRead();
    } else {
      this.router.navigate(['/dashboard']);

      console.error('Invalid UserId!');
    }
  }
}
