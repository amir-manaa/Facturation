import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '@services';

export const authResolver: ResolveFn<boolean> = (route, state) => {  
  return inject(AuthService).islogged === null;
};
