import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AccountComponent } from './user/account/account.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddReviewComponent } from './reviews/add-review/add-review.component';
import { GraphesComponent } from './graphes/graphes.component';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'add-movie', component: AddMovieComponent },
    { path: 'add-movie/:id', component: AddMovieComponent },
    { path: "register", component: RegisterComponent },
    { path: 'register/:id', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'account/:id', component: AccountComponent},
    { path: 'reviews/:id', component: ReviewsComponent },
    { path: 'add-review/:id', component: AddReviewComponent },
    { path: "graphes", component: GraphesComponent},
    { path: "map", component: MapComponent}
];

