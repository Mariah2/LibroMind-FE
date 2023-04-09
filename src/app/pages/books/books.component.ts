import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import BookModel from 'src/app/shared/models/books/book.model';
import { BookCardComponent } from 'src/app/shared/components/book-card/book-card.component';
import { BooksService } from 'src/app/core/services/books/books.service';
import { BooksToReadService } from 'src/app/core/services/books-to-read/books-to-read.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit {
  private booksSubject = new BehaviorSubject<BookModel[]>([]);
  books$ = this.booksSubject.asObservable();

  constructor(
    private readonly booksService: BooksService,
    private readonly booksToReadService: BooksToReadService) { }

  ngOnInit(): void {
    this.booksService.getBooks().subscribe({
      next: async (books: BookModel[]) => {
        this.booksToReadService.setBooksToRead();

        this.booksSubject.next(books);
      }
    });

    this.booksToReadService.getBooksToRead().subscribe({
      next: (booksToRead: BookModel[]) => {
        if (booksToRead && booksToRead.length > 0) {
          const updatedBooks = this.booksSubject.getValue();

          updatedBooks.forEach(book => {
            book.isMarkedToRead = booksToRead.find(btr => btr.id === book.id) === undefined;
          });

          this.booksSubject.next(updatedBooks);
        }
      }
    });
  }
}
