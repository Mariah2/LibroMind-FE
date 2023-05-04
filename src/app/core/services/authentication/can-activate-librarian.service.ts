import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AuthenticationService } from "./authentication.service";

export const CanActivateLibrarian: CanActivateFn = () => {
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);

    const userInfo = authenticationService.getUserInfoData();

    if (userInfo && userInfo.role === "librarian") {
        return true;
    }

    return router.navigate(['/login']).then(() => false);
}
