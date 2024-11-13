import { Route } from '@angular/router';
import { authGuard, initGuard } from '@guards';
import { authResolver } from '@resolvers';
import { LoadingPageComponent } from '@sharedComponents';

export const appRoutes: Route[] = [
  {
    path: 'loading',
    component: LoadingPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/authentication/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
    resolve: { isAuth: authResolver },
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then((m) => m.homeRoutes),
    canActivate: [authGuard, initGuard],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];
