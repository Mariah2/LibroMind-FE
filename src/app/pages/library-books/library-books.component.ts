import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { catchError, Observable } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import BookModel from 'src/app/shared/models/books/book.model';
import { LibraryBooksService } from 'src/app/core/services/library-books/library-books.service';
import { BookCardComponent } from "../../shared/components/book-card/book-card.component";

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
  private readonly libraryService = inject(LibraryBooksService);
  private readonly router = inject(Router);

  libraryBooks$?: Observable<BookModel[]>;

  ngOnInit() {
    this.libraryBooks$ = this.libraryService.getLibraryBooks(this.activatedRoute.snapshot.params['libraryId']).pipe(
      catchError((response) => {
        this.router.navigate(['not-found'], { replaceUrl: true });

        throw response.error.title;
      })
    );
  }
}
