import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let isLogged = inject(AuthService).isUserLoggedIn();
  if (!isLogged) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
