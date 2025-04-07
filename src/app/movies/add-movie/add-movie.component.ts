import {Component, inject} from '@angular/core';
import {Movie} from '../../models/movie';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MoviesService} from '../../services/movies.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {directorValidator, releaseDateValidator, titleValidator} from "../movie-validators";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss'
})
export class AddMovieComponent {
  private readonly moviesService = inject(MoviesService)
  private readonly router = inject(Router)
  private readonly toaster = inject(ToastrService)

  id: number | undefined = undefined;
  rate: number | undefined = undefined;
  image: string | undefined = undefined;

  movieForm = new FormGroup({
      title: new FormControl('', [Validators.required, titleValidator()]),
      director: new FormControl('', [Validators.required, directorValidator()]),
      releaseDate: new FormControl(new Date(), [Validators.required, releaseDateValidator()]),
      synopsis: new FormControl('', [Validators.minLength(30)]),
    }
  );

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.moviesService.getMovie(this.route.snapshot.params['id']).subscribe(movie => {
        this.id = movie.id;
        this.rate = movie.rate;
        this.image = movie.image;

        this.movieForm.patchValue({
          title: movie.title,
          director: movie.director,
          releaseDate: movie.releaseDate,
          synopsis: movie.synopsis,
        });
      });
    }
  }

  addMovie(): void {
    if (this.movieForm.invalid) return;

    const movie: Movie = {
      title: this.movieForm.controls["title"].value!,
      director: this.movieForm.controls["director"].value!,
      releaseDate: this.movieForm.controls["releaseDate"].value!,
      synopsis: this.movieForm.controls["synopsis"].value!,
      id: this.id,
      rate: this.rate,
      image: this.image,
    };

    let message = 'Le film a été ajouté avec succès';
    if (this.id)
      message = 'Le film a été mis à jour avec succès';

    this.moviesService.addMovie(movie).subscribe(
      () => {
        this.router.navigate(['/movies']);
        this.toaster.success(message, 'Succès', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    );
  }
}

