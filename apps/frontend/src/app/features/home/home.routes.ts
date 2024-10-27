import { Route } from '@angular/router';
import { HomeComponent} from './home.component';
import { authGuard } from '@guards';

export const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  }
];
