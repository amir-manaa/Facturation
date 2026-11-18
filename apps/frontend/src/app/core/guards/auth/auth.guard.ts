import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLogged = inject(AuthService).isUserLoggedIn();

  return isLogged ? true : router.createUrlTree(['/login']);
};
