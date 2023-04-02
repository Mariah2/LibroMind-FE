import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksToReadService } from 'src/app/core/services/books-to-read/books-to-read.service';
import { Router, RouterLink } from '@angular/router';
import BookModel from 'src/app/shared/models/books/book.model';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BookCardComponent } from 'src/app/shared/components/book-card/book-card.component';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-books-to-read',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    RouterLink,
    MatTooltipModule,
    BookCardComponent],
  templateUrl: './books-to-read.component.html',
  styleUrls: ['./books-to-read.component.scss']
})
export class BooksToReadComponent {
  userBooks$: Observable<BookModel[]> | undefined;
  userId : number | undefined;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly booksToReadService: BooksToReadService,
    private readonly router: Router) { }

  ngOnInit() {
    this.userId = this.authenticationService.getUserId();

    if (this.userId) {
      this.userBooks$ = this.booksToReadService.getBooksToRead();
    } else {
      this.router.navigate(['/dashboard']);

      console.error('Invalid UserId!');
    }
  }
}
