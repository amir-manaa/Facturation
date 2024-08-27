import { Component, ViewEncapsulation, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@services';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  template: `
    <div class="card">
      <p-menubar [model]="items" />
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);
  items: MenuItem[] | undefined;

 ngOnInit(): void {
  this.items = [
    {
        label: 'Logout',
        icon: 'pi pi-logout',
        command: () => this.logout()
    }
  ]
 } 

 private logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
  return;
 }
}
