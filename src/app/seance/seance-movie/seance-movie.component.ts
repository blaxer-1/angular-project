import { Component, Input } from '@angular/core';
import { Movie, Seance } from '../../models/movie';

@Component({
  selector: 'app-seance-movie',
  standalone: true,
  imports: [],
  templateUrl: './seance-movie.component.html',
  styleUrl: './seance-movie.component.scss'
})
export class SeanceMovieComponent {
  @Input({required: true}) movie!: Movie
}
