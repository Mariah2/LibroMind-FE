import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import BorrowBookModel from '../../models/borrow-book/borrow-bookmodel';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'borrow-dialog',
    templateUrl: 'borrow-dialog.component.html',
})
export class BorrowDialog {
    constructor(
        public dialogRef: MatDialogRef<BorrowDialog>,
        @Inject(MAT_DIALOG_DATA) public data: BorrowBookModel,
    ) { }

    closeDialog() {
        this.dialogRef.close();
      }

    addBorrow() {
        
    }
}