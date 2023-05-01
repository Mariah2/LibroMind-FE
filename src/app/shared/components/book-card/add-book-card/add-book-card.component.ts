import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import BookCardModel from 'src/app/shared/models/books/book-card.model';

@Component({
  selector: 'app-add-book-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './add-book-card.component.html',
  styleUrls: ['./add-book-card.component.scss']
})
export class AddBookCardComponent {
  @Input() book: BookCardModel = {} as BookCardModel;
}
