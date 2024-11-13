import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services';

export const initGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isProfileLoaded()) {
    return true;
  }
  if (authService.isUserLoggedIn()) {
    router.navigate(['/loading'], { queryParams: { returnUrl: state.url } });
  }
  return false;
};
