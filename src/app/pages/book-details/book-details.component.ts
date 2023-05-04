import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { BooksService } from 'src/app/core/services/books/books.service';
import { BooksToReadService } from "../../core/services/books-to-read/books-to-read.service";
import { LibraryBooksService } from 'src/app/core/services/library-books/library-books.service';
import { UsersService } from 'src/app/core/services/users/users.service';

import { AddReviewComponent } from '../../shared/components/add-review/add-review.component';
import { BorrowDialog } from 'src/app/shared/components/borrow-dialog/borrow-dialog.component';
import { ReviewComponent } from '../review/review.component';

import BookModel from 'src/app/shared/models/books/book.model';
import BorrowingConfirmationModel from 'src/app/shared/models/borrowings/borrowing-confirmation.model';
import LibraryModel from 'src/app/shared/models/libraries/library.model';
import UserModel from 'src/app/shared/models/users/user.model';
import UserInfoModel from "../../shared/models/users/user-info.model";
import AddUserBookModel from "../../shared/models/books-to-read/add-book-to-read.model";

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    AddReviewComponent,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    RouterLink,
    ReviewComponent],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly authenticationService = inject(AuthenticationService);
  private readonly bookService = inject(BooksService);
  private readonly booksToReadService = inject(BooksToReadService);
  private readonly libraryBooksService = inject(LibraryBooksService);
  private readonly usersService = inject(UsersService);

  private readonly bookSubject = new BehaviorSubject<BookModel>({} as BookModel);
  book$: Observable<BookModel> = this.bookSubject.asObservable();

  constructor(public dialog: MatDialog) { }

  library: LibraryModel | null = null;
  userInfo: UserInfoModel = this.authenticationService.getUserInfoData();

  user$: Observable<UserModel> | undefined;
  private readonly isMarkedToReadSubject = new BehaviorSubject(false);
  isMarkedToRead$ = this.isMarkedToReadSubject.asObservable();

  ngOnInit() {
    this.bookService.getBookById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe({
      next: (value: BookModel) => {
        this.bookSubject.next(value);
      },
      error: (response) => {
        this.router.navigate(['not-found'], {replaceUrl: true});

        throw response.error.title;
      }
    })

    if (this.userInfo.id) {
      this.user$ = this.usersService.getUserProfileById(this.userInfo.id);

      this.booksToReadService.getBooksToRead().subscribe({
        next: (books) => {
          this.isMarkedToReadSubject.next(books.find(bu => bu.bookId ===
            Number(this.activatedRoute.snapshot.paramMap.get('id'))) !== undefined);
        }
      })
    }
  }

  addBookToRead(): void {
    const userId = this.authenticationService.getUserInfoData().id;

    if (userId) {
      this.booksToReadService.addUserBook({
        bookId: this.bookSubject.getValue().id,
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
      this.booksToReadService.removeUserBook(this.bookSubject.getValue().id);
    } else {
      console.error('You need to be logged in to remove book from the reading list!');

      this.router.navigate(['/login']);
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, book: BookModel): void {
    if (!this.userInfo.role || this.userInfo.role !== 'user') {
      console.error('You need to be logged in to borrow a book!');

      this.router.navigate(['/login']);

      return;
    }

    if (this.library) {
      this.libraryBooksService.getBookLibrary(book.id, this.library.id).subscribe({
        next: (bookLibrary) => {
          if (bookLibrary.quantity > 0) {
            this.dialog.open(BorrowDialog, {
              width: '300px',
              enterAnimationDuration,
              exitAnimationDuration,
              data:
                ({
                  userId: this.authenticationService.getLoggedInUser().id,
                  bookLibraryId: bookLibrary.id,
                  authorFullName: book.author.firstName + ' ' + book.author.lastName,
                  bookTitle: book.title,
                  libraryName: this.library?.name,
                } as BorrowingConfirmationModel)
            });
          } else {
            console.error("All available books have been borrowed!");
          }
        }
      })
    } else {
      console.error("Please select a library!");
    }
  }
}


