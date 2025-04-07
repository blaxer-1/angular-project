import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { User } from '../../models/user';
import { ReviewsService } from '../../services/reviews.service';
import { Review } from '../../models/review';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.scss'
})
export class AddReviewComponent {
  private readonly usersServices = inject(UsersService);
  private readonly toastService = inject(ToastrService);
  private readonly moviesServices = inject(MoviesService);
  private readonly reviewsServices = inject(ReviewsService);
  private readonly router = inject(Router);

  private userId: string | null | undefined = undefined;

  public movies: Movie[] = [];
  public user: User | null = null;

  constructor(private route: ActivatedRoute) {
  }

  reviewForm = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required, Validators.minLength(10)]),
    movieId: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      this.usersServices.getUserById(Number(this.userId)).subscribe((user) => {
        this.user = user;
      });
    }

    this.moviesServices.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

  onSubmit() {
    const formData = this.reviewForm.value;

    // Get movie
    const movieId = this.reviewForm.get('movieId')?.value;
    const movie = this.movies.find((movie) => movie.id == movieId);
    if (!movie) {
      this.toastService.error('Erreur lors de la récupération du film', 'Error');
      return;
    }

    const ratingData: Review = {
      rate: Number(formData.rating),
      text: formData.text ?? 'No text provided',
      reviewDate: new Date().toISOString(),
      user: this.user as User,
      movie: movie
    }

    this.reviewsServices.addReview(ratingData).subscribe({
      next: (response) => {
        this.toastService.success('Votre avis a bien été ajouté !', 'Success');
        this.router.navigate(['/reviews', this.userId]);
      },
      error: (error) => {
        console.error('Error adding review:', error);
        this.toastService.error("Erreur lors de l'ajout de votre avis: Http (" + error.status + ")", 'Error');
      }
    });
  }

  myReviews() {
    this.router.navigate(['/reviews', this.userId]);
  }
}
