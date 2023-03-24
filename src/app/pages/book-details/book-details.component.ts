import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import BookModel from 'src/app/shared/models/books/book.model';
import { BooksService } from 'src/app/core/services/books/books.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly bookService = inject(BooksService);
  private readonly router = inject(Router);

  book$?: Observable<BookModel>;

  ngOnInit() {
    this.book$ = this.bookService.getBookById(this.activatedRoute.snapshot.params['id']).pipe(
      catchError((response) => {
        this.router.navigate(['not-found'], { replaceUrl: true });

        throw response.error.title;
      })
    );
  }
}
