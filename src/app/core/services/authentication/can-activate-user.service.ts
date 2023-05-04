import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { BooksToReadService } from "../books-to-read/books-to-read.service";
import { AuthenticationService } from "./authentication.service";

export const CanActivateUser: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);
  const booksToReadService = inject(BooksToReadService);
  const router = inject(Router);

  const userInfo = authenticationService.getUserInfoData();

  if (userInfo && userInfo.role === "user") {
    booksToReadService.setBooksToRead();

    return true;
  }

  booksToReadService.clearBooksToRead();

  return router.navigate(['/login']).then(() => false);
}
