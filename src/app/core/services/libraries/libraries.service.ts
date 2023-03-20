import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import LibraryModel from 'src/app/shared/models/libraries/library.model';

@Injectable({
  providedIn: 'root'
})
export class LibrariesService {
  apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getLibraries(): Observable<LibraryModel[]> {
    return this.http.get<LibraryModel[]>(`${this.apiUrl}/library`);
  }
}
