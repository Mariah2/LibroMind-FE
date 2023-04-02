import { Route } from "@angular/router";
import { CanActivate } from "../../services/authentication/can-activate.service";

export const routes: Route[] = [
  {
    path: "login",
    loadComponent: () => import("../../../pages/login/login.component")
      .then((m) => m.LoginComponent)
  },
  {
    path: "register",
    loadComponent: () => import("../../../pages/register/register.component")
      .then((m) => m.RegisterComponent)
  },
  {
    path: "books",
    loadComponent: () => import("../../../pages/books/books.component")
      .then((m) => m.BooksComponent)
  },
  {
    path: "books/:id",
    loadComponent: () => import("../../../pages/book-details/book-details.component")
      .then((m) => m.BookDetailsComponent)
  },
  {
    path: "libraries",
    loadComponent: () => import("../../../pages/libraries/libraries.component")
      .then((m) => m.LibrariesComponent)
  },
  {
    path: "library/:libraryId/books",
    loadComponent: () => import("../../../pages/library-books/library-books.component")
      .then((m) => m.LibraryBooksComponent)
  },
  {
    path: "dashboard",
    loadComponent: () => import("../../../pages/dashboard/dashboard.component")
      .then((m) => m.DashboardComponent),
  },
  {
    path: "profile",
    loadComponent: () => import("../../../pages/profile/profile.component")
      .then((m) => m.ProfileComponent),
    canActivate: [CanActivate]
  },
  {
    path: "user/books",
    loadComponent: () => import("../../../pages/books-to-read/books-to-read.component")
      .then((m) => m.BooksToReadComponent),
    canActivate: [CanActivate]
  },
  {
    path: "about",
    loadComponent: () => import("../../../pages/about/about.component")
      .then((m) => m.AboutComponent),
  },
  {
    path: "contact",
    loadComponent: () => import("../../../pages/contact/contact.component")
      .then((m) => m.ContactComponent)
  },
  {
    path: "how-to-borrow",
    loadComponent: () => import("../../../pages/how-to-borrow/how-to-borrow.component")
      .then((m) => m.HowToBorrowComponent)
  },
  {
    path: "terms-and-conditions",
    loadComponent: () => import("../../../pages/terms-and-conditions/terms-and-conditions.component")
      .then((m) => m.TermsAndConditionsComponent)
  },
  {
    path: "not-found",
    loadComponent: () =>
      import("../../../pages/not-found/not-found.component").then((m) => m.NotFoundComponent)
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/dashboard"
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "/not-found"
  },
];
