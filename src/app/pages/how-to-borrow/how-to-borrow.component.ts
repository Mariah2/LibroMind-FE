import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs'

@Component({
  selector: 'app-how-to-borrow',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTabsModule],
  templateUrl: './how-to-borrow.component.html',
  styleUrls: ['./how-to-borrow.component.scss']
})
export class HowToBorrowComponent {

}
