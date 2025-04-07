import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  private readonly usersService = inject(UsersService)
  private readonly toast = inject(ToastrService);
  private readonly router = inject(Router);

  public isLoading = true;

  public userData: User = {
    id: undefined,
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    points: undefined,
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.usersService.getUserById(this.route.snapshot.params['id']).subscribe({
      next: (user) => {
        this.userData = user;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
        this.toast.error('Error loading user data: Http ('+error.status+')', 'Error', {
          closeButton: true,
          progressBar: true,
          timeOut: 5000,
        });          
      }
    });
  }

  logout() {
    this.router.navigate(['/login'])
  }

  update() {
    this.router.navigate(['/register/' + this.userData.id])
  }

  updateReviews() {
    this.router.navigate(['/reviews/' + this.userData.id])
  }

  addReview() {
    this.router.navigate(['/add-review/' + this.userData.id])
  }
}
