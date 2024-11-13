import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { signal, inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoaderService} from '@services';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService)
  let count = signal(0);
  if (matchApiUrl(req)) {
    loaderService.showLoader();
    count.update(value => value++);
  }

  return next(req).pipe(
    finalize(() => {
      if (matchApiUrl(req))
        count.update(value => value--);
      if (count() === 0)
        loaderService.hideLoader();
    })
  );
};

let matchApiUrl = (req: HttpRequest<any>): boolean => {
  return req.url.includes('/api');
}
