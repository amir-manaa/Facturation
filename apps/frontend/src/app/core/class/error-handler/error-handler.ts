import { ErrorHandler, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@services';

export class GlobalErrorHandler implements ErrorHandler {
  snackbar: MatSnackBar = inject(MatSnackBar);
  router = inject(Router);
  authService = inject(AuthService);
  handleError(error: HttpErrorResponse) {
    if ([403, 401].includes(error.status)) {
      this.authService.logout();
      this.router.navigate(['login']);
      return;
    }
    this.openSnackBar();
  }

  private openSnackBar(): void {
    this.snackbar.open(
      'Error was detected!',
      'Fermer',
      {
        duration: 8000
      }
    );
  }
}
