import {
  Injectable,
  inject,
  afterNextRender,
  Injector,
  signal,
  PLATFORM_ID,
} from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser, IApiResponse } from '@models';
import { LocalStorageService } from '@services';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platform = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly localStorageKeyName = 'fact_currentUser_development';

  private readonly currentUserSubject =
    new BehaviorSubject<IApiResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<IUser> {
    return this.http
      .post<IApiResponse>('/api/v1/user/auth', {
        email: email,
        password: password,
      })
      .pipe(
        map((response) => {
          const user = response.data.user;
          const accessToken = response.data.accessToken;
          if (user && accessToken) {
            this.localStorageService
              .setItem(
                this.localStorageKeyName,
                JSON.stringify({ ...user, accessToken })
              )
              .then(() => {
                this.currentUserSubject.next(response);
              });
          }
          return user;
        })
      );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.localStorageService.removeItem(this.localStorageKeyName);
  }

  isUserLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  getCurrentUser(): any {
    return this.localStorageService.getItem(this.localStorageKeyName);
  }
}
