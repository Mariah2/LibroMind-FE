import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { BooksService } from 'src/app/core/services/books/books.service';
import { BooksToReadService } from 'src/app/core/services/books-to-read/books-to-read.service';
import { BookCardComponent } from 'src/app/shared/components/book-card/book-card.component';

import BookCardModel from 'src/app/shared/models/books/book-card.model';
import BookUserCardModel from "../../shared/models/book-users/book-user-card.model";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, BookCardComponent, MatCardModule, MatIconModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit {
  private readonly booksService = inject(BooksService);
  private readonly booksToReadService = inject(BooksToReadService);

  private booksSubject = new BehaviorSubject<BookCardModel[]>([]);
  books$ = this.booksSubject.asObservable();

  ngOnInit(): void {
    this.booksService.getBookCards().subscribe({
      next: async (books: BookCardModel[]) => {
        this.booksToReadService.setBooksToRead();

        this.booksSubject.next(books);
      }
    });

    this.booksToReadService.getBooksToRead().subscribe({
      next: (booksToRead: BookUserCardModel[]) => {
        const updatedBooks = this.booksSubject.getValue();

        if (booksToRead && booksToRead.length > 0) {
          updatedBooks.forEach(book => {
            book.isMarkedToRead = booksToRead.find(btr => btr.book.id === book.id) !== undefined;
          });
        } else {
          updatedBooks.forEach(book => {
            book.isMarkedToRead = false;
          });
        }

        this.booksSubject.next(updatedBooks);
      }
    });
  }
}
