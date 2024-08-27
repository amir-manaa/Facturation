import { Route } from '@angular/router';
import { authGuard } from '@guards';
import { authResolver } from '@resolvers';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: NxWelcomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/authentication/components/login/login.component').then(c => c.LoginComponent),
    resolve: { isAuth: authResolver }
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
