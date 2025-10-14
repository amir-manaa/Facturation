import { ErrorHandler, inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@services';
import { throwError } from 'rxjs';

@Injectable()
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
    if (error instanceof HttpErrorResponse) {
      return this.openSnackBar(error);
    }
  }

  private openSnackBar(error: HttpErrorResponse): void {
    this.snackbar.open(
      `${error.message}`,
      'Fermer',
      {
        duration: 8000
      }
    );
  }
}
