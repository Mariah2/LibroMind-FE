import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import UserModel from 'src/app/shared/models/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getUserProfileById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/user/profile/${id}`)
  }
}
