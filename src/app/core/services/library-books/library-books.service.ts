import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import AddBookLibraryModel from 'src/app/shared/models/library-books/add-book-library.model';
import BookLibraryCardModel from "../../../shared/models/book-library/book-library-card.model";
import BookLibraryModel from 'src/app/shared/models/book-library/book-library.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryBooksService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;
  private readonly headers = new HttpHeaders({
    "Content-Type": "application/json",
  })

  addBookLibrary(bookLibrary: AddBookLibraryModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/booklibrary`, bookLibrary, { headers: this.headers });
  }

  getBookLibraryCards(libraryId: number): Observable<BookLibraryCardModel[]> {
    return this.http.get<BookLibraryCardModel[]>(`${this.apiUrl}/booklibrary/libraries/${libraryId}/books`, { headers: this.headers });
  }

  getBookLibrary(bookId: number, libraryId: number): Observable<BookLibraryModel> {
    return this.http.get<BookLibraryModel>(`${this.apiUrl}/booklibrary/book/${bookId}/library/${libraryId}`, { headers: this.headers });
  }
}
