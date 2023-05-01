import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import AddUserBookModel from 'src/app/shared/models/books-to-read/add-book-to-read.model';
import BookCardModel from 'src/app/shared/models/books/book-card.model';

@Injectable({
  providedIn: 'root'
})
export class BooksToReadService implements OnInit {
  private apiUrl = environment.apiUrl;
  private booksToRead = new BehaviorSubject<BookCardModel[]>([]);
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

  getBooksToRead(): Observable<BookCardModel[]> {
    return this.booksToRead.asObservable();
  }

  setBooksToRead(): void {
    const userId = this.authenticationService.getUserInfoData().id;

    if (userId) {
      this.getBookCards(userId).subscribe({
        next: (value: BookCardModel[]) => {
          this.booksToRead.next(value);
        }
      });
    }
  }

  clearBooksToRead(): void {
    this.booksToRead.next([]);
  }

  getBookCards(userId: number): Observable<BookCardModel[]> {
    return this.http.get<BookCardModel[]>(`${this.apiUrl}/book/user/${userId}`);
  }
  
  addUserBook(request: AddUserBookModel): void {
    if (request.userId === undefined) {
      this.router.navigate(['/login']);

      console.error("You need to be logged in to mark books as 'To read'!")

      return;
    }

    this.http.post(`${this.apiUrl}/bookuser`, request, this.httpOptions).subscribe({
      next: () => {
        this.getBookCards(request.userId).subscribe({
          next: (value: BookCardModel[]) => {
            this.booksToRead.next(value);
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
    this.http.delete(`${this.apiUrl}/bookuser/${bookId}`)
  }
}
