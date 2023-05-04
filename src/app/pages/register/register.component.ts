import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthenticationService } from "../../core/services/authentication/authentication.service";
import { BooksToReadService } from "../../core/services/books-to-read/books-to-read.service";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private readonly authenticationService: AuthenticationService = inject(AuthenticationService);
  private readonly booksToReadService: BooksToReadService = inject(BooksToReadService);

  hide = true;
  hideConfirm = true;
  registerForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[\\d\\W]).{8,}$')]),
    passwordConfirmation: new FormControl("", [Validators.required, this.passwordMatchValidator()]),
    phone: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')]),
    birthDate: new FormControl<Date | null>(null, [Validators.required, this.dateValidator()]),
  });

  async onSubmit(): Promise<void> {
    const values = this.registerForm.value;

    if (this.registerForm.valid) {
      let dob = new Date();
      dob.setFullYear(Number(values.birthDate?.getUTCFullYear()));
      dob.setMonth(Number(values.birthDate?.getUTCMonth()));
      dob.setDate(Number(values.birthDate?.getUTCDate()) + 1);

      await this.authenticationService.register({
        firstName: values.firstName as string,
        lastName: values.lastName as string,
        email: values.email as string,
        password: values.password as string,
        phone: values.phone as string,
        birthDate: dob,
      }).then(() => {
        this.booksToReadService.setBooksToRead();
      });
    } else {
      console.error("Not all fields have valid inputs!");
    }
  }

  private dateValidator() {
    return () => {
      const date = this.registerForm?.controls.birthDate.value;

      if (date) {
        let timeDiff = Math.abs(Date.now() - date.getTime());
        let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);

        if (age < 8) {
          return {invalidAge: 'You are not old enough!'};
        }
      }

      return null;
    }
  }

  private passwordMatchValidator() {
    return () => {
      if (this.registerForm?.controls.password.value !== this.registerForm?.controls.passwordConfirmation.value) {
        return {passwordMismatch: 'Passwords do not match'};
      }

      return null;
    }
  }
}
