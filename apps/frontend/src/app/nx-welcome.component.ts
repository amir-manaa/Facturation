import { Component, ViewEncapsulation, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@services';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { IApiResponse, IUser } from '@models';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  template: `
    <div class="card">
      <p-menubar [model]="navItems" />
    </div>
    <div>
      <pre>
      email : {{ (this.currentUser$ | async)?.data?.user?.email }}
      </pre>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  currentUser$: Observable<IApiResponse | null> = this.authService.currentUser$
  navItems: MenuItem[] | undefined;

 ngOnInit(): void {
  this.checkLoggedUser();
  this.initNavItems();
 }

 private initNavItems() {
  this.navItems = [
    {
        label: 'Logout',
        icon: 'pi pi-logout',
        command: () => this.logout()
    }
  ]
 }

 private logout() {
  this.authService.logout().then(() => {
    console.log('logout 1');
    this.router.navigate(['/login']);
  });
 }

 async checkLoggedUser() {
 }
}
