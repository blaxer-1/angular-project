import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly userService = inject(UsersService)
  private destroyRef = inject(DestroyRef)
  private readonly router = inject(Router)
  private toaster = inject(ToastrService)

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  onSubmit() {
    const userData = this.userForm.value;

    console.log(userData);

    this.userService.getUserByEmail(userData.email as string).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (user: User) => {
        if (user === null) {
          this.toaster.error('Aucun utilisateur trouvé avec cet email', 'Erreur', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing'
          });
          return;
        }
        
        console.log(user);
        this.toaster.success('Vous êtes bien connecté à EpiCiné !', 'Succès', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing'
        });

        this.router.navigate(['/account/' + user.id])
      },
      error: (error) => {
        console.error(error);
        this.toaster.error('Une erreur est survenue lors de la connexion de l\'utilisateur: Http (' + error.status + ")", 'Erreur', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    });
  }
}
