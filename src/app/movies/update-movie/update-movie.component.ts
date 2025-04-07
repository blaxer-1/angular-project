import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-movie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-movie.component.html',
  styleUrl: './update-movie.component.scss'
})
export class UpdateMovieComponent {
  private readonly moviesService = inject(MoviesService)
  private readonly router = inject(Router)
  private readonly toaster = inject(ToastrService)

  constructor(private route: ActivatedRoute) { }

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  }

  ngOnInit(): void {
    this.moviesService.getMovie(this.route.snapshot.params['id']).subscribe(movie => {
      this.movie = { ...movie, releaseDate: new Date(movie.releaseDate) };
    });
  }

  updateMovie(): void {
    this.moviesService.updateMovie(this.movie).subscribe(
      () => {
        this.router.navigate(['/movies'])
        this.toaster.success('Le film a été mis à jour avec succès', 'Succès', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    );
  }
}
