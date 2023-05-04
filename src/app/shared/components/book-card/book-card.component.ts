import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BooksToReadService } from 'src/app/core/services/books-to-read/books-to-read.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

import AddUserBookModel from '../../models/books-to-read/add-book-to-read.model';
import BookCardModel from '../../models/books/book-card.model';
import BookLibraryModel from "../../models/book-library/book-library.model";

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterLink, MatTooltipModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() book: BookCardModel = {} as BookCardModel;
  @Input() bookLibrary: BookLibraryModel | null = null;
  @Input() isMarkedToRead: boolean = false;

  private readonly router = inject(Router);
  private readonly booksToReadService = inject(BooksToReadService);
  private readonly authenticationService = inject(AuthenticationService);

  userRole: string = this.authenticationService.getUserInfoData().role;

  addBookToRead(): void {
    const userId = this.authenticationService.getUserInfoData().id;

    if (userId) {
      this.booksToReadService.addUserBook({
        bookId: this.book.id,
        userId: userId
      } as AddUserBookModel)
    } else {
      console.error('You need to be logged in to add to the reading list!');

      this.router.navigate(['/login']);
    }
  }

  removeBookFromToRead(): void {
    const userId = this.authenticationService.getUserInfoData().id;

    if (userId) {
      this.booksToReadService.removeUserBook(this.book.id);
    } else {
      console.error('You need to be logged in to remove book from the reading list!');

      this.router.navigate(['/login']);
    }
  }
}
