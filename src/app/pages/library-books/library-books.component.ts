import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, iif, map, Observable, switchMap, tap } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from "@angular/material/dialog";
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthenticationService } from "../../core/services/authentication/authentication.service";
import { BooksToReadService } from "../../core/services/books-to-read/books-to-read.service"
import { LibraryBooksService } from 'src/app/core/services/library-books/library-books.service';
import { BookCardComponent } from "../../shared/components/book-card/book-card.component";
import { AddBookDialogComponent } from "../../shared/components/add-book-dialog/add-book-dialog.component";

import BookLibraryCardModel from "../../shared/models/book-library/book-library-card.model";

@Component({
  selector: 'app-library-books',
  standalone: true,
  templateUrl: './library-books.component.html',
  styleUrls: ['./library-books.component.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    MatTooltipModule,
    BookCardComponent]
})
export class LibraryBooksComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly authenticationService = inject(AuthenticationService);
  private readonly bookToReadService = inject(BooksToReadService);
  private readonly libraryService = inject(LibraryBooksService);

  bookLibraryCards$: Observable<BookLibraryCardModel[]> | undefined;
  userRole = this.authenticationService.getUserInfoData().role;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.bookLibraryCards$ = this.libraryService.getBookLibraryCards(this.activatedRoute.snapshot.params['libraryId']).pipe(
      switchMap((bookLibraryCards) => this.bookToReadService.getBooksToRead().pipe(
        map((booksToRead) => {
          if (booksToRead && booksToRead.length > 0) {
            bookLibraryCards.forEach(blc => {
              blc.book.isMarkedToRead = booksToRead.find(btr => btr.book.id === blc.bookId) !== undefined;
            })
          } else {
            bookLibraryCards.forEach(blc => {
              blc.book.isMarkedToRead = false;
            })
          }

          return bookLibraryCards;
        })
      )),
      catchError((response) => {
        this.router.navigate(['not-found'], {replaceUrl: true});

        throw response.error.title;
      })
    );
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddBookDialogComponent, {
      width: '600px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }
}
