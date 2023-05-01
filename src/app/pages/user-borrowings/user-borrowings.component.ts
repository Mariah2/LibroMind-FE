import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { BorrowingsService } from 'src/app/core/services/borrowings/borrowings.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, map } from 'rxjs';
import BorrowingDetailsModel from 'src/app/shared/models/borrowings/borrowing-details.model';

@Component({
  selector: 'app-user-borrowings',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './user-borrowings.component.html',
  styleUrls: ['./user-borrowings.component.scss']
})
export class UserBorrowingsComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly borrowingsService = inject(BorrowingsService);

  private readonly borrowingsSubject = new BehaviorSubject<BorrowingDetailsModel[]>([]);
  borrowings$ = this.borrowingsSubject.asObservable();

  ngOnInit(): void {
    this.borrowingsService.getBorrowingsByUserId(this.authenticationService.getUserInfoData().id).subscribe({
      next: (borrowings) => {
        this.borrowingsSubject.next(borrowings);
      }
    })
  }

  cancelBorrowing(id: number): void {
    this.borrowingsService.deleteBorrowing(id).subscribe({
      next: () => {
        let borrowings = this.borrowingsSubject.getValue();
        const index = borrowings.findIndex(b => b.id === id);

        if (index > -1) {
          borrowings.splice(index, 1);
          this.borrowingsSubject.next(borrowings);

          console.log("Borrowing has been canceled!");
        }
      },
      error: () => {
        console.error("An error occurred and the borrow could not be canceled!");
      }
    });
  }

  requestExtensionForBorrowing(id: number): void {
    this.borrowingsService.requestExtensionForBorrowing(id).subscribe({
      next: () => {
        let borrowings = this.borrowingsSubject.getValue();
        const index = borrowings.findIndex(b => b.id === id);

        if (index > -1) {
          borrowings[index].wasExtensionRequested = true;
          this.borrowingsSubject.next(borrowings);

          console.log("An extension request has been submitted for your borrowing!");
        }
      },
      error: () => {
        console.error("An error occurred and the borrowing extension has not been submitted!");
      }
    });
  }
}
