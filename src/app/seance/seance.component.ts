import { Component, inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { AsyncPipe } from '@angular/common';
import { SeanceMovieComponent } from './seance-movie/seance-movie.component';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seance',
  standalone: true,
  imports: [AsyncPipe, SeanceMovieComponent, CommonModule],
  templateUrl: './seance.component.html',
  styleUrl: './seance.component.scss'
})
export class SeanceComponent 
{
    private readonly moviesService = inject(MoviesService)
  
    movies$: Observable<Movie[]> = this.moviesService.getMovies()

    cinemas = [
      'UGC Ciné Cité Les Halles',
      'Cinéma Le Grand Rex',
      'Cinépolis',
      'Pathé Gaumont Opéra',
      'MK2 Bibliothèque',
      'CGR Bordeaux',
      'Le Champo',
      'La Cinémathèque Française',
      'Cinéma d\'art et d\'essai Le Balzac',
      'Gaumont Parnasse',
      'Ciné 104',
      'Le Studio des Ursulines'
    ];

    selectedCinema: string = 'UGC Ciné Cité Les Halles';

    onCinemaChange(event: any) {
      this.selectedCinema = event.target.value;
    }

    seances = [
      {
        title: 'Titanic',
        timesVF: ['19:15', '21:30'],
        timesV0: ['13:15', '23:30']
      },
      {
        title: 'Avatar',
        timesVF: ['12:15', '22:30'],
        timesV0: ['13:15', '23:30']
      },
      {
        title: 'DirtyDancing',
        timesVF: ['18:00', '20:30'],
        timesV0: ['12:15', '22:30']
      },
      {
        title: 'Eiffel',
        timesVF: ['19:15', '21:30'],
        timesV0: ['13:15', '23:30']
      },
      {
        title: 'Les Blues Brothers',
        timesVF: ['19:15', '21:30'],
        timesV0: ['13:15', '23:30']
      },
      {
        title: 'Raiponce',
        timesVF: ['14:00', '23:00'],
        timesV0: ['18:00', '20:30']
      }
    ];
}
