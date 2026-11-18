import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLogged = inject(AuthService).isUserLoggedIn();

  return isLogged ? router.createUrlTree(['/']) : true;
};
