import { Injectable, inject, afterNextRender, Injector, afterRender, signal } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUser, IApiResponse } from '@models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);
  private readonly isUserLoggedIn = signal<null | string>(null);

  private readonly localStorageKeyName = 'fact_currentUser_development';
  private readonly currentUserSubject = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  
  constructor() {
    afterNextRender({
      earlyRead: () => {
        const accessToken = localStorage.getItem(this.localStorageKeyName) as string;
        this.isUserLoggedIn.set(JSON.parse(accessToken));
      }
    });
  }
  
  login(email: string, password: string): Observable<IUser> {
    return this.http.post<IApiResponse>('http://localhost:4400/api/v1/user/auth', {
      'email': email,
      'password': password
    }).pipe(
      map(response => {
        const user = response.data.user;
        const accessToken = response.data.accessToken;
        if (user && accessToken) {
          afterRender({
            write: () => {
              localStorage.setItem(this.localStorageKeyName, JSON.stringify(accessToken))
            }
          },{injector: this.injector});
          this.isUserLoggedIn.set(JSON.stringify(accessToken));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    )
  }

  logout(): void {
    afterNextRender({
      write: () => {
        localStorage.removeItem(this.localStorageKeyName);
        this.isUserLoggedIn.set(null);
        this.router.navigate(['/home']);
      }
    },{injector: this.injector});
    
    
    return;
  }

  get islogged(): string | null {
    afterNextRender({
      earlyRead: () => {
        const accessToken = localStorage.getItem(this.localStorageKeyName) as string;
        this.isUserLoggedIn.set(JSON.parse(accessToken));
      }
    },{injector: this.injector});
    return this.isUserLoggedIn();
  }
}
