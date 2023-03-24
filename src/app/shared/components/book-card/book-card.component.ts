import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import BookModel from '../../models/books/book.model';

import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterLink, MatTooltipModule],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent { 
  @Input() book: BookModel = {} as BookModel;
}
