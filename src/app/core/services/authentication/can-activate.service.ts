import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { BooksToReadService } from "../books-to-read/books-to-read.service";

import { AuthenticationService } from "./authentication.service";

export const CanActivate: CanActivateFn = () => {
    const authenticationService = inject(AuthenticationService);
    const booksToReadService = inject(BooksToReadService);
    const router = inject(Router);

    if (authenticationService.checkIsLoggedIn()) {
        booksToReadService.setBooksToRead();
        
        return true;
    }

    booksToReadService.clearBooksToRead();

    return router.navigate(['/login']).then(() => false);
}