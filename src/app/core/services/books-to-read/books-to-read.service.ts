import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import AddUserBookModel from 'src/app/shared/models/books-to-read/add-book-to-read.model';
import BookModel from 'src/app/shared/models/books/book.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BooksToReadService implements OnInit {
  private apiUrl = environment.apiUrl;
  private booksToRead = new BehaviorSubject<BookModel[]>([]);
  private readonly httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly http: HttpClient,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.setBooksToRead();
  }

  getBooksToRead(): Observable<BookModel[]> {
    return this.booksToRead.asObservable();
  }

  setBooksToRead(): void {
    const userId = this.authenticationService.getUserId();

    if (userId) {
      this.getUserBooks(userId).subscribe({
        next: (value: BookModel[]) => {
          this.booksToRead.next(value);
        }
      });
    }
  }

  clearBooksToRead(): void {
    this.booksToRead.next([]);
  }

  getUserBooks(userId: number): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(`${this.apiUrl}/user/${userId}/books`);
  }

  getUserBookById(bookId: number): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(`${this.apiUrl}/bookuser/${bookId}`);
  }
  
  addUserBook(request: AddUserBookModel): void {
    if (request.userId === undefined) {
      this.router.navigate(['/login']);

      console.error("You need to be logged in to mark books as 'To read'!")

      return;
    }

    this.http.post(`${this.apiUrl}/bookuser`, request, this.httpOptions).subscribe({
      next: () => {
        console.log("Success");
      },
      error: (response: HttpErrorResponse) => {
        console.error(response.status);
      }
    });
  }
}
