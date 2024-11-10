import { Router } from '@angular/router';

export const urlWithoutParams = (router: Router): string => {
  const urlTree = router.parseUrl(router.url);
  return '/'+urlTree.root.children['primary'].segments.map(it => it.path).join('/').toString();
}
