import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent {

}
