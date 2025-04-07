import { Component, inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { AsyncPipe } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    CarouselComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly moviesService = inject(MoviesService)

  movies$: Observable<Movie[]> = this.moviesService.getMovies()
  title = "À l'affiche"
  title1 = "Les plus trendy"
}
