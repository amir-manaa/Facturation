import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services';

import { IApiResponse } from '@models';

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  currentUser$: Observable<IApiResponse | null> = this.authService.currentUser$

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
