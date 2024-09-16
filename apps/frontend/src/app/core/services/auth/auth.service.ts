import { Injectable, inject, afterNextRender, Injector, signal } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUser, IApiResponse } from '@models';
import { LocalStorageService } from '@services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);
  private readonly isUserLoggedIn = signal<null | string>(null);
  private readonly localStorageService = inject(LocalStorageService);

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
          this.localStorageService
            .setItem(this.localStorageKeyName, JSON.stringify(accessToken))
            .then(() => {
              this.isUserLoggedIn.set(JSON.stringify(accessToken));
              this.currentUserSubject.next(user);
            });
        }
        return user;
      })
    )
  }

  logout(): Promise<boolean> {
    this.isUserLoggedIn.set(null);
    return this.localStorageService.removeItem(this.localStorageKeyName);
  }

  async islogged(): Promise<any> {
    await afterNextRender({
      earlyRead: () => {
        const accessToken = localStorage.getItem(this.localStorageKeyName) as string;
        this.isUserLoggedIn.set(JSON.parse(accessToken));
      }
    },{injector: this.injector});
    return this.isUserLoggedIn();
  }
}
