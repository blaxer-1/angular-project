import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly url = "http://localhost:8080/movies"
  private readonly httpClient = inject(HttpClient)

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url);
  }

  getMovie(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.url}/${id}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    if (movie.id)
      return this.httpClient.put<Movie>(`${this.url}/${movie.id}`, movie);
    return this.httpClient.post<Movie>(this.url, movie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
