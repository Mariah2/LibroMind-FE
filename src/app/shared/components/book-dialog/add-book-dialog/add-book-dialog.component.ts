import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import BookCardModel from 'src/app/shared/models/books/book-card.model';
import { BookCardComponent } from "../../book-card/book-card.component";
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from 'src/app/core/services/users/users.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { LibraryBooksService } from 'src/app/core/services/library-books/library-books.service';
import { BooksService } from 'src/app/core/services/books/books.service';
import { AddBookCardComponent } from '../../book-card/add-book-card/add-book-card.component';

@Component({
  selector: 'app-add-book-dialog',
  standalone: true,
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss'],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BookCardComponent,
    AddBookCardComponent
  ]
})
export class AddBookDialogComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly booksService = inject(BooksService);
  private readonly librarybooksService = inject(LibraryBooksService);
  private readonly usersService = inject(UsersService);

  private bookSearch = new FormControl<string | null>("", Validators.required);

  bookIdToAdd: number | null = null;
  bookCards$: Observable<BookCardModel[]> | undefined;
  libraryIdToAdd: number | null = null;

  addBookForm = new FormGroup({
    bookSearch: this.bookSearch,
    quantity: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
  });


  constructor(
    public dialogRef: MatDialogRef<AddBookDialogComponent>
  ) { }

  ngOnInit(): void {
    this.usersService.getUserProfileById(this.authenticationService.getLoggedInUser().id).subscribe({
      next: (user) => {
        this.libraryIdToAdd = user.libraryId;
      }
    })

    this.bookSearch.valueChanges.subscribe({
      next: (value: string | null) => {
        this.bookIdToAdd = null;
        this.bookCards$ = this.booksService.getBookCardsForLibraryIdByParam(this.libraryIdToAdd, value);
      }
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  displayBookName(book: BookCardModel): string {
    return book ? book.title + ", " + book.author.firstName + " " + book.author.lastName : "";
  }

  onSelectionChange(event: MatAutocompleteSelectedEvent): void {
    this.bookIdToAdd = event.option.value.id;
  }

  onSubmit(): void {
    if (!this.bookIdToAdd) {
      this.addBookForm.controls.bookSearch.setErrors({ 'invalid': true });
    } else if (this.addBookForm.valid) {
      this.librarybooksService.addBookLibrary({
        bookId: Number(this.bookIdToAdd),
        libraryId: Number(this.libraryIdToAdd),
        quantity: Number(this.addBookForm.controls.quantity.value),
      }).subscribe({
        next: () => {
          console.log("BookLibrary added successfully!");
          this.dialogRef.close();
        },
        error: () => {
          console.error("BookLibrary failed to be added!");
        }
      })
    }
  }
}
