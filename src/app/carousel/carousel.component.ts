import {Component, Input, inject} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {MoviesService} from "../services/movies.service";
import {Observable} from "rxjs";
import {Movie} from "../models/movie";

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

  @Input({ required: true }) title! : string

  private readonly moviesService = inject(MoviesService)

  movies$: Observable<Movie[]> = this.moviesService.getMovies()


  ngOnInit(): void {
    this.movies$.subscribe(movies => {
      console.log('Films récupérés : ', movies);
    });
  }

  slideConfig =
    {
      slidesToShow: 5,
      slidesToScroll: 1,
      infinite: true,
      dots: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
          infinite: true
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          },
          infinite: true
        }
      ]
    };
}
