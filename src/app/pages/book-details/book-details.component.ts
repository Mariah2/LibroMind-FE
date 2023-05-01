import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, Observable, take } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import BookModel from 'src/app/shared/models/books/book.model';
import UserModel from 'src/app/shared/models/users/user.model';

import { BooksService } from 'src/app/core/services/books/books.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { ReviewComponent } from '../review/review.component';
import { AddReviewComponent } from '../add-review/add-review.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { BorrowDialog } from 'src/app/shared/components/borrow-dialog/borrow-dialog.component';
import LibraryModel from 'src/app/shared/models/libraries/library.model';
import BorrowBookModel from 'src/app/shared/models/borrow-book/borrow-bookmodel';


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
  private readonly authenticationService = inject(AuthenticationService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly bookService = inject(BooksService);
  private readonly router = inject(Router);
  private readonly bookSubject = new BehaviorSubject<BookModel>({} as BookModel);
  private readonly usersService = inject(UsersService);

  constructor(public dialog: MatDialog) {}

  library: LibraryModel | null = null;
  user$: Observable<UserModel> | undefined;
  book$ = this.bookSubject.asObservable();  

  ngOnInit() {
    this.bookService.getBookById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe({
      next: (value: BookModel) => {
        this.bookSubject.next(value);
      },
      error: (response) => {
        this.router.navigate(['not-found'], { replaceUrl: true });

        throw response.error.title;
      }
    })

    const id = this.authenticationService.getUserInfoData().id;

    if (id) {
      this.user$ = this.usersService.getUserProfileById(id);
    } else {
      this.router.navigate(['/dashboard']);

      console.error('Invalid UserId!');
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, book: BookModel): void {
    console.log(this.library)
    if (this.library) {
      this.dialog.open(BorrowDialog, {
        width: '300px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: 
          ({userId: this.authenticationService.getLoggedInUser().id,
          book: book,
          library: this.library,
        } as BorrowBookModel)
      });
    } else {
      console.error("Please select a library!");
    }
  }
}

  
