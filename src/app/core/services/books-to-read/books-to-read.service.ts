import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { AuthenticationService } from '../authentication/authentication.service';

import AddUserBookModel from 'src/app/shared/models/books-to-read/add-book-to-read.model';
import BookUserCardModel from "../../../shared/models/book-users/book-user-card.model";

@Injectable({
  providedIn: 'root'
})
export class BooksToReadService implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private apiUrl = environment.apiUrl;
  private booksToReadSubject = new BehaviorSubject<BookUserCardModel[]>([]);
  private readonly httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  ngOnInit(): void {
    this.setBooksToRead();
  }

  getBooksToRead(): Observable<BookUserCardModel[]> {
    if (this.booksToReadSubject.getValue().length < 1) {
      this.setBooksToRead();
    }

    return this.booksToReadSubject.asObservable();
  }

  setBooksToRead(): void {
    const userId = this.authenticationService.getUserInfoData().id;

    if (userId) {
      this.getBookCards(userId).subscribe({
        next: (value: BookUserCardModel[]) => {
          this.booksToReadSubject.next(value);
        }
      });
    }
  }

  clearBooksToRead(): void {
    this.booksToReadSubject.next([]);
  }

  getBookCards(userId: number): Observable<BookUserCardModel[]> {
    return this.http.get<BookUserCardModel[]>(`${this.apiUrl}/bookuser/users/${userId}`);
  }

  addUserBook(request: AddUserBookModel): void {
    if (request.userId === undefined) {
      this.router.navigate(['/login']);

      console.error("You need to be logged in order to mark books as 'To read'!")

      return;
    }

    this.http.post(`${this.apiUrl}/bookuser`, request, this.httpOptions).subscribe({
      next: () => {
        this.getBookCards(request.userId).subscribe({
          next: (value: BookUserCardModel[]) => {
            this.booksToReadSubject.next(value);
          }
        })
        console.log("Success");
      },
      error: (response: HttpErrorResponse) => {
        console.error(response.status);
      }
    });
  }

  removeUserBook(bookId: number) {
    const userId = this.authenticationService.getUserInfoData().id;

    if (!userId) {
      this.router.navigate(['/login']);

      console.error("You need to be logged in order to remove books from 'To read'!")

      return;
    }

    const bookUserId = this.booksToReadSubject.getValue().find(btr => btr.bookId === bookId)?.id;

    if (!bookUserId) {
      console.error("Book cannot be found in 'To read' list!")

      return;
    }

    this.http.delete(`${this.apiUrl}/bookuser/${bookUserId}`, this.httpOptions).subscribe({
      next: () => {
        this.getBookCards(userId).subscribe({
          next: (value: BookUserCardModel[]) => {
            this.booksToReadSubject.next(value);
          }
        })
        console.log("Success");
      },
      error: (response: HttpErrorResponse) => {
        console.error(response.status);
      }
    })
  }
}
