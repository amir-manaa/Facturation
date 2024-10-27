import { Component, inject, PLATFORM_ID, Signal, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/ui/header/header.component';
import { SidebarComponent } from './shared/ui/sidebar/sidebar.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, HeaderComponent, SidebarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  private readonly platform = inject(PLATFORM_ID);
  readonly onBrowser: Signal<boolean> = signal<boolean>(isPlatformBrowser(this.platform));

  title = 'frontend';
}
