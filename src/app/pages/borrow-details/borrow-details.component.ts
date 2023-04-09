import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';

import BookModel from 'src/app/shared/models/books/book.model';
import { BooksService } from 'src/app/core/services/books/books.service';

@Component({
  selector: 'app-borrow-details',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './borrow-details.component.html',
  styleUrls: ['./borrow-details.component.scss']
})
export class BorrowDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly bookService = inject(BooksService);
  private readonly router = inject(Router);

  private readonly bookSubject = new BehaviorSubject<BookModel>({} as BookModel);
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
  }
}
