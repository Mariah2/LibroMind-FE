import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { BooksToReadService } from 'src/app/core/services/books-to-read/books-to-read.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);
  private readonly booksToReadService: BooksToReadService = inject(BooksToReadService);

  hide = true;
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  onSubmit(): void {
    const values = this.loginForm.value;

    if (this.loginForm.valid) {
      this.authenticationService.login({
        email: values.email as string,
        password: values.password as string,
      }).then(() => {
        this.booksToReadService.setBooksToRead();
      });
    }
  }
}
