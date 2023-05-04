import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

import { UsersService } from 'src/app/core/services/users/users.service';
import { BorrowingsService } from 'src/app/core/services/borrowings/borrowings.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import BorrowingDetailsModel from 'src/app/shared/models/borrowings/borrowing-details.model';

@Component({
  selector: 'app-librarian-borrowings',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: './librarian-borrowings.component.html',
  styleUrls: ['./librarian-borrowings.component.scss']
})
export class LibrarianBorrowingsComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly borrowingsService = inject(BorrowingsService);
  private readonly usersService = inject(UsersService);

  private userId = this.authenticationService.getUserInfoData().id;
  private libraryId = 0;

  private readonly borrowingsSubject = new BehaviorSubject<BorrowingDetailsModel[]>([]);
  borrowings$ = this.borrowingsSubject.asObservable();

  userSearch = new FormControl('');

  ngOnInit(): void {
    this.usersService.getUserProfileById(this.userId).subscribe({
      next: (userProfile) => {
        this.libraryId = Number(userProfile.libraryId);

        this.borrowingsService.getBorrowingsByLibraryId(this.libraryId).subscribe({
          next: (borrowings) => {
            this.borrowingsSubject.next(borrowings);
          }
        })
      }
    });

    this.userSearch.valueChanges.subscribe({
      next: (param: string | null): void => {
        this.borrowingsService.getBorrowingsByLibraryIdAndParam(this.libraryId, param).subscribe({
          next: (borrowings) => {
            this.borrowingsSubject.next(borrowings);
          }
        });
      }
    })
  }

  acceptBorrowing(id: number): void {
    this.borrowingsService.acceptBorrowing(id).subscribe({
      next: () => {
        let borrowings = this.borrowingsSubject.getValue();
        const index = borrowings.findIndex(b => b.id === id);

        if (index > -1) {
          borrowings[index].hasReturnedBook = false;

          this.borrowingsSubject.next(borrowings);

          console.log("Borrowing has been accepted!");
        }
      },
      error: () => {
        console.error("An error occurred and the borrow could not be accepted!");
      }
    });
  }

  extendBorrowing(id: number): void {
    this.borrowingsService.extendBorrowing(id).subscribe({
      next: () => {
        let borrowings = this.borrowingsSubject.getValue();
        const index = borrowings.findIndex(b => b.id === id);

        if (index > -1) {
          let returnDate = new Date(borrowings[index].returnDate);
          const days = returnDate.getDate();
          returnDate.setDate(days + 14);

          borrowings[index].wasExtensionRequested = false;
          borrowings[index].returnDate = returnDate;

          this.borrowingsSubject.next(borrowings);

          console.log("Borrowing has been extended!");
        }
      },
      error: () => {
        console.error("An error occurred and the borrow could not be extended!");
      }
    });
  }

  returnBorrowing(id: number): void {
    this.borrowingsService.returnBorrowing(id).subscribe({
      next: () => {
        let borrowings = this.borrowingsSubject.getValue();
        const index = borrowings.findIndex(b => b.id === id);

        if (index > -1) {
          borrowings.splice(index, 1);
          this.borrowingsSubject.next(borrowings);

          console.log("Borrowing has been returned!");
        }
      },
      error: () => {
        console.error("An error occurred and the borrow could not be returned!");
      }
    });
  }

  rejectBorrowing(id: number): void {
    this.borrowingsService.deleteBorrowing(id).subscribe({
      next: () => {
        let borrowings = this.borrowingsSubject.getValue();
        const index = borrowings.findIndex(b => b.id === id);

        if (index > -1) {
          borrowings.splice(index, 1);
          this.borrowingsSubject.next(borrowings);

          console.log("Borrowing has been rejected!");
        }
      },
      error: () => {
        console.error("An error occurred and the borrow could not be rejected!");
      }
    });
  }
}
