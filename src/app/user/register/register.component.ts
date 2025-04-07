import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly userService = inject(UsersService)
  private destroyRef = inject(DestroyRef)
  private readonly router = inject(Router)
  private toaster = inject(ToastrService)

  private paramId: number | undefined = undefined;

  constructor(private route: ActivatedRoute) { }

  userForm = new FormGroup({
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    age: new FormControl(18, [Validators.required, Validators.min(18), Validators.max(999)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  ngOnInit(): void {
    // Get user from path param id if exists
    const userId = this.route.snapshot.params['id'];
    console.log(userId);
    if (userId == undefined) return;

    this.paramId = userId;

    this.userService.getUserById(userId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
      },
      error: (error) => {
        console.error(error);
        this.toaster.error('Erreur lors du chargement de l\'utilisateur: Http ('+error.status+')', 'Erreur', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    });
  }

  onSubmit() {
    const userData = this.userForm.value as unknown as User;

    console.log(userData);

    if (this.paramId) {
      // Update user
      this.userService.updateUser(this.paramId, userData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (updatedUser: User) => {
          console.log(updatedUser);
          this.toaster.success('L\'utilisateur a été mis à jour avec succès', 'Succès', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing'
          });
    
          this.router.navigate(['/account/' + updatedUser.id])
        },
        error: (error) => {
          console.error(error);
          this.toaster.error('Une erreur est survenue lors de la mise à jour de l\'utilisateur: Http (' + error.status + ")", 'Erreur', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing'
          });
        }
      });
      return;
    }

    this.userService.createUser(userData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (createdUser: User) => {
        console.log(createdUser);
        this.toaster.success('L\'utilisateur a été créé avec succès', 'Succès', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
  
        this.router.navigate(['/account/' + createdUser.id])
      },
      error: (error) => {
        console.error(error);
        this.toaster.error('Une erreur est survenue lors de la création de l\'utilisateur: Http (' + error.status + ")", 'Erreur', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    });
  }
}
