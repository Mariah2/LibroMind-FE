import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import BookModel from 'src/app/shared/models/books/book.model';
import AddBookLibraryModel from 'src/app/shared/models/library-books/add-book-library.model';

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
    return this.http.post(`${this.apiUrl}/booklibrary`, bookLibrary, {headers: this.headers});
  }

  getLibraryBooks(libraryId: number): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(`${this.apiUrl}/library/${libraryId}/books`, {headers: this.headers});
  }
}
