import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import BookModel from 'src/app/shared/models/books/book.model';
import { BookCardComponent } from 'src/app/shared/components/book-card/book-card.component';
import { BooksService } from 'src/app/core/services/books/books.service';
import { BooksToReadService } from 'src/app/core/services/books-to-read/books-to-read.service';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddBookDialogComponent } from 'src/app/shared/components/book-dialog/add-book-dialog/add-book-dialog.component';
import BookCardModel from 'src/app/shared/models/books/book-card.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, BookCardComponent, MatCardModule, MatIconModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private booksSubject = new BehaviorSubject<BookCardModel[]>([]);
  books$ = this.booksSubject.asObservable();
  userRole = this.authenticationService.getUserInfoData().role;

  constructor(
    private readonly booksService: BooksService,
    private readonly booksToReadService: BooksToReadService,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.booksService.getBookCards().subscribe({
      next: async (books: BookCardModel[]) => {
        this.booksToReadService.setBooksToRead();

        this.booksSubject.next(books);
      }
    });

    this.booksToReadService.getBooksToRead().subscribe({
      next: (booksToRead: BookCardModel[]) => {
        if (booksToRead && booksToRead.length > 0) {
          const updatedBooks = this.booksSubject.getValue();

          updatedBooks.forEach(book => {
            book.isMarkedToRead = booksToRead.find(btr => btr.id === book.id) !== undefined;
          });

          this.booksSubject.next(updatedBooks);
        }
      }
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddBookDialogComponent, {
      width: '600px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  addBook() {

  }
}
