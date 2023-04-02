import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import BookModel from 'src/app/shared/models/books/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(`${this.apiUrl}/book/details`);
  }

  getBookById(id:number): Observable<BookModel> {
    return this.http.get<BookModel>(`${this.apiUrl}/book/details/${id}`);
  }
}
