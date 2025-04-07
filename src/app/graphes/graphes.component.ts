import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-graphes',
  standalone: true,
  imports: [],
  templateUrl: './graphes.component.html',
  styleUrl: './graphes.component.scss'
})

export class GraphesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private moviesService: MoviesService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.moviesService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.createCharts();
      },
      error: (err) => console.error('Failed to load movies', err),
    });
  }

  createCharts(): void {
    this.createRatingsChart();

    this.createReleaseYearChart();
  }

  private createRatingsChart(): void {
    const ratingsCtx = document.getElementById('rating') as HTMLCanvasElement;
    
    const ratingGroups = [0, 0, 0, 0, 0];
    const ratings = this.movies.filter(m => m.rate !== undefined).map(m => m.rate) as number[];
    ratings.forEach(movie => {
      const index = Math.floor(movie / 2);
      ratingGroups[index]++;
    });

    new Chart(ratingsCtx, {
      type: 'bar',
      data: {
        labels: ['1-2★', '3-4★', '5-6★', '7-8★', '9-10★'],
        datasets: [{
          label: 'Number of Movies',
          data: ratingGroups,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
      },
      options: { responsive: true }
    });
  }

  private createReleaseYearChart(): void {
    const yearCtx = document.getElementById('year') as HTMLCanvasElement;
    
    const years = this.movies.map(m => new Date(m.releaseDate).getFullYear());
    const uniqueYears = [...new Set(years)].sort();
    const moviesPerYear = uniqueYears.map(year => 
      years.filter(y => y === year).length
    );

    new Chart(yearCtx, {
      type: 'line',
      data: {
        labels: uniqueYears,
        datasets: [{
          label: 'Movies Released',
          data: moviesPerYear,
          borderColor: 'rgba(153, 102, 255, 1)',
          fill: false,
        }]
      }
    });
  }
}