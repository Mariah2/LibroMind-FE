import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import UserModel from 'src/app/shared/models/users/user.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  user$: Observable<UserModel> | undefined;
  updateProfileForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", Validators.required),
    birthDate: new FormControl(new Date(), Validators.required),
    phone: new FormControl("", Validators.required)
  });

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.updateProfileForm.disable();
    const id = this.authenticationService.getUserInfoData().id;

    if (id) {
      this.user$ = this.usersService.getUserProfileById(id).pipe(
        tap(user => {
          this.updateProfileForm.controls.firstName.setValue(user.firstName);
          this.updateProfileForm.controls.lastName.setValue(user.lastName);
          this.updateProfileForm.controls.birthDate.setValue(user.birthDate);
          this.updateProfileForm.controls.phone.setValue(user.phone);
        })
      );
    } else {
      this.router.navigate(['/dashboard']);

      console.error('Invalid UserId!');
    }
  }

  edit() {
    this.updateProfileForm.disabled ? this.updateProfileForm.enable() : this.updateProfileForm.disable(); 
  }

  updateUser() {
    const id = this.authenticationService.getUserInfoData().id;
    
    this.usersService.updateUser(id, {
      firstName: this.updateProfileForm.controls.firstName.value,
      lastName: this.updateProfileForm.controls.lastName.value,
      birthDate: this.updateProfileForm.controls.birthDate.value,
      phone: this.updateProfileForm.controls.phone.value} as UserUpdateModel).subscribe({
        next: () => {
          console.log("User updated successfully!");
          this.edit();
        },
        error: () => {
          console.error("An error occurred while trying to update your profile!");
        }
      });
  }

}
