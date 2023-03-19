import { Route } from "@angular/router";

export const routes: Route[] = [
  {
    path: "not-found",
    loadComponent: () =>
      import("../../../pages/not-found/not-found.component").then((m) => m.NotFoundComponent)
  },
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
    path: "dashboard",
    loadComponent: () => import("../../../pages/dashboard/dashboard.component")
      .then((m) => m.DashboardComponent),
  },
  {
    path: "about",
    loadComponent: () => import("../../../pages/about/about.component")
      .then((m) => m.AboutComponent)
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
