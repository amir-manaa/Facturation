import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core'
import { AuthService } from '@services';
import { ISavedToken } from '../../models/saved-token';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (!authService.isUserLoggedIn()) {
    return next(req);
  }

  const currentUser = authService.getAccessToken() as ISavedToken;
  const authRequest = addAuthorizationHeader(req, currentUser.access_token);
  return next(authRequest);
};

const addAuthorizationHeader = (req: HttpRequest<any>, access_token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
