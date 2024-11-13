import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService} from '@services';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { IUser} from '@models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);

  private readonly API_URL = '/api/v1';
  profileLoaded: WritableSignal<boolean> = signal(false);

  private readonly currentUserSubject = new BehaviorSubject<IUser | null>(null);
  currentUser$: Observable<IUser|null> = this.currentUserSubject.asObservable();

  refreshUserProfile(): Observable<IUser|null> {
    if (this.authService.isUserLoggedIn()) {
      return this.http.get<IUser>(`${this.API_URL}/user/profile`).pipe(
        map((user) => {
          this.profileLoaded.set(true);
          this.currentUserSubject.next(user)
          return user
        }),
      )
    } else {
      this.currentUserSubject.next(null);
      return of(null);
    }
  }

  setUserProfile(userProfile: IUser | null) {
    this.currentUserSubject.next(userProfile);
  }

  get userProfile() {
    return this.currentUserSubject.value;
  }
}
