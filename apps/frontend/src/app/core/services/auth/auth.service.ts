import { Injectable, inject } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUser, IApiResponse } from '@models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private router = inject(Router);
  private http = inject(HttpClient);

  private readonly localStorageKeyName = 'fact_currentUser_development';
  private currentUserSubject = new Subject<IUser>();
  currentUser$ = this.currentUserSubject.asObservable();
  
  login(email: string, password: string): Observable<IUser> {
    return this.http.post<IApiResponse>('http://localhost:4400/api/v1/user/auth', {
      'email': email,
      'password': password
    }).pipe(
      map(response => {
        const user = response.data.user;
        const accessToken = response.data.accessToken;
        if (user && accessToken) {
          localStorage.setItem(this.localStorageKeyName, JSON.stringify(accessToken));
          this.currentUserSubject.next(user)
        }
        return user;
      })
    )
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKeyName);
    this.router.navigate(['/home']);
    return;
  }

  get isUserLoggedIn(): boolean {
    return this.getAccessToken() != null;
  }

  getAccessToken(): string {
    const accessToken = localStorage.getItem(this.localStorageKeyName) as string;
    return JSON.parse(accessToken);
  }
}
