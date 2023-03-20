import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';

import BookModel from 'src/app/shared/models/books/book.model';
import { BookCardComponent } from 'src/app/shared/components/book-card/book-card.component';
import { BooksService } from 'src/app/core/services/books/books.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit {
  private readonly bookService = inject(BooksService);

  books$?: Observable<BookModel[]>;

  ngOnInit() {
    this.books$ = this.bookService.getBooks();
  }
}
