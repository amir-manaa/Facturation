import {
  Injectable,
  inject, WritableSignal, signal
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '@models';
import { LocalStorageService, UserService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  private readonly localStorageKeyName = 'fact_currentUser_development';
  private readonly API_URL = '/api/v1';
  private profileLoaded: WritableSignal<boolean> = signal(false);

  private readonly currentUserSubject = new BehaviorSubject<Partial<IUser> | null>(null);
  currentUser$: Observable<Partial<IUser>|null> = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.API_URL}/user/auth`, {
        email: email,
        password: password,
      })
      .pipe(
        map((user) => {
          if (user) {
            this.localStorageService
              .setItem(this.localStorageKeyName, user)
              .then(() => {
                this.currentUserSubject.next(user);
                this.profileLoaded.set(true);
              });
          }
          return user;
        })
      );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.localStorageService.removeItem(this.localStorageKeyName);
    window.location.href = '/login';
  }

  refreshUserProfile(): Observable<Partial<IUser>> {
    if (this.isUserLoggedIn()) {
      return this.http.get<Partial<IUser>>(`${this.API_URL}/user`).pipe(
        map((user) => {
          this.profileLoaded.set(true);
          this.currentUserSubject.next(user)
          return user
        }),
      )
    } else {
      this.currentUserSubject.next(null);
      return of({});
    }
  }

  getAccessToken(): string | null {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return currentUser.token;
    }
    return null;
  }

  isProfileLoaded(): boolean {
    return this.profileLoaded();
  }

  isUserLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  getCurrentUser(): IUser {
    let localStorageItem = this.localStorageService.getItem(this.localStorageKeyName) as string;
    return JSON.parse(localStorageItem);
  }
}
