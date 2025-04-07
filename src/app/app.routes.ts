import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { UpdateMovieComponent } from './movies/update-movie/update-movie.component';
import { GraphesComponent } from './graphes/graphes.component';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'movies', component: MoviesComponent},
    { path: 'add-movie', component: AddMovieComponent},
    { path: 'add-movie/:id', component: UpdateMovieComponent},
    { path: "graphes", component: GraphesComponent},
    { path: "map", component: MapComponent}
];

