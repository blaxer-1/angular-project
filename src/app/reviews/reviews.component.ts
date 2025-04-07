import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Review } from '../models/review';
import { ReviewsService } from '../services/reviews.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  private readonly reviewsService = inject(ReviewsService);
  private readonly toastService = inject(ToastrService);
  private readonly router = inject(Router);
  public reviews: Review[] = [];

  ngOnInit() {
    this.reviewsService.getReviews().subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  deleteReview(reviewId: number | undefined) {
    if (!reviewId) return;

    this.reviewsService.deleteReview(reviewId).subscribe(() => {
      this.reviews = this.reviews.filter((review) => review.id !== reviewId);
      this.toastService.success("L'avis a bien été supprimé !", 'Success', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
      });
    });
  }

  editReview(reviewId: number | undefined) {
    this.router.navigate(['edit-review', reviewId]);
  }
}
