import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import BorrowingConfirmationModel from '../../models/borrowings/borrowing-confirmation.model';
import { BorrowingsService } from 'src/app/core/services/borrowings/borrowings.service';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'borrow-dialog',
    templateUrl: 'borrow-dialog.component.html',
})
export class BorrowDialog {
    private readonly borrowingsService = inject(BorrowingsService)

    constructor(
        public dialogRef: MatDialogRef<BorrowDialog>,
        @Inject(MAT_DIALOG_DATA) public data: BorrowingConfirmationModel,
    ) { }

    closeDialog() {
        this.dialogRef.close();
    }

    addBorrow() {
        this.borrowingsService.addBorrowing({
            userId: this.data.userId,
            bookLibraryId: this.data.bookLibraryId,
        }).subscribe({
            next: () => {
                console.log("Book borrowed successfully!");
                this.closeDialog();
            },
            error: (error) => {
                console.error(error);
            }
        });
    }
}