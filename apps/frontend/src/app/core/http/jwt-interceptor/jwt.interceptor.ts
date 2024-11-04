import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core'
import { AuthService } from '@services';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.isUserLoggedIn()) {
    const authRequest = addAuthorizationHeader(req);
    return next(authRequest);
  } else {
    return next(req);
  }
};

const addAuthorizationHeader = (req: HttpRequest<any>) => {
   const token = inject(AuthService).getAccessToken();
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}
