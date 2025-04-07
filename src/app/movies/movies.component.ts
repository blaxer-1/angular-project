import { Component, DestroyRef, inject } from '@angular/core';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  title = 'Les films';

  private readonly moviesService = inject(MoviesService)
  private destroyRef = inject(DestroyRef)
  private toaster = inject(ToastrService)

  movies: Movie[] = [];
  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(movies => this.movies = movies);
  }

  deleteMovie(id: number): void {
    this.moviesService.deleteMovie(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.movies = this.movies.filter(film => film.id !== id)
      this.toaster.success('Le film a été supprimé avec succès', 'Succès', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing'
      });
    });
  }
}
