import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BooksToReadService } from 'src/app/core/services/books-to-read/books-to-read.service';
import BookModel from '../../models/books/book.model';
import AddUserBookModel from '../../models/books-to-read/add-book-to-read.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterLink, MatTooltipModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent { 
  @Input() book: BookModel = {} as BookModel;

  constructor(
    private readonly booksToReadService: BooksToReadService,
    private readonly authenticationService: AuthenticationService) { }

  addBookToRead(): void {
    this.booksToReadService.addUserBook({
      bookId: this.book.id,
      userId: this.authenticationService.getUserId()} as AddUserBookModel)
  }
}
