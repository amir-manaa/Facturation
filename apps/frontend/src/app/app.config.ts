import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withFetch } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loaderInterceptor, jwtInterceptor } from '@httpInterceptor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalErrorHandler } from '@class';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch(), withInterceptors([loaderInterceptor, jwtInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom(
      MatSnackBar
    ), {
      provide: ErrorHandler, useClass: GlobalErrorHandler,
    }
  ],
};
