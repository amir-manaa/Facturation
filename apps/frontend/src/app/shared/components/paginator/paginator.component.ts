import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorIntl, PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { GlobalConstants } from '@utils';
import { PaginatorI18n } from './Paginator-i18n';
import { IUser } from '@models';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorI18n }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {

  @Input({ required: true }) length!: number;
  @Output() pageEvent = new EventEmitter<PageEvent>();

  pageSize: number = GlobalConstants.pageSize;
  pageIndex: number = GlobalConstants.pageIndex;
  pageSizeOptions: number[] = GlobalConstants.pageSizeOptions;
  showFirstLastButtons: boolean = GlobalConstants.showFirstLastButtons;
  showPageSizeOptions: boolean = GlobalConstants.showPageSizeOptions;
  hidePageSize: boolean = GlobalConstants.hidePageSize;

  handlePageEvent(e: PageEvent) {
    this.pageEvent.emit(e);
  }
}
