import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly url = "http://localhost:8080/users"
  private readonly httpClient = inject(HttpClient)

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, user)
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`)
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url)
  }

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/byEmail/${email}`)
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/${id}`, user)
  }
}
