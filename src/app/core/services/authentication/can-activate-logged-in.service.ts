import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AuthenticationService } from "./authentication.service";

export const CanActivateLoggedInService: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  const userInfo = authenticationService.getUserInfoData();

  if (userInfo && (userInfo.role === 'user' || userInfo.role === 'librarian')) {
    return true;
  }

  return router.navigate(['/login']).then(() => false);
}
