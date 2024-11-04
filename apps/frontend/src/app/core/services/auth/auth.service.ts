import {
  Injectable,
  inject,
} from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserApiResponse } from '@models';
import { LocalStorageService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly localStorageKeyName = 'fact_currentUser_development';

  private readonly currentUserSubject = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<IUser> {
    return this.http
      .post<IUserApiResponse>('/api/v1/user/auth', {
        email: email,
        password: password,
      })
      .pipe(
        map((response) => {
          const user = response.user;
          if (user) {
            this.localStorageService
              .setItem(
                this.localStorageKeyName,
                this.stringifyIfObject(user)
              )
              .then(() => this.currentUserSubject.next(user));
          }
          return user;
        })
      );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.localStorageService.removeItem(this.localStorageKeyName);
  }

  getAccessToken(): string | null {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      return currentUser.token;
    }
    return null;
  }

  isUserLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  getCurrentUser(): any {
    let localStorageItem = this.localStorageService.getItem(this.localStorageKeyName) as string;
    return JSON.parse((JSON.parse(localStorageItem)));
  }

  private stringifyIfObject(obj: any) {
    if(typeof obj == "object")
      return JSON.stringify(obj);
    else{
      return obj;
    }
  }
}
