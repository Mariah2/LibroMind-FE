import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { LoginRequestModel } from 'src/app/shared/models/authentication/login-request.model';
import { LoginResponseModel } from 'src/app/shared/models/authentication/login-response.model';
import { RegisterRequestModel } from 'src/app/shared/models/authentication/register-request.model';
import UserInfoModel from 'src/app/shared/models/users/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly authApi = `${environment.apiUrl}/authentication`;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  private readonly tokenKey = "LibroMindToken";
  private readonly isLoggedIn = new BehaviorSubject(this.checkIsLoggedIn());
  private readonly userInfoSubject = new BehaviorSubject<UserInfoModel>(this.getLoggedInUser());

  async login(request: LoginRequestModel): Promise<void> {
    this.http.post<LoginResponseModel>(`${this.authApi}/login`, request, this.httpOptions).subscribe({
      next: (response: LoginResponseModel) => {
        this.saveToken(response.token);

        this.router.navigate(['/dashboard']);
      },
      error: (response: HttpErrorResponse) => {
        console.error(response.status);
      }
    });
  }

  async register(request: RegisterRequestModel): Promise<void> {
    this.http.post(`${this.authApi}/register`, request, this.httpOptions).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (response: HttpErrorResponse) => {
        console.error(response.status);
      }
    });
  }

  getLoggedInUser(): UserInfoModel {
    const token = this.getToken();

    if (token && token.length > 0) {
      const decodedToken = this.decodeToken(token);

      return {
        id: Number(decodedToken.sub),
        exp: Number(decodedToken.exp),
        role: decodedToken.role
      }
    }

    return {} as UserInfoModel;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserInfo(): Observable<UserInfoModel> {
    return this.userInfoSubject.asObservable();
  }

  getUserInfoData(): UserInfoModel {
    const token = this.getToken();

    if (token && token.length > 0) {
      const decodedToken = this.decodeToken(token);

      return {
        id: Number(decodedToken.sub),
        exp: Number(decodedToken.exp),
        role: decodedToken.role
      }
    }

    return {} as UserInfoModel;
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  checkIsLoggedIn(): boolean {
    const token = this.getToken();

    if (token && token.length > 0) {
      return true;
    }

    this.isLoggedIn?.next(false);

    return false;
  }

  logout(): void {
    localStorage.clear();

    this.isLoggedIn.next(false);
    this.userInfoSubject.next({} as UserInfoModel);

    this.router.navigate(['/dashboard']);
  }

  private decodeToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');

    return (JSON.parse(decodeURIComponent(window.atob(base64))));
  }

  private saveToken(token: string): void {
    const decodedToken = this.decodeToken(token);

    localStorage.clear();
    localStorage.setItem(this.tokenKey, token);

    this.isLoggedIn.next(true);
    this.userInfoSubject.next({
      id: Number(decodedToken.sub),
      exp: Number(decodedToken.exp),
      role: decodedToken.role
    })
  }
}
