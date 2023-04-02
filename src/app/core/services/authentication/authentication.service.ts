import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { LoginRequestModel } from 'src/app/shared/models/authentication/login-request.model';
import { LoginResponseModel } from 'src/app/shared/models/authentication/login-response.model';
import { RegisterRequestModel } from 'src/app/shared/models/authentication/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly authApi = `${environment.apiUrl}/authentication`;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  private readonly tokenKey = "LibroMindToken";
  private isLoggedIn = new BehaviorSubject(this.checkIsLoggedIn());

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

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

  register(request: RegisterRequestModel): void {
    this.http.post(`${this.authApi}/register`, request, this.httpOptions).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (response: HttpErrorResponse) => {

      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  saveToken(token: string): void {
    localStorage.clear();
    localStorage.setItem(this.tokenKey, token);

    this.isLoggedIn.next(true);
  }

  getUserId(): number | undefined {
    const token = this.getToken();

    if (token) {
      return Number(this.decodeUserId(token));
    }

    return undefined;
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

    this.router.navigate(['/dashboard']);
  }

  private decodeUserId(token: string): number {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');

    return (JSON.parse(decodeURIComponent(window.atob(base64)))).sub;
  }
}
