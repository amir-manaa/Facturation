import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, UserService } from '@services';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { IUser } from '@models';

@Component({
    selector: 'ui-header',
    imports: [
        CommonModule,
        RouterLink,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  currentUser$: Observable<IUser | null> = this.userService.currentUser$;

  logout() {
    this.authService.logout();
  }
}
