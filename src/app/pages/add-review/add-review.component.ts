import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsService } from 'src/app/core/services/reviews/reviews.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import BookModel from 'src/app/shared/models/books/book.model';
import UserModel from 'src/app/shared/models/users/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import AddReviewModel from 'src/app/shared/models/reviews/add-review.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BooksService } from 'src/app/core/services/books/books.service';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})

export class AddReviewComponent {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly bookService = inject(BooksService);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly reviewsService = inject(ReviewsService);
  private readonly bookSubject = new BehaviorSubject<BookModel>({} as BookModel);

  @Input() book: BookModel = {} as BookModel;
  @Input() user: UserModel = {} as UserModel;

  reviewForm: FormGroup = new FormGroup({
    rating: new FormControl(""),
    text: new FormControl(""),
  });

  ngOnInit() {
    this.bookService.getBookById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).subscribe({
      next: (value: BookModel) => {
        this.bookSubject.next(value);
      },
      error: (response) => {
        this.router.navigate(['not-found'], { replaceUrl: true });

        throw response.error.title;
      }
    })
  }

  async onSubmit(): Promise<void> {
    const {rating, text} = this.reviewForm.value;

    this.reviewsService.addReview({
      rating,
      text,
      addedDate: new Date(),
      bookId: Number(this.activatedRoute.snapshot.paramMap.get('id')),
      userId: this.authenticationService.getUserId()} as AddReviewModel)

    window.location.reload();  
  }
}
