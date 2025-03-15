import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {MatPaginatorIntl, PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { GlobalConstants } from '@utils';
import { PaginatorI18n } from './Paginator-i18n';
import { IUser } from '@models';

@Component({
    selector: 'app-paginator',
    imports: [CommonModule, MatPaginatorModule],
    templateUrl: './paginator.component.html',
    styleUrl: './paginator.component.scss',
    providers: [{ provide: MatPaginatorIntl, useClass: PaginatorI18n }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit {
  @Input({ required: true }) length!: number;
  @Output() pageEvent = new EventEmitter<PageEvent>();

  private readonly cd = inject(ChangeDetectorRef)
  private readonly activatedRoute = inject(ActivatedRoute);

  pageSize: number = GlobalConstants.pageSize;
  pageIndex: number = GlobalConstants.pageIndex;
  pageSizeOptions: number[] = GlobalConstants.pageSizeOptions;
  showFirstLastButtons: boolean = GlobalConstants.showFirstLastButtons;
  showPageSizeOptions: boolean = GlobalConstants.showPageSizeOptions;
  hidePageSize: boolean = GlobalConstants.hidePageSize;

  ngOnInit() {
      this.activatedRoute.queryParams
      .subscribe(params => {
        this.pageIndex = (params['pageIndex']) ? params['pageIndex'] : GlobalConstants.pageIndex;
        this.cd.markForCheck();
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent.emit(e);
  }
}
