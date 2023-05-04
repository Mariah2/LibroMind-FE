import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import UserModel from 'src/app/shared/models/users/user.model';
import UserUpdateModel from 'src/app/shared/models/users/userUpdate.model';

@Component({
  selector: 'app-profile',
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
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);

  private originalUser: UserModel | undefined;

  user$: Observable<UserModel> | undefined;
  updateProfileForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", Validators.required),
    phone: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    birthDate: new FormControl(new Date(), [Validators.required, this.dateValidator()]),
  });

  ngOnInit(): void {
    this.updateProfileForm.disable();
    const id = this.authenticationService.getUserInfoData().id;

    if (id) {
      this.user$ = this.usersService.getUserProfileById(id).pipe(
        tap(user => {
          this.originalUser = user;

          this.updateProfileForm.controls.firstName.setValue(user.firstName);
          this.updateProfileForm.controls.lastName.setValue(user.lastName);
          this.updateProfileForm.controls.birthDate.setValue(new Date(user.birthDate));
          this.updateProfileForm.controls.phone.setValue(user.phone);
        })
      );
    } else {
      this.router.navigate(['/dashboard']);

      console.error('Invalid UserId!');
    }
  }

  edit() {
    if (this.updateProfileForm.disabled) {
      this.updateProfileForm.enable();

      return;
    }

    this.updateProfileForm.disable();

    if (this.originalUser) {
      this.updateProfileForm.controls.firstName.setValue(this.originalUser.firstName);
      this.updateProfileForm.controls.lastName.setValue(this.originalUser.lastName);
      this.updateProfileForm.controls.birthDate.setValue(new Date(this.originalUser.birthDate));
      this.updateProfileForm.controls.phone.setValue(this.originalUser.phone);
    }
  }

  updateUser() {
    const id = this.authenticationService.getUserInfoData().id;

    if (this.updateProfileForm.valid) {
      this.usersService.updateUser(id, {
        firstName: this.updateProfileForm.controls.firstName.value,
        lastName: this.updateProfileForm.controls.lastName.value,
        phone: this.updateProfileForm.controls.phone.value,
        birthDate: this.updateProfileForm.controls.birthDate.value,
      } as UserUpdateModel).subscribe({
        next: () => {
          console.log("User updated successfully!");
          this.edit();
        },
        error: () => {
          console.error("An error occurred while trying to update your profile!");
        }
      });
    } else {
      console.error("Not all fields have valid inputs!");
    }
  }

  private dateValidator() {
    return () => {
      const date = this.updateProfileForm?.controls.birthDate.value;

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
}
