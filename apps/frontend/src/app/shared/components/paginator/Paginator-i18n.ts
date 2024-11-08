import { MatPaginatorIntl } from '@angular/material/paginator';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PaginatorI18n implements MatPaginatorIntl {
  changes: Subject<void> = new Subject<void>();
  @Inject(length) length!: number;

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel: string = `Première page`;
  itemsPerPageLabel: string = `Éléments par page :`;
  lastPageLabel: string = `Dernière page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel: string = 'Page suivante';
  previousPageLabel: string = 'Page précédente';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Page 1 sur 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} sur ${amountPages}`;
  }
}
