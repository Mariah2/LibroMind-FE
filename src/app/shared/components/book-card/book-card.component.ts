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

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterLink, MatTooltipModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() book: BookCardModel = {} as BookCardModel;
  @Input() isMarkedToRead: boolean = false;

  private readonly router = inject(Router);
  userRole = this.authenticationService.getUserInfoData().role;

  constructor(
    private readonly booksToReadService: BooksToReadService,
    private readonly authenticationService: AuthenticationService) { }

  addBookToRead(): void {
    const userId = this.authenticationService.getUserInfoData().id;

    if (userId) {
      this.booksToReadService.addUserBook({
        bookId: this.book.id,
        userId: userId
      } as AddUserBookModel)
    } else {
      this.router.navigate(['/login']);
    }
  }

  // removeBookToRead(bookId: number): void {
  //   const userId = this.authenticationService.getUserInfoData().id;

  //   if(userId) {
  //     this.booksToReadService.removeUserBook()
  //   }
  // }
}
