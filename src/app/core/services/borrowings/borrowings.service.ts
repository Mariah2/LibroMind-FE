import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import AddBorrowingModel from 'src/app/shared/models/borrowings/add-borrowing.model';
import BorrowingDetailsModel from 'src/app/shared/models/borrowings/borrowing-details.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BorrowingsService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;
  private readonly headers = new HttpHeaders({
    "Content-Type": "application/json",
  })

  addBorrowing(borrowing: AddBorrowingModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/borrow`, borrowing, { headers: this.headers });
  }

  deleteBorrowing(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/borrow/${id}`, {headers: this.headers});
  }

  acceptBorrowing(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/borrow/${id}/accept`, {}, {headers: this.headers});
  }
  
  extendBorrowing(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/borrow/${id}/extend`, {}, {headers: this.headers});
  }

  returnBorrowing(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/borrow/${id}/return`, {}, {headers: this.headers});
  }

  requestExtensionForBorrowing(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/borrow/${id}/request-extension`, {}, {headers: this.headers});
  }

  getBorrowingsByLibraryId(libraryId: number): Observable<BorrowingDetailsModel[]> {
    return this.http.get<BorrowingDetailsModel[]>(`${this.apiUrl}/borrow/libraries/${libraryId}`, {headers: this.headers});
  }

  getBorrowingsByUserId(userId: number): Observable<BorrowingDetailsModel[]> {
    return this.http.get<BorrowingDetailsModel[]>(`${this.apiUrl}/borrow/users/${userId}`, {headers: this.headers});
  }
}
