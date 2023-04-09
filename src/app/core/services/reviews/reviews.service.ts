import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import AddReviewModel from 'src/app/shared/models/reviews/add-review.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import ReviewModel from 'src/app/shared/models/reviews/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = environment.apiUrl;
  private reviews = new BehaviorSubject<AddReviewModel[]>([]);
  private readonly httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly http: HttpClient,
    private readonly router: Router) { }

    getReviews(): Observable<ReviewModel[]> {
      return this.http.get<ReviewModel[]>(`${this.apiUrl}/review`);
    }

    addReview(request: AddReviewModel) :void {
      if (request.userId === undefined) {
        this.router.navigate(['/login']);
  
        console.error("You need to be logged in to mark books as 'To read'!")
  
        return;
      }

      this.http.post(`${this.apiUrl}/review`, request, this.httpOptions).subscribe({
        next: () => {
          this.getReviews().subscribe({
            next: (value: ReviewModel[]) => {
              this.reviews.next(value);
            }
          })
          console.log("Succes");
        },
        error: (response: HttpErrorResponse) => {
          console.error(response.status);
        }
      });
    }
}
