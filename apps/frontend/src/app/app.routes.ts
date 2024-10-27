import { Route } from '@angular/router';
import { authGuard } from '@guards';
import { authResolver } from '@resolvers';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./features/authentication/components/login/login.component').then(c => c.LoginComponent),
    resolve: { isAuth: authResolver }
  },
  {
    path: '',
    loadChildren: () => import('./features/home/home.routes').then(m => m.homeRoutes),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];
