import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import BookModel from 'src/app/shared/models/books/book.model';
import BookCardModel from 'src/app/shared/models/books/book-card.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;
  private readonly headers = new HttpHeaders({
    "Content-Type": "application/json",
  })

  getBookCards(): Observable<BookCardModel[]> {
    return this.http.get<BookCardModel[]>(`${this.apiUrl}/book/cards`, { headers: this.headers });
  }

  getBookCardsForLibraryIdByParam(libraryId: number | null, searchParam: string | null): Observable<BookCardModel[]> {
    const params = new HttpParams().set("searchParam", searchParam ?? "");

    return this.http.get<BookCardModel[]>(`${this.apiUrl}/book/cards/library/${libraryId}/filter-by`, { headers: this.headers, params: params });
  }

  getBookById(id: number): Observable<BookModel> {
    return this.http.get<BookModel>(`${this.apiUrl}/book/details/${id}`, { headers: this.headers });
  }
}
