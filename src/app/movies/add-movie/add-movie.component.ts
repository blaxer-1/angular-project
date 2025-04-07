import { Component, inject } from '@angular/core';
import { Movie } from '../../models/movie';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss'
})
export class AddMovieComponent {
  private readonly moviesService = inject(MoviesService)
  private readonly router = inject(Router)

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined, 
    image: undefined
  }

  addMovie(): void {
    this.moviesService.addMovie(this.movie).subscribe(
        () => this.router.navigate(['/movies'])
    );
 }
}
