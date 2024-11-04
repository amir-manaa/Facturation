import { Component, inject, PLATFORM_ID, Signal, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, LoaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly platform = inject(PLATFORM_ID);
  readonly onBrowser: Signal<boolean> = signal<boolean>(
    isPlatformBrowser(this.platform)
  );

  title = 'frontend';
}
