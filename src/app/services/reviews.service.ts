import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Review } from '../models/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private readonly url = "http://localhost:8080/reviews"
  private readonly httpClient = inject(HttpClient)

  getReviews(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(this.url)
  }

  getReviewById(id: string): Observable<Review> {
    return this.httpClient.get<Review>(`${this.url}/${id}`)
  }

  addReview(review: Review) {
    return this.httpClient.post(this.url, review)
  }

  deleteReview(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`)
  }

  updateReview(review: Review) {
    return this.httpClient.put(`${this.url}/${review.id}`, review)
  }
}
