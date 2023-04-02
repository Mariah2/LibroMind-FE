import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpErrorResponse,
  HttpHandlerFn
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { AuthenticationService } from '../../services/authentication/authentication.service';

export const AuthorizationInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  const authToken = authenticationService.getToken();

  request = request.clone({
    headers: request.headers.set("Authorization", `Bearer ${authToken}`),
  });

  return next(request).pipe(
    catchError((response: HttpErrorResponse) => {
      if (response.status === 401) {
        router.navigate(['/dashboard']);

        console.error("Unauthorized");
      }

      return throwError(() => response);
    })
  );
}
