import { Injectable, inject, afterNextRender, Injector, signal } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser, IApiResponse } from '@models';
import { LocalStorageService } from '@services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly localStorageKeyName = 'fact_currentUser_development';

  private readonly currentUserSubject = new BehaviorSubject<IApiResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<IUser> {
    return this.http.post<IApiResponse>('/api/v1/user/auth', {
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
              this.currentUserSubject.next(response);
            });
        }
        return user;
      })
    )
  }

  logout(): Promise<boolean> {
    this.currentUserSubject.next(null);
    return this.localStorageService.removeItem(this.localStorageKeyName);
  }

  isUserLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
  getCurrentUser(): boolean {
    this.localStorageService.getItem(this.localStorageKeyName)
      .then(res => this.currentUserSubject.next(res as IApiResponse))
      .catch(() => this.currentUserSubject.next(null));
    return this.currentUserSubject.value !== null;
  }
}
