import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services';

@Component({
    selector: 'app-loading-page',
    imports: [CommonModule],
    template: ``,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  returnUrl!: string;
  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.returnUrl = decodeURI(this.returnUrl);
    this.authService.refreshUserProfile().subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
      error: () => this.authService.logout()
    });
  }
}
